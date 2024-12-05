---
description: Instalar y configurar Database Monitoring para SQL Server autoalojado
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solucionar problemas comunes
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

1. [Conceder acceso al Agent](#grant-the-agent-access)
1. [Instalar el Agent](#install-the-agent)

## Antes de empezar

Versiones de SQL Server compatibles
: 2012, 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Conceder acceso al Agent 

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Crea un inicio de sesión de sólo lectura para conectarte a tu servidor y concede los permisos necesarios:

{{< tabs >}}
{{% tab "SQL Server 2014 o posterior" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```
{{% /tab %}}
{{% tab "SQL Server 2012" %}}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next three lines:
-- USE msdb;
-- CREATE USER datadog FOR LOGIN datadog;
-- GRANT SELECT to datadog;
```

Crea el usuario `datadog` en cada base de datos de aplicaciones adicional:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```
{{% /tab %}}
{{< /tabs >}}

## Instalar el Agent

Se recomienda instalar el Agent directamente en el host de SQL Server, ya que esto permite al Agent recopilar una variedad de telemetrías del sistema (CPU, memoria, disco, red), además de la telemetría específica del SQL Server.

{{< tabs >}}
{{% tab "Host de Windows" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-windows %}}
{{% /tab %}}
{{% tab "Host de Linux" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-alwayson %}}
{{% dbm-sqlserver-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Ejemplo de configuraciones del Agent
{{% dbm-sqlserver-agent-config-examples %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}