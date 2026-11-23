---
title: Investigate Data Security Findings
description: Find which databases, tables, columns, and buckets hold sensitive data, and review the rules that matched.
disable_toc: false
further_reading:
  - link: "/security/data_security/"
    tag: "Documentation"
    text: "Data Security overview"
  - link: "/security/sensitive_data_scanner/scanning_rules/library_rules/"
    tag: "Documentation"
    text: "Sensitive Data Scanner library rules"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Data Security is not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

The [Data Security explorer][1] shows where sensitive data sits across your Snowflake, PostgreSQL, and Amazon S3 data stores. Start from the accounts that hold sensitive data, then go down to the database, schema, table, and column, or to the bucket and file, to see which rules matched.

## Find the accounts with sensitive data

By default, the explorer lists the accounts where Data Security found sensitive data. To include the accounts with no findings, turn on {{< ui >}}All scanned resources{{< /ui >}}.

Results are sorted by severity, then by status.

### Filter findings

Use the search bar or the facets to filter findings. The search bar autocompletes facet names and values. Facets include:

- Sensitive data category and matched rule
- Resource type: Snowflake, PostgreSQL, or Amazon S3
- Account name, environment, team, and region
- Database, schema, and table, for Snowflake and PostgreSQL
- Bucket and object path, for Amazon S3

To filter on a value from the list, click a tag or a category on a row, then choose to filter on the value or to exclude it.

## Explore an account

Click an account to open it. The tree on the left shows the databases, schemas, and tables of the account, or the buckets and folders. The tree highlights the resources that hold sensitive data. Click a folder to filter the list, or click a table to open its side panel.

The URL includes the selected account, resource type, and resource, so you can share a link to a specific table.

## Review a resource

The side panel of a table or file shows:

- The rules that matched, with their descriptions
- The column where each rule matched, for tables
- The severity, based on the matched rule
- The compliance frameworks that the match affects
- The number of matches
- The number of rows scanned out of the total, for example {{< ui >}}Scanned rows: 100 out of 50,000{{< /ui >}}
- When the finding was first detected

Group the findings by column or by rule. To include the columns with no match, turn on {{< ui >}}All scanned columns{{< /ui >}}.

Data Security records where a match is, not the matched value.

For Snowflake tables, click {{< ui >}}View in Data Observability{{< /ui >}} to open the table in the Data Observability catalog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/data-security
