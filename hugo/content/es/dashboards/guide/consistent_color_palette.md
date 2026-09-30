---
description: Descubra por qué pueden aparecer colores duplicados en la paleta de colores
  coherentes y cómo solucionar esta limitación en dashboards con muchos valores de
  tags (etiquetas).
further_reading:
- link: dashboards/guide/widget_colors
  tag: Documentación
  text: Seleccionar colores adecuados para tus gráficos
- link: dashboards/guide/compatible_semantic_tags
  tag: Documentación
  text: Tags (etiquetas) semánticas compatibles
title: Comprensión de los colores duplicados en la paleta coherente
---

## Información general

La paleta de colores **Consistent** (coherente) está diseñada para asignar colores estables y repetibles a los valores de las tags (etiquetas), lo que facilita la correlación de datos entre gráficos a lo largo del tiempo. Sin embargo, no rastrea los colores que ya se están utilizando en un widget determinado. Esto puede dar lugar a que aparezcan colores duplicados en un mismo gráfico, especialmente cuando se muestran muchos valores de tag (etiqueta).

En esta guía se explica por qué se duplican los colores de las tags (etiquetas) cuando se utiliza la paleta Coherente y se describen las opciones para mitigar este comportamiento.

## Por qué se duplican los colores

{{< img src="/dashboards/guide/consistent_color_palette/duplicate_color_tags.png" alt="Ejemplo de colores duplicados de (tag) en un gráfico circular de dashboard" style="width:100%;" >}}

La paleta coherente asigna los valores de las tags (etiquetas) a los colores mediante un algoritmo hash determinista. Esto garantiza que un valor de tag (etiqueta) específico aparezca siempre con el mismo color en todos los dashboards, notebooks y períodos de tiempo. Sin embargo, la paleta:

- **No rastrea los colores que ya se han utilizado** en un gráfico específico.
- **Utiliza un conjunto limitado de 16-20 colores curados**, elegidos por su accesibilidad, contraste de color y compatibilidad con el modo oscuro.

Dado que la asignación de colores es fija y la paleta es limitada, es posible que se asignen varios valores de tag (etiqueta) al mismo color, sobre todo cuando el número de grupos de tags (etiquetas) supera el número de colores disponibles.

Este compromiso da prioridad a la coherencia del color a lo largo del tiempo y de las vistas frente a la unicidad dentro de un mismo widget.

## Utilizar sustituciones de colores

Si tu gráfico muestra un número pequeño y relativamente fijo de valores de tag (etiqueta) (menos de 15), como centros de datos o regiones, puedes asignar un color único a cada serie utilizando la función de sustitución de colores. Para obtener más información, consulta [Sustitución de colores][1].

{{% collapse-content title="Example dashboard tiledef" level="h4" expanded=false %}}
```json
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "semantic",
                "type": "solid",
                "width": "normal"
            },
            "type": "area",
            "formulas": [
                {
                    "style": {
                        "palette": "classic",
                        "palette_index": 0
                    },
                    "alias": "ap1",
                    "formula": "query2"
                },
                {
                    "style": {
                        "palette": "classic",
                        "palette_index": 4
                    },
                    "alias": "eu1",
                    "formula": "query1"
                },
                {
                    "style": {
                        "palette": "green",
                        "palette_index": 3
                    },
                    "alias": "us1",
                    "formula": "query3"
                },
                {
                    "style": {
                        "palette": "warm",
                        "palette_index": 3
                    },
                    "alias": "us3",
                    "formula": "query4"
                },
                {
                    "style": {
                        "palette": "purple",
                        "palette_index": 5
                    },
                    "alias": "us5",
                    "formula": "query5"
                }
            ],
            "queries": [
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:ap1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query2"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:eu1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query1"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us1.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query3"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us3.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query4"
                },
                {
                    "query": "sum:process.reporting_processes.total{app:process-resolver ,datacenter:us5.prod.dog}.fill(last).rollup(max).weighted()",
                    "data_source": "metrics",
                    "name": "query5"
                }
            ],
            "response_format": "timeseries"
        }
    ],
    "yaxis": {
        "include_zero": true,
        "scale": "linear",
        "label": "",
        "min": "auto",
        "max": "auto"
    },
    "markers": []
}
```
{{% /collapse-content %}}

## Limitaciones y problemas de mantenimiento

Este comportamiento de duplicación de colores es una limitación conocida de la paleta Coherente. En los dashboards con muchos valores agrupados o tags (etiquetas) dinámicas, la duplicación de colores puede reducir la claridad visual.

Si bien puedes sustituir manualmente los colores por serie utilizando la función de sustitución de colores, esto puede llevar mucho tiempo de mantenimiento, especialmente cuando:
- El número de valores de las tags (etiquetas) cambia con frecuencia.
- Es necesario aplicar la misma lógica a muchos widgets.

Para simplificar este proceso, considera la posibilidad de automatizar la creación de widgets ([Terraform][2]) o las actualizaciones mediante scripts en lugar de mantener definiciones JSON estáticas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/widget_colors/#color-overrides
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/dashboard