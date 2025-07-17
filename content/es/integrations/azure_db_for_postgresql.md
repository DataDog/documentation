---
aliases:
- /es/integrations/azure_dbforpostgresql
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure DB for PostgreSQL.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_postgresql/
draft: false
git_integration_title: azure_db_for_postgresql
has_logo: true
integration_id: azure-db-for-postgresql
integration_title: Microsoft Azure DB for PostgreSQL
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_db_for_postgresql
public_title: Integración de Datadog y Microsoft Azure DB for PostgreSQL
short_description: Rastrea las métricas principales de Azure DB for PostgreSQL.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Database for PostgreSQL proporciona una base de datos como servicio PostgreSQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure DB for PostgreSQL para:

- Visualizar el rendimiento de tus bases de datos PostgreSQL
- Correlacionar el rendimiento de tus bases de datos PostgreSQL con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-db-for-postgresql" >}}


### Eventos

La integración Azure DB for PostgreSQL no incluye eventos.

### Checks de servicios

La integración Azure DB for PostgreSQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/es/help/