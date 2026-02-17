---
aliases:
- /es/integrations/awscodebuild/
app_id: amazon-codebuild
app_uuid: 688eb96c-df87-4c10-9253-a2cc3c113e9b
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: aws.codebuild.builds
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.codebuild
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 212
    source_type_name: Amazon CodeBuild
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies: []
description: Ve los despliegues a medida que se producen y controla el tiempo que
  tardan.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/amazon_codebuild/
draft: false
git_integration_title: amazon_codebuild
has_logo: true
integration_id: amazon-codebuild
integration_title: AWS CodeBuild
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_codebuild
public_title: AWS CodeBuild
short_description: AWS CodeBuild compila código fuente, ejecuta tests y prepara paquetes
  de software para despliegues.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Configuración
  description: AWS CodeBuild compila código fuente, ejecuta tests y prepara paquetes
    de software para despliegues.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: AWS CodeBuild
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

AWS CodeBuild es un servicio de compilación que compila el código fuente, ejecuta tests y genera paquetes de software listos para su despliegue.

Instala la integración de Datadog y AWS CodeBuild para:

- Rastrear las compilaciones por proyecto
- Recopilar métricas sobre tus compilaciones
- Correlacionar las compilaciones con el resto de tus métricas de Datadog

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `CodeBuild` está habilitado en la pestaña `Metric Collection`.

2. Instala la [integración de Datadog y AWS CodeBuild][3].

### Recopilación de logs

#### Activar logging

Configura AWS CodeBuild para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_codebuild` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS CodeBuild en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_codebuild" >}}


### Eventos

La integración de AWS CodeBuild no incluye ningún evento.

### Checks de servicio

La integración de AWS CodeBuild no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_codebuild/assets/metrics/metric-spec.yaml
[8]: https://docs.datadoghq.com/es/help/