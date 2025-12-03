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

### Install the Datadog Onboarding MCP server

To install the Datadog Onboarding Model Context Protocol (MCP) server, follow the steps for your coding assistant:

{{< tabs >}}
{{% tab "Cursor" %}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Copy and paste the following deeplink into your browser:

   <pre>
   <code>
   {{< region-param key=cursor_mcp_install_deeplink >}}
   </code>
   </pre>

2. In Cursor, click **Install** for the `datadog-onboarding-mcp` server.
3. If the MCP server shows a **Needs login** link, select it and complete the OAuth flow. When prompted, choose **Open** to continue and grant access to your Datadog account.
4. After authentication, return to Cursor and confirm that MCP tools appear under the `datadog-onboarding-mcp` server.
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Open an active Claude Code session with the /mcp command:

   <pre>
   <code>
   claude mcp add --transport http datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}} "https://mcp.{{< region-param key=dd_site >}}/api/unstable/mcp-server/mcp?toolsets=onboarding"
   </code>
   </pre>

2. Select the MCP server installed in Step 1. You should see a `disconnected - Enter to login` message. Press <kbd>Enter</kbd>.
3. When you see the option to authenticate, press <kbd>Enter</kbd>. This brings you to the OAuth screen.
4. After authentication, choose **Open** to continue and grant access to your Datadog account.
5. Confirm that MCP tools appear under the `datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}}` server.
{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Set up your project

Your AI coding agent can help configure Datadog for your project. When you provide a setup prompt, it:

- analyzes your project and identifies your project's framework, language, and bundler
- calls the tool, asking for your permission before it runs

  **Note**: Your coding agent makes changes locally without committing them.
- applies the configuration changes specified by the tool
- provides steps to verify that your application is sending telemetry to Datadog

1. To get started, copy and paste the following prompt based on the product you want to use into your coding agent (such as Cursor or Claude Code):

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

2. After pasting the prompt, review and accept each action your AI agent proposes to move through the setup process.

### Deploy your app to production

Commmit the changes in your repository and configure the provided environment variables in your production environment.

[1]: https://cursor.com/
[2]: https://claude.ai/
[3]: /error_tracking/frontend/
[4]: /real_user_monitoring/
[5]: /product_analytics/
[6]: https://platform.openai.com/docs/guides/text
[7]: https://github.com/langchain-ai/langgraph
[8]: https://github.com/vercel/ai-chatbot

