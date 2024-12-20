---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Queue Storage.
doc_link: https://docs.datadoghq.com/integrations/azure_queue_storage/
draft: false
git_integration_title: azure_queue_storage
has_logo: true
integration_id: azure-queue-storage
integration_title: Microsoft Azure Queue Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_queue_storage
public_title: Integración de Datadog y Microsoft Azure Queue Storage
short_description: Rastrea las métricas clave de Azure Queue Storage.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Queue Storage es un servicio para almacenar grandes cantidades de mensajes a los que se puede acceder desde cualquier parte del mundo con llamadas autenticadas mediante HTTP o HTTPS.

Obtén métricas de Azure Queue Storage para:

- Visualizar el rendimiento de tu Queue Storage.
- Correlacionar el rendimiento de tu Queue Storage con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_queue_storage" >}}


### Eventos

La integración Azure Queue Storage no incluye eventos.

### Checks de servicios

La integración Azure Queue Storage no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_queue_storage/azure_queue_storage_metadata.csv
[3]: https://docs.datadoghq.com/es/help/