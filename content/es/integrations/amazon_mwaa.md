---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Managed Workflows para Apache Airflow
  (MWAA).
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: ''
integration_title: Amazon Managed Workflows para Apache Airflow (MWAA)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_mwaa
public_title: Integración de Datadog y Amazon Managed Workflows para Apache Airflow
  (MWAA)
short_description: Rastrea métricas clave de Amazon Managed Workflows para Apache
  Airflow (MWAA).
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Managed Workflows para Apache Airflow (MWAA) es un servicio gestionado
para Apache Airflow que facilita la creación y administración de flujos de trabajo
en la nube.

Habilita esta integración para ver todas tus métricas de Amazon MWAA en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `MWAA` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Managed Workflows para Apache Airflow (MWAA)][3].

### APM

1. Configura Amazon MWAA para [enviar logs a CloudWatch][4].
2. [Envía los logs a Datadog][5].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_mwaa" >}}


### Eventos

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún evento.

### Checks de servicio

La integración de Amazon Managed Workflows para Apache Airflow (MWAA) no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mwaa
[4]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[5]: /es/integrations/amazon_web_services/?tab=roledelegation#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[7]: https://docs.datadoghq.com/es/help/