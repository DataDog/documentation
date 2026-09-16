---
title: Getting Started with Private Actions
description: Deploy a private action runner in the Datadog Agent with the Datadog Operator, then run your first action using Datadog's default Execution Policies.
further_reading:
- link: "actions/private_actions"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/reference"
  tag: "Documentation"
  text: "Private Action Runner Reference"
---

## Overview

Follow this guide to deploy a private action runner inside the Datadog Agent with the Datadog Operator, then run a read-only action that Datadog authorizes for you automatically.

This is the recommended path to get started. It uses the following configuration:

- **Run the runner in the Datadog Agent**, rather than as a standalone host process.
- **Install with the Datadog Operator** on Kubernetes.
- **Enroll with an API key**, so the runner is authorized with Execution Policies.
- **Rely on Datadog's default Execution Policies**, which Datadog provisions for you, to authorize read-only Kubernetes and Remote Action actions across your runners with no setup.

At the end of this guide, you have an enrolled runner and a working read-only action.

## Prerequisites

- A Kubernetes cluster managed by the [Datadog Operator][1] v1.28.0 or later, running Datadog Agent 7.81.0 or later.
- [Remote Configuration][2] enabled for your organization.
- Permission to create API keys in [Organization Settings][3].
- Network access to Datadog at `https://{{< region-param key=dd_site >}}`.

## Step 1: Create an API key with the Private Action Runner capability

An ownerless runner enrolls with an API key that has the Private Action Runner capability. It does not need an application key.

1. In Datadog, go to **[Organization Settings > API Keys][3]** and create or select an API key.
1. On the key, next to **PAR** (the Private Action Runner capability), click **Enable**.
   {{< img src="actions/private_actions/getting_started/api_key_par_capability.png" alt="An API key details panel with the PAR capability being enabled, next to the Remote Config setting" style="width:60%;" >}}
1. Store the key value in a Kubernetes secret that the Agent reads:
   ```bash
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```

## Step 2: Deploy the runner with the Datadog Operator

Enable the runner on your `DatadogAgent` resource through Operator annotations. The following example enables the runner in both the node Agent and the Cluster Agent, enrolls it as ownerless with your API key, and allows a small set of read-only actions.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/private-action-runner-enabled: "true"
    agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.remoteaction.*"
          - "com.datadoghq.script.*"
    cluster-agent.datadoghq.com/private-action-runner-enabled: "true"
    cluster-agent.datadoghq.com/private-action-runner-configdata: |
      private_action_runner:
        enabled: true
        api_key_only_enrollment: true
        actions_allowlist:
          - "com.datadoghq.kubernetes.*"
          - "com.datadoghq.script.*"
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    site: {{< region-param key=dd_site >}}
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
```

Apply the manifest:

```bash
kubectl apply -f datadog-agent.yaml
```

Because `api_key_only_enrollment` is set and you provide only an API key, each runner self-enrolls as **ownerless** on startup, which means it is authorized with Execution Policies. This manifest is the minimal Operator setup for this guide; for the full runner configuration, other install methods (Host, Windows, Helm), and the complete field reference, see [Set up a private action runner in the Datadog Agent][4]. To learn more about enrollment, see [Enrollment and ownership][5].

The `actions_allowlist` entries in the example use bundle wildcards to allow the actions this guide uses. To use the runner's built-in read-only actions instead, leave `actions_allowlist` empty. The runner then enables its default action set, which includes read-only Remote Action network and shell actions, plus a set of read-only Kubernetes actions on the Cluster Agent.

## Step 3: Confirm the runner is enrolled

In Datadog, go to [Private Action Runners][6]. Verify your new runner appears in the list.

You can also check the Cluster Agent logs to confirm the runner started:

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

For node Agent logs and other platforms, see [Debugging with logs][12].

Datadog provisions **default Execution Policies** in your organization. These policies use a target selector of `*`, so they automatically cover every Agent that runs a private action runner, including the one you deployed. This is what authorizes read-only actions with no Execution Policy setup of your own. See [Datadog Default Execution Policies][7].

## Step 4: Run your first action

Run a read-only Kubernetes action against your new runner from the Action Catalog. The Action Catalog runs an action the same way a workflow step does; you choose a target Agent, provide inputs, and run the action.

1. In the Datadog Action Catalog, open [List Pods][8] (`com.datadoghq.kubernetes.core.listPod`).
1. Under **Configure connection**, select the **Target** tab (instead of **Connection**).
1. Set **Orch Cluster ID** to the orchestration cluster ID of the cluster running your runner. You can find the orchestration cluster ID among the tags of your cluster in [Fleet Automation's Fleet View][11].
1. Under **Configure inputs**, enter the **Namespace** to list pods from. You can also set **Field selector**, **Label selector**, or **Limit**.
1. Click **Run**. The results appear in the panel.
  {{< img src="actions/private_actions/getting_started/run_action_action_catalog.png" alt="The List Pods action in the Action Catalog, with the connection set to Target and an Orch Cluster ID entered" style="width:80%;" >}}

The action runs on your runner and returns its result. To run the same action from a workflow instead, add a private action step in Workflow Automation and choose **Target** in its connection picker. See [Use an Execution Policy in a workflow][9].

## Next steps

This guide uses Datadog's default Execution Policies, which authorize read-only actions only. To run write-capable actions, or to scope access to specific teams or environments, create your own Execution Policy. See [Execution Policies][10].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/datadog_operator/
[2]: /remote_configuration
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /actions/private_actions/set_up_agent_based/
[5]: /actions/private_actions/enroll_runner/
[6]: https://app.datadoghq.com/actions/private-action-runners
[7]: /actions/private_actions/execution_policies/#default-execution-policies
[8]: https://app.datadoghq.com/actions/action-catalog#com.datadoghq.kubernetes/com.datadoghq.kubernetes.core/com.datadoghq.kubernetes.core.listPod
[9]: /actions/private_actions/execution_policies/#use-an-execution-policy-in-a-workflow
[10]: /actions/private_actions/execution_policies/
[11]: https://app.datadoghq.com/fleet?view_by=clusters
[12]: /actions/private_actions/set_up_agent_based/#debugging-with-logs
