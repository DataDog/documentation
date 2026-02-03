---
title: Use Private Actions
description: Set up and use private action runners to interact with services on your private network without exposing them to the internet.
disable_toc: false
aliases:
- service_management/workflows/private_actions/use_private_actions
- service_management/app_builder/private_actions/use_private_actions
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials"
---

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must use Docker to install a private action runner on a host in your network, then pair the runner with a Datadog Connection.

For more information about how private actions work, see the full [overview page][16].

## Supported private actions

{{< partial name="actions/private_actions_list" >}}

## Prerequisites

The private action runner requires a Linux host that is able to reach any internal services you want to call from an action or app.

To use App Builder with private actions, you must be able to point a hostname to the private action runner's container. This hostname must be resolvable by your App users. App Builder calls the hostname using HTTPS, so you must bring your own SSL termination.

In addition, the host must have the following:
- 2GB of RAM
- Network access to Datadog: https://{{< region-param key=dd_site >}}, https://config.{{< region-param key=dd_site >}}
- Docker (with Docker Compose if that is your preference) or Kubernetes

## Set up a private action runner

### Set up from Datadog

From the [Actions Catalog][6], navigate to **Private Action Runners** and click **New Private Action Runner**.

1. Enter a name for your runner and select the allowed actions.
1. Create a directory on your host where the runner can store its configuration, such as ./config, and follow the guidelines to deploy your runner with Docker, Docker Compose, or Kubernetes.

{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file. For information on creating a Docker Compose file, see the [official Compose documentation][101].
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}
1. Click **Kubernetes**.
1. Confirm that you have installed `kubectl` on your machine by running `kubectl version` and verifying that there is output.
1. Confirm that you have installed `helm` on your machine by running `helm version` and verifying that there is output.
1. Confirm that you have sufficient permissions to create Kubernetes resources in your cluster.
1. Follow the instructions provided in the app to:
    1. Enroll the runner and generate the config.
    1. Add the **Private Action Runner** to your Helm repositories.
    1. Install the Helm chart.
1. Run `kubectl get pods -w` and verify that the status of the Private Action Runner pod becomes `Ready`.


{{% /tab %}}
{{< /tabs >}}

### Set up programmatically

As an alternative to the UI-based setup, you can enroll and configure a private action runner programmatically using [API key][19] and [Application key][20] instead of the one-time enrollment token. This approach is ideal for automated deployments, CI/CD pipelines, and infrastructure-as-code workflows where manual UI interaction is not practical.

To use this authentication method:
1. Provide your Datadog API and App keys through the `DD_API_KEY` and `DD_APP_KEY` environment variables.
2. Pass the `--with-api-key` flag to the runner container.

The runner uses these credentials to register itself with your Datadog organization and assign the App key author as the runner editor.

#### Example commands

1. Update the `RUNNER_NAME`.
2. Check that `DD_BASE_URL` points to the Datadog site you use, for ex. https://app.datadoghq.com.
3. Replace `./config` with the path to the directory you created for the runner configuration.

{{< tabs >}}
{{% tab "Docker" %}}

Set up an auto-enrollment script with your `DD_API_KEY`, `DD_APP_KEY` and the `docker run` command.

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=<YOUR_DD_SITE> \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e 'ACTIONS_ALLOWLIST=com.datadoghq.http.request' \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v1.17.1 \
  --with-api-key
```

{{% /tab %}}

{{% tab "Docker Compose" %}}

Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file. For information on creating a Docker Compose file, see the [official Compose documentation][101].
Set up an auto-enrollment script with your `DD_API_KEY`, `DD_APP_KEY` and the `docker compose up -d` command.

```yaml
# docker-compose.yaml
version: '3.8'
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v1.17.1
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://app.datadoghq.com
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
      RUNNER_MODES: pull
      ACTIONS_ALLOWLIST: "com.datadoghq.http.request"
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

Run with:
```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

DD_API_KEY=$DD_API_KEY DD_APP_KEY=$DD_APP_KEY docker compose up -d
```

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Set up an auto-enrollment script with 2 steps:
  - generate the runner configuration with your `DD_API_KEY`, `DD_APP_KEY` and the `docker run` command.
  - deploy the Helm chart

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://app.datadoghq.com \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -e 'ACTIONS_ALLOWLIST=com.datadoghq.http.request' \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v1.17.1 \
  --with-api-key --enroll -f helm-values > values.yaml
