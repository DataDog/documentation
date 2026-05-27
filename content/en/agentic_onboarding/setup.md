---
title: Agentic Onboarding Setup
description: Instrument your applications with Datadog using the AI Setup CLI or the Datadog MCP Server.

---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Agentic Onboarding is a set of AI-driven tools that automate Datadog instrumentation for your applications and infrastructure:

- [AI Setup CLI](#ai-setup-cli): Set up Datadog from a terminal, without an AI coding assistant.
- [MCP Server](#mcp-server): Set up Datadog through an LLM coding assistant (such as Claude Code or Cursor), which handles framework detection and configuration from your IDE.

The two paths are complementary and use the same Datadog account. You can install the Datadog MCP Server in your IDE and run the CLI in a terminal.

## AI Setup CLI

The Datadog AI Setup CLI is a standalone terminal tool. Use it when you don't want to install an MCP server, or for tasks the MCP setup doesn't support, such as bootstrapping a Datadog account.

The CLI can:

- Create a Datadog account end-to-end from the terminal
- Link an existing Datadog account to your local environment
- Instrument local infrastructure as code (Terraform, Helm, Kustomize, Ansible, Pulumi, raw Kubernetes manifests, Docker Compose files) by editing files in place
- Instrument local application code by adding SDK initialization and configuration for supported frontends and backends

### Prerequisites

- Node.js 20 or later
- An existing Datadog account (optional — the CLI can create one for you)

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
    - Replace `<PRODUCT>` with one of `infra-monitoring`, `rum`, `error-tracking`, `product-analytics`, `serverless`, `studio`, `code-coverage`, `test-optimization`, or `llm-observability`.

1. Complete the OAuth flow in your browser when prompted. 

1. Return to your terminal, and point the CLI to your code repository. The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary environment variables.

1. Commit the changes to your repository. You can edit the Datadog environment variables (API keys, application IDs) for your specific environment.

After the CLI completes, see [Next steps](#next-steps).

## MCP Server

The Datadog MCP Server exposes the `onboarding` toolset to any MCP-compatible coding assistant. After you install and authenticate the server, you instrument a project by typing a one-line prompt. The agent reads your code, calls MCP tools (with your permission), applies changes, and verifies the result.

### Prerequisites

- An MCP-compatible coding assistant, such as [Claude Code][17] or [Cursor][18]
- A Datadog account

### Supported frameworks

| Product | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Infrastructure Monitoring (Kubernetes) | Terraform, Ansible, Kustomize, Helm, Pulumi, raw manifests |
| Serverless Monitoring (AWS Lambda) | Terraform, AWS CDK, Serverless Framework, SAM |

### Step 1: Install the MCP Server

{{< tabs >}}
{{% tab "Claude Code" %}}
In an active Claude Code session, run:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
**Option 1: Install deeplink (recommended).** Click the install deeplink for your [Datadog site](/getting_started/site/), then confirm {{< ui >}}Install{{< /ui >}} for the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server when Cursor opens.

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Option 2: Manual configuration.** Add the server to `~/.cursor/mcp.json`:

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>
{{% /tab %}}

{{% tab "Other MCP clients" %}}

Any MCP client that supports HTTP transport can connect to the Datadog MCP Server. Point it at the endpoint for your [Datadog site](/getting_started/site/):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>

{{% /tab %}}
{{< /tabs >}}

### Step 2: Authenticate the MCP Server

1. When prompted to authenticate, press <kbd>Enter</kbd>. This opens the Datadog OAuth screen in your browser.
1. After authentication completes, choose {{< ui >}}Open{{< /ui >}} to return to your IDE and grant the MCP Server access to your Datadog account.
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


{{% tab "Serverless Monitoring" %}}

**AWS Lambda**
{{< code-block lang="text" >}}Instrument my AWS Lambda functions with Datadog{{< /code-block >}}
```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda
```

**GCP Cloud Run containers**
{{< code-block lang="text" >}}Help me monitor my GCP Cloud Run services with Datadog{{< /code-block >}}

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run
```

**GCP Cloud Run functions**
{{< code-block lang="text" >}}Help me monitor my GCP Cloud Run functions with Datadog{{< /code-block >}}

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```


{{% /tab %}}

{{< /tabs >}}

The agent detects your stack, requests permission before each tool call, applies changes locally (without committing them), and prints verification steps. After the agent completes, commit the changes to your repository and set any new environment variables (API keys, application IDs) in your production environment. Then see [Next steps](#next-steps) to confirm data is flowing.

## Next steps

- Confirm data is flowing in the Datadog UI for the product you set up: [Error Tracking][6], [RUM > Applications][7], [Infrastructure > Hosts][8], [Serverless > Functions][9], or [Logs > Live Tail][10].
- For team-wide rollout, propagate environment variables through your secret manager.

[1]: /error_tracking/frontend/
[2]: /real_user_monitoring/
[3]: /product_analytics/
[4]: /containers/kubernetes/
[5]: /serverless/
[6]: https://app.datadoghq.com/error-tracking
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/functions
[10]: https://app.datadoghq.com/logs/livetail
[11]: /tracing/
[12]: /logs/
[13]: /tests/code_coverage/
[14]: /tests/test_optimization/
[15]: /llm_observability/
[16]: /getting_started/site/
[17]: https://claude.ai/code
[18]: https://cursor.com/
