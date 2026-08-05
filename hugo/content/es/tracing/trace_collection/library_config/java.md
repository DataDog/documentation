---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Código fuente de APM de Datadog para Java
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagando el contexto de traza con encabezados
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: Centro de aprendizaje
  text: Configura APM para aplicaciones Java
title: Configurando el SDK de Java
type: multi-code-lang
---
Después de configurar el SDK con su código y configurar el Agente para recopilar datos de APM, opcionalmente configure el SDK como desee, incluyendo la configuración de [Unified Service Tagging][1].

{{% apm-config-visibility %}}

Todas las opciones de configuración a continuación tienen equivalentes en propiedades del sistema y variables de entorno.
Si se establece el mismo tipo de clave para ambos, la configuración de la propiedad del sistema tiene prioridad.
Las propiedades del sistema se pueden establecer como JVM flags.

### Convirtiendo entre propiedades del sistema y variables de entorno {#converting-between-system-properties-and-environment-variables}
A menos que se indique lo contrario, puede convertir entre propiedades del sistema y variables de entorno con las siguientes transformaciones:

- Para establecer una propiedad del sistema como una variable de entorno, convierta el nombre de la propiedad a mayúsculas y reemplace `.` o `-` con `_`.
  Por ejemplo, `dd.service` se convierte en `DD_SERVICE`.
- Para establecer una variable de entorno como una propiedad del sistema, convierta el nombre de la variable a minúsculas y reemplace `_` con `.`.
  Por ejemplo, `DD_TAGS` se convierte en `dd.tags`.

**Nota**: Al usar las propiedades del sistema del rastreador de Java, enumere las propiedades antes de `-jar`. Esto asegura que las propiedades se lean como opciones de la JVM.

## Opciones de configuración {#configuration-options}

### Unified service tagging {#unified-service-tagging}

`dd.service`
: **Variable de entorno**: `DD_SERVICE`<br>
**Predeterminado**: `unnamed-java-app`<br>
El nombre de un conjunto de procesos que realizan el mismo trabajo. Utilizado para agrupar estadísticas de su aplicación. Disponible para versiones 0.50.0+.

`dd.env`
: **Variable de entorno**: `DD_ENV`<br>
**Predeterminado**: `none`<br>
El entorno de su aplicación (por ejemplo, production, staging). Disponible para versiones 0.48+.

`dd.version`
: **Variable de entorno**: `DD_VERSION`<br>
**Predeterminado**: `null`<br>
La versión de su aplicación (por ejemplo, 2.5, 202003181415, 1.3-alpha). Disponible para versiones 0.48+.

### Trazas {#traces}

`dd.trace.enabled`
: **Variable de entorno**: `DD_TRACE_ENABLED`<br>
**Predeterminado**: `true`<br>
Cuando `false` el agente de trazado está deshabilitado.<br/>
Ver también [DD_APM_TRACING_ENABLED][21].

`dd.trace.config`
: **Variable de entorno**: `DD_TRACE_CONFIG`<br>
**Predeterminado**: `null`<br>
Ruta opcional a un archivo donde se proporcionan las propiedades de configuración, una por cada línea. Por ejemplo, la ruta del archivo se puede proporcionar a través de `-Ddd.trace.config=<FILE_PATH>.properties`, configurando el nombre del servicio en el archivo con `dd.service=<SERVICE_NAME>`<br>.
**Nota**: No confíe en `dd.trace.config` como el único mecanismo para habilitar o deshabilitar productos dependientes del SDK (por ejemplo, Profiler y Dynamic Instrumentation). En su lugar, utilice las propiedades del sistema correspondientes o las variables de entorno (o `application_monitoring.yaml` para Instrumentación de Paso Único). 

`dd.service.mapping`
: **Variable de entorno**: `DD_SERVICE_MAPPING`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Renombrar servicios dinámicamente a través de la configuración. Útil para que las bases de datos tengan nombres distintos entre diferentes servicios.

`dd.writer.type`
: **Variable de Entorno**: `DD_WRITER_TYPE`<br>
**Predeterminado**: `DDAgentWriter`<br>
El valor predeterminado envía trazas al Agente. Configurar con `LoggingWriter` en su lugar escribe trazas en la consola.

`dd.trace.agent.port`
: **Variable de Entorno**: `DD_TRACE_AGENT_PORT`<br>
**Predeterminado**: `8126`<br>
El número de puerto en el que el Agente está escuchando para el host configurado. Si la [configuración del Agente][6] establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo diferente al predeterminado `8126`, entonces `dd.trace.agent.port` o `dd.trace.agent.url` deben coincidir.

`dd.trace.agent.unix.domain.socket`
: **Variable de Entorno**: `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`<br>
**Predeterminado**: `null`<br>
Esto se puede usar para dirigir el tráfico de trazas a un proxy, que luego se enviará a un Datadog Agent remoto.

`dd.trace.agent.url`
: **Variable de Entorno**: `DD_TRACE_AGENT_URL`<br>
**Predeterminado**: `null`<br>
La URL a la que enviar trazas. Si la [configuración del Agente][6] establece `receiver_port` o `DD_APM_RECEIVER_PORT` en algo diferente al predeterminado `8126`, entonces `dd.trace.agent.port` o `dd.trace.agent.url` deben coincidir. El valor de la URL puede comenzar con `http://` para conectarse usando HTTP o con `unix://` para usar un Socket de Dominio Unix. Cuando se establece, esto tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`. Disponible para versiones 0.65+.

`dd.trace.agent.timeout`
: **Variable de Entorno**: `DD_TRACE_AGENT_TIMEOUT`<br>
**Predeterminado**: `10`<br>
Tiempo de espera en segundos para interacciones de red con el Datadog Agent.

`dd.trace.client-ip.enabled`
: **Predeterminado**: `false` <br>
Habilitar la recopilación de IP del cliente a partir de los encabezados IP relevantes en los tramos de solicitud HTTP. Se habilita automáticamente cuando `dd.appsec.enabled=true`.

`dd.trace.header.tags`
: **Variable de Entorno**: `DD_TRACE_HEADER_TAGS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de encabezado que no distinguen entre mayúsculas y minúsculas a nombres de etiquetas y aplica automáticamente los valores de encabezado coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado que se mapean automáticamente a etiquetas de la forma `http.request.headers.<header-name>` y `http.response.headers.<header-name>` respectivamente.<br><br>
Antes de la versión 0.96.0, esta configuración solo se aplicaba a las etiquetas de encabezado de solicitud. Para volver al comportamiento anterior, agregue la configuración `-Ddd.trace.header.tags.legacy.parsing.enabled=true` o la variable de entorno `DD_TRACE_HEADER_TAGS_LEGACY_PARSING_ENABLED=true`.<br><br>
A partir de la versión 1.18.3, si [Remote Configuration][3] está habilitada donde se ejecuta este servicio, puede establecer `DD_TRACE_HEADER_TAGS` en la interfaz de usuario del [Catálogo][4].

`dd.trace.request_header.tags`
: **Variable de Entorno**: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de encabezado que no distinguen entre mayúsculas y minúsculas a nombres de etiquetas y aplica automáticamente los valores de encabezado de solicitud coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado que se asignan automáticamente a etiquetas de la forma `http.request.headers.<header-name>`.<br>.
Disponible desde la versión 0.96.0.

`dd.trace.response_header.tags`
: **Variable de entorno**: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`<br>
Acepta un mapa de claves de encabezado que no distinguen entre mayúsculas y minúsculas a nombres de etiquetas y aplica automáticamente los valores de encabezado de respuesta coincidentes como etiquetas en las trazas. También acepta entradas sin un nombre de etiqueta especificado que se asignan automáticamente a etiquetas de la forma `http.response.headers.<header-name>`.<br>.
Disponible desde la versión 0.96.0.

`dd.trace.header.baggage`
: **Variable de Entorno**: `DD_TRACE_HEADER_BAGGAGE`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `CASE-insensitive-Header:my-baggage-name,User-ID:userId,My-Header-And-Baggage-Name`<br>
Acepta un mapa de claves de encabezado que no distinguen entre mayúsculas y minúsculas a claves de equipaje y aplica automáticamente los valores de encabezado de solicitud coincidentes como equipaje en las trazas. En la propagación, se aplica el mapeo inverso: El baggage se asigna a los encabezados.<br>
Disponible desde la versión 1.3.0.

`dd.trace.annotations`
: **Variable de entorno**: `DD_TRACE_ANNOTATIONS`<br>
**Predeterminado**: ([listado aquí][7])<br>
**Ejemplo**: `com.some.Trace;io.other.Trace`<br>
Una lista de anotaciones de método a tratar como `@Trace`.

`dd.trace.methods`
: **Variable de Entorno**: `DD_TRACE_METHODS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]`<br>
Lista de clases, interfaces y métodos a trazar. Similar a agregar `@Trace`, pero sin cambiar el código. **Nota:** El soporte de método comodín (`[*]`) no acomoda llamadas a constructores, getters, setters, métodos sintéticos, toString, equals, hashcode, o finalizadores.
`dd.trace.methods` no está destinado a rastrear grandes cantidades de métodos y clases. Para encontrar cuellos de botella en CPU, memoria y IO, desglosados por nombre de método, nombre de clase y número de línea, considere el producto [Continuous Profiler] en su lugar.

`dd.trace.classes.exclude`
: **Variable de Entorno**: `DD_TRACE_CLASSES_EXCLUDE`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `package.ClassName,package.ClassName$Nested,package.Foo*,package.other.*`<br>
Una lista de clases completamente calificadas (que pueden terminar con un comodín para denotar un prefijo) que serán ignoradas (no modificadas) por el SDK. Debe usar la representación interna de jvm para nombres (por ejemplo, package.ClassName$Nested y no package.ClassName.Nested)

`dd.trace.partial.flush.min.spans`
: **Variable de Entorno**: `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`<br>
**Predeterminado**: `1000`<br>
Establezca un número de tramos parciales para activar su envío. Útil para reducir la sobrecarga de memoria al tratar con tráfico intenso o trazas de larga duración.

`dd.trace.split-by-tags`
: **Variable de Entorno**: `DD_TRACE_SPLIT_BY_TAGS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `aws.service`<br>
Se utiliza para renombrar el nombre del servicio asociado con los tramos para ser identificado con la etiqueta de tramo correspondiente.

