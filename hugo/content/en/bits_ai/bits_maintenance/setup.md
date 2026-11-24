---
title: Set up Bits Maintenance
description: "Set up Bits Maintenance by verifying your organization connections and enrolling your Kubernetes clusters."
further_reading:
- link: "/bits_ai/bits_maintenance/"
  tag: "Documentation"
  text: "Bits Maintenance"
- link: "/bits_ai/bits_maintenance/campaigns_plans/"
  tag: "Documentation"
  text: "Bits Maintenance campaigns and plans"
- link: "/bits_ai/bits_maintenance/instructions_memories/"
  tag: "Documentation"
  text: "Bits Maintenance upgrade instructions and memories"
- link: "/actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions"
- link: "/containers/monitoring/"
  tag: "Documentation"
  text: "Container Monitoring"
---

## Overview

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

To set up [Bits Maintenance][1], verify your organization's connections and enroll your clusters. You can also define specific upgrade instructions, create an operational profile, and set up a rollout order to control how upgrades run. For additional capabilities, see [Advanced configuration](#advanced-configuration-optional).

## Prerequisites

Before starting Bits Maintenance setup, be sure the following prerequisites are met:

- You have [Container Monitoring][2] enabled.
- On each cluster you'd like to enroll in Bits Maintenance:
    - The Datadog Agent is installed.
    - [Kubernetes Explorer][6] is enabled.

## Step 1: Verify organization setup connections

1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Organization Setup{{< /ui >}}.
1. Check that the [{{< ui >}}Source code integration{{< /ui>}}][7] and [{{< ui >}}Bits Code{{< /ui>}}][8] connections are properly configured.

## Step 2: Enroll clusters

To use Bits Maintenance, you must enroll clusters you have already onboarded in Datadog.

To enroll clusters:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Cluster Enrollment{{< /ui>}}.
1. In the list of clusters, click the checkbox next to each cluster you'd like to enroll.
1. Click {{< ui >}}Enroll Selected{{< /ui>}}.

After you enroll a cluster, Bits Maintenance scans it to understand which software packages are running. Bits regularly re-scans your enrolled clusters to understand their software inventory. You can also manually trigger a re-scan.

## Step 3 (Recommended): Create upgrade instructions

Upgrade instructions teach Bits Maintenance to work the way your organization already works. Follow the steps in [Add upgrade instructions][15] on the Upgrade Instructions and Memories page.

## Step 4 (Recommended): Create an operational profile

An operational profile determines whether Bits Maintenance can execute a [plan][3] without your approval. Without an operational profile defined, you must approve each plan before Bits can run it.

To create an operational profile:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Operational Profile{{< /ui>}}.
1. Click {{< ui >}}Configure Profile{{< /ui>}}.
1. Fill in the form, including configuring {{< ui >}}Labels{{< /ui>}} and {{< ui >}}Rules{{< /ui>}}. 
1. Click {{< ui >}}Save Changes{{< /ui>}}.

## Step 5 (Optional): Create a rollout order

A rollout order defines the sequence in which, for a [project campaign][4], upgrades are deployed across your clusters. You can set a certain rollout order as a default. 

To create a rollout order:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Rollout Order{{< /ui>}}.
1. Click {{< ui >}}Create New Rollout Order{{< /ui>}}.
1. In the {{< ui >}}Name{{< /ui>}} field, enter a name for the rollout order.
1. In the {{< ui >}}Group by tag{{< /ui>}} field, select a cluster tag.
    - Corresponding tag values populate.
1. Drag the values to set your desired cluster rollout order.
    - The {{< ui >}}Cluster assignment preview{{< /ui>}} shows the sequence in which clusters would actually be deployed using this rollout order.
1. Click {{< ui >}}Save Rollout Order{{< /ui>}}.

After creating a rollout order, you can select it when [configuring a project campaign][5]. You can also create a rollout order at this time.

## Advanced configuration (optional)

