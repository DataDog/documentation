---
description: Instalar y configurar Database Monitoring para SQL Server autoalojado
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración básica de SQL Server
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solucionar problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar la supervisión de bloqueos
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configurar la recopilación de finalización de consultas y errores de consultas
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Capturando valores de parámetros de consultas SQL
- link: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
  tag: Blog
  text: Estrategice su migración a Azure para cargas de trabajo de SQL con Datadog
- link: https://www.datadoghq.com/blog/datadog-monitoring-always-on/
  tag: Blog
  text: Monitorea tus grupos de disponibilidad AlwaysOn con Datadog Database Monitoring
title: Configurando Database Monitoring para SQL Server autoalojado
---
Database Monitoring proporciona una visibilidad profunda de tus bases de datos de Microsoft SQL Server al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

Realice los siguientes pasos para habilitar Database Monitoring con su base de datos:

1. [Conceder acceso al Agent](#grant-the-agent-access)
1. [Instalar el Agent](#install-the-agent)

## Antes de comenzar {#before-you-begin}

Versiones de SQL Server compatibles
: 2012, 2014, 2016, 2017, 2019, 2022, 2025 (requiere Agent 7.79+)

{{% dbm-sqlserver-before-you-begin %}}

## Conceder acceso al Agent {#grant-the-agent-access}

El Agent de Datadog requiere acceso de solo lectura al servidor de bases de datos para poder recopilar estadísticas y consultas.

Cree un inicio de sesión de solo lectura para conectarse a su servidor y otorgue los permisos requeridos:

{{< tabs >}}
{{% tab "SQL Server 2014+" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
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
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

Cree el `datadog`usuario en cada base de datos de aplicación adicional:

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

### Almacene su contraseña de manera segura {#securely-store-your-password}
{{% dbm-secret %}}

## Instala el Agent {#install-the-agent}

Se recomienda instalar el Agent directamente en el servidor de SQL Server, ya que esto permite al Agent recopilar una variedad de telemetría del sistema (CPU, memoria, disco, red) además de la telemetría específica de SQL Server.

{{< tabs >}}
{{% tab "Servidor Windows" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Servidor Linux" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{< /tabs >}}

## Ejemplos de configuraciones del Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}