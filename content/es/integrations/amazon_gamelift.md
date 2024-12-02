---
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Gamelift.
doc_link: https://docs.datadoghq.com/integrations/amazon_gamelift/
draft: false
git_integration_title: amazon_gamelift
has_logo: true
integration_id: ''
integration_title: Amazon Gamelift
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_gamelift
public_title: Integración de Datadog y Amazon Gamelift
short_description: Rastrea métricas clave de Amazon Gamelift.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon GameLift es un servicio totalmente gestionado para desplegar, operar y escalar tus servidores de juegos multijugador basados en sesiones en la nube.

Habilita esta integración para ver todas tus métricas de Gamelift en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `Game Lift` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon GameLift][3].

### APM

#### Activar logging

Configura Amazon GameLift para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_gamelift` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon GameLift en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_gamelift" >}}


### Eventos

La integración de Amazon GameLift no incluye ningún evento.

### Checks de servicio

La integración de Amazon GameLift no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-gamelift
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[8]: https://docs.datadoghq.com/es/help/