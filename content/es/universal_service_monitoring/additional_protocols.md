---
further_reading:
- link: /universal_service_monitoring/
  tag: Documentación
  text: Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Señales clave en segundos con Universal Service Monitoring
is_beta: true
kind: documentación
private: true
title: Detección de servicios en la nube y protocolos adicionales
---

{{< callout url="https://docs.google.com/forms/d/1dYRQxWEAC3nFsv75tlG0hbiPXd899r36v5R2ar6hJLE/" >}}
  La detección de servicios en la nube y la compatibilidad con protocolos adicionales y métodos de cifrado de tráfico se encuentran en fase beta privada.
{{< /callout >}}

## Detección de servicios en la nube y APIs de terceros

Una vez concedido el acceso beta a tu organización de Datadog, Universal Service Monitoring detecta servicios en la nube, como AWS S3, y endpoints de API de terceros de los que depende tu aplicación mediante la observación de las solicitudes salientes enviadas a estos servicios. Puedes ver estos servicios en el Mapa de servicios para comprender las dependencias entre servicios y obtener métricas de estado, como el rendimiento, el recuento de errores y la latencia.

{{< img src="universal_service_monitoring/usm-beta-cloud-service-discovery.png" alt="Resumen del servicio, métricas y mapa de servicios para un servicio en la nube detectado por USM" style="width:100%;" >}}

Universal Service Monitoring puede detectar los siguientes endpoints de API de terceros: Jira, Slack, Auth0, Splunk, HubSpot, Intercom, Stripe, SendGrid, Braintree, Mapbox, Twitter (X), Palo Alto Networks, TowerData, SoundCloud, Amplitude, Render, Mixpanel, GitHub y OpenAI.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}