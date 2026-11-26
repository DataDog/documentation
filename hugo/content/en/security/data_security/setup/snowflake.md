---
title: Set Up Data Security for Snowflake
description: Scan Snowflake tables for sensitive data with Data Security, using your Data Observability Snowflake integration.
disable_toc: false
further_reading:
  - link: "/data_observability/quality_monitoring/data_warehouses/snowflake/"
    tag: "Documentation"
    text: "Set up the Snowflake integration for Data Observability"
  - link: "/security/data_security/findings/"
    tag: "Documentation"
    text: "Investigate Data Security findings"
---

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security scans Snowflake tables through the Snowflake integration you set up for Data Observability. A Datadog-hosted scanner reads a sample of rows from each table. It holds the rows in memory only during the scan and stores only the match metadata. Every table is scanned at least once every 7 days.

## Prerequisites

- The [Snowflake integration for Data Observability][1] is set up for the Snowflake account.
- Your Datadog role has the Integrations Manage permission to turn on scanning.
- The Snowflake role you created for Datadog has read access to the databases you want to scan. To grant it, follow the read-only access step of the [Snowflake integration setup instructions][1], which grants `SELECT` on the tables of each database you list.

## Costs

Data Security scans run as `SELECT` queries against your tables and are billed as normal warehouse usage. They run on the warehouse you set up for Data Observability (`DATADOG_WH` by default).

## Enable scanning

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}Snowflake{{< /ui >}} tab. The list shows the Snowflake accounts connected to Data Observability.
1. In the row of the account to scan, turn on the {{< ui >}}Scanning{{< /ui >}} toggle and confirm.

Findings appear in the [Data Security explorer][3] within a few minutes after you turn on scanning.

Scanning applies to the whole account. To scan an additional database, grant the `DATADOG_ROLE` role read access to it.

## Verify the setup

On the {{< ui >}}Snowflake{{< /ui >}} tab, click the account to open its side panel, then check the setup issues:

| Setup issue | Cause | Fix |
|---|---|---|
| Databases found with zero tables | The `DATADOG_ROLE` role can't list the tables in these databases. | Grant the `DATADOG_ROLE` role read access to the databases, as described in the [Snowflake integration setup][1]. |
| No Snowflake base tables found | The database contains no base tables, or the `DATADOG_ROLE` role can't list them. Data Security scans base tables only. Views, external tables, event tables, and materialized views appear in the catalog but are not scanned. | If the database contains base tables, check the permissions of the `DATADOG_ROLE` role. |

## View findings in Data Observability

Snowflake findings also appear in the Data Observability catalog. On a database, schema, or table, the {{< ui >}}Sensitive Data{{< /ui >}} row shows the number of findings, {{< ui >}}No findings{{< /ui >}}, or {{< ui >}}Unscanned{{< /ui >}}. Click {{< ui >}}View Explorer{{< /ui >}} to open the finding in Data Security. The column list marks the columns that hold sensitive data.

## Disable scanning

1. Go to the [Data Security configuration page][2] and click the {{< ui >}}Snowflake{{< /ui >}} tab.
1. In the row of the account, turn off the {{< ui >}}Scanning{{< /ui >}} toggle and confirm.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/data-security/snowflake
[3]: https://app.datadoghq.com/sensitive-data-scanner/data-security
