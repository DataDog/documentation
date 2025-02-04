---
title: Browser Monitoring Server-Side (Auto) Instrumentation
beta: true
code_lang: server
type: multi-code-lang
code_lang_weight: 2
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

<div class="alert alert-info">To try the preview for RUM SDK Auto-Injection, follow the setup instructions below.</div>

## Overview

Datadog RUM Server-Side Instrumentation (Auto-Instrumentation) lets you opt into Real User Monitoring (RUM) automatically by instrumenting web applications served through a web server or proxy.

RUM Auto-Instrumentation works by injecting a RUM SDK JavaScript scriptlet into the HTML responses being served through a web server or proxy.

After your applications have been instrumented, you can configure your RUM application in Datadog.

## Limitations

The available functionality has the following important limitations:

- If proxying compressed traffic, the Auto-Instrumentation method is not able to inject the JS scriptlet into the HTML traffic.
- This instrumentation method does not support any [advanced RUM configurations][3]. However, `allowedTracingUrls` and `excludedActivityUrls` are supported for NGINX web servers.
- If acting as a proxy and the upstream server has end-to-end encryption (like TLS) enabled, the module cannot inject RUM. Ensure the web server is set up for TLS origination for successful instrumentation.
- (Windows IIS only) Configuration for Auto-Instrumentation is only available per Windows IIS site.

## Prerequisites

The automatic installation method requires that you have the [Datadog Agent][2] installed.

## Set up your RUM application

<div class="alert alert-warning">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

{{< tabs >}}
{{% tab "NGINX" %}}

The Auto-Instrumentation method leverages the [NGINX Dynamic Modules capability][1] to implement a response body filter. The filter injects the RUM SDK into the response body for responses 
identified as HTML. For more granular control over how configuration files or permissions are handled, you can also install NGINX manually.

[1]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/


{{% collapse-content title="Automatic installation (recommended)" level="h5" %}}

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][1] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][2].
4. Copy and run the installer command to load the Datadog NGINX Module with the RUM SDK Injector onto NGINX.
5. After the installer successfully installs the SDK Injector, restart NGINX to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Ensure that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/guide/sampling-browser-plans/

{{% /collapse-content %}}

{{% collapse-content title="Manual configuration" level="h5" %}}

### Download the appropriate `.tgz` file

1. Use the `.tgz` file corresponding to your version of NGINX. You can find all the relevant `.tgz` files listed by NGINX version under [Reference](#reference).
2. Extract the tarball to extract the `ngx_http_datadog_module.so` file. Move it to a location that NGINX has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

### Update NGINX configuration
1. The `nginx.conf` file is usually located in NGINX's configuration directory. Add the following line to load the module:

   ```javascript
   load_module <RUM_MODULE_PATH>;
   ```

2. Then in the **http/server/location** section, add the following:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing.
   datadog_disable;
   datadog_rum on;
   datadog_rum_config "v5" {
     "applicationId" "<DATADOG_APPLICATION_ID>";
     "clientToken" "<DATADOG_CLIENT_TOKEN>";
     "site" "<DATADOG_SITE>";
     "service" "my-web-application";
     "env" "production";
     "version" "1.0.0";
     "sessionSampleRate" "100";
     "sessionReplaySampleRate" "100";
     "trackResources" "true";
     "trackLongTasks" "true";
     "trackUserInteractions" "true";
   }
   ```

### Restart your server

1. Restart the NGINX server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Ensure that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "httpd" %}}

The Auto-Instrumentation method leverages the [Apache httpd Modules capability][1] to implement a response body filter. The filter injects the RUM SDK into the response body for responses
identified as HTML. For more granular control over how configuration files or permissions are handled, you can also install Apache httpd Server manually.

[1]: https://httpd.apache.org/modules/


{{% collapse-content title="Automatic installation (recommended)" level="h5" %}}

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][1] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **httpd**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][2].
4. Copy and run the installer command to load the Datadog httpd Module with the RUM SDK Injector onto httpd.
5. After the installer successfully installs the SDK Injector, restart httpd to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Ensure that httpd is configured with at least the `info` log level.

[1]: https://app.datadoghq.com/rum/list
[2]: /real_user_monitoring/guide/sampling-browser-plans/

{{% /collapse-content %}}

{{% collapse-content title="Manual configuration" level="h5" %}}

### Download the module file

1. Download the [zipped module][1].
2. Extract the zip to obtain the `mod_datadog.so` file. Move it to a location that httpd has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

[1]: https://rum-auto-instrumentation.s3.amazonaws.com/httpd/latest/mod_datadog-amd64.zip

### Update httpd configuration
1. Locate the configuration file. You can use `apachectl -V` to see the configuration path. Add the following line to load the module:

   ```javascript
   LoadModule datadog_module <RUM_MODULE_PATH>
   ```

2. Then in the appropriate **root or location** section, add the following:

   ```javascript
   # APM Tracing is enabled by default. The following line disables APM Tracing
   DatadogTracing Off
   DatadogRum On
   <DatadogRumSettings>
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

1. Restart the httpd server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the httpd error logs for relevant messages. The module logs important steps during the injection process. Ensure that httpd is configured with at least the `info` log level.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Windows IIS" %}}

Auto-Instrumentation leverages a Windows module that injects the RUM SDK into the response body for responses served by the IIS instance.

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][1] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **Windows IIS**.
3. Set up the IIS module using either the GUI installer or command line as described below:

[1]: https://app.datadoghq.com/rum/list/create/

{{% collapse-content title="Using the GUI installer (recommended)" level="h5" %}}

1. Download the Datadog RUM installer.
2. Follow the installer as an administrator by opening the `.msi` file.
3. Follow the prompts and accept the license agreement.
4. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
5. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

{{% collapse-content title="Using the command line" level="h5" %}}

1. Run the Powershell command line as an administrator.
2. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][1].
3. Copy and run the config command shown for each IIS site that you wish to inject RUM into.

[1]: /real_user_monitoring/guide/best-practices-for-rum-sampling/

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

{{< tabs >}}
{{% tab "NGINX" %}}

To update your RUM Application:

1. Go to your RUM application from the [Application Management][1] list.
2. On the Instrument your application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and paste the configuration snippet to your `NGINX.conf` file.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "httpd" %}}

To update your RUM Application:

1. Go to your RUM application from the [Application Management][1] list.
2. On the Instrument your application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and paste the configuration snippet to your `/opt/datadog-httpd/datadog.conf` file.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}

{{% tab "Windows IIS" %}}

To update your RUM Application:

1. Go to your RUM application from the [Application Management][1] list.
2. On the Instrument Your Application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and replace the code in the Datadog RUM config file for the IIS site that you instrumented.

[1]: https://app.datadoghq.com/rum/list

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### NGINX stops responding

Since the module is in Preview, it's possible NGINX may stop serving requests, particularly after installation. If you experience this issue, contact [Datadog support][4] with the following information to help us investigate and resolve the issue:

- Your NGINX configuration file
- Any relevant error logs

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.
- **Content compression by upstream server**: If NGINX is acting as a proxy and the upstream server has content compression (like gzip, zstd, or Brotli) enabled, the module may not inject RUM. Ensure that content compression is disabled on the upstream server and configure NGINX to compress the content.

## Reference

### NGINX modules

| Nginx version | amd64 | arm 64 |
|---------------|-------|--------|
| 1.22.0 | [ngx_http_datadog-amd64-1.22.0][5] | [ngx_http_datadog-arm64-1.22.0][6] |
| 1.22.1 | [ngx_http_datadog-amd64-1.22.1][7] | [ngx_http_datadog-arm64-1.22.1][8] |
| 1.23.0 | [ngx_http_datadog-amd64-1.23.0][9] | [ngx_http_datadog-arm64-1.23.0][10] | 
| 1.23.1 | [ngx_http_datadog-amd64-1.23.1][11] | [ngx_http_datadog-arm64-1.23.1][12] | 
| 1.23.2 | [ngx_http_datadog-amd64-1.23.2][13] | [ngx_http_datadog-arm64-1.23.2][14] | 
| 1.23.3 | [ngx_http_datadog-amd64-1.23.3][15] | [ngx_http_datadog-arm64-1.23.3][16] | 
| 1.23.4 | [ngx_http_datadog-amd64-1.23.4][17] | [ngx_http_datadog-arm64-1.23.4][18] | 
| 1.24.0 | [ngx_http_datadog-amd64-1.24.0][19] | [ngx_http_datadog-arm64-1.24.0][20] | 
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][21] | [ngx_http_datadog-arm64-1.25.0][22] | 
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][23] | [ngx_http_datadog-arm64-1.25.1][24] | 
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][25] | [ngx_http_datadog-arm64-1.25.2][26] | 
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][27] | [ngx_http_datadog-arm64-1.25.3][28] | 
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][29] | [ngx_http_datadog-arm64-1.25.4][30] | 
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][31] | [ngx_http_datadog-arm64-1.25.5][32] | 
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][33] | [ngx_http_datadog-arm64-1.26.0][34] | 
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][35] | [ngx_http_datadog-arm64-1.26.1][36] | 
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][37] | [ngx_http_datadog-arm64-1.26.2][38] | 
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][39] | [ngx_http_datadog-arm64-1.27.0][40] | 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/
[2]: /agent/
[3]: /real_user_monitoring/browser/advanced_configuration/
[4]: /help
[5]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.0.so.tgz
[6]:https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.0.so.tgz
[7]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.1.so.tgz
[8]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.1.so.tgz
[9]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.0.so.tgz
[10]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.0.so.tgz
[11]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.1.so.tgz
[12]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.1.so.tgz
[13]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.2.so.tgz
[14]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.2.so.tgz
[15]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.3.so.tgz
[16]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.3.so.tgz
[17]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.4.so.tgz
[18]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.4.so.tgz
[19]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.24.0.so.tgz
[20]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.24.0.so.tgz
[21]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[22]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[23]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[24]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[25]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[26]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[27]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[28]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[29]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[30]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[31]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[32]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[33]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[34]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[35]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[36]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[37]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[38]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[39]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[40]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz