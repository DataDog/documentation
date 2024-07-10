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
title: PHP ログとトレースの相関付け
type: multi-code-lang
---

## 自動挿入

バージョン `0.89.0` から、PHP トレーサーはトレース相関識別子を自動的にアプリケーションログに挿入するようになりました。自動挿入を有効にするには、環境変数 `DD_LOGS_INJECTION` (INI 設定 `datadog.logs_injection`) を `true` に設定します。

PHP トレーサーは、[Monolog][4] や [Laminas Log][5] のような PSR-3 準拠のロガーをサポートしています。

<div class="alert alert-warning">
  <strong>注</strong>: JSON フォーマットでログを生成するように、ロギングライブラリを設定してください。これにより、
  <ul>
    <li><a href="/logs/log_configuration/parsing">カスタムパースルール</a>は必要なくなります。</li>
    <li>スタックトレースがログイベントに適切にラップされるようになります。</li>
  </ul>
</div>

### ログへの挿入の構成

まだの場合は、PHP トレーサーを `DD_ENV`、`DD_SERVICE`、`DD_VERSION` で構成します。これは、ログに `env`、`service` および `version` を追加する際に最適です (詳細は[統合サービスタグ付け][6]を参照)。

PHP トレーサーは、トレース相関識別子をログに挿入するためのさまざまな構成方法を提供します。
- [トレース相関識別子をログコンテキストに追加する](#add-the-trace-correlation-identifiers-to-the-log-context)
- [メッセージにプレースホルダーを使用する](#use-placeholders-in-your-message)

#### トレース相関識別子をログコンテキストに追加する {#add-the-trace-correlation-identifiers-to-the-log-context}

PHP トレーサーのデフォルトの動作は、トレース相関識別子をログコンテキストに追加することです。

例えば、以下のように Laravel アプリケーションで [Monolog][4] ライブラリを使用している場合

```php
use Illuminate\Support\Facades\Log;
# ...
Log::debug('Hello, World!');
```

PHP トレーサーは、利用可能なトレース相関識別子をログコンテキストに追加します。上のログメッセージは、次のように変換できます。

```
[2022-12-09 16:02:42] production.DEBUG: Hello, World! {"dd.trace_id":"1234567890abcdef","dd.span_id":"1234567890abcdef","dd.service":"laravel","dd.version":"8.0.0","dd.env":"production","status":"debug"}
```

**注**: メッセージ内にプレースホルダーがある場合、あるいはメッセージ内に既にトレース ID が存在する場合、PHP トレーサーはトレース相関 ID をログコンテキストに追加しません。

#### メッセージにプレースホルダーを使用する {#use-placeholders-in-your-message}

メッセージでプレースホルダーを使用すると、トレース相関識別子を自動的にログに挿入することができます。PHP トレーサーは、以下のプレースホルダーをサポートしています。
- `%dd.trace_id%`: トレース ID
- `%dd.span_id%`: スパン ID
- `%dd.service%`: サービス名
- `%dd.version%`: サービスバージョン
- `%dd.env%`: サービス環境

プレースホルダーは大文字と小文字を区別し、`%` 文字で囲む必要があります。

例えば、Laravel アプリケーションで [Monolog][4] ライブラリを使用している場合、以下のようにログメッセージへの挿入を構成することができます。

```php
use Illuminate\Support\Facades\Log;
# ...
Log::info('Hello, World! [%dd.trace_id% %dd.span_id% %status%]');
```

PHP トレーサーは、プレースホルダーを対応する値に置き換えます。例えば、上記のログメッセージは次のように変換されます。

```
[2022-12-09 16:02:42] production.INFO: Hello, World! [dd.trace_id="1234567890abcdef" dd.span_id="1234567890abcdef" status="info"]
```

**注**: 括弧は、PHP の[ログパイプライン][7]で提供されているデフォルトのパースルールを使用する場合には必須です。独自のパースルールを使用する場合は、 必要に応じて括弧を省略することができます。


## 手動挿入

<div class="alert alert-warning">
<strong>注:</strong> 関数 <code>\DDTrace\current_context()</code> は、バージョン <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> で導入され、10 進数のトレース識別子を返します。</div>

ログとトレースを一緒に接続するには、ログに、それぞれトレース ID とスパン ID を含む `dd.trace_id` 属性と `dd.span_id` 属性が含まれている必要があります。

[Datadog ログインテグレーション][1]を使ってログをパースしていない場合は、カスタムログパースルールによって `dd.trace_id` と `dd.span_id` が文字列としてパースされ、[トレースリマッパー][2]のおかげで再マップされていることを確実にする必要があります。詳細については、[関連するログがトレースIDパネルに表示されない][3]を参照してください。

たとえば、次でこの 2 つの属性をログに追加します。

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      \DDTrace\logs_correlation_trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

ロガーが [**monolog/monolog** ライブラリ][4]を実装する場合、`Logger::pushProcessor()` を使ってすべてのログメッセージに識別子を自動的に付加します。monolog v1 の場合、以下の構成を追加します。

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

monolog v2 の場合、以下の構成を追加します。

```php
<?php
  $logger->pushProcessor(function ($record) {
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      ));
    });
  ?>
```

アプリケーションが JSON ログ形式を使用している場合、ログメッセージに `trace_id` と `span_id` を追加する代わりに、`trace_id` と `span_id` を含む第 1 レベルのキー `dd` を追加することができます。

```php
<?php
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => \DDTrace\logs_correlation_trace_id(),
          'span_id'  => \dd_trace_peek_span_id()
      ];

      return $record;
  });
?>
```

monolog v3 の場合、以下の構成を追加します。

```php
<?php
  $logger->pushProcessor(function ($record) {
        $record->extra['dd'] = [
            'trace_id' => \DDTrace\logs_correlation_trace_id(),
            'span_id'  => \dd_trace_peek_span_id()
        ];
        return $record;
    });
?>
```

ログを JSON として取り込んでいる場合は、[JSON ログの前処理][8]に進み、**Trace Id Attributes** フィールドに `extra.dd.trace_id` を追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/php/
[2]: /ja/logs/log_configuration/processors/#trace-remapper
[3]: /ja/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
[5]: https://github.com/laminas/laminas-log
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/logs/log_configuration/pipelines
[8]: https://app.datadoghq.com/logs/pipelines/remapping