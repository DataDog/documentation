---
aliases:
- /ja/tracing/trace_collection/otel_instrumentation/java/
code_lang: java
code_lang_weight: 0
description: OpenTelemetry API で Java アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/trace_collection/otel_instrumentation/java/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: ドキュメント
  text: OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性
kind: ドキュメント
title: OpenTelemetry API を使った Java アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}

## 要件と制限

- Datadog Java トレーシングライブラリ `dd-trace-java` バージョン 1.10.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                                           | サポートノート                                                                               |
|---------------------------------------------------|---------------------------------------------------------------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]            | デフォルトでは、[Datadog 分散ヘッダーフォーマット][2]が代わりに使用されます。                          |
| [スパンプロセッサー][3]                              | 非サポート                                                                                 |
| [スパンエクスポーター][4]                               | 非サポート                                                                                 |
| トレース/スパン [ID ジェネレーター][5]                     | ID 生成はトレーシングライブラリによって実行され、[128 ビットのトレース ID][6] をサポートしています。 |
| [Metrics][7]、[Baggage][8] および [Context][9] API   | 非サポート                                                                                 |
| [スパンリンク][14] (ベータ版)                          | `dd-trace-java` のバージョン 1.24.0 以降が必要です。                                         |

## Datadog トレーシングライブラリを使用するための OpenTelemetry の構成

<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/java/">Java セットアップ手順</a>からご覧ください。
</div>

1. [OpenTelemetry Java Manual Instrumentation ドキュメント][10]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Java コードに追加します。

1. [Datadog トレーシングライブラリを JVM に][11]追加します。**ベータ版:** [ワンステップ APM インスツルメンテーション][12]を使って、オプションでこれを行うことができます。

1. (OpenTelemetry SDK ではなく) OpenTelemetry API だけに依存していることを確認します。

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="groovy" >}}
// OpenTelemetry API
implementation "io.opentelemetry:opentelemetry-api:${opentelemetryVersion}"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="xml" >}}
<!-- OpenTelemetry API -->
<dependency>
    <groupId>io.opentelemetry</groupId>
    <artifactId>opentelemetry-api</artifactId>
    <version>${io.opentelemetry.version}</version>
</dependency>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

1. システムプロパティ `dd.trace.otel.enabled` または環境変数 `DD_TRACE_OTEL_ENABLED` を `true` に設定します。

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。


## 一般的なユースケース

### 現在のスパンまたはローカル root スパンにカスタム属性を追加する

```java
// 現在のスパンに属性を追加します
Span currentSpan = Span.current();
currentSpan.setAttributes("some-key", "some-value");

// ローカル root スパンに属性を追加します
ContextKey<OtelSpan> localRootSpanKey = ContextKey.named("opentelemetry-traces-local-root-span");
Span rootSpan = Context.current().get(localRootSpanKey);
rootSpan.setAttributes("some-key", "some-value");
```

**注:** 現在のスパンまたはローカル root スパンが存在しない場合、返されるスパンは `null` ではなく無効であり、属性は設定されません。

### アノテーションを使用してカスタムスパンを追加する

まず、`opentelemetry-instrumentation-annotations` ライブラリに依存関係を追加します。

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="groovy" >}}
  // OpenTelemetry インスツルメンテーションアノテーション
  implementation "io.opentelemetry.instrumentation:opentelemetry-instrumentation-annotations:${opentelemetryVersion}"
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="xml" >}}
<!-- OpenTelemetry instrumentation annotations -->
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-instrumentation-annotations</artifactId>
    <version>${io.opentelemetry.version}</version>
</dependency>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

次に、メソッドに `@WithSpan` アノテーションを付けて、呼び出しごとに新しいスパンを作成します。呼び出しのパラメーターには、`@SpanAttribute` アノテーションを付けて、引数を span 属性としてキャプチャすることができます。

```java
@WithSpan
public void myMethod(@SpanAttribute("parameter1") String parameter1,
    @SpanAttribute("parameter2") long parameter2) {
    <...>
}
```

**注:** `@WithSpan` の代わりに `@AddingSpanAttributes` メソッドアノテーションを使用すると、新しいスパンを作成せずに `@SpanAttribute` アノテーションを使用してメソッド引数をキャプチャできます。現在のスパンが存在する場合は、キャプチャされた引数で更新されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/java/manual/#context-propagation
[2]: /ja/tracing/trace_collection/trace_context_propagation/java/
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[5]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[6]: /ja/opentelemetry/guide/otel_api_tracing_interoperability/
[7]: https://opentelemetry.io/docs/specs/otel/metrics/api/
[8]: https://opentelemetry.io/docs/specs/otel/baggage/api/
[9]: https://opentelemetry.io/docs/specs/otel/context/
[10]: https://opentelemetry.io/docs/instrumentation/java/manual/
[11]: /ja/tracing/trace_collection/dd_libraries/java/?tab=springboot#add-the-java-tracer-to-the-jvm
[12]: /ja/tracing/trace_collection/single-step-apm/
[13]: /ja/tracing/trace_collection/single-step-apm/
[14]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links