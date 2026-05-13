---
title: Agentic Onboarding Setup
description: Set up Datadog instrumentation with the AI Setup CLI, the Datadog MCP Server, or task-scoped skills for Claude.

---

{{< callout btn_hidden="true" header="Join the Preview!">}}
Agentic Onboarding is in Preview.
{{< /callout >}}

## Overview

Agentic Onboarding lets LLM coding agents instrument your applications and infrastructure for [Error Tracking][1], [Real User Monitoring (RUM)][2], [Product Analytics][3], [Infrastructure Monitoring][4], and [Serverless Monitoring][5].

There are three ways to get started. Pick the one that matches how you work:

| Path | Use when |
|------|----------|
| [Setup CLI](#setup-cli) | You want a standalone command-line tool (no coding assistant required) for first-time account creation, linking an existing account, or instrumenting local infrastructure-as-code (IaC) and application code from a terminal. |
| [MCP Server](#mcp-server) | You work with an LLM coding assistant (such as Claude Code or Cursor) and want it to detect frameworks, write configuration, and provision tokens directly from your IDE. |
| [Skills](#skills) | You're using Claude and want a focused skill for a single onboarding step (such as installing the Agent or enabling a cloud integration) rather than a full MCP toolset. |

The three paths are complementary and work against the same Datadog account. You can install the Datadog MCP Server in your IDE, run the CLI in a terminal, and invoke skills from Claude.

## Setup CLI

The Datadog AI Setup CLI is a standalone tool that runs from your terminal. Use it when you don't want to install an MCP server, or when you need to do something the MCP flow doesn't cover, such as account bootstrapping.

The CLI can:

- Create a Datadog account end-to-end from the terminal
- Link an existing Datadog account to your local environment
- Instrument local infrastructure-as-code (Terraform, Helm, Kustomize, Ansible, Pulumi, raw Kubernetes manifests) by editing files in place
- Instrument local application code by adding SDK initialization and configuration for supported frontends and backends

### Install and run

Run the CLI with `npx`, replacing `<PRODUCT>` with one of: `error-tracking`, `rum`, `product-analytics`, `kubernetes`, `docker`, or `serverless`:

```shell
npx @datadog/ai-setup-cli --product <PRODUCT>
```

To walk through account setup and product selection interactively, run the CLI with no arguments:

```shell
npx @datadog/ai-setup-cli
```

A browser window opens for authentication. After you complete the OAuth flow, return to your terminal. The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary tokens.

### Example flows

**First-time user, no Datadog account yet:**

```shell
npx @datadog/ai-setup-cli
# Prompts for account creation, then product selection.
```

**Existing account, instrumenting a local Terraform repo for Kubernetes:**

```shell
cd my-k8s-terraform-repo
npx @datadog/ai-setup-cli --product kubernetes
# Detects Terraform, adds the Datadog Agent module, and writes the API key to .env.
```

After the CLI completes, see [Next steps](#next-steps).

## MCP Server

The Datadog MCP Server exposes the `onboarding` toolset to any MCP-compatible coding assistant. After you install and authenticate the server, you instrument a project by typing a one-line prompt. The agent reads your code, calls MCP tools (with your permission), applies changes, and verifies the result.

### Supported frameworks

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
Install the MCP Server using one of the following methods.

**Deeplink (recommended)**: Click the install deeplink for your [Datadog site](/getting_started/site/), then click {{< ui >}}Install{{< /ui >}} in Cursor for the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server:

   <pre><code>{{< region-param key="cursor_mcp_install_deeplink" >}}</code></pre>

**Manual configuration**: Add the server to `~/.cursor/mcp.json`:

   <pre><code>{
  "mcpServers": {
    "datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding"
    }
  }
}</code></pre>
{{% /tab %}}

{{% tab "Other MCP clients" %}}
Any MCP client that supports HTTP transport works. Point it at the endpoint for your [Datadog site](/getting_started/site/):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=onboarding</code></pre>
{{% /tab %}}
{{< /tabs >}}

### Authenticate the MCP Server

1. When prompted to authenticate, press <kbd>Enter</kbd>. This opens the Datadog OAuth screen in your browser.
1. After authentication completes, choose {{< ui >}}Open{{< /ui >}} to return to your IDE and grant the MCP Server access to your Datadog account.
1. Confirm that MCP tools appear under the **datadog-onboarding-{{< region-param key="dd_datacenter_lowercase" >}}** server.

### Instrument your project

Send the prompt that matches the product you want to install:

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

The agent detects your stack, requests permission before each tool call, applies changes, and prints verification steps.

**Note**: Your coding agent makes changes locally but does not commit them.

After the agent completes, see [Next steps](#next-steps).

## Skills

Skills are task-scoped capabilities for Claude. The Datadog MCP Server exposes a broad onboarding toolset, but a skill is a focused workflow for a single onboarding step. Use a skill when you only need one thing done and don't want to load a full MCP server.

<div class="alert alert-info">This section is in progress. Additional onboarding skills are planned, and the content below is subject to change before general availability.</div>

### Available skills

| Skill | What it does |
|-------|--------------|
| Install Datadog Agent | Detects the host or cluster type and installs the Datadog Agent with the right configuration. |
| Enable cloud integration | Wires up AWS, GCP, or Azure cloud integrations against your Datadog account. |

### Invoke a skill

Skills are discoverable inside Claude. From a Claude conversation:

1. Reference the skill by name (for example, "install the Datadog Agent on this host").
1. Claude loads the skill, asks for any required credentials or scope (such as host or cluster type, or cloud account ID), and walks through the steps.
1. The skill prints verification commands when it finishes.

Skills work standalone, so you don't need the MCP Server installed to use them. After the skill completes, see [Next steps](#next-steps).

## Next steps

After your setup completes:

- Commit the agent-generated configuration to your repository, and set any new environment variables (API keys, application IDs) in your production environment. For team-wide rollout, propagate these variables through your secret manager.
- Confirm data is flowing in the Datadog UI: [APM > Services][6], [RUM > Applications][7], [Infrastructure > Hosts][8], or [Logs > Live Tail][9].

[1]: /error_tracking/frontend/
[2]: /real_user_monitoring/
[3]: /product_analytics/
[4]: /containers/kubernetes/
[5]: /serverless/
[6]: https://app.datadoghq.com/services
[7]: https://app.datadoghq.com/rum/list
[8]: https://app.datadoghq.com/infrastructure
[9]: https://app.datadoghq.com/logs/livetail
