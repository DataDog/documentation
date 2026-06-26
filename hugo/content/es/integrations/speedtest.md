---
app_id: speedtest
app_uuid: 550862f8-f1d1-4924-b802-185b865e09a4
assets:
  dashboards:
    Speedtest: assets/dashboards/speedtest.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: speedtest.download.bandwidth
      metadata_path: metadata.csv
      prefix: speedtest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10119
    source_type_name: speedtest
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: cody.lee@datadoghq.com
  support_email: cody.lee@datadoghq.com
categories:
- herramientas de desarrollo
- red
- tests
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedtest/README.md
display_on_public_website: true
draft: false
git_integration_title: speedtest
integration_id: speedtest
integration_title: speedtest
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: speedtest
public_title: speedtest
short_description: Ejecuta resultados de Speedtest utilizando speedtest-cli
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas de desarrollo
  - Categoría::Red
  - Categoría::Tests
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Ejecuta resultados de Speedtest utilizando speedtest-cli
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: speedtest
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Speedtest][1] a través del Datadog Agent.

## Configuración

El check de Speedtest no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Speedtest en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-speedtest==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

**Nota**: Para todos los hosts, debes instalar la [CLI Speedtest][1] y aceptar el acuerdo como usuario de Datadog Agent antes de utilizarlo, por ejemplo: `sudo -u dd-agent speedtest`.

### Configuración

1. Edita el archivo `speedtest.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Speedtest. Para conocer todas las opciones de configuración disponibles, consulta el [speedtest.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `speedtest` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "speedtest" >}}


### Eventos

El check de Speedtest no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "speedtest" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.speedtest.net/apps/cli
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/datadog_checks/speedtest/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/speedtest/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/