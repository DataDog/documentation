---
title: Tracing Go Applications
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
- /tracing/setup/go
- /tracing/setup_overview/go
- /tracing/setup_overview/setup/go
- /tracing/trace_collection/dd_libraries/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Tracer library source code"
- link: "https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "External Site"
  text: "Tracer library API documentation"

- link: https://github.com/DataDog/orchestrion
  tag: "Source Code"
  text: "Orchestrion source code"
- link: https://datadoghq.dev/orchestrion
  tag: "External Site"
  text: "Orchestrion documentation"

- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Compatibility requirements

The Go Tracer requires Go `1.18+` and Datadog Agent `>= 5.21.1`. For a full list of Datadog's Go version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][5].

You can now choose to either:
1. manually instrument your application
   + this gives you complete control over which parts of your application are traced
   + this requires modifying the application's source code
2. have tooling automatically instrument your application and all of its dependencies at compile-time
   + this ensures maximum coverage of your tracing instrumentation
   + this does not require source code modifications, making ideal for integrating at the CI/CD level

Refer to the instructions in the section corresponding to your preference below:

{{% collapse-content title="Manual Instrumentation" %}}
### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].
{{% /collapse-content %}}

{{% collapse-content title="Automatic Compile-Time Instrumentation (Alpha)" %}}

<div class="card callout-card mb-4">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title text-black mt-0 mb-1">Orchestrion is currently in Alpha</h5>
    <p class="card-text">
      Orchestrion is currently under active development, and we are eager to hear about your experience &ndash; good or bad. Fill out this form to let us know you are interested in talking to us about your experience.
    </p>
    <a href="TBD"
      target="_blank"
      class="btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center"
    >
      Let us know you're interested
    </a>
  </div>
</div>

### Using Orchestrion

[Orchestrion][6] is Datadog's automatic compile-time instrumentation tool for Go application. It automatically adds instrumentation (backed by the [Go Datadog Trace library][4]) to applications during compilation.

Running during compilation allows `orchestrion` to not only instrument your own code, but also all of your dependencies' code, including the Go standard library, ensuring you get the best tracing coverage possible.

Some of Datadog's [Application Security Management][7] features are also only available to Go applications built using `orchestrion`.

#### Additional Requirements

Orchestrion supports the two latest releases of the Go runtime, matching [Go's official release policy][8]. Older Go runtimes may function, but are not supported by default. For special requests, [contact support][9].

In order to be built with `orchestrion`, applications must be managed using [go modules][10]. Module vendoring is supported.

#### Supported Packages

Orchestrion is currently under active development and does not yet support all integrations available in the [tracer library][1].

{{% collapse-content title="Currently supported frameworks" level="h5" %}}
Library                             | Minimum `orchestrion` version |
------------------------------------|:-----------------------------:|
`database/sql`                      | `v0.7.0`                      |
`github.com/gin-gonic/gin`          | `v0.7.0`                      |
`github.com/go-chi/chi/v5`          | `v0.7.0`                      |
`github.com/go-chi/chi`             | `v0.7.0`                      |
`github.com/go-redis/redis/v7`      | `v0.7.0`                      |
`github.com/go-redis/redis/v8`      | `v0.7.0`                      |
`github.com/gofiber/fiber/v2`       | `v0.7.0`                      |
`github.com/gomodule/redigo/redis`  | `v0.7.0`                      |
`github.com/gorilla/mux`            | `v0.7.0`                      |
`github.com/jinzhu/gorm`            | `v0.7.0`                      |
`github.com/labstack/echo/v4`       | `v0.7.0`                      |
`google.golang.org/grpc`            | `v0.7.0`                      |
`gorm.io/gorm`                      | `v0.7.0`                      |
`net/http`                          | `v0.7.0`                      |
`go.mongodb.org/mongo-driver/mongo` | `v0.7.3`                      |
`k8s.io/client-go`                  | `v0.7.4`                      |
`github.com/hashicorp/vault`        | `v0.7.4`                      |
{{% /collapse-content %}}

#### Installation

<ol>
<li>
Install Orchestrion in your environment:
{{<code-block lang="sh">}}go install github.com/datadog/orchestrion@latest{{</code-block>}}
Make sure `$(go env GOBIN)` (or `$(go env GOPATH)/bin`) is present in your `$PATH`.
</li>
<li>
Register Orchestrion in your project's `go.mod` to ensure reproductibe builds:
{{<code-block lang="sh">}}orchestrion pin{{</code-block>}}
</li>
<li>
Commit changes to your version control system:
{{<code-block lang="sh">}}git commit -m "chore: enable orchestrion" go.mod go.sum orchestrion.tool.go{{</code-block>}}
</li>
<li>
You can now manage your dependency on `orchestrion` like any other dependency via the `go.mod` file
</li>
</ol>

#### Usage

Adjust your build commands or environment to be Orchestrion-enabled using either of these options:

{{% collapse-content title="Use <tt>orchestrion go</tt>" level="h5" %}}
Simply prepend all your usual `go` commands with `orchestrion`. For example:

{{< code-block lang="sh" disable_copy="true" >}}
orchestrion go build .
orchestrion go run .
orchestrion go test ./...
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Add a <tt>-toolexec</tt> argument" level="h5" %}}
Manually add the required `-toolexec="orchestrion toolexec"` argument to your `go` commands:

{{< code-block lang="sh" disable_copy="true" >}}
go build -toolexec="orchestrion toolexec" .
go run -toolexec="orchestrion toolexec" .
go test -toolexec="orchestrion toolexec" ./...
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Modify <tt>$GOFLAGS</tt>" level="h5" %}}
Modify the `$GOFLAGS` environment variable to inject orchestrion, and use `go` commands normally:

{{< code-block lang="sh" disable_copy="true" >}}
# Make sure to include the quotes as shown below, as these are required for
# the Go toolchain to parse GOFLAGS properly!
export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
go build .
go run .
go test ./...
{{< /code-block >}}
{{% /collapse-content %}}

#### Custom trace spans

When using `orchestrion`, you can create custom trace spans for any function that accepts a `context.Context` or `*http.Request` argument by adding the `//dd:span` directive comment to the function declaration.

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction(ctx context.Context) {
  // ... implementation details ...
}
{{</code-block>}}

This also works with function literal expresions:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### Using the Tracer library

You can use the [Tracer library][4] in your application even if `orchestrion` is used to build it.

While this can be useful when instrumenting frameworks that are not yet supported by `orchestrion`, this may result in duplicated trace spans appearing in the future when `orchestrion` get support for the framework in question. Carefully review the [release notes][11] when updating your `orchestrion` dependency to learn about new features and adjust your manual instrumentation as necessary.

{{% /collapse-content %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[6]: https://github.com/DataDog/orchestrion
[7]: /security/application_security
[8]: https://go.dev/doc/devel/release#policy
[9]: https://www.datadoghq.com/support/
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
