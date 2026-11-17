---
description: Monitoree el estado operativo en tiempo real de servicios de terceros,
  como pasarelas de pago, plataformas en la nube y API, para detectar interrupciones
  de proveedores de forma temprana.
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-outage-detection/
  tag: Blog
  text: Anticípese a las interrupciones del servicio con Watchdog Cloud and API Outage
    Detection
- link: watchdog/faulty_cloud_saas_api_detection/
  tag: Documentación
  text: Obtenga información sobre Watchdog Faulty Cloud & SaaS API Detection
- link: integrations/statuspage/
  tag: Documentación
  text: Obtenga información sobre la integración de Atlassian Statuspage
site_support_id: idp
title: Estado del proveedor externo
---
## Descripción general {#overview}

La [página de External Provider Status][1] proporciona visibilidad en tiempo real del estado operativo de servicios de terceros, como pasarelas de pago, plataformas en la nube y API. Utilice esta página para identificar problemas de rendimiento de forma temprana, reducir el tiempo medio de detección (MTTD) y minimizar el impacto de las interrupciones de los proveedores.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_overview.png" alt="Página de External Provider Status con una tarjeta para cada proveedor que muestra su estado, un gráfico de rendimiento y los servicios que lo utilizan." >}}

## Capacidades clave {#key-capabilities}
External Provider Status detecta degradaciones de proveedores a partir del tráfico en vivo en lugar de esperar a que los proveedores actualicen sus páginas de estado. Los incidentes que los proveedores reportan en sus propias páginas de estado aparecen junto a estas detecciones.

External Provider Status muestra:

- **Estado en tiempo real**: Monitoree el estado de los proveedores externos en una sola vista.
- **Degradaciones de error y latencia**: Detecte tasas de error anormales y latencia anormal en las API de los proveedores.
- **Puntos de conexión afectados**: Vea qué puntos de conexión de la API del proveedor se ven afectados por una degradación.
- **Incidentes reportados por el proveedor**: Vea los incidentes que los proveedores declaran en sus páginas de estado públicas.
- **Proveedores personalizados**: Realice un seguimiento de los incidentes reportados para cualquier proveedor que publique una Atlassian Statuspage.
- **Dependencias de servicio**: Asigne proveedores externos a servicios internos (requiere APM).
- **Datos históricos**: Vea las tendencias de rendimiento y el historial de incidentes de 90 días.
- **Alerting**: Reciba notificaciones cuando ocurran degradaciones de proveedores.

## Estado del proveedor {#provider-status}

Cada tarjeta de proveedor muestra un distintivo de estado:

| Insignia | Significado |
|-------|---------|
| {{< ui >}}OPERATIONAL{{< /ui >}} | Datadog no detecta una degradación y el proveedor no reporta un incidente en curso. |
| {{< ui >}}DEGRADED{{< /ui >}} | Datadog detecta una degradación a partir del tráfico en vivo hacia el proveedor. |
| {{< ui >}}REPORTED INCIDENTS{{< /ui >}} | El proveedor reporta un incidente en curso en su página de estado. |

La tarjeta también muestra cuándo se degradó el proveedor por última vez, un gráfico del rendimiento reciente y los servicios de su organización que llaman al proveedor (requiere APM). Use el filtro {{< ui >}}Team{{< /ui >}} para mostrar solo los proveedores utilizados por los servicios de un equipo.

Haga clic en una tarjeta para abrir los detalles del proveedor. El panel de detalles incluye un enlace a la página de estado del proveedor, los servicios que dependen del proveedor, el historial de 90 días y la lista de degradaciones e incidentes reportados. Cada degradación muestra su tipo ({{< ui >}}High Error Rate{{< /ui >}}, {{< ui >}}High Latency{{< /ui >}} o {{< ui >}}High Error Rate & Latency{{< /ui >}}), la cantidad de puntos de conexión afectados, su duración y si está {{< ui >}}Ongoing{{< /ui >}} o {{< ui >}}Resolved{{< /ui >}}.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_degradations.png" alt="Panel de detalles del proveedor con una barra de historial de 90 días y una degradación que tiene un incidente reportado anidado." >}}

## Incidentes reportados por el proveedor {#provider-reported-incidents}

