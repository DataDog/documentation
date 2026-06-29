---
title: Auto-Instrumentation
description: "Automatically inject RUM Browser SDK into HTML responses through web server or proxy configuration."
code_lang: server
type: multi-code-lang
code_lang_weight: 2
site_support_id: rum_server_auto_instrumentation
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

## Overview

RUM Auto-Instrumentation allows you to add RUM JS to your web app HTML. It works by injecting the RUM Browser SDK into the HTML responses being served through a web server or proxy. After auto-instrumentation is set up, you can manage configurations from the UI.

RUM Auto-Instrumentation requires Datadog Agent version 7.34+.

## Getting started

Select a platform to start collecting RUM data on your application:

<div class="alert alert-info">To request support for a web server that is not listed here, <a href="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/">fill out this form.</a></div>

<br>
{{< card-grid >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/java" src="integrations_logos/java_servlet_large.svg" alt="java_servlet" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/nginx" src="integrations_logos/nginx_large.svg" alt="nginx" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/windows_iis" src="integrations_logos/windows_iis_large.svg" alt="windowsiis" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/apache" src="integrations_logos/apache_large.svg" alt="apache" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup/server/ibm" src="integrations_logos/ibm_http_large.svg" alt="ibm" >}}
{{< /card-grid >}}
<br>

{{% rum-browser-auto-instrumentation-limitations %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
