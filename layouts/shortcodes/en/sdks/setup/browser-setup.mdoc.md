<!--
Pages using this partial must declare these filters:

content_filters:
  - trait_id: sdk
    option_group_id: sdk_platform_options
    label: "SDK"
-->

### Create the application in the UI

1. Navigate to [**Digital Experience** > **Add an Application**][1].
2. Select `Javascript` as the application type and enter an application name to generate a unique Datadog application ID and client token.

### Install the Browser SDK

Choose the installation method for the Browser SDK.

{% tabs %}
{% tab label="npm" %}

Installing through npm (Node Package Manager) is recommended for modern web applications. The Browser SDK is packaged with the rest of your frontend JavaScript code. It has no impact on page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized. Datadog recommends using a matching version with the Browser Logs SDK.

Add [`@datadog/browser-rum`][2] to your `package.json` file, for example if you use npm cli:

```shell
npm install @datadog/browser-rum --save
```

{% /tab %}
{% tab label="CDN async" %}

Installing through CDN async is recommended for web applications with performance targets. The Browser SDK loads from Datadog's CDN asynchronously, ensuring the SDK download does not impact page load performance. However, the SDK may miss errors, resources, and user actions triggered before the SDK is initialized.

Add the generated code snippet to the head tag of every HTML page you want to monitor in your application.

```javascript
<script>
  (function(h,o,u,n,d) {
    h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
    d=o.createElement(u);d.async=1;d.src=n
    n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/{% region-param key="dd_site_name" lowercase="true" /%}/v6/datadog-rum.js','DD_RUM')
</script>
```

{% /tab %}

{% tab label="CDN sync" %}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Placing the script tag higher and loading it synchronously ensures Datadog RUM can collect all performance data and errors.

```javascript
<script
    src="https://www.datadoghq-browser-agent.com/us1/{% region-param key="dd_site_name" lowercase="true" /%}/v6/datadog-rum.js"
    type="text/javascript">
</script>
```

{% /tab %}
{% /tabs %}

### Initialize the Browser SDK

The SDK should be initialized as early as possible in the app lifecycle. This ensures all measurements are captured correctly.

In the initialization snippet, set an environment name, service name, and client token.

{% tabs %}
{% tab label="npm" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   applicationId: '<APP_ID>',
   clientToken: '<CLIENT_TOKEN>',
   service: '<SERVICE>',
   env: '<ENV_NAME>',
   // site: '<SITE>',
   // version: '1.0.0',
   trackUserInteractions: true,
   trackResources: true
});

```

{% /tab %}
{% tab label="CDN async" %}

```javascript
<script>
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
  })
</script>
```

{% /tab %}
{% tab label="CDN sync" %}

Installing through CDN sync is recommended for collecting all events. The Browser SDK loads from Datadog's CDN synchronously, ensuring the SDK loads first and collects all errors, resources, and user actions. This method may impact page load performance.

Add the generated code snippet to the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Placing the script tag higher and loading it synchronously ensures Datadog RUM can collect all performance data and errors.

```javascript
<script>
    window.DD_RUM && window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APP_ID>',
      // site: '<SITE>',
      service: '<APP_ID>',
      env: '<ENV_NAME>',
      // version: '1.0.0'
    });
</script>
```

{% /tab %}
{% /tabs %}

The Browser SDK automatically tracks user sessions depending on options provided at the SDK initialization. To add GDPR compliance for your EU users and other [initialization parameters][3] to the SDK configuration, see the [Set tracking consent documentation](#set-tracking-consent-gdpr-compliance).

{% collapse-content title="Sample the sessions" level="h4" %}

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while initializing the Browser SDK. The rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

For example, to only keep 50% of sessions use:

{% tabs %}
{% tab label="npm" %}

```javascript
  import { datadogRum } from '@datadog/browser-rum';

  datadogRum.init({
    ...,
    sessionSampleRate: 50
  });
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
  window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...,
      sessionSampleRate: 50
    });
  })
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
 window.DD_RUM && window.DD_RUM.init({
    ...,
    sessionSampleRate: 50
  });
```

{% /tab %}
{% /tabs %}
{% /collapse-content %}

{% collapse-content title="Set tracking consent (GDPR compliance)" level="h4" %}

To be compliant with GDPR, CCPA, and similar regulations, the Browser SDK lets you provide the tracking consent value at initialization. For more information on tracking consent, see [Data Security][5].

The `trackingConsent` initialization parameter can be one of the following values:

1. `"granted"`: The RUM Browser SDK starts collecting data and sends it to Datadog.
2. `"not-granted"`: The RUM Browser SDK does not collect any data.

To change the tracking consent value after the RUM Browser SDK is initialized, use the `setTrackingConsent()` API call. The RUM Browser SDK changes its behavior according to the new value:

* when changed from `"granted"` to `"not-granted"`, the RUM session is stopped, data is no longer sent to Datadog.
* when changed from `"not-granted"` to `"granted"`, a new RUM session is created if no previous session is active, and data collection resumes.

This state is not synchronized between tabs nor persisted between navigation. It is your responsibility to provide the user decision during RUM Browser SDK initialization or by using `setTrackingConsent()`.

When `setTrackingConsent()` is used before `init()`, the provided value takes precedence over the initialization parameter.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```

{% /tab %}
{% /tabs %}
{% /collapse-content %}

### Add readable stack traces to errors (optional but recommended)

Upload your JavaScript source maps to access unminified stack traces. See the [source map upload guide][6].


[1]: https://app.datadoghq.com/rum/application/create
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: https://app.datadoghq.com/error-tracking/settings/setup/client
[5]: /data_security/real_user_monitoring/
[6]: /real_user_monitoring/guide/upload-javascript-source-maps
