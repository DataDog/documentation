---
app_id: azure-iot-hub
app_uuid: 7556df01-8bfe-4cc4-89fe-b49d4bf3e713
assets:
  dashboards:
    azure_iot_hub: assets/dashboards/azure_iot_hub.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.devices_iothubs.devices.total_devices
      metadata_path: metadata.csv
      prefix: azure.devices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 183
    source_type_name: Azure IOT Hub
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- nube
- iot
- suministro
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_iot_hub
integration_id: azure-iot-hub
integration_title: Azure IOT Hub
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_iot_hub
public_title: Azure IOT Hub
short_description: Un servicio gestionado que garantiza una comunicación bidireccional
  fiable y segura entre millones de dispositivos IoT.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::IoT
  - Categoría::Suministro
  - Offering::Integration
  configuration: README.md#Setup
  description: Un servicio gestionado que garantiza una comunicación bidireccional
    fiable y segura entre millones de dispositivos IoT.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure IOT Hub
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure IOT Hub es un servicio totalmente gestionado que permite comunicaciones bidireccionales confiables y seguras entre millones de dispositivos IoT.

Obtén métricas de Azure IOT Hub para:

- Visualizar el rendimiento de tus IOT Hubs
- Correlacionar el rendimiento de tus IOT Hubs con tus aplicaciones

Azure Provisioning Service es un servicio auxiliar para IoT Hub que habilita el aprovisionamiento sin intervención humana y justo a tiempo en el centro de IoT correcto, lo que permite a los clientes aprovisionar millones de dispositivos de forma segura y escalable.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_iot_hub" >}}


### Eventos

La integración Azure IoT Hub no incluye eventos.

### Checks de servicio

La integración Azure IoT Hub no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/es/help/