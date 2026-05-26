---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente APM de Java para Datadog
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y traces (trazas)
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de rastreo utilizando cabeceras
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la biblioteca de rastreo de Java
type: multi-code-lang
---

Después de configurar la biblioteca de rastreo con tu código y de configurar el Agent para recopilar datos de APM, también puedes configurar la biblioteca de rastreo como prefieras e incluir la configuración del [Etiquetado unificado de servicios][1].

{{% apm-config-visibility %}}

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

### Etiquetado de servicios unificados

`dd.service`
: **Variable de entorno**: `DD_SERVICE`<br>
**Por defecto**: `unnamed-java-app`<br>
El nombre de un conjunto de procesos que realizan la misma tarea. Se utiliza para agrupar estadísticas para tu aplicación. Disponible para las versiones 0.50.0 o posteriores.

`dd.env`
: **Variable de entorno**: `DD_ENV`<br>
**Por defecto**: `none`<br>
El entorno de tu aplicación (por ejemplo, producción, staging). Disponible para las versiones 0.48 o posteriores.

`dd.version`
: **Variable de entorno**: `DD_VERSION`<br>
**Por defecto**: `null`<br>
La versión de tu aplicación (por ejemplo, 2.5, 202003181415, 1.3-alpha). Disponible para las versiones 0.48 o posteriores.

### Traces (trazas)

`dd.trace.enabled`
: **Variable de entorno**: `DD_TRACE_ENABLED`<br>
**Predeterminada**: `true`<br>
Cuando es `false` el agente de rastreo está desactivado.<br/>
Consulta también [DD_APM_TRACING_ENABLED][21].

`dd.trace.config`
: **Variable de entorno**: `DD_TRACE_CONFIG`<br>
**Predeterminada**: `null`<br>
Ruta opcional a un archivo donde se proporcionan las propiedades de configuración, una por cada línea. Por ejemplo, la ruta al archivo se puede proporcionar a través de   `-Ddd.trace.config=<FILE_PATH>.properties`, configurando el nombre del servicio en el archivo con `dd.service=<SERVICE_NAME>`<br>
**Nota**: No confíes en `dd.trace.config` como el único mecanismo para para activar o desactivar productos dependientes del kit de desarrollo de software (SDK) (por ejemplo, Profiler y Dynamic Instrumentation). En su lugar, utiliza las propiedades del sistema o las variables de entorno correspondientes (o `application_monitoring.yaml` para la instrumentación de un solo step (UI) / paso (generic)). 

`dd.service.mapping`
: **Variable de entorno**: `DD_SERVICE_MAPPING`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Cambia dinámicamente el nombre del servicio mediante la configuración. Esto es útil para hacer que las bases de datos tengan nombres distintos en diferentes servicios.

`dd.writer.type`
: **Variable de entorno**: `DD_WRITER_TYPE`<br>
**Por defecto**: `DDAgentWriter`<br>
El valor por defecto envía trazas al Agent. Si se configura con `LoggingWriter`, escribe trazas a la consola.

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

`dd.trace.client-ip.enabled`
: **Predeterminada**: `false` <br>
Activa la recopilación de IP del cliente a partir de encabezados de IP pertinentes en spans (tramos) de solicitudes HTTP. Activado automáticamente cuando `dd.appsec.enabled=true`.

