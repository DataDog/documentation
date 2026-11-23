---
title: Set up Bits Maintenance
description: "Set up Bits Maintenance by verifying your organization connections, configuring the Datadog Agent and Private Action Runner, and enrolling your Kubernetes clusters."
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

To set up [Bits Maintenance][1], verify your organization's connections, configure the Agent and Private Action Runner on your clusters, and enroll those clusters. You can also create an operational profile and a rollout order to control how upgrades run.

## Prerequisites

Before starting Bits Maintenance setup, be sure the following prerequisites are met:

- You have [Container Monitoring][2] enabled.
- The Datadog Agent is installed on each cluster you'd like to enroll in Bits Maintenance.

## Step 1: Verify organization setup connections

1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Organization Setup{{< /ui >}}.
1. Check that the {{< ui >}}Source code integration{{< /ui>}}, {{< ui >}}Bits Code{{< /ui>}}, and {{< ui >}}Remote Configuration{{< /ui>}} connections are properly configured.

## Step 2: Verify your Agent's API key has Private Action Runner enabled

Verify that the Agent running on your clusters is using an API key with Private Action Runner (PAR) enabled:

1. Identify the API key being used by the Agent running on the clusters you'd like to use Bits Maintenance with.
1. On {{< ui >}}Organization Settings{{< /ui>}} > {{< ui >}}API Keys{{< /ui>}}, click the API key.
1. In the slide-out panel, note whether PAR is enabled. If it is disabled, click {{< ui >}}Enable{{< /ui>}}.

## Step 3: Set up Agent permissions and Private Action Runner

Bits Maintenance requires read-only permissions to access the custom objects and custom resource definitions (CRDs) in your clusters. Bits uses this information to catch compatibility issues and breaking changes in CRDs during upgrades.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

<!-- TODO: I thought we removed remote config from this section (isn't it covered in Step 1)? If so, is this first code block necessary? -->
If you installed the Agent with the open source [Datadog Operator][1], in the `datadogagent` resource, `remoteConfiguration` and `orchestratorExplorer` must have `enabled: true`.

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
...
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
  features:
    remoteConfiguration:
      enabled: true
    orchestratorExplorer:
      enabled: true
{{< /code-block >}}

In the `private-action-runner-configdata` annotation, add the following actions to `private_action_runner.actions_allowlist` so the PAR can read CRDs and custom objects:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  annotations:
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        self_enroll: true
        api_key_only_enrollment: false
        actions_allowlist:
          ...
          - com.datadoghq.kubernetes.apiextensions.getCustomResourceDefinition
          - com.datadoghq.kubernetes.apiextensions.listCustomResourceDefinition
          - com.datadoghq.kubernetes.customresources.getCustomObject
          - com.datadoghq.kubernetes.customresources.listCustomObject
          - com.datadoghq.kubernetes.customresources.getClusterCustomObject
          - com.datadoghq.kubernetes.customresources.listClusterCustomObject
{{< /code-block >}}

For more information about running a PAR on Kubernetes, see [Set up an Agent-based Private Action Runner][2].

[1]: /containers/datadog_operator/
[2]: /actions/private_actions/set_up_agent_based/

{{% /tab %}}
{{% tab "Helm" %}}

If you [installed the Agent with Helm][1], make sure that in your `values.yaml` file, the following values are set:
- `orchestratorExplorer` has `enabled: true`
- `remoteConfiguration` has `enabled: true`
- `clusterAgent` has `enabled: true`
- `privateActionRunner` on the `clusterAgent` has `enabled: true`
- `actionsAllowlist` includes the `get` and `list` actions for CRDs and custom objects

{{< code-block lang="yaml" filename="values.yaml" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>

  orchestratorExplorer:
    enabled: true

remoteConfiguration:
  enabled: true

clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    selfEnroll: true
    apiKeyOnlyEnrollment: false
    actionsAllowlist:
      - com.datadoghq.kubernetes.apiextensions.getCustomResourceDefinition
      - com.datadoghq.kubernetes.apiextensions.listCustomResourceDefinition
      - com.datadoghq.kubernetes.customresources.getCustomObject
      - com.datadoghq.kubernetes.customresources.listCustomObject
      - com.datadoghq.kubernetes.customresources.getClusterCustomObject
      - com.datadoghq.kubernetes.customresources.listClusterCustomObject
{{< /code-block >}}

For more information about running a PAR on Kubernetes, see [Set up an Agent-based Private Action Runner][2].

[1]: /containers/kubernetes/installation/?tab=helm
[2]: /actions/private_actions/set_up_agent_based/

{{% /tab %}}
{{< /tabs >}}


## Step 4 (Optional): Modify an existing Private Action Runner

<div class="alert alert-info">Only complete this step if you have previously installed the PAR.</div>

Enable Bits Maintenance to resolve connections.
<!-- TODO: can we add a sentence connecting the above sentence to the title of this section? -->

For each cluster you'd like to enroll with Bits Maintenance: 

1. Navigate to {{< ui >}}Actions{{< /ui>}} > {{< ui >}}Actions Catalog{{< /ui>}} > {{< ui >}}Connections{{< /ui>}}.
1. Hover over the row of the cluster, then click {{< ui >}}Edit{{< /ui>}}.
1. Within {{< ui >}}Access{{< /ui>}}, click {{< ui >}}Edit Access{{< /ui>}}.
<!-- TODO: Which permission do you need to add organization access? Even with connections I could edit, there was no "Edit Access" button. Does it need to be the owner? -->
1. Under {{< ui >}}Organization Access{{< /ui>}}, add the current Datadog organization as an {{< ui >}}Editor{{< /ui>}}.
1. Click {{< ui >}}Save{{< /ui>}}.

## Step 5: Enroll clusters

To use Bits Maintenance, you must enroll clusters you have already onboarded in Datadog.

To enroll clusters:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Cluster Enrollment{{< /ui>}}.
1. In the list of clusters, click the checkbox next to each cluster you'd like to enroll.
1. Click {{< ui >}}Enroll Selected{{< /ui>}}.

After you enroll a cluster, Bits Maintenance scans it to understand which software packages are running. Bits regularly re-scans your enrolled clusters to understand their software inventory. You can also manually trigger a re-scan.

## Step 6 (Recommended): Create an operational profile

An operational profile determines whether Bits Maintenance can execute a [plan][3] without your approval. Without an operational profile defined, you must approve each plan before Bits can run it.

To create an operational profile:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Operational Profile{{< /ui>}}.
1. Click {{< ui >}}Configure Profile{{< /ui>}}.
<!-- TODO: This was going to change big time? -->
1. Click {{< ui >}}Save Changes{{< /ui>}}.

## Step 7 (Optional): Create a rollout order

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_maintenance/
[2]: /containers/monitoring/
[3]: /bits_ai/bits_maintenance/campaigns_plans/#plans
[4]: /bits_ai/bits_maintenance/campaigns_plans/#project-campaigns-vs-cluster-campaigns
[5]: /bits_ai/bits_maintenance/campaigns_plans/#create-a-campaign
