---
categories:
- aws
- nube
- recopilación de logs
- network
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de AWS VPN.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpn/
draft: false
git_integration_title: amazon_vpn
has_logo: true
integration_id: ''
integration_title: AWS VPN
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_vpn
public_title: Integración de AWS VPN con Datadog
short_description: Rastrea métricas clave de AWS VPN.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

AWS VPN te permite establecer un túnel seguro y privado desde tu red o dispositivo hasta la red global de AWS.

Habilita esta integración para ver todas tus métricas de VPN en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración AWS][2], asegúrate de que `VPN` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración AWS VPN en Datadog][3].

### Recopilación de logs

#### Activar logging

Configura AWS VPN para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_vpn` esté configurado como _Prefijo de destino_.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de AWS VPN en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_vpn" >}}


### Eventos

La integración de AWS VPN no incluye eventos.

### Checks de servicio

La integración de AWS VPN no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-vpn
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpn/amazon_vpn_metadata.csv
[8]: https://docs.datadoghq.com/es/help/