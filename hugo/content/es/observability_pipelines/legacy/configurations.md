---
aliases:
- /es/integrations/observability_pipelines/vector_configurations/
- /es/observability_pipelines/vector_configurations/
- /es/observability_pipelines/reference/
- /es/observability_pipelines/configurations/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos con Observability Pipelines
- link: /observability_pipelines/legacy/setup
  tag: Documentación
  text: Configurar Observability Pipelines
title: (LEGACY) Configuraciones
---

## Información general

Las configuraciones del worker de Observability Pipelines pueden recopilar, transformar y enrutar tus logs desde cualquier origen a cualquier destino. El archivo de configuración admite YAML, TOML y JSON. Los tres componentes principales de configuración son los orígenes, las transformaciones y los sinks.

## Configurar un origen de ejemplo

Los [componentes de fuente][1] definen cómo el worker de Observability Pipelines recopila o recibe datos de los orígenes de datos de observabilidad.

Crea un archivo de configuración YAML y añade el siguiente ejemplo de origen:

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
   type = "demo_logs"
   format = "syslog"
   count = 100
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
}
```

{{% /tab %}}
{{< /tabs >}}

Este componente `source` tiene un ID único de `generate_syslog`. Este ID único es importante para transformar y enrutar los datos con el componente `sink`.

`type` es el tipo de origen desde el que el worker de Observability Pipelines recopila datos de observabilidad. Este ejemplo utiliza un origen `demo_logs`, que crea datos de log de muestra que permiten simular diferentes tipos de eventos en varios formatos. La opción `format` indica al origen `demo_logs` qué tipo de logs debe emitir, en este caso, el formato Syslog. La opción `count` indica al origen `demo_logs` cuántas líneas debe emitir.

Consulta todos los orígenes compatibles en la [Documentación sobre orígenes][1].

## Configurar una transformación de ejemplo

Utiliza el siguiente ejemplo para definir un [componente de transformación][2] que manipule los datos recogidos del origen `demo_logs`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.remap_syslog]
   inputs = ["generate_syslog" ]
   type = "remap"
   source = '''
     structured = parse_syslog!(.message)
     . = merge(., structured)
'''
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  }
```

{{% /tab %}}
{{< /tabs >}}

En este componente `transforms.remap_syslog`, la opción `inputs` se establece en `generate_syslog`, lo que significa que recibe eventos del origen `generate_syslog` definido previamente. El tipo de componente de la transformación es `remap`.

El `source` contiene la lista de transformaciones de reasignación para aplicar a cada evento que recibe el worker de Observability Pipelines. En este ejemplo, solo se realiza una operación, `parse_syslog`, pero se pueden añadir múltiples operaciones.

La función `parse_syslog` recibe un único campo llamado `message`, que contiene el evento de Syslog que se genera en el origen `generate_syslog`. Esta función analiza el contenido del mensaje con formato Syslog y lo emite como un evento estructurado.

Este ejemplo de transformación muestra sólo una parte de la capacidad del worker de Observability Pipelines para dar forma y transformar tus datos[*](#support). Consulta la [Documentación sobre transformaciones][2] para conocer todas las transformaciones admitidas, desde el muestreo, el filtrado y el enriquecimiento, entre otras.

## Crear un sink de ejemplo

Con los datos analizados en el componente `transform`, utiliza el siguiente ejemplo de [sink][3] para dirigir los datos a un destino.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
}
```

{{% /tab %}}
{{< /tabs >}}

Este componente `sink` (o destino) tiene el ID de `emit_syslog`. La opción `inputs` especifica que los eventos generados por la transformación `remap_syslog` se procesen con este sink. La opción `encoding` indica al sink que emita los eventos en formato JSON.

Consulta la [Documentación sobre sinks][3] para conocer todos los sinks compatibles.

## Unir todo

Con estos tres componentes básicos, un origen, una transformación y un sink, ya tienes un archivo de configuración de Observability Pipelines en funcionamiento.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
sources:
  generate_syslog:
    type: demo_logs
    format: syslog
    count: 100
transforms:
  remap_syslog:
    inputs:
      - generate_syslog
    type: remap
    source: |2
        structured = parse_syslog!(.message)
        . = merge(., structured)

sinks:
  emit_syslog:
    inputs:
      - remap_syslog
    type: console
    encoding:
      codec: json
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[sources.generate_syslog]
type = "demo_logs"
format = "syslog"
count = 100

[transforms.remap_syslog]
inputs = [ "generate_syslog" ]
type = "remap"
source = '''
  structured = parse_syslog!(.message)
  . = merge(., structured)
'''

[sinks.emit_syslog]
inputs = [ "remap_syslog" ]
type = "console"

  [sinks.emit_syslog.encoding]
  codec = "json"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "sources": {
    "generate_syslog": {
      "type": "demo_logs",
      "format": "syslog",
      "count": 100
    }
  },
  "transforms": {
    "remap_syslog": {
      "inputs": [
        "generate_syslog"
      ],
      "type": "remap",
      "source": "  structured = parse_syslog!(.message)\n  . = merge(., structured)\n"
    }
  },
  "sinks": {
    "emit_syslog": {
      "inputs": [
        "remap_syslog"
      ],
      "type": "console",
      "encoding": {
        "codec": "json"
      }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Ejecuta el siguiente comando para compilar y ejecutar esta configuración:

```
vector --config ./<configuration_filename>
```

Si la configuración es correcta, los logs de demostración analizados se imprimen en formato JSON.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/reference/sources/
[2]: /es/observability_pipelines/legacy/reference/transforms/
[3]: /es/observability_pipelines/legacy/reference/sinks/