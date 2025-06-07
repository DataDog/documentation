---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Kinesis Data Analytics.
doc_link: https://docs.datadoghq.com/integrations/amazon_kinesis_data_analytics/
draft: false
git_integration_title: amazon_kinesis_data_analytics
has_logo: true
integration_id: ''
integration_title: Amazon Kinesis Data Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_kinesis_data_analytics
public_title: Integración de Datadog y Amazon Kinesis Data Analytics
short_description: Rastrea métricas clave de Amazon Kinesis Data Analytics.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Kinesis Data Analytics te permite transformar, consultar y analizar fácilmente
datos de streaming en tiempo real con Apache Flink.

Habilita esta integración para ver todas tus métricas de Amazon Kinesis Data Analitycs en
Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Kinesis Analytics` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Kinesis Data Analytics][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_kinesis_data_analytics" >}}


### Eventos

La integración de Amazon Kinesis Data Analytics no incluye ningún evento.

### Checks de servicios

La integración de Amazon Kinesis Data Analytics no incluye ningún check de
servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_kinesis_data_analytics/amazon_kinesis_data_analytics_metadata.csv
[5]: https://docs.datadoghq.com/es/help/