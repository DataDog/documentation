---
further_reading:
- link: /network_monitoring/devices/
  tag: Documentación
  text: Network Device Monitoring
- link: /network_monitoring/devices/topology
  tag: Documentación
  text: Mapas de dispositivos
- link: /network_monitoring/devices/config_management
  tag: Documentación
  text: Gestión de configuración
title: Página de resumen
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-summary-page/" header="¡Únase a la vista previa!">}}
La página de resumen de NDM está en vista previa.
{{< /callout >}}

## Descripción general {#overview}

La **página de resumen** de Network Device Monitoring (NDM) ofrece a los ingenieros de red una vista única del estado de los dispositivos y las interfaces, los problemas activos y los cambios de configuración recientes. Úsela como punto de partida para evaluar el estado de su red e investigar problemas.

**Nota**: Para usar la página de resumen, [Network Device Monitoring][1] debe estar configurado y recopilando métricas de al menos un dispositivo monitoreado por SNMP. Para obtener instrucciones de configuración, consulte [Setup][2].

{{< img src="network_device_monitoring/summary/summary_page.png" alt="La página de resumen de NDM, que muestra la salud de la red, la salud de la interfaz y del dispositivo, el tráfico y los cambios recientes." style="width:100%;" >}}

## Uso de la página de resumen {#using-the-summary-page}

La página de resumen está organizada en secciones que cubren cada una un aspecto diferente del estado y la actividad de su red. Tres de esas secciones (**Salud de la red**, **Salud de la interfaz** y **Salud del dispositivo**) también informan un estado de salud para resumir lo que están rastreando:

| Estado | Significado |
|-------|---------|
| Bueno | Todas las métricas muestreadas están dentro de los umbrales saludables. |
| Degradado | Algunas métricas han cruzado los umbrales de advertencia. |
| Deficiente | Se han cruzado umbrales críticos en múltiples dispositivos o interfaces. |
| Desconocido | No hay suficientes datos disponibles para evaluar la salud. |

Para personalizar su vista, utilice la barra de filtros para delimitar el contexto de la página por etiqueta de dispositivo (por ejemplo, `device_namespace`, `device_vendor`, `device_type` o `geolocation`). El rango de tiempo predeterminado es {{< ui >}}Past 2 Hours{{< /ui >}}.

### Estado de la red {#network-health}

La sección {{< ui >}}Network health{{< /ui >}} resume el estado general de su red.

{{< img src="network_device_monitoring/summary/network_health.png" alt="La sección Estado de la red muestra un resumen de Bits AI a la izquierda y una vista de topología con nodos codificados por estado a la derecha." style="width:100%;" >}}

Un resumen de Bits AI explica el estado actual de su red. Destaca los dispositivos afectados, las interfaces y cualquier cambio de configuración reciente que pueda correlacionarse con el comportamiento observado. Haga clic en {{< ui >}}Chat with Bits Assistant{{< /ui >}} para hacer preguntas de seguimiento.

También puede consultar datos de dispositivos e interfaces desde un agente de IA, como Claude Code o Cursor, con las herramientas `search_ndm_devices`, `get_ndm_device` y `search_ndm_interfaces` en el [Datadog MCP Server][12].

Debajo del resumen, un panel de estado muestra el recuento total de dispositivos desglosado por estado, la cantidad de alertas y advertencias de seguimiento activas, y la cantidad de problemas activos. Haga clic en {{< ui >}}View Health{{< /ui >}} para abrir la vista de [Device Health][5].

### Estado de la interfaz {#interface-health}

La sección {{< ui >}}Interface health{{< /ui >}} clasifica las interfaces principales que operan fuera de los umbrales saludables. Para cada interfaz, la página informa la tasa de errores, la tasa de descartes y la utilización del ancho de banda de entrada y salida como un porcentaje de la velocidad de interfaz configurada.

{{< img src="network_device_monitoring/summary/interface-performance.png" alt="La sección Estado de la interfaz muestra un resumen de Bits AI, una tabla de las interfaces principales con columnas de errores, descartes y ancho de banda, y tarjetas de estado agregado para la utilización del ancho de banda, errores y descartes." style="width:100%;" >}}

Un resumen de Bits AI destaca patrones en las interfaces afectadas, como múltiples interfaces saturadas en el mismo sitio o picos de error correlacionados después de un cambio de configuración.

Tres tarjetas debajo de la lista muestran el estado agregado para la flota: [{{< ui >}}Bandwidth utilization{{< /ui >}}][6], [{{< ui >}}Errors{{< /ui >}}][7] y [{{< ui >}}Discards{{< /ui >}}][8]. Haga clic en una tarjeta para ver la lista completa de interfaces afectadas con valores promedio, mínimos y máximos. Las vistas detalladas de Errores y Descartes también incluyen un botón {{< ui >}}Ask Bits{{< /ui >}} para la investigación asistida por IA.

{{< img src="network_device_monitoring/summary/errors-detail.png" alt="La vista detallada de Errores muestra gráficos de tasa de errores de entrada y salida, un resumen de Bits AI y una tabla de interfaces con tasa de errores y recuentos de paquetes." style="width:100%;" >}}

Haga clic en cualquier interfaz para abrir el panel lateral del dispositivo, que incluye detalles como el estado de la interfaz, métricas, configuración y eventos recientes. Desde el panel lateral, haga clic en {{< ui >}}Open Device Page{{< /ui >}} en la esquina superior derecha para abrir la página del dispositivo, donde puede investigar el dispositivo con mayor profundidad.

{{< img src="network_device_monitoring/summary/interface-side-panel.png" alt="El panel lateral del dispositivo abierto en la pestaña Interfaces, que muestra el estado de la interfaz, el ancho de banda y los datos de seguimiento." style="width:100%;" >}}

**Umbrales de salud de la interfaz**

Los siguientes umbrales determinan el estado de salud de una interfaz:

| Señal | Advertencia | Crítico |
|--------|------|----------|
| Ancho de banda entrada/salida | 80% | 90% |
| Errores entrada/salida | 0.10% | 5% |
| Descartes entrada/salida | 0.10% | 5% |

### Estado del dispositivo {#device-health}

La sección {{< ui >}}Device health{{< /ui >}} clasifica los principales dispositivos que funcionan fuera de los umbrales de salud. Para cada dispositivo, la página informa sobre la salud de la CPU, la memoria y el ventilador, junto con cualquier cambio de configuración registrado en el intervalo de tiempo seleccionado. De forma predeterminada, los dispositivos se ordenan por {{< ui >}}CPU{{< /ui >}}. Ordene por {{< ui >}}Memory{{< /ui >}} para mostrar los dispositivos bajo presión de memoria.

{{< img src="network_device_monitoring/summary/device-perf.png" alt="La sección de salud del dispositivo muestra un resumen de Bits AI, una tabla de los principales dispositivos con columnas de CPU y memoria, y tarjetas de salud agregadas en la parte inferior." style="width:100%;" >}}

Un resumen de Bits AI explica el estado actual de salud del dispositivo y señala cambios recientes o anomalías que pueden haber contribuido.

Dos tarjetas debajo de la lista muestran la salud agregada: [{{< ui >}}CPU{{< /ui >}}][9] y [{{< ui >}}Memory{{< /ui >}}][10]. Haga clic en una tarjeta para ver la lista completa de dispositivos afectados con datos de tendencia mínimos, máximos y de las últimas 24 horas.

Haga clic en cualquier dispositivo para abrir el panel lateral del dispositivo, que incluye detalles como el estado del dispositivo, métricas, configuración y eventos recientes. Desde el panel lateral, haga clic en {{< ui >}}Open Device Page{{< /ui >}} en la esquina superior derecha para investigar el dispositivo con mayor profundidad.

{{< img src="network_device_monitoring/summary/device-side-panel.png" alt="El panel lateral del dispositivo abierto en la pestaña Device Summary, que muestra los monitores activados, las etiquetas del dispositivo y el estado de la interfaz." style="width:100%;" >}}

**Umbrales de salud del dispositivo**

Los siguientes umbrales determinan el estado de salud de un dispositivo:

| Señal | Advertencia | Crítico |
|--------|------|----------|
| CPU | 80% | 90% |
| Memoria | 85% | 95% |

### Tráfico {#traffic}

La sección {{< ui >}}Traffic{{< /ui >}} utiliza datos de [NetFlow][3] para visualizar el volumen de tráfico entre orígenes y destinos como un diagrama de Sankey, delimitado al contexto de su filtro y rango de tiempo actuales. Haga clic en {{< ui >}}View NetFlow{{< /ui >}} para explorar los datos de flujo en detalle.

{{< img src="network_device_monitoring/summary/traffic-panel.png" alt="La sección Tráfico que muestra un diagrama de Sankey de los 25 flujos principales por volumen, con IPs de fuente, nombres de interfaz, nombres de dispositivo e IPs de destino." style="width:100%;" >}}

### Cambios {#changes}

La sección {{< ui >}}Changes{{< /ui >}} lista los cambios de configuración recientes de dispositivos de red de [Configuration Management][4]. Cada entrada muestra el dispositivo afectado, un resumen de lo que cambió y una marca de tiempo.

{{< img src="network_device_monitoring/summary/changes-panel.png" alt="La sección Cambios que enumera los cambios de configuración recientes por dispositivo con un resumen y una marca de tiempo para cada uno." style="width:100%;" >}}

Haga clic en [{{< ui >}}View all changes{{< /ui >}}][11] para abrir la vista completa de Cambios. Los filtros y el rango de tiempo se comparten entre las dos vistas. Haga clic en cualquier fila para abrir el panel lateral del dispositivo con detalles sobre el cambio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/devices/
[2]: /es/network_monitoring/devices/setup
[3]: /es/network_monitoring/netflow/
[4]: /es/network_monitoring/devices/config_management
[5]: /es/network_monitoring/devices/device_health
[6]: https://app.datadoghq.com/devices/summary/interface-bandwidth
[7]: https://app.datadoghq.com/devices/summary/interface-errors
[8]: https://app.datadoghq.com/devices/summary/interface-discards
[9]: https://app.datadoghq.com/devices/summary/device-cpu
[10]: https://app.datadoghq.com/devices/summary/device-memory
[11]: https://app.datadoghq.com/devices/summary/changes
[12]: /es/mcp_server/tools/#networks