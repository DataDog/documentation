---
description: Configuración de Database Monitoring en una base de datos SQL Server
disable_sidebar: true
title: Configuración de SQL Server
---

### Versiones de SQL Server compatibles

|                 | Autoalojadas | Azure     | Amazon RDS | Google Cloud SQL | Nota |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012 llegó al final de su vida útil el 12 de julio de 2022. Database Monitoring sigue siendo compatible con SQL Server 2012 con [limitaciones conocidas][1]. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

Para obtener instrucciones de configuración, selecciona tu tipo de alojamiento:

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>

[1]: /es/database_monitoring/setup_sql_server/troubleshooting/#known-limitations