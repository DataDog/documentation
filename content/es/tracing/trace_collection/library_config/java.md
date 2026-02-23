---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente APM de Java para Datadog
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: /tracing/trace_collection/trace_context_propagation/java/
  tag: Documentación
  text: Propagación del contexto de rastreo utilizando cabeceras
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la librería de rastreo de Java
type: lenguaje de código múltiple
---

Después de configurar la librería de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la librería de rastreo como prefieras e incluir la configuración del [Etiquetado unificado de servicios][1].

Todas las opciones de configuración anteriores tienen propiedades del sistema y variables de entorno equivalentes.
Si se define el mismo tipo de clave para ambas, la configuración de propiedades del sistema tiene prioridad.
Las propiedades del sistema se pueden establecer como marcas de máquinas virtuales Java.

### Conversión entre propiedades del sistema y variables de entorno
A menos que se indique lo contrario, puedes convertir entre propiedades del sistema y variables de entorno utilizando las siguientes transformaciones:

- Para definir una propiedad del sistema como variable de entorno, escribe el nombre de la propiedad en mayúsculas y sustitúyelo por `.` o `-` por `_`.
  Por ejemplo, `dd.service` se convierte en `DD_SERVICE`.
- Para definir una variable de entorno como propiedad del sistema, escribe el nombre de la variable en minúsculas y sustituye `_` por `.`
  Por ejemplo, `DD_TAGS` se convierte en `dd.tags`.

**Nota**: Cuando utilices las propiedades del sistema del rastreador Java, enumera las propiedades antes de `-jar`. Esto asegura que las propiedades serán leídas como opciones de máquinas virtuales Java.

## Opciones de configuración

`dd.service`
: **Variable de entorno**: `DD_SERVICE`<br>
**Por defecto**: `unnamed-java-app`<br>
El nombre de un conjunto de procesos que realizan la misma tarea. Se utiliza para agrupar estadísticas para tu aplicación. Disponible para las versiones 0.50.0 o posteriores.

`dd.tags`
: **Variable de entorno**: `DD_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `layer:api,team:intake,key:value`<br>
Una lista de etiquetas (tags) predeterminadas que se añadirá a cada tramo (span), perfil y métrica JMX. Si se utiliza DD_ENV o DD_VERSION, se anula cualquier etiqueta de entorno o versión definida en DD_TAGS. Disponible para las versiones 0.50.0 o posteriores.

`dd.env`
: **Variable de entorno**: `DD_ENV`<br>
**Por defecto**: `none`<br>
El entorno de tu aplicación (por ejemplo, producción, staging). Disponible para las versiones 0.48 o posteriores.

`dd.version`
: **Variable de entorno**: `DD_VERSION`<br>
**Por defecto**: `null`<br>
La versión de tu aplicación (por ejemplo, 2.5, 202003181415, 1.3-alpha). Disponible para las versiones 0.48 o posteriores.

`dd.logs.injection`
: **Variable de entorno**: `DD_LOGS_INJECTION`<br>
**Por defecto**: `true`<br>
Inyección automática de claves MDC habilitada para los ID de rastreo y de tramos de Datadog. Para obtener más detalles, consulta [Uso avanzado][2].<br><br>
**Beta**: A partir de la versión 1.18.3, si la [configuración remota del Agent][3] está habilitada donde se ejecuta este servicio, puedes configurar `DD_LOGS_INJECTION` en la interfaz de usuario del [Catálogo de servicios][4].

`dd.trace.config`
: **Variable de entorno**: `DD_TRACE_CONFIG`<br>
**Por defecto**: `null`<br>
Ruta opcional a un archivo donde se proporcionan las propiedades de configuración, una por cada línea. Por ejemplo, la ruta del archivo puede proporcionarse a través de propiedades `-Ddd.trace.config=<FILE_PATH>`, configurando el nombre del servicio en el archivo con `dd.service=<SERVICE_NAME>`

`dd.service.mapping`
: **Variable de entorno**: `DD_SERVICE_MAPPING`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Cambia dinámicamente el nombre del servicio mediante la configuración. Esto es útil para hacer que las bases de datos tengan nombres distintos en diferentes servicios.

`dd.writer.type`
: **Variable de entorno**: `DD_WRITER_TYPE`<br>
**Por defecto**: `DDAgentWriter`<br>
El valor por defecto envía trazas al Agent. Si se configura con `LoggingWriter`, escribe trazas a la consola.

`dd.agent.host`
: **Variable de entorno**: `DD_AGENT_HOST`<br>
**Por defecto**: `localhost`<br>
Nombre de host al que enviar trazas. Si utilizas un entorno contenedorizado, configúralo como IP del host. Para obtener más detalles, consulta [Rastreo de aplicaciones Docker][5].

`dd.trace.agent.port`
: **Variable de entorno**: `DD_TRACE_AGENT_PORT`<br>
**Por defecto**: `8126`<br>
El número del puerto en el que el Agent escucha el host configurado. Si la [configuración del Agent][6] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, `dd.trace.agent.port` o `dd.trace.agent.url` deben coincidir con él.

`dd.trace.agent.unix.domain.socket`
: **Variable de entorno**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Por defecto**: `null`<br>
Puede utilizarse para dirigir el tráfico de rastreo a un proxy, a fin de enviarlo posteriormente a un Datadog Agent remoto.

`dd.trace.agent.url`
: **Variable de entorno**: `DD_TRACE_AGENT_URL`<br>
**Por defecto**: `null`<br>
La URL a la que enviar trazas. Si la [configuración del Agent][6] define `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto del valor predeterminado `8126`, `dd.trace.agent.port` o `dd.trace.agent.url` deben coincidir con él. El valor de la URL puede comenzar con `http://`, para conectarse mediante HTTP, o con `unix://`, para utilizar un socket de dominio Unix. Cuando se define, tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`. Disponible para las versiones 0.65 o posteriores.

`dd.trace.agent.timeout`
: **Variable de entorno**: `DD_TRACE_AGENT_TIMEOUT`<br>
**Por defecto**: `10`<br>
Tiempo de espera en segundos de las interacciones de red con el Datadog Agent.

`dd.trace.header.tags`
: **Variable de entorno**: `DD_TRACE_HEADER_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de cabeceras que no distinguen entre mayúsculas/minúsculas para nombres de etiquetas y aplica automáticamente valores de cabeceras coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado, que se asignan automáticamente a etiquetas con los formatos `http.request.headers.<header-name>` y `http.response.headers.<header-name>`, respectivamente.<br><br>
Antes de la versión 0.96.0, esta configuración sólo se aplicaba a etiquetas de cabeceras de solicitudes. Para volver al comportamiento anterior, añade el parámetro `-Ddd.trace.header.tags.legacy.parsing.enabled=true` o la variable de entorno `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.<br><br>
**Beta**: A partir de la versión 1.18.3, si la [configuración remota del Agent][3] está habilitada donde se ejecuta este servicio, puedes configurar `DD_TRACE_HEADER_TAGS` en la interfaz de usuario del [Catálogo de servicios][4].

`dd.trace.rate.limit`
: **Variable de entorno**: `DD_TRACE_RATE_LIMIT`<br>
**Por defecto**: `100`<br>
Número máximo de tramos para muestrear por segundo, por cada proceso, cuando se configuran`DD_TRACE_SAMPLING_RULES` o `DD_TRACE_SAMPLE_RATE`. De lo contrario, el Datadog Agent controla la limitación de la frecuencia.

`dd.trace.request_header.tags`
: **Variable de entorno**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de cabeceras que no distinguen entre mayúsculas/minúsculas para nombres de etiquetas y aplica automáticamente valores de cabeceras coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado, que se asignan automáticamente a etiquetas con el formato `http.request.headers.<header-name>`.<br>
Disponible a partir de la versión 0.96.0.

`dd.trace.response_header.tags`
: **Variable de entorno**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de cabeceras que no distinguen entre mayúsculas/minúsculas para nombres de etiquetas y aplica automáticamente valores de cabeceras coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado, que se asignan automáticamente a etiquetas con el formato `http.response.headers.<header-name>`.<br>
Disponible a partir de la versión 0.96.0.

`dd.trace.header.baggage`
: **Variable de entorno**: `DD_TRACE_HEADER_BAGGAGE`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
Acepta un mapa de claves de cabecera que no distinguen entre mayúsculas/minúsculas a claves de equipaje y aplica automáticamente los valores de cabeceras de solicitud coincidentes como equipaje en las trazas. En la propagación se aplica la asignación inversa: el equipaje se asigna a las cabeceras.<br>
Disponible a partir de la versión 1.3.0.

`dd.trace.annotations`
: **Variable de entorno**: `DD_TRACE_ANNOTATIONS`<br>
**Por defecto**: ([listado aquí][7])<br>
**Ejemplo**: `com.some.Trace;io.other.Trace`<br>
Una lista de anotaciones de métodos para tratar como `@Trace`.

`dd.trace.methods`
: **Variable de entorno**: `DD_TRACE_METHODS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>Lista de clases/interfaces y métodos para rastrear. Es similar a añadir `@Trace`, pero sin cambiar de código. **Nota:** La compatibilidad de los métodos de comodín (`[*]`) no se adapta a constructores, getters, setters, Synthetic, toString, equivalentes, código hash o llamadas a métodos finalizadores.

`dd.trace.classes.exclude`
: **Variable de entorno**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
Una lista de clases completamente cualificadas (que pueden terminar con un comodín para denotar un prefijo) que serán ignoradas (no modificadas) por el rastreador. Debes utilizar la representación interna de máquinas virtuales Java para los nombres (por ejemplo package.ClassName$Nested y no package.ClassName.Nested).

`dd.trace.partial.flush.min.spans`
: **Variable de entorno**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**Por defecto**: `1000`<br>
Define un número de tramos parciales para la descarga. Es útil para reducir sobrecarga de memoria cuando se trata de tráfico pesado o de trazas de ejecución prolongada.

`dd.trace.split-by-tags`
: **Variable de entorno**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `aws.service`<br>
Se utiliza para renombrar el nombre de servicio asociado a tramos, para que se identifique con la etiqueta del tramo correspondiente.

`dd.trace.db.client.split-by-instance`
: **Variable de entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, a los tramos de bases de datos se les asigna el nombre de la instancia como nombre de servicio.

`dd.trace.db.client.split-by-host`
: **Variable de entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, a los tramos de bases de datos se les asigna el nombre del host de la base de datos remota como nombre de servicio.

`dd.trace.elasticsearch.body.enabled`
: **Variable de entorno**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, el cuerpo se añade a tramos de Elasticsearch y OpenSearch.

`dd.trace.elasticsearch.params.enabled`
: **Variable de entorno**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**Por defecto**: `true`<br>
Cuando se configura como `true`, los parámetros de cadenas de consulta se añaden a tramos de Elasticsearch y OpenSearch.

`dd.trace.health.metrics.enabled`
: **Variable de entorno**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Por defecto: `true`<br>
Cuando se configura como `true`, envía métricas de estado del rastreador.

`dd.trace.health.metrics.statsd.host`
: **Variable de entorno**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Por defecto**: Igual que `dd.jmxfetch.statsd.host` <br>
Host de Statsd al que enviar métricas de estado.

`dd.trace.health.metrics.statsd.port`
: **Variable de entorno**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Por defecto**: Igual que `dd.jmxfetch.statsd.port` <br>
Puerto de Statsd al que enviar métricas de estado.

`dd.http.client.tag.query-string`
: **Variable de entorno**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, los parámetros y el fragmento de la cadena de consulta se añaden a tramos de clientes web.

`dd.http.client.error.statuses`
: **Variable de entorno**: `DD_HTTP_CLIENT_ERROR_STATUSES`<br>
**Por defecto**: `400-499`<br>
Se puede aceptar un rango de errores. Por defecto, los errores 4xx se informan como errores de clientes http. Esta configuración lo anula. Ej. `dd.http.client.error.statuses=400-403,405,410-499`.

`dd.http.server.error.statuses`
: **Variable de entorno**: `DD_HTTP_SERVER_ERROR_STATUSES`<br>
**Por defecto**: `500-599`<br>
Se puede aceptar un rango de errores. Por defecto, los códigos de estado 5xx se informan como errores de servidores http. Esta configuración lo anula. Ej. `dd.http.server.error.statuses=500,502-599`.

