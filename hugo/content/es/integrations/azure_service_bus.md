---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Service Bus.
doc_link: https://docs.datadoghq.com/integrations/azure_service_bus/
draft: false
git_integration_title: azure_service_bus
has_logo: true
integration_id: azure-service-bus
integration_title: Microsoft Azure Service Bus
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_service_bus
public_title: Integración de Datadog y Microsoft Azure Service Bus
short_description: Rastrea las métricas principales de Azure Service Bus.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Microsoft Azure Service Bus es un agente de mensajes de integración empresarial totalmente gestionado.

Obtén métricas de Azure Service Bus para:

- Visualizar el rendimiento de tus Service Buses.
- Correlacionar el rendimiento de tus Service Buses con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-service-bus" >}}


### Eventos

La integración Azure Service Bus no incluye ningún evento.

### Checks de servicio

La integración Azure Service Bus no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_service_bus/azure_service_bus_metadata.csv
[3]: https://docs.datadoghq.com/es/help/