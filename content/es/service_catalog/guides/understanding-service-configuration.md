---
aliases:
- /es/tracing/service_catalog/guides/understanding-service-configuration
further_reading:
- link: /tracing/service_catalog/
  tag: Documentación
  text: Catálogo de servicios de Datadog
title: Comprender tu configuración de servicio
---

Seguir las prácticas recomendadas de monitorización, como el rastreo, el registro y la creación de perfiles de código, te ayuda a asegurar que dispones de todos los datos que necesitas durante el análisis de incidencias. El Catálogo de servicios proporciona checks automáticos para estas configuraciones recomendadas. Te ayuda a detectar cualquier brecha en la monitorización y a conectar todos los datos disponibles para un servicio.

Para ver cuán completa está la configuración de un servicio, haz clic en el servicio en el [Catálogo de servicios][1]. En la página de detalles del servicio, haz clic en **Service Info** (Información del servicio) en la parte superior derecha.

En esta página, puedes ver la propiedad, PagerDuty e información sobre enlaces relacionados que has especificado para el servicio en su [definición del servicio][2].

También puedes encontrar qué características de Datadog estás utilizando activamente para un determinado servicio, para ayudar a encontrar y cerrar brechas al realizar la monitorización.

{{< img src="tracing/service_catalog/svc_cat_completeness1.png" alt="Página de configuración del servicio que muestra la finalización de la configuración." >}}

Esta tabla no muestra necesariamente la facturación para productos individuales, sino la actividad para el servicio que estás examinando actualmente. Por ejemplo, si el servicio no emite métricas de infraestructura durante mucho tiempo, `Infrastructure Monitoring` podría tener `Not Enabled` especificado, incluso si tienes hosts o contenedores ejecutando la monitorización de infraestructura.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/tracing/service_catalog/service_definition_api/