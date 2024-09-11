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
title: Tutorial - Habilitación del rastreo de una aplicación Java y el Datadog Agent
  en contenedores
---

## Información general

Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación de ejemplo Java instalada en un contenedor. En este caso, también el Datadog Agent está instalado en un contenedor.

Para otros casos, incluyendo el de una aplicación y del Agent en un host, de una aplicación en un contenedor y el Agent en un host, de una aplicación y del Agent en una infraestructura en la nube y de aplicaciones escritas en otros lenguajes, consulta [Tutoriales: Habilitación del rastreo][1].

Para obtener documentación general sobre la configuración del rastreo en Java, consulta [Rastreo de aplicaciones Java][2].

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Curl

## Instalación de la aplicación de ejemplo Java en Docker

El código de ejemplo para este tutorial está en GitHub, en [github.com/DataDog/apm-tutorial-java-host][9]. Para empezar, clona el repositorio:

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-java-host.git
{{< /code-block >}}

El repositorio contiene una aplicación Java de servicio múltiple preconfigurada para ejecutarse en contenedores Docker. La aplicación de ejemplo es una aplicación básica de notas con una API REST para añadir y modificar datos. Los archivos YAML `docker-compose` están en el directorio `docker`:

Este tutorial utiliza el archivo `all-docker-compose.yaml`, que crear contenedores tanto para la aplicación como para el Datadog Agent.

En cada uno de los directorios `notes` y `calendar`, hay dos conjuntos de archivos Docker para crear aplicaciones, ya sea con Maven o con Gradle. Este tutorial utiliza la creación con Maven, pero si Gradle te resulta más familiar, puedes utilizarlo en su lugar con los cambios correspondientes en los comandos de creación.

### Para iniciar y ejercitar la aplicación de ejemplo

1. Crea el contenedor de la aplicación ejecutando lo siguiente desde dentro del directorio `/docker`:

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml build notes
{{< /code-block >}}

   Si la compilación se bloquea, sal utilizando `Ctrl+C` y vuelve a ejecutar el comando.

2. Inicia el contenedor:

   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml up notes
{{< /code-block >}}

   Puedes verificar que se está ejecutando, observando los contenedores en ejecución con el comando `docker ps`.

3. Abre otro terminal y envía solicitudes API para ejercitar la aplicación. La aplicación de notas es una API REST que almacena datos en una base de datos H2 en memoria que se ejecuta en el mismo contenedor. Envíale algunos comandos:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

### Detener la aplicación

Una vez que hayas comprobado que la aplicación se ejecuta, detenla para poder habilitar el rastreo en ella:

1. Detén los contenedores:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml down
{{< /code-block >}}

2. Elimina los contenedores:
   {{< code-block lang="sh" >}}
docker-compose -f all-docker-compose.yaml rm
{{< /code-block >}}

## Habilitación del rastreo

Ahora que ya tienes una aplicación Java en funcionamiento, configúrala para habilitar el rastreo.

1. Añade el paquete de rastreo Java a tu proyecto. Como el Agent se ejecuta en un contenedor, asegúrate de que los archivos Docker están correctamente configurados y que no es necesario instalar nada. Abre el archivo `notes/dockerfile.notes.maven` y descomenta la línea que descarga `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `notes/dockerfile.notes.maven`, comenta la línea `ENTRYPOINT` para una ejecución sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/notes-0.0.1-SNAPSHOT.jar"]
   ```

   De este modo, la aplicación se instrumenta automáticamente con servicios Datadog.

   <div class="alert alert-warning"><strong>Nota</strong>: Las marcas de estos comandos de ejemplo, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>

3. El [Etiquetado unificado de servicios][10] identifica servicios rastreados en diferentes versiones y entornos de despliegue, para que puedan correlacionarse en Datadog y puedas utilizarlos para buscar y filtrar. Las tres variables de entorno utilizadas para el etiquetado unificado de servicios son `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. Para las aplicaciones desplegadas con Docker, estas variables de entorno pueden añadirse en el archivo Docker o en el archivo `docker-compose`.
   Para este tutorial, el archivo `all-docker-compose.yaml` ya tiene definidas estas variables de entorno:

   ```yaml
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
   ```

4. También puedes ver que se configuran las etiquetas (labels) Docker para los mismos valores de etiquetas (tags) unificadas de servicios `service` , `env` y `version`. Esto también te permite obtener métricas Docker una vez que tu aplicación se esté ejecutando.

   ```yaml
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   ```

## Añadir el contenedor del Agent

Añade el Datadog Agent en la sección de servicios de su archivo `all-docker-compose.yaml` para añadir el Agent a tu compilación:

1. Descomenta la configuración del Agent y especifica tu propia [clave de API Datadog][3] y tu [sitio][6]:
   ```yaml
     datadog-agent:
       container_name: datadog-agent
       image: "gcr.io/datadoghq/agent:latest"
       pid: host
       environment:
         - DD_API_KEY=<DD_API_KEY_HERE>
         - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
         - DD_APM_ENABLED=true
         - DD_APM_NON_LOCAL_TRAFFIC=true
       volumes:
         - /var/run/docker.sock:/var/run/docker.sock
         - /proc/:/host/proc/:ro
         - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   ```

3. Descomenta los campos `depends_on` para `datadog-agent` en el contenedor `notes`.

2. Fíjate que en la sección del servicio , la variable de entorno `DD_AGENT_HOST` se establece en el nombre de host del contenedor del Agent. Tu sección del contenedor`notes` tiene el siguiente aspecto:
   ```yaml
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: notes/dockerfile.notes.maven
     ports:
       - 8080:8080
     labels:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
     environment:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     # - CALENDAR_HOST=calendar
     depends_on:
     # - calendar
       - datadog-agent
   ```
   Más adelante, configurarás las secciones y variables de `calendar` en este tutorial.


## Inicio de los contenedores para observar el rastreo automático

Ahora que la biblioteca de rastreo está instalada, reinicia tu aplicación para empezar a recibir trazas. Ejecuta los siguientes comandos:

```
docker-compose -f all-docker-compose.yaml build notes
docker-compose -f all-docker-compose.yaml up notes
```

Para saber si el Agent está funcionando, observa los resultados continuos en el terminal, o abre el [Explorador de eventos][8] en Datadog y observa el evento de inicio del Agent:

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Evento de inicio mostrado en el Explorador de eventos" style="width:100%;" >}}

Con la aplicación en ejecución, envíale algunas solicitudes curl:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Espera unos instantes y ve a [**APM > Traces** (APM > Trazas)][11] en Datadog, donde podrás ver una lista de trazas correspondiente a tus llamadas de API:

{{< img src="tracing/guide/tutorials/tutorial-java-container-traces2.png" alt="Trazas de la aplicación de ejemplo en APM Trace Explorer" style="width:100%;" >}}

La base de datos en memoria integrada para este tutorial es `h2` y la aplicación Spring Boot es `notes`. La lista de trazas muestra todos los tramos, cuándo se han iniciado, qué recurso se ha rastreado con el tramo y cuánto tiempo ha tardado.

Si no ves trazas después de varios minutos, borra cualquier filtro en el campo de búsqueda de trazas (a veces se filtra sobre una variable de entorno como `ENV` que no estás utilizando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver un gráfico de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior del gráfico es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra de menor profundidad representa un tramo que se completa durante el tiempo de vida de una barra a mayor profundidad.

El gráfico de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-container-post-flame.png" alt="Gráfico de llamas de una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-java-container-get-flame.png" alt="Gráfico de llamas de una traza GET." style="width:100%;" >}}

### Configuración del rastreo

La biblioteca de rastreo Java utiliza el Agent incorporado y el soporte de monitorización Java. La marca `-javaagent:../dd-java-agent.jar` en el archivo Docker indica a la máquina virtual Java dónde encontrar la biblioteca de rastreo Java para que pueda ejecutarse como un Agent Java. Para obtener más información sobre Agents Java, consulta [https://www.baeldung.com/java-instrumentation][7].

La marca `dd.trace.sample.rate` configura la frecuencia de muestreo para esta aplicación. El comando ENTRYPOINT en el archivo Docker configura su valor en `1`, lo que significa que el 100% de todas las solicitudes al servicio `notes` se envían al backend Datadog para su análisis y visualización. Para una aplicación de prueba de bajo volumen, esto está bien. Pero no lo hagas en producción o en entornos de gran volumen, ya que esto generará un volumen muy elevado de datos. En su lugar, muestrea algunas de tus solicitudes. Elige un valor entre 0 y 1. Por ejemplo, `-Ddd.trace.sample.rate=0.1` envía trazas del 10% de tus solicitudes a Datadog. Consulta la documentación para obtener más información sobre [parámetros de configuración del rastreo][14] y [mecanismos de muestreo][15].

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
   Y también las líneas que establecen etiquetas (tags) en los errores:
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

5. Actualiza tu compilación Maven abriendo `notes/pom.xml` y descomentando las líneas que configuran dependencias para el rastreo manual. La biblioteca `dd-trace-api` se utiliza para las anotaciones `@Trace`, y `opentracing-util` y `opentracing-api` se utilizan para la creación manual de tramos.

6. Reconstruye los contenedores:

   ```sh
   docker-compose -f all-docker-compose.yaml build notes
   docker-compose -f all-docker-compose.yaml up notes
   ```

7. Reenvía algunas solicitudes HTTP, concretamente algunas solicitudes `GET`.
8. En el Trace Explorer, haz clic en una de las nuevas solicitudes `GET` y verás un gráfico de llamas como éste:

   {{< img src="tracing/guide/tutorials/tutorial-java-container-custom-flame.png" alt="Gráfico de llamas de una traza GET con instrumentación privada." style="width:100%;" >}}

   Observa el mayor nivel de detalle de la traza del stack tecnológico ahora que la función `getAll` cuenta con el rastreo personalizado.

   El `privateMethod` alrededor del cual has creado un tramo manual aparece ahora como un bloque separado de las otras llamadas y está resaltado con un color diferente. Los otros métodos en los que has utilizado la anotación `@Trace` se muestran bajo el mismo servicio y color que la solicitud `GET`, que es la aplicación `notes`. La instrumentación personalizada es valiosa cuando hay partes clave del código que necesitan ser resaltadas y monitorizadas.

Para obtener más información, consulta la [instrumentación personalizada][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama rastreo distribuido.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

1. Configura la aplicación de calendario para el rastreo añadiendo `dd-java-agent` al comando de inicio en el archivo Docker, como hiciste anteriormente para la aplicación de notas. Abre `calendar/dockerfile.calendar.maven` y comprueba que ya está descargando `dd-java-agent`:

   ```
   RUN curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Dentro del mismo archivo `calendar/dockerfile.calendar.maven`, comenta la línea `ENTRYPOINT` para ejecutar sin rastreo. A continuación, descomenta la línea `ENTRYPOINT`, que ejecuta la aplicación con el rastreo habilitado:

   ```
   ENTRYPOINT ["java" , "-javaagent:../dd-java-agent.jar", "-Ddd.trace.sample.rate=1", "-jar" , "target/calendar-0.0.1-SNAPSHOT.jar"]
   ```

   <div class="alert alert-warning"><strong>Nota</strong>: Nuevamente, las marcas, en particular la frecuencia de muestreo, no son necesariamente apropiadas para los entornos que no figuran en este tutorial. Para obtener más información sobre qué necesitas utilizar en tu entorno real, consulta <a href="#tracing-configuration">Configuración del rastreo</a>.</div>

