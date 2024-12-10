---
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Amazon EC2 Spot.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2_spot/
draft: false
git_integration_title: amazon_ec2_spot
has_logo: true
integration_id: ''
integration_title: Amazon EC2 Spot
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_ec2_spot
public_title: Integración de Datadog y Amazon EC2 Spot
short_description: Rastrea las métricas clave de Amazon EC2 Spot.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Las instancias de Amazon EC2 Spot te permiten aprovechar la capacidad de EC2 no utilizada en la nube de AWS.

Habilita esta integración para ver todas tus [métricas de flota][1] de EC2 Spot en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `EC2 Spot` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon EC2 Spot][4].

### APM

Utiliza el [Datadog Agent][5] u otro remitente de logs como [Rsyslog][6] para enviar tus logs a Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### Eventos

La integración de Amazon EC2 Spot no incluye ningún evento.

### Checks de servicio

La integración de Amazon EC2 Spot no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-ec2-spot
[5]: https://docs.datadoghq.com/es/agent/logs/
[6]: https://docs.datadoghq.com/es/integrations/rsyslog/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[8]: https://docs.datadoghq.com/es/help/