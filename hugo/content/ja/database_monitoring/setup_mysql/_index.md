---
description: MySQL データベースでのデータベースモニタリングの設定
disable_sidebar: true
title: MySQL の設定
---
### サポート対象の MySQL バージョン {#mysql-versions-supported}

|  | セルフホスト | Amazon RDS | Amazon Aurora | 16GBを超えるRAMを搭載したGoogle Cloud SQL | Azure | 注 |
|--|------------|---------|------------|------------------|---------|------|
| MySQL 5.6     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 9       | {{< X >}} |  |  |  |  | Datadog Agent 7.84以降が必要です。|
| MariaDB 10.5  | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.6 | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.11 | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 11.4 | {{< X >}} |  |  |  |  |  |
| MariaDB 12    | {{< X >}} |  |  |  |  | Datadog Agent 7.84以降が必要です。|
| MariaDB 13    | {{< X >}} |  |  |  |  | Datadog Agent 7.84以降が必要です。|

**注**: MariaDB を使用している場合は、代わりに [MariaDB のセットアップ][1]を参照してください。

ホスティングタイプを選択して設定の手順を確認します。

{{< card-grid card_width="170px" >}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="セルフホスト型" title="セルフホスト" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}

[1]: /ja/database_monitoring/setup_mariadb/