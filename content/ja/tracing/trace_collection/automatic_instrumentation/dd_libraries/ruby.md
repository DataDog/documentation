---
aliases:
- /ja/tracing/ruby/
- /ja/tracing/languages/ruby/
- /ja/tracing/setup/ruby/
- /ja/tracing/setup_overview/ruby/
- /ja/agent/apm/ruby/
- /ja/tracing/setup_overview/setup/ruby
- /ja/tracing/trace_collection/ruby
- /ja/tracing/trace_collection/dd_libraries/ruby/
code_lang: ruby
code_lang_weight: 15
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/GettingStarted.md
kind: ドキュメント
title: Ruby アプリケーションのトレース
type: multi-code-lang
---
<div class="alert alert-info">このドキュメントは <code>datadog</code> gem v2.x が対象です。<code>ddtrace</code> gem v1.x のドキュメントをお探しの場合は、旧バージョンの <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby_v1/">Ruby アプリケーションのトレース</a> ドキュメントを参照してください。</div>

`datadog` は、Datadog の Ruby 用のクライアントライブラリです。ライブラリには、Ruby アプリケーションのパフォーマンスとセキュリティを視覚化するツールが一式含まれており、Ruby 開発者はボトルネックその他の問題を特定することができます。

## はじめに

**0.x バージョンからアップグレードされる方は、[アップグレードガイド](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10)をご確認ください。**

一般的な APM ドキュメントについては、[セットアップドキュメント][セットアップドキュメント]を参照してください。

アプリケーションが Datadog に情報を送信した後の APM の詳細については、[用語と概念][visualization docs]をご覧ください。

ライブラリ API のドキュメントについては、[YARD ドキュメント][yard docs]をご覧ください。

寄稿するには、[寄稿ガイドライン][寄稿ドキュメント]と[開発ガイド][開発ドキュメント]をご覧ください。