`dd.http.server.tag.query-string`
: **Variable de entorno**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Por defecto**: `true`<br>
Cuando se configura como `true`, los parámetros y el fragmento de la cadena de consulta se añaden a tramos de servidores web.

`dd.http.server.route-based-naming`
: **Variable de entorno**:  `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**Por defecto**: `true`<br>
Cuando se configura como `false`, las rutas de marcos http no se utilizan para los nombres de recursos. Si se cambia, esto puede cambiar los nombres de recursos y las métricas derivadas.

`dd.trace.enabled`
: **Variable de entorno**: `DD_TRACE_ENABLED`<br>
**Por defecto**: `true`<br>
Cuando es `false`, el Agent de rastreo está deshabilitado.

`dd.jmxfetch.enabled`
: **Variable de entorno**: `DD_JMXFETCH_ENABLED`<br>
**Por defecto**: `true`<br>
Habilita la recopilación de métricas JMX por parte del Agent de rastreo Java.

`dd.jmxfetch.config.dir`
: **Variable de entorno**: `DD_JMXFETCH_CONFIG_DIR`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `/path/to/directory/etc/conf.d`<br>
Directorio de configuración adicional para la recopilación de métricas JMX. El Agent Java busca `jvm_direct:true` en la sección `instance` del archivo `yaml` para cambiar la configuración.

`dd.jmxfetch.config`
: **Variable de entorno**: `DD_JMXFETCH_CONFIG`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
Directorio de configuración adicional para la recopilación de métricas JMX. El Agent Java busca `jvm_direct:true` en la sección `instance` del archivo `yaml` para cambiar la configuración.

`dd.jmxfetch.check-period`
: **Variable de entorno**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**Por defecto**: `1500`<br>
Frecuencia de envío de métricas JMX (en milisegundos).

`dd.jmxfetch.refresh-beans-period`
: **Variable de entorno**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**Por defecto**: `600`<br>
Frecuencia de actualización de lista de beans JMX disponibles (en segundos).


`dd.jmxfetch.statsd.host`
: **Variable de entorno**: `DD_JMXFETCH_STATSD_HOST`<br>
**Por defecto**: Igual que `agent.host`<br>
Host de Statsd al que enviar métricas JMX. Si utilizas sockets de dominio Unix, utiliza un argumento como 'unix://PATH_TO_UDS_SOCKET'. Ejemplo: `unix:///var/datadog-agent/dsd.socket`


`dd.jmxfetch.statsd.port`
: **Variable de entorno**: `DD_JMXFETCH_STATSD_PORT`<br>
**Por defecto**: `8125`<br>
Puerto de StatsD al que enviar métricas JMX. Si utilizas sockets de dominio Unix, introduce 0.

`dd.jmxfetch.<integration-name>.enabled`
: **Variable de entorno**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**Por defecto**: `false`<br>I
Integración JMX para habilitar (por ejemplo, Kafka o ActiveMQ).

`dd.trace.obfuscation.query.string.regexp`
: **Variable de entorno**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Por defecto**: `null`<br>
Una expresión regular (regex) para ocultar datos sensibles de la cadena de consulta de solicitudes entrantes informadas en la etiqueta `http.url` (las coincidencias se sustituyen por <redacted>).

`dd.integration.opentracing.enabled`
: **Variable de entorno**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Por defecto**: `true`<br>
Por defecto, el cliente de rastreo detecta si se está cargando un GlobalTracer y registra dinámicamente un rastreador en él. Si se cambia a falso, se elimina cualquier dependencia del rastreador OpenTracing.

`dd.hystrix.tags.enabled`
: **Variable de entorno**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Por defecto**: `false`<br>
Por defecto, el grupo Hystrix, el comando y las etiquetas de estado del circuito no están habilitados. Esta propiedad los habilita.

`dd.trace.servlet.async-timeout.error`
: **Variable de entorno**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Por defecto**: `true`<br>
Por defecto, las solicitudes asíncronas de ejecución prolongada se marcan como errores. Definir este valor como falso permite marcar todos los tiempos de inactividad como solicitudes exitosas.

`dd.trace.startup.logs`
: **Variable de entorno**: `DD_TRACE_STARTUP_LOGS`<br>
**Por defecto**: `true`<br>
Cuando es `false`, se deshabilita el registro informativo de inicio. Disponible para las versiones 0.64 o posteriores.


`dd.trace.servlet.principal.enabled`
: **Variable de entorno**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Por defecto**: `false`<br>
Cuando es `true`, se recopila el usuario principal. Disponible para las versiones 0.61 o posteriores.


`dd.instrumentation.telemetry.enabled`
: **Variable de entorno**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**Por defecto**: `true`<br>
Cuando es `true`, el rastreador recopila [datos de telemetría][8]. Disponible para las versiones 0.104 o posteriores. Por defecto es `true` para las versiones 0.115 o posteriores.

`dd.trace.128.bit.traceid.generation.enabled`
: **Variable de entorno**: `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**Por defecto**: `true`<br>
Cuando es `true`, el rastreador genera los ID de rastreo de 128 bits y codifica los ID de rastreo como 32 caracteres hexadecimales en minúsculas con cero relleno.

`dd.trace.128.bit.traceid.logging.enabled`
: **Variable de entorno**: `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**Por defecto**: `false`<br>
Cuando es `true`, el rastreador inyecta los ID de rastreo de 128 bits como 32 caracteres hexadecimales en minúsculas con cero relleno y los ID de rastreo de 64 bits como números decimales. De lo contrario, el rastreador siempre inyecta los ID de rastreo como números decimales.


`dd.trace.otel.enabled`
: **Variable de entorno**: `DD_TRACE_OTEL_ENABLED`<br>
**Por defecto**: `false`<br>
Cuando es `true`, el rastreo basado en OpenTelemetry para instrumentaciones [personalizadas][16] está habilitado.

**Nota**:

- Si se define el mismo tipo de clave para ambas, la configuración de la propiedad del sistema tiene prioridad.
- Las propiedades del sistema pueden utilizarse como parámetros de máquinas virtuales Java.
- Por defecto, las métricas JMX de tu aplicación se envían al Datadog Agent gracias a DogStatsD, a través del puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][9].

  - Si estás ejecutando el Agent como contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como `true`][10] y que el puerto `8125` está abierto en el contenedor Agent.
  - En Kubernetes, [vincula el puerto de DogStatsD con un puerto de host][11]. En ECS, [configura las marcas apropiadas en la definición de tu tarea][12].

### Integraciones

Consulta cómo deshabilitar integraciones en la sección de compatibilidad de las [integraciones][13].

### Ejemplos

#### `dd.service.mapping`

**Ejemplo con propiedad del sistema**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="Asignación de servicios" >}}

#### `dd.tags`

**Configuración de un entorno global para tramos y métricas JMX**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="Etiquetas globales de trazas" >}}

#### `dd.trace.span.tags`

**Ejemplo con la adición de project:test a cada tramo**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="Etiquetas de tramos de trazas" >}}

#### `dd.trace.jmx.tags`

**Configuración de custom.type:2 en una métrica JMX**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="Etiquetas JMX de trazas" >}}

#### `dd.trace.methods`

**Ejemplo con propiedad del sistema**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="Métodos de rastreo" >}}

#### `dd.trace.db.client.split-by-instance`

Ejemplo con la propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

La instancia 1 de base de datos, `webappdb`, ahora tiene su propio nombre de servicio, que es el mismo que el de los metadatos de tramos `db.instance`:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="Instancia 1" >}}

La instancia 2 de base de datos, `secondwebappdb`, ahora tiene su propio nombre de servicio, que es el mismo que el de los metadatos de tramos `db.instance`:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="Instancia 2" >}}

De forma similar, en el mapa de servicios ahora verías una aplicación web haciendo llamadas a dos bases de datos Postgres diferentes.

#### `dd.http.server.tag.query-string`

Ejemplo con la propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="Cadena de consulta" >}}

#### `dd.trace.enabled`

**Ejemplo con la propiedad del sistema y el modo de la aplicación de depuración**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

Los logs de la aplicación de depuración muestran que `el rastreo está deshabilitado y no está instalando instrumentaciones.`

#### `dd.jmxfetch.config.dir` y `dd.jmxfetch.config`

Ejemplo de configuración:

- Ya sea, la combinación de: `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- O directamente: `DD_JMXFETCH_CONFIG=<DIRECTORY_PATH>/conf.yaml`

Con el siguiente contenido para `conf.yaml`:

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

Se produciría el siguiente resultado:

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="Ejemplo de búsqueda JMX" >}}

Para obtener más información sobre la recopilación de métricas Java con la búsqueda JMX, consulta la [documentación de la integración Java][14].
### Extracción e inyección de cabeceras

Para obtener información sobre los valores válidos y el uso de las siguientes opciones de configuración, consulta [Propagación del contexto de rastreo Java][15].

`dd.trace.propagation.style.inject`
: **Variable de entorno**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**Por defecto**: `datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabeceras para incluir, para propagar trazas distribuidas entre servicios.<br>
Disponible a partir de la versión 1.9.0

`dd.trace.propagation.style.extract`
: **Variable de entorno**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**Por defecto**: `datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabeceras de los que se intentará extraer datos de propagación del rastreo distribuido. El primer formato encontrado con cabeceras completas y válidas se utiliza para definir la traza y continuar.<br>
Disponible a partir de la versión 1.9.0

`dd.trace.propagation.style`
: **Variable de entorno**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Por defecto**: `datadog,tracecontext`<br>
Una lista separada por comas de formatos de cabeceras en los que se intentará inyectar y extraer datos de propagación del rastreo distribuido. El primer formato encontrado con cabeceras completas y válidas se utiliza para definir la traza y continuar. Los parámetros de configuración más específicos `dd.trace.propagation.style.inject` y `dd.trace.propagation.style.extract` tienen prioridad cuando están presentes.<br>
Disponible a partir de la versión 1.9.0

`trace.propagation.extract.first`
: **Variable de entorno**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, deja de extraer contextos de rastreo cuando encuentra uno válido.

#### Parámetros de extracción e inyección obsoletos

Estos parámetros de extracción e inyección han quedado obsoletas en favor de los parámetros `dd.trace.propagation.style.inject`, `dd.trace.propagation.style.extract` y `dd.trace.propagation.style`, a partir de la versión 1.9.0. Consulta [Propagación del contexto de rastreo Java][15]. La configuración anterior `b3`, tanto para la cabecera múltiple B3 como para la cabecera única B3, ha sido sustituida por los nuevos parámetros `b3multi` y `b3single`.

`dd.propagation.style.inject`
: **Variable de entorno**: `DD_PROPAGATION_STYLE_INJECT`<br>
**Por defecto**: `datadog`<br>
Una lista separada por comas de formatos de cabeceras para incluir, para propagar trazas distribuidas entre servicios.<br>
Obsoleto a partir de la versión 1.9.0

`dd.propagation.style.extract`
: **Variable de entorno**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**Por defecto**: `datadog`<br>
Una lista separada por comas de formatos de cabecera de los que se intentará extraer datos de propagación del rastreo distribuido. El primer formato encontrado con cabeceras completas y válidas se utiliza para definir la traza y continuar.<br>
Disponible a partir de la versión 1.9.0

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/agent/logs/advanced_log_collection
[3]: /es/agent/remote_config/
[4]: https://app.datadoghq.com/services
[5]: /es/tracing/setup/docker/
[6]: /es/agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /es/tracing/configure_data_security/#telemetry-collection
[9]: /es/developers/dogstatsd/#setup
[10]: /es/agent/docker/#dogstatsd-custom-metrics
[11]: /es/developers/dogstatsd/
[12]: /es/agent/amazon_ecs/#create-an-ecs-task
[13]: /es/tracing/compatibility_requirements/java#disabling-integrations
[14]: /es/integrations/java/?tab=host#metric-collection
[15]: /es/tracing/trace_collection/trace_context_propagation/java/
[16]: /es/tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /es/opentelemetry/interoperability/environment_variable_support
