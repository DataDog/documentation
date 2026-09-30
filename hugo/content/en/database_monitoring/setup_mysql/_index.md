---
title: Setting up MySQL
description: Setting up Database Monitoring on a MySQL database
disable_sidebar: true
---

### MySQL versions supported

|  | Self-hosted | Amazon RDS | Amazon Aurora | Google Cloud SQL with >16GB RAM | Azure |
|--|------------|---------|------------|------------------|---------|
| MySQL 5.6     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

**Note**: If you use MariaDB, see [Setting Up MariaDB][1] instead.

For setup instructions, select your hosting type:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}

[1]: /database_monitoring/setup_mariadb/
