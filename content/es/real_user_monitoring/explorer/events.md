---
description: Ve información detallada sobre eventos RUM individuales, incluidos el
  contexto, las cascadas y los datos de rendimiento en el panel lateral.
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Buscar tus eventos
title: Panel lateral de eventos
---

## Información general

El Real User Monitoring (RUM) Explorer muestra eventos individuales en un panel lateral. Para abrir el panel lateral de eventos en el [RUM Explorer][1], haz clic en una fila de la tabla en el tipo de visualización **List** (Lista).

Utiliza el encabezado del panel lateral para ver información contextual sobre tus usuarios (entorno, país) y detalles específicos del evento como la ruta de visualización y el tipo de carga. Para las ejecuciones de tests de Synthetic Monitoring, haz clic en el ID de test para ver el resultado.

La visualización de la distribución en la parte superior te ayuda a entender si la vista actual está cerca de la mediana o es un valor atípico. Utiliza el menú desplegable para cambiar entre {{< tooltip text="Tiempo de carga" tooltip="Tiempo hasta que la página está lista y no sucede ninguna solicitud de red o mutación DOM. Las aplicaciones móviles tienen un tiempo de carga diferente, informado de forma manual. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Más información</a>" >}}, o signos vitales móviles y web como {{< tooltip text="Tiempo hasta el primer byte" tooltip="Tiempo que pasa hasta que se recibe el primer byte de la vista. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Más información</a>" >}}, {{< tooltip text="FCP" tooltip="Primera imagen con contenido: tiempo hasta que el navegador renderiza por primera vez texto, imagen o SVG. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="LCP" tooltip="Imagen más grande con contenido: tiempo hasta que se renderiza el objeto DOM más grande en el puerto de la vista. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="CLS" tooltip="Cambio acumulativo del diseño: cuantifica movimientos inesperados de la página causados por contenido cargado dinámicamente. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="INP" tooltip="Interacción hasta la próxima imagen: duración más larga entre la interacción de un usuario y la próxima imagen. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, Frecuencia de actualización y Promedio de memoria. Ajusta el intervalo de tiempo para ver los datos por día, semana o mes.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="Panel lateral del RUM Explorer que muestra la visualización de la distribución, cronología de la cascada y opciones de filtro" width="100%" >}}

Haz clic en cualquier pestaña para ver los detalles correspondientes e investigar aspectos concretos del evento. Consulta la lista completa en [Pestañas adicionales](#additional-tabs).

## Pestaña Cascada

La pestaña **Cascada** muestra una línea de tiempo interactiva de los eventos asociados a esta vista. Las superposiciones muestran marcadores clave de rendimiento, como [Core Web Vitals][3] o los tiempos móviles, con indicadores de éxito o fallo.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="Interacción con la línea de tiempo de la cascada en la pestaña Cascada" video="true" width="80%" >}}

### Filtrar la cascada

Controla qué eventos aparecen en la cascada:

- **Por ruta crítica**: haz clic en el conmutador **Critical Events** (Eventos críticos) para ver solo los eventos que afectan directamente a tus plazos clave de rendimiento.
- **Por atributo**: utiliza los botones de filtro situados encima de la cascada. Haz clic en un filtro para acceder a opciones adicionales como la URL del recurso, el nombre de acción, el mensaje de error, etc.
- **Por intervalo de tiempo**: arrastra los selectores de tiempo en el minimapa, o expande la barra lateral izquierda y haz clic en una temporización para filtrar a eventos anteriores a ese punto.

La barra lateral izquierda muestra los tiempos clave, incluidos los tiempos personalizados de la [API addTiming][4].

### Inspección de eventos

Pasa el ratón por encima de cualquier evento de la cascada para ver su marca de tiempo, duración y factores contribuyentes (secuencias de comandos, estilo/diseño u otro procesamiento). Pasa el ratón por encima de un Core Web Vital para ver su definición, umbral y comparación con tu p75.

{{< img src="real_user_monitoring/Explorer/events/specific-times-1.png" alt="Menú emergente de Tiempo de carga que muestra detalles de rendimiento, indicadores de umbral y comparación con el rendimiento p75" width="100%" >}}

### Telemetría conectada

Haz clic en los eventos de la cascada para acceder a los datos relacionados:

- **Recursos**: ve trazas de backend conectadas.
- **Frames de animación largos**: accede a los perfiles asociados para analizar el rendimiento.

## Pestañas adicionales

Utiliza las otras pestañas para explorar datos relacionados:

Reproducir
: ve una repetición visual de la sesión del usuario.

Errores
: ve los errores asociados con el evento.

Recursos
: inspecciona todos los recursos cargados durante el evento.

Trazas
: ve las trazas de backend conectadas al evento.

Indicadores de características
: muestra los indicadores evaluados durante el evento.

Acciones
: revisa las acciones del usuario capturadas durante la sesión.

Logs
: accede a los logs asociados al evento.

Atributos
: ve los atributos de contexto recopilados. Añade atributos personalizados con la [API Global Context][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings