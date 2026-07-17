---
description: Aprende a crear visualizaciones personalizadas utilizando el widget comodín
  con la gramática Vega-Lite y consultas importadas.
further_reading:
- link: /dashboards/widgets/wildcard/
  tag: Documentación
  text: Información general del widget comodín
- link: /dashboards/guide/wildcard_examples/
  tag: Guía
  text: Ejemplos de visualizaciones de widgets comodín
- link: /dashboards/guide/using_vega_lite_in_wildcard_widgets/
  tag: Guía
  text: Uso de Vega-Lite en widgets comodín
title: Empezando con el widget comodín
---

## Información general

El widget comodín es una potente y flexible herramienta de visualización en Datadog que permite crear representaciones visuales personalizadas utilizando la [gramática Vega-Lite][1].

### Objetivos del tutorial

Al final de este tutorial, podrás:

* Utilizar conceptos de Vega-Lite para definir visualizaciones en widgets comodín.
* Importar una consulta de un widget existente.

### Requisitos previos

* Una cuenta Datadog con acceso a [notebooks][2] o [dashboards][3].
* Dispones de telemetría como datos de rastreo APM o métricas de duración de las solicitudes.
* Tienes conocimiento de los widgets y dashboards básicos de Datadog y puedes [añadir un widget y editarlo][4].

## Paso 1: Importar una consulta existente

En lugar de empezar desde cero, importa una consulta de un widget existente. Copia la consulta de un widget que te interese explorar más a fondo (como una lista principal). Para empezar, puedes utilizar widgets de tus [dashboards precreados][5].

1. Ve a un dashboard existente con un widget útil (lista principal de consultas de bases de datos).
2. Utiliza el menú de widgets o el atajo de teclado (<kbd>Ctrl</kbd>/<kbd>CMD</kbd> + <kbd>C</kbd>) para copiar el widget.
3. En un nuevo dashboard, añada un widget comodín.
4. En el editor, borra la consulta por defecto ({{< img src="/icons/cancel-circle.png" alt="Icono X para borrar la consulta" inline="true" width="40px">}}).
5. Pega la solicitud copiada con <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd>. La consulta y los campos asociados se transfieren automáticamente.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/import_widget_walkthrough.mp4" alt="Presentación del proceso de importación de una consulta de widget a un widget comodín en Datadog" video=true >}}

## Paso 2: Afinar la consulta

En el editor de consultas:

1. Despliega **Data Preview** (Vista previa de datos) para identificar los campos devueltos por la consulta.
2. Junto a tu consulta, haz clic en **As** (Como) para añadir un alias a tu consulta. Esto añade claridad, por ejemplo, cambia el nombre a `p50:trace.http.request{*} by {service}`→ `p50`.

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/refine_query_walkthrough.mp4" alt="Presentación del proceso de refinado de una consulta en el widget comodín, incluyendo el cambio de nombre de los campos y el agregado de una fórmula P95" video=true >}}

## Paso 3: Generar una visualización de forma automática

En la parte superior del editor de consultas:

1. Haz clic en la pestaña **Define Visual** (Definir Visual).
2. Presiona <kbd>Cmd</kbd> + <kbd>Mayúsc</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Mayúsc</kbd> + <kbd>P</kbd> (Windows/Linux) para abrir la **Paleta de comandos**.
3. Selecciona **Auto-select chart** (Seleccionar gráfico de forma automática).

{{< img src="/dashboards/guide/analyze_p50_vs_p95_latency_with_the_wildcard_widget/command_palette.mp4" alt="Descripción de tu imagen" video=true >}}

Datadog crea automáticamente una visualización basada en tu consulta.

<div class="alert alert-tip">
Utiliza la paleta de comandos<kbd>(Cmd</kbd> + <kbd>Mayús</kbd> + <kbd>P</kbd>) para seleccionar de forma automática un tipo de gráfico basado en tu consulta, añadir o editar codificaciones, o rotar ejes/cambiar el tipo de gráfico.
</div>

