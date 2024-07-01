---
title: Tutorial - Enabling Tracing for a Go Application on the Same Host as the Datadog Agent
kind: guide
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tag: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/go/
  tag: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/go/
  tag: Documentation
  text: Supported Go frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/go/
  tag: Documentation
  text: Manually configuring traces and spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentation
  text: Ingestion mechanisms
- link: "https://github.com/DataDog/dd-trace-Go"
  tag: Source Code
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Go application installed on a host. In this scenario, you install a Datadog Agent on the same host as the application.

For other scenarios, including applications in containers or on cloud infrastructure, Agent in a container, and applications written in different languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Go Applications][2] for general comprehensive tracing setup documentation for Go.

### Prerequisites

- A Datadog account and [organization API key][3]
- A physical or virtual Linux host with root access when using `sudo`. The host has the following requirements:
  - Git
  - Curl
  - Go version 1.18+
  - Make and GCC

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][5] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][3]:

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [your Datadog site][6].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][8], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>

## Install and run a sample Go application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/DataDog/apm-tutorial-golang.git][9]. Clone the git repository by running:

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

Build the sample application using the following command. The command might take a while the first time you run it:

{{< code-block lang="shell" >}}
make runNotes
{{< /code-block >}}

The sample `notes` application is a basic REST API that stores data in an in-memory database. Use `curl` to send a few API requests:

`curl localhost:8080/notes`
: Returns `[]` because there is nothing in the database yet

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Adds a note with the description `hello` and an ID value of `1`. Returns `{"id":1,"description":"hello"}`.

`curl localhost:8080/notes/1`
: Returns the note with `id` value of `1`: `{"id":1,"description":"hello"}`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: Adds a note with the description `otherNote` and an ID value of `2`. Returns `{"id":2,"description":"otherNote"}`

`curl localhost:8080/notes`
: Returns the contents of the database: `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

Run more API calls to see the application in action. When you're done, run the following command to exit the application:

{{< code-block lang="shell" >}}
make exitNotes
{{< /code-block >}}

## Install Datadog tracing

Next, install the Go tracer. From your `apm-tutorial-golang` directory, run:

{{< code-block lang="shell" >}}
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
{{< /code-block >}}

Now that the tracing library has been added to `go.mod`, enable tracing support.

Uncomment the following imports in `apm-tutorial-golang/cmd/notes/main.go`:
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  "fmt"
{{< /code-block >}}

Change the import:

{{< code-block lang="go" >}}
_ "github.com/mattn/go-sqlite3"
{{< /code-block >}}

to:
{{< code-block lang="go" >}}
"github.com/mattn/go-sqlite3"
{{< /code-block >}}

In the `main()` function, uncomment the following lines:

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

In `setupDB()`, uncomment the following lines:

{{< code-block lang="go" filename="cmd/notes/main.go">}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Comment out the following line:
{{< code-block lang="go" filename="cmd/notes/main.go">}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

Once you've made these changes, run:
{{< code-block lang="shell" >}}
go mod tidy
{{< /code-block >}}

## Launch the Go application and explore automatic instrumentation

To start generating and collecting traces, launch the application again with `make runNotes`.

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

{{< code-block lang="go" filename="Makefile" disable_copy="true" collapsible="true" >}}
run: build
  DD_TRACE_SAMPLE_RATE=1 DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.0.1 ./cmd/notes/notes &
{{< /code-block >}}

<div class="alert alert-warning">The <code>Makefile</code> also sets the <code>DD_TRACE_SAMPLE_RATE</code> environment variable to <code>1</code>, which represents a 100% sample rate. A 100% sample rate ensures that all requests to the notes service are sent to the Datadog backend for analysis and display for the purposes of this tutorial. In an actual production or high-volume environment, you wouldn't specify this high of a rate. Setting a high sample rate with this variable in the application overrides the Agent configuration and results in a very large volume of data being sent to Datadog. For most use cases, allow the Agent to automatically determine the sampling rate.</div>

For more information on available configuration options, see [Configuring the Go Tracing Library][14].

### Use automatic tracing libraries

Datadog has several fully supported libraries for Go that allow for automatic tracing when implemented in the code. In the `cmd/notes/main.go` file, you can see the `go-chi`, `sql`, and `http` libraries being aliased to the corresponding Datadog libraries: `chitrace`, `sqltrace`, and `httptrace` respectively:

{{< code-block lang="go" filename="main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

In `cmd/notes/main.go`, the Datadog libraries are initialized with the `WithServiceName` option. For example, the `chitrace` library is initialized as follows:

{{< code-block lang="go" filename="main.go" disable_copy="true" collapsible="true" >}}
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

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
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

Uncomment the following imports:

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

Launch the application with `make runNotes` and try the `curl` commands again to observe the custom spans and traces you've just configured:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

{{< img src="tracing/guide/tutorials/privatemethod1.png" alt="A flame graph displaying custom traces for privteMethod1 and doLongRunningProcess" style="width:100%;" >}}

For more information on custom tracing, see [Go Custom Instrumentation][12].

## Examine distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the notes application has a second query parameter named `add_date`. When it is set to `y`, the notes application calls the calendar application to get a date to add to the note.

To enable tracing in the calendar application, uncomment the following lines in `cmd/calendar/main.go`:

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

1. If the notes application is still running, use `make exitNotes` to stop it.
1. Run `make run` to start the sample application.
1. Send a POST request with the `add_date` parameter:
   {{< code-block lang="shell">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

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
