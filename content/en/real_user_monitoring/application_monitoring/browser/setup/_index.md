---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
aliases:
- real_user_monitoring/browser/setup/
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
- link: "https://learn.datadoghq.com/courses/configure-rum-javascript"
  tag: "Learning Center"
  text: "Configure Real User Monitoring (RUM) for JavaScript web applications"

---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">RUM Auto-Instrumentation is not available for the selected site ({{< region-param key="dd_site_name" >}}). Use <a href="/real_user_monitoring/application_monitoring/browser/setup/client">Client-Side instrumentation</a> instead.</div>
{{< /site-region >}}

## Setup

{{< whatsnext desc="Choose the instrumentation type for the Browser SDK:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding">}}<u>Agentic Onboarding</u>: Instrument your frontend applications with one prompt using LLM coding agents like Cursor or Claude.{{< /nextlink >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument your browser-based web applications, deploy them, configure the initialization parameters you want to track, and use advanced configuration to further manage the data and context that RUM collects.{{< /nextlink >}}
{{< /whatsnext >}}

## How to choose the instrumentation type

| | [Auto-Instrumentation (Preview)](/real_user_monitoring/application_monitoring/browser/setup/server) | [Agentic Onboarding (Preview)](/real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring) | [Client-Side](/real_user_monitoring/application_monitoring/browser/setup/client) |
|---|---|---|---|
| **SDK setup mechanism** | Automatically add RUM JS to your web app HTML, then manage configurations in the UI. | Use an AI-guided setup that detects your project's framework and adds the RUM SDK with a single prompt. | Manually add the RUM SDK to your application code and manage configurations in code. |
| **Code changes required** | No | Yes (automated by AI agent) | Yes |
| **Setup complexity** | Low | Low | Medium |
| **Supported platforms** | Apache, IBM HTTP Server, Java Servlet, Nginx, Windows IIS | Next.js, React, Svelte, Vue, Vanilla JavaScript | All browser-based applications |
| **User groups** | SRE and engineering teams without frontend access who need centralized management | Teams using AI coding agents such as Cursor or Claude Code | Frontend, mobile engineering, or product teams who work directly in application code |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
