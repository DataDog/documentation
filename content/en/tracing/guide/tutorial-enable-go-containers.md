---
title: Tutorial - Enabling Tracing for a Go Application and Datadog Agent in Containers

further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: "Documentation"
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/go/
  tag: "Documentation"
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/go/
  tag: "Documentation"
  text: Supported Go frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: "Documentation"
  text: Manually configuring traces and spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: "Documentation"
  text: Ingestion mechanisms
- link: https://github.com/DataDog/dd-trace-Go
  tag: "Source Code"
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Go application installed on a container. In this scenario, the Datadog Agent is also installed in a container.

For other scenarios, including the application and Agent on a host, the application and Agent on cloud infrastructure, and on applications written in other languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Go Applications][2] for general comprehensive tracing setup documentation for Go.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Docker
- Curl
- Go version 1.18+
- Make and GCC

## Install the sample containerized Go application

The code sample for this tutorial is on GitHub, at [github.com/DataDog/apm-tutorial-golang.git][9]. To get started, clone the git repository:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

The repository contains a multi-service Go application pre-configured to be run within Docker containers. The sample app consists of a basic notes app and a calendar app, each with a REST API to add and change data. The `docker-compose` YAML files are located in the `docker` directory.

This tutorial uses the `all-docker-compose.yaml` file, which builds containers for both the notes and calendar applications and the Datadog Agent.

### Starting and exercising the sample application

1. Build the application containers by running:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build{{< /code-block >}}

1. Start the containers:

   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Verify that the containers are running with the `docker ps` command. You should see something like this:
   {{< code-block lang="shell" disable_copy="true" >}}
   CONTAINER ID   IMAGE                           COMMAND                  CREATED              STATUS                          PORTS                    NAMES
   0a4704ebed09   docker-notes                    "./cmd/notes/notes"      About a minute ago   Up About a minute               0.0.0.0:8080->8080/tcp   notes
   9c428d7f7ad1   docker-calendar                 "./cmd/calendar/cale…"   About a minute ago   Up About a minute               0.0.0.0:9090->9090/tcp   calendar
   b2c2bafa6b36   gcr.io/datadoghq/agent:latest   "/bin/entrypoint.sh"     About a minute ago   Up About a minute (unhealthy)   8125/udp, 8126/tcp       datadog-ag
   {{< /code-block >}}

1. The sample `notes` application is a basic REST API that stores data in an in-memory database. Use `curl` to send a few API requests:

   `curl localhost:8080/notes`
   : Returns `[]` because there is nothing in the database yet

   `curl -X POST 'localhost:8080/notes?desc=hello'`
   : Adds a note with the description `hello` and an ID value of `1`. Returns `{"id":1,"description":"hello"}`

   `curl localhost:8080/notes/1`
   : Returns the note with `id` value of `1`: `{"id":1,"description":"hello"}`

   `curl -X POST 'localhost:8080/notes?desc=otherNote'`
   : Adds a note with the description `otherNote` and an ID value of `2`. Returns `{"id":2,"description":"otherNote"}`

   `curl localhost:8080/notes`
   : Returns the contents of the database: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

1. Run more API calls to see the application in action. When you're done, shut down and remove the containers and make sure they've been removed:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down
   docker-compose -f all-docker-compose.yaml rm{{< /code-block >}}

## Enable tracing

Next, configure the Go application to enable tracing. Because the Agent runs in a container, there's no need to install anything.

To enable tracing support, uncomment the following imports in `apm-tutorial-golang/cmd/notes/main.go`:

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

In the `main()` function, uncomment the following lines:

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

In `setupDB()`, uncomment the following lines:

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Uncomment the following line:
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

## Add the Agent container

Add the Datadog Agent in the services section of your `all-docker-compose.yaml` file to add the Agent to your build:

1. Uncomment the Agent configuration, and specify your own [Datadog API key][3]:
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

1. Uncomment the `depends_on` fields for `datadog-agent` in the `notes` container.

1. Observe that in the `notes` service section, the `DD_AGENT_HOST` environment variable is set to the hostname of the Agent container. Your `notes` container section should look like this:
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
   You'll configure the `calendar` sections and variables later in this tutorial.

## Launch the containers to explore automatic instrumentation

Now that the Tracing Library is installed, spin up your application containers and start receiving traces. Run the following commands:

{{< code-block lang="shell" >}}
docker-compose -f all-docker-compose.yaml build
docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

To start generating and collecting traces, launch the application again with `make run`.

You can tell the Agent is working by observing continuous output in the terminal, or by opening the [Events Explorer][8] in Datadog and seeing the start event for the Agent:

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="Agent start event shown in Events Explorer" style="width:100%;" >}}

Use `curl` to again send requests to the application:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

Wait a few moments, and take a look at your Datadog UI. Navigate to [**APM > Traces**][11]. The Traces list shows something like this:

{{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

There are entries for the database (`db`) and the `notes` app. The traces list shows all the spans, when they started, what resource was tracked with the span, and how long it took.

If you don't see traces, clear any filter in the **Traces** Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

On the Traces page, click on a `POST /notes` trace, and you'll see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into the notes application).

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth.

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}

## Tracing configuration

You can configure the tracing library to add tags to the telemetry it sends to Datadog. Tags help group, filter, and display data meaningfully in dashboards and graphs. To add tags, specify environment variables when running the application. The project `Makefile` includes the environment variables `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`, which are set to enable [Unified Service Tagging][17]:

{{< code-block lang="go" filename="docker/all-docker-compose.yaml" disable_copy="true" >}}
environment:
  - DD_API_KEY=<DD_API_KEY_HERE>
  - DD_APM_ENABLED=true
  - DD_APM_NON_LOCAL_TRAFFIC=true
{{< /code-block >}}

For more information on available configuration options, see [Configuring the Go Tracing Library][14].

### Use automatic tracing libraries

Datadog has several fully supported libraries for Go that allow for automatic tracing when implemented in the code. In the `cmd/notes/main.go` file, you can see the `go-chi`, `sql`, and `http` libraries being aliased to the corresponding Datadog libraries: `chitrace`, `sqltrace`, and `httptrace` respectively:

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

In `cmd/notes/main.go`, the Datadog libraries are initialized with the `WithServiceName` option. For example, the `chitrace` library is initialized as follows:

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
r.Mount("/", nr.Register())
{{< /code-block >}}

Using `chitrace.WithServiceName("notes")` ensures that all elements traced by the library fall under the service name `notes`.

The `main.go` file contains more implementation examples for each of these libraries. For an extensive list of libraries, see [Go Compatibility Requirements][16].

### Use custom tracing with context

In cases where code doesn't fall under a supported library, you can create spans manually.

Remove the comments around the `makeSpanMiddleware` function in `notes/notesController.go`. It generates middleware that wraps a request in a span with the supplied name. To use this function, comment out the following lines:

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
r.Get("/notes", nr.GetAllNotes)                // GET /notes
r.Post("/notes", nr.CreateNote)                // POST /notes
r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123
{{< /code-block >}}

Remove the comments around the following lines:

{{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
{{< /code-block >}}

Also remove the comment around the following import:

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

There are several examples of custom tracing in the sample application. Here are a couple more examples. Remove the comments to enable these spans:

The `doLongRunningProcess` function creates child spans from a parent context:

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

The `privateMethod1` function demonstrates creating a completely separate service from a context:

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

For more information on custom tracing, see [Go Custom Instrumentation][12].

## Add a second application to see distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the notes application has a second query parameter named `add_date`. When it is set to `y`, the notes application calls the calendar application to get a date to add to the note.

To enable tracing in the calendar application:

1. Uncomment the following lines in `cmd/calendar/main.go`:
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

1. Open `docker/all-docker-compose.yaml` and uncomment the `calendar` service to set up the Agent host and Unified Service Tags for the app and for Docker:
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
1. In the `notes` service section, uncomment the `CALENDAR_HOST` environment variable and the `calendar` entry in `depends_on` to make the needed connections between the two apps. Your notes service should look like this:
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

1. Stop all running containers:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down{{< /code-block >}}

1. Spin up your application containers:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. Send a POST request with the `add_date` parameter:
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. In the Trace Explorer, click this latest `notes` trace to see a distributed trace between the two services:
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

This flame graph combines interactions from multiple applications:
- The first span is a POST request sent by the user and handled by the `chi` router through the supported `go-chi` library.
- The second span is a `createNote` function that was manually traced by the `makeSpanMiddleware` function. The function created a span from the context of the HTTP request.
- The next span is the request sent by the notes application using the supported `http` library and the client initialized in the `main.go` file. This GET request is sent to the calendar application. The calendar application spans appear in blue because they are separate service.
- Inside the calendar application, a `go-chi` router handles the GET request and the `GetDate` function is manually traced with its own span under the GET request.
- Finally, the purple `db` call is its own service from the supported `sql` library. It appears at the same level as the `GET /Calendar` request because they are both called by the parent span `CreateNote`.

## Troubleshooting

If you're not receiving traces as expected, set up debug mode for the Go tracer. Read [Enable debug mode][13] to find out more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/go/
[3]: /account_management/api-app-keys/
[4]: /tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/go/
[13]: /tracing/troubleshooting/tracer_debug_logs/?code-lang=go
[14]: /tracing/trace_collection/library_config/go/
[15]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[16]: /tracing/trace_collection/compatibility/go/#library-compatibility
[17]: /getting_started/tagging/unified_service_tagging/
