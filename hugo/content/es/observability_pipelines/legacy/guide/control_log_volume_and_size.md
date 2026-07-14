---
aliases:
- /es/integrations/observability_pipelines/guide/control_log_volume_and_size/
- /es/observability_pipelines/guide/control_log_volume_and_size/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos utilizando Observability Pipelines
- link: /observability_pipelines/legacy/configurations/
  tag: Documentación
  text: Más información sobre configuraciones de Observability Pipelines
title: (LEGACY) Control del volumen y el tamaño de los logs
---

## Información general

Dado que tu volumen de logs aumenta a medida que tu organización escala, el coste de la ingesta y la indexación de tus servicios posteriores (por ejemplo, soluciones de gestión de logs, SIEM, etc.) también aumenta. Esta guía te guiará en el uso de las transformaciones de Observability Pipelines para reducir el volumen de logs y recortar el tamaño de tus logs para controlar tus costes *antes* de que los datos salgan de tu infraestructura o red.

## Requisitos previos
- [Instalaste y configuraste el Worker de Observability Pipelines][1] para recopilar datos de tus fuentes y enviarlos a tus destinos.
- Tienes conocimientos de [los aspectos básicos de configuración de Observability Pipelines][2].

## Uso de las transformaciones para gestionar volúmenes de logs

En Observability Pipelines, una transformación realiza una acción que modifica eventos, donde los eventos son logs que circulan a través del pipeline.

### Deduplicar eventos 

Utiliza la [transformación de deduplicación][3] para eliminar copias de los datos que circulan por tu pipeline, añadiendo el siguiente componente en tu configuración. 

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: dedupe
    inputs:
      - my-source-or-transform-id
    cache: null
    fields: null
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "dedupe"
inputs = [ "my-source-or-transform-id" ]
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "dedupe",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "cache": null,
      "fields": null
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

El Worker de Observability Pipelines asigna un identificador único a cada evento para realizar un seguimiento de los eventos deduplicados. La opción `cache` te permite almacenar en caché los eventos recientes que se utilizarán para comprobar si existen datos duplicados en el futuro y su valor predeterminado es de 5.000 eventos. La opción `fields` enumera los campos que se utilizan para determinar si un evento es un duplicado.

### Filtrar eventos

Utiliza la [transformación de filtrado][4] cuando quieras que sólo aquellos logs que cumplen un criterio específico pasen por un componente de tu pipeline. Por ejemplo, estos criterios podrían ser que los logs contengan:

- Una etiqueta (tag) específica, como `env`.
- Un valor de campo específico, como el campo `status`, que debe ser `400`.

En estos casos, inserta un componente que contenga una [transformación de filtrado][4] para filtrar los logs que utilizan el [Datadog Processing Language (DPL)/Vector Remap Language (VRL)][5] o la [sintaxis de búsqueda de logs de Datadog][6] para establecer las condiciones. Los logs que no cumplen los criterios se descartan.

El ejemplo siguiente utiliza la transformación de filtrado y DPL/VRL para enviar sólo logs con un `status` de `500`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition: 
      type: "vrl"
      source: ".status == 500"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "filter"
inputs = [ "my-source-or-transform-id" ]

  [transforms.my_transform_id.condition]
  type = "vrl"
  source = ".status == 500"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "filter",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "condition": {
        "type": "vrl",
        "source": ".status == 500"
        }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Logs de ejemplo

Cuando se analizan datos que llegan en grandes volúmenes o contienen mucho ruido, como los logs CDN, no es necesario enviar todos los logs a un destino. En su lugar, utiliza la [transformación de muestreo][7] para enviar sólo los logs necesarios para realizar análisis estadísticamente significativos.

El campo `exclude` excluye eventos del muestreo y también admite DPL/VRL o la sintaxis de búsqueda de logs de Datadog. El siguiente ejemplo muestra una configuración que realiza un muestreo cada 10 eventos y está definida en `rate`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: sample
    inputs:
      - my-source-or-transform-id
    exclude: 
       type: "datadog_search"
       source: "*stack"
    rate: 10
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "sample"
inputs = [ "my-source-or-transform-id" ]
rate = 10

  [transforms.my_transform_id.exclude]
  type = "datadog_search"
  source = "*stack"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "sample",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": {
        "type": "datadog_search",
        "source": "*stack"
      },
      "rate": 10
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Convertir logs en métricas

En aquellas situaciones en las que quieras comprender el comportamiento a lo largo del tiempo, las métricas relativas a uno o varios puntos de datos de eventos serán más útiles que una serie de logs. A medida que los logs circulan por tu pipeline, utiliza la [transformación de logs en métricas][8] para reducir el volumen de logs generando métricas basadas en etiquetas específicas. 

Puedes generar cuatro tipos de métricas:

- Counter (Contador), que resulta útil para contar el número de instancias de logs con una etiqueta específica. Un recuento puede incrementarse o ponerse a cero.
- Distribution (Distribución), que representa la distribución de los valores muestreados. Resulta útil para generar resúmenes e histogramas.
- Gauge (Indicador), que representa un único valor numérico que puede aumentar o disminuir arbitrariamente. Resulta útil para realizar un seguimiento de los valores que fluctúan con frecuencia.
- Set (Definir), que consolida valores únicos en una matriz. Puede resultar útil, por ejemplo, para recopilar direcciones IP únicas. 

