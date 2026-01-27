---
title: Instrumenting NGINX Server
description: "Configure NGINX server to automatically inject RUM Browser SDK into HTML responses using the Datadog dynamic module."
beta: true
code_lang: nginx
type: multi-code-lang
code_lang_weight: 5
aliases:
  - /real_user_monitoring/browser/setup/server/nginx
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/setup/server'
  tag: 'Documentation'
  text: 'Browser Monitoring Auto-Instrumentation'
---

<div class="alert alert-info">To try the preview for RUM Auto-Instrumentation, follow the instructions on this page.</div>

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method leverages the [NGINX Dynamic Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses identified as HTML. After auto-instrumentation is set up, you can manage configurations from the UI.

To understand important limitations and compatibility requirements, see [Limitations][1].

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Set up your RUM application

To automatically instrument your RUM application:

1. In Datadog, navigate to the **Digital Experience > Manage Applications Page**, click on [**New Application**][4], and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Configure your application parameters. See [guidance on configuring sampling][5].
4. Copy and run the installer command to load the Datadog NGINX Module with the RUM SDK Injector onto NGINX.
5. After the installer successfully installs the SDK Injector, restart NGINX to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the [NGINX error logs][43] for relevant messages. The module logs important steps during the injection process. Ensure that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

Alternatively, you can [manually](#alternative-installation-method) install and configure the module.

## Updating your RUM application

You can update your RUM application settings at any time. From the [Application Management][4] list, select your RUM application and navigate to the **SDK Configuration** page. Click **Save Changes** after making updates.

### Sampling rates

Adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling. Copy and paste the configuration snippet to your `nginx.conf` file.

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Troubleshooting

### NGINX stops responding

If NGINX stops serving requests, specifically after installation, contact [Datadog support][6] with the following information to help us investigate and resolve the issue:

- Your NGINX configuration file
- Any relevant error logs

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.

### Limitations

See other [Limitations][1].

## Uninstall

To manually remove RUM from your auto-instrumented web server:

1. Locate the NGINX configuration file by running `nginx -T`. For example: `/etc/nginx/nginx.conf`.
2. At the beginning of the file, remove the line: `load_module /opt/datadog-nginx/ngx_http_datadog_module.so;`.
3. In the file, remove all existing `datadog_*` sections from within the `http` directive. The sections look similar to the following, depending on your system configuration:

   ```
   datadog_agent_url http://datadog-agent:8126;
   datadog_tracing off;
   datadog_rum on;
   datadog_rum_config {
     # ... specific RUM configuration
   }
   ```

4. Delete the directory `/opt/datadog-nginx/` and all of its contents.
5. Restart or reload your NGINX web server.

## Alternative installation method

If you need finer control over more parameters than what the automatic instrumentation provides, you can manually load the module onto your web server instead of running the installation script.

To manually instrument your RUM application:

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

## Reference

### NGINX modules

| Nginx version | amd64 | arm 64 |
|---------------|-------|--------|
| 1.24.0 | [ngx_http_datadog-amd64-1.24.0][7] | [ngx_http_datadog-arm64-1.24.0][8] |
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][9] | [ngx_http_datadog-arm64-1.25.0][10] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][11] | [ngx_http_datadog-arm64-1.25.1][12] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][13] | [ngx_http_datadog-arm64-1.25.2][14] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][15] | [ngx_http_datadog-arm64-1.25.3][16] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][17] | [ngx_http_datadog-arm64-1.25.4][18] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][19] | [ngx_http_datadog-arm64-1.25.5][20] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][21] | [ngx_http_datadog-arm64-1.26.0][22] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][23] | [ngx_http_datadog-arm64-1.26.1][24] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][25] | [ngx_http_datadog-arm64-1.26.2][26] |
| 1.26.3 | [ngx_http_datadog-amd64-1.26.3][27] | [ngx_http_datadog-arm64-1.26.3][28] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][29] | [ngx_http_datadog-arm64-1.27.0][30] |
| 1.27.1 | [ngx_http_datadog-amd64-1.27.1][31] | [ngx_http_datadog-arm64-1.27.1][32] |
| 1.27.2 | [ngx_http_datadog-amd64-1.27.2][33] | [ngx_http_datadog-arm64-1.27.2][34] |
| 1.27.3 | [ngx_http_datadog-amd64-1.27.3][35] | [ngx_http_datadog-arm64-1.27.3][36] |
| 1.27.4 | [ngx_http_datadog-amd64-1.27.4][37] | [ngx_http_datadog-arm64-1.27.4][38] |
| 1.27.5 | [ngx_http_datadog-amd64-1.27.5][39] | [ngx_http_datadog-arm64-1.27.5][40] |
| 1.28.0 | [ngx_http_datadog-amd64-1.28.0][41] | [ngx_http_datadog-arm64-1.28.0][42] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/server/#limitations
[2]: /agent/
[3]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /real_user_monitoring/guide/sampling-browser-plans/
[6]: /help
[7]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.24.0.so.tgz
[8]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.24.0.so.tgz
[9]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[10]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[11]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[12]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[13]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[14]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[15]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[16]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[17]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[18]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[19]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[20]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[21]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[22]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[23]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[24]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[25]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[26]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[27]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.3.so.tgz
[28]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.3.so.tgz
[29]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[30]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[31]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.1.so.tgz
[32]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.1.so.tgz
[33]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.2.so.tgz
[34]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.2.so.tgz
[35]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.3.so.tgz
[36]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.3.so.tgz
[37]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.4.so.tgz
[38]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.4.so.tgz
[39]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.5.so.tgz
[40]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.5.so.tgz
[41]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.0.so.tgz
[42]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.0.so.tgz
[43]: https://nginx.org/en/docs/ngx_core_module.html#error_log
