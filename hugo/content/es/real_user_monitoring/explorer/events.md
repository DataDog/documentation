---
description: Vea información detallada sobre eventos de RUM individuales, incluyendo
  contexto, cascadas, series temporales de rendimiento y datos de rendimiento en el
  panel lateral.
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Busque sus eventos
- link: /real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries
  tag: Documentación
  text: Métricas vitales móviles y series temporales de rendimiento
title: Panel lateral de eventos
---
## Descripción general {#overview}

El Real User Monitoring (RUM) Explorer muestra eventos individuales en un panel lateral. Para abrir el panel lateral de eventos en el [RUM Explorer][1], haga clic en una fila de la tabla en el tipo de visualización {{< ui >}}List{{< /ui >}}.

Use el encabezado del panel lateral para ver información contextual sobre sus usuarios (entorno, país) y detalles específicos del evento como la ruta de la vista y el tipo de carga. Para ejecuciones de prueba Synthetic, haga clic en el ID de la prueba para ver el resultado.

La visualización de distribución en la parte superior le ayuda a entender si la vista actual está cerca de la mediana o es un valor anómalo. Use el menú desplegable para cambiar entre {{< tooltip text="Loading Time" tooltip="Tiempo hasta que la página está lista y no ocurre ninguna solicitud de red ni mutación del DOM. Las aplicaciones móviles tienen un tiempo de carga diferente, reportado manualmente. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Más información</a>" >}}, o métricas vitales web y móviles como {{< tooltip text="Time To First Byte" tooltip="Tiempo transcurrido hasta que se ha recibido el primer byte de la vista. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Más información</a>" >}}, {{< tooltip text="FCP" tooltip="First Contentful Paint: Tiempo en el que el navegador renderiza por primera vez cualquier texto, imagen o SVG. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="LCP" tooltip="Largest Contentful Paint: Tiempo en el que se renderiza el objeto DOM más grande en el viewport. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="CLS" tooltip="Cumulative Layout Shift: Cuantifica el movimiento inesperado de la página debido a contenido cargado dinámicamente. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, {{< tooltip text="INP" tooltip="Interaction to Next Paint: Duración más larga entre la interacción de un usuario y el siguiente renderizado. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Más información</a>" >}}, frecuencia de actualización y promedio de memoria. Ajuste el rango de tiempo para ver los datos por día, semana o mes.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="Panel lateral de RUM Explorer que muestra la visualización de distribución, la línea de tiempo de cascada y las opciones de filtro" width="100%" >}}

Haga clic en cualquier pestaña para ver sus detalles correspondientes e investigar aspectos específicos del evento. Consulte [Pestañas adicionales](#additional-tabs) para obtener una lista completa.

## Navegue entre sesiones de usuario {#navigate-between-user-sessions}

Cuando `@usr.id` está configurado en el SDK de RUM y filtra el RUM Explorer por un valor de `@usr.id` específico, aparecen los botones {{< ui >}}Previous{{< /ui >}} y {{< ui >}}Next{{< /ui >}} en el panel lateral de la sesión. Use estos botones para navegar entre las sesiones de ese usuario sin regresar a la lista de RUM Explorer.

Solo las sesiones retenidas por [filtros de retención][5] aparecen en la navegación. Las sesiones no retenidas se omiten. Por ejemplo, si un usuario tuvo tres sesiones y solo se retuvieron la primera y la tercera, los botones se desplazan directamente entre esas dos sin indicación de que ocurrió una sesión en medio.

Para configurar `@usr.id`, consulte [Configuración avanzada][6].

{{< img src="real_user_monitoring/explorer/events/rum-explorer-session-continuity.png" alt="Panel lateral de sesión de RUM Explorer con los botones de navegación Anterior y Siguiente resaltados, que muestran un tooltip con la pantalla de inicio de sesión y el motivo de finalización." style="width:100%;" >}}

## Pestaña Waterfall{#waterfall-tab}

La pestaña {{< ui >}}Waterfall{{< /ui >}} muestra una línea de tiempo interactiva de los eventos asociados con esta vista. Las superposiciones muestran marcadores de rendimiento clave, incluidos [Core Web Vitals][3] o tiempos móviles, con indicadores de aprobado o reprobado.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="Interacción con la línea de tiempo de cascada en la pestaña Waterfall" video="true" width="80%" >}}

### Filtrado de la cascada{#filtering-the-waterfall}

Controle qué eventos aparecen en la cascada:

- **Por ruta crítica**: Haga clic en el interruptor {{< ui >}}Critical Events{{< /ui >}} para ver solo los eventos que afectan directamente sus tiempos de rendimiento clave.
- **Por atributo**: Use los botones de filtro sobre la cascada. Haga clic en un filtro para acceder a opciones adicionales como la URL del recurso, el nombre de la acción, el mensaje de error y más.
- **Por rango de tiempo**: Arrastre los selectores de tiempo en el minimapa, o expanda la barra lateral izquierda y haga clic en un tiempo para filtrar los eventos anteriores a ese punto.

La barra lateral izquierda revela tiempos clave, incluidos los tiempos personalizados de la [API addTiming][4].

### Inspección de eventos {#inspecting-events}

Pase el cursor sobre cualquier evento en la cascada para ver su marca de tiempo, duración y factores contribuyentes (scripts, estilo/diseño u otro procesamiento). Pase el cursor sobre un Core Web Vital para ver su definición, umbral y cómo se compara con su p75.

{{< img src="real_user_monitoring/explorer/events/specific-times-1.png" alt="Ventana emergente de tiempo de carga que muestra detalles de rendimiento, indicadores de umbral y comparación con el rendimiento de p75" width="100%" >}}

### Telemetría conectada {#connected-telemetry}

Haga clic en los eventos en la cascada para acceder a los datos relacionados:

- {{< ui >}}Resources{{< /ui >}}: Vea los seguimientos de backend conectados.
- {{< ui >}}Long Animation Frames{{< /ui >}}: Acceda a los perfiles asociados para el análisis de rendimiento.

## Series temporales de rendimiento {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Las series temporales de rendimiento están en versión preliminar y la recopilación está desactivada de forma predeterminada. Para habilitarlas, únase a la versión preliminar. Datadog envía instrucciones de configuración a los clientes participantes.
{{< /callout >}}

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="La sección de series temporales de rendimiento de un panel lateral de RUM, que muestra un gráfico interactivo de Memoria y CPU durante la duración de una sesión" style="width:100%;" >}}

