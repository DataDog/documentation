---
code_lang: php
code_lang_weight: 40
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: PHP トレースコンテキストの伝搬
type: multi-code-lang
---

Datadog APM トレーサーは、分散型トレーシングのための [B3][7] と [W3C Trace Context][10] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

PHP トレーサーは、以下のスタイルをサポートしています。

- Datadog: `Datadog`
- W3C Trace Context: `tracecontext`
- B3 マルチヘッダー: `b3multi` (`B3` エイリアスは非推奨)
- B3 シングルヘッダー: `B3 single header`

以下の環境変数を使用して、PHP トレーシングライブラリの挿入および抽出のスタイルを構成することができます。例:

- `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,tracecontext,B3 single header`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=Datadog,tracecontext,B3 single header`

環境変数の値は、挿入または抽出に有効なヘッダースタイルのカンマ区切りのリストです。デフォルトでは、`tracecontext` と `Datadog` の挿入スタイルのみが有効になっています。

複数の抽出スタイルが有効な場合、次の順番で抽出が試みられます: `tracecontext` が最優先で、次が `Datadog`、その次が B3。

新しい PHP スクリプトが起動すると、トレーサーは自動的に分散型トレーシングのための Datadog ヘッダーの存在を確認します。
- `x-datadog-trace-id` (環境変数: `HTTP_X_DATADOG_TRACE_ID`)
- `x-datadog-parent-id` (環境変数: `HTTP_X_DATADOG_PARENT_ID`)
- `x-datadog-origin` (環境変数: `HTTP_X_DATADOG_ORIGIN`)
- `x-datadog-tags` (環境変数: `HTTP_X_DATADOG_TAGS`)

新規トレースや既存トレースに対して CLI スクリプトでこの情報を手動で設定するには、関数 `DDTrace\set_distributed_tracing_context(string $trace_id, string $parent_id, ?string $origin = null, ?array $tags = null)` を提供します。

```php
<?php

function processIncomingQueueMessage($message) {
}

\DDTrace\trace_function(
    'processIncomingQueueMessage',
    function(\DDTrace\SpanData $span, $args) {
        $message = $args[0];
        \DDTrace\set_distributed_tracing_context($message->trace_id, $message->parent_id);
    }
);
```

また、バージョン **0.87.0** からは、生のヘッダーが利用できる場合、関数 `DDTrace\consume_distributed_tracing_headers(array|callable $headersOrCallback)` が提供されます。ヘッダー名は小文字でなければならないことに注意してください。

```php
$headers = [
    "x-datadog-trace-id" => "1234567890",
    "x-datadog-parent-id" => "987654321",
];

\DDTrace\consume_distributed_tracing_headers($headers);
```

トレースコンテキストをヘッダーとして直接抽出するために、関数 `DDTrace\generate_distributed_tracing_headers(?array $inject = null): array` が提供されます。その唯一のオプション引数は、挿入スタイル名の配列を受け取ります。デフォルトは、構成された挿入スタイルです。

```php
$headers = DDTrace\generate_distributed_tracing_headers();
// ヘッダーをどこかに保存し、アウトバウンドリクエストに挿入し、... 
// また、これらの $headers は、他のプロセスから \DDTrace\consume_distributed_tracing_headers によって読み返すことができます。
```


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[7]: https://github.com/openzipkin/b3-propagation
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format