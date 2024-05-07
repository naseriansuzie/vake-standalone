export default function detectMobileDevice() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android')) {
    return 'android';
  }
  if (
    ua.includes('iphone') ||
    ua.includes('ipad') ||
    ua.includes('ipod') ||
    ua.includes('macintosh')
  ) {
    return 'ios';
  }
  return 'other';
}
