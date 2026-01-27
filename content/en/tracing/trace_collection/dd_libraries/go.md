---
title: Tracing Go Applications
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
- /tracing/setup/go
- /tracing/setup_overview/go
- /tracing/setup_overview/setup/go
- /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Tracer library source code"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "Tracer library API documentation"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "Tracer library API documentation for v2"
- link: https://github.com/DataDog/orchestrion
  tag: "Source Code"
  text: "Orchestrion source code"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Compatibility requirements

The Go Tracer requires Go `1.18+` and Datadog Agent `>= 5.21.1`. For a full list of Datadog's Go version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

{{% tracing-go-v2 %}}

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][5].

There are two ways to instrument your Go application:

1. **Compile-time instrumentation**:
   - Ensures maximum coverage of your tracing instrumentation.
   - Does not require source code modifications, making ideal for integrating at the CI/CD level.
1. **Manual instrumentation**:

   Use dd-trace-go in conjunction with our integration packages to automatically generate spans about libraries of your choosing. This option:
   - Gives you complete control over which parts of your application are traced.
   - Requires modifying the application's source code.

Refer to the instructions in the section corresponding to your preference below:

{{< tabs >}}

{{% tab "Compile-time instrumentation" %}}

### Overview

[Orchestrion][6] automatically adds instrumentation to Go applications during compilation, eliminating the need for code changes. It provides comprehensive tracing coverage and enables exclusive security features:

- Comprehensive tracing coverage:
   - Instruments your code and all dependencies, including the Go standard library
   - Instruments your code during compilation, preventing gaps in tracing coverage due to overlooked manual instrumentation
- Exclusive [App and API Protection][7] **Exploit Prevention** feature. [Exploit Prevention][15] is a Runtime Application Self-Protection (RASP) implementation and includes RASP methods such as Local File Inclusion (LFI).

### Requirements

- Supports the two latest Go runtime releases (matching [Go's official release policy][8]).
- Applications must be managed using [go modules][10]. Module vendoring is supported.


### Install Orchestrion

To install and set up Orchestrion:

1. Install Orchestrion:
   ```sh
   go install github.com/DataDog/orchestrion@latest
   ```
   <div class="alert alert-info">Ensure that <code>$(go env GOBIN)</code> or <code>$(go env GOPATH)/bin</code> is in your <code>$PATH</code>.</div>

1. Register Orchestrion in your project's `go.mod`:
   ```sh
   orchestrion pin
   ```
   Refer to the output of `orchestrion pin -help` for more information about available customization options.
1. Commit changes to your version control system (unless you are integrating `orchestrion` directly in your CI/CD pipeline):
   ```sh
   git add go.mod go.sum orchestrion.tool.go
   git commit -m "chore: enable orchestrion"
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

### Trace Customization

#### Setting up Unified Service Tagging

Applications instrumented by `orchestrion` support Unified Service Tagging (UST). You can set UST tags for your traces by setting the corresponding environment variable in your application's **runtime** environment:

| Unified Tag | Environment  |
|-------------|--------------|
| `env`       | `DD_ENV`     |
| `service`   | `DD_SERVICE` |
| `version`   | `DD_VERSION` |

For more information, refer to the [Unified Service Tagging documentation][14].

#### Tracer configuration

Refer to [Library Configuration][16] for configuration instructions.

#### Create custom trace spans

Custom trace spans can be automatically created for any function annotated with the `//dd:span` directive comment:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span custom_tag:tag_value
func CriticalPathFunction() {
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

#### Operation Name

The name of the operation (`span.name`) is determined automatically using the following precedence:
1. An explicit `span.name:customOperationName` tag specified as a directive argument
2. The function's declared name (this does not apply to function literal expressions, which are anonymous)
3. The value of the very first tag provided to the directive arguments list

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This function will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This function will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

#### Error Results

If the annotated function returns an `error` result, any error returned by the function will be automatically attached to the corresponding trace span:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### Prevent instrumentation of some code

You can use the `//orchestrion:ignore` directive to prevent `orchestrion` from performing _any_ modification on the annotated code.

This can be used to prevent caller-side instrumentation from being applied to specific locations:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
import "database/sql"

// Caller-side instrumentation normally happens within this function...
func normal() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as it is opted out by the orchestrion:ignore directive:
  //orchestrion:ignore
  db, err := sql.Open("driver-name", "database=example")
  // ...
}

// Caller-side instrumentation will NOT happen in the following function
// as it is annotated with orchestrion:ignore.
//orchestrion:ignore
func excluded() {
  // The following assignment will NOT be modified to add any caller-side
  // instrumentation as the surrounding context is excluded by an
  // orchestrion:ignore directive:
  db, err := sql.Open("driver-name", "database=example")
  // ...
}
{{</code-block>}}

Some of the instrumentation performed by `orchestrion` is done callee-side (or library-side), meaning the integration is added directly within the dependency itself. In such cases, it is not possible to locally opt out of such integrations.

#### Use the tracing library

You can use the [tracing library][4] in your Orchestrion-built application. This is useful for instrumenting frameworks not yet supported by Orchestrion. However, be aware that this may result in duplicated trace spans in the future as Orchestrion support expands. Review the [release notes][11] when updating your `orchestrion` dependency to stay informed about new features and adjust your manual instrumentation as necessary.

#### Use the continuous profiler

Your Orchestrion-built application includes [continuous profiler][12] instrumentation.
To enable the profiler, set the environment variable `DD_PROFILING_ENABLED=true` at runtime.

#### Remove integrations

You can remove integrations by modifying the imports in the `orchestrion.tool.go` file.
You can also create your own `orchestrion.tool.go` file before you run `orchestrion`.
You might do this if you don't want an integration,
or if you want to reduce the number of transitive dependencies for integrations your program doesn't use.
By default, Orchestrion imports `github.com/DataDog/dd-trace-go/orchestrion/all/v2`,
which imports every library for which there is an Orchestrion integration.
You can replace this import with imports of only the integrations you want to use.
See [the tracer source code][17] for the list of supported integrations.

**Note**: If you choose to import specific integrations, you must manually update `orchestrion.tool.go` each time you want to add a new integration.

### Building with Docker

For more information on how to create a fitting Docker image, See [Creating a Dockerfile for APM for Go][18].

### Troubleshooting

To troubleshoot builds that `orchestrion` manages, see [Troubleshooting Go Compile-Time Instrumentation][13].

[4]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /security/application_security/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /profiler
[13]: /tracing/troubleshooting/go_compile_time/
[14]: /getting_started/tagging/unified_service_tagging/
[15]: /security/application_security/exploit-prevention/
[16]: /tracing/trace_collection/library_config/go/#traces
[17]: https://github.com/DataDog/dd-trace-go/blob/main/orchestrion/all/orchestrion.tool.go
[18]: /tracing/troubleshooting/go_compile_time/dockerfile/

{{% /tab %}}

{{% tab "Manual instrumentation" %}}

### Add the tracer library to your application

First, import and start the tracer in your code following the [Library Configuration][3] documentation. Refer to the [API documentation][6] (or the [API documentation v1][4]) for configuration instructions and details about using the API.

### Activate Go integrations to create spans

Activate [Go integrations][1] to generate spans. Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each integration.

[1]: /tracing/compatibility_requirements/go
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace

{{% /tab %}}

{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
