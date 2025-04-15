---
further_reading:
- link: https://docs.datadoghq.com/dashboards/widgets/wildcard/
  tag: Documentación
  text: Más información sobre widgets comodín
- link: https://docs.datadoghq.com/dashboards/guide/widget_colors/
  tag: Documentación
  text: Seleccionar colores adecuados para tus gráficos
- link: https://docs.datadoghq.com/dashboards/guide/context-links/#context-links-variables
  tag: Documentación
  text: Uso de enlaces contextuales en dashboards
title: Uso de Vega-Lite con widgets comodín en Datadog
---

## Información general

Al utilizar Vega-Lite con widgets comodín en Datadog encontrarás extensiones de la especificación Vega-Lite que son exclusivas de Datadog. Esta guía describe las configuraciones y consideraciones necesarias para utilizar eficazmente Vega-Lite para la visualización de datos en Datadog, garantizando la compatibilidad con sus especificaciones exclusivas. Si comprendes y aprovechas estas especificaciones, podrás crear visualizaciones de datos interactivas y visualmente atractivas que sean eficaces y respondan a tus preferencias temáticas.

**Nota**: Algunas extensiones en Vega-Lite son exclusivas de Datadog y podrían no funcionar de la misma manera si se exportan a otras herramientas que tengan Vega-lite.

## Personalizar la temática y las paletas de colores

Datadog ofrece diversas opciones de temas y paleta de colores para realzar el atractivo visual de los widgets. Puedes especificar colores personalizados para que se mezclen con las opciones de estilo utilizadas por widgets nativos de Datadog. Si defines colores personalizados, el gráfico no ajustará los colores cuando cambies el tema de la aplicación. Por defecto, los gráficos de Datadog ajustan los colores del texto y las marcas de los ejes para garantizar un contraste legible cuando se visualizan en modo oscuro. Es mejor evitar definir colores personalizados para los ejes de los gráficos.

Puedes personalizar el color, la fuente, el espaciado y otros ajustes de diseño. Estos ajustes se aplican automáticamente al utilizar el conmutador de temas (`CTRL + OPT + D`).

### Paleta de colores personalizada

Aunque puedes crear paletas de colores personalizadas utilizando códigos hexadecimales, el uso de la paleta de colores de Datadog garantiza el cambio automático entre los modos claro y oscuro.

Datadog ofrece paletas de colores adicionales más allá de los esquemas de colores públicos de Vega, incluyendo:  
- `dog_classic_area`  
- `datadog16`  
- `hostmap_blues`

{{< whatsnext desc="Recursos adicionales:" >}}
    {{< nextlink href="/dashboards/guide/widget_colors/" >}}Más información sobre esquemas y temas de colores de Datadog{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega/docs/schemes/" >}}Consultar los esquemas de colores de Vega{{< /nextlink >}}
{{< /whatsnext >}}


## Personalizar las unidades de visualización

Datadog ofrece el formateo de números dependientes de unidades para [más de 150 unidades][1], lo que te permite formatear fácilmente valores como 3600 (segundos) como 1 (hora). Para utilizar esta función en tu definición de Vega-Lite, añade el parámetro `"config": {"customFormatTypes": true}` a la raíz de tu bloque JSON.

A continuación, siempre que definas una clave `format`, utiliza `formatType: hoverFormatter` y define tus unidades como una matriz. Por ejemplo:

{{% collapse-content title="Ejemplo de especificación Vega-Lite con unidades personalizadas" level="h4" %}}
{{< highlight json "hl_lines=11 19-20" >}}
{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
    "values": [
        {"grade": "A", "total": 28},
        {"grade": "B", "total": 55},
        {"grade": "C", "total": 43}
    ]
    },
    "config": {"customFormatTypes": true},
    "mark": "bar",
    "encoding": {
        "x": {"field": "total", "type": "quantitative"},
        "y": {
            "field": "grade",
            "type": "nominal",
            "axis": {
                "formatType": "hoverFormatter",
                "format": {"units": ["second", null]}
            }
        }
    }
}
{{< /highlight >}}


{{% /collapse-content %}} 

El segundo elemento de la matriz de "unidades" representa una unidad "por", como en "bits por segundo". Las unidades deben proporcionarse en formato singular (por ejemplo, "segundo" en lugar de "segundos"). Para dar formato a los números, como la precisión, la notación científica o los números enteros, se utilizan los tokens [d3-format][2]. Dos formatos populares son:

* `~s`: prefijo científico (por ejemplo, 2000 -> 2k), sin los ceros finales
* `.2f`; punto flotante a 2 decimales

El `hoverFormatter` también se puede llamar en [expresiones Vega][3]. Esta función tiene la firma de:

```
# `CanonicalUnitName` se refiere a cualquiera de las cadenas enumeradas como unidad Datadog.

(
 datum: number,
   params?: {
 units?: [CanonicalUnitName, CanonicalUnitName];
   },
)
```

 {{< whatsnext desc="Recursos adicionales:" >}}
 {{< nextlink href="/metrics/units/#unit-list" >}}Lista completa de unidades Datadog{{< /nextlink >}}
 {{< nextlink href="https://vega.github.io/vega-lite/docs/format.html" >}}Personalización del formato Vega-Lite{{< /nextlink >}}
 {{< nextlink href="https://vega.github.io/vega/docs/expressions/" >}}Lenguaje de la expresión Vega para escribir fórmulas básicas{{< /nextlink >}}
{{< /whatsnext >}}


