---
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure DB for MariaDB.
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
draft: false
git_integration_title: azure_db_for_mariadb
has_logo: true
integration_id: azure-dbformariadb
integration_title: Microsoft Azure DB for MariaDB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_db_for_mariadb
public_title: Integración de Datadog y Microsoft Azure DB for MariaDB
short_description: Rastrea las métricas principales de Azure DB for MariaDB.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Database for MariaDB proporciona una base de datos como servicio MariaDB comunitaria, totalmente gestionada y preparada para empresas.

Obtén métricas de Azure Database for MariaDB para:

- Visualizar el rendimiento de tus bases de datos MariaDB
- Correlacionar el rendimiento de tus bases de datos MariaDB con tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-dbformariadb" }}


### Eventos

La integración Azure Database for MariaDB no incluye eventos.

### Checks de servicio

La integración Azure Database for MariaDB no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/es/help/