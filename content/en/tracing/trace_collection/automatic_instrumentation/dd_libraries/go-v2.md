---
title: (v2) Tracing Go Applications
aliases:
- /tracing/go-v2/
- /tracing/languages/go-v2
- /agent/apm/go-v2/
- /tracing/setup/go-v2
- /tracing/setup_overview/go-v2
- /tracing/setup_overview/setup/go-v2
- /tracing/trace_collection/dd_libraries/go-v2
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Tracer library source code"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
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

<div class="alert alert-info">[PREVIEW] This documentation is for v2.x preview of the Go Tracer. If you are looking for v1.x documentation, see the <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/go">Tracing Go Applications</a> documentation.</div>


## Compatibility requirements

The Go Tracer requires Go `1.22+` and Datadog Agent `>= 5.21.1`. For a full list of Datadog's Go version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][5].

There are two ways to instrument your Go application:

1. **Manual instrumentation**:
   - Gives you complete control over which parts of your application are traced.
   - Requires modifying the application's source code.
2. **Compile-time instrumentation**:
   - Ensures maximum coverage of your tracing instrumentation.
   - Does not require source code modifications, making ideal for integrating at the CI/CD level.

Refer to the instructions in the section corresponding to your preference below:

{{% collapse-content title="Manual instrumentation" level="p" %}}
### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].
{{% /collapse-content %}}

{{% collapse-content title="Compile-time instrumentation (private beta)" level="p" %}}

<div class="card callout-card mb-4">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title text-black mt-0 mb-1">Orchestrion is currently in private beta</h5>
    <p class="card-text">
      Orchestrion is under active development, and Datadog is eager to hear from you. Request access if you are interested and would like to share your experience.
    </p>
    <a href="https://www.datadoghq.com/private-beta/compile-time-auto-instrumentation-for-go-lang-datadog-orchestrion/"
      target="_blank"
      class="btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center"
    >
      Request Access
    </a>
  </div>
</div>

### Overview

[Orchestrion][6] automatically adds instrumentation to Go applications during compilation, eliminating the need for code changes. It provides comprehensive tracing coverage and enables exclusive security features:

- Comprehensive tracing coverage:
   - Instruments your code and all dependencies, including the Go standard library
   - Instruments your code during compilation, preventing gaps in tracing coverage due to overlooked manual instrumentation
- Exclusive [Application Security Management][7] **Exploit Prevention** feature. Exploit Prevention is a Runtime Application Self-Protection (RASP) implementation and includes RASP methods such as Local File Inclusion (LFI).

### Requirements

- Supports the two latest Go runtime releases (matching [Go's official release policy][8]).
- Applications must be managed using [go modules][10]. Module vendoring is supported.

#### Supported packages

Orchestrion is under active development and supports a subset of integrations available in the [tracing library][1]. For the latest list of supported frameworks and their minimum Orchestrion versions, see the [Supported frameworks](#supported-frameworks).

### Install Orchestrion

To install and set up Orchestrion:

1. Install Orchestrion:
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info">Ensure <code>$(go env GOBIN)</code> (or <code>$(go env GOPATH)/bin</code>) is in your <code>$PATH</code>.</div>
   
1. Register Orchestrion in your project's `go.mod`:
   ```sh
   orchestrion pin
   ```
1. Commit changes to your version control system:
   ```sh
   git commit -m "chore: enable orchestrion" go.mod go.sum orchestrion.tool.go
   ```

Now you can manage your dependency on `orchestrion` like any other dependency using the `go.mod` file.

### Usage

Use one of these methods to enable Orchestrion in your build process:

#### Prepend `orchestrion` to your usual `go` commands:  
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
#### Add the `-toolexec="orchestrion toolexec"` argument to your `go` commands:
   ```sh
   go build -toolexec="orchestrion toolexec" .
   go run -toolexec="orchestrion toolexec" .
   go test -toolexec="orchestrion toolexec" ./...
   ```
#### Modify the `$GOFLAGS` environment variable to inject Orchestrion, and use `go` commands normally:
   ```sh
   # Make sure to include the quotes as shown below, as these are required for
   # the Go toolchain to parse GOFLAGS properly!
   export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
   go build .
   go run .
   go test ./...
   ```

#### Create custom trace spans

To create custom trace spans for functions accepting `context.Context` or `*http.Request` arguments, add the `//dd:span` directive comment to the function declaration:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction(ctx context.Context) {
  // ... implementation details ...
}
{{</code-block>}}

This also works with function literal expressions:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
handler := func(w http.ResponseWriter, r *http.Request) {
  // ... implementation details ...
}
{{</code-block>}}

#### Use the tracing library

You can use the [tracing library][4] in your Orchestrion-built application. This is useful for instrumenting frameworks not yet supported by Orchestrion. However, be aware that this may result in duplicated trace spans in the future as Orchestrion support expands. Review the [release notes][11] when updating your `orchestrion` dependency to stay informed about new features and adjust your manual instrumentation as necessary.

#### Use the continuous profiler

Your Orchestrion-built application includes [continuous profiler][12] instrumentation.
To enable the profiler, set the environment variable `DD_PROFILING_ENABLED=true` at run time.

### Supported frameworks

| Library                             | Minimum orchestrion version   |
|-------------------------------------|-------------------------------|
| `database/sql`                      | `v0.7.0`                      |
| `github.com/gin-gonic/gin`          | `v0.7.0`                      |
| `github.com/go-chi/chi/v5`          | `v0.7.0`                      |
| `github.com/go-chi/chi`             | `v0.7.0`                      |
| `github.com/go-redis/redis/v7`      | `v0.7.0`                      |
| `github.com/go-redis/redis/v8`      | `v0.7.0`                      |
| `github.com/gofiber/fiber/v2`       | `v0.7.0`                      |
| `github.com/gomodule/redigo/redis`  | `v0.7.0`                      |
| `github.com/gorilla/mux`            | `v0.7.0`                      |
| `github.com/labstack/echo/v4`       | `v0.7.0`                      |
| `google.golang.org/grpc`            | `v0.7.0`                      |
| `gorm.io/gorm`                      | `v0.7.0`                      |
| `net/http`                          | `v0.7.0`                      |
| `go.mongodb.org/mongo-driver/mongo` | `v0.7.3`                      |
| `k8s.io/client-go`                  | `v0.7.4`                      |
| `github.com/hashicorp/vault`        | `v0.7.4`                      |

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go-v2
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/go-v2/
[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[6]: https://github.com/DataDog/orchestrion
[7]: /security/application_security/threats/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[9]: https://www.datadoghq.com/support/
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /profiler