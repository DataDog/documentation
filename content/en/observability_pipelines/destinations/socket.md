---
title: Socket Destination
disable_toc: false
---

Use Observability Pipelines' Socket destination to send logs to a socket endpoint.

## Setup

Set up the Socket destination and its environment variables when you [set up a pipeline][1]. The following information is configured in the pipelines UI.

### Set up the destination

1. 1. Enter the identifier for your address.
	- If left blank, the default is used: `DESTINATION_SOCKET_ADDRESS`.
1.  In the **Mode** dropdown menu, select the socket type to use.
1.  In the **Encoding** dropdown menu, select either `JSON` or `Raw message` as the output format.

#### Optional settings

##### Enable TLS

If you enabled **TCP** mode, you can toggle the switch to **Enable TLS**. The following certificate and key files are required for TLS:
- Enter the identifier for your socket key pass.
	- **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
	- If left blank, the default is used: `DESTINATION_SOCKET_KEY_PASS`.
-   `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
-   `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
-   `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

#### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

### How the destination works

#### Event batching

The Socket destination does not batch events.

[1]: https://app.datadoghq.com/observability-pipelines