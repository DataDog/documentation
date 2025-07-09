---
aliases:
- /es/integrations/awsredshift/
categories:
- aws
- cloud
- data stores
- log collection
custom_kind: integration
dependencies: []
description: Seguimiento de métricas Amazon Redshift clave.
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: ''
integration_title: Amazon Redshift
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_redshift
public_title: Integración de Amazon Redshift en Datadog
short_description: Seguimiento de métricas Amazon Redshift clave.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Amazon Redshift es un servicio de almacén de datos a escala de petabytes, rápido y totalmente gestionado que simplifica y rentabiliza el análisis eficaz de todos tus datos.

Habilita esta integración para ver todas tus métricas Redshift en Datadog.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `Redshift` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política IAM de Datadog][3] para recopilar métricas Amazon Redshift:

    - `redshift:DescribeClusters`: Enumera todos los clústeres Redshift de tu cuenta.
    - `redshift:DescribeLoggingStatus`: Accede al bucket de S3 donde se almacenan los logs Redshift.
    - `tag:GetResources`: Aplica etiquetas (tags) personalizadas a tus clústeres Redshift.

    Para obtener más información, consulta las [políticas de Redshift][4] en el sitio web AWS.

3. Instala la [integración Amazon Redshift en Datadog][5].

### APM

#### Activar logging

Primero, habilita el registro en tu clúster Redshift para recopilar logs. Los logs Redshift pueden escribirse en un bucket de Amazon S3 y [ser consumidos por una función Lambda][6]. Para obtener más información, consulta la [configuración de auditorías mediante la consola][7].

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][8] en tu cuenta AWS.
2. Una vez instalada la función Lambda, hay dos formas de recopilar tus logs Redshift:

    - Automáticamente: Los logs Redshift se gestionan automáticamente, si se concede acceso a Datadog con un conjunto de permisos. Para obtener más información sobre la configuración de la recopilación automática de logs de la función Lambda del Datadog Forwarder, consulta [Configuración automática de activadores][9].
    - Manualmente: En la consola de AWS, añade un activador en el bucket de S3 que contiene tus logs Redshift. Consulta los [pasos de instalación manual](#manual-installation-steps).

#### Pasos de la instalación manual

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][8] en tu cuenta AWS.
2. Una vez configurada, ve a la función Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs Redshift.
5. Deja el tipo evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Para empezar a explorar tus logs, ve al [Explorador de logs][10].

Para obtener más información sobre la recopilación de logs de servicios AWS, consulta [Enviar logs de servicios AWS con la función Lambda en Datadog][11].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_redshift" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración Amazon Redshift no incluye eventos.

### Checks de servicios

La integración Amazon Redshift no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-redshift
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[13]: https://docs.datadoghq.com/es/help/