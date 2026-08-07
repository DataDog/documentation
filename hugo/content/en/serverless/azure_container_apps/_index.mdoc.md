---
title: Azure Container Apps
description: "Set up Datadog monitoring for Azure Container Apps with agentic onboarding or manual serverless-init instrumentation."
aliases:
  - /serverless/guide/aca_serverless_init/
further_reading:
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Container Apps services'
  - link: 'http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/'
    tag: 'Blog'
    text: 'Build secure and scalable Azure serverless applications with the Well-Architected Framework'
  - link: "/integrations/azure/"
    tag: "Documentation"
    text: "Azure Integration"
  - link: "/mcp_server/tools/#serverless_onboarding"
    tag: "Documentation"
    text: "Datadog MCP Server: serverless_onboarding tool"
---

## Overview

Azure Container Apps is a fully managed serverless platform for deploying and scaling
containerized applications. Datadog monitors Container Apps in two layers:

- The Azure Integration collects standard metrics and logs.
- The Datadog `serverless-init` Agent adds distributed tracing, enhanced metrics, custom
  metrics, and direct log collection. [Enhanced metrics](/integrations/azure-container-apps/#metrics) are distinguished with the `azure.app_containerapps.enhanced.*` namespace.

First, set up the [Azure Integration](/integrations/azure/) to collect metrics and logs. 

Then, use the guides below to instrument your application using agentic onboarding or manual instrumentation. 

## Set up with agentic onboarding

Use [agentic onboarding][1] to set up monitoring for your Azure Container Apps with AI assistance. Two complementary paths use the same Datadog account:

- **AI Setup CLI**: A standalone terminal tool. Use it when you don't want to install an MCP server.
- **MCP server**: Set up from your IDE through a coding assistant such as Claude Code or Cursor.

[1]: /agentic_onboarding/setup

{% tabs %}
{% tab label="AI Setup CLI" %}

Run the CLI in your project directory (requires Node.js 22+). It links your Datadog account, then instruments your Azure Container Apps service:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=azure-container-apps
```

Omit `--product` to run interactively, or add `--site` to target your Datadog site.

{% /tab %}
{% tab label="MCP server" %}

Use the Datadog MCP Server's [`serverless_onboarding`][2] tool. After you connect, try a prompt like:

```
Help me monitor my Azure Container Apps services with Datadog
```

[2]: /agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server
{% /tab %}
{% /tabs %}

## Manual instrumentation

To instrument your application yourself, see [Manual instrumentation][3]. It covers the tradeoffs for in-container and sidecar approaches, with per-runtime setup steps, environment variables, and troubleshooting.

[3]: /serverless/azure_container_apps/manual_instrumentation/
