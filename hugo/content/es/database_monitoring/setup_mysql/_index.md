---
description: Configuración de Database Monitoring en una base de datos MySQL
disable_sidebar: true
title: Configuración de MySQL
---
### Versiones de MySQL compatibles {#mysql-versions-supported}

|  | Autohospedado | Amazon RDS | Amazon Aurora | Google Cloud SQL con >16GB RAM | Azure | Nota |
|--|------------|---------|------------|------------------|---------|------|
| MySQL 5.6     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 9       | {{< X >}} |  |  |  |  | Requiere Datadog Agent 7.84+. |
| MariaDB 10.5  | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.6  | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.11 | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 11.4  | {{< X >}} |  |  |  |  |  |
| MariaDB 12    | {{< X >}} |  |  |  |  | Requiere Datadog Agent 7.84+. |
| MariaDB 13    | {{< X >}} |  |  |  |  | Requiere Datadog Agent 7.84+. |

**Nota**: Si utiliza MariaDB, consulte [Configuración de MariaDB][1] en su lugar.

Para obtener instrucciones de configuración, seleccione su tipo de alojamiento:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}

[1]: /es/database_monitoring/setup_mariadb/