---
categories:
- azure
- nube
- suministro
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Functions.
doc_link: https://docs.datadoghq.com/integrations/azure_functions/
draft: false
git_integration_title: azure_functions
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_functions
public_title: Integración de Datadog y Microsoft Azure Functions
short_description: Rastrea las métricas principales de Azure Functions.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Functions es una plataforma de computación sin servidor basada en eventos que también puede resolver problemas complejos de orquestación. Crea y depura localmente sin configuración adicional, despliega y opera a escala en la nube e integra servicios mediante activadores y enlaces.

Obtén métricas de Azure Functions para:

- Visualizar el rendimiento y la utilización de tu función
- Correlacionar el rendimiento de tu Azure Functions con el resto de tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_functions" >}}


### Eventos

La integración Azure Functions no incluye ningún evento.

### Checks de servicio

La integración Azure Functions no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_functions/azure_functions_metadata.csv
[3]: https://docs.datadoghq.com/es/help/