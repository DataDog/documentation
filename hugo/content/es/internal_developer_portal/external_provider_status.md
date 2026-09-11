---
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-outage-detection/
  tag: Blog
  text: Adelántate a las interrupciones de servicio con Watchdog Cloud y API Outage
    Detection
- link: watchdog/faulty_cloud_saas_api_detection/
  tag: Documentación
  text: Más información sobre Watchdog Faulty Cloud & SaaS API Detection
title: Estado de proveedores externos
---

## Información general

La página del [Estado de proveedores externos][1] proporciona visibilidad en tiempo real del estado operativo de servicios de terceros, como pasarelas de pago, plataformas en la nube y API. Utiliza esta página para identificar problemas de rendimiento con antelación, reducir el tiempo medio de detección (MTTD) y minimizar el impacto de las interrupciones de los proveedores.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_page.png" alt="Página del estado de proveedores externos que muestra el estado operativo de dependencias de terceros" >}}


## Capacidades clave
El estado de proveedores externos evalúa el rendimiento de los servicios de terceros monitorizando el impacto del servicio en lugar de basarse en las actualizaciones de la página de estado. Utiliza datos de telemetría de tus aplicaciones para detectar antes y con mayor precisión los problemas de los proveedores externos.

El estado de proveedores externos muestra:

- **Estado en tiempo real**: Monitoriza la salud de proveedores externos en una sola vista.
- **Dependencias de servicios**: Asigna proveedores externos a servicios internos (requiere APM).
- **Datos históricos**: Consulta las tendencias de rendimiento de 90 días y el historial de incidentes.
- **Alertas**: Recibe notificaciones cuando se produzcan degradaciones de un proveedor. 

## Configurar notificaciones

Para recibir notificaciones de degradaciones de proveedores externos:

1. Haz clic en `Notify Me` (Notificarme) en la esquina superior derecha.
2. Define las condiciones de notificación:
   - Elige qué proveedor(es) monitorizar. 
   - Elige cuándo quieres recibir alertas sobre los proveedores seleccionados:
     - Recibe alertas ante cualquier degradación.
     - Recibe alertas solo cuando la degradación afecte a tus servicios.
3. Configura tus preferencias de notificación.
4. Ponle un nombre a la regla de notificación.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_notifications.png" alt="Modal de configuración de notificaciones de alerta del estado de proveedores externos" >}}

## Proveedores compatibles

El estado de los proveedores externos monitoriza los siguientes proveedores externos:


| Proveedor externo | API supervisada |  
|----------|--------------------| 
| Adyen | `*.adyenpayments.com` |
| Amplitude | `api.amplitude.com` |
| Anthropic | `api.anthropic.com` |
| Atlassian | `*.atlassian.net`, `*.atlassian.com` |
| Auth0 | `*.auth0.com` |
| Azure DevOps | `dev.azure.com` |
| Braintree | `api.braintreegateway.com` |
| Cloudflare | `*.cloudflare.com` |
| Databricks | `*.cloud.databricks.com` |
| Datadog (US1) | `api.datadoghq.com` |
| Facebook | `graph.facebook.com` |
| GitHub | `api.github.com` |
| GitLab | `*.gitlab.com` |
| Google Gemini | `generativelanguage.googleapis.com` |
| Google Maps | `maps.googleapis.com` |
| HubSpot | `api.hubspot.com`, `api.hubapi.com` |
| Intercom | `api.intercom.io` |
| LaunchDarkly | `app.launchdarkly.com` |
| Mapbox | `api.mapbox.com` |
| Mixpanel | `api.mixpanel.com` |
| Okta | `*.okta.com` |
| OpenAI | `*.openai.com` |
| PagerDuty | `api.pagerduty.com` |
| PayPal | `*.paypal.com` |
| Salesforce | `*.salesforce.com` |
| SendGrid | `*.sendgrid.com` |
| ServiceNow | `*.service-now.com` |
| Slack | `*.slack.com` |
| Snowflake | `*.snowflakecomputing.com` |
| PHP | `*.splunkcloud.com` |
| Square | `connect.squareup.com` |
| Stripe | `api.stripe.com` |
| Twilio | `api.twilio.com` |
| X | `api.twitter.com` |
| Zendesk | `*.zendesk.com` |
| Zoom | `api.zoom.us` |

### Servicios AWS

El estado de los proveedores externos monitoriza los siguientes servicios AWS a través de endpoints que coinciden con `*.amazonaws.com`:
- CloudWatch
- DynamoDB
- ELB
- ES
- Firehose
- Kinesis
- KMS
- Lambda
- S3
- SNS
- SQS
- STS

Estos servicios se monitorizan en las siguientes regiones:
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

[1]: https://app.datadoghq.com/watchdog/external-provider-status