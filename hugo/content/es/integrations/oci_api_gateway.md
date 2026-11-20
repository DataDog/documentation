---
app_id: oci-api-gateway
app_uuid: 4e1f1f29-8d9b-4197-a1e7-ca7b868c35c1
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - oci.apigateway.backend_http_responses
      - oci.apigateway.bytes_received
      - oci.apigateway.bytes_sent
      - oci.apigateway.http_requests
      - oci.apigateway.http_responses
      - oci.apigateway.integration_latency
      - oci.apigateway.internal_latency
      - oci.apigateway.latency
      - oci.apigateway.response_cache_action
      - oci.apigateway.response_cache_availability
      - oci.apigateway.response_cache_latency
      - oci.apigateway.subscriber_quota_proportion_used
      - oci.apigateway.subscriber_rate_limit_proportion_used
      - oci.apigateway.subscriber_requests
      - oci.apigateway.usage_plan_requests
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42869397
    source_type_name: OCI API Gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- network
- nube
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oci_api_gateway
integration_id: oci-api-gateway
integration_title: OCI API Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oci_api_gateway
public_title: OCI API Gateway
short_description: OCI API Gateway puede publicar APIs con endpoints privados.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Category::Network
  - Categoría::Nube
  - Categoría::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI API Gateway puede publicar APIs con endpoints privados.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OCI API Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

OCI API Gateway es un servicio totalmente gestionado que te permite crear y desplegar APIs con endpoints privados o públicos, facilitando un acceso seguro y escalable a tus servicios de backend. Ofrece funciones como la transformación de solicitudes y respuestas, autenticación y autorización, limitación de tasas y compatibilidad con CORS, todo lo cual garantiza una sólida gestión y gobernanza de las APIs.

Esta integración te permite monitorizar el estado, la capacidad y el rendimiento de tu API Gateway mediante la recopilación de métricas y etiquetas (tags) del espacio de nombres [oci_apigateway][1].

## Configuración

### Instalación

Una vez configurada la integración de [Oracle Cloud Infrastructure][2], asegúrate de que los espacios de nombres mencionados anteriormente están incluidos en tu [Connector Hub][3].


## Datos recopilados

### Métricas
{{< get-metrics-from-git "oci_api_gateway" >}}


### Checks de servicio

OCI API Gateway no incluye ningún check de servicio.

### Eventos

OCI API Gateway no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://docs.oracle.com/en-us/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm
[2]: https://docs.datadoghq.com/es/integrations/oracle_cloud_infrastructure/
[3]: https://cloud.oracle.com/connector-hub/service-connectors
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/oci_api_gateway/metadata.csv
[5]: https://docs.datadoghq.com/es/help/