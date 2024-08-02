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
title: 'Tutorial: Activación del rastreo de una aplicación Go en el mismo host que
  el Datadog Agent'
---

## Información general

Este tutorial te guiará a través de los pasos para habilitar el rastreo en una aplicación Go de ejemplo instalada en un host. En este caso, el Datadog Agent está instalado en el mismo host que la aplicación.

Para otros casos, incluyendo el de aplicaciones en contenedores o en infraestructuras en la nube, el de un Agent en un contenedor y el de aplicaciones escritas en otros lenguajes, consulta [Tutoriales: activación del rastreo][1].

Consulta [Rastreo de aplicaciones Go][2] para obtener documentación general sobre la configuración del rastreo para Go.

### Requisitos previos

- Una cuenta de Datadog y una [clave de API de la organización][3]
- Un host de Linux físico o virtual con acceso root (raíz) cuando se utiliza `sudo`. El host tiene los siguientes requisitos:
  - Git
  - Curl
  - Go versión 1.18+
  - Make y GCC

## Instalación del Agent

Si no tienes instalado el Datadog Agent en tu máquina, ve a [**Integrations > Agent** (Integraciones > Agent)][5] y selecciona tu sistema operativo. Por ejemplo, en la mayoría de las plataformas Linux, puedes instalar el Agent ejecutando el siguiente script, sustituyendo `<YOUR_API_KEY>` por tu [clave de API de Datadog][3]:

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"{{< /code-block >}}

Para enviar datos a un sitio Datadog distinto de `datadoghq.com`, sustituye la variable de entorno `DD_SITE` por [tu sitio de Datadog][6].

Verifica que el Agent se está ejecutando y está enviando datos a Datadog, al acceder a [**Events > Explorer** (Eventos > Explorador)][8]. También puedes filtrar por la faceta `Datadog` de origen y buscar un evento que confirme la instalación del Agent en el host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer que muestra un mensaje de Datadog que indica que el Agent se instaló en un host." style="width:70%;" >}}

<div class="alert alert-info">Si al cabo de unos minutos no ves tu host en Datadog (en <strong>Infraestructure > Host map</strong> (Infraestructura > Mapa de hosts)), asegúrate de haber utilizado la clave de API correcta para tu organización, disponible en <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a> (Parámetros de organización > Claves de API).</div>

## Instalación y ejecución de la aplicación de ejemplo Go

A continuación, instala una aplicación de ejemplo para rastrear. El código de ejemplo para este tutorial se puede encontrar en [github.com/DataDog/apm-tutorial-golang.git][5]. Clona el repositorio git ejecutando:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

Crea la aplicación de ejemplo mediante el siguiente comando. El comando puede tardar un poco la primera vez que lo ejecutes:

{{< code-block lang="shell" >}}
make runNotes
{{< /code-block >}}

La aplicación de ejemplo `notes` es una API REST básica que almacena datos en una base de datos en memoria. Utiliza `curl` para enviar algunas solicitudes API:

`curl localhost:8080/notes`
: devuelve `[]` porque todavía no hay nada en la base de datos

`curl -X POST 'localhost:8080/notes?desc=hello'`
: añade una nota con la descripción `hello` y un valor de ID de `1`. Devuelve `{"id":1,"description":"hello"}`.

`curl localhost:8080/notes/1`
: devuelve la nota con el valor `id` de `1`: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: añade una nota con la descripción `otherNote` y un valor de ID de `2`. Devuelve `{"id":2,"description":"otherNote"}`

`curl localhost:8080/notes`
: devuelve el contenido de la base de datos: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

Ejecuta más llamadas a la API para ver la aplicación en acción. Cuando hayas terminado, ejecuta el siguiente comando para salir de la aplicación:

{{< code-block lang="shell" >}}
make exitNotes
{{< /code-block >}}

## Instalación del rastreo de Datadog

A continuación, instala el rastreador de Go. Desde tu directorio `apm-tutorial-golang`, ejecuta:

{{< code-block lang="shell" >}}
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
{{< /code-block >}}

Ahora que se ha añadido la biblioteca de rastreo a `go.mod`, activa el soporte de rastreo.

Elimina los comentarios de las siguientes importaciones en `apm-tutorial-golang/cmd/notes/main.go`:
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  "fmt"
{{< /code-block >}}

Cambia la importación:

{{< code-block lang="go" >}}
_ "github.com/mattn/go-sqlite3"
{{< /code-block >}}

to:
{{< code-block lang="go" >}}
"github.com/mattn/go-sqlite3"
{{< /code-block >}}

En la función `main()`, elimina los comentarios de las siguientes líneas:

{{< code-block lang="go" filename="cmd/notes/main.go">}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go">}}
client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
        return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
    }))
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go">}}
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
{{< /code-block >}}

En `setupDB()`, elimina los comentarios de las siguientes líneas:

{{< code-block lang="go" filename="cmd/notes/main.go">}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Elimina los comentarios en la siguiente línea:
{{< code-block lang="go" filename="cmd/notes/main.go">}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Una vez realizados estos cambios, ejecuta:
{{< code-block lang="shell" >}}
go mod tidy
{{< /code-block >}}

## Inicia la aplicación Go y explora la instrumentación automática

Para empezar a generar y recopilar trazas, inicia de nuevo la aplicación con `make runNotes`.

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

{{< code-block lang="go" filename="Makefile" disable_copy="true" collapsible="true" >}}
run: build
  DD_TRACE_SAMPLE_RATE=1 DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.0.1 ./cmd/notes/notes &
{{< /code-block >}}

<div class="alert alert-warning">El <code>Makefile</code> también establece la variable de entorno <code>DD_TRACE_SAMPLE_RATE</code> en <code>1</code>, que representa una frecuencia de muestreo del 100%. Una frecuencia de muestreo del 100% garantiza que todas las solicitudes al servicio de notas se envíen al backend de Datadog para su análisis y visualización a efectos de este tutorial. En una producción real o un entorno de alto volumen, no se especificaría una frecuencia tan alta. Establecer una frecuencia de muestreo alta con esta variable en la aplicación anula la configuración del Agent y resulta en un gran volumen de datos enviados a Datadog. Para la mayoría de los casos de uso, deja que el Agent determine automáticamente la frecuencia de muestreo.</div>

Para obtener más información sobre las opciones disponibles de configuración, consulta [Configuración de la biblioteca de rastreo de Go][14].

### Uso de bibliotecas de rastreo automático

Datadog dispone de varias bibliotecas completamente compatibles para Go que permiten el rastreo automático cuando se implementan en el código. En el archivo `cmd/notes/main.go`, puedes ver que las bibliotecas `go-chi`, `sql` y `http` tienen alias según las correspondientes bibliotecas de Datadog: `chitrace` `sqltrace` y `httptrace` respectivamente:

{{< code-block lang="go" filename="main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

En `cmd/notes/main.go`, las bibliotecas de Datadog se inicializan con la opción `WithServiceName`. Por ejemplo,  la biblioteca `chitrace` se inicializa de la siguiente manera:

{{< code-block lang="go" filename="main.go" disable_copy="true" collapsible="true" >}}
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

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
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

Elimina los comentarios de las siguientes importaciones:

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

Inicia la aplicación con `make runNotes` y prueba de nuevo los comandos `curl` para observar los tramos y trazas personalizados que acabas de configurar:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

{{< img src="tracing/guide/tutorials/privatemethod1.png" alt="Una gráfica de llamas que muestra trazas personalizadas para privteMethod1 y doLongRunningProcess" style="width:100%;" >}}

Para obtener más información sobre el rastreo personalizado, consulta [Instrumentación personalizada de Go][12].

## Análisis de las trazas distribuidas

El rastreo de una única aplicación es un buen comienzo, pero el verdadero valor del rastreo consiste en ver cómo fluyen las solicitudes a través de tus servicios. Esto se llama _rastreo distribuido_.

El proyecto de ejemplo incluye una segunda aplicación llamada `calendar` que devuelve una fecha aleatoria cada vez que se invoca. El endpoint `POST` de la aplicación de notas tiene un segundo parámetro de consulta llamado `add_date`. Cuando se configura en `y`, la aplicación de notas llama a la aplicación de calendario para obtener una fecha y añadirla a una nota.

Para activar el rastreo en la aplicación de calendario, elimina los comentarios de las siguientes líneas en `cmd/calendar/main.go`:

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

1. Si la aplicación de notas sigue ejecutándose, utiliza `make exitNotes` para detenerla.
1. Ejecuta `make run` para iniciar la aplicación de ejemplo.
1. Envía una solicitud POST con el parámetro `add_date`:
   {{< code-block lang="shell">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

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