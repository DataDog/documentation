---
aliases:
- /ja/tracing/ruby/
- /ja/tracing/languages/ruby/
- /ja/tracing/setup/ruby/
- /ja/tracing/setup_overview/ruby/
- /ja/agent/apm/ruby/
- /ja/tracing/setup_overview/setup/ruby
- /ja/tracing/trace_collection/ruby
code_lang: ruby
code_lang_weight: 15
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/GettingStarted.md
kind: documentation
title: Ruby アプリケーションのトレース
type: multi-code-lang
---
`ddtrace` は、Datadog の Ruby 用トレースクライアントです。ウェブサーバー、データベース、マイクロサービスを通過するリクエストを追跡するために使用されるため、開発者はボトルネックや面倒なリクエストを高度に把握できます。

## はじめに

**0.x バージョンからアップグレードされる方は、[アップグレードガイド](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10)をご確認ください。**

一般的な APM ドキュメントについては、[セットアップドキュメント][セットアップドキュメント]を参照してください。

アプリケーションが Datadog に情報を送信した後の APM の詳細については、[APM データで可視化する][可視化ドキュメント]をご覧ください。

ライブラリ API のドキュメントについては、[YARD ドキュメント][yard docs]をご覧ください。

寄稿するには、[寄稿ガイドライン][寄稿ドキュメント]と[開発ガイド][開発ドキュメント]をご覧ください。

[セットアップドキュメント]: https://docs.datadoghq.com/tracing/
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[可視化ドキュメント]: https://docs.datadoghq.com/tracing/visualization/
[寄稿ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[yard docs]: https://www.rubydoc.info/gems/ddtrace/

## 目次

 - [互換性](#compatibility)
 - [インストール](#installation)
     - [トレース用の Datadog Agent のセットアップ](#setup-the-datadog-agent-for-tracing)
     - [アプリケーションのインスツルメント](#instrument-your-application)
        - [Rails アプリケーション](#rails-applications)
        - [Ruby アプリケーション](#ruby-applications)
        - [OpenTracing の構成](#configuring-opentracing)
        - [OpenTelemetry の構成](#configuring-opentelemetry)
     - [アプリケーションと Datadog Agent を接続する](#connect-your-application-to-the-datadog-agent)
 - [手動インスツルメンテーション](#manual-instrumentation)
 - [インテグレーションインスツルメンテーション](#integration-instrumentation)
     - [Action Cable](#action-cable)
     - [Action Mailer](#action-mailer)
     - [Action Pack](#action-pack)
     - [Action View](#action-view)
     - [Active Job](#active-job)
     - [Active Model Serializers](#active-model-serializers)
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
     - [hanami](#hanami)
     - [http.rb](#httprb)
     - [httpclient](#httpclient)
     - [httpx](#httpx)
     - [Kafka](#kafka)
     - [MongoDB](#mongodb)
     - [MySQL2](#mysql2)
     - [Net/HTTP](#nethttp)
     - [Postgres](#postgres)
     - [Presto](#presto)
     - [Qless](#qless)
     - [Que](#que)
     - [Racecar](#racecar)
     - [Rack](#rack)
     - [Rails](#rails)
     - [Rake](#rake)
     - [Redis](#redis)
     - [Resque](#resque)
     - [Rest Client](#rest-client)
     - [RSpec](#rspec)
     - [Sequel](#sequel)
     - [Shoryuken](#shoryuken)
     - [Sidekiq](#sidekiq)
     - [Sinatra](#sinatra)
     - [Sneakers](#sneakers)
     - [Stripe](#stripe)
     - [Sucker Punch](#sucker-punch)
 - [追加構成](#additional-configuration)
     - [カスタムロギング](#custom-logging)
     - [環境とタグ](#environment-and-tags)
     - [デバッグと診断](#debugging-and-diagnostics)
     - [サンプリング](#sampling)
         - [アプリケーション側サンプリング](#application-side-sampling)
         - [優先度サンプリング](#priority-sampling)
         - [シングルスパンサンプリング](#single-span-sampling)
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
     - [プロファイリング](#profiling)
         - [トラブルシューティング](#troubleshooting)
         - [Resque ジョブのプロファイリング](#profiling-resque-jobs)
 - [既知の問題と推奨されるコンフィギュレーション](#known-issues-and-suggested-configurations)
    - [Payload too large](#payload-too-large)
    - [Stack level too deep](#stack-level-too-deep)

## 互換性

<!--
    注: このセクションの変更は、
https://github.com/datadog/documentation/blob/master/content/en/tracing/setup_overview/compatibility_requirements/ruby.md
にも反映させ、両者の同期を保つようにしてください。
-->

**サポートされている Ruby インタープリター**:

| タイプ  | Documentation              | バージョン | サポートの種類                         | Gem バージョンのサポート |
| ----- | -------------------------- | -----   | ------------------------------------ | ------------------- |
| MRI   | https://www.ruby-lang.org/ | 3.1     | フル                                 | 最新              |
|       |                            | 3.0     | フル                                 | 最新              |
|       |                            | 2.7     | フル                                 | 最新              |
|       |                            | 2.6     | フル                                 | 最新              |
|       |                            | 2.5     | フル                                 | 最新              |
|       |                            | 2.4     | フル                                 | 最新              |
|       |                            | 2.3     | フル                                 | 最新              |
|       |                            | 2.2     | フル                                 | 最新              |
|       |                            | 2.1     | フル (プロファイリングを除く)          | 最新              |
|       |                            | 2.0     | 2021 年 6 月 7 日以降 EOL             | < 0.50.0            |
|       |                            | 1.9.3   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
|       |                            | 1.9.1   | 2020 年 8 月 6 日以降 EOL           | < 0.27.0            |
| JRuby | https://www.jruby.org      | 9.3     | フル                                 | 最新              |
|       |                            | 9.2     | フル                                 | 最新              |

**サポートされるウェブサーバー**:

| タイプ      | Documentation                     | バージョン      | サポートの種類 |
| --------- | --------------------------------- | ------------ | ------------ |
| Puma      | http://puma.io/                   | 2.16+ / 3.6+ | フル         |
| Unicorn   | https://bogomips.org/unicorn/     | 4.8+ / 5.1+  | フル         |
| Passenger | https://www.phusionpassenger.com/ | 5.0+         | フル         |

**サポートされるトレースフレームワーク**:

| タイプ        | Documentation                                   | バージョン               | Gem バージョンのサポート |
| ----------- | ----------------------------------------------- | --------------------- | ------------------- |
| OpenTracing | https://github.com/opentracing/opentracing-ruby | 0.4.1+                | >= 0.16.0           |

*フル*サポートは、すべてのトレーサー機能が利用可能であることを示します。

*非推奨*は、将来のリリースでサポートが*メンテナンス*に移行することを示します。

*メンテナンス*は、重大なバグ修正のみが EOL までバックポートされることを示します。

*EOL* は、サポートが提供されなくなったことを示します。

### Apple macOS 対応

macOS での `ddtrace` の使用は、開発ではサポートされていますが、実稼働環境ではサポートされていません。

### Microsoft Windows サポート

Microsoft Windows での `ddtrace` の使用は現在サポートされていません。コミュニティの貢献や課題は引き続き受け付けますが、優先順位は低いと判断します。

## APM に Datadog Agent を構成する

Ruby アプリケーションにトレースを追加するには、いくつかの簡単なステップを踏むだけです。

1. トレース用の Datadog Agent のセットアップ
2. アプリケーションをインスツルメントする
3. アプリケーションと Datadog Agent を接続する

### トレース用の Datadog Agent のセットアップ

`ddtrace` をインストールする前に、[Datadog Agent をインストール](https://docs.datadoghq.com/agent/)します。この Agent は `ddtrace` がトレースデータを送信する先です。

次に、Datadog Agent がトレースを受け入れるように構成します。これを行うには、以下のいずれかを行います。

 - Agent の環境に `DD_APM_ENABLED=true` を設定する

または

 - [Agent のコンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に `apm_enabled: true` を追加する

*さらに、コンテナ化された環境では...*

 - Agent の環境に `DD_APM_NON_LOCAL_TRAFFIC=true` を設定する

または

 - [Agent のコンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に `apm_non_local_traffic: true` を追加する

[Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby)、[Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm)、[Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby)、または [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection) 用の特定のセットアップ手順で、コンテナ化環境でトレースを受信するよう Agent が構成されていることを確認します。

#### トレースデータ取り込みの構成

Datadog Agent は、デフォルトでポート `8126` の HTTP 経由でトレースをリッスンします。

Agent がトレースデータをリッスンするプロトコルやポートは、以下を使用して変更することができます。

**HTTP over TCP の場合**:

 - Agent の環境に `DD_APM_RECEIVER_PORT=<port>` を設定する

または

 - [Agent のコンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に `apm_config: receiver_port: <port>` を追加する

 **Unix ドメインソケット (UDS) の場合**:

 - `DD_APM_RECEIVER_SOCKET=<path-to-socket-file>` を設定する

または

 - [Agent のコンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に `apm_config: receiver_socket: <path-to-socket-file>` を追加する

### アプリケーションをインスツルメントする

#### Rails/Hanami アプリケーション

1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. `bundle install` で gem をインストールします

3. 以下を含む `config/initializers/datadog.rb` ファイルを作成します。

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

   このブロックを使うと、以下のことができます。

      - [コンフィギュレーション設定の追加](#additional-configuration)
      - [インスツルメンテーションの有効化または再構成](#integration-instrumentation)

#### Ruby アプリケーション

1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. `bundle install` で gem をインストールします
3. インスツルメントする必要のある[サポートされているライブラリまたはフレームワーク](#integration-instrumentation)が`必要`です。
4. アプリケーションに `require 'ddtrace/auto_instrument'` を追加します。_注:_ これは、サポートされているライブラリまたはフレームワークが必要になった_後_に実行する必要があります。

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

5. アプリケーションにコンフィギュレーションブロックを追加します。

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

   このブロックを使うと、以下のことができます。

      - [コンフィギュレーション設定の追加](#additional-configuration)
      - [インスツルメンテーションの有効化または再構成](#integration-instrumentation)

#### OpenTracing の構成

1. `ddtrace` gem を Gemfile に追加します。

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. `bundle install` で gem をインストールします
3. OpenTracing コンフィギュレーションファイルに、以下を追加します。

    ```ruby
    require 'opentracing'
    require 'datadog/tracing'
    require 'datadog/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

4. アプリケーションにコンフィギュレーションブロックを追加します。

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

   このブロックを使うと、以下のことができます。

      - [Datadog コンフィギュレーション設定の追加](#additional-configuration)
      - [Datadog インスツルメンテーションの有効化または再構成](#integration-instrumentation)

#### OpenTelemetry の構成

OTLP を使用すれば、OpenTelemetry のトレースを直接 Datadog Agent に (`ddtrace`なしで) 送信することができます。詳しくは、[Datadog Agent での OTLP の取り込み](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent)のドキュメントをご覧ください。

### アプリケーションと Datadog Agent を接続する

デフォルトでは、`ddtrace` はリストされた優先順位のうち、最初に利用可能な設定を使用して Agent に接続します。

1. 明示的に提供されたコンフィギュレーション設定経由 (hostname/port/transport)
2. `/var/run/datadog/apm.socket` にある Unix ドメインソケット (UDS) 経由
3. `127.0.0.1:8126` への HTTP over TCP 経由

Datadog Agent がこれらの場所のいずれかをリッスンしている場合、さらなる構成は必要ありません。

Agent がアプリケーションと異なるホストやコンテナで動作している場合、または異なるプロトコルでトレースを送信したい場合は、それに応じてアプリケーションを構成する必要があります。

  - [HTTP over TCPでトレースデータを Agent に送信する方法](#changing-default-agent-hostname-and-port)
  - [Unix ドメインソケット(UDS) を使って Agent にトレースデータを送信する方法](#using-the-unix-domain-socket-uds-adapter)

### インストールの最後の手順

セットアップ後、数分以内に [APM サービスページ](https://app.datadoghq.com/apm/services)にサービスが表示されます。[APM UI の使用][可視化ドキュメント]の詳細をご覧ください。

## 手動インスツルメンテーション

サポートされているフレームワークインスツルメンテーションを使用していない場合は、コードを手動でインスツルメントすることができます。

Ruby コードをトレースするには、`Datadog::Tracing.trace` メソッドを使用できます。

```ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # このブロックを、インスツルメントするコードでラップします
  # さらに、ここでスパンを変更できます。
  # 例: リソース名の変更、タグの設定など...
end
```

ここで、`name` は、実行されている一般的な種類の操作を説明する `String` です（例: `'web.request'` または `'request.parse'`）。

また、`options` は以下のオプションのキーワード引数です。

| キー | タイプ | 説明 | デフォルト |
| --------------- | ----------------------- | --- | --- |
| `autostart`     | `Bool`                  | 時間の計測を自動的に開始するかどうかを指定します。`false` の場合、ユーザーは `span.start` を呼び出す必要があります。 | `true` |
| `continue_from` | `Datadog::TraceDigest`  | 別の実行コンテキストから発生したトレースを継続します。TraceDigest には、継続ポイントが記述されています。 | `nil` |
| `on_error`      | `Proc`                  | スパンがエラーを発生させたときのエラー処理の動作をオーバーライドします。引数として `span` と `error` が指定されました。デフォルトでスパンにエラーを設定します。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`                | 操作対象のリソースまたはアクションの名前。同じリソース値を持つトレースは、メトリクスの目的でグループ化されます（ただし、個別に表示可能です）。通常、URL、クエリ、リクエストなどのドメイン固有です（例: `'Article#submit'`、`http://example.com/articles/list`） | スパンの `name`。 |
| `service`       | `String`                | このスパンが属するサービス名（例: `'my-web-service'`） | トレーサー `default-service`、`$PROGRAM_NAME` または `'ruby'` |
| `start_time`    | `Time`                  | スパンが実際に開始したとき。すでに発生したイベントをトレースするときに役立ちます。 | `Time.now` |
| `tags`          | `Hash`                  | スパンに追加する必要がある追加のタグ。 | `{}` |
| `type`          | `String`                | スパンのタイプ（`'http'`、`'db'` など） | `nil` |

少なくとも `service` と `resource` の両方を設定することを強くお勧めします。`nil` として `service` や `resource` がないスパンは、Datadog Agent によって破棄されます。

実際の手動インスツルメンテーションの例

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
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

### 非同期トレース

`Datadog::Tracing.trace` をコードブロックでラップすることが常に可能であるとは限りません。一部のイベントまたは通知ベースのインスツルメンテーションは、イベントの開始時または終了時にのみ通知する場合があります。

こうした操作をトレースするには、ブロックなしで `Datadog::Tracing.trace` を呼び出すことにより、コードを非同期でトレースできます。

```ruby
# 一部のインスツルメンテーションフレームワークは、イベントの終了後にこれを呼び出します...
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

ブロックなしで `Datadog::Tracing.trace` を呼び出すと、関数は開始されたが終了していない `Datadog::Tracing::SpanOperation` を返します。次に、このスパンを必要に応じて変更してから、`finish` で閉じます。

*未完了のスパンを残してはいけません。*トレースが完了したときにスパンが開いたままになっていると、トレースは破棄されます。[デバッグモードをアクティブにする](#tracer-settings)ことで、これが発生していると思われる場合に警告を確認できます。

開始/終了イベントを処理するときにこのシナリオを回避するには、`Datadog::Tracing.active_span` を使用して現在のアクティブなスパンを取得できます。

```ruby
# 例: ActiveSupport::Notifications は、イベントの開始時にこれを呼び出します
def start(name, id, payload)
  # スパンを開始します
  Datadog::Tracing.trace(name)
end

# 例: ActiveSupport::Notifications は、イベントの終了時にこれを呼び出します
def finish(name, id, payload)
  # 現在のアクティブなスパンを取得します（スレッドセーフ）
  current_span = Datadog::Tracing.active_span
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

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

また、`active_trace` メソッドを使用して、現在アクティブなトレースを取得することもできます。アクティブなトレースがない場合、このメソッドは `nil` を返します。

```ruby
# 例: アクティブトレースへのアクセス

current_trace = Datadog::Tracing.active_trace
```

## インテグレーションインスツルメンテーション

多くの一般的なライブラリとフレームワークがそのまま使用でき、自動インスツルメンテーションできます。これは自動的にはアクティブ化されませんが、`Datadog.configure` API を使用して簡単にアクティブ化および構成できます。

```ruby
Datadog.configure do |c|
  # インテグレーションをアクティブ化、構成します
  c.tracing.instrument :integration_name, **options
end
```

`options` は、インテグレーション固有の構成を表すキーワード引数です。

利用可能なインテグレーションとそのコンフィギュレーションオプションのリストについては、以下を参照してください。

<!--
    注: このセクションの変更は、
https://github.com/datadog/documentation/blob/master/content/en/tracing/setup_overview/compatibility_requirements/ruby.md
にも反映させ、両者の同期を保つようにしてください。
-->

| 名前                       | キー                        | 対応バージョン: MRI  | 対応バージョン: JRuby | 構成方法                    | Gem ソース                                                                     |
| -------------------------- | -------------------------- | ------------------------ | --------------------------| ----------------------------------- | ------------------------------------------------------------------------------ |
| Action Cable               | `action_cable`             | `>= 5.0`                 | `>= 5.0`                  | *[リンク](#action-cable)*             | *[リンク](https://github.com/rails/rails/tree/master/actioncable)*               |
| Action Mailer              | `action_mailer`            | `>= 5.0`                 | `>= 5.0`                  | *[リンク](#action-mailer)*            | *[リンク](https://github.com/rails/rails/tree/master/actionmailer)*              |
| Action Pack                | `action_pack`              | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#action-pack)*              | *[リンク](https://github.com/rails/rails/tree/master/actionpack)*                |
| Action View                | `action_view`              | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#action-view)*              | *[リンク](https://github.com/rails/rails/tree/master/actionview)*                |
| Active Job                 | `active_job`               | `>= 4.2`                 | `>= 4.2`                  | *[リンク](#active-job)*               | *[リンク](https://github.com/rails/rails/tree/master/activejob)*             |
| Active Model Serializers   | `active_model_serializers` | `>= 0.9`                 | `>= 0.9`                  | *[リンク](#active-model-serializers)* | *[リンク](https://github.com/rails-api/active_model_serializers)*                |
| Active Record              | `active_record`            | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#active-record)*            | *[リンク](https://github.com/rails/rails/tree/master/activerecord)*              |
| Active Support             | `active_support`           | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#active-support)*           | *[リンク](https://github.com/rails/rails/tree/master/activesupport)*             |
| AWS                        | `aws`                      | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#aws)*                      | *[リンク](https://github.com/aws/aws-sdk-ruby)*                                  |
| Concurrent Ruby            | `concurrent_ruby`          | `>= 0.9`                 | `>= 0.9`                  | *[リンク](#concurrent-ruby)*          | *[リンク](https://github.com/ruby-concurrency/concurrent-ruby)*                  |
| Dalli                      | `dalli`                    | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#dalli)*                    | *[リンク](https://github.com/petergoldstein/dalli)*                              |
| DelayedJob                 | `delayed_job`              | `>= 4.1`                 | `>= 4.1`                  | *[リンク](#delayedjob)*               | *[リンク](https://github.com/collectiveidea/delayed_job)*                        |
| Elasticsearch              | `elasticsearch`            | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#elasticsearch)*            | *[リンク](https://github.com/elastic/elasticsearch-ruby)*                        |
| Ethon                      | `ethon`                    | `>= 0.11`                | `>= 0.11`                 | *[リンク](#ethon)*                    | *[リンク](https://github.com/typhoeus/ethon)*                                    |
| Excon                      | `excon`                    | `>= 0.50`                | `>= 0.50`                 | *[リンク](#excon)*                    | *[リンク](https://github.com/excon/excon)*                                       |
| Faraday                    | `faraday`                  | `>= 0.14`                | `>= 0.14`                 | *[リンク](#faraday)*                  | *[リンク](https://github.com/lostisland/faraday)*                                |
| Grape                      | `grape`                    | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#grape)*                    | *[リンク](https://github.com/ruby-grape/grape)*                                  |
| GraphQL                    | `graphql`                  | `>= 1.7.9`               | `>= 1.7.9`                | *[リンク](#graphql)*                  | *[リンク](https://github.com/rmosolgo/graphql-ruby)*                             |
| gRPC                       | `grpc`                     | `>= 1.7`                 | *gem の利用不可*       | *[リンク](#grpc)*                     | *[リンク](https://github.com/grpc/grpc/tree/master/src/rubyc)*                   |
| hanami                     | `hanami`                   | `>= 1`、`< 2`            | `>= 1`、`< 2`             | *[リンク](#hanami)*                   | *[リンク](https://github.com/hanami/hanami)*                                     |
| http.rb                    | `httprb`                   | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#httprb)*                   | *[リンク](https://github.com/httprb/http)*                                       |
| httpclient                 | `httpclient`               | `>= 2.2`                 | `>= 2.2`                  | *[リンク](#httpclient)*               | *[リンク](https://github.com/nahi/httpclient)*                                     |
| httpx                      | `httpx`                    | `>= 0.11`                | `>= 0.11`                 | *[リンク](#httpx)*                    | *[リンク](https://gitlab.com/honeyryderchuck/httpx)*                             |
| Kafka                      | `ruby-kafka`               | `>= 0.7.10`              | `>= 0.7.10`               | *[リンク](#kafka)*                    | *[Link](https://github.com/zendesk/ruby-kafka)*                                |
| Makara (Active Record 経由) | `makara`                   | `>= 0.3.5`               | `>= 0.3.5`                | *[リンク](#active-record)*            | *[リンク](https://github.com/instacart/makara)*                                  |
| MongoDB                    | `mongo`                    | `>= 2.1`                 | `>= 2.1`                  | *[リンク](#mongodb)*                  | *[リンク](https://github.com/mongodb/mongo-ruby-driver)*                         |
| MySQL2                     | `mysql2`                   | `>= 0.3.21`              | *gem の利用不可*       | *[リンク](#mysql2)*                   | *[リンク](https://github.com/brianmario/mysql2)*                                 |
| Net/HTTP                   | `http`                     | *（サポートされているすべての Ruby）*   | *（サポートされているすべての Ruby）*    | *[リンク](#nethttp)*                  | *[リンク](https://ruby-doc.org/stdlib-2.4.0/libdoc/net/http/rdoc/Net/HTTP.html)* |
| Postgres                     | `pg`                   | `>= 0.18.4`              | *gem の利用不可*       | *[リンク](#postgres)*                   | *[リンク](https://github.com/ged/ruby-pg)*                  |
| Presto                     | `presto`                   | `>= 0.5.14`              | `>= 0.5.14`               | *[リンク](#presto)*                   | *[リンク](https://github.com/treasure-data/presto-client-ruby)*                  |
| Qless                      | `qless`                    | `>= 0.10.0`              | `>= 0.10.0`               | *[リンク](#qless)*                    | *[リンク](https://github.com/seomoz/qless)*                                      |
| Que                        | `que`                      | `>= 1.0.0.beta2`         | `>= 1.0.0.beta2`          | *[リンク](#que)*                      | *[リンク](https://github.com/que-rb/que)*                                        |
| Racecar                    | `racecar`                  | `>= 0.3.5`               | `>= 0.3.5`                | *[リンク](#racecar)*                  | *[リンク](https://github.com/zendesk/racecar)*                                   |
| Rack                       | `rack`                     | `>= 1.1`                 | `>= 1.1`                  | *[リンク](#rack)*                     | *[リンク](https://github.com/rack/rack)*                                         |
| Rails                      | `rails`                    | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#rails)*                    | *[リンク](https://github.com/rails/rails)*                                       |
| Rake                       | `rake`                     | `>= 12.0`                | `>= 12.0`                 | *[リンク](#rake)*                     | *[リンク](https://github.com/ruby/rake)*                                         |
| Redis                      | `redis`                    | `>= 3.2`                 | `>= 3.2`                 | *[リンク](#redis)*                    | *[リンク](https://github.com/redis/redis-rb)*                                    |
| Resque                     | `resque`                   | `>= 1.0`                 | `>= 1.0`                  | *[リンク](#resque)*                   | *[リンク](https://github.com/resque/resque)*                                     |
| Rest Client                | `rest-client`              | `>= 1.8`                 | `>= 1.8`                  | *[リンク](#rest-client)*              | *[リンク](https://github.com/rest-client/rest-client)*                           |
| Sequel                     | `sequel`                   | `>= 3.41`                | `>= 3.41`                 | *[リンク](#sequel)*                   | *[リンク](https://github.com/jeremyevans/sequel)*                                |
| Shoryuken                  | `shoryuken`                | `>= 3.2`                 | `>= 3.2`                  | *[リンク](#shoryuken)*                | *[リンク](https://github.com/phstc/shoryuken)*                                   |
| Sidekiq                    | `sidekiq`                  | `>= 3.5.4`               | `>= 3.5.4`                | *[リンク](#sidekiq)*                  | *[リンク](https://github.com/mperham/sidekiq)*                                   |
| Sinatra                    | `sinatra`                  | `>= 1.4`                 | `>= 1.4`                  | *[リンク](#sinatra)*                  | *[リンク](https://github.com/sinatra/sinatra)*                                   |
| Sneakers                   | `sneakers`                 | `>= 2.12.0`              | `>= 2.12.0`               | *[リンク](#sneakers)*                 | *[リンク](https://github.com/jondot/sneakers)*                                   |
| Stripe                     | `stripe`                   | `>= 5.15.0`              | `>= 5.15.0`               | *[リンク](#stripe)*                   | *[リンク](https://github.com/stripe/stripe-ruby)*                                |
| Sucker Punch               | `sucker_punch`             | `>= 2.0`                 | `>= 2.0`                  | *[リンク](#sucker-punch)*             | *[リンク](https://github.com/brandonhilkert/sucker_punch)*                       |

#### CI Visibility （CI/CDの可視化）

Datadog CI Visibility では、以下の `Datadog.configure` API を使用してライブラリインスツルメンテーションを有効化し、構成することができます。

```ruby
Datadog.configure do |c|
  # インテグレーションをアクティブ化、構成します
  c.ci.instrument :integration_name, **options
end
```

`options` は、インテグレーション固有の構成を表すキーワード引数です。

以下は、利用可能な CI Visibility のインテグレーションです。

| 名前      | キー        | 対応バージョン: MRI | 対応バージョン: JRuby | 構成方法    | Gem ソース                                          |
|-----------|------------|-------------------------|---------------------------|---------------------|-----------------------------------------------------|
| Cucumber  | `cucumber` | `>= 3.0`                | `>= 1.7.16`               | *[Link](#cucumber)* | *[Link](https://github.com/cucumber/cucumber-ruby)* |
| RSpec     | `rspec`    | `>= 3.0.0`              | `>= 3.0.0`                | *[リンク](#rspec)*    | *[リンク](https://github.com/rspec/rspec)*            |

### Action Cable

Action Cable インテグレーションは、ブロードキャストメッセージとチャンネルアクションをトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_cable
end
```

### Action Mailer

Action Mailer インテグレーションは、Rails 5 の ActionMailer アクションのトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `email_data` | `action_mailer.deliver` のスパンに、追加のメールペイロードメタデータを追加するかどうか。フィールドは `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']` を含みます。 | `false` |

### Action Pack

ほとんどの場合、Action Pack は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_pack
end
```

### Action View

ほとんどの場合、Action View は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `template_base_path` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存しない場合、この値を変更する必要があるかもしれません | `'views/'` |

### Active Job

ほとんどの場合、Active Job は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'active_job'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_job
end

ExampleJob.perform_later
```

### Active Model Serializers

Active Model Serializers インテグレーションは、バージョン 0.9 以降の `serialize` イベントとバージョン 0.10 以降の `render` イベントをトレースします。

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_model_serializers
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

### Active Record

ほとんどの場合、Active Record はウェブフレームワーク（Rails、Sinatra...）の一部としてセットアップされますが、単独でセットアップすることもできます。

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # トレースされました。
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| ---| --- | --- |
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
  c.tracing.instrument :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # 構成パターンをブロック。 
  c.tracing.instrument :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # 次の接続設定の接続文字列:
  # adapter、username、host、port、database
  # 他のフィールドは無視。  
  c.tracing.instrument :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # 次の接続設定のハッシュ
  # adapter、user、host、port、database
  # 他のフィールドは無視。
  c.tracing.instrument :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'

  # `makara` gem を使用している場合、接続 `role` で一致することも可能:
  c.tracing.instrument :active_record, describes: { makara_role: 'primary' }, service_name: 'primary-db'
  c.tracing.instrument :active_record, describes: { makara_role: 'replica' }, service_name: 'secondary-db'
end
```

データベース接続フィールドの部分的一致に基づき構成を作成することも可能です。

```ruby
Datadog.configure do |c|
  # ホスト `127.0.0.1` の任意の接続に一致。
  c.tracing.instrument :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # 任意の `mysql2` 接続に一致。
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # `reports` データベースへの任意の `mysql2` 接続に一致。
  #
  # `describe` 構成に複数の一致がある場合、最新のものを適用。
  # この場合、アダプター `mysql` とデータベース `reports` の両方の接続は
  # `service_name: 'mysql-db'` ではなく `service_name: 'reports-db'` と構成。 
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

複数の `describes` コンフィギュレーションが接続に一致するとき、一致する最新の構成ルールが適用されます。

ActiveRecord が `describes` で定義されたキーと一致する接続を使用するイベントをトレースする場合は、その接続に割り当てられているトレース設定を使用します。接続が記述されている接続のいずれとも一致しない場合は、代わりに `c.tracing.instrument :active_record` で定義されたデフォルト設定を使用します。

### Active Support

ほとんどの場合、Active Support は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| ---| --- | --- |
| `cache_service` | `active_support` インスツルメンテーションでのキャッシュに使用されるサービス名。 | `active_support-cache` |

### AWS

AWS インテグレーションは、AWS サービス（S3、ElastiCache など）とのすべてのやり取り（API 呼び出しなど）を追跡します。

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# トレースされた呼び出しを実行します
Aws::S3::Client.new.list_buckets
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `aws` インスツルメンテーションに使用されるサービス名 | `'aws'` |

### Concurrent Ruby

Concurrent Ruby インテグレーションは、`::Concurrent::Future` を使用する場合のコンテキスト伝播のサポートを追加します。
`Future#execute` 内でトレースされるコードに正しい親セットがあることを確認します。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
# Rails ニシャライザまたは同等の内部
Datadog.configure do |c|
  # ::Concurrent::Future をパッチしてコンテキストを伝播する ExecutorService を使用します
  c.tracing.instrument :concurrent_ruby
end

# Concurrent::Future 内で実行されるコードにコンテキストを渡します
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end
```

### Cucumber

Cucumber インテグレーションでは、`cucumber` フレームワークを使用している場合のすべてのシナリオとステップの実行をトレースすることができます。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
require 'cucumber'
require 'ddtrace'

# デフォルトの Cucumber インテグレーションを構成
Datadog.configure do |c|
  c.ci.instrument :cucumber, **options
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

`options` は以下のキーワード引数です。

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
  c.tracing.instrument :dalli, **options
end

# 単一クライアントの Dalli トレース動作を構成します
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `dalli` インスツルメンテーションに使用されるサービス名 | `'memcached'` |

### DelayedJob

DelayedJob インテグレーションは、ライフサイクルフックを使用してジョブの実行とエンキューを追跡します。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Elasticsearch

Elasticsearch インテグレーションは、`Client` オブジェクトの `perform_request` への呼び出しを追跡します。

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :elasticsearch, **options
end

# Elasticsearch にクエリを実行します
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'

# 特定のクライアントインスタンスに対してグローバル構成をオーバーライドしたい場合
Datadog.configure_onto(client.transport, **options)
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `quantize` | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show`（または量子化をスキップする場合は `:all`）、または完全に除外するキーの配列を含む `:exclude` を含めることができます。 | `{}` |
| `service_name` | `elasticsearch` インスツルメンテーションに使用されるサービス名 | `'elasticsearch'` |

### Ethon

`ethon` インテグレーションは、`Easy` または `Multi` オブジェクトを介してすべての HTTP リクエストをトレースします。なお、このインテグレーションは、`Ethon` に基づく `Typhoeus` ライブラリもサポートします。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :ethon, **options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
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
  c.tracing.instrument :excon, **options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end

connection = Excon.new('https://example.com')
connection.get
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
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
  middlewares: Datadog::Tracing::Contrib::Excon::Middleware.with(options).around_default_stack
)

# ミドルウェアをカスタムミドルウェアスタックに挿入します。
# 注: ResponseParser の後にトレースミドルウェアを挿入する必要があります。
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Tracing::Contrib::Excon::Middleware.with(options),
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
  c.tracing.instrument :faraday, **options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end

# 特定のクライアントインスタンスのグローバルコンフィギュレーションをオーバーライドする場合
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, **options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
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
  c.tracing.instrument :grape, **options
end

# 次に、アプリケーションを定義します
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Grape をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `エラー_ステータス`| エラーとしてマークする必要がある、ステータスコードもしくはステータスコードの範囲を定義します。`'404,405,500-599'` または `[404,405,'500-599']` | `nil` |

### GraphQL

GraphQL インテグレーションでは、GraphQL クエリのインスツルメンテーションがアクティブになります。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
# Rails ニシャライザまたは同等の内部
Datadog.configure do |c|
  c.tracing.instrument :graphql, schemas: [YourSchema], **options
end

# 次に、GraphQL クエリを実行します
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

`instrument :graphql` メソッドは以下のパラメーターを受け入れます。追加のオプションは、`options` の代わりに使用できます。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `schemas` | 必須。トレースする `GraphQL::Schema` オブジェクトの配列。このコンフィギュレーションに指定されるオプションを使用して、リストされているすべてのスキーマにトレースが追加されます。何も指定しない場合、トレースはアクティブ化されません。 | `[]` |
| `service_name` | graphql インスツルメンテーションに使用されるサービス名 | `'ruby-graphql'` |

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

ダブルトレースを回避するために、手動で構成する場合は `Datadog.configure` で `instrument :graphql` を*使用しない*でください。GraphQL トレースを構成するこれらの 2 つの方法は、相互に排他的であると見なされます。

### gRPC

`grpc` インテグレーションでは、サービスのリモートプロシージャ呼び出しを実行する前にミドルウェアとして実行されるクライアントとサーバーの両方のインターセプターが追加されます。gRPC アプリケーションはしばしば分散されるため、このインテグレーションはクライアントとサーバー間でトレース情報を共有します。

インテグレーションをセットアップするには、次のように `Datadog.configure` メソッドを使用します。

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :grpc, **options
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

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `grpc` インスツルメンテーションに使用されるサービス名 | `'grpc'` |
| `error_handler` | リクエストがエラーになったときに呼び出されるカスタムエラーハンドラです。`span` および `error` パラメータを許容する `Proc` となります。デフォルトでスパンにエラーを設定します。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

**クライアントを構成してさまざまな設定を使用する**

複数の異なるサービスを呼び出す複数のクライアントがある状況では、次のように Datadog インターセプターを直接渡すことができます。

```ruby
configured_interceptor = Datadog::Tracing::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

インテグレーションにより、`configured_interceptor` がそのクライアントインスタンスに固有のトレース設定を確立することが保証されます。

### hanami

`hanami` インテグレーションは、hanami アプリケーションのルーティング、アクション、レンダリングをインスツルメントします。`hanami` インストルメンテーションを有効にするには、

```
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

で自動インストルメンテーションを行い、`config/initializers` フォルダにイニシャライザーファイルを作成することを推奨します。

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `hanami` インスツルメンテーションのサービス名。 | `nil` |

### http.rb

http.rb インテグレーションは、Http.rb gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httprb, **options
  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `httprb` インスツルメンテーションのサービス名。 | `'httprb'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |
| `error_status_codes` | エラーとして追跡されるべき HTTP ステータスコードの範囲または配列。 | `400...600` |

### httpclient

httpclient インテグレーションは、httpclient gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httpclient, **options
  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `httpclient` インスツルメンテーションのサービス名。 | `'httpclient'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |
| `error_status_codes` | エラーとして追跡されるべき HTTP ステータスコードの範囲または配列。 | `400...600` |

### httpx

`httpx` は [`ddtrace` とのインテグレーション](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter)を維持:

```ruby
require "ddtrace"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.tracing.instrument :httpx

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # split_by_domain がデフォルトで true の場合にのみ必要
  end
end
```

### Kafka

Kafka インテグレーションは、`ruby-kafka` gem のトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'active_support/notifications' # 'ruby-kafka' インスツルメンテーションを有効にするために必要
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :kafka
end
```

### MongoDB

インテグレーションは、[MongoDB Ruby Driver](https://github.com/mongodb/mongo-ruby-driver) から MongoDB クラスターに送信されるすべての `Command` を追跡します。拡張により、Mongoid などの Object Document Mappers (ODM) は、公式の Ruby ドライバーを使用している場合、自動的にインスツルメントされます。インテグレーションのアクティブ化:

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mongo, **options
end

# MongoDB クライアントを作成し、通常どおり使用します
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# 特定のクライアントインスタンスのグローバル構成をオーバーライドする場合
Datadog.configure_onto(client, **options)
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `quantize` | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show`（または量子化をスキップする場合は `:all`）、または完全に除外するキーの配列を含む `:exclude` を含めることができます。 | `{ show: [:collection, :database, :operation] }` |
| `service_name` | `mongo` インスツルメンテーションに使用されるサービス名 | `'mongodb'` |

**接続ごとのトレース設定の構成**

`describes` オプションを使用して、接続ごとにトレース設定を構成できます。

```ruby
# 接続キーを持つ `:describes` オプションを提供します。
# 以下のいずれのキーも使用可能で、互いに同等です。
# ブロックが提供された場合、上記のコンフィギュレーションオプションの
# いずれかを受け入れる Settings オブジェクトを生成します。

Datadog.configure do |c|
  # ネットワーク接続文字列
  c.tracing.instrument :mongo, describes: '127.0.0.1:27017', service_name: 'mongo-primary'

  # ネットワーク接続の正規表現
  c.tracing.instrument :mongo, describes: /localhost.*/, service_name: 'mongo-secondary'
end

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# トレースされたコールは `mongo-primary` サービスに属します。

client = Mongo::Client.new([ 'localhost:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# トレースされたコールは `mongo-secondary` サービスに属します。
```

複数の `describes` コンフィギュレーションが接続に一致するとき、一致する最新の構成ルールが適用されます。

### MySQL2

MySQL2 インテグレーションは、`mysql2` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `mysql2` インスツルメンテーションに使用されるサービス名 | `'mysql2'` |
| `comment_propagation` | データベースモニタリングのための SQL コメント伝搬モード。 <br />(例: `disabled` \| `service`\| `full`). <br /><br />**重要**: *sql コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がアクセスすることが可能になりますのでご注意ください。* | `'disabled'` |

### Net/HTTP

Net/HTTP インテグレーションは、標準の lib Net::HTTP モジュールを使用して HTTP 呼び出しをトレースします。

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :http, **options

  # オプションで、正規表現に一致するホスト名に別のサービス名を指定します
  c.tracing.instrument :http, describes: /user-[^.]+\.example\.com/ do |http|
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

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `http` インスツルメンテーションに使用されるサービス名 | `'net/http'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |
| `error_status_codes` | エラーとして追跡されるべき HTTP ステータスコードの範囲または配列。 | `400...600` |

各接続オブジェクトを個別に構成する場合は、次のように `Datadog.configure_onto` を使用できます。

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```
### Postgres

PG インテグレーションは、以下を経由して `pg` gem を介して送信された SQL コマンドをトレースします。
* `exec` `exec_params`  `exec_prepared`、
* `async_exec` `async_exec_params` `async_exec_prepared`、または
* `sync_exec` `sync_exec_params` `sync_exec_prepared`

```ruby
require 'pg'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `pg` インスツルメンテーションに使用されるサービス名 | `'pg'` |
| `comment_propagation` | データベースモニタリングのための SQL コメント伝搬モード。 <br />(例: `disabled` \| `service`\| `full`). <br /><br />**重要**: *sql コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がアクセスすることが可能になりますのでご注意ください。* | `'disabled'` |

### Presto

Presto インテグレーションは、`presto-client` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :presto, **options
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

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `presto` インスツルメンテーションに使用されるサービス名 | `'presto'` |

### Qless

Qless インテグレーションは、ライフサイクルフックを使用してジョブの実行を追跡します。

Qless ジョブにトレースを追加するには

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :qless, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `tag_job_data` | ジョブ引数のタグ付けを有効にします。オンの場合は true、オフの場合は false です。 | `false` |
| `tag_job_tags` | ジョブタグのタグ付けを有効にします。オンの場合は true、オフの場合は false です。 | `false` |

### Que

Que インテグレーションは、ジョブの実行をトレースするミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Que をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `tag_args` | ジョブの引数フィールドのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `tag_data` | ジョブのデータフィールドのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Racecar

Racecar インテグレーションは、Racecar ジョブのトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `racecar` インスツルメンテーションに使用されるサービス名 | `'racecar'` |

### Rack

Rack インテグレーションは、すべてのリクエストが基底のフレームワークまたはアプリケーションに到達する前にそれらを追跡するミドルウェアを提供します。これは、Rack の最小インターフェイスに応答し、Rack レベルで取得できる妥当な値を提供します。

このインテグレーションは、Rails などのウェブフレームワークで自動的にアクティブ化されます。プレーンな Rack アプリケーションを使用している場合は、`config.ru` へのインテグレーションを有効にします。

```ruby
# config.ru の例
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rack, **options
end

use Datadog::Tracing::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `application` | Rack アプリケーション。`middleware_names` に対して必須です。 | `nil` |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `headers` | タグとして `rack.request` に追加する HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` と `response` キーを受け入れます（例: `['Last-Modified']`）。`http.request.headers.*` タグと `http.response.headers.*` タグをそれぞれ追加します。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | 最後に実行されたミドルウェアクラスを `rack` スパンのリソース名として使用する場合は、これを有効にします。`rails` インスツルメンテーションと一緒に有効にすると、`rails` が優先されます。該当する場合は `rack` リソース名をアクティブな `rails` コントローラーに設定します。使用するには `application` オプションが必要です。 | `false` |
| `quantize` | 量子化のオプションを含むハッシュ。`:query` または `:fragment` を含めることができます。 | `{}` |
| `quantize.base` | URL のベース (スキーム、ホスト、ポート) に関する振る舞いを定義します。`http.url` タグに URL ベースを保持し、`http.base_url` タグを設定しない場合は `:show` を、デフォルトで `http.url` タグから URL ベースを取り除き、パスを残して `http.base_url` を設定する場合は `nil` を指定できます。オプションは `quantize` オプションの中にネストする必要があります。 | `nil` |
| `quantize.query` | URL 量子化のクエリ部分のオプションを含むハッシュ。`:show` または `:exclude` を含めることができます。以下のオプションを参照してください。オプションは `quantize` オプション内にネストする必要があります。 | `{}` |
| `quantize.query.show` | 常に表示する値を定義します。文字列の配列、すべての値を表示するには `:all`、値を表示しない場合は `nil` を指定できます。オプションは `query` オプション内にネストする必要があります。 | `nil` |
| `quantize.query.exclude` | 完全に削除する値を定義します。文字列の配列、クエリ文字列を完全に削除するには `:all`、何も除外しない場合は `nil` を指定できます。オプションは `query` オプション内にネストする必要があります。 | `nil` |
| `quantize.query.obfuscate` | クエリ文字列をクエリする際の振る舞いを定義します。オプションのハッシュ、デフォルトの内部難読化設定を使用するには `:internal` を、難読化を無効にするには `nil` を指定することができます。難読化は文字列単位での操作で、キーバリュー単位での操作ではないことに注意してください。有効にすると、`query.show` はデフォルトで `:all` になります。オプションは `query` オプションの中にネストする必要があります。 | `nil` |
| `quantize.query.obfuscate.with` | 難読化されたマッチを置換するための文字列を定義します。文字列を指定することができます。オプションは `query.obfuscate` オプションの中にネストする必要があります。 | `'<redacted>'` |
| `quantize.query.obfuscate.regex` | クエリ文字列を冗長化するための正規表現を定義します。正規表現、またはデフォルトの内部正規表現を使用するには `:internal` を指定することができます。後者では、よく知られている機密データが冗長化されます。マッチした文字列は `query.obfuscate.with` に置き換えられて、完全に冗長化されます。オプションは `query.obfuscate` オプションの中にネストする必要があります。 | `:internal` |
| `quantize.fragment` | URL フラグメントの動作を定義します。URL フラグメントを表示するには `:show` を、フラグメントを削除するには `nil` を指定できます。オプションは `quantize` オプション内にネストする必要があります。 | `nil` |
| `request_queuing` | フロントエンドサーバーのキューで費やされた HTTP リクエスト時間を追跡します。設定の詳細については、[HTTP リクエストキュー](#http-request-queuing)をご覧ください。 有効にするには、`true` に設定します。 | `false` |
| `web_service_name` | フロントエンドサーバーリクエストのキュースパンのサービス名。（例: `'nginx'`） | `'web-server'` |

非推奨のお知らせ
- 将来のバージョンでは、`quantize.base` のデフォルトが `:exclude` から `:show` へと変更される予定です。自発的に `:show` に移行することを推奨します。
- 将来のバージョンでは、`quantize.query.show` のデフォルトが `:all` に変更され、`quantize.query.obfuscate` が `:internal` に変更される予定です。自発的にこれらの将来の値に移行することを推奨します。

**URL 量子化動作の構成**

```ruby
Datadog.configure do |c|
  # デフォルトの動作: すべての値が量子化され、base は削除され、fragment は削除されます。
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by
  # http://example.com:8080/path?categories[]=1&categories[]=2 --> /path?categories[]

  # URL のベース (スキーム、ホスト、ポート) を削除します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :exclude }

  # URL のベースを表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :show }

  # 'category_id' に正確に一致するクエリ文字列パラメーターの値を表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by
  c.tracing.instrument :rack, quantize: { query: { show: ['category_id'] } }

  # すべてのクエリ文字列パラメーターの値を表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { show: :all } }

  # 'sort_by' に正確にマッチするクエリ文字列パラメーターを完全に除外します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id
  c.tracing.instrument :rack, quantize: { query: { exclude: ['sort_by'] } }

  # クエリ文字列を完全に削除します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path
  c.tracing.instrument :rack, quantize: { query: { exclude: :all } }

  # URL のフラグメントを表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { fragment: :show }

  # クエリ文字列を難読化し、デフォルトですべての値を表示します
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: {} } }

  # 与えられた正規表現を用いてクエリ文字列を難読化し、デフォルトで全ての値を表示します
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { regex: /category_id=\d+/ } } }

  # カスタム編集文字列を使用してクエリ文字列を難読化します
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?REMOVED&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { with: 'REMOVED' } } }
end
```

### Rails

Rails インテグレーションは、リクエスト、データベース呼び出し、テンプレートのレンダリング、およびキャッシュの読み取り/書き込み/削除操作をトレースします。このインテグレーションでは、Active Support インスツルメンテーションを利用し、Notification API をリッスンして、API によってインスツルメントされた操作をトレースします。

Rails インスツルメンテーションを有効にするには、`config/initializers` フォルダーにイニシャライザファイルを作成します。

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `request_queuing` | フロントエンドサーバーのキューで費やされた HTTP リクエスト時間を追跡します。設定の詳細については、[HTTP リクエストキュー](#http-request-queuing)をご覧ください。 有効にするには、`true` に設定します。 | `false` |
| `exception_controller` | カスタム例外コントローラークラスを識別するクラスまたはモジュール。トレーサーは、カスタム例外コントローラーを識別できる場合のエラー動作を改善します。デフォルトでは、このオプションを使用しない場合、カスタム例外コントローラーがどのようなものかは「推測」されます。このオプションを指定すると、この識別が容易になります。 | `nil` |
| `middleware` | トレースミドルウェアを Rails アプリケーションに追加します。ミドルウェアをロードしたくない場合は、`false` に設定します。 | `true` |
| `middleware_names` | 短絡したミドルウェアリクエストがトレースのリソースとしてミドルウェア名を表示できるようにします。 | `false` |
| `service_name` | アプリケーションのリクエストをトレースするときに使用されるサービス名（`rack` レベル） | `'<アプリ名>'`（Rails アプリケーションのネームスペースから推測） |
| `template_base_path` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存しない場合、この値を変更する必要があるかもしれません | `'views/'` |

**サポートされるバージョン**

| MRI バージョン  | JRuby バージョン | Rails バージョン |
| ------------- | -------------- | -------------- |
|  2.1          |                |  3.2 - 4.2     |
|  2.2 - 2.3    |                |  3.2 - 5.2     |
|  2.4          |                |  4.2.8 - 5.2   |
|  2.5          |                |  4.2.8 - 6.1   |
|  2.6 - 2.7    |  9.2           |  5.0 - 6.1     |
|  3.0          |                |  6.1           |

### Rake

`rake` インテグレーションをアクティブにすることで、インスツルメンテーションが必要な Rake タスクのリストを提供すれば、Rake タスクに関するインスツルメンテーションを追加できます。

**長時間稼働する Rake タスクのインスツルメンテーションは避けてください。そのようなタスクは、タスクが終了するまで決してフラッシュされない、メモリ内の大きなトレースを集計する場合があります。**

長時間実行されるタスクには、繰り返し実行されるコードパスの周辺に[手動インスツルメンテーション](#manual-instrumentation)を使用します。

Rake タスクのトレースをアクティブにするには、以下を `Rakefile` に追加します。

```ruby
# Rakefile の上部:
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # ここで何かタスクを実行します...
end

Rake::Task['my_task'].invoke
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Rake タスクをトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `quantize` | タスク引数の量子化のオプションを含むハッシュ。詳細と例については、以下を参照してください。 | `{}` |
| `service_name` | `rake` インスツルメンテーションに使用されるサービス名 | `'rake'` |
| `tasks` | インスツルメントする Rake タスクの名前 | `[]` |

**タスク量子化動作の構成**

```ruby
Datadog.configure do |c|
  # :one、:two、:three... を受け入れるタスクがあるとします。
  # 'foo'、'bar'、'baz' で呼び出されます。

  # デフォルトの動作: すべての引数は量子化されます。
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: '?', three: '?' }
  c.tracing.instrument :rake

  # :two に完全に一致する引数の値を表示します
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: 'bar', three: '?' }
  c.tracing.instrument :rake, quantize: { args: { show: [:two] } }

  # すべての引数のすべての値を表示します。
  # `rake.invoke.args` タグ  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` タグ --> { one: 'foo', two: 'bar', three: 'baz' }
  c.tracing.instrument :rake, quantize: { args: { show: :all } }

  # :three に完全に一致する引数を完全に除外します
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> { one: '?', two: '?' }
  c.tracing.instrument :rake, quantize: { args: { exclude: [:three] } }

  # 引数を完全に削除します
  # `rake.invoke.args` タグ  --> ['?']
  # `rake.execute.args` タグ --> {}
  c.tracing.instrument :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

Redis インテグレーションは、単純な呼び出しとパイプラインをトレースします。

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Redis コマンドを実行します
redis = Redis.new
redis.set 'foo', 'bar'
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `redis` インスツルメンテーションに使用されるサービス名 | `'redis'` |
| `command_args` | コマンド引数 (例: `GET key` の `key`) をリソース名とタグとして表示します | true |

**インスタンスごとのトレース設定の構成**

Redis バージョン 5 以降:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # インテグレーションインスツルメンテーションの有効化が必要です
end

customer_cache = Redis.new(custom: { datadog: { service_name: 'custom-cache' } })
invoice_cache = Redis.new(custom: { datadog: { service_name: 'invoice-cache' } })

# トレースされたコールは `customer-cache` サービスに帰属します
customer_cache.get(...)
# トレースされたコールは `invoice-cache` サービスに帰属します
invoice_cache.get(...)
```

Redis バージョン 5 未満:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # インテグレーションインスツルメンテーションの有効化が必要です
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure_onto(customer_cache, service_name: 'customer-cache')
Datadog.configure_onto(invoice_cache, service_name: 'invoice-cache')

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
  c.tracing.instrument :redis, service_name: 'redis-default'

  # 指定された UNIX ソケットに一致するコンフィギュレーション。
  c.tracing.instrument :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # ネットワーク接続の場合、以下のフィールドのみが検索一致の対象:
  # scheme、host、port、db
  # 他のフィールドは無視されます。

  # 接続文字列
  c.tracing.instrument :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.tracing.instrument :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # ネットワーククライアントのハッシュ
  c.tracing.instrument :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # 接続ハッシュのサブセットのみ
  c.tracing.instrument :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.tracing.instrument :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

複数の `describes` コンフィギュレーションが接続に一致するとき、一致する最新の構成ルールが適用されます。

### Resque

Resque インテグレーションは、`perform` メソッドをラップする Resque フックを使用します。

Resque ジョブにトレースを追加するには

```ruby
require 'resque'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Rest Client

`rest-client` インテグレーションは、`ddtrace` ミドルウェアを介して利用できます。

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にします | `true` |
| `service_name` | `rest_client` インスツルメンテーションのサービス名。 | `'rest_client'` |
| `split_by_domain` | `true` に設定されている場合、リクエストドメインをサービス名として使用します。 | `false` |

### RSpec

RSpec インテグレーションでは、`rspec` テストフレームワーク使用時に、グループ単位や個別での例の実行すべてをトレースできます。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
require 'rspec'
require 'ddtrace'

# 既定の RSpec インテグレーションを構成する
Datadog.configure do |c|
  c.ci.instrument :rspec, **options
end
```

`options` は以下のキーワード引数です。

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
  c.tracing.instrument :sequel, **options
end

# クエリを実行します
articles = database[:articles]
articles.all
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `service_name` | `sequel` インスツルメンテーションのサービス名 | データベースアダプターの名前（例: `'mysql2'`） |

**データベースを構成してさまざまな設定を使用する**

Sequel で複数のデータベースを使用する場合、それぞれの `Sequel::Database` オブジェクトを構成することで、それぞれに異なる設定を与えることができます。

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# 異なるサービス名で各データベースを構成します
Datadog.configure_onto(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure_onto(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

Shoryuken インテグレーションは、ジョブの実行をトレースするサーバー側のミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `tag_body` | スパンに SQS メッセージの本文 `true` または `false` をタグ付け | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Sidekiq

Sidekiq インテグレーションは、クライアント側とサーバー側のミドルウェアで、それぞれジョブのキューイングと実行をトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `tag_args` | ジョブ引数のタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize` | ジョブ引数の量子化のためのオプションを含むハッシュ。 | `{}` |

### Sinatra

Sinatra インテグレーションは、リクエストとテンプレートのレンダリングをトレースします。

トレースクライアントの使用を開始するには、`sinatra` または `sinatra/base` の後で、かつアプリケーション/ルートを定義する前に、 `ddtrace` と `instrument :sinatra` を必ずインポートします。

#### クラシックアプリケーション

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
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
  c.tracing.instrument :sinatra, **options
end

class NestedApp < Sinatra::Base
  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

#### インスツルメンテーションオプション

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `distributed_tracing` | [分散型トレーシング](#distributed-tracing)を有効にして、トレースヘッダーを受信した場合にこのサービストレースが別のサービスのトレースに接続されるようにします | `true` |
| `headers` | タグとして `sinatra.request` に追加する HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` と `response` キーを受け入れます（例: `['Last-Modified']`）。`http.request.headers.*` タグと `http.response.headers.*` タグをそれぞれ追加します。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | リソース名にスクリプト名を付加します | `false` |

### Sneakers

Sneakers インテグレーションは、ジョブの実行をトレースするサーバー側のミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Sneakers をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |
| `tag_body` | ジョブメッセージのタグ付けを有効にします。オンの場合は `true`、オフの場合は `false` です。 | `false` |
| `error_handler` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトでスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { |スパン、エラー| span.set_error(error) unless span.nil? }` |

### Stripe

Stripe インテグレーションは、Stripe API リクエストをトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

`options` は以下のキーワード引数です。

| キー | 説明 | デフォルト |
| --- | ----------- | ------- |
| `enabled` | Stripe をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true` |

### Sucker Punch

`sucker_punch` インテグレーションは、すべてのスケジュールされたジョブをトレースします。

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch
end

# このジョブの実行がトレースされます
LogJob.perform_async('login')
```

## 追加のコンフィギュレーション

Datadog トレースのデフォルトの動作を変更するには、環境変数を設定するか、 `Datadog.configure` ブロックの中でカスタムオプションを指定します。例:

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = ENV['RACK_ENV']

  c.tracing.report_hostname = true
  c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
end
```

**利用可能な構成オプション:**

| 設定                                                 | 環境変数                        | デフォルト                                                           | 説明                                                                                                                                                                                                                               |
|---------------------------------------------------------|--------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Global**                                              |                                |                                                                   |                                                                                                                                                                                                                                           |
| `agent.host`                                            | `DD_AGENT_HOST`                | `127.0.0.1`                                                       | トレースデータの送信先となる Agent のホスト名。                                                                                                                                                                                       |
| `agent.port`                                            | `DD_TRACE_AGENT_PORT`          | `8126`                                                            | トレースデータの送信先となる Agent ホストのポートです。[Agent 構成](#configuring-trace-data-ingestion)で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに合わせなければなりません。         |
|                                                         | `DD_TRACE_AGENT_URL`           | `nil`                                                             | トレースが送信される URL のエンドポイントを設定します。`agent.host` と `agent.port` よりも優先されます。[Agent 構成](#configuring-trace-data-ingestion)で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに合わせなければなりません。                |
| `diagnostics.debug`                                     | `DD_TRACE_DEBUG`               | `false`                                                           | デバッグモードの有効/無効を設定します。詳細なログを出力します。**本番環境やその他機密性の高い環境では推奨しません。**詳細は、[デバッグと診断](#debugging-and-diagnostics)を参照してください。                                    |
| `diagnostics.startup_logs.enabled`                      | `DD_TRACE_STARTUP_LOGS`        | `nil`                                                             | 起動時の設定や診断結果をログに出力します。アプリケーションの起動時にトレースの状態を確認するためです。詳しくは、[デバッグと診断](#debugging-and-diagnostics)を参照してください。                                                 |
| `env`                                                   | `DD_ENV`                       | `nil`                                                             | アプリケーション環境。(例: `production`、`staging` など) この値はすべてのトレースにタグとして設定されます。                                                                                                                              |
| `service`                                               | `DD_SERVICE`                   | *Ruby filename*                                                   | アプリケーションのデフォルトのサービス名。(例: `billing-api`) この値は、すべてのトレースにタグとして設定されます。                                                                                                                                   |
| `tags`                                                  | `DD_TAGS`                      | `nil`                                                             | カスタムタグを `,` で区切った値のペアで指定します (例: `layer:api,team:intake`) これらのタグは全てのトレースに対して設定されます。詳しくは [環境とタグ](#environment-and-tags)を参照してください。                                                          |
| `time_now_provider`                                     |                                | `->{ Time.now }`                                                  | 時刻の取得方法を変更します。詳しくは、[タイムプロバイダーの設定](#Setting the time provider)を参照してください。                                                                                                                              |
| `version`                                               | `DD_VERSION`                   | `nil`                                                             | アプリケーションのバージョン (例: `2.5`、`202003181415`、`1.3-alpha` など) この値は、すべてのトレースにタグとして設定されます。                                                                                                                        |
| `telemetry.enabled`                                     | `DD_INSTRUMENTATION_TELEMETRY_ENABLED` | `false`                                                             | Datadog へのテレメトリーデータの送信を有効にすることができます。将来のリリースでは、[こちら](https://docs.datadoghq.com/tracing/configure_data_security/#telemetry-collection)のドキュメントにあるように、デフォルトで `true` に設定される予定です。                                                                                                                                                                                          |
| **Tracing**                                             |                                |                                                                   |                                                                                                                                                                                                                                           |
| `tracing.analytics.enabled`                             | `DD_TRACE_ANALYTICS_ENABLED`   | `nil`                                                             | トレース解析の有効/無効を設定します。詳しくは、[サンプリング](#sampling)を参照してください。                                                                                                                                                          |
| `tracing.distributed_tracing.propagation_extract_style` | `DD_TRACE_PROPAGATION_STYLE_EXTRACT` | `['Datadog','b3multi','b3']` | 抽出する分散型トレーシング伝播フォーマット。`DD_TRACE_PROPAGATION_STYLE` をオーバーライドします。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                             |
| `tracing.distributed_tracing.propagation_inject_style`  | `DD_TRACE_PROPAGATION_STYLE_INJECT`  | `['Datadog']`                                                     | 挿入する分散型トレーシング伝播フォーマット。`DD_TRACE_PROPAGATION_STYLE` をオーバーライドします。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                              |
| `tracing.distributed_tracing.propagation_style`         | `DD_TRACE_PROPAGATION_STYLE` | `nil` | 抽出および挿入する分散型トレーシング伝播フォーマット。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。 |
| `tracing.enabled`                                       | `DD_TRACE_ENABLED`             | `true`                                                            | トレースの有効/無効を設定します。`false` に設定すると、インスツルメンテーションは実行されますが、トレース Agent にトレースが送信されません。                                                                                                                 |
| `tracing.instrument(<integration-name>, <options...>)`  |                                |                                                                   | 特定のライブラリのインスツルメンテーションを有効にします。詳細は、[インテグレーションのインスツルメンテーション](#integration-instrumentation)を参照してください。                                                                                                       |
| `tracing.log_injection`                                 | `DD_LOGS_INJECTION`            | `true`                                                            | [トレース相関](#trace-correlation)の情報があれば、Rails のログに挿入します。デフォルトのロガー (`ActiveSupport::TaggedLogging`)、`lograge`、`semantic_logger` をサポートします。                                                   |
| `tracing.partial_flush.enabled`                         |                                | `false`                                                           | 部分フラッシュを有効または無効にします。部分フラッシュは、トレースの完了した部分を Agent に送信します。多くのスパンを持つ長時間実行タスク (ジョブなど) をトレースするときに使用します。                                                  |
| `tracing.partial_flush.min_spans_threshold`             |                                | `500`                                                             | 部分フラッシュがそれらの完了したスパンを送信する前に、トレースで完了しなければならないスパンの数。                                                                                                                              |
| `tracing.sampler`                                       |                                | `nil`                                                             | 高度な使用方法のみ。カスタムの `Datadog::Tracing::Sampling::Sampler` インスタンスを設定します。指定された場合、トレーサーはこのサンプラーを使用してサンプリングの動作を決定します。詳しくは [アプリケーション側サンプリング](#application-side-sampling) を参照してください。 |
| `tracing.sampling.default_rate`                         | `DD_TRACE_SAMPLE_RATE`         | `nil`                                                             | トレースのサンプリングレートを `0.0` (0%) と `1.0` (100%) の間で設定します。詳しくは [アプリケーション側サンプリング](#application-side-sampling)を参照してください。                                                                                                  |
| `tracing.sampling.rate_limit`                           | `DD_TRACE_RATE_LIMIT`          | `100` (毎秒)                                                | サンプリングするトレースの最大数/秒を設定します。トラフィック急増時の取り込み量オーバーを回避するためのレート制限を設定します。                                                                    |
| `tracing.sampling.span_rules`                           | `DD_SPAN_SAMPLING_RULES`、`ENV_SPAN_SAMPLING_RULES_FILE` | `nil`                                    | [シングルスパンサンプリング](#single-span-sampling)ルールを設定します。これらのルールにより、それぞれのトレースがドロップされた場合でもスパンを保持することができます。                                                                                              |
| `tracing.report_hostname`                               | `DD_TRACE_REPORT_HOSTNAME`     | `false`                                                           | トレースにホスト名タグを追加します。                                                                                                                                                                                                              |
| `tracing.test_mode.enabled`                             | `DD_TRACE_TEST_MODE_ENABLED`   | `false`                                                           | テストスイートでトレースを使用するための、テストモードを有効または無効にします。                                                                                                                                                                         |
| `tracing.test_mode.trace_flush`                         |                                | `nil`                                                             | トレースフラッシュの動作を決定するオブジェクト。                                                                                                                                                                                           |

#### カスタムロギング

デフォルトでは、デフォルトの Ruby ロガーによってすべてのログが処理されます。Rails を使用している場合は、アプリケーションログファイルにメッセージが表示されます。

Datadog クライアントのログメッセージは、他のメッセージと区別できるように `[ddtrace]` とマークされます。

さらに、デフォルトロガーを上書きして、カスタムロガーに置き換えることができます。これには、`log` 設定を使用します。

```ruby
f = File.new("my-custom.log", "w+") # ログメッセージが書き込まれる場所
Datadog.configure do |c|
  c.logger.instance = Logger.new(f) # デフォルトのロガーをオーバーライドします
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

#### 環境とタグ

デフォルトでは、トレース Agent (このライブラリではなく、様々なクライアントからデータを収集するバックグラウンドで実行されるプログラム) は、Agent コンフィギュレーションファイルで設定されたタグを使用します。以下の環境変数を使用して、トレースとメトリクスに自動的にタグを付けるようにアプリケーションを構成することができます。

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

#### デバッグと診断

トレース用診断の制作手段には、2 種類の案があります。

##### デバッグモードを有効にする

ライブラリをデバッグモードに切り替えると、抑制されたエラーも含め、トレースアクティビティに関する詳細なログが出力されます。この出力は、エラーを特定したり、Agent へのトレース出力を確認するのに役立ちます。

この機能は `diagnostics.debug = true` または `DD_TRACE_DEBUG` によって有効にすることができます。

```ruby
Datadog.configure { |c| c.diagnostics.debug = true }
```

この機能は、負荷がかかると非常に冗長になるため、**本番環境またはその他の重要な環境での使用はお勧めしません**。この機能は、アプリケーションの負荷を制御できる環境で使用するのが最善です。

##### 起動ログを有効にする

起動ログは、アプリケーションが初期構成されたときのトレース状態のレポートを作成します。これは、構成とインスツルメンテーションが正しく起動されていることを確認するのに役立ちます。

この機能は `diagnostics.startup_logs.enabled = true` または `DD_TRACE_STARTUP_LOGS` によって有効にすることができます。

```ruby
Datadog.configure { |c| c.diagnostics.startup_logs.enabled = true }
```

デフォルトでは、アプリケーションが非開発環境で動作していることを `ddtrace` が検出すると、この機能が有効になります。

### サンプリング

利用可能なすべてのサンプリングオプションの一覧は、[取り込みメカニズム](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby)を参照してください。

#### 優先度サンプリング

優先度サンプリングは、分散型トレースに伝播される優先度属性を使用して、トレースを保持するかどうかを決定します。その値は、トレースがどれほど重要であるかを Agent とバックエンドに示します。

サンプラーは、優先度を次の値に設定できます。

 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_REJECT`: サンプラーは自動的にトレースを拒否することを決定しました。
 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_KEEP`: サンプラーは自動的にトレースを保持することを決定しました。

優先度サンプリングはデフォルトで有効になっています。これを有効にすると、サンプリングされた分散型トレースが完全になります。有効にすると、サービスとボリュームに応じて、サンプラーはトレースに優先度 0 または 1 を自動的に割り当てます。

この優先度を手動で設定して、重要でないトレースを削除するか、または重要なトレースを保持することもできます。そのためには、`TraceOperation#sampling_priority` を次のように設定します。

 - `Datadog::Tracing::Sampling::Ext::Priority::USER_REJECT`: ユーザーはトレースを拒否するように求めました。
 - `Datadog::Tracing::Sampling::Ext::Priority::USER_KEEP`: ユーザーはトレースを保持するように求めました。

[分散型トレーシング](#distributed-tracing)を使用しない場合、トレースが不完全である場合に限って、優先度はいつでも変更できます。ただし、分散コンテキストで役立つように、コンテキスト伝播（フォーク、RPC 呼び出し）の前に実行する必要があります。コンテキストが伝播された後に優先度を変更すると、分散型トレースのさまざまな部分でさまざまな優先度が使用されます。一部が保持されたり、一部が拒否されたりする可能性があり、これによりトレースが部分的に保存され、不完全なままになる可能性があります。

このため、優先度を変更する場合は、できるだけ早い時期に行うことをお勧めします。

サンプリング優先度を変更するには

```ruby
# アクティブトレースを拒否します
Datadog::Tracing.reject!

# アクティブトレースを保持します
Datadog::Tracing.keep!
```

`Datadog::Tracing.reject!` と `Datadog::Tracing.keep!` は、トレースが有効でない時に使うと安全です。

また、特定のトレースインスタンスを拒否することも可能です。

```ruby
# まず、アクティブスパンを取得します
trace = Datadog::Tracing.active_trace

# トレースを拒否します
trace.reject!

# トレースを保持します
trace.keep!
```

#### シングルスパンサンプリング

トレースレベルのサンプリングルールによってそれぞれのトレースが削除されてもスパンを保持することができるサンプリングルールを構成することができます。

[//]: # (TODO: See <Single Span Sampling documentation URL here> for the full documentation on Single Span Sampling.)

#### アプリケーション側サンプリング

Datadog Agent はトレースをサンプリングして帯域幅の使用量を減らしていますが、アプリケーション側サンプリングはホストアプリケーションのパフォーマンスのオーバーヘッドを減らします。

**アプリケーション側のサンプリングは、できるだけ早い段階でトレースをドロップします。これにより、[Ingestion Controls](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/) ページは、正確なサンプリング レートを報告するのに十分な情報を受け取れなくなります。トレースのオーバーヘッドを減らすことが最重要である場合にのみ使用してください。**

この機能をご利用の方は、[GitHub で問題を開く](https://github.com/DataDog/dd-trace-rb/issues/new)ことでお知らせいただければ、お客様の使用例をよりよく理解し、サポートすることができます。

以下の設定で*アプリケーション側サンプリング*を構成することができます。

```ruby
# アプリケーション側サンプリングが有効です。Ingestion Controls ページが不正確になります。
sampler = Datadog::Tracing::Sampling::RateSampler.new(0.5) # トレースの 50% をサンプリングします

Datadog.configure do |c|
  c.tracing.sampler = sampler
end
```

これらの設定の詳細については、[追加構成](#additional-configuration)を参照してください。

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

#### 分散型ヘッダーフォーマット

トレースは以下の分散型トレースフォーマットをサポートします。

 - `Datadog`: **デフォルト**
 - `b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers)
 - `b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header)
 - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/)
 - `none`: ノーオペレーション。

これらのフォーマットの使用は `Datadog.configure` で有効/無効を切り替えることができます。

```ruby
Datadog.configure do |c|
  # 抽出すべきヘッダーフォーマットのリスト
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # 挿入すべきヘッダーフォーマットのリスト
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

**インテグレーションのための分散型トレーシングのアクティブ化**

`ddtrace` に含まれる多くのインテグレーションは、分散型トレーシングをサポートしています。Agent v7 および Agent v6 のほぼすべてのバージョンでは分散型トレーシングがデフォルトで有効になっています。必要に応じて、コンフィギュレーション設定でアクティブにすることもできます。

- アプリケーションが分散型トレーシングがアクティブなサービスからリクエストを受信する場合は、このリクエストを処理するインテグレーション（Rails など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングがアクティブなサービスにリクエストを送信する場合は、このリクエストを送信するインテグレーション（Faraday など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングを実装するリクエストを送受信する場合は、このリクエストを処理するすべてのインテグレーションをアクティブにする必要があります。

インテグレーションのための分散型トレーシングをアクティブにする方法の詳細については、次のドキュメントを参照してください。

- [Excon](#excon)
- [Faraday](#faraday)
- [Rest Client](#rest-client)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#httprb)
- [httpclient](#httpclient)
- [httpx](#httpx)

**HTTP プロパゲーターの使用**

このメタデータの伝播プロセスを簡単にするために、`Datadog::Tracing::Propagation::HTTP` モジュールを使用できます。

クライアント上

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # リクエストヘッダーにトレースヘッダーを挿入します (`env` は Hash でなければなりません)
  Datadog::Tracing::Propagation::HTTP.inject!(trace.to_digest, env)
end
```

サーバー上

```ruby
trace_digest = Datadog::Tracing::Propagation::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # Web 作業をします...
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

### トレース相関

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。

#### Rails アプリケーションにロギングする場合

##### 自動

デフォルトのロガー (`ActiveSupport::TaggedLogging`)、`lograge` または `semantic_logger` を使用している Rails アプリケーションでは、トレース相関挿入はデフォルトで有効になっています。

環境変数 `DD_LOGS_INJECTION=false` を設定することで無効化することができます。

#### Ruby アプリケーションにロギングする場合

ロガーに相関 ID を追加するには、`Datadog::Tracing.correlation` がある相関 ID を取得するログフォーマッタを追加し、これをメッセージに追加します。

Datadog ロギングと適切に関連付けるには、ログメッセージに次のように表示されていることを確認してください。

 - `dd.env=<ENV>`: ここで、`<ENV>` は `Datadog::Tracing.correlation.env` と同じです。環境が構成されていない場合は省略します。
 - `dd.service=<SERVICE>`: ここで、`<SERVICE>` は `Datadog::Tracing.correlation.service` と同じです。デフォルトのサービス名が構成されていない場合は省略します。
 - `dd.version=<VERSION>`: ここで、`<VERSION>` は `Datadog::Tracing.correlation.version` と同じです。アプリケーションのバージョンが構成されていない場合は省略します。
 - `dd.trace_id=<TRACE_ID>`: ここで `<TRACE_ID>` は `Datadog::Tracing.correlation.trace_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。
 - `dd.span_id=<SPAN_ID>`: ここで `<SPAN_ID>` は `Datadog::Tracing.correlation.span_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。

`Datadog::Tracing.log_correlation` は `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>` を返します。

トレースがアクティブでなく、アプリケーション環境とバージョンが構成されていない場合、`dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0` が返されます。

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
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# どのトレースもアクティブでない場合
logger.warn('これはトレースされないオペレーションです。')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] これはトレースされないオペレーションです。

# トレースがアクティブな場合
Datadog::Tracing.trace('my.operation') { logger.warn('これはトレースされるオペレーションです。') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] これはトレースされるオペレーションです。
```

### トランスポート層の構成

デフォルトでは、`ddtrace` はリストされた優先順位のうち、最初に利用可能な設定を使用して Agent に接続します。

1. 明示的に提供されたコンフィギュレーション設定経由 (hostname/port/transport)
2. `/var/run/datadog/apm.socket` にある Unix ドメインソケット (UDS) 経由
3. `127.0.0.1:8126` への HTTP over TCP 経由

しかし、トレーサーは、そのトレースデータを別の宛先や別のプロトコルで送信するように構成することができます。

#### デフォルトの Agent のホスト名とポートの変更

Agent ホストやポートを変更するには、 `DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` を指定します。

または、`Datadog.configure` ブロック内で、以下の設定を行います。

```ruby
Datadog.configure do |c|
  c.agent.host = '127.0.0.1'
  c.agent.port = 8126
end
```

詳しくは、[追加構成](#additional-configuration)を参照してください。

#### Net::HTTP アダプターの使用

`Net` アダプターは、TCP 経由で `Net::HTTP` を使用してトレースを送信します。これはデフォルトのトランスポートアダプターです。

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # ホスト名、ポート、追加オプション。:timeout は秒単位です。
    t.adapter :net_http, '127.0.0.1', 8126, timeout: 30
  }
end
```

#### Unix ドメインソケット (UDS) アダプターの使用

`UnixSocket` アダプターは、Unix ソケットを介して `Net::HTTP` を使用してトレースを送信します。

使用するには、まず Unix ソケットでリッスンするようにトレース Agent を構成し、次にトレーサーを次のように構成します。

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # トレース Agent の Unix ソケットにローカルパスを指定します
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### トランスポートテストアダプターの使用

`Test` アダプターは、オプションでリクエストをバッファリングできるノーオペレーショントランスポートです。テストスイートまたは他の非運用環境で使用するためのものです。

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
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
  c.tracing.transport_options = proc { |t|
    # アダプターのインスタンスを初期化して渡します
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### タイムプロバイダーの設定

デフォルトでは、トレースはスパンの長さを計測するためにモノトニッククロック、開始時間と終了時間にはタイムスタンプ (`->{ Time.now }`) を使用します。

テスト時には、別のタイムプロバイダーを使用すると便利な場合があります。

タイムスタンプを提供する関数を変更する場合は、以下のように構成します。

```ruby
Datadog.configure do |c|
  # Timecop では、例えば `->{ Time.now_without_mock_time }` で、トレーサーが実際のウォールタイムを使うようにします。
  c.time_now_provider = -> { Time.now_without_mock_time }
end
```

スパンの長さの計算には、システムのモノトニッククロックが使用可能な場合、この設定の影響を受けません。

### メトリクス

トレーサーとそのインテグレーションを利用すれば、アプリケーションのパフォーマンスに関する有益な情報源となるメトリクスをさらに生成できます。これらのメトリクスは `dogstatsd-ruby` で収集され、トレースの送信先と同じ Datadog Agent に送信できます。

メトリクスの収集のためにアプリケーションを構成するには

1. [StatsD 用 Datadog Agent を構成](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. `gem 'dogstatsd-ruby', '~> 5.3'` を Gemfile に追加します

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

| 名前                        | タイプ    | 説明                                              | 次で利用可能 |
| --------------------------  | ------- | -------------------------------------------------------- | ------------ |
| `runtime.ruby.class_count`  | `gauge` | メモリスペース内のクラスの数。                       | CRuby        |
| `runtime.ruby.gc.*`         | `gauge` | ガベージコレクションの統計: `GC.stat` から収集されます。 | すべてのランタイム |
| `runtime.ruby.thread_count` | `gauge` | スレッドの数。                                       | すべてのランタイム |
| `runtime.ruby.global_constant_state` | `gauge` | グローバル定数キャッシュの生成。               | CRuby        |
| `runtime.ruby.global_method_state`   | `gauge` | [グローバルメソッドキャッシュの生成。](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby < 3.0.0](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |

さらに、すべてのメトリクスには次のタグが含まれます。

| 名前         | 説明                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | トレースされたプログラミング言語。（例: `ruby`）              |
| `service`    | これがこのメトリクスに関連付けられているサービスのリスト。      |

### OpenTracing

OpenTracing を使用した Datadog の設定については、[OpenTracing の構成](#configuring-opentracing)セクションを参照してください。

**Datadog トレーサー設定の構成**

基底の Datadog トレーサーは、グローバルトレーサーを構成するときにオプション（ `Datadog::Tracer` と一致）を渡すことで構成できます。

```ruby
# `options` は Datadog::Tracer に提供されるオプションのハッシュです
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(**options)
```

また、[追加構成](#additional-configuration)セクションで説明されている `Datadog.configure` を使用して構成することもできます。

**インテグレーションのアクティブ化と構成**

デフォルトでは、Datadog で OpenTracing を構成しても、Datadog が提供する追加のインスツルメンテーションは自動的にアクティブになりません。アプリケーションにある OpenTracing インスツルメンテーションからのみスパンとトレースを受け取ります。

ただし、Datadog が提供する追加のインスツルメンテーションは、`Datadog.configure` を使用して OpenTracing とともにアクティブ化できます。これは、トレースをさらに強化するために使用できます。これをアクティブ化するには、[インテグレーションインスツルメンテーション](#integration-instrumentation)で詳細をご覧ください。

**サポートされているシリアル化形式**

| タイプ                           | サポート | 追加情報 |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | 〇        |                        |
| `OpenTracing::FORMAT_RACK`     | 〇        | Rack 形式では解決が失われるため、大文字または `-` のいずれかを含む名前のバゲージアイテムは、往復でそれぞれ小文字と `_` に変換されることに注意してください。Datadog は、これらの文字を避けるか、受信側でそれに応じて対応することをお勧めします。 |
| `OpenTracing::FORMAT_BINARY`   | ✕         |                        |

### Profiling

`ddtrace` は、実稼働環境内のメソッドレベルのアプリケーションリソース使用量を測定するプロファイルを生成できます。このプロファイルは、既存のトレースインスツルメンテーション以外の Ruby コードで費やされたリソースへの洞察を提供することができます。

**セットアップ**

プロファイリングを開始するには、[Ruby プロファイラーの有効化](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/)ガイドに従ってください。

#### トラブルシューティング

プロファイリングで問題が発生した場合は、[プロファイラーのトラブルシューティングガイド](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=ruby)をご確認ください。

#### Resque ジョブのプロファイリング

[Resque](https://github.com/resque/resque) ジョブをプロファイリングするときは、[Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks) ドキュメントで説明されている `RUN_AT_EXIT_HOOKS=1` オプションを設定する必要があります。

このフラグがないと、Resque はこの情報を送信する前にワーカープロセスを強制終了するため、短期間の Resque ジョブのプロファイルは使用できません。

## 既知の問題と推奨されるコンフィギュレーション

### Payload too large

デフォルトでは、Datadog はトレースペイロードのサイズを制限して、インスツルメントされたアプリケーション内のメモリオーバーヘッドを防ぎます。その結果、何千もの操作を含むトレースが Datadog に送信されない場合があります。

トレースが欠落している場合は、[デバッグモード](#debugging-and-diagnostics)を有効にして、`"Dropping trace. Payload too large"` を含むメッセージがログに記録されているかどうかを確認します。

デバッグモードは冗長であるため、**Datadog はこれを有効のままにしたり、本番環境で有効にしたりすることをお勧めしません**。確認後、無効にしてください。[Datadog Agent ログ](https://docs.datadoghq.com/agent/guide/agent-log-files/)で同様のメッセージを調べることができます。

ペイロードが大きいためにトレースがドロップされることを確認した場合は、[partial_flush](#additional-configuration) 設定を有効にして、大きなトレースを小さなチャンクに分割します。

### Stack level too deep

Datadog トレースは、他の一般的なライブラリ (Rails、Rack など) にインスツルメンテーションを追加することでトレースデータを収集します。一部のライブラリは、このインスツルメンテーションを追加するための API を提供しますが、提供しないものもあります。インスツルメンテーション API がないライブラリにインスツルメンテーションを追加するために、Datadog は「モンキーパッチ」と呼ばれる手法を使用してそのライブラリのコードを変更します。

Ruby バージョン 1.9.3 以前では、「モンキーパッチ」では、既存の Ruby メソッドを破壊的に置き換えるために、*メソッド書き換え*とも呼ばれる [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method) を使用することがよくありました。ただし、この方法では競合が発生することがよくあります。

Ruby 2.0 では、[`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend) 機能が導入されました。この機能は、破壊的なメソッドの書き換えを回避し、同じメソッドで複数の「モンキーパッチ」を許可します。その結果、「モンキーパッチ」コードよりも安全で好ましい手段になりました。

Datadog インスツルメンテーションは、ほとんど排他的に `Module#prepend` 機能を使用して、インスツルメンテーションを非破壊的に追加します。ただし、一部の他のライブラリ (通常は Ruby < 2.0 をサポートするライブラリ) は依然として `alias_method` を使用しているため、Datadog インスツルメンテーションとの競合が発生し、多くの場合、`SystemStackError` または `stack level too deep` エラーが発生します。

`alias_method` の実装はこれらのライブラリ内に存在するため、Datadog は通常それらを修正できません。ただし、一部のライブラリには既知の回避策があります。

* `rack-mini-profiler`: [Net::HTTP stack level too deep errors](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors)

既知の回避策がないライブラリの場合は、`alias` または `Module#alias_method` を使用してライブラリを削除するか、テストのためにライブラリを異なる環境に分割することを検討してください。

さらに質問がある場合、またはこの問題の発生を報告するには、[Datadog サポートに連絡してください](https://docs.datadoghq.com/help)