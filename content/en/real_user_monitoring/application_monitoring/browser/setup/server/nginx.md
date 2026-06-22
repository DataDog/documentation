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

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. This method uses the [NGINX Dynamic Modules capability][201] to implement a response body filter. The filter injects the RUM Browser SDK into the response body for responses identified as HTML. After auto-instrumentation is set up, you can manage configurations from the UI.

{{% rum-browser-auto-instrumentation-limitations %}}

## Prerequisites

The [Datadog Agent][202] is installed and configured.

## Setup

Choose your preferred setup method.

**Note**: NGINX must be restarted regardless of which instrumentation method is used.

{{< tabs >}}
{{% tab "Single-Step Instrumentation" %}}

Enables RUM Browser monitoring with [Single Step Instrumentation (SSI)][101].
When you run the Agent installation with RUM enabled, Datadog:
- Loads the NGINX module into your NGINX server through SSI
- Creates a RUM application for you
- Configures the NGINX module with the required RUM settings

**This approach requires no code changes and no manual NGINX configuration.**

1. Go to the [**Agent Installation**][102] page.
2. Select your platform (for example, Linux).
3. In the **Customize your observability coverage** section, enable **Real User Monitoring** under **Application Observability**.

   A RUM application is automatically created for you when you enable this option.

4. Copy the generated installation command and run it on your host.
5. Restart NGINX to begin collecting RUM sessions.

[101]: /tracing/trace_collection/single-step-apm/
[102]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview

{{% /tab %}}
{{% tab "Managed Instrumentation" %}}

Use this method if you need to configure sampling rates or application settings before deploying.

1. In Datadog, navigate to **Digital Experience > Manage Applications**, click **Set up Manually**, and select the JavaScript (JS) application type.
2. Select **Auto-Instrumentation** and **NGINX**.
3. Configure your application parameters. See [guidance on configuring sampling][102].
4. Copy and run the installer command to load the Datadog NGINX module with the RUM SDK Injector into your NGINX server.
5. Restart NGINX to begin collecting RUM sessions.
6. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the [NGINX error logs][103] for relevant messages. The module logs important steps during the injection process. Confirm that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

[101]: https://app.datadoghq.com/rum/list
[102]: /real_user_monitoring/guide/sampling-browser-plans/
[103]: https://nginx.org/en/docs/ngx_core_module.html#error_log

{{% /tab %}}
{{% tab "Manual Instructions" %}}

Use this method if you cannot run the installation script or need full control over the NGINX configuration.

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

1. Restart the NGINX server to begin collecting data for your Datadog RUM application. By default, the RUM SDK is injected into all HTML documents. You may need to clear your browser cache.
2. (Optional) To verify the module is successfully injecting the RUM Browser SDK into HTML pages, check the NGINX error logs for relevant messages. The module logs important steps during the injection process. Confirm that NGINX is configured with at least the `INFO` log level with the following:

   ```javascript
   error_log <file> info;
   ```

{{% /tab %}}
{{< /tabs >}}

## Updating your RUM application

You can update your RUM application settings at any time. From the [Application Management][203] list, select your RUM application and navigate to the **SDK Configuration** page. Click **Save Changes** after making updates.

### Sampling rates

Adjust the slider or enter a specific percentage in the input box for Session Sampling or Session Replay Sampling. Copy and paste the configuration snippet to your `nginx.conf` file.

{{% rum-browser-auto-instrumentation-update-user-attributes %}}

## Troubleshooting

### NGINX stops responding

If NGINX stops serving requests after installation, contact [Datadog support][204] with the following information:

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
| 1.25.0 | [ngx_http_datadog-amd64-1.25.0][205] | [ngx_http_datadog-arm64-1.25.0][206] |
| 1.25.1 | [ngx_http_datadog-amd64-1.25.1][207] | [ngx_http_datadog-arm64-1.25.1][208] |
| 1.25.2 | [ngx_http_datadog-amd64-1.25.2][209] | [ngx_http_datadog-arm64-1.25.2][210] |
| 1.25.3 | [ngx_http_datadog-amd64-1.25.3][211] | [ngx_http_datadog-arm64-1.25.3][212] |
| 1.25.4 | [ngx_http_datadog-amd64-1.25.4][213] | [ngx_http_datadog-arm64-1.25.4][214] |
| 1.25.5 | [ngx_http_datadog-amd64-1.25.5][215] | [ngx_http_datadog-arm64-1.25.5][216] |
| 1.26.0 | [ngx_http_datadog-amd64-1.26.0][217] | [ngx_http_datadog-arm64-1.26.0][218] |
| 1.26.1 | [ngx_http_datadog-amd64-1.26.1][219] | [ngx_http_datadog-arm64-1.26.1][220] |
| 1.26.2 | [ngx_http_datadog-amd64-1.26.2][221] | [ngx_http_datadog-arm64-1.26.2][222] |
| 1.26.3 | [ngx_http_datadog-amd64-1.26.3][223] | [ngx_http_datadog-arm64-1.26.3][224] |
| 1.27.0 | [ngx_http_datadog-amd64-1.27.0][225] | [ngx_http_datadog-arm64-1.27.0][226] |
| 1.27.1 | [ngx_http_datadog-amd64-1.27.1][227] | [ngx_http_datadog-arm64-1.27.1][228] |
| 1.27.2 | [ngx_http_datadog-amd64-1.27.2][229] | [ngx_http_datadog-arm64-1.27.2][230] |
| 1.27.3 | [ngx_http_datadog-amd64-1.27.3][231] | [ngx_http_datadog-arm64-1.27.3][232] |
| 1.27.4 | [ngx_http_datadog-amd64-1.27.4][233] | [ngx_http_datadog-arm64-1.27.4][234] |
| 1.27.5 | [ngx_http_datadog-amd64-1.27.5][235] | [ngx_http_datadog-arm64-1.27.5][236] |
| 1.28.0 | [ngx_http_datadog-amd64-1.28.0][237] | [ngx_http_datadog-arm64-1.28.0][238] |
| 1.28.1 | [ngx_http_datadog-amd64-1.28.1][239] | [ngx_http_datadog-arm64-1.28.1][240] |
| 1.28.2 | [ngx_http_datadog-amd64-1.28.2][241] | [ngx_http_datadog-arm64-1.28.2][242] |
| 1.28.3 | [ngx_http_datadog-amd64-1.28.3][243] | [ngx_http_datadog-arm64-1.28.3][244] |
| 1.29.0 | [ngx_http_datadog-amd64-1.29.0][245] | [ngx_http_datadog-arm64-1.29.0][246] |
| 1.29.1 | [ngx_http_datadog-amd64-1.29.1][247] | [ngx_http_datadog-arm64-1.29.1][248] |
| 1.29.2 | [ngx_http_datadog-amd64-1.29.2][249] | [ngx_http_datadog-arm64-1.29.2][250] |
| 1.29.3 | [ngx_http_datadog-amd64-1.29.3][251] | [ngx_http_datadog-arm64-1.29.3][252] |
| 1.29.4 | [ngx_http_datadog-amd64-1.29.4][253] | [ngx_http_datadog-arm64-1.29.4][254] |
| 1.29.5 | [ngx_http_datadog-amd64-1.29.5][255] | [ngx_http_datadog-arm64-1.29.5][256] |
| 1.29.6 | [ngx_http_datadog-amd64-1.29.6][257] | [ngx_http_datadog-arm64-1.29.6][258] |
| 1.29.7 | [ngx_http_datadog-amd64-1.29.7][259] | [ngx_http_datadog-arm64-1.29.7][260] |
| 1.29.8 | [ngx_http_datadog-amd64-1.29.8][261] | [ngx_http_datadog-arm64-1.29.8][262] |
| 1.30.0 | [ngx_http_datadog-amd64-1.30.0][263] | [ngx_http_datadog-arm64-1.30.0][264] |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[201]: https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/
[202]: /agent/
[203]: https://app.datadoghq.com/rum/list
[204]: /help
[205]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.0.so.tgz
[206]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.0.so.tgz
[207]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.1.so.tgz
[208]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.1.so.tgz
[209]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.2.so.tgz
[210]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.2.so.tgz
[211]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.3.so.tgz
[212]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.3.so.tgz
[213]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.4.so.tgz
[214]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.4.so.tgz
[215]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.25.5.so.tgz
[216]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.25.5.so.tgz
[217]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.0.so.tgz
[218]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.0.so.tgz
[219]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.1.so.tgz
[220]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.1.so.tgz
[221]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.2.so.tgz
[222]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.2.so.tgz
[223]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.26.3.so.tgz
[224]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.26.3.so.tgz
[225]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.0.so.tgz
[226]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.0.so.tgz
[227]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.1.so.tgz
[228]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.1.so.tgz
[229]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.2.so.tgz
[230]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.2.so.tgz
[231]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.3.so.tgz
[232]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.3.so.tgz
[233]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.4.so.tgz
[234]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.4.so.tgz
[235]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.27.5.so.tgz
[236]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.27.5.so.tgz
[237]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.0.so.tgz
[238]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.0.so.tgz
[239]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.1.so.tgz
[240]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.1.so.tgz
[241]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.2.so.tgz
[242]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.2.so.tgz
[243]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.28.3.so.tgz
[244]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.28.3.so.tgz
[245]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.0.so.tgz
[246]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.0.so.tgz
[247]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.1.so.tgz
[248]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.1.so.tgz
[249]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.2.so.tgz
[250]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.2.so.tgz
[251]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.3.so.tgz
[252]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.3.so.tgz
[253]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.4.so.tgz
[254]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.4.so.tgz
[255]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.5.so.tgz
[256]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.5.so.tgz
[257]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.6.so.tgz
[258]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.6.so.tgz
[259]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.7.so.tgz
[260]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.7.so.tgz
[261]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.29.8.so.tgz
[262]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.29.8.so.tgz
[263]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-amd64-1.30.0.so.tgz
[264]: https://rum-auto-instrumentation.s3.amazonaws.com/nginx/latest/ngx_http_datadog_module-arm64-1.30.0.so.tgz
