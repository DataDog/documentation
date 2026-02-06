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
- A DNS entry that points to your Observability Pipelines server.
- An SSL/TLS certificate for your domain. Cloudflare requires an HTTPS endpoint and does not accept HTTP.
	- **Note**: You cannot use Cloudflare origin certificates because they are not publicly trusted.

## Set up TLS certificates

Cloudflare requires an HTTPS endpoint and does not accept HTTP, so you need an SSL certificate for Observability Pipelines.

1. Create a DNS entry that points to your Observability Pipelines server.
1. Obtain an SSL/TLS certificate for your domain. Users generally bring their own certificates.
1. Open your firewall for port 443 to the Observability Pipelines server.

## Set up a pipeline

1. Navigate to [Observability Pipelines][1].
1. Select a log template to create a pipeline.
1. Select the HTTP Server source:
  1. Set the authorization strategy to **Basic**.
  1. In the **Decoding** dropdown menu, select **Bytes**.
  1. Enable TLS:
      1. Set the certificate path to `/fullchain.pem`.
      1. Set the private key path to `/privkey.pem`.
        - Observability Pipelines automatically fills in `/var/lib/observability-pipelines-worker/config` as the base path.
        - Users insert their own certificate names.
      1. If your certificate has a TLS passphrase, enter it.
1. After you set up your destinations and processors, click **Next: Install**.
1. Before installing the Observability Pipelines Worker, copy your certificates into the configuration directory:
    ```shell
    # Create the configuration directory
    sudo mkdir -p /var/lib/observability-pipelines-worker/config
    # Copy your certificates
    sudo cp /path/to/your/fullchain.pem /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo cp /path/to/your/privkey.pem /var/lib/observability-pipelines-worker/config/privkey.pem
    ```
1. On the **Install** page, configure your basic authentication credentials.
1. Follow the instructions on the page to install the Worker based on your platform.
1. After installation, change ownership of the certificates so the Observability Pipelines Worker can read them:
    ```shell
    # Change ownership so the Worker can read the certificates
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/fullchain.pem
    sudo chgrp observability-pipelines-worker /var/lib/observability-pipelines-worker/config/privkey.pem
    sudo chmod 640 /var/lib/observability-pipelines-worker/config/privkey.pem
    ```
1. Deploy the configuration from the Observability Pipelines UI.
1. Test your endpoint:
    ```shell
    curl -X POST https://your-domain.com \
      -u username:password \
      -H "Content-Type: application/json" \
      -d '{"message":"test log from curl","source":"curl","service":"cloudflare-logpush"}'
    ```

## Set up Cloudflare Logpush

Follow the [Cloudflare Logpush HTTP destination documentation][2].

1. In Cloudflare, navigate to **Analytics & Logs** > **Logs**.
1. Click **Create a Logpush job**.
1. Select **HTTP Destination**.
1. Configure your endpoint URL:
    - Basic authentication headers need to be in the URL. Logpush doesn't support any other way of adding them.
    - Base64 encode your authentication credentials.
    - Format your URL as: `https://your-domain.com?header_Authorization=Basic%20<base64-encoded-credentials>`
    - **Note**: Logpush does not support HTTP and must use HTTPS.
1. Validate your destination. You get a validation message at the bottom of the screen.
1. Select the datasets to send through Logpush to your Observability Pipelines destination.
1. Configure the job:
    1. Select the fields to include in the logs.
    1. Configure additional job settings as needed.
1. Click **Submit**. You get a validation message at the bottom of the screen.
1. View your Cloudflare Logpush logs in Datadog [Log Explorer][3].

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/http/
[3]: https://app.datadoghq.com/logs
