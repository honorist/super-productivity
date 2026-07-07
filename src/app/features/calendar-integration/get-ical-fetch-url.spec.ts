import { getIcalFetchUrl, WEB_ICAL_CORS_PROXY } from './get-ical-fetch-url';

describe('getIcalFetchUrl', () => {
  const GCAL_URL =
    'https://calendar.google.com/calendar/ical/user%40gmail.com/private-TOKEN/basic.ics';

  it('prefixes https urls with the CORS proxy on web', () => {
    expect(getIcalFetchUrl(GCAL_URL, true)).toBe(WEB_ICAL_CORS_PROXY + GCAL_URL);
  });

  it('prefixes http urls with the CORS proxy on web', () => {
    expect(getIcalFetchUrl('http://example.com/cal.ics', true)).toBe(
      WEB_ICAL_CORS_PROXY + 'http://example.com/cal.ics',
    );
  });

  it('returns the url unchanged when not running in a web browser', () => {
    expect(getIcalFetchUrl(GCAL_URL, false)).toBe(GCAL_URL);
  });

  it('does not double-prefix urls that already use the proxy', () => {
    const alreadyPrefixed = WEB_ICAL_CORS_PROXY + GCAL_URL;
    expect(getIcalFetchUrl(alreadyPrefixed, true)).toBe(alreadyPrefixed);
  });

  it('leaves non-http urls (e.g. file://) untouched on web', () => {
    expect(getIcalFetchUrl('file:///home/user/cal.ics', true)).toBe(
      'file:///home/user/cal.ics',
    );
  });

  it('returns empty string unchanged', () => {
    expect(getIcalFetchUrl('', true)).toBe('');
  });
});
