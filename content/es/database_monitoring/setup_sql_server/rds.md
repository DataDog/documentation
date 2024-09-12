---
description: Instala y configura Database Monitoring para SQL Server en Amazon RDS.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solución de problemas comunes
title: Configuración de Database Monitoring para SQL Server en Amazon RDS
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Microsoft SQL Server mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos:

1. [Configura la integración AWS](#configure-the-aws-integration).
1. [Concede acceso al Agent](#grant-the-agent-access).
1. [Instala el Agent](#install-the-agent).
1. [Instala la integración RDS](#install-the-rds-integration).

## Antes de empezar

Versiones de SQL Server compatibles
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Configurar la integración AWS

Habilita la **Recopilación estándar** en la sección **Recopilación de recursos** de tu [cuadro de integración de Amazon Web Services][2].

## Conceder acceso al Agent 

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Crea un inicio de sesión de sólo lectura para conectarte a tu servidor y concede los permisos necesarios:

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- To use Log Shipping Monitoring (available in Agent v7.50+), uncomment the next line:
-- GRANT SELECT to datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

Crea el usuario `datadog` en cada base de datos de aplicaciones adicional:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Esto es necesario porque RDS no permite conceder el permiso `CONNECT ANY DATABASE`. El Datadog Agent necesita conectarse a cada base de datos para recopilar estadísticas de E/S de archivos específicas de la base de datos.

### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

## Instalación del Agent

Dado que AWS no permite el acceso directo al host, el Datadog Agent debe instalarse en un host distinto donde pueda comunicarse con el host de SQL Server. Existen varias opciones para instalar y ejecutar el Agent.

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

## Instalar la integración RDS

Para recopilar métricas de base de datos y logs más completos de AWS, instala la [integración RDS][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services