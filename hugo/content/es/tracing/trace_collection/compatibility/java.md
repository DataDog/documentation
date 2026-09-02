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

La biblioteca Datadog Trace para Java es de código abierto; consulte el [repositorio de GitHub][1] para más información.

### Entornos de ejecución de Java compatibles {#supported-java-runtimes}

El trazador de Java admite la instrumentación automática para los siguientes entornos de ejecución de Oracle JDK, OpenJDK JVM y [GraalVM](#graalvm-native-image-support).

#### Trazador de Java v1 (última versión) {#java-tracer-v1-latest}

<table>
  <thead>
    <th>Versiones de Java</th>
    <th>Sistemas operativos</th>
    <th>Nivel de soporte</th>
  </thead>
  <tr>
    <td>desde 27 en adelante</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Vista previa</a></td>
  </tr>
  <tr>
    <td>de 18 a 26</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">de 8 a 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Vista previa</a></td>
  </tr>
</table>

Datadog no soporta oficialmente ninguna versión de acceso anticipado de Java.

#### Trazador de Java v0 {#java-tracer-v0}

| Versiones de Java      | Sistemas Operativos                                                               | Nivel de soporte                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| Solo 7             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Fin de vida](#levels-of-support) |
| Solo 7             | Linux (arm64)<br>Mac (arm64)                                                    | [End-of-life](#levels-of-support) |

### Niveles de soporte {#levels-of-support}

| **Nivel**                                              | **Soporte proporcionado**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">No soportado</span>      |  Sin implementación. Contacte a [soporte de Datadog][2] para solicitudes especiales.                                                                              |
| <span id="support-beta">Vista previa</span>                 |  Implementación inicial. Puede que aún no contenga todas las características. El soporte para nuevas características, correcciones de errores y de seguridad se brinda bajo el principio de mejor esfuerzo. |
| <span id="support-ga">Disponibilidad General (GA)</span> |  Implementación completa de todas las características. Soporte completo para nuevas características y correcciones de errores y de seguridad.                                                     |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las características existentes. No recibe nuevas características. Soporte solo para correcciones de errores y de seguridad.                                  |
| <span id="support-eol">Fin de vida (EOL)</span>        |  Sin soporte.                                                                                                                                        |

## Integrations {#integrations}

Las Integrations en la vista previa están deshabilitadas por defecto, pero se pueden habilitar individualmente:

- Propiedad del sistema: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Compatibilidad con marcos web {#web-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos web.

**El rastreo de marcos web proporciona:**

- Medición del tiempo de la solicitud HTTP a la respuesta
- etiquetas para la solicitud HTTP (código de estado, método, etc.)
- captura de errores y stacktrace
- vinculación del trabajo creado dentro de una solicitud web y Distributed Tracing

| Servidor                  | Versiones     | Tipo de soporte                                           | Nombres de instrumentación (utilizados para configuración)             |
|-------------------------|--------------|--------------------------------------------------------|------------------------------------------------------------|
| Servidor Akka-Http        | 10.0+        | Totalmente soportado                                        | `akka-http`, `akka-http-server`                            |
| Apache Pekko            | 1.0+         | Totalmente soportado                                        | `pekko-http`, `pekko-http-server`                          |
| Finatra Web             | 2.9+         | Totalmente soportado                                        | `finatra`                                                  |
| Grizzly                 | 2.0+         | Totalmente soportado                                        | `grizzly`                                                  |
| Grizzly-HTTP            | 2.3.20+      | Totalmente soportado                                        | `grizzly-filterchain`                                      |
| Compatible con Java Servlet | 2.3+, 3.0+   | Totalmente soportado                                        | `servlet`, `servlet-2`, `servlet-3`                        |
| Anotaciones Jax-RS      | JSR311-API   | Totalmente soportado                                        | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter`   |
| Jetty                   | 7.0-12.x     | Totalmente soportado                                        | `jetty`                                                    |
| Servidor HTTP de Micronaut   | 2.x+         | Totalmente Soportado                                        | `micronaut`                                                |
| Mulesoft                | 4.5.0+       | Totalmente Soportado                                        | `mule`                                                     |
| Servidor HTTP de Netty       | 3.8+         | Totalmente Soportado                                        | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`             |
| Play                    | 2.3-2.8      | Totalmente Soportado                                        | `play`, `play-action`                                      |
| Ratpack                 | 1.5+         | Totalmente Soportado                                        | `ratpack`                                                  |
| Servidor HTTP de Restlet     | 2.2 - 2.4    | Totalmente Soportado                                        | `restlet-http`.                                            |
| Spark Java              | 2.3+         | [vista previa](#framework-integrations-disabled-by-default) | `sparkjava` (requiere `jetty`)                             |
| Spring Boot             | 1.5+         | Totalmente Soportado                                        | `spring-web` o `spring-webflux`                           |
| Spring Web (MVC)        | 4.0+         | Totalmente Soportado                                        | `spring-web`                                               |
| Spring WebFlux          | 5.0+         | Totalmente Soportado                                        | `spring-webflux`                                           |
| Tomcat                  | 5.5+         | Totalmente Soportado                                        | `tomcat`                                                   |
| Undertow                | 2.0+         | Totalmente Soportado                                        | `undertow`                                                 |
| Vert.x                  | 3.4 - 5.x    | Totalmente Soportado                                        | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`, `vertx-5.0`|
| Websocket (JSR356)      | 1.0+         | [vista previa](#framework-integrations-disabled-by-default) | `websocket`                                                |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como Websphere, Weblogic y JBoss.
Además, frameworks como Spring Boot (versión 3) funcionan inherentemente porque generalmente utilizan un servidor de aplicaciones embebido soportado, como Tomcat, Jetty o Netty.

### Framework Integrations Desactivadas por Defecto {#framework-integrations-disabled-by-default}

Las siguientes instrumentaciones están desactivadas por defecto y se pueden habilitar con las siguientes configuraciones:

| Instrumentación              | Para Habilitar 									                                                                              |
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
| Conexión URL                | `-Ddd.integration.urlconnection.enabled=true` </br> `-Ddd.integration.httpurlconnection.enabled=true`    |
| Websocket                    | `-Ddd.trace.websocket.messages.enabled=true`                                                             |
| ZIO                          | `-Ddd.integration.zio.experimental.enabled=true`                                                         |


**Nota**: La integración JAX-WS instrumenta puntos de conexión anotados con @WebService (JAX-WS 1.x) y @WebServiceProvider (JAX-WS 2.x).

¿No ve los frameworks web que desea? Datadog está continuamente agregando soporte adicional. Contacte a [Datadog support][2] si necesita ayuda.

### Compatibilidad del networking framework {#networking-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos de trabajo de red.

**El rastreo de red proporciona:**

- tiempo entre solicitud y respuesta
- etiquetas para la solicitud (por ejemplo, código de respuesta)
- captura de errores y trazas de pila
- rastreo distribuido

| Marco de trabajo                          | Versiones    | Tipo de Soporte                                           | Nombres de Instrumentación (utilizados para configuración)          |
|------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------------------|
| Cliente HTTP de Apache                 | 4.0+        | Totalmente Soportado                                        | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Cliente HTTP Asíncrono de Apache           | 4.0+        | Totalmente Soportado                                        | `httpasyncclient`, `apache-httpasyncclient`             |
| AWS Java SDK                       | 1.11+, 2.2+ | Totalmente Soportado                                        | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0+     | Vista Previa                                                | [opentelemetry-1][5]                                    |
| Cliente HTTP de Commons                | 2.0+        | Totalmente Soportado                                        | `commons-http-client`                                   |
| Cliente HTTP de Google                 | 1.19.0+     | Totalmente Soportado                                        | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0+    | Totalmente Soportado                                        | `google-pubsub`                                         |
| Cliente HTTP de Grizzly                | 1.9+        | [Vista Previa](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5+        | Totalmente Soportado                                        | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | todo         | Totalmente Soportado                                        | `httpurlconnection`, `urlconnection`                    |
| Kafka-Clients                      | 0.11+       | Totalmente Soportado                                        | `kafka`                                                 |
| Kafka-Streams                      | 0.11+       | Totalmente Soportado                                        | `kafka`, `kafka-streams`                                |
| Java RMI                           | todo         | El rastreo distribuido no está soportado                      | `rmi`, `rmi-client`, `rmi-server`                       |
| Jax RS Clients                     | 2.0+        | Totalmente Soportado                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Jersey Client                      | 1.9-2.29    | Totalmente Soportado                                        | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0+      | Totalmente Soportado                                        | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Netty HTTP Client                  | 4.0+        | Totalmente Soportado                                        | `netty`, `netty-4.0`, `netty-4.1`                       |
| Ning HTTP Client                   | 1.9.0+      | [Vista Previa](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2+        | Totalmente soportado                                        | `okhttp`, `okhttp-2`, `okhttp-3`                         |
| Play WSClient                      | 1.0+        | Totalmente soportado                                        | `play-ws`                                               |
| Rabbit AMQP                        | 2.7+        | Totalmente soportado                                        | `amqp`, `rabbitmq`                                      |
| SOFA RPC                           | 5.0+        | Totalmente soportado                                        | `sofarpc`                                               |
| Spring SessionAwareMessageListener | 3.1+        | Totalmente soportado                                        | `spring-jms-3.1`                                        |
| Spring WebClient                   | 5.0+        | Totalmente soportado                                        | `spring-webflux`, `spring-webflux-client`               |

**Kafka Note**: La integración de Kafka de Datadog funciona con la versión de Kafka `0.11+`, que soporta la Header API. Esta API se utiliza para inyectar y extraer el contexto de traza. Si está ejecutando un entorno de versiones mixtas, el broker de Kafka puede informar incorrectamente la versión más nueva de Kafka. Esto causa un problema cuando el SDK intenta inyectar encabezados que no son soportados por el productor local. Además, los consumidores más antiguos no pueden consumir el mensaje debido a la presencia de encabezados. Para prevenir estos problemas, si está ejecutando un entorno de Kafka de versiones mixtas con versiones anteriores a 0.11, desactive la propagación de contexto con la variable de entorno: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**Nota de JMS**: La integración de JMS de Datadog agrega y lee automáticamente las propiedades del objeto de mensaje `x__dash__datadog__dash__trace__dash__id` y `x__dash__datadog__dash__parent__dash__id` para mantener la propagación del contexto entre los servicios de consumidor y productor.

**Camel Note**: La propagación del rastreo distribuido a través de rutas de Camel no es compatible.

**Nota de SOFA RPC**: La integración de SOFA RPC de Datadog admite los protocolos de transporte Bolt, Triple y REST. Triple utiliza transporte gRPC; el rastreo distribuido para las llamadas de Triple requiere que la `grpc` integración permanezca habilitada.

¿No ve el marco de red que desea? Datadog está continuamente agregando soporte adicional. Contacte a [soporte de Datadog][2] si necesita ayuda.

### Compatibilidad con Datastore {#data-store-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos/drivers de bases de datos.

**El rastreo de Datastore proporciona:**

- tiempo entre solicitud y respuesta
- información de consulta (por ejemplo, una cadena de consulta sanitizada)
- captura de errores y trazas de pila

| Base de datos                | Versiones | Tipo de soporte    | Nombres de instrumentación (utilizados para la configuración)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0+     | Totalmente soportado | `aerospike`                                                                                |
| Couchbase               | 2.0+     | Totalmente soportado | `couchbase`                                                                                |
| Cassandra               | 3.0+     | Totalmente soportado | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0+     | Totalmente soportado | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (elige uno) |
| Elasticsearch Rest      | 5.0+     | Totalmente soportado | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (elige uno)             |
| Ignite                  | 2.0-3.0  | [Vista Previa](#framework-integrations-disabled-by-default) | `ignite`                                            |
| JDBC                    | N/A      | Totalmente soportado | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4+     | Totalmente soportado | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0+     | Totalmente soportado | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0+ | Totalmente soportado | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | Totalmente soportado | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | Totalmente soportado | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5+     | Totalmente soportado | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x-3.x  | Totalmente soportado | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12+    | Totalmente soportado | `spymemcached`                                                                             |
| Vert.x Cassandra Client | 3.9-4.x  | Totalmente soportado | `cassandra`																			                                                             |
| Vert.x Redis Client     | 3.9-4.x  | Totalmente soportado | `vertx-redis-client`                                                                       |
| Vert.x MySQL Client     | 3.9-4.x  | Totalmente soportado | `vertx-sql-client`																		                                                       |

**Nota**: Redis 6.0+ soporta autenticación en línea en comandos como `HELLO`, `MIGRATE`, y `ACL SETUSER`.

  - **Datadog Trace Agent**: La versión mínima requerida y recomendada es `7.76.1` para asegurar que los parámetros de autenticación se ofusquen automáticamente en los metadatos de trazas.
  - **Datadog Lambda Extension** (Serverless environments): La versión mínima requerida es `v28.0.0`.

`dd-java-agent` también es compatible con drivers JDBC comunes, incluyendo:

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

### Integraciones de base de datos deshabilitadas por defecto {#database-integrations-disabled-by-default}

Las siguientes instrumentaciones están desactivadas por defecto y se pueden habilitar con la siguiente configuración:

| Instrumentación   | Para habilitar 									                             |
|-------------------|-------------------------------------------------|
| JDBC-Datasource		 | - Propiedad del sistema: `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - Variable de entorno: `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

¿No ve sus almacenes de datos deseados? Datadog está continuamente agregando soporte adicional. Contacte a [soporte de Datadog][2] si necesita ayuda.

### Compatibilidad adicional con frameworks {#additional-framework-compatibility}

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes frameworks.

| Framework           | Versiones         | Tipo de soporte                                           | Nombres de instrumentación (utilizados para configuración) |
|---------------------|------------------|--------------------------------------------------------|------------------------------------------------|
| Apache CXF (Jax-WS) | 3.0+             | [Extensión OpenTelemetry][10]                          | `cxf`                                          |
| Datanucleus JDO     | 4.0+             | Totalmente Compatible                                        | `datanucleus`                                  |
| Dropwizard Views    | 0.7+             | Totalmente Compatible                                        | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0+            | Totalmente Compatible                                        | `graphql-java`                                 |
| Hazelcast (cliente)  | 3.6+             | [Vista Previa](#framework-integrations-disabled-by-default) | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5+             | Totalmente Compatible                                        | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4+             | Totalmente Compatible                                        | `hystrix`                                      |
| Renderizado JSP     | 2.3+             | Totalmente Compatible                                        | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1+, 5.3+       | Totalmente Compatible                                        | `junit`, `junit-4`, `junit-5`                  |
| Corutinas de Kotlin  | 1.3+             | Totalmente Compatible                                        | `kotlin_coroutine`                             |
| Project Reactor     | 3.1+             | Totalmente Compatible                                        | `reactor-core`                                 |
| Quartz              | 2.x              | Totalmente Compatible                                        | `quartz`                                       |
| RxJava              | 2.x              | Totalmente Compatible                                        | `rxjava`                                       |
| Spring Data         | 1.8+             | Totalmente Compatible                                        | `spring-data`                                  |
| Spring Scheduling   | 3.1+             | Totalmente Compatible                                        | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 - 6.11.0  | [Vista Previa](#framework-integrations-disabled-by-default) | `tibco`, `tibco_bw`                            |
| Twilio SDK          | < 8.0            | Totalmente Compatible                                        | `twilio-sdk`                                   |

¿No encuentra los frameworks deseados? Datadog está continuamente agregando soporte adicional. Para solicitar un framework, contacte a nuestro excelente [equipo de soporte][2].

Para mejorar la visibilidad en aplicaciones que utilizan frameworks no soportados, considere:

- [Agregar instrumentación personalizada][3].
- [Enviar un pull request][4] con instrumentación para su inclusión en una futura versión.
- Contacte a [soporte de Datadog][2] y envíe una solicitud de funcionalidad.

### Deshabilitando integraciones {#disabling-integrations}

La mayoría de las integraciones están habilitadas por defecto. La siguiente configuración puede cambiar el valor predeterminado a deshabilitado.

- Propiedad del sistema: `-Ddd.integrations.enabled=false`
- Variable de entorno: `DD_INTEGRATIONS_ENABLED=false`

Las integraciones pueden ser habilitadas o deshabilitadas individualmente (sobrescribiendo el valor predeterminado anterior).

- Propiedad del sistema: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(Consulte arriba el nombre de cada una de las integraciones.)

### Problemas conocidos {#known-issues}

- No se admite la ejecución del rastreador de Java en Bitbucket.
- Cargar múltiples Agentes de Java que realicen funciones de APM/rastreo no es una configuración recomendada ni admitida.
- Al ejecutar el SDK con Java 24+, puede ver advertencias relacionadas con el acceso nativo de JNI. Suprima estas advertencias agregando el `--enable-native-access=ALL-UNNAMED` indicador. Consulte [JEP 472][13] para más información.

## Soporte de carga y enlace de clases anticipadas (AOT) {#ahead-of-time-aot-class-loading-linking-support}

Para mejorar el tiempo de inicio, la carga y enlace de clases anticipadas (AOT) hace que las clases de la aplicación estén instantáneamente disponibles en un estado cargado y enlazado cuando se inicia la JVM. Consulte [JEP 483][14] y [JEP 514][15] para más información.

### Requisitos {#requirements}

Usar:

- Java 25 o posterior
- [Datadog Java SDK][1] 1.57.0 o posterior

### Configuración {#setup}

Para configurar la carga y vinculación de clases AOT para APM, agregue el Datadog Java SDK durante la ejecución de entrenamiento:

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCacheOutput=app.aot -jar App.jar
```

#### Uso {#usage}

Durante la producción, agregue el mismo Datadog Java SDK junto con los datos de entrenamiento previamente almacenados en caché:

```shell
java -javaagent:/path/to/dd-java-agent.jar -XX:AOTCache=app.aot -jar App.jar
```

Puede ver trazas utilizando el [Trace Explorer][9].

{{% collapse-content title="Resolución de problemas" level="h4" %}}
##### No adjuntar el Datadog Java SDK durante la ejecución de entrenamiento {#not-attaching-the-datadog-java-sdk-during-the-training-run}

Si ve esta advertencia en producción, significa que el Datadog Java SDK no fue adjuntado durante el entrenamiento:

```
Mismatched values for property jdk.module.addmods: java.instrument specified during runtime but not during dump time
```
La JVM no puede utilizar la caché AOT para mejorar el tiempo de inicio. La solución es adjuntar el Datadog Java SDK durante el entrenamiento.

{{% /collapse-content %}}

## Soporte para GraalVM Native Image {#graalvm-native-image-support}

GraalVM Native Image es una tecnología que permite compilar aplicaciones Java en ejecutables nativos. El Datadog Java SDK es compatible con GraalVM Native Image. Esto le permite compilar sus aplicaciones en ejecutables nativos mientras sigue beneficiándose de las capacidades de trazado que ofrece la biblioteca.

### Requisitos {#requirements-1}

Usar:

- [GraalVM JDK 21 o JDK 25][7]
- [Datadog Java SDK][1]

### Configuración {#setup-1}

{{< tabs >}}
{{% tab "GraalVM" %}}
Para configurar el Datadog Java SDK con GraalVM Native Image, siga estos pasos:

1. Instrumente su aplicación, siguiendo los pasos descritos en [Tracing Java Applications][6].
2. Cuando construya un ejecutable nativo con el comando `native-image`, agregue el argumento `-J-javaagent:/path/to/dd-java-agent.jar`. Por ejemplo:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Opcional) Habilite la integración del perfilador agregando el siguiente argumento:
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Para versiones del tracer anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Para configurar el Datadog Java SDK con Quarkus Native, siga estos pasos:

1. Instrumente su aplicación, siguiendo los pasos descritos en [Tracing Java Applications][6].
2. Cuando construya un ejecutable nativo, utilice la propiedad `quarkus.native.additional-build-args`. Por ejemplo:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Opcional) Habilite la integración del perfilador agregando el siguiente argumento:
`-J-Ddd.profiling.enabled=true --enable-monitoring=jfr`.
   - Para versiones del tracer anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Para configurar el Datadog Java SDK con Spring Native, siga estos pasos:

1. Instrumente su aplicación, siguiendo los pasos descritos en [Tracing Java Applications][6].
2. Para compilaciones de Spring Native basadas en Buildpacks, habilite el [Paketo Buildpack for Datadog][8] usando `BP_DATADOG_ENABLED=true`.
    - Puede hacer esto a nivel de herramienta de construcción, como Maven:
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
3. (Opcional) Habilite la integración del perfilador configurando la variable de entorno `BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true --enable-monitoring=jfr’`.
   - Para versiones del tracer anteriores a `1.39.1`, al ejecutar el ejecutable nativo generado, asegúrese de que `DD_PROFILING_START_FORCE_FIRST=true` esté configurado como una variable de entorno.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-info">Para GraalVM 25, puede ver errores relacionados con <code>Use of Unsafe</code>. Agregue <code>-Dnet.bytebuddy.safe=false</code> al construir el ejecutable nativo para abordar esto.</div>

#### Uso {#usage-1}

Después de completar la configuración, el servicio debería enviar trazas a Datadog.

Puede visualizar trazas utilizando el [Trace Explorer][9].

{{% collapse-content title="Resolución de problemas" level="h4" %}}
##### Las características no están habilitadas o configuradas correctamente para imágenes nativas {#features-are-not-enabled-or-configured-correctly-for-native-images}

Existen problemas conocidos al acceder a propiedades del sistema en tiempo de ejecución desde un binario construido con Graal Native Image.

- Para la configuración en tiempo de ejecución, use variables de entorno (`DD_PROPERTY_NAME=value`), en lugar de propiedades del sistema (`-Ddd.property.name=value`).
- La excepción a esta regla es al habilitar el perfilador. En este caso, pase `-J-Ddd.profiling.enabled=true` a la herramienta `native-image` en _tiempo de construcción_.

##### Las versiones del buildpack de imagen nativa anteriores a 5.12.2 {#native-image-buildpack-versions-older-than-5122}

Las versiones más antiguas del buildpack de imagen nativa exponen la siguiente opción: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

Cuando esta opción es `false`, pueden ocurrir excepciones como las siguientes:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError:
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException:
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap
as this class should be initialized at image runtime. To see how this object got
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Las soluciones a este problema son:

- Establezca `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explícitamente en verdadero en la configuración de env de la imagen,
- O actualice el buildpack `native-image` a la versión 5.12.2 o posterior. La mejor manera de hacer esto es actualizando el buildpack `java-native-image` a la versión 8.13.0 o posterior.

##### Buildpack de Paketo para versiones de Datadog anteriores a 4.6.0 {#paketo-buildpack-for-datadog-versions-older-than-460}

El buildpack de Paketo para Datadog tenía un error en versiones anteriores que se materializó con el siguiente mensaje de error:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

La solución a este problema es actualizar a la versión 4.6.0 o posterior.

##### La compilación de Spring Native se bloquea con el error exec.d/toggle {#spring-native-build-crashes-with-execdtoggle-error}

Puede encontrar un error similar al anterior, incluso en versiones de buildpack más recientes que 4.6.0, al construir una imagen nativa de Spring Boot:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

Esto ocurre típicamente porque el buildpack de Datadog se ejecuta antes que el buildpack de imagen nativa, por lo que no sabe que se pretende una construcción de imagen nativa. Añade de forma incorrecta un script de alternancia destinado a compilaciones de JVM, que es incompatible con el ejecutable nativo final.

La solución es establecer explícitamente la variable de entorno `BP_NATIVE_IMAGE` en `true` en la configuración de `spring-boot-maven-plugin`. Esto asegura que todos los buildpacks sean conscientes de que es una construcción de imagen nativa desde el principio.

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

Puede encontrar errores de inicialización si su configuración de tracer depende de Unix Domain Sockets (UDS), que no son compatibles con imágenes nativas:

```text
dd.trace 2024-12-30 08:34:43:306 +0000] [main] WARN datadog.trace.agent.tooling.nativeimage.TracerActivation - Problem activating datadog tracer
java.lang.NoClassDefFoundError: Could not initialize class jnr.unixsocket.UnixSocketChannel
```

La solución es configurar el tracer de Java para usar comunicación basada en servidor (`hostip` o `service` modo), en lugar de comunicación basada en socket (`socket` modo).

Para más información, consulte [Configurar el modo de comunicación APM y DogstatsD][11]. Para configuraciones que no dependen del Admission Controller, consulte la documentación de [DD_TRACE_AGENT_URL][12].

{{% /collapse-content %}}

## Más información {#further-reading}

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