`dd.trace.header.tags`
: **Variable de entorno**: `DD_TRACE_HEADER_TAGS`<br>
**Predeterminada**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de encabezado que no distinguen entre mayúsculas/minúsculas para nombres de tags (etiquetas) y aplica automáticamente los valores de encabezado coincidentes como tags (etiquetas) en las traces (trazas). También acepta entradas sin un nombre de tag (etiqueta) especificado que se asignan automáticamente a tags (etiquetas) de la forma `http.request.headers.<header-name>` y `http.response.headers.<header-name>`, respectivamente.<br><br>
Antes de la versión 0.96.0 esta configuración solo se aplicaba a las tags (etiquetas) de encabezados de solicitudes. Para volver al comportamiento anterior, añade la configuración `-Ddd.trace.header.tags.legacy.parsing.enabled=true` o la variable de entorno `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.<br><br>
A partir de la versión 1.18.3, si la [Configuración remota del Agent][3] está activada donde se ejecuta el servicio, puedes configurar `DD_TRACE_HEADER_TAGS` en la interfaz de usuario de [Software Catalog][4] UI.

`dd.trace.request_header.tags`
: **Variable de entorno**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Predeterminada**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de encabezados que no distinguen entre mayúsculas/minúsculas para nombres de tags (etiquetas) y aplica automáticamente valores de encabezados coincidentes como tags (etiquetas) en las traces (trazas). También acepta entradas sin un nombre de tag (etiqueta) especificado, que se asignan automáticamente a tags (etiquetas) con el formato `http.request.headers.<header-name>`.<br>
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
**Predeterminada**: `null`<br>
**Ejemplo**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
Lista de clase/interfaz y métodos para rastrear. Similar a añadir `@Trace`, pero sin cambiar el código. **Nota:** La compatibilidad de métodos comodín (`[*]`) no acomoda constructores, getters, setters, sintéticos, toString, equals, hashcode ni llamadas a métodos finalizadores.
`dd.trace.methods` no está diseñado para rastrear un gran número de métodos y clases. Para buscar cuellos de botella de CPU, memoria e IO, desglosados por nombre del método, nombre de la clase y número de línea, considera en su lugar el producto [Continuous Profiler][22].

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

`dd.trace.obfuscation.query.string.regexp`
: **Variable de entorno**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Por defecto**: `null`<br>
Una expresión regular (regex) para ocultar datos sensibles de la cadena de consulta de solicitudes entrantes informadas en la etiqueta `http.url` (las coincidencias se sustituyen por <redacted>).

`dd.trace.servlet.async-timeout.error`
: **Variable de entorno**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Por defecto**: `true`<br>
Por defecto, las solicitudes asíncronas de ejecución prolongada se marcan como errores. Definir este valor como falso permite marcar todos los tiempos de inactividad como solicitudes exitosas.

`dd.trace.span.tags`
: **Variable de entorno**: `DD_TRACE_SPAN_TAGS`<br>
**Predeterminada**: `none`<br>
**Ejemplo**: `tag1:value1,tag2:value2`<br>
Una lista de las tags (etiquetas) predeterminadas que se añadirán a cada span (tramo).

`dd.trace.jmx.tags`
: **Variable de entorno**: `DD_TRACE_JMX_TAGS`<br>
**Predeterminada**: `none`<br>
**Ejemplo**: `tag1:value1,tag2:value2`<br>
Una lista de las tags (etiquetas) de span (tramo) que se añadirán a cada métrica jmx.

`dd.trace.startup.logs`
: **Variable de entorno**: `DD_TRACE_STARTUP_LOGS`<br>
**Por defecto**: `true`<br>
Cuando es `false`, se deshabilita el registro informativo de inicio. Disponible para las versiones 0.64 o posteriores.


`dd.trace.debug`
: **Variable de entorno**: `DD_TRACE_DEBUG`<br>
**Predeterminada**: `false`<br>
Cuando `true`, el modo de depuración para el Java de Datadog está activado.

`datadog.slf4j.simpleLogger.jsonEnabled`
: **Variable de entorno**: No disponible<br>
**Predeterminada**: `false`<br>
Cuando `true`, los logs del rastreador de Java de Datadog se escriben en JSON. Disponible para las versiones 1.48.0+.<br>
**Nota**: Esta configuración es específica del registrador simple SLF4J insertado y no admite variables de entorno. `dd.log.format.json` es la opción de configuración preferida.

`dd.trace.servlet.principal.enabled`
: **Variable de entorno**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Por defecto**: `false`<br>
Cuando es `true`, se recopila el usuario principal. Disponible para las versiones 0.61 o posteriores.


`dd.trace.rate.limit`
: **Variable de entorno**: `DD_TRACE_RATE_LIMIT`<br>
**Por defecto**: `100`<br>
Número máximo de tramos para muestrear por segundo, por cada proceso, cuando se configuran`DD_TRACE_SAMPLING_RULES` o `DD_TRACE_SAMPLE_RATE`. De lo contrario, el Datadog Agent controla la limitación de la frecuencia.

`dd.http.server.tag.query-string`
: **Variable de entorno**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Por defecto**: `true`<br>
Cuando se configura como `true`, los parámetros y el fragmento de la cadena de consulta se añaden a tramos de servidores web.

`dd.http.server.route-based-naming`
: **Variable de entorno**:  `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**Por defecto**: `true`<br>
Cuando se configura como `false`, las rutas de frameworks http no se utilizan para los nombres de recursos. Si se cambia, esto puede cambiar los nombres de recursos y las métricas derivadas.

