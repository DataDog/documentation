---
title: Ruby カスタムインスツルメンテーション
kind: ドキュメント
aliases:
  - /ja/tracing/opentracing/ruby
  - /ja/tracing/manual_instrumentation/ruby
description: Ruby アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: ログとトレースの接続
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースの詳細
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/ruby/">Ruby セットアップ手順</a>からご覧ください。
</div>

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

## タグの追加

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### カスタムスパンタグを追加する

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

{{< tabs >}}
{{% tab "Active Span" %}}
コード内の任意のメソッドから現在アクティブな[スパン][1]にアクセスします。**注**: メソッドが呼び出され、現在アクティブなスパンがない場合、`active_span` は `nil` です。

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # アクティブスパンを取得
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /ja/tracing/visualization/#spans
{{% /tab %}}

{{% tab "Manually Instrumented Spans" %}}

`#set_tag` を呼び出して、`Datadog::Span` オブジェクトに[タグ][1]を直接追加します。

```ruby
# Sinatra エンドポイントの例。
# Datadog がリクエストをトレースします。
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<タグキー>', '<タグ値>')
  end
end
```


[1]: /ja/tracing/visualization/#span-tags
{{% /tab %}}
{{< /tabs >}}

### すべてのスパンにグローバルにタグを追加する

`tags` オプションでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

環境変数 `DD_TAGS` を使用してアプリケーションのすべてのスパンにタグを設定することも可能です。Ruby の環境変数に関する詳細は、[セットアップドキュメント][3]を参照してください。

### スパンにエラーを設定する

スパンにエラーを設定する方法には 2 つあります

- 1 つ目は、`span.set_error` をコールし、例外オブジェクトで渡す方法。
- この方法では、エラータイプ、メッセージ、バックトレースが自動的に抽出されます。

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog.tracer.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is an exception"
rescue StandardError => error
  span = Datadog.tracer.active_span
  span.set_error(error) unless span.nil?
  raise error
ensure
  span.finish
end

example_method()
```

- 2 つ目は、デフォルトでエラータイプ、メッセージ、バックトレースを設定する `tracer.trace` を使用する方法。
- この動作を構成するには、`on_error` オプションを使用します。これは、ブロックが `trace` に提供されブロックがエラーを発生すると呼び出されるハンドラーです。
- `span` および `error` を引数として Proc が提供されます。
- デフォルトで、`on_error` がスパンにエラーを設定します。

デフォルトの動作: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a exception"
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

カスタムの動作: `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```


## スパンの追加

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][4]参照）、手動でコードをインスツルメントする必要があります。コードにトレーシングを追加するには、Ruby コードにラップできる `Datadog.tracer.trace` メソッドを使うと簡単です。

Ruby コードをトレースするには、`Datadog.tracer.trace` メソッドを使用できます。

```ruby
Datadog.tracer.trace(name, options) do |span|
  # このブロックを、インスツルメントするコードでラップします
  # さらに、ここでスパンを変更できます。
  # 例: リソース名の変更、タグの設定など...
end
```

ここで、`name` は、実行されている一般的な種類の操作を説明する `String` です（例: `'web.request'` または `'request.parse'`）。

また、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | タイプ | 説明 | デフォルト |
| --- | --- | --- | --- |
| `service`     | `String` | このスパンが属するサービス名（例: `'my-web-service'`） | トレーサー `default-service`、`$PROGRAM_NAME` または `'ruby'` |
| `resource`    | `String` | 操作対象のリソースまたはアクションの名前。同じリソース値を持つトレースは、メトリクスの目的でグループ化されます（ただし、個別に表示可能です）。通常、URL、クエリ、リクエストなどのドメイン固有です（例: `'Article#submit'`、`http://example.com/articles/list`） | スパンの `name`。 |
| `span_type`   | `String` | スパンのタイプ（`'http'`、`'db'` など） | `nil` |
| `child_of`    | `Datadog::Span` / `Datadog::Context` | このスパンの親。指定しない場合、自動的に現在のアクティブスパンになります。 | `nil` |
| `start_time`  | `Integer` | スパンが実際に開始したとき。すでに発生したイベントをトレースするときに役立ちます。 | `Time.now.utc` |
| `tags`        | `Hash` | スパンに追加する必要がある追加のタグ。 | `{}` |
| `on_error`    | `Proc` | トレースするブロックが指定されたときに呼び出されるハンドラー。これはエラーを発生させます。引数として `span` と `error` が指定されました。デフォルトでスパンにエラーを設定します。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

