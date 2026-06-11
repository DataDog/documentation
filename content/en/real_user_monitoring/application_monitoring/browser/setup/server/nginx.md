---
title: Instrumenting NGINX Server
description: "Configure NGINX server to automatically inject RUM Browser SDK into HTML responses using the Datadog dynamic module."
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

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">RUM Auto-Instrumentation is not available for the selected site ({{< region-param key="dd_site_name" >}}). Use <a href="/real_user_monitoring/application_monitoring/browser/setup/client">Client-Side instrumentation</a> instead.</div>
{{< /site-region >}}

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method uses the [NGINX Dynamic Modules capability][3] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses identified as HTML. After auto-instrumentation is set up, you can manage configurations from the UI.

{{% rum-browser-auto-instrumentation-limitations %}}

## Prerequisites

The [Datadog Agent][2] is installed and configured.

## Setup

Choose your preferred setup method.

**Note**: NGINX must be restarted regardless of which instrumentation method is used.

{{< tabs >}}
{{% tab "Single-Step Instrumentation" %}}

Enables RUM Browser monitoring with [Single Step Instrumentation (SSI)][68].
When you run the Agent installation with RUM enabled, Datadog:
- Loads the NGINX module into your NGINX server through SSI
- Creates a RUM application for you
- Configures the NGINX module with the required RUM settings

**This approach requires no code changes and no manual NGINX configuration.**

1. Go to the [**Agent Installation**][69] page.
2. Select your platform (for example, Linux).
3. In the **Customize your observability coverage** section, enable **Real User Monitoring** under **Application Observability**.

   A RUM application is automatically created for you when you enable this option.

4. Copy the generated installation command and run it on your host.
5. Restart NGINX to begin collecting RUM sessions.

{{% /tab %}}
{{% tab "Managed Instrumentation" %}}

Use this method to manually create your RUM application through **Digital Experience > Manage Applications > New Application**, then run the NGINX installation command on your host.

1. In Datadog, navigate to **Digital Experience > Manage Applications**, click [**New Application**][4], and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Configure your application parameters. See [guidance on configuring sampling][5].
4. Copy and run the installer command to load the Datadog NGINX module with the RUM SDK Injector onto NGINX.
5. Restart NGINX to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the [NGINX error logs][67] for relevant messages. The module logs important steps during the injection process. Confirm that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /tab %}}
{{% tab "Manual Instructions" %}}

If you need finer control over more parameters than what the automatic instrumentation provides, you can manually load the module onto your web server instead of running the installation script.

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

### Restart NGINX

1. Restart the NGINX server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected to all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Confirm that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can update your RUM application settings at any time. From the [Application Management][4] list, select your RUM application and navigate to the **SDK Configuration** page. Click **Save Changes** after making updates.

### Sampling rates

Adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling. Copy and paste the configuration snippet to your `nginx.conf` file.

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Troubleshooting

### NGINX stops responding

If NGINX stops serving requests, specifically after installation, contact [Datadog support][6] with the following information:

- Your NGINX configuration file
- Any relevant error logs

### RUM is not injected

If you notice that RUM is not being injected into HTML pages, consider the following potential causes:

- **Content-Type mismatch**: RUM is injected only into HTML pages. If the `Content-Type` header does not correctly indicate `text/html`, the injection is skipped.


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

## Reference

### NGINX modules

| NGINX version | amd64 | arm 64 |
|---------------|-------|--------|
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][7] | [ngx_http_datadog-arm64-1.25.0][8] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][9] | [ngx_http_datadog-arm64-1.25.1][10] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][11] | [ngx_http_datadog-arm64-1.25.2][12] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][13] | [ngx_http_datadog-arm64-1.25.3][14] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][15] | [ngx_http_datadog-arm64-1.25.4][16] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][17] | [ngx_http_datadog-arm64-1.25.5][18] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][19] | [ngx_http_datadog-arm64-1.26.0][20] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][21] | [ngx_http_datadog-arm64-1.26.1][22] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][23] | [ngx_http_datadog-arm64-1.26.2][24] |
| 1.26.3 | [ngx_http_datadog-amd64-1.26.3][25] | [ngx_http_datadog-arm64-1.26.3][26] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][27] | [ngx_http_datadog-arm64-1.27.0][28] |
| 1.27.1 | [ngx_http_datadog-amd64-1.27.1][29] | [ngx_http_datadog-arm64-1.27.1][30] |
| 1.27.2 | [ngx_http_datadog-amd64-1.27.2][31] | [ngx_http_datadog-arm64-1.27.2][32] |
| 1.27.3 | [ngx_http_datadog-amd64-1.27.3][33] | [ngx_http_datadog-arm64-1.27.3][34] |
| 1.27.4 | [ngx_http_datadog-amd64-1.27.4][35] | [ngx_http_datadog-arm64-1.27.4][36] |
| 1.27.5 | [ngx_http_datadog-amd64-1.27.5][37] | [ngx_http_datadog-arm64-1.27.5][38] |
| 1.28.0 | [ngx_http_datadog-amd64-1.28.0][39] | [ngx_http_datadog-arm64-1.28.0][40] |
| 1.28.1 | [ngx_http_datadog-amd64-1.28.1][41] | [ngx_http_datadog-arm64-1.28.1][42] |
| 1.28.2 | [ngx_http_datadog-amd64-1.28.2][43] | [ngx_http_datadog-arm64-1.28.2][44] |
| 1.28.3 | [ngx_http_datadog-amd64-1.28.3][45] | [ngx_http_datadog-arm64-1.28.3][46] |
| 1.29.0 | [ngx_http_datadog-amd64-1.29.0][47] | [ngx_http_datadog-arm64-1.29.0][48] |
| 1.29.1 | [ngx_http_datadog-amd64-1.29.1][49] | [ngx_http_datadog-arm64-1.29.1][50] |
| 1.29.2 | [ngx_http_datadog-amd64-1.29.2][51] | [ngx_http_datadog-arm64-1.29.2][52] |
| 1.29.3 | [ngx_http_datadog-amd64-1.29.3][53] | [ngx_http_datadog-arm64-1.29.3][54] |
| 1.29.4 | [ngx_http_datadog-amd64-1.29.4][55] | [ngx_http_datadog-arm64-1.29.4][56] |
| 1.29.5 | [ngx_http_datadog-amd64-1.29.5][57] | [ngx_http_datadog-arm64-1.29.5][58] |
| 1.29.6 | [ngx_http_datadog-amd64-1.29.6][59] | [ngx_http_datadog-arm64-1.29.6][60] |
| 1.29.7 | [ngx_http_datadog-amd64-1.29.7][61] | [ngx_http_datadog-arm64-1.29.7][62] |
| 1.29.8 | [ngx_http_datadog-amd64-1.29.8][63] | [ngx_http_datadog-arm64-1.29.8][64] |
| 1.30.0 | [ngx_http_datadog-amd64-1.30.0][65] | [ngx_http_datadog-arm64-1.30.0][66] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/server/#limitations
[2]: /agent/
[3]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[4]: https://app.datadoghq.com/rum/list
[5]: /real_user_monitoring/guide/sampling-browser-plans/
[6]: /help
[7]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[8]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[9]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[10]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[11]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[12]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[13]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[14]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[15]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[16]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[17]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[18]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[19]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[20]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[21]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[22]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[23]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[24]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[25]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.3.so.tgz
[26]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.3.so.tgz
[27]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[28]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[29]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.1.so.tgz
[30]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.1.so.tgz
[31]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.2.so.tgz
[32]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.2.so.tgz
[33]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.3.so.tgz
[34]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.3.so.tgz
[35]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.4.so.tgz
[36]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.4.so.tgz
[37]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.5.so.tgz
[38]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.5.so.tgz
[39]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.0.so.tgz
[40]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.0.so.tgz
[41]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.1.so.tgz
[42]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.1.so.tgz
[43]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.2.so.tgz
[44]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.2.so.tgz
[45]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.3.so.tgz
[46]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.3.so.tgz
[47]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.0.so.tgz
[48]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.0.so.tgz
[49]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.1.so.tgz
[50]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.1.so.tgz
[51]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.2.so.tgz
[52]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.2.so.tgz
[53]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.3.so.tgz
[54]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.3.so.tgz
[55]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.4.so.tgz
[56]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.4.so.tgz
[57]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.5.so.tgz
[58]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.5.so.tgz
[59]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.6.so.tgz
[60]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.6.so.tgz
[61]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.7.so.tgz
[62]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.7.so.tgz
[63]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.8.so.tgz
[64]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.8.so.tgz
[65]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.30.0.so.tgz
[66]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.30.0.so.tgz
[67]: https://nginx.org/en/docs/ngx_core_module.html#error_log
[68]: /tracing/trace_collection/single-step-apm/
[69]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
