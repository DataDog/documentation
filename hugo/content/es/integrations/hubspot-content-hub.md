---
aliases:
- /es/integrations/hubspot_content_hub
app_id: hubspot-content-hub
categories:
- recopilación de logs
- métricas
custom_kind: integración
description: Obtén información sobre los logs de actividad de HubSpot Content Hub
  y las métricas de Analytics.
integration_version: 1.0.0
media:
- caption: 'HubSpot Content Hub: actividad de auditoría'
  image_url: images/hubspot_content_hub_audit_activity.png
  media_type: imagen
- caption: 'HubSpot Content Hub: análisis de contenidos'
  image_url: images/hubspot_content_hub_content_analytics.png
  media_type: imagen
- caption: 'HubSpot Content Hub: análisis de geolocalización'
  image_url: images/hubspot_content_hub_geolocation_analytics.png
  media_type: imagen
- caption: 'HubSpot Content Hub: actividad de inicio de sesión'
  image_url: images/hubspot_content_hub_login_activity.png
  media_type: imagen
- caption: 'HubSpot Content Hub: actividad de seguridad'
  image_url: images/hubspot_content_hub_security_activity.png
  media_type: imagen
- caption: 'HubSpot Content Hub: análisis fuente'
  image_url: images/hubspot_content_hub_source_analytics.png
  media_type: imagen
title: HubSpot Content Hub
---
## Información general

[HubSpot Content Hub](https://www.hubspot.com/products/content) es un software de marketing de contenidos todo en uno que ayuda a los profesionales del marketing a crear y gestionar contenidos a gran escala. Ayuda a crear contenido enriquecido y respaldado por expertos en varios formatos y canales.

La integración de HubSpot Content Hub recopila logs de actividad (auditoría, inicio de sesión, seguridad) y métricas de análisis (categorías de desglose, tipos de contenido) y los envía a Datadog para su análisis detallado. Los logs se analizan y enriquecen para una búsqueda eficiente, mientras que las métricas proporcionan información sobre el rendimiento del contenido.

La integración incluye dashboards que muestran y analizan tanto los logs de actividad como las métricas de análisis, lo que facilita la monitorización y la comprensión de tendencias y problemas.

## Configuración

Para integrar HubSpot con Datadog, Datadog se conecta a HubSpot utilizando OAuth. El usuario autenticado debe tener permisos de propietario en las organizaciones que deseas integrar.

### Instalación

1. Ve a la página [Integraciones](https://app.datadoghq.com/integrations) y busca la integración "HubSpot Content Hub".
1. Haz clic en el cuadro.
1. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add HubSpot Account** (Añadir cuenta de HubSpot).
1. Luego de leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la página de inicio de sesión de HubSpot.
1. Después de iniciar sesión, se te pedirá que selecciones a qué cuenta de HubSpot deseas conceder acceso.
1. Haz clic en **Authorize** (Autorizar).
1. Se te redirigirá nuevamente al cuadro de HubSpot en Datadog con una nueva cuenta. Datadog recomienda cambiar el nombre de la cuenta por una que sea más fácil de recordar. Puedes añadir varias cuentas con acceso a distintas organizaciones.

**Nota**: HubSpot guarda esta selección de autorización. Para que se te solicite de nuevo o para añadir nuevas organizaciones, revoca el acceso a la aplicación en HubSpot (`User Preferences > Integrations > Connected Applications > Datadog - HubSpot OAuth App`) y, a continuación, reinicia el proceso de configuración.

## Datos recopilados

### Logs

La integración de HubSpot Content Hub recopila y envía los logs de actividad a Datadog.

### Métricas

La integración de HubSpot Content Hub recopila y reenvía las métricas de Analytics a Datadog.

| | |
| --- | --- |
| **hubspot.content_hub.breakdown.bounce_rate** <br>(gauge) | Relación entre rebotes y visitas<br>_Se muestra como fracción_ |
| **hubspot.content_hub.breakdown.bounces** <br>(gauge) | El recuento total de rebotes del tráfico|
| **hubspot.content_hub.breakdown.count** <br>(gauge) | Total de subtipos de desglose enviados o creados en una cuenta|
| **hubspot.content_hub.breakdown.new_visitor_session_rate** <br>(gauge) | Tasa de nuevos visitantes que inician sesión<br>_Se muestra como fracción_ |
| **hubspot.content_hub.breakdown.pageviews_per_session** <br>(gauge) | Promedio de visitas por página por sesión|
| **hubspot.content_hub.breakdown.raw_views** <br>(gauge) | Número total de contenidos vistos, incluidos los duplicados|
| **hubspot.content_hub.breakdown.returning_visits** <br>(gauge) | Visitas de usuarios que han visitado anteriormente|
| **hubspot.content_hub.breakdown.standard_views** <br>(gauge) | Vistas de páginas o contenidos estándar|
| **hubspot.content_hub.breakdown.time** <br>(gauge) | Tiempo total dedicado al contenido o al sitio<br>_Se muestra como segundo_ |
| **hubspot.content_hub.breakdown.time_per_session** <br>(gauge) | Tiempo medio empleado por sesión<br>_Se muestra en segundos_ |
| **hubspot.content_hub.breakdown.visitors** <br>(gauge) | Número de visitantes únicos al contenido|
| **hubspot.content_hub.breakdown.visits** <br>(gauge) | Número total de visitas al contenido|
| **hubspot.content_hub.content.count** <br>(gauge) | Recuento total de contenidos enviados o creados en una cuenta|
| **hubspot.content_hub.content.entrances** <br>(gauge) | Número de veces que los usuarios entraron en el sitio a través del contenido|
| **hubspot.content_hub.content.exits** <br>(gauge) | Número de veces que los usuarios salieron del sitio desde el contenido|
| **hubspot.content_hub.content.exits_per_pageview** <br>(gauge) | Número medio de salidas por vista de página|
| **hubspot.content_hub.content.new_visitor_raw_views** <br>(gauge) | Total de visitas de nuevos visitantes, incluidos los duplicados|
| **hubspot.content_hub.content.page_bounce_rate** <br>(gauge) | Relación entre los rebotes de página y las entradas<br>_Se muestra como fracción_ |
| **hubspot.content_hub.content.page_bounces** <br>(gauge) | Número de rebotes de página|
| **hubspot.content_hub.content.page_time** <br>(gauge) | Tiempo total dedicado en la página de contenido<br> _Se muestra en segundos_ |
| **hubspot.content_hub.content.raw_views** <br>(gauge) | Número total de contenidos vistos, incluidos los duplicados|
| **hubspot.content_hub.content.standard_views** <br>(gauge) | Vistas de páginas o contenidos estándar|
| **hubspot.content_hub.content.time_per_pageview** <br>(gauge) | Tiempo medio empleado por vista de página<br>_Se muestra en segundos_ |

### Checks de servicio

La integración de HubSpot Content Hub no incluye ningún check de servicio.

### Eventos

La integración de HubSpot Content Hub no incluye ningún evento.

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://app.hubspot.com/login).