少なくとも `service` と `resource` の両方を設定することを強くお勧めします。`nil` として `service` や `resource` がないスパンは、Datadog Agent によって破棄されます。


### 新しいスパンを手動で作成する

プログラムで、コードのブロックの周囲にスパンを作成します。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、コードのラップされたブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```ruby
# Sinatra エンドポイントの例、
# Datadog でリクエスト周りをトレーシング
# データベースクエリ、およびレンダリング手順。
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<サービス名>', resource: 'GET /posts') do |span|
    # activerecord 呼び出しをトレース
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # APM タグを追加
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # テンプレートレンダリングをトレース
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```


### トレースの後処理

一部のアプリケーションでは、トレースを上流に送信する前に、トレースを変更またはフィルタリングする必要がある場合があります。処理パイプラインを使用すると、このような動作を定義する*プロセッサー*を作成できます。

プロセッサーは、`trace` を引数として受け入れる `#call` に応答する任意のオブジェクトです（これは、`Datadog::Span` の `Array` です）。

例:

```ruby
lambda_processor = ->(trace) do
  # 処理ロジック...
  trace
end

class MyCustomProcessor
  def call(trace)
    # 処理ロジック...
    trace
  end
end
custom_processor = MyFancyProcessor.new
```

プロセッサーの `#call` ブロックは、`trace` オブジェクトを返す*必要があります*。この戻り値は、パイプラインの次のプロセッサーに渡されます。

次に、これらのプロセッサーを `Datadog::Pipeline.before_flush` を介してパイプラインに追加する必要があります。

```ruby
Datadog::Pipeline.before_flush(lambda_processor, custom_processor)
```

`Datadog::Pipeline.before_flush` の簡略ブロック構文を使用してプロセッサーを定義することもできます。

```ruby
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.name =~ /forbidden/ }
end
```

#### フィルタリング

ブロックが真と評価された場合、`Datadog::Pipeline::SpanFilter` プロセッサーを使用してスパンを削除できます。

```ruby
Datadog::Pipeline.before_flush(
  # 特定のリソースに一致するスパンを削除します
  Datadog::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # localhost に送られたスパンを削除します
  Datadog::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### 処理

`Datadog::Pipeline::SpanProcessor` プロセッサーを使用してスパンを変更できます。

```ruby
Datadog::Pipeline.before_flush(
  # リソースフィールドから一致するテキストを削除します
  Datadog::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方で、コンフィギュレーションを追加することで、B3 ヘッダーを使用したコンテキスト伝播や、ヘルスチェックなどの計算されたメトリクスでこれらのトレースがカウントされないように、特定のリソースがトレースを Datadog に送信しないように除外することができます。


### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][5]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

### リソースフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][6]ページを参照してください。

## OpenTracing

OpenTracing で Datadog をセットアップするには、詳細について Ruby [OpenTracing のクイックスタート][7]を参照してください。

### Datadog トレーサー設定の構成

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

[Ruby トレーサー設定][8]セクションで説明されているように、`Datadog.configure` を使用して構成することもできます。

### インテグレーションのアクティブ化と構成

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみ[スパン][2]と[トレース][9]を受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これを有効にするには、[Ruby インテグレーションインスツルメンテーション][10]で詳細をご覧ください。

### サポートされているシリアル化形式

| タイプ                           | サポート | 追加情報                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | 〇        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | 〇        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | ✕         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

OpenTelemetry のサポートは、`opentelemetry-exporters-datadog` gem を使用してトレースを OpenTelemetry から Datadog にエクスポートすることで利用できます。

{{< alert >}}
現在、この機能はベータ版です。期待どおりに機能しない場合は、<a href="https://docs.datadoghq.com/help/">サポートにお問い合わせください。</a>。
{{< /alert >}}

### インストール

- [bundler][11] を使用する場合は、`Gemfile` に以下を含めます。

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

- OpenTelemetry Ruby Datadog Exporter の使用法については、[rubygems][12] または [github][13] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/#span-tags
[2]: /ja/tracing/visualization/#spans
[3]: /ja/tracing/setup/ruby/#environment-and-tags
[4]: /ja/tracing/compatibility_requirements/ruby/
[5]: https://github.com/openzipkin/b3-propagation
[6]: /ja/tracing/security
[7]: /ja/tracing/setup/ruby/#quickstart-for-opentracing
[8]: /ja/tracing/setup/ruby/#tracer-settings
[9]: /ja/tracing/visualization/#trace
[10]: /ja/tracing/setup/ruby/#integration-instrumentation
[11]: https://bundler.io
[12]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[13]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby