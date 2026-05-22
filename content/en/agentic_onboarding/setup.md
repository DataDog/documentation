---
title: Agentic Onboarding Setup
description: Instrument your applications with Datadog using the AI Setup CLI or the Datadog MCP Server.

---

## Overview

Agentic Onboarding is a set of tools for instrumenting your applications and infrastructure with Datadog for [Infrastructure Monitoring][4], [APM][11], [Logs][12], [Real User Monitoring (RUM)][2], [Error Tracking][1], [Product Analytics][3], [Serverless Monitoring][5], [Code Coverage][13], [Test Optimization][14], and [LLM Observability][15].

Choose the path that fits your workflow:

| Path | Use when |
|------|----------|
| [AI Setup CLI](#ai-setup-cli) | You want to set up Datadog from a terminal, without an AI coding assistant. |
| [MCP Server](#mcp-server) | You use an LLM coding assistant (such as Claude Code or Cursor) and want it to handle framework detection and configuration from your IDE. |

The two paths are complementary and use the same Datadog account. You can install the Datadog MCP Server in your IDE and run the CLI in a terminal.

## AI Setup CLI

The Datadog AI Setup CLI is a standalone tool that runs in your terminal. Use it when you don't want to install an MCP server, or for tasks the MCP setup doesn't support, such as bootstrapping a Datadog account.

The CLI can:

- Create a Datadog account end-to-end from the terminal
- Link an existing Datadog account to your local environment
- Instrument local infrastructure as code (Terraform, Helm, Kustomize, Ansible, Pulumi, raw Kubernetes manifests, Docker Compose files) by editing files in place
- Instrument local application code by adding SDK initialization and configuration for supported frontends and backends

### Install and run the CLI

1. Run the CLI with `npx`, passing `--site` to target your [Datadog site][16]. You have two options:

    **Option 1: Interactive setup.** If you don't have a Datadog account yet, or you want to choose your product interactively, run without a `--product` flag. The CLI steps you through account setup and product choice.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com
    ```

    Replace the value of `--site` with the [Datadog site][16] for your account: `datadoghq.com`, `us3.datadoghq.com`, `us5.datadoghq.com`, `datadoghq.eu`, `ap1.datadoghq.com`, or `ap2.datadoghq.com`.

    **Option 2: Direct setup.** If you already have a Datadog account and want to install a specific product, pass `--product` to skip product selection.

    ```shell
    npx @datadog/ai-setup-cli --site datadoghq.com --product <PRODUCT>
    ```

    Replace `<PRODUCT>` with one of `infrastructure`, `apm`, `logs`, `rum`, `error-tracking`, `product-analytics`, `serverless`, `code-coverage`, `test-optimization`, or `llm-observability`.

1. Complete the OAuth flow in your browser when prompted. After authentication, point the CLI to your code repository. The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary environment variables.

1. Commit the changes to your repository. You can edit the Datadog environment variables (API keys, application IDs) for your specific environment.

## MCP Server

The Datadog MCP Server exposes the `onboarding` toolset to any MCP-compatible coding assistant. After you install and authenticate the server, you instrument a project by typing a one-line prompt. The agent reads your code, calls MCP tools (with your permission), applies changes, and verifies the result.

The MCP Server supports the following frameworks:

| Product | Frameworks |
|---------|------------|
| Error Tracking, RUM, Product Analytics | Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, Vue |
| Infrastructure Monitoring (Kubernetes) | Terraform, Ansible, Kustomize, Helm, Pulumi, raw manifests |
| Serverless Monitoring (AWS Lambda) | Terraform, AWS CDK, Serverless Framework, SAM |

### Install the MCP Server

{{< tabs >}}
{{% tab "Claude Code" %}}
In an active Claude Code session, run:

   <pre><code>claude mcp add --transport http datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}} "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"</code></pre>
{{% /tab %}}

{{% tab "Cursor" %}}
1. Click the install deeplink for your [Datadog site](/getting_started/site/):

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

1. In Cursor, click {{< ui >}}Install{{< /ui >}} for the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server.

{{% collapse-content title="Manual configuration" level="h4" expanded=false %}}
If you can't use the install deeplink, add the server to `~/.cursor/mcp.json` manually instead:

<pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>
{{% /collapse-content %}}
{{% /tab %}}

{{% tab "Other MCP clients" %}}
Any MCP client that supports HTTP transport can connect to the Datadog MCP Server. Point it at the endpoint for your [Datadog site](/getting_started/site/):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>
{{% /tab %}}
{{< /tabs >}}

### Authenticate the MCP Server

1. When prompted to authenticate, press <kbd>Enter</kbd>. This opens the Datadog OAuth screen in your browser.
1. After authentication completes, choose {{< ui >}}Open{{< /ui >}} to return to your IDE and grant the MCP Server access to your Datadog account.
1. Confirm that MCP tools appear under the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server.

### Instrument your project

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

{{% tab "Kubernetes" %}}
{{< code-block lang="text" >}}Add Datadog for Kubernetes to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Docker" %}}
{{< code-block lang="text" >}}Add Datadog for Docker to my project{{< /code-block >}}
{{% /tab %}}

{{% tab "Serverless" %}}
{{< code-block lang="text" >}}Instrument my AWS Lambda functions with Datadog{{< /code-block >}}
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