`dd.trace.health.metrics.enabled`
: **Variable de Entorno**: `DD_TRACE_HEALTH_METRICS_ENABLED`<br>
**Predeterminado**: `true`<br>
Cuando se establece en `true`, envía métricas de salud del rastreador.

`dd.trace.health.metrics.statsd.host`
: **Variable de Entorno**: `DD_TRACE_HEALTH_METRICS_STATSD_HOST`<br>
**Predeterminado**: Igual a `dd.jmxfetch.statsd.host` <br>
Host de Statsd para enviar métricas de salud.

`dd.trace.health.metrics.statsd.port`
: **Variable de Entorno**: `DD_TRACE_HEALTH_METRICS_STATSD_PORT`<br>
**Predeterminado**: Igual a `dd.jmxfetch.statsd.port` <br>
Puerto de Statsd para enviar métricas de salud.

`dd.trace.obfuscation.query.string.regexp`
: **Variable de Entorno**: `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`<br>
**Predeterminado**: `null`<br>
Una expresión regular para redactar datos sensibles de la cadena de consulta de solicitudes entrantes reportada en la `http.url` etiqueta (las coincidencias se reemplazan con <redacted>).

`dd.trace.servlet.async-timeout.error`
: **Variable de Entorno**: `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` <br>
**Predeterminado**: `true`<br>
Por defecto, las solicitudes asíncronas de larga duración se marcarán como un error; establecer este valor en falso permite marcar todos los tiempos de espera como solicitudes exitosas.

`dd.trace.span.tags`
: **Variable de Entorno**: `DD_TRACE_SPAN_TAGS`<br>
**Predeterminado**: `none`<br>
**Ejemplo**: `tag1:value1,tag2:value2`<br>
Una lista de etiquetas predeterminadas que se agregarán a cada tramo.

`dd.trace.jmx.tags`
: **Variable de Entorno**: `DD_TRACE_JMX_TAGS`<br>
**Predeterminado**: `none`<br>
**Ejemplo**: `tag1:value1,tag2:value2`<br>
Una lista de etiquetas de tramo que se agregarán a cada métrica jmx.

`dd.trace.startup.logs`
: **Variable de Entorno**: `DD_TRACE_STARTUP_LOGS`<br>
**Predeterminado**: `true`<br>
Cuando `false`, el registro de inicio informativo está deshabilitado. Disponible para versiones 0.64+.

`dd.trace.debug`
: **Variable de Entorno**: `DD_TRACE_DEBUG`<br>
**Predeterminado**: `false`<br>
Cuando `true`, el modo de depuración para el Datadog Java Tracer está habilitado.

`datadog.slf4j.simpleLogger.jsonEnabled`
: **Variable de Entorno**: No disponible<br>
**Predeterminado**: `false`<br>
Cuando `true`, los registros del SDK de Datadog Java se escriben en JSON. Disponible para versiones 1.48.0+.<br>
**Nota**: Esta configuración es específica para el registrador simple SLF4J embebido y no soporta variables de entorno. `dd.log.format.json` es la opción de configuración preferida.

`dd.trace.servlet.principal.enabled`
: **Variable de Entorno**: `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`<br>
**Predeterminado**: `false`<br>
Cuando `true`, se recopila el principal del usuario. Disponible para versiones 0.61+.

`dd.trace.rate.limit`
: **Variable de Entorno**: `DD_TRACE_RATE_LIMIT`<br>
**Predeterminado**: `100`<br>
Número máximo de tramos a muestrear por segundo, por proceso, cuando `DD_TRACE_SAMPLING_RULES` o `DD_TRACE_SAMPLE_RATE` está configurado. De lo contrario, el Agente de Datadog controla la limitación de tasa.

`dd.http.server.tag.query-string`
: **Variable de Entorno**: `DD_HTTP_SERVER_TAG_QUERY_STRING`<br>
**Predeterminado**: `true`<br>
Cuando se establece en `true`, los parámetros de la cadena de consulta y el fragmento se agregan a los tramos del servidor web.

`dd.http.server.route-based-naming`
: **Variable de Entorno**: `DD_HTTP_SERVER_ROUTE_BASED_NAMING`<br>
**Predeterminado**: `true`<br>
Cuando se establece en `false`, las rutas del marco HTTP no se utilizan para los nombres de recursos. _Esto puede cambiar los nombres de recursos y las métricas derivadas si se modifica._

`dd.trace.http.server.path-resource-name-mapping`<br>
: **Variable de Entorno**: `DD_TRACE_HTTP_SERVER_PATH_RESOURCE_NAME_MAPPING`<br>
**Predeterminado**: `{}` (vacío) <br>
Mapea las rutas de solicitudes HTTP a nombres de recursos personalizados. Proporcione una lista de pares separados por comas: `pattern:resource_name`:<br>
&nbsp;&nbsp;&nbsp;&ndash; `pattern`: Un [patrón de ruta estilo Ant][20] que debe coincidir con el valor de la etiqueta de tramo `http.path_group`.<br>
&nbsp;&nbsp;&nbsp;&ndash; `resource_name`: El nombre de recurso personalizado a asignar si el patrón coincide.<br>
Si `*` se utiliza como el `resource_name` para un patrón coincidente, se utiliza la ruta de solicitud original, no normalizada, combinada con el método HTTP como el nombre del recurso. Por ejemplo, dada la regla `/test/**:*`, una `GET` solicitud para `/test/some/path` resulta en el nombre del recurso `GET /test/some/path`.<br>
Las asignaciones se evalúan en orden de prioridad, y se aplica la primera regla que coincide. Las rutas de solicitud no coincidentes utilizan el comportamiento de normalización predeterminado.<br>
**Ejemplo**: Usar `-Ddd.trace.http.server.path-resource-name-mapping=/admin/*.jsp:/admin-page,/admin/user/**:/admin/user` produce:<br>
Ruta de solicitud | Ruta de recurso
------------ | -------------
`/admin/index.jsp` | `/admin-page`
`/admin/user/12345/delete` | `/admin/user`
`/user/12345` | `/user/?`

`dd.trace.http.client.path-resource-name-mapping`<br>
: **Variable de Entorno**: `DD_TRACE_HTTP_CLIENT_PATH_RESOURCE_NAME_MAPPING`<br>
**Predeterminado**: `{}` (vacío) <br>
Mapea las rutas de solicitud del cliente HTTP a nombres de recursos personalizados. Utiliza el mismo formato que `dd.trace.http.server.path-resource-name-mapping`, pero se aplica a los tramos del cliente HTTP en lugar de los tramos del servidor.

`dd.trace.status404rule.enabled`
: **Variable de Entorno**: `DD_TRACE_STATUS404RULE_ENABLED`<br>
**Predeterminado**: `true`<br>
Por defecto, las respuestas HTTP 404 utilizan "404" como el nombre del recurso del tramo. Cuando `false`, las respuestas HTTP 404 mantienen la ruta URL original como el nombre del recurso.

`dd.trace.128.bit.traceid.generation.enabled`
: **Variable de Entorno**: `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`<br>
**Predeterminado**: `true`<br>
Cuando `true`, el SDK genera IDs de traza de 128 bits y codifica los IDs de traza como 32 caracteres hexadecimales en minúsculas con relleno de ceros.

`dd.trace.128.bit.traceid.logging.enabled`
: **Variable de Entorno**: `DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`<br>
**Predeterminado**: `false`<br>
Cuando `true`, el SDK inyectará IDs de traza de 128 bits como 32 caracteres hexadecimales en minúsculas con relleno de ceros, y IDs de traza de 64 bits como números decimales. De lo contrario, el SDK siempre inyecta IDs de traza como números decimales.

`dd.trace.otel.enabled`
: **Variable de Entorno**: `DD_TRACE_OTEL_ENABLED`<br>
**Predeterminado**: `false`<br>
Cuando `true`, el seguimiento basado en OpenTelemetry para [instrumentación][16] personalizada está habilitado.

`dd.trace.cloud.payload.tagging.services`
: **Variable de Entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES`<br>
**Predeterminado**: `ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`<br>
**Ejemplo**: `S3,Sso`<br>
Para habilitar [etiquetado de carga útil de AWS][18] para servicios adicionales, use esta configuración.

`dd.trace.cloud.request.payload.tagging`
: **Variable de Entorno**: `DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING`<br>
**Predeterminado**: N/A (deshabilitado)<br>
**Ejemplo**: `$.Metadata.UserId,$.phoneNumber`<br>
Una cadena de texto separada por comas de entradas JSONPath para redactar de las solicitudes del SDK de AWS. Activar esto habilita el [etiquetado de carga útil de AWS][18] para las solicitudes.

`dd.trace.cloud.response.payload.tagging`
: **Variable de Entorno**: `DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING`<br>
**Predeterminado**: N/A (deshabilitado)<br>
**Ejemplo**: `$.Metadata.Credentials.*`<br>
Una cadena de texto separada por comas de entradas JSONPath para redactar de las respuestas del SDK de AWS. Activar esto habilita el [etiquetado de carga útil de AWS][18] para las respuestas.

`dd.trace.cloud.payload.tagging.max-depth`
: **Variable de Entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH`<br>
**Predeterminado**: `10`<br>
Un entero que representa la profundidad máxima de una carga útil de solicitud/respuesta del SDK de AWS para usar en el [etiquetado de carga útil de AWS][18].

