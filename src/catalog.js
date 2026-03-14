export const targets = [
  {
    id: "experian",
    company: "Experian",
    category: "Identity and Credit Bureaus",
    portalUrl: "https://consumerprivacy.experian.com/",
    mode: "privacy_request",
    instructions:
      "Use the Experian privacy request portal to request access to your personal data or consumer disclosure materials.",
  },
  {
    id: "equifax",
    company: "Equifax",
    category: "Identity and Credit Bureaus",
    portalUrl: "https://myprivacy.equifax.com/",
    mode: "privacy_request",
    instructions:
      "Start from Equifax MyPrivacy and submit an access request or follow the portal into your consumer disclosures workflow.",
  },
  {
    id: "transunion",
    company: "TransUnion",
    category: "Identity and Credit Bureaus",
    portalUrl: "https://www.transunion.com/consumer-privacy",
    mode: "privacy_request",
    instructions:
      "Use the consumer privacy page to request access to your data and related privacy rights disclosures.",
  },
  {
    id: "lexisnexis",
    company: "LexisNexis Risk Solutions",
    category: "Identity and Credit Bureaus",
    portalUrl: "https://consumer.risk.lexisnexis.com/request",
    mode: "privacy_request",
    instructions:
      "Submit a LexisNexis consumer disclosure request. This usually requires identity verification documents.",
  },
  {
    id: "google",
    company: "Google",
    category: "Big Tech Platforms",
    portalUrl: "https://takeout.google.com/",
    mode: "account_export",
    instructions:
      "Use Google Takeout to select products, create an export, and download the archive when it is ready.",
  },
  {
    id: "apple",
    company: "Apple",
    category: "Big Tech Platforms",
    portalUrl: "https://privacy.apple.com/",
    mode: "account_export",
    instructions:
      "Use Apple Data and Privacy to request a copy of your Apple account data. Some datasets are delivered asynchronously.",
  },
  {
    id: "meta",
    company: "Meta",
    category: "Big Tech Platforms",
    portalUrl: "https://accountscenter.facebook.com/info_and_permissions/",
    mode: "account_export",
    instructions:
      "Open Accounts Center and use the Download your information flow for Facebook, Instagram, and linked Meta accounts.",
  },
  {
    id: "amazon",
    company: "Amazon",
    category: "Big Tech Platforms",
    portalUrl: "https://www.amazon.com/gp/privacycentral/dsar/preview.html",
    mode: "privacy_request",
    instructions:
      "Open Amazon Privacy Central and follow the data request flow for account data, order history, and Alexa or device records.",
  },
  {
    id: "microsoft",
    company: "Microsoft",
    category: "Big Tech Platforms",
    portalUrl: "https://www.microsoft.com/en-us/privacy",
    mode: "account_export",
    instructions:
      "Start from Microsoft's privacy page, then sign in to the privacy dashboard to review and export activity data tied to your Microsoft account.",
  },
  {
    id: "uber",
    company: "Uber",
    category: "Mobility and Location",
    portalUrl: "https://privacy.uber.com/privacy/exploreyourdata",
    mode: "account_export",
    instructions:
      "Use the Uber privacy hub to request a copy of your trip and account data. The archive may arrive later by email.",
  },
  {
    id: "lyft",
    company: "Lyft",
    category: "Mobility and Location",
    portalUrl: "https://help.lyft.com/hc/en-us/all/articles/115012925687-Download-your-data",
    mode: "help_article",
    instructions:
      "Follow the official Lyft download-your-data article. The export is usually triggered from the app or signed-in account settings.",
  },
  {
    id: "att",
    company: "AT&T",
    category: "Telecommunications",
    portalUrl: "https://about.att.com/pages/privacy/rights_choices",
    mode: "privacy_request",
    instructions:
      "Use AT&T Privacy Rights and Choices to submit an access request for account and network data where available.",
  },
  {
    id: "verizon",
    company: "Verizon",
    category: "Telecommunications",
    portalUrl: "https://www.verizon.com/privacy/your-privacy-choices",
    mode: "privacy_request",
    instructions:
      "Start from Verizon privacy choices and follow the account-linked privacy or data access workflow.",
  },
  {
    id: "tmobile",
    company: "T-Mobile",
    category: "Telecommunications",
    portalUrl: "https://www.t-mobile.com/privacy-center",
    mode: "privacy_request",
    instructions:
      "Use the T-Mobile privacy center to locate the consumer data access and privacy rights forms.",
  },
  {
    id: "american-airlines",
    company: "American Airlines",
    category: "Travel and Loyalty",
    portalUrl: "https://www.aa.com/i18n/customer-service/support/privacy-policy.jsp",
    mode: "privacy_request",
    instructions:
      "Use the American Airlines privacy policy page for the current privacy request instructions. Their policy routes privacy rights requests to the privacy office.",
  },
  {
    id: "united",
    company: "United Airlines",
    category: "Travel and Loyalty",
    portalUrl: "https://www.united.com/privacy",
    mode: "privacy_request",
    instructions:
      "Start from the United privacy page and follow the privacy rights request path for account and travel data.",
  },
  {
    id: "delta",
    company: "Delta Air Lines",
    category: "Travel and Loyalty",
    portalUrl: "https://www.delta.com/us/en/legal/privacy-and-security",
    mode: "privacy_request",
    instructions:
      "Use Delta privacy and security resources to reach the personal data request workflow for SkyMiles and travel history.",
  },
  {
    id: "apple-health",
    company: "Apple Health",
    category: "Health and Biometric Platforms",
    portalUrl: "https://support.apple.com/108366",
    mode: "manual_export",
    instructions:
      "Apple Health exports are generated on-device. Follow the support instructions to export health data from the Health app.",
  },
  {
    id: "whoop",
    company: "WHOOP",
    category: "Health and Biometric Platforms",
    portalUrl: "https://www.whoop.com/us/en/whoop-privacy-policies/",
    mode: "privacy_request",
    instructions:
      "Start from the WHOOP privacy policy and use the linked privacy rights or support contact workflow for data access.",
  },
  {
    id: "oura",
    company: "Oura",
    category: "Health and Biometric Platforms",
    portalUrl: "https://ouraring.com/privacy-policy",
    mode: "privacy_request",
    instructions:
      "Use the Oura privacy policy and linked support or privacy request options to request your personal data.",
  },
];

export const targetMap = new Map(targets.map((target) => [target.id, target]));