{{% collapse-content title="Ejemplo guiado de generación automática" level="h4" expanded=false %}}
1. En un nuevo widget comodín, haz clic en la pestaña JSON del editor de consultas y pega la siguiente consulta:
    ```json
    {
      "response_format": "scalar",
      "queries": [
        {
          "query":       "avg:system.cpu.user{*} by {env}",
          "data_source": "metrics",
          "name":        "query1",
          "aggregator":  "last"
        },
        {
          "query":       "max:system.cpu.user{*} by {env}",
          "data_source": "metrics",
          "name":        "query2",
          "aggregator":  "last"
        }
      ],
      "formulas": [
        { "formula": "query1" },
        { "formula": "query2" }
      ],
      "sort": {
        "count": 15,
        "order_by": [
          {
            "type":   "formula",
            "index":  0,
            "order":  "desc"
          }
        ]
      }
    }
    ```
1. Haz clic en **Save Edits** (Guardar modificaciones).
2. En la parte superior del editor de consultas, haz clic en la pestaña **Define Visual** )Definir Visual).
3. Presiona <kbd>Cmd</kbd> + <kbd>Mayúsc</kbd> + <kbd>P</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>Mayúsc</kbd> + <kbd>P</kbd> (Windows/Linux) para abrir la **Paleta de comandos**.
4. Selecciona **Auto-select chart** (Seleccionar gráfico de forma automática). El gráfico cambia de forma automática de diagrama de barras a diagrama de dispersión.

{{% /collapse-content %}}

## Paso 4: Añadir un menú contextual

Para añadir interactividad a tu gráfico, activa el menú contextual.

1. En el editor visual JSON, copia y pega el siguiente ejemplo de widget de gráfico de barras para ver cómo añadir un menú contextual. Este ejemplo incluye las configuraciones Tooltip y Menú contextual.
   {{< highlight json "hl_lines=37-41" >}}
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "descripción": "Gráfico de barras que muestra el uso de la CPU por entorno con soporte del menú contextual Datadog ",
  "data": {
    "name": "table1"
  },
  "marca": "bar",
  "encoding": {
    "x": {
      "field": "env",
      "type": "nominal",
      "sort": "-y",
      "title": "Environment"
    },
    "y": {
      "field": "query1",
      "type": "quantitative",
      "title": "CPU Usage (%)"
    },
    "tooltip": [
      {
        "field": "env",
        "type": "nominal"
      },
      {
        "field": "query1",
        "type": "quantitative",
        "title": "CPU Usage (%)"
      },
      {
        "field": "timestamp",
        "type": "temporal",
        "title": "Timestamp"
      }
    ]
  },
  "params": [
    {
      "name": "datadogPointSelection",
      "select": "point"
    }
  ]
}
{{< /highlight >}}
2. Ejecuta y guarda el widget.
3. En tu panel de control, busca el widget que acabas de crear y haz clic en cualquier punto de datos del gráfico para abrir un **menú contextual**.

Para obtener más información, consulta [Uso de Vega-Lite con widgets comodín en Datadog][6].

## Próximos pasos

Los widgets comodín admiten una amplia gama de personalizaciones, entre las que se incluyen:
- [Ajuste del grosor de las líneas para mostrar el peso y la intensidad][7]
- [Añadir imágenes para representar visualmente los valores][8]
- [Visualizaciones por capas para un contexto más rico][9].

Para obtener más inspiración, consulta [ejemplos de widgets comodín de Datadog][10] y [ejemplos de Vega-Lite][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vega.github.io/vega-lite/
[2]: https://app.datadoghq.com/notebook/list
[3]: https://app.datadoghq.com/dashboard/lists?p=1
[4]: /es/dashboards/widgets/wildcard/#setup
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?p=1
[6]: /es/dashboards/guide/using_vega_lite_in_wildcard_widgets/#context-menu-and-context-links
[7]: https://vega.github.io/vega-lite/examples/trail_color.html
[8]: https://vega.github.io/vega-lite/examples/isotype_bar_chart_emoji.html
[9]: https://vega.github.io/vega-lite/examples/layer_line_rolling_mean_point_raw.html
[10]: /es/dashboards/guide/wildcard_examples/
[11]: https://vega.github.io/vega-lite/examples/