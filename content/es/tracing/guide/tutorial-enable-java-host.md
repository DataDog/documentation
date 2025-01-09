---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: Documentación
  text: Opciones adicionales de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/dd_libraries/java/
  tag: Documentación
  text: Instrucciones detalladas de configuración de bibliotecas de rastreo
- link: /tracing/trace_collection/compatibility/java/
  tag: Documentación
  text: Marcos de trabajo compatibles Java para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: Documentación
  text: Configuración manual de trazas (traces) y tramos (spans)
- link: https://github.com/DataDog/dd-trace-java
  tag: Código fuente
  text: Rastreo del repositorio de código fuente abierto de bibliotecas
title: Tutorial - Habilitación del rastreo de una aplicación Java en el mismo host
  que el Datadog Agent
---

## Información general

.Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Java instalada en un host. En este caso, el Datadog Agent está instalado en el mismo host que la aplicación

Para otros casos, incluyendo el de aplicaciones en contenedores o en infraestructuras en la nube, el de un Agent en un contenedor y el de aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Curl
- Host Linux físico o virtual host con acceso root (raíz) cuando se utiliza sudo
- JDK compatible con Java 11  (no sólo un JRE) en el host. En este tutorial, estás creando y desplegando en la misma máquina.

## Instalación del Agent

Si no tienes instalado el Datadog Agent en tu máquina, ve a [**Integrations > Agent** (Integraciones > Agent)][5] y selecciona tu sistema operativo. Por ejemplo, en la mayoría de las plataformas Linux, puedes instalar el Agent ejecutando el siguiente script, sustituyendo `<YOUR_API_KEY>` por tu [clave de API Datadog][3]:

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

Para enviar datos a un sitio Datadog distinto de `datadoghq.com`, sustituye la variable de entorno `DD_SITE` por [tu sitio Datadog ][6].

Verifica que el Agent se está ejecutando y enviando datos a Datadog, accediendo a [**Events > Explorer** (Eventos > Explorador)][8]. También puedes filtrar por la faceta `Datadog` de origen y buscar un evento que confirme la instalación del Agent en el host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer que muestra un mensaje de Datadog que indica que el Agent se ha instalado en un host." style="width:70%;" >}}

<div class="alert alert-info">Si al cabo de unos minutos no ves tu host en Datadog en (<strong>Infraestructure > Host map</strong> (Infraestructura > Asignación de hosts), asegúrate de haber utilizado la clave de API correcta para tu organización, disponible en <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> (Parámetros de organización > Claves de API).</div>


## Instalación y ejecución de la aplicación de ejemplo Java 

A continuación, instala una aplicación de ejemplo para rastrear. El código de ejemplo para este tutorial se puede encontrar en [github.com/DataDog/apm-tutorial-java-host][9]. Clona el repositorio git ejecutando:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

Crea la aplicación de ejemplo utilizando Maven o Gradle, el que te resulte más cómodo. Ve al directorio `notes` dentro de `apm-tutorial-java-host` y ejecuta uno de los siguientes:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
./mvnw clean package
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
./gradlew clean bootJar
```

Esta opción utiliza el complemento Jar de Spring Boot para crear un único archivo Jar que contiene todos los archivos necesarios para ejecutar la aplicación Java.

{{% /tab %}}

{{< /tabs >}}

Inicia la aplicación ejecutando:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
java -jar target/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
java -jar build/libs/notes-0.0.1-SNAPSHOT.jar
```

{{% /tab %}}

{{< /tabs >}}

Alternativamente, si tu sistema operativo es compatible, puedes crear y ejecutar la aplicación utilizando los siguientes scripts proporcionados en el directorio `scripts`:

{{< tabs >}}

{{% tab "Maven" %}}

```sh
sh ./scripts/mvn_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

```sh
sh ./scripts/gradle_run.sh
```

{{% /tab %}}

{{< /tabs >}}

La aplicación de ejemplo `notes_app` es una API REST básica que almacena datos en una base de datos en la memoria. Abre otro terminal y utiliza `curl` para enviar unas cuantas solicitudes de API:

`curl localhost:8080/notes`
: Devuelve `[]` porque todavía no hay nada en la base de datos.

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Añade una nota con la descripción `hello` y un valor de ID `1`. Devuelve `{"id":1,"description":"hello"}`.

`curl localhost:8080/notes/1`
: Devuelve la nota con el valor `id` de `1`: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: Añade una nota con la descripción `otherNote` y un valor de ID `2`. Devuelve `{"id":2,"description":"otherNote"}`

`curl localhost:8080/notes`
: Devuelve el contenido de la base de datos: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

Ejecuta más llamadas a la API para ver la aplicación en acción. Cuando hayas terminado, pulsa Ctrl+C para detener la aplicación.

## Instalación del rastreo de Datadog

A continuación, descarga la biblioteca de rastreo Java (a veces denominada Java Agent). Desde tu directorio `apm-tutorial-java-host`, ejecuta:

{{< code-block lang="sh" >}}
curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

Si tu sistema operativo no es compatible con curl, puedes ir directamente a `'https://dtdg.co/latest-java-tracer' ` para descargar el archivo `dd-java-agent.jar`.

## Para iniciar la aplicación Java con la instrumentación automática

Para empezar a generar y recopilar trazas, reinicia la aplicación de ejemplo con marcas adicionales que hagan que los datos de rastreo se envíen a Datadog.

<div class="alert alert-warning"><strong>Nota</strong>: Las marcas de estos comandos de ejemplo, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>


{{< tabs >}}

{{% tab "Maven" %}}

Desde el directorio `notes`, ejecuta:

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
```

O utiliza el script proporcionado:

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

Desde el directorio `notes`, ejecuta:

```sh
java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
```

O utiliza el script proporcionado:

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


Utiliza `curl` para volver a enviar solicitudes a la aplicación:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Espera unos instantes y echa un vistazo a tu interfaz de usuario Datadog. Ve a [**APM > Traces** (APM > Trazas)][11]. La lista de trazas muestra algo como lo siguiente:

{{< img src="tracing/guide/tutorials/tutorial-java-host-traces_cropped.png" alt="Vista de las trazas que muestra los datos de rastreo provenientes del host." style="width:100%;" >}}

La base de datos en memoria integrada para este tutorial es `h2` y la aplicación Spring Boot es `notes`. La lista de trazas muestra todos los tramos, cuándo se han iniciado, qué recurso se ha rastreado con el tramo y cuánto tiempo ha tardado.

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa un tramo que se completa durante el tiempo de vida de una barra a mayor profundidad.

El gráfico de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="Gráfico de llamas de una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-host-get-flame.png" alt="Gráfico de llamas de una traza GET." style="width:100%;" >}}


