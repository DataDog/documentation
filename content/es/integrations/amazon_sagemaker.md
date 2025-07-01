---
categories:
- automatización
- aws
- nube
- recopilación de logs
- ia/ml
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon SageMaker.
doc_link: https://docs.datadoghq.com/integrations/amazon_sagemaker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: Blog
  text: 'CloudHealth + Datadog: gestiona eficazmente tus activos en la nube'
git_integration_title: amazon_sagemaker
has_logo: true
integration_id: ''
integration_title: Amazon SageMaker
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_sagemaker
public_title: Integración de Datadog y Amazon SageMaker
short_description: Rastrea métricas clave de Amazon SageMaker.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon SageMaker es un servicio de machine learning totalmente gestionado. Con Amazon SageMaker, los científicos de datos y los desarrolladores pueden crear y entrenar modelos de machine learning y, a continuación, desplegarlos directamente en un entorno alojado listo para la producción.

Habilita esta integración para ver todas tus métricas de SageMaker en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `SageMaker` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon SageMaker][3].

### APM

#### Activar logging

Configura Amazon SageMaker para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_sagemaker` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon SageMaker en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_sagemaker" >}}


### Eventos

La integración de Amazon SageMaker no incluye ningún evento.

### Checks de servicio

La integración de Amazon SageMaker no incluye ningún check de servicio.

## Monitorización predefinida

Datadog proporciona dashboards predefinidos para los endpoints y trabajos de SageMaker.

### Endpoints de SageMaker

Utiliza el [dashboard de endpoints de SageMaker][8] para empezar inmediatamente a monitorizar el estado y el rendimiento de tus endpoints de SageMaker sin configuración adicional. Determina qué endpoints tienen errores, una latencia superior a la esperada o picos de tráfico. Revisa y corrige tus selecciones de política de tipo de instancia y escalado mediante la utilización de CPU, GPU, memoria y métricas de uso.

{{< img src="integrations/amazon_sagemaker/sagemaker_endpoints_2.png" alt="Dashboard de endpoints de SageMaker predefinido" style="width:80%;">}}

### Trabajos de SageMaker

Puedes utilizar el [dashboard de trabajos de SageMaker][9] para obtener información sobre la utilización de recursos (por ejemplo, encontrar cuellos de botella de CPU, GPU y almacenamiento) de tus trabajos de formación, proceso o transformación. Utiliza esta información para optimizar tus instancias de computación.

{{< img src="integrations/amazon_sagemaker/sagemaker_jobs_2.png" alt="Dashboard de trabajos de SageMaker predefinidos" style="width:80%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-sagemaker
[4]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=automaticcloudformation#log-collection
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sagemaker/amazon_sagemaker_metadata.csv
[8]: https://app.datadoghq.com/dash/integration/31076/amazon-sagemaker-endpoints
[9]: https://app.datadoghq.com/dash/integration/31077/amazon-sagemaker-jobs
[10]: https://docs.datadoghq.com/es/help/