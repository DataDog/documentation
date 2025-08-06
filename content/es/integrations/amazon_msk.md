---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Amazon Managed Streaming para Apache Kafka
  (MSK).
doc_link: https://docs.datadoghq.com/integrations/amazon_msk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-msk/
  tag: Blog
  text: Monitoriza Amazon Managed Streaming para Apache Kafka con Datadog
git_integration_title: amazon_msk
has_logo: true
integration_id: ''
integration_title: Amazon Managed Streaming para Apache Kafka (MSK)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_msk
public_title: Integración de Datadog y Amazon Managed Streaming para Apache Kafka
  (MSK)
short_description: Rastrea las métricas clave de Amazon MSK.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Managed Streaming para Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y ejecución de aplicaciones que utilizan Apache Kafka para procesar datos de streaming.

Esta integración utiliza un rastreador que recopila métricas de CloudWatch. Lee la página de [Amazon MSK (Agent)][1] para obtener información sobre la monitorización de MSK a través del Datadog Agent.

## Configuración

Habilita el rastreador de Amazon MSK para ver las métricas de MSK desde CloudWatch en Datadog.

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `Kafka` está activada en la pestaña `Metric Collection`.

2. Instala la [integración de Amazon MSK][4].

### APM

#### Activar logging

Configura Amazon MSK para enviar logs a un bucket de S3 o a CloudWatch.

**Notas**: 
- Si vas a loguear en un bucket de S3, asegúrate de que `amazon_msk` está configurado como _Target prefix_ (Prefijo de destino).
- Si vas a loguear en un grupo de logs de CloudWatch, asegúrate de que tu nombre contiene la subcadena `msk`.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][5].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon MSK en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][6]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon-msk" >}}


### Eventos

El rastreador de Amazon MSK no incluye ningún evento.

### Checks de servicios

La integración de Amazon MSK no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_kafka/
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-msk
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_msk/amazon_msk_metadata.csv
[9]: https://docs.datadoghq.com/es/help/