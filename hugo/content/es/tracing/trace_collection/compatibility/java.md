---
aliases:
- /es/tracing/compatibility_requirements/
- /es/tracing/compatibility_requirements/java
- /es/tracing/setup_overview/compatibility_requirements/java
code_lang: java
code_lang_weight: 0
description: Requisitos de compatibilidad para el trazador de Java
further_reading:
- link: tracing/trace_collection/dd_libraries/java
  tag: Documentación
  text: Instrumente su aplicación
title: Requisitos de compatibilidad de Java
type: multi-code-lang
---
## Compatibilidad {#compatibility}

La biblioteca Java Datadog Trace es de código abierto; visualice el [repositorio de GitHub][1] para obtener más información.

### Runtimes de Java compatibles {#supported-java-runtimes}

El trazador de Java admite la instrumentación automática para los siguientes runtimes de Oracle JDK, OpenJDK JVM y [GraalVM](#graalvm-native-image-support).

#### Java Tracer v1 (más reciente) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Versiones de Java</th>
    <th>Sistemas operativos</th>
    <th>Nivel de soporte</th>
  </thead>
  <tr>
    <td>desde 28 en adelante</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Vista previa</a></td>
  </tr>
  <tr>
    <td>desde 18 hasta 27</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">desde 8 hasta 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Vista previa</a></td>
  </tr>
</table>

Datadog no admite oficialmente ninguna versión de acceso anticipado de Java.

#### Java Tracer v0 {#java-tracer-v0}

| Versiones de Java      | Sistemas operativos                                                               | Nivel de soporte                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| Solo 7             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Fin de vida útil](#levels-of-support) |
| Solo 7             | Linux (arm64)<br>Mac (arm64)                                                    | [Fin de vida útil](#levels-of-support) |

### Niveles de soporte {#levels-of-support}

| **Nivel**                                              | **Soporte proporcionado**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte</span>      |  Sin implementación. Comuníquese con el [soporte de Datadog][2] para solicitudes especiales.                                                                              |
| <span id="support-beta">Vista previa</span>                 |  Implementación inicial. Es posible que aún no contenga todas las funciones. El soporte para nuevas funciones y correcciones de errores y seguridad se proporciona en la medida de lo posible. |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte completo para nuevas funciones y correcciones de errores y seguridad.                                                     |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte solo para correcciones de errores y seguridad.                                  |
| <span id="support-eol">Fin de vida útil (EOL)</span>        |  Sin soporte.                                                                                                                                        |

## Integrations {#integrations}

Las Integrations en Vista previa están deshabilitadas de forma predeterminada, pero se pueden habilitar individualmente:

- Propiedad del sistema: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Compatibilidad con marcos web {#web-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos web.

**El rastreo de marcos web proporciona:**

- medición del tiempo entre la solicitud HTTP y la respuesta
- etiquetas para la solicitud HTTP (código de estado, método, etc.)
- captura de errores y seguimientos de pila
- vinculación del trabajo creado dentro de una solicitud web y el rastreo distribuido

| Servidor                  | Versiones     | Tipo de soporte                                           | Nombres de instrumentación (usados para configuración)             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Akka-Http Server        | 10.0+        | Totalmente compatible                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | Totalmente compatible                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra Web             | 2.9+         | Totalmente compatible                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | Totalmente compatible                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | Totalmente compatible                                        | `grizzly-filterchain`                                      |
| Compatible con Java Servlet | 2.3+, 3.0+   | Totalmente compatible                                        | `servlet`, `servlet-2`, `servlet-3`                        |
| Anotaciones Jax-RS      | JSR311-API   | Totalmente compatible                                        | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter`   |
| Jetty                   | 7.0-12.x     | Totalmente compatible                                        | `jetty`                                                    |
| Micronaut HTTP Server   | 2.x+         | Totalmente compatible                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | Totalmente compatible                                        | `mule`                                                     |
| Netty HTTP Server       | 3.8+         | Totalmente compatible                                        | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`             |
| Play                    | 2.3-2.8      | Totalmente compatible                                        | `play`, `play-action`                                      |
| Ratpack                 | 1.5+         | Totalmente compatible                                        | `ratpack`                                                  |
| Restlet HTTP Server     | 2.2 - 2.4    | Totalmente compatible                                        | `restlet-http`.                                            |
| Spark Java              | 2.3+         | [Vista previa](#framework-integrations-disabled-by-default) | `sparkjava` (requiere `jetty`)                             |
| Spring Boot             | 1.5 - 3.X    | Totalmente compatible                                        | `spring-web` o `spring-webflux`                           |
| Spring Web (MVC)        | 4.0+         | Totalmente compatible                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | Totalmente compatible                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | Totalmente compatible                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | Totalmente compatible                                        | `undertow`                                                 |
| Vert.x                  | 3.4 - 5.x    | Totalmente compatible                                        | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`, `vertx-5.0`|
| Websocket (JSR356)      | 1.0+         | [Vista previa](#framework-integrations-disabled-by-default) | `websocket`                                                |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como Websphere, Weblogic y JBoss.
Además, marcos de trabajo como Spring Boot (versión 3) funcionan de forma inherente porque generalmente utilizan un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

### Integrations de marcos de trabajo deshabilitadas de forma predeterminada {#framework-integrations-disabled-by-default}

Las siguientes instrumentaciones están deshabilitadas de forma predeterminada y se pueden habilitar con la siguiente configuración:

| Instrumentación              | Para habilitar 									                                                                              |
|------------------------------|----------------------------------------------------------------------------------------------------------|
| Grizzly                      | `-Ddd.integration.grizzly-client.enabled=true`                                                           |
| Grizzly-HTTP                 | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                      |
| Hazelcast (solo del lado del cliente) | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`         |
| Ignite                       | `-Ddd.integration.ignite.enabled=true`                                                                   |
| JAX-WS                       | `-Ddd.integration.jax-ws.enabled=true`                                                                   |
| JDBC Datasource              | `-Ddd.integration.jdbc-datasource.enabled=true`                                                          |
| Mulesoft                     | `-Ddd.integration.mule.enabled=true`                                                                     |
| Netty Promise                | `-Ddd.integration.netty-promise.enabled=true`                                                            |
| Ning                         | `-Ddd.integration.ning.enabled=true`                                                                     |
| Spark Java                   | `-Ddd.integration.sparkjava.enabled=true`                                                                |
| TIBCO BusinessWorks          | `-Ddd.integration.tibco.enabled=true`                                                                    |
| Conexión URL               | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**Nota**: La integración de JAX-WS instrumenta los puntos de conexión anotados con @WebService (JAX-WS 1.x) y @WebServiceProvider (JAX-WS 2.x).

¿No ve los marcos de trabajo web que desea? Datadog continúa agregando soporte adicional. Comuníquese con el [soporte de Datadog][2] si necesita ayuda.

### Compatibilidad del marco de trabajo de red {#networking-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos de trabajo de red.

**El rastreo de red proporciona:**

- tiempo transcurrido entre la solicitud y la respuesta
- etiquetas para la solicitud (por ejemplo, código de respuesta)
- captura de errores y seguimientos de pila
- rastreo distribuido

| Marco de trabajo                          | Versiones    | Tipo de soporte                                           | Nombres de instrumentación (usados para configuración)          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Apache HTTP Client                 | 4.0+        | Totalmente compatible                                        | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Apache HTTP Async Client           | 4.0+        | Totalmente compatible                                        | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | Totalmente compatible                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | Vista previa                                                | [opentelemetry-1][5]                                    |
| Commons HTTP Client                | 2.0+        | Totalmente compatible                                        | `commons-http-client`                                   |
| Google HTTP Client                 | 1.19.0+     | Totalmente compatible                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | Totalmente compatible                                        | `google-pubsub`                                         |
| Grizzly HTTP Client                | 1.9+        | [Vista previa](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | Totalmente compatible                                        | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | todas       | Totalmente compatible                                        | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | Totalmente compatible                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | Totalmente compatible                                        | `kafka`, `kafka-streams`                                |
| Java RMI                           | todos       | Rastreo distribuido no compatible                      | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | Totalmente compatible                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9-2.29    | Totalmente compatible                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | Totalmente compatible                                  | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | Totalmente compatible                                        | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [Vista previa](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | Totalmente compatible                                  | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Play WSClient                      | 1.0+        | Totalmente compatible                                  | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | Totalmente compatible                                  | `amqp`, `rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | Totalmente compatible                                  | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | Totalmente compatible                                  | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | Totalmente compatible                                  | `spring-webflux`, `spring-webflux-client`               |

**Nota sobre Kafka**: La integración de Kafka de Datadog funciona con la versión `0.11+` de Kafka, que admite Header API. Esta API se utiliza para inyectar y extraer el contexto de la traza. Si está ejecutando un entorno con versiones mixtas, el intermediario de Kafka puede informar incorrectamente la versión más reciente de Kafka. Esto causa un problema cuando el SDK intenta inyectar encabezados que no son compatibles con el productor local. Además, los consumidores más antiguos no pueden consumir el mensaje debido a la presencia de encabezados. Para evitar estos problemas, si está ejecutando un entorno de Kafka con versiones mixtas que incluye versiones anteriores a 0.11, deshabilite la propagación de contexto con la variable de entorno: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**Nota sobre JMS**: La integración de JMS de Datadog agrega y lee automáticamente las propiedades del objeto de mensaje `x__dash__datadog__dash__trace__dash__id` y `x__dash__datadog__dash__parent__dash__id` para mantener la propagación de contexto entre los servicios de consumidor y productor.

**Nota sobre Camel**: La propagación de trazas distribuidas a través de rutas de Camel no es compatible.

**Nota sobre SOFA RPC**: La integración de SOFA RPC de Datadog admite los protocolos de transporte Bolt, Triple y REST. Triple utiliza el transporte gRPC; el rastreo distribuido para llamadas Triple requiere que la integración `grpc` permanezca habilitada.

¿No ve el marco de trabajo de red que desea? Datadog continúa agregando soporte adicional. Comuníquese con el [soporte de Datadog][2] si necesita ayuda.

### Compatibilidad con almacenes de datos {#data-store-compatibility}

`dd-java-agent` incluye soporte para el rastreo automático de los siguientes marcos de trabajo/controladores de base de datos.

**El rastreo de Datastore proporciona:**

- tiempo transcurrido entre la solicitud y la respuesta
- información de consulta (por ejemplo, una cadena de consulta saneada)
- captura de errores y seguimientos de pila

| Base de datos                | Versiones | Tipo de soporte    | Nombres de instrumentación (usados para la configuración)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | Totalmente compatible | `aerospike`                                                                                |
| Couchbase               | 2.0+     | Totalmente compatible | `couchbase`                                                                                |
| Cassandra               | 3.0+     | Totalmente compatible | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | Totalmente compatible | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (elija uno) |
| Elasticsearch Rest      | 5.0+     | Totalmente compatible | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (elija uno)             |
| Ignite                  | 2.0-3.0  | [Vista previa](#framework-integrations-disabled-by-default) | `ignite`                                            |
| JDBC                    | N/A      | Totalmente compatible | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | Totalmente compatible | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0+     | Totalmente compatible | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0+ | Totalmente compatible | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | Totalmente compatible | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | Totalmente compatible | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5+     | Totalmente compatible | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x-3.x  | Totalmente compatible | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12+    | Totalmente compatible | `spymemcached`                                                                             |
| Vert.x Cassandra Client | 3.9-4.x  | Totalmente compatible | `cassandra`																			                                                             |
| Vert.x Redis Client     | 3.9-4.x  | Totalmente compatible | `vertx-redis-client`                                                                       |
| Vert.x MySQL Client     | 3.9-4.x  | Totalmente compatible | `vertx-sql-client`																		                                                       |

**Nota**: Redis 6.0+ admite autenticación en línea en comandos como `HELLO`, `MIGRATE` y `ACL SETUSER`.

  - **Datadog Trace Agent**: La versión mínima requerida y recomendada es `7.76.1` para garantizar que los parámetros de autenticación se ofusquen automáticamente en los metadatos de la traza.
  - **Datadog Lambda Extension** (entornos Serverless): La versión mínima requerida es `v28.0.0`.

`dd-java-agent` también es compatible con controladores JDBC comunes, incluidos:

- Apache Derby
- Firebird SQL
- H2 Database Engine
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

### Integrations de bases de datos deshabilitadas de forma predeterminada {#database-integrations-disabled-by-default}

Las siguientes instrumentaciones están deshabilitadas de forma predeterminada y se pueden habilitar con la siguiente configuración:

| Instrumentación   | Para habilitar 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - Propiedad del sistema: `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - Variable de entorno: `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

¿No ve sus almacenes de datos deseados? Datadog continúa agregando soporte adicional. Comuníquese con el [soporte de Datadog][2] si necesita ayuda.

### Compatibilidad adicional con marcos de trabajo {#additional-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes frameworks.

| Marco de trabajo           | Versiones         | Tipo de soporte                                           | Nombres de instrumentación (usados para configuración) |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF (Jax-WS) | 3.0+             | [OpenTelemetry Extension][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | Totalmente compatible                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | Totalmente compatible                                        | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+            | Totalmente compatible                                        | `graphql-java`                                 |
| Guidewire (PolicyCenter, BillingCenter) | 10.0+ | Totalmente compatible                                        | `guidewire`, `guidewire-wsi`   |
| Hazelcast (cliente)  | 3.6+             | [Vista previa](#framework-integrations-disabled-by-default) | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+             | Totalmente compatible                                        | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+             | Totalmente compatible                                        | `hystrix`                                      |
| Renderizado JSP       | 2.3+             | Totalmente compatible                                        | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+       | Totalmente compatible                                        | `junit`, `junit-4`, `junit-5`                  |
| Kotlin Coroutines   | 1.3+             | Totalmente compatible                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | Totalmente compatible                                        | `reactor-core`                                 |
| Quartz              | 2.x              | Totalmente compatible                                        | `quartz`                                       |
| RxJava              | 2.x              | Totalmente compatible                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | Totalmente compatible                                        | `spring-data`                                  |
| Spring Scheduling   | 3.1+             | Totalmente compatible                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 - 6.11.0  | [Vista previa](#framework-integrations-disabled-by-default) | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0            | Totalmente compatible                                        | `twilio-sdk`                                   |

¿No ve los frameworks que desea? Datadog continúa agregando soporte adicional. Para solicitar un framework, contacte a nuestro [equipo de soporte][2].

Para mejorar la visibilidad en aplicaciones que utilizan frameworks no compatibles, considere:

- [Agregar instrumentación personalizada][3].
- [Enviar un pull request][4] con instrumentación para su inclusión en una futura versión.
- Contactar al [soporte de Datadog][2] y enviar una solicitud de funcionalidad.

### Deshabilitar Integrations {#disabling-integrations}

La mayoría de las Integrations están habilitadas de forma predeterminada. La siguiente configuración puede cambiar el valor predeterminado a deshabilitado.

- Propiedad del sistema: `-Ddd.integrations.enabled=false`
- Variable de entorno: `DD_INTEGRATIONS_ENABLED=false`

Las Integrations se pueden habilitar o deshabilitar individualmente (anulando el valor predeterminado anterior).

- Propiedad del sistema: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(Consulte arriba el nombre de cada integración).

### Problemas conocidos {#known-issues}

- No se admite la ejecución del rastreador de Java en Bitbucket.
- La carga de múltiples agentes de Java que realizan funciones de APM/rastreo no es una configuración recomendada ni admitida.
- Al ejecutar el SDK con Java 24 o superior, es posible que vea advertencias relacionadas con el acceso nativo JNI. Suprima estas advertencias añadiendo el indicador `--enable-native-access=ALL-UNNAMED`. Consulte [JEP 472][13] para obtener más información.

## Soporte para carga y vinculación de clases Ahead-of-time (AOT) {#ahead-of-time-aot-class-loading-linking-support}

Para mejorar el tiempo de inicio, la carga y vinculación de clases Ahead-of-time (AOT) hace que las clases de la aplicación estén disponibles instantáneamente en un estado cargado y vinculado cuando se inicia la JVM. Consulte [JEP 483][14] y [JEP 514][15] para obtener más información.

### Requisitos {#requirements}

Utilice:

- Java 25 o posterior
- [Datadog Java SDK][1] 1.57.0 o posterior

### Configuración {#setup}

Para configurar la carga y vinculación de clases AOT para APM, agregue Datadog Java SDK durante la ejecución del entrenamiento:

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### Uso {#usage}

Durante la producción, agregue el mismo Datadog Java SDK junto con los datos de entrenamiento almacenados en caché previamente:

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

Puede visualizar las trazas usando [Trace Explorer][9].

{{% collapse-content title="Solución de problemas" level="h5" %}}
##### No adjuntar Datadog Java SDK durante la ejecución del entrenamiento {#not-attaching-the-datadog-java-sdk-during-the-training-run}

Si ve esta advertencia en producción, significa que Datadog Java SDK no se adjuntó durante el entrenamiento:

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
Por lo tanto, la JVM no puede usar la caché AOT para mejorar el tiempo de inicio. La solución es adjuntar el SDK durante el entrenamiento.

{{% /collapse-content %}}

## Soporte para GraalVM Native Image {#graalvm-native-image-support}

GraalVM Native Image es una tecnología que le permite compilar aplicaciones Java en ejecutables nativos. El SDK de Java de Datadog es compatible con GraalVM Native Image. Esto le permite compilar sus aplicaciones en ejecutables nativos mientras sigue beneficiándose de las capacidades de rastreo que ofrece la biblioteca.

### Requisitos {#requirements-1}

Utilice:

- [GraalVM JDK 21 o JDK 25][7]
- [Datadog Java SDK][1]

### Configuración {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
Para configurar Datadog Java SDK con GraalVM Native Image, siga estos pasos:

1. Instrumente su aplicación siguiendo los pasos descritos en [Rastrear aplicaciones Java][6].
2. Cuando compile un ejecutable nativo con el comando `native-image`, agregue el argumento `-J-javaagent:/path/to/dd-java-agent.jar`. Por ejemplo:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Opcional) Habilite la integración del generador de perfiles agregando el siguiente argumento:
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Para versiones del trazador anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Para configurar Datadog Java SDK con Quarkus Native, siga estos pasos:

1. Instrumente su aplicación siguiendo los pasos descritos en [Rastrear aplicaciones Java][6].
2. Cuando compile un ejecutable nativo, use la propiedad `quarkus.native.additional-build-args`. Por ejemplo:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Opcional) Habilite la integración del generador de perfiles agregando el siguiente argumento:
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Para versiones del trazador anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Para configurar Datadog Java SDK con Spring Native, siga estos pasos:

1. Instrumente su aplicación siguiendo los pasos descritos en [Rastrear aplicaciones Java][6].
2. Para compilaciones de Spring Native basadas en Buildpacks, habilite el [Paketo Buildpack for Datadog][8] usando `BP_DATADOG_ENABLED=true`.
    - Puede hacer esto a nivel de la herramienta de compilación, como Maven:
     ```yaml
     <build>
     <plugins>
       <plugin>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-maven-plugin</artifactId>
         <configuration>
           <image>
             ...
             <env>
               ...
               <BP_DATADOG_ENABLED>true</BP_DATADOG_ENABLED>
               ...
             </env>
           </image>
         </configuration>
       </plugin>
     </plugins>
     </build>
     ```
   - Alternativamente, puede usar el comando `pack build` con la opción `--env BP_DATADOG_ENABLED=true` para habilitar el buildpack de Datadog.
3. (Opcional) Habilite la integración del generador de perfiles configurando la variable de entorno `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’`.
   - Para versiones del trazador anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">Para GraalVM 25, es posible que vea errores relacionados con <code>Use of Unsafe</code>. Agregue <code>-Dnet.bytebuddy.safe=false</code> al compilar el ejecutable nativo para solucionar esto.</div>

#### Uso {#usage-1}

Después de completar la configuración, el servicio debería enviar trazas a Datadog.

Puede visualizar las trazas usando [Trace Explorer][9].

{{% collapse-content title="Solución de problemas" level="h5" %}}
##### Las funciones no están habilitadas o configuradas correctamente para imágenes nativas {#features-are-not-enabled-or-configured-correctly-for-native-images}

Existen problemas conocidos al acceder a las propiedades del sistema en tiempo de ejecución desde un binario compilado con Graal Native Image.

- Para la configuración en tiempo de ejecución, utilice variables de entorno (`DD_PROPERTY_NAME=value`) en lugar de propiedades del sistema (`-Ddd.property.name=value`).
- La excepción a esta regla es al habilitar el generador de perfiles. En este caso, pase `-J-Ddd.profiling.enabled=true` a la herramienta `native-image` en _tiempo de compilación_.

##### Versiones del buildpack de native-image anteriores a la 5.12.2 {#native-image-buildpack-versions-older-than-5122}

Versiones anteriores del buildpack de native-image exponen la siguiente opción: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

Cuando esta opción está `false`, pueden ocurrir excepciones como la siguiente:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Las soluciones a este problema son:

- Establezca `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explícitamente en true en la configuración de entorno de la imagen,
- O actualice el buildpack `native-image` a la versión 5.12.2 o posterior. La mejor manera de hacer esto es actualizando el buildpack `java-native-image` a la versión 8.13.0 o posterior.

##### Versiones del buildpack de Paketo para Datadog anteriores a la 4.6.0 {#paketo-buildpack-for-datadog-versions-older-than-460}

El buildpack de Paketo para Datadog tenía un error en versiones anteriores que se manifestaba con el siguiente mensaje de error:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

La solución a este problema es actualizar a la versión 4.6.0 o posterior.

##### La compilación de Spring Native falla con el error exec.d/toggle {#spring-native-build-crashes-with-execdtoggle-error}

Es posible que encuentre un error similar al anterior, incluso en versiones de buildpack posteriores a la 4.6.0, al compilar una imagen nativa de Spring Boot:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

Esto ocurre normalmente porque el buildpack de Datadog se ejecuta antes que el buildpack de imagen nativa, por lo que no sabe que se pretende realizar una compilación de imagen nativa. Agrega incorrectamente un script de alternancia destinado a compilaciones de JVM, el cual es incompatible con el ejecutable nativo final.

La solución es establecer explícitamente la variable de entorno `BP_NATIVE_IMAGE` en `true` en la configuración `spring-boot-maven-plugin`. Esto asegura que todos los buildpacks sepan desde el principio que se trata de una compilación de imagen nativa.

```yaml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <image>
          ...
          <env>
            ...
            <BP_NATIVE_IMAGE>true</BP_NATIVE_IMAGE>
            ...
          </env>
        </image>
      </configuration>
    </plugin>
  </plugins>
</build>
```

##### Problema al activar el SDK de Datadog {#problem-activating-datadog-sdk}

Es posible que encuentre errores de inicialización si la configuración de su trazador depende de sockets de dominio Unix (UDS), los cuales no son compatibles con imágenes nativas:

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

La solución es configurar el trazador de Java para que utilice comunicación basada en el servidor (modo `hostip` o `service`), en lugar de comunicación basada en socket (modo `socket`).

Para obtener más información, consulte [Configurar el modo de comunicación de APM y DogstatsD][11]. Para configuraciones que no dependen de Admission Controller, consulte la documentación de [DD_TRACE_AGENT_URL][12].

{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /es/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /es/tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /es/tracing/trace_explorer/
[10]: /es/opentelemetry/interoperability/instrumentation_libraries/?tab=java
[11]: /es/containers/cluster_agent/admission_controller/?tab=datadogoperator#configure-apm-and-dogstatsd-communication-mode
[12]: /es/tracing/trace_collection/library_config/#agent
[13]: https://openjdk.org/jeps/472
[14]: https://openjdk.org/jeps/483
[15]: https://openjdk.org/jeps/514