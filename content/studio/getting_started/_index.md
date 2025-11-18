---
title: Getting Started
description: Set up pre-configured monitoring packages for your frontend, backend, or LLM application using agentic or manual setup.
type: studio
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog Studio is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Datadog Studio gives small development teams a streamlined observability platform to monitor, debug, and optimize their applications. Get started with pre-configured packages tailored to what you're building without any complex setup required.

## How it works

Datadog Studio provides pre-configured monitoring packages tailored to your application type. Select a package based on what you're building (frontend, backend, or LLM/AI), then use either **agentic setup**, where AI assistants like Cursor or Claude automatically configure your codebase, or **manual setup** for full control. After successfully configuring your package, your application sends telemetry data to Datadog, giving you immediate access to error tracking, performance monitoring, and analytics.

## What's included

Choose your package based on what you're building:
| Application Type       | Products Included |
|------------------------|--------------|
| Frontend applications  | [Error Tracking][1], [Session Replay][2], [Product Analytics][3] |
| Backend services       | [Error Tracking][1], [Logs][4], [Metrics][5] |
| LLMs / AI agents       | [LLM Observability and AI Agent Monitoring][6] |

## Prerequisites

Before getting started, make sure you have an account with Datadog Studio. To create an account, go to [https://app.datadoghq.com/studio/signup][7].

## Setup

To get started using Datadog Studio, select your setup method:

- [**Agentic setup**](#agentic-setup): Let AI assistants ([Cursor][8] or [Claude][9]) automatically install and configure Datadog SDKs in your codebase. This setup method is only available for [specific platforms](#supported-platforms).
- [**Manual setup**](#manual-setup): Follow step-by-step instructions to install and configure Datadog SDKs yourself. This method gives you full control over the integration.

## Agentic setup

### Supported platforms
Agentic setup is available for the following platforms:

| Application Type | Supported Platforms |
|-----------------|---------------------|
| Frontend applications | Next.js, React, Svelte, Vanilla JavaScript (Angular is not supported), Vue |
| LLM and AI agent applications | Python or Node.js from scripts using [OpenAI's Responses API][10] to complex FastAPI applications powered by [LangGraph][11], or rich chatbot experiences built on [Vercel's AI SDK][12] |

### 1. Install the Datadog Onboarding MCP server

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
   <div class="alert alert-danger">Datadog Studio is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
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
   <div class="alert alert-danger">Datadog Studio is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
   {{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

2. In your AI agent client, click **Install** for the `datadog-onboarding-mcp` server.
3. If you see a **Needs login** link under the installed MCP server, click the link to complete the Oauth process.
4. When prompted to open an external website, click **Open**.
5. After you've granted access to your Datadog account, you are redirected to Cursor. Click **Open** to complete the authentication process.
5. Confirm you see MCP tools listed for the `datadog-onboarding-mcp` server.

### 2. Set up your project

Your AI coding agent can automatically configure Datadog Studio for your project.

{{% collapse-content title="Claude Code" level="h4" expanded=false id="claude-code" %}}

1. Copy and execute the Claude Code command into your terminal:

{{< tabs >}}
{{% tab "US1" %}}
```sh
claude mcp add --transport http datadog-onboarding-mcp "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding" && claude /mcp
```
{{% /tab %}}

{{% tab "US3" %}}
```sh
claude mcp add --transport http datadog-onboarding-mcp "https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=onboarding" && claude /mcp
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

### Set up your project

Prompt your AI coding agent to enable all capabilities (Error Tracking, Session Replay, Product Analytics, and LLM Observability) in minutes by copying the below prompt into Cursor or Claude Code.

**Prompt**:
```console
Add Datadog Studio to my project
```

When you give this prompt to your coding agent, it does the following:

- Analyze your project and identify if the MCP server offers a tool that can be used to set it up with Datadog
- Call the tool (asking for your permission before doing so) with inferred parameters from your project (for example: your project's framework, language, and bundler)
- Follow the instructions the MCP tool provides as context to your coding agent, making code changes on your behalf (don't worry - Datadog does not commit them)
- Provide testing steps to confirm that your application is correctly configured to send telemetry to Datadog

1. To get started, copy and paste the following prompt into your coding agent (such as Cursor or Claude Code):

   **Prompt**: 
   ```console
   Add Datadog Studio to my project
   ```

2. After pasting the prompt, review and accept each action your AI agent proposes to move through the setup process.

### 3. Deploy your app to production

Depending on how your application is deployed, you need to commit the changes and set or upload provided environment variables to your production environment.

## Manual setup

If you prefer manual setup, follow the in-app instructions for each product in your selected package. You can either choose manual setup from the Getting Started page or by adding a New Application from the homepage.

### Frontend monitoring

{{< whatsnext desc="Follow the in-app setup instructions for each frontend product:" >}}
   {{< nextlink href="/studio/error_tracking/frontend" >}}Frontend Error Tracking{{< /nextlink >}}
   {{< nextlink href="/studio/real_user_monitoring/session_replay/" >}}Session Replay{{< /nextlink >}}
   {{< nextlink href="/studio/product_analytics/#getting-started" >}}Product Analytics{{< /nextlink >}}
{{< /whatsnext >}}

### Backend monitoring

{{< whatsnext desc="Follow the in-app instructions for each backend product:" >}}
   {{< nextlink href="/studio/error_tracking/backend/getting_started/" >}}Backend Error Tracking{{< /nextlink >}}
   {{< nextlink href="/studio/logs/log_collection/?tab=host" >}}Server / VM logs{{< /nextlink >}}
   {{< nextlink href="/studio/logs/log_collection/?tab=container" >}}Container logs{{< /nextlink >}}
   {{< nextlink href="/studio/logs/log_collection/?tab=cloudintegration" >}}Cloud / Integration logs{{< /nextlink >}}
   {{< nextlink href="/studio/logs/log_collection/?tab=application" >}}Application logs{{< /nextlink >}}
   {{< nextlink href="/studio/api/latest/logs/" >}}API logs{{< /nextlink >}}
   {{< nextlink href="/studio/metrics/custom_metrics/" >}}Custom metrics{{< /nextlink >}}
   {{< nextlink href="/studio/metrics/open_telemetry/" >}}OpenTelemetry metrics{{< /nextlink >}}
   {{< nextlink href="https://app.datadoghq.com/integrations" >}}Integrations metrics{{< /nextlink >}}
{{< /whatsnext >}}

### LLM Observability

{{< whatsnext desc="Follow the in-app instructions for LLM Observability:" >}}
   {{< nextlink href="/studio/llm_observability/quickstart/?tab=python#trace-an-llm-application" >}}LLM Observability{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /studio/error_tracking/
[2]: /studio/session_replay/
[3]: /studio/product_analytics/
[4]: /studio/logs/
[5]: /studio/metrics/
[6]: /studio/llm_observability/
[7]: https://app.datadoghq.com/studio/signup
[8]: https://cursor.com/
[9]: https://claude.ai/
[10]: https://platform.openai.com/docs/guides/text
[11]: https://github.com/langchain-ai/langgraph
[12]: https://github.com/vercel/ai-chatbot
