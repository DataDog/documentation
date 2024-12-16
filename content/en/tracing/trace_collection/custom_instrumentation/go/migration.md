---
title: Migrating from v1 to v2 of the Go Tracer
description: 'Upgrade your Go tracer from v1 to v2.'
further_reading:
    - link: 'tracing/trace_collection/custom_instrumentation/dd-api'
      tag: 'Documentation'
      text: 'Get started with v1 of the Go Tracer'
    - link: 'tracing/trace_collection/custom_instrumentation/dd-api-v2'
      tag: 'Documentation'
      text: 'Get started with v2 of the Go Tracer'
---

<div class="alert alert-info">This documentation assumes that you are using version v1.x of the Go tracer. If you are using v2.x, see <a href="tracing/trace_collection/custom_instrumentation/dd-api">Go Custom Instrumentation using the Datadog API</a> instead.</div>

This document outlines migrating from an older version of the Datadog tracer (v1.x.x) to v2.

Datadog's v2 version of the Go tracer provides a huge refactor of our API, moving away from interfaces to provide flexibility in future works, isolating our integrations to prevent false-positives from security scanners, and enforcing proper library patterns to prevent misuse. This update is the result of continuous feedback from customers, the community, as well as our extensive internal usage. 

To assist with the migration from an older version of the tracer, we have also provided a new migration tool to help with the most essential changes made in v2.

## Features
The migration tool will allow a simplified process to upgrade your tracing code from `dd-trace-go` version 1.6x to v2.0. By running this tool, you will be able to make quick fixes for:

* Changing import URLs from `dd-trace-go.v1` to `dd-trace-go/v2`.
* Importing and using the certain types from `ddtrace/tracer` rather than from `ddtrace`.
* Calling `Span` and `SpanContext` using pointers.
* Replacing `WithServiceName()`, which is no longer supported, with `WithService()` calls.
* Using `TraceIDLower()` to get an `uint64` Trace ID instead of `TraceID()`.

## Running the Migration Tool

Use the migration tool by running:

```shell
go get github.com/DataDog/dd-trace-go/v2/tools/v2check
go run github.com/DataDog/dd-trace-go/v2/tools/v2check/main.go
```

For more information about the migration, please visit our [godoc page](https://godoc.org/github.com/DataDog/dd-trace-go/v2/).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}