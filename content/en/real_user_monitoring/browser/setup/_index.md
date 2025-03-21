---
title: Browser Monitoring Setup
description: Understand your options for setting up the RUM Browser SDK.
further_reading:
- link: '/real_user_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
---

## Overview

To get started with Datadog RUM Browser, you need to follow these key steps:

1. Create an application in Datadog.
2. Instrument your application.

<div class="alert alert-info"><strong>Simplify your setup!</strong> Install the SDK and instrument your application in one step with <a href="https://docs.datadoghq.com/real_user_monitoring/browser/setup/server/">Auto-Instrumentation</a>.</div>

Instrumenting your application allows observability data from your application to be displayed in the Datadog UI.

## Instrumentation types

There are two main approaches to instrument your application: automatic or custom instrumentation.

### Auto-instrumentation

{{< callout url="https://www.datadoghq.com/private-beta/rum-sdk-auto-injection/" btn_hidden="true" header="Try the Auto-Instrumentation Preview!">}}

You can set RUM configs on your web servers and Datadog will automatically inject RUM configs to instrument your RUM applications. Learn more about <a href="/real_user_monitoring/browser/setup/server">Auto-Instrumentation.</a>
{{< /callout >}}

Automatically add RUM JS to your web app HTML with minimal steps by installing the RUM injector by downloading the RUM Installer or by CLI (running a command).

**SRE and engineering teams** without access to frontend code or **teams who need to manage** all observability needs centrally may find this useful for:

- Unlocking performance data across all applications upon setting up RUM
- Start holistically monitoring application performance across the organization

To learn more, see [auto-instrumentation][1].

### Manual instrumentation

Add the RUM SDK manually to your application code.

**Frontend engineering, mobile engineering, or product teams** with access to frontend code may find this method useful for:

- Daily engineering needs (live support, troubleshooting, downstream services health checks, and so on)
- Product needs (user flow analysis, user segmentation, feature flag tracking, and so on)
- Capturing observability from in-house code or complex functions that aren't captured by automatic instrumentation

To learn more, see [client-side instrumentation][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/setup/server
[2]: /real_user_monitoring/browser/setup/client