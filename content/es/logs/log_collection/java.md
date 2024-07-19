---
aliases:
- /es/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de los logs
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentación
  text: Conectar logs y trazas (traces)
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: Blog
  text: Cómo recopilar, personalizar y estandarizar logs de Java
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
title: Recopilación de logs de Java
---

Para enviar tus logs a Datadog, loguea un archivo y [supervisa][14] ese archivo con tu Datadog Agent.

Las stack traces de los logs típicos de Java se dividen en varias líneas, lo que dificulta que puedan asociarse al evento de log original. Por ejemplo:

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Para remediar este problema, configura tu biblioteca de registro de logs para que genere tus logs en formato JSON. De esta forma podrás:

* Garantizar que la stack trace se asocia correctamente al evento de log.
* Garantizar que todos los atributos del evento de log (como la gravedad, el nombre del logger y el nombre del subproceso) se extraen correctamente.
* Obtener acceso a los atributos de [Mapped Diagnostic Context (MDC)][1] que puedes añadir a cualquier evento de log.
* Evitar la necesidad de crear [reglas de parseo personalizadas][2].

Las siguientes instrucciones muestran ejemplos de configuración para las bibliotecas de registro de logs Log4j, Log4j 2 y Logback.

## Configurar tu logger

### Formato JSON

{{< tabs >}}
{{% tab "Log4j" %}}

Para Log4j, genera los logs en formato JSON con el módulo SLF4J [log4j-over-slf4j][1] combinado con Logback. `log4j-over-slf4j` sustituye directamente el Log4j en tu aplicación, así que no tienes que hacer ningún cambio en el código. Para utilizarlo:

1. En tu archivo `pom.xml`, sustituye la dependencia `log4j.jar` por una dependencia `log4j-over-slf4j.jar`, y añade las dependencias Logback:
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
2. Configurar un appender utilizando el diseño de JSON en `logback.xml`:

    Para el archivo:

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

    Para la consola:

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

Log4j 2 incluye una estructura JSON.

1. Configurar un appender utilizando el diseño de JSON en `log4j2.xml`:

    Para un appender de archivos:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>
      <Appenders>
        <File name="FILE" fileName="logs/app.log" >
          <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
        </File>
      </Appenders>

      <Loggers>
        <Root level="INFO">
          <AppenderRef ref="FILE"/>
        </Root>
      </Loggers>
    </Configuration>
    ```

    Para un appender de consola:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>

        <Appenders>
            <Console name="console" target="SYSTEM_OUT">
                <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
            </Console>
        </Appenders>

        <Loggers>
            <Root level="INFO">
                <AppenderRef ref="console"/>
            </Root>

        </Loggers>
    </Configuration>
    ```

2. Añade las dependencias de estructura JSON a tu `pom.xml`:
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

{{% /tab %}}
{{% tab "Logback" %}}

Utiliza el [logstash-logback-encoder][1] para los logs con formato JSON en Logback.

1. Configura un appender de archivo con estructura JSON en `logback.xml`:

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

2. Añade la dependencia del codificador Logstash a tu archivo `pom.xml`:

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

Crea una configuración de escritor de JSON basada en la [documentación oficial de Tinylog][1].


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

#### Inserta los ID de trazas en tus logs

Si tienes APM activado para esta aplicación, puedes correlacionar los logs y las trazas activando la inserción de ID de trazas. Consulta [Conectar logs y trazas Java][3] para obtener más información.

### Formato sin procesar

{{< tabs >}}
{{% tab "Log4j" %}}

Configura un appender de archivo en `log4j.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

Configura un appender de archivo en `log4j2.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

Configura un appender de archivo en `logback.xml`:

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

Crea una configuración de escritor con salida a un archivo basado en la [documentación oficial de Tinylog][1].


Utiliza el siguiente formato en un archivo `tinylog.properties`:

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### Inserta los ID de trazas en tus logs

Si APM está activada para esta aplicación, puedes correlacionar logs y trazas activando la inserción de ID de trazas. Consulta [Conectar logs y trazas Java][3].

Si _no_ correlacionas logs y trazas, puedes eliminar los marcadores MDC (`%X{dd.trace_id} %X{dd.span_id}`) de los patrones de log incluidos en los ejemplos de configuración de arriba.


## Configurar el Datadog Agent

Cuando tengas la [recopilación de logs activada][4], configura la [recopilación de logs personalizada][5] para supervisar tus logs y enviarlos a Datadog.

1. Crea una carpeta `java.d/` en el [directorio de configuración del Agent][6]  `conf.d/`.
2. Crea un archivo `conf.yaml` en `java.d/` con el siguiente contenido:

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

3. [Reinicia el Agent][7].
4. Ejecuta el [subcomando de estado del Agent][8] y busca `java` en la sección `Checks` para confirmar que los logs se envían correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][9] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

