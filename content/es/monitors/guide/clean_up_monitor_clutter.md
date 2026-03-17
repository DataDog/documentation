---
description: Aprende a identificar y limpiar el desorden de monitores analizando los
  patrones de uso de los monitores, identificando monitores no utilizados o redundantes,
  e implementando las mejores prácticas para la gestión de monitores para mejorar
  la calidad de las alertas y reducir el ruido.
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentation
  text: Mejores Prácticas de Monitores
- link: monitors/quality
  tag: Documentation
  text: Calidad de Monitores
title: Limpia el desorden de monitores
---
## Descripción General

El desorden de monitores se acumula con el tiempo, resultando en ruido, alertas duplicadas y un aumento de la fricción operativa. Esta guía describe un enfoque claro para identificar y limpiar monitores desordenados, con casos de uso que te ayudarán a optimizar tus flujos de trabajo de alertas.

También proporciona mejores prácticas para ayudar a mantener un entorno de monitoreo limpio, facilitando la escalabilidad y la gobernanza de tu estrategia de monitoreo a medida que tus sistemas crecen.

### Requisitos Previos

Debes tener los [permisos de escritura de monitores][10].

### Casos de Uso

Esta guía cubre varios casos de uso clave para limpiar el desorden de monitores:

- **[Monitores silenciados a largo plazo](#muted-for-a-long-period-of-time)**: Monitores que han estado silenciados durante períodos prolongados—semanas o incluso meses.
- **[Monitores atascados en estado de ALERTA](#in-the-alerted-state-for-a-long-period-of-time)**: Monitores que han permanecido en estado de "Alerta" durante un tiempo inusualmente largo sin ser reconocidos o resueltos.
- **[Monitores duplicados](#duplicate-monitors)**: Múltiples monitores que se activan bajo la misma condición, métrica o servicio—frecuentemente debido a silos de equipo o falta de coordinación.
- **[Monitores inestables y ruidosos](#flappy-and-noisy-monitors)**: Monitores que se activan y resuelven con frecuencia (es decir, "flap") o producen altos volúmenes de alertas de bajo valor.
- **[Monitores mal configurados](#misconfigured-monitors)**: Monitores con enlaces rotos a paneles de control, retrasos de evaluación faltantes, constituyentes de alerta faltantes o incorrectos, o etiquetas y convenciones de nombres desactualizadas.

## Silenciados durante un largo período de tiempo

Los monitores sirven como un sistema de advertencia temprana para fallas, amenazas de seguridad y problemas de rendimiento. Sin embargo, tener monitores silenciados durante un largo período de tiempo derrota ese propósito, el silenciado a largo plazo a menudo indica que un monitor es obsoleto, irrelevante o demasiado ruidoso para ser útil. Estos deben ser revisados y ya sea reactivados con la configuración adecuada o retirados para reducir el desorden y eliminar monitores obsoletos de tu entorno de alertas.

Limpia los monitores que no están proporcionando valor y reemplaza los silencios a largo plazo con horarios limitados:

### 1. Inspecciona los monitores

Audita los monitores que han estado silenciados durante un largo período de tiempo para entender cuáles son realmente necesarios o útiles. Algunos monitores pueden estar silenciados por una buena razón y quieres evitar eliminarlos.

Para ver esos monitores, navega a la página de [Calidad de Monitores][1] y encuentra la lista de monitores que han estado silenciados por más de 60 días. También puedes encontrar monitores silenciados en la [**Lista de Monitores**][8] con la consulta `muted_elapsed:<number_of_days>d`.

Después de tener tu lista, puedes tomar acción sobre cada monitor desde la página de Calidad de Monitores o hacer una eliminación masiva de monitores con los pasos 2 y 3.

### 2. Obtén la lista de IDs de monitores

Obtén una lista de tus IDs de monitores para automatizar programáticamente los cambios. Comienza con los monitores que han estado silenciados por más de 60 días.

El siguiente comando CURL obtiene esa información:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("muted_duration_over_sixty_days")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_muted.csv
```

This gives you the details of your monitors in a CSV file for readability. You can refine the query to your specific use case.

### 3. Delete the monitors

With your list of monitors that have been muted for over 60 days (from Step 2), you can delete them with the following script. Before you run the script, put the monitor ID column **first** in the table.

```shell
input_file="monitors_muted.csv"
tail -n +2 "$input_file" | awk -F',' '{print $1}' | while read -r monitor_id; do
    echo "Deleting monitor ID: $monitor_id"

    curl -X DELETE "{{< region-param key=dd_api >}}/api/v1/monitor/${monitor_id}" \
        H "Accept: application/json" \
        H "DDAPIKEY: ${DD_API_KEY}" \
        H "DDAPPLICATIONKEY: ${DD_APP_KEY}"
    echo "Monitor eliminado: $monitor_id"
hecho
```

## In an ALERT state for a long period of time

Persistent alerts suggest one of two problems: either the issue is not actionable, or the monitor threshold is misconfigured. Both cases erode trust in alerts and contribute to alert fatigue. These monitors should be reviewed and edited, or removed.

Here is how to get the list of monitors which have been in ALERT state for more than 60 days:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("alerted_too_long")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_alerted_too_long.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_alerted_too_long.csv`.

## Duplicate monitors

Creating separate monitors that differ only by a tag, can lead to unnecessary duplication. For example, monitoring CPU usage with one monitor for `prod` and another for `staging` increases your monitor count.

Redundant monitors create unnecessary noise and confusion. In many cases, these can be consolidated into a single [**multi-alert** monitor][2] with proper scoping and tagging, reducing duplication and making alerts more manageable.

If you need to send different notifications depending on the tag value that triggered the alert, use [monitor variables][3] to dynamically customize the message based on the tag that breached the threshold.

## Flappy and noisy monitors

Noisy monitors desensitize teams to real issues. Flapping (when a monitor frequently switches between alert and recovery states) often indicates unstable thresholds, missing evaluation delays, or underlying system volatility.

To reduce noise, review the monitor's evaluation aggregation and the threshold configuration. Adjust the settings to stabilize alert behavior, or delete the monitor if it no longer provides value.

Here is how to get a list of monitors that are generating a high volume of alerts:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("noisy_monitor")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > noisy_monitors.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `noisy_monitors.csv`.

## Misconfigured monitors

Misconfigured monitors are active monitors that may have a proper use, but are inefficient because you won't be notified. These misconfigurations undermine the monitor's reliability and make debugging or triaging harder. Cleaning these up ensures your alerts are accurate, actionable, and integrated into your observability workflows.

### Broken handle
Use the [**Monitor Quality page**][4] to visualize which monitors have a broken handle. Notifications from these monitors can't reach its destination.

**Datadog recommends** reviewing the monitors' recipients to ensure proper delivery, or deleting the monitor.

Here is how to get the list of monitors that have misconfigured handles:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("broken_at_handle")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_broken_handle.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_broken_handle.csv`.

### Missing a delay
This issue mainly impacts monitors based on AWS metrics. Because Datadog retrieves AWS metrics through the API, there's often a built-in delay before the data becomes available. If you don't account for this, monitors can trigger false positives due to incomplete or delayed data.

You can find affected monitors in the [Monitor Quality][4] page, where monitors missing an evaluation delay are flagged.

**Datadog recommends** adding a delay to all monitors that use AWS metrics. A delay of 300 seconds (5 minutes) is typically sufficient to account for data ingestion latency.

Here is how to get the list of monitors that are missing a delay:

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("crawler_metric_missing_eval_delay")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitores_faltantes_retraso.csv
```

For more information, see the [AWS Troubleshooting guide][7].

### Missing constituent

Composite monitors evaluate their state based on the logical combination of two or more monitors (called constituents). If any of those constituent monitors are deleted or become unavailable, the composite monitor becomes invalid or unreliable.

A missing constituent typically means that at least one of the original input monitors has been removed after the composite monitor was created. This causes the composite to be incomplete and potentially misleading in alerting behavior.

**Datadog recommends** reviewing the composite monitors to either replace or restore missing constituents, or delete the composite monitor. You can find the list of composite monitors with missing constituents on the [Monitor Quality][4] page.

To programmatically get the list of monitors that are missing constituents:

```bash
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  H "DDAPIKEY: ${API_KEY}" \
  H "DDAPPLICATIONKEY: ${APP_KEY}" \
  H "ContentType: application/json" | jq r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("composite_has_deleted_constituents")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitores_faltantes_constituente.csv
```

To delete, use the same process in the [Delete Monitors command](#3-delete-the-monitors). Replace the `input_file` with `monitors_missing_constituent.csv`.

For more information, see [Composite Monitor][11].

## Best Practices to avoid Monitor Cluttering

| Best Practice | Description | Implementation |
|---------------|-------------|----------------|
| **Eliminate redundancy** | Avoid creating multiple monitors that track the same signal with slightly different scopes (such as by region, team, or environment). | Use **group-by monitors with tags**, which are easier to manage and scale. |
| **Set clear ownership** | Every monitor should have a clear owner to route alerts to the right responders and avoid confusion. | Use `team:` tags and notification handles (`@slack-xyz`, `@pagerduty-twilio`). Use the **Creator** filter on the [Monitors List][8] to audit the most frequent monitor creators. |
| **Review noisy or dormant monitors** | Monitors that alert too often or never alert at all can cause fatigue or signal a misconfiguration. | Use the [**Monitor Quality page**][4] to identify and clean up noisy, broken, or outdated monitors. |
| **Leverage monitor templates** | For common patterns (such as RED metrics or API latency), use templates to reduce duplication and ensure standardization. | Use [reusable templates][5] to reduce duplication and ensure standardization across teams. |
| **Establish a Tagging Policy** | Consistent and meaningful tags allow you to easily filter, group, and route monitors. | Use consistent tags (such as `service:`, `env:`, `team:`) and establish a [Tagging Policy][6]. This enables scoped dashboards, alerts, and compliance tracking. |
| **Monitor Quality Dashboard** | Visualize trends in monitor hygiene across teams, services, and environments to proactively identify gaps and track improvements. | Set up a [**Monitor Quality dashboard**](#template-monitor-quality-dashboard) to track improvements over time and prioritize cleanup efforts at scale. |

## Template Monitor Quality dashboard

To help you get started, import the following JSON dashboard definition directly into your Datadog account.

1. In the app, navigate to [**Dashboards**][9] and click **New Dashboard**.
2. At the top of the page, click **Configure** and select **Import dashboard JSON...**.
3. Copy and paste the following JSON to build out a Monitor Quality dashboard:

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
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$equipo}}"
                }
              ]
            },
            "diseño": { "x": 5, "y": 0, "ancho": 7, "alto": 4 }
          },
          {
            "id": 498569597362654,
            "definición": {
              "título": "Evolución de las Mejoras de Calidad por Tipo a lo Largo del Tiempo",
              "tamaño_título": "16",
              "alineación_título": "izquierda",
              "mostrar_leyenda": false,
              "diseño_leyenda": "automático",
              "columnas_leyenda": ["promedio", "mínimo", "máximo", "valor", "suma"],
              "tiempo": { "ocultar_datos_de_costo_incompletos": true },
              "tipo": "serie_de_tiempo",
              "solicitudes": [
                {
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_team{$equipo,$servicio} por {tipo_de_sugerencia}"
                    }
                  ],
                  "formato_de_respuesta": "series_de_tiempo",
                  "estilo": {
                    "paleta": "datadog16",
                    "ordenar_por": "valores",
                    "tipo_de_linea": "sólido",
                    "ancho_de_linea": "normal"
                  },
                  "tipo_de_visualización": "línea"
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{$equipo}}"
                }
              ]
            },
            "id": 1376609088194674,
          },
          {
            "título": "Principales Equipos Afectados",
            "definición": {
              "tipo": "lista_principal"
              "tamaño_título": "16",
              "alineación_título": "izquierda",
              "tiempo": { "ocultar_datos_de_costo_incompletos": true },
              
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,$team,$service} by {team,suggestion_type}",
                      "aggregator": "último"
                    }
                  ],
                  "response_format": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "fórmula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{team}}"
                }
              ],
              "estilo": {
                "display": { "type": "apilado", "legend": "automático" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 4 }
          },
          {
            "id": 718136447073638,
            "definición": {
              "type": "nota",
              "content": "Monitores con Destinatarios Faltantes por Equipo",
              "background_color": "azul_vivo",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "diseño": { "x": 0, "y": 12, "ancho": 6, "alto": 1 }
          },
          {
            "id": 2393792996475864,
            "definición": {
              "type": "nota",
              "contenido": "Monitores con Mangos Rotos por Equipo",
              "color_de_fondo": "verde_vivo",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "diseño": { "x": 6, "y": 12, "ancho": 6, "alto": 1 }
          },
          {
            "id": 4443082314028290,
            "definición": {
              "type": "nota",
              "contenido": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n no se encontró mango de notificación en el cuerpo del monitor\n el tipo de monitor no es `synthetics`\n\n_Puede usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "diseño": { "x": 0, "y": 13, "ancho": 6, "alto": 2 }
          },
          {
            "id": 3954366540293996,
            "definición": {
              "type": "nota",
              "contenido": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el mango de notificación no es válido\n el tipo de monitor no es `synthetics`\n\n_Puede usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "diseño": { "x": 6, "y": 13, "ancho": 6, "alto": 2 }
          },
          {
            "id": 2546970864549118,
            "definición": {
              "título": "Monitores con Destinatarios Faltantes por Equipo",
              
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:missing_at_handle,$team,$service} por {team,suggestion_type}"
                      "aggregator": "último"
                    }
                  ],
                  "response_format": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "fórmula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{team}}"
                }
              ],
              "estilo": {
                "display": { "type": "apilado", "legend": "automático" },
                "palette": "azul"
              }
            },
            "layout": { "x": 0, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 3744392131942638,
            "definición": {
              "title": "Monitores con Manijas Rotos por Equipo",
              
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:broken_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "último"
                    }
                  ],
                  "response_format": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "fórmula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{team}}"
                }
              ],
              "estilo": {
                "display": { "type": "apilado", "legend": "automático" },
                "palette": "verde"
              }
            },
            "layout": { "x": 6, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 2751217590574740,
            "definición": {
              "type": "nota",
              "content": "Monitores Silenciados por Demasiado Tiempo",
              "background_color": "morado",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "layout": { "x": 0, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 5158165900159898,
            "definición": {
              "type": "nota",
              "content": "Monitores Generando un Alto Volumen de Alertas",
              "background_color": "verde",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "layout": { "x": 6, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 8032070484951580,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor ha estado silenciado por al menos 60 días\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4153429942317530,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor genera el 5% superior de alertas en los últimos 10 días\n el tipo de monitor no es `synthetics`\n\n_Puede usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4158897740932848,
            "definición": {
              "title": "Monitores Silenciados por Demasiado Tiempo",
              
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {team,suggestion_type}",
                      "aggregator": "último"
                    }
                  ],
                  "response_format": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "fórmula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{team}}"
                }
              ],
              "estilo": {
                "display": { "type": "apilado", "legend": "automático" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 5392245250417816,
            "definición": {
              "title": "Monitores Generando un Alto Volumen de Alertas",
              
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:noisy_monitor,$team,$service} by {team,suggestion_type}",
                      "aggregator": "último"
                    }
                  ],
                  "response_format": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "fórmula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q=","translation_17":""disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }{{team}}"
                }
              ],
              "style": { "display": { "type": "stacked" }, "palette": "grey" }
            },
            "layout": { "x": 6, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 1271026446632020,
            "definición": {
              "type": "nota",
              "content": "Monitores Atascados en Estado de Alerta",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "layout": { "x": 0, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 6315895116466318,
            "definición": {
              "type": "nota",
              "content": "Monitores Compuestos tienen Componentes Eliminados",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "tiene_relleno": true
            },
            "layout": { "x": 6, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 8251226565664096,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor ha estado alertando durante al menos 60 días\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 1329067816249636,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor es uno compuesto y tiene componentes eliminados\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_marcador": true,
              "tick_pos": "50%",
              "borde_marcador": "inferior",
              "tiene_relleno": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 7052384595427880,
            "definición": {
              "title": "Monitores Atascados en Estado de Alerta",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_team{!equipo:none,tipo_de_sugerencia:alertado_demasiado_tiempo,$equipo,$servicio} por {equipo,tipo_de_sugerencia}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{equipo}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "paleta": "naranja"
              }
            },
            "diseño": { "x": 0, "y": 31, "ancho": 6, "alto": 5 }
          },
          {
            "id": 2768363536962548,
            "definición": {
              "título": "Los monitores compuestos tienen componentes eliminados",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "sum:datadog.monitor.suggested_monitor_health_by_team{!equipo:none,tipo_sugerencia:composite_has_deleted_constituents ,$equipo,$servicio} por {equipo,tipo_sugerencia}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{equipo}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "paleta": "datadog16"
              }
            },
            "diseño": { "x": 6, "y": 31, "ancho": 6, "alto": 5 }
          }
        ]
      },
      "diseño": { "x": 0, "y": 3, "ancho": 12, "alto": 37 }
    },
    {
      "id": 2841959907422822,
      "definición": {
        "título": "Resumen general por servicio",
        "color_fondo": "rosa",
        "mostrar_título": true,
        "tipo": "grupo",
        "tipo_diseño": "ordenado",
        "widgets": [
          {
            "id": 3801590205295194,
            "definición": {
              "type": "nota",
              "content": "Esta sección está impulsada por la métrica `datadog.monitor.suggested_monitor_health_by_service`, que se emite diariamente.\n\nLos conteos de monitores reportados en esta métrica excluyen monitores sintéticos.\n\nEstos conteos representan el número total de sugerencias para mejoras en la calidad del monitor, desglosadas por servicio.\n\nUtiliza el filtro `service` para ver información específica de tu equipo.\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "background_color": "blanco",
              "font_size": "14",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": falso,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "has_padding": verdadero
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 8418200284207718,
            "definición": {
              "title": "Distribución de Mejoras de Calidad por Tipo",
              "title_size": "16",
              "title_align": "izquierda",
              "time": { "hide_incomplete_cost_data": verdadero },
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team,$service} by {suggestion_type}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "style": { "palette": "datadog16" },
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "count": 500,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "tipo": "sol"
              "ocultar_total": false,
              "leyenda": { "tipo": "automático" },
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{$servicio}}"
                }
              ]
            },
            "disposición": { "x": 5, "y": 0, "ancho": 7, "alto": 4 }
          },
          {
            "id": 8281740697966220,
            "definición": {
              "título": "Evolución de las Mejoras de Calidad por Tipo a lo Largo del Tiempo",
              "title_size": "16",
              "title_align": "izquierda",
              "mostrar_leyenda": false,
              "disposición_leyenda": "automático",
              "columnas_leyenda": ["promedio", "mínimo", "máximo", "valor", "suma"],
              "time": { "hide_incomplete_cost_data": verdadero },
              "tipo": "serie de tiempo",
              "solicitudes": [
                {
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_service{$equipo, $servicio} por {tipo_de_sugerencia}"
                    }
                  ],
                  "formato_de_respuesta": "serie de tiempo",
                  "estilo": {
                    "paleta": "datadog16",
                    "ordenar_por": "valores",
                    "tipo_de_linea": "sólido",
                    "ancho_de_linea": "normal"
                  },
                  "tipo_de_visualización": "línea"
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{$servicio}}"
                }
              ]
            },
            "disposición": { "x": 0, "y": 4, "ancho": 12, "alto": 4 }
          },
          {
            "id": 5048429332292860,
            "definición": {
              "título": "Principales servicios afectados",
              "title_size": "16",
              "title_align": "izquierda",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_service{!servicio:none,$equipo,$servicio} por {servicio,tipo_de_sugerencia}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "visualización": { "tipo": "apilado", "leyenda": "automático" }
              }
            },
            "diseño": { "x": 0, "y": 8, "ancho": 12, "alto": 5 }
          },
          {
            "id": 2233801928907094,
            "definición": {
              "type": "nota",
              "contenido": "Monitores con Destinatarios Faltantes por Servicio",
              "color_de_fondo": "azul_vivo",
              "tamaño_de_fuente": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": falso,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "has_padding": verdadero
            },
            "diseño": { "x": 0, "y": 13, "ancho": 6, "alto": 1 }
          },
          {
            "id": 7329031300309162,
            "definición": {
              "type": "nota",
              "contenido": "Monitores con Mangos Rotos por Servicio",
              "color_de_fondo": "verde_vivo",
              "tamaño_de_fuente": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": falso,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "has_padding": verdadero
            },
            "diseño": { "x": 6, "y": 13, "ancho": 6, "alto": 1 }
          },
          {
            "id": 7627510169738418,
            "definición": {
              "type": "nota",
              "contenido": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n no se encontró mango de notificación en el cuerpo del monitor\n el tipo de monitor no es `synthetics`\n\n_Puede usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "font_size": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_tic": true,
              "tick_pos": "50%",
              "borde_tic": "inferior",}}
              "has_padding": verdadero
            },
            "layout": { "x": 0, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 2826082028591748,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el manejador de notificaciones no es válido\n el tipo de monitor no es `synthetics`\n\n_Puede usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "font_size": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_tic": true,
              "tick_pos": "50%",
              "borde_tic": "inferior",}}
              "has_padding": verdadero
            },
            "layout": { "x": 6, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 5050954942402816,
            "definición": {
              "title": "Monitores con Destinatarios Faltantes por Servicio",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:missing_at_handle,$team,$service} by {service,suggestion_type}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 7809748805807956,
            "definición": {
              "title": "Monitores con Manejadores Rotos por Servicio",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:broken_at_handle,$team,$service} by {service,suggestion_type}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 8416588682594596,
            "definición": {
              "type": "nota",
              "content": "Monitores Silenciados por Demasiado Tiempo",
              "background_color": "purple",
              "tamaño_de_fuente": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": falso,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "has_padding": verdadero
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 4951606729784970,
            "definición": {
              "type": "nota",
              "content": "Monitores Generando un Alto Volumen de Alertas",}}
              "background_color": "verde",
              "tamaño_de_fuente": "18",
              "text_align": "centro",
              "vertical_align": "centro",
              "show_tick": falso,
              "tick_pos": "50%",
              "tick_edge": "izquierda",
              "has_padding": verdadero
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 1778359756038190,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor ha estado silenciado por al menos 60 días\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "font_size": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_tic": true,
              "tick_pos": "50%",
              "borde_tic": "inferior",}}
              "has_padding": verdadero
            },
            "layout": { "x": 0, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 8559060613933804,
            "definición": {
              "type": "nota",
              "content": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor genera el 5% superior de alertas en los últimos 10 días\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "font_size": "14",
              "alineación_de_texto": "izquierda",
              "vertical_align": "centro",
              "mostrar_tic": true,
              "tick_pos": "50%",
              "borde_tic": "inferior",}}
              "has_padding": verdadero
            },
            "layout": { "x": 6, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 7041249940897320,
            "definición": {
              "title": "Monitores Silenciados por Demasiado Tiempo",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {service,suggestion_type}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "palette": "semántico"
              }
            },
            "layout": { "x": 0, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 7810615049061724,
            "definición": {
              "title": "Monitores Generando un Alto Volumen de Alertas",
              "tipo": "lista_principal",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:noisy_monitor,$team,$service} by {service,suggestion_type}"
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "paleta": "gris"
              }
            },
            "disposición": { "x": 6, "y": 24, "ancho": 6, "alto": 5 }
          },
          {
            "id": 5108940190121326,
            "definición": {
              "tipo": "nota",
              "contenido": "Monitores Atascados en Estado de Alerta",
              "color_fondo": "amarillo_vivo",
              "tamaño_fuente": "18",
              "alineación_texto": "centro",
              "alineación_vertical": "centro",
              "mostrar_tick": false,
              "pos_tick": "50%",
              "borde_tick": "izquierda",
              "tiene_relleno": true
            },
            "diseño": { "x": 0, "y": 29, "ancho": 6, "alto": 1 }
          },
          {
            "id": 4931941666409286,
            "definición": {
              "tipo": "nota",
              "contenido": "Los Monitores Compuestos tienen Componentes Eliminados",
              "color_de_fondo": "gris",
              "tamaño_fuente": "18",
              "alineación_texto": "centro",
              "alineación_vertical": "centro",
              "mostrar_tick": false,
              "pos_tick": "50%",
              "borde_tick": "izquierda",
              "tiene_relleno": true
            },
            "diseño": { "x": 6, "y": 29, "ancho": 6, "alto": 1 }
          },
          {
            "id": 6520923360190496,
            "definición": {
              "tipo": "nota",
              "contenido": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor ha estado alertando durante al menos 60 días\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "alineación_vertical": "centro",
              "mostrar_tic": true,
              "pos_tick": "50%",
              "borde_tic": "inferior",
              "tiene_relleno": true
            },
            "diseño": { "x": 0, "y": 30, "ancho": 6, "alto": 2 }
          },
          {
            "id": 1364025765104008,
            "definición": {
              "tipo": "nota",
              "contenido": "Los conteos de monitores reportados en esta métrica satisfacen las siguientes condiciones:\n el monitor es uno compuesto y tiene componentes eliminados\n el tipo de monitor no es `synthetics`\n\n_Puedes usar los enlaces de contexto para saltar a la lista de monitores afectados._",
              "color_de_fondo": "amarillo",
              "tamaño_de_fuente": "14",
              "alineación_de_texto": "izquierda",
              "alineación_vertical": "centro",
              "mostrar_tic": true,
              "pos_tick": "50%",
              "borde_tic": "inferior",
              "tiene_relleno": true
            },
            "diseño": { "x": 6, "y": 30, "ancho": 6, "alto": 2 }
          },
          {
            "id": 3670188762233230,
            "definición": {
              "título": "Monitores Atascados en Estado de Alerta",
              "tipo": "lista superior",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_service{!servicio:none,tipo_de_sugerencia:alertado_demasiado_tiempo,$equipo,$servicio} por {servicio,tipo_de_sugerencia}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "paleta": "naranja"
              }
            },
            "diseño": { "x": 0, "y": 32, "ancho": 6, "alto": 5 }
          },
          {
            "id": 9006201303765196,
            "definición": {
              "título": "Los Monitores Compuestos tienen Componentes Eliminados"
              "tipo": "lista superior",
              "solicitudes": [
                {
                  "consultas": [
                    {
                      "nombre": "consulta1",
                      "fuente_de_datos": "métricas",
                      "consulta": "suma:datadog.monitor.suggested_monitor_health_by_service{!servicio:none,tipo_de_sugerencia:alertado_demasiado_tiempo,$equipo,$servicio} por {servicio,tipo_de_sugerencia}",
                      "agregador": "último"
                    }
                  ],
                  "formato_de_respuesta": "escalar",
                  "fórmulas": [{ "fórmula": "consulta1" }],
                  "ordenar": {
                    "cantidad": 10,
                    "ordenar_por": [
                      { "tipo": "fórmula", "índice": 0, "orden": "desc" }
                    ]
                  }
                }
              ],
              "enlaces_personalizados": [
                {
                  "etiqueta": "Ver lista de monitores",
                  "enlace": "https://app.datadoghq.com/monitors/quality?q={{servicio}}"
                }
              ],
              "estilo": {
                "mostrar": { "tipo": "apilado", "leyenda": "automático" },
                "paleta": "datadog16"
              }
            },
            "diseño": { "x": 6, "y": 32, "ancho": 6, "alto": 5 }
          }
        ]
      },
      "diseño": {
        "x": 0,
        "y": 40,
        "ancho": 12,
        "alto": 38,
        "es_salto_de_columna": true
      }
    }
  ],
  "variables_de_plantilla": [
    {
      "nombre": "equipo",
      "prefijo": "equipo",
      "valores_disponibles": [],
      "predeterminado": "*"
    },
    {
      "nombre": "servicio",
      "prefijo": "servicio",
      "valores_disponibles": [],
      "predeterminado": "*"
    }
  ],
  "tipo_de_diseño": "ordenado",
  "lista_de_notificaciones": [],
  "tipo_de_reflujo": "fijo"
}
```

## Further reading

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