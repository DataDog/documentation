---
description: Configuración de Database Monitoring en una base de datos Oracle
disable_sidebar: true
title: Configuración de Oracle
---

## Versiones de Oracle compatibles

|            | Autoalojadas | RDS       | RAC       | Exadata   | Base de datos autónoma | Gestión automática del almacenamiento |
|------------|-------------|-----------|-----------|-----------|---------------------|------------------------------|
| Oracle 11g | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 12c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 18c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 19c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |
| Oracle 21c | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}}           | {{< X >}}                    |

## Arquitecturas compatibles
- Multiinquilino (CDB/PDB)
- No CDB

## Configuración
Para obtener instrucciones de configuración, selecciona tu tipo de alojamiento:
{{< partial name="dbm/dbm-setup-oracle" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/integrations/oracle
[3]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[10]: /es/database_monitoring/architecture/
[15]: /es/agent/versions/upgrade_between_agent_minor_versions/?tab=linux
[20]: /es/agent/versions/upgrade_to_agent_v7/?tab=linux