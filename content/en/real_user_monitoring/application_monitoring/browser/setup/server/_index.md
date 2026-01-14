---
title: Auto-Instrumentation
description: "Automatically inject RUM Browser SDK into HTML responses through web server or proxy configuration for seamless monitoring setup."
beta: true
code_lang: server
type: multi-code-lang
code_lang_weight: 2
aliases:
  - /real_user_monitoring/browser/setup/server
further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/logs/log_collection/javascript/'
  tag: 'Documentation'
  text: 'Learn about the Datadog Browser SDK for Logs'
---

{{< callout url=https://www.datadoghq.com/product-preview/rum-sdk-auto-instrumentation/
 btn_hidden="false" header="Join the Preview!">}}
RUM Auto-Instrumentation is in Preview. Use this form to sign up.
{{< /callout >}}

## Overview

RUM Auto-Instrumentation allows you to add RUM JS to your web app HTML. It works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. After auto-instrumentation is set up, you can manage configurations from the UI.

RUM Auto-Instrumentation requires Datadog Agent version 7.34+.

## Getting started

Select a platform to start collecting RUM data on your application:

<div class="alert alert-info">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

<br>
{{< partial name="rum/rum-browser-setup.html" >}}
<br>

## Limitations

Keep in mind the following limitations when using auto-instrumentation:

- This instrumentation method **does not support [advanced RUM configurations][1]**.
- If your web server is acting as a proxy and the upstream server uses **end-to-end encryption (TLS)** or **content compression** (gzip, zstd, Brotli), the RUM Browser SDK **cannot be injected**. To ensure proper instrumentation:
  - **Disable content compression** on the upstream server.
  - **Enable TLS origination** on the web server.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
