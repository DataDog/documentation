---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
aliases:
- real_user_monitoring/browser/setup/
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
---

## Setup

{{< whatsnext desc="Choose the instrumentation type for the Browser SDK:" >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/agentic_onboarding">}}<u>Agentic Onboarding</u>: Instrument your frontend applications with one prompt using LLM coding agents like Cursor or Claude.{{< /nextlink >}}
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument your browser-based web applications, deploy them, configure the initialization parameters you want to track, and use advanced configuration to further manage the data and context that RUM collects.{{< /nextlink >}}
{{< /whatsnext >}}

## How to choose the instrumentation type

| | Auto-instrumentation (Preview) | Agentic Onboarding (Preview) | Client-side (Manual) |
|----------------------|--------------------------------|------------------------------|----------------------|
| **SDK setup mechanism** | [Automatically][1] add RUM JS to your web app HTML, then manage configurations in the UI. | Use an [AI-guided setup][3] that detects your project's framework and adds the RUM SDK with a single prompt. | [Manually][2] add the RUM SDK to your application code and manage configurations in code. |
| **Code changes required** | No | Yes (automated by AI agent) | Yes |
| **Setup complexity** | Low | Low | Medium |
| **Supported platforms** | Apache, IBM HTTP Server, Java Servlet, Nginx, Windows IIS | Next.js, React, Svelte, Vue, Vanilla JavaScript | All browser-based applications |
| **User groups** | Ideal for **SRE and engineering teams** without access to frontend code or who need centralized management: <br>  - Enable RUM across many apps without code changes <br>  - Monitor organization-wide frontend performance from a single place | Ideal for **teams using AI coding agents** (such as Cursor or Claude Code): <br>  - Accelerate RUM setup with AI-guided instrumentation <br>  - Automate framework detection and SDK configuration <br>  - Reducing time-to-observability for new projects | Ideal for **frontend engineering, mobile engineering, or product teams** who work directly in application code: <br>  - Support daily engineering workflows (such as live support, troubleshooting, and health checks for downstream services) <br>  - Power product workflows (such as user flow analysis, segmentation, and feature tracking) <br>  - Use custom code to track behavior not captured by automatic instrumentation |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/server
[2]: /real_user_monitoring/application_monitoring/browser/setup/client
[3]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring
