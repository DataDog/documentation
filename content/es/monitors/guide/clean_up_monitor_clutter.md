---
description: Aprenda a identificar y limpiar el desorden de seguimientos analizando
  los patrones de uso de los seguimientos, identificando seguimientos no utilizados
  o redundantes, e implementando las mejores prácticas para la gestión de seguimientos
  con el fin de mejorar la calidad de las alertas y reducir el ruido.
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentation
  text: Mejores prácticas de seguimiento
- link: monitors/quality
  tag: Documentation
  text: Calidad de seguimiento
title: Limpiar el desorden de seguimientos
---
## Resumen

El desorden de seguimientos se acumula con el tiempo, resultando en ruido, alertas duplicadas y un aumento de la fricción operativa. Esta guía describe un enfoque claro para identificar y limpiar seguimientos desordenados, con casos de uso que le ayudarán a optimizar sus flujos de trabajo de alertas.

También proporciona mejores prácticas para ayudar a mantener un entorno de seguimiento limpio, facilitando la escalabilidad y la gobernanza de su estrategia de seguimiento a medida que sus sistemas crecen.

### Requisitos Previos

Debe tener los [permisos de escritura de seguimientos][10].

### Casos de uso

Esta guía cubre varios casos de uso clave para limpiar el desorden de seguimientos:

- **[Seguimientos silenciados a largo plazo](#muted-for-a-long-period-of-time)**: Seguimientos que han estado silenciados durante períodos prolongados—semanas o incluso meses.
- **[Seguimientos atascados en estado de ALERTA](#in-the-alerted-state-for-a-long-period-of-time)**: Seguimientos que han permanecido en estado de ALERTA durante un tiempo inusualmente largo sin ser reconocidos o resueltos.
- **[Seguimientos duplicados](#duplicate-monitors)**: Múltiples seguimientos que se activan bajo la misma condición, métrica o servicio—frecuentemente debido a silos de equipo o falta de coordinación.
- **[Seguimientos inestables y ruidosos](#flappy-and-noisy-monitors)**: Seguimientos que se activan y resuelven con frecuencia (es decir, "flap") o producen altos volúmenes de alertas de bajo valor.
- **[Seguimientos mal configurados](#misconfigured-monitors)**: Seguimientos con enlaces rotos a tableros, retrasos de evaluación faltantes, constituyentes de alerta faltantes o incorrectos, o etiquetas y convenciones de nombres desactualizadas.

## Silenciado durante un largo período de tiempo

Los seguimientos sirven como un sistema de alerta temprana para fallas, amenazas de seguridad y problemas de rendimiento. Sin embargo, tener los seguimientos silenciados durante un largo período de tiempo anula ese propósito; el silencio prolongado a menudo indica que un seguimiento es obsoleto, irrelevante o demasiado ruidoso para ser útil. Estos deben ser revisados y reactivados con la configuración adecuada o retirados para reducir el desorden y eliminar seguimientos obsoletos de su entorno de alertas.

Limpie los seguimientos que no están proporcionando valor y reemplace los silencios prolongados con horarios limitados en el tiempo:

### 1. Inspeccione los seguimientos

Audite los seguimientos que han estado silenciados durante un largo período de tiempo para entender cuáles son realmente necesarios o útiles. Algunos seguimientos pueden estar silenciados por una buena razón y desea evitar eliminarlos.

Para ver esos seguimientos, navegue a la página de [Calidad del Seguimiento][1] y encuentre la lista de seguimientos que han estado silenciados por más de 60 días. También puede encontrar seguimientos silenciados en la [**Lista de Seguimientos**][8] con la consulta `muted_elapsed:<number_of_days>d`.

Después de obtener su lista, puede tomar acción en cada seguimiento desde la página de [Calidad del seguimiento] o realizar una eliminación masiva de seguimientos mediante los pasos 2 y 3.

### 2. Obtenga la lista de ID de seguimientos

Obtenga una lista de sus ID de seguimientos para automatizar los cambios. Comience con los seguimientos que han estado silenciados por más de 60 días.

El siguiente comando CURL obtiene esa información:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("muted_duration_over_sixty_days")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_muted.csv
```

Esto le proporciona los detalles de sus seguimientos en un archivo CSV para facilitar la lectura. Puede refinar la consulta para su caso de uso específico.

### 3. Elimine los seguimientos

Con su lista de seguimientos que han estado silenciados por más de 60 días (del Paso 2), puede eliminarlos con el siguiente script. Antes de ejecutar el script, coloque la columna de ID de seguimiento **primero** en la tabla.

```shell
input_file="monitors_muted.csv"
tail -n +2 "$input_file" | awk -F',' '{print $1}' | while read -r monitor_id; do
    echo "Deleting monitor ID: $monitor_id"

    curl -X DELETE "{{< region-param key=dd_api >}}/api/v1/monitor/${monitor_id}" \
        -H "Accept: application/json" \
        -H "DD-API-KEY: ${DD_API_KEY}" \
        -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
    echo "Deleted monitor: $monitor_id"
done
```

## En un estado de ALERTA durante un largo período de tiempo

Las alertas persistentes sugieren uno de dos problemas: o el problema no es accionable, o el umbral del seguimiento está mal configurado. Ambos casos erosionan la confianza en las alertas y contribuyen a la fatiga de alertas. Estos seguimientos deben ser revisados y editados, o eliminados.

Aquí está cómo obtener la lista de seguimientos que han estado en estado de ALERTA por más de 60 días:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("alerted_too_long")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_alerted_too_long.csv
```

Para eliminar, utilice el mismo proceso en el comando [Eliminar seguimientos](#3-delete-the-monitors). Reemplaza el `input_file` con `monitors_alerted_too_long.csv`.

## Seguimientos duplicados

Crear seguimientos separados que solo difieran por una etiqueta puede llevar a una duplicación innecesaria. Por ejemplo, monitorear el uso de CPU con un seguimiento para `prod` y otro para `staging` aumenta el conteo de seguimientos.

Los seguimientos redundantes crean ruido y confusión innecesarios. En muchos casos, estos pueden ser consolidados en un solo [**multi-alerta**] con un contexto adecuado y etiquetado, reduciendo la duplicación y haciendo las alertas más manejables.

Si necesitas enviar diferentes notificaciones dependiendo del valor de la etiqueta que activó la alerta, utiliza [variables de monitor][3] para personalizar dinámicamente el mensaje basado en la etiqueta que superó el umbral.

## Seguimientos inestables y ruidosos

Los seguimientos ruidosos desensibilizan a los equipos ante problemas reales. El parpadeo (cuando un seguimiento cambia frecuentemente entre estados de alerta y recuperación) a menudo indica umbrales inestables, retrasos de evaluación faltantes o volatilidad subyacente del sistema.

Para reducir el ruido, revise la agregación de evaluación del seguimiento y la configuración del umbral. Ajuste la configuración para estabilizar el comportamiento de las alertas, o elimine el seguimiento si ya no proporciona valor.

Aquí se explica cómo obtener una lista de seguimientos que están generando un alto volumen de alertas:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("noisy_monitor")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > noisy_monitors.csv
```

Para eliminar, utilice el mismo proceso en el comando [Eliminar seguimientos](#3-delete-the-monitors). Reemplaza el `input_file` con `noisy_monitors.csv`.

## Seguimientos mal configurados

Los seguimientos mal configurados son seguimientos activos que pueden tener un uso adecuado, pero son ineficientes porque no recibirá notificaciones. Estas malas configuraciones socavan la fiabilidad del seguimiento y dificultan la depuración o el triage. Corregir estas configuraciones garantiza que sus alertas sean precisas, accionables e integradas en sus flujos de trabajo de observabilidad.

### Identificador roto
Utilice la página de [**Calidad del seguimiento**][4] para visualizar qué seguimientos tienen un identificador roto. Las notificaciones de estos seguimientos no pueden llegar a su destino.

**Datadog recomienda** revisar los destinatarios de los seguimientos para asegurar una entrega adecuada, o eliminar el seguimiento.

Aquí se explica cómo obtener la lista de seguimientos que tienen identificadores mal configurados:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("broken_at_handle")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_broken_handle.csv
```

Para eliminar, utilice el mismo proceso en el comando [Eliminar Seguimientos](#3-delete-the-monitors). Reemplaza el `input_file` con `monitors_broken_handle.csv`.

### Falta un retraso
Este problema afecta principalmente a los seguimientos basados en métricas de AWS. Debido a que Datadog recupera métricas de AWS a través de la API, a menudo hay un retraso incorporado antes de que los datos estén disponibles. Si no tiene en cuenta esto, los seguimientos pueden activar falsos positivos debido a datos incompletos o retrasados.

Puede encontrar los seguimientos afectados en la página de [Calidad del seguimiento][4], donde se marcan los seguimientos que carecen de un retraso de evaluación.

**Datadog recomienda** agregar un retraso a todos los seguimientos que utilizan métricas de AWS. Un retraso de 300 segundos (5 minutos) es típicamente suficiente para tener en cuenta la latencia de ingestión de datos.

Aquí se explica cómo obtener la lista de seguimientos que carecen de un retraso:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("crawler_metric_missing_eval_delay")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_delay.csv
```

Para más información, consulte la [guía de solución de problemas de AWS][7].

### Constituyente faltante

Los seguimientos compuestos evalúan su estado en función de la combinación lógica de dos o más seguimientos (llamados constituyentes). Si alguno de esos seguimientos constituyentes es eliminado o se vuelve no disponible, el seguimiento compuesto se vuelve inválido o poco confiable.

Un constituyente faltante generalmente significa que al menos uno de los seguimientos de entrada originales ha sido eliminado después de que se creó el seguimiento compuesto. Esto provoca que el seguimiento compuesto esté incompleto y potencialmente engañoso en el comportamiento de alerta.

**Datadog recomienda** revisar los seguimientos compuestos para reemplazar o restaurar los constituyentes faltantes, o eliminar el seguimiento compuesto. Puede encontrar la lista de seguimientos compuestos con constituyentes faltantes en la página de [Calidad del seguimiento][4].

Para obtener programáticamente la lista de seguimientos que carecen de constituyentes:

```bash
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("composite_has_deleted_constituents")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_constituent.csv
```

Para eliminar, utilice el mismo proceso en el comando [Eliminar Seguimientos](#3-delete-the-monitors). Reemplaza el `input_file` con `monitors_missing_constituent.csv`.

Para más información, consulte [Seguimiento Compuesto][11].

## Mejores prácticas para evitar el desorden de seguimientos

| Mejor Práctica | Descripción | Implementación |
|---------------|-------------|----------------|
| **Eliminar redundancia** | Evite crear múltiples seguimientos que rastreen la misma señal con contextos ligeramente diferentes (como por región, equipo o entorno). | Utiliza **seguimientos agrupados por etiquetas**, que son más fáciles de gestionar y escalar. |
| **Establece una propiedad clara** | Cada seguimiento debe tener un responsable claro para dirigir las alertas a los encargados adecuados y evitar confusiones. | Utiliza `team:` etiquetas y manejadores de notificación (`@slack-xyz`, `@pagerduty-twilio`). Utiliza el filtro **Creador** en la [Lista de Seguimientos][8] para auditar a los creadores de seguimientos más frecuentes. |
| **Revisa seguimientos ruidosos o inactivos** | Los seguimientos que alertan con demasiada frecuencia o que nunca alertan pueden causar fatiga o señalar una mala configuración. | Utiliza la [**Página de Calidad de Seguimiento**][4] para identificar y limpiar seguimientos ruidosos, rotos o desactualizados. |
| **Aprovecha las plantillas de seguimientos** | Para patrones comunes (como métricas ROJAS o latencia de API), utiliza plantillas para reducir la duplicación y asegurar la estandarización. | Utiliza [plantillas reutilizables][5] para reducir la duplicación y asegurar la estandarización entre equipos. |
| **Establece una Política de Etiquetado** | Etiquetas consistentes y significativas te permiten filtrar, agrupar y dirigir seguimientos fácilmente. | Utiliza etiquetas consistentes (como `service:`, `env:`, `team:`) y establece una [Política de Etiquetado][6]. Esto permite tableros, alertas y seguimiento de cumplimiento con alcance definido. |
| **Tablero de Calidad de Seguimiento** | Visualiza tendencias en la higiene de seguimientos entre equipos, servicios y entornos para identificar proactivamente brechas y rastrear mejoras. | Configura un [**tablero de Calidad de Seguimiento**](#template-monitor-quality-dashboard) para rastrear mejoras a lo largo del tiempo y priorizar esfuerzos de limpieza a gran escala. |

## Plantilla para Tablero de Calidad de Seguimiento

Para ayudarte a comenzar, importa la siguiente definición de tablero JSON directamente en tu cuenta de Datadog.

1. En la aplicación, navega a [**Tableros**][9] y haz clic en **Nuevo Tablero**.
2. En la parte superior de la página, haz clic en **Configurar** y selecciona **Importar JSON del tablero...**.
3. Copia y pega el siguiente JSON para construir un tablero de Calidad de Seguimiento:

```json
{
  "title": "Monitor Quality OOTB Dashboard",
  "description": "",
  "widgets": [
    {
      "id": 8853380235542346,
      "definition": {
        "type": "note",
        "content": "This Monitor Quality dashboard provides a comprehensive view of monitor quality metrics, broken down by `team` and `service`. Its goal is to help you easily analyze and act on monitor quality data, enabling you to schedule reports, download insights as PDFs, and more.\n\n**Key Features:**\n- Team and Service Views: You can filter the dashboard either by team or by service, but not both simultaneously. If you filter by `team`, refer to the [Team Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107838741&to_ts=1732280638741&live=false&tile_focus=4548404374449802) for relevant insights. If you filter by `service`, explore the [Service Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107865224&to_ts=1732280665224&live=false&tile_focus=2841959907422822) for detailed information.\n- Monitor-Level Details: For a deeper dive into specific impacted monitors, navigate to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality).\n- Seamless Navigation: Use the context links provided in the dashboard to jump directly to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality), pre-filtered with the same criteria you've applied on the dashboard.\n\nThis dashboard is designed to give you both a high-level overview and actionable paths to improve your monitoring posture.",
        "background_color": "white",
        "font_size": "14",
        "text_align": "left",
        "vertical_align": "center",
        "show_tick": false,
        "tick_pos": "50%",
        "tick_edge": "left",
        "has_padding": true
      },
      "layout": { "x": 0, "y": 0, "width": 12, "height": 3 }
    },
    {
      "id": 4548404374449802,
      "definition": {
        "title": "General overview - by team",
        "background_color": "blue",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 2449119265341574,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_team` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by team.\n\nUse the `team` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 3001209940385798,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 498569597362654,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 1376609088194674,
            "definition": {
              "title": "Top Teams Impacted",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 4 }
          },
          {
            "id": 718136447073638,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Team",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 2393792996475864,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Team",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 4443082314028290,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 3954366540293996,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 2546970864549118,
            "definition": {
              "title": "Monitors with Missing Recipients per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:missing_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 3744392131942638,
            "definition": {
              "title": "Monitors with Broken Handles per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:broken_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 2751217590574740,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 5158165900159898,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 8032070484951580,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4153429942317530,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4158897740932848,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 5392245250417816,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:noisy_monitor,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": { "display": { "type": "stacked" }, "palette": "grey" }
            },
            "layout": { "x": 6, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 1271026446632020,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 6315895116466318,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 8251226565664096,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 1329067816249636,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 7052384595427880,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:alerted_too_long,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 31, "width": 6, "height": 5 }
          },
          {
            "id": 2768363536962548,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:composite_has_deleted_constituents ,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 31, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": { "x": 0, "y": 3, "width": 12, "height": 37 }
    },
    {
      "id": 2841959907422822,
      "definition": {
        "title": "General overview - by service",
        "background_color": "pink",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 3801590205295194,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_service` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by service.\n\nUse the `service` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 8418200284207718,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 8281740697966220,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team, $service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 5048429332292860,
            "definition": {
              "title": "Top services impacted",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 5 }
          },
          {
            "id": 2233801928907094,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Service",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7329031300309162,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Service",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7627510169738418,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 2826082028591748,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 5050954942402816,
            "definition": {
              "title": "Monitors with Missing Recipients per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:missing_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 7809748805807956,
            "definition": {
              "title": "Monitors with Broken Handles per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:broken_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 8416588682594596,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 4951606729784970,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 1778359756038190,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 8559060613933804,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 7041249940897320,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 7810615049061724,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:noisy_monitor,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "grey"
              }
            },
            "layout": { "x": 6, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 5108940190121326,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 4931941666409286,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 6520923360190496,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 1364025765104008,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 3670188762233230,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 32, "width": 6, "height": 5 }
          },
          {
            "id": 9006201303765196,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 32, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 40,
        "width": 12,
        "height": 38,
        "is_column_break": true
      }
    }
  ],
  "template_variables": [
    {
      "name": "team",
      "prefix": "team",
      "available_values": [],
      "default": "*"
    },
    {
      "name": "service",
      "prefix": "service",
      "available_values": [],
      "default": "*"
    }
  ],
  "layout_type": "ordered",
  "notify_list": [],
  "reflow_type": "fixed"
}
```

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/quality
[2]: /es/monitors/guide/alert_aggregation/#multi-alert
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/monitors/quality?order=desc
[5]: https://app.datadoghq.com/monitors/templates?q=&origination=installed&p=1
[6]: https://app.datadoghq.com/monitors/settings/policies
[7]: /es/integrations/guide/aws-integration-troubleshooting/#metrics-delayed
[8]: https://app.datadoghq.com/monitors/manage
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /es/account_management/rbac/permissions/#monitors
[11]: /es/monitors/types/composite/