---
aliases:
- /es/integrations/azure_data_lake_store
app_id: azure-datalakestore
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastrea las métricas clave de Azure Data Lake Store.
media: []
title: Azure Data Lake Store
---
## Información general

Azure Data Lake Store es un lago de datos sin límites que potencia el análisis de big data.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Lake Store.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.datalakestore_accounts.data_read** <br>(gauge) | Cantidad total de datos leídos de la cuenta.<br>_Se muestra como byte_ |
| **azure.datalakestore_accounts.data_written** <br>(gauge) | Cantidad total de datos escritos en la cuenta.<br>_Se muestra como byte_ |
| **azure.datalakestore_accounts.read_requests** <br>(count) | Recuento de solicitudes de lectura de datos en la cuenta.<br>_Se muestra como solicitud_ |
| **azure.datalakestore_accounts.total_storage** <br>(gauge) | Cantidad total de datos almacenados en la cuenta.<br>_Se muestra como byte_ |
| **azure.datalakestore_accounts.write_requests** <br>(count) | Recuento de solicitudes de escritura de datos en la cuenta.<br>_Se muestra como solicitud_ |
| **azure.datalakestore_accounts.count** <br>(count) | Recuento de Datalake Store|

**Nota**: Esta integración solo recopila métricas para Data Lake Storage Gen 1. Data Lake Storage Gen 2 se basa en Azure Blob Storage, por lo que sus métricas se pueden encontrar en Datadog en el espacio de nombres Blob Storage: `azure.storage_storageaccounts_blobservices.*`. Para obtener más información, consulta la documentación de [Azure Data Lake Storage Gen 2](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction).

### Eventos

La integración Azure Data Lake Store no incluye eventos.

### Checks de servicio

La integración Azure Data Lake Store no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).