---
title: Configuración de la biblioteca de rastreo de Datadog
type: multi-code-lang
---

Esta página describe las opciones de configuración que se comportan de forma coherente en todos los lenguajes. Para ver estas opciones comunes de configuración, consulte [Opciones comunes de configuración](#common-configuration-options).

Para consultar las opciones de configuración específicas de tu lenguaje de programación, elige tu lenguaje entre las opciones siguientes:

{{< partial name="apm/apm-compatibility.html" >}}

<br>

Para instrumentar una aplicación escrita en un lenguaje que aún no es compatible con las bibliotecas oficiales, consulta la lista de [bibliotecas de rastreo comunitarias][1].

## Opciones comunes de configuración 
Las siguientes opciones de configuración se comportan de forma coherente en las últimas versiones de todos los SDK de Datadog, a menos que se indique lo contrario:

### Trazas (traces)

`DD_TRACE_<INTEGRATION>_ENABLED`
: **Por defecto: `true` <br>
**Entrada admitida**: Booleana <br>
**Caveats**: No es compatible con Go. [Algunas integraciones Java están deshabilitadas por defecto][2].<br/>
**Descripción**: Habilita o deshabilita la instrumentación de la `<INTEGRATION>` especificada. El nombre de la integración debe estar en mayúsculas (por ejemplo, `DD_TRACE_KAFKA_ENABLED=true`)

`DD_TRACE_RATE_LIMIT`
: **Por defecto: `100` <br>
**Entrada admitida**: Un entero positivo<br>
**Caveats**: `200` es el valor por defecto de `DD_TRACE_RATE_LIMIT` en C++<br>
**Descripción**: Define el número máximo de trazas a muestrear por segundo; sólo se aplica cuando se configura `DD_TRACE_SAMPLING_RULES` o `DD_TRACE_SAMPLE_RATE`.

`DD_TRACE_HEADER_TAGS`
: **Por defecto: `null` <br>
**Entrada admitida**: Una cadena separada por comas que representa una lista de encabezados HTTP que no distinguen mayúsculas de minúsculas, con una asignación opcional a un nombre de etiqueta (tag) personalizado, por ejemplo: `User-Agent:my-user-agent,Content-Type`. <br>
**Descripción**: Aplica automáticamente encabezados HTTP especificados como tramos (spans) de etiquetas. Si no se especifica un nombre de etiqueta personalizado, la clave de etiqueta por defecto es `http.request.headers.<normalized-header-name>`, para encabezados de solicitudes, y `http.response.headers.<normalized-header-name>`, para encabezados de respuestas.

`DD_TRACE_ENABLED`
: **Por defecto: `true` <br>
**Entrada admitida**: Booleana <br>
**Descripción**: Activa o desactiva el envío de trazas desde la aplicación.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Por defecto**: <br>
    ```
    (?i)(?:(?:"|%22)?)(?:(?:old[-_]?|new[-_]?)?p(?:ass)?w(?:or)?d(?:1|2)?|pass(?:[-_]?phrase)?|secret|(?:api[-_]?|private[-_]?|public[-_]?|access[-_]?|secret[-_]?|app(?:lication)?[-_]?)key(?:[-_]?id)?|token|consumer[-_]?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|(?:bearer(?:\s|%20)+[a-z0-9._\-]+|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+/=-]|%3D|%2F|%2B)+)?|-{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY-{5}[^\-]+-{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY(?:-{5})?(?:\n|%0A)?|(?:ssh-(?:rsa|dss)|ecdsa-[a-z0-9]+-[a-z0-9]+)(?:\s|%20|%09)+(?:[a-z0-9/.+]|%2F|%5C|%2B){100,}(?:=|%3D)*(?:(?:\s|%20|%09)+[a-z0-9._-]+)?)
    ```
: **Entrada admitida**: Una cadena regex (expresión regular) <br>
: **Descripción**: Aplica una regex para ocultar datos confidenciales en las cadenas de consulta de las solicitudes HTTP entrantes. La regex por defecto coincide con varios patrones de datos confidenciales, incluyendo contraseñas, tokens, claves de API, claves privadas y términos de autorización. Las coincidencias se sustituyen por `<redacted>`. Si se pasa una cadena vacía, no se realiza un ocultamiento. El valor resultante se indica en la etiqueta `http.url`.

### Diagnóstico

`DD_TRACE_LOG_DIRECTORY`
: **Por defecto**: Varía según el SDK, el entorno, y el tiempo de ejecución. Más información en la página de configuración específica para el lenguaje elegido anterior. <br>
**Entrada admitida**: Una ruta de directorio válida, completa o relativa, que exista en el sistema.<br>
**Caveats**: No es compatible con Java, Node.js, Ruby, Python<br>
**Descripción**: Especifica el directorio al que deben dirigirse los archivos de logs del rastreador. Si el directorio no existe, el SDK vuelve a su método de generación de logs de diagnóstico predeterminado.

### Agent

`DD_TRACE_AGENT_URL`
: **Por defecto: `http://localhost:8126` <br>
**Entrada admitida**: Una cadena que representa una url HTTP o UDS <br>
**Descripción**: La URL para conectar el rastreador al Datadog Agent. Los esquemas de URL válidos incluyen `http://` y `unix://` (Sockets de dominio UNIX). Si se configura, este valor tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`.

### Etiquetado de servicios unificado

`DD_VERSION`
: **Por defecto**: `null`<br>
**Entrada admitida**: Una cadena que representa una versión de la aplicación<br>
**Caveats**: Node.js utiliza por defecto el número de versión del paquete .json<br/>
**Descripción**: Añade una etiqueta `version` a todos los tramos, excepto para los [servicios inferidos][3]

`DD_SERVICE`
: **Por defecto**: `null`, el SDK intenta determinar automáticamente el nombre de un servicio<br>
**Entrada admitida**: Una cadena que representa el nombre de servicio de una aplicación<br>
**Descripción**: Define el nombre de servicio por defecto utilizado para la mayoría de los tramos. Los SDK pueden definir un nombre de servicio diferente para los servicios inferidos. Los tramos de integraciones pueden utilizar sus propios nombres por defecto, que pueden diferir del valor especificado en `DD_SERVICE`

`DD_ENV`
: **Por defecto: `null` <br>
**Entrada admitida**: Una cadena que representa el nombre de entorno de una aplicación (por ejemplo, `prod`, `dev`) <br>
**Descripción**: Añade una etiqueta de entorno a todos los tramos generados por la instancia del rastreador.

### Integraciones

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
**Descripción**: Habilita o deshabilita la inclusión de la cadena de consulta en el valor de etiqueta de tramo `http.url` para tramos HTTP recopilados automáticamente.

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


[1]: /es/developers/community/libraries/#apm-tracing-client-libraries
[2]: /es/tracing/trace_collection/compatibility/java/#framework-integrations-disabled-by-default
[3]: /es/tracing/services/inferred_services/