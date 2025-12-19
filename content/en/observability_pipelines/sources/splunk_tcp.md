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

<div class="alert alert-danger">Only enter the identifiers for the Splunk TCP address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Splunk TCP address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

Click the toggle to **Enable TLS**. If you enable TLS, the following certificate and key files are required:
- Enter the identifier for your Splunk TCP key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) Root File in either DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Splunk TCP address identifier:
	- References the socket address, such as `0.0.0.0:9997` on which the Observability Pipelines Worker listens to receive logs from the Splunk Forwarder.
	- The default identifier is `SOURCE_SPLUNK_TCP_ADDRESS`.
- Splunk TCP TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SPLUNK_TCP_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
