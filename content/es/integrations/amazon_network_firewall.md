---
categories:
- nube
- aws
custom_kind: integración
dependencies: []
description: Monitoriza tu AWS Network Firewall.
doc_link: https://docs.datadoghq.com/integrations/amazon_network_firewall/
draft: false
git_integration_title: amazon_network_firewall
has_logo: true
integration_id: ''
integration_title: AWS Network Firewall
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_network_firewall
public_title: Datadog y AWS Network Firewall
short_description: Monitoriza tu AWS Network Firewall.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

AWS Network Firewall es un servicio con estado que permite a los clientes filtrar el tráfico en el perímetro de su VPC.

Habilita esta integración para ver todas tus métricas de AWS Network Firewall en Datadog.

## Configuración

### Instalación

Si todavía no lo has hecho, configura la [integración de Amazon Web Services primero][1].

### Recopilación de métricas

1. En la [página de integración de AWS][2], asegúrate de que `Network Firewall` está activado en la pestaña `Metric Collection`.

2. Instala la [integración de Datadog y AWS Network Firewall][3].

### APM

#### Activar logging

Configura AWS Network Firewall para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si generas logs en un bucket de S3, asegúrate de que `amazon_network_firewall` esté configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][4].
2. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS Network Firewall en la consola de AWS:

    - [Añadir un activador manual en el bucket de S3][5]
    - [Añadir un activador manual en el grupo de logs de CloudWatch][6]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_network_firewall" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS Network Firewall no incluye ningún evento.

### Checks de servicio

La integración de AWS Network Firewall no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-network-firewall
[4]: https://docs.datadoghq.com/es/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_network_firewall/amazon_network_firewall_metadata.csv
[8]: https://docs.datadoghq.com/es/help/