`dd.trace.http.server.path-resource-name-mapping`<br>
: **Variable de entorno**: `DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`<br>
**Predeterminado**: `{}` (vacío) <br>
Asigna rutas de solicitudes HTTP a nombres de recursos personalizados. Proporciona una lista separada por comas de pares `pattern:resource_name`:<br>
&nbsp;&nbsp;&nbsp;&ndash; `pattern`: Un [patrón de ruta de Ant‐style][20] que debe coincidir con el valor de la tag (etiqueta) de span (tramo) `http.path_group`.<br>
&nbsp;&nbsp;&nbsp;&ndash; `resource_name`: El nombre del recurso personalizado que se asignará si el patrón coincide.<br>
Si se utiliza `*` como el `resource_name` para un patrón coincidente, la ruta original, no normalizada, combinada con el método HTTP, se utilizará como el nombre del recurso. Por ejemplo, dada la regla `/test/**:*`, una solicitud `GET` para `/test/some/path` da lugar al nombre del recurso `GET /test/some/path`.<br>
Las asignaciones se evalúan por orden de prioridad y se aplica la primera regla coincidente. Las rutas de solicitudes no coincidentes utilizan el comportamiento de normalización predeterminado.<br>
**Ejemplo**: La utilización de `-Ddd.trace.http.server.path-resource-name-mapping=/admin/*.jsp:/admin-page,/admin/user/**:/admin/user` da:<br>
Ruta de la solicitud | Ruta del recurso
------------ | -------------
`/admin/index.jsp` | `/admin-page`
`/admin/user/12345/delete` | `/admin/user`
`/user/12345` | `/user/?`

`dd.trace.http.client.path-resource-name-mapping`<br>
: **Variable de entorno**: `DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`<br>
**Predeterminado**: `{}` (vacío) <br>
Asigna rutas de solicitudes del cliente HTTP a nombres de recursos personalizados. Utiliza el mismo formato que `dd.trace.http.server.path-resource-name-mapping`, pero se aplica a spans (tramos) de cliente HTTP de spans (tramos) del servidor.

`dd.trace.status404rule.enabled`
: **Variable de entorno**: `DD_TRACE_STATUS404RULE_ENABLED`<br>
**Predeterminado**: `true`<br>
En forma predeterminada, las respuestas HTTP 404 utilizan "404" como el nombre del recurso del span (tramo). Cuando es `false`,  las respuestas HTTP 404 mantienen la ruta URL original como el nombre del recurso.

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

`dd.trace.cloud.payload.tagging.services`
: **Variable de entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`<br>
**Predeterminado**: `ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`<br>
**Ejemplo**: `S3,Sso`<br>
Para activar el [etiquetado de la carga útil de AWS][18] para servicios adicionales, utiliza esta configuración.

`dd.trace.cloud.request.payload.tagging`
: **Variable de entorno**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`<br>
**Predeterminado**: N/A (desactivado)<br>
**Ejemplo**: `$.Metadata.UserId,$.phoneNumber`<br>
Una cadena separada por comas de entradas de JSONPath que se eliminarán de las solicitudes del kit de desarrollo de software (SDK) de AWS. Al configurarla, se activa el [etiquetado de la carga útil de AWS][18] para las solicitudes.

`dd.trace.cloud.response.payload.tagging`
: **Variable de entorno**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`<br>
**Predeterminada**: N/A (desactivada)<br>
**Ejemplo**: `$.Metadata.Credentials.*`<br>
Una cadena separada por comas de las entradas JSONPath que se eliminarán de las respuestas del kit de desarrollo de software (SDK) de AWS. Esta configuración activa el [etiquetado de la carga útil de AWS][18] para las respuestas.

`dd.trace.cloud.payload.tagging.max-depth`
: **Variable de entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`<br>
**Predeterminada**: `10`<br>
Un número entero que representa la profundidad máxima de una carga útil de la solicitud/respuesta del kit de desarrollo de software (SDK) de AWS que se utilizará para el [etiquetado de la carga útil de AWS][18].

