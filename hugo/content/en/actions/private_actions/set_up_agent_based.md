---
title: Set Up a Private Action Runner in the Datadog Agent
description: Install, enroll, manage, and update a private action runner that runs inside the Datadog Agent.
disable_toc: false
aliases:
- service_management/workflows/private_actions/use_private_actions
- service_management/app_builder/private_actions/use_private_actions
- actions/private_actions/use_private_actions/
- actions/private_actions/update_private_action_runner/
further_reading:
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions"
- link: "actions/private_actions/enroll_runner"
  tag: "Documentation"
  text: "Enrollment and ownership"
- link: "actions/private_actions/execution_policies"
  tag: "Documentation"
  text: "Execution Policies"
- link: "actions/private_actions/set_up_standalone"
  tag: "Documentation"
  text: "Set up a standalone private action runner"
---

## Overview

Running the private action runner in the Datadog Agent is the recommended path for new deployments. If you already run the Datadog Agent, you enable the runner with a single configuration flag and manage it through the Agent life cycle.

Setting up the runner takes three steps:

1. [**Install**](#install-the-runner) the runner, using the deployment option that fits your environment.
1. [**Enroll**](#enroll-the-runner) the runner, which sets its ownership and the authorization model it uses.
1. [**Update**](#update-the-runner) the runner as part of your Agent upgrades.

To deploy the runner as a separate binary instead, see [Set up a standalone private action runner][1].

## Prerequisites

- A Linux or Windows host with **Datadog Agent 7.81.0 or later**, or a Kubernetes cluster with **Datadog Operator v1.28.0 or later** or the **Datadog Helm chart 3.231.6 or later**.
- [Remote Configuration][2] enabled for your organization.
- Network access to Datadog at `https://{{< region-param key=dd_site >}}`.

## Install the runner

The runner in the Datadog Agent has three deployment options, based on where the runner needs to act:

| Deployment option | How it runs | Deploy with | Best for |
|---|---|---|---|
| **Host** | A separate process next to the Datadog Agent on a Linux or Windows host. | Host install | Actions that target a specific host. |
| **Kubernetes node Agent** | A container in the node Agent, using the same runner binary as the host process. | Helm, Operator | Node-local actions in a Kubernetes cluster. |
| **Kubernetes Cluster Agent** | In-process inside the Cluster Agent, with no separate binary. One runner serves the whole cluster. | Helm, Operator | Cluster-wide Kubernetes actions. |

You have the option to install with **Fleet Automation**, a UI-driven flow that enrolls the runner as owned, or **Manual installation**, where you choose the enrollment type yourself.

### Using Fleet Automation (recommended)

The Fleet Automation install flow is the same across platforms.

1. Go to the [Fleet Automation install page][3] and select your platform. For Kubernetes, also select **Helm Chart** or **Datadog Operator** as the install method, to match the [Manual installation](#manual-installation) tab you plan to follow.
1. In **Customize your Agent coverage**, go to the **Optimization & Remediation** section and turn on **Enable Agent to take action**. This creates an application key with the `on_prem_runner_write` scope and enrolls the runner as **owned**, authorized with [Connections][4]. To enroll an ownerless runner instead, authorized with [Execution Policies][5], use [Manual installation](#manual-installation).
1. Follow the remaining instructions in the install panel to add an API key and complete the installation.
1. After installation, go to [Private Action Runners][6] to verify your runner appears on the list.

### Manual installation

{{< tabs >}}
{{% tab "Linux" %}}
Set the following environment variables when you install or run the Agent. On the host, private action runner settings use the `DD_PRIVATE_ACTION_RUNNER_*` prefix:

```bash
DD_API_KEY=<API_KEY> \
DD_APP_KEY=<APP_KEY> \
DD_SITE="{{< region-param key=dd_site >}}" \
DD_PRIVATE_ACTION_RUNNER_ENABLED=true \
DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST=com.datadoghq.kubernetes.*,com.datadoghq.remoteaction.* \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

`DD_APP_KEY` enrolls the runner as owned, the same as Fleet Automation. The application key needs the `on_prem_runner_write` scope. `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` takes a comma-separated list. Use bundle wildcards to allow the actions a runner in the Datadog Agent can run: `com.datadoghq.kubernetes.*` and `com.datadoghq.remoteaction.*`. To rely on the runner's built-in default actions instead (read-only Remote Action actions, plus a set of read-only Kubernetes actions on the Cluster Agent), leave the allowlist unset.

After installation, go to [Private Action Runners][1] to verify your runner appears on the list.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Windows" %}}

Install or upgrade to Datadog Agent 7.81.0 or later, then edit `C:\ProgramData\Datadog\datadog.yaml`:

```yaml
app_key: <YOUR_APP_KEY>

private_action_runner:
  enabled: true
  self_enroll: true
  actions_allowlist:
    - "com.datadoghq.kubernetes.*"
    - "com.datadoghq.remoteaction.*"
```

`app_key` enrolls the runner as owned, the same as Fleet Automation above; the application key needs the `on_prem_runner_write` scope.

Restart the Agent to apply the configuration:

```powershell
Restart-Service -Force datadogagent
```

After the Agent restarts, go to [Private Action Runners][1] to verify your runner appears on the list.

The host process runs the **node Agent** runner. To run a runner in the Cluster Agent, use the Kubernetes (Helm) or Kubernetes (Operator) tab.

[1]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

The Datadog Helm chart can enable the runner in two places:

- The **node Agent** runner, as a sidecar container. The node Agent runner is **Linux-only**.
- The **Cluster Agent** runner, in-process. The Cluster Agent runner is available through Helm or the Operator only (there is no standalone binary), and it requires leader election so that identity is coordinated across Cluster Agent replicas.

Create an API key with the Private Action Runner capability in [Organization Settings][1], then store it in a Kubernetes secret that the chart reads through `apiKeyExistingSecret`:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

This example enrolls the runner as **ownerless** (`apiKeyOnlyEnrollment: true`, using the API key only), which authorizes it with Execution Policies. For other enrollment options and how ownership works, see [Enrollment and ownership][2].

Helm settings use the `privateActionRunner.*` key in camelCase. Create a `values.yaml`:

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  site: {{< region-param key=dd_site >}}
  clusterName: <YOUR_CLUSTER_NAME>
  remoteConfiguration:
    enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.remoteaction.*"
      - "com.datadoghq.script.*"
clusterAgent:
  enabled: true
  privateActionRunner:
    enabled: true
    apiKeyOnlyEnrollment: true
    actionsAllowlist:
      - "com.datadoghq.kubernetes.*"
      - "com.datadoghq.script.*"
```

For all available runner configuration options, see [`datadog.privateActionRunner`][3] and [`clusterAgent.privateActionRunner`][4] in the Helm chart. Install the chart:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-agent datadog/datadog -f values.yaml
```

After installation, go to [Private Action Runners][5] to verify your runner appears on the list.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /actions/private_actions/enroll_runner/
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L523
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1842
[5]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

The Datadog Operator enables the runner through annotations on the `DatadogAgent` resource. The runner configuration in the `-configdata` annotation uses the `private_action_runner.*` key in snake_case. The Operator can enable both the node Agent runner and the in-process Cluster Agent runner.

Create an API key with the Private Action Runner capability in [Organization Settings][1], then store it in a Kubernetes secret that the `DatadogAgent` resource reads through its `credentials`:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

This example enrolls the runner as **ownerless** (`api_key_only_enrollment: true`, using the API key only), which authorizes it with Execution Policies. For other enrollment options and how ownership works, see [Enrollment and ownership][2].

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

As with Helm, the Cluster Agent runner requires leader election, and the node Agent runner is Linux-only. After you apply the manifest, go to [Private Action Runners][3] to verify your runner appears on the list.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /actions/private_actions/enroll_runner/
[3]: https://app.datadoghq.com/actions/action-catalog

{{% /tab %}}
{{< /tabs >}}

### Configuration field names

Runner settings follow the standard Datadog Agent configuration conventions for each install method:
- Environment variables on a host.
- CamelCase keys under `privateActionRunner` in Helm.
- Snake_case keys under `private_action_runner` in the Operator.

For the field-name crosswalk across all three install methods and the full list of configuration keys and defaults, see the [private action runner reference][7].

## Enroll the runner

Enrollment registers the runner with your Datadog organization and sets its **ownership**, which determines the authorization model. An ownerless runner, enrolled with an API key that has the Private Action Runner capability, uses [Execution Policies][5]. An owned runner, enrolled with an application key, uses [Connections][4]. Because the model is fixed at enrollment, decide which one you want before you deploy.

For more information on the process, see [Enrollment and ownership][8].

## Manage the runner

### Change the allowlist

To edit the allowlist for a runner in the Datadog Agent:

{{< tabs >}}
{{% tab "Linux" %}}
1. Edit the `private_action_runner.actions_allowlist` section in `/etc/datadog-agent/datadog.yaml`.
1. Restart the Agent: `sudo systemctl restart datadog-agent`.
{{% /tab %}}
{{% tab "Windows" %}}
1. Edit the `private_action_runner.actions_allowlist` section in `C:\ProgramData\Datadog\datadog.yaml`.
1. Restart the Agent: `Restart-Service -Force datadogagent`.
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}
1. Update `actions_allowlist` in both `DatadogAgent` manifest annotations: `agent.datadoghq.com/private-action-runner-configdata` and `cluster-agent.datadoghq.com/private-action-runner-configdata`.
1. Apply the updated manifest: `kubectl apply -f datadog-agent.yaml`.
{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}
1. Update `privateActionRunner.actionsAllowlist` (node Agent) or `clusterAgent.privateActionRunner.actionsAllowlist` (Cluster Agent) in `values.yaml`.
1. Apply the updated chart: `helm upgrade datadog-agent datadog/datadog -f values.yaml`.
{{% /tab %}}
{{< /tabs >}}

### Automatic deletion of inactive runners

To free up unused resources, Datadog automatically deletes node Agent-based private action runners that use API-key-only (ownerless) configuration after 35 days of inactivity. This automatic cleanup does not apply to owned runners, or to the Cluster Agent runner.

If your runner is deleted due to inactivity, restarting it results in an error. You must re-enroll the runner by repeating the installation steps.

## Debugging with logs

{{< tabs >}}
{{% tab "Linux" %}}

```bash
cat /var/log/datadog/private-action-runner.log
```

{{% /tab %}}
{{% tab "Windows" %}}

```powershell
Get-Content C:\ProgramData\Datadog\logs\private-action-runner.log
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```bash
kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=1000 | grep private
```

{{% /tab %}}
{{< /tabs >}}

## Update the runner

Update the runner in the Datadog Agent to stay update to date with any Agent upgrades.

{{< tabs >}}
{{% tab "Linux" %}}

Upgrade the Datadog Agent to the latest version. The runner is bundled with the Agent.

```bash
sudo apt-get update && sudo apt-get install datadog-agent
```

Or for RHEL/CentOS:

```bash
sudo yum update datadog-agent
```

Restart the Agent after the upgrade:

```bash
sudo systemctl restart datadog-agent
```

For detailed upgrade instructions, see [Upgrade to Agent v7][1].

[1]: /agent/versions/upgrade_to_agent_v7/

{{% /tab %}}
{{% tab "Windows" %}}

Download the latest Agent MSI installer from the [Datadog Agent download page][1] and run the installer, or use PowerShell:

```powershell
# Download the latest installer
Invoke-WebRequest -Uri "https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi" -OutFile ddagent-cli-latest.msi

# Run the installer
Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i ddagent-cli-latest.msi'
```

Restart the Agent after the upgrade:

```powershell
Restart-Service -Force datadogagent
```

[1]: https://app.datadoghq.com/account/settings#agent/windows

{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

Update the Datadog Operator and Agent image versions in your `DatadogAgent` manifest.

1. Update the Datadog Operator:

   ```bash
   helm repo update
   helm upgrade datadog-operator datadog/datadog-operator \
       --set image.repository=registry.datadoghq.com/operator \
       --set image.tag=latest
   ```

   You can pin a specific version. To browse available tags, use [Docker Hub][1].

1. Update the Agent image versions in your `datadog-agent.yaml` manifest:

   ```yaml
   override:
     nodeAgent:
       image:
         name: registry.datadoghq.com/agent:<NEW_AGENT_VERSION>
     clusterAgent:
       image:
         name: registry.datadoghq.com/cluster-agent:<NEW_AGENT_VERSION>
   ```

1. Apply the updated manifest: `kubectl apply -f datadog-agent.yaml`.
1. Verify the update:

   ```bash
   kubectl get pods
   kubectl logs -l app.kubernetes.io/component=cluster-agent --tail=100 | grep private
   ```

The Cluster Agent runner keeps its identity across the update, since it stores it in a shared Kubernetes secret. The node Agent runner stores its identity in a file: if that path isn't backed by a persistent volume, an update can wipe the identity and force the runner to re-enroll. See [Identity storage on Kubernetes][2].

[1]: https://hub.docker.com/r/datadog/operator/tags
[2]: /actions/private_actions/enroll_runner/#identity-storage-on-kubernetes

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

Updating the runner is part of the standard Datadog Agent Helm chart upgrade process.

```bash
helm repo update
helm upgrade datadog-agent datadog/datadog -f values.yaml
```

For detailed upgrade instructions, see [Upgrading Datadog Helm][1].

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading

{{% /tab %}}
{{% tab "Terraform (Operator)" %}}

Update the version variables in your Terraform configuration:

```hcl
locals {
  helm_operator_version = "<NEW_OPERATOR_VERSION>"
  agent_version         = "<NEW_AGENT_VERSION>"
  # ...
}
```

Apply the changes:

```bash
terraform plan
terraform apply -var="datadog_api_key=<YOUR_API_KEY>" -var="datadog_app_key=<YOUR_APP_KEY>"
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/set_up_standalone/
[2]: /remote_configuration
[3]: https://app.datadoghq.com/fleet/install-agent/latest
[4]: /actions/connections/
[5]: /actions/private_actions/execution_policies/
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: /actions/private_actions/reference/
[8]: /actions/private_actions/enroll_runner/
