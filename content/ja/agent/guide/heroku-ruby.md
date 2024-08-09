---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: ドキュメント
  text: Heroku ビルドパック
- link: /logs/guide/collect-heroku-logs
  tag: ドキュメント
  text: Heroku ログの収集
title: Datadog で Heroku の Ruby on Rails アプリケーションをインスツルメント
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

次に、Datadog Agent をアプリケーションにデプロイします。このガイドでは、[Datadog Heroku ビルドパック][10]を使用します。[Heroku ビルドパック][11]について、詳しくは公式ドキュメントでご確認ください。

```shell
# Heroku Labs Dyno Metadata を有効にして HEROKU_APP_NAME 環境変数を自動的に設定
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# メトリクスが連続するよう、Datadog でホスト名を appname.dynotype.dynonumber に設定
heroku config:add DD_DYNO_HOST=true

# Datadog サイトを設定 (例: us5.datadoghq.com)
heroku config:add DD_SITE=$DD_SITE

# このビルドパックを追加して Datadog API キーを設定
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# 強制的に再構築して Heroku をデプロイ
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

ビルドが完了すると、Datadog Agent がアプリケーションで動作します。Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、すべてが正しく動作していることを確認します。以下のセクションをご参照ください。

```bash
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

よく使われる Heroku のインテグレーションコンフィギュレーション例を以下に 4 つ挙げます。

### Postgres

Heroku は、アドオンを使用して Heroku にデプロイされるすべての Rails アプリケーションに Postgres データベースを追加します。アプリケーションで Postgres アドオンが有効になっていることを確認します。

 ```shell
heroku addons -a $APPNAME
```
次の出力が表示されます。


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

上記テーブルはアドオンと、現在のアプリ (ruby-heroku-datadog) または他のアプリへの添付を示します。
```

このアプリケーション例ではすでにコード内のデータベースを使用していますが、まだテーブルを作成していません。以下を実行してください。

```shell
heroku run rake db:migrate -a $APPNAME
```

```bash
Running `rake db:migrate` attached to terminal... up, run.3559
Migrating to CreateWidgets (20140707111715)
== 20140707111715 CreateWidgets: migrating ====================================
-- create_table(:widgets)
   -> 0.0244s
== 20140707111715 CreateWidgets: migrated (0.0247s) ===========================
```

これで、このデータベースを使用するアプリケーションの `/widgets` エンドポイントを確認できます。

Postgres Datadog のインテグレーションを有効にするには、Heroku からデータベースの認証情報を取得します。`psql` ターミナルから以下のコマンドを実行します

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Datadog ビルドパックを使用する場合、インテグレーションは特定の方法で有効化されます。インテグレーションの有効化方法については、[ビルドパックのドキュメント][13]を参照してください。

アプリケーションのルートに `datadog/conf.d` フォルダーを作成します。

```shell
cd ruby-getting-started
# アプリケーションコードで、インテグレーションコンフィギュレーションのフォルダーを作成
mkdir -p datadog/conf.d/
```

`postgres.yaml` というコンフィギュレーションファイルを作成し、ホスト、dbname、ユーザー名、パスワードを前のコマンドで取得した情報で置き換えます。

```yaml
init_config:

instances:
  - host: <YOUR HOSTNAME>
    port: <YOUR PORT>
    username: <YOUR USERNAME>
    password: <YOUR PASSWORD>
    dbname: <YOUR DBNAME>
    ssl: True
```

手動でコンフィギュレーションを更新する代わりに、[事前実行スクリプト][14]を使用して Heroku 環境変数に基づいて Postgres インテグレーションを設定し、Datadog Agent の起動前にそれらの値を置き換えることができます。

```bash
#!/usr/bin/env bash

# Heroku アプリケーションの環境変数を使用して、Postgres の構成を上記の設定から更新します
if [ -n "$DATABASE_URL" ]; then
  POSTGREGEX='^postgres://([^:]+):([^@]+)@([^:]+):([^/]+)/(.*)$'
  if [[ $DATABASE_URL =~ $POSTGREGEX ]]; then
    sed -i "s/<YOUR HOSTNAME>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR USERNAME>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
    sed -i "s/<YOUR DBNAME>/${BASH_REMATCH[5]}/" "$DD_CONF_DIR/conf.d/postgres.d/conf.yaml"
  fi
fi
```

Heroku へのデプロイ:

```shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

ビルドが完了すると、Datadog Agent が Postgres チェックを開始します。Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、Postgres チェックが正しく動作していることを確認します。以下のセクションをご参照ください。

```bash

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

Postgres チェックが正しく実行されていることが確認できたら、[Metrics Summary][15] に表示される Postgres メトリクスを見ることができます。

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog メトリクスエクスプローラー" >}}

### Redis

Redis の場合は、[Heroku Redis アドオン][16]を Heroku アプリケーションにアタッチします。

```shell
heroku addons:create heroku-redis:hobby-dev
```

Redis がアプリケーションに正常にアタッチされたことを確認するために、以下のコマンドを実行します。

 ```shell
heroku addons:info REDIS
```

以下のような出力が得られるはずです。

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

以下のコマンドを実行し、Heroku から認証情報を取得します。

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

アプリケーションのルートに `/datadog/conf.d/redisdb.yaml` という名前のコンフィギュレーションファイルを作成し、ホスト、ポート、パスワードを前のコマンドの情報に置き換えます。

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

手動でコンフィギュレーションを更新する代わりに、[事前実行スクリプト][14]を使用して Heroku 環境変数に基づいて Redis インテグレーションを設定し、Datadog Agent の起動前にそれらの値を置き換えることができます。

```bash
#!/usr/bin/env bash

# Heroku アプリケーションの環境変数を使用して、Redis の構成を上記の設定から更新します
if [ -n "$REDIS_URL" ]; then
  REDISREGEX='rediss?://([^:]*):([^@]+)@([^:]+):([^/]+)$'
  if [[ $REDIS_URL =~ $REDISREGEX ]]; then
    sed -i "s/<YOUR_REDIS_HOST>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
fi
```

Heroku へのデプロイ:

```shell
# Heroku にデプロイ
git add .
git commit -m "Enable redis integration"
git push heroku main
```

ビルドが終了すると、Datadog Agent が Redis チェックを開始します。[Datadog Agent のステータスを実行](#appendix-getting-the-datadog-agent-status)し、Redis チェックが正しく実行されていることを確認します。

次のような出力が表示されます。

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  redisdb (4.1.0)
  ---------------
    Instance ID: redisdb:eb3a3807075f89f0 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/redisdb.d/conf.yaml
    Total Runs: 3
    Metric Samples: Last Run: 45, Total: 135
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 3
    Average Execution Time : 6ms
    Last Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    Last Successful Execution Date : 2021-11-17 13:56:17 UTC (1637157377000)
    metadata:
      version.major: 6
      version.minor: 2
      version.patch: 3
      version.raw: 6.2.3
      version.scheme: semver

[...]

```

### Sidekiq

Sidekiq は、Ruby のバックグラウンド処理フレームワークです。Sidekiq Pro または Enterprise を使用している場合、Sidekiq 用の Datadog インテグレーションをインストールすることができます。

`dogstatsd-ruby` パッケージをインストールします。

```shell
gem install dogstatsd-ruby
```

イニシャライザで Sidekiq Pro のメトリクスコレクションを有効にします。

```ruby
    require 'datadog/statsd' # gem 'dogstatsd-ruby'

    Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

    Sidekiq.configure_server do |config|
      config.server_middleware do |chain|
        require 'sidekiq/middleware/server/statsd'
        chain.add Sidekiq::Middleware::Server::Statsd
      end
    end
```

Sidekiq Enterprise を使用していて、過去のメトリクスを収集したい場合は、以下を含めてください。

```ruby
      Sidekiq.configure_server do |config|
        # 履歴はデフォルトで 30 秒ごとに取得されます
        config.retain_history(30)
      end
```

[`datadog/prerun.sh`][14] スクリプトに以下を追加します。

```bash
cat << 'EOF' >> "$DATADOG_CONF"

dogstatsd_mapper_profiles:
  - name: sidekiq
    prefix: "sidekiq."
    mappings:
      - match: 'sidekiq\.sidekiq\.(.*)'
        match_type: "regex"
        name: "sidekiq.$1"
      - match: 'sidekiq\.jobs\.(.*)\.perform'
        name: "sidekiq.jobs.perform"
        match_type: "regex"
        tags:
          worker: "$1"
      - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
        name: "sidekiq.jobs.worker.$2"
        match_type: "regex"
        tags:
          worker: "$1"
EOF
```

Heroku へのデプロイ:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

ビルドが終了すると、Datadog Agent が Sidekiq チェックを開始します。[Datadog Agent のステータスを実行](#appendix-getting-the-datadog-agent-status)し、Sidekiq チェックが正しく実行されていることを確認します。

### Memcached

Memcached は、Rails アプリケーションで人気のある分散型メモリ・オブジェクト・キャッシュ・システムです。この例では、[Heroku Memcached Cloud アドオン][17]を Heroku アプリケーションにアタッチしています。

```shell
heroku addons:create memcachedcloud:30
```

Memcached がアプリケーションに正常にアタッチされたことを確認するために、以下のコマンドを実行します。

```shell
heroku addons | grep -A2 memcachedcloud
```

次のような出力が表示されます。

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

以下を実行して、Heroku から認証情報を取得します。

```shell
heroku config | grep MEMCACHEDCLOUD
```

アプリケーションのルートに `/datadog/conf.d/mcache.yaml` という名前のコンフィギュレーションファイルを作成し、ホスト、ポート、ユーザー名、パスワードを前のコマンドの情報に置き換えます。

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

手動でコンフィギュレーションを更新する代わりに、[事前実行スクリプト][14]を使用して Heroku 環境変数に基づいて Memcached インテグレーションを設定し、Datadog Agent の起動前にそれらの値を置き換えることができます。

```bash
#!/usr/bin/env bash

# Heroku アプリケーションの環境変数を使用して、Memcached の構成を上記の設定から更新します
if [ -n "$MEMCACHEDCLOUD_SERVERS" ]; then
  MCACHEREGEX='([^:]+):([^/]+)$'
  if [[ $MEMCACHEDCLOUD_SERVERS =~ $MCACHEREGEX ]]; then
    sed -i "s/<YOUR_MCACHE_HOST>/${BASH_REMATCH[1]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
    sed -i "s/<YOUR_MCACHE_PORT>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  fi
  sed -i "s/<YOUR_MCACHE_USERNAME>/${MEMCACHEDCLOUD_USERNAME}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
  sed -i "s/<YOUR_MCACHE_PASSWORD>/${MEMCACHEDCLOUD_PASSWORD}/" "$DD_CONF_DIR/conf.d/mcache.d/conf.yaml"
fi
```

Heroku へのデプロイ:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

ビルドが終了すると、Datadog Agent が Memcached チェックを開始します。[Datadog Agent のステータスを実行](#appendix-getting-the-datadog-agent-status)し、Memcached チェックが正しく実行されていることを確認します。

次のような出力が表示されます。

```bash

[...]

=========
Collector
=========

  Running Checks
  ==============

[...]

  mcache (2.0.0)
  --------------
    Instance ID: mcache:ca47ee7a0c236107 [OK]
    Configuration Source: file:/app/.apt/etc/datadog-agent/conf.d/mcache.d/conf.yaml
    Total Runs: 2
    Metric Samples: Last Run: 27, Total: 54
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 2
    Average Execution Time : 9ms
    Last Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    Last Successful Execution Date : 2021-11-18 12:28:45 UTC (1637238525000)
    metadata:
      version.major: 1
      version.minor: 4
      version.patch: 17
      version.raw: 1.4.17
      version.scheme: semver

[...]

```
## トレース

Heroku Ruby アプリケーションから分散トレースを取得するには、インスツルメンテーションを有効にします。

アプリケーションコードのあるフォルダーにいることを確認します。

```shell
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

変更を確定し Heroku にプッシュする前に、アプリケーションに[統合タグ付け][18]を設定します。

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
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

ビルド中、トレーサーが Datadog APM Agent エンドポイントに到達できないというエラーメッセージが表示されることがあります。ビルドプロセスの間は Datadog Agent がまだ起動していないため、これは正常の動作です。このようなメッセージは無視してください。

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

ビルドが完了したら、アプリケーションが Datadog へトレースを送信します。アプリケーションへのトラフィックの生成を開始（アプリケーションの /widgets ページにアクセスするなど）して、トレースの流れをよくすることができます。

Datadog Agent のステータスを、[付録セクション](#appendix-getting-the-datadog-agent-status) で説明されているとおりに実行し、APM Agent が正しく動作しトレースを Datadog に送信していることを確認します。以下のセクションをご参照ください。

```bash
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

[APM traces セクション][19]へ移動し、トレースを確認します。

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Datadog の Ruby アプリケーショントレース" >}}

[サービスカタログ][20] では、アプリケーションのすべてのサービスとアプリケーションサービスビューを確認できます。

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog のサービスカタログ" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog の Ruby アプリケーションサービス詳細ページ" >}}

## ログ管理

次に、Heroku ログドレインの設定により、ログを有効にします。

ログドレインを使用する場合、すべてのログが同じ `ddsource` (通常は `heroku` ) から Datadog に届くため、Heroku 以外のインテグレーションを使ったログの自動パースが行われません。

### Rails のログを生成する

Rails のログを構成するために、Datadog は Lograge の使用を推奨しています。このサンプルアプリケーションでは、ログとトレースが相関するように設定します。

アプリケーションコードのあるフォルダーにいることを確認します。
```shell
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

Lograge を構成するには、`config/initializers/lograge.rb` という名前のファイルを作成し、以下を追加します。

```ruby
Rails.application.configure do
  # Lograge 構成
  config.lograge.enabled = true

  # JSON 形式でログを記録することを指定します
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## ログのカラーリングを無効にします
  config.colorize_logging = false

  # STDOUT へのログ出力
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # 現在のスレッドのトレース情報を取得します
    correlation = Datadog::Tracing.correlation

    {
      # ログ出力にタグとして ID を追加します
      :dd => {
        # JSON シリアライズ時に精度を保つため、大きな数値には文字列を使用します
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
git add .
git commit -m "Add lograge"
git push heroku main
```

### Heroku ログドレインのセットアップ

Heroku にはログドレインというネイティブのログルーターがあり、アプリケーションで動作しているすべてのダイノからログを収集し、Heroku に送信しています。このログには、アプリケーションのログ、Heroku ルーターのログ、Heroku システムのダイノのログが含まれます。これらのログを Datadog にルーティングするようにログドレインを設定することができます。ログドレインは、`ddsource=heroku` から Datadog に Heroku システムログを送信します。

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku ログビュー" >}}

Heroku ログドレインをセットアップすると、dyno システムメトリクス（CPU、メモリ）を Datadog へ送ることも可能になります。

Heroku ログドレインをターミナルからセットアップするには、以下を実行します。

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # 例: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

dynos からシステムメトリクスを取得するには、ログドレインを有効化したうえで [log-runtime-metrics][21] も有効にします。

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# アプリケーションを再起動
heroku restart -a $APPNAME
```

ドレインがセットアップされると、Heroku ログが [Datadog のログセクション][22]に表示されます。

#### Heroku ルーターログからメトリクスを生成

アプリケーションにルーティングされたすべてのトラフィックは Heroku ルーターログを生成します。

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog の Heroku ルーターログ" >}}

このように、Heroku ルーターログは自動的にパースされます。Heroku インテグレーションログパイプラインで、`appname`、`dyno`、`dynotype` がタグとして抽出されます。

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku ログパイプライン" >}}

パースされたパラメーターに基づき、レイテンシーメトリクスを生成できます。

Logs -> Generate Metrics へ移動し "+ New Metric" ボタンをクリックします。

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="新しいログベースのメトリクス" >}}

クエリを `Source:heroku` として定義し、すべての Heroku ログをフィルタリングして、`Duration` メジャーを選択します。また、このメトリクスを `appname`、`dyno`、`dynotype`、`@http.status_code` 別にグループ化します。ログのパースで生成されたメトリクスはカスタムメトリクスと認識されます。Datadog では、アプリケーションにトラフィックを生成し新しいログエントリの流れを良くすることをおすすめしています。

最後に、メトリクスの名前を追加して、**Create Metric** をクリックします。

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="新しいログベースのメトリクスの作成" >}}

ルールを作成したら、新しいメトリクスが収集されるまで数分待ちます。"See in Metric Explorer" をクリックして新しいメトリクスを確認します。

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="ログベースの利用可能なメトリクス" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="メトリクスエクスプローラービュー" >}}

#### Heroku メトリクスログから Datadog メトリクスを生成

アプリケーションに [log-runtime-metrics][21] がセットアップされている場合、Heroku は各 dynos に対しシステムメトリクス付きのログエントリを生成します。

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

それぞれの値の意味については、公式の [Heroku ドキュメント][23]でご確認ください。

前のセクションで説明したのと同じ手順を実行してメトリクスを生成し、各メジャーを 15 か月間できます。

#### ログとトレースの相関

上記の構成方法に従うと、Heroku ログドレインから送信されるログはトレースと相関します。

<div class="alert alert-info">
<strong>注</strong>: Heroku のルーターやシステムログは Heroku が生成しており、トレースと相関させることは不可能です。
</div>

[ログビュー][24]に移動して、Rails アプリケーションのログにその相関トレースがあることを確認することで、構成が成功したことを確認することができます。

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="ログとトレースの相関" >}}

## Summary

このガイドでは、サンプル Rails アプリケーションを使用して Heroku にデプロイし、Datadog でインスツルメントしてメトリクス、dyno システムメトリクス、ログ、トレース、そしてインテグレーションの取得をセットアップしました。

他の Datadog インテグレーションとアプリケーションをインスツルメントするには、公式の[インテグレーション用ドキュメント][25]内のコンフィギュレーションファイルを使用して、Postgres のインテグレーションに使用した手順を実行します。

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

`DD_API_KEY` が設定されていないという警告は無視できます。これは、[Heroku は SSH セッションにコンフィギュレーション変数を設定しません][26]が、Datadog Agent のプロセスはこれにアクセスできたためです。

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
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/heroku/
[11]: https://devcenter.heroku.com/articles/buildpacks/
[12]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1
[13]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/heroku/#enabling-integrations
[14]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/heroku/#prerun-script
[15]: https://app.datadoghq.com/metric/summary?filter=postgresql
[16]: https://elements.heroku.com/addons/heroku-redis
[17]: https://elements.heroku.com/addons/memcachedcloud
[18]: https://docs.datadoghq.com/ja/getting_started/tagging/unified_service_tagging/
[19]: https://app.datadoghq.com/apm/traces
[20]: https://app.datadoghq.com/services
[21]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[22]: https://app.datadoghq.com/logs/livetail
[23]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[24]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[25]: https://docs.datadoghq.com/ja/integrations/
[26]: https://devcenter.heroku.com/articles/exec#environment-variables