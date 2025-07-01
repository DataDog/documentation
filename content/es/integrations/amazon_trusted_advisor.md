---
categories:
- aws
- nube
- gestión de costes
- recopilación de logs
- aprovisionamiento
custom_kind: integration
dependencies: []
description: Rastrea métricas clave de AWS Trusted Advisor.
doc_link: https://docs.datadoghq.com/integrations/amazon_trusted_advisor/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-trusted-advisor/
  tag: Blog
  text: Monitorizar los límites de servicio de AWS Trusted Advisor con Datadog
git_integration_title: amazon_trusted_advisor
has_logo: true
integration_id: ''
integration_title: AWS Trusted Advisor
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_trusted_advisor
public_title: Integración de AWS Trusted Advisor con Datadog
short_description: Rastrea métricas clave de AWS Trusted Advisor.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Trusted Advisor es una herramienta en línea que te brinda orientación en tiempo real para ayudarte a aprovisionar tus recursos respetando las prácticas recomendadas de AWS.

Habilita esta integración para ver todas tus métricas de Trusted Advisor en Datadog.

**Nota**: Esta integración solo funciona para clientes de AWS con un plan de soporte Business o Enterprise.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Amazon Web Services][1].

### Recopilación de métricas

1. En la consola de IAM, añade `support:describe*` y `support:refresh*` como una acción en el campo del documento de política. Para obtener más información sobre la API de AWS Support, consulta [Acciones, recursos y claves de condición para AWS Support][2].
2. En la [página de la integración AWS][3], asegúrate de que `Trusted Advisor` está habilitado en la pestaña `Metric Collection`.
3. Instala la [integración de AWS Trusted Advisor con Datadog][4].

### Recopilación de logs

#### Activar logging

Configura AWS Trusted Advisor para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_trusted_advisor` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder[5].
2. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS Trusted Advisor en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][6]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][7]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_trusted_advisor" >}}


### Eventos

La integración AWS Trusted Advisor no incluye eventos.

### Checks de servicios

La integración AWS Trusted Advisor no incluye checks de servicios.

## Dashboard

Para completar datos en tu dashboard de la integración AWS Trusted Advisor:

1. Configura los permisos de soporte.
    - En la consola de IAM, añade `support:describe*` y `support: refresh*` como una acción en el cuadro de texto del documento de política.
1.  Ten un plan de soporte de AWS actualizado.

El dashboard de Trusted Advisor de Datadog necesita acceso al conjunto completo de [checks de AWS Trusted Advisor][9]. AWS solo los pone a disposición de los planes de soporte de AWS actualizados. Asegúrate de que tu plan de AWS incluya acceso completo.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/service-authorization/latest/reference/list_awssupport.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-trusted-advisor
[5]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_trusted_advisor/amazon_trusted_advisor_metadata.csv
[9]: https://aws.amazon.com/premiumsupport/trustedadvisor
[10]: https://docs.datadoghq.com/es/help/