---
description: Datadog を使用して Heroku 上の Ruby on Rails アプリケーションのデプロイとインスツルメントを行い、メトリクス、ログ、トレース、インテグレーションデータを収集するためのステップバイステップガイド。
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: ドキュメント
  text: Heroku Buildpack
- link: /logs/guide/collect-heroku-logs
  tag: ドキュメント
  text: Heroku ログの収集
title: Datadog で Heroku の Ruby on Rails アプリケーションをインスツルメント
---
Heroku は、Ruby 開発者、特に Ruby on Rails 開発者の間で人気の高いプラットフォームです。Datadog は Heroku と Ruby をサポートしているため、Heroku 上の Ruby アプリケーションのメトリクス、ログ、トレースを Datadog に送信できます。

このガイドでは、Heroku にデプロイされた Rails アプリケーションからメトリクス、インテグレーションデータ、ログ、トレースを Datadog に送信するために必要な手順を説明します。

## 前提条件 {#prerequisites}

このガイドでは、以下を前提としています。

* Datadog アカウントを既にお持ちであること。お持ちでない場合は、[無料トライアルにサインアップ][1]できます。
* Heroku アカウントを既にお持ちであること。お持ちでない場合は、[無料プランにサインアップ][2]できます。
* ローカルシステムに [Git][3] がインストールされていること。
* ローカルシステムに [Heroku CLI ツール][4]がインストールされていること。

## Heroku アプリケーションの作成とサンプル Ruby アプリケーションのデプロイ{#creating-your-heroku-application-and-deploying-the-sample-ruby-application}

このガイドでは、[Heroku の Rails サンプルアプリケーション][5]を使用します。これは、Heroku への Ruby アプリケーションのデプロイ方法を詳しく説明する[Starting With Ruby の記事][6]に沿った、最小限の Rails アプリケーションです。このガイドでは、Datadog を使用した Rails アプリケーションのインスツルメントに焦点を当てます。

サンプルアプリケーションには pg への依存関係があり、これは [Postgres がローカルにインストールされている][7]場合にのみ解決されます。先に進む前に Postgres をインストールしてください。
`psql` コマンドを実行して、Postgres が正常にインストールされていることを確認できます。以下のような出力が返されます。

```shell
which psql
/usr/local/bin/psql
```

サンプルアプリケーションからコードを取得し、そのまま新しい Heroku アプリケーションにデプロイします。

```shell
# Decide a name for your application and export it as an environment variable
# (In this case, the name is ruby-heroku-datadog)
export APPNAME=ruby-heroku-datadog

# Get the sample application code
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started

# Login into Heroku
heroku login

# Create a new application
heroku create -a $APPNAME

# Deploy to Heroku
git push heroku main

# Open the application to check that it works
heroku open -a $APPNAME
```

デフォルトのブラウザが開き、サンプルアプリケーションが表示されます。次のような UI が表示されます。

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby サンプルアプリケーション" >}}

## Datadog アカウントをアプリケーションに接続し、Datadog Agent をデプロイする{#connecting-your-datadog-account-to-your-application-and-deploying-the-datadog-agent}

Datadog を使用して Heroku アプリケーションの完全な監視可能性を得るための最初のステップは、Datadog Agent をデプロイし、それを Datadog アカウントに接続することです。

Datadog がアカウントを識別するには API キーを使用します。[Datadog アカウントにログイン][8]し、[API キーのセクション][9]に移動します。API キーをコピーします。

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API キーセクション" >}}

次に、Datadog Agent をアプリケーションにデプロイします。このガイドでは、[Datadog Heroku Buildpack][10] を使用します。[Heroku Buildpacks][11] の詳細とその機能については、公式ドキュメントを参照してください。

```shell
# Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
heroku config:add DD_DYNO_HOST=true

# Set your Datadog site (for example, us5.datadoghq.com) 
heroku config:add DD_SITE=$DD_SITE

# Add this buildpack and set your Datadog API key
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Deploy to Heroku forcing a rebuild
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

ビルドが完了すると、Datadog Agent がアプリケーション内で実行されます。すべてが正しく動作していることを確認するため、[付録セクション](#appendix-getting-the-datadog-agent-status)の説明に従って Datadog Agent の status コマンドを実行します。以下のセクションを確認してください。

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

この出力は、Datadog Agent が Heroku アプリケーション内で実行されており、Datadog アカウントに正常にリンクされていることを示しています。

[Datadog の Host Map][12] を開くと、dyno が Datadog に正しくレポートしていることを確認できます。

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog Host Map" >}}

## インテグレーションの設定{#setting-up-integrations}

Datadog には、さまざまな技術スタックからメトリクスを収集する、すぐに使用できるインテグレーションが 400 以上用意されています。Datadog buildpack を使用すると、Heroku アプリケーションでこれらのインテグレーションを有効にできます。

よく使用される Heroku インテグレーションの構成例を 4 つ以下に示します。

### Postgres {#postgres}

Heroku は、Heroku にデプロイされるすべての Rails アプリケーションに対して、アドオンを通じて Postgres データベースを追加します。アプリケーションで Postgres アドオンが有効になっていることを確認します。

 ```shell
heroku addons -a $APPNAME

```
You should get the following output:


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

Your example application already uses that database in its code, but you haven't created the tables yet, run:

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

After, you can successfully see the `/widgets` endpoint of your application, which uses that database.

To enable the Postgres Datadog integration, retrieve the database credentials from Heroku. Run the following command from the `psql` terminal

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Integrations are enabled in a particular way when using the Datadog buildpack. You can learn how to enable any of the integrations in the [buildpack documentation][13].

Create a `datadog/conf.d` folder at the root of your application:

```shell
cd ruby-getting-started
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

Create a configuration file called `postgres.yaml` replacing with your host, dbname, username, and password with the information you got in the previous command:

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

Instead of manually updating the configuration, you can set up your Postgres integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Postgres configuration from above using the Heroku application environment variable
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

Deploy to Heroku:

```shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Postgres check. Run the Datadog Agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the Postgres check is running correctly. You should look out for the following section:

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

After you have checked that the Postgres check is running correctly, you can start looking at the Postgres metrics available on the [Metrics Catalog][15] page:

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog Metrics Explorer" >}}

### Redis {#redis}

Redis の場合は、[Heroku Redis アドオン][16]を Heroku アプリケーションにアタッチします。

```shell
heroku addons:create heroku-redis:hobby-dev
```

Redis がアプリケーションに正常にアタッチされたことを確認するには、次のコマンドを実行します。

 ```shell
heroku addons:info REDIS

```

You should get an output similar to the following:

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

Retrieve the credentials from Heroku by running the following command:

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

Create a configuration file named `/datadog/conf.d/redisdb.yaml` at the root of your application to replace your host, port, and password with information from the previous command:

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

Instead of manually updating the configuration, you can set up your Redis integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Redis configuration from above using the Heroku application environment variable
if [ -n "$REDIS_URL" ]; then
  REDISREGEX='rediss?://([^:]*):([^@]+)@([^:]+):([^/]+)$'
  if [[ $REDIS_URL =~ $REDISREGEX ]]; then
    sed -i "s/<YOUR_REDIS_HOST>/${BASH_REMATCH[3]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PASSWORD>/${BASH_REMATCH[2]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
    sed -i "s/<YOUR_REDIS_PORT>/${BASH_REMATCH[4]}/" "$DD_CONF_DIR/conf.d/redisdb.d/conf.yaml"
  fi
fi
```

Deploy to Heroku:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Redis check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Redis check is running correctly.

The following output displays:

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

Sidekiq is a background processing framework for Ruby. If you are using Sidekiq Pro or Enterprise, you can install the Datadog integration for Sidekiq.

Install the `dogstatsd-ruby` package:

```shell
gem install dogstatsd-ruby
```

Enable Sidekiq Pro metric collection in your initializer:

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

If you are using Sidekiq Enterprise and want to collect historical metrics, include the following:

```ruby
      Sidekiq.configure_server do |config|
        # history is captured every 30 seconds by default
        config.retain_history(30)
      end
```

Add the following to your [`datadog/prerun.sh`][14] script:

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

Deploy to Heroku:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Sidekiq check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Sidekiq check is running correctly.

### Memcached 

Memcached is a distributed memory object caching system that is popular in Rails applications. In this example, you can attach the [Heroku Memcached Cloud add on][17] to your Heroku application:

```shell
heroku addons:create memcachedcloud:30
```

To check that Memcached has been successfully attached to your application, run the following command:

```shell
heroku addons | grep -A2 memcachedcloud
```

The following output displays:

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

Retrieve the credentials from Heroku by running the following:

```shell
heroku config | grep MEMCACHEDCLOUD
```

Create a configuration file named `/datadog/conf.d/mcache.yaml` at the root of your application to replace your host, port, username, and password with information from the previous command:

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

Instead of manually updating the configuration, you can set up your Memcached integration based on Heroku environment variables using the [prerun script][14] to replace those values before starting the Datadog Agent:

```bash
#!/usr/bin/env bash

# Update the Memcached configuration from above using the Heroku application environment variable
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

Deploy to Heroku:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

Once the build finishes, the Datadog Agent starts the Memcached check. [Run the Datadog Agent status](#appendix-getting-the-datadog-agent-status) to make sure the Memcached check is running correctly.

The following output displays:

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
## Traces 

To get distributed tracing from your Heroku Ruby application, enable instrumentation.

Ensure that you are in the folder with the application code:

```shell
cd ruby-getting-started
```

Edit your `Gemfile` and add the `ddtrace`:

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

Install the gem with `bundle install`:

```shell
bundle install
```

Before committing the changes and pushing to Heroku, set [Unified Tagging][18] for the application:

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

Commit your changes and push to Heroku:

```shell
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

During the build, error messages are displayed about the tracer not being able to reach the Datadog APM Agent endpoint. This is normal, as during the build process, the Datadog Agent hasn't started yet. You can ignore these messages:

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

Once the build finishes, your application sends traces to Datadog. You can start generating traffic to your application (for example, by visiting the /widgets page of your application) to get a good flow of traces.

Run the Datadog Agent status as explained in the [appendix section](#appendix-getting-the-datadog-agent-status) to make sure the APM agent is running correctly and sending traces to Datadog. You should look out for the following section:

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

That output shows that the APM Agent is running correctly and sending traces to Datadog.

Navigate to the [APM traces section][19] to see your traces:

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Datadog での Ruby アプリケーションのトレース" >}}

[Catalog][20] に移動して、すべてのアプリケーションサービスとアプリケーションサービスビューを確認します。

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog の Catalog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog の Ruby アプリケーションサービス詳細ページ" >}}

## ログ {#logs}

次に、Heroku ログドレインを設定してログを有効にします。

ログドレインを使用する場合、すべてのログは同じ `ddsource` (通常は `heroku`) から Datadog に送信されるため、Heroku 以外のインテグレーションを使用したログの自動パースは行われません。

### Rails ログの生成{#generating-your-rails-logs}

Rails ログの構成には、Datadog は Lograge の使用を推奨します。このサンプルアプリケーションでは、ログとトレースが関連付けられるように設定します。

アプリケーションコードが含まれるフォルダーにいることを確認します。

```shell
cd ruby-getting-started
```

`Gemfile` を編集し、`lograge` を追加します。

```ruby
gem 'lograge'
```

`bundle install` を使用して gem をインストールします。

```shell
bundle install
```

Lograge を構成するには、`config/initializers/lograge.rb` という名前のファイルを作成し、以下を追加します。

```ruby
Rails.application.configure do
  # Lograge config
  config.lograge.enabled = true

  # This specifies to log in JSON format
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## Disables log coloration
  config.colorize_logging = false

  # Log to STDOUT
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # Retrieves trace information for current thread
    correlation = Datadog::Tracing.correlation

    {
      # Adds IDs as tags to log output
      :dd => {
        # To preserve precision during JSON serialization, use strings for large numbers
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

Heroku にデプロイします。

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### Heroku ログドレインのセットアップ{#setting-up-heroku-log-drain}

Heroku にはログドレインと呼ばれるネイティブのログルーターがあり、アプリケーションで実行されているすべての dyno からログを収集し、Heroku に送信します。ログには、アプリケーションログ、Heroku ルーターログ、Heroku システム dyno ログが含まれます。ログドレインを設定して、これらのログを Datadog にルーティングできます。ログドレインは、`ddsource=heroku` から Heroku システムログを Datadog に送信します。

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku ログビュー" >}}

Heroku ログドレインを設定すると、dyno のシステムメトリクス (CPU、メモリ) を Datadog に取り込むこともできます。

ターミナルから Heroku ログドレインを設定するには、以下を実行します。

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

dyno からシステムメトリクスを取得するには、ログドレインの有効化に加えて [log-runtime-metrics][21] も有効にします。

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

ドレインの設定が完了すると、Heroku ログが [Datadog のログセクション][22]に表示されます。

#### Heroku ルーターログからのメトリクス生成{#generating-metrics-from-heroku-router-logs}

アプリケーションにルーティングされるすべてのトラフィックにより、Heroku ルーターログが生成されます。

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog での Heroku ルーターログ" >}}

ご覧のように、Heroku ルーターログは自動的にパースされます。Heroku インテグレーションのログパイプラインにより、`appname`、`dyno`、および `dynotype` がタグとして抽出されます。

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku ログパイプライン" >}}

パースされたこれらのパラメーターに基づいて、レイテンシーメトリクスを生成できます。

{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}} に移動し、{{< ui >}}\+ New Metric{{< /ui >}} ボタンをクリックします。

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="新しいログベースのメトリクス" >}}

すべての Heroku ログをフィルタリングするために、クエリを `Source:heroku` として定義します。`Duration` メジャーを選択します。また、そのメトリクスを `appname`、`dyno`、`dynotype`、および `@http.status_code` でグループ化できるようにします。ログのパースによって生成されたメトリクスは、Custom Metrics と見なされることに注意してください。Datadog は、新しいログエントリがスムーズに送られるよう、アプリケーションへのトラフィックを生成することを推奨しています。

最後に、メトリクスに名前を追加し、{{< ui >}}Create Metric{{< /ui >}} をクリックします。

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="新しいログベースのメトリクスの作成" >}}

ルールが作成されたら、新しいメトリクスが収集されるまで数分間待ちます。次に、{{< ui >}}See in Metric Explorer{{< /ui >}} をクリックして、新しいメトリクスを確認します。

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="利用可能なログベースのメトリクス" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Metrics Explorer ビュー" >}}

#### Heroku メトリクスログからの Datadog メトリクス生成{#generating-datadog-metrics-from-heroku-metric-logs}

アプリケーションに対して [log-runtime-metrics][21] が設定されている場合、Heroku は各 dyno のシステムメトリクスを含むログエントリを生成します。

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="dyno のメモリ使用量ログエントリ" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="dyno の CPU 使用量ログエントリ" >}}

これらのログも Heroku ログインテグレーションパイプラインによって自動的にパースされ、以下の `measures` が抽出されます。

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

これらの各値の意味については、公式の [Heroku ドキュメント][23]を参照してください。

前のセクションで説明したのと同じ手順に従い、これらの各メジャーに対して 15 か月間保持されるメトリクスを生成します。

#### ログとトレースの関連付け{#correlating-logs-and-traces}

上記の構成手順に従うと、Heroku ログドレインから送信されたログがトレースと関連付けられます。

<div class="alert alert-info">
<strong>注 </strong>: Heroku ルーターおよびシステムログは Heroku によって生成されるため、トレースと関連付けることはできません。
</div>

[ログビュー][24]に移動して Rails アプリケーションのログに関連付けられたトレースが存在することを確認すれば、構成が成功したかどうかを確認できます。

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="ログとトレースの関連付け" >}}

## 概要 {#summary}

このガイドでは、サンプル Rails アプリケーションを Heroku にデプロイし、Datadog で計装して、メトリクス、dyno のシステムメトリクス、ログ、トレース、インテグレーションをセットアップしました。

他の Datadog インテグレーションを使用してアプリケーションの計装を続けるには、公式の[インテグレーションドキュメント][25]に記載された構成ファイルを使用し、Postgres インテグレーションと同じ手順に従います。

## 付録: Datadog Agent ステータスの取得 {#appendix-getting-the-datadog-agent-status}

Datadog Agent のステータスを取得することは、Datadog Agent が正しく実行されていることを確認し、潜在的な問題をデバッグするための優れた方法です。まず、`heroku ps:exec` を使用して dyno に SSH 接続します。

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

`DD_API_KEY` が設定されていないという警告は無視してかまいません。これは正常な動作です。その理由は [Heroku は SSH セッション自体に対して構成変数を設定しない][26]ためですが、Datadog Agent プロセスはそれらにアクセスできています。

SSH セッションに入ったら、Datadog のステータスコマンドを実行します。

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

## 参考資料 {#further-reading}

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
[15]: https://app.datadoghq.com/metric/catalog?filter=postgresql
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