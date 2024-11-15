---
aliases:
- /es/integrations/azure_datafactory
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Data Factory.
doc_link: https://docs.datadoghq.com/integrations/azure_data_factory/
draft: false
git_integration_title: azure_data_factory
has_logo: true
integration_id: azure-datafactory
integration_title: Microsoft Azure Data Factory
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_factory
public_title: Integración de Datadog y Microsoft Azure Data Factory
short_description: Rastrea las métricas clave de Azure Data Factory.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Data Factory es un servicio de integración de datos en la nube que permite componer los servicios de almacenamiento, movimiento y procesamiento de datos en pipelines de datos automatizados.

Utiliza la integración de Azure con Datadog para recopilar métricas de Data Factory.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_data_factory" >}}


### Eventos

La integración Azure Data Factory no incluye eventos.

### Checks de servicios

La integración Azure Data Factory no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/es/help/