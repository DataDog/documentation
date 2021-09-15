---
title: Getting started with Session Replay
kind: guide
description: Guide for enabling Session Replay and how to set privacy options
beta: true
further_reading:
    - link: '/real_user_monitoring/explorer'
      tag: 'Documentation'
      text: 'Visualize your RUM data in the Explorer'
    - link: 'https://www.datadoghq.com/blog/session-replay-datadog/'
      tag: 'Blog'
      text: 'Use Datadog Session Replay to view real-time user journeys'
---

<div class="alert alert-info"><p>Session Replay is in private beta. There are no billing implications for the Session Replays during this period. If you want to be added to the private beta, sign up by emailing <a href="mailto:support@datadoghq.com">support@datadoghq.com</a>.</p><p>Session Replay is available only on <a href="/getting_started/site/">the US1 Datadog site</a> at this time.</p>
</div>

## What is Session Replay?

Session Replay expands your UX monitoring by allowing you to capture and visually replay the web browsing experience of your users.
Used in combination with RUM performance data, Session Replay can be an asset for error identification, reproduction, and resolution, and it can also bring invaluable insights into your web application’s usage patterns and design pitfalls.

## Collect Session Replay data

### Initial setup

To use Session Replay, set up [Datadog RUM Browser Monitoring][1]. Set up the following sections: application creation, client token generation, and RUM SDK setup.

Session Replay is available through a dedicated build of the RUM Browser SDK. To enable Session Replay, change the npm package name or CDN URL, depending on your chosen installation method:

#### npm

Replace the `@datadog/browser-rum package` with a version >3.0.2 of [`@datadog/browser-rum`][2] To start the recording, call `DD_RUM.startSessionReplayRecording()`.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sampleRate: 100,
    replaySampleRate: 100,
    trackInteractions: true
});

DD_RUM.startSessionReplayRecording();
```

#### CDN

Replace the Browser SDK URL `https://www.datadoghq-browser-agent.com/datadog-rum.js` with `https://www.datadoghq-browser-agent.com/datadog-rum-v3.js`. When `DD_RUM.init()` is called, the Session Replay recording does not start until `DD_RUM.startSessionReplayRecording()` is also called.

*Supported browsers*: The Session Replay recorder supports all the browsers supported by the RUM Browser SDK with the exception of IE11. See the [browser support table][3].

#### Configuration

The usual [RUM initialization parameters][4] are all supported.

The Session Replay does not start recording automatically when calling `init()`. To start the recording, call `startSessionReplayRecording()`. This can be useful to conditionally start the recording, for example to only record authenticated user sessions:

```javascript
if (user.isAuthenticated) {
    DD_RUM.startSessionReplayRecording();
}
```

The Session Replay recording can be stopped by calling `stopSessionReplayRecording()`.

### Sensitive & personal data obfuscation

<div class="alert alert-info">
The Privacy by Default feature changes how the SDK manages privacy.
</div>

By default, the SDK protects end-user privacy and sensitive organizational information from being recorded by automatically masking form fields such as password inputs and text areas.

You can configure the default privacy mode within your JavaScript configuration and tag specific parts of your HTML documents with explicit overrides.

- Four privacy levels are supported: `allow`, `mask-user-input`, `mask`, and `hidden`.
- The root HTML element inherits the privacy level from the JavaScript configuration `defaultPrivacyLevel` property which defaults to `mask-user-input`, such as `{defaultPrivacyLevel: 'mask-user-input'}`.
- Every HTML element inherits the privacy level of its parent except for `hidden`, which is final.

With the inheritance rules above, you can tag the privacy level of an HTML element using one of two methods:

1. An HTML attribute such as `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"`; or
2. An HTML class name such as `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`.

#### Privacy levels

-   `allow`: Unmasks everything, excluding HTML input elements such as `password`, `email`, and `tel`, and elements with `autocomplete` attributes.
-   `mask-user-input`: Unmasks HTML content, but blocks most form fields such as inputs, text areas, and checkbox values. Inputs are replaced with three asterisks (`***`) and text areas are obfuscated with space-preserving `x` characters.
-   `mask`: Masks all HTML text, form values, images, and links.
-   `hidden`: Blocks Session Replay. Blocking Session Replay suppresses the recording of all JavaScript events and records only the dimensions of the element. All child elements are untracked. By default, `hidden` cannot be overridden by a child element.

