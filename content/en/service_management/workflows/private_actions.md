---
title: Private actions
kind: Documentation
disable_toc: false
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflow/connections"
  tag: "Documentation"
  text: "Workflow Connections"
---

{{< callout url="https://google.com" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request request access today.
{{< /callout >}}

## Overview

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without opening a port in your firewall. Private actions make use of a private action runner which you install on a host in your network and pair with a Datadog Connection.

The following integrations support private actions:
- [Kubernetes][1]
- [Postgres][2]
- [Jenkins][3]
- [Ansible][4]
- The [HTTP][5] action

## Prerequisites

The private action runner requires a Linux host with the following:
- 2GB of RAM
- The host should be able to reach any internal services you want to call
- Docker
- The Docker Compose plugin (if you want to use Docker Compose).

## Set up a private action runner

From the [Private Action Runner][6] page, click **New Private Action Runner**. The installation steps differ depending on whether you want to install the runner for App Builder, Workflow Automation, or both App Builder and Workflow Automation.

{{% collapse-content title="Both App Builder and Workflow Automation" level="h4" %}}
1. Enter a name for your runner.
1. Click **Both**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration. For example, `./config`. You can also use this directory to [store any credentials][9] required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:

{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration. 

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file.
1. Replace `./config` with the path to the directory you created for the runner configuration. 
1. Run `docker compose up -d`.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}
{{< /tabs >}}

When the status changes to **Ready to use**:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.

See [Connect a runner](#connect-a-runner) for more information on pairing your runner with a connection.
{{% /collapse-content %}}

{{% collapse-content title="App Builder" level="h4" %}}
1. Enter a name for your runner.
1. Click **App Builder**.
1. Enter a runner hostname. App Builder calls your runner using this hostname over HTTPS. You must bring your own SSL termination and forward to port 9016 in the container.
1. Create a directory on your host where the runner can store its configuration. For example, `./config`. You can also use this directory to [store any credentials][9] required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:
{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.

{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file.
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}
{{< /tabs >}}

When the status changes to **Ready to use**:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.
{{% /collapse-content %}}

{{% collapse-content title="Workflow Automation" level="h4" %}}
1. Enter a name for your runner.
1. Click **Workflows**.
1. Create a directory on your host where the runner can store its configuration. For example, `./config`. You can also use this directory to [store any credentials][9] required by the runner's connection.
1. Deploy your runner with Docker or Docker Compose:
{{< tabs >}}
{{% tab "Docker" %}}
1. Click **Docker**.
1. Run the provided `docker run` command on your host, replacing `./config` with the path to the directory you created for the runner configuration.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}

{{% tab "Docker Compose" %}}
1. Click **Docker Compose**.
1. Create a `docker-compose.yaml` file and add the provided YAML, or add the `runner` stanza to an existing Docker Compose file.
1. Replace `./config` with the path to the directory you created for the runner configuration.
1. Run `docker compose up -d`.

   You can safely ignore the error: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED`.
{{% /tab %}}
{{< /tabs >}}

When the status changes to **Ready to use**:
- To create a new connection for the runner, click **Link Runner to New Connection** and select an integration.
- Click **View Runner** to see the runner on the **Private Action Runners** page.
{{% /collapse-content %}}

## Connect a runner

Before you can use an action runner, you must pair it with one or more connections.

To pair a runner to a connection:
1. From the [Workflow Automation][7] or [App Builder][8] Connections page, click **New Connection**.
1. Select the integration you want to connect with your private action runner. For a list of supported integrations, see [Overview](#overview).
1. Add a **Connection Name** and select the **Private Action Runner** from the drop-down list.
1. Add the paths to any required Credential files. For more information, see [Handling Private Action Credentials][9].

## Use a private action



## View private runners

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.kubernetes
[2]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.postgresql
[3]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.jenkins
[4]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.ansible
[5]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.http
[6]: https://app.datadoghq.com/workflow/private-action-runners
[7]: https://app.datadoghq.com/workflow/connections
[8]: https://app.datadoghq.com/app-builder/connections
[9]: /service_management/workflows/guide/private_action_credentials
