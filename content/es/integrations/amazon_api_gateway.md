---
aliases:
- /es/integrations/awsapigateway/
app_id: amazon-api-gateway
app_uuid: 431bfc66-cc6e-40c5-b7f0-dbb2990322c8
assets:
  dashboards:
    Amazon API Gateway: assets/dashboards/aws_api_gateway_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - aws.apigateway.latency
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.apigateway
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 166
    source_type_name: Amazon Api Gateway
  monitors:
    4XX Error Rate is High: assets/monitors/rec_mon_4xx_errors.json
    5XX Error Rate is high: assets/monitors/rec_mon_5xx_errors.json
    Latency is high: assets/monitors/rec_mon_high_latency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- métricas
- nube
custom_kind: integración
dependencies: []
description: Rastrea errores de pasarela, aciertos y fallos de caché y latencia de
  las solicitudes.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_api_gateway/
draft: false
git_integration_title: amazon_api_gateway
has_logo: true
integration_id: amazon-api-gateway
integration_title: Amazon Api Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_api_gateway
public_title: Integración de Amazon Api Gateway
short_description: Amazon API Gateway es un servicio gestionado para API.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Category::Metrics
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon API Gateway es un servicio gestionado para API.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Integración de Amazon Api Gateway
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon API Gateway es un servicio totalmente gestionado que facilita a los desarrolladores la creación, la publicación, el mantenimiento, la monitorización y la protección de API a cualquier escala.

Habilita esta integración para ver todas tus métricas de API Gateway en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura [la integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página Integración de AWS][2], asegúrate de que `API Gateway` está activada en la pestaña `Metric Collection`.

2. Añade los siguientes permisos a tu [política de IAM de Datadog][3] para que se apliquen etiquetas personalizadas a las etapas de API Gateway:

    - `apigateway:GET`
    - `tag:GetResources`

3. Instala la [integración Datadog - Amazon API Gateway][4].


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

**Nota**: Si has activado las métricas CloudWatch detalladas, debes activarlas para todos los recursos y las rutas que componen una Stage. De lo contrario, los valores agregados en Datadog no serán correctos.

### Recopilación de logs

Para activar el registro de API Gateway:

1. Abre API Gateway en tu consola AWS.
2. Selecciona la API que quieras y ve a la sección Stages (Etapas).
3. En la pestaña **Logs** (Registros), activa **Enable CloudWatch Logs** (Activar logs CloudWatch) y **Enable Access Logging** (Activar registro de acceso).
4. Selecciona el nivel `INFO` para garantizar que abarcas todas las solicitudes.
5. Asegúrate de que el nombre del **grupo CloudWatch** comienza con `api-gateway`.
6. Selecciona el formato JSON (CLF y CSV también son compatibles) y añade lo siguiente en la casilla **Log format** (Formato del log):

    ```text
    {
        "apiId": "$context.apiId",
        "stage": "$context.stage",
        "requestId":"$context.requestId",
        "ip":"$context.identity.sourceIp",
        "caller":"$context.identity.caller",
        "user":"$context.identity.user",
        "requestTime":$context.requestTimeEpoch,
        "httpMethod":"$context.httpMethod",
        "resourcePath":"$context.resourcePath",
        "status":$context.status,
        "protocol":"$context.protocol",
        "responseLength":$context.responseLength
    }
    ```

#### Enviar logs a Datadog

1. Si aún no lo ha hecho, configura la [función AWS Lambda de recopilación de logs de Datadog][5].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de log de CloudWatch que contiene tus logs de API Gateway en la consola de AWS.
   Selecciona el grupo de logs CloudWatch correspondiente, ponle un nombre al filtro (y deja el filtro vacío si quieres) y añade el desencadenador.

Una vez completado, navega hasta la [página Logs][6] para empezar a explorar tus logs.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_api_gateway" >}}



### Eventos

La integración de Amazon API Gateway no incluye ningún evento.

### Checks de servicios

La integración de Amazon API Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/integrations/amazon-api-gateway
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_api_gateway/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/