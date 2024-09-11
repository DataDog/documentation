---
aliases:
- /es/tracing/compatibility_requirements/
- /es/tracing/compatibility_requirements/java
- /es/tracing/setup_overview/compatibility_requirements/java
code_lang: java
code_lang_weight: 0
description: 'Requisitos de compatibilidad del rastreador Java '
further_reading:
- link: tracing/trace_collection/dd_libraries/java
  tag: Documentación
  text: Instrumentación de tu aplicación
title: Requisitos de compatibilidad Java
type: lenguaje de código múltiple
---

## Compatibilidad

La biblioteca de rastreo Datadog Java es de código abierto. Para obtener más información, consulta el [repositorio GitHub][1].

### Tiempos de ejecución compatibles Java 

El rastreador Java es compatible con la instrumentación automática para los siguientes tiempos de ejecución Oracle JDK, OpenJDK JVM, y [GraalVM](#graalvm-native-image-support).

#### Rastreador Java v1 (última versión)

<table>
  <thead>
    <th>Versiones de Java
    <th>Sistemas operativos</th>
    <th>Nivel de soporte</th>
  </thead>
  <tr>
    <td>desde 22 en adelante</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
  <tr>
    <td>desde 18 a 21</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64, arm64)<br>Mac (x86, x86-64, arm64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td rowspan="2">desde 8 a 17</td>
    <td>Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)</td>
    <td><a href="#levels-of-support">GA</a></td>
  </tr>
  <tr>
    <td>Linux (arm64)<br>Mac (arm64)</td>
    <td><a href="#levels-of-support">Beta</a></td>
  </tr>
</table>

Datadog no ofrece soporte oficial para ninguna versión de acceso anticipado de Java.

#### Rastreador Java v0 (mantenimiento)

| Versiones de Java      | Sistemas operativos                                                               | Nivel de soporte                     |
|--------------------|---------------------------------------------------------------------------------|-----------------------------------|
| Sólo 7             | Windows (x86, x86-64)<br>Linux (x86, x86-64)<br>Mac (x86, x86-64)               | [Mantenimiento](#levels-of-support) |
| Sólo 7             | Linux (arm64)<br>Mac (arm64)                                                    | [Fin de vida útil](#levels-of-support) |

### Niveles de soporte

| **Nivel**                                              | **Soporte proporcionado**                                                                                                                                |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Sin soporte      |  Sin implementación. Por solicitudes especiales, ponte en contacto con el [servicio de asistencia de Datadog][2].                                                                              |
| <span id="support-beta">Beta</span>                    |  Implementación inicial. Puede que aún no contenga todas las funciones. La compatibilidad con las nuevas funciones y la corrección de errores y problemas de seguridad se realiza en la medida de lo posible. |
| <span id="support-ga">Disponibilidad general (GA)</span> |  Implementación completa de todas las funciones. Soporte completo para nuevas funciones y correcciones de errores y problemas de seguridad.                                                     |
| <span id="support-maintenance">Mantenimiento</span>      |  Implementación completa de las funciones existentes. No recibe nuevas funciones. Soporte sólo para correcciones de errores y problemas de seguridad.                                  |
| <span id="support-eol">Fin de vida útil (EOL)</span>        |  Sin soporte.                                                                                                                                        |

## Integraciones

Las integraciones Beta están deshabilitadas por defecto, pero pueden habilitarse individualmente:

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

### Compatibilidad con marcos web

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos web.

**El rastreo de marcos web proporciona:**

- temporización de solicitud a respuesta HTTP
- etiquetas (tags) para la solicitud HTTP (código de estado, método, etc.)
- captura de errores y trazas de stacks tecnológicos
- vinculación del trabajo creado dentro de una solicitud web y rastreo distribuido

| Servidor                  | Versiones   | Tipo de soporte                                        | Nombres de instrumentaciones (utilizados para la configuración)           |
|-------------------------|------------|-----------------------------------------------------|----------------------------------------------------------|
| Servidor Akka-Http        | 10.0 o posterior      | Totalmente compatible                                     | `akka-http`, `akka-http-server`                          |
| Finatra Web             | 2.9 o posterior       | Totalmente compatible                                     | `finatra`                                                |
| Grizzly                 | 2.0 o posterior       | Totalmente compatible                                     | `grizzly`                                                |
| Grizzly-HTTP            | 2.3.20 o posterior    | Totalmente compatible                                     | `grizzly-filterchain`                                    |
| Java Servlet compatible | 2.3, 3.0 o posterior | Totalmente compatible                                     | `servlet`, `servlet-2`, `servlet-3`                      |
| Anotaciones Jax-RS      | JSR311-API | Totalmente compatible                                     | `jax-rs`, `jaxrs`, `jax-rs-annotations`, `jax-rs-filter` |
| Jetty                   | 7.0-12.x   | Totalmente compatible                                     | `jetty`                                                  |
| Servidor HTTP Micronaut   | 2.x        | Totalmente compatible                                     | `micronaut`                                              |
| Mulesoft                | 4          | Totalmente compatible                                     | `mule`                                                   |
| Servidor HTTP Netty       | 3.8 o posterior       | Totalmente compatible                                     | `netty`, `netty-3.8`, `netty-4.0`, `netty-4.1`           |
| Play                    | 2.3-2.8    | Totalmente compatible                                     | `play`, `play-action`                                    |
| Ratpack                 | 1.5 o posterior       | Totalmente compatible                                     | `ratpack`                                                |
| Servidor HTTP Restlet     | 2.2-2.4  | Totalmente compatible                                     | `restlet-http`.                                          |
| Spark Java              | 2.3 o posterior       | [Beta](#framework-integrations-disabled-by-default) | `sparkjava` (requiere `jetty`)                           |
| Spring Boot             | 1.5 o posterior       | Totalmente compatible                                     | `spring-web` o `spring-webflux`                         |
| Spring Web (MVC)        | 4.0 o posterior       | Totalmente compatible                                     | `spring-web`                                             |
| Spring WebFlux          | 5.0 o posterior       | Totalmente compatible                                     | `spring-webflux`                                         |
| Tomcat                  | 5.5 o posterior       | Totalmente compatible                                     | `tomcat`                                                 |
| Vert.x                  | 3.4 o posterior       | Totalmente compatible                                     | `vertx`, `vertx-3.4`, `vertx-3.9`, `vertx-4.0`           |

**Nota**: Muchos servidores de aplicaciones son compatibles con Servlet y están cubiertos automáticamente por esa instrumentación, como Websphere, Weblogic y JBoss.
Además, los marcos como Spring Boot (versión 3) funcionan de forma inherente porque suelen utilizar un servidor de aplicaciones integrado compatible, como Tomcat, Jetty o Netty.

### Integraciones de marcos deshabilitadas por defecto

Las siguientes instrumentaciones están deshabilitadas por defecto y pueden habilitarse con los siguientes parámetros:

| Instrumentación     | Para habilitar                                                                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| JAX-WS                  | `-Ddd.integration.jax-ws.enabled=true`                                                                                                    |
| Mulesoft              | `-Ddd.integration.mule.enabled=true`, `-Ddd.integration.grizzly-client.enabled=true`, `-Ddd.integration.grizzly-filterchain.enabled=true` |
| Grizzly             | `-Ddd.integration.grizzly-client.enabled=true`                                                                                            |
| Grizzly-HTTP        | `-Ddd.integration.grizzly-filterchain.enabled=true`                                                                                       |
| Ning                | `-Ddd.integration.ning.enabled=true`                                                                                                      |
| Spark Java          | `-Ddd.integration.sparkjava.enabled=true`                                                                                                 |
| Hazelcast           | `-Ddd.integration.hazelcast.enabled=true` </br> `-Ddd.integration.hazelcast_legacy.enabled=true`                                          |
| TIBCO BusinessWorks | `-Ddd.integration.tibco.enabled=true`                                                                                                     |


**Nota**: La integración JAX-WS instrumenta endpoints anotados con @WebService (JAX-WS 1.x) y @WebServiceProvider (JAX-WS 2.x).

¿No encuentras el marco web que buscas? Datadog añade continuamente soporte adicional. Si necesitas ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

### Compatibilidad con marcos de red

`dd-java-agent` incluye soporte para rastrear automáticamente las siguientes estructuras de red.

**El rastreo de redes proporciona:**

- temporización de solicitud a respuesta
- etiquetas para la solicitud (por ejemplo, código de respuesta)
- captura de errores y trazas de stacks tecnológicos
- rastreo distribuido

| Marco                          | Versiones    | Tipo de soporte                                        | Nombres de instrumentaciones (utilizados para la configuración)          |
|------------------------------------|-------------|-----------------------------------------------------|---------------------------------------------------------|
| Cliente HTTP Apache                 | 4.0 o posterior        | Totalmente compatible                                     | `httpclient`, `apache-httpclient`, `apache-http-client` |
| Cliente HTTP Async Apache           | 4.0 o posterior        | Totalmente compatible                                     | `httpasyncclient`, `apache-httpasyncclient`             |
| SDK Java AWS                       | 1.11, 2.2 o posterior | Totalmente compatible                                     | `aws-sdk`                                               |
| Camel-OpenTelemetry                | 3.12.0 o posterior     | Beta                                                | [opentelemetry-1][5]                                    |
| Cliente HTTP Commons                | 2.0 o posterior        | Totalmente compatible                                     | `commons-http-client`                                   |
| Cliente HTTP Google                 | 1.19.0 o posterior     | Totalmente compatible                                     | `google-http-client`                                    |
| Google Pub/Sub                     | 1.116.0 o posterior    | Totalmente compatible                                     | `google-pubsub`                                         |
| Cliente HTTP Grizzly                | 1.9 o posterior        | [Beta](#framework-integrations-disabled-by-default) | `grizzly-client`                                        |
| gRPC                               | 1.5 o posterior        | Totalmente compatible                                     | `grpc`, `grpc-client`, `grpc-server`                    |
| HttpURLConnection                  | todos         | Totalmente compatible                                     | `httpurlconnection`, `urlconnection`                    |
| Clientes Kafka                      | 0.11 o posterior       | Totalmente compatible                                     | `kafka`                                                 |
| Flujos Kafka                      | 0.11 o posterior       | Totalmente compatible                                     | `kafka`, `kafka-streams`                                |
| RMI Java                           | todos         | Rastreo distribuido no soportado                   | `rmi`, `rmi-client`, `rmi-server`                       |
| Clientes Jax RS                     | 2.0 o posterior        | Totalmente compatible                                     | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| Cliente Jersey                      | 1.9-2.29    | Totalmente compatible                                     | `jax-rs`, `jaxrs`, `jax-rs-client`                      |
| JMS / Jakarta JMS                  | 1-3.0 o posterior      | Totalmente compatible                                     | `jms`, `jms-1`, `jms-2`, `jakarta-jms`                  |
| Cliente HTTP Netty                  | 4.0 o posterior        | Totalmente compatible                                     | `netty`, `netty-4.0`, `netty-4.1`                       |
| Cliente HTTP Ning                   | 1.9.0 o posterior      | [Beta](#framework-integrations-disabled-by-default) | `ning`                                                  |
| OkHTTP                             | 2.2 o posterior        | Totalmente compatible                                     | `okhttp`, `okhttp-2`,`okhttp-3`                         |
| Cliente Play WS                      | 1.0 o posterior        | Totalmente compatible                                     | `play-ws`                                               |
| Rabbit AMQP                        | 2.7 o posterior        | Totalmente compatible                                     | `amqp`, `rabbitmq`                                      |
| Spring SessionAwareMessageListener | 3.1 o posterior        | Totalmente compatible                                     | `spring-jms-3.1`                                        |
| Cliente Spring Web                   | 5.0 o posterior        | Totalmente compatible                                     | `spring-webflux`, `spring-webflux-client`               |

**Nota de Kafka**: La integración Kafka de Datadog funciona con la versión de Kafka `0.11+`, que soporta la API de cabecera. Esta API se utiliza para inyectar y extraer contextos de rastreo. Si estás ejecutando un entorno de versión mixta, el broker de Kafka podría informar incorrectamente de la versión más reciente de Kafka. Esto causa un problema cuando el rastreador intenta inyectar cabeceras que no son soportadas por el productor local. Además, los consumidores más antiguos no pueden consumir el mensaje debido a la presencia de cabeceras. Para evitar estos problemas, si estás ejecutando un entorno de versión mixta de Kafka con versiones anteriores a la v0.11, deshabilita la propagación de contexto con la variable de entorno: `DD_KAFKA_CLIENT_PROPAGATION_ENABLED=false`.

**Nota de JMS**: La integración JMS de Datadog añade y lee automáticamente propiedades de los objetos de mensajes `x__dash__datadog__dash__trace__dash__id` y `x__dash__datadog__dash__parent__dash__id` para mantener la propagación del contexto entre los servicios del consumidor y el productor.

**Nota de Camel**: No se admite la propagación de rastreo distribuido a través de rutas Camel.

¿No encuentras el marco de red que buscas? Datadog añade continuamente soporte adicional. Si necesitas ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

### Compatibilidad con almacenes de datos

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos/controladores de bases de datos.

**El rastreo del almacén de datos proporciona:**

- temporización de solicitud a respuesta
- información de la consulta (por ejemplo, una cadena de consulta desinfectada)
- captura de errores y trazas de stacks tecnológicos

| Base de datos                | Versiones | Tipo de soporte    | Nombres de instrumentaciones (utilizados para la configuración)                                             |
|-------------------------|----------|-----------------|--------------------------------------------------------------------------------------------|
| Aerospike               | 4.0 o posterior     | Totalmente compatible | `aerospike`                                                                                |
| Couchbase               | 2.0 o posterior     | Totalmente compatible | `couchbase`                                                                                |
| Cassandra               | 3.0 o posterior     | Totalmente compatible | `cassandra`                                                                                |
| Elasticsearch Transport | 2.0 o posterior     | Totalmente compatible | `elasticsearch`, `elasticsearch-transport`, `elasticsearch-transport-{2,5,6,7}` (elige uno) |
| Elasticsearch Rest      | 5.0 o posterior     | Totalmente compatible | `elasticsearch`, `elasticsearch-rest`, `elasticsearch-rest-{5,6,7}` (elige uno)             |
| JDBC                    | N/A      | Totalmente compatible | `jdbc`, `jdbc-datasource`                                                                  |
| Jedis                   | 1.4 o posterior     | Totalmente compatible | `jedis`, `redis`                                                                           |
| Lettuce                 | 4.0 o posterior     | Totalmente compatible | `lettuce`, `lettuce-4-async`, `lettuce-5-rx`                                               |
| MongoDB                 | 3.0-4.0 o posterior | Totalmente compatible | `mongo`                                                                                    |
| OpenSearch Rest         | 1.x-2.x  | Totalmente compatible | `opensearch`, `opensearch-rest`                                                            |
| OpenSearch Transport    | 1.x-2.x  | Totalmente compatible | `opensearch`, `opensearch-transport`                                                       |
| RediScala               | 1.5 o posterior     | Totalmente compatible | `rediscala`, `redis`                                                                       |
| Redisson                | 2.x-3.x  | Totalmente compatible | `redisson`, `redis`                                                                        |
| SpyMemcached            | 2.12 o posterior    | Totalmente compatible | `spymemcached`                                                                             |
| Cliente Vert.x Cassandra | 3.9 o posterior           | Totalmente compatible | `cassandra`                                                                                                                                       |
| Cliente Vert.x Redis     | 3.9      | Totalmente compatible | `vertx-redis-client`                                                                       |
| Cliente MySQL Vert.x     | 3.9 o posterior     | Totalmente compatible | `vertx-sql-client`                                                                                                                            |

`dd-java-agent` también es compatible con los controladores JDBC más comunes, incluidos:

- Apache Derby
- Firebird SQL
- Motor de base de datos H2
- HSQLDB
- IBM DB2
- MariaDB
- MSSQL (Microsoft SQL Server)
- MySQL
- Oracle
- Postgres SQL
- ScalikeJDBC

### Integraciones de bases de datos deshabilitadas por defecto

Las siguientes instrumentaciones están deshabilitadas por defecto y pueden habilitarse con los siguientes parámetros:

| Instrumentación   | Para habilitar                                                                  |
|-------------------|-------------------------------------------------|
| Fuente de datos JDBC        | - System Property: `-Ddd.integration.jdbc-datasource.enabled=true`<br /> - Environment Variable: `DD_INTEGRATION_JDBC_DATASOURCE_ENABLED=true` |

¿No encuentras los almacenes de datos que buscas? Datadog añade continuamente soporte adicional. Si necesitas ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

### Compatibilidad con marcos adicionales

`dd-java-agent` incluye soporte para rastrear automáticamente los siguientes marcos.

| Marco         | Versiones   | Tipo de soporte                                                     | Nombres de instrumentaciones (utilizados para la configuración) |
|-------------------|------------|------------------------------------------------------------------|------------------------------------------------|
| Datanucleus JDO     | 4.0 o posterior       | Totalmente compatible                                                  | `datanucleus`                                  |
| Vistas de Dropwizard    | 0.7 o posterior       | Totalmente compatible                                                  | `dropwizard`, `dropwizard-view`                |
| GraphQL             | 14.0 o posterior      | Totalmente compatible                                                  | `graphql-java`                                 |
| Hazelcast           | 3.6 o posterior       | [Beta](#framework-integrations-disabled-by-default)              | `hazelcast`, `hazelcast_legacy`                |
| Hibernate           | 3.5 o posterior       | Totalmente compatible                                                  | `hibernate`, `hibernate-core`                  |
| Hystrix             | 1.4 o posterior       | Totalmente compatible                                                  | `hystrix`                                      |
| Renderizado JSP       | 2.3 o posterior       | Totalmente compatible                                                  | `jsp`, `jsp-render`, `jsp-compile`             |
| JUnit               | 4.1, 5.3 o posterior | Totalmente compatible                                                  | `junit`, `junit-4`, `junit-5`                  |
| Project Reactor     | 3.1 o posterior       | Totalmente compatible                                                  | `reactor-core`                                 |
| Quartz              | 2.x        | Totalmente compatible                                                  | `quartz`                                       |
| RxJava              | 2.x        | Totalmente compatible                                                  | `rxjava`                                       |
| Datos de Spring         | 1.8 o posterior       | Totalmente compatible                                                  | `spring-data`                                  |
| Programación de Spring   | 3.1 o posterior       | Totalmente compatible                                                  | `spring-scheduling`                            |
| TIBCO BusinessWorks | 5.14.0 o posterior    | [Beta](#framework-integrations-disabled-by-default)              | `tibco`, `tibco_bw`                            |
| SDK de Twilio          | Anterior a 8.0      | Totalmente compatible                                                  | `twilio-sdk`                                   |

¿No encuentras el marco que buscas? Datadog está añadiendo soporte continuamente. Para solicitar un marco, ponte en contacto con nuestro magnífico [equipo de asistencia][2].

Para mejorar la visibilidad de las aplicaciones que utilizan marcos no soportados, considera:

- [Añadir una instrumentación][3].
- [Enviar una solicitud pull][4] con instrumentación para su inclusión en una futura versión.
- Ponerte en contacto con el [servicio de asistencia de Datadog][2] y solicitar una función.

### Deshabilitación de integraciones

La mayoría de las integraciones están habilitadas por defecto. La siguiente configuración puede cambiar el valor predeterminado a deshabilitado.

- System Property: `-Ddd.integrations.enabled=false`
- Variable de entorno: `DD_INTEGRATIONS_ENABLED=false`

Las integraciones pueden habilitarse o deshabilitarse individualmente (anulando el valor predeterminado anterior).

- System Property: `-Ddd.integration.<INTEGRATION_NAME>.enabled=true`
- Variable de entorno: `DD_INTEGRATION_<INTEGRATION_NAME>_ENABLED=true`

(Consulta más arriba el nombre de cada integración.)

### Problemas conocidos

- La ejecución del rastreador Java en Bitbucket no es compatible.
- La carga de varios Agents Java que realizan funciones de APM/rastreo no es una configuración recomendada o compatible.

## Soporte de GraalVM Native Image

GraalVM Native Image es una tecnología que permite compilar aplicaciones Java en ejecutables nativos. El rastreador Java de Datadog es compatible con GraalVM Native Image. Esto te permite compilar tus aplicaciones en ejecutables nativos y seguir disfrutando de las capacidades de rastreo que ofrece la biblioteca.

### Requisitos

Utiliza las últimas versiones de:

- [GraalVM][7]
- [Rastreador Java de Datadog][1]

### Configuración

{{< tabs >}}
{{% tab "GraalVM" %}}
Para configurar el rastreador Java de Datadog con GraalVM Native Image, sigue los pasos a continuación:

1. Instrumenta tu aplicación, siguiendo los pasos descritos en [Rastreo de aplicaciones Java][6].
2. Cuando crees un ejecutable nativo con el comando `native-image`, añade el argumento `-J-javaagent:/path/to/dd-java-agent.jar`. Por ejemplo:
   ```shell
   native-image -J-javaagent:/path/to/dd-java-agent.jar -jar App.jar
   ```
3. (Opcional) Habilita la integración del generador de perfiles añadiendo el siguiente argumento:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Quarkus Native" %}}
Para configurar el rastreador Java de Datadog con Quarkus Native, sigue los pasos a continuación:

1. Instrumenta tu aplicación, siguiendo los pasos descritos en [Rastreo de aplicaciones Java][6].
2. Cuando crees un ejecutable nativo, utiliza la propiedad `quarkus.native.additional-build-args`. Por ejemplo:
   ```shell
   ./mvnw package -Dnative -Dquarkus.native.additional-build-args='-J-javaagent:/path/to/dd-java-agent.jar'
   ```
3. (Opcional) Habilita la integración del generador de perfiles añadiendo el siguiente argumento:
`-J-Ddd.profiling.enabled=true –enable-monitoring=jfr`.

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
{{% /tab %}}

{{% tab "Spring Native" %}}
Para configurar el rastreador Java de Datadog con Spring Native, sigue los pasos a continuación:

1. Instrumenta tu aplicación, siguiendo los pasos descritos en [Rastreo de aplicaciones Java][6].
2. Para compilaciones de Spring Native basadas en paquetes de compilación, activa el [paquete de compilación Paketo para Datadog][8] utilizando `BP_DATADOG_ENABLED=true`.
   - Puedes hacerlo a nivel de la herramienta de compilación, como Maven:
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
   - También puedes utilizar el comando `pack build` con la opción `--env BP_DATADOG_ENABLED=true` para habilitar el paquete de compilación Datadog.
3. (Opcional) Habilita la integración del generador de perfiles configurando la siguiente variable de entorno:`BP_NATIVE_IMAGE_BUILD_ARGUMENTS=’-J-Ddd.profiling.enabled=true –enable-monitoring=jfr’` .

[6]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
[8]: https://github.com/paketo-buildpacks/datadog
{{% /tab %}}

{{< /tabs >}}

#### Uso

Una vez completada la configuración, el servicio debería enviar trazas (traces) a Datadog.

Puedes visualizar las trazas (traces) a través del [Explorador de trazas][9].

{{% collapse-content title="Troubleshooting" level="h4" %}}
##### Versiones del paquete de compilación Native-Image anteriores a la v5.12.2

Las versiones más antiguas del paquete de compilación Native-Image muestran la siguiente opción: `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM`.

Cuando esta opción es `false`, pueden ocurrir excepciones como las siguientes:

```text
Caused by: org.graalvm.compiler.java.BytecodeParser$BytecodeParserError: 
com.oracle.graal.pointsto.constraints.UnsupportedFeatureException: 
No instances of datadog.trace.bootstrap.DatadogClassLoader are allowed in the image heap 
as this class should be initialized at image runtime. To see how this object got 
instantiated use --trace-object-instantiation=datadog.trace.bootstrap.DatadogClassLoader.
```

Las soluciones a este problema son:

- Configurar `USE_NATIVE_IMAGE_JAVA_PLATFORM_MODULE_SYSTEM` explícitamente como true (verdadero) en la configuración del entorno de la imagen.
- O actualizar el paquete de compilación `native-image` a la versión 5.12.2 o superior. La mejor opción es actualizar el paquete de compilación `java-native-image` a la versión 8.13.0 o superior.

##### Paquete de compilación Paketo para versiones de Datadog anteriores a la v4.6.0

El paquete de compilación Paketo para Datadog tenía un error en versiones anteriores que se ponía en evidencia a través del siguiente mensaje de error:

```text
disabling Datadog at launch time is unsupported for Node
ERROR: failed to launch: exec.d: failed to execute exec.d file at path '/layers
paketo-buildpacks_datadog/helper/exec.d/toggle': exit status 1
```

La solución a este problema es actualizar a la versión 4.6.0 o superior.

{{% /collapse-content %}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java
[2]: https://www.datadoghq.com/support/
[3]: /es/tracing/manual_instrumentation/java
[4]: https://github.com/DataDog/documentation#outside-contributors
[5]: /es/tracing/trace_collection/otel_instrumentation/java/
[7]: https://www.graalvm.org/downloads/
[9]: /es/tracing/trace_explorer/