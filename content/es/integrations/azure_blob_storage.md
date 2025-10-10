---
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Blob Storage.
doc_link: https://docs.datadoghq.com/integrations/azure_blob_storage/
draft: false
git_integration_title: azure_blob_storage
has_logo: true
integration_id: azure-blob-storage
integration_title: Microsoft Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_blob_storage
public_title: Integración de Datadog y Microsoft Azure Blob Storage
short_description: Rastrea las métricas clave de Azure Blob Storage.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Blob Storage es la solución de almacenamiento de objetos de Microsoft para la nube. Blob Storage está optimizado para almacenar cantidades masivas de datos no estructurados. Obtén métricas de Azure Blob Storage para:

- Visualizar el rendimiento de tu Blob Storage.
- Correlacionar el rendimiento de tu Blob Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-blob-storage" >}}


### Eventos

La integración Azure Blob Storage no incluye eventos.

### Checks de servicios

La integración Azure Blob Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/