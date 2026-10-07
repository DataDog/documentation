---
app_id: scalr
app_uuid: d74ce5c8-4e5a-485a-be79-ff55f8205c9d
assets:
  dashboards:
    Scalr Overview Dashboard: assets/dashboards/scalr_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: scalr.runs.count
      metadata_path: metadata.csv
      prefix: scalr.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10312
    source_type_name: Scalr (versión comunitaria)
author:
  homepage: https://scalr.com
  name: Scalr
  sales_email: sales@scalr.com
  support_email: support@scalr.com
categories:
- automatización
- Configuración y despliegue
- orquestación
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/scalr/README.md
display_on_public_website: true
draft: false
git_integration_title: scalr
integration_id: scalr
integration_title: Scalr
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: scalr
public_title: Scalr
short_description: Scalr es un producto de automatización y colaboración de Terraform
  (TACO).
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Configuration & Deployment
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Scalr es un producto de automatización y colaboración de Terraform
    (TACO).
  media:
  - caption: Dashboard de Scalr.
    image_url: images/scalr_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Documentación
    url: https://docs.scalr.com
  - resource_type: Documentación
    url: https://docs.scalr.com/en/latest/integrations.html#datadog
  support: README.md#Support
  title: Scalr
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Scalr es una alternativa de Terraform en nube que te proporciona los controles, la visibilidad y la flexibilidad para descentralizar tus operaciones de Terraform en un solo lugar.

La [integración][1] de Scalr envía detalles de [eventos][2] de la ejecución de Terraform y métricas para realizar análisis en profundidad y generar informes, como las ejecuciones en cola, el estado de la cola, el número de entornos y el recuento de espacios de trabajo. Estas métricas se visualizan en el dashboard predefinido para ayudar a correlacionar despliegues con otros cambios de infraestructura y para rastrear tendencias en tu pipeline de Terraform.

## Configuración
La integración de Scalr no está incluida en el paquete del [Datadog Agent][3], por lo que es necesario instalarla.

### Instalación

Para las versiones del Datadog Agent v7.21 o v6.21 y posteriores, sigue estas instrucciones para instalar la integración de Scalr en tu host. Consulta [Utilizar integraciones comunitarias][4] para instalarla con el Docker Agent o versiones anteriores del Datadog Agent .

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-scalr==1.0.0
   ```

2. Configura tu integración similar a una [integración][5] basada en el Agent.

### Configuración

1. Edita el archivo `scalr.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][6] para empezar a recopilar tus [métricas de Scalr](#metrics). Consulta el [ejemplo de scalr.d/conf.yaml][7] para todas las opciones de configuración disponibles.

2. [Reinicia el Agent][8].

### Validación

Ejecuta el [subcomando del estado del Agent][9] y busca `scalr` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "scalr" >}}


### Eventos

Scalr envía los resultados de la ejecución como evento al [Explorador de eventos][12].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13] o con [soporte técnico de Scalr][14].

## Referencias adicionales

- [Documentación del cliente de Scalr][15]
- [Documentación de la integración de Scalr Datadog][16]


[1]: https://docs.scalr.com/en/latest/integrations.html
[2]: https://docs.datadoghq.com/es/events/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/es/getting_started/integrations/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/scalr/datadog_checks/scalr/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/scalr/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/scalr/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/events/explorer/
[13]: https://docs.datadoghq.com/es/help/
[14]: https://scalr-labs.atlassian.net/servicedesk/customer/portal/31
[15]: https://docs.scalr.com
[16]: https://docs.scalr.com/en/latest/integrations.html#datadog