---
app_id: amazon-privatelink
app_uuid: a61f0481-5b69-4c7b-9777-12d626f2486d
assets:
  dashboards:
    Amazon PrivateLink: assets/dashboards/amazon_privatelink_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.privatelinkendpoints.active_connections
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.privatelink
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 360
    source_type_name: Amazon PrivateLink
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- aws
- nube
- recopilación de logs
- la red
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_privatelink
integration_id: amazon-privatelink
integration_title: Amazon PrivateLink
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_privatelink
public_title: Amazon PrivateLink
short_description: Realiza un seguimiento de métricas de AWS PrivateLink.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Métricas
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de métricas de AWS PrivateLink.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: otros
    url: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/
  support: README.md#Soporte
  title: Amazon PrivateLink
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS PrivateLink proporciona conectividad privada entre VPC, servicios AWS y tus redes on-premises.

Habilita esta integración para monitorizar el estado y el rendimiento de tus endpoints de VPC o servicios de endpoints con Datadog.

**Importante:** Si quieres enviar datos de telemetría a Datadog a través de PrivateLink, sigue [estas instrucciones][1].

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la página de la [integración AWS][3], asegúrate de que `PrivateLinkEndPoints` y `PrivateLinkServices` están habilitados
   en la pestaña `Metric Collection`.
2. Instala la [integración Datadog - AWS PrivateLink][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-privatelink" >}}


### Eventos

La integración AWS PrivateLink no incluye eventos.

### Checks de servicio

La integración AWS PrivateLink no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Conectarse a Datadog a través de AWS PrivateLink][7]

[1]: https://docs.datadoghq.com/es/agent/guide/private-link/
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-privatelink
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_privatelink/assets/metrics/metric-spec.yaml
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/architecture/connect-to-datadog-over-aws-privatelink/