### Configuración del rastreo

La biblioteca de rastreo Java utiliza el Agent incorporado y el soporte de monitorización Java. La marca `-javaagent:../dd-java-agent.jar` indica a la máquina virtual Java dónde encontrar la biblioteca de rastreo Java para que pueda ejecutarse como un Agent Java. Para obtener más información sobre Agents Java, consulta [https://www.baeldung.com/java-instrumentation][7].

Además de la marca `javaagent`, que habilita el Java Agent, los comandos de inicio especifican tres parámetros de [etiquetado unificado de servicios[10] para identificar de forma única tu aplicación en Datadog. Especifica siempre las etiquetas `env`, `service`y `version` para cada aplicación monitorizada.

Por último, la marca `dd.trace.sample.rate` configura la frecuencia de muestreo para esta aplicación. El comando ENTRYPOINT en el archivo Docker configura su valor en `1`, lo que significa que el 100% de todas las solicitudes al servicio `notes` se envían al backend Datadog para su análisis y visualización. Para una aplicación de prueba de bajo volumen, esto está bien. Pero no lo hagas en producción o en entornos de gran volumen, ya que esto generará un volumen muy elevado de datos. En su lugar, muestrea algunas de tus solicitudes. Elige un valor entre 0 y 1. Por ejemplo, `-Ddd.trace.sample.rate=0.1` envía trazas del 10% de tus solicitudes a Datadog. Consulta la documentación para obtener más información sobre [parámetros de configuración del rastreo][14] y [mecanismos de muestreo][15].

Fíjate que la marca de la frecuencia de muestreo en el comando aparece antes que la marca `-jar`. Esto se debe a que se trata de un parámetro para la máquina virtual Java y no para tu aplicación. Cuando añadas el Agent Java a tu aplicación, asegúrate de especificar la marca en la ubicación correcta.


## Añadir la instrumentación manual a la aplicación Java 

La instrumentación automática es práctica, pero a veces prefieres utilizar tramos más precisos. La API de rastreo DD Java Datadog te permite especificar tramos en tu código mediante anotaciones o código.

Los siguientes pasos te guiarán a través de la adición de anotaciones al código para rastrear algunos métodos de ejemplo.

1. Abre `/notes/src/main/java/com/datadog/example/notes/NotesHelper.java`. Este ejemplo ya contiene código comentado que muestra las diferentes formas de configurar el rastreo personalizado en el código.

2. Descomenta las líneas que importan bibliotecas para permitir el rastreo manual:

   ```java
   import datadog.trace.api.Trace;
   import datadog.trace.api.DDTags;
   import io.opentracing.Scope;
   import io.opentracing.Span;
   import io.opentracing.Tracer;
   import io.opentracing.tag.Tags;
   import io.opentracing.util.GlobalTracer;
   import java.io.PrintWriter;
   import java.io.StringWriter
   ```

3. Descomenta las líneas que rastrean manualmente los dos procesos públicos. Éstas muestran el uso de anotaciones `@Trace` para especificar aspectos como `operationName` y `resourceName` en una traza:
   ```java
   @Trace(operationName = "traceMethod1", resourceName = "NotesHelper.doLongRunningProcess")
   // ...
   @Trace(operationName = "traceMethod2", resourceName = "NotesHelper.anotherProcess")
   ```

4. También puedes crear un tramo separado para un bloque de código específico en la aplicación. Dentro del tramo, añade etiquetas (tags) de servicio y de nombre de recurso y etiquetas de gestión de errores. Estas etiquetas dan como resultado un gráfico de llamas que muestra tramos y métricas en visualizaciones de Datadog. Descomenta las líneas que rastrean manualmente el método privado:

   ```java
           Tracer tracer = GlobalTracer.get();
           // Tags can be set when creating the span
           Span span = tracer.buildSpan("manualSpan1")
               .withTag(DDTags.SERVICE_NAME, "NotesHelper")
               .withTag(DDTags.RESOURCE_NAME, "privateMethod1")
               .start();
           try (Scope scope = tracer.activateSpan(span)) {
               // Tags can also be set after creation
               span.setTag("postCreationTag", 1);
               Thread.sleep(30);
               Log.info("Hello from the custom privateMethod1");
   ```
   Y también las líneas que establecen etiquetas en los errores:
   ```java
        } catch (Exception e) {
            // Set error on span
            span.setTag(Tags.ERROR, true);
            span.setTag(DDTags.ERROR_MSG, e.getMessage());
            span.setTag(DDTags.ERROR_TYPE, e.getClass().getName());

            final StringWriter errorString = new StringWriter();
            e.printStackTrace(new PrintWriter(errorString));
            span.setTag(DDTags.ERROR_STACK, errorString.toString());
            Log.info(errorString.toString());
        } finally {
            span.finish();
        }
   ```

5. Actualiza la configuración de tu script de compilación y crea la aplicación:
{{< tabs >}}

{{% tab "Maven" %}}

a. Abre `notes/pom.xml` y descomenta las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

b. Ejecuta:

   ```sh
   ./mvnw clean package

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 target/notes-0.0.1-SNAPSHOT.jar
   ```

   O utiliza el script:

   ```sh
   sh ./scripts/mvn_instrumented_run.sh
   ```

{{% /tab %}}

{{% tab "Gradle" %}}

a. Abre `notes/build.gradle` y descomenta las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

b. Ejecuta:
   ```sh
   ./gradlew clean bootJar

   java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=notes -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/notes-0.0.1-SNAPSHOT.jar
   ```

   O utiliza el script:

   ```sh
   sh ./scripts/gradle_instrumented_run.sh
   ```

{{% /tab %}}

{{< /tabs >}}

6. Reenvía algunas solicitudes HTTP, concretamente algunas solicitudes `GET`.
7. En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llamas como éste:

   {{< img src="tracing/guide/tutorials/tutorial-java-host-custom-flame.png" alt="Gráfico de llamas de una traza GET con instrumentación personalizada." style="width:100%;" >}}

   Observa el mayor nivel de detalle de la traza del stack tecnológico ahora que la función `getAll` cuenta con el rastreo personalizado.

   El `privateMethod` alrededor del cual has creado un tramo manual aparece ahora como un bloque separado de las otras llamadas y está resaltado con un color diferente. Los otros métodos en los que has utilizado la anotación `@Trace` se muestran bajo el mismo servicio y color que la solicitud `GET`, que es la aplicación `notes`. La instrumentación personalizada es valiosa cuando hay partes clave del código que necesitan ser resaltadas y monitorizadas.

Para obtener más información, consulta la [instrumentación personalizada][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

1. Ve al directorio `/calendar` en el repositorio de ejemplo, luego crea y ejecuta la aplicación de calendario:
{{< tabs >}}

{{% tab "Maven" %}}

Ejecuta:

```sh
./mvnw clean package

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 target/calendar-0.0.1-SNAPSHOT.jar
```

O utiliza el script:

```sh
sh ./scripts/mvn_instrumented_run.sh
```

{{% /tab %}}

{{% tab "Gradle" %}}

Ejecuta:
```sh
./gradlew bootJar

java -javaagent:../dd-java-agent.jar -Ddd.trace.sample.rate=1 -Ddd.service=calendar -Ddd.env=dev -jar -Ddd.version=0.0.1 build/libs/calendar-0.0.1-SNAPSHOT.jar
```

O utiliza el script:

```sh
sh ./scripts/gradle_instrumented_run.sh
```

{{% /tab %}}

{{< /tabs >}}


2. Envía una solicitud POST con el parámetro `add_date`:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


3. En el Trace Explorer, haz clic en esta última traza `notes` para ver un rastreo distribuido entre ambos servicios:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-distributed.png" alt="Gráfico de llamas de una traza distribuida." style="width:100%;" >}}

Observa que no has cambiado nada en la aplicación `notes`. Datadog instrumenta automáticamente tanto la biblioteca `okHttp` utilizada para realizar la llamada HTTP de `notes` a `calendar`, como la biblioteca Jetty utilizada para escuchar solicitudes HTTP en `notes` y `calendar`. Esto permite que la información de rastreo pase de una aplicación a la otra, registrando un rastreo distribuido.


## Solucionar problemas

Si no recibes trazas como esperabas, configura el modo de depuración para el rastreador de Java. Para obtener más información, consulta [Habilitar el modo de depuración][13].


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: /es/account_management/api-app-keys/
[4]: /es/tracing/trace_collection/compatibility/java/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /es/getting_started/site/
[7]: https://www.baeldung.com/java-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /es/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/java/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /es/tracing/trace_collection/library_config/java/
[15]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java