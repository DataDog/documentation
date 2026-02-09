---
title: Migrate to Go Tracer v2
description: 'Upgrade your Go tracer from v1 to v2.'
aliases:
  - /tracing/trace_collection/custom_instrumentation/opentracing/go
further_reading:
    - link: 'tracing/trace_collection/custom_instrumentation/server-side'
      tag: 'Documentation'
      text: 'Custom Instrumentation for Go'
---

## Overview

The Go tracer v2 introduces API improvements, better performance, and enhanced compatibility with modern Go practices. It represents the latest stable version of Datadog's Go tracing library.

## Compatibility

When deciding which version of the Go tracer to use, consider the following guidance:

- **For new projects**: Datadog recommends using v2 for all new projects.
- **For Existing Projects**: Datadog recommends migrating existing applications to v2 to take advantage of improvements and continued support.

## Support policy

While v1 remains available, v2 is Datadog's primary supported version. All v1 releases starting from v1.74.0 will not contain new features and are instead considered a transitional release. These releases maintain the v1 API while using v2 under the hood. Using a transitional v1 version together with v2 allows you to migrate your services gradually. 

For more compatibility and support details, see [Go Library Compatibility][2].

## Product-specific changes

Different Datadog products have specific considerations when migrating from v1 to v2. Here is what you need to know for each.

### Tracing

The v2 tracing API offers significant improvements while maintaining a similar developer experience. The migration typically involves updating import paths and adapting to some API changes.

Supported frameworks have changed between v1 and v2 of the Go tracer.

For more information, see [Go Library Compatibility][4].

### Profiling

For the Profiler, only import paths need to be updated. The profiling API functionality remains the same between v1 and v2.

### App and API Protection (AAP)

Supported packages have changed between v1 and v2 of the Go tracer.

For more information, see [AAP language and framework compatibility][3].

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

To check for updates, run the following command:

```shell
go install github.com/DataDog/dd-trace-go/tools/v2fix@latest
# In your repository's directory
v2fix .
```

To apply all suggested fixes, run:

```shell
v2fix -fix .
```

The tool makes the following changes:

1. Updates import URLs from `gopkg.in/DataDog/dd-trace-go.v1` to `github.com/DataDog/dd-trace-go/v2`.
2. Moves imports from `ddtrace` to `ddtrace/tracer` where appropriate.
3. Converts `Span` and `SpanContext` calls to use concrete values.
4. Replaces unsupported `WithServiceName` calls with `WithService`.
5. Updates `TraceID` calls to `TraceIDLower` for obtaining `uint64` trace IDs.

## Breaking changes

### Import path changes

Change all imports from:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
```

To:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
import "github.com/DataDog/dd-trace-go/v2/profiler"
```

### Package structure changes

The package organization has changed in v2. Many functions previously in `ddtrace` have been moved to the `ddtrace/tracer` package. While the `v2fix` migration tool handles these changes automatically, you may need to manually update some import paths.

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

Improvements to the API have caused some functions and types to change. For more information, see the [godoc page for dd-trace-go v2][1].

#### Spans

`Span` and `SpanContext` are now represented as a struct rather than an interface, which means that references to these types must use a pointer. They have also been moved to live within the `tracer` package, so they must be accessed using `tracer.Span` rather than `ddtrace.Span`.

v1:
```go
var sp ddtrace.Span = tracer.StartSpan("opname")
var ctx ddtrace.SpanContext = sp.Context()
```

v2:
```go
var sp *tracer.Span = tracer.StartSpan("opname")
var ctx *tracer.SpanContext = sp.Context()
```

##### Deprecated ddtrace interfaces

All the interfaces in `ddtrace` have been removed in favor of struct types. The new types have moved into `ddtrace/tracer`.

##### Deprecated constants and options

The following constants and functions have been removed:

- `ddtrace/ext.AppTypeWeb`
- `ddtrace/ext.CassandraQuery`
- `ddtrace/ext.CassandraBatch`
- `ddtrace/tracer.WithPrioritySampling`; priority sampling is enabled by default.
- `ddtrace/tracer.WithHTTPRoundTripper`; use `WithHTTPClient` instead.

#### StartChild

Child spans are started with `StartChild` rather than `ChildOf`:

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

#### Trace IDs

Rather than a `uint64`, trace IDs are now represented as a `string`. This change will allow support for 128-bit trace IDs. Old behavior may still be accessed by using the new `TraceIDLower()` method, though switching to 128-bit IDs is recommended.

v1:
```go
sp := tracer.StartSpan("opname")
fmt.Printf("traceID: %d\n", sp.Context().TraceID())
```

v2:
```go
sp := tracer.StartSpan("opname")
fmt.Printf("traceID: %s\n", sp.Context().TraceID()) //recommended for using 128-bit IDs
fmt.Printf("traceID: %d\n", sp.Context().TraceIDLower()) // for maintaining old behavior with 64-bit IDs
```

#### Span Links API

`Span.AddSpanLink` has been renamed to `Span.AddLink`.

### Configuration changes

#### WithService

The `WithServiceName` option has been replaced with `WithService` for consistency:
```go
// v1
tracer.Start(tracer.WithServiceName("my-service"))

// v2
ddtrace.Start(ddtrace.WithService("my-service"))
```
#### WithDogstatsdAddress

`tracer.WithDogstatsdAddress` has been renamed to `tracer.WithDogstatsdAddr`. Use this option to specify a different DogStatsD address when starting the tracer.

v1:
```go
tracer.Start(tracer.WithDogstatsdAddress("10.1.0.12:4002"))
```

v2:
```go
tracer.Start(tracer.WithDogstatsdAddr("10.1.0.12:4002"))
```

#### WithAgentURL

`tracer.WithAgentURL` sets the address by URL where the agent is located, in addition to the existing `WithAgentAddr` option. It is useful for setups where the agent is listening to a Unix Domain Socket:

v2:
```go
tracer.Start(tracer.WithAgentURL("unix:///var/run/datadog/apm.socket"))
```

#### NewStartSpanConfig, WithStartSpanConfig, and WithFinishConfig

These functional options for `ddtrace/tracer.Tracer.StartSpan` and `ddtrace/tracer.Span.Finish` reduce the number of calls (in functional option form) in hot loops by giving the freedom to prepare a common span configuration in hot paths.

v1:
```go
var err error
span := tracer.StartSpan(
	"operation",
	ChildOf(parent.Context()),
	Measured(),
	ResourceName("resource"),
	ServiceName(service),
	SpanType(ext.SpanTypeWeb),
	Tag("key", "value"),
)
defer span.Finish(tracer.NoDebugStack())
```

v2:
```go
cfg := tracer.NewStartSpanConfig(
	tracer.Measured(),
	tracer.ResourceName("resource"),
	tracer.ServiceName(service),
	tracer.SpanType(ext.SpanTypeWeb),
	tracer.Tag("key", "value"),
)
finishCfg := tracer.NewFinishConfig(
	NoDebugStack(),
)
// [...]
// Reuse the configuration in your hot path:
span := parent.StartChild("operation", tracer.WithStartSpanConfig(cfg))
defer span.Finish(tracer.WithFinishConfig(finishCfg))
```

#### Sampling API simplified

The following functions have been removed in favour of `SpanSamplingRules` and `TraceSamplingRules`:

* `NameRule`
* `NameServiceRule`
* `RateRule`
* `ServiceRule`
* `SpanNameServiceMPSRule`
* `SpanNameServiceRule`
* `SpanTagsResourceRule`
* `TagsResourceRule`

Also, `ext.SamplingPriority` tag is deprecated. Use `ext.ManualKeep` and `ext.ManualDrop` instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/
[2]: /security/code_security/software_composition_analysis/setup_runtime/compatibility/go
[3]: /security/application_security/threats/setup/compatibility/go
[4]: /tracing/trace_collection/compatibility/go/#go-tracer-support
