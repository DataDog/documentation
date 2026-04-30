---
aliases:
- /es/integrations/gatling_enterprise
app_id: gatling-enterprise
categories:
- herramientas de desarrollo
- tests
custom_kind: integración
description: Recopilación de métricas de TEST de carga de Gatling Enterprise
integration_version: 1.2.0
media:
- caption: 'Dashboard de información general de Gatling Enterprise: respuestas y solicitudes'
  image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
    (2) 1.png
  media_type: imagen
- caption: 'Dashboard de información general de Gatling Enterprise: tiempo de respuesta'
  image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
    (2) 1-1.png
  media_type: imagen
- caption: 'Dashboard de información general de Gatling Enterprise: usuarios'
  image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
    (2) 1-2.png
  media_type: imagen
supported_os:
- linux
title: Gatling Enterprise
---
## Información general

Gatling Enterprise es una plataforma de tests de carga diseñada para ayudar a los equipos a validar la escalabilidad y el rendimiento de las aplicaciones en condiciones de tráfico reales.

Con la integración de Datadog, los equipos pueden investigar problemas de rendimiento correlacionando métricas de carga de tests como tiempos de respuesta, rendimiento y errores con datos de infraestructura rastreados en Datadog.

Gatling Enterprise envía métricas a Datadog, lo que permite a los equipos de ingeniería y SRE centralizar las perspectivas de rendimiento y mejorar la toma de decisiones en torno a la escalabilidad y la fiabilidad.

## Configuración

> Nota**: Esta integración está disponible para los clientes de Gatling Enterprise. Para obtener más información sobre Gatling Enterprise y empezar de forma gratuita, visita [gatling.io/products](https://gatling.io/products).

1. En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Gatling Enterprise y haz clic en **Install Integration** (Instalar integración).

1. En tu instalación del plano de control de Gatling, edita tu [archivo de configuración](https://docs.gatling.io/reference/install/cloud/private-locations/introduction/). En la sección `system-properties`, añade los parámetros siguientes. Sustituye YOUR_API_KEY por tu [clave de API de Datadog](https://docs.datadoghq.com/account_management/api-app-keys/) y utiliza el [sitio de Datadog](https://docs.datadoghq.com/getting_started/site/) correcto para tu organización:

```bash
control-plane {
  locations = [
    {
      id = "prl_example"
      # ... other configuration for your location
      system-properties {
        "gatling.enterprise.dd.api.key" = "YOUR_API_KEY" # Fill your API key here
        "gatling.enterprise.dd.site" = "datadoghq.com"  # Replace with your Datadog site
      }
    }
  ]
}
```

3. Despliega y reinicia tu plano de control

## Datos recopilados

La integración de Gatling Enterprise recopila todas las métricas de bases de datos, nodos y particiones.

### Métricas

| | |
| --- | --- |
| **gatling_enterprise.user.start_count** <br>(count) | Número de usuarios inyectados<br>_Se muestra como usuario_ |
| **gatling_enterprise.user.end_count** <br>(count) | Número de usuarios detenidos<br>_Se muestra como usuario_ |
| **gatling_enterprise.user.concurrent** <br>(count) | Número de usuarios concurrentes<br>_Se muestra como usuario_ |
| **gatling_enterprise.request.count** <br>(count) | Número de solicitudes<br>_Se muestra como solicitud_ |
| **gatling_enterprise.response.count** <br>(count) | Número de respuestas<br>_Se muestra como respuesta_ |
| **gatling_enterprise.response.response_time.max** <br>(gauge) | Tiempo máximo de respuesta<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.response_time.min** <br>(gauge) | Tiempo mínimo de respuesta<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.response_time.p95** <br>(gauge) | Tiempo de respuesta para los percentiles 95 (95 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.response_time.p99** <br>(gauge) | Tiempo de respuesta para los percentiles 99 (99 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.response_time.p999** <br>(gauge) | Tiempo de respuesta para los percentiles 99,9 (99,9 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.code** <br>(count) | Códigos de estado HTTP de la respuesta|
| **gatling_enterprise.request.bits** <br>(count) | Uso de ancho de banda saliente<br>_Se muestra como bit_ |
| **gatling_enterprise.response.bits** <br>(count) | Uso de ancho de banda entrante<br>_Se muestra como bit_ |
| **gatling_enterprise.request.tcp.open_count** <br>(count) | Número de solicitudes TCP abiertas<br>_Se muestra como solicitud_ |
| **gatling_enterprise.request.tcp.close_count** <br>(count) | Número de solicitudes TCP cerradas<br>_Se muestra como solicitud_ |
| **gatling_enterprise.response.tcp.count** <br>(count) | Número de solicitudes TCP<br>_Se muestra como solicitud_ |
| **gatling_enterprise.response.tls.count** <br>(count) | Número de respuestas TSL<br>_Se muestra como respuesta_ |
| **gatling_enterprise.response.tcp.connect_time.min** <br>(gauge) | Tiempo mínimo de conexión de respuesta TCP<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tcp.connect_time.max** <br>(gauge) | Tiempo máximo de conexión de respuesta TCP<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tcp.connect_time.p95** <br>(gauge) | Tiempo de conexión de la respuesta TCP para los percentiles 95 (95 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tcp.connect_time.p99** <br>(gauge) | Tiempo de conexión de la respuesta TCP para los percentiles 99 (99 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tcp.connect_time.p999** <br>(gauge) | Tiempo de conexión de la respuesta TCP para los percentiles 99,9 (99,9 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tls.handshake_time.min** <br>(gauge) | Tiempo mínimo de handshake de respuesta TLS<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tls.handshake_time.max** <br>(gauge) | Tiempo máximo de handshake de respuesta TLS<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tls.handshake_time.p95** <br>(gauge) | Tiempo de protocolo de respuesta TLS para los percentiles 95 (95 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tls.handshake_time.p99** <br>(gauge) | Tiempo de protocolo de respuesta TLS para los percentiles 99 (99 % de las solicitudes)<br>_Se muestra en milisegundos_ |
| **gatling_enterprise.response.tls.handshake_time.p999** <br>(gauge) | Tiempo de protocolo de respuesta TLS para los percentiles 99,9 (99,9 % de las solicitudes)<br>_Se muestra en milisegundos_ |

## Desinstalación

1. En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Gatling Enterprise y haz clic en **Uninstall Integration** (Desinstalar integración).

1. En tu instalación del plano de control de Gatling, edita tu [archivo de configuración](https://docs.gatling.io/reference/install/cloud/private-locations/introduction). En la sección `system-properties`, elimina las líneas que contienen `gatling.enterprise.dd`.

1. Despliega y reinicia tu plano de control.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Gatling Enterprise](https://gatlingcorp.atlassian.net/servicedesk/customer/portal/8).