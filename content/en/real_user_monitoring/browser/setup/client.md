---
title: Browser Monitoring Client-Side Instrumentation
description: "Set up RUM Browser SDK using client-side instrumentation with NPM or CDN to monitor user experience, performance, and errors in web applications."
aliases:
  - /real_user_monitoring/setup
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

## Overview

The Datadog Browser SDK enables Real User Monitoring (RUM) for your web applications, providing comprehensive visibility into user experience and application performance. With RUM, you can monitor page load times, user interactions, resource loading, and application errors in real-time.

RUM helps you:
- Monitor user experience with detailed performance metrics for page loads, user actions, and resource requests
- Track user journeys through your application with Session Replay capabilities
- Identify performance bottlenecks and correlate frontend and backend performance with APM traces

The Browser SDK supports all modern desktop and mobile browsers and provides automatic collection of key performance metrics, user interactions, and application errors. After setup, you can manage your RUM configurations per application in Datadog and visualize the collected data in dashboards and the RUM Explorer.

## Setup

To set up Browser Monitoring manually, create an application in Datadog:

1. In Datadog, navigate to the [**Digital Experience** > **Add an Application**][1] page and select the JavaScript (JS) application type.
   - By default, automatic user data collection is enabled. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Browser Data Collected][2].
   - Enter a name for your application. This generates a `clientToken` and an `applicationId` for your application automatically.
   - Choose the installation type for the RUM Browser SDK: [npm](#npm), or a hosted version ([CDN async](#cdn-async) or [CDN sync](#cdn-sync)).
   - Define the environment name and service name for your application to use unified service tagging for [RUM & Session Replay][3]. Set a version number for your deployed application in the initialization snippet. For more information, see [Tagging](#tagging).
   - Set the sampling rate of total user sessions collected and use the slider to set the percentage of total [Browser RUM & Session Replay][4] sessions collected. Browser RUM & Session Replay sessions include resources, long tasks, and replay recordings. For more information about configuring the percentage of Browser RUM & Session Replay sessions collected from the total amount of user sessions, see [Configure Your Setup For Browser and Browser RUM & Session Replay Sampling][4].
   - Click the **Session Replay Enabled** toggle to access replay recordings in [Session Replay][5].
   - Select a [privacy setting][6] for Session Replay in the dropdown menu.
2. Deploy the changes to your application. Once your deployment is live, Datadog collects events from your users' browsers.
3. Visualize the [data collected][2] in [dashboards][7] or create a search query in the [RUM Explorer][8].
4. (Optional) Initialize the RUM SDK with the `allowedTracingUrls` parameter to [Connect RUM and Traces][9] if you want to start linking requests from your web and mobile applications to their corresponding backend traces. See the full list of [initialization parameters](#initialization-parameters).
5. If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the RUM section of the CSP documentation][10] for additional setup steps.

Until Datadog starts receiving data, your application appears as `pending` on the **RUM Applications** page.

### Choose the right installation method

Server-side (Auto-Instrumentation)
: This method installs RUM by configuring your server to inject the SDK. RUM SDK injection is in Preview. Learn more about the [auto-instrumentation method][11].

npm (node package manager)
: This method is recommended for modern web applications. The RUM Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

CDN async
: This method is recommended for web applications with performance targets. The RUM Browser SDK loads from Datadog's CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

CDN sync
: This method is recommended for collecting all RUM events. The RUM Browser SDK loads from our CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

### npm

Add [@datadog/browser-rum](https://www.npmjs.com/package/@datadog/browser-rum) to your `package.json` file, then initialize it with:

{{% collapse-content title="Latest version" level="h4" expanded="true" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
  enablePrivacyForActionName: true,
});
```

{{% /collapse-content %}}

{{% collapse-content title="Before v5.0.0" level="h4" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  trackResources: true,
  trackLongTasks: true,
  trackUserInteractions: true,
});
datadogRum.startSessionReplayRecording();
```
{{% /collapse-content %}}

{{% collapse-content title="Before v4.30.0" level="h4" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100, // if not included, the default is 100
  trackResources: true,
  trackLongTasks: true,
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

{{% /collapse-content %}}

{{% collapse-content title="Before v4.20.0" level="h4" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  premiumSampleRate: 100, // if not included, the default is 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

{{% /collapse-content %}}

{{% collapse-content title="Before v4.10.2" level="h4" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: '<DATADOG_SITE>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  replaySampleRate: 100, // if not included, the default is 100
  trackInteractions: true,
});
datadogRum.startSessionReplayRecording();
```

{{% /collapse-content %}}


The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

### CDN async

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application. For **{{<region-param key="dd_site_name">}}** site:

{{% collapse-content title="Latest version" level="h4" expanded="true" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v6.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v6.0.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v5.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v5.0.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
     });
    window.DD_RUM.startSessionReplayRecording();
   })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.30.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.20.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
   window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.10.2" level="h4" %}}

{{< site-region region="us" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM.startSessionReplayRecording();
  })
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

Early RUM API calls must be wrapped in the `window.DD_RUM.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.


The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

### CDN sync

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors. For **{{<region-param key="dd_site_name">}}** site:

{{% collapse-content title="Latest version" level="h4" expanded="true" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v6.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v6.0.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v5.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      enablePrivacyForActionName: true,
    });
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v5.0.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.30.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.20.0" level="h4" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      premiumSampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

{{% collapse-content title="Before v4.10.2" level="h4" %}}

{{< site-region region="us" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap1.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/ap2/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ap2.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.eu',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us3.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'us5.datadoghq.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'ddog-gov.com',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100, // if not included, the default is 100
      trackInteractions: true,
    });
  window.DD_RUM &&
    window.DD_RUM.startSessionReplayRecording();
</script>
```
{{</ site-region>}}

{{% /collapse-content %}}

The `window.DD_RUM` check is used to prevent issues if a loading failure occurs with the RUM Browser SDK.

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

### TypeScript

Types are compatible with TypeScript >= 3.8.2. To initialize the SDK, use the following code snippet.

<div class="alert alert-info"><strong>Note</strong>: For earlier versions of TypeScript, import JavaScript sources and use global variables to avoid any compilation issues.</div>

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  ...
})
```

## Configuration

### Initialization parameters

Refer to the [Browser SDK API Reference][12] for the full list of available configuration options.

### Tagging

A service is an independent, deployable code repository that maps to a set of pages.

- If your browser application was constructed as a monolith, your Datadog application has one service name for the application.
- If your browser application was constructed as separate repositories for multiple pages, edit the default service names throughout the lifecycle of your application.

### Access internal context

After the Datadog browser RUM SDK is initialized, you can access the internal context of the SDK.

You can explore the following attributes:

| Attribute      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID of the application.                                            |
| session_id     | ID of the session.                                                |
| user_action    | Object containing action ID (or undefined if no action is found). |
| view           | Object containing details about the current view event.           |

For more information, see [RUM Browser Data Collected][2].

#### Example

```
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

You can optionally use `startTime` parameter to get the context of a specific time. If the parameter is omitted, the current context is returned.

```
getInternalContext (startTime?: 'number' | undefined)
```

#### NPM

For NPM, use:

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

#### CDN async

For CDN async, use:

```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```

#### CDN sync

For CDN sync, use:

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/data_collected/
[3]: /getting_started/tagging/using_tags/?tab=assignment#rum--session-replay
[4]: /real_user_monitoring/guide/sampling-browser-plans/
[5]: /real_user_monitoring/session_replay/browser/
[6]: /real_user_monitoring/session_replay/browser/privacy_options/
[7]: /real_user_monitoring/platform/dashboards/
[8]: https://app.datadoghq.com/rum/sessions
[9]: /real_user_monitoring/correlate_with_other_telemetry/apm/
[10]: /integrations/content_security_policy_logs/
[11]: /real_user_monitoring/browser/setup/server
[12]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
