---
title: Federated Logs
description: Search logs stored in your own data platform from Log Explorer, without ingesting them into Datadog.
further_reading:
- link: "/logs/log_configuration/external_sources/"
  tag: "Documentation"
  text: "Connect an external source"
- link: "/logs/explorer/archive_search/"
  tag: "Documentation"
  text: "Search logs in your archives with Archive Search"
---

{{< callout url="https://www.datadoghq.com/product-preview/federated-search/" btn_hidden="false" header="Join the Preview!" >}}
Federated Logs is in Preview. Use this form to submit your request today.
{{< /callout >}}

## Overview

Federated Logs lets you search logs stored in your own data platform, such as Databricks, from [Log Explorer][1], without ingesting them into Datadog. Datadog translates your Log Explorer query into the query language of the source and runs it against your table. The data stays in your data platform.

Use Federated Logs to investigate logs that you keep in your data platform, such as logs retained for compliance or analytics.

With an external source, you can:

- Search and filter logs with the [Log Explorer search syntax][2].
- View results in the list view and in a timeline histogram grouped by status.
- Open a log in the side panel and share a link to it.
- Add or remove columns, and export results to CSV.

## Prerequisites

- Access to the Federated Logs Preview. To request access, complete the [Preview form][3].
- At least one external source. See [External Sources][4].
- The Logs Federated Query Read (`logs_federated_query_read`) permission, which lets you search external sources in Log Explorer. For more information, see [Role Based Access Control][5].

## Search federated logs

1. Go to [Log Explorer][1].
2. Click the data source dropdown next to the search bar, which is set to {{< ui >}}Indexes{{< /ui >}} by default.
3. Under {{< ui >}}External Sources{{< /ui >}}, select your source type, and then select an external source.
4. Select a time range and enter a query, such as `service:web status:error`.

## Search syntax

Federated Logs uses the [Log Explorer search syntax][2]. Each term in your query searches a column of your table:

| Query | Searches |
|---|---|
| `service:web` | The column mapped to the Datadog field. Applies to `host`, `service`, `source`, `status`, `message`, and `_id`. See [Schema mapping][6]. |
| `@http_status_code:500` | The top-level column with that name. The column does not need to be mapped. |
| `env:prod` | The `env:prod` value in the column mapped to Tags. |

To search a column of your table, prefix its name with `@`. Without `@`, a `key:value` term searches the column mapped to Tags, as tags do in Log Explorer. If no column is mapped to Tags, the query returns an error.

## Limitations

- Full-text search, CIDR queries, and filters on nested JSON or STRUCT fields are not supported.
- Wildcards and ranges on tags are not supported.
- Columns that are not mapped to a Datadog field are not displayed as attributes in the side panel.
- Analytics views, such as grouping and timeseries, are not available.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /logs/explorer/search_syntax/
[3]: https://www.datadoghq.com/product-preview/federated-search/
[4]: /logs/log_configuration/external_sources/
[5]: /account_management/rbac/
[6]: /logs/log_configuration/external_sources/#schema-mapping