External Provider Status también muestra los incidentes que los proveedores declaran en sus páginas de estado públicas. Los incidentes reportados están disponibles en [proveedores compatibles](#supported-providers).

La lista {{< ui >}}Degradations & Reported Incidents{{< /ui >}} contiene dos tipos de eventos:

- **Degradaciones**: Datadog detecta estos eventos a partir del tráfico en vivo. Muestran la etiqueta {{< ui >}}DEGRADED{{< /ui >}}.
- **Incidentes reportados**: El proveedor declara estos eventos en su página de estado. Incluyen el título del incidente y un enlace al incidente.

Cuando un incidente reportado se superpone en el tiempo con una degradación que Datadog detecta, el incidente reportado aparece anidado bajo esa degradación.

Utilice el filtro {{< ui >}}Type{{< /ui >}} para mostrar todos los eventos, solo degradaciones o solo incidentes reportados. En la barra de historial de 90 días, los días con un incidente reportado y sin degradación detectada aparecen como {{< ui >}}Operational + Reported Incident{{< /ui >}}.

## Agregar un proveedor personalizado {#add-a-custom-provider}

Para monitorear un proveedor que External Provider Status no admite de forma predeterminada, agréguelo como proveedor personalizado mediante su página pública de Atlassian Statuspage.

<div class="alert alert-info">Datadog no detecta degradaciones a partir del tráfico en vivo para proveedores personalizados. Los proveedores personalizados solo muestran los incidentes reportados en la página de estado del proveedor.</div>

Agregar un proveedor personalizado requiere el permiso `manage_integrations`.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_custom_provider.png" alt="Ventana modal Add a Custom Provider con campos para la URL de Atlassian Statuspage y el nombre para mostrar." >}}

1. En la [página de External Provider Status][1], haga clic en {{< ui >}}Add Custom Provider{{< /ui >}} en la esquina superior derecha.
2. En {{< ui >}}Atlassian Statuspage URL{{< /ui >}}, ingrese la URL de la página de estado pública del proveedor, como `https://status.example.com`.
3. En {{< ui >}}Display Name{{< /ui >}}, ingrese el nombre que se mostrará para el proveedor.
4. Haga clic en {{< ui >}}Create Custom Provider{{< /ui >}}. La nueva tarjeta del proveedor aparece en la lista.

External Provider Status utiliza la [integración de Statuspage][2] para conectar proveedores personalizados y actualiza la configuración de la integración cuando agrega uno.

Los proveedores personalizados solo admiten páginas públicas de Atlassian Statuspage. Una tarjeta de proveedor personalizado muestra el estado actual, el historial de 90 días y los incidentes reportados en la página de estado del proveedor.

## Configurar Notifications {#configure-notifications}

Para recibir notificaciones sobre degradaciones de proveedores externos:

1. Haga clic en {{< ui >}}Notify Me{{< /ui >}} en la esquina superior derecha.
2. En {{< ui >}}Set scope{{< /ui >}}, seleccione uno o más proveedores, o mantenga {{< ui >}}Any Provider{{< /ui >}}.
3. Opcionalmente, para recibir notificaciones solo cuando una degradación afecte a sus servicios, seleccione la casilla de verificación {{< ui >}}Notify only if provider has an impact on services{{< /ui >}}.
4. En {{< ui >}}Choose Recipients{{< /ui >}}, seleccione los destinatarios.
5. En {{< ui >}}Name notification rule{{< /ui >}}, ingrese un nombre para la regla.
6. Haga clic en {{< ui >}}Create{{< /ui >}}.

{{< img src="internal_developer_portal/external_provider_status/external_provider_status_notification_rule.png" alt="Ventana modal Create New Notification Rule con los pasos Set scope, Choose Recipients y Name notification rule." >}}

Las reglas de notificación se aplican solo a las degradaciones que Datadog detecta. Las reglas no notifican sobre incidentes reportados por el proveedor ni sobre proveedores personalizados, y no puede filtrar por tipo de degradación.

Para ver y editar sus reglas existentes, haga clic en {{< ui >}}Manage Notifications{{< /ui >}} en la esquina superior derecha. El botón muestra el número de reglas existentes.

## Proveedores admitidos {#supported-providers}

External Provider Status monitorea los siguientes proveedores de terceros. Si su proveedor no aparece en la lista y tiene una página pública de Atlassian Statuspage, consulte la sección [Agregar un proveedor personalizado](#add-a-custom-provider).


| Proveedor externo | API monitoreada |  
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
| Splunk | `*.splunkcloud.com` |
| Square | `connect.squareup.com` |
| Stripe | `api.stripe.com` |
| Twilio | `api.twilio.com` |
| X | `api.twitter.com` |
| Zendesk | `*.zendesk.com` |
| Zoom | `api.zoom.us` |

### Servicios de AWS {#aws-services}

External Provider Status monitorea los siguientes servicios de AWS mediante endpoints que coinciden con `*.amazonaws.com`:
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

Se monitorean estos servicios en las siguientes regiones:
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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/watchdog/external-provider-status
[2]: /es/integrations/statuspage/