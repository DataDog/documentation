---
aliases:
- /es/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprende más sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus registros
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realiza análisis de registros
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentación
  text: Conecta registros y trazas
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: PREGUNTAS FRECUENTES
  text: Guía de solución de problemas de recolección de registros
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: Blog
  text: Cómo recolectar, personalizar y estandarizar registros de Java
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "seguimiento de las últimas líneas"
title: Recolección de registros de Java
---
Para enviar tus registros a Datadog, registra en un archivo y haz el seguimiento de las últimas líneas [tail][1] de ese archivo con tu Datadog Agent.

Las trazas de pila de los registros típicos de Java se dividen en múltiples líneas, lo que dificulta asociarlas al evento de registro original. Por ejemplo:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Para abordar este problema, configura tu biblioteca de registro para producir tus registros en formato JSON. Al registrar en JSON, tú:

* Asegúrate de que la traza de pila esté correctamente envuelta en el evento de registro.
* Asegúrate de que todos los atributos del evento de registro (como severidad, nombre del registrador y nombre del hilo) estén correctamente extraídos.
* Obtén acceso a los atributos del [Contexto de Diagnóstico Mapeado (MDC)][2], que puedes adjuntar a cualquier evento de registro.
* Evita la necesidad de [reglas de análisis personalizadas][3].

Las siguientes instrucciones muestran ejemplos de configuración para las bibliotecas de registro Log4j, Log4j 2 y Logback.

## Configura tu registrador {#configure-your-logger}

### Formato JSON {#json-format}

{{< tabs >}}
{{% tab "Log4j" %}}

Para Log4j, registra en formato JSON utilizando el módulo SLF4J [log4j-over-slf4j][1] combinado con Logback. `log4j-over-slf4j` reemplaza limpiamente a Log4j en tu aplicación, por lo que no necesitas hacer ningún cambio en el código.

1. En tu archivo `pom.xml`, reemplaza la dependencia `log4j.jar` con una dependencia `log4j-over-slf4j.jar`, y agrega las dependencias de Logback. Por ejemplo:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configura un appender utilizando el diseño JSON en `logback.xml`. Consulta los siguientes ejemplos de configuraciones para archivo y consola.

    Para archivo:

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

    For console:

    ```xml
    <configuration>
      <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
          <encoder class="ch.qos.logback.classic.encoder.JsonEncoder"/>
      </appender>

      <root>
        <level value="DEBUG"/>
          <appender-ref ref="CONSOLE"/>
        </root>
    </configuration>
    ```

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
{{% /tab %}}
{{% tab "Log4j 2" %}}

Log4j 2 incluye un diseño JSON.

1. Configura un appender utilizando el diseño JSON en `log4j2.xml`. Consulta los siguientes ejemplos de configuraciones para el appender de archivo y consola. Para una descripción completa de los plugins de Log4j, consulta la [referencia de plugins de Log4j][1].
{{% collapse-content title="Appender de archivo" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml"  >}}
<?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <File name="FILE" fileName="logs/app.log" >
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </File>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="FILE"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Appender de consola" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <Console name="console" target="SYSTEM_OUT">
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </Console>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="console"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

2. Agrega el archivo de plantilla de diseño JSON (como `MyLayout.json`) en el directorio `src/main/resources` de tu proyecto Java. Por ejemplo:
    ```json
    {
       "timestamp":{
          "$resolver":"timestamp",
          "pattern":{
             "format":"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
             "timeZone":"UTC"
          }
       },
       "status":{
          "$resolver":"level",
          "field":"name"
       },
       "thread_name":{
          "$resolver":"thread",
          "field":"name"
       },
       "logger_name":{
          "$resolver":"logger",
          "field":"name"
       },
       "message":{
          "$resolver":"message",
          "stringified":true
       },
       "exception_class":{
          "$resolver":"exception",
          "field":"className"
       },
       "exception_message":{
          "$resolver":"exception",
          "field":"message"
       },
       "stack_trace":{
          "$resolver":"exception",
          "field":"stackTrace",
          "stackTrace":{
             "stringified":true
          }
       },
       "host":"${hostName}",
       "service":"${env:DD_SERVICE}",
       "version":"${env:DD_VERSION}",
       "dd.trace_id":{
          "$resolver":"mdc",
          "key":"dd.trace_id"
       },
       "dd.span_id":{
          "$resolver":"mdc",
          "key":"dd.span_id"
       }
    }
    ```

3. Agrega las dependencias de diseño JSON a tu `pom.xml`. Por ejemplo:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.13.0</version>
    </dependency>
    ```

[1]: https://logging.apache.org/log4j/2.x/plugin-reference.html
{{% /tab %}}
{{% tab "Logback" %}}

Utiliza el [logstash-logback-encoder][1] para registros formateados en JSON en Logback.

1. Configura un appender de archivo utilizando el diseño JSON en `logback.xml`. Por ejemplo:

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

2. Agrega la dependencia del codificador Logstash a tu archivo `pom.xml`. Por ejemplo:

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{% tab "Tinylog" %}}

Crea una configuración de escritor JSON basada en la [documentación oficial de Tinylog][1].


Utiliza el siguiente formato en un archivo `tinylog.properties`:

```properties
writer                     = json
writer.file                = log.json
writer.format              = LDJSON
writer.level               = info
writer.field.level         = level
writer.field.source        = {class}.{method}()
writer.field.message       = {message}
writer.field.dd.trace_id   = {context: dd.trace_id}
writer.field.dd.span_id    = {context: dd.span_id}
writer.field.dd.service    = {context: dd.service}
writer.field.dd.version    = {context: dd.version}
writer.field.dd.env        = {context: dd.env}
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

### Formato en bruto {#raw-format}

{{< tabs >}}
{{% tab "Log4j" %}}

Configura un appender de archivo en `log4j.xml`. Por ejemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </layout>
  </appender>

  <root>
    <priority value="INFO"/>
    <appender-ref ref="FILE"/>
  </root>

</log4j:configuration>
```

{{% /tab %}}
{{% tab "Log4j 2" %}}

Configura un appender de archivo en `log4j2.xml`. Por ejemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </File>
  </Appenders>

  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="FILE"/>
    </Root>
  </Loggers>
</Configuration>
```

{{% /tab %}}
{{% tab "Logback" %}}

Configura un appender de archivo en `logback.xml`. Por ejemplo:

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

Crea una configuración de escritor que envíe a un archivo basada en la [documentación oficial de Tinylog][1].


Utiliza el siguiente formato en un archivo `tinylog.properties`:

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#writer
{{% /tab %}}
{{< /tabs >}}

#### Inyecta ID de traza en tus registros {#inject-trace-ids-into-your-logs}

Si APM está habilitado para esta aplicación, puedes correlacionar registros y trazas habilitando la inyección de ID de traza. Consulta [Conectando Registros y Trazas de Java][4].

Si no estás _correlacionando_ registros y trazas, elimina los marcadores de posición MDC (`%X{dd.trace_id} %X{dd.span_id}`) de los patrones de registro incluidos en los ejemplos de configuración anteriores.

Por ejemplo, si estás utilizando Log4j 2 pero no correlacionando registros y trazas, elimina el siguiente bloque de la plantilla de diseño de registro de ejemplo, `MyLayout.json`:

```json
"dd.trace_id":{
   "$resolver":"mdc",
   "key":"dd.trace_id"
},
"dd.span_id":{
   "$resolver":"mdc",
   "key":"dd.span_id"
}
```


## Configura el Datadog Agent {#configure-the-datadog-agent}

Una vez que [la recolección de registros esté habilitada][5], configura [la recolección de registros personalizada][6] para el seguimiento de las últimas líneas de tus archivos de registro y enviarlos a Datadog.

1. Crea una `java.d/` carpeta en el `conf.d/` [directorio de configuración del Agent][7].
2. Crea un `conf.yaml` archivo en `java.d/` con el siguiente contenido:

    ```yaml
    #Log section
    logs:

      - type: file
        path: "<path_to_your_java_log>.log"
        service: <service_name>
        source: java
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Reinicia el Agent][8].
4. Ejecuta el [subcomando de estado del Agent][9] y busca `java` en la sección {{< ui >}}Checks{{< /ui >}} para confirmar que los registros se han enviado correctamente a Datadog.

Si los registros están en formato JSON, Datadog automáticamente [analiza los mensajes de registro][10] para extraer los atributos de registro. Utiliza el [Explorador de registros][11] para ver y solucionar problemas en tus registros.

## Transmite registros directamente al Agent {#stream-logs-directly-to-the-agent}

En el caso excepcional en que tu aplicación se esté ejecutando en una máquina a la que no se puede acceder o no puede registrar en un archivo, es posible transmitir registros a Datadog o directamente al Agent de Datadog. Esta no es la configuración recomendada, porque requiere que tu aplicación maneje problemas de conexión.

Para transmitir registros directamente a Datadog:

1. Agrega la biblioteca de registro Logback a tu código, o **conecta tu registrador actual a Logback**.
2. **Configura Logback** para enviar registros a Datadog.

### Conecta desde bibliotecas de registro de Java a Logback {#bridge-from-java-logging-libraries-to-logback}

Si aún no estás utilizando Logback, la mayoría de las bibliotecas de registro comunes pueden conectarse a Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Utiliza el módulo SLF4J [log4j-over-slf4j][1] con Logback para enviar registros a otro servidor. `log4j-over-slf4j` reemplaza limpiamente Log4j en tu aplicación para que no tengas que hacer cambios en el código.

1. En tu archivo `pom.xml`, reemplaza la dependencia `log4j.jar` con una dependencia `log4j-over-slf4j.jar`, y agrega las dependencias de Logback. Por ejemplo:
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configura Logback.

**Nota:** Como resultado de este cambio, los archivos de configuración de Log4j ya no serán recogidos. Migra tu `log4j.properties` archivo a `logback.xml` con el [traductor de Log4j][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 permite el registro en un host remoto, pero no ofrece la capacidad de prefijar los registros con una clave API. Debido a esto, utiliza el módulo SLF4J [log4j-over-slf4j][1] y Logback. `log4j-to-slf4j.jar` reemplaza limpiamente Log4j 2 en tu aplicación para que no tengas que hacer ningún cambio en el código. Para usarlo:

1. En tu archivo `pom.xml`, reemplaza la dependencia `log4j.jar` con una dependencia `log4j-over-slf4j.jar`, y agrega las dependencias de Logback. Por ejemplo:
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.9</version>
    </dependency>
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>6.6</version>
    </dependency>

    ```
2. Configura Logback.

**Notas:**

- Asegúrate de que `log4j-slf4j-impl.jar` **no** se utilice como se describe aquí: https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- Como resultado de esta migración, los archivos de configuración de Log4j 2 ya no serán recogidos. Migra tu `log4j.properties` archivo a `logback.xml` con el [traductor de Log4j][2].

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Configura Logback {#configure-logback}
Datadog no admite el envío de registros directamente a través de TCP a la ingesta de Datadog. En su lugar, configura Logback a tu Agente local de Datadog, que luego reenvía los registros a Datadog a través de HTTPS con enriquecimiento automático.

1. [Instala un Agente local de Datadog][12] (v6+ / v7+).
1. Habilita la recolección de registros en `datadog.yaml`, y asegúrate de que el Agente reenvíe los registros a través de HTTPS (HTTPS es el transporte predeterminado para el Agente v6.19+/v7.19+ y posteriores):
   ```
   logs_enabled: true
   logs_config:
     # HTTPS is the default. Keep or set this to force HTTPS forwarding.
     force_use_http: true
     # (Optional) auto-detect multi-line patterns
     auto_multi_line_detection: true
   ```

1. Habilita la recolección de registros en el Agent.
   ```yaml
   # /etc/datadog-agent/conf.d/logback.d/conf.yaml
   logs:
     - type: tcp
       port: 10518           # Port the Agent will listen on
       service: my-java-app  # Your service name (unified service tagging)
       source: java          # Or a more specific source, e.g., "logback"
   ```
1. Reinicia el Agent para aplicar los cambios.
1. Configura Logback para enviar registros al Agent. Utiliza el [logstash-logback-encoder][13] TCP appender en tu `logback.xml` para reenviar registros al Agent:
   ```xml
   <configuration>
     <appender name="DD_TCP_JSON" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
       <destination>localhost:10518</destination>
       <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
         <providers>
           <timestamp/>
           <pattern>
             <pattern>
               {
                 "message": "%message",
                 "level": "%level",
                 "logger": "%logger",
                 "service": "${DD_SERVICE:-my-java-app}",
                 "env": "${DD_ENV:-prod}",
                 "version": "${DD_VERSION:-1.0.0}",
                 "dd.trace_id": "%X{dd.trace_id}",
                 "dd.span_id": "%X{dd.span_id}"
               }
             </pattern>
           </pattern>
           <arguments/>
           <stackTrace/>
         </providers>
       </encoder>
     </appender>
   </configuration>
   ```
   Luego, haz referencia a él en tu logger raíz:
   ```xml
   <root level="INFO">
     <appender-ref ref="DD_TCP_JSON"/>
   </root>
   ```

1. Verifica el reenvío de registros. Ejecuta `datadog-agent status` para confirmar tu TCP listener y revisa el Logs Explorer en busca de entradas etiquetadas con tu servicio.

## Obteniendo más {#getting-further}

Enriquece tus eventos de registro con atributos contextuales.

### Usando el analizador de clave-valor {#using-the-key-value-parser}

El [analizador de clave-valor][14] extrae cualquier patrón `<KEY>=<VALUE>` reconocido en cualquier evento de registro.

Para enriquecer tus eventos de registro en Java, puedes reescribir mensajes en tu código e introducir secuencias `<KEY>=<VALUE>`.

Por ejemplo, si tienes:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

Puedes cambiarlo a:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

Con el analizador de clave-valor habilitado, cada par se extrae del JSON:

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

Así que puedes utilizar *scope* como un campo, y *durationInMs* y *quantity* como medidas de registro.

### MDC {#mdc}

Otra opción para enriquecer tus registros es usar [Mapped Diagnostic Contexts (MDC)] de Java.

Si usas SLF4J, utiliza el siguiente código Java:

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

Para generar este JSON:

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**Nota**: MDC solo permite tipos de cadena, así que no los uses para métricas de valores numéricos.

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#tail
[2]: http://logback.qos.ch/manual/mdc.html
[3]: /es/logs/log_configuration/parsing
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[5]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[6]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[7]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[8]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /es/logs/log_configuration/parsing/?tab=matchers
[11]: /es/logs/explorer/#overview
[12]: /es/agent/?tab=Host-based
[13]: https://github.com/logstash/logstash-logback-encoder
[14]: /es/logs/log_configuration/parsing/#key-value-or-logfmt