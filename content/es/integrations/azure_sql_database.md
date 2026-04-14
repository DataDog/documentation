---
categories:
- cloud
- data stores
- caching
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure SQL Database.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_database/
draft: false
git_integration_title: azure_sql_database
has_logo: true
integration_id: azure-sql-database
integration_title: Microsoft Azure SQL Database
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_sql_database
public_title: Integración de Datadog y Microsoft Azure SQL Database
short_description: Rastrea las métricas principales de Azure SQL Database.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure SQL Database te brinda un almacén de datos sólido con la flexibilidad de escalar para satisfacer la demanda.

Obtén métricas de Azure SQL Database para:

- Visualizar el rendimiento de tu SQL Database.
- Correlacionar el rendimiento de tu SQL Database con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-sql-database" >}}


### Eventos

La integración Azure SQL Database no incluye eventos.

### Checks de servicios

La integración Azure SQL Database no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_database/azure_sql_database_metadata.csv
[3]: https://docs.datadoghq.com/es/help/