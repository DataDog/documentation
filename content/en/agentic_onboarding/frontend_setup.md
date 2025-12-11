---
title: Agentic Onboarding Setup
description: Set up the Datadog MCP server to instrument your frontend applications with coding agents like Cursor or Claude Code.

---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Agentic Onboarding is in Preview.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Agentic Onboarding lets LLM coding agents instrument your frontend applications for [Error Tracking][3], [Real User Monitoring (RUM)][4], and [Product Analytics][5] with a single prompt.

Your coding assistant, such as [Cursor][1] or [Claude Code][2], detects your project's frameworks, adds configuration, and provisions required tokens and apps directly from your IDE.

## Supported frameworks
Agentic Onboarding is available for the following frameworks: Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, and Vue.

## Setup

{{< include-markdown "agentic_onboarding/setup" >}}

To get started:
1. Choose the product you want to use and paste its setup prompt into your AI agent:

   {{< tabs >}}
   {{% tab "Error Tracking" %}}
   ```console
   Add Datadog Error Tracking to my project
   ```
   {{% /tab %}}

   {{% tab "Real User Monitoring" %}}
   ```console
   Add Datadog Real User Monitoring to my project
   ```
   {{% /tab %}}

   {{% tab "Product Analytics" %}}
   ```console
   Add Datadog Product Analytics to my project
   ```
   {{% /tab %}}
   {{< /tabs >}}

2. Review and accept each action your AI agent proposes to complete the setup process.

### Deploy your app to production

Commit the changes to your repository and configure the provided environment variables in your production environment.

[1]: https://cursor.com/
[2]: https://claude.ai/
[3]: /error_tracking/frontend/
[4]: /real_user_monitoring/
[5]: /product_analytics/