## Registro de logs sin Agent

En caso excepcional de que tu aplicación se esté ejecutando en una máquina a la que no tengas acceso o que no puedas registrar logs en un archivo, es posible transmitir logs a Datadog o al Datadog Agent directamente. Esta configuración no es la más recomendable porque requiere que la aplicación gestione los problemas de conexión. 

Para transmitir logs directamente a Datadog:

1. Añade la biblioteca de registro de logs a tu código o **crea un puente entre tu logger actual y Logback**.
2. **Configura Logback** para que envíe logs a Datadog.

### Crear un puente desde las bibliotecas de registro de logs de Java y Logback

Si todavía no utilizas Logback, las bibliotecas de registro de logs se pueden asociar a Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Utiliza el módulo SLF4J [log4j-over-slf4j][1] con Logback para que envíe logs a otro servidor. `log4j-over-slf4j` sustituye directamente el Log4j de tu aplicación para que no tengas que hacer ningún cambio en el código. Para usarlo:

1. En tu archivo `pom.xml`, sustituye la dependencia `log4j.jar` por una dependencia `log4j-over-slf4j.jar`, y añade las dependencias Logback:
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
2. Configurar Logback.

**Nota:** Como resultado de este cambio, los archivos de configuración Log4j dejarán de recogerse. Migra tu archivo `log4j.properties` a `logback.xml` con el [traductor Log4j][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 permite registrar logs en un host remoto, pero no ofrece la posibilidad de añadir una clave de API como prefijo en los logs. Debido a esto, utiliza el módulo SLF4J [log4j-over-slf4j][1] y Logback. `log4j-to-slf4j.jar` sustituye directamente Log4j 2 en tu aplicación para que no tengas que hacer ningún cambio en el código. Para usarlo:

1. En tu archivo `pom.xml`, sustituye la dependencia `log4j.jar` por una dependencia `log4j-over-slf4j.jar`, y añade las dependencias Logback:
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
2. Configurar Logback.

**Notas:**

- Asegúrate de que `log4j-slf4j-impl.jar` **no** se usa según se describe aquí: https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- Como resultado de esta migración, los archivos de configuración Log4j 2 dejarán de recogerse. Migra tu archivo `log4j.properties` a `logback.xml` con el [traductor Log4j][2].

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Configurar Logback

Utiliza la biblioteca de registro de logs [logstash-logback-encoder][11] junto con Logback para enviar los logs directamente a Datadog.

1. Configura un appender TCP en tu archivo `logback.xml`. Con esta configuración, tu clave API se recupera de la variable de entorno `DD_API_KEY`. Como alternativa, también puedes añadir tu clave API directamente al archivo de configuración:

    {{< site-region region="us,us3,us5,ap1" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>intake.logs.datadoghq.com:10516</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="eu" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>tcp-intake.logs.datadoghq.eu:443</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="gov" >}}
  No compatible.
    {{< /site-region >}}

    **Nota:** `%mdc{keyThatDoesNotExist}` se añade porque la configuración XML suprime los espacios en blanco. Para obtener más información sobre el parámetro del prefijo, consulta la [documentación sobre Logback][12].

2. Añade la dependencia del codificador Logstash a tu archivo `pom.xml`:

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

## Para aprender más

Enriquece los eventos de log con atributos contextuales.

### Usar el parseador de valores clave

El [parseador de valores clave][13] extrae cualquier patrón `<KEY>=<VALUE>` que reconoce en un evento de log.

Para enriquecer los eventos de log en Java, puedes reescribir los mensajes en tu código e introduce secuencias `<KEY>=<VALUE>`.

Por ejemplo, si tienes:

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

Puedes cambiarlo a:

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

Con el parseador de valores clave activado, cada par se extrae del JSON:

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

Puedes explotar el *scope* (contexto) como un campo, y *durationInMs* (duración en minutos) y *quantity* (cantidad) como medidas de log.

### MDC

Otra opción para enriquecer tus logs es usar la función de [Mapped Diagnostic Contexts (MDC)][1] de Java.

Si utilizas SLF4J, usa el siguiente código Java:

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

**Nota:** MDC solo permite las cadenas de caracteres, así que no las utilices para las métricas de valor numérico.

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /es/logs/log_configuration/parsing
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[5]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[6]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[7]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information]
[9]: /es/logs/log_configuration/parsing/?tab=matchers
[10]: /es/logs/explorer/#overview
[11]: https://github.com/logstash/logstash-logback-encoder
[12]: https://github.com/logstash/logstash-logback-encoder#prefixsuffixseparator
[13]: /es/logs/log_configuration/parsing/#key-value-or-logfmt
[14]: /es/glossary/#tail