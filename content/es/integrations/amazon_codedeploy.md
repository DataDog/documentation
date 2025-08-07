---
"aliases":
- "/integrations/awscodedeploy/"
"app_id": "amazon-codedeploy"
"app_uuid": "b1fcc2d7-0882-41d8-92ad-886a9750c0a9"
"assets":
  "dashboards":
    "aws_codedeploy": "assets/dashboards/aws_codedeploy.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "metrics":
      "check": "aws.codedeploy.deployment"
      "metadata_path": "metadata.csv"
      "prefix": "aws.codedeploy."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "198"
    "source_type_name": "Amazon CodeDeploy"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "automation"
- "aws"
- "cloud"
- "configuration & deployment"
- "log collection"
- "provisioning"
"custom_kind": "integration"
"dependencies": []
"description": "Ve los despliegues a medida que se producen y controla el tiempo que tardan"
"display_on_public_website": true
"doc_link": "https://docs.datadoghq.com/integrations/amazon_codedeploy/"
"draft": false
"git_integration_title": "amazon_codedeploy"
"has_logo": true
"integration_id": "amazon-codedeploy"
"integration_title": "AWS CodeDeploy"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_codedeploy"
"public_title": "AWS CodeDeploy"
"short_description": "AWS CodeDeploy es un servicio que automatiza el despliegue de código en instancias en la nube y on-premise."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Automatización"
  - "Category::AWS"
  - "Category::Cloud"
  - "Category::Configuración y despliegue"
  - "Category::Recopilación de logs"
  - "Category::Provisioning"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "AWS CodeDeploy es un servicio que automatiza el despliegue de código en instancias en la nube y on-premise."
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "AWS CodeDeploy"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
![CodeDeploy default dashboard][1]

## Información general

AWS CodeDeploy es un servicio que automatiza el despliegue de código en instancias en la nube y on-premise.

Habilita esta integración para ver eventos de despliegue y métricas de AWS CodeDeploy en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. Añade los siguientes permisos a tu [política de Datadog IAM][3] para poder recopilar métricas de AWS CodeDeploy. Para obtener más información, consulta las [políticas de CodeDeploy][4] en el sitio web de AWS.

    | Permiso de AWS                        | Descripción                                                                   |
    | ------------------------------------- | ----------------------------------------------------------------------------- |
    | `codedeploy:ListApplications` | Se utiliza para hacer una lista de todas las aplicaciones de CodeDeploy |
    | `codedeploy:ListDeploymentGroups` | Se utiliza para hacer una lista de todos los grupos de despliegues dentro de una aplicación (editado) |
    | `codedeploy:ListDeployments` | Se utiliza para hacer una lista de despliegues en un grupo de despliegues dentro de una aplicación (editado) |
    | `codedeploy:BatchGetDeployments` | Obtiene descripciones detalladas de los despliegues (editados) |
    | `codedeploy:BatchGetDeploymentGroups` | Obtiene descripciones detalladas de los grupos de despliegues |

2. Instala la [integración Datadog - AWS CodeDeploy][5].

### Recopilación de logs

#### Activar logging

Configura AWS CodeDeploy para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_codedeploy` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][6].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS CodeDeploy en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][7]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][8]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_codedeploy" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de AWS CodeDeploy incluye eventos para despliegues exitosos, fallidos y detenidos. Consulta los eventos de ejemplo a continuación:

![AWS CodeDeploy Event][10]

### Checks de servicio

La integración de AWS CodeDeploy no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].

[1]: images/monitor-aws-codedeploy-dashboard.png
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/codedeploy/latest/userguide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon_codedeploy
[6]: https://docs.datadoghq.com/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_codedeploy/metadata.csv
[10]: images/aws_codedeploy_events.png
[11]: https://docs.datadoghq.com/help/

