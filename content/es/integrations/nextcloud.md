---
app_id: nextcloud
app_uuid: a48ccc77-3e72-4e3b-b439-3ebe7e2688b7
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: nextcloud.server.database.size
      metadata_path: metadata.csv
      prefix: nextcloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10214
    source_type_name: Nextcloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: emeric.planet@gmail.com
  support_email: emeric.planet@gmail.com
categories:
- colaboración
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md
display_on_public_website: true
draft: false
git_integration_title: nextcloud
integration_id: nextcloud
integration_title: Nextcloud
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: nextcloud
public_title: Nextcloud
short_description: Seguimiento de las estadísticas generales de tu instancia de Nextcloud
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Collaboration
  - Offering::Integration
  configuration: README.md#Setup
  description: Seguimiento de las estadísticas generales de tu instancia de Nextcloud
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nextcloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza a [Nextcloud][1].

## Configuración

El check de Nextcloud no está incluido en el paquete de [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+ / v6.21+, sigue las instrucciones a continuación para instalar el check de Nextcloud en tu host. Consulta [Usar integraciones de la comunidad][3] para realizar la instalación con el Agent de Docker o versiones anteriores de Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `nextcloud.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][5] para empezar a recopilar tus [métricas](#metrics) de Nextcloud. Consulta el [nextcloud.d/conf.yaml de ejemplo][6] para conocer todas las opciones disponibles de configuración.

2. [Reiniciar el Agent][7]

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `nextcloud` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "nextcloud" >}}


### Eventos

Nextcloud no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "nextcloud" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://nextcloud.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/