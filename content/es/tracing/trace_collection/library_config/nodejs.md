---
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
  text: Documentación de API
- link: /tracing/trace_collection/trace_context_propagation/nodejs/
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

Después de configurar la biblioteca de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la biblioteca de rastreo como prefieras e incluir la configuración del [etiquetado unificado de servicios][1].

Los parámetros de rastreador pueden configurarse con las siguientes variables de entorno:

### Etiquetado

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

`DD_TAGS`
: **Configuración**: `tags`<br>
**Por defecto**: `{}`<br>
Configura etiquetas (tags) globales que se aplican a todos tramos (spans) y métricas de tiempo de ejecución. Cuando se pasa como una variable de entorno, el formato es `key:value,key:value`. Cuando se define mediante programación, el formato es `tracer.init({ tags: { foo: 'bar' } })`.

`DD_TRACE_HEADER_TAGS`
: **Configuración**: `headerTags` <br>
**Por defecto**: N/A <br>
Acepta una lista delimitada por comas de cabeceras HTTP que no distinguen mayúsculas de minúsculas, asignadas opcionalmente a nombres de etiquetas. Aplica automáticamente los valores de cabecera coincidentes como etiquetas en trazas. Cuando no se especifica un nombre de etiqueta, se utilizan por defecto etiquetas con el formato`http.request.headers.<header-name>`, para las solicitudes, y con el formato`http.response.headers.<header-name>`, para las respuestas. **Nota**: Esta opción sólo es compatible con HTTP/1.<br><br>
**Ejemplo**: `User-ID:userId,Request-ID`<br>
  - Si la **Solicitud/Respuesta** tiene una cabecera `User-ID`, su valor se aplica como etiqueta `userId` a los tramos producido por el servicio.<br>
  - Si la **Solicitud/Respuesta** tiene una cabecera `Request-ID`, su valor se aplica como etiqueta `http.request.headers.Request-ID`, para las solicitudes, y como`http.response.headers.Request-ID`, para las respuestas.

Se recomienda utilizar `DD_ENV`, `DD_SERVICE` y `DD_VERSION` para configurar `env`, `service` y `version` para tus servicios. Para obtener recomendaciones sobre la configuración de estas variables de entorno, consulta la documentación sobre [etiquetado unificado de servicios][1].

### Instrumentación

`DD_TRACE_ENABLED`
: **Configuración**: N/A<br>
**Por defecto**: `true`<br>
Si se habilita o no dd-trace. Si se configura como `false` se deshabilitan todas las funciones de biblioteca.

`DD_TRACE_DEBUG`
: **Configuración**: N/A<br>
**Por defecto**: `false`<br>
Habilita el registro de depuración en el rastreador.

`DD_TRACING_ENABLED`
: **Configuración**: N/A<br>
**Por defecto `true`<br>
Si se habilita o no el rastreo.

`DD_TRACE_AGENT_URL`
: **Configuración**: `url`<br>
**Por defecto**: `http://localhost:8126`<br>
La URL del Trace Agent a la que envía el rastreador. Tiene prioridad sobre el nombre de host y el puerto, si están definidos. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del predeterminado `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él. Compatible con sockets de dominio Unix, en combinación con el `apm_config.receiver_socket` en tu archivo `datadog.yaml`, o con la variable de entorno `DD_APM_RECEIVER_SOCKET`.

`DD_TRACE_AGENT_HOSTNAME`
: **Configuración**: `hostname`<br>
**Por defecto**: `localhost`<br>
La dirección del Agent a la que envía el rastreador.

`DD_TRACE_AGENT_PORT`
: **Configuración**: `port`<br>
**Por defecto**: `8126`<br>
El puerto del Trace Agent al que envía el rastreador. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto al predeterminado `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_DOGSTATSD_PORT`
: **Configuración**: `dogstatsd.port`<br>
**Por defecto**: `8125`<br>
El puerto del Agent DogStatsD al que se envían métricas. Si la [configuración del Agent][13] configura `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto al predeterminado `8125`, esta biblioteca de rastreo `DD_DOGSTATSD_PORT` debe coincidir con él.

`DD_LOGS_INJECTION`
: **Configuración**: `logInjection`<br>
**Por defecto**: `false`<br>
Habilita la inyección automática de los ID de rastreo en logs para bibliotecas de registro compatibles.

`DD_TRACE_SAMPLE_RATE`
: **Configuración**: `sampleRate`<br>
**Por defecto**: Otorga la decisión al Agent.<br>
Controla la frecuencia de muestreo del consumo (entre 0,0 y 1,0) entre el Agent y el backend.

`DD_TRACE_RATE_LIMIT`
: **Configuración**: `rateLimit`<br>
**Por defecto**: `100` cuando la `DD_TRACE_SAMPLE_RATE` está configurada. En caso contrario, delega la limitación de frecuencias al Datadog Agent .
El número máximo de trazas por segundo por instancia de servicio.<br>

`DD_TRACE_SAMPLING_RULES`
: **Configuración**: `samplingRules`<br>
**Por defecto**: `[]`<br>
Reglas de muestreo que se aplicarán al muestreo prioritario. Una matriz JSON de objetos. Cada objeto debe tener un valor `sample_rate` comprendido entre 0,0 y 1,0 (inclusive). Cada regla tiene los campos de `name` y de `service` opcionales, que son cadenas de expresiones regulares (regex) que se comparan con el `service` y el `name` de una traza. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de la traza. Si se omite, el rastreador determina que el Agent defina dinámicamente la frecuencia de muestreo en todas las trazas.

`DD_SPAN_SAMPLING_RULES`
: **Configuración**: `spanSamplingRules`<br>
**Por defecto**: `[]`<br>
Las reglas de muestreo de tramos para conservar tramos individuales cuando, de otro modo, el resto del rastreo se descartaría. Una matriz JSON de objetos. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de tramos. El valor de `sample_rate` debe estar comprendido entre 0,0 y 1,0 (inclusive).
Para obtener más información, consulta [Mecanismos de consumo][3].<br>
**Ejemplo<br>
  - Define la frecuencia de muestreo de tramos en 50% para el nombre de servicio `my-service` y de operación `http.request`, hasta 50 trazas por segundo: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_SPAN_SAMPLING_RULES_FILE`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Apunta a un archivo JSON que contiene las reglas de muestreo de tramos. `DD_SPAN_SAMPLING_RULES` tiene prioridad sobre esta variable. Para conocer el formato de las reglas, consulta `DD_SPAN_SAMPLING_RULES` 

`DD_RUNTIME_METRICS_ENABLED`
: **Configuración**: `runtimeMetrics`<br>
**Por defecto**: `false`<br>
Si se habilita o no la captura de métricas de tiempo de ejecución. El puerto `8125` (o configurado con `DD_DOGSTATSD_PORT`) debe estar abierto en el Agent para UDP.

`DD_SERVICE_MAPPING`
: **Configuración**: `serviceMapping`<br>
**Por defecto**: N/A<br>
**Ejemplo**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
Proporciona nombres de servicio para cada complemento. Acepta pares separados por comas `plugin:service-name`, con o sin espacios.

`DD_TRACE_DISABLED_PLUGINS`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
**Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=express,dns`<br>
Una cadena separada por comas de nombres de integración deshabilitados automáticamente cuando se inicializa el rastreador.

`DD_TRACE_LOG_LEVEL`
: **Configuración**: `logLevel`<br>
**Por defecto**: `debug`<br>
Una cadena para el nivel mínimo de logs, para que el rastreador utilice cuando el registro de depuración está habilitado, por ejemplo, `error`, `debug`.

Intervalo de descarga
: **Configuración**: `flushInterval`<br>
**Por defecto**: `2000`<br>
Intervalo en milisegundos en el que el rastreador envía trazas al Agent.

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Configuración**: `flushMinSpans`<br>
**Por defecto**: `1000`<br>
Número de tramos antes de exportar parcialmente una traza. Esto evita conservar todos los tramos en la memoria, en el caso de trazas muy grandes.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Una expresión regular (regex) para ocultar los datos confidenciales de la cadena de consulta de solicitudes entrantes que se informan en la etiqueta `http.url` (las coincidencias se sustituyen por `<redacted>`). Puede ser una cadena vacía, para deshabilitar el ocultamiento, o `.*`, para ocultar toda la cadena de consulta. **ADVERTENCIA: Esta expresión regular (regex) se ejecuta para cada solicitud entrante por una entrada insegura (URL), así que asegúrate de utilizar una expresión regular (regex) segura.

