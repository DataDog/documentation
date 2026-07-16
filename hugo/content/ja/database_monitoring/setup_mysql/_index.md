---
description: MySQL データベースでのデータベースモニタリングの設定
disable_sidebar: true
title: MySQL の設定
---

### サポートされる MySQL バージョン

|  | セルフホスト | Amazon RDS | Amazon Aurora | Google Cloud SQL (26GB 以下の RAM) | Azure |
|--|------------|---------|------------|------------------|---------|
| MySQL 5.6     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MariaDB 10.5  | {{< X >}} | {{< X >}} |  |  |  |
| MariaDB 10.6  | {{< X >}} | {{< X >}} |  |  |  |
| MariaDB 10.11 | {{< X >}} | {{< X >}} |  |  |  |
| MariaDB 11.1  | {{< X >}} |  |  |  |  |


ホスティングタイプを選択して設定の手順を確認します。

{{< card-grid card_width="170px" >}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}

<br>