`dd.trace.cloud.payload.tagging.max-tags`
: **Variable de Entorno**: `DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS`<br>
**Predeterminado**: `758`<br>
Un entero que representa el número máximo de etiquetas a extraer por un tramo para ser utilizado en el [etiquetado de carga útil de AWS][18].

### Agente {#agent}

`dd.tags`
: **Variable de Entorno**: `DD_TAGS`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `layer:api,team:intake,key:value`<br>
Una lista de etiquetas predeterminadas que se agregarán a cada tramo, perfil y métrica JMX. Si se utiliza DD_ENV o DD_VERSION, anula cualquier etiqueta de entorno o versión definida en DD_TAGS. Disponible para versiones 0.50.0+.

`dd.agent.host`
: **Variable de Entorno**: `DD_AGENT_HOST`<br>
**Predeterminado**: `localhost`<br>
Nombre del host al que se enviarán las trazas. Si se utiliza un entorno en contenedores, configure esto para que sea la IP del host. Consulte [Trazado de Aplicaciones Docker][5] para más detalles.

`dd.instrumentation.telemetry.enabled`
: **Variable de Entorno**: `DD_INSTRUMENTATION_TELEMETRY_ENABLED`<br>
**Predeterminado**: `true`<br>
Cuando `true`, el rastreador recopila [datos de telemetría][8]. Disponible para versiones 0.104+. Por defecto es `true` para versiones 0.115+.

### Bases de Datos {#databases}

`dd.trace.db.client.split-by-instance`
: **Variable de Entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` <br>
**Predeterminado**: `false`<br>
Cuando se establece en `true`, los tramos de la base de datos reciben el nombre de instancia como el nombre del servicio

`dd.trace.db.client.split-by-host`
: **Variable de Entorno**: `DD_TRACE_DB_CLIENT_SPLIT_BY_HOST` <br>
**Predeterminado**: `false`<br>
Cuando se establece en `true`, los tramos de la base de datos reciben el nombre de host de la base de datos remota como el nombre del servicio

`dd.dbm.propagation.mode`
: **Variable de Entorno**: `DD_DBM_PROPAGATION_MODE` <br>
**Predeterminado**: `null`<br>
Cuando se establece en `service` o `full`, habilita Database Monitoring y la correlación de APM. Para más información, consulte [Correlacionar Database Monitoring y trazas][23].

### AAP {#aap}

`dd.appsec.enabled`
: **Variable de Entorno**: `DD_APPSEC_ENABLED`<br>
**Predeterminado**: `false`<br>
Cuando `true`, habilita el monitoreo de Datadog App and API Protection. Además, esto habilita automáticamente la recolección de IP del cliente (`dd.trace.client-ip.enabled`).<br>
Para más información, consulte [Habilitar AAP para Java][19].

### Errores {#errors}

`dd.trace.http.client.tag.query-string`
: **Propiedad del Sistema (Obsoleta)**: `dd.http.client.tag.query-string`<br>
**Variable de Entorno**: `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Variable de Entorno (Obsoleta)**: `DD_HTTP_CLIENT_TAG_QUERY_STRING`<br>
**Predeterminado**: `true`<br>
Por defecto, los parámetros de la cadena de consulta y los fragmentos se añaden a la etiqueta `http.url` en los tramos del cliente web. Establecer en `false` para prevenir la recolección de estos datos.

`dd.trace.http.client.error.statuses`
: **Variable de Entorno**: `DD_TRACE_HTTP_CLIENT_ERROR_STATUSES`<br>
**Predeterminado**: `400-499`<br>
Se puede aceptar una variedad de errores. Por defecto, los errores 4xx se reportan como errores para los clientes HTTP. Esta configuración anula eso. Ej. `dd.trace.http.client.error.statuses=400-403,405,410-499`

`dd.trace.http.server.error.statuses`
: **Variable de Entorno**: `DD_TRACE_HTTP_SERVER_ERROR_STATUSES`<br>
**Predeterminado**: `500-599`<br>
Se puede aceptar una variedad de errores. Por defecto, los códigos de estado 5xx se reportan como errores para los servidores HTTP. Esta configuración anula eso. Ej. `dd.trace.http.server.error.statuses=500,502-599`

`dd.grpc.client.error.statuses`
: **Variable de Entorno**: `DD_GRPC_CLIENT_ERROR_STATUSES`<br>
**Predeterminado**: `1-16`<br>
Se puede aceptar una variedad de errores. Por defecto, los códigos de estado de gRPC del 1 al 16 se informan como errores para los clientes de gRPC. Esta configuración anula eso. Ej. `dd.grpc.client.error.statuses=1-4,7-10`

`dd.grpc.server.error.statuses`
: **Variable de Entorno**: `DD_GRPC_SERVER_ERROR_STATUSES`<br>
**Predeterminado**: `2-16`<br>
Se puede aceptar una variedad de errores. Por defecto, los códigos de estado de gRPC del 2 al 16 se informan como errores para los servidores de gRPC. Esta configuración anula eso. Ej. `dd.grpc.server.error.statuses=2-4,7-10`

### Logs {#logs}

`dd.log.level`
: **Variable de Entorno**: `DD_LOG_LEVEL`<br>
**Predeterminado**: `INFO`<br>
Establece el nivel de registro interno para el Java Tracer de Datadog. Valores válidos: `DEBUG`, `INFO`, `WARN`, `ERROR`.<br>
Disponible desde la versión 1.36.0

`dd.log.format.json`
: **Variable de Entorno**: `DD_LOG_FORMAT_JSON`<br>
**Predeterminado**: `false`<br>
Cuando `true`, genera registros del Java Tracer de Datadog en un formato JSON compatible con Datadog Logs UI.<br>
Disponible desde la versión 1.58.0

`dd.logs.injection`
: **Variable de Entorno**: `DD_LOGS_INJECTION`<br>
**Predeterminado**: `true`<br>
Se habilitó la inyección automática de claves MDC para los IDs de traza y de tramo de Datadog. Consulte [Uso Avanzado][2] para más detalles.<br><br>
A partir de la versión 1.18.3, si se habilita la [Agent Remote Configuration][3] donde se ejecuta este servicio, puede establecer `DD_LOGS_INJECTION` en la interfaz de usuario del [Catálogo][4].

### Propagación del contexto de trazas {#trace-context-propagation}

Para información sobre valores válidos y el uso de las siguientes opciones de configuración, consulte [Propagando el Contexto de Traza de Java][15].

`dd.trace.propagation.style.inject`
: **Variable de Entorno**: `DD_TRACE_PROPAGATION_STYLE_INJECT`<br>
**Predeterminado**: `datadog,tracecontext`<br>
Una lista de formatos de encabezado separados por comas que se incluirán para propagar trazas distribuidas entre servicios.<br>
Disponible desde la versión 1.9.0

`dd.trace.propagation.style.extract`
: **Variable de Entorno**: `DD_TRACE_PROPAGATION_STYLE_EXTRACT`<br>
**Predeterminado**: `datadog,tracecontext`<br>
Una lista de formatos de encabezado separados por comas de los cuales se intentará extraer datos de propagación de trazas distribuidas. El primer formato encontrado con encabezados completos y válidos se utiliza para definir la traza a continuar.<br>
Disponible desde la versión 1.9.0

`dd.trace.propagation.style`
: **Variable de Entorno**: `DD_TRACE_PROPAGATION_STYLE`<br>
**Predeterminado**: `datadog,tracecontext`<br>
Una lista de formatos de encabezado separados por comas de los cuales intentar inyectar y extraer datos de propagación de trazas distribuidas. El primer formato encontrado con encabezados completos y válidos se utiliza para definir la traza a continuar. Las configuraciones más específicas `dd.trace.propagation.style.inject` y `dd.trace.propagation.style.extract` tienen prioridad cuando están presentes.<br>
Disponible desde la versión 1.9.0

`trace.propagation.extract.first`
: **Variable de Entorno**: `DD_TRACE_PROPAGATION_EXTRACT_FIRST`<br>
**Predeterminado**: `false`<br>
Cuando se establece en `true`, se detiene la extracción del contexto de trazas cuando se encuentra uno válido.

### Métricas JMX {#jmx-metrics}

`dd.jmxfetch.enabled`
: **Variable de Entorno**: `DD_JMXFETCH_ENABLED`<br>
**Predeterminado**: `true`<br>
Habilitar la recolección de métricas JMX por el Agente de Trazado de Java.

`dd.jmxfetch.config.dir`
: **Variable de Entorno**: `DD_JMXFETCH_CONFIG_DIR`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `/path/to/directory/etc/conf.d`<br>
Directorio de configuración adicional para la recolección de métricas JMX. El Agente de Java busca `jvm_direct:true` en la sección `instance` en el archivo `yaml` para cambiar la configuración.

`dd.jmxfetch.config`
: **Variable de Entorno**: `DD_JMXFETCH_CONFIG`<br>
**Predeterminado**: `null`<br>
**Ejemplo**: `path/to/file/conf.yaml,other/path/to/file/conf.yaml`<br>
Archivo de configuración de métricas adicionales para la recolección de métricas JMX. El Agente de Java busca `jvm_direct:true` en la sección `instance` del archivo `yaml` para cambiar la configuración.

`dd.jmxfetch.check-period`
: **Variable de Entorno**: `DD_JMXFETCH_CHECK_PERIOD`<br>
**Predeterminado**: `15000`<br>
Con qué frecuencia enviar métricas JMX (en ms).

`dd.jmxfetch.refresh-beans-period`
: **Variable de Entorno**: `DD_JMXFETCH_REFRESH_BEANS_PERIOD`<br>
**Predeterminado**: `600`<br>
Con qué frecuencia actualizar la lista de beans JMX disponibles (en segundos).

`dd.jmxfetch.statsd.host`
: **Variable de Entorno**: `DD_JMXFETCH_STATSD_HOST`<br>
**Predeterminado**: Igual que `agent.host`<br>
Servidor de Statsd para enviar métricas JMX. Si está utilizando Sockets de Dominio Unix, use un argumento como 'unix://PATH_TO_UDS_SOCKET'. Ejemplo: `unix:///var/datadog-agent/dsd.socket`

`dd.jmxfetch.statsd.port`
: **Variable de Entorno**: `DD_JMXFETCH_STATSD_PORT`<br>
**Predeterminado**: `8125`<br>
Puerto de StatsD para enviar métricas JMX. Si está utilizando Sockets de Dominio Unix, ingrese 0.

`dd.jmxfetch.<integration-name>.enabled`
: **Variable de Entorno**: `DD_JMXFETCH_<INTEGRATION_NAME>_ENABLED`<br>
**Predeterminado**: `false`<br>
Integración JMX para habilitar (por ejemplo, Kafka o ActiveMQ).

### Integrations {#integrations}

Vea cómo deshabilitar Integrations en la sección de compatibilidad [integrations][13].

`dd.integration.opentracing.enabled`
: **Variable de Entorno**: `DD_INTEGRATION_OPENTRACING_ENABLED`<br>
**Predeterminado**: `true`<br>
Por defecto, el cliente de trazado detecta si se está cargando un GlobalTracer y registra dinámicamente un trazador en él. Al cambiar esto a falso, se elimina cualquier dependencia del trazador en OpenTracing.

`dd.hystrix.tags.enabled`
: **Variable de Entorno**: `DD_HYSTRIX_TAGS_ENABLED`<br>
**Predeterminado**: `false`<br>
Por defecto, los grupos, comandos y etiquetas de estado de circuito de Hystrix no están habilitados. Esta propiedad los habilita.

`dd.trace.elasticsearch.body.enabled`
: **Variable de Entorno**: `DD_TRACE_ELASTICSEARCH_BODY_ENABLED` <br>
**Predeterminado**: `false`<br>
Cuando se establece en `true`, el cuerpo se agrega a los tramos de Elasticsearch y OpenSearch.

`dd.trace.elasticsearch.params.enabled`
: **Variable de Entorno**: `DD_TRACE_ELASTICSEARCH_PARAMS_ENABLED` <br>
**Predeterminado**: `true`<br>
Cuando se establece en `true`, los parámetros de la cadena de consulta se agregan a los tramos de Elasticsearch y OpenSearch.

`dd.trace.cassandra.keyspace.statement.extraction.enabled`
: **Variable de Entorno**: `DD_TRACE_CASSANDRA_KEYSPACE_STATEMENT_EXTRACTION_ENABLED` <br>
**Predeterminado**: `false`<br>
Por defecto, el espacio de claves se extrae solo si está configurado durante la creación de la sesión. Cuando se establece en `true`, el espacio de claves también se puede extraer examinando los metadatos en los resultados de la consulta.

`dd.trace.websocket.messages.enabled`
: **Variable de Entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_ENABLED` <br>
**Predeterminado**: `false`<br>
Habilita el seguimiento de los mensajes de websocket enviados y recibidos (texto y binario) y eventos de cierre de conexión.

`dd.trace.websocket.messages.inherit.sampling`
: **Variable de Entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_INHERIT_SAMPLING` <br>
**Predeterminado**: `true`<br>
Por defecto, los mensajes de websocket preservan el mismo muestreo que el tramo capturado durante el apretón de manos. Esto asegura que, si un tramo de apretón de manos ha sido muestreado, todos los mensajes en su sesión también serán muestreados. Para deshabilitar ese comportamiento y muestrear cada mensaje de websocket de manera independiente, configure esta opción a `false`.

`dd.trace.websocket.messages.separate.traces`
: **Variable de Entorno**: `DD_TRACE_WEBSOCKET_MESSAGES_SEPARATE_TRACES` <br>
**Predeterminado**: `true`<br>
Por defecto, cada mensaje recibido genera una nueva traza. El apretón de manos está vinculado a él como un enlace de tramo. Configurar este parámetro a `false` provoca que todos los tramos capturados durante la sesión estén en la misma traza.

`dd.trace.websocket.tag.session.id`
: **Variable de Entorno**: `DD_TRACE_WEBSOCKET_TAG_SESSION_ID` <br>
**Predeterminado**: `false`<br>
Cuando se establece en `true`, los tramos de websocket tienen la etiqueta `websocket.session.id` que contiene el ID de sesión cuando está disponible.


**Nota**:

- Si se establece el mismo tipo de clave para ambos, la configuración de propiedad del sistema tiene prioridad.
- Las propiedades del sistema pueden ser utilizadas como parámetros de la JVM.
- Por defecto, las métricas JMX de su aplicación se envían al Datadog Agent gracias a DogStatsD a través del puerto `8125`. Asegúrese de que [DogStatsD esté habilitado para el Datadog Agent][9].

  - Si está ejecutando el Datadog Agent como un contenedor, asegúrese de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [esté configurado a `true`][10], y que el puerto `8125` esté abierto en el contenedor del Datadog Agent.
  - En Kubernetes, [vincule el puerto de DogStatsD a un puerto de host][11]; en ECS, [establezca las banderas apropiadas en la definición de su tarea][12].

### UDS {#uds}

`dd.jdk.socket.enabled`
: **Variable de Entorno**: `DD_JDK_SOCKET_ENABLED` <br>
**Predeterminado**: `true`<br>
Habilitar soporte nativo de JDK para Sockets de Dominio Unix.

### Ejemplos {#examples}

#### `dd.service.mapping` {#ddservicemapping}

Ejemplo con propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="mapeo de servicio" >}}

#### `dd.tags` {#ddtags}
Configurando un entorno global para tramos y métricas JMX:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="etiquetas globales de traza" >}}

#### `dd.trace.span.tags` {#ddtracespantags}

Ejemplo agregando project:test a cada tramo:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="etiquetas de tramo de traza" >}}

#### `dd.trace.jmx.tags` {#ddtracejmxtags}

Configurando custom.type:2 en una métrica JMX:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="etiquetas JMX de traza" >}}

#### `dd.trace.methods` {#ddtracemethods}

Ejemplo con propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="métodos de traza" >}}

#### `dd.trace.db.client.split-by-instance` {#ddtracedbclientsplit-by-instance}

Ejemplo con propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

La instancia de DB 1, `webappdb`, ahora tiene su propio nombre de servicio que es el mismo que los metadatos del tramo `db.instance`:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="instancia 1" >}}

La instancia de DB 2, `secondwebappdb`, ahora tiene su propio nombre de servicio que es el mismo que los metadatos del tramo `db.instance`:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="instancia 2" >}}

De manera similar, en el mapa de servicios, ahora verías una aplicación web haciendo llamadas a dos bases de datos Postgres diferentes.

#### `dd.http.server.tag.query-string` {#ddhttpservertagquery-string}

Ejemplo con propiedad del sistema:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="cadena de consulta" >}}

#### `dd.trace.enabled` {#ddtraceenabled}

Ejemplo con propiedad del sistema y modo de depuración de la aplicación:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddd.trace.debug=true -jar path/to/application.jar
```

Los registros de depuración de la aplicación muestran que `Tracing is disabled, not installing instrumentations.`

#### `dd.jmxfetch.config.dir` y `dd.jmxfetch.config` {#ddjmxfetchconfigdir-and-ddjmxfetchconfig}

Configuración de ejemplo:

- O la combinación de: `DD_JMXFETCH_CONFIG_DIR=<DIRECTORY_PATH>` + `DD_JMXFETCH_CONFIG=conf.yaml`
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

Produciría el siguiente resultado:

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="Ejemplo de JMX fetch" >}}

Consulte la [documentación de integración de Java][14] para aprender más sobre la recolección de métricas de Java con JMX fetch.

#### Configuraciones de extracción e inyección obsoletas {#deprecated-extraction-and-injection-settings}

Estas configuraciones de extracción e inyección han sido obsoletas a favor de las configuraciones `dd.trace.propagation.style.inject`, `dd.trace.propagation.style.extract` y `dd.trace.propagation.style` desde la versión 1.9.0. Consulte [Propagación del contexto de traza de Java][15]. La configuración anterior `b3` para ambos encabezados múltiples B3 y encabezado único B3 ha sido reemplazada por las nuevas configuraciones `b3multi` y `b3single`.

`dd.propagation.style.inject`
: **Variable de entorno**: `DD_PROPAGATION_STYLE_INJECT`<br>
**Predeterminado**: `datadog`<br>
Una lista separada por comas de formatos de encabezado para incluir para propagar trazas distribuidas entre servicios.<br>
Obsoleto desde la versión 1.9.0

`dd.propagation.style.extract`
: **Variable de entorno**: `DD_PROPAGATION_STYLE_EXTRACT`<br>
**Predeterminado**: `datadog`<br>
Una lista separada por comas de formatos de encabezado de los cuales intentar extraer datos de propagación de trazas distribuidas. El primer formato encontrado con encabezados completos y válidos se utiliza para definir la traza a continuar.<br>
Obsoleto desde la versión 1.9.0

## Lectura adicional {#further-reading}

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