---
title: Agentic Onboarding Setup
description: Set up Datadog with the AI Setup CLI, the Datadog MCP Server, or agent skills for AI coding agents.
further_reading:
- link: "https://github.com/datadog-labs/agent-skills"
  tag: "GitHub"
  text: "Datadog skills for AI agents"
- link: "https://www.datadoghq.com/blog/serverless-agentic-onboarding/"
  tag: "Blog"
  text: "Instrument serverless apps with agentic onboarding"
---

## Overview

Agentic Onboarding is a set of AI-driven tools that automate Datadog instrumentation for your applications and infrastructure:

- [AI Setup CLI](#ai-setup-cli): Set up Datadog from a terminal, without a coding assistant.
- [MCP server](#mcp-server): Set up Datadog through a coding assistant (such as Claude Code or Cursor), which handles framework detection and configuration from your IDE.
- [Agent skills](#agent-skills): Give an AI coding agent task-specific instructions for Datadog setup and other workflows.

Use these tools together or choose the option that fits your workflow.

## AI Setup CLI

The Datadog AI Setup CLI is a standalone terminal tool. Use it when you don't want to install an MCP server, or for tasks the MCP setup doesn't support, such as creating a Datadog account.

The CLI can:

- Create a Datadog account end-to-end from the terminal
- Link an existing Datadog account to your local environment
- Instrument local infrastructure as code (Terraform, Helm, Kustomize, Ansible, Pulumi, raw Kubernetes manifests, Docker Compose files) by editing files in place
- Instrument local application code by adding SDK initialization and configuration for supported frontends and backends

### Prerequisites

- Node.js 22 or later

### Supported products

The CLI can set up the following products:

| Product | Identifier |
|---------|------------|
| App and API Protection | `app_and_api_protection` |
| Code Coverage | `ci_code_coverage` |
| Docker | `docker` |
| Error Tracking | `error-tracking` |
| Infrastructure Monitoring | `infra-monitoring` |
| Linux | `linux` |
| Agent Observability | `llm-obs` |
| OpenTelemetry | `otel` |
| Product Analytics | `product-analytics` |
| Real User Monitoring (RUM) | `rum` |
| Serverless Monitoring | `serverless` |
| Studio | `studio` |
| Test Optimization | `test-optimization` |

### Install and run the CLI

1. Run the CLI with `npx`, passing `--site` to target your [Datadog site][16]. You have two options, depending on whether you already have a Datadog account:

    **Option 1: Interactive setup.** If you don't have a Datadog account yet, or you want to choose your product interactively, run without a `--product` flag. The CLI steps you through account setup and product choice.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com
    ```

    Replace the value of `--site` with the [Datadog site][16] for your account: `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, `ap2.datadoghq.com`, or `uk1.datadoghq.com`.

    **Option 2: Direct setup.** If you already have a Datadog account and want to install a specific product, pass `--product` to skip product selection.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
    ```

    - Replace the value of `--site` with the [Datadog site][16] for your account.
    - Replace `<PRODUCT>` with one of the [supported products](#supported-products).

1. Press <kbd>Enter</kbd> at the welcome screen and choose whether you have a Datadog account. A browser opens for OAuth (or for account creation if you don't have an account yet). Complete the flow and grant access to your Datadog account.

1. If you ran the CLI without `--product`, select what to set up from the product menu. (Direct setup with `--product` skips this menu.)

   {{< img src="agentic_onboarding/product-selection.png" alt="CLI menu 'What would you like to set up?' grouped by Infrastructure and Backend monitoring, Frontend Monitoring, LLM-Based applications, and CI Testing." style="width:80%;" >}}

   The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary environment variables. Progress is reported stage by stage.

   {{< img src="agentic_onboarding/setup-example.png" alt="CLI showing 'Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring)' with progress steps." style="width:80%;" >}}

   When setup completes, the CLI lists the products it instrumented and links to the Datadog UI to verify incoming data.

   {{< img src="agentic_onboarding/success.png" alt="CLI showing 'Setup complete!' with check marks next to RUM, Error Tracking, and Product Analytics." style="width:80%;" >}}

1. Commit the changes to your repository. You can edit the Datadog environment variables (API keys, application IDs) for your specific environment.

After the CLI completes, see [Next steps](#next-steps).

### Headless mode

Headless mode is designed for unattended setups. An AI coding agent, CI job, or script can run the CLI directly in your repository and complete Datadog instrumentation on its own. No person needs to be present to approve prompts or make interactive choices.

Use `--headless` to skip the interactive UI. It requires both `--site` and `--product`:

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/ai-setup-cli \
  --headless \
  --site datadoghq.com \
  --product rum
```

Set the `DD_API_KEY` and `DD_APP_KEY` [environment variables][19] to authenticate without user interaction. Provide both variables together.

Alternatively, omit the API and application keys to authenticate with browser OAuth. OAuth is the only part of a headless run that might require user interaction, and it requires a localhost callback. For remote or fully unattended environments, use the `DD_API_KEY` and `DD_APP_KEY` environment variables instead.

By using `--headless`, you confirm that source-code upload and automatic command execution are authorized for the target project.

## MCP server

The Datadog MCP Server exposes the `onboarding` toolset to any MCP-compatible coding assistant. After you install and authenticate the server, you instrument a project by typing a one-line prompt. The agent reads your code, calls MCP tools (with your permission), applies changes, and verifies the result.

### Prerequisites

- An MCP-compatible coding assistant, such as [Claude Code][17] or [Cursor][18]
- A Datadog account

### Supported frameworks

| Product | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Kubernetes Observability | Helm, Kustomize, raw manifests, Terraform, Pulumi, Ansible (across GKE, EKS, AKS, minikube, and others such as kind, k3s, and OpenShift) |
| Docker Observability | `docker-compose` and sidecar (`docker run`) deployments; Terraform, Ansible, and other IaC (Pulumi, CloudFormation, Puppet, Chef) |
| Linux Observability | Terraform, Ansible, other IaC (Pulumi, CloudFormation, Puppet, Chef), and plain-shell install |
| Serverless Monitoring (AWS Lambda) | AWS SAM, AWS CDK, Serverless Framework, Terraform, `datadog-ci lambda instrument` |
| Serverless Monitoring (GCP Cloud Run and Cloud Run Functions) | Terraform, `gcloud run deploy`, Cloud Run YAML, Dockerfile, Gen 2 `gcloud functions deploy` |
| Serverless Monitoring (Azure Container Apps) | Terraform, Bicep, ARM template, `azure.yaml` (azd), `az containerapp` CLI |
| Agent Observability | OpenAI, Anthropic, LangChain, Vercel AI SDK (auto-detected from project dependencies) |
| OpenTelemetry | Node.js / server-side TS, Browser JS / React / Vite, Python (Django, Flask, FastAPI), Java, Go |
| App and API Protection | Python, Node.js, Java, Go, Ruby, .NET, PHP, and proxies (Envoy, HAProxy) for Linux, Windows, Kubernetes, Docker, GCP Cloud Run, and AWS Lambda, AWS Fargate/ECS |
| Code Coverage, Test Optimization | Jest, Vitest, Mocha, Playwright, Cypress, pytest, unittest, JUnit, TestNG, RSpec, minitest, xUnit, NUnit, MSTest v2, `go test`, XCTest / Swift Testing |

### Step 1: Install the MCP server

{{< tabs >}}
{{% tab "Claude Code" %}}
In an active Claude Code session, run:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1: Install deeplink (recommended)**

Click the install deeplink for your [Datadog site][1], then confirm {{< ui >}}Install{{< /ui >}} for the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server when Cursor opens.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Option 2: Manual configuration**

Add the server to `~/.cursor/mcp.json`:

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>

[1]: /getting_started/site/

{{% /tab %}}

{{% tab "Other MCP clients" %}}

Any MCP client that supports HTTP transport can connect to the Datadog MCP Server. Point it at the endpoint for your [Datadog site][1]:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

[1]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Step 2: Authenticate the MCP server

1. After you install the MCP server, your coding assistant prompts you to authenticate. Press <kbd>Enter</kbd> to open the Datadog OAuth screen in your browser.
1. After authentication completes, choose {{< ui >}}Open{{< /ui >}} to return to your IDE and grant the MCP server access to your Datadog account.
1. Confirm that MCP tools appear under the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server.

### Step 3: Instrument your project

Send the prompt that matches the product you want to set up:

{{< tabs >}}
{{% tab "Error Tracking" %}}
{{< code-block lang="text" >}}Add Datadog Error Tracking to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Real User Monitoring" %}}
{{< code-block lang="text" >}}Add Datadog Real User Monitoring to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Product Analytics" %}}
{{< code-block lang="text" >}}Add Datadog Product Analytics to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Infrastructure Monitoring" %}}

**Kubernetes**
{{< code-block lang="text" >}}Add Datadog for Kubernetes to my project{{< /code-block >}}

**Docker**
{{< code-block lang="text" >}}Add Datadog for Docker to my project{{< /code-block >}}

{{% /tab %}}

{{% tab "App and API Protection" %}}
{{< code-block lang="text" >}}Add Datadog App and API Protection to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Add Datadog for AWS Lambda to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**GCP Cloud Run containers**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**GCP Cloud Run functions**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

The agent detects your stack, requests permission before each tool call, applies changes locally (without committing them), and prints verification steps.

After the agent completes, commit the changes to your repository and set any new environment variables (API keys, application IDs) in your production environment. Then see [Next steps](#next-steps) to confirm data is flowing.

## Agent skills

Agent skills give AI coding agents reusable instructions for Datadog tasks. Each skill has a `SKILL.md` file with its purpose, prerequisites, and workflow. Use skills from the [agent skills repository][20] with a compatible agent, such as Claude Code, Codex CLI, or Cursor.

### Guided setup with the orchestrator

Use [`dd-orchestrator`][21] to turn a goal, such as "monitor this application", into a setup plan. The orchestrator:

1. Validates your Datadog account through [`dd-account-setup`][22].
2. Uses the products you name, or asks [`dd-product-recommender`][23] to recommend products for your goal.
3. Detects the project's platform and cloud provider, then plans the required setup and verification steps.
4. Asks you to approve the plan, then runs the required skills in order, loading them from their source when needed.

Cloud integrations are optional. The orchestrator reports unsupported steps and stops dependent steps if a skill fails.

### Available skills

Use a specific skill when you already know the task. Follow the linked definitions for requirements and supported workflows.

| Skill or group | Use it to |
|----------------|-----------|
| [`dd-account-setup`][22], [`dd-product-recommender`][23] | Connect a Datadog account and identify relevant products. |
| [`dd-apm`][24] | Set up Single Step Instrumentation, verify tracing, and investigate service performance. |
| [`dd-instrument-rum`][25] | Add or repair Browser RUM instrumentation. |
| [`dd-browser-sdk`][26] | Configure RUM, Logs, and Session Replay, or upgrade SDK versions. |
| [AWS][27], [Azure][28], [Google Cloud][29], [Oracle Cloud Infrastructure][30] | Configure cloud integrations with Terraform. |
| [`dd-logs`][31] | Search logs, manage archives, and control logging costs. |
| [`dd-monitors`][32] | Find, create, update, and mute monitors. |
| [`dd-audit`][33] | Investigate changes, key use, costs, and AI activity in Audit Trail. |
| [Agent Observability][34] | Diagnose trace failures, compare experiments, generate evaluators, and classify sessions. |
| [Software Delivery][35] | Investigate failing pull request pipelines and flaky tests. |
| [`datadog-app`][36] | Create, run, and publish Datadog Apps. |
| [`k9-ownership-byod-setup`][37] | Define resource ownership preferences in a reference table. |
| [`dd-pup`][38] | Authenticate and use the Pup CLI for Datadog API operations. |
| [`dd-docs`][39] | Find Datadog documentation and product limits. |

To list all skills, including those within groups, run:

```shell
npx skills add datadog-labs/agent-skills --list --full-depth
```

### Install and use a skill

With Node.js and `npx` installed, run this command from your project directory:

```shell
npx skills add datadog-labs/agent-skills --skill dd-orchestrator --full-depth
```

Select your agent and installation scope when prompted. Replace `dd-orchestrator` with another skill name to install it directly. Complete the skill's prerequisites, such as authenticating the [Pup CLI][40] or connecting the [Datadog MCP Server][41].

Open the project in your agent and enter:

```text
Use the dd-orchestrator skill to set up Datadog for this project.
```

For product-specific examples, see [RUM Browser Monitoring][42] and [Single Step APM Instrumentation][43].

## Next steps

Confirm data is flowing in the Datadog UI for the product you set up:

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /getting_started/site/
[17]: https://www.anthropic.com/claude-code
[18]: https://cursor.com/
[19]: /account_management/api-app-keys/
[20]: https://github.com/datadog-labs/agent-skills
[21]: https://github.com/datadog-labs/agent-skills/blob/main/dd-orchestrator/SKILL.md
[22]: https://github.com/datadog-labs/agent-skills/blob/main/dd-account-setup/SKILL.md
[23]: https://github.com/datadog-labs/agent-skills/blob/main/dd-product-recommender/SKILL.md
[24]: https://github.com/datadog-labs/agent-skills/blob/main/dd-apm/SKILL.md
[25]: https://github.com/datadog-labs/agent-skills/blob/main/dd-instrument-rum/SKILL.md
[26]: https://github.com/datadog-labs/agent-skills/blob/main/dd-browser-sdk/SKILL.md
[27]: https://github.com/datadog-labs/agent-skills/blob/main/dd-aws-integration/SKILL.md
[28]: https://github.com/datadog-labs/agent-skills/blob/main/dd-azure-integration/SKILL.md
[29]: https://github.com/datadog-labs/agent-skills/blob/main/dd-gcp-integration/SKILL.md
[30]: https://github.com/datadog-labs/agent-skills/blob/main/dd-oci-integration/SKILL.md
[31]: https://github.com/datadog-labs/agent-skills/blob/main/dd-logs/SKILL.md
[32]: https://github.com/datadog-labs/agent-skills/blob/main/dd-monitors/SKILL.md
[33]: https://github.com/datadog-labs/agent-skills/blob/main/dd-audit/SKILL.md
[34]: https://github.com/datadog-labs/agent-skills/tree/main/agent-observability
[35]: https://github.com/datadog-labs/agent-skills/tree/main/dd-software-delivery
[36]: https://github.com/datadog-labs/agent-skills/blob/main/dd-apps/datadog-app/SKILL.md
[37]: https://github.com/datadog-labs/agent-skills/blob/main/dd-security/csm/ownership-agent/SKILL.md
[38]: https://github.com/datadog-labs/agent-skills/blob/main/dd-pup/SKILL.md
[39]: https://github.com/datadog-labs/agent-skills/blob/main/dd-docs/SKILL.md
[40]: /cli/
[41]: /mcp_server/setup/
[42]: /real_user_monitoring/application_monitoring/browser/
[43]: /tracing/trace_collection/single-step-apm/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
