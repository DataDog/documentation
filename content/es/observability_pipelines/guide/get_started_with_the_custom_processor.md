---
disable_toc: false
further_reading:
- link: observability_pipelines/processors/custom_processor/
  tag: Documentación
  text: Más información sobre el procesador personalizado
- link: observability_pipelines/set_up_pipelines/
  tag: Documentación
  text: Configurar pipelines
- link: https://www.datadoghq.com/blog/migrate-historical-logs/
  tag: Blog
  text: Migrar logs históricos de Splunk y Elasticsearch utilizando Observability
    Pipelines
title: Empezando con el procesador personalizado
---

## Información general

Observability Pipelines te permite transformar tus logs antes de enviarlos a tus destinos. Utiliza el procesador personalizado para crear scripts con funciones personalizadas que modifiquen condicionalmente los campos, los valores y los eventos de logs.

Esta guía te explica cómo utilizar las siguientes funciones en el script de tu procesador personalizado:

- [Decodificar Base64](#decode-base64)
- [Decodificar un evento Base64 completo](#decode-an-entire-base64-encoded-event)
- [Codificar Base64](#encode-base64)

También incluye scripts de ejemplo que abordan casos de uso frecuentes, como:

- [Reasignar marcas de tiempo de logs históricos)(#remap-timestamps-for-historical-logs)
- [Extraer un campo de la matriz de etiquetas (tags) de Datadog (`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [Hacer referencia al valor de otro campo](#reference-another-fields-value)
- [Eliminar atributos que contengan valores nulos](#remove-attributes-containing-null-values)
- [Fusionar atributos anidados en el nivel raíz](#merge-nested-attributes-to-root-level)
- [Serializar logs salientes en formato _raw](#serialize-outbound-logs-in-_raw-format)

## Decodificar Base64

Para los campos o eventos de logs entrantes codificados en Base64, utiliza la función [`decode_base64`][1] para descodificar el campo o evento. La sintaxis de esta función también funciona para [`decode_base16`][1].

### Ejemplo

#### Entrada

Ejemplo de evento de log que contiene un campo Base64 para decodificar:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### Función personalizada

Utiliza la función `decode_base64` para decodificar `payload` y almacenar el resultado en un nuevo campo llamado `decoded_payload`.

```yaml
.decoded_payload = decode_base64!(.payload)
```


Alternativamente, puedes reescribir el valor original `payload` con el valor decodificado sustituyendo `decoded_payload` en la función anterior por `payload`.

```yaml
.payload = decode_base64!(.payload)
```

#### Salida

El resultado cuando se utiliza `decoded_payload` para almacenar el valor decodificado.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ==",
    "decoded_payload": "User requested access to protected resource"
}
```

## Decodificar un evento completo codificado en Base64

### Ejemplo

#### Entrada

Ejemplo de entrada de un evento codificado en Base64:

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### Función personalizada

El script para decodificar todo el evento codificado en Base64 `raw`.

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**Nota:** La sintaxis `. = .full_event` es una forma abreviada de sustituir todo el evento por el contenido de un campo.

#### Salida

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Codificar Base64

Para los campos o eventos de logs salientes codificados en Base64, utiliza la función [`encode_base64`][1] para decodificar el campo o evento. La sintaxis de esta función también funciona para [`encode_base16`][3].

### Ejemplo

#### Entrada

Ejemplo de evento de log que contiene un campo `message` que debes codificar en Base64:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### Función personalizada

Utiliza la función `encode_base64` para decodificar `message` y almacenar el resultado en un nuevo campo llamado `encoded_message`.

```yaml
.encoded_message = encode_base64!(.message)
```

Alternativamente, puedes sobreescribir el campo del valor original (`message`) con el valor decodificado sustituyendo `encoded_message` en la función anterior por `message`.

```yaml
.message = encode_base64!(.message)
```

#### Salida

El resultado cuando se utiliza `encoded_message` para almacenar el valor codificado.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## Reasignación de marcas de tiempo para logs históricos

Si quieres migrar logs archivados de otras plataformas, es esencial asegurarte de que esos logs tienen la marca de tiempo histórica correcta. La reasignación de logs con marcas de tiempo históricas te permite gestionar logs más antiguos almacenados con fines de cumplimiento, auditoría y archivado.

### Ejemplo

#### Entrada

Si el Worker no encuentra el campo `timestamp` en un log, se utiliza la marca de tiempo de cuando el Worker recibió el log. Este es un ejemplo de log que muestra la marca de tiempo de cuando el Worker recibió el log, así como la marca de tiempo histórica del log (`historical_ts`), que es el valor que el Worker busca.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### Función personalizada

En el ejemplo anterior, puedes crear una función que almacene la marca de tiempo ingerida en un nuevo campo y reasigne `timestamp` al valor `historical_ts`.

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### Salida

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Extraer un campo de la matriz de etiquetas de Datadog 

Los campos anidados dentro de la matriz de etiquetas de Datadog (`ddtags`) pueden contener información útil. Es posible que quieras extraer estos campos como pares clave-valor de nivel superior o como valores para otros campos.

### Ejemplo

#### Entrada

Log de ejemplo que contiene la matriz `ddtags` con etiquetas de Datadog.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "service:chaos-engineering",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Función personalizada para extraer el campo env

```yaml
#Extract a tag from ddtags array and elevate as log attribute
.my_tag, err = filter(array!(.ddtags)) -> |_index, value| {
    #Keep any elements that have the key name "env"
    starts_with(value, "env:")
}
#Assign env to be value of the key
.env = split!(.my_tag[0], ":")[1]
del(.my_tag)

```

#### Salida

```json
{
   "ddsource": "python",
   "ddtags": [
       "env:prod",
       "team:sre",
       "service:chaos-engineering",
       "version:1.0.0",
       "pod_name:load-generator-main-abcde"
   ],
   "env": "prod",
   "hostname": "gke-prod-node-abc123.internal",
   "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
   "service": "chaos-engineering",
   "source_type": "datadog_agent",
   "status": "info",
   "timestamp": "2025-005-27T05:26:18.205Z"
}
```

## Hacer referencia al valor de otro campo

Si quieres que el valor de un campo se base en otro campo, puedes hacer referencia dinámicamente al valor del otro campo.

### Ejemplo

#### Entrada

En este ejemplo, tienes un campo de servicio que contiene un nombre de servicio incorrecto y tú quieres utilizar el valor de `app_id` para el servicio.

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### Función personalizada

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### Salida

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## Eliminar atributos que contienen valores nulos

Los atributos con valores nulos o vacíos pueden sobrecargar innecesariamente tu log. Elimina los valores nulos para recortar el log y enviar solo los atributos que proporcionan información. En el script siguiente, la sección `empty_patterns` contiene la lista de patrones vacíos que debes comprobar en tus logs. Puedes añadir y eliminar patrones para adaptarlos a tu caso de uso.

```json
# Define your empty patterns
empty_patterns = ["null", "NULL", "N/A", "n/a", "none", "NONE", "-", "undefined"]

# Apply generic cleanup
. = compact(map_values(., recursive: true) -> |v| {
 if is_null(v) ||
    includes(empty_patterns, v) ||
    (is_string(v) && strip_whitespace!(v) == "") ||
    (is_array(v) && length!(v) == 0) ||
    (is_object(v) && length!(v) == 0) {
   null
 } else {
   v
 }
})
```

## Fusionar atributos anidados en el nivel raíz

La selección de objetos o campos anidados en una consulta de filtro puede requerir la definición de varias rutas. Esto es habitual cuando se trabaja con el campo de mensaje, en el que el contenido analizado resultante está anidado en un objeto. Cuando se utiliza la sintaxis de filtro de Observability Pipelines' el acceso a un campo anidado requiere la notación `<OUTER_PATH>.<INNER_PATH>`.

Por ejemplo, este log contiene un mensaje convertido en cadena JSON:

```json
{
 "level": "info",
 "message": "{\"event_type\":\"user_login\",\"result\":\"success\",\"login_method\":\"oauth\",\"user_agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\",\"ip_address\":\"192.168.1.100\",\"session_id\":\"sess_abc123xyz\",\"duration_ms\":245}",
 "timestamp": "2019-03-12T11:30:00Z",
 "processed_ts": "2025-05-22T14:30:00Z",
 "user_id": "12345",
 "app_id": "streaming-services",
 "ddtags": [
   "kube_service:my-service",
   "k8_deployment:your-host",
   "kube_cronjob:myjob"
 ]
}
```

Este es el resultado después de analizar el campo `message`. El contenido analizado se anida en el objeto `message`.

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```
En este caso, para filtrar por `event_type`, es necesario especificar `@message.event_type`. Para filtrar directamente por `event_type` u otro campo dentro de un objeto, Datadog recomienda aplanar el objeto hasta el nivel raíz.

Para fusionar los eventos del objeto `message` en el nivel raíz, utiliza este script:

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**Nota**: Este script funciona con cualquier objeto JSON. Solo tienes que sustituir el atributo `message` por el nombre del campo que estás intentando aplanar.

El resultado es el log con atributos aplanados que puedes filtrar directamente:

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "duration_ms": 245,
   "event_type": "user_login",
   "ip_address": "192.168.1.100",
   "level": "info",
   "login_method": "oauth",
   "processed_ts": "2025-05-22T14:30:00Z",
   "result": "success",
   "session_id": "sess_abc123xyz",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
   "user_id": "12345"
}
```

**Nota**: Si aplanas el campo del mensaje, el log resultante ya no tendrá un objeto de mensaje. Esto significa que si el log se envía a Datadog, cuando veas el log en Explorador de logs, no verás una sección **Log Message** (Mensaje de log) en el panel lateral del log.

## Serializar logs salientes en formato _raw

Splunk y CrowdStrike prefieren un formato llamado `_raw` para la ingesta de logs. El envío de datos en `_raw` normaliza tus logs y te permite beneficiarte de sus dashboards, monitores y contenidos de detección de amenazas predefinidos. Para garantizar que se aplica el formato de log `_raw`, puedes serializar el evento saliente en `_raw`.

**Notas**:
- Debes añadir otros pasos de procesamiento, reasignación y análisis antes de serializar tus logs en formato `_raw`.
- Selecciona `Raw` como opción de codificación cuando configures el destino Splunk HEC o CrowdStrike.

Un ejemplo de log de entrada:

```json
{
   "app_id": "streaming-services",
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```

Esta función personalizada serializa el evento en formato `_raw`:

```json
# Serialize the entire event into _raw
._raw = encode_key_value(.)
# Only keep _raw
. = { "_raw": ._raw }
```

Este es el resultado del ejemplo de log después de haber sido procesado por el script personalizado:

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/processors/custom_processor/#decode_base16
[2]: /es/observability_pipelines/processors/custom_processor/#encode_base64
[3]: /es/observability_pipelines/processors/custom_processor/#encode_base16