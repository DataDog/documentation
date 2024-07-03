---
title: RUM Browser Monitoring Setup
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

The RUM Browser SDK supports all modern desktop and mobile browsers including IE11. For more information, see the [Browser Support][1] table.

The responsibility of keeping user data secure is shared between Datadog and developers who leverage the RUM SDKs. Learn more about [Shared responsibility][2].

## Setup

{{< callout url="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/" btn_hidden="false" header="Join the Beta!">}}
RUM SDK Injection is in private beta. Complete the form to request access.
{{< /callout >}}

To set up RUM Browser Monitoring, create a RUM application:

1. In Datadog, navigate to the [**Digital Experience** > **Add an Application** page][3] and select the JavaScript (JS) application type.
   - By default, automatic user data collection is enabled. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Browser Data Collected][4].
   - Enter a name for your application and click **Generate Client Token**. This generates a `clientToken` and an `applicationId` for your application.
   - Choose the installation type for the RUM Browser SDK: [npm](#npm), or a hosted version ([CDN async](#cdn-async) or [CDN sync](#cdn-sync)).
   - Define the environment name and service name for your application to use unified service tagging for [RUM & Session Replay][5]. Set a version number for your deployed application in the initialization snippet. For more information, see [Tagging](#tagging).
   - Set the sampling rate of total user sessions collected and use the slider to set the percentage of total [Browser RUM & Session Replay][6] sessions collected. Browser RUM & Session Replay sessions include resources, long tasks, and replay recordings. For more information about configuring the percentage of Browser RUM & Session Replay sessions collected from the total amount of user sessions, see [Configure Your Setup For Browser and Browser RUM & Session Replay Sampling][7].
   - Click the **Session Replay Enabled** toggle to access replay recordings in [Session Replay][8].
   - Select a [privacy setting][9] for Session Replay in the dropdown menu.
2. Deploy the changes to your application. Once your deployment is live, Datadog collects events from your users' browsers.
3. Visualize the [data collected][4] in [dashboards][10] or create a search query in the [RUM Explorer][11].
4. (Optional) Initialize the RUM SDK with the `allowedTracingUrls` parameter to [Connect RUM and Traces][12] if you want to start linking requests from your web and mobile applications to their corresponding backend traces. See the full list of [initialization parameters](#initialization-parameters).
5. If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the RUM section of the CSP documentation][13] for additional setup steps.

Until Datadog starts receiving data, your application appears as `pending` on the **RUM Applications** page.

### Choose the right installation method

SDK injection
: This method installs RUM by configuring your server to inject the SDK. RUM SDK injection is in private beta. To use this feature, [request access to RUM SDK injection][28].

npm (node package manager)
: This method is recommended for modern web applications. The RUM Browser SDK is packaged with the rest of your front-end JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

CDN async
: This method is recommended for web applications with performance targets. The RUM Browser SDK loads from our CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

CDN sync
: This method is recommended for collecting all RUM events. The RUM Browser SDK loads from our CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

### npm

Add [`@datadog/browser-rum`][14] to your `package.json` file, then initialize it with:

<details open>
  <summary>Latest version</summary>

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

</details>

<details>
  <summary>before <code>v5.0.0</code></summary>

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

</details>

<details>
  <summary>before <code>v4.30.0</code></summary>

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

</details>

<details>
  <summary>before <code>v4.20.0</code></summary>

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

</details>

<details>
  <summary>before <code>v4.10.2</code></summary>

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

</details>

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

### CDN async

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application. For **{{<region-param key="dd_site_name">}}** site:

<details open>
  <summary>Latest version</summary>

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

</details>

<details>
  <summary>before<code>v5.0.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.30.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.20.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.10.2</code></summary>

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

</details>

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

Early RUM API calls must be wrapped in the `window.DD_RUM.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

### CDN sync

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors. For **{{<region-param key="dd_site_name">}}** site:

<details open>
  <summary>Latest version</summary>

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

</details>

<details>
  <summary>before<code>v5.0.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.30.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.20.0</code></summary>

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

</details>

<details>
  <summary>before<code>v4.10.2</code></summary>

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

</details>

The `trackUserInteractions` parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained in your pages may be included to identify the elements interacted with.

The `window.DD_RUM` check is used to prevent issues if a loading failure occurs with the RUM Browser SDK.

### TypeScript

Types are compatible with TypeScript >= 3.8.2. For earlier versions, import JavaScript sources and use global variables to avoid any compilation issues:

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

Call the initialization command to start tracking. The following parameters are available:

`applicationId`
: Required<br/>
**Type**: String<br/>
The RUM application ID.

`clientToken`
: Required<br/>
**Type**: String<br/>
A [Datadog client token][15].

`site`
: Required<br/>
**Type**: String<br/>
**Default**: `datadoghq.com`<br/>
[The Datadog site parameter of your organization][16].

`service`
: Optional<br/>
**Type**: String<br/>
The service name for your application. Follows the [tag syntax requirements][17].

`env`
: Optional<br/>
**Type**: String<br/>
The application's environment, for example: prod, pre-prod, and staging. Follows the [tag syntax requirements][17].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version, for example: 1.2.3, 6c44da20, and 2020.02.13. Follows the [tag syntax requirements][17].

`trackingConsent`
: Optional<br/>
**Type**: `"granted"` or `"not-granted"`<br/>
**Default**: `"granted"`<br/>
Set the initial user tracking consent state. See [User Tracking Consent][18].

`trackViewsManually`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Allows you to control RUM views creation. See [override default RUM view names][19].

`trackUserInteractions`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables [automatic collection of users actions][20].

`trackResources`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of resource events.

`trackLongTasks`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of long task events.

`defaultPrivacyLevel`
: Optional<br/>
**Type**: String<br/>
**Default**: `mask` <br/>
See [Session Replay Privacy Options][21].

`enablePrivacyForActionName`
: Optional<br/>
**Type**: String<br/>
See [Mask Action Names][29].

`actionNameAttribute`
: Optional<br/>
**Type**: Boolean<br/>
Specify your own attribute to be used to [name actions][22].

`sessionSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events. For more details about `sessionSampleRate`, see the [sampling configuration][7].

`sessionReplaySampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `0`<br/>
The percentage of tracked sessions with [Browser RUM & Session Replay pricing][6] features: `100` for all, `0` for none. For more details about `sessionReplaySampleRate`, see the [sampling configuration][7].

`startSessionReplayRecordingManually`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
If the session is sampled for Session Replay, only start the recording when `startSessionReplayRecording()` is called, instead of at the beginning of the session. See [Session Replay Usage][23] for details.

`silentMultipleInit`
: Optional<br/>
**Type**: Boolean <br/>
**Default**: `false`<br/>
Initialization fails silently if the RUM Browser SDK is already initialized on the page.

`proxy`
: Optional<br/>
**Type**: String<br/>
Optional proxy URL, for example: https://www.proxy.com/path. For more information, see the full [proxy setup guide][24].

`allowedTracingUrls`
: Optional<br/>
**Type**: List<br/>
A list of request URLs used to inject tracing headers. For more information, see [Connect RUM and Traces][12].

`traceSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of requests to trace: `100` for all, `0` for none. For more information, see [Connect RUM and Traces][12].

`telemetrySampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
Telemetry data (such as errors and debug logs) about SDK execution is sent to Datadog in order to detect and solve potential issues. Set this option to `0` to opt out from telemetry collection.

`excludedActivityUrls`
: Optional<br/>
**Type**: List<br/>
A list of request origins ignored when computing the page activity. See [How page activity is calculated][11].

`workerUrl`
: Optional<br/>
**Type**: String<br/>
URL pointing to the Datadog Browser SDK Worker JavaScript file. The URL can be relative or absolute, but is required to have the same origin as the web application. See [Content Security Policy guidelines][13] for more information.

`compressIntakeRequests`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Compress requests sent to the Datadog intake to reduce bandwidth usage when sending large amounts of data. The compression is done in a Worker thread. See [Content Security Policy guidelines][13] for more information.

`storeContextsAcrossPages`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Store global context and user context in `localStorage` to preserve them along the user navigation. See [Contexts life cycle][25] for more details and specific limitations.

`allowUntrustedEvents`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Allow capture of [untrusted events][26], for example in automated UI tests.

Options that must have matching configuration when you are using the Logs Browser SDK:

`trackSessionAcrossSubdomains`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Preserve the session across subdomains for the same site.

`useSecureSessionCookie`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Use a secure session cookie. This disables RUM events sent on insecure (non-HTTPS) connections.

`usePartitionedCrossSiteSessionCookie`
: Optional<br/>
**Type**: Boolean<br/>
**Default**:`false`<br/>
Use a partitioned secure cross-site session cookie. This allows the RUM Browser SDK to run when the site is loaded from another one (iframe). Implies `useSecureSessionCookie`.

`useCrossSiteSessionCookie`
: Optional - **Deprecated**<br/>
**Type**: Boolean<br/>
**Default**:`false`<br/>
See `usePartitionedCrossSiteSessionCookie`.

`allowFallbackToLocalStorage`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Allows the use of `localStorage` when cookies cannot be set. This enables the RUM Browser SDK to run in environments that do not provide cookie support. See [Monitor Electron Applications Using the Browser SDK][27] for a typical use-case.

### Tagging

A service is an independent, deployable code repository that maps to a set of pages.

- If your browser application was constructed as a monolith, your RUM application has one service name for the application.
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

For more information, see [RUM Browser Data Collected][4].

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

[1]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/BROWSER_SUPPORT.md
[2]: /data_security/real_user_monitoring/#shared-responsibility
[3]: https://app.datadoghq.com/rum/list
[4]: /real_user_monitoring/data_collected/
[5]: /getting_started/tagging/using_tags
[6]: https://www.datadoghq.com/pricing/?product=real-user-monitoring--session-replay#real-user-monitoring--session-replay
[7]: /real_user_monitoring/guide/sampling-browser-plans/
[8]: /real_user_monitoring/session_replay/browser/
[9]: /real_user_monitoring/session_replay/browser/privacy_options
[10]: /real_user_monitoring/platform/dashboards/
[11]: /real_user_monitoring/browser/monitoring_page_performance/#how-page-activity-is-calculated
[12]: /real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[13]: /integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[14]: https://www.npmjs.com/package/@datadog/browser-rum
[15]: /account_management/api-app-keys/#client-tokens
[16]: /getting_started/site/
[17]: /getting_started/tagging/#define-tags
[18]: /real_user_monitoring/browser/advanced_configuration/#user-tracking-consent
[19]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[20]: /real_user_monitoring/browser/tracking_user_actions
[21]: /real_user_monitoring/session_replay/privacy_options?tab=maskuserinput
[22]: /real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[23]: /real_user_monitoring/session_replay/browser/#usage
[24]: /real_user_monitoring/guide/proxy-rum-data/
[25]: /real_user_monitoring/browser/advanced_configuration#contexts-life-cycle
[26]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[27]: /real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk
[28]: https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/
[29]: /real_user_monitoring/session_replay/browser/privacy_options/#mask-action-names
