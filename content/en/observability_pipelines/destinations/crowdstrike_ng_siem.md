---
title: CrowdStrike Next-Gen SIEM Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' CrowdStrike Next-Gen SIEM destination to send logs to CrowdStrike Next-Gen SIEM.

## Setup

Set up the CrowdStrike NG-SIEM destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

To use the CrowdStrike NG-SIEM destination, you need to set up a CrowdStrike data connector using the HEC/HTTP Event Connector. See [Step 1: Set up the HEC/HTTP event data connector][3] for instructions. When you set up the data connector, you are given a HEC API key and URL, which you use when you configure the Observability Pipelines Worker later on.

<div class="alert alert-danger">Only enter the identifiers for the CrowdStrike NG-SIEM endpoint URL, token, and if applicable, the pass key. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your CrowdStrike NG-SIEM endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Enter the identifier for your CrowdStrike NG-SIEM token. If you leave it blank, the [default](#set-secrets) is used.
1. Select **JSON** or **Raw** encoding in the dropdown menu.

#### Optional settings

##### Enable compressions

1. Toggle the switch to **Enable compressions**.
1. Select an algorithm (**gzip** or **zlib**) in the dropdown menu.

##### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.

**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][4] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.

- Enter the identifier for your CrowdStrike NG-SIEM key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

##### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set secrets

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- CrowdStrike NG-SIEM endpoint URL identifier:
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.
- CrowdStrike NG-SIEM token identifier:
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.
- CrowdStrike NG-SIEM TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/crowdstrike_ng_siem %}}

{{% /tab %}}
{{< /tabs >}}

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