Para las sesiones de los SDK de iOS y Android, la sección {{< ui >}}Performance Timeseries{{< /ui >}} muestra un gráfico {{< ui >}}Memory & CPU{{< /ui >}} del uso de recursos de su aplicación, capturado cada segundo durante la sesión. Está disponible en los paneles laterales de sesión, vista y operación.

El gráfico cubre la sesión completa. Cuando lo abre desde una vista o una operación, los marcadores muestran dónde comienza y termina esa vista u operación, para que pueda leer su uso de recursos en comparación con todo lo que se ejecutó a su alrededor. Los períodos en los que la aplicación estuvo en segundo plano aparecen sombreados.

Para saber qué mide cada serie, consulte [Mobile Vitals][7].

## Pestañas adicionales {#additional-tabs}

Utilice las otras pestañas para explorar datos relacionados:

{{< ui >}}Replay{{< /ui >}}
: Vea una reproducción visual de la sesión del usuario.

{{< ui >}}Errors{{< /ui >}}
: Visualizar errores asociados con el evento.

{{< ui >}}Resources{{< /ui >}}
: Inspeccione todos los recursos cargados durante el evento.

{{< ui >}}Traces{{< /ui >}}
: Visualizar seguimientos de backend conectados al evento.

{{< ui >}}Feature Flags{{< /ui >}}
: Visualizar banderas de funciones evaluadas durante el evento.

{{< ui >}}Actions{{< /ui >}}
: Revise las acciones del usuario capturadas durante la sesión.

{{< ui >}}Logs{{< /ui >}}
: Acceda a los registros asociados con el evento.

{{< ui >}}Attributes{{< /ui >}}
: Visualizar los atributos de contexto recopilados. Agregue atributos personalizados con la [Global Context API][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings
[5]: /es/real_user_monitoring/rum_without_limits/retention_filters
[6]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[7]: /es/real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries