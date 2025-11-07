---
categories:
- azure
- cloud
- iot
- provisioning
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure IOT Hub.
doc_link: https://docs.datadoghq.com/integrations/azure_iot_hub/
draft: false
git_integration_title: azure_iot_hub
has_logo: true
integration_id: azure-iot-hub
integration_title: Microsoft Azure IOT Hub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_iot_hub
public_title: Integración de Datadog y Microsoft Azure IOT Hub
short_description: Rastrea las métricas principales de Azure IOT Hub.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure IOT Hub es un servicio totalmente gestionado que permite comunicaciones bidireccionales confiables y seguras entre millones de dispositivos IoT.

Obtén métricas de Azure IOT Hub para:

- Visualizar el rendimiento de tus IOT Hubs
- Correlacionar el rendimiento de tus IOT Hubs con tus aplicaciones

Azure Provisioning Service es un servicio auxiliar para IoT Hub que habilita el aprovisionamiento sin intervención humana y justo a tiempo en el centro de IoT correcto, lo que permite a los clientes aprovisionar millones de dispositivos de forma segura y escalable.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-iot-hub" >}}


### Eventos

La integración Azure IoT Hub no incluye eventos.

### Checks de servicios

La integración Azure IoT Hub no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/es/help/