[セットアップドキュメント]: https://docs.datadoghq.com/tracing/
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[可視化ドキュメント]: https://docs.datadoghq.com/tracing/glossary/
[寄稿ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[開発ドキュメント]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[yard docs]: https://www.rubydoc.info/gems/datadog/

## 互換性要件

Datadog の Ruby ライブラリのサポート状況の一覧については、[互換性要件][1]を参照してください。

## インストール

Ruby アプリケーションにトレースを追加するには、いくつかの簡単なステップを踏むだけです。

1. トレース用の Datadog Agent のセットアップ
2. アプリケーションをインスツルメントする
3. アプリケーションと Datadog Agent を接続する

### トレース用の Datadog Agent のセットアップ

`datadog` をインストールする前に、[Datadog Agent をインストール](https://docs.datadoghq.com/agent/)します。`datadog` はこの Agent にトレースデータを送信します。

次に、Datadog Agent がトレースを受け入れるように構成します。これを行うには、以下のいずれかを行います。

- Agent の環境に `DD_APM_ENABLED=true` を設定する

または

- [Agent のコンフィギュレーションファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)に `apm_enabled: true` を追加する

_さらに、コンテナ化された環境では..._

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

#### Rails または Hanami アプリケーション

1. `datadog` gem を Gemfile に追加します。

   ```ruby
   source 'https://rubygems.org'
   gem 'datadog', require: 'datadog/auto_instrument'
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

#### その他の Ruby アプリケーション

上記対応 gem (Rails、Hanami) を使用しないアプリケーションの場合、以下のように設定します。

1. `datadog` gem を Gemfile に追加します。

   ```ruby
   source 'https://rubygems.org'
   gem 'datadog'
   ```

2. `bundle install` で gem をインストールします
3. インスツルメントする必要のある[サポートされているライブラリまたはフレームワーク](#integration-instrumentation)が`必要`です。
4. アプリケーションに `require 'datadog/auto_instrument'` を追加します。_注:_ これは、サポートされているライブラリまたはフレームワークの require　の_後_に実行する必要があります。

   ```ruby
   # Example frameworks and libraries
   require 'sinatra'
   require 'faraday'
   require 'redis'

   require 'datadog/auto_instrument'
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

#### OpenTelemetry の構成

OTLP を使用すれば、OpenTelemetry のトレースを直接 Datadog Agent に (`datadog`なしで) 送信することができます。詳しくは、[Datadog Agent での OTLP の取り込み](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent)のドキュメントをご覧ください。

### アプリケーションと Datadog Agent を接続する

デフォルトでは、`datadog` はリストされた優先順位で、最初に利用可能な設定を使用して Agent に接続します。

1. 明示的に提供されたコンフィギュレーション設定経由 (hostname/port/transport)
2. `/var/run/datadog/apm.socket` にある Unix ドメインソケット (UDS) 経由
3. `127.0.0.1:8126` への HTTP over TCP 経由

Datadog Agent がこれらの場所のいずれかをリッスンしている場合、さらなる構成は必要ありません。

Agent がアプリケーションと異なるホストやコンテナで動作している場合、または異なるプロトコルでトレースを送信したい場合は、それに応じてアプリケーションを構成する必要があります。

- [HTTP over TCP でトレースデータを Agent に送信する方法](#changing-default-agent-hostname-and-port)
- [Unix ドメインソケット (UDS) を使って Agent にトレースデータを送信する方法](#unix-domain-socket-uds)

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

| キー             | タイプ                   | 説明                                                                                                                                                                                                                                                                                               | デフォルト                                                            |
| --------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `autostart`     | `Bool`                 | 時間の計測を自動的に開始するかどうかを指定します。`false` の場合、ユーザーは `span.start` を呼び出す必要があります。                                                                                                                                                                                                    | `true`                                                             |
| `continue_from` | `Datadog::TraceDigest` | 別の実行コンテキストから発生したトレースを継続します。TraceDigest には、継続ポイントが記述されています。                                                                                                                                                                                           | `nil`                                                              |
| `on_error`      | `Proc`                 | スパンがエラーを発生させたときのエラー処理の動作をオーバーライドします。引数として `span` と `error` が指定されました。デフォルトではスパンにエラーを設定します。                                                                                                                                                              | `proc {\| span, error \| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`               | 操作対象のリソースまたはアクションの名前。同じリソース値を持つトレースは、メトリクスの目的でグループ化されます（ただし、個別に表示可能です）。通常、URL、クエリ、リクエストなどのドメイン固有です（例: `'Article#submit'`、`http://example.com/articles/list`） | スパンの `name`。                                                    |
| `service`       | `String`               | このスパンが属するサービス名（例: `'my-web-service'`）                                                                                                                                                                                                                                        | トレーサー `default-service`、`$PROGRAM_NAME` または `'ruby'`              |
| `start_time`    | `Time`                 | スパンが実際に開始したとき。すでに発生したイベントをトレースするときに役立ちます。                                                                                                                                                                                                                     | `Time.now`                                                         |
| `tags`          | `Hash`                 | スパンに追加する必要がある追加のタグ。                                                                                                                                                                                                                                                             | `{}`                                                               |
| `type`          | `String`               | スパンのタイプ（`'http'`、`'db'` など）                                                                                                                                                                                                                                                     | `nil`                                                              |

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

_未完了のスパンを残してはいけません。_トレースが完了したときにスパンが開いたままになっていると、トレースは破棄されます。[デバッグモードをアクティブにする](#additional-configuration)ことで、これが発生していると思われる場合に警告を確認できます。

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

利用可能なインテグレーションとその対応バージョンの一覧については、[Ruby インテグレーションの互換性][2]を参照してください。

利用可能なインテグレーションの構成オプションの一覧については、以下を参照してください。

#### CI Visibility

[テストと継続的インテグレーションパイプラインをインスツルメントするための Datadog の Ruby ライブラリ](https://github.com/Datadog/Datadog-ci-rb)をチェックしてみてください。

### Action Cable

Action Cable インテグレーションは、ブロードキャストメッセージとチャンネルアクションをトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_cable
end
```

### Action Mailer

Action Mailer インテグレーションは、Rails 5 の ActionMailer アクションのトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

`options` は以下のキーワード引数です。

| キー          | タイプ   | 説明                                                                                                                                                                         | デフォルト |
| ------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `email_data` | `Bool` | `action_mailer.deliver` のスパンに、追加のメールペイロードメタデータを追加するかどうか。フィールドは `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']` を含みます。 | `false` |

### Action Pack

ほとんどの場合、Action Pack は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionpack'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_pack
end
```

### Action View

ほとんどの場合、Action View は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'actionview'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

`options` は以下のキーワード引数です。

| キー                  | タイプ     | 説明                                                                                                                        | デフォルト    |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `template_base_path` | `String` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存していない場合、この値を変更する必要があるかもしれません | `'views/'` |

### Active Job

ほとんどの場合、Active Job は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'active_job'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_job
end

ExampleJob.perform_later
```

### Active Model Serializers

Active Model Serializers インテグレーションは、バージョン 0.9 以降の `serialize` イベントとバージョン 0.10 以降の `render` イベントをトレースします。

```ruby
require 'active_model_serializers'
require 'datadog'

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
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

`options` は以下のキーワード引数です。

| キー            | タイプ     | 説明                                                                                                                                                    | デフォルト                                    |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `service_name` | `String` | SQL クエリインスツルメンテーションのサービス名を上書きします。ActiveRecord のインスタンス化インスツルメンテーションでは、常にアプリケーションで設定されたサービス名が使用されます。 | データベースアダプターの名前（例: `'mysql2'`） |

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

複数の `describes` 構成が接続に一致するとき、一致する最新の構成ルールが適用されます。

ActiveRecord が `describes` で定義されたキーと一致する接続を使用するイベントをトレースする場合は、その接続に割り当てられているトレース設定を使用します。接続が記述されている接続のいずれとも一致しない場合は、代わりに `c.tracing.instrument :active_record` で定義されたデフォルト設定を使用します。

### Active Support

ほとんどの場合、Active Support は Rails の一部としてセットアップされますが、個別にアクティブ化することもできます。

```ruby
require 'activesupport'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

`options` は以下のキーワード引数です。

| キー             | タイプ     | 説明                                                                                                                                                                                        | デフォルト                |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `cache_service` | `String` | `active_support` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `active_support-cache` |

### AWS

AWS インテグレーションは、AWS サービス（S3、ElastiCache など）とのすべてのやり取り（API 呼び出しなど）を追跡します。

```ruby
require 'aws-sdk'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# Perform traced call
Aws::S3::Client.new.list_buckets
```

`options` は以下のキーワード引数です。

| キー            | 環境変数                     | タイプ     | 説明                                                                                                                                                                             | デフォルト |
| -------------- | --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `service_name` | `DD_TRACE_AWS_SERVICE_NAME` | `String` | `aws` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `aws`   |
| `peer_service` | `DD_TRACE_AWS_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                    | `nil`   |

### Concurrent Ruby

Concurrent Ruby インテグレーションは、`::Concurrent::Future` および `Concurrent::Async` を使用する場合のコンテキスト伝播のサポートを追加し、`Future#execute` および `Concurrent::Async#async` 内でトレースされるコードに正しい親セットがあることを確認します。

インテグレーションをアクティブ化するには、`Datadog.configure` メソッドを使用します。

```ruby
# Rails イニシャライザまたはそれに相当する部分の内側
Datadog.configure do |c|
  # ::Concurrent::Future をパッチしてコンテキストを伝播する ExecutorService を使用します
  c.tracing.instrument :concurrent_ruby
end

# Concurrent::Future 内で実行されるコードにコンテキストを渡します
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end

# Concurrent::Async 内で実行されるコードにコンテキストを渡します
class MyClass
include ConcurrentAsync

def foo
Datadog::Tracing.trace('inner') { }
end
end

Datadog::Tracing.trace('outer') do
MyClass.new.async.foo
end
```

### Dalli

Dalli インテグレーションは、`memcached` サーバーへのすべての呼び出しを追跡します。

```ruby
require 'dalli'
require 'datadog'

# デフォルトの Dalli トレース動作を構成します
Datadog.configure do |c|
  c.tracing.instrument :dalli, **options
end

# 単一クライアントの Dalli トレース動作を構成します
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

`options` は以下のキーワード引数です。

| キー               | 環境変数                              | タイプ     | 説明                                                                                                                                                                               | デフォルト     |
| ----------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `command_enabled` | `DD_TRACE_MEMCACHED_COMMAND_ENABLED` | `Bool`   | コマンドを `memcached.command` タグとして収集します。コマンド`keys` には機密情報が含まれている可能性があります。                                                                            | `false`     |
| `service_name`    | `DD_TRACE_DALLI_SERVICE_NAME`        | `String` | `dalli` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `memcached` |
| `peer_service`    | `DD_TRACE_DALLI_PEER_SERVICE`        | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                      | `nil`       |

### DelayedJob

DelayedJob インテグレーションは、ライフサイクルフックを使用してジョブの実行とエンキューを追跡します。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

`options` は以下のキーワード引数です。

| キー        | タイプ   | 説明                                                                                                                                                                 | デフォルト                                                           |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `on_error` | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Elasticsearch

Elasticsearch インテグレーションは、`Client` オブジェクトの `perform_request` への呼び出しを追跡します。

```ruby
require 'elasticsearch/transport'
require 'datadog'

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

| キー            | 環境変数                               | タイプ     | 説明                                                                                                                                                                                       | デフォルト         |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `service_name` | `DD_TRACE_ELASTICSEARCH_SERVICE_NAME` | `String` | `dalli` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `elasticsearch` |
| `peer_service` | `DD_TRACE_ELASTICSEARCH_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                              | `nil`           |
| `quantize`     |                                       | `Hash`   | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show` (または量子化をスキップする場合は `:all`)、または完全に除外するキーの配列を含む `:exclude` を指定することができます。       | `{}`            |

### Ethon

`ethon` インテグレーションは、`Easy` または `Multi` オブジェクトを介してすべての HTTP リクエストをトレースします。なお、このインテグレーションは、`Ethon` に基づく `Typhoeus` ライブラリもサポートします。

```ruby
require 'datadog'

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

| キー                   | 環境変数                       | タイプ     | 説明                                                                                                                                                                               | デフォルト |
| --------------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `service_name`        | `DD_TRACE_ETHON_SERVICE_NAME` | `String` | `ethon` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `ethon` |
| `peer_service`        | `DD_TRACE_ETHON_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | `Bool`   | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | `Bool`   | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                           | `false` |

### Excon

`excon` インテグレーションは、`datadog` ミドルウェアを介して利用できます。

```ruby
require 'excon'
require 'datadog'

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

| キー                   | 環境変数                             | タイプ             | 説明                                                                                                                                                                                                                                                                        | デフォルト                                                           |
| --------------------- | ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `service_name`        | `DD_TRACE_EXCON_SERVICE_NAME`       | `String`         | `excon` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                          | `excon`                                                           |
| `peer_service`        | `DD_TRACE_EXCON_PEER_SERVICE`       | `String`         | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                               | `nil`                                                             |
| `distributed_tracing` |                                     | `Bool`           | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                                                                                                                | `true`                                                            |
| `split_by_domain`     |                                     | `Bool`           | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                                                                                                    | `false`                                                           |
| `on_error`            |                                     | `Proc`           | リクエストがエラーを発生させたときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。                                                                                                                                           | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `error_status_codes`  | `DD_TRACE_EXCON_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...600]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `400...600`                                                       |

**接続を構成してさまざまな設定を使用する**

Excon で複数の接続を使用する場合、ミドルウェアを使用してコンストラクターを構成することで、それぞれに異なる設定を与えることができます。

```ruby
# Datadog トレースミドルウェアをデフォルトのミドルウェアスタックに組み込みます
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

`faraday` インテグレーションは、`datadog` ミドルウェアを介して利用できます。

```ruby
require 'faraday'
require 'datadog'

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

| キー                   | 環境変数                               | タイプ             | 説明                                                                                                                                                                                                                                                                        | デフォルト                                                           |
| --------------------- | ------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `service_name`        | `DD_TRACE_FARADAY_SERVICE_NAME`       | `String`         | `faraday` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                        | `faraday`                                                         |
| `peer_service`        | `DD_TRACE_FARADAY_PEER_SERVICE`       | `String`         | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                               | `nil`                                                             |
| `distributed_tracing` |                                       | `Bool`           | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                                                                                                                | `true`                                                            |
| `split_by_domain`     |                                       | `Bool`           | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                                                                                                    | `false`                                                           |
| `on_error`            |                                       | `Proc`           | リクエストがエラーを発生させたときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。                                                                                                                                        | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `error_status_codes`  | `DD_TRACE_FARADAY_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...600]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `400...600`                                                       |

### Grape

Grape インテグレーションでは、Grape エンドポイントとフィルターにインスツルメンテーションが追加されます。このインテグレーションは、Rack や Rails などの他のインテグレーションと並行して機能できます。

インテグレーションをアクティブ化するには、Grape アプリケーションを定義する前に、`Datadog.configure` メソッドを使用します。

```ruby
# api.rb
require 'grape'
require 'datadog'

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

| キー                  | 環境変数                             | タイプ             | 説明                                                                                                                                                                                                                                                                        | デフォルト     |
| -------------------- | ----------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `enabled`            | `DD_TRACE_GRAPE_ENABLED`            | `Bool`           | Grape をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false`                                                                                                                                                                                | `true`      |
| `error_status_codes` | `DD_TRACE_GRAPE_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...600]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `500...600` |

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

| キー                      | タイプ     | 説明                                                                                                                                                  | デフォルト          |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `schemas`                | `Array`  | トレースする `GraphQL::Schema` オブジェクト (クラスベースのスキーマのみをサポート) の配列。 何も指定しない場合、すべてのスキーマにトレースが適用されます。 | `[]`             |
| `with_deprecated_tracer` | `Bool`   | 非推奨の `GraphQL::Tracing::DataDogTracing` を使ったインスツルメントを有効にします。デフォルトは `false` で、`GraphQL::Tracing::DataDogTrace` を使用します。                          | `false`          |
| `service_name`           | `String` | graphql インスツルメンテーションに使用されるサービス名                                                                                                                | `'ruby-graphql'` |

**GraphQL スキーマを手動で構成する**

スキーマのトレーサー設定を個別に構成する場合（たとえば、複数のスキーマがある場合）、スキーマ定義で、[GraphQL API を使用](http://graphql-ruby.org/queries/tracing.html)して次を追加できます。

`GraphQL::Tracing::DataDogTrace` を使用する場合

```ruby
class YourSchema < GraphQL::Schema
  trace_with GraphQL::Tracing::DataDogTrace
end
```

または、`GraphQL::Tracing::DataDogTracing` (非推奨) を使用する場合

```ruby
class YourSchema < GraphQL::Schema
  use(GraphQL::Tracing::DataDogTracing)
end
```

**注**: このインテグレーションは、define スタイルのスキーマをサポートしていません。クラスベースのスキーマのみがサポートされています。

ダブルトレースを回避するために、手動で構成する場合は `Datadog.configure` で `instrument :graphql` を_使用しない_でください。GraphQL トレースを構成するこれらの 2 つの方法は、相互に排他的と見なされます。

### gRPC

`grpc` インテグレーションでは、サービスのリモートプロシージャ呼び出しを実行する前にミドルウェアとして実行されるクライアントとサーバーの両方のインターセプターが追加されます。gRPC アプリケーションはしばしば分散されるため、このインテグレーションはクライアントとサーバー間でトレース情報を共有します。

インテグレーションをセットアップするには、次のように `Datadog.configure` メソッドを使用します。

```ruby
require 'grpc'
require 'datadog'

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

| キー                   | 環境変数                      | タイプ     | 説明                                                                                                                                                                              | デフォルト                                                            |
| --------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `service_name`        | `DD_TRACE_GRPC_SERVICE_NAME` | `String` | `grpc` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `grpc`                                                             |
| `peer_service`        | `DD_TRACE_GRPC_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                     | `nil`                                                              |
| `distributed_tracing` |                              | `Bool`   | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                      | `true`                                                             |
| `on_error`            |                              | `Proc`   | エラーが発生したときに呼び出されるカスタムエラーハンドラー。`span` および `error` パラメータを受け取る `Proc` です。デフォルトではスパンにエラーを設定します。                                             | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

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
gem 'datadog', require: 'datadog/auto_instrument'
```

で自動インストルメンテーションを行い、`config/initializers` フォルダにイニシャライザーファイルを作成することを推奨します。

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

`options` は以下のキーワード引数です。

| キー            | タイプ     | 説明                                | デフォルト |
| -------------- | -------- | ------------------------------------------ | ------- |
| `service_name` | `String` | `hanami` インスツルメンテーションのサービス名。 | `nil`   |

### http.rb

http.rb インテグレーションは、Http.rb gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'http'
require 'datadog'
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

| キー                   | 環境変数                              | タイプ             | 説明                                                                                                                                                                                                                                                                            | デフォルト     |
| --------------------- | ------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service_name`        | `DD_TRACE_HTTPRB_SERVICE_NAME`       | `String`         | `httprb` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                             | `httprb`    |
| `peer_service`        | `DD_TRACE_HTTPRB_PEER_SERVICE`       | `String`         | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                                   | `nil`       |
| `distributed_tracing` |                                      | `Bool`           | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                                                                                                                    | `true`      |
| `split_by_domain`     |                                      | `Bool`           | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                                                                                                        | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTPRB_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...**600**]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `400...600` |

### httpclient

httpclient インテグレーションは、httpclient gem を使用して HTTP 呼び出しをトレースします。

```ruby
require 'httpclient'
require 'datadog'
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

| キー                   | 環境変数                                  | タイプ             | 説明                                                                                                                                                                                                                                                                        | デフォルト      |
| --------------------- | ---------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `service_name`        | `DD_TRACE_HTTPCLIENT_SERVICE_NAME`       | `String`         | `httpclient` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                     | `httpclient` |
| `peer_service`        | `DD_TRACE_HTTPCLIENT_PEER_SERVICE`       | `String`         | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                               | `nil`        |
| `distributed_tracing` |                                          | `Bool`           | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                                                                                                                | `true`       |
| `split_by_domain`     |                                          | `Bool`           | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                                                                                                    | `false`      |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...600]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `400...600`  |

### httpx

`httpx` は [`datadog` との独自のインテグレーション](https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter)を提供しています。

```ruby
require "datadog"
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

Kafka インテグレーションは、`ruby-kafka` gem のトレース機能を提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'active_support/notifications' # 'ruby-kafka' インスツルメンテーションを有効にするために必要
require 'kafka'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :kafka
end
```

### MongoDB

インテグレーションは、[MongoDB Ruby Driver](https://github.com/mongodb/mongo-ruby-driver) から MongoDB クラスターに送信されるすべての `Command` を追跡します。さらに、Mongoid などの Object Document Mappers (ODM) は、公式の Ruby ドライバーを使用している場合、自動的にインスツルメントされます。インテグレーションを有効化するには、以下を実行します。

```ruby
require 'mongo'
require 'datadog'

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

| キー            | 環境変数                       | タイプ     | 説明                                                                                                                                                                                 | デフォルト                                          |
| -------------- | ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `service_name` | `DD_TRACE_MONGO_SERVICE_NAME` | `String` | `mongo` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。   | `mongodb`                                        |
| `peer_service` | `DD_TRACE_MONGO_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                        | `nil`                                            |
| `quantize`     |                               | `Hash`   | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show` (または量子化をスキップする場合は `:all`)、または完全に除外するキーの配列を含む `:exclude` を指定することができます。 | `{ show: [:collection, :database, :operation] }` |

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

複数の `describes` 構成が接続に一致するとき、一致する最新の構成ルールが適用されます。

### MySQL2

MySQL2 インテグレーションは、`mysql2` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'mysql2'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` は以下のキーワード引数です。

| キー                   | 環境変数                        | タイプ     | 説明                                                                                                                                                                                                                                                                                                                                                              | デフォルト                                                           |
| --------------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `service_name`        | `DD_TRACE_MYSQL2_SERVICE_NAME` | `String` | `mysql2` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                                                                                                               | `mysql2`                                                          |
| `peer_service`        | `DD_TRACE_MYSQL2_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                                                                                                                     | `nil`                                                             |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`      | `String` | データベースモニタリングのための SQL コメント伝搬モード。 <br />(例: `disabled` \| `service`\| `full`). <br /><br />**重要**: _SQL  コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がそのデータにアクセスする可能性があることに注意してください。_ | `'disabled'`                                                      |
| `on_error`            |                                | `Proc`   | MySQL でエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。アプリケーションレベルで処理されるエラーを無視したい場合に役立ちます。                                                                                                                                                              | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Net/HTTP

Net/HTTP インテグレーションは、標準の lib Net::HTTP モジュールを使用して HTTP 呼び出しをトレースします。

```ruby
require 'net/http'
require 'datadog'

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

| キー                   | 環境変数                            | タイプ             | 説明                                                                                                                                                                                                                                                                        | デフォルト     |
| --------------------- | ---------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `service_name`        | `DD_TRACE_NET_HTTP_SERVICE_NAME`   | `String`         | `net/http` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                       | `net/http`  |
| `peer_service`        | `DD_TRACE_NET_HTTP_PEER_SERVICE`   | `String`         | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                               | `nil`       |
| `distributed_tracing` |                                    | `Bool`           | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                                                                                                                | `true`      |
| `split_by_domain`     |                                    | `Bool`           | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                                                                                                    | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTP_ERROR_STATUS_CODES` | `Array`\|`Range` | エラーとしてトレースされる HTTP ステータスコードを定義します。値は範囲 (`400...600`) か、範囲または整数の配列 `[403, 500...600]` で指定することができます。環境変数で設定する場合、範囲にはダッシュ (`'400-599'`) を使用し、配列に要素を追加するにはカンマ (`'403,500-599'`) を使用します。 | `400...600` |

各接続オブジェクトを個別に構成する場合は、次のように `Datadog.configure_onto` を使用できます。

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```

### OpenSearch

OpenSearch インテグレーションは、`Client` オブジェクトの `perform_request` へのすべての呼び出しをトレースします。

```ruby
require 'opensearch'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :opensearch, **options
end

# OpenSearch にクエリを実行します
client = OpenSearch::Client.new(
  host: 'https://localhost:9200',
  user: 'user',
  password: 'password',
)
client.cluster.health
```

`options` は以下のキーワード引数です。

| キー            | 環境変数                            | タイプ     | 説明                                                                                                                                                                                    | デフォルト      |
| -------------- | ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `service_name` | `DD_TRACE_OPENSEARCH_SERVICE_NAME` | `String` | `opensearch` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `opensearch` |
| `peer_service` | `DD_TRACE_OPENSEARCH_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                           | `nil`        |
| `quantize`     |                                    | `Hash`   | 量子化のオプションを含むハッシュ。量子化しないキーの配列を含む `:show` (または量子化をスキップする場合は `:all`)、または完全に除外するキーの配列を含む `:exclude` を指定することができます。    | `{}`         |

### Postgres

PG インテグレーションは、`pg` gem を介して送信された SQL コマンドを以下のメソッドでトレースします。

- `exec` `exec_params`  `exec_prepared`、
- `async_exec` `async_exec_params` `async_exec_prepared`、または
- `sync_exec` `sync_exec_params` `sync_exec_prepared`

```ruby
require 'pg'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

`options` は以下のキーワード引数です。

| キー                   | 環境変数                    | タイプ                                       | 説明                                                                                                                                                                                                                                                                                                                                                            | デフォルト                                                           |
| --------------------- | -------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled`             |                            | Postgres をトレースすべきかどうかを定義します。 | `true`                                                                                                                                                                                                                                                                                                                                                                 |
| `service_name`        | `DD_TRACE_PG_SERVICE_NAME` | `String`                                   | `pg` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。                                                                                                                                                                                 | `pg`                                                              |
| `peer_service`        | `DD_TRACE_PG_PEER_SERVICE` | `String`                                   | アプリケーションが接続する外部サービスの名前                                                                                                                                                                                                                                                                                                                   | `nil`                                                             |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`  | `String`                                   | データベースモニタリングのための SQL コメント伝搬モード。 <br />(例: `disabled` \| `service`\| `full`). <br /><br />**重要**: _SQL コメントの伝播を有効にすると、潜在的に機密データ (サービス名) がデータベースに保存され、データベースへのアクセスを許可された他の第三者がそのデータにアクセスする可能性があることに注意してください。_ | `'disabled'`                                                      |
| `on_error`            |                            | `Proc`                                     | PG でエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。アプリケーションレベルで処理される Postgres からのエラーを無視したい場合に役立ちます。                                                                                                                                                 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Presto

Presto インテグレーションは、`presto-client` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'presto-client'
require 'datadog'

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

| キー            | 環境変数                        | タイプ     | 説明                                                                                                                                                                                | デフォルト  |
| -------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `service_name` | `DD_TRACE_PRESTO_SERVICE_NAME` | `String` | `presto` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `presto` |
| `peer_service` | `DD_TRACE_PRESTO_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                       | `nil`    |

### Que

Que インテグレーションは、ジョブの実行をトレースするミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

`options` は以下のキーワード引数です。

| キー        | 環境変数                         | タイプ   | 説明                                                                                                                                                                 | デフォルト                                                            |
| ---------- | ------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `enabled`  | `DD_TRACE_QUE_ENABLED`          | `Bool` | Que をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false`                                                                           | `true`                                                             |
| `tag_args` | `DD_TRACE_QUE_TAG_ARGS_ENABLED` | `Bool` | ジョブの引数フィールドのタグ付けを有効にします。有効にするには `true`、無効にするには `false` を指定します。                                                                                                       | `false`                                                            |
| `tag_data` | `DD_TRACE_QUE_TAG_DATA_ENABLED` | `Bool` | ジョブのデータフィールドのタグ付けを有効にします。有効にするには `true`、無効にするには `false` を指定します。                                                                                                       | `false`                                                            |
| `on_error` |                                 | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

### Racecar

Racecar インテグレーションは、Racecar ジョブのトレースを提供します。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

`options` は以下のキーワード引数です。

| キー            | 環境変数                         | タイプ     | 説明                                                                                                                                                                                 | デフォルト   |
| -------------- | ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `service_name` | `DD_TRACE_RACECAR_SERVICE_NAME` | `String` | `racecar` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `racecar` |

### Rack

Rack インテグレーションは、すべてのリクエストが基底のフレームワークまたはアプリケーションに到達する前にそれらをトレースするミドルウェアを提供します。これは、Rack の最小インターフェイスに応答し、Rack レベルで取得できる妥当な値を提供します。

このインテグレーションは、Rails などの Web フレームワークで自動的にアクティブ化されます。プレーンな Rack アプリケーションを使用している場合は、`config.ru` でこのインテグレーションを有効にします。

```ruby
# config.ru の例
require 'datadog'

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

| キー                              | タイプ     | 説明                                                                                                                                                                                                                                                                                                                                                                          | デフォルト                                          |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `application`                    | ???      | Rack アプリケーション。`middleware_names` オプションに必要です。                                                                                                                                                                                                                                                                                                                              | `nil`                                            |
| `distributed_tracing`            | `Bool`   | [分散型トレーシング](#distributed-tracing)を有効にすると、トレースヘッダーが受信された場合、このサービストレースが他のサービスのトレースと接続されるようになります                                                                                                                                                                                                                          | `true`                                           |
| `headers`                        | `Hash`   | `rack.request` にタグとして追加するための HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` および `response` キーを受け入れます (例: `['Last-Modified']`)。それぞれ `http.request.headers.*` タグと `http.response.headers.*` タグを追加します。このオプションは、グローバルの `DD_TRACE_HEADER_TAGS` をオーバーライドします。詳しくは、[ルートスパンにヘッダータグを適用する][header tags]を参照してください。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names`               | `Bool`   | 最後に実行されたミドルウェアクラスを `rack` スパンのリソース名として使用する場合は、これを有効にします。`rails` インスツルメンテーションと一緒に有効にすると、`rails` が優先されます。該当する場合は `rack` リソース名をアクティブな `rails` コントローラーに設定します。使用するには `application` オプションが必要です。                                                                     | `false`                                          |
| `quantize`                       | `Hash`   | 量子化のオプションを含むハッシュ。`:query` または `:fragment` を指定することができます。                                                                                                                                                                                                                                                                                                       | `{}`                                             |
| `quantize.base`                  |          | URL のベース (スキーム、ホスト、ポート) に関する振る舞いを定義します。`http.url` タグに URL ベースを保持し、`http.base_url` タグを設定しない場合は `:show` を、デフォルトで `http.url` タグから URL ベースを取り除き、パスを残して `http.base_url` を設定する場合は `nil` を指定できます。オプションは `quantize` オプションの中にネストする必要があります。                                                                                   | `nil`                                            |
| `quantize.query`                 |          | URL 量子化のクエリ部分のオプションを含むハッシュ。`:show` または `:exclude` を指定することができます。以下のオプションを参照してください。オプションは `quantize` オプション内にネストする必要があります。                                                                                                                                                                                                             | `{}`                                             |
| `quantize.query.show`            |          | 常に表示する値を定義します。文字列の配列、すべての値を表示するには `:all`、値を表示しない場合は `nil` を指定できます。オプションは `query` オプション内にネストする必要があります。                                                                                                                                                                                                     | `nil`                                            |
| `quantize.query.exclude`         |          | 完全に削除する値を定義します。文字列の配列、クエリ文字列を完全に削除するには `:all`、何も除外しない場合は `nil` を指定できます。オプションは `query` オプション内にネストする必要があります。                                                                                                                                                                               | `nil`                                            |
| `quantize.query.obfuscate`       |          | クエリ文字列をクエリする際の振る舞いを定義します。オプションのハッシュ、デフォルトの内部難読化設定を使用するには `:internal` を、難読化を無効にするには `nil` を指定することができます。難読化は文字列単位での操作で、キーバリュー単位での操作ではないことに注意してください。有効にすると、`query.show` はデフォルトで `:all` になります。オプションは `query` オプションの中にネストする必要があります。                   | `nil`                                            |
| `quantize.query.obfuscate.with`  |          | 難読化されたマッチを置換するための文字列を定義します。文字列を指定することができます。オプションは `query.obfuscate` オプションの中にネストする必要があります。                                                                                                                                                                                                                                                   | `'<redacted>'`                                   |
| `quantize.query.obfuscate.regex` |          | クエリ文字列を難読化するための正規表現を定義します。正規表現、またはデフォルトの内部正規表現を使用するには `:internal` を指定することができます。後者では、よく知られている機密データが難読化されます。マッチした文字列は `query.obfuscate.with` に置き換えられて、完全に難読化されます。オプションは `query.obfuscate` オプションの中にネストする必要があります。                                                                 | `:internal`                                      |
| `quantize.fragment`              |          | URL フラグメントの動作を定義します。URL フラグメントを表示するには `:show` を、フラグメントを削除するには `nil` を指定できます。オプションは `quantize` オプション内にネストする必要があります。                                                                                                                                                                                                                          | `nil`                                            |
| `request_queuing`                | `Bool`   | フロントエンドサーバーのキューで費やされた HTTP リクエスト時間を追跡します。設定の詳細については、[HTTP リクエストキュー](#http-request-queuing)をご覧ください。                                                                                                                                                                                                                                              | `false`                                          |
| `web_service_name`               | `String` | フロントエンドサーバーリクエストのキュースパンのサービス名。（例: `'nginx'`）                                                                                                                                                                                                                                                                                                             | `'web-server'`                                   |

非推奨のお知らせ

- 将来のバージョンでは、`quantize.base` のデフォルトが `:exclude` から `:show` へと変更される予定です。早めに `:show` に移行することを推奨します。
- 将来のバージョンでは、`quantize.query.show` のデフォルトが `:all` に変更され、`quantize.query.obfuscate` が `:internal` に変更される予定です。早めにこれらの将来の値に移行することを推奨します。

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
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

`options` は以下のキーワード引数です。

| キー                   | タイプ     | 説明                                                                                                                                                 | デフォルト                                                         |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `distributed_tracing` | `Bool`   | [分散型トレーシング](#distributed-tracing)を有効にすると、トレースヘッダーが受信された場合、このサービストレースが他のサービスのトレースと接続されるようになります | `true`                                                          |
| `request_queuing`     | `Bool`   | フロントエンドサーバーのキューで費やされた HTTP リクエスト時間を追跡します。設定の詳細については、[HTTP リクエストキュー](#http-request-queuing)をご覧ください。                      | `false`                                                         |
| `middleware`          | `Bool`   | トレースミドルウェアを Rails アプリケーションに追加します。ミドルウェアを読み込みたくない場合は、`false` に設定します。                                                 | `true`                                                          |
| `middleware_names`    | `Bool`   | 短絡したミドルウェアリクエストがトレースのリソースとしてミドルウェア名を表示できるようにします。                                                 | `false`                                                         |
| `service_name`        | `String` | アプリケーションのリクエストをトレースするときに使用されるサービス名（`rack` レベル）                                                                                   | `'<アプリ名>'`（Rails アプリケーションのネームスペースから推測） |
| `template_base_path`  | `String` | テンプレート名がパースされるときに使用されます。テンプレートを `views/` フォルダーに保存していない場合、この値を変更する必要があるかもしれません                          | `'views/'`                                                      |

**サポートされるバージョン**

| MRI バージョン | JRuby バージョン | Rails バージョン |
| ------------ | -------------- | -------------- |
| 2.5          |                | 4.2 - 6.1      |
| 2.6 - 2.7    | 9.2 - 9.3      | 5.0 - 6.1      |
| 3.0 - 3.2    | 9.4            | 6.1            |

### Rake

`rake` インテグレーションをアクティブにすることで、インスツルメンテーションが必要な Rake タスクのリストを提供すれば、Rake タスクに関するインスツルメンテーションを追加できます。

**長時間稼働する Rake タスクのインスツルメンテーションは避けてください。そのようなタスクは、タスクが終了するまで決してフラッシュされない、メモリ内の大きなトレースを集計する場合があります。**

長時間実行されるタスクには、繰り返し実行されるコードパスの周辺に[手動インスツルメンテーション](#manual-instrumentation)を使用します。

Rake タスクのトレースをアクティブにするには、以下を `Rakefile` に追加します。

```ruby
# Rakefile の一番上:
require 'rake'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # ここで何かタスクを実行します...
end

Rake::Task['my_task'].invoke
```

`options` は以下のキーワード引数です。

| キー            | タイプ     | 説明                                                                                              | デフォルト  |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------- | -------- |
| `enabled`      | `Bool`   | Rake タスクをトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true`   |
| `quantize`     | `Hash`   | タスク引数の量子化のオプションを含むハッシュ。詳細と例については、以下を参照してください。     | `{}`     |
| `service_name` | `String` | `rake` インスツルメンテーションに使用されるサービス名                                                             | `'rake'` |
| `tasks`        | `Array`  | インスツルメントする Rake タスクの名前                                                                    | `[]`     |

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
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Redis コマンドを実行します
redis = Redis.new
redis.set 'foo', 'bar'
```

`options` は以下のキーワード引数です。

| キー            | 環境変数                       | タイプ     | 説明                                                                                                                                                                               | デフォルト |
| -------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `service_name` | `DD_TRACE_REDIS_SERVICE_NAME` | `String` | `redis` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `redis` |
| `peer_service` | `DD_TRACE_REDIS_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                      | `nil`   |
| `command_args` | `DD_REDIS_COMMAND_ARGS`       | `Bool`   | コマンド引数 (例: `GET key` の `key`) をリソース名およびタグとして表示します。`false` の場合は、コマンド名のみを表示します (例: `GET`)。                                   | false   |

**インスタンスごとのトレース設定の構成**

Redis バージョン 5 以降:

```ruby
require 'redis'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis # インテグレーションインスツルメンテーションの有効化が依然として必要です
end

customer_cache = Redis.new(custom: { datadog: { service_name: 'custom-cache' } })
invoice_cache = Redis.new(custom: { datadog: { service_name: 'invoice-cache' } })

# トレースされたコールは `customer-cache` サービスに帰属します
customer_cache.get(...)
# トレースされたコールは `invoice-cache` サービスに帰属します
invoice_cache.get(...)
```

スタンドアロンの `RedisClient`:

```ruby
require "redis-client"
require "datadog"

redis = RedisClient.config(custom: { datadog: { service_name: "my-custom-redis" } }).new_client

Datadog.configure do |c|
  c.tracing.instrument :redis # Enabling integration instrumentation is still required
end

redis.call('PING')
```

Redis バージョン 5 未満:

```ruby
require 'redis'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :redis # インテグレーションインスツルメンテーションの有効化が依然として必要です
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

複数の `describes` 構成が接続に一致するとき、一致する最新の構成ルールが適用されます。

### Resque

Resque インテグレーションは、`perform` メソッドをラップする Resque フックを使用します。

Resque ジョブにトレースを追加するには

```ruby
require 'resque'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

`options` は以下のキーワード引数です。

| キー        | タイプ   | 説明                                                                                                                                                                 | デフォルト                                                           |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `on_error` | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Rest Client

`rest-client` インテグレーションは、`datadog` ミドルウェアを介して利用できます。

```ruby
require 'rest_client'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

`options` は以下のキーワード引数です。

| キー                   | 環境変数                             | タイプ     | 説明                                                                                                                                                                                     | デフォルト       |
| --------------------- | ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `service_name`        | `DD_TRACE_REST_CLIENT_SERVICE_NAME` | `String` | `rest_client` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `rest_client` |
| `peer_service`        | `DD_TRACE_REST_CLIENT_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                            | `nil`         |
| `distributed_tracing` |                                     | `Bool`   | [分散型トレーシング](#distributed-tracing)を有効にします                                                                                                                                             | `true`        |
| `split_by_domain`     |                                     | `Bool`   | `true` に設定されている場合、リクエストドメインをサービス名として使用します。                                                                                                                                 | `false`       |

### Roda

Roda インテグレーションはリクエストをトレースします。

`Datadog.configure` で **Roda** インテグレーションを有効にすることができます。分散型トレーシングを行うためには、`use Datadog::Tracing::Contrib::Rack::TraceMiddleware` を通して **Rack** とこのインテグレーションを使用することが推奨されています。

```ruby
require "roda"
require "datadog"

class SampleApp < Roda
  use Datadog::Tracing::Contrib::Rack::TraceMiddleware

  Datadog.configure do |c|
    c.tracing.instrument :roda, **options
  end

  route do |r|
    r.root do
      r.get do
        'Hello World!'
      end
    end
  end
end
```

`options` は以下のキーワード引数です。

| キー            | タイプ     | 説明                              | デフォルト |
| -------------- | -------- | ---------------------------------------- | ------- |
| `service_name` | `String` | `roda` インスツルメンテーションのサービス名。 | `nil`   |

### Sequel

Sequel インテグレーションは、データベースに対して行われたクエリをトレースします。

```ruby
require 'sequel'
require 'datadog'

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

| キー            | タイプ     | 説明                               | デフォルト                                    |
| -------------- | -------- | ----------------------------------------- | ------------------------------------------ |
| `service_name` | `String` | `sequel` インスツルメンテーションのサービス名 | データベースアダプターの名前（例: `'mysql2'`） |

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
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

`options` は以下のキーワード引数です。

| キー        | タイプ   | 説明                                                                                                                                                                 | デフォルト                                                           |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `tag_body` | `Bool` | SQS メッセージの本文が `true` または `false` であるスパンにタグ付け                                                                                                                       | `false`                                                           |
| `on_error` | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Sidekiq

Sidekiq インテグレーションは、クライアント側とサーバー側のミドルウェアで、それぞれジョブのキューイングと実行をトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

`options` は以下のキーワード引数です。

| キー                   | タイプ   | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                           | デフォルト                                                           |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `distributed_tracing` | `Bool` | [分散型トレーシング](#distributed-tracing)を有効にすると、`sidekiq.push` スパンと `sidekiq.job` スパンの間に親子関係が作成されます。<br /><br />**重要**: _非同期処理のために distributed_tracing を有効にすると、トレースグラフが大幅に変化することがあります。このようなケースには、長時間実行されているジョブ、再試行されたジョブ、遠い将来に予定されているジョブが含まれます。この機能を有効にした後は、必ずトレースを点検してください。_ | `false`                                                           |
| `on_error`            | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。                                                                                                                                                                                                                                                                           | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize`            | `Hash` | ジョブ引数の量子化のためのオプションを含むハッシュ。                                                                                                                                                                                                                                                                                                                                                                                            | `{}`                                                              |

### Sinatra

Sinatra インテグレーションは、リクエストとテンプレートのレンダリングをトレースします。

トレースクライアントの使用を開始するには、`sinatra` または `sinatra/base` の後で、かつアプリケーション/ルートを定義する前に、`datadog` と `instrument :sinatra` を必ずインポートします。

#### クラシックアプリケーション

```ruby
require 'sinatra'
require 'datadog'

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
require 'datadog'

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

| キー                     | タイプ   | 説明                                                                                                                                                                                                                                                                                                                                                                             | デフォルト                                          |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `distributed_tracing`   | `Bool` | [分散型トレーシング](#distributed-tracing)を有効にすると、トレースヘッダーが受信された場合、このサービストレースが他のサービスのトレースと接続されるようになります                                                                                                                                                                                                                             | `true`                                           |
| `headers`               | `Hash` | `sinatra.request` にタグとして追加するための HTTP リクエストまたは応答ヘッダーのハッシュ。配列の値を持つ `request` および `response` キーを受け入れます (例: `['Last-Modified']`)。それぞれ `http.request.headers.*` タグと `http.response.headers.*` タグを追加します。このオプションは、グローバルの `DD_TRACE_HEADER_TAGS` をオーバーライドします。詳しくは、[ルートスパンにヘッダータグを適用する][header tags]を参照してください。 | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | `Bool` | リソース名にスクリプト名を付加します                                                                                                                                                                                                                                                                                                                                                 | `false`                                          |

### Sneakers

Sneakers インテグレーションは、ジョブの実行をトレースするサーバー側のミドルウェアです。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

`options` は以下のキーワード引数です。

| キー        | タイプ   | 説明                                                                                                                                                                 | デフォルト                                                           |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `enabled`  | `Bool` | Sneakers をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false`                                                                      | `true`                                                            |
| `tag_body` | `Bool` | ジョブメッセージのタグ付けを有効にします。有効にするには `true`、無効にするには `false` を指定します。                                                                                                              | `false`                                                           |
| `on_error` | `Proc` | ジョブでエラーが発生したときに呼び出されるカスタムエラーハンドラー。引数として `span` と `error` が指定されます。デフォルトではスパンにエラーを設定します。一時的なエラーを無視したい場合に役立ちます。 | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Stripe

Stripe インテグレーションは、Stripe API リクエストをトレースします。

`Datadog.configure` で有効にできます。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

`options` は以下のキーワード引数です。

| キー       | タイプ   | 説明                                                                                          | デフォルト |
| --------- | ------ | ---------------------------------------------------------------------------------------------------- | ------- |
| `enabled` | `Bool` | Stripe をトレースするかどうかを定義します。トレースを一時的に無効にしたい場合に役立ちます。`true` または `false` | `true`  |

### Sucker Punch

`sucker_punch` インテグレーションは、すべてのスケジュールされたジョブをトレースします。

```ruby
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch
end

# このジョブの実行がトレースされます
LogJob.perform_async('login')
```

### Trilogy

trilogy インテグレーションは、`trilogy` gem を通じて送信された SQL コマンドをトレースします。

```ruby
require 'trilogy'
require 'datadog'

Datadog.configure do |c|
  c.tracing.instrument :trilogy, **options
end

client = Trilogy.new(host: "localhost", username: "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options` は以下のキーワード引数です。

| キー            | 環境変数                         | タイプ     | 説明                                                                                                                                                                                 | デフォルト   |
| -------------- | ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `service_name` | `DD_TRACE_TRILOGY_SERVICE_NAME` | `String` | `trilogy` インスツルメンテーションを実行しているアプリケーションの名前。`global_default_service_name` で上書きすることができます。[詳しくは_追加構成_を参照してください](#additional-configuration)。 | `trilogy` |
| `peer_service` | `DD_TRACE_TRILOGY_PEER_SERVICE` | `String` | アプリケーションが接続する外部サービスの名前                                                                                                                                        | `nil`     |

## 追加構成

`datadog` のデフォルトの動作を変更するには、優先順位の高い順に (1が最も高い) 以下を使用します。

1. [リモート構成](https://docs.datadoghq.com/agent/remote_config).
2. `Datadog.configure` ブロック内で設定されたオプション。以下はその一例です。

   ```ruby
   Datadog.configure do |c|
     c.service = 'billing-api'
     c.env = ENV['RACK_ENV']

     c.tracing.report_hostname = true
     c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
   end
   ```

3. 環境変数

**あるオプションにより高い優先順位の値が設定されている場合、より低い優先順位の値でそのオプションを設定しても、その有効値は変わりません。**

たとえば、`tracing.sampling.default_rate` が[リモート構成](#remote-configuration)で設定されている場合、`Datadog.configure` ブロックでその値を変更しても効果はありません。

**利用可能な構成オプション:**

| 設定                                                | 環境変数                                                 | タイプ                                  | デフォルト                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global**                                             |                                                         |                                       |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `agent.host`                                           | `DD_AGENT_HOST`                                         | `String`                              | `127.0.0.1`                  | トレースデータの送信先となる Agent のホスト名。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `agent.port`                                           | `DD_TRACE_AGENT_PORT`                                   | `Integer`                             | `8126`                       | トレースデータの送信先となる Agent ホストのポートです。[Agent 構成](#configuring-trace-data-ingestion)で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに合わせなければなりません。                                                                                                                                                                                                                                                                                                                                                      |
|                                                        | `DD_TRACE_AGENT_URL`                                    |                                       | `nil`                        | トレースが送信される URL のエンドポイントを設定します。`agent.host` と `agent.port` よりも優先されます。[Agent 構成](#configuring-trace-data-ingestion)で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに合わせなければなりません。                                                                                                                                                                                                                                                                                                             |
| `diagnostics.debug`                                    | `DD_TRACE_DEBUG`                                        | `Bool`                                | `false`                      | デバッグモードの有効/無効を設定します。詳細なログを出力します。**本番環境やその他機密性の高い環境では推奨されません。**詳細は、[デバッグと診断](#debugging-and-diagnostics)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `diagnostics.startup_logs.enabled`                     | `DD_TRACE_STARTUP_LOGS`                                 | `Bool`                                | `nil`                        | 起動時の設定や診断結果をログに出力します。アプリケーション起動時のトレース状態を評価するためです。詳しくは、[デバッグと診断](#debugging-and-diagnostics)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `env`                                                  | `DD_ENV`                                                | `String`                              | `nil`                        | アプリケーション環境。(例: `production`、`staging` など) この値はすべてのトレースにタグとして設定されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `service`                                              | `DD_SERVICE`                                            | `String`                              | _Ruby ファイル名_              | アプリケーションのデフォルトのサービス名。(例: `billing-api`) この値は、すべてのトレースにタグとして設定されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tags`                                                 | `DD_TAGS`                                               | `Hash`                                | `nil`                        | カスタムタグを `,` で区切った値のペアで指定します (例: `layer:api,team:intake`) これらのタグは全てのトレースに対して設定されます。詳しくは [環境とタグ](#environment-and-tags)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `time_now_provider`                                    |                                                         | `Proc`                                | `->{ Time.now }`             | 時刻の取得方法を変更します。詳しくは、[タイムプロバイダーの設定](#setting-the-time-provide)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `version`                                              | `DD_VERSION`                                            | `String`                              | `nil`                        | アプリケーションのバージョン (例: `2.5`、`202003181415`、`1.3-alpha` など) この値は、すべてのトレースにタグとして設定されます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `telemetry.enabled`                                    | `DD_INSTRUMENTATION_TELEMETRY_ENABLED`                  | `Bool`                                | `true`                       | Datadog へのテレメトリーデータの送信を有効にすることができます。将来のリリースでは、[こちら](https://docs.datadoghq.com/tracing/configure_data_security/#telemetry-collection)のドキュメントにあるように、無効にすることも可能です。                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Tracing**                                            |                                                         |                                       |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tracing.contrib.peer_service_mapping`                 | `DD_TRACE_PEER_SERVICE_MAPPING`                         | `Hash`                                | `nil`                        | すべてのインスツルメンテーションを対象に `peer.service` タグの再マッピングを定義します。`old_value1:new_value1, old_value2:new_value2, ...` のリストを指定します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tracing.contrib.global_default_service_name.enabled`  | `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`     | `Bool`                                | `false`                      | すべてのインスツルメンテーションを対象に、`service_name` のデフォルト値をアプリケーションのサービス名に変更する。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.propagation_extract_first`                    | `DD_TRACE_PROPAGATION_EXTRACT_FIRST`                    | `Bool`                                | `false`                      | 1 つ目の有効な伝播フォーマットが検出されたら直ちに終了します。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `tracing.propagation_style_extract`                    | `DD_TRACE_PROPAGATION_STYLE_EXTRACT`                    | `Array`                               | `['Datadog','tracecontext']` | 抽出する分散型トレーシング伝播フォーマット。`DD_TRACE_PROPAGATION_STYLE` をオーバーライドします。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.propagation_style_inject`                     | `DD_TRACE_PROPAGATION_STYLE_INJECT`                     | `Array`                               | `['Datadog','tracecontext']` | 挿入する分散型トレーシング伝播フォーマット。`DD_TRACE_PROPAGATION_STYLE` をオーバーライドします。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.propagation_style`                            | `DD_TRACE_PROPAGATION_STYLE`                            | `Array`                               | `nil`                        | 抽出および挿入する分散型トレーシング伝播フォーマット。詳しくは、[分散型トレーシング](#distributed-tracing)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tracing.enabled`                                      | `DD_TRACE_ENABLED`                                      | `Bool`                                | `true`                       | トレースの有効/無効を設定します。`false` に設定すると、インスツルメンテーションは実行されますが、トレース Agent にトレースが送信されません。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `tracing.header_tags`                                  | `DD_TRACE_HEADER_TAGS`                                  | `Array`                               | `nil`                        | HTTP ヘッダーをスパンタグとして記録します。詳しくは、[ルートスパンにヘッダータグを適用する][header tags]を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.instrument(<integration-name>, <options...>)` |                                                         |                                       |                              | 特定のライブラリのインスツルメンテーションを有効にします。詳細は、[インテグレーションのインスツルメンテーション](#integration-instrumentation)を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `tracing.log_injection`                                | `DD_LOGS_INJECTION`                                     | `Bool`                                | `true`                       | [トレース相関](#trace-correlation)の情報が存在する場合、それを Rails のログに挿入します。デフォルトのロガー (`ActiveSupport::TaggedLogging`)、`lograge`、`semantic_logger` をサポートします。                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.partial_flush.enabled`                        |                                                         | `Bool`                                | `false`                      | 部分フラッシュを有効または無効にします。部分フラッシュは、トレースの完了した部分を Agent に送信します。多くのスパンを持つ長時間実行タスク (ジョブなど) をトレースするときに使用します。                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tracing.partial_flush.min_spans_threshold`            |                                                         | `Integer`                             | `500`                        | 部分フラッシュがそれらの完了したスパンを送信する前に、トレースで完了しなければならないスパンの数。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.sampler`                                      |                                                         | `Datadog::Tracing::Sampling::Sampler` | `nil`                        | 高度な使用方法のみ。カスタムの `Datadog::Tracing::Sampling::Sampler` インスタンスを設定します。指定された場合、トレーサーはこのサンプラーを使用してサンプリングの動作を決定します。詳しくは、[カスタムサンプリング](#custom-sampling) を参照してください。                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tracing.sampling.default_rate`                        | `DD_TRACE_SAMPLE_RATE`                                  | `Float`                               | `nil`                        | トレースのサンプリングレートを `0.0` (0%) と `1.0` (100%) の間で設定します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.sampling.rate_limit`                          | `DD_TRACE_RATE_LIMIT`                                   | `Integer`                             | `100` (毎秒)           | 1 秒あたりにサンプリングするトレースの最大数を設定します。トラフィックの急増時に取り込み量が過剰にならないよう、レート制限を設定します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.sampling.rules`                               | `DD_TRACE_SAMPLING_RULES`                               | `String`                              | `nil`                        | トレースレベルのサンプリングルールを設定し、ローカルのルートスパン に対してマッチングします。フォーマットは、オブジェクトの配列を含むJSON 形式の `文字列` になります。各オブジェクトは、浮動小数点属性の `sample_rate` (0.0～1.0) を必ず持ち、オプションで `name`、`service`、`resource`、`tags` の文字列属性を持ちます。`name`、`service`、`resource`、`tags` は、このサンプリングルールがどのトレースに適用されるかを制御します。これらがすべてない場合、このルールはすべてのトレース に適用されます。ルールは配列で宣言された順に評価され、最初に合致したものだけが適用されます。該当するものがない場合は、`tracing.sampling.default_rate` が適用されます。 |
| `tracing.sampling.span_rules`                          | `DD_SPAN_SAMPLING_RULES`、`ENV_SPAN_SAMPLING_RULES_FILE` | `String`                              | `nil`                        | [シングルスパンサンプリング](#single-span-sampling)ルールを設定します。これらのルールにより、それぞれのトレースがドロップされた場合でもスパンを保持することができます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.trace_id_128_bit_generation_enabled`          | `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`           | `Bool`                                | `true`                       | 128 ビットのトレース ID を生成する場合は `true` 、64 ビットのトレース ID を生成する場合は `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.report_hostname`                              | `DD_TRACE_REPORT_HOSTNAME`                              | `Bool`                                | `false`                      | トレースにホスト名タグを追加します。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `tracing.test_mode.enabled`                            | `DD_TRACE_TEST_MODE_ENABLED`                            | `Bool`                                | `false`                      | テストスイートでトレースを使用するための、テストモードを有効または無効にします。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.test_mode.trace_flush`                        |                                                         | `Datadog::Tracing::TraceFlush`        | `nil`                        | トレースフラッシュの動作を決定するオブジェクト。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

#### カスタムロギング

デフォルトでは、デフォルトの Ruby ロガーによってすべてのログが処理されます。Rails を使用している場合は、アプリケーションログファイルにメッセージが表示されます。

Datadog クライアントのログメッセージは、他のメッセージと区別できるように `[datadog]` とマークされます。

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

デフォルトでは、アプリケーションが非開発環境で動作していることを `datadog` が検出すると、この機能が有効になります。

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

`Datadog::Tracing.reject!` と `Datadog::Tracing.keep!` は、トレースがアクティブでない時に使用しても安全です。

また、特定のトレースインスタンスを拒否することも可能です。

```ruby
# まず、アクティブトレースを取得します
trace = Datadog::Tracing.active_trace

# トレースを拒否します
trace.reject!

# トレースを保持します
trace.keep!
```

#### シングルスパンサンプリング

トレースレベルのサンプリングルールによってそれぞれのトレースが削除されてもスパンを保持することができるサンプリングルールを構成することができます。

これにより、トレースレベルサンプリングが適用されても、重要なスパンを維持することができます。シングルスパンサンプリングでは、スパンを削除することはできません。

構成は、[取り込みメカニズムのドキュメント](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby#single-spans)を参照してください。

#### カスタムサンプリング

完全にカスタマイズされたサンプリング戦略を構成することが可能です。

可能であれば、カスタムサンプリングの使用は避け、[追加構成](#additional-configuration) で提供されているサンプリングオプションと一緒に[優先度サンプリング API](#priority-sampling) を使用してください。
そうすることで、保守性とサンプリングの判断のデバッグ可能性を最大限に高めることができます。

カスタムサンプリングが必要な場合、2 つの戦略が考えられます。

1. [優先度サンプリング](#priority-sampling)は、推奨されるサンプリング戦略で、取り込み後のサンプリング構成とレポートをすべてサポートします。

2. アプリケーション側サンプリングでは、Ruby プロセスからスパンがフラッシュされるのを完全に防ぐことができますが、
   [取り込み後のサンプリング](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/)が正常に機能するのに必要なデータを受信できなくなります。

   この戦略は、パフォーマンスの向上と帯域幅の削減がシステムにとって不可欠な場合にのみ採用する必要があります。

   アプリケーション側サンプリングをご利用の方は、[GitHub で問題を開く](https://github.com/DataDog/dd-trace-rb/issues/new)ことでお知らせいただければ、お客様のユースケースをよりよく理解し、サポートすることができます。

`sample!` と `sample_rate` のメソッドに応答する Ruby オブジェクトを作成することで、_カスタムサンプリング_を構成できます。

```ruby
class CustomSampler
   # トレースサンプリングのステータスを設定します。
   #
   # このメソッドは、サンプリングの判断に基づき変更が必要な場合、
   #  `trace` を修正する*可能性があります* (例: トレースタグの追加)。
   #
   # @param [Datadog::Tracing::TraceOperation] trace
   # @return [void]
  def sample!(trace)
     # サンプリングの判断を記録するために、2 つのサンプリング戦略のいずれかを実装します。
     #
     # 1. 優先度サンプリング。Ingestion Controls ページは正確になります。
     #   a. 優先度サンプリングでスパンを残す。
     trace.keep!
     #   b. または、優先度サンプリングでスパンを破棄する。
     trace.reject!

     # または

     # 2. スパンをフラッシュしない。Ingestion Controls ページは**不正確**になります。
     #    処理時間と帯域幅を節約できます。
     #   a. スパンをフラッシュする
     trace.sampled = true
     #   b. スパンをフラッシュしない
     trace.sampled = false
  end

  # サンプリングレート。このサンプラーがそのようなコンセプトを持っていない場合は、`nil`。
  #
  # @param [Datadog::Tracing::TraceOperation] trace
  # @return [Float,nil] 0.0～1.0 のサンプリング率、または、該当しない場合は `nil` 
  def sample_rate(trace)
     # ...
  end
end

Datadog.configure do |c|
  c.tracing.sampler = CustomSampler.new
end
```

その他すべてのサンプリングオプションについては、[追加構成](#additional-configuration)を参照してください。

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

- `datadog`
- `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/)
- `b3multi`: [B3 マルチヘッダー](https://github.com/openzipkin/b3-propagation#multiple-headers)
- `b3`: [B3 シングルヘッダー](https://github.com/openzipkin/b3-propagation#single-header)
- `none`: ノーオペレーション。

これらのフォーマットの使用は `Datadog.configure` で有効化または無効化することができます。

```ruby
Datadog.configure do |c|
  # 抽出すべきヘッダーフォーマットのリスト
  c.tracing.propagation_style_extract = [ 'tracecontext', 'datadog', 'b3' ]

  # 挿入すべきヘッダーフォーマットのリスト
  c.tracing.propagation_style_inject = [ 'tracecontext', 'datadog' ]
end
```

**インテグレーションのための分散型トレーシングのアクティブ化**

`datadog` に含まれる多くのインテグレーションは、分散型トレーシングをサポートしています。Agent v7 および Agent v6 のほぼすべてのバージョンで、分散型トレーシングがデフォルトで有効になっています。必要に応じて、コンフィギュレーション設定で有効にすることもできます。

- アプリケーションが分散型トレーシングがアクティブなサービスからリクエストを受信する場合は、このリクエストを処理するインテグレーション（Rails など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングがアクティブなサービスにリクエストを送信する場合は、このリクエストを送信するインテグレーション（Faraday など）で分散型トレーシングをアクティブにする必要があります。
- アプリケーションが分散型トレーシングを実装するリクエストを送受信する場合、これらのリクエストを処理するすべてのインテグレーションをアクティブにする必要があります。

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

#### HTTP プロパゲーターの使用

このメタデータの伝播プロセスを簡単にするために、`Datadog::Tracing::Contrib::HTTP` モジュールを使用できます。

クライアント側

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # リクエストヘッダーにトレースヘッダーを挿入します (`env` は Hash でなければなりません)
  Datadog::Tracing::Contrib::HTTP.inject!(trace.to_digest, env)
end
```

サーバー側

```ruby
trace_digest = Datadog::Tracing::Contrib::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # Web 作業をします...
end
```

### HTTP リクエストのキューイング

HTTP リクエストから発生するトレースは、リクエストが Ruby アプリケーションに到達する前にフロントエンドウェブサーバーまたはロードバランサーキューで費やされた時間を含むように構成できます。

この機能はデフォルトで無効になっています。有効にするには、リクエストのキューイング機能を有効にする前に、Web サーバー（Nginx）から `X-Request-Start` または `X-Queue-Start` ヘッダーを追加する必要があります。以下は Nginx のコンフィギュレーション例です。

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

Rack ベースのアプリケーションについての詳細は、[ドキュメント](#rack)を参照してください。

### 処理パイプライン

一部のアプリケーションでは、トレースを Datadog に送信する前に、トレースを変更またはフィルタリングする必要がある場合があります。処理パイプラインを使用すると、このような動作を定義する_プロセッサー_を作成できます。

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

どちらの場合も、プロセッサーのメソッドは `trace` オブジェクトを返す_必要があります_。この戻り値は、パイプラインの次のプロセッサーに渡されます。

#### 注意事項

1. 削除されたスパンは、トレースメトリクスを生成せず、モニターやダッシュボードに影響を与えます。
2. スパンを削除すると、削除されたスパンからすべての子スパンも削除されます。これにより、トレースグラフの孤児スパンを防ぐことができます。
3. [デバッグモードログ](#enabling-debug-mode)は、処理パイプラインが実行される_前に_スパンの状態を報告します。スパンを変更または削除すると、デバッグモードログに元の状態が表示されます。

### トレース相関

ロギングなどの多くの場合において、相互参照を容易にするために、トレース ID を他のイベントまたはデータストリームに関連付けると便利です。

#### Rails アプリケーションにロギングする場合

##### 自動

デフォルトのロガー (`ActiveSupport::TaggedLogging`)、`lograge` または `semantic_logger` を使用している Rails アプリケーションでは、トレース相関挿入はデフォルトで有効になっています。

環境変数 `DD_LOGS_INJECTION=false` を設定すると無効化できます。

#### Ruby アプリケーションにロギングする場合

ロガーに相関 ID を追加するには、`Datadog::Tracing.correlation` がある相関 ID を取得するログフォーマッタを追加し、これをメッセージに追加します。

Datadog ロギングと適切に関連付けるには、次の項目がログメッセージに順番通りに含まれていることを確認してください。

- `dd.env=<ENV>`: ここで、`<ENV>` は `Datadog::Tracing.correlation.env` と同じです。環境が構成されていない場合は省略します。
- `dd.service=<SERVICE>`: ここで、`<SERVICE>` は `Datadog::Tracing.correlation.service` と同じです。デフォルトのサービス名が構成されていない場合は省略します。
- `dd.version=<VERSION>`: ここで、`<VERSION>` は `Datadog::Tracing.correlation.version` と同じです。アプリケーションのバージョンが構成されていない場合は省略します。
- `dd.trace_id=<TRACE_ID>`: ここで `<TRACE_ID>` は `Datadog::Tracing.correlation.trace_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。
- `dd.span_id=<SPAN_ID>`: ここで `<SPAN_ID>` は `Datadog::Tracing.correlation.span_id` か、またはロギング中にどのトレースもアクティブでない場合は `0` になります。

`Datadog::Tracing.log_correlation` は `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>` を返します。

トレースがアクティブでなく、アプリケーション環境とバージョンが構成されていない場合、`dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0` が返されます。

実例:

```ruby
require 'datadog'
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

デフォルトでは、`datadog` はリストされた優先順位で、最初に利用可能な設定を使用して Agent に接続します。

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

#### Agent の接続方法

Agent は TCP または Unix Domain Socket (UDS) による通信をサポートしています。トレーサーは、提供されたコンフィギュレーションに基づき、Agent の接続方法を自動的に検出します。

##### TCP

`host` と `port` が設定されている場合、または `DD_TRACE_AGENT_URL` で `HTTP/HTTPS` がプロトコルとして指定されている場合、トレーサーは TCP 経由で Agent に接続します。TCP はデフォルトの接続方法です。

##### Unix Domain Socket (UDS)

使用するには、まず Unix ソケットでリッスンするようにトレース Agent を構成し、次にトレーサーを次のように構成します。

```ruby
Datadog.configure do |c|
  # Provide local path to trace Agent Unix socket
  c.agent.uds_path = '/tmp/ddagent/trace.sock'
end
```

また、プロトコルを `unix` に設定することで、`DD_TRACE_AGENT_URL` 環境変数を使用して UDS パスを定義することもできます。

```bash
DD_TRACE_AGENT_URL=unix:///tmp/ddagent/trace.sock
```

注: UDS と TCP のコンフィギュレーションを混在させることはできません。`c.agent.uds_path` を設定する場合、`c.agent.host` または`c.agent.port` を設定することはできません。

#### テストモードでの通信

テストモードが有効になっている場合、トレーサーは、テストスイートまたは他の非本番環境にリクエストをバッファリングできる、ノーオペレーション通信用の `Test` アダプターを使用します。これは`c.tracing.test_mode.enabled` を true に設定することで構成できます。このモードはトレースでのみ機能します。

```ruby
Datadog.configure do |c|
  c.tracing.test_mode.enabled = true
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
require 'datadog'

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

| 名前                                        | タイプ    | 説明                                                                                           | 次で利用可能                                                                                    |
| ------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `runtime.ruby.class_count`                  | `gauge` | メモリスペース内のクラスの数。                                                                    | CRuby                                                                                           |
| `runtime.ruby.gc.*`                         | `gauge` | ガベージコレクションの統計: `GC.stat` から収集されます。                                              | すべてのランタイム                                                                                    |
| `runtime.ruby.yjit.*`                       | `gauge` | `RubyVM::YJIT.runtime_stats` から収集された YJIT の統計情報。                                          | CRuby (有効になっている場合)                                                                              |
| `runtime.ruby.thread_count`                 | `gauge` | スレッドの数。                                                                                    | すべてのランタイム                                                                                    |
| `runtime.ruby.global_constant_state`        | `gauge` | グローバル定数キャッシュの生成。                                                                     | CRuby ≤ 3.1                                                                                     |
| `runtime.ruby.global_method_state`          | `gauge` | [グローバルメソッドキャッシュの生成。](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby 2.x](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |
| `runtime.ruby.constant_cache_invalidations` | `gauge` | 定数キャッシュの無効化。                                                                         | CRuby ≥ 3.2                                                                                     |
| `runtime.ruby.constant_cache_misses`        | `gauge` | 定数キャッシュのミス。                                                                                | CRuby ≥ 3.2                                                                                     |

さらに、すべてのメトリクスには次のタグが含まれます。

| 名前       | 説明                                        |
| ---------- | -------------------------------------------------- |
| `language` | トレースされたプログラミング言語。（例: `ruby`）         |
| `service`  | このメトリクスに関連付けられているサービスのリスト。 |

### プロファイリング

`datadog` は、実稼働環境内のメソッドレベルのアプリケーションリソース使用量を測定するプロファイルを生成できます。このプロファイルは、既存のトレースインスツルメンテーション以外の Ruby コードで費やされたリソースへの洞察を提供することができます。

**セットアップ**

プロファイリングを開始するには、[Ruby プロファイラーの有効化](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/)ガイドに従ってください。

#### トラブルシューティング

プロファイリングで問題が発生した場合は、[プロファイラーのトラブルシューティングガイド](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=ruby)をご確認ください。

#### Resque ジョブのプロファイリング

[Resque](https://github.com/resque/resque) ジョブをプロファイリングするときは、[Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks) ドキュメントで説明されている `RUN_AT_EXIT_HOOKS=1` オプションを設定する必要があります。

このフラグがないと、Resque はこの情報を送信する前にワーカープロセスを強制終了するため、短期間の Resque ジョブのプロファイルは使用できません。

## 既知の問題と推奨されるコンフィギュレーション

### Payload too large

デフォルトでは、Datadog はインスツルメントされたアプリケーション内のメモリオーバーヘッドを防ぐために、トレースペイロードのサイズを制限します。その結果、何千もの操作を含むトレースが Datadog に送信されない場合があります。

トレースが欠落している場合は、[デバッグモード](#debugging-and-diagnostics)を有効にして、`"Dropping trace. Payload too large"` を含むメッセージがログに記録されているかどうかを確認します。

デバッグモードは冗長であるため、**Datadog はこれを有効のままにしたり、本番環境で有効にしたりすることをお勧めしません**。確認後、無効にしてください。[Datadog Agent ログ](https://docs.datadoghq.com/agent/guide/agent-log-files/)で同様のメッセージを調べることができます。

ペイロードが大きいためにトレースがドロップされることを確認した場合は、[partial_flush](#additional-configuration) 設定を有効にして、大きなトレースを小さなチャンクに分割します。

### Stack level too deep

Datadog トレースは、他の一般的なライブラリ (Rails、Rack など) にインスツルメンテーションを追加することでトレースデータを収集します。一部のライブラリは、このインスツルメンテーションを追加するための API を提供しますが、提供しないものもあります。インスツルメンテーション API がないライブラリにインスツルメンテーションを追加するために、Datadog は「モンキーパッチ」と呼ばれる手法を使用してそのライブラリのコードを変更します。

Ruby バージョン 1.9.3 以前では、「モンキーパッチ」では、既存の Ruby メソッドを破壊的に置き換えるために、_メソッド書き換え_とも呼ばれる [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method) を使用することがよくありました。ただし、この方法では、2 つのライブラリが同じメソッドを「書き換え」ようとした場合に、競合やエラーが発生することがよくあります  (例: 2 つの異なる APM パッケージが同じメソッドをインスツルメントしようとする場合)。

Ruby 2.0 では、[`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend) 機能が導入されました。この機能は、破壊的なメソッドの書き換えを回避し、同じメソッドで複数の「モンキーパッチ」を許可します。その結果、「モンキーパッチ」コードの中で最も安全で好ましい手段になりました。

Datadog インスツルメンテーションは、ほとんど排他的に `Module#prepend` 機能を使用して、インスツルメンテーションを非破壊的に追加します。ただし、一部の他のライブラリ (通常は Ruby < 2.0 をサポートするライブラリ) は依然として `alias_method` を使用しているため、Datadog インスツルメンテーションとの競合が発生し、多くの場合、`SystemStackError` または `stack level too deep` エラーが発生します。

`alias_method` の実装はこれらのライブラリ内に存在するため、Datadog は通常それらを修正できません。ただし、一部のライブラリには既知の回避策があります。

- `rack-mini-profiler`: [Net::HTTP stack level too deep errors](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors)

既知の回避策がないライブラリの場合は、`alias` または `Module#alias_method` を使用してライブラリを削除するか、テストのためにライブラリを異なる環境に分割することを検討してください。

さらに質問がある場合、またはこの問題の発生を報告するには、[Datadog サポートに連絡してください](https://docs.datadoghq.com/help)

### Resque ワーカーが終了時にハングアップする

Resque ではデフォルトで、ジョブごとにプロセスがフォークされるため、`datadog` でインスツルメントされた場合、まれに resque 処理が終了時にハングアップすることがあります。

回避策として、`FORK_PER_JOB` 環境変数を `false` に設定し、この動作を無効にすることをお勧めします。

この問題に関する議論については、[こちらの問題](https://github.com/DataDog/dd-trace-rb/issues/3015)を参照してください。

<!---->

[ヘッダータグ]: https://docs.datadoghq.com/tracing/configure_data_security/#applying-header-tags-to-root-spans
[1]: https://docs.datadoghq.com/ja/tracing/trace_collection/compatibility/ruby/
[2]: https://docs.datadoghq.com/ja/tracing/trace_collection/compatibility/ruby#integrations