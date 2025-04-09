---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
further_reading:
- link: '/real_user_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
---

## Overview

To get started with Datadog RUM Browser, you need to:

1. Create an application in Datadog.
2. Instrument your application.

<div class="alert alert-info"><strong>Simplify your setup!</strong> Install the SDK and instrument your application in one step with <a href="https://docs.datadoghq.com/real_user_monitoring/browser/setup/server/">Auto-Instrumentation</a>.</div>

Instrumenting your application allows observability data from your application to be displayed in the Datadog UI.

## Instrumentation types

There are two ways to instrument your application: automatic or manual instrumentation.

### Auto-Instrumentation

{{< callout url="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/" btn_hidden="true" header="Try the Auto-Instrumentation Preview!">}}

You can set RUM configs on your web servers and Datadog will automatically inject RUM configs to instrument your RUM applications. Learn more about <a href="/real_user_monitoring/browser/setup/server">Auto-Instrumentation.</a>
{{< /callout >}}

Download the RUM installer or use CLI to install the RUM Injector and automatically add RUM JS to your web app HTML.

**SRE and engineering teams** without access to frontend code, or **teams who need to manage** all observability needs centrally, may find this useful for:

- Unlocking performance data across all applications upon setting up RUM
- Holistically monitoring application performance across the organization

To learn more, see [Auto-Instrumentation][1].

### Client-side (manual instrumentation)

Add the RUM SDK manually to your application code.

**Frontend engineering, mobile engineering, or product teams** with access to frontend code may find this method useful for:

- Daily engineering needs (for example: live support, troubleshooting, and health checks for downstream services)
- Product needs (for example: user flow analysis, user segmentation, and feature flag tracking)
- Capturing observability from in-house code or complex functions that aren't captured by automatic instrumentation

To learn more, see [Client-Side Instrumentation][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/server
[2]: /real_user_monitoring/browser/setup/client