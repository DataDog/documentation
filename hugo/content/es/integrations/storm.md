---
app_id: storm
app_uuid: a3c93ee5-077d-467d-87d7-a2325bdcf782
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: storm.bolt.last_60.acked
      metadata_path: metadata.csv
      prefix: storm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10207
    source_type_name: storm
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/storm/README.md
display_on_public_website: true
draft: false
git_integration_title: storm
integration_id: storm
integration_title: Storm
integration_version: 1.0.1
is_public: true
manifest_version: 2.0.0
name: storm
public_title: Storm
short_description: Estadísticas de ejecución de topologías de Apache Storm 1.x.x
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Métricas
  - Category::Gestión de eventos
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Estadísticas de ejecución de topologías de Apache Storm 1.x.x
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Storm
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servicio Storm en tiempo real para:

- Visualizar y monitorizar métricas de clúster y topología de Storm.
- Recibir notificaciones sobre conmutaciones por error y eventos de Storm.

## Configuración

El check de Storm no está incluido en el paquete del [Datadog Agent][1], por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Storm en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `storm.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4], para empezar a recopilar tus [métricas](#metrics) de Storm. Para conocer todas las opciones de configuración disponibles, consulta el [storm.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

## Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `storm` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "storm" >}}


### Eventos

El check de Storm no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "storm" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/storm/assets/service_checks.json
[10]: http://docs.datadoghq.com/help