El siguiente ejemplo muestra una configuración para la generación de una métrica `counter`, donde `metrics` define los pares clave/valor que se añadirán al evento.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: log_to_metric
    inputs:
      - my-source-or-transform-id
    metrics:
      - type: counter
        field: status
        name: response_total
        namespace: service
        tags:
          status: "{{status}}"
          host: "{{host}}"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "log_to_metric"
inputs = [ "my-source-or-transform-id" ]

  [[transforms.my_transform_id.metrics]]
  type = "counter"
  field = "status"
  name = "response_total"
  namespace = "service"

    [transforms.my_transform_id.metrics.tags]
    status = "{{status}}"
    host = "{{host}}"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "log_to_metric",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "metrics": [
        {
          "type": "counter",
          "field": "status",
          "name": "response_total",
          "namespace": "service",
          "tags": {
            "status": "{{status}}",
            "host": "{{host}}"
          }
        }
      ]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Si se hace pasar el siguiente log por la configuración anterior:

```
{
  "log": {
    "host": "10.22.11.222",
    "message": "Sent 200 in 54.2ms",
    "status": 200
  }
}
```

Se genera la siguiente métrica:

```
{"metric":{"counter":{"value":1},"kind":"incremental","name":"response_total","namespace":"service","tags":{"host":"10.22.11.222","status":"200"}}}]

```

### Colapsar varios eventos en uno solo log

En algunos casos, es posible consolidar varios logs en un único log. Así, otra forma de reducir el volumen de logs es fusionar varios logs en un único log. Utiliza la [transformación de reducción][9] para reducir varios logs en uno solo.

El siguiente ejemplo utiliza la configuración de una transformación de reducción para fusionar varios eventos de excepciones de logs Ruby.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: reduce
    inputs:
      - my-source-or-transform-id
    group_by:
      - host
      - pid
      - tid
    merge_strategies:
      message: concat_newline
    starts_when: match(string!(.message), r'^[^\\s]')
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "reduce"
inputs = [ "my-source-or-transform-id" ]
group_by = [ "host", "pid", "tid" ]
starts_when = "match(string!(.message), r'^[^\\s]')"

[transforms.my_transform_id.merge_strategies]
  message = "concat_newline"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "reduce",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "group_by": [
        "host",
        "pid",
        "tid"
      ],
      "merge_strategies": {
        "message": "concat_newline"
      },
      "starts_when": "match(string!(.message), r'^[^\\s]')"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

En la transformación de reducción, `group_by` es una lista ordenada de campos utilizada para agrupar eventos. En este ejemplo, los eventos están agrupados por los campos `host`, `pid` y `tid`. 

`merge_strategies` es un mapa de nombres de campo para personalizar estrategias de fusión. Existen diferentes estrategias de fusión, incluyendo `array`, donde cada valor se añade a una matriz, y `sum`, que añade todos los valores numéricos. En este ejemplo, se utiliza `concat_newline`, donde cada valor de cadena se concatena y luego se delimita con una nueva línea.

`starts_when` es una condición utilizada para distinguir el primer evento de una transacción. Si esta condición se resuelve como `true` para un evento, la transacción anterior se descarga sin este evento y se inicia una nueva transacción. En este ejemplo, los eventos con `.message` que no coinciden con la condición de la expresión regular `^[^\\s]` se reducen a un único evento.

Si los siguientes logs de excepción Ruby se hacen pasar por la configuración anterior:

```
[{"log":{
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0(ZeroDivisionError)",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:6:in `bar'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:2:in `foo'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,"tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

Se generan los siguientes logs:

```
[{
"log": {
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0 (ZeroDivisionError)\n
               from foobar.rb:6:in `bar'\n
               from foobar.rb:2:in `foo'\n
               from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

## Uso de las transformaciones para gestionar el tamaño de los logs

### Eliminar campos innecesarios para recortar tus logs

Los logs pueden contener campos innecesarios. Cuando se procesan terabytes de datos al día, eliminar los campos redundantes puede reducir significativamente el número total de logs que tu destino ingiere e indexa.

Para eliminar los campos innecesarios, utiliza [DPL/VRL][5] para reasignar los datos de tus logs. En el siguiente ejemplo se eliminan las etiquetas innecesarias utilizando `del`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: remap
    inputs:
      - my-source-or-transform-id
    source: |-
      del(.unecessary_env_field)
      del(.unecessary_service_field)
      del(.unecessary_tag_field)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "remap"
inputs = [ "my-source-or-transform-id" ]
source = """
del(.unecessary_env_field)
del(.unecessary_service_field)
del(.unecessary_tag_field)"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "remap",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "source": "del(.unecessary_env_field)\ndel(.unecessary_service_field)\ndel(.unecessary_tag_field)"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/setup/
[2]: /es/observability_pipelines/legacy/configurations/
[3]: /es/observability_pipelines/legacy/reference/transforms/#dedupe
[4]: /es/observability_pipelines/legacy/reference/transforms/#filter
[5]: /es/observability_pipelines/legacy/reference/processing_language/
[6]: /es/logs/explorer/search_syntax/
[7]: /es/observability_pipelines/legacy/reference/transforms/#sample
[8]: /es/observability_pipelines/legacy/reference/transforms/#logtometric
[9]: /es/observability_pipelines/legacy/reference/transforms/#reduce