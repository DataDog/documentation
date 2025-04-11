---
title: Browser Monitoring Auto-Instrumentation (Server-Side)
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

## Overview

RUM Auto-Instrumentation works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy.

## Getting started

### Remotely configure your RUM applications in Datadog

Remotely manage your RUM application configurations directly from Datadog, after having them auto-instrumented with the RUM SDK.
If you want to manage RUM configs in your web server files instead, see [Non-remote managed applications](#non-remote-managed-applications).

The following configurations can be remotely managed:

- Session sampling rate
- Session Replay sampling rate
- Session Replay privacy setting
- Action name privacy setting
- Environment (attribute)
- Service name (attribute)

To remotely configure your RUM application:

1. Make sure you have [Remote Configuration][1] enabled in Datadog.
1. In Datadog, navigate to the [**Digital Experience > Add an Application Page**][2] and select the JavaScript (JS) application type.
1. Select **Auto-Instrumentation**.
1. Configure all desired settings.
1. Click **Save Changes**.
1. Click the tab for your web server.
1. Copy and run the command shown.
1. Restart your web server.

### Non-remote managed applications

<div class="alert alert-warning">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

Follow the documentation for your web server type to learn more:

<br>
{{< partial name="rum/rum-browser-setup.html" >}}
<br>

## Limitations

Keep in mind the following limitations when using this setup:

- This instrumentation method **does not support [advanced RUM configurations][1]**, except for `allowedTracingUrls` and `excludedActivityUrls`.
- If your web server is acting as a proxy and the upstream server uses **end-to-end encryption (TLS)** or **content compression** (gzip, zstd, Brotli), the RUM Browser SDK may **not be injected**. To ensure proper instrumentation:
  - **Disable content compression** on the upstream server.
  - **Enable TLS origination** on the web server.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/
[2]: https://app.datadoghq.com/rum/list