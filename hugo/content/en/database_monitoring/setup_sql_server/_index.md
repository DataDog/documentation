---
title: Setting up SQL Server
description: Setting up Database Monitoring on a SQL Server database
disable_sidebar: true
---

### SQL Server versions supported

|                 | Self-hosted | Azure     | Amazon RDS | Google Cloud SQL | Note |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012 reached its end of life on July 12, 2022. Database Monitoring continues to support SQL Server 2012 with [known limitations][1]. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2025 | {{< X >}}   | {{< X >}} |            | {{< X >}}        | Requires Datadog Agent 7.79+. |

For setup instructions, select your hosting type:

{{< card-grid card_width="220px" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}

<br>

[1]: /database_monitoring/setup_sql_server/troubleshooting/#known-limitations
