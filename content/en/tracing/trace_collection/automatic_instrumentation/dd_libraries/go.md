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

There are two ways to instrument your Go application:

1. **Manual instrumentation**:
   - Gives you complete control over which parts of your application are traced.
   - Requires modifying the application's source code.
2. **Compile-time instrumentation**:
   - Ensures maximum coverage of your tracing instrumentation.
   - Does not require source code modifications, making ideal for integrating at the CI/CD level.

Refer to the instructions in the section corresponding to your preference below:

{{< tabs >}}
{{% tab "Manual instrumentation" %}}

### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].

[1]: /tracing/compatibility_requirements/go
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace

{{% /tab %}}

{{% tab "Compile-time instrumentation" %}}

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

Custom trace spans can be automtically created for any function annotated with the `//dd:span` directive comment:

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

##### Operation Name

The name of the operation (`span.name`) is determined automatically using the following precedence:
1. An explicit `span.name:customOperationName` tag specified as a directive argument
2. The function's declared name (this does not apply to function literal expressions, which are anonymous)
3. The value of the very first tag provided to the directive arguments list

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span tag-name:spanName other-tag:bar span.name:operationName
func tracedFunction() {
  // This functino will be represented as a span named "operationName"
}

//dd:span tag-name:spanName other-tag:bar
func otherTracedFunction() {
  // This functino will be represented as a span named "otherTracedFunction"
}

//dd:span tag-name:spanName other-tag:bar
tracedFunction := func() {
  // This function will be represented as a span named "spanName"
}
{{</code-block>}}

##### Error Results

If the annotated function returns an `error` result, any error returned by the function will be automatically attached to the corresponding trace span:

{{<code-block lang="go" filename="example.go" collapsible="true">}}
//dd:span
func failableFunction() (any, error) {
  // This span will have error information attached automatically.
  return nil, errors.ErrUnsupported
}
{{</code-block>}}

#### Use the tracing library

You can use the [tracing library][4] in your Orchestrion-built application. This is useful for instrumenting frameworks not yet supported by Orchestrion. However, be aware that this may result in duplicated trace spans in the future as Orchestrion support expands. Review the [release notes][11] when updating your `orchestrion` dependency to stay informed about new features and adjust your manual instrumentation as necessary.

#### Use the continuous profiler

Your Orchestrion-built application includes [continuous profiler][12] instrumentation.
To enable the profiler, set the environment variable `DD_PROFILING_ENABLED=true` at runtime.

### Troubleshooting

To troubleshoot `orchestrion`-managed builds, see [Troubleshooting Go Compile-Time Instrumentation][13]

[1]: /tracing/compatibility_requirements/go
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[6]: https://github.com/DataDog/orchestrion
[7]: /security/application_security/threats/exploit-prevention
[8]: https://go.dev/doc/devel/release#policy
[9]: https://www.datadoghq.com/support/
[10]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[11]: https://github.com/DataDog/orchestrion/releases
[12]: /profiler
[13]: /tracing/troubleshooting/go_compile_time/

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
