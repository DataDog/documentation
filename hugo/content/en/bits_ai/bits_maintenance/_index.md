---
title: Bits Maintenance
description: "Learn how Bits Maintenance keeps the software on your Kubernetes clusters up to date by assessing, planning, and rolling out upgrades one environment at a time."
further_reading:
- link: "https://www.datadoghq.com/blog/bits-maintenance/"
  tag: "Blog"
  text: "Introducing Bits Maintenance, your AI teammate for infrastructure patching and upgrades"
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

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

Bits Maintenance helps you keep the software running on your Kubernetes clusters up to date, including open source software (OSS) and vendor-provided projects. When a project releases a new version, Bits Maintenance researches the changes and identifies how they affect your environment. It then generates an upgrade [campaign][2] based on your team's [instructions][4] and executes it within your guardrails.

OSS projects release new versions frequently, often due to CVE remediation or end-of-life decisions. Upgrading by hand can be slow and risky: you need to understand what changed, find breaking changes that apply to your fleet, update configurations, roll out in stages, and verify the results. Bits Maintenance handles this work for you.

{{< img src="bits_ai/maintenance/overview.png" alt="The Bits Maintenance landing page, showing supported software projects connected to Bits, a campaign waiting for approval, and a cert-manager upgrade that has completed in development and staging clusters and is waiting for human approval in production" style="width:100%;" >}}

To get started, see [Set up Bits Maintenance][6].

## Supported OSS projects

Bits Maintenance supports a specific set of OSS Kubernetes projects, including Redis, cert-manager, Argo CD, and others. See the full list of supported projects on [{{< ui >}}Bits Maintenance{{< /ui >}} > {{< ui >}}Coverage{{< /ui >}}][5]. To request support for a project, search for the project on the {{< ui >}}Coverage{{< /ui >}} page, then click {{< ui >}}Request Project Coverage{{< /ui >}}.

Bits monitors each supported project. For each release, it collects and analyzes source code, release notes, documentation, and Helm charts. This knowledge, combined with your cluster data, allows Bits to assess how new software releases affect your clusters specifically.

Some projects are experimental, meaning Datadog is evaluating the data quality and upgrade reliability for that project. Experimental projects are marked with a flask icon next to the project name. You can use experimental projects with your usual reviews and approvals.

## Ways to work with Bits Maintenance

You can work with Bits Maintenance:
- In the Datadog web application
- Using the [Datadog MCP Server][3], which has Bits Maintenance tools and skills
- Through [Bits Chat][1] and Slack (with `@Datadog`)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /bits_ai/bits_maintenance/campaigns_plans/
[3]: /mcp_server/
[4]: /bits_ai/bits_maintenance/instructions_memories/#upgrade-instructions
[5]: https://app.datadoghq.com/bits-ai/maintenance/coverage
[6]: /bits_ai/bits_maintenance/setup/
