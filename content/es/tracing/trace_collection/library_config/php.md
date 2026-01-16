---
code_lang: PHP
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Monitorización PHP con Datadog APM y rastreo distribuido
- link: https://github.com/DataDog/dd-trace-php
  tag: Código fuente
  text: Código fuente
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de rastreo
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: /tracing/
  tag: Documentación
  text: Uso avanzado
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración del rastreo de librerías de PHP
type: lenguaje de código múltiple
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [etiquetado de servicios unificado][1].

El rastreador PHP puede configurarse mediante variables de entorno y parámetros INI.

Los parámetros INI pueden configurarse globalmente, por ejemplo, en el archivo `php.ini`, o para un servidor web o host virtual específicos.

**Nota**: Si utilizas la instrumentación automática del código (estrategia recomendada), ten en cuenta que el código de instrumentación se ejecuta antes que cualquier código de usuario. Como resultado, las variables de entorno y los parámetros INI que se indican a continuación deben configurarse a nivel del servidor y estar disponibles para el tiempo de ejecución PHP, antes de que se ejecute cualquier código de usuario. Por ejemplo, los archivos `putenv()` y `.env` no funcionan.

## Apache

Para Apache con PHP-FPM, utiliza la directiva `env[]` en tu archivo de configuración `www.conf` para configurar el rastreador PHP. Por ejemplo:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value datadog.service my-app
```

**Nota:** En forma predeterminada, PHP-FPM no hereda variables de entorno del sistema host cuando `clear_env=yes` se configura en `www.conf`. Si necesitas utilizar variables de entorno configuradas en host, debes definirlas explícitamente utilizando la directiva `env[]`.

Para Apache sin PHP-FPM (configuraciones mod_php), puedes configurar variables de entorno directamente en la configuración del servidor, el host virtual, el directorio o el archivo `.htaccess` utilizando [`SetEnv`][2]:

```text
# In a virtual host configuration as an environment variable
SetEnv DD_TRACE_DEBUG 1
# In a virtual host configuration as an INI setting
php_value datadog.service my-app
```

## NGINX y PHP-FPM

<div class="alert alert-danger">
<strong>Nota:</strong> PHP-FPM no admite el valor <code>falso</code> en las directivas <code>env[...]</code>. Utiliza <code>1</code> en lugar de <code>verdadero</code> y <code>0</code> en lugar de <code>false</code>.
</div>

Para NGINX, utiliza la directiva `env` del archivo `www.conf` de php-fpm, por ejemplo:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value[datadog.service] = my-app
```

**Nota**: Si has habilitado APM para tu servidor NGINX, asegúrate de haber configurado correctamente el parámetro `opentracing_fastcgi_propagate_context` para que el rastreo distribuido funcione correctamente. Para obtener más detalles, consulta la [configuración de APM NGINX][3].

## Servidor CLI PHP

Define la línea de comandos para iniciar el servidor.

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

## Configuración de la variable de entorno

La siguiente tabla presenta las variables de entorno para configurar el rastreo, los parámetros INI correspondientes (si están disponibles) y los valores predeterminados.

### Etiquetado de servicios unificado

`DD_ENV`
: **INI**: `datadog.env`<br>
**Por defecto**: `null`<br>
Define el entorno de una aplicación, por ejemplo: `prod`, `pre-prod`, `stage`. A partir de la versión `0.90.0`, los cambios en `datadog.version` en tiempo de ejecución a través de `ini_set` también se aplican al tramo (span) raíz actual.

`DD_VERSION`
: **INI**: `datadog.version`<br>
**Por defecto**: `null`<br>
Define la versión de una aplicación en trazas y logs, por ejemplo: `1.2.3`, `6c44da20`, `2020.02.13`. A partir de la versión `0.90.0`, los cambios en `datadog.version` en tiempo de ejecución, a través de `ini_set`, también se aplican al tramo raíz actual.

`DD_SERVICE`
: **INI**: `datadog.service`<br>
**Por defecto**: `null`<br>
El nombre por defecto de la aplicación.

### Trazas (traces)

`DD_TRACE_ENABLED`
: **INI**: `Datadog.rastrear.enabled`<br>
**Predeterminado**: `1`<br>
Habilita el rastreador globalmente.<br/>
Consulta también [DD_APM_TRACING_ENABLED][21].

