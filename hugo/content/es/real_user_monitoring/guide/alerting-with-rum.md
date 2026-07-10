---
description: Guía para la creación de alertas en eventos RUM.
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentación
  text: Dashboards RUM
- link: /monitors/create/types/real_user_monitoring/
  tag: Documentación
  text: Monitor RUM
- link: /monitors/
  tag: Documentación
  text: Alertas
title: Alertas con datos RUM
---

## Información general

Real User Monitoring te permite crear alertas que te notifiquen sobre comportamientos atípicos en tus aplicaciones. Puedes crear monitores RUM con condiciones complejas, umbrales predefinidos y múltiples consultas para calcular medias, relaciones y métricas de indicadores de rendimiento (como Apdex).

## Definición de tu consulta de búsqueda

Para crear un monitor RUM, consulta primero la [documentación del Monitor RUM][1]. Puedes añadir una o varias consultas para filtrar tus datos RUM en el [Explorador RUM][2]. En cada consulta, puedes delimitar el contexto a nivel de aplicación o a un nivel más específico, como una página concreta.

Puedes utilizar cualquier faceta que RUM recopile, incluidas [facetas y medidas personalizadas][3]. Utiliza el campo `measure by` para medir los recuentos relacionados con vistas, como el tiempo de carga, el tiempo empleado y el recuento de errores.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-rum-views-errors.png" alt="Buscar la consulta de una alerta en que una vista presenta más de ocho errores" style="width:100%;">}}

El ejemplo anterior es una consulta de búsqueda de un monitor RUM configurado para vistas en la aplicación iOS Shopist con facetas como `Application ID` y `View Path`. Este ejemplo de monitor alerta cuando una vista tiene una gran cantidad de errores (por ejemplo, más de 8).

## Exportar tu consulta a un monitor

Puedes exportar las consultas de búsqueda desde el [Explorador RUM][2] al monitor para conservar todo el contexto de la consulta.

{{< img src="real_user_monitoring/guide/alerting-with-rum/export-to-monitor-3.mp4" alt="Botón Exportar en la esquina derecha del Explorador RUM" video="true" style="width:100%;" >}}

El ejemplo anterior es una consulta de búsqueda de un monitor RUM configurado para imágenes de más de 1Mb. Las imágenes grandes pueden reducir el rendimiento de tu aplicación. 

Haz clic en el botón **Exportar** para exportar tu consulta de búsqueda a un monitor RUM preconfigurado. Para obtener más información, consulta [Exportar eventos y gráficos RUM][4].

## Dirigir tu alerta

Una vez creada una alerta, dirígela a un canal individual o de equipo, escribiendo un mensaje y enviando una notificación de prueba. Para obtener más información, consulta [Notificaciones][5].

## Ejemplos de alerta

Los siguientes ejemplos muestran casos de uso de alertas con tus datos RUM.

### Reducciones de ingresos

Con el [contexto global][6] de RUM, puedes enriquecer tus eventos RUM con atributos específicos de la empresa, como el importe de las compras de cada usuario.

Suponiendo que la mayoría de los usuarios de la aplicación de ejemplo gastan entre 800 y 1000 dólares, este ejemplo muestra un monitor RUM configurado para detectar desviaciones en los patrones de gasto de los usuarios semana a semana. 

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-monitor.png" alt="Monitor RUM para reducciones de ingresos" style="width:100%;" >}}

Para comparar el gasto de esta semana con el de la semana pasada, añade una función como `week_before` junto al campo `roll up every`. También puedes aplicar el valor absoluto para calcular la diferencia en el importe de compra desde la semana pasada hasta la actual. Cuando la diferencia de una semana a otra supera los 50 dólares, la alerta envía una notificación.

{{< img src="real_user_monitoring/guide/alerting-with-rum/revenue-dips-example-alerting-conditions.png" alt="Condiciones de alerta de un monitor RUM para reducciones de ingresos" style="width:100%;" >}}

### Tasas de errores

La relación entre errores y solicitudes permite calcular qué porcentaje de solicitudes da lugar a errores.

Este ejemplo muestra un monitor RUM para la tasa de error de la página `/cart` en una aplicación Shopist de ejemplo.

{{< img src="real_user_monitoring/guide/alerting-with-rum/error-rate-example-monitor.png" alt="Monitor RUM para tasas de error" style="width:100%;" >}}

### Aspectos esenciales del rendimiento

Real User Monitoring mide, calcula y puntúa el rendimiento de las aplicaciones como [Core Web Vitals][7] y [Mobile Vitals][8]. Por ejemplo, la métrica Largest Contentful Paint (LCP) mide el rendimiento de la carga y su valor de referencia es de 2,5 segundos cuando la página empieza a cargarse.

Este ejemplo muestra un monitor RUM para la métrica LCP de la página `/cart` en una aplicación Shopist de ejemplo.

{{< img src="real_user_monitoring/guide/alerting-with-rum/high-largest-contentful-paint-example-monitor.png" alt="Monitor RUM monitor para una métrica Largest Contentful Paint elevada" style="width:100%;" >}}

Este ejemplo de monitor advierte cuando la métrica LCP tarda 2 segundos en cargarse y alerta cuando tarda más de 2,5 segundos en cargarse.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/real_user_monitoring/#create-a-rum-monitor
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/real_user_monitoring/guide/send-rum-custom-actions/#create-facets-and-measures-on-attributes
[4]: /es/real_user_monitoring/explorer/export/
[5]: /es/monitors/notify/
[6]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[7]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[8]: /es/real_user_monitoring/android/mobile_vitals/