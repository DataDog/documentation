---
aliases:
- /es/metrics/open_telemetry/otlp_metrics/
description: Consulta métricas equivalentes de Datadog y OpenTelemetry juntas en entornos
  híbridos utilizando el Modo Semántico.
further_reading:
- link: opentelemetry/
  tag: Documentación
  text: OpenTelemetry
title: Consulta métricas de Datadog y OpenTelemetry
---
Muchas organizaciones utilizan OTel junto con Datadog, creando entornos híbridos donde algunos servidores emiten métricas de OTel y otros emiten métricas de Datadog. Debido a que las métricas de OTel y Datadog a menudo utilizan diferentes convenciones de nomenclatura y definiciones semánticas, crear una vista unificada de su infraestructura en estos entornos puede ser un desafío.

Datadog le ayuda a cerrar esta brecha permitiéndole:

- Consultar métricas de OTel y Datadog juntas.
- Entender las fuentes de métricas y sus mapeos.

## Unificar métricas de OpenTelemetry y Datadog en consultas {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="¡Únase a la Preview!" >}}
El modificador de consulta de fuente de telemetría requiere la Preview de instrumentación nativa de OTel. Utilice este formulario para solicitar acceso.
{{< /callout >}}

El [Metrics Query Editor][1] y los dashboard widgets incluyen un modificador de consulta de [fuente de telemetría][3], que le permite controlar cómo Datadog maneja las métricas potencialmente equivalentes de fuentes de OTel y Datadog. Seleccione **Modify** y luego elija **Native telemetry** o **Combined telemetry** en la sección **Telemetry sources**.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificador de consulta de telemetry sources que muestra Combined telemetry seleccionado." style="width:100%;" >}}

Elija entre dos modos:

### Native telemetry (default) {#native-telemetry-default}

- Este modo consulta solo el nombre de métrica específico que ingrese (ya sea una métrica de Datadog o de OTel).
- No incluye datos de ninguna métrica equivalente.

### Telemetría combinada {#combined-telemetry}

- Este modo combina automáticamente datos de métricas equivalentes de Datadog y OTel en una sola consulta, incluso si solo ingrese uno de los nombres de las métricas.
- Maneja el mapeo entre métricas equivalentes (incluyendo las complejas) y agrega todas las series temporales relacionadas como una sola métrica.
- Esto funciona ya sea que comiences con una métrica de Datadog o una métrica de OTel.

### Ejemplo {#example}

Imagina que estás monitoreando la carga del sistema utilizando dos métricas diferentes:

- **OTel nativo**: `system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

Si consulta por `system.cpu.load_average.15m`, aplica un desglose espacial máximo y establece la telemetry source a **Combined telemetry**, Datadog automáticamente:

1. Identifica la métrica equivalente de Datadog: `system.load.15`.
2. Combina las series temporales de `system.cpu.load_average.15m` y `system.load.15`.
3. Aplica la agregación máxima a todos los puntos de datos de ambas fuentes.

## Entender las fuentes de métricas y sus mapeos {#understand-metric-sources-and-mappings}

Para proporcionar claridad al consultar, la fuente de la métrica y las métricas equivalentes se muestran:

- **Source pill**: En el editor de consultas, aparece un **Datadog** o un **OTel** pill junto al nombre de la métrica, indicando su origen.

- **Equivalent metrics list**: El editor también muestra una lista de métricas consideradas equivalentes a la que ha consultado. Esto incluye mapeos complejos de uno a muchos. Por ejemplo, `system.cpu.utilization` se mapea a múltiples métricas de estado de CPU de Datadog (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Source pill and Equivalent metrics list" style="width:75%;" >}}

## View detailed mappings {#view-detailed-mappings}

Para una vista completa de cómo se relacionan métricas específicas de OTel y Datadog, consulta la página de Metrics Summary:

1. Navegue a [**Metrics > Summary**][2].
2. Busque una métrica conocida de Datadog u OTel.
3. Abra el panel lateral de **Metric Details**.

Alternativamente, haga clic en **Edit in Metrics Summary** al ingresar una métrica en el editor de consultas.

Este panel muestra los mapeos de métricas, incluyendo relaciones complejas. Por ejemplo, muestra cómo `system.cpu.utilization` se mapea a múltiples métricas de Datadog como `system.cpu.idle`, `system.cpu.user` y otras.

{{< img src="/metrics/otel/mappings.png" alt="Panel de Metrics Summary Details que muestra los mapeos de OTel y Datadog." style="width:100%;" >}}

También puede ver la lógica basada en etiquetas utilizada para estos mapeos. Pase el cursor sobre una métrica equivalente para ver las condiciones específicas. Por ejemplo, al pasar el cursor sobre `system.cpu.idle` se muestra que se mapea a `system.cpu.utilization` cuando `state=idle`, y el valor se multiplica por 100.

{{< img src="/metrics/otel/tooltip.png" alt="Tooltip de hover que muestra la lógica de mapeo basada en etiquetas" style="width:100%;" >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/summary
[3]: /es/dashboards/functions/telemetry_source/