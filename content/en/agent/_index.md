---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  tag: "Documentation"
  text: "Why install the Agent on cloud instances?"
- link: "https://www.datadoghq.com/blog/dont-fear-the-agent/"
  tag: "Blog"
  text: "Don't fear the Agent"
aliases:
  - /agent/faq/agent-check-directory-structure
  - /agent/faq/install-core-extra
  - /logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
  - /agent/faq/the-datadog-agent-for-logs-or-traces-only
---

<div class="alert alert-info">
Agent v7 is available. <a href="/agent/versions/upgrade_to_agent_v7">Upgrade to the newest version</a> to benefit from all new functionality.
</div>

## Overview

The Datadog Agent is software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog, where you can analyze your monitoring and performance data. The Datadog Agent is open-source, and its source code is available on GitHub at [DataDog/datadog-agent][1].

Packages are available for 64-bit x86 and Arm v8 architectures. For other architectures, use the source install.

{{< partial name="platforms/platforms.html" links="platforms" >}}

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/basic_agent_usage">}}<u>Basic Agent Usage</u>: Find out more about the Datadog Agent, including architecture details, CLI, overhead, and configuration management tools.{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}<u>Docker</u>: Install and configure the Datadog Agent on Docker. {{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Install and configure the Datadog Agent on Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/autodiscovery">}}<u>Autodiscovery</u>: Autodiscovery enables you to automatically track which services are running where.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Log Collection</u>: Enable and configure log collection in the Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/proxy">}}<u>Proxy</u>: If your network configuration restricts outbound traffic, use a proxy for Agent traffic.{{< /nextlink >}}
  {{< nextlink href="/agent/faq/upgrade-to-agent-v6">}}<u>Upgrade to Agent v6</u>: Agent 6 is the latest major version of the Datadog Agent. Find out how to upgrade.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Troubleshooting</u>: Find troubleshooting information for the Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guides</u>: These are in-depth, step-by-step tutorials for using the Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Security</u>: Information on the main security capabilities and features available to customers to ensure their environment is secure.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
