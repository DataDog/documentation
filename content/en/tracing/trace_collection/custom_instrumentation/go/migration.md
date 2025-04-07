---
title: Migrate to Go Tracer v2
description: 'Upgrade your Go tracer from v1 to v2.'
aliases:
  - /tracing/trace_collection/custom_instrumentation/opentracing/go
further_reading:
    - link: 'tracing/trace_collection/custom_instrumentation/go/dd-api'
      tag: 'Documentation'
      text: 'Get started with v1 of the Go Tracer'
---

## Overview

The Go tracer v2 introduces API improvements, better performance, and enhanced compatibility with modern Go practices. It represents the latest stable version of Datadog's Go tracing library.

## Compatibility

When deciding which version of the Go tracer to use, consider the following guidance:

- **For new projects**: Datadog recommends using v2 for all new projects.
- **For Existing Projects**: Datadog recommends migrating existing applications to v2 to take advantage of improvements and continued support.

## Support policy

While v1 remains available, v2 is Datadog's primary supported version. All v1 releases starting from v1.74.0 will not contain new features and are instead considered a transitional release. These releases maintain the v1 API while using v2 under the hood. Using a transitional v1 version together with v2 allows you to migrate your services gradually. 

The first transitional release is planned for May 2025. After the v2 release, support for v1 will be as follows:

- Bug fixes for v1 will be provided until June 30, 2025
- Security fixes for v1 will be provided until December 31, 2025
- After December 31, 2025, v1 will no longer receive updates

For more compatibility and support details, see [Go Library Compatibility][2].

## Product-specific changes

Different Datadog products have specific considerations when migrating from v1 to v2. Here is what you need to know for each.

### Tracing

The v2 tracing API offers significant improvements while maintaining a similar developer experience. The migration typically involves updating import paths and adapting to some API changes.

Supported frameworks have changed between v1 and v2 of the Go tracer.

For more information, see [Go Library Compatibility][4].

### Profiling

For the Profiler, only import paths need to be updated. The profiling API functionality remains the same between v1 and v2.

### Application Security Management (ASM)

Supported packages have changed between v1 and v2 of the Go tracer.

For more information, see [ASM language and framework compatibility][3].

### Software Composition Analysis (SCA)

Only import paths need to be updated. The framework support for SCA is the same between v1 and v2.

## Version 2 improvements

The Go tracer v2 introduces several important improvements:

- **Modern import path**: Moves from `gopkg.in` to the standard GitHub import path for better compatibility with Go modules.
- **Improved API design**: Provides a more intuitive interface with better performance and future extensibility.
- **Reduced dependency footprint**: Isolates integrations so you only pull in what you need.
- **Enhanced security**: Prevents false positives in security scanning tools.
- **Better OpenTelemetry compatibility**: Includes W3C trace context propagation and 128-bit trace ID support.

## Migration instructions

Datadog provides a migration tool that automatically handles most code updates when upgrading from v1 to v2.

To upgrade, run the following command:

```shell
go install github.com/DataDog/dd-trace-go/tools/v2check@latest
# In your repository's directory
v2check .
```

The tool makes the following changes:

1. Updates import URLs from `gopkg.in/DataDog/dd-trace-go.v1` to `github.com/DataDog/dd-trace-go/v2`.
1. Moves imports from `ddtrace/tracer` to `ddtrace` where appropriate.
1. Converts `Span` and `SpanContext` calls to use pointers.
1. Replaces unsupported `WithServiceName()` calls with `WithService()`.
1. Updates `TraceID()` calls to `TraceIDLower()` for obtaining `uint64` trace IDs.

## Troubleshooting

### Import path changes

Change all imports from:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
```

To:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace"
import "github.com/DataDog/dd-trace-go/v2/profiler"
```

### Package structure changes

The package organization has changed in v2. Many functions previously in `ddtrace` have been moved to the `ddtrace/tracer` package. While the `v2check` migration tool handles these changes automatically, you may need to manually update some import paths.

v1:
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
	  defer tracer.Stop()

	  s := tracer.StartSpan("op")
	  var ctx ddtrace.SpanContext = s.Context()
}
```

v2:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

func main() {
    tracer.Start()
	  defer tracer.Stop()

	  s := tracer.StartSpan("op")
	  var ctx *tracer.SpanContext = s.Context()
}
```

### API changes

Improvements to the API have caused some functions to change. For example, child spans are started with `StartChild` rather than `ChildOf`:

v1:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
  tracer.Start()
	defer tracer.Stop()

	parent := tracer.StartSpan("op").Context()
	child := tracer.StartSpan("op", tracer.ChildOf(parent))
}
```

v2:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

func main() {
  tracer.Start()
	defer tracer.Stop()

	parent := tracer.StartSpan("op")
	child := parent.StartChild("op")
}
```

### Configuration changes

The `WithServiceName()` option has been replaced with `WithService()` for consistency:
```go
// v1
tracer.Start(tracer.WithServiceName("my-service"))

// v2
ddtrace.Start(ddtrace.WithService("my-service"))
```

For more information, see the [godoc page for dd-trace-go v2][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/
[2]: /security/code_security/software_composition_analysis/setup_runtime/compatibility/go
[3]: /security/application_security/threats/setup/compatibility/go
[4]: /tracing/trace_collection/compatibility/go/#go-tracer-support
