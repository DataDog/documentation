---
title: Instrumenting NGINX Server
beta: true
code_lang: nginx
type: multi-code-lang
code_lang_weight: 5
further_reading:
- link: '/real_user_monitoring/browser/setup/server/'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation (Server-side)'
---

<div class="alert alert-info">To try the preview for RUM Auto-Instrumentation, follow the instructions on this page.</div>

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy.

## Limitations

Keep in mind the following limitations when using this setup:

- This instrumentation method **does not support [advanced RUM configurations][1]**, except for `allowedTracingUrls` and `excludedActivityUrls`.
- If your web server is acting as a proxy and the upstream server uses **end-to-end encryption (TLS)** or **content compression** (gzip, zstd, Brotli), the RUM Browser SDK may **not be injected**. To ensure proper instrumentation:
  - **Disable content compression** on the upstream server.
  - **Enable TLS origination** on the web server.

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Set up your RUM application

The Auto-Instrumentation method leverages the [NGINX Dynamic Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses
identified as HTML.

For more granular control over the instrumentation of the RUM application, you can also **manually** install and configure the module.

{{% collapse-content title="Automatic installation (recommended)" level="h5" %}}

To automatically instrument your RUM application:

1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][4] and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Set your Session and Session Replay sample rates. See [guidance on configuring sampling][5].
4. Copy and run the installer command to load the Datadog NGINX Module with the RUM SDK Injector onto NGINX.
5. After the installer successfully installs the SDK Injector, restart NGINX to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Ensure that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /collapse-content %}}

{{% collapse-content title="Manual configuration" level="h5" %}}

To manually instrument your RUM application:

#### Download the appropriate `.tgz` file

1. Use the `.tgz` file corresponding to your version of NGINX. You can find all the relevant `.tgz` files listed by NGINX version under [Reference](#reference).
2. Extract the tarball to extract the `ngx_http_datadog_module.so` file. Move it to a location that NGINX has access to (referenced as `<RUM_MODULE_PATH>` in the steps below).

#### Update NGINX configuration

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

#### Restart your server

1. Restart the NGINX server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Ensure that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /collapse-content %}}

## Updating your RUM application

You can adjust your Session Sampling and Session Replay Sampling rates from the Application Management page.

To update your RUM Application:

1. Go to your RUM application from the [Application Management][4] list.
2. On the Instrument your application page, adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling.
3. Copy and paste the configuration snippet to your `nginx.conf` file.

## Troubleshooting

### NGINX stops responding

Since the module is in Preview, it's possible NGINX may stop serving requests, particularly after installation. If you experience this issue, contact [Datadog support][6] with the following information to help us investigate and resolve the issue:

- Your NGINX configuration file
- Any relevant error logs

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.
- **Upstream server has end-to-end encryption or content compression**: See [Limitations](#limitations).

## Reference

### NGINX modules

| Nginx version | amd64 | arm 64 |
|---------------|-------|--------|
| 1.22.0 | [ngx_http_datadog-amd64-1.22.0][7] | [ngx_http_datadog-arm64-1.22.0][8] |
| 1.22.1 | [ngx_http_datadog-amd64-1.22.1][9] | [ngx_http_datadog-arm64-1.22.1][10] |
| 1.23.0 | [ngx_http_datadog-amd64-1.23.0][11] | [ngx_http_datadog-arm64-1.23.0][12] |
| 1.23.1 | [ngx_http_datadog-amd64-1.23.1][13] | [ngx_http_datadog-arm64-1.23.1][14] |
| 1.23.2 | [ngx_http_datadog-amd64-1.23.2][15] | [ngx_http_datadog-arm64-1.23.2][16] |
| 1.23.3 | [ngx_http_datadog-amd64-1.23.3][17] | [ngx_http_datadog-arm64-1.23.3][18] |
| 1.23.4 | [ngx_http_datadog-amd64-1.23.4][19] | [ngx_http_datadog-arm64-1.23.4][20] |
| 1.24.0 | [ngx_http_datadog-amd64-1.24.0][21] | [ngx_http_datadog-arm64-1.24.0][22] |
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][23] | [ngx_http_datadog-arm64-1.25.0][24] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][25] | [ngx_http_datadog-arm64-1.25.1][26] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][27] | [ngx_http_datadog-arm64-1.25.2][28] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][29] | [ngx_http_datadog-arm64-1.25.3][30] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][31] | [ngx_http_datadog-arm64-1.25.4][32] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][33] | [ngx_http_datadog-arm64-1.25.5][34] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][35] | [ngx_http_datadog-arm64-1.26.0][36] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][37] | [ngx_http_datadog-arm64-1.26.1][38] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][39] | [ngx_http_datadog-arm64-1.26.2][40] |
| 1.26.3 | [ngx_http_datadog-amd64-1.26.3][41] | [ngx_http_datadog-arm64-1.26.2][42] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][43] | [ngx_http_datadog-arm64-1.27.0][44] |
| 1.27.1 | [ngx_http_datadog-amd64-1.27.1][45] | [ngx_http_datadog-arm64-1.27.1][46] |
| 1.27.2 | [ngx_http_datadog-amd64-1.27.2][47] | [ngx_http_datadog-arm64-1.27.2][48] |
| 1.27.3 | [ngx_http_datadog-amd64-1.27.3][49] | [ngx_http_datadog-arm64-1.27.3][50] |
| 1.27.4 | [ngx_http_datadog-amd64-1.27.4][51] | [ngx_http_datadog-arm64-1.27.4][52] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/
[2]: /agent/
[3]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /real_user_monitoring/guide/sampling-browser-plans/
[6]: /help
[7]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.0.so.tgz
[8]:https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.0.so.tgz
[9]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.22.1.so.tgz
[10]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.22.1.so.tgz
[11]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.0.so.tgz
[12]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.0.so.tgz
[13]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.1.so.tgz
[14]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.1.so.tgz
[15]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.2.so.tgz
[16]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.2.so.tgz
[17]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.3.so.tgz
[18]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.3.so.tgz
[19]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.23.4.so.tgz
[20]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.23.4.so.tgz
[21]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.24.0.so.tgz
[22]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.24.0.so.tgz
[23]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[24]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[25]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[26]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[27]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[28]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[29]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[30]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[31]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[32]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[33]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[34]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[35]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[36]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[37]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[38]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[39]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[40]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[41]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[42]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[43]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.26.3.so.tgz
[44]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.26.3.so.tgz
[45]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.1.so.tgz
[46]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.1.so.tgz
[47]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.2.so.tgz
[48]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.2.so.tgz
[49]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.3.so.tgz
[50]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.3.so.tgz
[51]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-amd64-1.27.4.so.tgz
[52]: https://ddagent-windows-unstable.s3.amazonaws.com/inject-browser-sdk/nginx/latest/ngx_http_datadog_module-arm64-1.27.4.so.tgz