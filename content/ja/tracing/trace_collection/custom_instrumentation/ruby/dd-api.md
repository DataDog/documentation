---
title: Ruby Custom Instrumentation using Datadog API
aliases:
    - /tracing/opentracing/ruby
    - /tracing/manual_instrumentation/ruby
    - /tracing/custom_instrumentation/ruby
    - /tracing/setup_overview/custom_instrumentation/ruby
    - /tracing/trace_collection/custom_instrumentation/ruby
    - /tracing/trace_collection/custom_instrumentation/dd_libraries/ruby
description: 'Manually instrument your Ruby application to send custom traces to Datadog.'
code_lang: dd-api
type: multi-code-lang
code_lang_weight: 1
further_reading:
    - link: tracing/other_telemetry/connect_logs_and_traces
      tag: Documentation
      text: Connect your Logs and Traces together
    - link: tracing/glossary/
      tag: Documentation
      text: Explore your services, resources, and traces
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、<a href="https://docs.datadoghq.com/tracing/setup/python/">Python セットアップ手順</a>をお読みください。
</div>

このページでは、Datadog APM で観測可能性を追加・カスタマイズするユースケースを詳しく説明します。

## 要件

Make sure you require the appropriate gem for your [Ruby tracer version][8]:

- For v2.x, require the `datadog` gem:
  ```ruby
  require 'datadog'
  ```

- For v1.x, require the `ddtrace` gem:
  ```ruby
  require 'ddtrace'
  ```

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

カスタム[スパンタグ][1]を[スパン][2]に追加して、Datadog 内の可観測性をカスタマイズします。スパンタグは受信トレースに適用されるため、観測された動作を、マーチャントの階層、チェックアウト金額、ユーザー ID などのコードレベルの情報と関連付けることができます。

### カスタムスパンタグを追加する

`customer.id` などのアプリケーションコード内の動的な値に対応するカスタムタグをスパンに追加します。

#### Active spans

Access the current active [span][1] from any method within your code. 

**注**: このメソッドが呼び出されたときにアクティブスパンがない場合、`active_span` は `nil` になります。

```ruby
# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Get the active span and set customer_id -> 254889
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

#### Manually instrumented spans

`#set_tag` を呼び出して、`Datadog::Span` オブジェクトに[タグ][1]を直接追加します。

```ruby
# Sinatra エンドポイントの例。
# Datadog がリクエストをトレースします。
get '/posts' do
  Datadog::Tracing.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```

[1]: /tracing/glossary/#span-tags


### すべてのスパンにグローバルにタグを追加する

`tags` オプションでトレーサーを構成して、すべての[スパン][2]に[タグ][1]を追加します。

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

環境変数 `DD_TAGS` を使用してアプリケーションのすべてのスパンにタグを設定することも可能です。Ruby の環境変数に関する詳細は、[セットアップドキュメント][3]をお読みください。

### スパンにエラーを設定する

スパンにエラーを設定する方法には 2 つあります。

- `span.set_error` を呼び出し、Exception オブジェクトを渡します。これにより、エラーの種類、メッセージ、バックトレースが自動的に抽出されます。

```ruby
require 'timeout'

def example_method
  span = Datadog::Tracing.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
rescue StandardError => error
  Datadog::Tracing.active_span&.set_error(error)
  raise
ensure
  span.finish
end

example_method()
```

- また、`tracer.trace` を使用すると、デフォルトでエラータイプ、メッセージ、バックトレースを設定することができます。この動作を構成するには、`on_error` オプションを使用します。これは、`trace` にブロックが提供され、ブロックがエラーを発生させたときに呼び出されるハンドラーです。Proc には `span` と `error` が引数として渡されます。デフォルトでは、`on_error` はスパンにエラーを設定します。

`on_error` のデフォルトの動作:

```ruby
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
end

Datadog::Tracing.trace('example.trace') do |span|
  example_method()
end
```

`on_error` のカスタム動作:

```ruby
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

Datadog::Tracing.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

## タグの追加

対応するライブラリインスツルメンテーションを使用しない場合（ [ライブラリの互換性][4]参照）、手動でコードをインスツルメントすることができます。`Datadog::Tracing.trace` メソッドを使ってコードにトレーシングを追加します。これは、Ruby コードにラップできます。

Ruby コードをトレースするには、`Datadog::Tracing.trace` メソッドを使用できます。

```ruby
Datadog::Tracing.trace(name, resource: resource, **options) do |span|
  # このブロックを、インスツルメントするコードでラップします
  # さらに、ここでスパンを変更できます。
  # 例: リソース名の変更、タグの設定
