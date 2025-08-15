---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/php/
- /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/php
code_lang: otel
code_lang_weight: 2
description: OpenTelemetry API を使用して PHP アプリケーションをインスツルメントし、Datadog へトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
title: OpenTelemetry API を使用した PHP カスタム インスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## セットアップ

OpenTelemetry を Datadog トレースプロバイダーを使用するように構成するには

1. [OpenTelemetry API パッケージ][13]をインストールします。
  ```php
  composer require open-telemetry/sdk
  ```
2. [OpenTelemetry PHP Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを PHP コードに追加します。

3. [Datadog PHP トレーシングライブラリ][6] をインストールします。

4. `DD_TRACE_OTEL_ENABLED` を `true` に設定します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。

## スパンタグの追加

スパンを開始する瞬間に属性を追加できます。

```php
$span = $tracer->spanBuilder('mySpan')
    ->setAttribute('key', 'value')
    ->startSpan();
```

またはスパンがアクティブな間:

```php
$activeSpan = OpenTelemetry\API\Trace\Span::getCurrent();

$activeSpan->setAttribute('key', 'value');
```


## スパンにエラーを設定する

例外発生時にスパンがアクティブな場合、その例外情報がスパンに添付されます。

```php
// スパンを作成
$span = $tracer->spanBuilder('mySpan')->startSpan();

throw new \Exception('Oops!');

// 'mySpan' にエラーフラグを立て、
// スタックトレースと例外メッセージをタグとして追加
```

トレースにエラーフラグを付けることは、手動でも可能です。

```php
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\Context\Context;

// トレーサーの初期化など、セットアップ手順の後にのみ実行できます。

try {
    throw new \Exception('Oops!');
} catch (\Exception $e) {
    $rootSpan = Span::fromContext(Context::getRoot());
    $rootSpan->recordException($e);
}
```
## タグの追加

スパンを追加するには

```php
// トレーサーを入手するか、既存のものを使用
$tracerProvider = \OpenTelemetry\API\Globals::tracerProvider();
$tracer = $tracerProvider->getTracer('datadog')

// スパンを作成
$span = $tracer->spanBuilder('mySpan')->startSpan();

// ... 処理内容

// スパンを閉じる
$span->end();

```

## スパン イベントの追加

<div class="alert alert-info">スパン イベントを追加するには SDK バージョン 1.3.0 以上が必要です。</div>

`addEvent` API を使用してスパン イベントを追加できます。このメソッドには必須パラメーター `name` があり、オプションで `attributes` と `timestamp` を受け取ります。メソッドは指定されたプロパティを持つ新しいスパン イベントを作成し、対象のスパンに関連付けます。

- **Name** [_required_]: イベント名を表す文字列。
- **Attributes** [_optional_]: 以下のプロパティを持つ 0 個以上のキーと値のペア。
  - キーは空でない文字列である必要があります。
  - 値として指定できるのは次のいずれかです。
    - プリミティブ型: string、Boolean、number。
    - 同一プリミティブ型の要素のみを含む配列 (例: string の配列)。
  - 入れ子の配列や異なるデータ型を混在させた配列は使用できません。
- **Timestamp** [_optional_]: イベント発生時刻を表す UNIX タイムスタンプ。`nanoseconds` を想定します。

以下の例は、スパンにイベントを追加するさまざまな方法を示しています。

```php
$span->addEvent("Event With No Attributes");
$span->addEvent(
    "Event With Some Attributes", 
    [ 
        'int_val' => 1, 
        'string_val' => "two", 
        'int_array' => [3, 4], 
        'string_array' => ["5", "6"],
        'bool_array' => [true, false]
    ]
);
```

詳細は [OpenTelemetry 仕様][14] を参照してください。

### 例外の記録

例外を記録するには `recordException` API を使用します。このメソッドには必須パラメーター `exception` があり、オプションで UNIX `timestamp` を受け取ります。標準化された例外属性を含む新しいスパン イベントを作成し、対象のスパンに関連付けます。

以下の例は、例外を記録するさまざまな方法を示しています。

```php
$span->recordException(new \Exception("Error Message"));
$span->recordException(new \Exception("Error Message"), [ "status" => "failed" ]);
```

詳細は [OpenTelemetry 仕様][15] を参照してください。

## アクティブなスパンへのアクセス

現在アクティブなスパンにアクセスするには

```php
$span = OpenTelemetry\API\Trace\Span::getCurrent();
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/php/manual/
[6]: /ja/tracing/trace_collection/dd_libraries/php#getting-started
[13]: https://opentelemetry.io/docs/languages/php/instrumentation/#instrumentation-setup
[14]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#record-exception