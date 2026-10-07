---
code_lang: NodeJS
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
  text: Documentación de API
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de rastreo
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: tracing/
  tag: Documentación
  text: Uso avanzado
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la biblioteca de rastreo de Node.js
type: lenguaje de código múltiple
---

Después de configurar la biblioteca de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la biblioteca de rastreo como prefieras e incluir la configuración del [Etiquetado unificado de servicios][1].

Los parámetros del rastreador pueden configurarse con las siguientes variables de entorno:

### Etiquetado de servicios unificado

`DD_ENV`
: **Configuración**: `env`<br>
**Por defecto**: El entorno configurado en el Datadog Agent<br>
Configura el entorno de una aplicación (por ejemplo, `prod`, `pre-prod` y `stage`).

`DD_SERVICE`
: **Configuración**: `service`<br>
**Por defecto**: El campo `name` en `package.json`<br>
El nombre de servicio utilizado para esta aplicación.

`DD_VERSION`
: **Configuración**: `version`<br>
**Por defecto**: El campo `version` en `package.json`<br>
El número de versión de la aplicación.

Se recomienda utilizar `DD_ENV`, `DD_SERVICE` y `DD_VERSION` para configurar `env`, `service` y `version` para tus servicios. Para obtener recomendaciones sobre la configuración de estas variables de entorno, consulta la documentación del [Etiquetado unificado de servicios][1].

### Trazas

`DD_TRACE_ENABLED`
: **Configuración**: N/A<br>
**Por defecto**: `true`<br>
Si se habilita dd-trace. Configurar esto a `false` desactiva todas las funciones de la biblioteca.<br/>
Consulta también [DD_APM_TRACING_ENABLED][16].

`DD_TRACE_DEBUG`
: **Configuración**: N/A<br>
**Por defecto**: `false`<br>
Habilita el registro de depuración en el rastreador.

`DD_TRACING_ENABLED`
: **Configuración**: N/A<br>
**Por defecto `true`<br>
Si se habilita el rastreo.

`DD_TRACE_RATE_LIMIT`
: **Configuración**: `rateLimit`<br>
**Por defecto**: `100`, cuando la `DD_TRACE_SAMPLE_RATE` está configurada. De lo contrario, delega la limitación de frecuencias al Datadog Agent .
El número máximo de trazas por segundo, por instancia de servicio.<br>

`DD_TRACE_HEADER_TAGS`
: **Configuración**: `headerTags` <br>
**Por defecto**: N/A <br>
Acepta una lista separada por comas de cabeceras HTTP que no distinguen mayúsculas de minúsculas, asignadas opcionalmente a nombres de etiquetas. Aplica automáticamente los valores de cabeceras coincidentes como etiquetas en las trazas. Cuando no se especifica un nombre de etiqueta, se utilizan por defecto etiquetas con el formato`http.request.headers.<header-name>`, para las solicitudes, y con el formato`http.response.headers.<header-name>`, para las respuestas. **Nota**: Esta opción sólo es compatible con HTTP/1.<br><br>
**Ejemplo**: `User-ID:userId,Request-ID`<br>
  - Si la **Solicitud/Respuesta** tiene una cabecera `User-ID`, su valor se aplica como etiqueta `userId` a los tramos generados por el servicio.<br>
  - Si la **Solicitud/Respuesta** tiene una cabecera `Request-ID`, su valor se aplica como etiqueta `http.request.headers.Request-ID`, para las solicitudes, y como`http.response.headers.Request-ID`, para las respuestas.

`DD_SERVICE_MAPPING`
: **Configuración**: `serviceMapping`<br>
**Por defecto**: N/A<br>
**Ejemplo**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Proporciona nombres de servicio para cada complemento. Acepta pares separados por comas `plugin:service-name`, con o sin espacios.

Intervalo de descarga
: **Configuración**: `flushInterval`<br>
**Por defecto**: `2000`<br>
Intervalo en milisegundos en que el rastreador envía trazas al Agent.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Configuración**: `flushMinSpans`<br>
**Por defecto**: `1000`<br>
Número de tramos antes de la exportación parcial de una traza. Esta opción evita conservar todos los tramos en la memoria, en el caso de trazas muy grandes.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Una expresión regular (regex) para ocultar los datos confidenciales de la cadena de consulta de solicitudes entrantes que se informan en la etiqueta `http.url` (las coincidencias se sustituyen por `<redacted>`). Puede ser una cadena vacía, para deshabilitar el ocultamiento, o `.*`, para ocultar toda la cadena de consulta. **ADVERTENCIA: Esta expresión regular se ejecuta para cada solicitud que ingresa por una entrada insegura (URL), por lo que debes asegurarte de utilizar una expresión regular segura.

`DD_TRACE_CLIENT_IP_HEADER`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Nombre de cabecera personalizado del que procede la etiqueta `http.client_ip`.

Función de búsqueda DNS
: **Configuración**: `lookup`<br>
**Por defecto**: `require('dns').lookup`<br>
Función personalizada para búsquedas DNS, cuando se envían solicitudes al Agent. Algunas configuraciones tienen cientos de servicios en ejecución, cada uno ejecutando búsquedas DNS en cada intervalo de descarga, lo que genera problemas de escalado. Anula este proceso para proporcionar tu propio mecanismo de caché o de resolución.

`DD_TRACE_AGENT_PROTOCOL_VERSION`
: **Configuración**: `protocolVersion`<br>
**Por defecto**: `0.4`<br>
Versión del protocolo para utilizar en las solicitudes al Agent. La versión configurada debe ser compatible con la versión del Agent instalada, de lo contrario se descartan todas las trazas.

`DD_TRACE_REPORT_HOSTNAME`
: **Configuración**: `reportHostname`<br>
**Por defecto**: `false`<br>
Si se informa el nombre de host del sistema para cada traza. Si se deshabilita, se utiliza el nombre de host del Agent.

`DD_TRACE_STARTUP_LOGS`
: **Configuración**: `startupLogs`<br>
**Por defecto**: `false`<br>
Habilita la configuración del inicio del rastreador y el log de diagnóstico.

`DD_SPAN_SAMPLING_RULES_FILE`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Indica un archivo JSON que contiene las reglas de muestreo de tramos. `DD_SPAN_SAMPLING_RULES` tiene prioridad sobre esta variable. Para conocer el formato de las reglas, consulta `DD_SPAN_SAMPLING_RULES`.

`DD_TRACE_DISABLED_PLUGINS`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
**Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=express,dns`<br>
Una cadena separada por comas de nombres de integraciones deshabilitadas automáticamente cuando se inicializa el rastreador.

Características experimentales
: **Configuración**: `experimental`<br>
**Por defecto**: `{}`<br>
Las funciones experimentales pueden habilitarse añadiendo claves predefinidas con un valor de `true`. Para obtener más información sobre las funciones experimentales disponibles, [ponte en contacto con el servicio de asistencia][4].

Instrumentación automática de bibliotecas externas
: **Configuración**: `plugins`<br>
**Por defecto**: `true`<br>
Si se habilita la instrumentación automática de bibliotecas externas utilizando los complementos incorporados.

`DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`
: **Configuración**: `cloudPayloadTagging.request`<br>
**Por defecto**: N/A (desactivado)<br>
**Ejemplo**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=$.Metadata.UserId`<br>
Una cadena separada por comas de entradas JSONPath para redactar a partir de las solicitudes del SDK AWS. Configurar esto activa el [etiquetado de carga útil de AWS][6] para las solicitudes.

`DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`
: **Configuración**: `cloudPayloadTagging.response`<br>
**Por defecto**: N/A (desactivado)<br>
**Ejemplo**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=$.Metadata.UserId`<br>
Una cadena separada por comas de entradas JSONPath para redactar a partir de respuestas de SDK de AWS. Configurar esto activa el [etiquetado de carga útil de AWS][6] para las respuestas.

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`
: **Configuración**: `cloudPayloadTagging.maxDepth`<br>
**Por defecto**: 10<br>
**Ejemplo**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH=10`<br>
Un número entero que representa la profundidad máxima de una carga útil de solicitud/respuesta del SDK de AWS a utilizar para el [etiquetado de carga útil de AWS][6].

### Agent

`DD_TAGS`
: **Configuración**: `tags`<br>
**Por defecto**: `{}`<br>
Configura etiquetas (tags) globales que se apliquen a todos los tramos (spans) y métricas de tiempo de ejecución. Cuando se pasa como una variable de entorno, el formato es `key:value,key:value`. Cuando se define mediante programación, el formato es `tracer.init({ tags: { foo: 'bar' } })`.

`DD_TRACE_AGENT_URL`
: **Configuración**: `url`<br>
**Por defecto**: `http://localhost:8126`<br>
La URL del Trace Agent a la que envía trazas el rastreador. Tiene prioridad sobre el nombre del host y el puerto, si están definidos. Si la [configuración del Agent][13] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor por defecto `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él. Compatible con sockets de dominio Unix, en combinación con el `apm_config.receiver_socket` de tu archivo `datadog.yaml` o con la variable de entorno `DD_APM_RECEIVER_SOCKET`.

`DD_TRACE_AGENT_HOSTNAME`
: **Configuración**: `hostname`<br>
**Por defecto**: `localhost`<br>
La dirección del Agent a la que envía trazas el rastreador.

`DD_TRACE_AGENT_PORT`
: **Configuración**: `port`<br>
**Por defecto**: `8126`<br>
El puerto del Trace Agent al que envía trazas el rastreador. Si la [configuración del Agent][13] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor por defecto `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_DOGSTATSD_PORT`
: **Configuración**: `dogstatsd.port`<br>
**Por defecto**: `8125`<br>
El puerto del Agent DogStatsD al que se envían métricas. Si la [configuración del Agent][13] define `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto del valor por defecto `8125`, este `DD_DOGSTATSD_PORT` de la biblioteca de rastreo debe coincidir con él.

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Configuración**: `remoteConfig.pollInterval`<br>
**Por defecto**: 5<br>
Intervalo de sondeo de configuración remota en segundos.

### AAP

`DD_APPSEC_ENABLED`
: **Configuración**: `appsec.enabled`<br>
**Por defecto**: `false`<br>
Activa las funciones de protección de aplicaciones y API.

`DD_APPSEC_RULES`
: **Configuración**: `appsec.rules`<br>
**Por defecto**: N/A<br>
Una ruta a un archivo de reglas AppSec personalizado.

`DD_APPSEC_WAF_TIMEOUT`
: **Configuración**: `appsec.wafTimeout`<br>
**Por defecto**: `5000`<br>
Limita el tiempo de ejecución síncrona de WAF (en microsegundos).

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **Configuración**: `appsec.obfuscatorKeyRegex`<br>
**Por defecto**: N/A<br>
Una cadena de expresiones regulares (regex) para ocultar datos sensibles por su clave en informes de ataques.

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **Configuración**: `appsec.obfuscatorValueRegex`<br>
**Por defecto**: N/A<br>
Una cadena de expresiones regulares (regex) para ocultar datos sensibles por su valor en informes de ataques.

### Monitorización de bases de datos

`DD_DBM_PROPAGATION_MODE`
: **Configuración**: `dbmPropagationMode`<br>
**Por defecto**: `'disabled'`<br>
Para habilitar el enlace entre DBM y APM mediante la inyección de etiquetas. Puedes configurarlo como `'service'` o `'full'`. La opción `'service'` habilita la conexión entre servicios DBM y APM. La opción `'full'` habilita la conexión entre tramos de bases de datos y eventos de consulta de bases de datos. Disponible para Postgres.

### Logs

`DD_LOGS_INJECTION`
: **Configuración**: `logInjection`<br>
**Por defecto**: `true`<br>
Activa la inyección automática de ID de trazas (traces) en logs de bibliotecas de generación de logs compatibles.

`DD_TRACE_LOG_LEVEL`
: **Configuración**: `logLevel`<br>
**Por defecto**: `debug`<br>
Una cadena para el nivel mínimo de logs, para que el rastreador utilice cuando el registro de depuración está habilitado. Por ejemplo, `error`, `debug`.

### OpenTelemetry

`DD_TRACE_OTEL_ENABLED`
: **Configuración**: N/A<br>
**Por defecto**: `undefined`<br>
Cuando `true`, el rastreo basado en OpenTelemetry para la instrumentación [personalizada][15] está activado.

### Generación de perfiles

`DD_PROFILING_ENABLED`
: **Configuración**: `profiling`<br>
**Por defecto**: `false`<br>
Si se habilita la generación de perfiles.

### Métricas de tiempos de ejecución

`DD_RUNTIME_METRICS_ENABLED`
: **Configuración**: `runtimeMetrics`<br>
**Por defecto**: `false`<br>
Si se habilita la captura de métricas de tiempo de ejecución. El puerto `8125` (o configurado con `DD_DOGSTATSD_PORT`) debe estar abierto en el Agent para UDP.

### Propagación del contexto de rastreo

Para obtener información sobre los valores válidos y el uso de las siguientes opciones de configuración, consulta [Propagación del contexto de rastreo Node.js][5].

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Configuración**: `tracePropagationStyle.inject`<br>
**Por defecto**: `Datadog,tracecontext,baggage`<br>
Una lista separada por comas de formatos de encabezados a incluir para propagar traces (trazas) distribuidas entre servicios.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Configuración**: `tracePropagationStyle.extract`<br>
**Por defecto**: `Datadog,tracecontext,baggage`<br>
Una lista separada por comas de formatos de encabezados de los que intentar extraer datos de propagación de rastreo distribuido. El primer formato encontrado con encabezados completos y válidos se utiliza para definir la trace (traza) para continuar.

`DD_TRACE_PROPAGATION_STYLE`
: **Configuración**: `tracePropagationStyle`<br>
**Por defecto**: `Datadog,tracecontext,baggage`<br>
Un lista separada por comas de formatos de encabezados de los que intentar insertar y extraer datos de propagación de rastreo distribuido. El primer formato encontrado con encabezados completos y válidos se utiliza para definir la trace (traza) para continuar. Las configuraciones más específicas `DD_TRACE_PROPAGATION_STYLE_INJECT` y `DD_TRACE_PROPAGATION_STYLE_EXTRACT` tienen prioridad cuando están presentes.

Para ver más ejemplos de cómo trabajar con la biblioteca, consulta la [documentación de la API][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /es/help/
[5]: /es/tracing/trace_collection/trace_context_propagation/
[6]: /es/tracing/guide/aws_payload_tagging/?code-lang=nodejs
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/opentelemetry/interoperability/environment_variable_support
[15]: /es/tracing/trace_collection/custom_instrumentation/nodejs/otel/
[16]: /es/tracing/trace_collection/library_config/#traces