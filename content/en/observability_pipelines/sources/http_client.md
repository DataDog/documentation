---
title: HTTP Client Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' HTTP/S Client source to pull logs from the upstream HTTP/S server. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/http_client %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

To configure your HTTP/S Client source:


<div class="alert alert-danger">Only enter the identifiers for the HTTP Client endpoint URL and, if applicable, your authorization strategy secrets. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP Client endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Select your authorization strategy. If you selected:
   - **Basic**:
      - Enter the identifier for your HTTP Client username. If you leave it blank, the [default](#set-secrets) is used.
      - Enter the identifier for your HTTP Client password. If you leave it blank, the [default](#set-secrets) is used.
   - **Bearer**: Enter the identifier for your bearer token. If you leave it blank, the [default](#set-secrets) is used.
1. Select the decoder you want to use on the HTTP messages. Logs pulled from the HTTP source must be in this format.

### Optional settings

#### Enable TLS

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][2] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
   - Enter the identifier for your HTTP Client key pass. If you leave it blank, the [default](#set-secrets) is used.
         - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
   - `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509) format.
   - `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509) format.
   - `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

#### Scrape settings

- Enter the interval between scrapes.
   - Your HTTP Server must be able to handle GET requests at this interval.
   - Since requests run concurrently, if a scrape takes longer than the interval given, a new scrape is started, which can consume extra resources. Set the timeout to a value lower than the scrape interval to prevent this from happening.
- Enter the timeout for each scrape request.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- HTTP Client endpoint URL identifier:
	- References the endpoint from which the Observability Pipelines Worker collects log events.
	- The default identifier is `SOURCE_HTTP_CLIENT_ENDPOINT_URL`.
- HTTP Client TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_HTTP_CLIENT_KEY_PASS`.
- If you are using basic authentication:
	- HTTP Client username identifier:
		- The default identifier is `SOURCE_HTTP_CLIENT_USERNAME`.
	- HTTP Client password identifier:
		- The default identifier is `SOURCE_HTTP_CLIENT_PASSWORD`.
- If you are using bearer authentication:
	- HTTP Client bearer token identifier:
		- The default identifier is `SOURCE_HTTP_CLIENT_BEARER_TOKEN`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/