---
description: SQL Server 데이터베이스에 데이터베이스 모니터링 설정
disable_sidebar: true
title: SQL Server 설정
---

### 지원되는 SQL Server 버전

|                 | 자체 호스팅 | Azure     | Amazon RDS | Google Cloud SQL | 참고 |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012는 2022년 7월 12일에 수명이 종료되었습니다. 데이터베이스 모니터링은 [알려진 제한 사항][1]이 있는 SQL Server 2012를 계속 지원합니다. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

설정 지침을 보려면 호스팅 유형을 선택하세요.

{{< card-grid card_width="220px" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}

<br>