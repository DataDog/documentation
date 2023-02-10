---
title: OpenTracing setup
kind: documentation
type: multi-code-lang
---

## Overview

Datadog recommends you use the OpenTelemetry Collector Datadog exporter or the OTLP Ingest in the Datadog Agent in conjunction with OpenTelemetry tracing clients. However, if that doesn't work for you, each of the supported languages also has support for sending [OpenTracing][1] data to Datadog. 

{{< whatsnext desc="Set up your application to send traces using OpenTracing." >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/nodejs" >}}NodeJS{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/open_standards/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

<br>


[1]: https://opentracing.io/docs/
