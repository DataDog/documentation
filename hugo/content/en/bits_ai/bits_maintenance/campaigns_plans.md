---
title: Campaigns and Plans
description: "Learn how Bits Maintenance uses campaigns and plans to roll out open source software upgrades across your Kubernetes clusters in ordered stages."
further_reading:
- link: "/bits_ai/bits_maintenance/"
  tag: "Documentation"
  text: "Bits Maintenance"
- link: "/bits_ai/bits_maintenance/setup/"
  tag: "Documentation"
  text: "Set up Bits Maintenance"
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

[Bits Maintenance][1] creates a [campaign](#campaigns) to coordinate the rollout of multiple installations of a software project across your fleet through ordered stages. Each stage of a campaign has a [plan](#plans).

## Campaigns

A campaign can upgrade one software project across many clusters, or several software projects on one cluster.

### Project campaigns vs. cluster campaigns

There are two types of campaigns: project campaigns and cluster campaigns. Each type indicates the starting point for the campaign:

- Project campaign: Start by choosing a software project, and upgrade its installations across all or selected clusters.
    - Project campaigns can define a [rollout order][3]—for example, development clusters first, then staging, then production.
- Cluster campaign: Start by choosing a cluster, and upgrade all or selected software projects on it.

### Create a campaign

To create a campaign in Datadog:
1. Navigate to [{{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Campaigns{{< /ui >}}][5].
1. Click {{< ui >}}Create Campaign{{< /ui>}}.
1. Choose a [campaign type](#project-campaigns-vs-cluster-campaigns): {{< ui >}}Project{{< /ui>}} or {{< ui >}}Cluster{{< /ui>}}.
1. Fill in the required fields, then click {{< ui >}}Create Campaign{{< /ui>}}.

## Plans

A plan describes the upgrade of one installation of a software project. Each plan has multiple steps. Common plan steps include preflight checks, soaks, pull request merge gates, and postflight checks. Bits uses your [upgrade instructions][7] when building plans to tailor them to your organization's specific way of working.

Whether or not Bits requires your approval for a plan to be executed depends on the [operational profile][4].

You can view plan steps in an interactive workflow diagram:
<!-- TODO: plan screenshot -->

After a plan is created, but before you have approved it, you can add [custom steps](#custom-steps) and remove any step that isn't a preflight or postflight check.

### Custom steps

You can add custom steps to a plan that is awaiting approval. 

A custom step can be:
- Human: requires a person to perform an action before the plan continues.
- Workflow: executes a [Datadog workflow][2], and waits for it to complete before the plan continues.

When you create a custom step, Datadog saves it. You can then reuse it later, in other plans.

To add a custom step to a plan:
1. Navigate to [{{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Plans{{< /ui>}}][6]. 
1. Select a plan that is awaiting approval.
1. Click {{< ui >}}Revise Plan{{< /ui>}}.
1. In the interactive workflow diagram, hover over an arrow and click {{< ui >}}Insert custom step{{< /ui>}}.
1. Add an existing custom step your team has already created, or create one:
    - To add an existing custom step, select it, then click {{< ui >}}Add Step{{< /ui>}}.
    - To create a custom step:
        1. Click {{< ui >}}Create Custom Step{{< /ui>}}.
        1. Select either {{< ui >}}Human{{< /ui>}} or {{< ui >}}Workflow{{< /ui>}}, then fill in the fields.
        1. Click {{< ui >}}Create and Add Step{{< /ui>}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_maintenance/
[2]: /actions/workflows/
[3]: /bits_ai/bits_maintenance/setup/#step-5-optional-create-a-rollout-order
[4]: /bits_ai/bits_maintenance/setup/#step-4-recommended-create-an-operational-profile
[5]: https://app.datadoghq.com/bits-ai/maintenance/campaigns
[6]: https://app.datadoghq.com/bits-ai/maintenance/plans
[7]: /bits_ai/bits_maintenance/instructions_memories/#upgrade-instructions