```

Deploy with:
```bash
helm upgrade --install datadog-par datadog/private-action-runner -f values.yaml
```

When the auto-enrollment script succeeds, the new runner will appear on the **Private Action Runners** page.

{{% /tab %}}
{{< /tabs >}}

When you see the **Ready to use** status, you can create a new connection for the runner or see it on the **Private Action Runners** page:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.

See [Connect a runner](#connect-a-runner) for more information on pairing your runner with a connection.

## Manage access

Use [role-based access control (RBAC)][17] to control access to your private action runner. To see the list of permissions that apply to private action runner, see [Datadog Role Permissions][18].

You can set permissions on the runner to restrict modifications or prevent new connections from being attached. Available granular permissions include **Viewer**, **Contributor**, and **Editor**.

By default, only the runner's creator has **Editor** access. The creator can grant access to additional users, service accounts, roles, or teams.

### Permission levels

Viewer
: Can view the runner and the connections attached to it

Contributor
: Can view and contribute to the runner by attaching new connections to it

Editor
: Can view, contribute (attach new connections), and edit the runner

### Set permissions on a runner

1. Navigate to the Edit page of the runner.
2. In the **Who Has Access?** section, click **Edit access**.
3. Select a user, service account, role, or team from the dropdown menu, then click **Add**. The selected principal appears at the bottom of the dialog box.
4. Next to the principal name, select your desired permission from the dropdown menu.
5. To remove access from a principal, select **Remove access** from the permissions dropdown menu.
6. Click **Done** to finalize the permissions setup.
7. Click **Save** to apply the new permissions to the runner.

## Connect a runner

Before you can use an action runner, you must pair it with one or more connections.

To pair a runner to a connection:
1. From the [Workflow Automation][7] or [App Builder][8] Connections page, click **New Connection**.
1. Select the integration you want to connect with your private action runner. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Add a **Connection Name** and select your runner from the **Private Action Runner** dropdown.
1. Add the paths to any required credential files. For more information on credentials, see [Handling Private Action Credentials][9].

## Use a private action

To use a private action in your [Workflow Automation][10] workflow or [App Builder][11] app:

{{% collapse-content title="Workflow Automation" level="p" %}}
1. From the [Workflow Automation][10] page, create a workflow, or open an existing workflow. For information on creating or editing a workflow, see [Build Workflows][12].
1. Click **Add Step** and search for the private action you want to add to your workflow. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Enter a name for the step.
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner that is paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your workflow.
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="p" %}}
1. From the [App Builder][11] page, create an app, or open an existing app. For information on creating or editing an app, see [Build Apps][14].
1. Click **New Query** and search for the private action you want to add to your app. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your query.
{{% /collapse-content %}}

## Edit private runners

### Edit connections or delete runners

From the **Private Action Runner** page in [Actions Catalog][6], you can view all of your private runners together with the workflows or apps that use each runner. To edit the connection for a runner, click **View Details**. Click the trash can icon to delete a runner.

### Change the allowlist of a runner

To edit the allowlist for a Private Action Runner:

1. Edit the `actionsAllowlist` section of the `config.yaml` file in your runner's environment and add or remove the relevant permissions.
1. Restart the runner by restarting your container or deployment.

{{% collapse-content title="Available permissions" level="p" %}}

<details>
  <summary>Ansible</summary>
  <pre>"com.datadoghq.ansible.invokePlaybook"</pre>
</details>

<details>
  <summary>HTTP</summary>
  <pre>"com.datadoghq.http.request"</pre>
</details>

<details>
  <summary>Jenkins</summary>
  <pre>"com.datadoghq.jenkins.buildJenkinsJob"
"com.datadoghq.jenkins.deleteJenkinsJob"
"com.datadoghq.jenkins.getJobStatus"</pre>
</details>

<details>
  <summary>Kubernetes Apps</summary>
  <pre>"com.datadoghq.kubernetes.apps.createControllerRevision"
"com.datadoghq.kubernetes.apps.createDaemonSet"
"com.datadoghq.kubernetes.apps.createDeployment"
"com.datadoghq.kubernetes.apps.createReplicaSet"
"com.datadoghq.kubernetes.apps.createStatefulSet"
"com.datadoghq.kubernetes.apps.deleteControllerRevision"
"com.datadoghq.kubernetes.apps.deleteDaemonSet"
"com.datadoghq.kubernetes.apps.deleteDeployment"
"com.datadoghq.kubernetes.apps.deleteMultipleControllerRevisions"
"com.datadoghq.kubernetes.apps.deleteMultipleDaemonSets"
"com.datadoghq.kubernetes.apps.deleteMultipleDeployments"
"com.datadoghq.kubernetes.apps.deleteMultipleReplicaSets"
"com.datadoghq.kubernetes.apps.deleteMultipleStatefulSets"
"com.datadoghq.kubernetes.apps.deleteReplicaSet"
"com.datadoghq.kubernetes.apps.deleteStatefulSet"
"com.datadoghq.kubernetes.apps.getControllerRevision"
"com.datadoghq.kubernetes.apps.getDaemonSet"
"com.datadoghq.kubernetes.apps.getDeployment"
"com.datadoghq.kubernetes.apps.getReplicaSet"
"com.datadoghq.kubernetes.apps.getStatefulSet"
"com.datadoghq.kubernetes.apps.listControllerRevision"
"com.datadoghq.kubernetes.apps.listDaemonSet"
"com.datadoghq.kubernetes.apps.listDeployment"
"com.datadoghq.kubernetes.apps.listReplicaSet"
"com.datadoghq.kubernetes.apps.listStatefulSet"
"com.datadoghq.kubernetes.apps.patchControllerRevision"
"com.datadoghq.kubernetes.apps.patchDaemonSet"
"com.datadoghq.kubernetes.apps.patchDeployment"
"com.datadoghq.kubernetes.apps.patchReplicaSet"
"com.datadoghq.kubernetes.apps.patchStatefulSet"
"com.datadoghq.kubernetes.apps.restartDeployment"
"com.datadoghq.kubernetes.apps.updateControllerRevision"
"com.datadoghq.kubernetes.apps.updateDaemonSet"
"com.datadoghq.kubernetes.apps.updateDeployment"
"com.datadoghq.kubernetes.apps.updateReplicaSet"
"com.datadoghq.kubernetes.apps.updateStatefulSet"</pre>
</details>

<details>
  <summary>Kubernetes Core</summary>
  <pre>"com.datadoghq.kubernetes.core.createConfigMap"
"com.datadoghq.kubernetes.core.createEndpoints"
"com.datadoghq.kubernetes.core.createEvent"
"com.datadoghq.kubernetes.core.createLimitRange"
"com.datadoghq.kubernetes.core.createNamespace"
"com.datadoghq.kubernetes.core.createNode"
"com.datadoghq.kubernetes.core.createPersistentVolume"
"com.datadoghq.kubernetes.core.createPersistentVolumeClaim"
"com.datadoghq.kubernetes.core.createPod"
"com.datadoghq.kubernetes.core.createPodTemplate"
"com.datadoghq.kubernetes.core.createReplicationController"
"com.datadoghq.kubernetes.core.createResourceQuota"
"com.datadoghq.kubernetes.core.createService"
"com.datadoghq.kubernetes.core.createServiceAccount"
"com.datadoghq.kubernetes.core.deleteConfigMap"
"com.datadoghq.kubernetes.core.deleteEndpoints"
"com.datadoghq.kubernetes.core.deleteEvent"
"com.datadoghq.kubernetes.core.deleteLimitRange"
"com.datadoghq.kubernetes.core.deleteMultipleConfigMaps"
"com.datadoghq.kubernetes.core.deleteMultipleEndpoints"
"com.datadoghq.kubernetes.core.deleteMultipleEvents"
"com.datadoghq.kubernetes.core.deleteMultipleLimitRanges"
"com.datadoghq.kubernetes.core.deleteMultipleNodes"
"com.datadoghq.kubernetes.core.deleteMultiplePersistentVolumeClaims"
"com.datadoghq.kubernetes.core.deleteMultiplePersistentVolumes"
"com.datadoghq.kubernetes.core.deleteMultiplePodTemplates"
"com.datadoghq.kubernetes.core.deleteMultiplePods"
"com.datadoghq.kubernetes.core.deleteMultipleReplicationControllers"
"com.datadoghq.kubernetes.core.deleteMultipleResourceQuotas"
"com.datadoghq.kubernetes.core.deleteMultipleServiceAccounts"
"com.datadoghq.kubernetes.core.deleteNamespace"
"com.datadoghq.kubernetes.core.deleteNode"
"com.datadoghq.kubernetes.core.deletePersistentVolume"
"com.datadoghq.kubernetes.core.deletePersistentVolumeClaim"
"com.datadoghq.kubernetes.core.deletePod"
"com.datadoghq.kubernetes.core.deletePodTemplate"
"com.datadoghq.kubernetes.core.deleteReplicationController"
"com.datadoghq.kubernetes.core.deleteResourceQuota"
"com.datadoghq.kubernetes.core.deleteService"
"com.datadoghq.kubernetes.core.deleteServiceAccount"
"com.datadoghq.kubernetes.core.getConfigMap"
"com.datadoghq.kubernetes.core.getEndpoints"
"com.datadoghq.kubernetes.core.getEvent"
"com.datadoghq.kubernetes.core.getLimitRange"
"com.datadoghq.kubernetes.core.getNamespace"
"com.datadoghq.kubernetes.core.getNode"
"com.datadoghq.kubernetes.core.getPersistentVolume"
"com.datadoghq.kubernetes.core.getPersistentVolumeClaim"
"com.datadoghq.kubernetes.core.getPod"
"com.datadoghq.kubernetes.core.getPodTemplate"
"com.datadoghq.kubernetes.core.getReplicationController"
"com.datadoghq.kubernetes.core.getResourceQuota"
"com.datadoghq.kubernetes.core.getService"
"com.datadoghq.kubernetes.core.getServiceAccount"
"com.datadoghq.kubernetes.core.listConfigMap"
"com.datadoghq.kubernetes.core.listEndpoints"
"com.datadoghq.kubernetes.core.listEvent"
"com.datadoghq.kubernetes.core.listLimitRange"
"com.datadoghq.kubernetes.core.listNamespace"
"com.datadoghq.kubernetes.core.listNode"
"com.datadoghq.kubernetes.core.listPersistentVolume"
"com.datadoghq.kubernetes.core.listPersistentVolumeClaim"
"com.datadoghq.kubernetes.core.listPod"
"com.datadoghq.kubernetes.core.listPodTemplate"
"com.datadoghq.kubernetes.core.listReplicationController"
"com.datadoghq.kubernetes.core.listResourceQuota"
"com.datadoghq.kubernetes.core.listService"
"com.datadoghq.kubernetes.core.listServiceAccount"
"com.datadoghq.kubernetes.core.patchConfigMap"
"com.datadoghq.kubernetes.core.patchEndpoints"
"com.datadoghq.kubernetes.core.patchEvent"
"com.datadoghq.kubernetes.core.patchLimitRange"
"com.datadoghq.kubernetes.core.patchNamespace"
"com.datadoghq.kubernetes.core.patchNode"
"com.datadoghq.kubernetes.core.patchPersistentVolume"
"com.datadoghq.kubernetes.core.patchPersistentVolumeClaim"
"com.datadoghq.kubernetes.core.patchPod"
"com.datadoghq.kubernetes.core.patchPodTemplate"
"com.datadoghq.kubernetes.core.patchReplicationController"
"com.datadoghq.kubernetes.core.patchResourceQuota"
"com.datadoghq.kubernetes.core.patchService"
"com.datadoghq.kubernetes.core.patchServiceAccount"
"com.datadoghq.kubernetes.core.updateConfigMap"
"com.datadoghq.kubernetes.core.updateEndpoints"
"com.datadoghq.kubernetes.core.updateEvent"
"com.datadoghq.kubernetes.core.updateLimitRange"
"com.datadoghq.kubernetes.core.updateNamespace"
"com.datadoghq.kubernetes.core.updateNode"
"com.datadoghq.kubernetes.core.updatePersistentVolume"
"com.datadoghq.kubernetes.core.updatePersistentVolumeClaim"
"com.datadoghq.kubernetes.core.updatePod"
"com.datadoghq.kubernetes.core.updatePodTemplate"
"com.datadoghq.kubernetes.core.updateReplicationController"
"com.datadoghq.kubernetes.core.updateResourceQuota"
"com.datadoghq.kubernetes.core.updateService"
"com.datadoghq.kubernetes.core.updateServiceAccount"</pre>
</details>

<details>
  <summary>PostgreSQL</summary>
  <pre>"com.datadoghq.postgresql.select"</pre>
</details>

<details>
  <summary>Temporal</summary>
  <pre>"com.datadoghq.temporal.getWorkflowResult"
"com.datadoghq.temporal.listWorkflows"
"com.datadoghq.temporal.runWorkflow"</pre>
</details>

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.kubernetes
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.postgresql
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.jenkins
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.temporal
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.http
[6]: https://app.datadoghq.com/actions/action-catalog
[7]: https://app.datadoghq.com/workflow/connections
[8]: https://app.datadoghq.com/app-builder/connections
[9]: /actions/private_actions/private_action_credentials
[10]: https://app.datadoghq.com/workflow/
[11]: https://app.datadoghq.com/app-builder/
[12]: /service_management/workflows/build
[13]: /service_management/app_builder/build
[14]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[16]: /actions/private_actions/
[17]: /account_management/rbac/
[18]: /account_management/rbac/permissions/#app-builder--workflow-automations
[19]: /account_management/api-app-keys/#api-keys
[20]: /account_management/api-app-keys/#application-keys
