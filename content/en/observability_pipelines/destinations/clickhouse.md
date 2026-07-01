---
title: ClickHouse Destination
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
further_reading:
- link: "/observability_pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines"
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' ClickHouse destination to send logs to a [ClickHouse][1] server over the HTTP interface. The destination supports JSON insert formats for mapping events to columns by name or storing raw payloads, and Apache Arrow IPC streaming for higher-throughput inserts.

## Prerequisites

Before you configure the ClickHouse destination, you must have:

- A running ClickHouse server reachable from the Observability Pipelines Worker over the [HTTP interface][2].
- A database and target table where events are inserted. The destination does not create the database or table for you.
- (Optional) Credentials for a ClickHouse user that has `INSERT` permission on the target table. The destination authenticates with HTTP Basic auth.
- (Optional) TLS material if your ClickHouse server requires HTTPS with client certificates.

## Setup

Configure the ClickHouse destination when you [set up a pipeline][3]. You can set up a pipeline in the [UI][4], using the [API][5], or with [Terraform][6]. The steps in this section are configured in the UI.

<div class="alert alert-danger">Only enter the identifiers for the ClickHouse endpoint URL and, if applicable, the username, password, and TLS key pass. Do <b>not</b> enter the actual values.</div>

After you select the ClickHouse destination in the pipeline UI:

1. Enter the identifier for your ClickHouse HTTP endpoint URL. If you leave it blank, the [default](#secret-defaults) is used.
1. In the **Table** field, enter the name of the ClickHouse table to insert events into. This field is required.
1. (Optional) In the **Database** field, enter the name of the ClickHouse database that contains the table. If you leave it blank, the ClickHouse user's default database is used.
1. In the **Format** dropdown menu, select the insert format for events:
    - `json_each_row` (default): Inserts each event as a JSON object on its own line. Event fields are mapped to columns of the same name. This maps to ClickHouse's [`JSONEachRow`][7] format.
    - `json_as_object`: Inserts each event into a single `JSON`-typed column. This maps to ClickHouse's [`JSONAsObject`][8] format.
    - `json_as_string`: Inserts each event into a single `String`-typed column, storing the raw JSON. This maps to ClickHouse's [`JSONAsString`][9] format.
    - `arrow_stream`: Batches events using the Apache Arrow IPC streaming format. When you select this format, you must also configure [Batch encoding](#batch-encoding).

### Optional settings

#### Skip unknown fields

Toggle the **Skip unknown fields** switch to drop event fields that are not present in the target table schema instead of returning an insert error. When this setting is left unset, the ClickHouse server's [`input_format_skip_unknown_fields`][10] setting applies.

#### Date time best effort

Toggle the **Date time best effort** switch to enable flexible `DateTime` parsing on the ClickHouse server. When enabled, the server accepts a wider range of date and time string formats. See ClickHouse's [`date_time_input_format`][11] setting for more information.

#### Compression

In the **Compression** dropdown menu, select the algorithm used to compress outbound HTTP requests:
- `gzip` (default): Compresses requests with gzip.
- `none`: Sends requests uncompressed.

When you select `gzip`, you can optionally set the **Compression level** to an integer from `1` (fastest) to `9` (best compression). If left unset, the algorithm's default level is used.

#### Enable basic authentication

Toggle the **Enable Basic Auth** switch to authenticate to ClickHouse with HTTP Basic auth.

1. Enter the identifier for your ClickHouse username. If you leave it blank, the [default](#secret-defaults) is used.
1. Enter the identifier for your ClickHouse password. If you leave it blank, the [default](#secret-defaults) is used.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

#### Batch encoding

Batch encoding is required when **Format** is set to `arrow_stream`. It is not used with the JSON formats.

1. In the **Codec** dropdown menu, select `arrow_stream`.
1. (Optional) Toggle **Allow nullable fields** to allow `null` values for non-nullable columns in the target table. When this setting is off (default), missing values for non-nullable columns cause encoding errors.

**Note**: When you use `arrow_stream`, your ClickHouse server must be reachable at the time the pipeline starts because the target table's schema is read from the server to build the Arrow encoder.

#### Batching

Use the **Batching** settings to control how events are grouped into HTTP inserts:

1. (Optional) In the **Max events** field, enter the maximum number of events per batch. Must be `1` or greater.
1. (Optional) In the **Timeout (secs)** field, enter the maximum time, in seconds, before a partial batch is flushed. Must be between `1` and `65535`. If left unset, the default is 1 second.

See [Event batching](#event-batching) for more information.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- ClickHouse HTTP endpoint URL identifier:
    - References the HTTP interface endpoint of your ClickHouse server.
    - The default identifier is `DESTINATION_CLICKHOUSE_ENDPOINT_URL`.
- ClickHouse username identifier (when basic auth is enabled):
    - The default identifier is `DESTINATION_CLICKHOUSE_USERNAME`.
- ClickHouse password identifier (when basic auth is enabled):
    - The default identifier is `DESTINATION_CLICKHOUSE_PASSWORD`.
- ClickHouse TLS passphrase identifier (when TLS is enabled with an encrypted private key):
    - The default identifier is `DESTINATION_CLICKHOUSE_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/clickhouse %}}

{{% /tab %}}
{{< /tabs >}}

## How the destination works

### Event batching

A batch of events is flushed when one of the configured parameters is met. See [event batching][12] for more information.

| Maximum Events | Timeout (seconds) |
|----------------|-------------------|
| Configurable   | Configurable      |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://clickhouse.com/docs
[2]: https://clickhouse.com/docs/interfaces/http
[3]: /observability_pipelines/configuration/set_up_pipelines/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[7]: https://clickhouse.com/docs/interfaces/formats/JSONEachRow
[8]: https://clickhouse.com/docs/interfaces/formats/JSONAsObject
[9]: https://clickhouse.com/docs/interfaces/formats/JSONAsString
[10]: https://clickhouse.com/docs/operations/settings/formats#input_format_skip_unknown_fields
[11]: https://clickhouse.com/docs/operations/settings/formats#date_time_input_format
[12]: /observability_pipelines/destinations/#event-batching
