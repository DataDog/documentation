---
description: Postgres 데이터베이스에 데이터베이스 모니터링 설정
disable_sidebar: true
kind: 설명서
title: Postgres 설정
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

### 지원되는 Postgres 버전


|  | 자체 호스팅 | AWS RDS | AWS Aurora | Google Cloud SQL | Azure |
|--|------------|---------|------------|------------------|---------|
| Postgres 9.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 10 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 11 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 12 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 13 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 14 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |


설정 지침을 보려면 호스팅 유형을 선택하세요.

{{< partial name="dbm/dbm-setup-postgres" >}}