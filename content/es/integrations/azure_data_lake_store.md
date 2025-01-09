---
aliases:
- /es/integrations/azure_datalakestore
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Data Lake Store.
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_store/
draft: false
git_integration_title: azure_data_lake_store
has_logo: true
integration_id: azure-datalakestore
integration_title: Microsoft Azure Data Lake Store
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_store
public_title: Integración de Datadog y Microsoft Azure Data Lake Store
short_description: Rastrea las métricas clave de Azure Data Lake Store.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Data Lake Store es un lago de datos sin límites que potencia el análisis de big data.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Lake Store.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_data_lake_store" >}}


**Nota**: Esta integración solo recopila métricas para Data Lake Storage Gen 1. Data Lake Storage Gen 2 está basado en Azure Blob Storage, por lo que sus métricas se pueden encontrar en Datadog en el espacio de nombres Blob Storage: `azure.storage_storageaccounts_blobservices.*`. Para obtener detalles adicionales, consulta la documentación de [Azure Data Lake Storage Gen 2][3].

### Eventos

La integración Azure Data Lake Store no incluye eventos.

### Checks de servicios

La integración Azure Data Lake Store no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/es/help/