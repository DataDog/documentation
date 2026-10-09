---
aliases:
- /es/database_monitoring/guide/clickhouse/
description: Configuración de Database Monitoring en una base de datos ClickHouse
disable_sidebar: true
further_reading:
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: Documentación
  text: Actualización de la integración de ClickHouse desde versiones de Agent anteriores
    a la 7.84
- link: https://www.datadoghq.com/blog/database-monitoring-for-clickhouse/
  tag: Blog
  text: Haga un seguimiento del rendimiento de las consultas de ClickHouse con Datadog
    Database Monitoring
title: Configuración de ClickHouse
---
<div class="alert alert-info">
Esta función está en versión preliminar y requiere Datadog Agent v7.78 o posterior. Los clientes que participen en la versión preliminar de Datadog Database Monitoring para ClickHouse <strong>no recibirán cargos</strong> por el uso incurrido durante el período de la versión preliminar. No se requiere habilitación adicional; siga las instrucciones de configuración a continuación para comenzar.
</div>

### Versiones de ClickHouse compatibles {#clickhouse-versions-supported}

|                              | Autohospedado | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |

### Instrucciones de configuración por tipo de alojamiento {#setup-instructions-by-hosting-type}

Para aprender a configurar Database Monitoring en una base de datos ClickHouse, seleccione su tipo de alojamiento:

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}