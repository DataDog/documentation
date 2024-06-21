---
title: Private Actions
kind: Documentation
disable_toc: false
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "service_management/workflows/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials for Workflow Automation"
- link: "service_management/app_builder/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials for App Builder"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSc_AEtxd8MPHUFyYIbX3hWEVF18iSWuk7kmA0PtlOPgo0pi3w/viewform" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
{{< /callout >}}

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing your services to the public internet. To use private actions, you must use Docker to install a private action runner on a host in your network, then pair the runner with a Datadog Connection.

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
- Docker (with Docker Compose if that is your preference)

## Set up a private action runner

From the **Private Action Runner** page in [Workflow Automation][6] or [App Builder][7], click **New Private Action Runner**. The installation steps differ depending on whether you want to install the runner for App Builder, Workflow Automation, or both App Builder and Workflow Automation.

{{% collapse-content title="Both App Builder and Workflow Automation" level="p" %}}
1. Enter a name for your runner.
1. Click **Both**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:

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
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="p" %}}
1. Enter a name for your runner.
1. Click **App Builder**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:
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
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Workflow Automation" level="p" %}}
1. Enter a name for your runner.
1. Click **Workflows**.
1. Create a directory on your host where the runner can store its configuration, such as `./config`. You can also use this directory to store any credentials required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:
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
1. Add the paths to any required credential files. For more information on credentials, see:
   - [Handling Private Action Credentials for Workflows][10].
   - [Handling Private Action Credentials for App Builder][16].

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

From the **Private Action Runner** page in [Workflow Automation][6] or [App Builder][7], you can view all of your private runners together with the workflows or apps that use each runner. To edit the connection for a runner, click **View Details**. Click the trash can icon to delete a runner.

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
[10]: /service_management/workflows/private_actions/private_action_credentials
[11]: https://app.datadoghq.com/workflow/
[12]: https://app.datadoghq.com/app-builder/
[13]: /service_management/workflows/build
[14]: /service_management/app_builder/build
[15]: /service_management/workflows/build/#build-a-workflow-with-the-workflow-builder
[16]: /service_management/app_builder/private_actions/private_action_credentials

