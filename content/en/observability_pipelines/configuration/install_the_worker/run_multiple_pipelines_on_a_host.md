---
title: Run Multiple Pipelines on a Host
disable_toc: false
aliases:
    - /observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
further_reading:
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up a pipeline"
- link: "/observability_pipelines/guide/environment_variables/"
  tag: "Documentation"
  text: "Environment variable for sources, processors, and components"
---

## Overview

If you want to run multiple pipelines on a single host to send logs or metrics ({{< tooltip glossary="preview" >}}) from different sources, you need to manually add the Worker files for any additional Workers. This document explains which files you need to add and modify to run those Workers.

## Prerequisites

[Set up the first pipeline][1] and install the Worker on your host.

## Create an additional pipeline

[Set up another pipeline][1] for the additional Worker that you want to run on the same host. When you reach the Install page, follow the below steps to run the Worker for this pipeline.

## Run the Worker for the additional pipeline

When you installed the first Worker, by default you have:

- A service binary: `/usr/bin/observability-pipelines-worker`
- A service definition file that looks like:
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unit]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
- An environment file that looks like:
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- A data directory: `/var/lib/observability-pipelines-worker`

### Configure the additional Worker

For this example, another pipeline was created with the Fluent source. To configure a Worker for this pipeline:

1. Run the following command to create a new data directory, replacing `op-fluent` with a directory name that fits your use case:
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. Run the following command to change the owner of the data directory to `observability-pipelines-worker:observability-pipelines-worker`. Make sure to update `op-fluent` to your data directory's name.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. Create an environment file for the new systemd service, such as `/etc/default/op-fluent` where `op-fluent` is replaced with your specific filename. Example of the file content:
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    In this example:
    -  `DD_OP_DATA_DIR` is set to `/var/lib/op-fluent`. Replace `/var/lib/op-fluent` with the path to your data directory.
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` is the environment variable required for the Fluent source in this example. Replace it with the [environment variable][2] for your source.
    
    Also, make sure to replace:
    - `<datadog_api_key>` with your [Datadog API key][3].
    - `<pipeline_id>` with the ID of the [pipeline][1] for this Worker.
    - `<dd_site>` with your [Datadog Site][4].
    - `<destination_environment_variables>` with the [environment variables][2] for your destinations.
1. Create a new systemd service entry, such as `/lib/systemd/system/op-fluent.service`. Example content for the entry:
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unit]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
    In this example:
    - The service name is `op-fluent` because the pipeline is using the Fluent source. Replace `op-fluent.service` with a service name for your use case.
    - The `Description` is `OPW for Fluent Pipeline`. Replace `OPW for Fluent Pipeline` with a  description for your use case.
    - `EnvironmentFile` is set to `-/etc/default/op-fluent`. Replace `-/etc/default/op-fluent` with the systemd service environment variables file you created for your Worker.
1. Run this command to reload systemd:
    ```shell
    sudo systemctl daemon-reload
    ```
1. Run this command to start the new service:
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. Run this command to verify the service is running:
    ```shell
    sudo systemctl status op-fluent
    ```

Additionally, you can use the command `sudo journalctl -u op-fluent.service` to help you debug any issues.

## Deploy the pipeline

1.  Navigate to the additional pipeline's Install page.
1.  In the **Deploy your pipeline** section, you should see your additional Worker detected. Click **Deploy**.

[1]: /observability_pipelines/configuration/set_up_pipelines/?tab=pipelineui
[2]: /observability_pipelines/guide/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /getting_started/site/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}