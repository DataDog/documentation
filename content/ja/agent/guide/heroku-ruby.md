---
title: Datadog で Heroku の Ruby on Rails アプリケーションをインスツルメント
kind: ガイド
further_reading:
  - link: /agent/basic_agent_usage/heroku/
    tag: ドキュメント
    text: Heroku ビルドパック
---
Heroku は、Ruby の開発者、特に Ruby on Rails の開発者に人気のプラットフォームです。Datadog は Heroku および Ruby の両方をサポートするため、Heroku Ruby アプリケーションのメトリクス、ログ、トレースを Datadog へ送信できます。

このガイドでは、Heroku への Rails アプリケーションのデプロイと、メトリクス、インテグレーションデータ、ログ、トレースを Datadog へ送信するために必要な手順についてご説明します。

## 前提条件

このガイドは、以下を前提としています。

* Datadog アカウントすでに所有していること。まだお持ちでない場合は、[無料トライアルに登録][1]できます。
* Heroku アカウントをすでに所有していること。まだお持ちでない場合は、[無料ティアに登録][2]できます。
* ローカルシステムに [Git][3] がインストールされていること。
* ローカルシステムに [Heroku CLI ツール][4] がインストールされていること。

## Heroku アプリケーションの作成とサンプル Ruby アプリケーションのデプロイ

このガイドでは、[Heroku の Rails サンプルアプリケーション][5]を使用します。これは、Heroku での Ruby アプリケーションのデプロイ方法の詳細が説明されている [Starting With Ruby の記事][6]に付随する必要最低限の機能だけを備えた Rails アプリケーションです。このガイドでは、Datadog での Rails アプリケーションのインスツルメントに焦点を当てます。

サンプルアプリケーションには、[Postgres がローカルにインストールされている][7]場合のみ解決する依存 pg があります。続行する前に Postgres をインストールしてください。
`psql` コマンドを実行して、Postgres がインストールされたことを確認します。以下のような出力を返します。
```shell
which psql
/usr/local/bin/psql
```

サンプルアプリケーションからコードを取得して、そのまま新しい Heroku cアプリケーションにデプロイします。

```shell
# アプリケーションに名前を付け環境変数としてエクスポート
# (この場合、名前は ruby-heroku-datadog)
export APPNAME=ruby-heroku-datadog

# サンプルアプリケーションのコードを取得
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Heroku にログイン 
heroku login

# 新しいアプリケーションを作成
heroku create -a $APPNAME

# Heroku にデプロイ 
git push heroku main

# アプリケーションを起動して動作を確認
heroku open -a $APPNAME
```

デフォルトのブラウザでサンプルアプリケーションが開きます。以下のような UI が表示されます。

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby サンプルアプリケーション" >}}

## Datadog アカウントのアプリケーションへの接続と Datadog Agent のデプロイ

Datadog で Heroku アプリケーションの完全な可観測性を確保するには、まず Datadog Agent をデプロイして Datadog アカウントに接続します。

Datadog は、アカウントを API キーで認識します。[Datadog アカウントにログイン][8]して、[API キーのセクション][9]に移動し API キーをコピーします。

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API キーセクション" >}}

Datadog Agent をアプリケーションにデプロイします。このガイドでは、[Datadog Heroku ビルドパック][10]を使用します。[Heroku ビルドパック][11]について、詳しくは公式ドキュメントでご確認ください。

```shell
# Heroku Labs Dyno Metadata を有効にして HEROKU_APP_NAME 環境変数を自動的に設定
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# メトリクスが連続するよう、Datadog でホスト名を appname.dynotype.dynonumber に設定
heroku config:add DD_DYNO_HOST=true

# このビルドパックを追加して Datadog API キーを設定
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# 強制的に再構築して Heroku をデプロイ
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

ビルドが完了すると、Datadog Agent がアプリケーションで動作します。Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、すべてが正しく動作していることを確認します。以下のセクションをご参照ください。

```shell
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

この出力は、Datadog Agent が Heroku アプリケーションで実行され、Datadog アカウントに正常に接続されたことを示しています。

[Datadog のホストマップ][12]を開くと、dyno が Datadog で正常にレポートしていることを確認できます。

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog ホストマップ" >}}

## インテグレーションの設定

Datadog の 400 以上のインテグレーションで、さまざまテクノロジースタックのメトリクスを集約できます。Datadog のビルドパックを使用すると、このインテグレーションを Heroku アプリケーションに有効にできます。

