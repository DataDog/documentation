---
title: Getting started with Session Replay
kind: guide
description: Guide for enabling Session Replay and how to set privacy options
beta: true
further_reading:
- link: '/real_user_monitoring/explorer'
  tag: 'Documentation'
  text: 'Visualize your RUM data in the Explorer'
---

## What is Session Replay?

Session Replay expands your UX monitoring by allowing you to capture and visually replay the web browsing experience of your users.
Used in combination with RUM performance data, Session Replay can be an asset for error identification, reproduction, and resolution, and it can also bring invaluable insights into your web application’s usage patterns and design pitfalls.

## Collect Session Replay data

### Initial setup

To use Session Replay, set up [Datadog RUM Browser Monitoring][1]. Set up the following sections: application creation, client token generation, and RUM SDK setup.

Session Replay is available through a dedicated build of the RUM Browser SDK. To enable Session Replay, change the npm package name or CDN URL, depending on your chosen installation method:

#### npm
Replace the `@datadog/browser-rum package` with [`@datadog/browser-rum-recorder`][2] When `datadogRum.init()` is called, it also starts the Session Replay recording.

``` javascript
import { datadogRum } from '@datadog/browser-rum-recorder'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
})
```

#### CDN
Replace the Browser SDK URL `https://www.datadoghq-browser-agent.com/datadog-rum.js` with `https://www.datadoghq-browser-agent.com/datadog-rum-recorder.js`. When `DD_RUM.init()` is called, it also starts the Session Replay recording.

*Supported browsers*: The Session Replay recorder supports all the browsers supported by the RUM Browser SDK with the exception of IE11. See the [browser support table][3].

#### Configuration

The usual [RUM initialization parameters][4] are all supported. 

In addition, the Session Replay recorder accepts a `manualSessionReplayRecordingStart` option. If set to `true`, the Session Replay recording will not start automatically when calling `init()`. To then start the recording, call `startSessionReplayRecording()`. This can be useful to conditionally start the recording (e.g, to only record authenticated user sessions):

``` javascript
DD_RUM.init({
	manualSessionReplayRecordingStart: true
})
if (user.isAuthenticated) {
	DD_RUM.startSessionReplayRecording()
}
```

The Session Replay recording can be stopped by calling `stopSessionReplayRecording()`.

### Sensitive & personal data obfuscation

By default, any input events on HTML input elements of type `password`, `email` and `tel` are ignored.

These events can be ignored on other elements as well, by either setting the data attribute `data-dd-privacy` to `input-ignored`, or adding a class of `dd-privacy-input-ignored`. For example, any inputs on the following form will be ignored:

``` html
<form method="post" data-dd-privacy=”input-ignored”>
    <input type="text" name="name" id="name" required>
    <input type="number" name="age" id="age" required>
    <input type="email" name="email" id="email" required>
    <input type="submit" value="submit">
</form>
```

Additionally, HTML elements can be fully obfuscated. These elements are replaced with a white block at recording time, as seen in this example of the navbar of a replay of a Datadog session: 

{{< img src="real_user_monitoring/guide/replay-hidden.png" alt="Replay Hidden Example">}}

Obfuscate elements by setting the data attribute `data-dd-privacy` to hidden, or by adding a class of `dd-privacy-hidden`. Elements marked as hidden will *not* have their content recorded and the PII will not be sent to Datadog. For example, the following div will be obfuscated and replaced in the replay by a white block of the same size:

``` html
<div id=”profile-info” data-dd-privacy=”hidden”>
    <p>Name: John Doe</p>
    <p>Birth date: June 6th, 1987</p>
</div>
```

## Troubleshooting

### Some HTML elements are not visible at replay

Session Replay does not support the following HTML elements at the moment: `iframe`, `video`, `audio`, `canvas`, as well as Web Components.

### Fonts or images do not render properly

A Session Replay is not a video, but an actual iframe rebuilt based on snapshots of the DOM. The replay thus depends on the various assets of the page: fonts & images.

Several reasons might explain why assets are not available at the time of the replay.

1. The resource does not exist anymore. For example, it was part of a previous deployment.
2. The resource is inaccessible. For example, authentication might be required, or the resource might only be accessible from an internal network.
3. The resource is blocked by the browser due to CORS (typically, web-fonts). 
The replay being rendered on the `app.datadoghq.com` domain, the assets requests are subject to cross origin security checks by your browser. If the given asset is not authorised for the domain, your browser blocks the request.
The fix is thus to allow `app.datadoghq.com` through the [`Access-Control-Allow-Origin`][5] header for any font or image assets your website depends upon, ensuring these resources are accessible for the replay.
To learn more about Cross Origin Resource Sharing, see the [MDN Web Docs article][6].

### CSS rules not properly applied / mouse hover not replayed 

Unlike fonts and images, the recorder tries to bundle the various CSS rules applied as part of the recording data, leveraging the [CSSStyleSheet][7] interface. If this is not possible, it falls back to recording the links to the CSS files.

**Note**: For proper mouse hover support, the CSS rules must be accessible through the CSSStyleSheet interface.

If the stylesheets are hosted on a different domain than the web page, access to the CSS rules is subject to cross-origin security checks by the browser, and the browser must be instructed to load the stylesheet leveraging CORS using the [crossorigin][8] attribute.

For example, if your application is on the `example.com` domain and depends on a CSS file on `assets.example.com` via a link element, the `crossoriring` attribute should be set to `anonymous`, unless credentials are required:

``` html
<link rel="stylesheet" crossorigin="anonymous"
      href="https://assets.example.com/style.css”>
```

Additionally, authorize the `example.com` domain in the `assets.example.com`. This allows the assets file to load the resource by setting the [`Access-Control-Allow-Origin`][5] header.

## Frequently asked questions

### How does it work?

The Session Replay Recorder, part of the RUM Browser SDK, takes a snapshot of the DOM + CSS. It then tails & records events happening on the web page (DOM modification, mouse move, clicks, input events, …) along with their timestamp.

On the Datadog replay view, we rebuild the page and re-apply the recorded events at the right time.

The browser SDK is [open source][10], and leverages the open source project [rrweb][9].

### What is the performance impact?

The team is is focused on ensuring minimal impact of the Session Replay recorder on the applications performance: 

- reduced network impact of Session Replay by compressing the data prior to sending it to Datadog
- reduced load on the browser’s UI thread by delegating most of the CPU intensive work (like compression) to a background service worker.

Expected Network bandwidth impact is less than 100Kb/min. Refined estimates will be available after more data is received from Early Adopters.

### How long is a Session Replay available?

Session Replay follows the same 30 days retention policy as normal RUM sessions.

[1]: /real_user_monitoring/browser/#setup
[2]: https://www.npmjs.com/package/@datadog/browser-rum-recorder
[3]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[4]: /real_user_monitoring/browser/#initialization-parameters
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
[8]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[9]: https://www.rrweb.io/
[10]: https://github.com/DataDog/browser-sdk
