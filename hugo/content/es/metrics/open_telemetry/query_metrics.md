---
aliases:
- /es/metrics/open_telemetry/otlp_metrics/
description: Consulte métricas equivalentes de Datadog y OpenTelemetry juntas en entornos
  híbridos con Semantic Mode.
further_reading:
- link: opentelemetry/
  tag: Documentación
  text: OpenTelemetry
title: Consultar métricas de Datadog y OpenTelemetry conjuntamente
---
Muchas organizaciones usan OpenTelemetry (OTel) junto con Datadog, creando entornos híbridos donde algunos hosts emiten métricas de OTel y otros emiten métricas de Datadog. Debido a que las métricas de OTel y Datadog a menudo usan diferentes convenciones de nomenclatura y definiciones semánticas, crear una vista unificada de su infraestructura en estos entornos puede ser un desafío.

Datadog le ayuda a cerrar esta brecha permitiéndole:

- Consultar métricas de OTel y Datadog juntas.
- Comprender las fuentes y asignaciones de métricas.

## Unificar métricas de OpenTelemetry y Datadog en consultas {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="¡Únase a la vista previa!" >}}
El modificador de consulta de fuente de telemetría requiere la versión preliminar de OTel Native Instrumentation. Utilice este formulario para solicitar acceso.
{{< /callout >}}

El [Metrics Query Editor][1] y los widgets de los tableros incluyen un modificador de consulta [Telemetry source][3], que le permite controlar cómo Datadog maneja las métricas potencialmente equivalentes de fuentes de OTel y Datadog. Seleccione {{< ui >}}Modify{{< /ui >}} y luego elija {{< ui >}}Native telemetry{{< /ui >}} o {{< ui >}}Combined telemetry{{< /ui >}} en la sección {{< ui >}}Telemetry sources{{< /ui >}}.

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="Modificador de consulta de fuentes de telemetría que muestra Combined telemetry seleccionada." style="width:100%;" >}}

Elija entre dos modos:

### Native telemetry (predeterminada) {#native-telemetry-default}

- Este modo consulta solo el nombre de métrica específico que usted ingresa (ya sea una métrica de Datadog o de OTel).
- No incluye datos de ninguna métrica equivalente.

### Combined telemetry {#combined-telemetry}

- Este modo combina automáticamente datos de métricas equivalentes de Datadog y OTel en una sola consulta, incluso si usted solo ingresa uno de los nombres de las métricas.
- Maneja la asignación entre métricas equivalentes (incluidas las complejas) y agrega todas las series temporales relacionadas como una sola métrica.
- Esto funciona ya sea que usted comience con una métrica de Datadog o una métrica de OTel.

### Ejemplo {#example}

Imagine que está monitoreando la carga del sistema usando dos métricas diferentes:

- **OTel native**: `system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

Si consulta `system.cpu.load_average.15m`, aplica un desglose espacial con la función de máximo y establece la fuente de telemetría en {{< ui >}}Combined telemetry{{< /ui >}}, Datadog automáticamente:

1. Identifica la métrica de Datadog equivalente: `system.load.15`.
2. Combina las series temporales tanto de `system.cpu.load_average.15m` como de `system.load.15`.
3. Aplica la agregación máxima en todos los puntos de datos de ambas fuentes.

## Comprender las fuentes y las asignaciones de métricas {#understand-metric-sources-and-mappings}

Para proporcionar claridad al realizar consultas, se muestran la fuente de la métrica y las métricas equivalentes:

- **Etiqueta de fuente**: En el editor de consultas, aparece una etiqueta {{< ui >}}Datadog{{< /ui >}} o {{< ui >}}OTel{{< /ui >}} junto al nombre de la métrica, indicando su origen.

- **Lista de métricas equivalentes**: El editor también muestra una lista de métricas consideradas equivalentes a la que consultó. Esto incluye asignaciones complejas de uno a muchos. Por ejemplo, `system.cpu.utilization` se asigna a varias métricas de estado de CPU de Datadog (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Etiqueta de fuente y lista de métricas equivalentes" style="width:75%;" >}}

## Ver asignaciones detalladas {#view-detailed-mappings}

Para obtener una vista completa de cómo se relacionan métricas específicas de OTel y Datadog, consulte la página Metrics Catalog:

1. Vaya a [Metrics Catalog][2].
2. Busque una métrica conocida de Datadog o OTel.
3. Abra el panel lateral {{< ui >}}Metric Details{{< /ui >}}.

Como alternativa, haga clic en {{< ui >}}Edit in Metrics Catalog{{< /ui >}} al ingresar una métrica en el editor de consultas.

Este panel muestra las asignaciones de métricas, incluidas las relaciones complejas. Por ejemplo, muestra cómo `system.cpu.utilization` se asigna a varias métricas de Datadog, como `system.cpu.idle`, `system.cpu.user` y otras.

{{< img src="/metrics/otel/mappings.png" alt="Panel de detalles de Metrics Catalog que muestra las asignaciones de OTel y Datadog" style="width:100%;" >}}

También puede ver la lógica basada en etiquetas utilizada para estas asignaciones. Pase el cursor sobre una métrica equivalente para ver las condiciones específicas. Por ejemplo, al pasar el cursor sobre `system.cpu.idle` se muestra que se asigna a `system.cpu.utilization` cuando `state=idle`, y el valor se multiplica por 100.

{{< img src="/metrics/otel/tooltip.png" alt="Información emergente al pasar el cursor que muestra la lógica de asignación basada en etiquetas" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/catalog
[3]: /es/dashboards/functions/telemetry_source/