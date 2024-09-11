---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
title: Panel lateral de eventos
---

## Información general

El Explorador Real User Monitoring (RUM) muestra eventos individuales que incluyen este formato de panel lateral:

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Gráfico de rendimiento de la aplicación y Core Web Vitals en la pestaña Rendimiento" width="80%" >}}

En la parte superior se ofrece información de contexto general. Desplázate hasta la cascada para ver el contenido real del evento. 

El contexto sobre tus usuarios y sus aplicaciones, incluidos el sistema operativo, el país, la versión del código, etc., se capturan cuando se genera el evento. El contexto también se refiere al propio evento, que incluye información específica del tipo de evento. Por ejemplo, el panel lateral de eventos muestra la ruta de visualización, mientras que el panel lateral **Errores** muestra el mensaje de error.

## Panel lateral de eventos

Para abrir el panel lateral de eventos en el [Explorador RUM][1], haz clic en el tipo de visualización **Lista**, en una fila de la tabla.

El panel lateral de eventos muestra toda la información relativa a un evento RUM. La cascada muestra los recursos relacionados, los errores, las vistas, las acciones y tus eventos que causan errores o experimentan tiempos de carga excesivos en un formato de línea de tiempo (minimapa de vistas). 

También puedes arrastrar y soltar los selectores de tiempo en la cascada para hacer zoom en un tramo (span) de tiempo y centrarse en los eventos de interés.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-1.mp4" alt="Temporizadores de eventos y Mobile Vitals" video="true" width="80%" >}}

## Atributos

RUM recopila información contextual por defecto. También puedes añadir atributos de contexto adicionales con la [API de contexto global][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Pestaña Atributos" width="80%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context