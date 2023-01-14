---
title: Tutorial - Enabling Tracing for a Go Application on the Same Host as the Datadog Agent
kind: guide
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tags: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/go/
  tags: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/go/
  tags: Documentation
  text: Supported Go frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/go/
  tags: Documentation
  text: Manually configuring traces and spans
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tags: Documentation
  text: Ingestion mechanisms
- link: https://github.com/DataDog/dd-trace-Go
  tags: GitHub
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Go application installed on a host. In this scenario, you install a Datadog Agent on the same host as the application.

For other scenarios, including applications in containers or on cloud infrastructure, Agent in a container, and applications written in different languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Go Applications][2] for general comprehensive tracing setup documentation for Go.

### Prerequisites

- A Datadog account and [organization API key][3]
- A physical or virtual Linux host with root access when using sudo. The host has the following requirements:
  - Git
  - Curl
  - Go version 1.18+
  - Make and GCC

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][5] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][3]:

{{< code-block lang="bash" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [your Datadog site][6].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][8], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>

## Install and run a sample Go application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/DataDog/apm-tutorial-golang.git][9]. Clone the git repository by running:

{{< code-block lang="bash" >}}
git clone git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

To install the necessary libraries for the sample app, run the following command from the root directory of the repo:

{{< code-block lang="go">}}
go mod download
{{< /code-block >}}

Build the sample application using the following command:

{{< code-block lang="bash" >}}
make run
{{< /code-block >}}

Run the applications in the background with this command:

{{< code-block lang="bash" >}}
./cmd/notes/notes &
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

{{< code-block lang="bash" >}}
make exit
{{< /code-block >}}

## Install and run a sample instrumented Go application

Clone the git repository by running:

{{< code-block lang="bash" >}}
git clone git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

## Install Datadog tracing

Next, install the Go tracer. From your `apm-tutorial-golang` directory, run:

{{< code-block lang="bash" >}}
go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace
{{< /code-block >}}

Ensure that the following lines of code are present in each of the apps defined in `apm-tutorial-golang/cmd/calendar/main.go` and `apm-tutorial-golang/cmd/notes/main.go`:

{{< code-block lang="go" >}}
func main() {
	tracer.Start()
	defer tracer.Stop()
{{< /code-block >}}

## Launch the Go application with automatic instrumentation

To start generating and collecting traces, restart the sample application with additional flags that cause tracing data to be sent to Datadog.

<div class="alert alert-warning"><strong>Note</strong>: The flags on these sample commands, particularly the sample rate, are not necessarily appropriate for environments outside this tutorial. For information about what to use in your production environment, read <a href="#tracing-configuration">Tracing configuration</a>.</div>

From your `apm-tutorial-golang` directory, run:

{{< code-block lang="bash">}}
DD_TRACE_SAMPLE_RATE=1 DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.0.1 ./cmd/notes/notes &
{{< /code-block >}}

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

{{< img src="tracing/guide/tutorials/tutorial-go-host-traces.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

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

The tracing library enables the use of tags to help compile and display data accurately in the Datadog dashboard. This is done by enabling a few environment variables when running the application. The project `Makefile` includes the environment variables `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`, which are set to enable [Unified Service Tagging][47]:

{{< code-block lang="go" filename="Makefile" disable_copy="true" collapsible="true" >}}
run: build
	DD_TRACE_SAMPLE_RATE=1 DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.0.1 ./cmd/notes/notes &
{{< /code-block >}}

The `Makefile` also sets the environment variable `DD_TRACE_SAMPLE_RATE` to `1`, which represents a 100% sample rate. The guide sets a 100% sample rate to
ensure that all requests to the notes service are sent to the datadog backend for analysis and display. Avoid changing the sample rate in a production or high-volume environment. Setting a high sample rate in the application overrides the Agent configuration and results in a very large volume of data being sent to Datadog. For most use cases, allow the Agent to automatically determine the sampling rate.

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

The `main.go` file contains more implementation examples for each of these libraries. For an extensive list of libraries, see [Go Compatibility Requirements][46].

### Use custom tracing with context

In cases where code doesn't fall under a supported library, you can create spans manually. There are several examples of custom tracing in the sample application.

The `makeSpanMiddleware` function starts a span using the context found from the HTTP request. It sets the name of the span to the function name used to resolve the REST call:

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
func (nr *Router) Register() chi.Router {
	r := chi.NewRouter()
	r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
	r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
	r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
	r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
	r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123

	r.Post("/notes/quit", func(rw http.ResponseWriter, r *http.Request) {
		time.AfterFunc(1*time.Second, func() { os.Exit(0) })
		rw.Write([]byte("Goodbye\n"))
	}) //Quits program

	return r
}

func makeSpanMiddleware(name string, h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		span, ctx := tracer.StartSpanFromContext(r.Context(), name)
		r = r.WithContext(ctx)
		defer span.Finish()
		h.ServeHTTP(w, r)
	}
}
{{< /code-block >}}

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

The `privateMethod1` function demonstates creating a completely separate service from a context:

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

## Examine distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_.

The sample project includes a second application called `calendar` that returns a random date whenever it is invoked. The `POST` endpoint in the notes application has a second query parameter named `add_date`. When it is set to `y`, the notes application calls the calendar application to get a date to add to the note.

1. If needed, run `make run` again to start the sample application.
1. Send a POST request with the `add_date` parameter:
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. In the Trace Explorer, click this latest `notes` trace to see a distributed trace between the two services:
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

This flame graph combines interactions from multiple applications:
- The first span is a POST request sent by the user and handled by the chi router through the supported `go-chi` library.
- The second span is a `createNote` function that was manually traced by the `makeSpanMiddleware` function. The function created a span from the context of the HTTP request.
- The next span is the request sent by the notes application using the supported `http` library and the client initialized in the `main.go` file. This GET request is sent to the calendar application. The calendar application spans appear in blue because they are separate service.
- Inside the calendar application, there is a similar setup. A `go-chi` router handles the GET request, and the `GetDate` function is manually traced with its own span under the GET request.
- Finally, the purple `db` call is its own service from the supported SQL library and is the same level as the yellow notes `GET /Calendar` request since they are both called by the parent span `CreateNote`.

## Troubleshooting

If you're not receiving traces as expected, set up debug mode for the Java tracer. Read [Enable debug mode][13] to find out more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/go/
[3]: /account_management/api-app-keys/
[4]: /tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: /getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/go/
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[14]: /tracing/trace_collection/library_config/go/
[15]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[45]: https://app.datadoghq.com/apm/service-setup?architecture=host-based&language=go
[46]: /tracing/trace_collection/compatibility/go/#library-compatibility
[47]: /getting_started/tagging/unified_service_tagging/
