---
code_lang: ruby
code_lang_weight: 20
description: OpenTelemetry API で Ruby アプリケーションをインスツルメンテーションし、Datadog にトレースを送信します。
further_reading:
- link: tracing/glossary/
  tag: Documentation
  text: サービス、リソース、トレースの詳細
kind: documentation
title: OpenTelemetry API を使った Ruby アプリケーションのカスタムインスツルメンテーション
type: multi-code-lang
---

{{% otel-custom-instrumentation %}}


## 要件と制限

- Datadog Ruby トレーシングライブラリ `dd-trace-rb` バージョン 1.9.0 以上。
- Gem バージョンサポート 1.1.0 以上。

特記されている通り、Datadog のライブラリに実装されている以下の OpenTelemetry 機能:

| 機能                               | サポートノート                       |
|---------------------------------------|--------------------------------------|
| [OpenTelemetry コンテキスト伝搬][1]         | [Datadog 分散ヘッダーフォーマット][9]が代わりに使用されます。 | 
| [スパンプロセッサー][2]                  | 非サポート                                          | 
| [スパンエクスポーター][3]                   | 非サポート                                            |
| `OpenTelemetry.logger`                | `OpenTelemetry.logger` は `Datadog.logger` と同じオブジェクトに設定されています。[カスタムロギング][10]から構成します。 |
| トレース/スパン [ID ジェネレーター][4]         | ID の生成は `ddtrace` が行います。           |


## Datadog トレーシングライブラリを使用するための OpenTelemetry の構成

1. [OpenTelemetry Ruby Manual Instrumentation ドキュメント][5]に従って、ご希望の手動 OpenTelemetry インスツルメンテーションを Ruby コードに追加します。
1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

1. `bundle install` を実行して gem をインストールします。
1. OpenTelemetry のコンフィギュレーションファイルに以下の行を追加します。

    ```ruby
    require 'opentelemetry'
    require 'datadog/opentelemetry'
    ```

1. インテグレーションを有効にし、トレーサー設定を変更できる構成ブロックをアプリケーションに追加します。ここで追加の構成を行わないと、OpenTelemetry でインスツルメンテーションを行ったコードのみがトレースされます。

    ```ruby
    Datadog.configure do |c|
      ...
    end
    ```

   このブロックを使うと、以下のことができます。

    - [Datadog コンフィギュレーション設定の追加][6]
    - [Datadog インスツルメンテーションの有効化または再構成][7]

Datadog は、これらの OpenTelemetry スパンと他の Datadog APM スパンを組み合わせて、アプリケーションの単一のトレースにします。また、[インテグレーションインスツルメンテーション][7]と [OpenTelemetry 自動インスツルメンテーション][8]もサポートしています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/ruby/manual/#context-propagation
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/ruby/manual/
[6]: /ja/tracing/trace_collection/dd_libraries/ruby/#additional-configuration
[7]: /ja/tracing/trace_collection/dd_libraries/ruby#integration-instrumentation
[8]: https://opentelemetry.io/docs/instrumentation/ruby/automatic/
[9]: /ja/tracing/trace_collection/trace_context_propagation/ruby/
[10]: /ja/tracing/trace_collection/dd_libraries/ruby/#custom-logging