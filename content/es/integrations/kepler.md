---
app_id: kepler
app_uuid: 0cae7d1b-d0e9-48f1-b8c7-ea73f40370d7
assets:
  dashboards:
    'Kepler Overview ': assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kepler.container.usage.joules.count
      metadata_path: metadata.csv
      prefix: kepler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 16318151
    source_type_name: Kepler
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: sarah.witt@datadoghq.com
  support_email: sarah.witt@datadoghq.com
categories:
- kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kepler/README.md
display_on_public_website: true
draft: false
git_integration_title: kepler
integration_id: kepler
integration_title: Kepler
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: kepler
public_title: Kepler
short_description: Ver cálculos del consumo de energía de las cargas de trabajo de
  Kubernetes desde Kepler
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Kubernetes
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Ver cálculos del consumo de energía de las cargas de trabajo de Kubernetes
    desde Kepler
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kepler
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check transfiere los cálculos del consumo de energía de las cargas de trabajo de Kubernetes desde [Kepler][1] a Datadog.

## Configuración

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Kepler en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecute el siguiente comando para instalar la integración:

   ```shell
   datadog-agent integration install -t datadog-kepler==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración


1. Edita el archivo `kepler.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Kepler. Para conocer todas las opciones de configuración disponibles, consulta el [kepler.d/conf.yaml de ejemplo][3].

2. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `kepler` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kepler" >}}


### Eventos

Kepler no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].


[1]: https://sustainable-computing.io/
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=agentv721v621
[3]: https://github.com/DataDog/integrations-extras/blob/master/kepler/datadog_checks/kepler/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/kepler/assets/service_checks.json