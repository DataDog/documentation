---
title: Agentic Onboarding Setup
description: Instrument your applications with Datadog using the AI Setup CLI or the Datadog MCP Server.

---

## Overview

Agentic Onboarding is a set of AI-driven tools that automate Datadog instrumentation for your applications and infrastructure:

- [AI Setup CLI](#ai-setup-cli): Set up Datadog from a terminal, without a coding assistant.
- [MCP server](#mcp-server): Set up Datadog through a coding assistant (such as Claude Code or Cursor), which handles framework detection and configuration from your IDE.

The two paths are complementary and use the same Datadog account. You can install the Datadog MCP Server in your IDE and run the CLI in a terminal.

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

    Replace the value of `--site` with the [Datadog site][16] for your account: `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, or `ap2.datadoghq.com`.

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

{{% tab "App and API Protection (Preview)" %}}
<div class="alert alert-info">Agentic onboarding for App and API Protection is in Public Preview.</div>

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


{{% /tab %}}

{{< /tabs >}}

The agent detects your stack, requests permission before each tool call, applies changes locally (without committing them), and prints verification steps.

After the agent completes, commit the changes to your repository and set any new environment variables (API keys, application IDs) in your production environment. Then see [Next steps](#next-steps) to confirm data is flowing.

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
