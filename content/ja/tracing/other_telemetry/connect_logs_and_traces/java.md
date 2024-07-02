---
title: Correlating Java Logs and Traces
kind: documentation
description: 'Connect your Java logs and traces to correlate them in Datadog.'
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
  - /tracing/connect_logs_and_traces/java
further_reading:
    - link: tracing/trace_collection/custom_instrumentation
      tag: Documentation
      text: Manually instrument your application to create traces.
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
    - link: "https://www.datadoghq.com/blog/request-log-correlation/"
      tag: Blog
      text: Correlate request logs with traces automatically
    - link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
      tag: Guide
      text: Ease troubleshooting with cross product correlation.
---
## Before you begin

Ensure log collection is configured. See [Java Log Collection][1] for Log4j, Log4j 2, or Logback instructions.

## Automatic injection

Starting in version 0.74.0, the Java tracer automatically injects trace correlation identifiers into JSON formatted logs. For earlier versions, enable automatic injection in the Java tracer by adding `dd.logs.injection=true` as a system property, or through the environment variable `DD_LOGS_INJECTION=true`. Full configuration details can be found on the [Java tracer configuration][2] page.

**注**:
- Automatic injection of trace correlation is available for Log4j2, Log4j, or SLF4J and Logback.
- If the `attribute.path` for your trace ID is *not* `dd.trace_id`, ensure that your trace ID reserved attribute settings account for the `attribute.path`. For more information, see [Correlated Logs Not Showing Up in the Trace ID Panel][3].

<div class="alert alert-info"><strong>ベータ版</strong>: バージョン 1.18.3 から、サービスが実行される場所で <a href="/agent/remote_config/">Agent リモート構成</a>が有効になっている場合、<a href="/tracing/service_catalog">サービスカタログ</a> の UI で <code>DD_LOGS_INJECTION</code> を設定できます。</div>

## 手動挿入

手動でトレースとログに相関性を持たせたい場合は、Java トレーサーの API を使用して相関識別子を取得します。`CorrelationIdentifier.getTraceId` および `CorrelationIdentifier.getSpanId` メソッドを使用して、ログに記録されるスパンの先頭に識別子を挿入し、スパンの完了時に識別子を削除します。

{{< tabs >}}
{{% tab "Log4j 2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// このブロックより前に開始し、アクティブなスパンがある必要があります。
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// 何かをログ

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "SLF4J and Logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// このブロックより前に開始し、アクティブなスパンがある必要があります。
try {
    MDC.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    MDC.put("dd.span_id", CorrelationIdentifier.getSpanId());

// 何かをログ

} finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```
{{% /tab %}}
{{% tab "Tinylog" %}}

```java
import org.tinylog.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// There must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// Log something

} finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```
{{% /tab %}}
{{< /tabs >}}

**注**: ログのパースに [Datadog ログインテグレーション][4]を使用していない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確認する必要があります。詳しくは、[関連するログがトレース ID パネルに表示されない][5]を参照してください。

特定のロガー実装の詳細や JSON 形式でのログ方法については、[Java ログ収集のドキュメントを参照してください][1]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/java/
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: /tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?
[4]: /logs/log_collection/java/#raw-format
[5]: /tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