3. Abre `docker/all-docker-compose.yaml` y descomenta las variables de entorno del servicio `calendar` para configurar el host del Agent y las etiquetas de servicio unificadas para la aplicación y para Docker:

   ```yaml
     calendar:
       container_name: calendar
       restart: always
       build:
         context: ../
         dockerfile: calendar/dockerfile.calendar.maven
       labels:
         - com.datadoghq.tags.service="calendar"
         - com.datadoghq.tags.env="dev"
         - com.datadoghq.tags.version="0.0.1"
       environment:
         - DD_SERVICE=calendar
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
      ports:
        - 9090:9090
      depends_on:
        - datadog-agent
   ```

4. En la sección del servicio `notes`, descomenta la variable de entorno `CALENDAR_HOST` y la entrada `calendar` en `depends_on` para establecer las conexiones necesarias entre ambas aplicaciones:

   ```yaml
     notes:
     ...
       environment:
         - DD_SERVICE=notes
         - DD_ENV=dev
         - DD_VERSION=0.0.1
         - DD_AGENT_HOST=datadog-agent
         - CALENDAR_HOST=calendar
       depends_on:
         - calendar
         - datadog-agent
   ```

5. Crea la aplicación de servicio múltiple reiniciando los contenedores. En primer lugar, detén todos los contenedores en ejecución:
   ```
   docker-compose -f all-docker-compose.yaml down
   ```

   A continuación, ejecuta los siguientes comandos para iniciarlos:
   ```
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up
   ```

6. Cuando todos los contenedores estén listos, envía una solicitud POST con el parámetro `add_date`:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `{"id":1,"description":"hello_again with date 2022-11-06"}`


7. En el Trace Explorer, haz clic en esta última traza para ver un rastreo distribuido entre ambos servicios:

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
[6]: /es/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[7]: https://www.baeldung.com/java-instrumentation
[9]: https://github.com/DataDog/apm-tutorial-java-host
[10]: /es/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/java/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /es/tracing/trace_collection/library_config/java/
[15]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=java