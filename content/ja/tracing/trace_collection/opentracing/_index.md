---
aliases:
- /ja/tracing/trace_collection/open_standards/
kind: documentation
title: OpenTracing インスツルメンテーションセットアップ
type: multi-code-lang
---

[OpenTelemetry][1] や [`ddtrace`][2] のカスタムインスツルメンテーションがうまく機能しない場合、サポートされている各言語は [OpenTracing][3] データを Datadog に送信するサポートも備えています。OpenTracing はアーカイブされ、プロジェクトはサポートされていません。

言語に合わせて続きを読む:

{{< whatsnext desc="OpenTracing を使用してトレースを送信するようにアプリケーションを設定します。" >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/go" >}}Go{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/nodejs" >}}NodeJS{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/php" >}}PHP{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/opentracing/dotnet" >}}.NET{{< /nextlink >}}
{{< /whatsnext >}}

<br>

[1]: /ja/tracing/trace_collection/otel_instrumentation/
[2]: /ja/tracing/trace_collection/custom_instrumentation/
[3]: https://opentracing.io/docs/