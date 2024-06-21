---
aliases:
- /ja/tracing/connect_logs_and_traces/java
code_lang: java
code_lang_weight: 10
description: Java ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: ブログ
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
kind: documentation
title: Java ログとトレースの相関付け
type: multi-code-lang
---
## はじめに

ログ収集が設定されていることを確認します。Log4j、Log4j 2、Logback の手順については、[Java ログ収集][1]を参照してください。

## 自動挿入

バージョン 0.74.0 以降、Java トレーサーは自動的にトレース相関識別子を JSON 形式のログに挿入します。それ以前のバージョンでは、システムプロパティとして `dd.logs.injection=true` を追加するか、環境変数 `DD_LOGS_INJECTION=true` を使用して、Java トレーサーの自動挿入を有効にします。コンフィギュレーションの詳細については、[Java トレーサーのコンフィギュレーション][2]ページを参照してください。

**注**: トレース ID の `attribute.path` が `dd.trace_id` では*ない* 場合は’、当該トレース ID の `attribute.path` 向け予約済み属性設定アカウントを確認してください。詳しくは、[関連するログがトレース ID パネルに表示されない][3]を参照してください。

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

// このブロックの前に開始され、アクティブなスパンが存在している必要があります。
try {
    ThreadContext.put("dd.trace_id", CorrelationIdentifier.getTraceId());
    ThreadContext.put("dd.span_id", CorrelationIdentifier.getSpanId());

// 何かをログに記録する

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

[1]: /ja/logs/log_collection/java/
[2]: /ja/tracing/trace_collection/dd_libraries/java/
[3]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?
[4]: /ja/logs/log_collection/java/#raw-format
[5]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom