---
description: Aprende a identificar y limpiar el desorden de monitor (noun) analizando
  los patrones de uso de monitor (noun), identificando los monitores no utilizados
  o redundantes y aplicando las prácticas recomendadas de gestión de monitor (noun)
  para mejorar la calidad de las alertas y reducir el ruido.
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentación
  text: Prácticas recomendadas de monitores
- link: monitors/quality
  tag: Documentación
  text: Monitor Quality
title: Limpia el desorden de monitor (noun)
---

## Información general

El desorden de monitor (noun) se acumula con el tiempo, dando lugar a ruido, alertas duplicadas y una mayor fricción operativa. En esta guía se describe un enfoque claro para identificar y limpiar los monitores desordenados, con casos de uso que te ayudarán a agilizar tus procesos de alertas.

También se proporcionan prácticas recomendadas para ayudar a mantener un entorno de monitorización limpio, lo que facilita la escalabilidad y el gobierno de tu estrategia de monitorización a medida que crecen tus sistemas.

### Requisitos previos

Debes tener los [Permisos de escritura de los monitores][10].

### Casos prácticos

Esta guía cubre varios casos de uso clave para limpiar el desorden de monitor (noun):

- **[Monitores silenciados durante mucho tiempo](#muted-for-a-long-period-of-time)**: Monitores que han estado silenciados durante largos periodos de tiempo: semanas o incluso meses.
- **[Monitores atascados en estado de ALERTA](#in-the-alerted-state-for-a-long-period-of-time)**: Monitores que han permanecido en estado de "Alerta" durante un tiempo inusualmente largo sin ser reconocidos ni resueltos.
- **[Monitores duplicados](#duplicate-monitors)**: Múltiples monitores que se activan en el mismo estado, métrica o servicio, a menudo debido a silos de equipo o falta de coordinación.
- **[Monitores ruidosos](#floppy-and-noisy-monitors)**: Monitores que se activan y resuelven con frecuencia (es decir, "aletean") o producen grandes volúmenes de alertas de poco valor.
- **[Monitores mal configurados](#misconfigured-monitors)**: Monitores con enlaces rotos a dashboards, retardos de evaluación faltantes, componentes de alerta faltantes o incorrectos o tags (etiquetas) y convenciones de nomenclatura obsoletas.

## Silenciado durante un largo periodo de tiempo

Los monitores sirven como sistema de alerta temprana de fallos, amenazas a la seguridad y problemas de rendimiento. Sin embargo, tener monitores silenciados durante un largo periodo de tiempo frustra ese objetivo, el silenciamiento prolongado a menudo indica que un monitor (noun) es obsoleto, irrelevante o demasiado ruidoso para ser útil. Deberían revisarse y volver a activarse con el ajuste adecuado o retirarse para reducir el desorden y eliminar los monitores obsoletos de tu entorno de alerta.

Elimina los monitores que no aporten valor y sustituye los silenciamientos prolongados por programaciones temporales:

### 1. Inspeccionar los monitores

Audita los monitores que han estado silenciados durante un largo periodo de tiempo para saber cuáles son realmente necesarios o útiles. Puede que algunos monitores estén silenciados por un buen motivo y quieras evitar eliminarlos.

Para ver esos monitores, ve a la page (página) [Calidad de monitor (noun)][1] y busca la lista de monitores que han estado silenciados durante más de 60 días. También puedes encontrar monitores silenciados en la [**Lista de Monitores**][8] con la consulta `muted_elapsed:<number_of_days>d`.

Después de tener tu lista, puedes realizar una acción en cada monitor (noun) de la page (página) Calidad de monitor (noun) o hacer una eliminación masiva de monitores con los pasos 2 y 3.

### 2. Obtener la lista de identificadores de monitor (noun)

Obtén una lista de tus identificadores de monitor (noun) para automatizar los cambios mediante programación. Empieza por los monitores que llevan silenciados más de 60 días.

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

Esto te proporciona los detalles de tus monitores en un archivo CSV para facilitar tu lectura. Puedes refinar la consulta para tu caso de uso específico.

### 3. Borrar los monitores

Con tu lista de monitores que han estado silenciados durante más de 60 días (del step (UI) / paso (generic) 2), puedes borrarlos con el siguiente script. Antes de ejecutar el script, pon la columna de identificador de monitor (noun) **primero** en la tabla.

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

## En estado de ALERTA durante un largo periodo de tiempo

Las alertas persistentes sugieren uno de dos problemas: o bien el problema no es procesable o bien el umbral de monitor (noun) está mal configurado. Ambos casos erosionan la confianza en las alertas y contribuyen a la fatiga de las alertas. Estos monitores deben revisarse y editarse o eliminarse.

A continuación se indica cómo obtener la lista de monitores que han estado en estado de ALERTA durante más de 60 días:

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

Para borrar, utiliza el mismo proceso en el [comando Borrar monitores](#3-delete-the-monitors). Sustituye el `input_file` por `monitors_alerted_too_long.csv`.

## Monitores duplicados

La creación de monitores separados que solo se diferencian por una tag (etiqueta), puede dar lugar a una duplicación innecesaria. Por ejemplo, monitorizar el uso de la CPU con un monitor (noun) para `prod` y otro para `staging` aumenta el número de monitores (noun).

Los monitores redundantes crean ruido y confusión innecesarios. En muchos casos, pueden consolidarse en un único [monitor (noun) **multialerta**][2] con el alcance y el etiquetado adecuados, lo que reduce la duplicación y hace que las alertas sean más manejables.

Si necesitas enviar notificaciones diferentes en función del valor de la tag (etiqueta) que activó la alerta, utiliza [variables de monitor (noun)][3] para personalizar dinámicamente el mensaje en función de la tag (etiqueta) que superó el umbral.

## Monitores ruidosos

Los monitores ruidosos insensibilizan a los equipos ante los problemas reales. El aleteo (cuando un monitor (noun) cambia con frecuencia entre los estados de alerta y recuperación) suele indicar umbrales inestables, retrasos en la evaluación faltantes o volatilidad subyacente del sistema.

Para reducir el ruido, revisa la agregación de evaluación del monitor (noun) y la configuración del umbral. Ajusta los parámetros para estabilizar el comportamiento de la alerta o elimina el monitor (noun) si ya no aporta valor.

A continuación se explica cómo obtener una lista de los monitores que están generando un alto volumen de alertas:

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

Para borrar, utiliza el mismo proceso en el [comando Borrar monitores](#3-delete-the-monitors). Sustituye el `input_file` por `noisy_monitors.csv`.

## Monitores mal configurados

Los monitores mal configurados son monitores activos que pueden tener un uso adecuado, pero son ineficaces porque no se te notifica. Estas configuraciones erróneas socavan la fiabilidad del monitor (noun) y dificultan la depuración o la clasificación. Limpiarlos garantiza que las alertas sean precisas, procesables e integradas en los procesos de observabilidad.

### Asa rota
Utiliza la [**Page (página) Calidad de monitor (noun)**][4] para visualizar qué monitores tienen un asa rota. Las notificaciones de estos monitores no pueden llegar a su destino.

**Datadog recomienda** revisar los destinatarios de los monitores para asegurarse de su correcta entrega o borrar el monitor (noun).

A continuación se indica cómo obtener la lista de monitores que tienen asas mal configuradas:

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

Para borrar, utiliza el mismo proceso en el [comando Borrar monitores](#3-delete-the-monitors). Sustituye el `input_file` por `monitors_broken_handle.csv`.

### Falta un retraso
Este problema afecta principalmente a los monitores basados en métricas de AWS. Dado que Datadog recupera las métricas de AWS a través de la API, a menudo se produce un retraso antes de que los datos estén disponibles. Si no se tienes esto en cuenta, los monitores pueden activar falsos positivos debido a datos incompletos o retrasados.

Puedes encontrar los monitores afectados en la page (página) [Calidad de monitor (noun)][4] , donde se marcan los monitores que carecen de un retraso de evaluación.

**Datadog recomienda** añadir un retraso a todos los monitores que utilicen las métricas de AWS. Un retraso de 300 segundos (5 minutos) suele ser suficiente para tener en cuenta la latencia de la ingesta de datos.

A continuación se indica cómo obtener la lista de monitores a los que les falta un retraso:

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

Para obtener más información, consulta la [Guía de resolución de problemas de AWS][7].

### Componente faltante

Los monitores composite (compuesto) evalúan su estado basándose en la combinación lógica de dos o más monitores (llamados constituyentes). Si alguno de esos monitores constituyentes se elimina o deja de estar disponible, el monitor (noun) composite (compuesto) deja de ser válido o fiable.

Un componente faltante significa normalmente que al menos uno de los monitores de entrada originales se ha eliminado después de que se creara el monitor (noun) composite (compuesto). Esto hace que el composite (compuesto) esté incompleto y pueda inducir a error en el comportamiento de alerta.

**Datadog recomienda** revisar los monitores composite (compuesto) para sustituir o restaurar los constituyentes faltantes o eliminar el monitor (noun) composite (compuesto). Encontrarás la lista de monitores composite (compuesto) con constituyentes faltantes en la página [Calidad de monitor (noun)][4].

Para obtener mediante programación la lista de monitores a los que les faltan componentes:

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

Para borrar, utiliza el mismo proceso en el [comando Borrar monitores](#3-delete-the-monitors). Sustituye el `input_file` por `monitors_missing_constituent.csv`.

Para obtener más información, consulta [Monitor (noun) composite (compuesto)][11].

## Prácticas recomendadas para evitar el desorden de monitor (noun)

| Prácticas recomendadas | Descripción | Despliegue |
|---------------|-------------|----------------|
| **Eliminar redundancia** | Evita crear varios monitores que rastreen la misma señal con alcances ligeramente diferentes (como por región, equipo o entorno). | Utiliza **agrupar monitores con tags (etiquetas)**, que son más fáciles de gestionar y escalar. |
| **Configurar una propiedad clara** | Cada monitor (noun) debe tener un propietario claro para dirigir las alertas a los responsables adecuados y evitar confusiones. | Utiliza las tags (etiquetas) `team:` y las asas de notificación (`@slack-xyz`, `@pagerduty-twilio`). Utiliza el filtro **Creator** (Creador) de la [Lista de monitores][8] para auditar a los creadores más frecuentes de monitor (noun). |
| **Revisar monitores ruidosos o inactivos** | Los monitores que alertan con demasiada frecuencia o que no alertan nunca pueden causar fatiga o indicar una mala configuración. | Utiliza la [**Page (página) Calidad de monitor (noun)**][4] para identificar y limpiar los monitores ruidosos, rotos u obsoletos. |
| **Aprovechar las plantillas de monitor (noun)** | Para los patrones comunes (como las métricas RED o la latencia de la API), utiliza plantillas para reducir la duplicación y garantizar la normalización. | Utiliza [plantillas reutilizables][5] para reducir la duplicación y garantizar la normalización en todos los equipos. |
| **Establece una política de etiquetado** | Las tags (etiquetas) coherentes y significativas te permiten filtrar, agrupar y enrutar fácilmente los monitores. | Utiliza etiquetas coherentes (como `service:`, `env:`, `team:`) y establece una [Política de etiquetado][6]. De este modo se pueden crear dashboards con alcance, alertas y rastreo del cumplimiento. |
| **Dashboard de calidad de monitor (noun)** | Visualiza las tendencias en la higiene de monitor (noun) en todos los equipos, servicios y entornos para identificar de forma proactiva las deficiencias y rastrear las mejoras. | Configura un [**Dashboard de calidad de monitor (noun)**](#template-monitor-quality-dashboard) para rastrear las mejoras a lo largo del tiempo y priorizar los esfuerzos de limpieza a escala. |

## Dashboard de calidad de monitor de plantilla

Para ayudarte a empezar, importa la siguiente definición del dashboard de JSON directamente a tu cuenta de Datadog.

1. En la aplicación, ve a [**Dashboards**][9] y haz clic en **New Dashboard** (Nuevo dashboard).
2. En la parte superior de la page (página), haz clic en **Configure** (Configurar) y selecciona **Import dashboard JSON...** (Importar JSON del dashboard...).
3. Copia y pega el siguiente JSON para crear un dashboard de calidad de monitor (noun):

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

## Referencias adicionales

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