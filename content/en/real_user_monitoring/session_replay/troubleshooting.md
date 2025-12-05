---
title: Session Replay Troubleshooting
description: Learn how to troubleshoot issues with Session Replay.
aliases:
- /real_user_monitoring/session_replay/browser/troubleshooting
- /real_user_monitoring/session_replay/mobile/troubleshooting
content_filters:
  - trait_id: platform
    option_group_id: rum_session_replay_sdk_options
    label: "SDK"
further_reading:
- link: '/real_user_monitoring/session_replay'
  tag: 'Documentation'
  text: 'Learn about Session Replay'
- link: 'https://github.com/DataDog/browser-sdk'
  tag: "Source Code"
  text: 'browser-sdk Source code'
- link: '/integrations/content_security_policy_logs'
  tag: 'Documentation'
  text: 'Detect and aggregate CSP violations with Datadog'
---

<!-- Browser -->
{% if equals($platform, "browser") %}
## Overview

If you experience unexpected behavior with Datadog Session Replay, use this page to help resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance. Regularly update to the latest version of the [RUM Browser SDK][2], as each release contains improvements and fixes.

## Session Replay Recorder

### Some HTML elements are not visible at replay

Session Replay does not support:

- The following HTML elements: `iframe`, `video`, `audio`, or `canvas`
  - To render iframes in Session Replay, you can separately instrument the iframe code. For iframes that span across subdomains, use `trackSessionAcrossSubdomains: true`. After correct instrumentation, iframes and their parent windows appear as separate pages within the same session. Embedding iframe replays directly into their parent windows is not supported.
- The [Web Animations API][7]

Session Replay requires you to use an HTTPS connection. If you aren't using a secure connection, the resources time out and you can't see images and some page elements.

### Fonts or images do not render properly

A Session Replay is not a video, but an actual iframe rebuilt based on snapshots of the DOM. The replay thus depends on the various assets of the page: fonts and images.

Assets may not be available at the time of replay for the following reasons:

- The resource no longer exists. For example, it was part of a previous deployment.
- The resource is inaccessible. For example, authentication might be required, or the resource might only be accessible from an internal network.
- The resource is blocked by the browser due to CORS (typically web-fonts).
   - The replay rendered on the `session-replay-datadoghq.com` sandbox domain and the asset requests are subject to cross-origin security checks by your browser. If the given asset is not authorized for the domain, your browser blocks the request.
   - Allow `session-replay-datadoghq.com` through the [`Access-Control-Allow-Origin`][3] header for any font or image assets your website depends on to ensure these resources are accessible for the replay. For more information, see [Cross Origin Resource Sharing][4].

### CSS rules not properly applied/mouse hover not replayed

Unlike fonts and images, the recorder tries to bundle the various CSS rules applied as part of the recording data, leveraging the [CSSStyleSheet][5] interface. If this is not possible, it falls back to recording the links to the CSS files.

For proper mouse hover support, the CSS rules must be accessible through the CSSStyleSheet interface.

If the stylesheets are hosted on a different domain than the web page, access to the CSS rules is subject to cross-origin security checks by the browser, and the browser must be instructed to load the stylesheet leveraging CORS using the [crossorigin][6] attribute.

For example, if your application is on the `example.com` domain and depends on a CSS file on `assets.example.com` through a link element, the `crossorigin` attribute should be set to `anonymous`, unless credentials are required:

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css">
```

Additionally, authorize the `example.com` domain in the `assets.example.com`. This allows the assets file to load the resource by setting the [`Access-Control-Allow-Origin`][3] header.

{% /if %}
<!-- end Browser -->

<!-- Mobile (Android, iOS, React Native, Flutter, Kotlin Multiplatform) -->
{% if or(equals($platform, "android"), equals($platform, "ios"), equals($platform, "react_native"), equals($platform, "flutter"), equals($platform, "kotlin_multiplatform")) %}
## Session replays
### Some parts of the application are blank or not visible in the player

Mobile Session Replay only supports native frameworks. Within these frameworks, there may be certain components or screens missing, such as:

- SwiftUI is supported through an **experimental** feature. If this experimental support is **not enabled**, SwiftUI screens may appear blank or incomplete.
- Certain system elements, such as actionBar in Android, progress bars, and spinners
- Rich system contents, such as video players, music player, and map widgets
- Views that use direct canvas drawing
- Advanced text styling

### Images do not render properly
Depending on the SDK configuration of Mobile Session Replay, images may not always be displayed.

Image visibility depends on your SDK privacy configuration:
- On iOS, if `maskNonBundledOnly` is enabled, only bundled images with UIKit and images up to 100x100 pts on SwiftUI are captured.
- On Android, if `mask_large_only` is used, only images up to 100x100dp are captured.

All other images are replaced by a "Content Image" placeholder in the UI.

Learn more about [image privacy settings][8].

Images follow a separate processing pipeline, which may introduce a small delay between uploading a replay and the image being available for rendering in the web player.
In this case, wait a few minutes and then reload the replay.

On iOS, vector images are not supported in Session Replay and appear as "Unsupported image type" placeholders in the replay. To work around this, disable the "Preserve Vector Data" option in your asset catalog so that Xcode rasterizes the images, allowing them to be captured correctly. SF Symbols are also not supported.

### The session replay rendering looks does not exactly mirror my application
Mobile Session Replay's approach combines performance with usability. To achieve this, it's not a pixel-perfect recreation of your app, but instead it takes a hybrid approach to the visual: it displays a scaffold of the screen that can later be enriched with styling and contextual images.

### For sessions that are very short, I see a replay attached, but I'm unable to view the replay
When sessions are 1 nanosecond long, Datadog is unable to process the record, so there is no replay attached.

## Data security
### I need to account for mobile app consent when collecting mobile session replays
Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory. Upon starting the SDK, a tracking consent value needs to be set to one of the following:

- If the value is **not granted**, then no data is ever written on disk.
- If the value is **pending**, the data is written in a temporary folder which cannot be uploaded to Datadog.
- If the value is **granted**, data is written in an "upload" folder, which is processed in the background, and eventually uploaded to Datadog.

At any time during the lifetime of the host app, it's possible to change the tracking consent. When the consent changes from pending to granted, the data in the temporary folder is moved to the "upload" folder.

{% /if %}
<!-- end Mobile -->

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
[8]: /real_user_monitoring/session_replay/privacy_options#image-masking-definition