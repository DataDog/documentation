---
aliases:
- /es/service_management/app_builder/custom_charts/
disable_toc: false
further_reading:
- link: /service_management/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /service_management/workflows/build/
  tag: Documentación
  text: Crear aplicaciones
title: Gráficos personalizados
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> ({{< region-param key="dd_site_name" >}}) seleccionado.</div>
{{< /site-region >}}

Esta página te muestra un ejemplo de cómo utilizar el componente de gráfico personalizado en tus aplicaciones App Builder.

El flujo de trabajo básico para crear un gráfico personalizado es el siguiente:

1. Crea o elige una consulta que contenga los datos que quieres graficar.
1. Añade el componente de gráfico personalizado y elige un estilo de gráfico de la interfaz de usuario de App Builder o de la [galería de ejemplos de Vega-Lite][1].
1. Sustituye los valores del ejemplo por los datos de tu consulta.

## Ejemplo de flujo de una configuración

El siguiente ejemplo muestra cómo crear un gráfico de histograma para ilustrar logs de Datadog agrupados por servicio.

### Configurar tu fuente de datos

1. Haz clic en **+ New Query** (+ Nueva consulta).
1. Busca "buscar logs" y elige la acción **Buscar logs** de Datadog para crear una consulta llamada `searchLogs0`.
1. Elige una conexión de cuenta de Datadog existente o crea una nueva.
1. En **Entradas**, para **Periodo de tiempo**, elige **Pasados 2 días**.
1. Haz clic en **Run** (Ejecutar).<br>En la parte inferior izquierda aparece un panel con los resultados de tu consulta.
1. En `logs`, expande `0` y luego expande `content`. Esta acción te muestra las propiedades disponibles de cada log.


### Añadir el componente de gráfico personalizado y elegir un estilo de gráfico

1. Haz clic en **+ All Components** (+ Todos los componentes) y selecciona **Gráfico personalizado** para añadir un componente llamado `customChart0`.
1. Haz clic en **Show Chart Examples** (Mostrar ejemplos de gráficos).
1. Selecciona **Histograma simple** y haz clic en **Confirm** (Confirmar).<br>El siguiente valor se rellena en la especificación de Vega:

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


### Sustituir los valores de ejemplo por tus propios datos

Sustituye la especificación de Vega rellenada automáticamente por lo siguiente, para cambiar la fuente de datos y el valor que se representa gráficamente en el eje x:

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

Aparece un gráfico de histograma con los datos de tus logs de Datadog.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>¿Tienes preguntas o comentarios? Únete al canal **#app-builder** en [Datadog Community Slack][0].

[0]: https://datadoghq.slack.com/
[1]: https://vega.github.io/vega-lite/examples/