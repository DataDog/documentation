---
title: Send Cloudflare Logpush Logs to Observability Pipelines
description: Learn how to send Cloudflare Logpush logs to Observability Pipelines
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

This document goes over how to send Cloudflare Logpush logs to Observability Pipelines using the HTTP Server source.

## Prerequisites

The following are required to send Cloudflare Logpush logs to Observability Pipelines:

- A Cloudflare account with Logpush enabled.
- A server or a server pool, fronted by a load balancer, that runs the Observability Pipelines Worker and allows traffic from the public internet.
- A DNS entry that points to your Observability Pipelines Worker.
- An SSL/TLS certificate for your domain. Cloudflare requires an HTTPS endpoint and does not accept HTTP.
	- **Note**: You cannot use Cloudflare origin certificates because they are not publicly trusted.
- If you are using a firewall, ensure you add [Cloudflare's IP addresses][1] to your allowlist.

## Set up a pipeline

### Set up the pipeline components

1. Navigate to [Observability Pipelines][2].
1. Select a log template to create a pipeline.
1. Select the HTTP Server source:
  1. If you are using Secrets Management, enter the identifier for the HTTP/S Server address key. See [Set secrets][3] for the defaults used.
  1. Set the authorization strategy to **Basic**. If you are using Secrets Management, enter the identifiers for the HTTP/S Server username and password. See [Set secrets][3] for the defaults used.
  1. In the **Decoding** dropdown menu, select **Bytes**.
  1. Enable TLS:
      1. If you are using Secrets Management, enter the identifier for the HTTP/S Server key pass. See [Set secrets][3] for the defaults used.
      1. Enter `/fullchain.pem` in the **Certificate path** field.
      1. Enter `/privkey.pem` in the **Private key path** field.
        - Observability Pipelines automatically appends `/var/lib/observability-pipelines-worker/config` as the base path.
1. Copy your certificates into the configuration directory:
    ```shell
    # Create the configuration directory
    sudo mkdir -p /var/lib/observability-pipelines-worker/config

    # Copy your certificates
    sudo cp /path/to/your/fullchain.pem /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo cp /path/to/your/privkey.pem /var/lib/observability-pipelines-worker/config/privkey.pem
    ```
1. After you set up your destinations and processors, click **Next: Install**.

### Install the Worker

1. On the **Install** page, select your platform in the dropdown menu.
1. Follow the instructions on the page to install the Worker based on your platform. See [Install the Worker][4] for details.
1. After installing the Worker, change ownership of the certificates so the Observability Pipelines Worker can read them:
    ```shell
    # Change ownership so the Worker can read the certificates
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/privkey.pem
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/privkey.pem
    ```
1. Deploy the configuration from the Observability Pipelines UI.
1. Test your endpoint using curl:
    ```shell
    curl -X POST https://your-domain.com \
      -u username:password \
      -H "Content-Type: application/json" \
      -d '{"message":"test log from curl","source":"curl","service":"cloudflare-logpush"}'
    ```

## Set up Cloudflare Logpush

Follow the [Cloudflare Logpush HTTP destination documentation][5] to set up Logpush to send logs to an HTTP endpoint.
  - For the **HTTP endpoint**, the basic authorization headers need to be in the URL needs: `https://clodflare.your-domain.com?header_Authorization=Basic%20<base64-encoded-credentials>`

After your Logpush job has been successfully created, you can view your Cloudflare Logpush logs in Datadog [Log Explorer][6].

[1]: https://www.cloudflare.com/en-in/ips/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /observability_pipelines/sources/http_server/?tab=secretsmanagement#set-secrets
[4]: /observability_pipelines/configuration/install_the_worker/?tab=docker#pipeline-ui-setup
[5]: https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/
[6]: https://app.datadoghq.com/logs