`DD_TRACE_CLIENT_IP_HEADER`
: **Configuración**: N/A<br>
**Por defecto**: N/A<br>
Nombre de cabecera personalizado del que procede la etiqueta `http.client_ip`.

Búsqueda DNS función
: **Configuración**: `lookup`<br>
**Por defecto**: `require('dns').lookup`<br>
Función personalizada para búsquedas DNS cuando se envían solicitudes al Agent. Algunas configuraciones tienen cientos de servicios en ejecución, cada uno haciendo búsquedas DNS en cada intervalo de descarga, lo que genera problemas de escalado. Anula este proceso para proporcionar tu propio mecanismo de caché o de resolución.

`DD_TRACE_AGENT_PROTOCOL_VERSION`
: **Configuración**: `protocolVersion`<br>
**Por defecto**: `0.4`<br>
Versión del protocolo a utilizar para las solicitudes al Agent. La versión configurada debe ser compatible con la versión del Agent instalada, de lo contrario se descartan todas las trazas.

`DD_PROFILING_ENABLED`
: **Configuración**: `profiling`<br>
**Por defecto**: `false`<br>
Si habilitar o no la generación de perfiles.

`DD_TRACE_REPORT_HOSTNAME`
: **Configuración**: `reportHostname`<br>
**Por defecto**: `false`<br>
Si se informa o no del nombre de host del sistema para cada traza. Si se deshabilita, se utiliza el nombre de host del Agent.

Características experimentales
: **Configuración**: `experimental`<br>
**Por defecto**: `{}`<br>
Las funciones experimentales pueden habilitarse añadiendo claves predefinidas con un valor de `true`. Para obtener más información sobre las funciones experimentales disponibles, [ponte en contacto con el servicio de asistencia][4].

Automáticamente Instrumentar Externo bibliotecas
: **Configuración**: `plugins`<br>
**Por defecto**: `true`<br>
Si habilitar o no la instrumentación automática de bibliotecas externas utilizando los complementos incorporados.

`DD_TRACE_STARTUP_LOGS`
: **Configuración**: `startupLogs`<br>
**Por defecto**: `false`<br>
Habilita la configuración del inicio del rastreador y el log de diagnóstico.

`DD_DBM_PROPAGATION_MODE`
: **Configuración**: `dbmPropagationMode`<br>
**Por defecto**: `'disabled'`<br>
Para habilitar la vinculación entre DBM y APM mediante la inyección de etiquetas puedes configurarla como `'service'` o `'full'`. La opción `'service'` habilita la conexión entre servicios DBM y APM. La opción `'full'` habilita la conexión entre tramos de bases de datos y eventos de consulta de bases de datos. Disponible para Postgres.

`DD_APPSEC_ENABLED`
: **Configuración**: `appsec.enabled`<br>
**Por defecto**: `false`<br>
Habilita las funciones de gestión de la seguridad de las aplicaciones.

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

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **Configuración**: `remoteConfig.pollInterval`<br>
**Por defecto**: 5<br>
Intervalo de sondeo de configuración remota en segundos.

### Extracción e inyección de cabeceras

Para obtener información sobre los valores válidos y el uso de las siguientes opciones de configuración, consulta [Propagación de contexto de rastreo Node.js][5].

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **Configuración**: `tracePropagationStyle.inject`<br>
**Por defecto**: `Datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabecera a incluir para propagar trazas distribuidas entre servicios.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **Configuración**: `tracePropagationStyle.extract`<br>
**Por defecto**: `Datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabecera de los que se intentará extraer datos de propagación de rastreo distribuidos. El primer formato encontrado con cabeceras completas y válidas se utiliza para definir la traza y continuar.

`DD_TRACE_PROPAGATION_STYLE`
: **Configuración**: `tracePropagationStyle`<br>
**Por defecto**: `Datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabecera de los que se intentará extraer datos de propagación de rastreo distribuidos. El primer formato encontrado con cabeceras completas y válidas se utiliza para definir la traza y continuar. Las configuraciones más específicas `DD_TRACE_PROPAGATION_STYLE_INJECT` y `DD_TRACE_PROPAGATION_STYLE_EXTRACT` tienen prioridad, cuando están presentes.

Para ver más ejemplos de cómo trabajar con la biblioteca, consulta la [documentación de la API][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /es/help/
[5]: /es/tracing/trace_collection/trace_context_propagation/nodejs
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/opentelemetry/interoperability/environment_variable_support