---
title: Java ログとトレースの接続
kind: ドキュメント
description: Java ログとトレースを接続して Datadog で関連付けます。
further_reading:
  - link: tracing/manual_instrumentation
    tag: ドキュメント
    text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
  - link: tracing/opentracing
    tag: ドキュメント
    text: アプリケーション全体に Opentracing を実装します。
  - link: tracing/visualization/
    tag: ドキュメント
    text: サービス、リソース、トレースの詳細
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: ブログ
    text: 自動的にリクエストログとトレースに相関性を持たせる
---
## トレースおよびスパン ID を自動的に挿入します

`-Ddd.logs.injection=true` を jvm スタートアップ引数として追加するか、環境変数 `DD_LOGS_INJECTION=true` を通じて、Java トレースの[コンフィギュレーション][1]の挿入を有効にします。

ログが JSON 形式で Logback を使っている場合、すべきことは残っていません。一方、他のロギングライブラリの場合は、ログに対する MDC 属性の自動挿入を有効にする必要があります。

ログが Raw 形式の場合、フォーマッタを更新してロガーコンフィギュレーションに `dd.trace_id` and `dd.span_id` を含めます:

{{< tabs >}}
{{% tab "Log4j2" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**注**: トレース ID の `attribute.path` が `dd.trace_id` **でない**場合は、当該トレース ID の `attribute.path` 向け予約済み属性設定アカウントを確認してください。詳しくは[このトピックについてのよくあるご質問][2]を参照してください。

## トレースおよびスパン ID を手動で挿入する

手動で[トレース][3]とログを相関付ける場合は、Datadog API を使用して相関識別子を取得します。

- `CorrelationIdentifier#getTraceId()` と `CorrelationIdentifier#getSpanId()` API メソッドを使用して、ログの各[スパン][4]の先頭と末尾に識別子を挿入します (以下の例を参照)。
- MDC を構成して挿入されたキーを使います:

    - ログステートメント中の `dd.trace_id` アクティブトレース ID (またはトレースがない場合は `0`)
    - ログステートメント中の `dd.span_id` アクティブスパン ID (またはトレースがない場合は `0`)

{{< tabs >}}
{{% tab "Log4j2" %}}

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// このブロックより前に開始し、アクティブなスパンがある必要があります。
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// 何かをログ

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

次にロガーコンフィギュレーションを更新して `dd.trace_id` と `dd.span_id` をログパターンに含めます:

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

{{% /tab %}}
{{% tab "slf4j/logback" %}}

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// このブロックより前に開始し、アクティブなスパンがある必要があります。
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// 何かをログ

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

次にロガーコンフィギュレーションを更新して `dd.trace_id` と `dd.span_id` をログパターンに含めます:

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

{{% /tab %}}
{{< /tabs >}}

**注**: ログのパースに [Datadog ログインテグレーション][5]を使用していない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされていることを確認する必要があります。詳しくは、[このトピックに関するよくあるご質問][6] を参照してください。

特定のロガー実装の詳細や JSON のログ方法については、[Java ロギングのドキュメントを参照してください][4]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup/java/#configuration
[2]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=jsonlogs#trace-id-option
[3]: /ja/tracing/connect_logs_and_traces/
[4]: /ja/logs/log_collection/java/?tab=log4j
[5]: /ja/logs/log_collection/java/#raw-format
[6]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom