---
title: Automatic Compile-Time Instrumentation for Go
code_lang: go
further_reading:
- link: https://datadoghq.dev/orchestrion
  tag: Documentation
  text: Reference documentation
- link: https://github.com/DataDog/orchestrion/discussions
  tag: GitHub
  text: Discuss on GitHub
- link: https://github.com/DataDog/orchestrion/releases
  tag: GitHub
  text: Releases
- link: https://github.com/DataDog/orchestrion
  tag: GitHub
  text: Source code
---

<div class="alert alert-info">

  This feature is under active development.

  Early adopters are encouraged to provide feedback via any of the following channels:
  - [GitHub issues][1]
  - [This form][2]
  - [GitHub discussions][3]

</div>

## Introduction

Orchestrion is Datadog's automatic compile-time instrumentation tool for Go applications. It automatically adds instrumentation (backed by the [Go Datadog Trace library][4]) to Go applications during compilation.

Running at compile-time allows Orchestrion to not only instrument your own code, but also all of your dependencies' as
well as the Go standard library, ensuring you get the best coverage possible.

## Compatibility

### Go language

Orchestrion supports the two latest releases of Go, matching Go's [official release policy][5]. Older releases may function, but are not supported by default. For special requests, [contact support][6].

Orchestrion only supports [go modules][7].

### Framework Support

While the goal is to eventually support all integrations available in the [Go Datadog Trace library][4], support is currently only built for a gowing subset of them. The complete list of supported frameworks can be found in the [documentation][8].

## Getting Started

### Installation

1. Install Orchestrion in your environment:
   ```sh
   go install github.com/datadog/orchestrion@latest
   ```
   Make sure `$(go env GOBIN)` (or `$(go env GOPATH)/bin`) is present in your `$PATH`.
2. Register Orchestrion in your project's `go.mod` to ensure reproductibe builds:
   ```sh
   orchestrion pin
   ```
3. Commit changes to your version control system:
   ```sh
   git commit -m "chore: enable orchestrion" go.mod go.sum orchestrion.tool.go
   ```

### Usage

Adjust your build commands or environment to be Orchestrion-enabled using either of these options:

- **Use `orchestrion go`:** Simply prepend all your usual `go` commands with `orchestrion`. For example:
  ```sh
  orchestrion go build .
  orchestrion go run .
  orchestrion go test ./...
  ```
- **Add a `-toolexec` argument:** Manually add the required `-toolexec="orchestrion toolexec"` argument to your `go` commands:
  ```sh
  go build -toolexec="orchestrion toolexec" .
  go run -toolexec="orchestrion toolexec" .
  go test -toolexec="orchestrion toolexec" ./...
  ```
- **Modify `$GOFLAGS`:** Modify the `$GOFLAGS` environment variable to inject orchestrion, and use `go` commands normally:
  ```sh
  # Make sure to include the quotes as shown below, as these are required for
  # the Go toolchain to parse GOFLAGS properly!
  export GOFLAGS="${GOFLAGS} '-toolexec=orchestrion toolexec'"
  go build .
  go run .
  go test ./...
  ```

## Manual instrumentation

While Orchestrion automatically instruments your application for supported [integrations][4], there may be cases where
you still want to manuall add instrumentation to specific sections of your code.

### Custom trace spans

Apply the `//dd:span` comment on any function that accepts a `context.Context` or `*http.Request` argument, and Orchestrion will automatically create a trace span for all invocations of this function. This also works for function expressions.

```go
//dd:span custom_tag:tag_value
func CriticalPathFunction(ctx context.Context) {
  // ... implementation details ...
}
```

### Using the Tracer library

You can use the [Tracer library][4] in your application even if Orchestrion is in use. This can be used to instrument features that Orchestrion does not currently support.

If Orchestrion gets support for this feature at a later point, the manual call may result in duplicated spans being present in the traces, which can easily be resolved by removing the manual calls that are no longer needed. Refer to Orchestrion [release notes][9] to learn about new features.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/orchestrion/issues/new/choose
[2]: https://TBD
[3]: https://github.com/DataDog/orchestrion/discussions
[4]: /tracing/trace_collection/compatibility/go/
[5]: https://go.dev/doc/devel/release#policy
[6]: https://www.datadoghq.com/support/
[7]: https://pkg.go.dev/cmd/go#hdr-Modules__module_versions__and_more
[8]: https://datadoghq.dev/orchestrion/docs/built-in/
[8]: https://datadoghq.dev/orchestrion/docs/getting-started/
[9]: https://github.com/DataDog/orchestrion/releases
