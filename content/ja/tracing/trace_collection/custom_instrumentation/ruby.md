---
aliases:
- /ja/tracing/opentracing/ruby
- /ja/tracing/manual_instrumentation/ruby
- /ja/tracing/custom_instrumentation/ruby
- /ja/tracing/setup_overview/custom_instrumentation/ruby
code_lang: ruby
code_lang_weight: 20
description: Ruby アプリケーションを手動でインスツルメントしてカスタムトレースを Datadog に送信します。
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: ドキュメント
  text: ログとトレースの接続
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
kind: documentation
title: Ruby カスタムインスツルメンテーション
type: multi-code-lang
---
<div class="alert alert-info">
自動インスツルメンテーションとセットアップの手順をまだ読んでいない場合は、 <a href="https://docs.datadoghq.com/tracing/setup/python/">Pythonセットアップ手順</a>からご覧ください。
</div>

このページでは、Datadog APM を使用して可観測性を追加およびカスタマイズする一般的な使用例について説明します。

## `ddtrace` ライブラリの機能性を拡張したり、アプリケーションのインスツルメントをより精確に制御するのに役立つ方法がライブラリにあります。

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
    #アクティブスパンを取得し、customer_id -> 254889 を設定します
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /ja/tracing/glossary/#spans
{{< /tabs >}}

{{% tab "Manually Instrumented Spans" %}}

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


[1]: /ja/tracing/glossary/#span-tags
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

- まず、`span.set_error` を呼び出し、Exception オブジェクトを渡します。これにより、エラーの種類、メッセージ、バックトレースが自動的に抽出されます。

```ruby
require 'ddtrace'
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

- 2 つ目は、デフォルトでエラータイプ、メッセージ、バックトレースを設定する `tracer.trace` を使用する方法。
- この動作を構成するには、`on_error` オプションを使用します。これは、ブロックが `trace` に提供されブロックがエラーを発生すると呼び出されるハンドラーです。
- `span` および `error` を引数として Proc が提供されます。
- デフォルトで、`on_error` がスパンにエラーを設定します。

デフォルトの動作: `on_error`

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

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][6]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ区切りリストです。デフォルトでは、Datadog と B3 の抽出スタイルが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

### リソースのフィルター

トレースはそれぞれのリソース名に基づいて除外可能で、これによりヘルスチェックなどの外形監視トラフィックが Datadog にレポートされるトレースから削除されます。この設定およびその他のセキュリティ/微調整に関するコンフィギュレーションについては[セキュリティ][7]ページを参照してください。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#span-tags
[2]: /ja/tracing/glossary/#spans
[3]: /ja/tracing/setup/ruby/#environment-and-tags
[4]: /ja/tracing/compatibility_requirements/ruby/
[5]: /ja/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: https://github.com/openzipkin/b3-propagation
[7]: /ja/tracing/security
