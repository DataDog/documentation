---
aliases:
- /es/integrations/azure_dbformysql
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure DB for MySQL.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mysql/
draft: false
git_integration_title: azure_db_for_mysql
has_logo: true
integration_id: azure-db-for-mysql
integration_title: Microsoft Azure DB for MySQL
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_db_for_mysql
public_title: Integración de Datadog y Microsoft Azure DB for MySQL
short_description: Rastrea las métricas principales de Azure DB for MySQL.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Database for MySQL proporciona una base de datos como servicio MySQL comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MySQL para:

- Visualizar el rendimiento de tus bases de datos MySQL.
- Correlacionar el rendimiento de tus bases de datos MySQL con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_db_for_mysql" >}}


### Eventos

La integración Azure Database for MySQL no incluye eventos.

### Checks de servicios

La integración Azure Database for MySQL no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/es/help/