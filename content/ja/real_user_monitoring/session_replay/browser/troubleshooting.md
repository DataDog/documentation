---
title: Session Replay Browser Troubleshooting
kind: documentation
description: Learn how to troubleshoot issues with Session Replay.
aliases:
- /real_user_monitoring/session_replay/troubleshooting
further_reading:
- link: "https://github.com/DataDog/browser-sdk"
  tag: ソースコード
  text: browser-sdk Source code
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Learn about Session Replay
- link: /integrations/content_security_policy_logs
  tag: Documentation
  text: Detect and aggregate CSP violations with Datadog
---

## Overview

If you experience unexpected behavior with Datadog Session Replay, use this page to help resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance. Regularly update to the latest version of the [RUM Browser SDK][2], as each release contains improvements and fixes.

## Session Replay Recorder

### Some HTML elements are not visible at replay

Session Replay does not support:

- The following HTML elements: `iframe`, `video`, `audio`, or `canvas`
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[6]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