`dd.trace.cloud.payload.tagging.max-tags`
: **Variable de entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`<br>
**Predeterminado**: `758`<br>
Un número entero que representa el número máximo de tags (etiquetas) que se extraerán por cada span (tramo) que se utilizará para el [etiquetado de la carga útil de AWS][18].

### Agent

`dd.tags`
: **Variable de entorno**: `DD_TAGS`<br>
**Por defecto**: `null`<br>
**Ejemplo**: `layer:api,team:intake,key:value`<br>
Una lista de etiquetas (tags) predeterminadas que se añadirá a cada tramo (span), perfil y métrica JMX. Si se utiliza DD_ENV o DD_VERSION, se anula cualquier etiqueta de entorno o versión definida en DD_TAGS. Disponible para las versiones 0.50.0 o posteriores.

`dd.agent.host`
: **Variable de entorno**: `DD_AGENT_HOST`<br>
**Por defecto**: `localhost`<br>
Nombre de host al que enviar trazas. Si utilizas un entorno contenedorizado, configúralo como IP del host. Para obtener más detalles, consulta [Rastreo de aplicaciones Docker][5].

`dd.instrumentation.telemetry.enabled`
: **Variable de entorno**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**Por defecto**: `true`<br>
Cuando es `true`, el rastreador recopila [datos de telemetría][8]. Disponible para las versiones 0.104 o posteriores. Por defecto es `true` para las versiones 0.115 o posteriores.

### Bases de datos

`dd.trace.db.client.split-by-instance`
: **Variable de entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, a los tramos de bases de datos se les asigna el nombre de la instancia como nombre de servicio.

`dd.trace.db.client.split-by-host`
: **Variable de entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, a los tramos de bases de datos se les asigna el nombre del host de la base de datos remota como nombre de servicio.

`dd.dbm.propagation.mode`
: **Variable de entorno**: `DD_DBM_PROPAGATION_MODE` <br>
**Predeterminada**: `null`<br>
Cuando se establece en `service` o `full`, activa la correlación de Database Monitoring y APM. Para obtener más información, consulta [Correlacionar Database Monitoring y traces (trazas][23].

### AAP

`dd.appsec.enabled`
: **Variable de entorno**: `DD_APPSEC_ENABLED`<br>
**Predeterminada**: `false`<br>
Cuando es `true`, activa App and API Protection Monitoring de Datadog. Además, esto activa automáticamente la recopilación de IP del cliente (`dd.trace.client-ip.enabled`).<br>
Para obtener más información, consulta [Activar AAP para Java][19].

### Errores

`dd.trace.http.client.tag.query-string`
: **Propiedad del sistema (obsoleta)**: `dd.http.client.tag.query-string`<br>
**Variable de entorno**: `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Variable de entorno (obsoleta)**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Predeterminada**: `true`<br>
En forma predeterminada, los parámetros y fragmentos de cadenas de consulta se añaden a la tag (etiqueta) `http.url` en los spans (tramos) de clientes web. Configúralo en `false` para impedir la recopilación de estos datos.

`dd.trace.http.client.error.statuses`
: **Variable de entorno**: `DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`<br>
**Predeterminada**: `400-499`<br>
Se puede aceptar un rango de errores. En forma predeterminada, 4xx errores se informan como errores para clientes HTTP. Esta configuración lo sustituye. Por ejemplo, `dd.trace.http.client.error.statuses=400-403,405,410-499`

`dd.trace.http.server.error.statuses`
: **Variable de entorno**: `DD_TRACE_HTTP_SERVER_ERROR_STATUSES`<br>
**Predeterminado**: `500-599`<br>
Se puede aceptar un rango de errores. En forma predeterminada 5xx códigos de estado se informan como errores para servidores HTTP. Esta configuración lo sustituye. Por ejemplo, `dd.trace.http.server.error.statuses=500,502-599`

`dd.grpc.client.error.statuses`
: **Variable de entorno**: `DD_GRPC_CLIENT_ERROR_STATUSES`<br>
**Predeterminado**: `1-16`<br>
Se puede aceptar un rango de errores. En forma predeterminada, los códigos de estado gRPC 1 a 16 se informan como errores para los clientes gRPC. Esta configuración lo sustituye. Por ejemplo, `dd.grpc.client.error.statuses=1-4,7-10`

`dd.grpc.server.error.statuses`
: **Variable de entorno**: `DD_GRPC_SERVER_ERROR_STATUSES`<br>
**Predeterminado**: `2-16`<br>
Se puede aceptar un rango de errores. En forma predeterminada, los códigos de estado gRPC 2 a 16 se informan como errores para los servidores gRPC. Esta configuración lo sustituye. Por ejemplo, `dd.grpc.server.error.statuses=2-4,7-10`

### Logs

`dd.log.level`
: **Variable de entorno**: `DD_LOG_LEVEL`<br>
**Predeterminado**: `INFO`<br>
Establece el nivel interno de log para Datadog Java Tracer. Valores válidos: `DEBUG`, `INFO`, `WARN`, `ERROR`.<br>
Disponible a partir de la versión 1.36.0

`dd.log.format.json`
: **Variable de entorno**: `DD_LOG_FORMAT_JSON`<br>
**Predeterminado**: `false`<br>
Cuando es `true`, genera logs de Datadog Java Tracer en un formato JSON compatible con la interfaz de usuario de logs de Datadog.<br>
Disponible a partir de la versión 1.58.0

`dd.logs.injection`
: **Variable de entorno**: `DD_LOGS_INJECTION`<br>
**Predeterminado**: `true`<br>
Activada la inserción automática de claves MDC para ID de traces (trazas) y spans (tramos) de Datadog. Consulta [Utilización avanzada][2] para obtener más información.<br><br>
A partir de la versión 1.18.3, si la [Configuración remota del Agent][3] está activada donde se ejecuta este servicio, puedes configurar `DD_LOGS_INJECTION` en la interfaz de usuario de [Software Catalog][4].

### Propagación del contexto de rastreo

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

### Métricas de JMX

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
**Predeterminado**: `15000`<br>
Frecuencia de envío de métricas de JMX (en ms).

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

### integraciones

Consulta cómo deshabilitar integraciones en la sección de compatibilidad de las [integraciones][13].

`dd.integration.opentracing.enabled`
: **Variable de entorno**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Por defecto**: `true`<br>
Por defecto, el cliente de rastreo detecta si se está cargando un GlobalTracer y registra dinámicamente un rastreador en él. Si se cambia a falso, se elimina cualquier dependencia del rastreador OpenTracing.

`dd.hystrix.tags.enabled`
: **Variable de entorno**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Por defecto**: `false`<br>
Por defecto, el grupo Hystrix, el comando y las etiquetas de estado del circuito no están habilitados. Esta propiedad los habilita.

`dd.trace.elasticsearch.body.enabled`
: **Variable de entorno**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**Por defecto**: `false`<br>
Cuando se configura como `true`, el cuerpo se añade a tramos de Elasticsearch y OpenSearch.

`dd.trace.elasticsearch.params.enabled`
: **Variable de entorno**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**Por defecto**: `true`<br>
Cuando se configura como `true`, los parámetros de cadenas de consulta se añaden a tramos de Elasticsearch y OpenSearch.

`dd.trace.cassandra.keyspace.statement.extraction.enabled`
: **Variable de entorno**: `DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED` <br>
**Predeterminado**: `false`<br>
En forma predeterminada, el espacio de claves se extrae solo si se configura durante la creación de la sesión. Cuando se configura en `true`, el espacio de claves también se puede extraer examinando los metadatos en los resultados de la consulta.

`dd.trace.websocket.messages.enabled`
: **Variable de entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_ENABLED` <br>
**Predeterminado**: `false`<br>
Activa el rastreo de mensajes de websocket enviados y recibidos (de texto y binarios) y eventos de cierre de connection (conexión).

`dd.trace.websocket.messages.inherit.sampling`
: **Variable de entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING` <br>
**Predeterminado**: `true`<br>
En forma predeterminada, los mensajes de websocket conservan el mismo muestreo que el span (tramo) capturado durante el protocolo de enlace. Esto asegura que, si se ha muestreado un span (tramo) de protocolo de enlace, también se muestrearán todos los mensajes de la sesión. Para desactivar ese comportamiento y muestrear cada mensaje de websocket de forma independiente, establece esta configuración en `false`.

`dd.trace.websocket.messages.separate.traces`
: **Variable de entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES` <br>
**Predeterminado**: `true`<br>
En forma predeterminada, cada mensaje recibido genera una nueva trace (traza). El protocolo de enlace se vincula a ella como un enlace de span (tramo). La configuración de este parámetro en `false` hace que todos los spans (tramos) capturados durante la sesión estén en la misma trace (traza).

`dd.trace.websocket.tag.session.id`
: **Variable de entorno**: `DD_TRACE_WEBSOCKET_TAG_SESSION_ID` <br>
**Predeterminado**: `false`<br>
Cuando se configura en `true`, los spans (tramos) de websocket tienen la tag (etiqueta) `websocket.session.id` que contiene el ID de sesión cuando está disponible.


**Nota**:

- Si se define el mismo tipo de clave para ambas, la configuración de la propiedad del sistema tiene prioridad.
- Las propiedades del sistema pueden utilizarse como parámetros de máquinas virtuales Java.
- Por defecto, las métricas JMX de tu aplicación se envían al Datadog Agent gracias a DogStatsD, a través del puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][9].

  - Si estás ejecutando el Agent como contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como `true`][10] y que el puerto `8125` está abierto en el contenedor Agent.
  - En Kubernetes, [vincula el puerto de DogStatsD con un puerto de host][11]. En ECS, [configura las marcas apropiadas en la definición de tu tarea][12].

### UDS

`dd.jdk.socket.enabled`
: **Variable de entorno**: `DD_JDK_SOCKET_ENABLED` <br>
**Predeterminado**: `true`<br>
Activa la compatibilidad nativa de JDK para sockets de dominio de Unix.

### Ejemplos

#### `dd.service.mapping`

Ejemplo con la propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="Asignación de servicios" >}}

#### `dd.tags`
Configuración de una variable de entorno global para spans (tramos) y métricas de JMX:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="Tags (etiquetas) globales de traces (trazas)" >}}

#### `dd.trace.span.tags`

Ejemplo con la adición de project:test a cada span (tramo):

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="Etiquetas de tramos de trazas" >}}

#### `dd.trace.jmx.tags`

Configuración de custom.type:2 en una métrica de JMX:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="Etiquetas JMX de trazas" >}}

#### `dd.trace.methods`

Ejemplo con la propiedad del sistema:

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

Ejemplo con propiedad del sistema y modo de depuración de aplicación:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
```

Los logs de la aplicación de la aplicación muestran que `Tracing is disabled, not installing instrumentations.`

#### `dd.jmxfetch.config.dir` y `dd.jmxfetch.config`

Ejemplo de configuración:

- Ya sea la combinación de: `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/agent/logs/advanced_log_collection
[3]: /es/tracing/guide/remote_config
[4]: https://app.datadoghq.com/services
[5]: /es/tracing/setup/docker/
[6]: /es/agent/configuration/network/#configure-ports
[7]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[8]: /es/tracing/configure_data_security/#telemetry-collection
[9]: /es/extend/dogstatsd/#setup
[10]: /es/agent/docker/#dogstatsd-custom-metrics
[11]: /es/extend/dogstatsd/
[12]: /es/agent/amazon_ecs/#create-an-ecs-task
[13]: /es/tracing/compatibility_requirements/java#disabling-integrations
[14]: /es/integrations/java/?tab=host#metric-collection
[15]: /es/tracing/trace_collection/trace_context_propagation/
[16]: /es/tracing/trace_collection/custom_instrumentation/java/otel/
[17]: /es/opentelemetry/interoperability/environment_variable_support
[18]: /es/tracing/guide/aws_payload_tagging/?code-lang=java
[19]: /es/security/application_security/setup/threat_detection/java/
[20]: https://ant.apache.org/manual/dirtasks.html#patterns
[21]: /es/tracing/trace_collection/library_config/#traces
[22]: /es/profiler/
[23]: /es/database_monitoring/connect_dbm_and_apm/?tab=java