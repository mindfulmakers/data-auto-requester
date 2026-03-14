import { access, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

import { targetMap, targets } from "./catalog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const artifactsDir = path.join(rootDir, "artifacts");
const downloadsDir = path.join(artifactsDir, "downloads");
const screenshotsDir = path.join(artifactsDir, "screenshots");
const profileDir = path.join(artifactsDir, "browser-profile");
const trackerJsonPath = path.join(artifactsDir, "request-tracker.json");
const trackerCsvPath = path.join(artifactsDir, "request-tracker.csv");

const usage = `
Usage:
  npm start
  npm start -- --only google,apple,uber
  npm run list
  npm run smoke -- --only google,apple

Options:
  --list                Print the target catalog and exit.
  --smoke               Open each selected URL headlessly and report status.
  --only <ids>          Comma-separated target ids.
  --headless            Run the interactive browser headlessly.
`;

function parseArgs(argv) {
  const options = {
    headless: false,
    list: false,
    only: [],
    smoke: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--list") {
      options.list = true;
      continue;
    }

    if (arg === "--smoke") {
      options.smoke = true;
      options.headless = true;
      continue;
    }

    if (arg === "--headless") {
      options.headless = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      console.log(usage.trim());
      process.exit(0);
    }

    if (arg === "--only") {
      options.only = splitCsv(argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg.startsWith("--only=")) {
      options.only = splitCsv(arg.slice("--only=".length));
      continue;
    }
  }

  return options;
}

function splitCsv(value) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function selectTargets(only) {
  if (!only.length) {
    return targets;
  }

  const selected = [];
  const missing = [];

  for (const id of only) {
    const target = targetMap.get(id);
    if (target) {
      selected.push(target);
    } else {
      missing.push(id);
    }
  }

  if (missing.length) {
    throw new Error(`Unknown target ids: ${missing.join(", ")}`);
  }

  return selected;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function timestamp() {
  return new Date().toISOString();
}

function csvEscape(value) {
  const stringValue = value == null ? "" : String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

async function ensureArtifacts() {
  await Promise.all([
    mkdir(artifactsDir, { recursive: true }),
    mkdir(downloadsDir, { recursive: true }),
    mkdir(screenshotsDir, { recursive: true }),
    mkdir(profileDir, { recursive: true }),
  ]);
}

async function readTracker() {
  try {
    await access(trackerJsonPath);
  } catch {
    return [];
  }

  const raw = await readFile(trackerJsonPath, "utf8");
  return JSON.parse(raw);
}

async function writeTracker(events) {
  await writeFile(trackerJsonPath, `${JSON.stringify(events, null, 2)}\n`, "utf8");

  const headers = [
    "timestamp",
    "type",
    "targetId",
    "company",
    "status",
    "mode",
    "portalUrl",
    "pageTitle",
    "pageUrl",
    "notes",
    "downloadFilename",
    "downloadPath",
  ];

  const rows = [
    headers.join(","),
    ...events.map((event) =>
      headers.map((header) => csvEscape(event[header] ?? "")).join(","),
    ),
  ];

  await writeFile(trackerCsvPath, `${rows.join("\n")}\n`, "utf8");
}

async function recordEvent(events, event) {
  events.push(event);
  await writeTracker(events);
}

function printList(selectedTargets) {
  for (const target of selectedTargets) {
    console.log(
      `${target.id.padEnd(18)} ${target.company.padEnd(24)} ${target.category} -> ${target.portalUrl}`,
    );
  }
}

async function runSmoke(selectedTargets) {
  await ensureArtifacts();

  const browser = await chromium.launch({ headless: true });

  for (const target of selectedTargets) {
    const page = await browser.newPage();
    let statusCode = "n/a";
    let pageTitle = "";
    let finalUrl = target.portalUrl;
    let errorMessage = "";

    try {
      const response = await page.goto(target.portalUrl, {
        timeout: 45000,
        waitUntil: "commit",
      });

      await page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(
        () => {},
      );

      statusCode = response?.status() ?? "n/a";
      finalUrl = page.url();
      pageTitle = await page.title();

      const screenshotPath = path.join(
        screenshotsDir,
        `smoke-${slugify(target.id)}.png`,
      );
      await page.screenshot({ path: screenshotPath, fullPage: false });
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error);
    }

    console.log(
      [
        target.id,
        String(statusCode).padEnd(3),
        pageTitle || "no-title",
        finalUrl,
        errorMessage,
      ]
        .filter(Boolean)
        .join(" | "),
    );

    await page.close();
  }

  await browser.close();
}

function bindDownloadCapture(context, getCurrentTarget, events) {
  const seenPages = new WeakSet();

  const attach = (page) => {
    if (seenPages.has(page)) {
      return;
    }

    seenPages.add(page);

    page.on("download", async (download) => {
      const currentTarget = getCurrentTarget();
      const fileName = `${new Date()
        .toISOString()
        .replaceAll(":", "-")}-${slugify(currentTarget.id)}-${slugify(
        download.suggestedFilename(),
      )}`;
      const downloadPath = path.join(downloadsDir, fileName);
      await download.saveAs(downloadPath);

      await recordEvent(events, {
        company: currentTarget.company,
        downloadFilename: fileName,
        downloadPath,
        mode: currentTarget.mode,
        notes: "Download captured by Playwright.",
        pageTitle: page.url(),
        pageUrl: page.url(),
        portalUrl: currentTarget.portalUrl,
        status: "downloaded",
        targetId: currentTarget.id,
        timestamp: timestamp(),
        type: "download",
      });

      console.log(`Saved download: ${fileName}`);
    });
  };

  context.pages().forEach(attach);
  context.on("page", attach);
}

async function ask(rl, prompt) {
  try {
    const answer = await rl.question(prompt);
    return answer.trim();
  } catch (error) {
    if (error instanceof Error && error.message === "readline was closed") {
      return "quit";
    }

    throw error;
  }
}

async function interactiveRun(selectedTargets, options) {
  await ensureArtifacts();

  const events = await readTracker();
  const rl = readline.createInterface({ input, output });
  const currentTargetRef = {
    company: "setup",
    id: "setup",
    mode: "setup",
    portalUrl: "",
  };

  const context = await chromium.launchPersistentContext(profileDir, {
    acceptDownloads: true,
    headless: options.headless,
    viewport: { height: 900, width: 1440 },
  });

  bindDownloadCapture(context, () => currentTargetRef, events);

  try {
    console.log("Interactive data retrieval run started.");
    console.log("Artifacts are written to ./artifacts and ignored by git.");

    for (const target of selectedTargets) {
      currentTargetRef.company = target.company;
      currentTargetRef.id = target.id;
      currentTargetRef.mode = target.mode;
      currentTargetRef.portalUrl = target.portalUrl;

      const page = await context.newPage();
      let pageTitle = "";
      let pageUrl = target.portalUrl;
      let navigationError = "";

      try {
        await page.goto(target.portalUrl, {
          timeout: 60000,
          waitUntil: "commit",
        });
        await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(
          () => {},
        );
        pageTitle = await page.title();
        pageUrl = page.url();
      } catch (error) {
        navigationError = error instanceof Error ? error.message : String(error);
      }

      const screenshotPath = path.join(
        screenshotsDir,
        `${new Date().toISOString().replaceAll(":", "-")}-${slugify(target.id)}.png`,
      );
      await page.screenshot({ path: screenshotPath, fullPage: false });

      console.log("");
      console.log(`== ${target.company} (${target.id}) ==`);
      console.log(`Category : ${target.category}`);
      console.log(`Mode     : ${target.mode}`);
      console.log(`Portal   : ${target.portalUrl}`);
      console.log(`Loaded   : ${pageUrl}`);
      console.log(`Title    : ${pageTitle || "no title yet"}`);
      console.log(`Notes    : ${target.instructions}`);
      if (navigationError) {
        console.log(`Warning  : ${navigationError}`);
      }

      console.log("");
      console.log(
        "Complete the request in the browser, then record the outcome here.",
      );
      const status =
        (await ask(
          rl,
          "Status [requested/downloaded/skipped/blocked/quit] (default requested): ",
        )) || "requested";

      if (status === "quit") {
        await page.close();
        break;
      }

      const notes = await ask(rl, "Notes (optional): ");
      pageTitle = await page.title().catch(() => pageTitle);
      pageUrl = page.url();

      await recordEvent(events, {
        company: target.company,
        downloadFilename: "",
        downloadPath: "",
        mode: target.mode,
        notes,
        pageTitle,
        pageUrl,
        portalUrl: target.portalUrl,
        status,
        targetId: target.id,
        timestamp: timestamp(),
        type: "request",
      });

      await page.close();
    }
  } finally {
    rl.close();
    await context.close();
  }

  console.log("");
  console.log(`Tracker JSON: ${trackerJsonPath}`);
  console.log(`Tracker CSV : ${trackerCsvPath}`);
  console.log(`Downloads   : ${downloadsDir}`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const selectedTargets = selectTargets(options.only);

  if (options.list) {
    printList(selectedTargets);
    return;
  }

  if (options.smoke) {
    await runSmoke(selectedTargets);
    return;
  }

  await interactiveRun(selectedTargets, options);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