`DD_PRIORITY_SAMPLING`
: **INI**: `datadog.priority_sampling`<br>
**Por defecto**: `1`<br>
Si se habilita el muestreo prioritario.

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Por defecto**: `null`<br>
Cambia el nombre por defecto de una integración APM. Cambia el nombre de una o más integraciones a la vez, por ejemplo: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (consulta [Nombres de integraciones](#integration-names)).

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_generation_enabled`<br>
**Por defecto**: `true`<br>
Cuando es verdadero, el rastreador genera los ID de rastreo de 128 bits y codifica los ID de rastreo como 32 caracteres hexadecimales en minúsculas con cero relleno.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_logging_enabled`<br>
**Por defecto**: `0`<br>
Habilita la impresión del ID completo de rastreo de 128 bits formateando los ID de rastreo para la correlación con logs.
Cuando es falso (por defecto), sólo se imprimen los 64 bits inferiores del ID de rastreo, formateados como un número entero. Esto significa que si el ID de rastreo es de sólo 64 bits, se imprime el ID completo.
Cuando es verdadero, el ID de rastreo se imprime como ID de rastreo de 128 bits completo en formato hexadecimal. Este es el caso, incluso si el ID sólo tiene 64 bits.

`DD_TRACE_HEALTH_METRICS_ENABLED`
: **INI**: `datadog.trace_health_metrics_enabled`<br>
**Por defecto**: `false`<br>
Cuando está habilitado, el rastreador envía estadísticas a DogStatsD. Además, cuando `sigaction` está disponible en el momento de la compilación, el rastreador envía métricas de excepción no capturadas, en caso de fallos de segmentación.

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI**: `datadog.trace.agent_connect_timeout`<br>
**Por defecto**: `100`<br>
El tiempo de espera de conexión del Agent (en milisegundos).

`DD_TRACE_AGENT_PORT`
: **INI**: `datadog.trace.agent_port`<br>
**Por defecto**: `8126`<br>
El número de puerto del Agent. Si la [configuración del Agent][13] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_TRACE_AGENT_TIMEOUT`
: **INI**: `datadog.trace.agent_timeout`<br>
**Por defecto**: `500`<br>
El tiempo de espera de transferencia de solicitudes del Agent (en milisegundos).

`DD_TRACE_AGENT_URL`
: **INI**: `datadog.trace.agent_url`<br>
**Por defecto**: `null`<br>
La URL del Agent tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`. Por ejemplo: `https://localhost:8126`. Si la [configuración del Agent][13] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, `DD_TRACE_AGENT_PORT` o `DD_TRACE_AGENT_URL` deben coincidir con él.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**Predeterminado**: `0` (`1` en el entorno de CLI)<br>
Vacía automáticamente el rastreador cuando se cierran todos los tramos (spans); configura en `1` junto con `DD_TRACE_GENERATE_ROOT_SPAN=0` para rastrear [procesos de ejecución prolongada][14].

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**Predeterminado**: `1`<br>
Habilita el rastreo de scripts PHP desde la CLI. Configura [Rastreo de scripts CLI][15].

`DD_TRACE_DEBUG`
: **INI**: `datadog.trace.debug`<br>
**Por defecto**: `0`<br>
Habilita el modo de depuración. Cuando es `1`, los mensajes de logs se envían al dispositivo o archivo configurado en el parámetro INI `error_log`. El valor real de `error_log` puede ser diferente del resultado de `php -i`, ya que puede sobrescribirse en los archivos de configuración de PHP-FPM/Apache. Si está activo, tiene prioridad sobre `DD_TRACE_LOG_LEVEL`.

`DD_TRACE_LOG_LEVEL`
: **INI**: `datadog.trace.log_level`<br>
**Por defecto**: `Error`<br>
Define un nivel de log preciso. El nivel de log sigue las convenciones de RUST_LOG. Los niveles de log aceptados son `error`, `warn`, `info`, `debug`, `trace` y `off`.

`DD_TRACE_LOG_FILE`
: **INI**: `datadog.trace.log_file`<br>
**Por defecto**: ``<br>
Especifica un archivo de log. Si no se especifica ninguno, los logs van a la localización de errores PHP por defecto. Para depurar problemas datadog-ipc-helper (por ejemplo, el envío de telemetría), debes especificar el archivo de log.

`DD_TRACE_FORKED_PROCESS`
: **INI**: `datadog.trace.forked_process`<br>
**Por defecto**: `1`<br>
Indica si se rastrea un proceso bifurcado. Configúralo como `1`, para rastrear procesos bifurcados, o como `0`, para deshabilitar el rastreo en procesos bifurcados. Si se configura como `0`, puedes volver a habilitar manualmente el rastreo de un proceso en código con `ini_set("datadog.trace.enabled", "1");`, pero este será presentado como una traza nueva. Las trazas de procesos bifurcados se muestran como trazas enteras distribuidas sólo si `DD_TRACE_FORKED_PROCESS` y `DD_DISTRIBUTED_TRACING` están configurados como `1` (activos).

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI**: `datadog.trace.generate_root_span`<br>
**Por defecto**: `1`<br>
Genera automáticamente un tramo de nivel superior. Configúralo como `0`, junto con `DD_TRACE_AUTO_FLUSH_ENABLED=1`, para rastrear [procesos de ejecución prolongada][14].

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**Por defecto**: `null`<br>
CSV de nombres de cabeceras que se informan en el tramo raíz como etiquetas (tags).

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**Por defecto**: `0`<br>
Define el nombre de servicio de las solicitudes HTTP como `host-<hostname>`. Por ejemplo, una llamada `curl_exec()` a `https://datadoghq.com` tiene el nombre de servicio `host-datadoghq.com`, en lugar del nombre de servicio por defecto `curl`.

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**Por defecto**: `1`<br>
Registra el tiempo de compilación de la solicitud (en milisegundos) en el tramo de nivel superior.

`DD_TRACE_REMOVE_AUTOINSTRUMENTATION_ORPHANS`
: **INI**: `datadog.trace.remove_autoinstrumentation_orphans`<br>
**Por defecto**: `false`<br>
Elimina automáticamente tramos huérfanos generados mediante instrumentación automática. Actualmente, esto sólo se aplica a algunas llamadas de Redis y Laravel utilizadas en el contexto de Laravel Horizon. Añadido en la versión `0.88.0`.<br><br>
**Nota:** Estos tramos huérfanos se descargan, pero no se registran en la traza. Además, las trazas de tramo único específicas que se eliminan con esta opción de configuración son:
  - `laravel.event.handle`
  - `laravel.provider.load`
  - `Predis.Client.__construct`
  - `Predis.Client.executeCommand`
  - `Predis.Pipeline.executePipeline`

`DD_TRACE_REMOVE_ROOT_SPAN_LARAVEL_QUEUE`
: **INI**: `datadog.trace.remove_root_span_laravel_queue`<br>
**Por defecto**: `true`<br>
Deshabilita automáticamente la generación de tramos raíz (consulta `DD_TRACE_GENERATE_ROOT_SPAN`) y habilita la descarga automática (consulta `DD_TRACE_AUTO_FLUSH_ENABLED`) para los comandos Laravel Queue/Horizon. Añadido en la versión `0.88.0`.

`DD_TRACE_REMOVE_ROOT_SPAN_SYMFONY_MESSENGER`
: **INI**: `datadog.trace.remove_root_span_symfony_messenger`<br>
**Por defecto**: `true`<br>
Deshabilita automáticamente la generación de tramos raíz (consulta `DD_TRACE_GENERATE_ROOT_SPAN`) y habilita el vaciado automático (consulta `DD_TRACE_AUTO_FLUSH_ENABLED`) para los comandos de Symfony Messenger. Añadido en la versión `1.3.0`.

`DD_TRACE_LARAVEL_QUEUE_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.laravel_queue_distributed_tracing`<br>
**Por defecto**: `true`<br>
Deshabilita la creación de un tramo `laravel.queue.process` adicional y se basa únicamente en enlaces de tramos. Añadido en la versión `0.93.0`.

`DD_TRACE_SYMFONY_MESSENGER_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.symfony_messenger_distributed_tracing`<br>
**Por defecto**: `true`<br>
Si se deshabilita, las relaciones causales de producción/consumo se asociarán mediante enlaces de tramos. Añadido en la versión `1.3.0`.

`DD_TRACE_SYMFONY_MESSENGER_MIDDLEWARES`
: **INI**: `datadog.trace.symfony_messenger_middlewares`<br>
**Por defecto**: `false`<br>
Habilita el rastreo de los middlewares de Symfony Messenger. Añadido en la versión `1.3.0`.

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI**: `datadog.trace.resource_uri_fragment_regex`<br>
**Por defecto**: `null`<br>
CSV de expresiones regulares (regex) que identifica fragmentos de ruta correspondientes a los ID. (Consulta [Asignar nombres de recursos a URI normalizados](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI**: `datadog.trace.resource_uri_mapping_incoming`<br>
**Por defecto**: `null`<br>
CSV de asignaciones a URI para normalizar la nomenclatura de los recursos para las solicitudes entrantes. (Consulta [Asignar nombres de recursos a URI normalizados](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI**: `datadog.trace.resource_uri_mapping_outgoing`<br>
**Por defecto**: `null`<br>
CSV de asignaciones a URI para normalizar la nomenclatura de los recursos para las solicitudes salientes. (Consulta [Asignar nombres de recursos a URI normalizados](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI**: `datadog.trace.retain_thread_capabilities`<br>
**Por defecto**: `0`<br>
Funciona para Linux. Configúralo como `true` para conservar las capacidades en los threads en segundo plano de Datadog cuando cambies el ID de usuario efectivo. Esta opción no afecta a la mayoría de las configuraciones, pero algunos módulos (hasta la fecha, Datadog sólo tiene conocimiento de que el [mod-ruid2 de Apache][5]) pueden invocar `setuid()` o llamadas al sistema similares, provocando caídas o deficiencias de funcionalidad al perder capacidades.<br><br>
**Nota:** Habilitar esta opción puede comprometer la seguridad. Esta opción, por sí sola, no supone un riesgo para la seguridad. Sin embargo, un atacante capaz de explotar una vulnerabilidad en PHP o en el servidor web podría ser capaz de escalar privilegios con relativa facilidad, si el servidor web o PHP se iniciaran con capacidades completas, ya que los threads en segundo plano conservarían sus capacidades originales. Datadog recomienda restringir las capacidades del servidor web a través de la utilidad `setcap`.

`DD_HTTP_SERVER_ROUTE_BASED_NAMING`
: **INI**: `datadog.http_server_route_based_naming`<br>
**Por defecto**: `true`<br>
Habilita la asignación de nombres basada en rutas para las solicitudes del servidor HTTP. Configúralo como `true` para utilizar el formato de nombres de recurso del tramo raíz específico de la integración. Cuando es `false`, se utilizan el método y la ruta HTTP. Añadido en la versión `0.89.0`.

`DD_TRACE_RATE_LIMIT`
: **INI**: `datadog.trace.rate_limit`<br>
**Por defecto**: `0`<br>
Número máximo de tramos para muestrear por segundo. Todos los procesos en un grupo Apache o FPM comparten el mismo limitador. Si no se define (0), la limitación de la frecuencia se delega al Datadog Agent.

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI**: `datadog.trace.url_as_resource_names_enabled`<br>
**Por defecto**: `1`<br>
Habilita las URL como nombres de recursos. (Consulta [Asignar nombres de recursos a URI normalizados](#map-resource-names-to-normalized-uri)).

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**Por defecto**: `*`<br>
Una lista separada por comas de los parámetros de consulta que se recopilarán como parte de la URL. Configúrala como vacía, para evitar la recopilación de parámetros, o como `*`, para recopilar todos los parámetros. Añadido en la versión `0.74.0`.

`DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_post_data_param_allowed`<br>
**Por defecto**: ""<br>
Una lista separada por comas de los campos de datos HTTP POST que se recopilarán. Déjala vacía si no quieres recopilar ningún valor publicado. Cuando se configura este valor con el comodín `*`, se recopilan todos los datos publicados, pero se oculatan los valores de los campos que coinciden con la regla de ofuscación `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`. Si se indican campos específicos, sólo se mostrarán los valores de estos campos, mientras que los valores de todos los demás campos se ocultarán. Añadido en la versión `0.86.0`.<br>
**Ejemplo**:
  - Los datos publicados son `qux=quux&foo[bar][password]=Password12!&foo[bar][username]=admin&foo[baz][bar]=qux&foo[baz][key]=value`
  - `DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED` se configura como `foo.baz,foo.bar.password`
  - En este escenario, los metadatos recopilados son:
    - `http.request.foo.bar.password=Password12!`
    - `http.request.foo.bar.username=<redacted>`
    - `http.request.foo.baz.bar=qux`
    - `http.request.foo.baz.key=value`
    - `http.request.qux=<redacted>`

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.resource_uri_query_param_allowed`<br>
**Por defecto**: `*`<br>
Una lista separada por comas de los parámetros de consulta que se recopilarán como parte del URI del recurso. Configúrala como vacía, para evitar la recopilación de parámetros, o como `*`, para recopilar todos los parámetros. Añadido en la versión `0.74.0`.

`DD_TRACE_CLIENT_IP_ENABLED`
: **INI**: `datadog.trace.client_ip_enabled`<br>
**Por defecto**:  `false`<br>
Habilita la recopilación de IP del lado del cliente. Añadido en la versión `0.84.0`.

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `Datadog.rastrear.client_ip_header`<br>
**Predeterminado**: `null`<br>
El encabezado de IP a utilizar para la recopilación de IP del cliente, por ejemplo: `x-forwarded-for`. Añadido en la versión `0.84.0` (`0.76.0` cuando se utiliza AAP).

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**Por defecto**:
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
Expresión regular utilizada para ofuscar la cadena de consultas incluida como parte de la URL. Esta expresión también se utiliza en el proceso para ocultar datos HTTP POST. Añadido en la versión `0.76.0`.

`DD_TRACE_SPANS_LIMIT`
: **INI**: `datadog.trace.spans_limit`<br>
**Por defecto**: `1000`<br>
El número máximo de tramos que se generan en una traza. Si se alcanza el número máximo de tramos, ya no se generan tramos. Si se aumenta el límite, la cantidad de memoria utilizada por una traza pendiente aumentará y podría alcanzar la cantidad máxima de memoria permitida PHP. La cantidad máxima de memoria permitida puede aumentarse con el parámetro de sistema INI PHP `memory_limit`.

`DD_SPAN_SAMPLING_RULES`
: **INI**: `datadog.span_sampling_rules`<br>
**Por defecto**: `null`<br>
Una cadena codificada JSON para configurar la frecuencia de muestreo. Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo del tramo. El valor de `sample_rate` debe estar comprendido entre 0,0 y 1,0 (inclusive). <br>
**Por ejemplo: Configura la frecuencia de muestreo de tramos en 50% para el servicio 'my-service' y el nombre de operación 'http.request', hasta 50 trazas por segundo: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`. El objeto JSON **debe** ir rodeado de comillas simples (`'`) para evitar problemas con el escape del carácter de comillas dobles (`"`).<br>
Para obtener más información, consulta [Mecanismos de consumo][6].<br>

### Agent

`DD_AGENT_HOST`
: **INI**: `datadog.agent_host`<br>
**Por defecto**: `localhost` <br>
Nombre del host Agent.

`DD_AUTOFINISH_SPANS`
: **INI**: `datadog.autofinish_spans`<br>
**Por defecto**: `0`<br>
Si los tramos se terminan automáticamente cuando se vacía el rastreador.

`DD_DISTRIBUTED_TRACING`
: **INI**: `datadog.distributed_tracing`<br>
**Por defecto**: `1`<br>
Si se habilita el rastreo distribuido.

`DD_DOGSTATSD_URL`
: **INI**: `datadog.dogstatsd_url`<br>
**Por defecto**: `null`<br>
La URL utilizada para negociar la conexión con DogStatsD. Este parámetro tiene prioridad sobre `DD_AGENT_HOST` y `DD_DOGSTATSD_PORT`. Sólo es compatible con los esquemas `udp://` o `unix://`.

`DD_DOGSTATSD_PORT`
: **INI**: `datadog.dogstatsd_port`<br>
**Por defecto**: `8125`<br>
El puerto utilizado para conectarse a DogStatsD, utilizado en combinación con `DD_AGENT_HOST` para negociar la conexión con DogStatsD cuando `DD_TRACE_HEALTH_METRICS_ENABLED` está habilitado.

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**Por defecto**: `null`<br>
Etiquetas para configurar en todos los tramos. Por ejemplo: `key1:value1,key2:value2`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **INI**: `datadog.instrumentation_telemetry_enabled`<br>
**Por defecto**: `true`<br>
Datadog puede recopilar [información del entorno y de diagnóstico de tu sistema][16] para mejorar el producto. Si es falso, no se recopilarán estos datos de telemetría.

### Bases de datos

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE`
: **INI**: `datadog.trace.db_client_split_by_instance`<br>
**Por defecto**: `0`<br>
Define el nombre de servicio de las solicitudes HTTP como `pdo-<hostname>`. Por ejemplo, una llamada `PDO->query()` al host de una base de datos `datadoghq.com` tiene el nombre de servicio `pdo-datadoghq.com`, en lugar del nombre de servicio por defecto `pdo` .

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**Por defecto**: `0`<br>
Define el nombre de servicio de las operaciones de clientes Redis como `redis-<hostname>`.

### Monitorización de bases de datos

`DD_DBM_PROPAGATION_MODE`
: **INI**: `datadog.dbm_propagation_mode`<br>
**Por defecto**: `'disabled'`<br>
Habilita la conexión entre los datos enviados desde APM y el producto Database Monitoring, cuando se configura como `'service'` o `'full'`.<br>
La opción `'service'` permite la conexión entre servicios DBM y APM. Disponible para Postgres, MySQL y SQLServer.<br>
La opción `'full'` permite la conexión entre tramos de bases de datos y eventos de consultas de bases de datos. Disponible para Postgres y MySQL.<br>

### Logs

`DD_LOGS_INJECTION`
: **INI**: `datadog.logs_injection`<br>
**Por defecto**: `0`<br>
Habilita o deshabilita la inyección automática de identificadores de correlación en logs de aplicación. Añadido en la versión `0.89.0`<br>
Para obtener más información, consulta la [documentación de correlación en logs][17].

### OpenTelemetry

`DD_TRACE_OTEL_ENABLED`
: Habilita o deshabilita el rastreo basado en OpenTelemetry, tanto para la instrumentación [personalizada][18] como para la instrumentación [automática][19]. <br>
Los valores válidos son: `true` o `false`.<br>
**Por defecto**: `false`

### Generación de perfiles

`DD_PROFILING_ENABLED`
: **INI**: `datadog.profiling.enabled`. INI disponible a partir de `0.82.0`.<br>
**Por defecto**: `1`<br>
Habilita el generador de perfiles de Datadog. Añadido en la versión `0.69.0`. Consulta [Habilitar el generador de perfiles PHP][4]. Para la versión `0.81.0` y anteriores era `0` por defecto.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **INI**: `datadog.profiling.endpoint_collection_enabled`. INI disponible a partir de `0.82.0`.<br>
**Por defecto**: `1`<br>
Si se habilita la recopilación de datos del endpoint en los perfiles. Añadido en la versión `0.79.0`.

`DD_PROFILING_ALLOCATION_ENABLED`
: **INI**: `datadog.profiling.allocation_enabled`. INI disponible a partir de `0.88.0`.<br>
**Por defecto**: `1`<br>
Habilita el tipo de perfil de tamaño de asignación y bytes de asignación. Añadido en la versión `0.88.0`. Cuando se detecta un JIT activo, la generación de perfiles de asignación se desactiva para la versión PHP `8.0.0` -`8.1.20` y `8.2.0`-`8.2.7`, debido a una limitación del ZendEngine.<br>
**Nota**: Esto sustituye a la variable de entorno `DD_PROFILING_EXPERIMENTAL_ALLOCATION_ENABLED` (parámetro INI`datadog.profiling.experimental_allocation_enabled`), que estaba disponible a partir de `0.84`. Si ambas están configuradas, ésta tiene prioridad.

`DD_PROFILING_ALLOCATION_SAMPLING_DISTANCE`
: **INI**: `Datadog.profiling.allocation_sampling_distance`.
**Predeterminado**: `4194304` (4 MB)<br>
Configura la distancia de muestreo para las asignaciones. Cuanto mayor sea la distancia de muestreo, menos muestras se crearán y menor será la sobrecarga. Añadido en la versión `1.9.0`.

`DD_PROFILING_EXPERIMENTAL_FEATURES_ENABLED`
: **INI**: `datadog.profiling.experimental_features_enabled`. INI disponible a partir de `0.96.0`.<br>
**Por defecto**: `0`<br>
Habilita todas las características experimentales.<br>
**Nota**: Esta configuración anula las configuraciones más específicas y, si está habilitada, la activación de otros parámetros de configuración experimentales no tendrá ningún efecto.

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI**: `datadog.profiling.experimental_cpu_time_enabled`. INI disponible a partir de `0.82.0`.<br>
**Por defecto**: `1`<br>
Habilita el tipo de perfil de CPU experimental. Añadido en la versión `0.69.0`. Para la versión `0.76` y anteriores era `0`.

`DD_PROFILING_EXCEPTION_ENABLED`
: **INI**: `datadog.profiling.exception_enabled`. INI disponible a partir de `0.96.0`.<br>
**Por defecto**: `1`<br>
Habilita el tipo de perfil de excepción. Añadido en la versión `0.92.0` y GA
en la versión `0.96.0`.<br><br>
**Nota**: Esto sustituye a la variable de entorno`DD_PROFILING_EXPERIMENTAL_EXCEPTION_ENABLED` (parámetro INI`datadog.profiling.experimental_exception_enabled`), que estaba disponible a partir de `0.92`. Si ambas están configuradas, ésta tiene prioridad.

`DD_PROFILING_EXCEPTION_MESSAGE_ENABLED`
: **INI**: `datadog.profiling.exception_message_enabled`. INI disponible a partir de `0.98.0`.<br>
**Por defecto**: `0`<br>
Habilita la recopilación de mensajes de excepción con muestras de excepción.<br><br>
**Nota**: Ten en cuenta que tus mensajes de excepción pueden contener PII (Información de identificación personal), que es la razón por la que este parámetro está deshabilitado por defecto.

`DD_PROFILING_EXCEPTION_SAMPLING_DISTANCE`
: **INI**: `datadog.profiling.exception_sampling_distance`. INI disponible a partir de `0.96.0`.<br>
**Por defecto**: `100`<br>
Configura la distancia de muestreo para las excepciones. Cuanto mayor sea la distancia de muestreo, menos muestras se crearán y menor será la sobrecarga.<br><br>
**Nota**: Sustituye a la variable de entorno`DD_PROFILING_EXPERIMENTAL_EXCEPTION_SAMPLING_DISTANCE` (parámetro INI`datadog.profiling.experimental_exception_sampling_distance`), disponible a partir de `0.92`. Si ambas están activadas, ésta tiene prioridad.

`DD_PROFILING_TIMELINE_ENABLED`
: **INI**: `datadog.profiling.timeline_enabled`. INI disponible a partir de `0.98.0`.<br>
**Por defecto**:  `1`<br>
Habilita el tipo de perfil de línea de tiempo. Añadido en la versión `0.89.0`.<br><br>
**Nota**: Sustituye a la variable de entorno`DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED` (parámetro INI`datadog.profiling.experimental_timeline_enabled`), que estaba disponible a partir de `0.89` (por defecto `0`). Si ambas están activadas, ésta tiene prioridad.

`DD_PROFILING_EXPERIMENTAL_IO_ENABLED`
: **INI**: `Datadog.profiling.experimental_io_enabled`. INI disponible desde `1.7.2`.<br>
**Predeterminado**: `1`<br>
Habilita el tipo de perfil de E/S. Añadido como beta en la versión `1.7.2`.

`DD_PROFILING_LOG_LEVEL`
: **INI**: `datadog.profiling.log_level`. INI disponible a partir de `0.82.0`.<br>
**Por defecto**: `off`<br>
Define el nivel de log del generador de perfiles. Los valores aceptables son `off`, `error`, `warn`, `info`, `debug` y `trace`. Los logs del generador de perfiles se escriben en el flujo (flow) de error estándar del proceso. Añadido en la versión `0.69.0`.

### Propagación del contexto de rastreo

Consulta [Propagación del contexto de rastreo][11] para obtener información sobre cómo configurar la librería de rastreo PHP para extraer e inyectar cabeceras para propagar el contexto de rastreo distribuido.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **INI**: `Datadog.rastrear.propagation_style_inject`<br>
**Predeterminado**: `Datadog,tracecontext,baggage`<br>
Estilos de propagación a utilizar al insertar encabezados de rastreo. Si utilizas varios estilos, sepárelos con comas. Los estilos admitidos son:

  - [tracecontext][10]
  - [b3multi][7]
  - [cabecera simple B3][8]
  - Datadog
  - [Equipaje] [22]

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI**: `Datadog.rastrear.propagation_style_extract`<br>
**Predeterminado**: `Datadog,tracecontext,b3multi,B3 single header,baggage`<br>
Estilos de propagación a utilizar al extraer los encabezados de rastreo. Si utilizas varios estilos, sepárelos con comas. Los estilos admitidos son:

  - [tracecontext][10]
  - [b3multi][7]
  - [cabecera simple B3][8]
  - Datadog
  - [Equipaje] [22]

### Integraciones

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**Por defecto**: `1`<br>
Habilita o deshabilita una integración. Todas las integraciones están habilitadas por defecto. (Consulta [Nombres de integraciones](#integration-names)).

`DD_TRACE_WORDPRESS_ADDITIONAL_ACTIONS`
: **INI**: `datadog.trace.wordpress_additional_actions`<br>
**Por defecto**: `null`<br>
Una lista separada por comas de los ganchos de acción de WordPress que se van a instrumentar. Esta función sólo está disponible cuando `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` está habilitada. Añadido en la versión `0.91.0`.

`DD_TRACE_WORDPRESS_CALLBACKS`
: **INI**: `datadog.trace.wordpress_callbacks`<br>
**Por defecto**: `true` para el rastreador PHP v1.0 o anterior<br>
Habilita las retrollamadas de instrumentación de los ganchos de acción de WordPress. Esta función sólo está disponible cuando `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` está habilitado. Añadido en la versión `0.91.0`.


`DD_OPENAI_SERVICE`
: **INI**: `datadog.openai.service`<br>
**Por defecto**: `DD_SERVICE`<br>
El nombre del servicio informado por defecto para solicitudes OpenAI.

`DD_OPENAI_LOGS_ENABLED`
: **INI**: `Datadog.openai.logs_enabled`<br>
**Predeterminado**: `false`<br>
Habilita la recopilación de avisos y finalizaciones como logs. Puedes ajustar la tasa de avisos y finalizaciones recopilados utilizando la configuración de la tasa de muestreo que se describe a continuación.

`DD_OPENAI_METRICS_ENABLED`
: **INI**: `datadog.openai.metrics_enabled`<br>
**Por defecto**: `true`<br>
Habilita la recopilación de métricas de OpenAI.<br>
Si el Datadog Agent está configurado para utilizar un nombre de host o puerto StatsD no predeterminado, utiliza `DD_DOGSTATSD_URL` para configurar la recopilación de métricas de OpenAI.

`DD_OPENAI_SPAN_CHAR_LIMIT`
: **INI**: `Datadog.openai.span_char_limit`<br>
**Predeterminado**: `128`<br>
Configura el número máximo de caracteres para los siguientes datos en etiquetas (tags) de tramos (spans):

  - Entradas de avisos y finalizaciones
  - Entradas de mensajes y finalizaciones
  - Inserción de entradas

Los textos que superan el número máximo de caracteres se truncan hasta el límite de caracteres y se añade `...` al final.

`DD_OPENAI_SPAN_PROMPT_COMPLETION_SAMPLE_RATE`
: **INI**: `Datadog.openai.span_prompt_completion_sample_rate`<br>
**Predeterminado**: `1.0`<br>
Configura la tasa de muestreo para la recopilación de avisos y finalizaciones como etiquetas (tags) de tramos (spans) .

`DD_OPENAI_LOG_PROMPT_COMPLETION_SAMPLE_RATE`
: **INI**: `Datadog.openai.log_prompt_completion_sample_rate`<br>
**Predeterminado**: `0.1`<br>
Configura la tasa de muestreo para la recopilación de avisos y finalizaciones como logs.

#### Nombres de integraciones

La siguiente tabla especifica los nombres de servicios por defecto para cada integración. Cambia los nombres de servicios con `DD_SERVICE_MAPPING`.

Al definir la configuración específica de una integración, utiliza el nombre, como por ejemplo `DD_TRACE_<INTEGRATION>_ENABLED`. Por ejemplo: Laravel es `DD_TRACE_LARAVEL_ENABLED`.

| Integración       | Nombre de servicio       |
|-------------------|--------------------|
| AMQP              | `amqp`             |
| CakePHP           | `cakephp`          |
| CodeIgniter       | `codeigniter`      |
| cURL              | `curl`             |
| ElasticSearch     | `elasticsearch`    |
| Eloquent          | `eloquent`         |
| Guzzle            | `guzzle`           |
| Laminas           | `laminas`          |
| Laravel           | `laravel`          |
| Cola de Laravel     | `laravelqueue`     |
| Lumen             | `lumen`            |
| Memcache          | `memcache`         |
| Memcached         | `memcached`        |
| Mongo             | `mongo`            |
| MongoDB           | `mongodb`          |
| Mysqli            | `mysqli`           |
| Nette             | `nette`            |
| OpenAI            | `openai`           |
| PCNTL             | `pcntl`            |
| PDO               | `pdo`              |
| PhpRedis          | `phpredis`         |
| Predis            | `predis`           |
| Psr18             | `psr18`            |
| Roadrunner        | `roadrunner`       |
| SQL Server        | `sqlsrv`           |
| Symfony           | `symfony`          |
| Symfony Messenger | `symfonymessenger` |
| WordPress         | `wordpress`        |
| Yii               | `yii`              |
| ZendFramework     | `zendframework`    |

## Asignar nombres de recursos a URI normalizados

<div class="alert alert-danger">
Ten en cuenta que al configurar cualquiera de los siguientes: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code> y <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> se optará por el nuevo enfoque de normalización de recursos y cualquier valor en <code>DD_TRACE_RESOURCE_URI_MAPPING</code> será ignorado.
</div>

Para el servidor HTTP y las integraciones de clientes, la URL se utiliza para crear el nombre de recurso de la traza con el formato `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, con la cadena de consultas eliminada de la URL. Esto permite una mejor visibilidad en cualquier marco personalizado que no se instrumente automáticamente mediante la normalización de las URL y la agrupación de endpoints genéricos bajo un solo recurso.

| Solicitud HTTP                       | Nombre del recurso |
| :--------------------------------- | :------------ |
| Solicitud **GET** a `/foo?a=1&b=2`  | `GET /foo`    |
| Solicitud **POST** a `/bar?foo=bar` | `POST /bar`   |

Los ID numéricos, los UUID (con y sin guiones) y los hash hexadecimales de 32 a 512 bits se sustituyen automáticamente por un carácter `?`.

| URL (solicitud GET)                              | Nombre del recurso      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

Puedes DESACTIVAR esta función utilizando `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0`.

### Asignación personalizada de URL a recursos

Hay algunos casos que no están cubiertos por la normalización automática que se aplica.

| URL (solicitud GET)                | Nombre previsto del recurso        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

Existen dos clases de escenarios que no están cubiertos por la normalización automática:

  - El fragmento de ruta que se va a normalizar tiene un patrón reproducible y puede estar presente en cualquier parte de la URL. Por ejemplo `id<number>`, en el caso anterior. Este escenario está cubierto por la siguiente configuración `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`.
  - El fragmento de ruta puede ser cualquier cosa y el fragmento de ruta anterior indica que se debe normalizar un valor. Por ejemplo, `/cities/new-york` nos indica que `new-york` debe normalizarse, ya que es el nombre de una ciudad. Este escenario está cubierto por los parámetros `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` y `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` para las solicitudes entrantes y salientes, respectivamente.

##### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

Esta configuración es un CSV de una o más expresiones regulares que se aplican a cada fragmento de ruta de forma independiente. Por ejemplo, configurar `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` como `^id\d+$` para una ruta de `/using/prefix/id123/for/id` aplica la expresión regular a cada uno de los fragmentos: `using`, `prefix`, `id123`, `for` y `id`.

| URL                          | Expresión regular (regex)     | Nombre previsto del recurso       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

Ten en cuenta que como el formato de esta variable es un CSV, el carácter coma `,` no está escapado y no puedes utilizarlo en tus expresiones regulares.

##### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` y `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

Esta configuración es un CSV de patrones que pueden contener el comodín `*`. Por ejemplo, añadir el patrón `cities/*` significa que cada vez que se encuentre el fragmento `cities` al analizar una URL, el siguiente fragmento, si lo hay, se sustituirá por `?`. Los patrones se aplican a cualquier nivel, por lo que la aplicación de la siguiente regla normalizará `/cities/new-york` y también `/nested/cities/new-york` en la tabla anterior.

Los patrones pueden aplicarse a una parte de un fragmento específico. Por ejemplo `path/*-fix` normalizaría la URL `/some/path/changing-fix/nested` a `/some/path/?-fix/nested`

Ten en cuenta que `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` sólo se aplica a las solicitudes entrantes (por ejemplo, los web frameworks), mientras que `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` sólo se aplica a las solicitudes salientes (por ejemplo, las solicitudes `curl` y `guzzle`).

##### Restricciones `open_basedir`

Cuando se utiliza el parámetro [`open_basedir`][9], `/opt/datadog-php` debe añadirse a la lista de directorios permitidos.
Cuando la aplicación se ejecuta en un contenedor Docker, la ruta `/proc/self` también debe añadirse a la lista de directorios permitidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /es/tracing/trace_collection/proxy_setup/?tab=nginx
[4]: /es/profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
[11]: /es/tracing/trace_collection/trace_context_propagation/
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/tracing/guide/trace-php-cli-scripts/#long-running-cli-scripts
[15]: /es/tracing/guide/trace-php-cli-scripts/
[16]: /es/tracing/configure_data_security#telemetry-collection
[17]: /es/tracing/other_telemetry/connect_logs_and_traces/php
[18]: /es/tracing/trace_collection/otel_instrumentation/php/
[19]: /es/tracing/trace_collection/compatibility/php/
[20]: /es/opentelemetry/interoperability/environment_variable_support
[21]: /es/tracing/trace_collection/library_config/#traces
[22]: https://www.w3.org/TR/baggage/
