---
categories:
- azure
- nube
- network
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Data Explorer.
doc_link: https://docs.datadoghq.com/integrations/azure_data_explorer/
draft: false
git_integration_title: azure_data_explorer
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Data Explorer
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_explorer
public_title: Integración de Datadog y Microsoft Azure Data Explorer
short_description: Rastrea las métricas clave de Azure Data Explorer.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Data Explorer es un servicio de análisis altamente escalable y seguro que te permite realizar una exploración exhaustiva de datos estructurados y no estructurados para obtener información al instante. Optimizado para consultas ad hoc, Azure Data Explorer permite la exploración de datos sin procesar, estructurados y semiestructurados, lo que permite obtener información rápidamente. Utiliza Datadog para monitorizar el rendimiento y la utilización de Azure Data Explorer en contexto con el resto de tus aplicaciones e infraestructura.

Obtén métricas de Azure Data Explorer para:

* Rastrear el rendimiento de la ingesta, el procesamiento y la latencia de tus instancias de Data Explorer.
* Monitorizar la utilización de tus recursos de computación, memoria y red de Data Explorer.

## Configuración
### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure_data_explorer" >}}


### Eventos
La integración Azure Data Explorer no incluye eventos.

### Checks de servicio
La integración Azure Data Explorer no incluye checks de servicios.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_explorer/azure_data_explorer_metadata.csv
[3]: https://docs.datadoghq.com/es/help/