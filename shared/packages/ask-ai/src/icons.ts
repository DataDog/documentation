/**
 * Every icon the widget draws, as inline SVG.
 *
 * Hugo serves eight of these as `<img>` from `static/images/svg-icons/`,
 * fingerprinted by its `img-resource.html` partial. A URL would have to be
 * supplied by the host and would differ per host, so the package carries the
 * markup instead. The remaining icons were already written inline in Hugo's
 * `conversational-search.html` partial.
 *
 * Sizes are passed per call site rather than baked in: `copy` and `check`
 * render at 16px in the message actions row and 14px on a code block.
 */

interface IconSource {
  viewBox: string;
  /** Presentation attributes for the root `<svg>`, for the stroked icons. */
  presentation?: string;
  body: string;
}

export interface IconOptions {
  size: number;
  className?: string;
  /** Icons are decorative by default; the labelled button around them names them. */
  hidden?: boolean;
  /** Inline styles, for the copy/check pair that toggles `display`. */
  style?: string;
}

function renderIcon(
  { viewBox, presentation, body }: IconSource,
  { size, className, hidden = true, style }: IconOptions,
): string {
  const attributes = [
    'xmlns="http://www.w3.org/2000/svg"',
    `viewBox="${viewBox}"`,
    `width="${size}"`,
    `height="${size}"`,
    // Keeps the icon out of the tab order in IE-era and Safari focus handling.
    'focusable="false"',
    presentation,
    className && `class="${className}"`,
    hidden && 'aria-hidden="true"',
    style && `style="${style}"`,
  ].filter(Boolean);

  return `<svg ${attributes.join(" ")}>${body}</svg>`;
}

/** The stroke settings shared by the icons that were inline in Hugo's partial. */
const STROKED =
  'fill="none" stroke="currentColor" stroke-width="2"' +
  ' stroke-linecap="round" stroke-linejoin="round"';

function icon(source: IconSource): (options: IconOptions) => string {
  return (options) => renderIcon(source, options);
}

// -- The eight from `static/images/svg-icons/` --------------------------------

export const sparkAiIcon = icon({
  viewBox: "0 0 192 192",
  body:
    '<path d="M120,16h-8c0,30.88-25.12,56-56,56v8c30.88,0,56,25.12,56,56h8c0-30.88,' +
    "25.12-56,56-56v-8c-30.88,0-56-25.12-56-56ZM56,104h-8c0,17.64-14.35,32-32," +
    '32v8c17.65,0,32,14.36,32,32h8c0-17.64,14.35-32,32-32v-8c-17.65,0-32-14.36-32-32Z"/>',
});

export const sparkPurpleIcon = icon({
  viewBox: "0 0 36 36",
  presentation: 'fill="none"',
  body:
    '<path d="M22.5 3H21C21 8.79 16.29 13.5 10.5 13.5V15C16.29 15 21 19.71 21 25.5H22.5C22.5 ' +
    "19.71 27.21 15 33 15V13.5C27.21 13.5 22.5 8.79 22.5 3ZM10.5 19.5H9C9 22.8075 6.30938 " +
    "25.5 3 25.5V27C6.30938 27 9 29.6925 9 33H10.5C10.5 29.6925 13.1906 27 16.5 27V25.5C13.1906 " +
    '25.5 10.5 22.8075 10.5 19.5Z" fill="#8000FF"/>',
});

/**
 * Hugo's file wraps these paths in a `clipPath` whose rect matches the viewBox,
 * so it clips nothing. It is dropped here rather than inlined, which would put
 * its generated element id into whatever page the widget mounts on.
 */
export const infoIcon = icon({
  viewBox: "0 0 16 16",
  presentation: 'fill="none"',
  body:
    '<path d="M8 5.33334C8.55228 5.33334 9 4.88562 9 4.33334C9 3.78105 8.55228 3.33334 8 ' +
    '3.33334C7.44772 3.33334 7 3.78105 7 4.33334C7 4.88562 7.44772 5.33334 8 5.33334Z" fill="#C7C7C7"/>' +
    '<path d="M7.99999 0.666664C3.95832 0.666664 0.666656 3.95833 0.666656 8C0.666656 12.0417 ' +
    "3.95832 15.3333 7.99999 15.3333C12.0417 15.3333 15.3333 12.0417 15.3333 8C15.3333 3.95833 " +
    "12.0417 0.666664 7.99999 0.666664ZM7.99999 14C4.69166 14 1.99999 11.3083 1.99999 8C1.99999 " +
    '4.69166 4.69166 2 7.99999 2C11.3083 2 14 4.69166 14 8C14 11.3083 11.3083 14 7.99999 14Z" fill="#C7C7C7"/>' +
    '<path d="M8.83333 6.16666H6.66667V7.5H7.5V10.1667H6V11.5H10V10.1667H8.83333V6.16666Z" fill="#C7C7C7"/>',
});

export const plusIcon = icon({
  viewBox: "0 0 16 16",
  presentation: 'fill="none"',
  body:
    '<path d="M14.6667 7.33334H8.66671V1.33334H7.33337V7.33334H1.33337V8.66667H7.33337V14.6667H8.66671' +
    'V8.66667H14.6667V7.33334Z" fill="#B37BFF"/>',
});

export const thumbsUpIcon = icon({
  viewBox: "0 0 192 192",
  body:
    '<path d="M30.7338 180H139.314C146.677 180 153.383 175.552 156.404 168.663C156.404 168.663 ' +
    "176.047 113.074 179.416 103.131C181.505 96.9567 178.056 83.8471 168.011 83.8093C164.381 " +
    "83.7966 120.846 83.8093 120.846 83.8093C125.789 71.7497 128.771 60.0598 128.771 43.0143C128.771 " +
    "42.9765 128.745 42.9513 128.745 42.9135C128.745 42.8757 128.771 42.8505 128.771 42.8127C128.771 " +
    "32.2359 121.382 23.0452 114.8 16.3623C109.484 10.9689 101.606 10.5194 96.0704 15.3332C90.7541 " +
    "19.9621 90.6897 26.3048 90.6768 31.4252C90.6683 32.7609 92.0199 38.6416 90.1619 41.4433C84.3779 " +
    "50.1761 55.9811 83.8093 55.9811 83.8093L30.7381 83.7714C20.4058 83.7546 12 92.5378 12 " +
    "103.131V160.783C12 171.381 20.4058 180 30.7338 180ZM68.8279 88.8036C68.8279 88.8036 95.8559 " +
    "56.4138 101.709 45.774C105.085 39.6371 103.069 25.7209 103.94 24.9691C104.498 24.5028 105.12 " +
    "24.1962 106.072 25.1791C108.93 28.1488 116.508 36.0331 116.508 43.0101C116.508 43.972 116.495 " +
    "44.8919 116.478 45.774C116.207 58.2494 114.006 63.6218 109.544 74.5262L106.398 83.8093C105.862 " +
    "85.1408 105.313 89.3875 105.39 92.7562C105.437 94.8985 107.27 96.1208 109.458 96.1208H109.544L169.44 " +
    "95.9906L145.226 163.496C144.188 165.878 141.871 167.42 139.326 167.42H68.8279V88.8036ZM24.2589 " +
    '167.399V95.9906H55.9811V167.42L30.7338 167.399C27.1638 167.407 24.2589 167.399 24.2589 167.399Z"/>',
});

