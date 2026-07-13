---
description: Postgres 데이터베이스에 데이터베이스 모니터링 설정
disable_sidebar: true
title: Postgres 설정
---

### 지원되는 Postgres 버전

| 버전      | 자체 호스팅 | Amazon RDS | Amazon Aurora | Google Cloud SQL | Google AlloyDB | Azure     | Supabase  |
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

### 호스팅 유형별 설정 지침

Postgres 데이터베이스에서 데이터베이스 모니터링 설정 방법을 알아보려면 호스팅 유형을 선택하세요.

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