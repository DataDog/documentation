---
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-outage-detection/
  tag: Blog
  text: Adelántate a las interrupciones de servicio con Watchdog Cloud y API Outage
    Detection
- link: watchdog/faulty_deployment_detection/
  tag: Documentación
  text: Más información sobre las detecciones de despliegue defectuoso de un servicio
    de Watchdog
title: Detección automática de API de nube y SaaS defectuosas
site_support_id: watchdog_faulty_service_deployment
---

## Información general

La detección automática de API de nube y SaaS defectuosas detecta en cuestión de minutos los problemas de proveedores externos (pasarelas de pago, proveedores de nube, etc.), lo que reduce el tiempo medio hasta la detección (MTTD). Watchdog utiliza la telemetría de APM para monitorizar continuamente las elevadas tasas de error en solicitudes a proveedores externos, como AWS, OpenAI, Slack, Stripe, etc., para detectar la degradación de servicio en cuanto se produce. Esta detección proactiva te permite identificar y mitigar los problemas antes de que se agraven, lo que reduce significativamente el tiempo dedicado al análisis de la causa raíz y mejora los tiempos de respuesta.

Cuando Watchdog detecta un fallo en un proveedor externo, indica los servicios afectados por el problema y el alcance de la interrupción. Esto te permite diferenciar entre problemas externos e internos. Datadog también proporciona enlaces directos a la página de estado del proveedor y a los canales de soporte, para que puedas ponerte en contacto con ellos cuando lo necesite.

{{< img src="watchdog/external_provider_outage.png" alt="Detección de proveedores de API de SaaS defectuosas" >}}

Cada vez que se detecta un despliegue defectuoso, Watchdog crea un evento en el [Event Explorer][1]. Puedes configurar un monitor para recibir notificaciones automáticas sobre tales eventos:

1. Ve a la página [New Monitor][11] (Nuevo monitor).
2. Elige **Watchdog**.
3. Selecciona `Third Party` en la categoría de alertas.


## Proveedores compatibles
Watchdog monitoriza el estado de las API de los siguientes proveedores externos: 

| Proveedor externo | API supervisada |  
|----------|--------------------|
| Amplitude | api.amplitude.com |
| Atlassian | *.atlassian.net |
| Auth0 | *.auth0.com |
| Binance | api.binance.com     |
| Braintree | api.braintreegateway.com |
| Coreweave | *.coreweave.com |
| Cloudflare | api.cloudflare.com |
| Confluent | api.confluent.cloud y api.telemetry.confluent.cloud |
| Databricks | *.cloud.databricks.com |
| Envoy | api.envoy.com |
| Facebook | graph.facebook.com |
| GitHub | api.github.com |
| Google | developers.google.com |
| Hubspot | api.hubspot.com |
| Intercom | api.intercom.io |
| Mapbox | api.mapbox.com |
| Mixpanel | api.mixpanel.com |
| OpenAI | *.openai.com|
| PagerDuty | api.pagerduty.com |
| Palo Alto Networks | api.urlcloud.paloaltonetworks.com |
| Render | api.render.com |
| SendGrid | *.sendgrid.com |
| ServiceNow | *.service-now.com |
| Slack | *.slack.com |
| Snowflake | *.snowflakecomputing.com |
| SoundCloud | api.soundcloud.com |
| PHP | *.splunkcloud.com |
| Square | connect.squareup.com |
| Stripe | api.stripe.com |
| Towerdata | api.towerdata.com |
| Twilio | api.twilio.com |
| Twitter | api.twitter.com |
| Zendesk | *.zendesk.com |
| Zoom    | api.zoom.us |

Se monitorizan los siguientes servicios de AWS (.*amazonaws.com):
- CloudWatch
- DynamoDB
- ELB
- ES
- Firehose
- Kinesis
- KMS
- Lambda
- RDS
- S3
- SNS
- SQS
- STS

en las siguientes regiones:
| AMER          | EMEA         | APAC           |
| --------------| -------------|----------------|
| us-east-2     | af-south-1   | ap-east-1      |
| us-east-1     | eu-central-1 | ap-south-2     | 
| us-west-1     | eu-west-1    | ap-southeast-3 | 
| us-west-2     | eu-west-2    | ap-southeast-4 |
| ca-central-1  | eu-south-1   | ap-south-1     |
| ca-west-1     | eu-west-3    | ap-northeast-3 |
| us-gov-east-1 | eu-south-2   | ap-northeast-2 |
| us-gov-west-1 | eu-north-1   | ap-southeast-1 |
| sa-east-1     | eu-central-2 | ap-southeast-2 |
|               | me-south-1   | ap-northeast-1 | 
|               | me-central-1 |                |
|               | il-central-1 |                |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/explorer
[2]: https://app.datadoghq.com/monitors/create