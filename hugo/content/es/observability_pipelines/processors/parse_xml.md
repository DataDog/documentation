---
description: Aprenda a usar el procesador Parse XML para realizar el parseo de datos
  XML de modo que puedan ser procesados y enviados a destinos.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: Blog
  text: Enrutar datos de OTel de aplicaciones de IA a ClickHouse y Datadog usando
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: Blog
  text: Simplifique la recopilación y agregación de registros para MSSP con Datadog
    Observability Pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-parsing-xml-logs/
  tag: Blog
  text: Simplifique la recopilación y el procesamiento de registros XML con Observability
    Pipelines
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Parse XML
---
{{< product-availability >}}

## Descripción general {#overview}

Este procesador analiza Extensible Markup Language (XML) para que los datos puedan ser procesados y enviados a diferentes destinos. XML es un formato de registro utilizado para almacenar y transportar datos estructurados. Está organizado en una estructura similar a un árbol para representar información anidada y utiliza etiquetas y atributos para definir los datos. Por ejemplo, estos son datos XML que usan solo etiquetas (`<recipe>`, `<type>` y `<name>`) y ningún atributo:

```xml
<recipe>
    <type>pasta</type>
    <name>Carbonara</name>
</recipe>
```

Este es un ejemplo de XML donde la etiqueta `recipe` tiene el atributo `type`:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

La siguiente imagen muestra un registro de evento 4625 de Windows en XML, junto al mismo registro parseado y generado en JSON. Al realizar el parseo del registro XML, el tamaño del evento de registro se redujo aproximadamente un 30%.

{{< img src="observability_pipelines/processors/xml-side-by-side.png" alt="El registro XML y el registro parseado resultante en JSON" style="width:80%;" >}}

## Configuración {#setup}

Para configurar este procesador:

1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
   - Solo se procesan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Ingrese la ruta al campo de registro en el que desea realizar el parseo de XML. Use la notación de ruta `<OUTER_FIELD>.<INNER_FIELD>` para hacer coincidir subcampos. Consulte el [ejemplo de notación de ruta](#path-notation-example-parse-xml) a continuación.
1. Opcionalmente, en el campo `Enter text key`, ingrese el nombre de clave que se usará para el nodo de texto cuando se agreguen atributos XML. Consulte el [ejemplo de clave de texto](#text-key-example). Si el campo se deja vacío, se usa `value` como nombre de clave.
1. Opcionalmente, seleccione {{< ui >}}Always use text key{{< /ui >}} si desea almacenar texto dentro de un objeto usando la clave de texto incluso cuando no existan atributos.
1. Opcionalmente, active {{< ui >}}Include XML attributes{{< /ui >}} si desea incluir atributos XML. Luego puede elegir agregar el prefijo de atributo que desea usar. Consulte el [ejemplo de prefijo de atributo](#attribute-prefix-example). Si el campo se deja vacío, se utiliza la clave de atributo original.
1. Opcionalmente, seleccione si desea convertir los tipos de datos en números, booleanos o nulos.
    - Si se selecciona {{< ui >}}Numbers{{< /ui >}}, los números se parsean como enteros y flotantes.
    - Si se selecciona {{< ui >}}Booleans{{< /ui >}}, `true` y `false` se parsean como booleanos.
    - Si se selecciona {{< ui >}}Nulls{{< /ui >}}, la cadena `null` se parsea como nula.

### Ejemplo de notación de ruta {#path-notation-example-parse-xml}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

### Siempre use el ejemplo de clave de texto {#always-use-text-key-example}

Si se selecciona {{< ui >}}Always use text key{{< /ui >}}, la clave de texto es la predeterminada (`value`) y tiene el siguiente XML:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

El XML se convierte en:

```json
{
    "recipe": {
        "type": "pasta",
        "value": "Carbonara"
        }
}
```

### Ejemplo de clave de texto {#text-key-example}

Si la clave es `text` y tiene el siguiente XML:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

El XML se convierte en:

```json
{
    "recipe": {
        "type": "pasta",
        "text": "Carbonara"
        }
}
```

### Ejemplo de prefijo de atributo {#attribute-prefix-example}

Si habilita {{< ui >}}Include XML attributes{{< /ui >}}, el atributo se agrega como prefijo a cada atributo XML. Por ejemplo, si el prefijo de atributo es `@` y tiene el siguiente XML:

```xml
<recipe type="pasta">Carbonara</recipe>
```

Entonces se convierte al JSON:

```json
{
    "recipe": {
        "@type": "pasta",
        "<text key>": "Carbonara"
        }
}
```

## Métricas de estado {#health-metrics}

Para [métricas de componentes][2] y [métricas de búfer de procesador][3] emitidas por todos los procesadores, consulte la documentación de [Pipelines Usage Metrics][4]. Para filtrar o agrupar por métricas del procesador de parseo, utilice la etiqueta `component_type:parse`.

[1]: /es/observability_pipelines/search_syntax/logs/
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}