---
title: Splunk Heavy or Universal Forwarders (TCP) Source
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Splunk Heavy and Universal Forwards (TCP) source to receive logs sent to your Splunk forwarders. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

- Enter the identifier for your Splunk TCP address.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.
    - If left blank, the default is used: `SOURCE_SPLUNK_TCP_ADDRESS`.

### Optional settings

Click the toggle to **Enable TLS**. If you enable TLS, the following certificate and key files are required:
- Enter the identifier for your Splunk TCP key pass.
    - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
    - If left blank, the default is used: `SOURCE_SPLUNK_TCP_KEY_PASS`.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in either DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
