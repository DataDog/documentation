---
app_id: gitea
app_uuid: f4cd02de-cfb8-4de9-a809-7a772ba738ca
assets:
  dashboards:
    Gitea Overview Dashboard: assets/dashboards/gitea_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gitea.process.start_time
      metadata_path: metadata.csv
      prefix: gitea.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10283
    source_type_name: Gitea
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: florent.clarret@gmail.com
  support_email: florent.clarret@gmail.com
categories:
- colaboración
- control de fuentes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gitea/README.md
display_on_public_website: true
draft: false
git_integration_title: gitea
integration_id: gitea
integration_title: Gitea
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: gitea
public_title: Gitea
short_description: Rastrea todas tus métricas de Gitea con Datadog
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Source Control
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea todas tus métricas de Gitea con Datadog
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gitea
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[Gitea][1] es una solución ligera de alojamiento de código administrada por la comunidad escrita en Go.

Esta integración monitoriza las instancias de Gitea a través del Datadog [Agent][2].

## Configuración

### Requisito previo

Gitea no expone sus métricas internas en forma predeterminada. Necesitas activar el servidor HTTP incorporado que expone las métricas del endpoint en tu archivo de configuración `app.ini`.

```ini
[metrics]
ENABLED = true
```

Para obtener más información, consulta la [documentación][1] oficial.

### Instalación

La integración de Gitea no está incluida en forma predeterminada en el paquete del [Datadog Agent ][3], es necesario instalarla.

Para el Agent v7.36+, sigue las siguientes instrucciones para instalar el check de Gitea en tu host. Consulta [Utilizar integraciones comunitarias][4] para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Configura tu integración similar a las [integraciones][5] basadas en el Agent.

### Configuración

1. Edita el archivo `gitea.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de la configuración del Agent para empezar a recopilar tus datos de Gitea. Consulta el [ejemplo de gitea.d/conf.yaml][6] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `gitea` en la sección checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gitea" >}}


### Eventos

El check de Gitea no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "gitea" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

[1]: https://docs.gitea.io/en-us/
[2]: https://docs.datadoghq.com/es/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/es/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gitea/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gitea/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/