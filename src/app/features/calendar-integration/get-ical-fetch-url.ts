import { IS_WEB_BROWSER } from '../../app.constants';

/**
 * CORS proxy applied transparently to iCal fetches in the web build only.
 * Google/Outlook iCal endpoints do not send CORS headers, so direct browser
 * requests are blocked; desktop and mobile fetch natively and skip this.
 * The stored icalUrl stays clean — the proxy is prepended only at fetch time,
 * so the same synced provider config keeps working on all platforms.
 */
export const WEB_ICAL_CORS_PROXY =
  'https://cors-anywhere-production-ffaa.up.railway.app/';

export const getIcalFetchUrl = (
  icalUrl: string,
  isWebBrowser: boolean = IS_WEB_BROWSER,
): string => {
  if (!isWebBrowser || !icalUrl) {
    return icalUrl;
  }
  if (!/^https?:\/\//i.test(icalUrl)) {
    return icalUrl;
  }
  if (icalUrl.startsWith(WEB_ICAL_CORS_PROXY)) {
    return icalUrl;
  }
  return WEB_ICAL_CORS_PROXY + icalUrl;
};
