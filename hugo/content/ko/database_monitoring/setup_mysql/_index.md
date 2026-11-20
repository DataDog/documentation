---
description: MySQL 데이터베이스에서 데이터베이스 모니터링 설정
disable_sidebar: true
title: MySQL 설정
---
### 지원되는 MySQL 버전 {#mysql-versions-supported}

|  | 자체 호스팅 | Amazon RDS | Amazon Aurora | 16 GB 이상의 RAM을 사용하는 Google Cloud SQL | Azure | 참고 |
|--|------------|---------|------------|------------------|---------|------|
| MySQL 5.6     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| MySQL 5.7     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 8.0     | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| MySQL 9       | {{< X >}} |  |  |  |  | Datadog Agent 7.84 이상이 필요합니다. |
| MariaDB 10.5  | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.6  | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 10.11 | {{< X >}} | {{< X >}} |  |  |  |  |
| MariaDB 11.4  | {{< X >}} |  |  |  |  |  |
| MariaDB 12    | {{< X >}} |  |  |  |  | Datadog Agent 7.84 이상이 필요합니다. |
| MariaDB 13    | {{< X >}} |  |  |  |  | Datadog Agent 7.84 이상이 필요합니다. |

**참고**: MariaDB를 사용하는 경우 대신 [MariaDB 설정][1]을 참조하십시오.

설정 지침을 보려면 호스팅 유형을 선택하세요.

{{< card-grid card_width="170px" >}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="자체 호스팅" title="자체 호스팅" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}

[1]: /ko/database_monitoring/setup_mariadb/