export const thumbsDownIcon = icon({
  viewBox: "0 0 192 192",
  body:
    '<path d="M161.266 12L52.6865 12C45.3234 12 38.6168 16.4483 35.5961 23.3371C35.5961 23.3371 ' +
    "15.9526 78.9261 12.5843 88.8686C10.4947 95.0433 13.9445 108.153 23.9893 108.191C27.6194 " +
    "108.203 71.1543 108.191 71.1543 108.191C66.2112 120.25 63.2291 131.94 63.2291 148.986C63.2291 " +
    "149.024 63.2548 149.049 63.2548 149.087C63.2548 149.124 63.2291 149.15 63.2291 149.187C63.2291 " +
    "159.764 70.6179 168.955 77.2001 175.638C82.5164 181.031 90.3944 181.481 95.9296 176.667C101.246 " +
    "172.038 101.31 165.695 101.323 160.575C101.332 159.239 99.9801 153.358 101.838 150.557C107.622 " +
    "141.824 136.019 108.191 136.019 108.191L161.262 108.229C171.594 108.245 180 99.4622 180 " +
    "88.8686L180 31.2172C180 20.6194 171.594 12 161.266 12ZM123.172 103.196C123.172 103.196 96.1441 " +
    "135.586 90.2914 146.226C86.9145 152.363 88.9312 166.279 88.0602 167.031C87.5024 167.497 86.8802 " +
    "167.804 85.9276 166.821C83.0699 163.851 75.4923 155.967 75.4923 148.99C75.4923 148.028 75.5052 " +
    "147.108 75.5223 146.226C75.7927 133.751 77.9939 128.378 82.4563 117.474L85.6015 108.191C86.1379 " +
    "106.859 86.6871 102.613 86.6099 99.2438C86.5627 97.1015 84.7305 95.8792 82.5422 95.8792H82.4563L22.5605 " +
    "96.0094L46.7737 28.5037C47.8121 26.122 50.1291 24.5804 52.6736 24.5804L123.172 24.5804L123.172 " +
    "103.196ZM167.741 24.6014L167.741 96.0094H136.019L136.019 24.5804L161.266 24.6014C164.836 24.593 " +
    '167.741 24.6014 167.741 24.6014Z"/>',
});

export const copyIcon = icon({
  viewBox: "0 0 192 192",
  body: '<path d="M176,140H160V32H52V16H176ZM140,52H16V176H140ZM32,68h92v92H32Z"/>',
});

export const checkIcon = icon({
  viewBox: "0 0 192 192",
  body:
    '<path d="M65,165.313,5.343,105.657,16.657,94.343,65,142.687,175.343,32.343l11.314,' +
    '11.314Z"/>',
});

// -- The ones Hugo wrote inline in its partial --------------------------------

export const viewModeIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<rect x="3" y="4" width="18" height="16" rx="2"></rect>' +
    '<line x1="9" y1="4" x2="9" y2="20"></line>',
});

export const floatingModeIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<rect x="3" y="3" width="18" height="18" rx="2"></rect>' +
    '<rect x="12" y="12" width="7" height="6" rx="1" fill="currentColor" stroke="none"></rect>',
});

export const sidebarModeIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<rect x="3" y="3" width="18" height="18" rx="2"></rect>' +
    '<rect x="14" y="3" width="7" height="18" fill="currentColor" stroke="none"></rect>',
});

export const fullscreenModeIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<polyline points="4 9 4 4 9 4"></polyline>' +
    '<polyline points="20 9 20 4 15 4"></polyline>' +
    '<polyline points="4 15 4 20 9 20"></polyline>' +
    '<polyline points="20 15 20 20 15 20"></polyline>',
});

/** The tick beside the selected view mode. Heavier stroke than the rest. */
export const checkmarkIcon = icon({
  viewBox: "0 0 24 24",
  presentation:
    'fill="none" stroke="currentColor" stroke-width="3"' +
    ' stroke-linecap="round" stroke-linejoin="round"',
  body: '<polyline points="20 6 9 17 4 12"></polyline>',
});

export const closeIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<line x1="18" y1="6" x2="6" y2="18"></line>' +
    '<line x1="6" y1="6" x2="18" y2="18"></line>',
});

export const sendIcon = icon({
  viewBox: "0 0 24 24",
  presentation: STROKED,
  body:
    '<line x1="12" y1="19" x2="12" y2="5"></line>' +
    '<polyline points="5 12 12 5 19 12"></polyline>',
});

export const chevronRightIcon = icon({
  viewBox: "0 0 24 24",
  presentation: 'fill="none" stroke="currentColor" stroke-width="2"',
  body: '<polyline points="9 18 15 12 9 6"></polyline>',
});
