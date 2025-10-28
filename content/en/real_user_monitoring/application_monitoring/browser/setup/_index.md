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
  {{< nextlink href="real_user_monitoring/application_monitoring/browser/setup/client">}}<u>Client-Side</u>: Instrument each of your browser-based web applications, deploy the application, then configure the initialization parameters you want to track, and use advanced configuration to further manage data and context that RUM collects.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/application_monitoring/browser/setup/server">}}<u>Auto-Instrumentation</u>: Inject a RUM SDK JavaScript scriptlet into the HTML responses of your web applications being served through a web server or proxy.{{< /nextlink >}}
{{< /whatsnext >}}

## How to choose the instrumentation type

| | Auto-instrumentation (Preview) | Client-side (Manual) |
|----------------------|--------------------------------|----------------------|
| **SDK setup mechanism** | [Automatically][1] add RUM JS to your web app HTML. Once RUM Auto-instrumentation is set-up, manage configurations from the UI. | [Manually][2] add the RUM SDK to your application code and manage configurations in code. |
| **Code changes required** | No | Yes |
| **Setup complexity** | Low | Medium |
| **User groups** | **SRE and engineering teams** without access to frontend code, or **teams who need to manage** all observability needs centrally, may find this useful for: <br>  - Unlocking performance data across all applications upon setting up RUM <br>  - Holistically monitoring application performance across the organization | **Frontend engineering, mobile engineering, or product teams** with access to frontend code may find this method useful for: <br>  - Daily engineering needs (for example: live support, troubleshooting, and health checks for downstream services) <br>  -Product needs (for example: user flow analysis, user segmentation, and feature flag tracking) <br>  - Capturing observability from in-house code or complex functions that aren't captured by automatic instrumentation |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/application_monitoring/browser/setup/server
[2]: /real_user_monitoring/application_monitoring/browser/setup/client
