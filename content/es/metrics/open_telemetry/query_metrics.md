---
aliases:
- /es/metrics/open_telemetry/otlp_metrics/
further_reading:
- link: opentelemetry/
  tag: Documentación
  text: OpenTelemetry
title: Consulta de métricas en Datadog y OpenTelemetry
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-and-opentelemetry-metric-compatibility/" btn_hidden="false" >}}
La consulta de métricas en Datadog y OpenTelemetry está en la vista previa. Para activar esta función, haz clic en <strong>Request Access</strong> (Solicitar acceso) y rellena el formulario.
{{< /callout >}} 

Muchas organizaciones utilizan OpenTelemetry (OTel) junto con Datadog, creando entornos híbridos en los que algunos hosts emiten métricas de OTel y otros emiten métricas de Datadog. Debido a que las métricas de OTel y Datadog a menudo utilizan diferentes convenciones de nomenclatura y definiciones semánticas, la creación de una visión unificada de tu infraestructura en estos entornos puede ser un reto.

Datadog te ayuda areducir esta brecha al permitirte:

- Consultar en conjunto las métricas de OTel y Datadog.
- Comprender las fuentes de métricas y las asignaciones.

## Unificar las métricas de OpenTelemetry y Datadog en las consultas

El [Editor de consultas de métricas][1] incluye un selector de modo semántico, que permite controlar cómo Datadog gestiona métricas potencialmente equivalentes de fuentes de OTel y Datadog.

{{< img src="/metrics/otel/semantic_mode.png" alt="Selector de modo semántico en la página del Metrics Explorer." style="width:100%;" >}}

Elige entre dos modos:

### Respetar estrictamente la fuente de datos nativos (por defecto)

- Este modo consulta solo el nombre específico de la métrica que introduzcas (ya sea una métrica de Datadog u OTel).
- No incluye datos de ninguna métrica equivalente.

### Combinar los datos de todas las fuentes de telemetría

- Este modo combina automáticamente datos de métricas equivalentes de Datadog y OTel en una única consulta, aunque solo se introduzca uno de los nombres de las métricas.
- Gestiona la correspondencia entre métricas equivalentes (incluidas las complejas) y agrega todas las series temporales relacionadas como una única métrica.
- Esto funciona tanto si empiezas con una métrica de Datadog como con una métrica de OTel.

### Ejemplo

Imagina que estás monitorizando la carga del sistema utilizando dos métricas diferentes:

- **OTel nativo**: `otel.system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

Si consultas `otel.system.cpu.load_average.15m`, aplicas una agregación de espacio máximo y estableces el Modo semántico en **Combine data from all telemetry sources** (Combinar datos de todas las fuentes de telemetría), Datadog hará lo siguiente automáticamente:

1. Identificar la métrica equivalente de Datadog: `system.load.15`.
2. Combinar las series temporales de `otel.system.cpu.load_average.15m` y `system.load.15`.
3. Aplica la agregación máxima a todos los puntos de datos de ambas fuentes.

Utiliza la función [equiv_otel][2] para fusionar los datos.

## Comprender las fuentes de métricas y las correspondencias

Para facilitar la consulta, se muestran la fuente de la métrica y las métricas equivalentes:

- **Sección fuente**: en el editor de consultas, aparece una sección **Datadog** u **OTel** junto al nombre de la métrica, indicando su origen.

- **Lista de métricas equivalentes**: el editor también muestra una lista de métricas consideradas equivalentes a la que has consultado. Esto incluye asignaciones complejas de una a muchas. Por ejemplo, `otel.system.cpu.utilization` signa a múltiples métricas de estado de CPU de Datadog (`system.cpu.idle`, `system.cpu.iowait`, etc.).

{{< img src="/metrics/otel/source.png" alt="Sección fuente y lista de métricas equivalentes" style="width:75%;" >}}

## Ver asignaciones detalladas

Para obtener una visión completa de cómo se relacionan las métricas específicas de OTel y Datadog, consulta la página de Resumen de métricas:

1. Ve a [**Metrics > Summary**][3] (Métricas > Resumen).
2. Busca una métrica conocida de Datadog u OTel.
3. Abre el panel lateral **Metric Details** (Detalles de métrica).

Como alternativa, haz clic en **Edit in Metrics Summary** (Editar en el Resumen de métricas) al introducir una métrica en el editor de consultas.

Este panel muestra las correspondencias métricas, incluidas las relaciones complejas. Por ejemplo, muestra cómo `otel.system.cpu.utilization` se asigna a múltiples métricas de Datadog como `system.cpu.idle`, `system.cpu.user` y otras.

{{< img src="/metrics/otel/mappings.png" alt="Panel de Detalles del resumen de métricas que muestra asignaciones de OTel y Datadog" style="width:100%;" >}}

También puedes ver la lógica basada en etiquetas utilizada para estas correspondencias. Pasa el ratón por encima de una métrica equivalente para ver las condiciones específicas. Por ejemplo, al pasar el ratón por `system.cpu.idle` se muestra que se asigna a `otel.system.cpu.utilization` cuando `state=idle`, y el valor se multiplica por 100.

{{< img src="/metrics/otel/tooltip.png" alt="Pasa el ratón sobre el consejo que muestra la lógica de asignación basada en etiquetas" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /es/opentelemetry/guide/combining_otel_and_datadog_metrics/
[3]: https://app.datadoghq.com/metric/summary