When tagging your web application, start by tagging `mask` at the top of your HTML document. Then, ask your team to consider which pages, features, or components need to be unmasked (tagged with `allow`).

#### Example

Input values in the following form are replaced with three asterisks (`***`).

```html
<form method="post" data-dd-privacy="mask-user-input">
    <input type="text" name="name" id="name" required />
    <input type="number" name="age" id="age" required />
    <input type="email" name="email" id="email" required />
    <input type="submit" value="submit" />
</form>
```

Alternatively, HTML elements are completely skipped from the recording with `hidden`:

```html
<div id="profile-info" data-dd-privacy="hidden">
    <p>Name: John Doe</p>
    <p>Birth date: June 6th, 1987</p>
</div>
```

These elements are replaced with a gray block at recording time. In this example replay session, the navigation in Datadog is obfuscated:

{{< img src="real_user_monitoring/guide/replay-hidden.png" alt="Replay Hidden Example">}}

## Troubleshooting

### Some HTML elements are not visible at replay

Session Replay does not support the following HTML elements at the moment: `iframe`, `video`, `audio`, `canvas`, as well as Web Components.

### Fonts or images do not render properly

A Session Replay is not a video, but an actual iframe rebuilt based on snapshots of the DOM. The replay thus depends on the various assets of the page: fonts & images.

Several reasons might explain why assets are not available at the time of the replay.

1. The resource does not exist anymore. For example, it was part of a previous deployment.
2. The resource is inaccessible. For example, authentication might be required, or the resource might only be accessible from an internal network.
3. The resource is blocked by the browser due to CORS (typically web-fonts).
   - The replay rendered on the `app.datadoghq.com` domain and the asset requests are subject to cross-origin security checks by your browser. If the given asset is not authorized for the domain, your browser blocks the request.
   - Allow `app.datadoghq.com` through the [`Access-Control-Allow-Origin`][5] header for any font or image assets your website depends on to ensure these resources are accessible for the replay.
   - For more information, see [Cross Origin Resource Sharing][6].

### CSS rules not properly applied/mouse hover not replayed

Unlike fonts and images, the recorder tries to bundle the various CSS rules applied as part of the recording data, leveraging the [CSSStyleSheet][7] interface. If this is not possible, it falls back to recording the links to the CSS files.

**Note**: For proper mouse hover support, the CSS rules must be accessible through the CSSStyleSheet interface.

If the stylesheets are hosted on a different domain than the web page, access to the CSS rules is subject to cross-origin security checks by the browser, and the browser must be instructed to load the stylesheet leveraging CORS using the [crossorigin][8] attribute.

For example, if your application is on the `example.com` domain and depends on a CSS file on `assets.example.com` via a link element, the `crossorigin` attribute should be set to `anonymous`, unless credentials are required:

```html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

Additionally, authorize the `example.com` domain in the `assets.example.com`. This allows the assets file to load the resource by setting the [`Access-Control-Allow-Origin`][5] header.

## Frequently asked questions

### How does it work?

The Session Replay Recorder, part of the RUM Browser SDK, takes a snapshot of the DOM + CSS. It then tails & records events happening on the web page (DOM modification, mouse move, clicks, input events, …) along with their timestamp.

On the Datadog replay view, we rebuild the page and re-apply the recorded events at the right time.

The browser SDK is [open source][9], and leverages the open source project [rrweb][10].

### What is the performance impact?

To ensure minimal impact of the Session Replay recorder on the application's performance, Datadog:

-   Reduces network impact of Session Replay by compressing the data prior to sending it to Datadog.
-   Reduces load on the browser’s UI thread by delegating most of the CPU intensive work (such as compression) to a background service worker.

Expected Network bandwidth impact is less than 100Kb/min. Refined estimates will be available after more data is received from Early Adopters.

### How long is a Session Replay available?

Session Replay follows the same 30 days retention policy as normal RUM sessions.

[1]: /real_user_monitoring/browser/#setup
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/browser/#initialization-parameters
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[8]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[9]: https://github.com/DataDog/browser-sdk
[10]: https://www.rrweb.io/
