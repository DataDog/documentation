---
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Table Storage.
doc_link: https://docs.datadoghq.com/integrations/azure_table_storage/
draft: false
git_integration_title: azure_table_storage
has_logo: true
integration_id: azure-table-storage
integration_title: Microsoft Azure Table Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_table_storage
public_title: Integración de Datadog y Microsoft Azure Table Storage
short_description: Rastrea las métricas clave de Azure Table Storage.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Table Storage es un almacén de clave-valor NoSQL para un desarrollo rápido mediante conjuntos de datos semiestructurados masivos.

Obtén métricas de Azure Table Storage para:

- Visualizar el rendimiento de tu Table Storage.
- Correlacionar el rendimiento de tu Table Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_table_storage" >}}


### Eventos

La integración Azure Table Storage no incluye eventos.

### Checks de servicios

La integración Azure Table Storage no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/