---
title: Getting Started
description: Set up pre-configured monitoring packages for your frontend, backend, or LLM application using agentic or manual setup.
type: studio
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog Studio is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

Datadog Studio gives small development teams production-grade observability without the overhead. Instead of manually configuring individual products and piecing together monitoring tools, Studio provides pre-configured monitoring packages for frontend, backend, or LLM/AI applications that work out of the box. 

Choose [**agentic setup**](#agentic-setup) to let AI assistants (Cursor or Claude) automatically detect your application type and configure the right features for your codebase, or use [**manual setup**](#manual-setup) for full control. After configuration, your application immediately sends telemetry to Datadog for error tracking, performance insights, and user analytics—so you can focus on building features instead of debugging infrastructure.

## Studio vs Datadog

Studio is built for developers at AI-native companies who prioritize rapid iteration, fast deployment, and verifying their application works—not optimizing infrastructure or fine-tuning CI/CD pipelines.

| | Studio | Datadog |
|---|--------|---------|
| **Best for** | Developers at lean, fast-moving companies | Enterprise teams with dedicated DevOps/SRE |
| **Focus** | Ship fast, catch bugs, understand users | Infrastructure monitoring, performance optimization, compliance |
| **Setup** | 5-10 minutes with pre-configured packages | Full control over 20+ products |
| **Unique capabilities** | Automated validation agent, live debugging, production-aware coding assistance | Advanced APM, infrastructure monitoring, security |

### What Studio helps you do

**Ship code fast without breaking things**
Go from idea → code → deploy with minimal friction. Studio's automated validation agent detects what changed across code, configs, and UI on every PR, commit, merge, or deploy—catching regressions before they reach users.

**Catch and fix production errors early**
Get alerted to errors that impact your business. Studio gathers debugging context automatically, so you can fix issues without redeploying or reproducing locally. Live debugging lets you investigate directly in production.

**Understand your users**
See who your users are and what they do. Use session context to diagnose issues, improve flows, and enhance user experience.

**Choose Datadog if you:**
- Need comprehensive infrastructure monitoring across complex environments
- Require advanced APM distributed tracing or security compliance
- Have dedicated DevOps/SRE teams managing observability

## Features by application type

Studio automatically configures the following features based on your application type:
| Application Type       | Features Included |
|------------------------|--------------|
| Frontend applications  | [Error Tracking][1], [Session Replay][2], [Product Analytics][3] |
| Backend services       | [Error Tracking][1], [Logs][4], [Metrics][5] |
| LLMs / AI agents       | [LLM Observability and AI Agent Monitoring][6] |

## Prerequisites

Before you begin:

- **Datadog Studio account**: [Sign up for free][7] if you don't have one
- **Development environment**: Access to your application's codebase
- **For agentic setup**: [Cursor][8] or [Claude Code][9] installed and configured
- **For manual setup**: Ability to install packages and modify configuration files in your project

No API keys are required upfront, as authentication is handled during the setup process.

## Setup

To get started using Datadog Studio, select your setup method:

- [**Agentic setup**](#agentic-setup): Let AI assistants ([Cursor][8] or [Claude][9]) automatically install and configure Datadog SDKs in your codebase. This setup method is only available for [specific platforms](#supported-platforms).
- [**Manual setup**](#manual-setup): Follow step-by-step instructions to install and configure Datadog SDKs yourself. This method gives you full control over the integration.

## Agentic setup

With agentic setup, your AI coding assistant analyzes your project, identifies the appropriate monitoring features, and automatically configures Datadog SDKs in your codebase. The AI agent installs dependencies, adds initialization code, and sets up environment variables—all with your approval at each step. Setup typically takes 5-10 minutes.

### Supported platforms
Agentic setup is available for the following platforms:

| Application Type | Supported Platforms |
|-----------------|---------------------|
| Frontend applications | Next.js, React, Svelte, Vanilla JavaScript (Angular is not supported), Vue |
| LLM and AI agent applications | Python or Node.js from scripts using [OpenAI's Responses API][10] to complex FastAPI applications powered by [LangGraph][11], or rich chatbot experiences built on [Vercel's AI SDK][12] |

### 1. Install the Datadog onboarding MCP server

The Datadog Model Context Protocol (MCP) server enables your AI agent to access Datadog's onboarding tools. This is a one-time setup per AI client.

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
   claude mcp add --transport http datadog-onboarding-eu1 "https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp?toolsets=onboarding"
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

### 2. Configure your project

After installing the MCP server, use a prompt to start the configuration process. Your AI agent detects your application type, installs the appropriate SDKs, and configures monitoring features automatically.

**What happens when you run the prompt:**
1. The agent analyzes your project structure, dependencies, and framework
2. It determines which monitoring features to enable (frontend, backend, or LLM)
3. It requests permission to install packages and modify configuration files
4. It adds initialization code and environment variables
5. It provides testing steps to verify the setup

**To configure your project:**

1. Open your AI coding assistant in your project directory

2. Copy and paste this prompt:

   ```console
   Add Datadog Studio to my project
   ```

3. Review each proposed change and accept the actions to complete setup (approximately 5-10 minutes)

The agent does not commit any changes automatically—you maintain full control over what gets added to your codebase.

### 3. Verify and deploy

**Local verification:**
1. Start your application locally
2. Generate some activity (pageviews, errors, or API calls)
3. Check your terminal for confirmation that telemetry is being sent

**Deploy to production:**
1. Commit the configuration changes to your repository
2. Add the environment variables provided during setup to your hosting platform (Vercel, Netlify, AWS, etc.)
3. Deploy your application

**View your data:**
After deploying, telemetry appears in Datadog Studio within 1-2 minutes:
- **Frontend apps**: View error tracking, session replays, and analytics in the [RUM Explorer][13]
- **Backend services**: Check logs and metrics in the [Logs][14] and [Metrics Explorer][15]
- **LLM apps**: Monitor traces and costs in [LLM Observability][16]

If data doesn't appear after 5 minutes, check that environment variables are set correctly in your production environment.

## Manual setup

Manual setup gives you full control over the integration process. Install SDKs, configure initialization code, and set environment variables yourself by following step-by-step instructions.

**Setup workflow:**
1. Navigate to the [Studio Getting Started page][17] or add a New Application from the homepage
2. Select your application type (frontend, backend, or LLM)
3. Follow the in-app instructions specific to your framework and language
4. Install the required packages using your package manager
5. Add initialization code to your application entry point
6. Configure environment variables with your API keys
7. Deploy and verify data appears in Studio

Typical setup time: 15-30 minutes depending on your application complexity.

### Frontend monitoring

Set up browser-based monitoring for web applications. **Recommended order**: Error Tracking → Session Replay → Product Analytics.

{{< whatsnext desc="Follow the in-app setup instructions for each frontend product:" >}}
   {{< nextlink href="/studio/error_tracking/frontend" >}}Frontend Error Tracking{{< /nextlink >}}
   {{< nextlink href="/studio/real_user_monitoring/session_replay/" >}}Session Replay{{< /nextlink >}}
   {{< nextlink href="/studio/product_analytics/#getting-started" >}}Product Analytics{{< /nextlink >}}
{{< /whatsnext >}}

### Backend monitoring

Set up server-side monitoring for APIs and services. Start with your primary log source (host, container, or cloud), then add Error Tracking and custom metrics as needed.

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

Monitor AI applications, agents, and LLM API calls. Works with OpenAI, Anthropic, LangChain, LangGraph, and more.

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
[13]: https://app.datadoghq.com/rum/explorer
[14]: https://app.datadoghq.com/logs
[15]: https://app.datadoghq.com/metric/explorer
[16]: https://app.datadoghq.com/llm/overview
[17]: https://app.datadoghq.com/studio/getting-started
