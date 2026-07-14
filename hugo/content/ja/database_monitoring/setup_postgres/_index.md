---
description: Postgres データベースでのデータベースモニタリングの設定
disable_sidebar: true
title: Postgres の設定
---

### サポートされる Postgres バージョン

| バージョン      | セルフホスト | Amazon RDS | Amazon Aurora | Google Cloud SQL | Google AlloyDB | Azure     | Supabase  |
| ------------ | ----------- | ---------- | ------------- | ---------------- | -------------- | --------- | --------- |
| Postgres 9.6 | {{< X >}}   | {{< X >}}  | {{< X >}}     |                  |                | {{< X >}} |           |
| Postgres 10  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 11  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 12  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 13  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        |                | {{< X >}} |           |
| Postgres 14  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 15  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 16  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}} | {{< X >}} |
| Postgres 17  | {{< X >}}   | {{< X >}}  | {{< X >}}     | {{< X >}}        | {{< X >}}      |           | {{< X >}} |

### ホスティングタイプ別のセットアップ手順

Postgres データベースで Database Monitoring をセットアップする方法については、ホスティングタイプを選択してください。

{{< card-grid card_width="200px" >}}
  {{< image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="100">}}
  {{< image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" >}}
{{< /card-grid >}}

<br>