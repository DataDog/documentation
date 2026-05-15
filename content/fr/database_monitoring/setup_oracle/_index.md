---
description: Configurer Database Monitoring sur une base de données Oracle
disable_sidebar: true
title: Configurer Oracle
---

## Versions d'Oracle prises en charge

|            | Auto-hébergé | RDS       | RAC       | Exadata   | Base de données autonome | Gestion automatique du stockage |
|------------|-------------|-----------|-----------|-----------|---------------------|------------------------------|
| Oracle 11g | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 12c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 18c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 19c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 21c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |

## Architectures prises en charge
- Multi-tenant (CDB/PDB)
- Non-CDB

## Configuration
Pour obtenir des instructions de configuration, sélectionnez votre type d'hébergement :
{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /fr/database_monitoring/architecture/
[15]: /fr/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /fr/agent/versions/upgrade_to_agent_v7/?tab=linux