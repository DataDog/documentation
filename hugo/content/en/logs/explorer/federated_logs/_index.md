---
title: Federated Logs
description: Search logs stored in your own data platform from Log Explorer, without ingesting them into Datadog.
further_reading:
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Explore logs in Datadog"
- link: "/logs/explorer/archive_search/"
  tag: "Documentation"
  text: "Search logs in your archives with Archive Search"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" btn_hidden="false" header="Join the Preview!" >}}
Federated Logs is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

Federated Logs lets you search logs stored in your own data platform from [Log Explorer][1], without ingesting them into Datadog. Datadog translates your Log Explorer query into the query language of the source and runs it against your table. The data stays in your data platform.

Use Federated Logs to investigate logs that you keep outside Datadog for cost, compliance, or analytics reasons.

With a federated source, you can:

- Search and filter logs on mapped fields with the [Log Explorer search syntax][2].
- View results in the list view and in a timeline histogram grouped by status.
- Open a log in the side panel and share a link to it.
- Add or remove columns, and export results to CSV.

## Supported sources

{{< whatsnext desc="Set up Federated Logs for your source:" >}}
   {{< nextlink href="logs/explorer/federated_logs/databricks" >}}Databricks{{< /nextlink >}}
{{< /whatsnext >}}

## Permissions

| Permission | Grants |
|---|---|
| Logs Federated Query Write (`logs_federated_query_write`) | Connect, edit, and delete sources on the {{< ui >}}External Sources{{< /ui >}} page. |
| Logs Federated Query Read (`logs_federated_query_read`) | Search federated sources in Log Explorer. |

Each source also requires permissions in your data platform. See the setup page for your source.

For more information, see [Role Based Access Control][3].

## Schema mapping

Each log is a row in a table. When you connect a source, you map each Datadog field to a column of your table:

| Datadog field | Required |
|---|---|
| Timestamp | Yes |
| Unique identifier (`_id`) | Yes |
| Status | Yes |
| Message, Host, Service, Source | No |
| Tags | No |

Only columns with a compatible type are listed for each field. For the supported column types, see the setup page for your source.

## Connect a source

1. Go to [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > {{< ui >}}External Sources{{< /ui >}}][4] and click {{< ui >}}Connect Source{{< /ui >}}.
2. On the {{< ui >}}Source{{< /ui >}} tab, select the source type and the table that contains your logs. The fields depend on the source. Click {{< ui >}}Next{{< /ui >}}.
3. On the {{< ui >}}Schema Mapping{{< /ui >}} tab, select the column that each Datadog field is read from. See [Schema mapping](#schema-mapping).
4. Click {{< ui >}}Save{{< /ui >}}.

You can connect multiple tables, each with its own schema mapping. After you save a source, you can only edit its schema mapping. To change the table, delete the source and connect it again.

## Search federated logs

1. Go to [Log Explorer][1].
2. Click the data source dropdown on the left of the search bar, which is set to {{< ui >}}Indexes{{< /ui >}} by default.
3. Under {{< ui >}}External Sources{{< /ui >}}, select your source type, and then select a connected source.
4. Select a time range and enter a query, such as `service:web status:error`.

Datadog replaces the mapped field names in your query with the corresponding column names.

## Limitations

- Search and filters apply to mapped fields only. Full-text search and filters on nested JSON fields are not supported.
- Columns that are not mapped to a Datadog field are not displayed as attributes in the side panel.
- Analytics views, such as grouping and timeseries, are not available.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search_syntax/
[3]: /account_management/rbac/
[4]: https://app.datadoghq.com/logs/external-sources
