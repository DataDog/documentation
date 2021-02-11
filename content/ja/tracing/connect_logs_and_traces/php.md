---
title: PHP ログとトレースの接続
kind: ドキュメント
description: PHP ログとトレースを接続して Datadog で関連付けます。
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

PHP にロギングを実装するさまざまな方法があり<span class="x x-first x-last">、</span>PHP の組み込みエラーロギング API が完全に回避されている場合、Datadog PHP トレースライブラリは、トレースとスパン <span class="x x-first x-last">ID</span> をログに自動的に挿入できることが確実ではありません。
PHP ログとトレースを手動で接続する方法については、以下のセクションをご覧ください。

## トレースおよびスパン ID を手動で挿入する

<div class="alert alert-warning">
注: 関数 <code>\DDTrace\trace_id()</code> は、バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.53.0">0.53.0</a> で導入されています。
</div>

ログとトレースを一緒に接続するには、ログに、それぞれトレース ID とスパン ID を含む `dd.trace_id` 属性と `dd.span_id` 属性が含まれている必要があります。

[Datadog ログインテグレーション][1]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされ、[トレースリマッパー][2]のおかげで再マップされていることを確実にする必要があります。詳細については、FAQ [トレース ID パネルに相関ログが表示されないのはなぜですか？][3]を参照してください。

たとえば、次でこの 2 つの属性をログに追加します。

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%d dd.span_id=%d]',
      \DDTrace\trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

ロガーが [**monolog/monolog** ライブラリ][4]を実装する場合、`Logger::pushProcessor()` を使ってすべてのログメッセージに識別子を自動的に付加します:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%d dd.span_id=%d]',
          \DDTrace\trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

アプリケーションで、ログメッセージに trace_id および span_id を付加するのではなく json ログフォーマットを使用している場合は、以下の ID を含む一時レベルキー "dd" を追加できます。

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['dd'] = [
          'trace_id' => \DDTrace\trace_id(),
          'span_id'  => \dd_trace_peek_span_id(),
      ];

      return $record;
  });
?>
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/php/
[2]: /ja/logs/processing/processors/#trace-remapper
[3]: /ja/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog