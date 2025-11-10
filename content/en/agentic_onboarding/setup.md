---
title: Agentic Onboarding Setup
description: instrument your frontend applications with one prompt using LLM coding agents like Cursor or Claude.
---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Agentic Onboarding is in Preview.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Datadog's Agentic Onboarding allows you to instrument your frontend applications with one prompt using LLM coding agents like [Cursor][1] or [Claude][2].

Instead of navigating multiple setup steps or searching through documentation, you can instrument your frontend applications for [Error Tracking][3], [Real User Monitoring (RUM)][4], and [Product Analytics][5] in one command.

With Agentic Onboarding, your coding assistant automatically detects your project's frameworks, adds the necessary configuration, and creates the required tokens and apps, all without leaving your IDE.

## Setup

This setup method is only available for [specific platforms](#supported-platforms).

## Supported platforms
Agentic Onboarding is available for the following platforms:

| Application Type | Supported Platforms |
|-----------------|---------------------|
| Frontend applications | Next.js, React, Svelte, Vanilla JavaScript (Angular is not supported), Vue |
| LLM and AI agent applications | Python or Node.js from scripts using [OpenAI's Responses API][6] to complex FastAPI applications powered by [LangGraph][7], or rich chatbot experiences built on [Vercel's AI SDK][8] |

## Install the Datadog Onboarding MCP server

To install the Datadog Onboarding Model Context Protocol (MCP) server, follow the steps below.

1. Copy the deeplink or command for your AI agent client:

   {{< tabs >}}
   {{% tab "Cursor" %}}

   Paste the following Cursor deeplink into your browser.

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

   {{% /tab %}}

   {{% tab "Claude Code" %}}

   Copy and execute the Claude Code command into your terminal:

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

   {{% /tab %}}
   {{< /tabs >}}

2. In your AI agent client, click **Install** for the `datadog-onboarding-mcp` server.
3. If you see a **Needs login** link under the installed MCP server, click the link to complete the Oauth process.
4. When prompted to open an external website, click **Open**.
5. After you've granted access to your Datadog account, you are redirected to Cursor. Click **Open** to complete the authentication process.
5. Confirm you see MCP tools listed for the `datadog-onboarding-mcp` server.

### Set up your project

Your AI coding agent can automatically configure Datadog for your project. When you provide a setup prompt, your coding agent does the following:

- Analyze your project and identify if the MCP server offers a tool that can be used to set it up with Datadog
- Call the tool (asking for your permission before doing so) with inferred parameters from your project (for example: your project's framework, language, and bundler)
- Follow the instructions the MCP tool provides as context to your coding agent, making code changes on your behalf (don't worry - Datadog does not commit them)
- Provide testing steps to confirm that your application is correctly configured to send telemetry to Datadog

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

### 3. Deploy your app to production

Depending on how your application is deployed, you need to commit the changes and set or upload provided environment variables to your production environment.

[1]: https://cursor.com/
[2]: https://claude.ai/
[3]: /error_tracking/frontend_monitoring
[4]: /real_user_monitoring/
[5]: /product_analytics/
[6]: https://platform.openai.com/docs/guides/text
[7]: https://github.com/langchain-ai/langgraph
[8]: https://github.com/vercel/ai-chatbot

