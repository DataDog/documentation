---
algolia:
  tags:
  - Logs de RUM
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilitar la resolución de problemas a través de la correlación entre productos
title: Conectar RUM y logs
---

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Logs de navegador en una acción de RUM" style="width:100%;" >}}

## Información general

La integración de RUM con logs te permite tener una visibilidad total del estado de tu aplicación.

Utiliza los datos de frontend de RUM, así como la información de backend, infraestructura y logs para localizar problemas en cualquier punto de tu stack tecnológico y comprender lo que experimentan tus usuarios.

Para empezar a enviar eventos de RUM a Datadog, consulta [Real User Monitoring][1].

## ¿Cuál es la correlación entre RUM y logs?

Los logs y eventos de RUM se correlacionan automáticamente. Correlacionar tus logs con RUM también facilita [una estrategia de muestreo agresiva sin perder la coherencia a nivel de entidad][2] con el uso de atributos como `session_id` y `view.id`.

Para más información, consulta [Facturación de RUM & Session Replay][3]. 
Para garantizar una correlación adecuada para **Browser Logs** (Logs de navegador), debes [hacer coincidir las configuraciones entre el SDK del navegador RUM y el SDK de logs][4].

## Instrucciones de instalación

Para acceder a las páginas de configuración de logs, sigue los enlaces a continuación en función de tu plataforma:

{{< partial name="rum/rum-correlate-rum-and-logs.html" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/logs/guide/ease-troubleshooting-with-cross-product-correlation/#correlate-frontend-products
[3]: /es/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[4]: /es/logs/log_collection/javascript/#initialization-parameters