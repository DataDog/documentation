---
aliases:
- /es/service_management/app_builder/custom_charts/
- /es/service_management/app_builder/components/custom_charts
description: Cree gráficos personalizados en aplicaciones usando especificaciones
  de Vega-Lite para visualizar datos de consultas con varios tipos y estilos de gráficos.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /actions/workflows/build/
  tag: Documentación
  text: Crear aplicaciones
title: Gráficos personalizados
---
Esta página proporciona un ejemplo de cómo usar el componente de gráfico personalizado en sus aplicaciones de App Builder.

El flujo de trabajo básico para crear un gráfico personalizado es el siguiente:

1. Cree o elija una consulta que contenga los datos que desea graficar.
1. Agregue el componente de gráfico personalizado y elija un estilo de gráfico desde la interfaz de usuario de App Builder o la [galería de ejemplos de Vega-Lite][1].
1. Reemplace los valores en el ejemplo con los datos de su consulta.

Alternativamente, puede usar Bits AI para comenzar con un gráfico personalizado:
   1. Haga clic en el icono {{< ui >}}Build with AI{{< /ui >}} ({{< ui >}}<i class="icon-bits-ai"></i>{{< /ui >}}).
   1. Ingrese un prompt personalizado, o pruebe el prompt `Can you help me create a custom chart?`.

## Flujo de configuración de ejemplo {#example-setup-flow}

El siguiente ejemplo muestra cómo crear un gráfico de histograma que ilustra los registros de Datadog agrupados por servicio.

### Configure su fuente de datos {#set-up-your-data-source}

1. Haga clic en {{< ui >}}\+ New Query{{< /ui >}}.
1. Busque "search logs" y elija la acción Datadog {{< ui >}}Search logs{{< /ui >}} para crear una consulta llamada `searchLogs0`.
1. Elija una conexión de cuenta de Datadog existente, o cree una nueva.
1. En {{< ui >}}Inputs{{< /ui >}}, para {{< ui >}}Time period{{< /ui >}}, elija {{< ui >}}Past 2 Days{{< /ui >}}.
1. Haga clic en {{< ui >}}Run{{< /ui >}}.<br>Un panel muestra los resultados de su consulta en la parte inferior izquierda.
1. En `logs`, expanda `0`, luego expanda `content`. Esto muestra las propiedades disponibles para cada registro.


### Agregue el componente de gráfico personalizado y elija un estilo de gráfico {#add-the-custom-chart-component-and-choose-a-chart-style}

1. Haga clic en {{< ui >}}\+ All Components{{< /ui >}} y seleccione {{< ui >}}Custom Chart{{< /ui >}} para agregar un componente llamado `customChart0`.
1. Haga clic en {{< ui >}}Show Chart Examples{{< /ui >}}.
1. Seleccione {{< ui >}}Simple Histogram{{< /ui >}} y haga clic en {{< ui >}}Confirm{{< /ui >}}.<br>El siguiente valor se completa en la especificación de Vega-Lite:

   {{< code-block lang="json" disable_copy="true" collapsible="true" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "https://vega.github.io/editor/data/movies.json"
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "bin": true,
            "field": "IMDB Rating"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}{{< /code-block >}}


### Reemplace los valores de ejemplo con sus datos {#replace-example-values-with-your-data}

Reemplace la especificación de Vega-Lite completada automáticamente con lo siguiente para cambiar la fuente de datos y el valor que se grafica en el eje x:

{{< highlight json "hl_lines=4 12" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "values": searchLogs0.outputs.logs
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "content.service"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}
{{< /highlight >}}

Se muestra un gráfico de histograma con sus datos de Datadog Logs.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tiene preguntas o comentarios? Únase al canal **#app-builder** en el [Datadog Community Slack][0].

[0]: https://chat.datadoghq.com/
[1]: https://vega.github.io/vega-lite/examples/