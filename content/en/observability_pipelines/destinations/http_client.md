---
title: HTTP Client Destination
disable_toc: false
---

## Overview

Use Observability Pipelines' HTTP Client destination to send logs to an HTTP client, such as a logging platform or SIEM.

## Set up destination

Set up the HTTP Client destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

<div class="alert alert-danger">Only enter the identifiers for the HTTP Client URI and, if applicable, username and password. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP Client URI.
	- If left blank, the default is used: `DESTINATION_HTTP_CLIENT_URI`.
1. Select your authorization strategy (**None**, **Basic**, or **Bearer**). If you selected:
	- **Basic**:
		- Enter the identifier for your HTTP Client username.
			- If left blank, the default is used: `DESTINATION_HTTP_CLIENT_USERNAME`.
		- Enter the identifier for your HTTP Client password.
			- If left blank, the default is used: `DESTINATION_HTTP_CLIENT_PASSWORD`.
	- **Bearer**:
		- Enter the identifier for your HTTP Client token.
			- If left blank, the default is used: `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`.
1. JSON is the only available encoder.

### Optional settings

#### Enable compression

Toggle the switch to **Enable Compression**. If enabled:
1. GZIP is the only available compression algorithm.
1. Select the compression level you want to use.

#### Enable TLS

Toggle the switch to enable TLS. If you enable TLS, the following certificate and key files are required:
- Enter the identifier for your HTTP Client key pass.
	- **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
	- If left blank, the default is used: `DESTINATION_HTTP_CLIENT_KEY_PASS`.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

#### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
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