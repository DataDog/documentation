---
aliases:
- /es/integrations/azure_filestorage
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure File Storage.
doc_link: https://docs.datadoghq.com/integrations/azure_file_storage/
draft: false
git_integration_title: azure_file_storage
has_logo: true
integration_id: azure-filestorage
integration_title: Microsoft Azure File Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_file_storage
public_title: Integración de Datadog y Microsoft Azure File Storage
short_description: Rastrea las métricas clave de Azure File Storage.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure File Storage ofrece recursos compartidos de archivos totalmente gestionados en la nube a los que se puede acceder mediante el protocolo estándar de la industria: Server Message Block (SMB).

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure File Storage.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_file_storage" >}}


### Eventos

La integración Azure File Storage no incluye eventos.

### Checks de servicios

La integración Azure File Storage no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/