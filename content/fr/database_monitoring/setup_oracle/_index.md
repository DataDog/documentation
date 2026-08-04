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
{{< card-grid card_width="160px" >}}
  {{< image-card href="/database_monitoring/setup_oracle/selfhosted" src="integrations_logos/oracle.png" alt="Selfhosted" title="Self-hosted" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rds" src="integrations_logos/amazon_rds.png" alt="RDS" title="RDS" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rac" src="integrations_logos/oracle.png" alt="RAC" title="RAC" >}}
  {{< image-card href="/database_monitoring/setup_oracle/exadata" src="integrations_logos/oracle.png" alt="Exadata" title="Exadata" >}}
  {{< image-card href="/database_monitoring/setup_oracle/autonomous_database" src="integrations_logos/oracle.png" alt="Selfhosted" title="Autonomous Database" >}}
{{< /card-grid >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /fr/database_monitoring/architecture/
[15]: /fr/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /fr/agent/versions/upgrade_to_agent_v7/?tab=linux