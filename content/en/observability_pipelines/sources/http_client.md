---
title: HTTP Client Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' HTTP/S Client source to pull logs from the upstream HTTP/S server.

## Prerequisites

{{% observability_pipelines/prerequisites/http_client %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][3], using the [API][4], or with [Terraform][5]. The instructions in this section are for setting up the source in the UI.

To configure your HTTP/S Client source:

<div class="alert alert-danger">Only enter the identifiers for the HTTP Client endpoint URL and, if applicable, your authorization strategy secrets and TLS key pass. Do <b>not</b> enter the actual values.</div>

1. Enter the identifier for your HTTP Client endpoint URL. If you leave it blank, the [default](#set-secrets) is used.
1. Select your authorization strategy. If you selected:
   - **Basic**:
      - Enter the identifier for your HTTP Client username. If you leave it blank, the [default](#set-secrets) is used.
      - Enter the identifier for your HTTP Client password. If you leave it blank, the [default](#set-secrets) is used.
   - **Bearer**: Enter the identifier for your bearer token. If you leave it blank, the [default](#set-secrets) is used.
1. Select the decoder you want to use on the HTTP messages. Logs pulled from the HTTP source must be in this format.

### Optional settings

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

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
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline