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

Use the [Data Security explorer][1] to see where sensitive data is located across your Snowflake, PostgreSQL, and Amazon S3 data stores. Start at the account level, then navigate into databases, schemas, tables, and columns (or buckets and files) to see which rules matched.

## Find accounts with sensitive data

By default, the explorer sorts accounts by last scan date and shows only accounts where Data Security found sensitive data. Turn off the {{< ui >}}Sensitive Data Only{{< /ui >}} toggle to view all scanned accounts, including those with no sensitive data.

### Filter findings

Use the search bar or facets to filter findings. The search bar autocompletes facet names and values. Available facets include:

- Sensitive data category and matched rule
- Resource type: Snowflake, PostgreSQL, or Amazon S3
- Account name

To filter directly from the list, click a tag or category on a row and choose to include or exclude that value.

## Explore an account

Click an account to inspect its resources. The tree on the left displays the account's databases, schemas, and tables (or buckets and folders) and highlights resources that contain sensitive data. Click a folder to filter the list, or click a table or file to open its side panel.

## Review a resource

The side panel for a table or file displays:

- Matched rules and their descriptions
- Affected columns (for tables)
- Severity, based on the matched rule
- Impacted compliance frameworks
- Number of matches
- Number of rows scanned out of the total (for example, {{< ui >}}Scanned rows: 100 out of 50,000{{< /ui >}})
- When the finding was first detected

Group findings by column or by rule, and turn on {{< ui >}}All scanned columns{{< /ui >}} to include columns without matches. For Snowflake tables, click {{< ui >}}View in Data Observability{{< /ui >}} to open the table in the Data Observability catalog.

<div class="alert alert-info">Data Security records where a match occurs, not the matched values.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/data-security
