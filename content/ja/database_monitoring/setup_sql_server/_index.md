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

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>

[1]: /database_monitoring/setup_sql_server/troubleshooting/#known-limitations
