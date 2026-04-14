---
categories:
- azure
- cloud
- data stores
- provisioning
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure SQL Elastic Pool.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
draft: false
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_id: azure-sql-elastic-pool
integration_title: Microsoft Azure SQL Elastic Pool
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Integración de Datadog y Microsoft Azure SQL Elastic Pool
short_description: Rastrea las métricas principales de Azure SQL Elastic Pool.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Los pools elásticos proporcionan una solución simple y rentable para gestionar el rendimiento de múltiples bases de datos.

Obtén métricas de Azure SQL Elastic Pool para:

- Visualizar el rendimiento de tus SQL Elastic Pools.
- Correlacionar el rendimiento de tus SQL Elastic Pools con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-sql-elastic-pool" >}}


### Eventos

La integración Azure SQL Elastic Pools no incluye eventos.

### Checks de servicios

La integración Azure SQL Elastic Pools no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_elastic_pool/azure_sql_elastic_pool_metadata.csv
[3]: https://docs.datadoghq.com/es/help/