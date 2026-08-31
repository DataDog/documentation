---
aliases:
- /es/integrations/observability_pipelines/working_with_data/
- /es/observability_pipelines/working_with_data/
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: Documentación
  text: Configurar Observability Pipelines
- link: /observability_pipelines/legacy/reference/transforms/#awsec2metadata
  tag: Documentación
  text: Analizar metadatos emitidos por una instancia EC2 AWS
- link: /observability_pipelines/legacy/reference/transforms/#lua
  tag: Documentación
  text: Modificar eventos con Lua
- link: /observability_pipelines/legacy/reference/transforms/#logtometric
  tag: Documentación
  text: Convertir logs a eventos de métricas
- link: /observability_pipelines/legacy/configurations/
  tag: Documentación
  text: Más información sobre configuraciones de Observability Pipelines
title: (LEGACY) Trabajar con datos
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

## Información general

Observability Pipelines te permite dar forma y transformar los datos de observabilidad. De forma similar a los pipelines de Logging without LimitsTM, puedes configurar pipelines para Observability Pipelines, conformados por una serie de componentes de transformación. Estas transformaciones te permiten analizar, estructurar y enriquecer los datos con una seguridad de tipo integrado.

## Reasignar datos

La [transformación de `remap`][1] puede modificar eventos o especificar condiciones para enrutar y filtrar eventos. Utiliza Datadog Processing Language (DPL) o Vector Remap Language (VRL) en la transformación de `remap` para manipular matrices y cadenas, codificar y decodificar valores, encriptar y desencriptar valores, y mucho más. Consulta [Lenguaje de procesamiento Datadog][2], para obtener más información, y la [referencia de las funciones DPL][3], para ver una lista completa de funciones DPL integradas.

### Ejemplo de configuración básica de `remap`

Para empezar, consulta el siguiente ejemplo de configuración YAML para una transformación de `remap` básica, que contiene un programa DPL/VRL en el campo `source`:

```yaml
transforms:
  modify:
    type: remap
    inputs:
      - previous_component_id
    source: |2
        del(.user_info)
        .timestamp = now()
```

En este ejemplo, el campo `type` se configura en una transformación de `remap`. El campo `inputs` define dónde recibes eventos de la fuente `previous_component_id` previamente definida. La primera línea del campo `source` elimina el campo `.user_info`. A escala, la eliminación de campos es especialmente útil para reducir la carga útil de tus eventos y recortar el gasto de tus servicios posteriores.

La segunda línea añade el campo `.timestamp` y el valor al evento, cambiando el contenido de cada evento que pasa por esta transformación.

## Analizar datos

El análisis ofrece casos de uso más avanzados de DPL/VRL.

### Ejemplo de análisis

#### Ejemplo de evento de log

El siguiente fragmento es un evento de log HTTP en formato JSON:

```
"{\"status\":200,\"timestamp\":\"2021-03-01T19:19:24.646170Z\",\"message\":\"SUCCESS\",\"username\":\"ub40fan4life\"}"
```
#### Ejemplo de configuración

El siguiente ejemplo de configuración YAML utiliza DPL/VRL para modificar el evento de log:

- Analizando la cadena sin procesar en JSON.
- Reformateando el tiempo en una marca de tiempo UNIX.
- Eliminando el campo de nombre de usuario.
- Convirtiendo el mensaje a caracteres en minúsculas.

```yaml
transforms:
  parse_syslog_id:
    type: remap
    inputs:
      - previous_component_id
    source: |2
         . = parse_json!(string!(.message))
         .timestamp = to_unix_timestamp(to_timestamp!(.timestamp))
         del(.username)
         .message = downcase(string!(.message))
```

#### Resultado de la configuración

La configuración devuelve lo siguiente:

```
{
  "message": "success",
  "status": 200,
  "timestamp": 1614626364
}
```

## Muestrear, reducir, filtrar y agregar datos

El muestreo, la reducción, el filtrado y el agregado son transformaciones habituales para reducir el volumen de los datos de observabilidad que se envían a servicios posteriores. Observability Pipelines ofrece diversas formas de controlar el volumen de datos:

- [Muestrear eventos][4] en función de los criterios suministrados y a una frecuencia configurable.
- [Reducir y colapsar][5] varios eventos en un único evento.
- Eliminar campos innecesarios.
- [Deduplicar][6] eventos. 
- [Filtrar eventos][7] en función de una serie de condiciones.
- [Agregar varios eventos de métricas][8] en un único evento de métrica en función de una ventana de intervalo definida.

Para ver ejemplos sobre cómo utilizar estas transformaciones, consulta [Control del volumen y del tamaño de los logs][10].

## Enrutar datos

Otra transformación muy utilizada es `route`, que permite dividir un flujo (stream) de eventos en varios subflujos en función de las condiciones proporcionadas. Esta opción resulta útil cuando necesitas enviar datos de observabilidad a diferentes destinos o actuar de forma diferente con los flujos de datos en función de tu caso de uso.

### Ejemplo de enrutamiento a diferentes destinos

#### Ejemplo de log

El siguiente fragmento es un ejemplo de log que quieres enrutar a diferentes destinos en función del valor del campo `level`.

```
{
  "logs": {
    "kind": "absolute",
    "level": "info,
    "name": "memory_available_bytes",
    "namespace": "host",
    "tags": {}
  }
}
```

#### Ejemplos de configuración

El siguiente ejemplo de configuración YAML enruta los datos basándose en el valor `level`:

```yaml
transforms:
  splitting_logs_id:
    type: route
    inputs:
      - my-source-or-transform-id
    route:
      debug: .level == "debug"
      info: .level == "info"
      warn: .level == "warn"
      error: .level == "error"
```

Cada fila bajo el campo `route` define un identificador de ruta, seguido de una condición lógica que representa el filtro de la `route`. El resultado final de esta `route` puede entonces ser indicado como entrada por otros componentes con el nombre `<transform_name>.<route_id>`.

Por ejemplo, si quieres enrutar logs con valores de campo `level` de `warn` y `error` a Datadog, consulta el siguiente ejemplo:

```yaml
sinks:
  my_sink_id:
    type: datadog_logs
    inputs:
      - splitting_logs_id.warn
      - splitting_logs_id.error
    default_api_key: '${DATADOG_API_KEY_ENV_VAR}'
    compression: gzip
```

Para obtener más información, consulta la [referencia de la transformación de `route`][11].

## Limitar los datos

Los servicios posteriores pueden verse desbordados cuando se produce un pico de volumen, lo que puede provocar la pérdida de datos. Utiliza la transformación de `throttle` para evitar esta situación y también para imponer cuotas de uso a los usuarios. La frecuencia de transformación de `throttle` limita los logs que pasan a través de una topología.

### Ejemplo de configuración de un límite

El siguiente ejemplo de configuración YAML corresponde a una transformación de `throttle`:

```yaml
transforms:
  my_transform_id:
    type: throttle
    inputs:
      - my-source-or-transform-id
    exclude: null
    threshold: 100
    window_secs: 1
```

El campo `threshold` define el número de eventos permitidos para un bucket determinado. `window_secs` define el intervalo de tiempo en el que se aplica el umbral configurado. En el ejemplo de configuración, cuando el componente recibe más de 100 eventos en un tramo (span) de 1 segundo, se descarta cualquier evento adicional.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/legacy/reference/transforms/#remap
[2]: /es/observability_pipelines/legacy/reference/processing_language/
[3]: /es/observability_pipelines/legacy/reference/processing_language/functions/
[4]: /es/observability_pipelines/legacy/reference/transforms/#sample
[5]: /es/observability_pipelines/legacy/reference/transforms/#reduce
[6]: /es/observability_pipelines/legacy/reference/transforms/#dedupe
[7]: /es/observability_pipelines/legacy/reference/transforms/#filter
[8]: /es/observability_pipelines/legacy/reference/transforms/#aggregate
[9]: /es/observability_pipelines/legacy/reference/transforms/#metrictolog
[10]: /es/observability_pipelines/legacy/guide/control_log_volume_and_size/
[11]: /es/observability_pipelines/legacy/reference/transforms/#route