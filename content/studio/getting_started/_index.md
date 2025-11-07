---
title: Getting Started
description: Set up pre-configured monitoring packages for your frontend, backend, or LLM application using agentic or manual setup.
type: studio
---

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

## Sign up for Datadog Studio

Before getting started, make sure you have an account with Datadog Studio. To create an account, go to [https://app.datadoghq.com/studio/signup][7].

## Setup

Choose your setup method:

- [Agentic setup](#agentic-setup): Let AI assistants ([Cursor][8] or [Claude][9]) automatically install and configure Datadog SDKs in your codebase. Only available for [specific platforms](#supported-platforms).
- [Manual setup](#manual-setup): Follow step-by-step instructions to install and configure Datadog SDKs yourself—gives you full control over the integration.

## Agentic setup

### Supported platforms
Agentic setup is available for the following platforms:

**Frontend applications**  
- Next.js
- React
- Svelte
- Vanilla JavaScript (Angular is not supported)
- Vue

**LLM and AI agent applications**  
- Python or Node.js—from scripts using [OpenAI's Responses API][10] to complex FastAPI applications powered by [LangGraph][11], or rich chatbot experiences built on [Vercel's AI SDK][12].

### Install the Datadog Onboarding MCP server

To install the Datadog Onboarding Model Context Protocol (MCP) server:

{{% collapse-content title="Cursor" level="h4" expanded=false id="cursor" %}}

1. Copy the Cursor Deeplink into your browser based on your site region:

{{< tabs >}}
{{% tab "US1" %}}
```sh
cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-mcp&config=eyJ1cmwiOiJodHRwczovL21jcC5kYXRhZG9naHEuY29tL2FwaS91bnN0YWJsZS9tY3Atc2VydmVyL21jcD90b29sc2V0cz1vbmJvYXJkaW5nIiwidHlwZSI6Im9hdXRoIn0=
```
{{% /tab %}}

{{% tab "US3" %}}
```sh
cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-mcp&config=eyJ1cmwiOiJodHRwczovL21jcC51czMuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
```
{{% /tab %}}

{{% tab "US5" %}}
```sh
cursor://anysphere.cursor-deeplink/mcp/install?name=datadog-onboarding-mcp&config=eyJ1cmwiOiJodHRwczovL21jcC51czUuZGF0YWRvZ2hxLmNvbS9hcGkvdW5zdGFibGUvbWNwLXNlcnZlci9tY3A/dG9vbHNldHM9b25ib2FyZGluZyIsInR5cGUiOiJvYXV0aCJ9
```
{{% /tab %}}
{{< /tabs >}}

2. In Cursor, install the MCP, then click **Connect**.
3. If prompted to open an external website, click **Open**.
3. Confirm you see MCP tools listed for the `datadog-onboarding-mcp` server.

{{% /collapse-content %}}

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

2. Start a Claude Code session and execute the `/mcp` command inside the session.
3. Select the MCP server you added and press **Enter** to login.

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

### Deploying to production

Depending on how your application is deployed, you need to commit the changes and set or upload provided environment variables to your production environment.

## Manual setup

If you prefer manual setup, follow the in-app instructions for each product in your selected package. You can either choose manual setup from the Getting Started page or by adding a New Application from the homepage.

### Frontend monitoring
- [Frontend Error Tracking][13]
- [Session Replay][14]
- [Product Analytics][15]

### Backend monitoring
- [Backend Error Tracking][17]
- Logs from:
  - [Servers / VMs][18]
  - [Containers][19]
  - [Cloud / Integrations][20]
  - [Applications][21]
  - [APIs][22]
- Metrics:
  - [Custom metrics][23]
  - [OpenTelemetry][24]
  - [Integrations][25]

### LLM Observability
- [LLM Observability][16]

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
[13]: /studio/error_tracking/frontend
[14]: /studio/real_user_monitoring/session_replay/
[15]: /studio/product_analytics/#getting-started
[16]: /studio/llm_observability/quickstart/?tab=python#trace-an-llm-application
[17]: /studio/error_tracking/backend/getting_started/
[18]: /studio/logs/log_collection/?tab=host
[19]: /studio/logs/log_collection/?tab=container
[20]: /studio/logs/log_collection/?tab=cloudintegration
[21]: /studio/logs/log_collection/?tab=application
[22]: /studio/api/latest/logs/
[23]: /studio/metrics/custom_metrics/
[24]: /studio/metrics/open_telemetry/
[25]: https://app.datadoghq.com/integrations