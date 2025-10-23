---
description: Instalar y configurar Database Monitoring para SQL Server autoalojado
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solucionar problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar la Monitorización Deadlock
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configurar la finalización de consultas y la recopilación de errores de consulta
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: Blog
  text: Establecer estrategias de migración Azure para cargas de trabajo SQL con Datadog
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: Blog
  text: Monitorización de tus grupos de disponibilidad AlwaysOn con Datadog Database
    Monitoring
title: Configuración de Database Monitoring para SQL Server autoalojado
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Microsoft SQL Server mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos:

1. [Concede acceso al Agent](#grant-the-agent-access).
1. [Instala el Agent](#install-the-agent).

## Antes de empezar

Versiones de SQL Server compatibles
: 2012, 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Conceder acceso al Agent

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

{{< tabs >}}
{{% tab "SQL Server 2014 o posterior" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- Si no utilizas Log Shipping Monitoring (disponible en el Agent v7.50+) o
-- SQL Server Agent Monitoring (disponible en el Agent v7.57+), comenta las siguiente tres líneas:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- Si no utilizas Log Shipping Monitoring (disponible en el Agent v7.50+) o
-- SQL Server Agent Monitoring (disponible en el Agent v7.57+), comenta las siguientes tres líneas:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

Crea el usuario `datadog` en cada base de datos de aplicaciones adicional:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

## Instalar el Agent

Se recomienda instalar el Agent directamente en el host de SQL Server, ya que esto permite al Agent recopilar una variedad de telemetrías del sistema (CPU, memoria, disco, red), además de la telemetría específica del SQL Server.

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Linux Host" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Configuraciones del Agent de ejemplo
{{% dbm-sqlserver-agent-config-examples %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}