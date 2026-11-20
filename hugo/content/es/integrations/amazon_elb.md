---
"app_id": "amazon-elb"
"app_uuid": "1ef7e818-51bc-4935-89b3-c418908c5e69"
"assets":
  "dashboards":
    "aws_alb": "assets/dashboards/aws_alb_overview.json"
    "aws_elb": "assets/dashboards/aws_elb_overview.json"
    "aws_nlb": "assets/dashboards/aws_nlb_overview.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aws.elb.request_count"
      "metadata_path": "assets/metrics/metric-spec.yaml"
      "prefix": "aws."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "119"
    "source_type_name": "Amazon ELB"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_elb"
"integration_id": "amazon-elb"
"integration_title": "Amazon Elastic Load Balancing"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_elb"
"public_title": "Amazon Elastic Load Balancing"
"short_description": "Amazon ELB distribuye automáticamente el tráfico entre varias instancias de EC2"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Amazon ELB distribuye automáticamente el tráfico entre varias instancias de EC2"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Amazon Elastic Load Balancing"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Amazon Elastic Load Balancing distribuye automáticamente el tráfico entrante de las aplicaciones entre varias instancias de Amazon EC2 en la nube.

Datadog recopila métricas y metadatos de los tres tipos de Elastic Load Balancers que ofrece AWS: Application (ALB), Classic (ELB) y Network Load Balancers (NLB).

Habilita esta integración para ver en Datadog todas tus métricas de Elastic Load Balancing.

Nota: Esta integración requiere que los permisos 'ec2:describe*\*' y 'elasticloadbalancing:describe\*' estén completamente habilitados.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `ApplicationELB`, `ELB` y `NetworkELB` están habilitados en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon ELB][3].

### Recopilación de logs

#### Habilitar el registro de Amazon ELB o ALB

Habilita primero el registro en tu ELB o ALB para recopilar tus logs. Los logs de ALB y ELB pueden escribirse en un bucket de Amazon S3 y [ser utilizados por una función Lambda][4]. Para obtener más información, consulta [Habilitar los logs de acceso para tu Classic Load Balancer][5].

![amazon elb log enable][6]

Configura el intervalo en 5 minutos, y define tu bucket S3 y tu prefijo. Para evitar tener una [definición ambigua de configuración de notificación de eventos de S3][7], asegúrate de utilizar una **localización única** que no se superponga con ninguna otra localización de un balanceador de carga. Cuando varios balanceadores de carga se conecten al mismo bucket, asegúrate de utilizar un **prefijo único**, como `my-bucket-for-elb-logs/my-elb-name`, para que tus logs se almacenen en diferentes localizaciones.

![amazon elb log configuration][8]

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[9] en tu cuenta AWS.
2. Una vez configurado, ve a la función Lambda del Datadog Forwarder. Configura tus activadores [automáticamente][10] o [manualmente][11] en el bucket S3 que contiene tus logs de ELB. Para la configuración manual, utiliza el tipo de evento `All object create events`.
3. Utiliza el [Explorador de logs][12] para explorar tus logs.

Para obtener más información sobre la recopilación de logs de AWS Services, consulta [Enviar logs de AWS Services con la función Lambda de Datadog][13].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_elb" >}}


### Eventos

La integración de Amazon Elastic Load Balancing no incluye ningún evento.

### Checks de servicios

La integración de Amazon Elastic Load Balancing no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][15].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-elb
[4]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[5]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[6]: images/aws_elb_log_enable.png
[7]: https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/
[8]: images/aws_elb_configure_log.png
[9]: https://docs.datadoghq.com/logs/guide/forwarder/
[10]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[11]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[12]: https://app.datadoghq.com/logs
[13]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[14]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_elb/assets/metrics/metric-spec.yaml
[15]: https://docs.datadoghq.com/help/

