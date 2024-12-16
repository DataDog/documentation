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

This guide explains how to migrate from Go Tracer v1.x to v2. 

Version 2 of the Go tracer introduces significant API improvements:

- Removes interfaces to enable future flexibility
- Isolates integrations to prevent false positives from security scanners
- Enforces library patterns to prevent misuse

To simplify the migration process, Datadog provides a migration tool that handles essential code updates automatically.

## Migration tool features

The migration tool automatically updates your tracing code when upgrading from `dd-trace-go` v1.x to v2.0. It makes the following changes:

* Updates import URLs from `dd-trace-go.v1` to `dd-trace-go/v2`.
* Moves imports and using certain types from `ddtrace/tracer` to `ddtrace`.
* Converts `Span` and `SpanContext` calls to use pointers.
* Replaces unsupported `WithServiceName()` calls with `WithService()`.
* Updates `TraceID()` calls to `TraceIDLower()` for obtaining `uint64` trace IDs.

## Using the migration tool

Run these commands to use the migration tool:

```shell
go get github.com/DataDog/dd-trace-go/v2/tools/v2check
go run github.com/DataDog/dd-trace-go/v2/tools/v2check/main.go
```

For more information about the migration, , see the [godoc page for dd-trace-go v2](https://godoc.org/github.com/DataDog/dd-trace-go/v2/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}