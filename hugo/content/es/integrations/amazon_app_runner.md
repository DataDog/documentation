---
app_id: amazon-app-runner
app_uuid: ff109e6f-e212-4655-bebf-c8ee54d4f7b2
assets:
  dashboards:
    aws_app_runner: assets/dashboards/aws_app_runner.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.apprunner.active_instances
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.apprunner.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 322
    source_type_name: Amazon App Runner
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- AWS
- nube
- Configuración y despliegue
- recopilación de logs
- suministro
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS App Runner.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_app_runner/
draft: false
git_integration_title: amazon_app_runner
has_logo: true
integration_id: amazon-app-runner
integration_title: AWS App Runner
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_app_runner
public_title: AWS App Runner
short_description: Despliegues rápidos, sencillos y rentables a partir de código fuente
  o imágenes de contenedor.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Category::Log Collection
  - Categoría::Suministro
  - Offering::Integration
  configuration: README.md#Setup
  description: Despliegues rápidos, sencillos y rentables a partir de código fuente
    o imágenes de contenedor.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS App Runner
version: '1.0'
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS App Runner te permite desplegar una aplicación desde el código fuente o una imagen de contenedor a AWS.

Activa esta integración para ver todas tus métricas de App Runner en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `AppRunner` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de AWS App Runner y Datadog][4].

### Recopilación de logs
Hay dos tipos de logs que puedes integrar con Datadog desde tus aplicaciones gestionadas por AWS App Runner. Estos logs se envían a CloudWatch bajo dos grupos diferentes de logs. El primero es el grupo de logs de servicio que captura todos los logs de la actividad del ciclo de vida para tu servicio de App Runner como compilaciones y despliegues de aplicaciones. El segundo es el grupo de logs de aplicación que contiene la salida de logs del código de tu aplicación en ejecución.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función Lambda, añade manualmente un activador en el grupo de logs de CloudWatch del servicio o aplicación de App Runner en la consola de AWS:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="grupo de logs de CloudWatch" popup="true" style="width:70%;">}}
   Selecciona el grupo de logs CloudWatch correspondiente, añade un nombre de filtro (puedes dejar el filtro vacío) y añade el desencadenador:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Activador de CloudWatch" popup="true" style="width:70%;">}}
3. Repite el paso 2 para añadir el grupo de logs adicional.
4. Cuando termines, abre la [sección Datadog Log][5] y empieza a explorar tus logs.

### Recopilación de eventos
AWS App Runner envía eventos tanto de servicio como de cambio de estado de la operación a EventBridge, que puedes reenviar a Datadog para su visualización en el [Flujo de eventos][6]. Para enviar estos eventos a Datadog, haz lo siguiente:

1. Crea un [destino de API EventBridge para eventos de Datadog][7].
2. Crea una regla de EventBridge para tratar con eventos de AWS App Runner (consulta [Manejo de eventos de App Runner en EventBridge][8]). Elige el destino de API como objetivo.
3. Empieza a ver los nuevos eventos de cambio de estado en el flujo de eventos de Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_app_runner" >}}


### Eventos

La integración de AWS App Runner admite tanto eventos de servicio como de cambio de estado de la operación desde EventBridge.

### Checks de servicio

La integración de AWS App Runner no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-app-runner
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/event/stream
[7]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog
[8]: https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_app_runner/assets/metrics/metric-spec.yaml
[10]: https://docs.datadoghq.com/es/help/