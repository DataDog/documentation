---
title: Bits Maintenance
description: "Learn how Bits Maintenance keeps the open source software on your Kubernetes clusters up to date by assessing, planning, and rolling out upgrades one environment at a time."
further_reading:
- link: "/bits_ai/bits_maintenance/setup/"
  tag: "Documentation"
  text: "Set up Bits Maintenance"
- link: "/bits_ai/bits_maintenance/campaigns_plans/"
  tag: "Documentation"
  text: "Bits Maintenance campaigns and plans"
- link: "/bits_ai/bits_maintenance/instructions_memories/"
  tag: "Documentation"
  text: "Bits Maintenance upgrade instructions and memories"
- link: "/containers/monitoring/"
  tag: "Documentation"
  text: "Container Monitoring"
---

## Overview

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

Bits Maintenance helps you keep the Open Source Software (OSS) you run up to date. When a project releases a new version, Bits Maintenance researches release changes, identifies how your environment is affected, generates an upgrade [campaign][2] according to your [upgrade instructions][4], and executes within your guardrails.

OSS is constantly changing, often due to CVE remediation or end-of-life decisions. Upgrading by hand can be slow and risky: you need to understand what changed, find breaking changes that apply to your fleet, update configurations, roll out in stages, and verify the results. You can instead use Bits Maintenance as your always-on AI teammate for OSS maintenance.

Bits Maintenance supports a [specific set of OSS projects](#supported-oss-projects) running on Kubernetes.

## How Bits Maintenance works

When an OSS project your team uses releases a new version, Bits Maintenance:

1. Assesses the changes.
2. Creates a [campaign][2] to implement the upgrade.
3. Executes the upgrade rollout.

## Supported OSS projects

Bits Maintenance supports a specific set of OSS Kubernetes projects, including Redis, cert-manager, Argo CD, and others. See the full list of supported projects on {{< ui >}}Bits Maintenance{{< /ui >}} > {{< ui >}}Coverage{{< /ui >}}.

Bits monitors each supported project. For each release, it collects and analyzes source code, release notes, documentation, and Helm charts. This knowledge, combined with your cluster data, allows Bits to assess how new software releases affect your clusters specifically.

## Ways to work with Bits Maintenance

You can work with Bits Maintenance:
- In the Datadog web application
- Using the [Datadog MCP][3], which has Bits Maintenance tools and skills
- Through [Bits Chat][1] and Slack (with `@Datadog`)

## Bits Maintenance data retention
<!-- TODO -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /bits_ai/bits_maintenance/campaigns_plans/
[3]: /mcp_server/
[4]: /bits_ai/bits_maintenance/instructions_memories/#upgrade-instructions
