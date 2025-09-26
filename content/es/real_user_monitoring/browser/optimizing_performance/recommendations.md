---
further_reading:
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: Blog
  text: 'De los datos a acción: Optimiza Core Web Vitals y mucho más con Datadog RUM'
private: true
title: Recomendaciones del RUM
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-recommendations/" header="Join the Preview!">}}
  Recomendaciones del RUM está en vista previa.
{{< /callout >}}

## Información general

Las recomendaciones de RUM destacan las oportunidades para mejorar la disponibilidad, el rendimiento y la fiabilidad del frontend de tu aplicación. Cada vista de tu aplicación tiene su propio conjunto de recomendaciones, disponibles en la [Page (página) de optimización][2].

{{< img src="real_user_monitoring/browser/optimizing_performance/rum-recommendations-overview.mp4" alt="Revisar una recomendación de RUM con Bits AI para revisar una repetición de sesión y aliviar la frustración del usuario." video="true">}}

Las recomendaciones te permiten:
- **Detectar** un problema, como una solicitud HTTP lenta o un tiempo de carga inicial lento en la page (página).
- **Evaluar la prioridad** en función de la descripción del problema y del número de incidentes y usuarios afectados. 
- **Corregir** el problema con los cambios de código sugeridos

## Cómo funciona

Datadog analiza los datos de RUM y APM para generar recomendaciones que mejoren la disponibilidad, el rendimiento y la estabilidad del frontend de tu aplicación. Se calcula un indicador de gravedad para cada recomendación, destacando las áreas de mayor impacto en las que hay que centrarse. La gravedad de una recomendación está determinada por el número de eventos y usuarios afectados.

Una vez solucionada la recomendación, puedes marcarla como resuelta. Las recomendaciones se resuelven automáticamente si dejan de detectarse al desplegar una nueva versión de la aplicación.

## Tipos de recomendación

La siguiente tabla muestra los tipos de recomendaciones de RUM disponibles. Sólo se admiten aplicaciones que tengan instalado el SDK del navegador y utilicen [RUM sin límites][1]. 

| Tipo de recomendación | Descripción |
|---------------------|-------------|
| Señal de frustración en el elemento page (página)  | Los usuarios hacen clic en un elemento estático que no produce ninguna acción en la page (página). |
| Mejora el tiempo de carga inicial de la page (página) reduciendo el tamaño de los paquetes. | Un gran paquete de JavaScript está afectando a la carga inicial y a la pintura de la page (página). |


[1]: /es/real_user_monitoring/rum_without_limits/
[2]: https://app.datadoghq.com/rum/optimization