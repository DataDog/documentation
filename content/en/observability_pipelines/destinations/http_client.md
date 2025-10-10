---
title: HTTP Client Destination
disable_toc: false
---

## Overview

Use Observability Pipelines' HTTP Client destination to send logs to an HTTP client, such as a logging platform or SIEM.

## Set up destination

Set up the HTTP Client destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

1. Select your authorization strategy (**None**, **Basic**, or **Bearer**).
1. JSON is the only available encoder.
1. Optionally, toggle the switch to enable compression. If enabled:
	1. GZIP is the only available compression algorithm.
	1. Select the compression level you want to use.
1. Optionally, toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
    - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
    - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.
1. Optionally, toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
	- If left disabled, the maximum size for buffering is 500 events.
	- If enabled:
		1. Select the buffer type you want to set (**Memory** or **Disk**).
		1. Enter the buffer size and select the unit.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these conditions occurs. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching