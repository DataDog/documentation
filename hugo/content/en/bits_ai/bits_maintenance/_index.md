---
title: Bits Maintenance
description: "Learn how Bits Maintenance keeps the open source software on your Kubernetes clusters up to date by assessing, planning, and rolling out upgrades one environment at a time."
further_reading:
- link: "/containers/monitoring/"
  tag: "Documentation"
  text: "Container Monitoring"
---

## Overview

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

Bits Maintenance helps you keep the Open Source Software (OSS) you run up to date. When a project releases a new version, Bits Maintenance researches release changes, identifies how your environment is affected, generates tailored update plans, and executes within your guardrails.

OSS is constantly changing, often due to CVE remediation or end-of-life decisions. Upgrading by hand can be slow and risky: you must read understand what changed, find breaking changes that apply to your fleet, update configurations, roll out in stages, and verify the result. Instead, use Bits Maintenance as your AI teammate for OSS maintenance.

Bits Maintenance supports a [specific set of OSS projects](#supported-oss-projects) running on Kubernetes.

## How Bits Maintenance works

When an OSS project your team uses releases a new version, Bits Maintenance:

1. Assesses the changes.
2. Creates a strategy to implement the upgrade.
3. Executes the upgrade rollout.


## Supported OSS projects

Bits Maintenance supports a specific set of OSS Kubernetes projects, including Redis, cert-manager, Argo CD, and others. See the full list of supported projects on {{< ui >}}Bits Maintenance{{< /ui >}} > {{< ui >}}Coverage{{< /ui >}}.

Bits monitors each supported project. For each release, it collects and analyzes source code, release notes, documentation, and Helm charts. This knowledge, combined with your cluster data, allows Bits to assess how new software releases affect your clusters specifically.

## Ways to work with Bits Maintenance

You can work with Bits Maintenance:
- In the Datadog web applicaiton
- Using the Datadog MCP, which has Bits Maintenance tools and skills
- Through [Bits Chat][1] and Slack (with `@Datadog`)

[1]: /bits_ai/bits_chat/
