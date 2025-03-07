---
title: Instrumenting IBM HTTP Server 
beta: true
code_lang: ibm
type: multi-code-lang
code_lang_weight: 4
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

<div class="alert alert-info">RUM SDK Auto-Injection for IBM HTTP is in Preview.</div>

{{% rum-browser-setup-limitations-prereqs %}}

## Set up your RUM application

The Auto-Instrumentation method leverages the [IBM httpd Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses
identified as HTML.

For more granular control over instrumented RUM application, you can also manually install and configure the module.

### Installation

{{< tabs >}}
{{% tab "Automatic installation (recommended)" %}}

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][1] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **httpd**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][2].
4. Copy and run the installer command to load the Datadog httpd Module with the RUM SDK Injector onto httpd.
5. After the installer successfully installs the SDK Injector, restart IBM HTTP Server to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the error logs for relevant messages. The module logs important steps during the injection process. Ensure that IBM HTTP Server is configured with at least the `info` log level.

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/guide/sampling-browser-plans/

{{% /tab %}}

{{% tab "Manual configuration" %}}

### Download the module file

1. Download the [zipped module][1].
2. Extract the zip to obtain the `mod_datadog.so` file. Move it to a location that IBM HTTP Server has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

### Update IBM HTTP server configuration

1. Locate the configuration file. You can use `apachectl -V` to find the default configuration path. Add the following line to load the module:

   ```javascript
   LoadModule datadog_module <RUM_MODULE_PATH>
   ```

2. Within the appropriate **root or location** section, add the following:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing
   DatadogTracing Off
   DatadogRum On
   <DatadogRumSettings "v6">
       DatadogRumOption "applicationId" "<DATADOG_APPLICATION_ID>"
       DatadogRumOption "clientToken" "<DATADOG_CLIENT_TOKEN>"
       DatadogRumOption "site" "<DATADOG_SITE>"
       DatadogRumOption "service" "my-web-application"
       DatadogRumOption "env" "production"
       DatadogRumOption "version" "1.0.0"
       DatadogRumOption "sessionSampleRate" "100"
       DatadogRumOption "sessionReplaySampleRate" "100"
       DatadogRumOption "trackResources" "true"
       DatadogRumOption "trackLongTasks" "true"
       DatadogRumOption "trackUserInteractions" "true"
   </DatadogRumSettings>
   ```

### Restart your server

1. Restart the IBM HTTP Server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the httpd error logs for relevant messages. The module logs important steps during the injection process. Ensure that IBM HTTP Server is configured with at least the `info` log level.

[1]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.
- **Upstream server has end-to-end encryption or content compression**: See [Limitations][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/
[2]: /agent/
[3]: https://httpd.apache.org/modules/
[4]: /real_user_monitoring/browser/setup/server/ibm/#limitations
