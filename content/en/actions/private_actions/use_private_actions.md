---
title: Use Private Actions
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

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Join the Preview!">}}
Private Actions are in Preview. Use this form to request access today.
{{< /callout >}}

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must use Docker to install a private action runner on a host in your network, then pair the runner with a Datadog Connection.

For more information about how private actions work, see the full [overview page][17].

## Supported private actions

The following integrations support private actions:
- [Kubernetes][1]
- [Postgres][2]
- [Jenkins][3]
- [Temporal][4]
- The [HTTP][5] action

## Prerequisites

The private action runner requires a Linux host that is able to reach any internal services you want to call from an action or app.

To use App Builder with private actions, you must be able to point a hostname to the private action runner's container. This hostname must be resolvable by your App users. App Builder calls the hostname using HTTPS, so you must bring your own SSL termination.

In addition, the host must have the following:
- 2GB of RAM
- Docker (with Docker Compose if that is your preference) or Kubernetes

## Set up a private action runner

From the **Private Action Runner** page in [Workflow Automation][6] or [App Builder][7], click **New Private Action Runner**. The installation steps differ depending on whether you want to install the runner for App Builder, Workflow Automation, or both App Builder and Workflow Automation.

{{% collapse-content title="Both App Builder and Workflow Automation" level="p" %}}
1. Enter a name for your runner.
1. Click **Both**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker, Docker Compose, or Kubernetes:

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
1. Confirm that you have installed `kubectl` on your machine by running `kubectl version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have installed `helm` on your machine by running `helm version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have sufficient permissions to create Kubernetes resources in your cluster, then check the box on the **Private Action Runner** page.<br>Further instructions appear in the app.
1. Follow the instructions provided in the app to:
    1. Enroll the runner and generate the config.
    1. Create a `values.yaml` file.
    1. Add the **Private Action Runner** to your Helm repositories.
    1. Install the Helm chart.
1. Run `kubectl get pods -w` and verify that the status of the Private Action Runner pod becomes `Ready`.


{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="p" %}}
1. Enter a name for your runner.
1. Click **App Builder**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker, Docker Compose, or Kubernetes:
{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.


{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file. For information on creating a Docker Compose file, see the [official Compose docs][101].
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}
1. Click **Kubernetes**.
1. Confirm that you have installed `kubectl` on your machine by running `kubectl version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have installed `helm` on your machine by running `helm version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have sufficient permissions to create Kubernetes resources in your cluster, then check the box on the **Private Action Runner** page.<br>Further instructions appear in the app.
1. Follow the instructions provided in the app to:
    1. Enroll the runner and generate the config.
    1. Create a `values.yaml` file.
    1. Add the **Private Action Runner** to your Helm repositories.
    1. Install the Helm chart.
1. Run `kubectl get pods -w` and verify that the status of the Private Action Runner pod becomes `Ready`.


{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Workflow Automation" level="p" %}}
1. Enter a name for your runner.
1. Click **Workflows**.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker, Docker Compose, or Kubernetes:
{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file. For information on creating a Docker Compose file, see the [official Compose docs][101].
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

[101]: https://docs.docker.com/compose/compose-application-model/
{{% /tab %}}

{{% tab "Kubernetes" %}}
1. Click **Kubernetes**.
1. Confirm that you have installed `kubectl` on your machine by running `kubectl version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have installed `helm` on your machine by running `helm version` and verifying that there is output, then check the box on the **Private Action Runner** page.
1. Confirm that you have sufficient permissions to create Kubernetes resources in your cluster, then check the box on the **Private Action Runner** page.<br>Further instructions appear in the app.
1. Follow the instructions provided in the app to:
    1. Enroll the runner and generate the config.
    1. Create a `values.yaml` file.
    1. Add the **Private Action Runner** to your Helm repositories.
    1. Install the Helm chart.
1. Run `kubectl get pods -w` and verify that the status of the Private Action Runner pod becomes `Ready`.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

When you see the **Ready to use** status, you can create a new connection for the runner or see it on the **Private Action Runners** page:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.

See [Connect a runner](#connect-a-runner) for more information on pairing your runner with a connection.

## Connect a runner

Before you can use an action runner, you must pair it with one or more connections.

To pair a runner to a connection:
1. From the [Workflow Automation][8] or [App Builder][9] Connections page, click **New Connection**.
1. Select the integration you want to connect with your private action runner. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Add a **Connection Name** and select your runner from the **Private Action Runner** dropdown.
1. Add the paths to any required credential files. For more information on credentials, see [Handling Private Action Credentials][10].

## Use a private action

To use a private action in your [Workflow Automation][11] workflow or [App Builder][12] app:

{{% collapse-content title="Workflow Automation" level="p" %}}
1. From the [Workflow Automation][11] page, create a workflow, or open an existing workflow. For information on creating or editing a workflow, see [Build Workflows][13].
1. Click **Add Step** and search for the private action you want to add to your workflow. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Enter a name for the step.
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner that is paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your workflow.
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="p" %}}
1. From the [App Builder][12] page, create an app, or open an existing app. For information on creating or editing an app, see [Build Apps][15].
1. Click **New Query** and search for the private action you want to add to your app. For a list of integrations that support private actions, see [Supported private actions](#supported-private-actions).
1. Select a **Connection** from the dropdown or click the plus (**+**) icon to add a new connection. Using a private action requires a private action runner paired with a connection. See [Connect a runner](#connect-a-runner) for more information.
1. Complete any required fields and click **Save** to save your query.
{{% /collapse-content %}}

## Edit private runners

### Edit connections or delete runners

From the **Private Action Runner** page in [Workflow Automation][6] or [App Builder][7], you can view all of your private runners together with the workflows or apps that use each runner. To edit the connection for a runner, click **View Details**. Click the trash can icon to delete a runner.

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
[6]: https://app.datadoghq.com/workflow/private-action-runners
[7]: https://app.datadoghq.com/app-builder/private-action-runners
[8]: https://app.datadoghq.com/workflow/connections
[9]: https://app.datadoghq.com/app-builder/connections
[10]: /actions/private_actions/private_action_credentials
[11]: https://app.datadoghq.com/workflow/
[12]: https://app.datadoghq.com/app-builder/
[13]: /service_management/workflows/build
[14]: /service_management/app_builder/build
[15]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[17]: /actions/private_actions/
