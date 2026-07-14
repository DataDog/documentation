---
app_id: ns1
app_uuid: 8bc08030-a931-42a0-b9c0-9ca87f3e0e12
assets:
  dashboards:
    NS1: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ns1.qps
      metadata_path: metadata.csv
      prefix: ns1.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10182
    source_type_name: NS1
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: NS1
  sales_email: zjohnson@ns1.com
  support_email: zjohnson@ns1.com
categories:
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md
display_on_public_website: true
draft: false
git_integration_title: ns1
integration_id: ns1
integration_title: ns1
integration_version: 0.0.6
is_public: true
manifest_version: 2.0.0
name: ns1
public_title: ns1
short_description: Integración de Datadog para la recopilación de métricas de NS1
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Categoría::Red
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración de Datadog para la recopilación de métricas de NS1
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://help.ns1.com/hc/en-us/articles/4402752547219
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/ns1-monitoring-datadog/
  support: README.md#Soporte
  title: ns1
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración monitoriza servicios [NS1][1] a través del Datadog Agent

¡[Snap][2]

## Configuración

El check de NS1 no está incluido en el paquete del [Datadog Agent][3], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de NS1 en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][4].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-ns1==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][5] de base.

### Configuración

1. Edita el archivo `ns1.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar tus métricas de NS1. Para conocer todas las opciones de configuración disponibles, consulta el [ns1.d/conf.yaml de ejemplo][6].

2. [Reinicia el Agent][7].

### Validación

Ejecuta el [subcomando de estado del Agent][5] y busca `ns1` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ns1" >}}


### Eventos

La integración NS1 no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "ns1" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Guía de inicio rápido Integración NS1 + Datadog (Saliente)][11]
- [Monitorización de NS1 con Datadog][12]


[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[4]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://docs.datadoghq.com/es/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/ns1/datadog_checks/ns1/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/ns1/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ns1/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://help.ns1.com/hc/en-us/articles/4402752547219
[12]: https://www.datadoghq.com/blog/ns1-monitoring-datadog/