---
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: Documentación
  text: Opciones adicionales de configuración de la biblioteca de rastreo
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentación
  text: Instrucciones de configuración detalladas de la biblioteca de rastreo
- link: /tracing/trace_collection/compatibility/go/
  tag: Documentación
  text: Marcos de Go compatibles para la instrumentación automática
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: Documentación
  text: Configuración manual de trazas y tramos
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentación
  text: Mecanismos de ingesta
- link: https://github.com/DataDog/dd-trace-Go
  tag: Código fuente
  text: Repositorio de código fuente abierto de la biblioteca de rastreo
title: 'Tutorial: Activación del rastreo de una aplicación Go y Datadog Agent en contenedores'
---

## Información general

Este tutorial te guiará a través de los pasos necesarios para activar el rastreo en una aplicación Go de ejemplo instalada en un contenedor. En este escenario, el Datadog Agent también está instalado en un contenedor.

Para otros escenarios, incluyendo la aplicación y el Agent en un host, la aplicación y el Agent en la infraestructura en la nube y en aplicaciones escritas en otros lenguajes, consulta los otros [tutoriales de activación de rastreo][1].

Consulta [Rastreo de aplicaciones Go][2] para obtener documentación general sobre la configuración del rastreo para Go.

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Git
- Docker
- Curl
- Go versión 1.18+
- Make y GCC

## Instalación de la aplicación de ejemplo Go en contenedores

El código de ejemplo para este tutorial está en GitHub, en [github.com/Datadog/apm-tutorial-golang.git][9]. Para empezar, clona el repositorio git:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

El repositorio contiene una aplicación Go multiservicio preconfigurada para ejecutarse dentro de contenedores de Docker. La aplicación de ejemplo consiste en una aplicación básica de notas y una aplicación de calendario, cada una con una API REST para añadir y cambiar datos. Los archivos YAML `docker-compose` se encuentran en el directorio `docker`.

Este tutorial utiliza el archivo `all-docker-compose.yaml`, que crea contenedores para las aplicaciones de notas y calendario y el Datadog Agent.

### Inicio y ejecución de la aplicación de ejemplo

1. Crea los contenedores de la aplicación ejecutando:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build{{< /code-block >}}

1. Inicia los contenedores:

   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Comprueba que los contenedores se están ejecutando con el comando `docker ps`. Deberías ver algo como esto:
   {{< code-block lang="shell" disable_copy="true" >}}
   ID DE CONTENEDOR   IMAGEN                           COMANDO                  CREADO              ESTADO                          PUERTOS                    NOMBRES
   0a4704ebed09   docker-notes                    "./cmd/notes/notes"      About a minute ago   Up About a minute               0.0.0.0:8080->8080/tcp   notes
   9c428d7f7ad1   docker-calendar                 "./cmd/calendar/cale..."   About a minute ago   Up About a minute               0.0.0.0:9090->9090/tcp   calendar
   b2c2bafa6b36   gcr.io/datadoghq/agent:latest   "/bin/entrypoint.sh"     About a minute ago   Up About a minute (unhealthy)   8125/udp, 8126/tcp       datadog-ag
   {{< /code-block >}}

1. La aplicación de ejemplo `notes` es una API REST básica que almacena datos en una base de datos en memoria. Utiliza `curl` para enviar algunas solicitudes API:

   `curl localhost:8080/notes`
   : devuelve `[]` porque todavía no hay nada en la base de datos

   `curl -X POST 'localhost:8080/notes?desc=hello'`
   : añade una nota con la descripción `hello` y un valor de ID de `1`. Devuelve `{"id":1,"description":"hello"}`

   `curl localhost:8080/notes/1`
   : devuelve la nota con el valor `id` de `1`: `{"id":1,"description":"hello"}`

   `curl -X POST 'localhost:8080/notes?desc=otherNote'`
   : añade una nota con la descripción `otherNote` y un valor de ID de `2`. Devuelve `{"id":2,"description":"otherNote"}`

   `curl localhost:8080/notes`
   : devuelve el contenido de la base de datos: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

1. Ejecuta más llamadas a la API para ver la aplicación en acción. Cuando hayas terminado, apaga y elimina los contenedores y asegúrate de que se han eliminado:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down
   docker-compose -f all-docker-compose.yaml rm{{< /code-block >}}

## Activación del rastreo

A continuación, configura la aplicación Go para habilitar el rastreo. Dado que el Agent se ejecuta en un contenedor, no es necesario instalar nada.

Para activar el rastreo, elimina los comentarios de las siguientes importaciones en `apm-tutorial-golang/cmd/notes/main.go`:

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

En la función `main()`, elimina los comentarios de las siguientes líneas:

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
   return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
}))
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
{{< /code-block >}}

En `setupDB()`, elimina los comentarios de las siguientes líneas:

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Elimina los comentarios de la siguiente línea:
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

## Añadir el contenedor del Agent

Añade el Datadog Agent en la sección de servicios de tu archivo `all-docker-compose.yaml` para añadir el Agent a tu compilación:

1. Elimina los comentarios de la configuración del Agent y especifica tu propia [clave de API de Datadog][3]:
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
     datadog-agent:
     container_name: datadog-agent
     image: "gcr.io/datadoghq/agent:latest"
     pid: host
     environment:
       - DD_API_KEY=<DD_API_KEY_HERE>
       - DD_APM_ENABLED=true
       - DD_APM_NON_LOCAL_TRAFFIC=true
     volumes:
       - /var/run/docker.sock:/var/run/docker.sock
       - /proc/:/host/proc/:ro
       - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   {{< /code-block >}}

1. Elimina los comentarios de los campos `depends_on` para `datadog-agent` en el contenedor `notes`.

1. Fíjate que en la sección del servicio `notes`, la variable de entorno `DD_AGENT_HOST` se establece en el nombre de host del contenedor del Agent. Tu sección del contenedor `notes` tiene el siguiente aspecto:
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
   notes:
    container_name: notes
    restart: always
    build:
      context: ../
      dockerfile: ../dockerfile.notes
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
#     - CALENDAR_HOST=calendar
    depends_on:
#     - calendar
      - datadog-agent
   {{< /code-block >}}
   Más adelante, configurarás las secciones y variables de `calendar` en este tutorial.

## Inicio de los contenedores para explorar la instrumentación automática

Ahora que la biblioteca de rastreo está instalada, reinicia tus contenedores de aplicación e inicia para empezar a recibir trazas. Ejecuta los siguientes comandos:

{{< code-block lang="shell" >}}
docker-compose -f all-docker-compose.yaml build
docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

Para empezar a generar y recopilar trazas, inicia de nuevo la aplicación con `make run`.

Para saber si el Agent está funcionando, observa los resultados continuos en el terminal, o abre el [Events Explorer][8] en Datadog y observa el evento de inicio del Agent:

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="El evento de inicio del Agent mostrado en el Events Explorer" style="width:100%;" >}}

Utiliza `curl` para volver a enviar solicitudes a la aplicación:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Espera unos instantes y echa un vistazo a tu interfaz de usuario de Datadog. Navega a [**APM > Traces**][11] (APM > Trazas). La lista de trazas muestra algo como esto:

{{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Vista de trazas que muestra los datos de traza entrantes desde el host." style="width:100%;" >}}

Hay entradas para la base de datos (`db`) y la aplicación `notes`. La lista de trazas muestra todos los tramos, cuándo se iniciaron, qué recurso se rastreó con el tramo y cuánto tiempo tardó.

Si no ves trazas, borra cualquier filtro en el campo de búsqueda **Traces** (Trazas) (a veces filtra en una variable de entorno como `ENV` que no estás usando).

### Análisis de una traza

En la página de trazas, haz clic en una traza `POST /notes` para ver una gráfica de llamas que muestra cuánto tiempo ha tardado cada tramo y qué otros tramos han ocurrido antes de que se completara un tramo. La barra de la parte superior de la gráfica es el tramo seleccionado en la pantalla anterior (en este caso, el punto de entrada inicial en la aplicación de notas).

El ancho de una barra indica el tiempo que ha tardado en completarse. Una barra más angosta representa un tramo que se completa durante el tiempo de vida de una barra de mayor ancho.

La gráfica de llamas de una traza `POST` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="Una gráfica de llamas para una traza POST." style="width:100%;" >}}

Una traza `GET /notes` tiene este aspecto:

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="Una gráfica de llamas para una traza GET." style="width:100%;" >}}

## Configuración del rastreo

Puedes configurar la biblioteca de rastreo para añadir etiquetas a la telemetría que envía a Datadog. Las etiquetas ayudan a agrupar, filtrar y mostrar datos de forma significativa en dashboards y gráficos. Para añadir etiquetas, especifica las variables de entorno al ejecutar la aplicación. El proyecto `Makefile` incluye las variables de entorno `DD_ENV` , `DD_SERVICE` y `DD_VERSION`, que están configuradas para activar el [etiquetado de servicios unificado][17]:

{{< code-block lang="go" filename="docker/all-docker-compose.yaml" disable_copy="true" >}}
environment:
  - DD_API_KEY=<DD_API_KEY_HERE>
  - DD_APM_ENABLED=true
  - DD_APM_NON_LOCAL_TRAFFIC=true
{{< /code-block >}}

Para obtener más información sobre las opciones disponibles de configuración, consulta [Configuración de la biblioteca de rastreo de Go][14].

### Uso de bibliotecas de rastreo automático

Datadog dispone de varias bibliotecas completamente compatibles para Go que permiten el rastreo automático cuando se implementan en el código. En el archivo `cmd/notes/main.go`, puedes ver que las bibliotecas `go-chi`, `sql` y `http` tienen alias según las correspondientes bibliotecas de Datadog: `chitrace` `sqltrace` y `httptrace` respectivamente:

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

En `cmd/notes/main.go`, las bibliotecas de Datadog se inicializan con la opción `WithServiceName`. Por ejemplo,  la biblioteca `chitrace` se inicializa de la siguiente manera:

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
r.Mount("/", nr.Register())
{{< /code-block >}}

