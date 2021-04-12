---
title: Ruby オープン標準
kind: documentation
description: Ruby のオープン標準
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
---
## OpenTracing

OpenTracing で Datadog をセットアップするには、詳細について Ruby [OpenTracing のクイックスタート][1]を参照してください。

### Datadog トレーサー設定の構成

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

[Ruby トレーサー設定][2]セクションで説明されているように、`Datadog.configure` を使用して構成することもできます。

### インテグレーションのアクティブ化と構成

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみ[スパン][3]と[トレース][4]を受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これを有効にするには、[Ruby インテグレーションインスツルメンテーション][5]で詳細をご覧ください。

### サポートされているシリアル化形式

| タイプ                           | サポート | 追加情報                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | 〇        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | 〇        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | ✕         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

OpenTelemetry のサポートは、`opentelemetry-exporters-datadog` gem を使用してトレースを OpenTelemetry から Datadog にエクスポートすることで利用できます。

<div class="alert alert-warning">
現在、この機能はベータ版です。期待どおりに機能しない場合は、<a href="https://docs.datadoghq.com/help/">サポートにお問い合わせください。</a>。
</div>

### インストール

- [bundler][6] を使用する場合は、`Gemfile` に以下を含めます。

```
gem 'opentelemetry-exporters-datadog'
gem 'opentelemetry-api', '~> 0.5'
gem 'opentelemetry-sdk', '~> 0.5'
```

- または、以下を使用して gem を直接インストールします。

```
gem install opentelemetry-api
gem install opentelemetry-sdk
gem install opentelemetry-exporters-datadog
```

### 使用方法

アプリケーションに Datadog プロセッサーとエクスポーターをインストールし、オプションを構成します。次に、OpenTelemetry インターフェイスを使用して、トレースおよびその他の情報を生成します。

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry-exporters-datadog'

# カスタムエクスポートで SDK を構成します
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service', agent_url: 'http://localhost:8126'
      )
    )
  )
end

# Datadog 固有の分散型トレーシングヘッダーの伝播については、
# HTTP 伝播を複合プロパゲーターに設定します
OpenTelemetry::Exporters::Datadog::Propagator.auto_configure

# トレースを開始するには、TracerProvider からトレーサーを取得します
tracer = OpenTelemetry.tracer_provider.tracer('my_app_or_gem', '0.1.0')

# スパンを作成します
tracer.in_span('foo') do |span|
  # 属性を設定します
  span.set_attribute('platform', 'osx')
  # イベントを追加します
  span.add_event(name: 'event in bar')
  # foo の子として bar を作成します
  tracer.in_span('bar') do |child_span|
    # スパンを検査します
    pp child_span
  end
end
```

### 構成オプション

Datadog Agent の URL とスパンタグの値は、環境と Agent の場所次第で必要または希望に応じて構成できます。

#### Datadog Agent URL

デフォルトでは、OpenTelemetry Datadog Exporter はトレースを `http://localhost:8126` に送信します。次の環境変数を構成して、トレースを別の URL に送信します。

- `DD_TRACE_AGENT_URL`: Datadog Agent がトレースをリッスンしている `<host>:<port>`。例: `http://agent-host:8126`

これらの値は、トレースエクスポーターレベルでオーバーライドできます。

```ruby
# カスタムエクスポートで SDK を構成します
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://dd-agent:8126',
      )
    )
  )
end
```

#### タグ付け

次の環境変数を設定して、Datadog がエクスポートしたトレースに自動的にタグを付けるようにアプリケーションを構成します。

- `DD_ENV`: アプリケーション環境。例: `production`、`staging`
- `DD_SERVICE`: アプリケーションのデフォルトのサービス名。例: `billing-api`
- `DD_VERSION`: アプリケーションのバージョン。例: `2.5`、`202003181415`、`1.3-alpha`
- `DD_TAGS`: カンマで区切られた値ペアのカスタムタグ。例: `layer:api,team:intake`
- `DD_ENV`、`DD_SERVICE`、または `DD_VERSION` が設定されている場合、`DD_TAGS` で定義されている対応する `env`、`service`、または `version` タグをオーバーライドします。
- `DD_ENV`、`DD_SERVICE`、`DD_VERSION` が設定されて_いない_場合、`DD_TAGS` の対応するタグを使用して、環境、サービス、バージョンを構成できます。

タグ値は、トレースエクスポーターレベルでもオーバーライドできます。これにより、アプリケーションごとに値を設定できるため、同じホスト上の異なる環境について複数のアプリケーションレポートを作成できます。

```ruby
# カスタムエクスポートで SDK を構成します
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://localhost:8126',
        env: 'prod',
        version: '1.5-alpha',
        tags: 'team:ops,region:west'
      )
    )
  )
end
```

個々のスパンに直接設定できるタグは、アプリケーションレベルで定義された競合するタグに優先します。

### OpenTelemetry リンク

- OpenTelemetry Ruby Datadog Exporter の使用法については、[rubygems][7] または [github][8] を参照してください。

[1]: /ja/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /ja/tracing/setup/ruby/#tracer-settings
[3]: /ja/tracing/visualization/#spans
[4]: /ja/tracing/visualization/#trace
[5]: /ja/tracing/setup/ruby/#integration-instrumentation
[6]: https://bundler.io
[7]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[8]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby