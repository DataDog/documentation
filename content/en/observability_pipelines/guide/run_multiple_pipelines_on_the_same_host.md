---
title: Run Multiple Pipelines on the Same Host
disable_toc: false
---

## Overview

If you want to run multiple pipelines on one host so that you can send logs from different sources, you need to manually add the Worker files for any additional Workers. This document goes over how to run additional Workers and the files that you need to add and modify to run them.

## Prerequisites

[Set up the first pipeline](https://docs.datadoghq.com/observability_pipelines/set_up_pipelines/?tab=pipelineui) and install the Worker on your host.

## Create another pipeline

[Set up another pipeline](https://docs.datadoghq.com/observability_pipelines/set_up_pipelines/?tab=pipelineui) for the additional Worker that you want to run on the same host. When you get to the Install page, follow the below steps to run the additional Worker.

## Run an additional Worker

When you installed the first Worker, by default you have:

- The service binary: `/usr/bin/observability-pipelines-worker`
- The service definition file: `/lib/systemd/system/observability-pipelines-worker.service`, which looks like:

    ```
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
    AmbientCapabilities=CAP\_NET\_BIND\_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    ```
- An environment file: `/etc/default/observability-pipelines-worker`, which looks like:

    ```
    DD\_API\_KEY=\<datadog\_api\_key\>
    DD\_SITE=datadoghq.com
    DD\_OP\_DESTINATION\_DATADOG\_ARCHIVES\_AWS\_ACCESS\_KEY\_ID=\<redacted\>
    DD\_OP\_DESTINATION\_DATADOG\_ARCHIVES\_AWS\_SECRET\_ACCESS\_KEY=\<redacted\>
    DD\_OP\_PIPELINE\_ID=\<pipeline\_id\>
    DD\_OP\_SOURCE\_DATADOG\_AGENT\_ADDRESS=0.0.0.0:8282
    DD\_OP\_API\_ENABLED=true
    ````

- A data directory: `/var/lib/observability-pipelines-worker`

### Configure an additional Worker

In this example, another pipeline was created with the Fluent source. To configure a Worker for the pipeline:

1. Run the following command to create a new data directory, updating `op-fluent` to a directory name that fits your use case:
    ```
    sudo mkdir /var/lib/op-fluent
    ```
1. Run the following command to change the owner of the data directory to `observability-pipelines-worker:observability-pipelines-worker`. Make sure to update `op-fluent` to your specific directory name.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. Create an environment file for the new systemd service, such as `/etc/default/op-fluent` where `op-fluent` is replaced with your specific filename. An example of the file content:
    ```
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipelines_id>
    DD_SITE=[datadoghq.com](http://datadoghq.com)
    DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<aws_access_key_id>
    DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>
    DD_OP_DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING=<connection_string>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    DD_OP_API_ENABLED=true
    ```
    In this example:
    - `DD_OP_DATA_DIR` is set to `/var/lib/op-fluent`, the new data directory you created in the previous step.
    - `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_ACCESS_KEY_ID=<redacted>` and `DD_OP_DESTINATION_DATADOG_ARCHIVES_AWS_SECRET_ACCESS_KEY=<redacted>` are environment variables for the Datadog Archives Amazon destination. Replace it with the environment variables for your destinations. See [Environment Variables](https://docs.datadoghq.com/observability_pipelines/environment_variables/?tab=sources).
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091` is the environment variable required for the Fluent source in this example. Replace it with the environment variables for your source. See [Environment Variables](https://docs.datadoghq.com/observability_pipelines/environment_variables/?tab=sources).
    - `DD_OP_API_ENABLED` is optional. Set it to true if you want to use the `top` or `tap` commands to get more information about your pipeline components. See [Enable Observability Pipelines Worker API](https://docs.datadoghq.com/observability_pipelines/troubleshooting/#enable-the-observability-pipelines-worker-api) for more information.
1. Create a new systemd service entry, such as `/lib/systemd/system/op-fluent.service`. An example of the content for the entry:
    ```
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
    ```
    - The service name is specific to your use case, `<your_use_case_name>.service`. In this example, the service name is `op-fluent` since the pipeline is using the Fluent source.
    - The description is for your specific use case, where in this example it is `OPW for Fluent Pipeline`.
    - `EnvironmentFile` is set to the new systemd service environment variables file you created, which in this example is: `-/etc/default/op-fluent`.
1. Run this command to reload systemd:
    ```
    sudo systemctl daemon-reload
    ```
1. Run this command to start the new service:
    ```
    sudo systemctl enable --now op-fluent
    ```
1. Run this command to verify the service is running:
    ```
    sudo systemctl status op-fluent
    ```

You can run the command `sudo journalctl -u op-fluent.service` to help you debug any issues.

## Deploy the pipeline

1.  Navigate to the second pipeline's Install page.
1.  In the **Deploy your pipeline** section, you should see your second Worker detected. Click **Deploy**.
