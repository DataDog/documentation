---
title: Send Okta Logs to Observability Pipelines
description: Learn how to send Okta logs to Observability Pipelines
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

This document goes over how to send Okta logs to Observability Pipelines using Amazon EventBridge.

## Prerequisites

The following are required to send Okta logs to Observability Pipelines using Amazon EventBridge:

- A registered domain.
- A TLS certificate that matches the domain.

## Set up a pipeline

### Set up the pipeline components

1. Navigate to [Observability Pipelines][1].
1. Select a log template to create a pipeline.
1. Select the HTTP Server source.
1. If you are using Secrets Management, enter the identifier for the HTTP/S Server address key. See [Set secrets][2] for the defaults used.
1. Select your authorization strategy. If you selected **Plain**:
    - Enter the identifiers for the HTTP/S Server username and password. See [Set secrets][2] for the defaults used.
1. In the **Decoding** dropdown menu, select **Bytes**.
1. Toggle the switch to **Enable TLS**.
    - If you are using Secrets Management, enter the identifier for the HTTP/S Server key pass. See [Set secrets][2] for the defaults used.
    - The following certificate and key files are required.
      - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER, PEM, or CRT (X.509).
      - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER, PEM, or CERT (X.509).
      - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER, PEM, or CERT (PKCS #8) format.
      - **Notes**:
        - The configuration data directory `/var/lib/observability-pipelines-worker/config/` is automatically appended to the file paths. See [Advanced Worker Configurations][5] for more information.
        - The file must be readable by the `observability-pipelines-worker` group and user.
1. Copy your certificates into the configuration directory:
    ```shell
    # Create the configuration directory
    sudo mkdir -p /var/lib/observability-pipelines-worker/config

    # Copy your certificates
    sudo cp /path/to/your/<your-cert-file> /var/lib/observability-pipelines-worker/config/<your-cert-file>
    sudo cp /path/to/your/<your-cert-file> /var/lib/observability-pipelines-worker/config/<your-cert-file>
    ```
1. After you set up your destinations and processors, click **Next: Install**.

### Install the Worker

1. On the **Install** page, select your platform in the dropdown menu.
1. Follow the instructions on the page to install the Worker based on your platform. See [Install the Worker][3] for details.
1. After installing the Worker, change ownership of the certificates so the Observability Pipelines Worker can read them:
    ```shell
    # Change ownership so the Worker can read the certificates
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/<your-cert-file>
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/<your-cert-file>
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/<your-cert-file>
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/<your-cert-file>
    ```
1. Deploy the configuration from the Observability Pipelines UI.
1. Test your endpoint using curl:
    ```shell
    curl -X POST https://your-domain.com \
      -u username:password \
      -H "Content-Type: application/json" \
      -d '{"message":"test log from curl","source":"curl","service":"okta"}'
    ```

## Create an AWS EventBridge stream in Okta

Follow the [Add an AWS EventBridge log stream][4] instructions to:

1. Create an EventBridge stream in Okta.
1. Configure the Amazon EventBridge log stream in the AWS console.
    1. When you are configuring a target after building the event pattern, select **EventBridge API destination** for the Target type.
    1. Select **Create a new API destination**.
    1. Enter a name for the destination.
    1. In the **API destination endpoint** field, enter your Observability Pipelines Worker URL.
    1. Select **Post** as the HTTP method.
    1. Select **Create a new connection**.
    1. Enter a name for the connection.
    1. Select the API type.
    1. Select **Custom configuration** if you are using HTTP authentication and enter your username and password.
    1. Click **Create rule**.

After configuring the Amazon EventBridge, you can view your Okta logs in [Log Explorer][6].

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/sources/http_server/?tab=secretsmanagement#set-secrets
[3]: /observability_pipelines/configuration/install_the_worker/?tab=docker#pipeline-ui-setup
[4]: https://help.okta.com/en-us/content/topics/reports/log-streaming/add-aws-eb-log-stream.htm
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/logs