end
```

ここで、`name` は、実行されている一般的な種類の操作を説明する `String` です（例: `'web.request'` または `'request.parse'`）。

`resource` は操作するアクションの名前を表す `String` です。同じリソースの値を持つトレースは、メトリクスの目的のために一緒にグループ化されます。リソースは通常、URL、クエリ、リクエストなど、ドメイン固有のものです (例: 'Article#submit’、http://example.com/articles/list.)。

利用可能なすべての `**options` については、[リファレンスガイド][5]を参照してください。

### 新しいスパンを手動で作成する

プログラムで、コードのブロックの周囲にスパンを作成します。この方法で作成されたスパンは、他のトレースメカニズムと自動的に統合されます。つまり、トレースがすでに開始されている場合、手動スパンはその親スパンとして呼び出し元を持ちます。同様に、コードのラップされたブロックから呼び出されたトレースメソッドは、その親として手動スパンを持ちます。

```ruby
# Sinatra エンドポイントの例、
# Datadog でリクエスト周りをトレーシング
# データベースクエリ、およびレンダリング手順。
get '/posts' do
  Datadog::Tracing.trace('web.request', service: '<サービス名>', resource: 'GET /posts') do |span|
    # activerecord 呼び出しをトレース
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # APM タグを追加
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # テンプレートレンダリングをトレース
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### トレースの後処理

一部のアプリケーションでは、トレースを Datadog に送信する前に、トレースを変更またはフィルタリングする必要がある場合があります。処理パイプラインを使用すると、このような動作を定義する*プロセッサー*を作成できます。

#### フィルタリング

ブロックが真と評価された場合、`Datadog::Tracing::Pipeline::SpanFilter` プロセッサーを使用してスパンを削除できます。

```ruby
Datadog::Tracing.before_flush(
  # 特定のリソースに一致するスパンを削除します
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # localhost に送られたスパンを削除します
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### 処理

`Datadog::Tracing::Pipeline::SpanProcessor` プロセッサーを使用してスパンを変更できます。

```ruby
Datadog::Tracing.before_flush(
  # リソースフィールドから一致するテキストを削除します
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### カスタムプロセッサー

プロセッサーは、`trace` を引数として受け入れる `#call` に応答する任意のオブジェクトです（これは、`Datadog::Span` の `Array` です）。

例えば、ショートハンドのブロック構文を使用する場合:

```ruby
Datadog::Tracing.before_flush do |trace|
   # 処理ロジック...
   trace
end
```

次の例では、複雑な後処理ロジックを実現するプロセッサーを実装しています。

```ruby
Datadog::Tracing.before_flush do |trace|
  trace.spans.each do |span|
    originalPrice = span.get_tag('order.price'))
    discount = span.get_tag('order.discount'))

    # 他のタグから計算したタグを設定します
    if (originalPrice != nil && discount != nil)
      span.set_tag('order.value', originalPrice - discount)
    end
  end
  trace
end
```

カスタムプロセッサーのクラスの場合:

```ruby
class MyCustomProcessor
  def call(trace)
    # 処理ロジック...
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

どちらの場合も、プロセッサーのメソッドは `trace` オブジェクトを返す必要があります。この戻り値は、パイプラインの次のプロセッサーに渡されます。


## トレースクライアントと Agent コンフィギュレーション

トレーシングクライアントと Datadog Agent の両方で、コンフィギュレーションを追加することで、B3 ヘッダーを使用したコンテキスト伝播や、ヘルスチェックなどの計算されたメトリクスでこれらのトレースがカウントされないように、特定のリソースがトレースを Datadog に送信しないように除外することができます。

### ヘッダー抽出と挿入によるコンテキストの伝搬

分散型トレーシングのコンテキストの伝搬は、ヘッダーの挿入と抽出で構成できます。詳しくは[トレースコンテキストの伝播][6]をお読みください。


### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][7]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#span-tags
[2]: /tracing/glossary/#spans
[3]: /tracing/setup/ruby/#environment-and-tags
[4]: /tracing/compatibility_requirements/ruby/
[5]: /tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: /tracing/trace_collection/trace_context_propagation/ruby/
[7]: /tracing/security
[8]: https://github.com/DataDog/dd-trace-rb/releases