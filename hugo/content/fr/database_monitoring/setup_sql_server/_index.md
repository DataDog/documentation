---
description: Configuration de Database Monitoring sur une base de données SQL Server
disable_sidebar: true
title: Configuration de SQL Server
---

### Versions de SQL Server prises en charge

|                 | Auto-hébergé | Azure     | Amazon RDS | Google Cloud SQL | Remarque |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012 a atteint sa fin de vie le 12 juillet 2022. Database Monitoring continue de prendre en charge SQL Server 2012 avec [des limitations connues][1]. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

Pour obtenir les instructions de configuration, sélectionnez votre type d'hébergement :

{{< card-grid card_width="220px" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}

<br>