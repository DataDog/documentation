---
app_id: syncthing
app_uuid: a61c3428-6898-45be-8a20-89f4c039a56d
assets:
  dashboards:
    Syncthing Overview: assets/dashboards/syncthing_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: syncthing.connections.count
      metadata_path: metadata.csv
      prefix: syncthing.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10276
    source_type_name: Syncthing
  monitors:
    Device is not connected: assets/monitors/syncthing_device_not_connected.json
    Files out of sync: assets/monitors/syncthing_out_of_sync.json
    Folder errors: assets/monitors/syncthing_folder_error.json
    No active connections: assets/monitors/syncthing_disconnected.json
    Service is failed: assets/monitors/syncthing_service_error.json
    System errors: assets/monitors/syncthing_system_error.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: Alexander@Bushnev.pro
  support_email: Alexander@Bushnev.pro
categories:
- colaboración
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md
display_on_public_website: true
draft: false
git_integration_title: syncthing
integration_id: syncthing
integration_title: Syncthing
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: syncthing
public_title: Syncthing
short_description: Seguimiento de las estadísticas generales de tu instancia de Syncthing
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Categoría::Colaboración
  - Categoría::Seguridad
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de las estadísticas generales de tu instancia de Syncthing
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Syncthing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Syncthing sincroniza archivos entre dos o más ordenadores en tiempo real. Esta integración te permite monitorizar [Syncthing][1] utilizando Datadog.

## Configuración

El check de Syncthing no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Syncthing en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `syncthing.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5], para empezar a recopilar tus [métricas](#metrics) de Syncthing. Para conocer todas las opciones de configuración disponibles, consulta el [syncthing.d/conf.yaml de ejemplo][6].

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `syncthing` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "syncthing" >}}


### Eventos

Syncthing no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "syncthing" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/