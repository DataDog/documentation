---
algolia:
  tags:
  - advanced log filter
description: Utiliza el Datadog Agent para detectar y agregar automáticamente logs
  de varias líneas
further_reading:
- link: /agent/logs/advanced_log_collection
  tag: Documentación
  text: Recopilación avanzada de logs
- link: /agent/logs/auto_multiline_detection_legacy
  tag: Documentación
  text: Detección y agregación automática multilínea (legacy)
title: Detección y agregación automática multilínea
---

<div class="alert alert-danger">Esta función está disponible para el Agent a partir de la versión <strong>7.65.0</strong>. Para versiones anteriores del Agent o para activar explícitamente la implementación legacy, consulta <a href="/agent/logs/auto_multiline_detection_legacy">Detección y agregación automática multilínea (heredada)</a>.</div>

## Información general

La detección automática multilínea permite al Agent detectar y agregar automáticamente los logs multilínea habituales.

## Empezando

Para activar la función de multilínea automática en la configuración de tu Agent, establece `auto_multi_line_detection` en `true` en tu archivo de configuración, o establece la variable de entorno `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true`:

{{< tabs >}}
{{% tab "Configuration file" %}}
```yaml
logs_config:
  auto_multi_line_detection: true
```
{{% /tab %}}
{{% tab "Variable de entorno" %}}
```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true
```
{{% /tab %}}
{{< /tabs >}}

### Parámetros predeterminados
Por defecto, las siguientes funciones están activadas:

- `enable_datetime_detection`: configura la agregación automática de fechas y horas. Los logs que comienzan con un formato de fecha y hora se utilizan para agregar logs.
- `enable_json_detection`: configura la detección y el rechazo de JSON. Los logs estructurados en JSON nunca se agregan.

Puedes desactivar estas funciones estableciendo lo siguiente en `false` en tu archivo de configuración o en tu variable de entorno:

{{< tabs >}}
{{% tab "Configuration file" %}}
```yaml
logs_config:
  auto_multi_line:
    enable_datetime_detection: false
    enable_json_detection: false

```
{{% /tab %}}

{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_DATETIME_DETECTION=false
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_JSON_DETECTION=false
```
{{% /tab %}}
{{< /tabs >}}


### Activar la agregación multilínea por integración

Puedes activar o desactivar la agregación multilínea para la recopilación de logs de una integración específica:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: false
```

#### Ajustes de integración multilínea por integración

Puedes establecer la configuración multilínea automática individualmente en cada integración. La integración acepta los mismos ajustes que el archivo `datadog.yaml` normal:

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
    auto_multi_line_detection_custom_samples:
      - sample: "ERROR [DatabaseService]"
    auto_multi_line:
        enable_json_detection: true
        enable_datetime_detection: true
        tokenizer_max_input_bytes: 50
```

### Formatos de fecha y hora admitidos

La detección automática multilínea utiliza un algoritmo para detectar *cualquier* formato de fecha y hora que aparezca en los primeros 60 bytes de una línea de log. Para evitar falsos positivos, el algoritmo requiere un contexto suficiente para considerar que un formato de fecha y hora coincide.

Tu formato de fecha y hora debe incluir los componentes _date_ y _time_ para ser detectado.

Ejemplos de formatos válidos que incluyen suficiente contexto para ser detectados:
 - `2021-03-28 13:45:30`
 - `2023-03-28T14:33:53.743350Z`
 - `Jun 14 15:16:01`
 - `2024/05/16 19:46:15`

Ejemplos de formatos que no tienen suficiente contexto para ser detectados:
- `12:30:2017`
- `12:30:20`
- `2024/05/16`


## Configuración de patrones personalizados

Si la agregación de fecha y hora no es suficiente o tu formato es demasiado corto para ser detectado automáticamente, puedes personalizar la función de dos maneras:
- [Muestras personalizadas](#custom-samples)
- [Patrones de expresión regular](#regex-patterns)

### Muestras personalizadas

Una muestra personalizada es una muestra de un log sobre el que se desea agregar. Por ejemplo, si deseas agregar un stack trace, la primera línea del stack trace sería una buena muestra. Las muestras personalizadas son una forma más sencilla de agregar logs que los patrones de expresión regular.

Para configurar muestras personalizadas, puedes utilizar `logs_config` en tu archivo `datadog.yaml` o establecer una variable de entorno. En el siguiente ejemplo, la detección multilínea busca la muestra `"SEVERE Main main Exception occurred"`:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "SEVERE Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"sample": "SEVERE Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

Esto agrega logs donde `"SEVERE Main main Exception occurred"` coincide con la primera línea. Por ejemplo:

```text
SEVERE Main main Exception occurred
java.lang.Exception: Something bad happened!
    at Main.funcd(Main.java:50)
    at Main.funcc(Main.java:49)
    at Main.funcb(Main.java:48)
    at Main.funca(Main.java:47)
    at Main.main(Main.java:29)
```

#### Cómo funcionan las muestras personalizadas

Las muestras personalizadas tokenizan los primeros 60 bytes de una línea de log y también tokenizan la muestra proporcionada.
Los tokens incluyen
- palabras y su longitud
- espacio en blanco
- números y su longitud
- caracteres especiales
- componentes de fecha y hora.

Cada token de log se compara con cada token de la muestra. Si el 75% de los tokens del log coinciden con los de la muestra, el log se marca para la agregación.
Datadog recomienda utilizar la comparación basada en muestras si tus logs tienen un formato estable. Si necesitas una comparación más flexible, puedes utilizar expresiones regulares.

### Patrones de expresión regular

Los patrones de expresión regular funcionan de forma similar a una regla `multi_line`. Si el patrón de expresión regular coincide con el log, se utiliza para la agregación.

Para configurar patrones de expresión regular personalizados, puedes utilizar `logs_config` en tu archivo `datadog.yaml` o establecer una variable de entorno.

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - regex: "\\[\\w+\\] Main main Exception occurred"
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[{"regex": "\\[\\w+\\] Main main Exception occurred"}]'
```

{{% /tab %}}
{{< /tabs >}}

Puedes mezclar muestras y patrones de expresión regular para admitir varios formatos de log:

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    - sample: "CORE | INFO | (pkg/logs/"
    - regex: "\\d{4}dog.\\s\\w+"
    - sample: "[ERR] Exception"
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample": "CORE | INFO | (pkg/logs/"},
  {"regex": "\\d{4}dog.\\s\\w+"},
  {"sample": "[ERR] Exception", "label": "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las configuraciones existentes de `auto_multi_line_extra_patterns` se admiten automáticamente [al migrar desde V1][2].

## Agregación JSON

En el Datadog Agent versión 7.67+, se detecta automáticamente el JSON de varias líneas o impreso legible y se agrega en una sola línea.

Por ejemplo, el siguiente log:

```
2024-08-13 17:15:17 INFO My log message 1
2024-08-13 17:15:17 INFO My log message 2
{
    "id": "565290f7-6ce0-4d3d-be7f-685905c27f04",
    "clusters": 6,
    "samples": 1301,
    "top_match": {
        "score": 1317,
        "weight": 1.108
    }
}
2024-08-13 17:15:17 INFO My log message 3
2024-08-13 17:15:17 INFO My log message 4
```

se convierte automáticamente en:

```
2024-08-13 17:15:17 INFO My log message 1
2024-08-13 17:15:17 INFO My log message 2
{"id":"565290f7-6ce0-4d3d-be7f-685905c27f04","clusters":6,"samples": 1301,"top_match":{"score":1317,"weight":1.108}}
2024-08-13 17:15:17 INFO My log message 3
2024-08-13 17:15:17 INFO My log message 4
```

Esto permite a Datadog identificar el JSON como un log estructurado y permite que sus atributos sean automáticamente consultables.

Puedes desactivar la agregación JSON con:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs_config:
  auto_multi_line:
    enable_json_aggregation: false
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_ENABLE_JSON_AGGREGATION=false
```

{{% /tab %}}
{{< /tabs >}}


## Personalización avanzada

La detección automática multilínea utiliza un sistema de agregación etiquetada para agregar logs. El paso de detección asigna una etiqueta a cada log, y el paso de agregación agrega logs basándose en esas etiquetas.

### Etiquetas
`start_group`
: define el _comienzo de un log multilínea_<br> - Borra cualquier log multilínea almacenado en el búfer, si existe<br> - Inicia un nuevo log multilínea<br> - Solo se puede almacenar en el búfer un log multilínea a la vez

`aggregate`
: se _añade al log multilínea existente_<br> - Si no existe un log multilínea, se vacía inmediatamente<br> - Etiqueta por defecto cuando nada coincide

`no_aggregate`
: declara logs que _nunca forman parte de la agregación_<br> - Vacía el log multilínea en búfer, si está presente<br> - Vacía la muestra inmediatamente <br>- Se utiliza para logs JSON


### Configuración de etiquetas

Puedes proporcionar etiquetas personalizadas a cada expresión regular o muestra para cambiar el comportamiento de agregación basado en las reglas de etiqueta. Esto resulta útil si deseas incluir o excluir explícitamente determinados formatos de log en la agregación multilínea.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs_config:
  auto_multi_line_detection_custom_samples:
    # Never aggregate these formats
    - sample: "some service we should not aggregate"
      label: no_aggregate
    - regex: \w*\s(data|dog)
      label: no_aggregate
```

{{% /tab %}}
{{% tab "Environment Variables" %}}

```shell
DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION_CUSTOM_SAMPLES='[
  {"sample": "some service we should not aggregate", "label": "no_aggregate"},
  {"regex": "\\w*\\s(data|dog)", "label": "no_aggregate"}
]'
```

{{% /tab %}}
{{< /tabs >}}

## Monitorización y depuración

Puedes buscar logs multilínea o logs truncados activando los siguientes ajustes:

```yaml
logs_config:
  tag_multi_line_logs: true
  tag_truncated_logs: true
```

Estos ajustes añaden las siguientes _etiquetas_ a tus logs, permitiéndote buscarlas en el Logs Explorer:

- `multiline`: muestra la fuente de agregación (por ejemplo, `auto_multiline`, `multiline_regex`)
- `truncated`: muestra la fuente de truncamiento (por ejemplo, `single_line`, `multi_line`)

**Nota:** El Agent trunca los logs que son demasiado largos para procesarlos. Si una línea es demasiado larga antes de la agregación multilínea, el Agent le asigna la etiqueta `single_line`. Si un patrón incorrecto hace que un log desborde el búfer de agregación, el Agent aplica la etiqueta `multi_line`.


También puedes etiquetar logs JSON agregados.

```yaml
logs_config:
  auto_multi_line:
    tag_aggregated_json: true
```

Puedes buscar esta etiqueta consultando `aggregated_json:true` en el Logs Explorer.

## Referencia de configuración

| Parámetro | Tipo | Valor predeterminado | Descripción |
|---------|------|---------|-------------|
| `logs_config.auto_multi_line_detection_custom_samples` | Objeto | Vacío | Muestras personalizadas/patrones de expresiones regulares |
| `logs_config.auto_multi_line.enable_json_detection` | Booleano | Verdadero | Activar la detección y rechazo de JSON |
| `logs_config.auto_multi_line.enable_datetime_detection` | Bool | Verdadero | Activar la detección de fecha y hora |
| `logs_config.auto_multi_line.timestamp_detector_match_threshold` | Flotante | 0.5 | Umbral de coincidencia de fecha y hora |
| `logs_config.auto_multi_line.tokenizer_max_input_bytes` | Int | 60 | Bytes a tokenizar |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/auto_multiline_detection
[2]: /es/agent/logs/auto_multiline_detection_legacy