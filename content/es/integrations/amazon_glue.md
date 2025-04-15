---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS Glue.
doc_link: https://docs.datadoghq.com/integrations/amazon_glue/
draft: false
git_integration_title: amazon_glue
has_logo: true
integration_id: ''
integration_title: AWS Glue
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_glue
public_title: Integración de Datadog y AWS Glue
short_description: Rastrea métricas clave de AWS Glue.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Glue es un servicio de ETL (extracción, transformación y carga) totalmente gestionado que hace más simple y rentable la categorización, limpieza, mejora y traslado fiable de datos entre varios almacenes de datos.

Habilita esta integración para ver todas tus métricas de Glue en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Glue` está activado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y AWS Glue][3].

### APM

#### Activar logging

Configura AWS Glue para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_glue` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Glue en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_glue" >}}


### Eventos

La integración de AWS Glue no incluye ningún evento.

### Checks de servicio

La integración de AWS Glue no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-glue
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_glue/amazon_glue_metadata.csv
[8]: https://docs.datadoghq.com/es/help/