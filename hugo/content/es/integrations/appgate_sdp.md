---
app_id: appgate-sdp
app_uuid: 77acdb8a-4ea8-4294-baa7-d5ccfe698d9f
assets:
  dashboards:
    Appgate SDP Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: appgate_sdp.appliance.active_connections
      metadata_path: metadata.csv
      prefix: appgate_sdp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24819432
    source_type_name: Appgate SDP
  monitors:
    Active Connection Exceeds Limit: assets/monitors/monitor_Active_connection_exceeds_limit.json
    Appliance Function Suspension State: assets/monitors/monitor_Appliance_Function_Suspension_state.json
    Appliance Function Unhealthy: assets/monitors/monitor_Appliance_Function_Unhealthy.json
    Appliance Status Warning: assets/monitors/monitor_Appliance_status_warning_for_appliance.json
    Certificate Expiration Soon: assets/monitors/monitor_Certificate_expiration_soon.json
    Controller Database Replication: assets/monitors/monitor_Controller_Database_Replication.json
    Database Replication Replay Lag: assets/monitors/monitor_Database_replication_replay_lag_on_controller.json
    Excessive Database Size: assets/monitors/monitor_Excessive_database_size_on_controller.json
    High CPU on Appliance: assets/monitors/monitor_High_CPU_on_appliance.json
    High Disk Utilization: assets/monitors/monitor_High_Disk_Utilization_on_appliance.json
    High Disk Utilization for Controller Database: assets/monitors/monitor_High_disk_utilization_for_controller_database_partition.json
    High Event Queue on Gateway: assets/monitors/monitor_High_event_queue_on_gateway.json
    High Gateway Session Count: assets/monitors/monitor_Hight_Gateway_session_count.json
    High IP Pool Utilization: assets/monitors/monitor_High_IP_pool_utilization_on_appliance.json
    High Memory on Appliance: assets/monitors/monitor_High_memory_on_appliance.json
    High Sessiond Heap Utilization: assets/monitors/monitor_High_sessiond_heap_utilization_on_appliance.json
    High Token Size Utilization: assets/monitors/monitor_High_token_size_utilization_on_gateway.json
    High User License Utilization: assets/monitors/monitor_High_user_license_utilization_on_controller.json
    SSH Access Attempted: assets/monitors/monitor_SSH_Access_attempted.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/appgate_sdp/README.md
display_on_public_website: true
draft: false
git_integration_title: appgate_sdp
integration_id: appgate-sdp
integration_title: Appgate SDP
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: appgate_sdp
public_title: Appgate SDP
short_description: Monitoriza el estado y el rendimiento de Appgate SDP.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Offering::Integration
  - Category::Metrics
  - Category::Log Collection
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de Appgate SDP.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Appgate SDP
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Appgate SDP][1] a través del Datadog Agent.

- Monitoriza el estado y el rendimiento de dispositivos, controladores y puertas de enlace Appgate SDP mediante la recopilación de métricas clave.
- Proporciona visibilidad de uso de recursos, conexiones activas, recuentos de sesiones y uso de licencias para ayudar a garantizar una gestión del acceso segura y eficaz.
- Permite la alerta proactiva y la resolución de problemas mediante el seguimiento de indicadores críticos como el uso de CPU, memoria, y disco, y los eventos del sistema en entornos distribuidos.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Appgate SDP está incluido en el paquete del [Datadog Agent][3]. No se necesita ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `appgate_sdp.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Appgate SDP. Para conocer todas las opciones de configuración disponibles, consulta el [appgate_sdp.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `appgate_sdp` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "appgate_sdp" >}}


### Eventos

La integración Appgate SDP no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "appgate_sdp" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].


[1]: https://sdphelp.appgate.com/adminguide/v6.3/introduction.html
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/appgate_sdp/datadog_checks/appgate_sdp/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/appgate_sdp/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/appgate_sdp/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/