Heroku は、アドオンを使用して Heroku にデプロイされるすべての Rails アプリケーションに Postgres データベースを追加します。アプリケーションで Postgres アドオンが有効になっていることを確認します。

 ```shell
heroku addons -a $APPNAME
```
次の出力が表示されます。


```shell
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

上記テーブルはアドオンと、現在のアプリ (ruby-heroku-datadog) または他のアプリへの添付を示します。
```

このアプリケーション例ではすでにコード内のデータベースを使用していますが、まだテーブルを作成していません。作成してください。

```shell
heroku run rake db:migrate -a $APPNAME
```

```shell
Running `rake db:migrate` attached to terminal... up, run.3559
Migrating to CreateWidgets (20140707111715)
== 20140707111715 CreateWidgets: migrating ====================================
-- create_table(:widgets)
   -> 0.0244s
== 20140707111715 CreateWidgets: migrated (0.0247s) ===========================
```

これで、このデータベースを使用するアプリケーションの `/widgets` エンドポイントにアクセスできます。

Postgres Datadog インテグレーションを有効にします。

まず、Heroku からデータベース認証情報を取得する必要があります。

```shell
# psql ターミナルで以下を入力
heroku pg:credentials:url DATABASE -a $APPNAME
```

Datadog ビルドパックを使用する場合、インテグレーションは特定の方法で有効化されます。インテグレーションの有効化方法については、[ビルドパックのドキュメント][13]を参照してください。

アプリケーションのルートに `datadog/conf.d` フォルダーを作成します。

```shell
# アプリケーションのルートディレクトリにいることを確認
cd ruby-getting-started

# アプリケーションコードで、インテグレーションコンフィギュレーションのフォルダーを作成
mkdir -p datadog/conf.d/
```

`postgres.yaml` というコンフィギュレーションファイルを作成し、ホスト、dbname、ユーザー名、パスワードを前のコマンドで取得した情報で置き換えます。

```yaml
   init_config:

   instances:
     ## @param host - 文字列 - 必須
     ## 接続するホスト名。
     ## 注: サーバー名が "localhost" でも、sock キーの値も提供されない限り
     ## Agent は TCP/IP を使用して PostgreSQL に接続。
     #
     - host: "<HOST>"

       ## @param port - 整数 - 必須
       ## PostgreSQL に接続する際に使用するポート。
       #
       port: 5432

       ## @param user - 文字列 - 必須
       ## PostgreSQL に接続するために作成された Datadog ユーザー名。
       #
       username: <USERNAME>

       ## @param pass - string - required
       ## Datadog ユーザーと関連付けられたパスワード。
       #
       password: "<PASSWORD>"

       ## @param dbname - 文字列 - オプション - デフォルト: postgres
       ## 監視する PostgresSQL データベースの名前。
       ## 注: 省略した場合、デフォルトのシステム postgres データベースがクエリされます。
       #
       dbname: "<DB_NAME>"

       ## @param ssl - 文字列 - オプション - デフォルト: false
       ## このオプションにより、セキュアな SSL TCP/IP 接続がサーバーとネゴシエーションするかどうかと、その
       ## 優先度が決定されます。6 つのモードがあります。
       ssl: 'true'
```

Heroku へのデプロイ:

```shell
# Heroku にデプロイ 
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

ビルドが完了すると、Datadog Agent が Postgres チェックを開始します。Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、Postgres チェックが正しく動作していることを確認します。以下のセクションをご参照ください。

```shell

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

    postgres (5.4.0)
    ----------------
      Instance ID: postgres:e07ef94b907fe733 [OK]
      Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 9
      Metric Samples: Last Run: 15, Total: 135
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 9
      Average Execution Time : 102ms
      Last Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
      Last Successful Execution Date : 2021-05-11 14:14:34 UTC (1620742474000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver


[...]
```

Postgres チェックが正しく実行されていることが確認できたら、[Metrics Summary][14] に表示される Postgres メトリクスを見ることができます。

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog メトリクスエクスプローラー" >}}

## トレース

Heroku Ruby アプリケーションから分散トレースを取得するには、インスツルメンテーションを有効にします。

```shell
# アプリケーションコードのあるフォルダーにいることを確認
cd ruby-getting-started
```

`Gemfile` を編集して `ddtrace` を追加します。

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

`bundle install` で gem をインストールします

```shell
bundle install
```

変更を確定し Heroku にプッシュする前に、アプリケーションに[統合タグ付け][15]を設定します。

```shell
# アプリケーションの環境を設定
heroku config:add DD_ENV=production -a $APPNAME

# アプリケーションのバージョンを設定
heroku config:add DD_VERSION=0.1 -a $APPNAME

# アプリケーションのサービスを設定
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

変更を確定し Heroku にプッシュします。

```shell
# Heroku にデプロイ 
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

ビルド中、トレーサーが Datadog APM Agent エンドポイントに到達できないというエラーメッセージを受信することがあります。ビルドプロセスの間は Datadog Agent がまだ起動していないため、これは正常の動作です。このようなメッセージは無視してください。

```
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

ビルドが完了したら、アプリケーションから Datadog へのトレースの送信が開始します。アプリケーションへのトラフィックの生成を開始（アプリケーションの /widgets ページにアクセスするなど）して、トレースの流れをよくすることができます。

Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、APM Agent が正しく動作しトレースを Datadog に送信していることを確認します。以下のセクションをご参照ください。

```shell
[...]

=========
APM Agent
=========
  Status: Running
  Pid: 54
  Uptime: 85 seconds
  Mem alloc: 13,971,888 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 43 (55,431 bytes)
      Spans received: 129

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:production': 100.0%

  Writer (previous minute)
  ========================
    Traces: 0 payloads, 0 traces, 0 events, 0 bytes
    Stats: 0 payloads, 0 stats buckets, 0 bytes

[...]
```

この出力は、APM Agent が正しく動作しトレースを Datadog に送信していることを示しています。

[APM traces セクション][16]へ移動すると、送信されてくるトレースが表示されています。

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Datadog の Ruby アプリケーショントレース" >}}

[Service list][17] では、アプリケーションのすべてのサービスとアプリケーションサービスビューを確認できます。

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog のサービスリストビュー" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog の Ruby アプリケーションサービスビュー" >}}

## ログ

次に、ログを有効化します。アプリケーションから Datadog へログを送信する方法には、2 種類のオプション（Heroku ログドレインをセットアップまたは Datadog Log Agent ディレクトリを使用）があります。それぞれの方法に利点と欠点があるのですが、両方を設定することも可能です。

ログドレインの難点は、現段階ではログをトレースに関連付けられないことですが、Datadog Agent を使用すれば可能です。

Datadog Agent を通じてログを送信することの難点は、Heroku システムログおよびルーターログが送信されないことです（ログドレインを使用すれば、これらを送信できます）。

### Heroku ログドレインのセットアップ

Heroku には、アプリケーションで実行しているすべての dynos からログを収集し Heroku へ送信するネイティブのログルーターがあります。ログには、アプリケーションログ、Heroku ルーターログ、Heroku システム dynos ログが含まれます。

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku ログビュー" >}}

Datadog へログを送信する 1 つ目の方法は、Heroku ログドレインをセットアップし、Heroku で受信した同じログを別のプラットフォームへルーティングする方法です。

ログドレインをセットアップする最大の利点は、Heroku システムログを Datadog へ送ることができる点です（dyno では直接送信できません）。難点は、ログとトレースを関連付けられないことです（Datadog Agent でログを送信する場合は可能）。

Heroku ログドレインをセットアップすると、dyno システムメトリクス（CPU、メモリ）を Datadog へ送ることも可能になります。

Heroku ログドレインをターミナルからセットアップするには、以下を実行します。

```shell
heroku drains:add "https://http-intake.logs.datadoghq.com/v1/input/$DD_API_KEY?ddsource=heroku&service=$APPNAME&host=$APPNAME" -a $APPNAME
```

dynos からシステムメトリクスを取得するには、ログドレインを有効化したうえで [log-runtime-metrics][18] も有効にします。

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# アプリケーションを再起動
heroku restart -a $APPNAME
```

ドレインがセットアップされると、Heroku ログが [Datadog のログセクション][19]に表示されます。

#### Heroku ルーターログからメトリクスを生成

アプリケーションにルーティングされたすべてのトラフィックは Heroku ルーターログを生成します。

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog の Heroku ルーターログ" >}}

このように、Heroku ルーターログは自動的にパースされます。Heroku インテグレーションログパイプラインで、`appname`、`dyno`、`dynotype` がタグとして抽出されます。

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku ログパイプライン" >}}

パースされたパラメーターに基づき、レイテンシーメトリクスを生成できます。

Logs -> Generate Metrics へ移動し「+ New Metric」ボタンをクリックします。

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="新しいログベースのメトリクス" >}}

クエリを `Source:heroku` として定義し、すべての Heroku ログをフィルタリングして、`Duration` メジャーを選択します。また、このメトリクスを `appname`、`dyno`、`dynotype`、`@http.status_code` 別にグループ化します。ログのパースで生成されたメトリクスはカスタムメトリクスと認識されます。Datadog では、アプリケーションにトラフィックを生成し新しいログエントリの流れを良くすることをおすすめしています。

最後に、新しいメトリクスに名前を付け、Create Metric をクリックします。

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="新しいログベースのメトリクスの作成" >}}

ルールを作成したら、新しいメトリクスが収集されるまで数分待ちます。「See in Metric Explorer」をクリックして新しいメトリクスを確認します。

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="ログベースの利用可能なメトリクス" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="メトリクスエクスプローラービュー" >}}

#### Heroku メトリクスログから Datadog メトリクスを生成

アプリケーションに [log-runtime-metrics][18] がセットアップされている場合、Heroku は各 dynos に対しシステムメトリクス付きのログエントリを生成します。

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Dyno メモリ使用量ログエントリ" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Dyno CPU 使用量ログエントリ" >}}

またこのログは、Heroku ログインテグレーションパイプラインにより自動的にパースされ、以下の `measures` を抽出します。

```
@heroku.cpu.1m
@heroku.cpu.5m
@heroku.cpu.15m
@heroku.memory.cache
@heroku.memory.quota
@heroku.memory.rss
@heroku.memory.swap
@heroku.memory.total
```

それぞれの値の意味については、[Heroku 公式ドキュメント][20]でご確認ください。

前のセクションで説明したのと同じ手順を実行してメトリクスを生成し、各メジャーを 15 か月間できます。

### Datadog Agent からログを送信

Datadog へログを送信するもう一つのオプションは、Heroku をログルーターとして使用せずに Datadog Agent で直接アプリケーションから Datadog へログを送信する方法です。Datadog Agent を使用してログを送信する利点は、Ruby インテグレーションを使用して自動的にログをパースし、ログとトレースの相関にアクセスできることです。

この方法では、アプリケーション（または Rails フレームワーク）により生成されたログのみが送信されます。Heroku システムログおよびルーターログは送信されません（これらのログは、前のセクションで説明したログドレインを使用すると送信できます）。

#### Rails ログの送信

まず、Logs Agent を有効にします。

```shell
# Datadog で Logs Agent を有効化
heroku config:add DD_LOGS_ENABLED=true -a $APPNAME
```

Rails ログを構成するには、Datadog では lograge の使用をおすすめしています。サンプルアプリケーションに設定しましょう。

```shell
# アプリケーションコードのあるフォルダーにいることを確認
cd ruby-getting-started
```

`Gemfile` を編集して `lograge` を追加します。

```ruby
gem 'lograge'
```

`bundle install` で gem をインストールします

```shell
bundle install
```

Lograge を構成します。新規ファイル `config/initializers/lograge.rb` を作成して、以下のコンテンツを追加します。

```ruby
Rails.application.configure do
  # Lograge コンフィグ
  config.lograge.enabled = true

  # JSON 形式でのログインを指定
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## ログ相関を無効化
  config.colorize_logging = false

  # 専用ファイルへログを作成
  config.lograge.logger = ActiveSupport::Logger.new(File.join(Rails.root, 'log', "#{Rails.env}.log"))

  # ログクエリパラメーターが必要な場合に有用
  config.lograge.custom_options = lambda do |event|
  { :ddsource => 'ruby',
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
  end
end
```

Datadog Agent をログインパスにポイントします。 
`datadog/conf.d` という名のプロジェクトのルートにフォルダーを作成します。

```shell
# アプリケーションコードのあるフォルダにいることを確認
cd ruby-getting-started

# アプリケーションコード内にコンフィギュレーションアプリケーションコード内にコンフィギュレーションフォルダーを作成
mkdir -p datadog/conf.d
```

そのフォルダ内に `ruby.yaml` という名のファイルを、以下の内容で作成します。

```yaml
logs:
  - type: file
    path: "/app/log/production.log"
    service: ruby
    source: ruby
    sourcecategory: sourcecode

```

Heroku へのデプロイ:

```shell
# Heroku にデプロイ
git add .
git commit -m "Add lograge"
git push heroku main
```

ビルドが完了したら、Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、Logs Agent が正しく動作しログを Datadog に送信していることを確認します。以下のセクションをご参照ください。

```shell
[...]

==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 390
    EncodedBytesSent: 298
    LogsProcessed: 1
    LogsSent: 1

  ruby
  ----
    - Type: file
      Path: /app/log/production.log
      Status: OK
      Inputs: /app/log/production.log
      BytesRead: 166
      Average Latency (ms): 0
      24h Average Latency (ms): 0
      Peak Latency (ms): 0
      24h Peak Latency (ms): 0
[...]
```

この出力は、Logs Agent が正しく動作し Ruby アプリケーションログを Datadog に送信していることを示しています。

[Datadog のログ][21]に移動し、`Source:ruby` でフィルタリングすると Rails ログを Datadog に表示できます。

{{< img src="agent/guide/heroku_ruby/ruby_logs.png" alt="アプリケーションにより生成されたログ" >}}

#### ログとトレースの相関

lograge の設定が完了したら、Rails アプリケーションから取得したログを、すでに生成しているトレースに相関付けることができます。

`config/initializers/lograge.rb` という名のファイルを編集し、`Rails.application.configure` セクションで以下のコンテンツをファイルに追加します。

```ruby
Rails.application.configure do
[...]

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
end
```

Heroku へのデプロイ:

```shell
# Heroku にデプロイ
git add .
git commit -m "Add log traces correlation"
git push heroku main
```

[Datadog でログ][22]に移動すると、新しい Rails ログに相関付けられたトレースが表示されています。

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="ログとトレースの相関" >}}

## Summary

このガイドでは、サンプル Rails アプリケーションを使用して Heroku にデプロイし、Datadog でインスツルメントしてメトリクス、dyno システムメトリクス、ログ、トレース、そしてインテグレーションの取得をセットアップしました。

他の Datadog インテグレーションとアプリケーションをインスツルメントするには、[インテグレーション用公式ドキュメント][23]内のコンフィギュレーションファイルを使用して、Postgres のインテグレーションに使用した手順を実行します。

## 付録: Datadog Agent ステータスの取得

Datadog Agent ステータスの取得は、Datadog Agent が正常に実行していることを確認し潜在的な問題をデバッグするための良い方法です。まず、`heroku ps:exec`s を使用して dyno 内へ SSH 接続します。

```shell
heroku ps:exec -a $APPNAME

# 認証情報を確立中... 完了
# ⬢ ruby-heroku-datadog で web.1 に接続中...
# DD_API_KEY 環境変数が設定されていません。実行: heroku config:add DD_API_KEY=<your API key>
#Datadog Agent が無効です。DISABLE_DATADOG_AGENT を未設定にするか、不足している環境変数を設定します。

~ $
```

`DD_API_KEY` が設定されていないという警告は無視できます。これは、[Heroku は SSH セッションにコンフィギュレーション変数を設定しません][24]が、Datadog Agent のプロセスはこれにアクセスできたためです。

SSH セッション内で Datadog ステータスコマンドを実行します。

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

  Status date: 2021-04-30 10:49:50.692 UTC (1619779790692)
  Agent start: 2021-04-30 10:32:54.713 UTC (1619778774713)
  Pid: 52
  Go Version: go1.14.12
  Python Version: 3.8.5
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 4
  Log File: /app/.apt/var/log/datadog/datadog.log
  Log Level: info

[...]
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://signup.heroku.com/
[3]: https://git-scm.com/downloads/
[4]: https://devcenter.heroku.com/articles/heroku-cli/
[5]: https://github.com/heroku/ruby-getting-started/
[6]: https://devcenter.heroku.com/articles/getting-started-with-ruby/
[7]: https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
[8]: https://app.datadoghq.com
[9]: https://app.datadoghq.com/account/settings#api
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/heroku/
[11]: https://devcenter.heroku.com/articles/buildpacks/
[12]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1
[13]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/heroku/#enabling-integrations
[14]: https://app.datadoghq.com/metric/summary?filter=postgresql
[15]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/
[16]: https://app.datadoghq.com/apm/traces
[17]: https://app.datadoghq.com/apm/services
[18]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[19]: https://app.datadoghq.com/logs/livetail
[20]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[21]: https://app.datadoghq.com/logs?cols=core_host%2Ccore_service&index=%2A&messageDisplay=inline&query=source%3Aruby&stream_sort=desc
[22]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[23]: https://docs.datadoghq.com/ja/integrations/
[24]: https://devcenter.heroku.com/articles/exec#environment-variables