---
title: Send Akamai DataStream logs to Observability Pipelines
description: Learn how to send Akamai DataStream logs to Observability Pipelines
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
aliases:
    - /observability_pipelines/sources/akamai_datastreamer
---

{{< product-availability >}}

## Overview

This document goes over how to send Akamai DataStream logs to Observability Pipelines using the HTTP Server source.

## Prerequisites

The following are required to send Akamai DataStream logs to Observability Pipelines:

- An Akamai account with DataStreams 2.
- A server or a server pool, fronted by a load balancer, that runs the Observability Pipelines Worker and allows traffic from the public internet.
- A domain where you can set DNS records or a DNS entry for the server or load-balanced server pool.
	- **Note**: You must use a Fully Qualified Domain Name (FQDN). Akamai DataStreams does **not** allow you to point to an IP address.

## Set up a pipeline

1. Navigate to [Observability Pipelines][1].
1. Select a log template to create a pipeline.
1. Select the HTTP Server source:
    1. Select your authorization strategy.
    1. In the **Decoding** dropdown menu, select **Bytes**.
1. After you set up your destinations and processors, click **Next: Install**.
1. On the **Install** page, enter the HTTP/S Server listener address, such as `0.0.0.0:9997`.
1. Follow the rest of the instructions on the page to install the Worker based on your platform.

## Set up Akamai DataStream

1. In Akamai, navigate to [DataStreams][2].
1. Click **Create Stream** in the top right corner.
    1. Choose your type of stream, which is the Akamai product with which you want to use DataStream.
1. Select your properties and click **Next**.
1. In the **Log information** section, select the data you want to include in the log message and click **Next**.
1. In the **Destination** section:
	1. In the **Destination** dropdown menu, select **Custom HTTPS**.
	1. Enter a **Display Name**.
	1. In the **Authentication** dropdown menu, select the authorization method you chose for the HTTP Server source in Observability Pipelines.
1. Enter your endpoint URL.
    - **Note**: Your endpoint URL **must** be a FQDN, not an IP address. If you enter an IP address you get an error message.
1. Click **Validate & Save**.
1. After the stream is activated (it takes about 20 minutes), the **Stream list** page shows the status of your stream as **Active**.
1. View your Akamai DataStream logs in Datadog [Log Explorer][3] or the Observability Pipelines destination.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://control.akamai.com/apps/data-stream-ui/#/streams/group/all%20
[3]: https://app.datadoghq.com/logs