---
title: Agentic Onboarding Setup
description: Set up the Datadog MCP server to instrument your frontend applications with coding agents like Cursor or Claude Code.
further_reading:

---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Agentic Onboarding is in Preview.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Datadog's Agentic Onboarding allows you to instrument your frontend applications with one prompt using LLM coding agents like [Cursor][1] or [Claude Code][2].

Instead of navigating multiple setup steps or searching through documentation, you can instrument your frontend applications for [Error Tracking][3], [Real User Monitoring (RUM)][4], and [Product Analytics][5] in one command.

With Agentic Onboarding, your coding assistant automatically detects your project's frameworks, add configuration, and provisions required tokens and apps directly from your IDE.

## Prerequisites
### Supported frameworks
Agentic Onboarding is available for the following frameworks: Android, Angular, iOS, Next.js, Svelte, Vanilla JS, Vue

## Setup

### Install the Datadog Onboarding MCP server

To install the Datadog Onboarding Model Context Protocol (MCP) server, follow the steps below.

{{< tabs >}}
{{% tab "Cursor" %}}
1. Copy and paste the following deeplink into your browser.

   {{% site-region region="us" %}}

   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-mcp&config=eyJ1cmwiOiJodHRwczovL21jcC5kYXRhZG9naHEuY29tL2FwaS91bnN0YWJsZS9tY3Atc2VydmVyL21jcD90b29sc2V0cz1vbmJvYXJkaW5nIiwidHlwZSI6Im9hdXRoIn0=
   ```
   {{% /site-region %}}

   {{% site-region region="us3" %}}
   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-us3&config=eyJ1cmwiOiJodHRwczovL21jcC51czMuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
   ```
   {{% /site-region %}}

   {{% site-region region="us5" %}}
   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-us5&config=eyJ1cmwiOiJodHRwczovL21jcC51czUuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
   ```
   {{% /site-region %}}

   {{% site-region region="eu" %}}
   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-mcp&config=eyJ1cmwiOiJodHRwczovL21jcC5kYXRhZG9naHEuZXUvYXBpL3Vuc3RhYmxlL21jcC1zZXJ2ZXIvbWNwP3Rvb2xzZXRzPW9uYm9hcmRpbmciLCJ0eXBlIjoib2F1dGgifQ==
   ```
   {{% /site-region %}}

   {{% site-region region="ap1" %}}
   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-ap1&config=eyJ1cmwiOiJodHRwczovL21jcC5hcDEuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
   ```
   {{% /site-region %}}

   {{% site-region region="ap2" %}}
   ```shell
   cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-ap2&config=eyJ1cmwiOiJodHRwczovL21jcC5hcDIuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
   ```
   {{% /site-region %}}

   {{< site-region region="gov" >}}
   <div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
   {{< /site-region >}}

2. In Cursor, click **Install** for the `datadog-onboarding-mcp` server.
3. If the MCP server shows a **Needs login** link, select it and complete the OAuth flow. When prompted, choose **Open** to continue and grant access to your Datadog account.
4. After authentication, return to Cursor and confirm that MCP tools appear under the `datadog-onboarding-mcp` server.

{{% /tab %}}

{{% tab "Claude Code" %}}

1. Open an active Claude Code session with the /mcp command:

   {{% site-region region="us" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-us1 "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```
   {{% /site-region %}}

   {{% site-region region="us3" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-us3 "https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```
   {{% /site-region %}}

   {{% site-region region="us5" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-us5 "https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```
   {{% /site-region %}}

   {{% site-region region="eu" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-eu1 "https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp?toolsets=onboarding
   ```
   {{% /site-region %}}

   {{% site-region region="ap1" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-ap1 "https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```
   {{% /site-region %}}

   {{% site-region region="ap2" %}}
   ```shell
   claude mcp add --transport http datadog-onboarding-ap2 "https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```
   {{% /site-region %}}

   {{< site-region region="gov" >}}
   <div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
   {{< /site-region >}}

2. Select the MCP server installed in Step 1. You should see a `disconnected - Enter to login` message. Press <kbd>Enter</kbd>.
3. When you see the option to authenticate, press <kbd>Enter</kbd>. This brings you to the OAuth screen.

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

