---
app_id: amazon-mwaa
app_uuid: 21e39111-d2b1-4745-a4e7-23bea14e4f78
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: aws.mwaa.total_parse_time
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.mwaa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 336
    source_type_name: Amazon MWAA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_mwaa
integration_id: amazon-mwaa
integration_title: Amazon MWAA
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_mwaa
public_title: Amazon MWAA
short_description: Amazon Managed Workflows for Apache Airflow (MWAA) simplifica la
  creación y la gestión de flujos de trabajo en la nube.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Category::AWS
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: Amazon Managed Workflows for Apache Airflow (MWAA) simplifica la creación
    y la gestión de flujos de trabajo en la nube.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Amazon MWAA
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon Managed Workflows para Apache Airflow (MWAA) es un servicio gestionado
para Apache Airflow que facilita la creación y administración de flujos de trabajo
en la nube.

Habilita esta integración para ver todas tus métricas de Amazon MWAA en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura [la integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MWAA` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Managed Workflows para Apache Airflow (MWAA)][3].

### Recopilación de logs

1. Configura Amazon MWAA para [enviar logs a CloudWatch][4].
2. [Envía los logs a Datadog][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mwaa" >}}


### Eventos

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún evento.

### Checks de servicio

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mwaa
[4]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[5]: https://app.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#log-collection
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_mwaa/assets/metrics/metric-spec.yaml
[7]: https://docs.datadoghq.com/es/help/