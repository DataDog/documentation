---
title: CrowdStrike Next-Gen SIEM Destination
disable_toc: false
---

Use Observability Pipelines' CrowdStrike Next-Gen SIEM destination to send logs to CrowdStrike Next-Gen SIEM.

## Setup

Set up the CrowdStrike NG-SIEM destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

To use the CrowdStrike NG-SIEM destination, you need to set up a CrowdStrike data connector using the HEC/HTTP Event Connector. See [Step 1: Set up the HEC/HTTP event data connector][3] for instructions. When you set up the data connector, you are given a HEC API key and URL, which you use when you configure the Observability Pipelines Worker later on.

<div class="alert alert-danger">Only enter the identifiers for the CrowdStrike NG-SIEM endpoint URL and token. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your CrowdStrike NG-SIEM endpoint URL.
    - If left blank, the default is used: `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.
1. Enter the identifier for your CrowdStrike NG-SIEM token.
    - If left blank, the default is used: `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.
1. Select **JSON** or **Raw** encoding in the dropdown menu.

#### Optional settings

##### Enable compressions

1. Toggle the switch to **Enable compressions**.
1. Select an algorithm (**gzip** or **zlib**) in the dropdown menu.

##### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.

**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][4] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.

- Enter the identifier for your CrowdStrike NG-SIEM key pass.
    - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
    - If left blank, the default is used: `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS`.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| None           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: https://falcon.us-2.crowdstrike.com/documentation/page/bdded008/hec-http-event-connector-guide
[4]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/