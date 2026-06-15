---
title: Configuración de la librería de rastreo de Datadog
type: multi-code-lang
---

Esta página describe las opciones de configuración que se comportan de forma coherente en todos los lenguajes. Para ver estas opciones comunes de configuración, consulte [Opciones comunes de configuración](#common-configuration-options).

Para consultar las opciones de configuración específicas de tu lenguaje de programación, elige tu lenguaje entre las opciones siguientes:

{{< partial name="apm/apm-compatibility.html" >}}

<br>

Para instrumentar una aplicación escrita en un lenguaje que aún no es compatible con las bibliotecas oficiales, consulta la lista de [bibliotecas de rastreo comunitarias][1].

## Opciones comunes de configuración
Las siguientes opciones de configuración se comportan de forma coherente en las últimas versiones de todos los SDK de Datadog, a menos que se indique lo contrario:

### Agent

`DD_TRACE_AGENT_URL`
: **Por defecto: `http://localhost:8126` <br>
**Entrada admitida**: Una cadena que representa una url HTTP o UDS <br>
**Descripción**: La URL para conectar el rastreador al Datadog Agent. Los esquemas de URL válidos incluyen `http://` y `unix://` (Sockets de dominio UNIX). Si se configura, este valor tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`.

`DD_DOGSTATSD_PORT`
: **Por defecto**: `8125` <br>
**Entrada admitida**: Un entero entre 0 y 65535 <br>
**Caveats**: No admitido en C++, Ruby, .NET<br>
**Descripción**: Especifica el número de puerto del servidor DogStatsD al que se envían las métricas de tiempo de ejecución.

`DD_DOGSTATSD_HOST`
: **Por defecto**: `localhost` <br>
**Entrada admitida**: Una cadena que representa un nombre de host o una dirección IP <br>
**Caveats**: No admitido en C++, Ruby, .NET<br>
**Descripción**: Especifica el nombre de host o la dirección IP del servidor DogStatsD al que se envían las métricas de tiempo de ejecución.

### Etiquetado de servicios unificado

`DD_VERSION`
: **Por defecto**: `null`<br>
**Entrada admitida**: Una cadena que representa una versión de la aplicación<br>
**Caveats**: Node.js utiliza por defecto el número de versión del paquete .json<br/>
**Descripción**: Añade una etiqueta `version` a todos los tramos (spans), excepto para los [servicios inferidos][3]

`DD_SERVICE`
: **Por defecto**: `null`, el SDK intenta determinar automáticamente el nombre de un servicio<br>
**Entrada admitida**: Una cadena que representa el nombre de servicio de una aplicación<br>
**Descripción**: Define el nombre de servicio por defecto utilizado para la mayoría de los tramos. Los SDK pueden definir un nombre de servicio diferente para los servicios inferidos. Los tramos de integraciones pueden utilizar sus propios nombres por defecto, que pueden diferir del valor especificado en `DD_SERVICE`

`DD_ENV`
: **Por defecto: `null` <br>
**Entrada admitida**: Una cadena que representa el nombre de entorno de una aplicación (por ejemplo, `prod`, `dev`) <br>
**Descripción**: Añade una etiqueta (tag) de entorno a todos los tramos generados por la instancia del rastreador.

`DD_TAGS`
: **Por defecto**: `null` <br>
**Entrada admitida**: Una cadena que representa pares clave-valor delimitados por dos puntos y separados por una coma o un espacio (por ejemplo, `<key1>:<value1>, <key2>:<value2>`>) <br>
**Descripción**: Etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separada por comas o espacios.

### Diagnóstico

`DD_TRACE_LOG_DIRECTORY`
: **Por defecto**: Varía según el SDK, el entorno, y el tiempo de ejecución. Más información en la página de configuración específica para el lenguaje elegido anterior. <br>
**Entrada admitida**: Una ruta de directorio válida, completa o relativa, que exista en el sistema.<br>
**Caveats**: No es compatible con Java, Node.js, Ruby, Python<br>
**Descripción**: Especifica el directorio al que deben dirigirse los archivos de logs del rastreador. Si el directorio no existe, el SDK vuelve a su método de generación de logs de diagnóstico predeterminado.

### Métricas

`DD_RUNTIME_METRICS_ENABLED`
: **Por defecto**: `false` <br>
**Entrada admitida**: Booleana (`true`/`false`) <br>
**Caveats**: No admitido en C++ o PHP<br>
**Descripción**: Activa o desactiva la recolección de [métricas de tiempo de ejecución][5] (como estadísticas de recolección de basura, uso de memoria y recuento de subprocesos) de la aplicación.

### Trazas

`DD_APM_TRACING_ENABLED`
: **Por defecto**: `true` <br>
**Entrada admitida**: Booleana <br>
**Descripción**: Activa o desactiva el envío de trazas (trace) desde la aplicación, sin que ello afecte a otras funciones de librería como la creación de perfiles, Datadog App and API Protection (AAP), Data Streams Monitor (DSM), etc.

`DD_TRACE_ENABLED`
: **Por defecto**: `true` <br>
**Entrada admitida**: Booleana <br>
**Caveats**: Desactiva completamente la librería, incluyendo otras características de librería, en Node.js, PHP, Ruby, .NET y C++. Desactiva parcialmente la librería en Java y Python. Se comporta de forma idéntica a `DD_APM_TRACING_ENABLED` en Go.<br>
**Descripción**: Activa o desactiva el envío de trazas desde la aplicación.

`DD_LOGS_INJECTION`
: **Por defecto**: `false` <br>
**Entrada admitida**: Booleana (`true`/`false`) <br>
**Caveats**: No admitido en C++ o Go. El valor por defecto en Ruby es `true`.<br>
**Descripción**: Activa o desactiva la inyección automática de contextos de rastreo (ID de traza, ID de tramo) en logs de aplicación. Esto permite la correlación entre trazas y logs.

`DD_TRACE_RATE_LIMIT`
: **Por defecto: `100` <br>
**Entrada admitida**: Un entero positivo<br>
**Caveats**: `200` es el valor por defecto de `DD_TRACE_RATE_LIMIT` en C++<br>
**Descripción**: Define el número máximo de trazas a muestrear por segundo; sólo se aplica cuando se configura `DD_TRACE_SAMPLING_RULES` o `DD_TRACE_SAMPLE_RATE`.

`DD_TRACE_HEADER_TAGS`
: **Por defecto: `null` <br>
**Entrada admitida**: Una cadena separada por comas que representa una lista de encabezados HTTP que no distinguen mayúsculas de minúsculas, con una asignación opcional a un nombre de etiqueta personalizado, por ejemplo: `User-Agent:my-user-agent,Content-Type`. <br>
**Descripción**: Aplica automáticamente encabezados HTTP especificados como tramos de etiquetas. Si no se especifica un nombre de etiqueta personalizado, la clave de etiqueta por defecto es `http.request.headers.<normalized-header-name>`, para encabezados de solicitudes, y `http.response.headers.<normalized-header-name>`, para encabezados de respuestas.


`DD_TRACE_SAMPLE_RATE`
: **Por defecto**: `-1`. Si no se define, el rastreador transfiere al Datadog Agent el control de la frecuencia de muestreo. <br>
**Entrada admitida**: Un número entre 0.0 y 1.0, ambos inclusive. <br>
**Caveats**: Esta variable ha quedado obsoleta en favor de `DD_TRACE_SAMPLING_RULES`, que proporciona un control del muestreo más flexible y granular. <br>
**Descripción**: Controla la frecuencia de muestreo de la ingesta de trazas entre el Agent y el backend. Debe ser un número entre 0,0 y 1,0, donde 1,0 significa que todas las trazas se envían al backend y 0,0 significa que no se envía ninguna traza. Tiene una precisión de hasta 6 dígitos, se aplica globalmente a todas las trazas y no admite objetivos por servicio o por operación.

`DD_TRACE_SAMPLING_RULES`
: **Por defecto**: `null`. Si no se define o no hay reglas que coincidan, el rastreador transfiere al Datadog Agent el ajuste dinámico de la frecuencia de muestreo en las trazas. <br>
**Entrada admitida**: Una matriz JSON de [reglas definidas por el usuario][6]. <br>
**Descripción**: Permite un control detallado de la ingesta de trazas, lo que te permite apuntar a servicios, operaciones, recursos o trazas etiquetadas específicas. Definida por una matriz JSON de objetos, donde cada objeto debe incluir una `sample_rate` entre 0.0 y 1.0 (inclusive), y puede incluir opcionalmente campos como `servicio`, `name`, `resource`, `tags` y `max_per_second`. Los objetos se evalúan en el orden de la lista; el primer objeto coincidente determina la frecuencia de muestreo de la traza. Para obtener más información, consulta [Mecanismos de ingesta][4]. <br>
**Ejemplos**: <br>
  - Muestra del 20% de todas las trazas: <br>

    ```
    [{"sample_rate": 0.2}]
    ```

  - Muestra el 10% de las trazas en que el nombre del servicio empieza por `a` y el nombre de la operación es `b`, y el 20% de todas las demás: <br>

    ```
    [{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]
    ```

  - Muestra el 40% de las trazas con el nombre de recurso `HTTP GET`:

    ```
    [{"resource": "HTTP GET", "sample_rate": 0.4}]
    ```

  - Muestra el 100% de las trazas con la etiqueta `tier=premium` :

    ```
    [{"tags": {"tier": "premium"}, "sample_rate": 1}]
    ```

  - Muestrea hasta 50 trazas por segundo a un índice del 50% para el servicio `my-service` y el nombre de la operación `http.request`:

    ```
    [{"service": "my-service", "name": "http.request", "sample_rate": 0.5, "max_per_second": 50}]
    ```


`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Por defecto**: <br>
    ```
    (?i)(?:(?:"|%22)?)(?:(?:old[-_]?|new[-_]?)?p(?:ass)?w(?:or)?d(?:1|2)?|pass(?:[-_]?phrase)?|secret|(?:api[-_]?|private[-_]?|public[-_]?|access[-_]?|secret[-_]?|app(?:lication)?[-_]?)key(?:[-_]?id)?|token|consumer[-_]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|(?:bearer(?:\s|%20)+[a-z0-9._\-]+|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+/=-]|%3D|%2F|%2B)+)?|-{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY-{5}[^\-]+-{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY(?:-{5})?(?:\n|%0A)?|(?:ssh-(?:rsa|dss)|ecdsa-[a-z0-9]+-[a-z0-9]+)(?:\s|%20|%09)+(?:[a-z0-9/.+]|%2F|%5C|%2B){100,}(?:=|%3D)*(?:(?:\s|%20|%09)+[a-z0-9._-]+)?)
    ```
: **Entrada admitida**: Una cadena regex (expresión regular) <br>
: **Descripción**: Aplica una regex para ocultar datos confidenciales en las cadenas de consulta de las solicitudes HTTP entrantes. La regex por defecto coincide con varios patrones de datos confidenciales, incluyendo contraseñas, tokens, claves de API, claves privadas y términos de autorización. Las coincidencias se sustituyen por `<redacted>`. Si se pasa una cadena vacía, no se realiza un ocultamiento. El valor resultante se indica en la etiqueta `http.url`.


`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **Por defecto**: `true` <br>
**Entrada admitida**: Booleana (`true`/`false`) <br>
**Descripción**: Controla si las nuevas trazas utilizan ID de rastreo W3C de 128 bits (cadenas hexadecimales de 32 caracteres) o ID de rastreo Datadog de 64 bits (cadenas hexadecimales de 16 caracteres). El valor por defecto es `true` para admitir la propagación del contexto de rastreo W3C.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **Por defecto**: `true` <br>
**Entrada admitida**: Booleana (`true`/`false`) <br>
**Caveats**: No admitido en C++<br>
**Descripción**: Controla si los ID de rastreo de 128 bits se registran en su formato completo de 32 caracteres o se truncan a 16 caracteres. Define como `false` para una compatibilidad con sistemas que esperan el formato más corto.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Por defecto**: `true` <br>
**Entrada admitida**: Booleana (`true`/`false`) <br>
**Caveats**: No admitido en C++<br>
**Descripción**: Activa o desactiva la recopilación automática de direcciones IP de clientes a partir de las cabeceras de solicitudes HTTP. Cuando está activada, la dirección IP se almacena en la etiqueta de tramo `http.client_ip`.

`DD_TRACE_EXPERIMENTAL_FEATURES_ENABLED`
: **Por defecto**: `null` <br>
**Entrada admitida**: Una lista de opciones de configuración separada por comas que admiten funciones experimentales.<br>
**Valores admitidos**: `all`, `DD_TAGS` (Java, .NET), `DD_LOGS_INJECTION` (Java) <br>
**Caveats**: Sólo admitido en Java y .NET <br>
**Descripción**: Activa funciones experimentales para opciones específicas de configuración. Cuando están activadas, estas funciones pueden proporcionar una funcionalidad adicional, pero aún no se consideran estables y pueden cambiar o ser eliminadas en futuras versiones. Puedes activar todas las funciones experimentales utilizando la palabra clave `all`, o enumerar funciones individuales explícitamente.

### Integraciones

`DD_TRACE_<INTEGRATION>_ENABLED`
: **Por defecto: `true` <br>
**Entrada admitida**: Booleana <br>
**Caveats**: No es compatible con Go. [Algunas integraciones Java están desactivadas por defecto][2].<br/>
**Descripción**: Activa o desactiva la instrumentación de la `<INTEGRATION>` especificada. El nombre de la integración debe estar en mayúsculas (por ejemplo, `DD_TRACE_KAFKA_ENABLED=true`)

`DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`
: **Por defecto: `400-499` <br>
**Entrada admitida**: Una cadena separada por comas del formulario `from-to`, donde `from` y `to` son números enteros. También se aceptan valores singulares (por ejemplo, `400-403,405,410-499`). <br>
**Caveats**: No es compatible con Node.js<br>
**Descripción**: Define el rango inclusivo de códigos de estado que se deben considerar como errores en tramos de clientes HTTP recopilados automáticamente. Sólo los valores dentro del rango especificado se consideran errores.

`DD_TRACE_HTTP_SERVER_ERROR_STATUSES`
: **Por defecto: `500-599` <br>
**Entrada admitida**: Una cadena separada por comas del formulario `from-to`, donde `from` y `to` son números enteros. También se aceptan valores singulares (por ejemplo, `400-403,405,410-499`). <br>
**Caveats**: No es compatible con Node.js<br>
**Descripción**: Define el rango inclusivo de códigos de estado que se deben considerar como errores en los tipos de tramos `http.server`. Sólo los valores dentro del rango especificado se consideran errores.

`DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`
: **Por defecto: `true` <br>
**Entrada admitida**: Booleana <br>
**Caveats**: No es compatible con Node.js, está desactivado por defecto en Go<br/>
**Descripción**: Activa o desactiva la inclusión de la cadena de consulta en el valor de etiqueta de tramo `http.url` para tramos HTTP recopilados automáticamente.

`DD_TRACE_CLIENT_IP_HEADER`
: **Por defecto: `null` <br>
**Entrada admitida**: Cualquier cadena no vacía <br>
**Descripción**: Configura un nombre de encabezado personalizado del que obtener el valor de etiqueta `http.client_ip`. Si se define esta variable, se ignoran todos los demás encabezados relacionados con la IP (por ejemplo, si se configura `DD_TRACE_CLIENT_IP_HEADER=custom-ip-header` y se incluye el encabezado`custom-ip-header: 5.6.7.9` en una solicitud, se obtiene un tramo etiquetado con `"http.client_ip": "5.6.7.9"`). Si se pasa una cadena vacía o un valor nulo, los encabezados de IP se consultan en este orden:
  - `x-forwarded-for`
  - `x-real-ip`
  - `true-client-ip`
  - `x-client-ip`
  - `x-forwarded`
  - `forwarded-for`
  - `x-cluster-client-ip`
  - `fastly-client-ip`
  - `cf-connecting-ip`
  - `cf-connecting-ipv6`

### Propagación del contexto
`DD_TRACE_BAGGAGE_MAX_ITEMS`
: **Por defecto**: `64` <br>
**Entrada admitida**: Un entero positivo <br>
**Descripción**: El número máximo de pares clave-valor en la cabecera de equipaje.

`DD_TRACE_BAGGAGE_MAX_BYTES`
: **Por defecto**: `8192` <br>
**Entrada admitida**: Un entero positivo <br>
**Descripción**: El número máximo de bytes en el valor de la cabecera de equipaje. Los valores inferiores a 3 bytes impiden la propagación, ya que éste es el tamaño mínimo para un par clave-valor válido (por ejemplo, `k=v`).

`DD_TRACE_BAGGAGE_TAG_KEYS`
: **Por defecto**: `user.id,session.id,account.id` <br>
**Entrada admitida**:  Una cadena separada por comas que representa una lista de claves de equipaje que distinguen entre mayúsculas y minúsculas <br>
**Caveats**: No admitido en Java, Ruby, Go, C++ y .NET <br>
**Descripción**: Una lista separada por comas de claves de equipaje que se aplican automáticamente como span tagss al tramo local raíz local. Por ejemplo, una clave de equipaje `user.id` se etiqueta como `baggage.user.id`. <br>
Esta función sólo se aplica al equipaje extraído de las cabeceras HTTP entrantes. No se incluye el equipaje definido con la API de equipaje.
  - Para etiquetar todas las piezas de equipaje, define el valor en `*`. Utilízalo con precaución para evitar exponer datos confidenciales en las etiquetas.
  - Para desactivar esta función, define el valor como una cadena vacía.


[1]: /es/developers/community/libraries/#apm-tracing-client-libraries
[2]: /es/tracing/trace_collection/compatibility/java/#framework-integrations-disabled-by-default
[3]: /es/tracing/services/inferred_services/
[4]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[5]: /es/tracing/metrics/runtime_metrics/
[6]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java#in-tracing-libraries-user-defined-rules
