---
description: Aprenda a usar las funciones del Procesador personalizado, como la codificación
  y decodificación Base64, y vea ejemplos de scripts para casos de uso comunes de
  transformación de registros.
disable_toc: false
further_reading:
- link: /observability_pipelines/processors/custom_processor/
  tag: Documentación
  text: Obtenga más información sobre el Procesador personalizado
- link: /observability_pipelines/set_up_pipelines/
  tag: Documentación
  text: Configure Pipelines
- link: https://www.datadoghq.com/blog/migrate-historical-logs/
  tag: Blog
  text: Migre registros históricos desde Splunk y Elasticsearch usando Observability
    Pipelines
title: Comience con el Procesador personalizado
---
## Descripción general {#overview}

Observability Pipelines le permite transformar sus registros antes de enviarlos a sus destinos. Use el Procesador personalizado para crear scripts con funciones personalizadas que modifiquen condicionalmente campos, valores y eventos de registro.

Esta guía lo orienta sobre cómo usar las siguientes funciones en su script del Procesador personalizado:

- [Decodificar Base64](#decode-base64)
- [Decodificar un evento Base64 completo](#decode-an-entire-base64-encoded-event)
- [Codificar Base64](#encode-base64)

También revisa ejemplos de scripts que abordan casos de uso comunes, tales como:

- [Reasignar marcas de tiempo para registros históricos](#remap-timestamps-for-historical-logs)
- [Extraer un campo de la matriz de etiquetas de Datadog (`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [Hacer referencia al valor de otro campo](#reference-another-fields-value)
- [Eliminar atributos que contienen valores nulos](#remove-attributes-containing-null-values)
- [Fusionar atributos anidados al nivel raíz](#merge-nested-attributes-to-root-level)
- [Serializar registros salientes en formato _raw](#serialize-outbound-logs-in-_raw-format)

## Decodificar Base64 {#decode-base64}

Para campos de registro o eventos entrantes codificados en Base64, use la función [`decode_base64`][1] para decodificar el campo o evento. La sintaxis de esta función también funciona para [`decode_base16`][1].

### Ejemplo {#example}

#### Entrada {#input}

Ejemplo de evento de registro que contiene un campo Base64 para decodificar:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### Función personalizada {#custom-function}

Utilice la función `decode_base64` para decodificar `payload` y almacenar el resultado en un nuevo campo llamado `decoded_payload`.

```yaml
.decoded_payload = decode_base64!(.payload)
```


Alternativamente, puede sobrescribir el valor original de `payload` con el valor decodificado reemplazando `decoded_payload` en la función anterior con `payload`.

```yaml
.payload = decode_base64!(.payload)
```

#### Salida {#output}

La salida cuando utiliza `decoded_payload` para almacenar el valor decodificado.

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

## Decodificar un evento completo codificado en Base64 {#decode-an-entire-base64-encoded-event}

### Ejemplo {#example-1}

#### Entrada {#input-1}

Ejemplo de entrada de un evento codificado en Base64:

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### Función personalizada {#custom-function-1}

El script para decodificar todo el evento codificado en Base64 `raw`.

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**Nota:** La sintaxis `. = .full_event` es una abreviatura para reemplazar todo el evento con el contenido de un campo.

#### Salida {#output-1}

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Codificar Base64 {#encode-base64}

Para campos de registro salientes o eventos que desee codificar en Base64, utilice la función [`encode_base64`][2] para codificar el campo o evento. La sintaxis de esta función también funciona para [`encode_base16`][3].

### Ejemplo {#example-2}

#### Entrada {#input-2}

Ejemplo de evento de registro que contiene el campo `message` que desea codificar en Base64:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### Función personalizada {#custom-function-2}

Utilice la función `encode_base64` para decodificar `message` y almacenar el resultado en un nuevo campo llamado `encoded_message`.

```yaml
.encoded_message = encode_base64!(.message)
```

Alternativamente, puede sobrescribir el campo de mensaje original (`message`) con el valor decodificado reemplazando `encoded_message` en la función anterior con `message`.

```yaml
.message = encode_base64!(.message)
```

#### Salida {#output-2}

La salida cuando utiliza `encoded_message` para almacenar el valor codificado.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## Reasignar marcas de tiempo para registros históricos {#remap-timestamps-for-historical-logs}

Si desea migrar registros archivados de otras plataformas, es esencial asegurarse de que esos registros tengan la marca de tiempo histórica correcta. Reasignar registros con marcas de tiempo históricas le permite manejar registros más antiguos almacenados para fines de cumplimiento, auditoría y archivo.

### Ejemplo {#example-3}

#### Entrada {#input-3}

Si el Worker no encuentra el campo `timestamp` en un registro, se utiliza la marca de tiempo de cuando el Worker recibió el registro. Este es un ejemplo de un registro que muestra la marca de tiempo de cuando el Worker recibió el registro, así como la marca de tiempo histórica del registro (`historical_ts`), que es el valor que el Worker está buscando.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### Función personalizada {#custom-function-3}

Para el ejemplo anterior, puede crear una función para almacenar la marca de tiempo ingerida en un nuevo campo y reasignar `timestamp` al valor `historical_ts`.

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### Salida {#output-3}

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Extraer un campo de la matriz de etiquetas de Datadog {#extract-a-field-from-the-datadog-tags-array}

Los campos anidados dentro de la matriz de etiquetas (`ddtags`) de Datadog pueden contener información útil. Es posible que desee extraer estos campos como pares clave-valor de nivel superior, o como valores para otros campos.

### Ejemplo {#example-4}

#### Entrada {#input-4}

Registro de muestra que contiene la matriz `ddtags` con etiquetas de Datadog.

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

#### Función personalizada para extraer el campo env {#custom-function-to-extract-the-env-field}

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

#### Salida {#output-4}

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
## Agregar una etiqueta al evento de registro {#add-a-tag-to-the-log-event}

Las etiquetas se utilizan para correlacionar registros con otros servicios y telemetría. Se almacenan en matrices como pares `key:value` encerrados entre comillas (por ejemplo, `"service:payments-app"`). Para los registros de Datadog específicamente, las etiquetas están anidadas dentro de la matriz de etiquetas (`ddtags`) de Datadog. Utilice los siguientes scripts a continuación para convertir una etiqueta de un atributo existente o agregar una nueva etiqueta.

### Ejemplo para convertir un atributo en una etiqueta {#example-to-convert-an-attribute-to-a-tag}

#### Entrada {#input-5}

En este ejemplo, el registro de muestra contiene una matriz `ddtags`, y usted desea agregar el campo `service` como una etiqueta. 

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
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Función personalizada para convertir el atributo `service` en una etiqueta {#custom-function-to-convert-the-service-attribute-to-a-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# This example checks if 'service' exists, then adds the templatized value of service as a tag. Also, it converts the service value to a string
if exists(.service) {
  .ddtags = push(array!(.ddtags), "service:" + to_string!({{.service}}) )
}

```

#### Salida {#output-5}

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
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```
### Ejemplo para crear y agregar una etiqueta {#example-to-create-and-add-a-tag}

#### Entrada {#input-6}

En este ejemplo, el registro de muestra contiene la matriz `ddtags`, y usted desea crear una etiqueta llamada `"system:service-mesh"` y anexarla a la matriz.

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
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Función personalizada para crear y agregar la etiqueta `system` {#custom-function-to-create-and-add-the-system-tag}

```yaml
# First, check if the attribute 'ddtags' exists. You can replace 'ddtags' with the name of any array
if !exists(.ddtags) {
    .ddtags = []
}

# Appends a new tag to the array by defining a separate key:value pair
.ddtags = push(array!(.ddtags), "system:service-mesh")

```

#### Salida {#output-6}

```json
{
	"ddsource": "python",
	"ddtags": [
		"env:prod",
		"team:sre",
		"version:1.0.0",
		"pod_name:load-generator-main-abcde",
		"system:service-mesh"
	],
	"hostname": "gke-prod-node-abc123.internal",
	"message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
	"service": "chaos-engineering",
	"source_type": "datadog_agent",
	"status": "info",
	"timestamp": "2025-005-27T05:26:18.205Z"
}
```

## Hacer referencia al valor de otro campo {#reference-another-fields-value}

Si desea que el valor de un campo se base en otro campo, puede hacer referencia dinámicamente al valor del otro campo.

### Ejemplo {#example-5}

#### Entrada {#input-7}

Para este ejemplo, usted tiene un campo de servicio que contiene un nombre de servicio incorrecto, y desea utilizar el valor de `app_id` para el servicio en su lugar.

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### Función personalizada {#custom-function-4}

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### Salida {#output-7}

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## Eliminar atributos que contienen valores nulos {#remove-attributes-containing-null-values}

Los atributos con valores nulos o vacíos pueden añadir un peso innecesario a sus registros. Elimine los valores nulos para reducir el registro y enviar solo los atributos que proporcionan información. En el script a continuación, la sección `empty_patterns` contiene la lista de patrones vacíos que se deben buscar en sus registros. Puede agregar y eliminar patrones para adaptarlos a su caso de uso.

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

## Fusionar atributos anidados al nivel raíz {#merge-nested-attributes-to-root-level}

Apuntar a objetos o campos anidados en una consulta de filtro puede requerir que defina múltiples rutas. Esto es común cuando se trabaja con el campo de mensaje, donde los contenidos analizados resultantes están anidados en un objeto. Cuando utiliza la sintaxis de filtro de Observability Pipelines, acceder a un campo anidado requiere la notación `<OUTER_PATH>.<INNER_PATH>`.

Por ejemplo, este registro contiene un mensaje JSON convertido en cadena:

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

Esta es la salida después de que se haya analizado el campo `message`. El contenido analizado está anidado en el objeto `message`.

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
En este caso, para filtrar por `event_type`, necesita especificar `@message.event_type`. Para filtrar directamente por `event_type` u otro campo dentro de un objeto, Datadog recomienda aplanar el objeto al nivel raíz.

Para fusionar los eventos del objeto `message` al nivel raíz, utilice este script:

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**Nota**: Este script funciona con cualquier objeto JSON. Solo necesita reemplazar el atributo `message` con el nombre del campo que intenta aplanar.

Esto da como resultado el registro con atributos aplanados que puede filtrar directamente:

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

**Nota**: Si aplana el campo de mensaje, el registro resultante ya no tiene un objeto de mensaje. Esto significa que si el registro se envía a Datadog, cuando vea el registro en Log Explorer, no verá una sección {{< ui >}}Log Message{{< /ui >}} en el panel lateral del registro.

## Serialice los registros salientes en formato _raw {#serialize-outbound-logs-in-raw-format}

Splunk y CrowdStrike prefieren un formato llamado `_raw` para la ingesta de registros. Enviar datos en `_raw` normaliza sus registros y le permite beneficiarse de sus tableros, seguimientos y contenido de detección de amenazas listos para usar. Para asegurarse de que se aplique el formato de registro `_raw`, puede serializar el evento saliente en `_raw`.

**Notas**:
- Debe agregar otros pasos de parseo, reasignación y análisis antes de serializar sus registros en formato `_raw`.
- Para asegurarse de que sus registros se enruten correctamente después de la serialización, configure su destino preferido con {{< ui >}}Raw{{< /ui >}} como tipo de codificación. 

Un ejemplo de registro:

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
._raw = encode_key_value!(.)
# Only keep _raw
. = { "_raw": ._raw }
```

Esta es la salida del registro de ejemplo después de haber sido procesada por el script personalizado:

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/processors/custom_processor/#decode_base16
[2]: /es/observability_pipelines/processors/custom_processor/#encode_base64
[3]: /es/observability_pipelines/processors/custom_processor/#encode_base16