Bits Maintenance works without a Private Action Runner (PAR). Set up a PAR if you want Bits Maintenance to read the custom resources in your clusters, which helps it catch compatibility issues and breaking changes in CRDs during upgrades.
<!-- TODO: confirm with reviewer what a PAR adds and what Bits Maintenance can't do without one. Is Remote Configuration needed only for the PAR? -->

To set up a PAR for Bits Maintenance, complete the following sections in order.

### Enable Remote Configuration

Enable [{{< ui >}}Remote Configuration{{< /ui>}}][9] for your organization.

### Enable PAR on the Agent's API key

For a new PAR, use [ownerless enrollment][10]. Enable the **Private Action Runner** capability on the Agent's API key.

### Configure Agent permissions

The PAR needs read-only permissions to access the custom objects and custom resource definitions (CRDs) in your clusters.

Set up the runner in the Cluster Agent using the [Helm][11] or [Datadog Operator][12] instructions. Add the following actions to the runner's allowlist. Keep any actions you already use.

- **Helm:** In `values.yaml`, edit `clusterAgent.privateActionRunner.actionsAllowlist`.
- **Datadog Operator:** In the `DatadogAgent` manifest, edit `private_action_runner.actions_allowlist` in the `cluster-agent.datadoghq.com/private-action-runner-configdata` annotation.

```yaml
- com.datadoghq.kubernetes.apiextensions.getCustomResourceDefinition
- com.datadoghq.kubernetes.apiextensions.listCustomResourceDefinition
- com.datadoghq.kubernetes.customresources.getCustomObject
- com.datadoghq.kubernetes.customresources.listCustomObject
- com.datadoghq.kubernetes.customresources.getClusterCustomObject
- com.datadoghq.kubernetes.customresources.listClusterCustomObject
```

[Apply the updated configuration][13] to each cluster where you use the runner.

### Modify an existing owned PAR

If you have an existing owned runner, give Bits Maintenance access to the cluster's connection. Ownerless runners use [Execution Policies][14] instead, so you can skip this section.

For each cluster you'd like to enroll with Bits Maintenance: 

1. Navigate to {{< ui >}}Actions{{< /ui>}} > {{< ui >}}Actions Catalog{{< /ui>}} > {{< ui >}}Connections{{< /ui>}}.
1. Hover over the row of the cluster, then click {{< ui >}}Edit{{< /ui>}}.
1. Within {{< ui >}}Access{{< /ui>}}, click {{< ui >}}Edit Access{{< /ui>}}.
<!-- TODO: Which permission do you need to add organization access? Even with connections I could edit, there was no "Edit Access" button. Does it need to be the owner? -->
1. Under {{< ui >}}Organization Access{{< /ui>}}, add the current Datadog organization as an {{< ui >}}Editor{{< /ui>}}.
1. Click {{< ui >}}Save{{< /ui>}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_maintenance/
[2]: /containers/monitoring/
[3]: /bits_ai/bits_maintenance/campaigns_plans/#plans
[4]: /bits_ai/bits_maintenance/campaigns_plans/#project-campaigns-vs-cluster-campaigns
[5]: /bits_ai/bits_maintenance/campaigns_plans/#create-a-campaign
[6]: /containers/monitoring/kubernetes_explorer/#enable-kubernetes-explorer
[7]: /source_code/source-code-management/
[8]: /bits_ai/bits_code/setup/
[9]: /remote_configuration/#enable-remote-configuration
[10]: /actions/private_actions/enroll_runner/#ownerless-runners
[11]: /actions/private_actions/set_up_agent_based/?tab=kuberneteshelm#manual-installation
[12]: /actions/private_actions/set_up_agent_based/?tab=kubernetesoperator#manual-installation
[13]: /actions/private_actions/set_up_agent_based/#change-the-allowlist
[14]: /actions/private_actions/execution_policies/
[15]: /bits_ai/bits_maintenance/instructions_memories/#add-upgrade-instructions
