---
description: Detecte problemas en dispositivos de red y corrélalos con cambios de
  configuración en NDM.
further_reading:
- link: /network_monitoring/devices/config_management
  tag: Documentación
  text: Network Configuration Management
- link: /bits_ai/bits_investigation/
  tag: Documentación
  text: Bits Investigation
- link: /network_monitoring/devices/troubleshooting
  tag: Documentación
  text: Solución de problemas de NDM
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: Blog
  text: Resuelva problemas de red de L7 a L1 con Datadog
title: Device Health
---
{{< callout url="https://www.datadoghq.com/product-preview/network-device-remediation-with-bits/" btn_hidden="false" header="Device Health is in Preview está en versión preliminar">}}
{{< /callout >}}

## Resumen {#overview}

[Device Health][1] muestra problemas de dispositivos de red en toda su infraestructura y le ayuda a correlacionarlos con cambios de configuración. Utilice Device Health para:

- Identifique dispositivos degradados y métricas afectadas en toda su flota
- Correlacione anomalías de métricas con cambios de configuración en una línea de tiempo compartida
- Inicie [Bits Investigation][2] para determinar las causas raíz
- Tome medidas revirtiendo cambios de configuración directamente desde el flujo de investigación

Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Devices{{< /ui >}} > {{< ui >}}Health{{< /ui >}}][1] para obtener una vista de todos los problemas de dispositivos en toda la flota. Para ver los problemas activos de un dispositivo específico, selecciónelo de la lista [Devices][3] o de cualquier visualización de NDM para abrir los problemas activos en el panel lateral del dispositivo.

## Investigue un problema {#investigate-an-issue}

Seleccione un problema para abrir el panel de problemas, el cual muestra:

- Un resumen en lenguaje sencillo de lo que sucedió
- Un gráfico de la métrica afectada que muestra cuándo comenzó el problema y su gravedad
- Una superposición de línea de tiempo que muestra cuándo ocurrieron los cambios de configuración en el dispositivo, para que pueda correlacionar anomalías de métricas con cambios específicos

{{< img src="network_device_monitoring/health/investigate-issue.png" alt="Un problema de estado del dispositivo que muestra una caída en la utilización del ancho de banda en la interfaz ge0/0, con un resumen de la causa raíz, un gráfico de series temporales con marcadores de cambio de configuración y un botón para investigar más a fondo con Bits Investigation." style="width:100%;" >}}

### Inicie una Bits Investigation {#launch-a-bits-investigation}

Desde un problema seleccionado, puede activar una [Bits Investigation][2]. Bits Investigation analiza el problema y proporciona:

- Un resumen paso a paso de la investigación y sus hallazgos
- Análisis de la causa raíz en lenguaje sencillo

Para iniciar una Bits Investigation, haga clic en {{< ui >}}Investigate further with Bits{{< /ui >}}. Haga clic en {{< ui >}}View full investigation{{< /ui >}} para abrir la investigación completa en una nueva pestaña. Para obtener más información, consulte [Bits Investigation][2].

### Aplicar una solución propuesta {#apply-a-proposed-fix}

Tome medidas directamente desde el panel de problemas aplicando la solución propuesta (como revertir la configuración a la última versión confiable). Vea una diferencia del cambio de configuración exacto que se aplicará.

{{< img src="network_device_monitoring/health/proposed-fix.png" alt="Un panel de solución propuesta que muestra una reversión a una versión de configuración anterior, con un botón Apply Fix y una comparación lado a lado de la configuración actual en ejecución y la solución sugerida." style="width:100%;" >}}

### Visualizar dispositivos y dependencias afectados {#view-impacted-devices-and-dependencies}

El panel de problemas también muestra otros dispositivos y dependencias potencialmente afectados por el mismo problema, lo que le ayuda a evaluar el contexto del impacto en su red. Para investigar más a fondo, seleccione cualquier dispositivo en el diagrama o en la lista de dispositivos afectados para abrir su Device page.

{{< img src="network_device_monitoring/health/affected-devices-and-dependencies.png" alt="Un mapa de dependencias para el dispositivo ny-edge que muestra los dispositivos conectados y una lista de nueve dispositivos afectados, todos marcados como degradados." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/health
[2]: /es/bits_ai/bits_investigation/
[3]: https://app.datadoghq.com/devices