El uso de `chitrace.WithServiceName("notes")` garantiza que todos los elementos rastreados por la biblioteca estén bajo el nombre de servicio `notes`.

El archivo `main.go` contiene más ejemplos de aplicación para cada una de estas bibliotecas. Para ver una extensa lista de bibliotecas, consulta [Requisitos de compatibilidad de Go][16].

### Uso del rastreo personalizado con contexto

En los casos en que el código no esté incluido en una biblioteca compatible, puedes crear tramos manualmente.

Elimina los comentarios de la función `makeSpanMiddleware` en `notes/notesController.go`. Genera un middleware que engloba una solicitud en un tramo con el nombre suministrado. Para utilizar este función, comenta las siguientes líneas:

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
r.Get("/notes", nr.GetAllNotes)                // GET /notes
r.Post("/notes", nr.CreateNote)                // POST /notes
r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123
{{< /code-block >}}

Elimina los comentarios de las siguientes líneas:

{{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
{{< /code-block >}}

Elimina también el comentario de la siguiente importación:

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

Hay varios ejemplos de rastreo personalizado en la aplicación de ejemplo. Aquí hay un par de ejemplos más. Elimina los comentarios para habilitar estos tramos:

La función `doLongRunningProcess` crea tramos secundarios a partir de un contexto primario:

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
}
{{< /code-block >}}

La función `privateMethod1` demuestra la creación de un servicio completamente independiente de un contexto:

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
        tracer.SpanType("web"),
        tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Hello from the custom privateMethod1 in Notes")
}
{{< /code-block >}}

Para obtener más información sobre el rastreo personalizado, consulta [Instrumentación personalizada de Go][12].

## Añadir una segunda aplicación para ver trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama _rastreo distribuido_.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

Para activar el seguimiento en la aplicación de calendario:

1. Elimina los comentarios de las siguientes líneas en `cmd/calendar/main.go`:
   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   tracer.Start()
   defer tracer.Stop()
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("calendar")))
   {{< /code-block >}}

1. Abre `docker/all-docker-compose.yaml` y elimina los comentarios del servicio `calendar` para configurar el host de Agent y el etiquetado de servicios unificado para la aplicación y para Docker:
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   calendar:
     container_name: calendar
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.calendar
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
   {{< /code-block >}}
1. En la sección del servicio `notes`, elimina los comentarios de la variable de entorno `CALENDAR_HOST` y la entrada `calendar` en `depends_on` para establecer las conexiones necesarias entre las dos aplicaciones. Tu servicio de notas debería tener este aspecto:
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   notes:
     container_name: notes
     restart: always
     build:
       context: ../
       dockerfile: ../dockerfile.notes
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
       - CALENDAR_HOST=calendar
     depends_on:
       - calendar
       - datadog-agent
   {{< /code-block >}}

1. Detén todos los contenedores en ejecución:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down{{< /code-block >}}

1. Pon en marcha tus contenedores de aplicación:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Envía una solicitud POST con el parámetro `add_date`:
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. En el Trace Explorer, haz clic en esta última traza `notes` para ver una traza distribuida entre ambos servicios:
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="Una gráfica de llamas para una traza distribuida." style="width:100%;" >}}

Esta gráfica de llamas combina interacciones de múltiples aplicaciones:
- El primer tramo es una solicitud POST enviada por el usuario y gestionada por el enrutador `chi` a través de la biblioteca `go-chi` compatible.
- El segundo tramo es una función `createNote` que fue rastreada manualmente por la función `makeSpanMiddleware`. La función creó un tramo a partir del contexto de la solicitud HTTP.
- El siguiente tramo es la solicitud enviada por la aplicación de notas utilizando la biblioteca `http` compatible y el cliente inicializado en el archivo `main.go`. Esta solicitud GET se envía a la aplicación de calendario. Los tramos de la aplicación de calendario aparecen en azul porque son servicios independientes.
- Dentro de la aplicación de calendario, un enrutador `go-chi` gestiona la solicitud GET y la función `GetDate` se rastrea manualmente con su propio tramo bajo la solicitud GET.
- Por último, la llamada `db` púrpura es su propio servicio de la biblioteca `sql` compatible. Aparece en el mismo nivel que la solicitud `GET /Calendar` porque ambas son llamadas por el tramo primario `CreateNote`.

## Solucionar problemas

Si no recibes trazas como esperabas, configura el modo de depuración para el trazador de Go. Lee [Activar el modo de depuración][13] para obtener más información.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/guide/#enabling-tracing-tutorials
[2]: /es/tracing/trace_collection/dd_libraries/go/
[3]: /es/account_management/api-app-keys/
[4]: /es/tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /es/getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /es/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /es/tracing/trace_collection/custom_instrumentation/go/
[13]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=go
[14]: /es/tracing/trace_collection/library_config/go/
[15]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[16]: /es/tracing/trace_collection/compatibility/go/#library-compatibility
[17]: /es/getting_started/tagging/unified_service_tagging/