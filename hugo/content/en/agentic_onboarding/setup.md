---
title: Agentic Onboarding Setup
description: Instrument your applications with Datadog using the Pup CLI `setup` command or the Datadog MCP Server.
further_reading:
- link: "https://www.datadoghq.com/blog/serverless-agentic-onboarding/"
  tag: "Blog"
  text: "Instrument serverless apps with agentic onboarding"
---

## Overview

Agentic Onboarding is a set of AI-driven tools that automate Datadog instrumentation for your applications and infrastructure:

- [Pup CLI setup](#pup-cli-setup): Set up Datadog from a terminal with `pup setup`, without a coding assistant.
- [MCP server](#mcp-server): Set up Datadog through a coding assistant (such as Claude Code or Cursor), which handles framework detection and configuration from your IDE.

The two paths are complementary and use the same Datadog account. You can install the Datadog MCP Server in your IDE and run the CLI in a terminal.

## Pup CLI setup

The [Pup CLI][20] sets up Datadog from your terminal. Use it when you don't want to install an MCP server, or for tasks the MCP setup doesn't support, such as creating a Datadog account.

The Pup CLI can:

- Create a Datadog account end-to-end from the terminal
- Link an existing Datadog account to your local environment
- Instrument local infrastructure as code (Terraform, Helm, Kustomize, Ansible, Pulumi, raw Kubernetes manifests, Docker Compose files) by editing files in place
- Instrument local application code by adding SDK initialization and configuration for supported frontends and backends

### Prerequisites

- Node.js 22 or later. `pup setup` runs Datadog's setup package with `npx`, so it needs Node.js even if you installed Pup with Homebrew or a prebuilt binary.

### Supported products

The Pup CLI can set up the following products:

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

### Run the setup command

Run `pup setup` with `npx`, passing `--site` to target your [Datadog site][16] ({{< region-param key=dd_site code="true" >}}). You don't need to install Pup first, because `npx` downloads it. If Pup is already [installed][20], run `pup setup` with the same flags.

If you've logged in with `pup auth login`, `pup setup` uses that login.

You have two options, depending on whether you already have a Datadog account:

   {{< tabs >}}
   {{% tab "Interactive setup" %}}
1. Use this option if you don't have a Datadog account, or if you want the CLI to recommend products based on your code analysis. The CLI steps you through account setup, repository analysis, and product recommendations.

   ```shell
   npx @datadog/pup setup --site datadoghq.com
   ```
   Replace the value of `--site` with the Datadog site for your account: ({{< region-param key=dd_site code="true" >}}).

1. Press <kbd>Enter</kbd> at the welcome screen and choose whether you have a Datadog account. A browser opens for OAuth (or for account creation if you don't have an account yet). Complete the flow and grant access to your Datadog account.
1. Enter the path to the repository you want to instrument.
1. With your consent, the CLI analyzes the repository in read-only mode to detect your stack.
1. Based on the detected stack, the CLI recommends up to three supported Datadog products. Recommendations are selected by default. Deselect individual recommendations, confirm the selection, or choose **View all setup options** to use the full list of setup options instead.
   
   {{% /tab %}}
   
   {{% tab "Direct setup" %}}
1. Use this option if you already have a Datadog account and know which product you want to install. Add the `--product` flag to go straight to setup and skip repository analysis and product recommendations.

   ```shell
   npx @datadog/pup setup --site datadoghq.com --product <PRODUCT>
   ```

   - Replace the value of `--site` with the Datadog site for your account: ({{< region-param key=dd_site code="true" >}}).
   - Replace `<PRODUCT>` with one of the products listed in the [Supported products](#supported-products) section.

1. Press <kbd>Enter</kbd> at the welcome screen and choose whether you have a Datadog account. A browser opens for OAuth (or for account creation if you don't have an account yet). Complete the flow and grant access to your Datadog account.

   {{% /tab %}}
   {{< /tabs >}}

#### Configure and verify your setup

1. If the CLI can't generate recommendations, or doesn't find a strong match for your repository, it directs you to the full list of setup options. For direct setup with `--product`, you start at this menu.
   {{< img src="agentic_onboarding/product-selection.png" alt="CLI menu 'What would you like to set up?' grouped by Infrastructure and Backend monitoring, Frontend Monitoring, LLM-Based applications, and CI Testing." style="width:80%;" >}}
1. The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary environment variables. Progress is reported stage by stage.
   {{< img src="agentic_onboarding/setup-example.png" alt="CLI showing 'Instrumenting your app, Stage 1 of 3: Datadog RUM (Real User Monitoring)' with progress steps." style="width:80%;" >}}
1. When setup completes, the CLI lists the products it instrumented and links to the Datadog UI to verify incoming data.

1. Commit the changes to your repository. You can edit the Datadog environment variables (API keys, application IDs) for your specific environment.

After the CLI completes, see the [Next steps](#next-steps) section to confirm data is flowing.

### Headless mode

Headless mode is designed for unattended setups. An AI coding agent, CI job, or script can run the CLI directly in your repository and complete Datadog instrumentation on its own. No person needs to be present to approve prompts or make interactive choices.

Headless mode turns on automatically when a [supported AI coding agent][21] starts `pup setup`, or when there's no interactive terminal, such as in a CI job. To turn it on yourself, add `--headless`:

```shell
DD_API_KEY=<API_KEY> DD_APP_KEY=<APP_KEY> \
  npx @datadog/pup setup \
  --headless \
  --site datadoghq.com \
  --product rum
```

In headless mode:

- `--site` is optional. If you leave it out, `pup setup` uses the `DD_SITE` environment variable, then the site Pup is configured for, then `datadoghq.com`.
- `--product` is optional. If you leave it out, `pup setup` analyzes the repository and sets up the top recommended product. To see the recommendations without changing anything, add `--recommend-only`, which prints them as JSON and exits.

Headless mode signs in with the first of these that's available:

1. Your Pup login, or the `DD_ACCESS_TOKEN` environment variable. If either is present, `pup setup` ignores `DD_API_KEY` and `DD_APP_KEY`.
1. The `DD_API_KEY` and `DD_APP_KEY` [environment variables][19]. Provide both variables together.
1. Browser OAuth. The setup command opens a browser so you can log in. This is the only step in headless mode that might need you, and it requires a localhost callback. On remote machines or fully unattended runs, use one of the other options.

By running `pup setup` in headless mode, you confirm that source-code upload and automatic command execution are authorized for the target project. This applies whether you add `--headless` or headless mode turns on automatically.

## MCP Server

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

### Step 1: Install the MCP Server

{{< tabs >}}
{{% tab "Claude Code" %}}
In an active Claude Code session, run:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1: Install deeplink (recommended)**

Click the install deeplink for your [Datadog site][1], then confirm {{< ui >}}Install{{< /ui >}} for the `datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}` server when Cursor opens.

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

### Step 2: Authenticate the MCP Server

1. After you install the MCP Server, your coding assistant prompts you to authenticate. Press <kbd>Enter</kbd> to open the Datadog OAuth screen in your browser.
1. After authentication completes, choose {{< ui >}}Open{{< /ui >}} to return to your IDE and grant the MCP Server access to your Datadog account.
1. Confirm that MCP tools appear under the `datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}` server.

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

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=aws-lambda{{< /code-block >}}

**GCP Cloud Run containers**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run containers to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=gcp-cloud-run{{< /code-block >}}

**GCP Cloud Run functions**
{{< code-block lang="text" >}}Add Datadog for GCP Cloud Run functions to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=gcp-cloud-run-functions{{< /code-block >}}

**Azure Container Apps**
{{< code-block lang="text" >}}Add Datadog for Azure Container Apps to my project{{< /code-block >}}

{{< code-block lang="shell" >}}npx @datadog/pup setup --product serverless --serverless-compute-type=azure-container-apps{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

The agent detects your stack, requests permission before each tool call, applies changes locally (without committing them), and prints verification steps.

After the agent completes, commit the changes to your repository and set any new environment variables (API keys, application IDs) in your production environment. Then see the [Next steps](#next-steps) section to confirm data is flowing.

## Next steps

Confirm data is flowing in the Datadog UI for the product you set up:

- [Error Tracking][6]
- [App and API Protection][11]
- [RUM > Applications][7]
- [Infrastructure > Hosts][8]
- [Serverless > Functions][9]
- [Logs > Live Tail][10]


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: https://app.datadoghq.com/security/appsec
[16]: /getting_started/site/
[17]: https://claude.com/product/claude-code
[18]: https://cursor.com/
[19]: /account_management/api-app-keys/
[20]: /cli/
[21]: /cli/#agent-mode
