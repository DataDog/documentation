---
description: Setting up Database Monitoring on an Oracle database
disable_sidebar: true
title: Setting up Oracle
---

## Supported Oracle versions

|            | Self-Hosted | RDS       | RAC       | エクサデータ   | 自律型データベース | Automatic Storage Management |
|------------|-------------|-----------|-----------|-----------|---------------------|------------------------------|
| Oracle 11g | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 12c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 18c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 19c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 21c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |

## Supported architectures
- Multi-tenant (CDB/PDB)
- Non-CDB

## セットアップ
For setup instructions, select your hosting type:
{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /ja/database_monitoring/architecture/
[15]: /ja/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /ja/agent/versions/upgrade_to_agent_v7/?tab=linux