## Tamaño adaptable

Los widgets suelen utilizar un tamaño adaptable por defecto, ajustándose automáticamente al espacio disponible. Sin embargo, tienes la opción de definir una altura fija para cada elemento de datos, sobre todo si quieres habilitar el desplazamiento dentro de un gráfico de barras. Al igual que con la personalización de los colores, la personalización del tamaño desactiva el ajuste automático.

Por ejemplo, puedes utilizar la siguiente configuración para especificar un incremento de altura para cada elemento:

{{% collapse-content title="Ejemplo de especificación Vega-Lite con una altura personalizada" level="h4" %}}
{{< highlight json "hl_lines=3" >}}
{
    "width": 120,
    "height": 120,
    "data": {"url": "data/cars.json"},
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "Name",
            "scale": {"round": false}
        },
        "y": {"aggregate": "count"}
    }
}
{{< /highlight >}}


{{% /collapse-content %}} 

## Referencia a datos de Datadog en Vega-Lite

En Datadog, cada "solicitud" o consulta corresponde a una [fuente de datos con nombre][4] de Vega. La numeración de estas fuentes comienza en uno. Esto significa que si tu widget realiza varias solicitudes, genera conjuntos de datos correspondientes denominados `table1`, `table2` y así sucesivamente.

{{< img src="/dashboards/guide/using_vega_lite_in_wildcard_widgets/wildcard_multiple_requests.png" alt="Ejemplo de widget comodín con varias solicitudes" style="width:100%;" >}}

Siempre que sea posible, los widgets de Datadog conservan los nombres de etiquetas (tags) del campo "agrupar por" de tu solicitud. Para las solicitudes de fórmula y función, como Escalar o Series temporales, se utilizan "Alias de fórmula" como nombres de campo. Para ver un ejemplo, consulta la documentación [Widget comodín][5].

### Información de campo adicional

- Las solicitudes con series temporales incluyen un campo `_time` para marcas de tiempo en milisegundos.
- Las filas de solicitudes con histogramas tienen tres campos: `start`, `end` y `count`. 
- Las respuestas a las solicitudes de listas varían según la fuente de datos. Utiliza la [Vista previa de datos][6] para determinar los campos disponibles.

### Nombres de campo con caracteres especiales

Se aplican consideraciones especiales a los nombres de campo que contienen caracteres no alfanuméricos. Las etiquetas de métricas de Datadog [prohíben la mayoría de los caracteres no alfanuméricos][7]. Sin embargo, no todos los productos tienen esta restricción y permiten caracteres en nombres de atributos que pueden tener doble significado en Vega-Lite. Estos caracteres incluyen los corchetes `[]` y los puntos `.` que se utilizan para acceder a propiedades anidadas en datos con forma de objeto. Deben escaparse, ya que el backend aplana los datos antes de devolvértelos para tus datos /escalares y /series temporales.

Para garantizar que estos caracteres sean interpretados correctamente por el widget comodín, debes escapar estos caracteres con `\\`. Por ejemplo, al utilizar el campo de consulta de RUM `@view.name`, escríbelo como `@view\\.name` en la especificación Vega-Lite.

Para obtener más información sobre los formatos de datos admitidos, consulta la documentación [Widget comodín][11].

## Menú contextual y enlaces contextuales

Con los widgets de Datadog puedes hacer clic en un punto de datos del gráfico para abrir un [menú contextual del gráfico][8] con enlaces contextuales. Puedes activar esta función en widgets comodín añadiendo parámetros específicos a la configuración de tu widget.

Para activar la función de menú contextual, incluye los siguientes parámetros en tu configuración de Vega-Lite:

```
"params": [
  {
    "name": "datadogPointSelection",
    "select": "point"
  }
]
```

Una vez activada esta función, puedes hacer clic en los puntos de datos del widget para abrir un menú contextual. Utiliza el menú contextual del gráfico con los enlaces contextuales del editor de gráficos. Los enlaces contextuales sirven de puente entre widgets de dashboards y otras páginas de Datadog, así como con las aplicaciones de terceros que hayas integrado en tus flujos de trabajo. Para obtener más información, consulta [Enlaces contextuales][9].

También puedes añadir enlaces personalizados dinámicos a través de la [codificación `href`][10]. Esto es útil si no necesitas un menú contextual con todas las opciones.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/units/#unit-list
[2]: https://d3js.org/d3-format#locale_format
[3]: https://vega.github.io/vega/docs/expressions/
[4]: https://vega.github.io/vega-lite/docs/data.html#named
[5]: /es/dashboards/widgets/wildcard/#map-datadog-data-to-vega-lite-specifications
[6]: /es/dashboards/widgets/wildcard/#data-preview
[7]: /es/getting_started/tagging/#define-tags
[8]: /es/dashboards/widgets/#graph-menu
[9]: /es/dashboards/guide/context-links/#context-links-variables
[10]: https://vega.github.io/vega-lite/docs/encoding.html
[11]: /es/dashboards/widgets/wildcard/#compatible-data-formats