---
title: External Sources
description: Connect tables from your own data platform to search them with Federated Logs.
further_reading:
- link: "/logs/explorer/federated_logs/"
  tag: "Documentation"
  text: "Search external sources with Federated Logs"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" btn_hidden="false" header="Join the Preview!" >}}
Federated Logs is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

An external source is a table in your own data platform that contains logs. After you connect it, you can search it from Log Explorer with [Federated Logs][1], without ingesting the logs into Datadog.

## Supported sources

{{< whatsnext desc="Set up your source:" >}}
   {{< nextlink href="logs/log_configuration/external_sources/databricks" >}}Databricks{{< /nextlink >}}
{{< /whatsnext >}}

## Permissions

To connect, edit, and delete sources, you need the Logs Federated Query Write (`logs_federated_query_write`) permission. Each source also requires permissions in your data platform. See the setup page for your source.

## Schema mapping

Each log is a row in the table. When you connect a source, you map each Datadog field to a column of your table:

| Datadog field | Required |
|---|---|
| Timestamp | Yes |
| Unique identifier (`_id`) | Yes |
| Status | Yes |
| Message, Host, Service, Source | No |
| Tags | No |

Only columns with a compatible type are listed for each field. For the supported column types, see the setup page for your source.

## Connect a source

1. Go to [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}External Sources{{< /ui >}}][2] and click {{< ui >}}Connect Source{{< /ui >}}.
2. On the {{< ui >}}Source{{< /ui >}} tab, select the source type and the table that contains your logs. The fields depend on the source. Click {{< ui >}}Next{{< /ui >}}.
3. On the {{< ui >}}Schema Mapping{{< /ui >}} tab, select the column that each Datadog field is read from. See [Schema mapping](#schema-mapping).
4. Click {{< ui >}}Save{{< /ui >}}.

You can connect multiple tables, each with its own schema mapping. After you save a source, you can only edit its schema mapping. To change the table, delete the source and connect it again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/federated_logs/
[2]: https://app.datadoghq.com/logs/external-sources
