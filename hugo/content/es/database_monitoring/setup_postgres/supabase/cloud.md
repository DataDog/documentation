---
aliases:
- /es/database_monitoring/setup_postgres/supabase/
description: Instale y configure Database Monitoring para Supabase con la integración
  de Supabase Cloud.
further_reading:
- link: /integrations/supabase-cloud/
  tag: Documentación
  text: Integración de Supabase Cloud
- link: /integrations/postgres/
  tag: Documentación
  text: Integración básica de Postgres
- link: /database_monitoring/setup_postgres/supabase/agent
  tag: Documentación
  text: Configuración de Supabase autohospedado (instalación del Agent)
title: Configuración de Database Monitoring para Supabase Cloud
---
Database Monitoring para Supabase Cloud proporciona visibilidad de sus [bases de datos de Supabase][3] al exponer métricas de rendimiento de consultas y muestras de consultas, sin necesidad de un Datadog Agent autohospedado.

<div class="alert alert-info">Para implementaciones de Supabase autohospedadas que requieren un Datadog Agent, consulte <a href="/database_monitoring/setup_postgres/supabase/agent">Configuración de Supabase autohospedado</a>.</div>

## Requisitos previos {#prerequisites}

- Un proyecto de Supabase con una base de datos Postgres.
- Su {{< ui >}}Project ID{{< /ui >}} de Supabase (que se encuentra en la configuración de su proyecto de Supabase).
- Su {{< ui >}}API key{{< /ui >}} de Supabase (que se encuentra en la configuración de su proyecto de Supabase en {{< ui >}}API{{< /ui >}}).
- Un [{{< ui >}}Personal Access Token{{< /ui >}}][4] de Supabase con acceso a la Management API.

## Configuración {#setup}

{{< img src="database_monitoring/supabase_cloud_integration_tile.png" alt="Configuración del mosaico de integración de Supabase Cloud" style="width:80%;" >}}

1. Vaya al [mosaico de integración de Supabase][1] en Datadog.
1. Haga clic en {{< ui >}}Add Account{{< /ui >}}.
1. Ingrese su {{< ui >}}Project ID{{< /ui >}} y {{< ui >}}API Key{{< /ui >}} de Supabase.
1. Seleccione {{< ui >}}Enable Database Monitoring for query performance optimizations{{< /ui >}}.
1. Ingrese su {{< ui >}}Personal Access Token{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Datadog se conecta a su proyecto de Supabase y comienza a recopilar telemetría de Database Monitoring. No se requiere instalar un Agent.

<div class="alert alert-info">Cada proyecto de Supabase debe configurarse por separado. Agregar nuevos proyectos a una cuenta de Supabase conectada no habilita automáticamente Database Monitoring.</div>

## Datos recopilados {#data-collected}

Después de habilitar Database Monitoring, Datadog recopila la siguiente telemetría de su base de datos Supabase Cloud:

### Métricas de rendimiento de las consultas {#query-performance-metrics}
Obtenidas de `pg_stat_statements`, recopiladas cada 5 segundos:
- Recuento de llamadas y filas procesadas
- Tiempo de ejecución total y promedio
- Estadísticas de aciertos, lecturas, búferes sucios y escrituras en búferes compartidos y locales
- Tiempo de lectura y escritura de E/S de bloque
- Recuentos de lectura y escritura de búfer temporal

### Muestras de consultas {#query-samples}
Obtenidas de `pg_stat_activity`, recopiladas cada 5 segundos:
- Instantáneas de consultas activas e inactivas
- Texto de consulta ofuscado y firmas de consulta
- Tipos de eventos de espera y nombres de eventos
- Estado de la sesión y tipo de backend
- PIDs bloqueantes
- Agregados de conexión agrupados por aplicación, estado, usuario y base de datos

### Metadatos de la instancia de base de datos {#database-instance-metadata}
Recopilados cada 5 minutos:
- Versión de PostgreSQL
- Identificador de instancia y nombre de host
- Modo de conexión (directo o mediante un agrupador de conexiones)

## Validar {#validate}

Después de la configuración, navegue a la página [Database Monitoring][2] en Datadog para ver las consultas y las métricas de rendimiento de su base de datos Supabase.

{{< img src="database_monitoring/supabase_cloud_product.png" alt="Descripción general de Database Monitoring para una instancia de Supabase Cloud" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/supabase-cloud
[2]: https://app.datadoghq.com/databases
[3]: https://supabase.com/docs/guides/database/overview
[4]: https://supabase.com/docs/guides/platform/personal-access-tokens