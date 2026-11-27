---
title: Data Security
description: Find sensitive data such as PII, financial data, and secrets at rest in Snowflake, PostgreSQL, and Amazon S3 with Datadog Data Security.
disable_toc: false
further_reading:
  - link: "/security/data_security/setup/"
    tag: "Documentation"
    text: "Set up Data Security"
  - link: "/security/data_security/findings/"
    tag: "Documentation"
    text: "Investigate Data Security findings"
  - link: "/security/sensitive_data_scanner/scanning_rules/library_rules/"
    tag: "Documentation"
    text: "Sensitive Data Scanner library rules"
---

{{< callout url="https://www.datadoghq.com/product-preview/dspm/" btn_hidden="false" header="Join the Preview!">}}
Data Security is in Preview. To request access, fill out the form.
{{< /callout >}}

## Overview

Data Security is Datadog's Data Security Posture Management (DSPM) product. It scans your data stores at rest, finds sensitive data such as personally identifiable information (PII), financial data, and secrets, and shows you which databases, tables, columns, and buckets hold it. Use it to keep track of sensitive data as it's copied between data stores, including personal data covered by regulations such as GDPR and CCPA.

Data Security builds on the Datadog services you already run. If you use Data Observability on Snowflake, Database Monitoring on PostgreSQL, or Agentless Scanning on AWS, the integrations Data Security needs are already in place.

## Supported data stores

| | Snowflake | PostgreSQL | Amazon S3 |
|---|---|---|---|
| **Required Datadog service** | [Data Observability][1] with the Snowflake integration | [Database Monitoring][2] on PostgreSQL | [Agentless Scanning][3] on AWS |
| **Where the scan runs** | Datadog-hosted scanner | Datadog Agent in your environment | Agentless scanner in your AWS account |
| **Scanned unit** | Table | Table | File |
| **Setup guide** | [Snowflake][4] | [PostgreSQL][5] | [Amazon S3][6] |

## How it works

Data Security scans a sample of each resource with the [Sensitive Data Scanner library rules][7]. Library rules cover categories such as PII, financial data, network information, and secrets.

When a rule matches, Data Security creates a finding. A finding links a rule to a resource: a table for Snowflake and PostgreSQL, or a file for Amazon S3. Each finding records the match location (such as the column), the number of matches, and the number of rows scanned. Data Security doesn't store the matched values.

### Data handling

The following diagram shows where each scan runs and what Datadog receives.

{{< img src="security/data_security/how_data_security_scans.png" alt="Diagram of the three scan paths. A Datadog-hosted scanner reads sampled Snowflake rows and scans them in memory. The Datadog Agent scans PostgreSQL rows and Agentless scanners scan Amazon S3 files in the customer environment. Only findings go to Data Security." style="width:100%;" >}}

| | Snowflake | PostgreSQL | Amazon S3 |
|---|---|---|---|
| **Scanned data leaves your environment** | Yes. A Datadog-hosted scanner reads sampled rows and holds them in memory only during the scan. Datadog stores only the match metadata. | No. The Agent scans the data in your environment and sends only the match metadata to Datadog. | No. The scanner reads files in your AWS account and sends only the match metadata to Datadog. |
| **Sample size** | A sample of rows per table | A sample of rows per table | Up to 1,000 files per bucket |
| **Scan frequency** | Every table at least once every 7 days | Continuously, a few tables at a time | Each bucket at most once every 7 days |

Because Data Security scans a sample, a resource with no finding is not guaranteed to be free of sensitive data.

## Preview limitations

During Preview, Data Security has the following limitations:

- Scanning uses the Sensitive Data Scanner library rules. Custom rules are not supported, and scanning groups and rules are read-only.
- Data Security detects sensitive data but doesn't remediate it. It doesn't modify access permissions, mask data, or redact values.
- Data Security keeps no scan history. When a later scan no longer finds sensitive data in a resource, its finding disappears.
- Snowflake scanning covers base tables only. Views, external tables, event tables, and materialized views are not scanned.
- Amazon S3 scanning supports CSV, JSON, Parquet, plain text, Microsoft Office (such as DOCX, XLSX, and PPTX), OpenDocument (such as ODT), and ZIP files. Images, binary files, and other formats are skipped.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/
[2]: /database_monitoring/setup_postgres/
[3]: /security/cloud_security_management/setup/agentless_scanning/enable/
[4]: /security/data_security/setup/snowflake/
[5]: /security/data_security/setup/postgres/
[6]: /security/data_security/setup/amazon_s3/
[7]: /security/sensitive_data_scanner/scanning_rules/library_rules/
