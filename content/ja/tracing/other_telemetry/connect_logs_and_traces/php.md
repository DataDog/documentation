---
aliases:
- /ja/tracing/connect_logs_and_traces/php
code_lang: php
code_lang_weight: 70
description: PHP ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。

title: PHP ログとトレースの接続
type: multi-code-lang
---

## 自動挿入

PHP にロギングを実装するさまざまな方法があり<span class="x x-first x-last">、</span>PHP の組み込みエラーロギング API が完全に回避されている場合、Datadog PHP トレースライブラリは、トレースとスパン <span class="x x-first x-last">ID</span> をログに自動的に挿入できることが確実ではありません。
PHP ログとトレースを手動で接続する方法については、以下のセクションをご覧ください。

## 手動挿入

<div class="alert alert-warning">
注: 関数 <code>\DDTrace\current_context()</code> は、バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> で導入されています。
</div>

ログとトレースを一緒に接続するには、ログに、それぞれトレース ID とスパン ID を含む `dd.trace_id` 属性と `dd.span_id` 属性が含まれている必要があります。

[Datadog ログインテグレーション][1]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされ、[トレースリマッパー][2]のおかげで再マップされていることを確実にする必要があります。詳細については、[関連するログがトレースIDパネルに表示されない][3]を参照してください。

たとえば、次でこの 2 つの属性をログに追加します。

```php
  <?php
  $context = \DDTrace\current_context();
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      $context['trace_id'],
      $context['span_id']
  );
  my_error_logger('Error message.' . $append);
?>
```

ロガーが [**monolog/monolog** ライブラリ][4]を実装する場合、`Logger::pushProcessor()` を使ってすべてのログメッセージに識別子を自動的に付加します。monolog v1 の場合:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $context = \DDTrace\current_context();
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          $context['trace_id'],
          $context['span_id']
      );
      return $record;
  });
?>
```

monolog v2 の場合:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $context = \DDTrace\current_context();
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          $context['trace_id'],
          $context['span_id']
      ));
    });
  ?>
```

monolog v3 の場合:

```php
<?php
  $logger->pushProcessor(function ($record) {
        $context = \DDTrace\current_context();
        $record->extra['dd'] = [
            'trace_id' => $context['trace_id'],
            'span_id'  => $context['span_id'],
        ];
        return $record;
    });
?>
```

アプリケーションで、ログメッセージに trace_id および span_id を付加するのではなく json ログフォーマットを使用している場合は、以下の ID を含む一時レベルキー "dd" を追加できます。

```php
<?php
  $context = \DDTrace\current_context();
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => $context['trace_id'],
          'span_id'  => $context['span_id'],
      ];

      return $record;
  });
?>
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/php/
[2]: /ja/logs/log_configuration/processors/#trace-remapper
[3]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
