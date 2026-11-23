---
title: Set Up Data Security
description: Enable Data Security scanning on Snowflake, PostgreSQL, and Amazon S3 data stores.
disable_toc: false
further_reading:
  - link: "/security/data_security/"
    tag: "Documentation"
    text: "Data Security overview"
  - link: "/security/data_security/findings/"
    tag: "Documentation"
    text: "Investigate Data Security findings"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Data Security is not available for the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security scans data stores that another Datadog service already monitors. Before you enable scanning on a data store, set up the service it depends on:

| Data store | Required Datadog service | Setup guide |
|---|---|---|
| Snowflake | Data Observability, with the Snowflake integration | [Set up Data Security for Snowflake][1] |
| PostgreSQL | Database Monitoring, with Datadog Agent 7.86.0 or later | [Set up Data Security for PostgreSQL][2] |
| Amazon S3 | Agentless Scanning on AWS, with scanners in your AWS account or hosted by Datadog | [Set up Data Security for Amazon S3][3] |

## Prerequisites

- Your organization has access to the Data Security Preview. To request access, fill out the [Preview form][4].
- Your Datadog role has the [permissions][6] for what you need to do:

| Action | Permission |
|---|---|
| View findings and the configuration page | Data Scanner Read |
| Turn scanning on or off for a Snowflake account or a PostgreSQL host | Integrations Manage |
| Add or edit an AWS account | Data Scanner Write |

## Configuration page

Manage scanning on the [Data Security configuration page][5]. The page has one tab per data store: {{< ui >}}Snowflake{{< /ui >}}, {{< ui >}}Postgres{{< /ui >}}, and {{< ui >}}AWS{{< /ui >}}.

On the {{< ui >}}Snowflake{{< /ui >}} and {{< ui >}}Postgres{{< /ui >}} tabs, each row is a Snowflake account or a PostgreSQL host, with the following columns:

- {{< ui >}}Findings{{< /ui >}}: the number of findings in the account or host.
- {{< ui >}}Issues{{< /ui >}}: the number of setup issues that prevent a complete scan, such as missing permissions.
- {{< ui >}}Last scanned{{< /ui >}}: when Data Security last scanned the account or host.
- {{< ui >}}Scanning{{< /ui >}}: a toggle that enables or disables scanning for the account or host.

Click a row to open its side panel. The side panel lists the findings for each database and the setup issues to fix.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/data_security/setup/snowflake/
[2]: /security/data_security/setup/postgres/
[3]: /security/data_security/setup/amazon_s3/
[4]: https://www.datadoghq.com/product-preview/dspm/
[5]: https://app.datadoghq.com/sensitive-data-scanner/configuration/data-security
[6]: /account_management/rbac/permissions/
