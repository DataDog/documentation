---
aliases:
  - /ja/tracing/ruby/
  - /ja/tracing/languages/ruby/
  - /ja/tracing/setup/ruby/
  - /ja/tracing/setup_overview/ruby/
  - /ja/agent/apm/ruby/
code_lang: ruby
code_lang_weight: 15
dependencies:
  - 'https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md'
kind: documentation
title: Ruby アプリケーションのトレース
type: multi-code-lang
---
`ddtrace` は、Datadog の Ruby 用トレースクライアントです。ウェブサーバー、データベース、マイクロサービスを通過するリクエストを追跡するために使用されるため、開発者はボトルネックや面倒なリクエストを高度に把握できます。

## はじめに

一般的な APM ドキュメントについては、[セットアップドキュメント][セットアップドキュメント]を参照してください。

アプリケーションが Datadog に情報を送信した後の APM の詳細については、[APM データで可視化する][可視化ドキュメント]をご覧ください。

寄稿するには、[寄稿ガイドライン][寄稿ドキュメント]と[開発ガイド][開発ドキュメント]をご覧ください。

[セットアップドキュメント]: https://docs.datadoghq.com/tracing/
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[可視化ドキュメント]: https://docs.datadoghq.com/tracing/visualization/
[寄稿ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md

## 目次

 - [互換性](#compatibility)
 - [インストール](#installation)
     - [Rails アプリケーションのクイックスタート](#quickstart-for-rails-applications)
     - [Ruby アプリケーションのクイックスタート](#quickstart-for-ruby-applications)
     - [OpenTracing のクイックスタート](#quickstart-for-opentracing)
 - [手動インスツルメンテーション](#manual-instrumentation)
 - [インテグレーションインスツルメンテーション](#integration-instrumentation)
     - [Action Cable](#action-cable)
     - [Action View](#action-view)
     - [Active Model Serializers](#active-model-serializers)
     - [Action Pack](#action-pack)
     - [Active Record](#active-record)
     - [Active Support](#active-support)
     - [AWS](#aws)
     - [Concurrent Ruby](#concurrent-ruby)
     - [Cucumber](#cucumber)
     - [Dalli](#dalli)
     - [DelayedJob](#delayedjob)
     - [Elasticsearch](#elasticsearch)
     - [Ethon & Typhoeus](#ethon)
     - [Excon](#excon)
     - [Faraday](#faraday)
     - [Grape](#grape)
     - [GraphQL](#graphql)
     - [gRPC](#grpc)
     - [http.rb](#http-rb)
     - [httpclient](#httpclient)
     - [httpx](#httpx)
     - [MongoDB](#mongodb)
     - [MySQL2](#mysql2)
     - [Net/HTTP](#net-http)
     - [Presto](#presto)
     - [Qless](#qless)
     - [Que](#que)
     - [Racecar](#racecar)
     - [Rack](#rack)
     - [Rails](#rails)
     - [Rake](#rake)
     - [Redis](#redis)
     - [Rest Client](#rest-client)
     - [Resque](#resque)
     - [RSpec](#rspec)
     - [Shoryuken](#shoryuken)
     - [Sequel](#sequel)
     - [Sidekiq](#sidekiq)
     - [Sinatra](#sinatra)
     - [Sneakers](#sneakers)
     - [Sucker Punch](#sucker-punch)
 - [高度なコンフィギュレーション](#advanced-configuration)
     - [トレーサー設定](#tracer-settings)
     - [カスタムロギング](#custom-logging)
     - [環境とタグ](#environment-and-tags)
     - [サンプリング](#sampling)
         - [優先度サンプリング](#priority-sampling)
     - [分散型トレーシング](#distributed-tracing)
     - [HTTP リクエストのキューイング](#http-request-queuing)
     - [処理パイプライン](#processing-pipeline)
         - [フィルタリング](#filtering)
         - [処理](#processing)
     - [トレース相関](#trace-correlation)
     - [トランスポート層の構成](#configuring-the-transport-layer)
     - [メトリクス](#metrics)
         - [アプリケーションランタイムの場合](#for-application-runtime)
     - [OpenTracing](#opentracing)

## 互換性

**サポートされている Ruby インタープリター**:

| タイプ  | Documentation              | バージョン | サポートの種類                         | Gem バージョンのサポート |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.0     | フル                                 | 最新              |
|       |                            | 2.7     | フル                                 | 最新              |
|       |                            | 2.6     | フル                                 | 最新              |
|       |                            | 2.5     | フル                                 | 最新              |
|       |                            | 2.4     | フル                                 | 最新              |
|       |                            | 2.3     | フル                                 | 最新              |
|       |                            | 2.2     | フル                                 | 最新              |
|       |                            | 2.1     | フル                                 | 最新              |
|       |                            | 2.0     | フル                                 | 最新              |
|       |                            | 1.9.3   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
|       |                            | 1.9.1   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.2     | フル                                 | 最新              |

**サポートされるウェブサーバー**:

| タイプ      | Documentation                     | バージョン      | サポートの種類 |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | フル         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | フル         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | フル         |

**サポートされるトレースフレームワーク**:

| タイプ        | Documentation                                   | バージョン               | Gem バージョンのサポート |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+ (w/ Ruby 2.1+) | >= 0.16.0           |

*フル*サポートは、すべてのトレーサー機能が利用可能であることを示します。

*非推奨*は、将来のリリースでサポートが*メンテナンス*に移行することを示します。

*メンテナンス*は、重大なバグ修正のみが EOL までバックポートされることを示します。

*EOL* は、サポートが提供されなくなったことを示します。

## インストール

次の手順は、Ruby アプリケーションのトレースをすばやく開始するのに役立ちます。

### APM に Datadog Agent を構成する

アプリケーションにトレースをダウンロードする前に、Datadog Agent をインストールします。Ruby APM トレーサーは、Datadog Agent を介してトレースデータを送信します。

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下の手順に従って、Datadog Agent 内でトレース収集を有効にします。

#### コンテナ

1. メインの [`datadog.yaml` コンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-main-configuration-file)で `apm_non_local_traffic: true` を設定します。

2. [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby)、[Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm)、[Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby)、または [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection) 用の特定のセットアップ手順で、コンテナ化環境でトレースを受信するよう Agent が構成されていることを確認します。

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、環境変数 `DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` を設定して変更します。


### Rails アプリケーションのクイックスタート

#### 自動インスツルメンテーション

1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. `bundle install` で gem をインストールします

3. [Rails 手動コンフィギュレーション](#rails-manual-configuration)ファイルを追加することで、特定のインテグレーション設定を構成、オーバーライド、または無効にすることができます。

#### 手動インスツルメンテーション

1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. `bundle install` で gem をインストールします
3. 以下を含む `config/initializers/datadog.rb` ファイルを作成します。

    ```ruby
    Datadog.configure do |c|
      # This will activate auto-instrumentation for Rails
      c.use :rails
    end
    ```

   ここで追加のインテグレーションをアクティブ化することもできます（[インテグレーションインスツルメンテーション](#integration-instrumentation)を参照）。

### Ruby アプリケーションのクイックスタート

#### 自動インスツルメンテーション

1. `gem install ddtrace` で gem をインストールします
2. インスツルメントする必要のある[サポートされているライブラリまたはフレームワーク](#integration-instrumentation)が必要です。
3. アプリケーションに `require 'ddtrace/auto_instrument'` を追加します。_注:_ これは、サポートされているライブラリまたはフレームワークが必要になった_後_に実行する必要があります。

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

   [Ruby 手動コンフィギュレーションブロック](#ruby-manual-configuration)を追加することで、特定のインテグレーション設定を構成、オーバーライド、または無効にすることができます。

#### 手動インスツルメンテーション

1. `gem install ddtrace` で gem をインストールします
2. Ruby アプリケーションにコンフィギュレーションブロックを追加します。

    ```ruby
    require 'ddtrace'
    Datadog.configure do |c|
      # Configure the tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration, nothing will be traced.
    end
    ```

3. 次のいずれかを実行して、インスツルメンテーションを追加またはアクティブ化します。
    - インテグレーションインスツルメンテーションをアクティブ化します（[インテグレーションインスツルメンテーション](#integration-instrumentation)を参照）。
    - コードに手動インスツルメンテーションを追加します（[手動インスツルメンテーション](#manual-instrumentation)を参照）

### OpenTracing のクイックスタート

1. `gem install ddtrace` で gem をインストールします
2. OpenTracing コンフィギュレーションファイルに、以下を追加します。

    ```ruby
    require 'opentracing'
    require 'ddtrace'
    require 'ddtrace/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

3. （オプション）Ruby アプリケーションにコンフィギュレーションブロックを追加して、Datadog を次のように構成します。

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

4. （オプション）次のいずれかを実行して、追加のインスツルメンテーションを追加またはアクティブ化します。
    - Datadog インテグレーションインスツルメンテーションをアクティブ化します（[インテグレーションインスツルメンテーション](#integration-instrumentation)を参照）。
    - コードに Datadog 手動インスツルメンテーションを追加します（[手動インスツルメンテーション](#manual-instrumentation)を参照）

### インストールの最後の手順

セットアップ後、数分以内に [APM サービスページ](https://app.datadoghq.com/apm/services)にサービスが表示されます。[APM UI の使用][可視化ドキュメント]の詳細をご覧ください。

## 手動インスツルメンテーション

サポートされているフレームワークインスツルメンテーションを使用していない場合は、コードを手動でインスツルメントすることができます。

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
| `start_time`  | `Time` | スパンが実際に開始したとき。すでに発生したイベントをトレースするときに役立ちます。 | `Time.now` |
| `tags`        | `Hash` | スパンに追加する必要がある追加のタグ。 | `{}` |
| `on_error`    | `Proc` | トレースするブロックが指定されたときに呼び出されるハンドラー。これはエラーを発生させます。引数として `span` と `error` が指定されました。デフォルトでスパンにエラーを設定します。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

少なくとも `service` と `resource` の両方を設定することを強くお勧めします。`nil` として `service` や `resource` がないスパンは、Datadog Agent によって破棄されます。

実際の手動インスツルメンテーションの例

```ruby
get '/posts' do
  Datadog.tracer.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
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

### 非同期トレース

`Datadog.tracer.trace` をコードブロックでラップすることが常に可能であるとは限りません。一部のイベントまたは通知ベースのインスツルメンテーションは、イベントの開始時または終了時にのみ通知する場合があります。

こうした操作をトレースするには、ブロックなしで `Datadog.tracer.trace` を呼び出すことにより、コードを非同期でトレースできます。

```ruby
# 一部のインスツルメンテーションフレームワークは、イベントの終了後にこれを呼び出します...
def db_query(start, finish, query)
  span = Datadog.tracer.trace('database.query')
  span.resource = query
  span.start_time = start
  span.finish(finish)
end
```

ブロックなしで `Datadog.tracer.trace` を呼び出すと、関数は開始されたが終了していない `Datadog::Span` を返します。次に、このスパンを必要に応じて変更してから、`finish` で閉じます。

*未完了のスパンを残してはいけません。*トレースが完了したときにスパンが開いたままになっていると、トレースは破棄されます。[デバッグモードをアクティブにする](#tracer-settings)ことで、これが発生していると思われる場合に警告を確認できます。

開始/終了イベントを処理するときにこのシナリオを回避するには、`Datadog.tracer.active_span` を使用して現在のアクティブなスパンを取得できます。

```ruby
# 例: ActiveSupport::Notifications は、イベントの開始時にこれを呼び出します
def start(name, id, payload)
  # スパンを開始します
  Datadog.tracer.trace(name)
end

# 例: ActiveSupport::Notifications は、イベントの終了時にこれを呼び出します
def finish(name, id, payload)
  # 現在のアクティブなスパンを取得します（スレッドセーフ）
  current_span = Datadog.tracer.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### ネストされたメソッドからのトレースの加工

どのメソッドからでも、現在アクティブなスパンに追加情報をタグ付けできます。ただし、メソッドが呼び出され、現在アクティブなスパンがない場合、`active_span` は nil になることに注意してください。

```ruby
# 例: アクティブなスパンにタグを追加する

current_span = Datadog.tracer.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

また、`active_root_span` メソッドを使用して、現在アクティブなトレースのルートスパンを取得することもできます。アクティブなトレースがない場合、このメソッドは `nil` を返します。

```ruby
# 例: アクティブなルートスパンにタグを追加する

current_root_span = Datadog.tracer.active_root_span
current_root_span.set_tag('my_tag', 'my_value') unless current_root_span.nil?
```

## インテグレーションインスツルメンテーション

多くの一般的なライブラリとフレームワークがそのまま使用でき、自動インスツルメンテーションできます。これは自動的にはアクティブ化されませんが、`Datadog.configure` API を使用して簡単にアクティブ化および構成できます。

```ruby
Datadog.configure do |c|
  # インテグレーションをアクティブ化、構成します
  c.use :integration_name, options
end
```

`options` はインテグレーション固有のコンフィギュレーション設定の `Hash` です。

利用可能なインテグレーションとそのコンフィギュレーションオプションのリストについては、以下を参照してください。

| 名前                     | キー                        | 対応バージョン: MRI  | 対応バージョン: JRuby | 構成方法                    | Gem ソース                                                                     |
| ------------------------ | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable             | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[リンク](#action-cable)*             | *[リンク](https://github.com/rails/rails/tree/master/actioncable)*               |
| Action View              | `action_view`              | `>= 3.0`                 | `>= 3.0`                  | *[リンク](#action-view)*              | *[リンク](https://github.com/rails/rails/tree/master/actionview)*                |
| Active Model Serializers | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[リンク](#active-model-serializers)* | *[リンク](https://github.com/rails-api/active_model_serializers)*                |
| Action Pack              | `action_pack`              | `>= 3.0`                 | `>= 3.0`                  | *[リンク](#action-pack)*              | *[リンク](https://github.com/rails/rails/tree/master/actionpack)*                |
| Active Record            | `active_record`            | `>= 3.0`                 | `>= 3.0`                  | *[リンク](#active-record)*            | *[リンク](https://github.com/rails/rails/tree/master/activerecord)*              |
| Active Support           | `active_support`           | `>= 3.0`                 | `>= 3.0`                  | *[リンク](#active-support)*           | *[リンク](https://github.com/rails/rails/tree/master/activesupport)*             |
| AWS                      | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#aws)*                      | *[リンク](https://github.com/aws/aws-sdk-ruby)*                                  |
| Concurrent Ruby          | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[リンク](#concurrent-ruby)*          | *[リンク](https://github.com/ruby-concurrency/concurrent-ruby)*                  |
| Cucumber                 | `cucumber`                 | `>= 3.0`                 | `>= 1.7.16`               | *[Link](#cucumber)*                | *[Link](https://github.com/cucumber/cucumber-ruby)*                            |
| Dalli                    | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#dalli)*                    | *[リンク](https://github.com/petergoldstein/dalli)*                              |
| DelayedJob               | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[リンク](#delayedjob)*               | *[リンク](https://github.com/collectiveidea/delayed_job)*                        |
| Elasticsearch            | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#elasticsearch)*            | *[リンク](https://github.com/elastic/elasticsearch-ruby)*                        |
| Ethon                    | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[リンク](#ethon)*                    | *[リンク](https://github.com/typhoeus/ethon)*                                    |
| Excon                    | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[リンク](#excon)*                    | *[リンク](https://github.com/excon/excon)*                                       |
| Faraday                  | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[リンク](#faraday)*                  | *[リンク](https://github.com/lostisland/faraday)*                                |
| Grape                    | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#grape)*                    | *[リンク](https://github.com/ruby-grape/grape)*                                  |
| GraphQL                  | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[リンク](#graphql)*                  | *[リンク](https://github.com/rmosolgo/graphql-ruby)*                             |
| gRPC                     | `grpc`                     | `>= 1.7`                 | *gem の利用不可*       | *[リンク](#grpc)*                     | *[リンク](https://github.com/grpc/grpc/tree/master/src/rubyc)*                   |
| http.rb                  | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[Link](#http-rb)*                  | *[リンク](https://github.com/httprb/http)*                                       |
| httpclient                | `httpclient`              | `>= 2.2`                 | `>= 2.2`                  | *[リンク](#httpclient)*               | *[リンク](https://github.com/nahi/httpclient)*                                     |
| httpx                     | `httpx`                   | `>= 0.11`                | `>= 0.11`                 | *[リンク](#httpx)*                    | *[リンク](https://gitlab.com/honeyryderchuck/httpx)*                             |
| Kafka                    | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[リンク](#kafka)*                    | *[Link](https://github.com/zendesk/ruby-kafka)*                                |
| MongoDB                  | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[リンク](#mongodb)*                  | *[リンク](https://github.com/mongodb/mongo-ruby-driver)*                         |
| MySQL2                   | `mysql2`                   | `>= 0.3.21`              | *gem の利用不可*       | *[リンク](#mysql2)*                   | *[リンク](https://github.com/brianmario/mysql2)*                                 |
| Net/HTTP                 | `http`                     | *（サポートされているすべての Ruby）*   | *（サポートされているすべての Ruby）*    | *[リンク](#nethttp)*                  | *[リンク](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)* |
| Presto                   | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[リンク](#presto)*                   | *[リンク](https://github.com/treasure-data/presto-client-ruby)*                  |
| Qless                    | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | *[リンク](#qless)*                    | *[リンク](https://github.com/seomoz/qless)*                                      |
| Que                      | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[リンク](#que)*                      | *[リンク](https://github.com/que-rb/que)*                                        |
| Racecar                  | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[リンク](#racecar)*                  | *[リンク](https://github.com/zendesk/racecar)*                                   |
| Rack                     | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[リンク](#rack)*                     | *[リンク](https://github.com/rack/rack)*                                         |
| Rails                    | `rails`                    | `>= 3.0`                 | `>= 3.0`                  | *[リンク](#rails)*                    | *[リンク](https://github.com/rails/rails)*                                       |
| Rake                     | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[リンク](#rake)*                     | *[リンク](https://github.com/ruby/rake)*                                         |
| Redis                    | `redis`                    | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#redis)*                    | *[リンク](https://github.com/redis/redis-rb)*                                    |
| Resque                   | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#resque)*                   | *[リンク](https://github.com/resque/resque)*                                     |
| Rest Client              | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[リンク](#rest-client)*              | *[リンク](https://github.com/rest-client/rest-client)*                           |
| RSpec                    | `rspec`.                   | `>= 3.0.0`               | `>= 3.0.0`                | *[リンク](#rspec)*.                   | *[リンク](https://github.com/rspec/rspec)*                                       |
| Sequel                   | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[リンク](#sequel)*                   | *[リンク](https://github.com/jeremyevans/sequel)*                                |
| Shoryuken                | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#shoryuken)*                | *[リンク](https://github.com/phstc/shoryuken)*                                   |
| Sidekiq                  | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[リンク](#sidekiq)*                  | *[リンク](https://github.com/mperham/sidekiq)*                                   |
| Sinatra                  | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[リンク](#sinatra)*                  | *[リンク](https://github.com/sinatra/sinatra)*                                   |
| Sneakers                 | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[リンク](#sneakers)*                 | *[リンク](https://github.com/jondot/sneakers)*                                   |
| Sucker Punch             | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#sucker-punch)*             | *[リンク](https://github.com/brandonhilkert/sucker_punch)*                       |

### Action Cable

Action Cable インテグレーションは、ブロードキャストメッセージとチャンネルアクションをトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_cable, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `action_cable` インスツルメンテーションに使用されるサービス名 | `'action_cable'` |

### Action View

ほとんどの場合、Active Support は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_view, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | インスツルメンテーションのレンダリングに使用されるサービス名。 | `action_view` |
| `template_base_path` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存しない場合、この値を変更する必要があるかもしれません | `'views/'` |

### Active Model Serializers

Active Model Serializers インテグレーションは、バージョン 0.9 以降の `serialize` イベントとバージョン 0.10 以降の `render` イベントをトレースします。

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_model_serializers, options
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `active_model_serializers` インスツルメンテーションに使用されるサービス名。 | `'active_model_serializers'` |

### Action Pack

ほとんどの場合、Action Pack は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.use :action_pack, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | インスツルメンテーションのレンダリングに使用されるサービス名。 | `action_pack` |

### Active Record

ほとんどの場合、Active Record はウェブフレームワーク（Rails、Sinatra...）の一部としてセットアップされますが、単独でセットアップすることもできます。

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_record, options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `orm_service_name` | クエリ結果の ActiveRecord オブジェクトへのマッピング部分に使用されるサービス名。デフォルトでは、親からサービス名を継承します。 | _parent.service_name_ (例: `'mysql2'`) |
| `service_name` | `active_record` インスツルメンテーションのデータベース部分に使用されるサービス名。 | データベースアダプターの名前（例: `'mysql2'`） |

**データベースごとのトレース設定の構成**

`describes` オプションを使用して、データベース接続ごとにトレース設定を構成できます。

```ruby
# 接続キーで `:describes` オプションを指定します。
# 以下のキーはすべて受け入れ可能であり、互いに同等です。
# ブロックを指定すると、上記の構成オプションのいずれかを
# 受け入れる設定オブジェクトが生成されます。

Datadog.configure do |c|
  # config/database.yml のデータベース接続に一致するシンボル
  # ActiveRecord で Rails を使用している場合にのみ使用できます。
  c.use :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # 構成パターンをブロック。 
  c.use :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # 次の接続設定の接続文字列:
  # adapter、username、host、port、database
  # 他のフィールドは無視。  
  c.use :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # 次の接続設定のハッシュ
  # adapter、user、host、port、database
  # 他のフィールドは無視。
  c.use :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'
end
```

データベース接続フィールドの部分的一致に基づき構成を作成することも可能です。

```ruby
Datadog.configure do |c|
  # ホスト `127.0.0.1` の任意の接続に一致。
  c.use :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # 任意の `mysql2` 接続に一致。
  c.use :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # `reports` データベースへの任意の `mysql2` 接続に一致。
  #
  # `describe` 構成に複数の一致がある場合、最新のものを適用。
  # この場合、アダプター `mysql` とデータベース `reports` の両方の接続は
  # `service_name: 'mysql-db'` ではなく `service_name: 'reports-db'` と構成。 
  c.use :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

複数の `describes` コンフィギュレーションが接続に一致するとき、一致する最新の構成ルールが適用されます。

ActiveRecord が `describes` で定義されたキーと一致する接続を使用するイベントをトレースする場合は、その接続に割り当てられているトレース設定を使用します。接続が記述されている接続のいずれとも一致しない場合は、代わりに `c.use :active_record` で定義されたデフォルト設定を使用します。

### Active Support

ほとんどの場合、Active Support は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :active_support, options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `cache_service` | `active_support` インスツルメンテーションでのキャッシュに使用されるサービス名。 | `active_support-cache` |

### AWS

AWS インテグレーションは、AWS サービス（S3、ElastiCache など）とのすべてのやり取り（API 呼び出しなど）を追跡します。

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.use :aws, options
end

# トレースされた呼び出しを実行します
Aws::S3::Client.new.list_buckets
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `aws` インスツルメンテーションに使用されるサービス名 | `'aws'` |

### Concurrent Ruby

Concurrent Ruby インテグレーションは、`::Concurrent::Future` を使用する場合のコンテキスト伝播のサポートを追加します。
`Future#execute` 内でトレースされるコードに正しい親セットがあることを確認します。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
# Rails ニシャライザまたは同等の内部
Datadog.configure do |c|
  # ::Concurrent::Future をパッチしてコンテキストを伝播する ExecutorService を使用します
  c.use :concurrent_ruby, options
end

# Concurrent::Future 内で実行されるコードにコンテキストを渡します
Datadog.tracer.trace('outer') do
  Concurrent::Future.execute { Datadog.tracer.trace('inner') { } }.wait
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `concurrent-ruby` インスツルメンテーションに使用されるサービス名 | `'concurrent-ruby'` |

### Cucumber

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のすべてのシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
require 'cucumber'
require 'ddtrace'

# デフォルトの Cucumber インテグレーションを構成
Datadog.configure do |c|
  c.use :cucumber, options
end

# シナリオからアクティブなスパンにタグ付けする方法の例
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Cucumber テストをトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `cucumber` インスツルメンテーションに使用されるサービス名 | `'cucumber'` |
| `operation_name` | `cucumber` インスツルメンテーションに使用するオペレーション名。`trace.#{operation_name}.errors` など、自動のトレースメトリクスの名前を変更したい場合に役立ちます。 | `'cucumber.test'` |

### Dalli

Dalli インテグレーションは、`memcached` サーバーへのすべての呼び出しを追跡します。

```ruby
require 'dalli'
require 'ddtrace'

# デフォルトの Dalli トレース動作を構成します
Datadog.configure do |c|
  c.use :dalli, options
end

# 単一クライアントの Dalli トレース動作を構成します
client = Dalli::Client.new('localhost:11211', options)
client.set('abc', 123)
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `dalli` インスツルメンテーションに使用されるサービス名 | `'memcached'` |

### DelayedJob

DelayedJob インテグレーションは、ライフサイクルフックを使用してジョブの実行とエンキューを追跡します。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :delayed_job, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `DelayedJob` インスツルメンテーションに使用されるサービス名 | `'delayed_job'` |
| `client_service_name` | クライアントサイドの `DelayedJob` インスツルメンテーションに使用されるサービス名 | `'delayed_job-client'` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Elasticsearch

Elasticsearch インテグレーションは、`Client` オブジェクトの `perform_request` への呼び出しを追跡します。

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.use :elasticsearch, options
end

# Elasticsearch にクエリを実行します
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `quantize` | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show`（または量子化をスキップする場合は `:all`）、または完全に除外するキーの配列を含む `:exclude` を含めることができます。 | `{}` |
| `service_name` | `elasticsearch` インスツルメンテーションに使用されるサービス名 | `'elasticsearch'` |

### Ethon

`ethon` インテグレーションは、`Easy` または `Multi` オブジェクトを介してすべての HTTP リクエストをトレースします。なお、このインテグレーションは、`Ethon` に基づく `Typhoeus` ライブラリもサポートします。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :ethon, options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `ethon` インスツルメンテーションのサービス名。 | `'ethon'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

### Excon

`excon` インテグレーションは、`ddtrace` ミドルウェアを介して利用できます。

```ruby
require 'excon'
require 'ddtrace'

# デフォルトの Excon トレース動作を構成します
Datadog.configure do |c|
  c.use :excon, options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end

connection = Excon.new('https://example.com')
connection.get
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `error_handler` | `response` パラメーターを受け入れる `Proc`。*truthy* 値に評価される場合、トレーススパンはエラーとしてマークされます。デフォルトでは、5XX 応答のみをエラーとして設定します。 | `nil` |
| `service_name` | Excon インスツルメンテーションのサービス名。特定の接続のミドルウェアに指定される場合、その接続オブジェクトにのみ適用されます。 | `'excon'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

**接続を構成してさまざまな設定を使用する**

Excon で複数の接続を使用する場合、ミドルウェアを使用してコンストラクターを構成することで、それぞれに異なる設定を与えることができます。

```ruby
# Datadog トレースミドルウェアをデフォルトのミドルウェアスタックにラップします
Excon.new(
  'http://example.com',
  middlewares: Datadog::Contrib::Excon::Middleware.with(options).around_default_stack
)

# ミドルウェアをカスタムミドルウェアスタックに挿入します。
# 注: ResponseParser の後にトレースミドルウェアを挿入する必要があります。
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

ここで、`options` は、上記の表にリストされているパラメーターのいずれかを含むハッシュです。

### Faraday

`faraday` インテグレーションは、`ddtrace` ミドルウェアを介して利用できます。

```ruby
require 'faraday'
require 'ddtrace'

# デフォルトの Faraday トレース動作を構成します
Datadog.configure do |c|
  c.use :faraday, options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end

# 特定のクライアントインスタンスのグローバルコンフィギュレーションをオーバーライドする場合
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `error_handler` | `response` パラメーターを受け入れる `Proc`。*truthy* 値に評価される場合、トレーススパンはエラーとしてマークされます。デフォルトでは、5XX 応答のみをエラーとして設定します。 | `nil` |
| `service_name` | Faraday インスツルメンテーションのサービス名。特定の接続のミドルウェアに指定される場合、その接続オブジェクトにのみ適用されます。 | `'faraday'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

### Grape

Grape インテグレーションでは、Grape エンドポイントとフィルターにインスツルメンテーションが追加されます。このインテグレーションは、Rack や Rails などの他のインテグレーションと並行して機能できます。

インテグレーションをアクティブ化するには、Grape アプリケーションを定義する前に、`Datadog.configure` メソッドを使用します。

```ruby
# api.rb
require 'grape'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grape, options
end

# 次に、アプリケーションを定義します
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `nil` |
| `enabled` | Grape をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `grape` インスツルメンテーションに使用されるサービス名 | `'grape'` |
| `エラー_ステータス`| エラーとしてマークする必要がある、ステータスコードもしくはステータスコードの範囲を定義します。`'404,405,500-599'` または `[404,405,'500-599']` | `nil` |

### GraphQL

GraphQL インテグレーションでは、GraphQL クエリのインスツルメンテーションがアクティブになります。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
# Rails ニシャライザまたは同等の内部
Datadog.configure do |c|
  c.use :graphql, schemas: [YourSchema], options
end

# 次に、GraphQL クエリを実行します
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

`use :graphql` メソッドは以下のパラメーターを受け入れます。追加のオプションは、`options` の代わりに使用できます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `nil` |
| `service_name` | `graphql` インスツルメンテーションに使用されるサービス名 | `'ruby-graphql'` |
| `schemas` | 必須。トレースする `GraphQL::Schema` オブジェクトの配列。このコンフィギュレーションに指定されるオプションを使用して、リストされているすべてのスキーマにトレースが追加されます。何も指定しない場合、トレースはアクティブ化されません。 | `[]` |

**GraphQL スキーマを手動で構成する**

スキーマのトレーサー設定を個別に構成する場合（たとえば、サービス名が異なる複数のスキーマがある場合）、スキーマ定義で、[GraphQL API を使用](http://graphql-ruby.org/queries/tracing.html)して次を追加できます。

```ruby
# クラスベースのスキーマ
class YourSchema < GraphQL::Schema
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

```ruby
# .define スタイルのスキーマ
YourSchema = GraphQL::Schema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

または、すでに定義されているスキーマを変更することもできます。

```ruby
# クラスベースのスキーマ
YourSchema.use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
)
```

```ruby
# .define スタイルのスキーマ
YourSchema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

ダブルトレースを回避するために、手動で構成する場合は `Datadog.configure` で `:graphql` を*使用しない*でください。GraphQL トレースを構成するこれらの 2 つの方法は、相互に排他的であると見なされます。

### gRPC

`grpc` インテグレーションでは、サービスのリモートプロシージャ呼び出しを実行する前にミドルウェアとして実行されるクライアントとサーバーの両方のインターセプターが追加されます。gRPC アプリケーションはしばしば分散されるため、このインテグレーションはクライアントとサーバー間でトレース情報を共有します。

インテグレーションをセットアップするには、次のように `Datadog.configure` メソッドを使用します。

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.use :grpc, options
end

# サーバー側
server = GRPC::RpcServer.new
server.add_http2_port('localhost:50051', :this_port_is_insecure)
server.handle(Demo)
server.run_till_terminated

# クライアント側
client = Demo.rpc_stub_class.new('localhost:50051', :this_channel_is_insecure)
client.my_endpoint(DemoMessage.new(contents: 'hello!'))
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `grpc` インスツルメンテーションに使用されるサービス名 | `'grpc'` |

**クライアントを構成してさまざまな設定を使用する**

複数の異なるサービスを呼び出す複数のクライアントがある状況では、次のように Datadog インターセプターを直接渡すことができます。

```ruby
configured_interceptor = Datadog::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

インテグレーションにより、`configured_interceptor` がそのクライアントインスタンスに固有のトレース設定を確立することが保証されます。

### http.rb

http.rb インテグレーションは、Http.rb gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.use :httprb, options
  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `httprb` インスツルメンテーションのサービス名。 | `'httprb'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

### httpclient

httpclient インテグレーションは、httpclient gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.use :httpclient, options
  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `httpclient` インスツルメンテーションのサービス名。 | `'httpclient'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

### httpx

`httpx` は [`ddtrace` とのインテグレーション](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter)を維持:

```ruby
require "ddtrace"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.use :httpx

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

### Kafka

Kafka インテグレーションは、`ruby-kafka` gem のトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'active_support/notifications' # required to enable 'ruby-kafka' インスツルメンテーションを有効にするために必要
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.use :kafka, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `kafka` インスツルメンテーションに使用されるサービス名 | `'kafka'` |
| `tracer` | インスツルメンテーションの実行に使用される `Datadog::Tracer`。通常、これを設定する必要はありません。 | `Datadog.tracer` |

### MongoDB

インテグレーションは、[MongoDB Ruby Driver](https://github.com/mongodb/mongo-ruby-driver) から MongoDB クラスターに送信されるすべての `Command` を追跡します。拡張により、Mongoid などの Object Document Mappers (ODM) は、公式の Ruby ドライバーを使用している場合、自動的にインスツルメントされます。インテグレーションのアクティブ化:

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mongo, options
end

# MongoDB クライアントを作成し、通常どおり使用します
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# 特定のクライアントインスタンスのグローバル構成をオーバーライドする場合
Datadog.configure(client, options)
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `quantize` | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show`（または量子化をスキップする場合は `:all`）、または完全に除外するキーの配列を含む `:exclude` を含めることができます。 | `{ show: [:collection, :database, :operation] }` |
| `service_name` | `mongo` インスツルメンテーションに使用されるサービス名 | `'mongodb'` |

### MySQL2

MySQL2 インテグレーションは、`mysql2` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.use :mysql2, options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `mysql2` インスツルメンテーションに使用されるサービス名 | `'mysql2'` |

### Net/HTTP

Net/HTTP インテグレーションは、標準の lib Net::HTTP モジュールを使用して HTTP 呼び出しをトレースします。

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.use :http, options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.use :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `http` インスツルメンテーションに使用されるサービス名 | `'net/http'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

各接続オブジェクトを個別に構成する場合は、次のように `Datadog.configure` を使用できます。

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure(client, options)
```

### Presto

Presto インテグレーションは、`presto-client` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :presto, options
end

client = Presto::Client.new(
  server: "localhost:8880",
  ssl: {verify: false},
  catalog: "native",
  schema: "default",
  time_zone: "US/Pacific",
  language: "English",
  http_debug: true,
)

client.run("select * from system.nodes")
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `presto` インスツルメンテーションに使用されるサービス名 | `'presto'` |

### Qless

Qless インテグレーションは、ライフサイクルフックを使用してジョブの実行を追跡します。

Qless ジョブにトレースを追加するには

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :qless, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `qless` インスツルメンテーションに使用されるサービス名 | `'qless'` |
| `tag_job_data` | ジョブ引数のタグ付けを有効にします。オンの場合は true、オフの場合は false です。 | `false` |
| `tag_job_tags` | ジョブタグのタグ付けを有効にします。オンの場合は true、オフの場合は false です。 | `false` |

### Que

Que インテグレーションは、ジョブの実行をトレースするミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :que, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `enabled` | Que をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `que` インスツルメンテーションに使用されるサービス名 | `'que'` |
| `tag_args` | ジョブの引数フィールドのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `tag_data` | ジョブのデータフィールドのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Racecar

Racecar インテグレーションは、Racecar ジョブのトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :racecar, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `racecar` インスツルメンテーションに使用されるサービス名 | `'racecar'` |

### Rack

Rack インテグレーションは、すべてのリクエストが基底のフレームワークまたはアプリケーションに到達する前にそれらを追跡するミドルウェアを提供します。これは、Rack の最小インターフェイスに応答し、Rack レベルで取得できる妥当な値を提供します。

このインテグレーションは、Rails などのウェブフレームワークで自動的にアクティブ化されます。プレーンな Rack アプリケーションを使用している場合は、`config.ru` へのインテグレーションを有効にします。

```ruby
# config.ru の例
require 'ddtrace'

Datadog.configure do |c|
  c.use :rack, options
end

use Datadog::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `nil` |
| `application` | Rack アプリケーション。`middleware_names` に対して必須です。 | `nil` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `headers` | タグとして `rack.request` に追加する HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` と `response` キーを受け入れます（例: `['Last-Modified']`）。`http.request.headers.*` タグと `http.response.headers.*` タグをそれぞれ追加します。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | 最後に実行されたミドルウェアクラスを `rack` スパンのリソース名として使用する場合は、これを有効にします。`rails` インスツルメンテーションと一緒に有効にすると、`rails` が優先されます。該当する場合は `rack` リソース名をアクティブな `rails` コントローラーに設定します。使用するには `application` オプションが必要です。 | `false` |
| `quantize` | 量子化のオプションを含むハッシュ。`:query` または `:fragment` を含めることができます。 | `{}` |
| `quantize.query` | URL 量子化のクエリ部分のオプションを含むハッシュ。`:show` または `:exclude` を含めることができます。以下のオプションを参照してください。オプションは `quantize` オプション内にネストする必要があります。 | `{}` |
| `quantize.query.show` | 常に表示する値を定義します。デフォルトでは値を表示しません。文字列の配列、またはすべての値を表示するには `:all` を指定できます。オプションは `query` オプション内にネストする必要があります。 | `nil` |
| `quantize.query.exclude` | 完全に削除する値を定義します。デフォルトでは何も除外しません。文字列の配列、またはクエリ文字列を完全に削除するには `:all` を指定できます。オプションは `query` オプション内にネストする必要があります。 | `nil` |
| `quantize.fragment` | URL フラグメントの動作を定義します。デフォルトではフラグメントを削除します。URL フラグメントを表示するには `:show` を指定できます。オプションは `quantize` オプション内にネストする必要があります。 | `nil` |
| `request_queuing` | フロントエンドサーバーのキューで費やされた HTTP リクエスト時間を追跡します。設定の詳細については、[HTTP リクエストキュー](#http-request-queuing)をご覧ください。 有効にするには、`true` に設定します。 | `false` |
| `service_name` | `rack` インスツルメンテーションに使用されるサービス名 | `'rack'` |
| `web_service_name` | フロントエンドサーバーリクエストのキュースパンのサービス名。（例: `'nginx'`） | `'web-server'` |

**URL 量子化動作の構成**

```ruby
Datadog.configure do |c|
  # デフォルトの動作: すべての値が量子化され、フラグメントが削除されます。
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by
  # http://example.com/path?categories[]=1&categories[]=2 --> http://example.com/path?categories[]

  # 'category_id' と完全に一致するクエリ文字列パラメーターの値を表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by
  c.use :rack, quantize: { query: { show: ['category_id'] } }

  # すべてのクエリ文字列パラメーターのすべての値を表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id=1&sort_by=asc
  c.use :rack, quantize: { query: { show: :all } }

  # 'sort_by' に完全に一致するクエリ文字列パラメーターを完全に除外します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id
  c.use :rack, quantize: { query: { exclude: ['sort_by'] } }

  # クエリ文字列を完全に削除します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path
  c.use :rack, quantize: { query: { exclude: :all } }

  # URL フラグメントを表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.use :rack, quantize: { fragment: :show }
end
```

### Rails

Rails インテグレーションは、リクエスト、データベース呼び出し、テンプレートのレンダリング、およびキャッシュの読み取り/書き込み/削除操作をトレースします。このインテグレーションでは、Active Support インスツルメンテーションを利用し、Notification API をリッスンして、API によってインスツルメントされた操作をトレースします。

Rails インスツルメンテーションを有効にするには、`config/initializers` フォルダーにイニシャライザファイルを作成します。

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `nil` |
| `cache_service` | キャッシュアクティビティをトレースするときに使用されるキャッシュサービス名 | `'<アプリ名>-cache'` |
| `controller_service` | Rails アクションコントローラーをトレースするときに使用されるサービス名 | `'<アプリ名>'` |
| `database_service` | データベースアクティビティをトレースするときに使用されるデータベースサービス名 | `'<アプリ名>-<アダプター名>'` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `exception_controller` | カスタム例外コントローラークラスを識別するクラスまたはモジュール。トレーサーは、カスタム例外コントローラーを識別できる場合のエラー動作を改善します。デフォルトでは、このオプションを使用しない場合、カスタム例外コントローラーがどのようなものかは「推測」されます。このオプションを指定すると、この識別が容易になります。 | `nil` |
| `middleware` | トレースミドルウェアを Rails アプリケーションに追加します。ミドルウェアをロードしたくない場合は、`false` に設定します。 | `true` |
| `middleware_names` | 短絡したミドルウェアリクエストがトレースのリソースとしてミドルウェア名を表示できるようにします。 | `false` |
| `service_name` | アプリケーションのリクエストをトレースするときに使用されるサービス名（`rack` レベル） | `'<アプリ名>'`（Rails アプリケーションのネームスペースから推測） |
| `template_base_path` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存しない場合、この値を変更する必要があるかもしれません | `'views/'` |
| `log_injection` | `dd.trace_id` などのインジェクションの[トレース相関](#トレース相関)情報を Rails ログに自動的に有効化します。デフォルトのロガー (`ActiveSupport::TaggedLogging`) および `Lograge` をサポートします。トレース相関情報のフォーマットに関する詳細は、[トレース相関](#トレース相関)セクションを参照してください。  | `false` |

**サポートされるバージョン**

| MRI バージョン  | JRuby バージョン | Rails バージョン |
| ------------- | -------------- | -------------- |
|  2.0          |                |  3.0 - 3.2     |
|  2.1          |                |  3.0 - 4.2     |
|  2.2 - 2.3    |                |  3.0 - 5.2     |
|  2.4          |                |  4.2.8 - 5.2   |
|  2.5          |                |  4.2.8 - 6.1   |
|  2.6 - 2.7    |  9.2           |  5.0 - 6.1     |
|  3.0          |                |  6.1           |

### Rake

`rake` インテグレーションをアクティブにすることで、Rake タスクに関するインスツルメンテーションを追加できます。各タスクとその後続のサブタスクがトレースされます。

Rake タスクのトレースをアクティブにするには、以下を `Rakefile` に追加します。

```ruby
# Rakefile の上部:
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rake, options
end

task :my_task do
  # ここで何かタスクを実行します...
end

Rake::Task['my_task'].invoke
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `enabled` | Rake タスクをトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `quantize` | タスク引数の量子化のオプションを含むハッシュ。詳細と例については、以下を参照してください。 | `{}` |
| `service_name` | `rake` インスツルメンテーションに使用されるサービス名 | `'rake'` |

**タスク量子化動作の構成**

```ruby
Datadog.configure do |c|
  # :one、:two、:three... を受け入れるタスクがあるとします。
  # 'foo'、'bar'、'baz' で呼び出されます。

  # デフォルトの動作: すべての引数は量子化されます。
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: '?', three: '?' }
  c.use :rake

  # :two に完全に一致する引数の値を表示します
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: 'bar', three: '?' }
  c.use :rake, quantize: { args: { show: [:two] } }

  # すべての引数のすべての値を表示します。
  # `rake.invoke.args` タグ  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` タグ --> { one: 'foo', two: 'bar', three: 'baz' }
  c.use :rake, quantize: { args: { show: :all } }

  # :three に完全に一致する引数を完全に除外します
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: '?' }
  c.use :rake, quantize: { args: { exclude: [:three] } }

  # 引数を完全に削除します
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> {}
  c.use :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

Redis インテグレーションは、単純な呼び出しとパイプラインをトレースします。

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis, options
end

# Redis コマンドを実行します
redis = Redis.new
redis.set 'foo', 'bar'
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `redis` インスツルメンテーションに使用されるサービス名 | `'redis'` |
| `command_args` | コマンド引数 (例: `GET key` の `key`) をリソース名とタグとして表示します | true |

次のように、*インスタンスごと*のコンフィギュレーションを設定することもできます。

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.use :redis # インテグレーションインスツルメンテーションの有効化が必要です
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure(customer_cache, service_name: 'customer-cache')
Datadog.configure(invoice_cache, service_name: 'invoice-cache')

# トレースされたコールは `customer-cache` サービスに帰属します
customer_cache.get(...)
# トレースされたコールは `invoice-cache` サービスに帰属します
invoice_cache.get(...)
```

**接続ごとのトレース設定の構成**

`describes` オプションを使用して、接続ごとにトレース設定を構成できます。

```ruby
# 接続キーで `:describes` オプションを指定します。
# 以下のキーはすべて受け入れ可能であり、互いに同等です。
# ブロックを指定すると、上記の構成オプションのいずれかを
# 受け入れる設定オブジェクトが生成されます。

Datadog.configure do |c|
  # Redis クライアントのデフォルトコンフィギュレーション
  c.use :redis, service_name: 'redis-default'

  # 指定された UNIX ソケットに一致するコンフィギュレーション。
  c.use :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # ネットワーク接続の場合、以下のフィールドのみが検索一致の対象:
  # scheme、host、port、db
  # 他のフィールドは無視されます。

  # 接続文字列
  c.use :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.use :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # ネットワーククライアントのハッシュ
  c.use :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # 接続ハッシュのサブセットのみ
  c.use :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.use :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

複数の `describes` コンフィギュレーションが接続に一致するとき、一致する最新の構成ルールが適用されます。

### Resque

Resque インテグレーションは、`perform` メソッドをラップする Resque フックを使用します。

Resque ジョブにトレースを追加するには

```ruby
require 'ddtrace'

class MyJob
  def self.perform(*args)
    # do_something
  end
end

Datadog.configure do |c|
  c.use :resque, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `resque` インスツルメンテーションに使用されるサービス名 | `'resque'` |
| `workers` | トレースするすべてのワーカークラスを含む配列（例: `[MyJob]`） | `[]` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Rest Client

`rest-client` インテグレーションは、`ddtrace` ミドルウェアを介して利用できます。

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.use :rest_client, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `rest_client` インスツルメンテーションのサービス名。 | `'rest_client'` |

### RSpec

RSpec インテグレーションでは、`rspec` テストフレームワーク使用時に、グループ単位や個別での例の実行すべてをトレースできます。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
require 'rspec'
require 'ddtrace'

# 既定の RSpec インテグレーションを構成する
Datadog.configure do |c|
  c.use :rspec, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | RSpec テストをトレースする必要があるのかどうかを定義します。トレーシングを一時的に無効化するのに役立ちます。`true` または `false` | `true` |
| `service_name` | `rspec` インスツルメンテーションに使用されているサービス名 | `'rspec'` |
| `operation_name` | `rspec` インスツルメンテーションに使用されているオペレーション名です。`trace.#{オペレーション_名前}.errors` など、自動トレースメトリクスの名前を変更したい場合に役立ちます。 | `'rspec.example'` |

### Sequel

Sequel インテグレーションは、データベースに対して行われたクエリをトレースします。

```ruby
require 'sequel'
require 'ddtrace'

# データベースに接続します
database = Sequel.sqlite

# テーブルを作成します
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.use :sequel, options
end

# クエリを実行します
articles = database[:articles]
articles.all
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `sequel` インスツルメンテーションのサービス名 | データベースアダプターの名前（例: `'mysql2'`） |

Ruby 2.0 以降のみがサポートされています。

**データベースを構成してさまざまな設定を使用する**

Sequel で複数のデータベースを使用する場合、それぞれの `Sequel::Database` オブジェクトを構成することで、それぞれに異なる設定を与えることができます。

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# 異なるサービス名で各データベースを構成します
Datadog.configure(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

Shoryuken インテグレーションは、ジョブの実行をトレースするサーバー側のミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :shoryuken, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `shoryuken` インスツルメンテーションに使用されるサービス名 | `'shoryuken'` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Sidekiq

Sidekiq インテグレーションは、クライアント側とサーバー側のミドルウェアで、それぞれジョブのキューイングと実行をトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sidekiq, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `client_service_name` | クライアント側の `sidekiq` インスツルメンテーションに使用されるサービス名 | `'sidekiq-client'` |
| `service_name` | サーバー側の `sidekiq` インスツルメンテーションに使用されるサービス名 | `'sidekiq'` |
| `tag_args` | ジョブ引数のタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Sinatra

Sinatra インテグレーションは、リクエストとテンプレートのレンダリングをトレースします。

トレースクライアントの使用を開始するには、`sinatra` または `sinatra/base` の後で、かつアプリケーション/ルートを定義する前に、 `ddtrace` と `use :sinatra` を必ずインポートします。

#### クラシックアプリケーション

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

get '/' do
  'Hello world!'
end
```

#### モジュラーアプリケーション

```ruby
require 'sinatra/base'
require 'ddtrace'

Datadog.configure do |c|
  c.use :sinatra, options
end

class NestedApp < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  register Datadog::Contrib::Sinatra::Tracer

  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

ネストされたアプリケーションをマウントする前に、ミドルウェアとして `Datadog::Contrib::Sinatra::Tracer` を確実に登録します。

#### インスツルメンテーションオプション

`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `nil` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `headers` | タグとして `sinatra.request` に追加する HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` と `response` キーを受け入れます（例: `['Last-Modified']`）。`http.request.headers.*` タグと `http.response.headers.*` タグをそれぞれ追加します。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | リソース名にスクリプト名を付加します | `false` |
| `service_name` | `sinatra` インスツルメンテーションに使用されるサービス名 | `'sinatra'` |

### Sneakers

Sneakers インテグレーションは、ジョブの実行をトレースするサーバー側のミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sneakers, options
end
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `enabled` | Sneakers をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `service_name` | `sneakers` インスツルメンテーションに使用されるサービス名 | `'sneakers'` |
| `tag_body` | ジョブメッセージのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Sucker Punch

`sucker_punch` インテグレーションは、すべてのスケジュールされたジョブをトレースします。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.use :sucker_punch, options
end

# このジョブの実行がトレースされます
LogJob.perform_async('login')
```

ここで、`options` はオプションの `Hash` であり、次のパラメーターを受け入れます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `analytics_enabled` | このインテグレーションによって生成されたスパンの分析を有効にします。オンの場合は `true`、グローバル設定に従う場合は `nil`、オフの場合は `false` です。 | `false` |
| `service_name` | `sucker_punch` インスツルメンテーションに使用されるサービス名 | `'sucker_punch'` |

## 高度なコンフィギュレーション

### トレーサー設定

Datadog トレーサーのデフォルトの動作を変更するには、次のように `Datadog.configure` ブロック内にカスタムオプションを指定できます。

```ruby
# config/initializers/datadog-tracer.rb

Datadog.configure do |c|
  c.tracer.enabled = true
  c.tracer.hostname = 'my-agent'
  c.tracer.port = 8126
  c.tracer.partial_flush.enabled = false
  c.tracer.sampler = Datadog::AllSampler.new

  # または、高度なユースケースでは、独自のトレーサーを指定できます。
  c.tracer.instance = Datadog::Tracer.new

  # デバッグモードを有効にするには
  c.diagnostics.debug = true
end
```

利用可能なオプションは次のとおりです。

 - `enabled`: `tracer` が有効かどうかを定義します。`false` に設定されている場合、インスツルメンテーションは引き続き実行されますが、スパンはトレース Agent に送信されません。`DD_TRACE_ENABLED` 環境変数を使用して構成できます。デフォルトは `true` です。
 - `hostname`: トレース Agent のホスト名を設定します。
 - `instance`: カスタム `Datadog::Tracer` インスタンスに設定します。指定した場合、他のトレース設定は無視されます（手動で構成する必要があります）。
 - `partial_flush.enabled`: トレースの部分的なフラッシュを有効にするには、`true` に設定します（長時間実行されるトレースの場合）。デフォルトでは無効になっています。*試験機能。*
 - `port`: トレース Agent がリッスンするポートを設定します。
 - `sampler`: カスタム `Datadog::Sampler` インスタンスに設定します。指定した場合、トレーサーはこのサンプラーを使用してサンプリング動作を決定します。
 - `diagnostics.startup_logs.enabled`: スタートアップコンフィギュレーションと診断ログ。デフォルトは `true` です。`DD_TRACE_STARTUP_LOGS` 環境変数を介して設定できます。
 - `diagnostics.debug`: デバッグログを有効にするには、true に設定します。`DD_TRACE_DEBUG` 環境変数を使用して構成できます。デフォルトは `false` です。
 - `time_now_provider`: テストの際、異なるタイムプロバイダを使用すると良い場合があります。たとえば Timecopの場合、`->{ Time.now_without_mock_time }` により、トレーサーはリアル時刻を使用できます。スパン期間の計算には、使用できる時には依然としてモノトニッククロックを使用するため、この設定による影響はありません。デフォルトは `->{ Time.now }`。

#### カスタムロギング

デフォルトでは、デフォルトの Ruby ロガーによってすべてのログが処理されます。Rails を使用している場合は、アプリケーションログファイルにメッセージが表示されます。

Datadog クライアントのログメッセージは、他のメッセージと区別できるように `[ddtrace]` とマークされます。

さらに、デフォルトロガーを上書きして、カスタムロガーに置き換えることができます。これには、`log` 設定を使用します。

```ruby
f = File.new("my-custom.log", "w+") # ログメッセージが書き込まれる場所
Datadog.configure do |c|
  c.logger = Logger.new(f) # デフォルトのロガーをオーバーライドします
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

### 環境とタグ

デフォルトでは、トレース Agent（このライブラリではなく、さまざまなクライアントからデータを収集するバックグラウンドで実行されるプログラム）は、Agent コンフィギュレーションファイルで設定されたタグを使用します。詳しくは、[環境チュートリアル](https://app.datadoghq.com/apm/docs/tutorials/environments)をご覧ください。

次の環境変数を使用して、トレースとメトリクスに自動的にタグを付けるようにアプリケーションを構成できます。

 - `DD_ENV`: アプリケーション環境（例: `production`、`staging` など）
 - `DD_SERVICE`: アプリケーションのデフォルトのサービス名（例: `billing-api`）
 - `DD_VERSION`: アプリケーションのバージョン（例: `2.5`、`202003181415`、`1.3-alpha` など）
 - `DD_TAGS`: `,` で区切られた値ペアのカスタムタグ（例: `layer:api,team:intake`）
    - `DD_ENV`、`DD_SERVICE`、または `DD_VERSION` が設定されている場合、`DD_TAGS` で定義されているそれぞれの `env`/`service`/`version` タグをオーバーライドします。
    - `DD_ENV`、`DD_SERVICE`、または `DD_VERSION` が設定されていない場合、`DD_TAGS` で定義されたタグを使用して、それぞれ `env`/`service`/`version` に入力します。

これらの値は、トレーサレベルでもオーバーライドできます。

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

これにより、この値をアプリケーションごとに設定できるため、たとえば、同じホスト上の異なる環境について複数のアプリケーションがレポートを作成できます。

タグは、個々のスパンに直接設定することもできます。これは、アプリケーションレベルで定義された競合するタグに優先します。

### 環境変数

その他の環境変数:

- `DD_TRACE_AGENT_URL`: トレースが送信される URL エンドポイントを設定します。設定されている場合、`DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` よりも優先されます。例: `DD_TRACE_AGENT_URL=http://localhost:8126`
- `DD_TRACE_<INTEGRATION>_ENABLED`: **アクティブ化された**インテグレーションを有効または無効にします。デフォルトは `true` です。例: `DD_TRACE_RAILS_ENABLED=false`。このオプションは、コードで明示的にアクティブ化されていないインテグレーション (例: `Datadog.configure{ |c| c.use :integration }`) には影響しません。この環境変数は、インテグレーションを無効にするためにのみ使用できます。
- `DD_TRACE_<INTEGRATION>_ANALYTICS_ENABLED`: 特定のインテグレーションに対して App Analytics を有効または無効にします。有効な値は、true または false (デフォルト) です。例: `DD_TRACE_ACTION_CABLE_ANALYTICS_ENABLED=true`
- `DD_TRACE_<INTEGRATION>_ANALYTICS_SAMPLE_RATE`: 特定のインテグレーションの App Analytics サンプリングレートを設定します。0.0〜1.0 (デフォルト) の浮動小数点数。例: `DD_TRACE_ACTION_CABLE_ANALYTICS_SAMPLE_RATE=0.5`
- `DD_LOGS_INJECTION`: `dd.trace_id` などのインジェクションの[トレース相関](#トレース相関)情報を Rails ログに自動的に有効化します。デフォルトのロガー (`ActiveSupport::TaggedLogging`) および `Lograge` をサポートします。トレース相関情報のフォーマットに関する詳細は、[トレース相関](#トレース相関)セクションを参照してください。有効な値は `true` または `false`(default) です（例: `DD_LOGS_INJECTION=true`）。

### サンプリング

`ddtrace` はトレースサンプリングを実行できます。トレース Agent はすでにトレースをサンプリングして帯域幅の使用量を減らしていますが、クライアントサンプリングはパフォーマンスのオーバーヘッドを減らします。

`Datadog::RateSampler` はトレースの比率をサンプリングします。例:

```ruby
# サンプリングレートは 0（何もサンプリングされない）から 1（すべてサンプリングされる）の間です。
sampler = Datadog::RateSampler.new(0.5) #トレースの 50% をサンプリングします

Datadog.configure do |c|
  c.tracer.sampler = sampler
end
```

#### 優先度サンプリング

優先度サンプリングは、分散型トレースに伝播される優先度属性を使用して、トレースを保持するかどうかを決定します。その値は、トレースがどれほど重要であるかを Agent とバックエンドに示します。

サンプラーは、優先度を次の値に設定できます。

 - `Datadog::Ext::Priority::AUTO_REJECT`: サンプラーは自動的にトレースを拒否することを決定しました。
 - `Datadog::Ext::Priority::AUTO_KEEP`: サンプラーは自動的にトレースを保持することを決定しました。

優先度サンプリングはデフォルトで有効になっています。これを有効にすると、サンプリングされた分散型トレースが完全になります。有効にすると、サービスとボリュームに応じて、サンプラーはトレースに優先度 0 または 1 を自動的に割り当てます。

この優先度を手動で設定して、重要でないトレースを削除するか、または重要なトレースを保持することもできます。そのためには、`context#sampling_priority` を次のように設定します。

 - `Datadog::Ext::Priority::USER_REJECT`: ユーザーはトレースを拒否するように求めました。
 - `Datadog::Ext::Priority::USER_KEEP`: ユーザーはトレースを保持するように求めました。

[分散型トレーシング](#distributed-tracing)を使用しない場合、トレースが不完全である場合に限って、優先度はいつでも変更できます。ただし、分散コンテキストで役立つように、コンテキスト伝播（フォーク、RPC 呼び出し）の前に実行する必要があります。コンテキストが伝播された後に優先度を変更すると、分散型トレースのさまざまな部分でさまざまな優先度が使用されます。一部が保持されたり、一部が拒否されたりする可能性があり、これによりトレースが部分的に保存され、不完全なままになる可能性があります。

優先度を変更する場合は、ルートスパンが作成された直後にできるだけ早く行うことをお勧めします。

```ruby
# まず、アクティブスパンを取得します
span = Datadog.tracer.active_span

# トレースを拒否することを示します
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# トレースを保持することを示します
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

### 分散型トレーシング

分散型トレーシングを使用すると、トレースを複数のインスツルメントされたアプリケーションに伝播できるため、サービスごとに個別のトレースではなく、単一のトレースとしてリクエストを提示できます。

アプリケーションの境界を越えてリクエストをトレースするには、各アプリケーション間で以下を伝播する必要があります。

| プロパティ              | タイプ    | 説明                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Trace ID**          | 整数 | トレースの ID。この値は、同じトレースに属するすべてのリクエストで同じである必要があります。                           |
| **Parent Span ID**    | 整数 | リクエストを発信したサービスのスパンの ID。この値は、トレース内のリクエストごとに常に異なります。 |
| **Sampling Priority** | 整数 | トレースのサンプリング優先度レベル。この値は、同じトレースに属するすべてのリクエストで同じである必要があります。     |

このような伝播は、次のように視覚化できます。

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000123
  |     Priority:  1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000456
  |     Priority:  1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**HTTP 経由**

インスツルメントされたアプリケーション間の HTTP リクエストの場合、このトレースメタデータは HTTP リクエストヘッダーを使用して伝播されます。

| プロパティ              | タイプ    | HTTP ヘッダー名              |
| --------------------- | ------- | ----------------------------- |
| **Trace ID**          | 整数 | `x-datadog-trace-id`          |
| **Parent Span ID**    | 整数 | `x-datadog-parent-id`         |
| **Sampling Priority** | 整数 | `x-datadog-sampling-priority` |

次のようになります。

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000123
  |     x-datadog-sampling-priority: 1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000456
  |     x-datadog-sampling-priority: 1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**インテグレーションのための分散型トレーシングのアクティブ化**

`ddtrace` に含まれる多くのインテグレーションは、分散型トレーシングをサポートしています。Agent v7 および Agent v6 のほぼすべてのバージョンでは分散型トレーシングがデフォルトで有効になっています。必要に応じて、コンフィギュレーション設定でアクティブにすることもできます。

- アプリケーションが分散型トレーシングがアクティブなサービスからリクエストを受信する場合は、このリクエストを処理するインテグレーション（Rails など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングがアクティブなサービスにリクエストを送信する場合は、このリクエストを送信するインテグレーション（Faraday など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングを実装するリクエストを送受信する場合は、このリクエストを処理するすべてのインテグレーションをアクティブにする必要があります。

インテグレーションのための分散型トレーシングをアクティブにする方法の詳細については、次のドキュメントを参照してください。

- [Excon](#excon)
- [Faraday](#faraday)
- [Rest Client](#restclient)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#http-rb)
- [httpclient](#httpclient)
- [httpx](#httpx)

**HTTP プロパゲーターの使用**

このメタデータの伝播プロセスを簡単にするために、`Datadog::HTTPPropagator` モジュールを使用できます。

クライアント上

```ruby
Datadog.tracer.trace('web.call') do |span|
  # ヘッダーにスパンコンテキストを挿入します（`env` はハッシュである必要があります）
  Datadog::HTTPPropagator.inject!(span.context, env)
end
```

サーバー上

```ruby
Datadog.tracer.trace('web.work') do |span|
  # ヘッダーからコンテキストを構築します（`env` はハッシュである必要があります）
  context = HTTPPropagator.extract(request.env)
  Datadog.tracer.provider.context = context if context.trace_id
end
```

### HTTP リクエストのキューイング

HTTP リクエストから発生するトレースは、リクエストが Ruby アプリケーションに到達する前にフロントエンドウェブサーバーまたはロードバランサーキューで費やされた時間を含むように構成できます。

この機能はデフォルトで無効になっています。有効にするには、ウェブサーバー（Nginx）から `X-Request-Start` または `X-Queue-Start` ヘッダーを追加する必要があります。以下は Nginx のコンフィギュレーション例です。

```
# /etc/nginx/conf.d/ruby_service.conf
server {
    listen 8080;

    location / {
      proxy_set_header X-Request-Start "t=${msec}";
      proxy_pass http://web:3000;
    }
}
```

次に、リクエストを処理するインテグレーションで `request_queuing: true` を設定して、リクエストキューイング機能を有効にする必要があります。Rack ベースのアプリケーションの詳細については、[ドキュメント](#rack)を参照してください。

### 処理パイプライン

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

### トレース相関

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。

#### Rails アプリケーションにロギングする場合

##### 自動

Rails アプリケーションの場合は、デフォルトのロガー (`ActiveSupport::TaggedLogging`) または `lograge` を使用し、`rails` インスツルメンテーションのコンフィギュレーションオプション `log_injection` を `true` に設定するか、環境変数を `DD_LOGS_INJECTION=true` に設定することでトレース相関インジェクションを自動的に有効化できます。

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

_注:_ `lograge` ユーザーで `initializers/lograge.rb` コンフィギュレーションファイルに `lograge.custom_options` を定義している場合は、Rails がイニシャライザーを読み込む順番 (アルファベット順) の関係で自動のトレース相関付けがうまく機能しない場合があります。これは、`initializers/datadog.rb` が `initializers/lograge.rb` イニシャライザーで上書きされてしまうためです。_既存の_ `lograge.custom_options` で自動のトレース相関付けを行う場合は、以下の[マニュアル (Lograge)](#manual-lograge) をご利用ください。

##### 手動 (Lograge)

[Rails アプリケーションで Lograge をセットアップ](https://docs.datadoghq.com/logs/log_collection/ruby/)した後、環境コンフィギュレーションファイル (例: `config/environments/production.rb`) の `custom_options` ブロックを手動で変更してトレース ID を追加します。

```ruby
config.lograge.custom_options = lambda do |event|
  # 現在のスレッドのトレース情報を取得
  correlation = Datadog.tracer.active_correlation

  {
    # ID をタグとしてログ出力に追加
    :dd => {
      # JSON シリアル化中に精度を維持するには、大きな数値に文字列を使用します
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

##### 手動 (ActiveSupport::TaggedLogging)

デフォルトの `ActiveSupport::TaggedLogging` ロガーで構成された Rails アプリケーションは相関 ID をタグとしてログ出力に付加することができます。`ActiveSupport::TaggedLogging` でトレース相関を有効にするには、Rails の環境コンフィギュレーションファイルで以下を追加します。

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# 以下を前提:
# DD_ENV = 'production' (アプリケーションが実行されている環境の名前。)
# DD_SERVICE = 'billing-api' (アプリケーションのデフォルトのサービス名。)
# DD_VERSION = '2.5.17' (アプリケーションのバージョン。)

# ウェブリクエストは以下を生成します。
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### Ruby アプリケーションにロギングする場合

ロガーに相関 ID を追加するには、`Datadog.tracer.active_correlation` がある相関 ID を取得するログフォーマッタを追加し、これをメッセージに追加します。

Datadog ロギングと適切に関連付けるには、ログメッセージに次のように表示されていることを確認してください。

 - `dd.env=<環境>`: ここで、`<環境>` は `Datadog.tracer.active_correlation.env` と同じです。環境が構成されていない場合は省略します。
 - `dd.service=<サービス>`: ここで、`<サービス>` は `Datadog.tracer.active_correlation.service` と同じです。デフォルトのサービス名が構成されていない場合は省略します。
 - `dd.version=<バージョン>`: ここで、`<バージョン>` は `Datadog.tracer.active_correlation.version` と同じです。アプリケーションのバージョンが構成されていない場合は省略します。
 - `dd.trace_id=<トレース ID>`: ここで `<トレース ID>` は `Datadog.tracer.active_correlation.trace_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。
 - `dd.span_id=<スパン ID>`: ここで `<スパン ID>` は `Datadog.tracer.active_correlation.span_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。

デフォルトでは、`Datadog::Correlation::Identifier#to_s` は `dd.env=<環境> dd.service=<サービス> dd.version=<バージョン> dd.trace_id=<トレース_ID> dd.span_id=<スパン_ID>` を返します。

トレースがアクティブでなく、アプリケーション環境とバージョンが構成されていない場合、`dd.trace_id=0 dd.span_id=0 dd.env= dd.version=` が返されます。

実例:

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# どのトレースもアクティブでない場合
logger.warn('これはトレースされないオペレーションです。')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] これはトレースされないオペレーションです。

# トレースがアクティブな場合
Datadog.tracer.trace('my.operation') { logger.warn('これはトレースされるオペレーションです。') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] これはトレースされるオペレーションです。
```

### トランスポート層の構成

デフォルトでは、トレーサーは `Net::HTTP` を使用して、Datadog トレース Agent プロセスのデフォルトの場所である `127.0.0.1:8126` にトレースデータを送信します。ただし、トレーサーは、そのトレースデータを別の宛先に送信するように、または別のプロトコルで送信するように構成できます。

ホスト名やポートなどの一部の基本設定は、[トレーサー設定](#tracer-settings)を使用して構成できます。

#### Net::HTTP アダプターの使用

`Net` アダプターは、TCP 経由で `Net::HTTP` を使用してトレースを送信します。これはデフォルトのトランスポートアダプターです。

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # ホスト名、ポート、追加オプション。:timeout は秒単位です。
    t.adapter :net_http, '127.0.0.1', 8126, { timeout: 1 }
  }
end
```

#### Unix ソケットアダプターの使用

`UnixSocket` アダプターは、Unix ソケットを介して `Net::HTTP` を使用してトレースを送信します。

使用するには、まず Unix ソケットでリッスンするようにトレース Agent を構成し、次にトレーサーを次のように構成します。

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # トレース Agent の Unix ソケットにファイルパスを指定します
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### トランスポートテストアダプターの使用

`Test` アダプターは、オプションでリクエストをバッファリングできるノーオペレーショントランスポートです。テストスイートまたは他の非運用環境で使用するためのものです。

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # トランスポートをノーオペレーションモードに設定します。トレースを保持しません。
    t.adapter :test

    # または、バッファを提供してトレース出力を調べることもできます。
    # バッファは '<<' に応答する必要があります。
    t.adapter :test, []
  }
end
```

#### カスタムトランスポートアダプターの使用

カスタムアダプターは次のように構成できます。

```ruby
Datadog.configure do |c|
  c.tracer.transport_options = proc { |t|
    # アダプターのインスタンスを初期化して渡します
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### メトリクス

トレーサーとそのインテグレーションを利用すれば、アプリケーションのパフォーマンスに関する有益な情報源となるメトリクスをさらに生成できます。これらのメトリクスは `dogstatsd-ruby` で収集され、トレースの送信先と同じ Datadog Agent に送信できます。

メトリクスの収集のためにアプリケーションを構成するには

1. [Datadog Agent を StatsD 用に構成します](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. `gem 'dogstatsd-ruby'` を Gemfile に追加します

#### アプリケーションランタイムの場合

ランタイムメトリクスが構成されている場合、トレースライブラリは、アプリケーションの健全性に関するメトリクスを自動的に収集して送信します。

ランタイムメトリクスを構成するには、次のコンフィギュレーションを追加します。

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
# ランタイムメトリクス収集を有効にするには、`true` を設定します。デフォルトは `false` です。
# DD_RUNTIME_METRICS_ENABLED=true に設定して構成することもできます。
c.runtime_metrics.enabled = true

# 必要に応じて、ランタイムメトリクスの送信に使用される Statsd インスタンスを構成できます。
# `dogstatsd-ruby` が利用可能な場合、Statsd は自動的にデフォルト設定になります。
# Datadog Agent のホストとポートを使用して構成できます。デフォルトは 'localhost:8125' です。
c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

`Datadog::Statsd` の構成の詳細については、[DogStatsD のドキュメント](https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames)をご覧ください。

統計は VM 固有で、以下のものが含まれます。

| 名前                        | タイプ    | 説明                                              |
| --------------------------  | ------- | -------------------------------------------------------- |
| `runtime.ruby.class_count`  | `gauge` | メモリスペース内のクラスの数。                       |
| `runtime.ruby.thread_count` | `gauge` | スレッドの数。                                       |
| `runtime.ruby.gc.*`.        | `gauge` | ガベージコレクションの統計: `GC.stat` から収集されます。 |

さらに、すべてのメトリクスには次のタグが含まれます。

| 名前         | 説明                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | トレースされたプログラミング言語。（例: `ruby`）              |
| `service`    | これがこのメトリクスに関連付けられているサービスのリスト。      |

### OpenTracing

OpenTracing を使用した Datadog の設定については、[OpenTracing のクイックスタート](#quickstart-for-opentracing)セクションを参照してください。

**Datadog トレーサー設定の構成**

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

[トレーサー設定](#tracer-settings)セクションで説明されている `Datadog.configure` を使用して構成することもできます。

**インテグレーションのアクティブ化と構成**

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみスパンとトレースを受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これをアクティブ化するには、[インテグレーションインスツルメンテーション](#integration-instrumentation)で詳細をご覧ください。

**サポートされているシリアル化形式**

| タイプ                           | サポート | 追加情報 |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | 〇        |                        |
| `OpenTracing::FORMAT_RACK`     | 〇        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | ✕         |                        |