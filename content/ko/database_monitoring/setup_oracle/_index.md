---
description: Oracle 데이터베이스에서 Database Monitoring 설정
disable_sidebar: true
title: Oracle 설정
---

## 지원되는 Oracle 버전

|            | 자체 호스팅 | RDS       | RAC       | Exadata   | 자율형 데이터베이스 | 자동 스토리지 관리 |
|------------|-------------|-----------|-----------|-----------|---------------------|------------------------------|
| Oracle 11g | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 12c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 18c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 19c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 21c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |

## 지원되는 아키텍처
- 멀티테넌트(CDB/PDB)
- Non-CDB

## 설정
설정 지침을 보려면 호스팅 유형을 선택하세요.
{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /ko/database_monitoring/architecture/
[15]: /ko/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /ko/agent/versions/upgrade_to_agent_v7/?tab=linux