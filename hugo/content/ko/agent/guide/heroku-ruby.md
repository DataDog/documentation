---
description: 메트릭, 로그, 트레이스 및 통합 데이터를 수집하기 위해 Heroku에서 Datadog을 사용하여 Ruby on Rails
  애플리케이션을 배포하고 계측하는 단계별 가이드입니다.
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: 문서
  text: Heroku 빌드팩
- link: /logs/guide/collect-heroku-logs
  tag: 문서
  text: Heroku 로그 수집
title: Heroku에서 Datadog으로 Ruby on Rails 애플리케이션 계측
---
Heroku는 Ruby 개발자, 특히 Ruby on Rails 개발자 사이에서 인기 있는 플랫폼입니다. Datadog은 Heroku와 Ruby를 지원하므로 Heroku Ruby 애플리케이션 메트릭, 로그 및 트레이스를 Datadog으로 보낼 수 있습니다.

이 가이드는 Heroku에 배포된 Rails 애플리케이션의 메트릭, Integrations 데이터, 로그 및 트레이스를 Datadog으로 보내는 데 필요한 단계를 안내합니다.

## 전제 조건 {#prerequisites}

이 가이드에서는 다음과 같이 가정합니다.

* 이미 Datadog 계정이 있습니다. 계정이 없다면 [무료 체험판에 가입][1]할 수 있습니다.
* 이미 Heroku 계정이 있습니다. 계정이 없다면 [무료 티어에 가입][2]할 수 있습니다.
* 로컬 시스템에 [Git][3]이 설치되어 있습니다.
* 로컬 시스템에 [Heroku CLI 도구][4]가 설치되어 있습니다.

## Heroku 애플리케이션 생성 및 샘플 Ruby 애플리케이션 배포 {#creating-your-heroku-application-and-deploying-the-sample-ruby-application}

이 가이드에서는 [Heroku의 Rails 샘플 애플리케이션][5]을 사용합니다. 이 샘플은 Heroku에 Ruby 애플리케이션을 배포하는 방법에 대한 자세한 정보가 나와 있는 [Ruby로 시작 문서][6]가 함께 제공되는 기본 Rails 애플리케이션입니다. 이 가이드는 Datadog을 사용하여 Rails 애플리케이션 계측에 대해 중점적으로 설명합니다.

샘플 애플리케이션에는 [Postgres가 로컬에 설치][7]되어 있어야만 해결할 수 있는 pg 종속성이 있습니다. 진행하기 전에 Postgres를 설치하세요.
`psql` 명령을 실행하여 Postgres가 성공적으로 설치되었는지 확인할 수 있습니다. 다음과 유사한 출력이 반환됩니다.

```shell
which psql
/usr/local/bin/psql
```

샘플 애플리케이션의 코드를 가져와 그대로 새 Heroku 애플리케이션에 배포합니다.

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

기본 브라우저가 열리고 샘플 애플리케이션이 표시됩니다. 다음과 유사한 UI가 표시되어야 합니다.

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby 샘플 애플리케이션" >}}

## Datadog 계정을 애플리케이션에 연결하고 Datadog Agent 배포 {#connecting-your-datadog-account-to-your-application-and-deploying-the-datadog-agent}

Datadog을 사용하여 Heroku 애플리케이션에 대한 전체 관측 가능성을 확보하는 첫 번째 단계는 Datadog Agent를 배포한 후 Datadog 계정에 연결하는 것입니다.

Datadog이 계정을 식별하는 방법은 API 키를 사용하는 것입니다. [Datadog 계정에 로그인][8]한 후 [API 키 섹션][9]으로 이동합니다. API 키를 복사합니다.

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API 키 섹션" >}}

다음으로 애플리케이션에 Datadog Agent를 배포합니다. 이 가이드에서는 [Datadog Heroku 빌드팩][10]을 사용합니다. [Heroku 빌드팩][11]과 그 기능에 대한 자세한 내용은 공식 문서에서 확인할 수 있습니다.

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

빌드가 완료되면 Datadog Agent가 애플리케이션에서 실행됩니다. 모두 올바르게 실행되는지 확인하려면 [부록 섹션](#appendix-getting-the-datadog-agent-status)에 설명된 대로 Datadog Agent 상태 확인 명령을 실행하세요. 다음 섹션을 확인해야 합니다.

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

이 출력은 Datadog Agent가 Heroku 애플리케이션에서 실행 중이며 Datadog 계정에 성공적으로 연결되었음을 나타냅니다.

[Datadog의 호스트 맵][12]을 열면 dyno가 Datadog에 올바르게 보고하고 있음을 확인할 수 있습니다.

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog 호스트 맵" >}}

## 통합 설정 {#setting-up-integrations}

Datadog은 다양한 기술 스택에서 메트릭을 수집하는 400개가 넘는 턴키 통합을 제공합니다. Datadog 빌드팩을 사용하면 Heroku 애플리케이션에 이러한 통합을 활성화할 수 있습니다.

아래에는 자주 사용되는 4가지 Heroku 통합 구성 예시가 나열되어 있습니다.

### Postgres {#postgres}

Heroku는 Heroku에 배포되는 모든 Rails 애플리케이션에 대해 애드온을 통해 Postgres 데이터베이스를 추가합니다. 애플리케이션에 Postgres 애드온이 활성화되어 있는지 확인하세요.

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

Redis의 경우 [Heroku Redis 애드온][16]을 Heroku 애플리케이션에 연결합니다.

```shell
heroku addons:create heroku-redis:hobby-dev
```

Redis가 애플리케이션에 성공적으로 연결되었는지 확인하려면 다음 명령을 실행하세요.

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

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Datadog의 Ruby 애플리케이션 트레이스" >}}

[Catalog][20]로 이동하여 모든 애플리케이션 서비스와 애플리케이션 서비스 뷰를 확인하세요.

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog의 카탈로그" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog의 Ruby 애플리케이션 서비스 세부 정보 페이지" >}}

## 로그 {#logs}

다음으로 Heroku 로그 드레인을 설정하여 로그를 활성화합니다.

로그 드레인을 사용하면 모든 로그가 동일한 `ddsource`(일반적으로 `heroku`)에서 Datadog에 도착하므로 Heroku 이외의 Integrations를 통한 자동 로그 구문 분석은 수행되지 않습니다.

### Rails 로그 생성 {#generating-your-rails-logs}

Rails 로그를 구성하려면 Lograge를 사용하는 것이 좋습니다. 이 샘플 애플리케이션에서는 로그와 트레이스가 서로 연결되도록 설정하세요.

애플리케이션 코드가 있는 폴더에서 작업 중인지 확인하세요.

```shell
cd ruby-getting-started
```

`Gemfile`을 편집하고 `lograge`를 추가합니다.

```ruby
gem 'lograge'
```

`bundle install` 명령을 사용하여 gem을 설치합니다.

```shell
bundle install
```

Lograge를 구성하려면 `config/initializers/lograge.rb`이라는 파일을 만들고 다음 내용을 추가합니다.

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

Heroku에 배포합니다.

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### Heroku 로그 드레인 설정 {#setting-up-heroku-log-drain}

Heroku에는 로그 드레인이라는 기본 로그 라우터가 있으며, 이 라우터는 애플리케이션에서 실행 중인 모든 dyno에서 로그를 수집하여 Heroku로 보냅니다. 로그에는 애플리케이션 로그, Heroku 라우터 로그, Heroku 시스템 dyno 로그가 포함됩니다. 로그 드레인을 설정하여 이러한 로그를 Datadog으로 라우팅할 수 있습니다. 로그 드레인은 `ddsource=heroku`에서 Datadog으로 Heroku 시스템 로그를 보냅니다.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku 로그 보기" >}}

Heroku 로그 드레인을 설정하면 dyno 시스템 메트릭(CPU, 메모리)을 Datadog으로 가져올 수도 있습니다.

터미널에서 Heroku 로그 드레인을 설정하려면 다음을 실행하세요.

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

dyno에서 시스템 메트릭을 가져오려면 로그 드레인뿐 아니라 [log-runtime-metrics][21]도 활성화하세요.

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

드레인이 설정되면 [Datadog의 로그 섹션][22]에 Heroku 로그가 나타납니다.

#### Heroku 라우터 로그에서 메트릭 생성 {#generating-metrics-from-heroku-router-logs}

애플리케이션으로 라우팅되는 모든 트래픽은 Heroku 라우터 로그를 생성합니다.

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog의 Heroku 라우터 로그" >}}

보시는 바와 같이 Heroku 라우터 로그는 자동으로 구문 분석됩니다. Heroku 통합 로그 파이프라인을 사용하면 `appname`, `dyno`, `dynotype`이 태그로 추출됩니다.

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku 로그 파이프라인" >}}

구문 분석된 해당 파라미터를 기반으로 지연 시간 메트릭을 생성할 수 있습니다.

{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Generate Metrics{{< /ui >}}로 이동하여 {{< ui >}}\+ New Metric{{< /ui >}} 버튼을 클릭합니다.

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="새 로그 기반 메트릭" >}}

모든 Heroku 로그를 필터링하려면 쿼리를 `Source:heroku`로 정의합니다. `Duration` 측정값을 선택합니다. 또한 해당 메트릭을 `appname`, `dyno`, `dynotype` 및 `@http.status_code`로 그룹화할 수 있어야 합니다. 로그 구문 분석으로 생성된 메트릭은 Custom Metrics로 간주된다는 점에 유의하세요. 새 로그 항목이 원활하게 흐르도록 애플리케이션으로 들어오는 트래픽을 생성하는 것이 좋습니다.

마지막으로 메트릭 이름을 추가하고 {{< ui >}}Create Metric{{< /ui >}}을 클릭합니다.

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="새 로그 기반 메트릭 생성" >}}

규칙이 생성되면 새 메트릭이 수집되도록 몇 분 정도 기다립니다. 그런 다음 {{< ui >}}See in Metric Explorer{{< /ui >}}을 클릭하여 새 메트릭을 확인합니다.

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="사용 가능한 로그 기반 메트릭" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Metrics Explorer 보기" >}}

#### Heroku 메트릭 로그에서 Datadog 메트릭 생성 {#generating-datadog-metrics-from-heroku-metric-logs}

애플리케이션에 [log-runtime-metrics][21]가 설정되어 있으면 Heroku는 각 dyno에 대한 시스템 메트릭이 포함된 로그 항목을 생성합니다.

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Dyno 메모리 사용량 로그 항목" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Dyno CPU 사용량 로그 항목" >}}

이러한 로그는 Heroku 로그 통합 파이프라인에서 자동으로 구문 분석되어 다음 `measures`를 추출합니다.

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

각 값의 의미에 대한 자세한 내용은 공식 [Heroku 문서][23]에서 확인할 수 있습니다.

이전 섹션에서 설명한 동일한 단계를 따라 해당 측정값 각각에 대해 보존 기간이 15개월인 메트릭을 생성하세요.

#### 로그와 트레이스 상호 연결 {#correlating-logs-and-traces}

위의 구성 지침을 따르면 Heroku 로그 드레인에서 전송된 로그가 트레이스와 상호 연결됩니다.

<div class="alert alert-info">
<strong>참고</strong>: Heroku 라우터 및 시스템 로그는 Heroku에서 생성되며 이를 트레이스와 상호 연결하는 것은 불가능합니다.
</div>

[로그 보기][24]로 이동하여 Rails 애플리케이션 로그에 연결된 트레이스가 있는지 확인하면 구성이 성공했는지 알 수 있습니다.

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="로그와 트레이스 상호 연결" >}}

## 요약 {#summary}

이 가이드에서는 샘플 Rails 애플리케이션을 Heroku에 배포하고 Datadog으로 계측하여 메트릭, dyno 시스템 메트릭, 로그, 트레이스를 확보하고 Integrations를 설정했습니다.

다른 Datadog Integrations를 사용해 애플리케이션을 계속해서 계측하려면 공식 [Integrations 문서][25]에 설명된 구성 파일을 사용하여 Postgres 통합에 적용한 것과 동일한 단계를 따르세요.

## 부록: Datadog Agent 상태 확인 {#appendix-getting-the-datadog-agent-status}

Datadog Agent 상태를 확인하는 것은 Datadog Agent가 올바르게 실행 중인지 확인하고 잠재적인 문제를 디버깅하는 좋은 방법입니다. 먼저 `heroku ps:exec`를 사용하여 dyno에 SSH로 접속합니다.

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

`DD_API_KEY`가 설정되지 않았다는 경고는 무시해도 됩니다. 이러한 경고는 정상입니다. 이는 [Heroku가 SSH 세션 자체에는 구성 변수를 설정하지 않기 때문][26]이며, Datadog Agent 프로세스는 해당 변수에 액세스할 수 있었습니다.

SSH 세션에 접속한 후 Datadog 상태 명령을 실행합니다.

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

## 추가 자료 {#further-reading}

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
[10]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/heroku/
[11]: https://devcenter.heroku.com/articles/buildpacks/
[12]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Adatadog.heroku_agent.running&filter=dyno%3Aweb.1
[13]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/heroku/#enabling-integrations
[14]: https://docs.datadoghq.com/ko/agent/basic_agent_usage/heroku/#prerun-script
[15]: https://app.datadoghq.com/metric/catalog?filter=postgresql
[16]: https://elements.heroku.com/addons/heroku-redis
[17]: https://elements.heroku.com/addons/memcachedcloud
[18]: https://docs.datadoghq.com/ko/getting_started/tagging/unified_service_tagging/
[19]: https://app.datadoghq.com/apm/traces
[20]: https://app.datadoghq.com/services
[21]: https://devcenter.heroku.com/articles/log-runtime-metrics/
[22]: https://app.datadoghq.com/logs/livetail
[23]: https://devcenter.heroku.com/articles/log-runtime-metrics#cpu-load-averages
[24]: https://app.datadoghq.com/logs/livetail?cols=core_host%2Ccore_service&from_ts=0&index=%2A&live=true&messageDisplay=inline&query=source%3Aruby&stream_sort=desc&to_ts=-1
[25]: https://docs.datadoghq.com/ko/integrations/
[26]: https://devcenter.heroku.com/articles/exec#environment-variables