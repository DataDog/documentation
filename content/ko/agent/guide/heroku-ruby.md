---
further_reading:
- link: /agent/basic_agent_usage/heroku/
  tag: 설명서
  text: Heroku 빌드팩
- link: /logs/guide/collect-heroku-logs
  tag: 설명서
  text: Heroku 로그 수집
title: Datadog로 Heroku에서 Ruby on Rails 애플리케이션 계측
---

Heroku는 Ruby 개발자, 특히 Ruby on Rails 개발자에게 인기 있는 플랫폼입니다. Datadog는 Heroku와 Ruby를 지원하므로 Heroku Ruby 애플리케이션 메트릭, 로그, 트레이스를 Datadog로 보낼 수 있습니다.

이 가이드에서는 Heroku에 배포된 레일 애플리케이션을 사용해 Datadog로 전송되는 메트릭, 통합 데이터, 로그, 트레이스를 파악하는 데 필요한 단계를 설명합니다.

## 필수 구성 요소

이 가이드 필수 구성 요소는 다음과 같습니다.

* Datadog 계정이 있어야 합니다. 계정이 없는 경우 [무료  체험판에 가입하세요][1].
* Heroku 계정이 있어야 합니다. 만약 계정이 없다면 [Heroku 무료 티어에 가입하세요][2].
* 로컬 시스템에 [Git][3]이 설치되어 있어야 합니다.
* 로컬 시스템에 [Heroku CLI 도구][4]가 설치되어 있어야 합니다.

## Heroku 애플리케이션 생성 및 샘플 Ruby 애플리케이션 배포

이 가이드에서는 [Heroku의 Rails 샘플 애플리케이션][5]을 사용합니다. 이는 [Ruby 시작하기 설명서][6]에 따라 제공되는 기초적인 애플리케이션입니다. 해당 설명서에는 Heroku에서 Ruby 애플리케이션을 배포하는 방법에 관한 자세한 설명이 안내되어 있습니다. 이 가이드에서는 Datadog로 Rails 애플리케이션을 계측하는 방법을 안내합니다.

샘플 애플리케이션에는 [Postgres이 로컬에 설치][7]되어 있는 경우에만 해결되는 종속성 pg가 있습니다. 계속 진행하기 전에 Postgres를 설치하세요.
`psql` 명령을 실행해 Postgres가 성공적으로 설치되었는지 확인할 수 있습니다. 다음과 같은 출력을 반환합니다.

```shell
which psql
/usr/local/bin/psql
```

샘플 애플리케이션에서 코드를 가져와 새 Heroku 애플리케이션에 그대로 배포합니다.

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

샘플 애플리케이션과 함께 기본 브라우저가 열립니다. 다음 UI와 같은 출력이 나타납니다.

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby 샘플 애플리케이션" >}}

## Datadog 계정을 애플리케이션에 연결하고 Datadog 에이전트 배포

Datadog를 사용해 Heroku 애플리케이션의 가시성을 확보하기 위한 첫 단계는 Datadog 에이전트를 배포하고 이를 Datadog 계정에 연결하는 것입니다.

Datadog에서는 API 키를 사용해 사용자 계정을 식별합니다. [Datadog 계정에 로그인][8]한 후 [API 키 섹션][9]으로 이동하고 API 키를 복사합니다.

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API 키 섹션" >}}

그 후 애플리케이션에 Datadog 에이전트를 배포합니다. 이 설명서에서는 [Datadog Heroku 빌드팩][10]을 사용합니다. [Heroku 빌드팩][11]에 관한 자세한 정보는 공식 문서를 참고하세요.

```shell
# HEROKU_APP_NAME 환경 변수로 자동 지정하도록 Heroku Labs Dyno Metadata를 활성화
heroku labs:enable runtime-dyno-metadata -a $APPNAME

# Datadog에서 호스트 이름을 appname.dynotype.dynonumber로 정해 메트릭 연속성 확보
heroku config:add DD_DYNO_HOST=true

# 사이트 설정(예: us5.datadoghq.com) 
heroku config:add DD_SITE=$DD_SITE

# 다음 빌드팩을 추가하고 Datadog API 키 설정
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
heroku config:add DD_API_KEY=$DD_API_KEY

# Heroku에 배포해 강제 다시 빌드
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

빌드가 완료되면 애플리케이션에서 Datadog 에이전트가 실행됩니다. [부록] 섹션(#appendix-getting-the-datadog-agent-status)의 설명에 따라 Datadog 에이전트 상태를 실행해 기능이 정상적으로 실행되고 있는지 확인합니다. 다음 섹션에 유의하세요.

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

이 출력에서는 Datadog 에이전트가 Heroku 애플리케이션에서 실행되고 있으며 Datadog 계정에 성공적으로 연결되었음을 알 수 있습니다.

[Datadog에서 Host Map][12]을 열면 dyno가 올바르게 보고되고 있음을 확인할 수 있습니다.

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog Host Map" >}}

## 통합 설정

Datadog에는 다양한 기술 스택에서 메트릭을 수집할 수 있는 400개 이상의 턴키 통합 기능이 있습니다. Datadog 빌드팩을 사용하면 이 통합 기능을 Heroku 애플리케이션에 사용할 수 있습니다.

다음 예시는 일반적으로 사용하는 4가지 Heroku 통합 설정입니다.

### Postgres

Heroku에서는 플랫폼에 배포되는 모든 Rails 애플리케이션에 추가 기능을 통해 Postgres 데이터를 추가합니다. 애플리케이션에 Postgres 추가 기능이 활성화되어 있는지 점검하세요.


 ```shell
heroku addons -a $APPNAME
```
다음과 같은 출력이 나타납니다.


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

예시 애플리케이션에서는 코드에서 이미 해당 데이터베이스를 사용하고 있습니다. 아직 테이블을 작성하지 않은 경우에는 다음을 실행하세요.

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

그러면 해당 데이터베이스를 사용하는 애플리케이션의 `/widgets` 엔드포인트를 확인할 수 있습니다.

Postgres Datadog 통합을 활성화하려면 Heroku에서 데이터베이스 자격 증명을 검색합니다. `psql` 터미널에서 다음 명령을 실행하세요.

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
Datadog 빌드팩을 사용하면 통합이 특정한 방법으로 활성화됩니다. [빌드팩 설명서][13]에 통합을 활성화하는 방법이 모두 안내되어 있습니다.

애플리케이션의 루트에 `datadog/conf.d` 폴더를 만듭니다.

```shell
cd ruby-getting-started
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

이전 명령에서 얻은 호스트, 데이터베이스 이름, 사용자 이름, 비밀번호 정보로 바꾼 후 `postgres.yaml` 설정 파일을 만듭니다.

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

수동으로 구성을 업데이트하는 대신 [사전 실행 스크립트][14]를 사용해 Heroku 환경 변수를 기반으로 Postgres 통합을 설정할 수 있습니다. 그러면 Datadog 에이전트를 시작하기 전에 해당 값을 바꿀 수 있습니다.

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

Heroku에 배포:

```shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Postgres 점검을 시작합니다. [부록] 섹션(#appendix-getting-the-datadog-agent-status) 안내에 따라 Datadog 에이전트 상태를 실행해 Postgres 점검이 올바르게 실행되고 있는지 확인합니다. 다음 섹션에 유의하세요.

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

Postgres 점검이 올바르게 실행되고 있는지 확인했으면 [Metrics Summary][15] 페이지에서 사용할 수 있는 Postgres 메트릭을 확인할 수 있습니다.

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog Metrics Explorer" >}}

### Redis

Redis의 경우 [Heroku Redis 추가 기능][16]을 Heroku 애플리케이션에 연결하세요.

```shell
heroku addons:create heroku-redis:hobby-dev
```

Redis가 애플리케이션에 성공적으로 연결되었는지 확인하려면 다음 명령을 실행하세요.

 ```shell
heroku addons:info REDIS
```

다음과 같은 출력이 나타납니다.

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

다음 명령을 실행해 Heroku에서 자격 증명을 가져오세요.

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

애플리케이션의 루트에 이름이 `/datadog/conf.d/redisdb.yaml`인 설정 파일을 만들어 호스트, 포트, 암호를 이전 명령의 정보로 바꿉니다.

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

수동으로 구성을 업데이트하는 대신 [사전 실행 스크립트][14]를 사용해 Heroku 환경 변수를 기반으로 Redis 통합을 설정할 수 있습니다. 그러면 Datadog 에이전트를 시작하기 전에 해당 값을 바꿀 수 있습니다.

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

Heroku에 배포:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Redis 점검을 시작합니다. [Datadog 에이전트 상태](#appendix-getting-the-datadog-agent-status)를 실행해 Redis 점검이 제대로 실행되고 있는지 확인합니다.

다음 출력이 나타납니다.

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

Sidekiq는 Ruby의 백그라운드 처리 프레임워크로, Sidekiq 프로 또는 엔터프라이즈를 사용하는 경우 Sidekiq용 Datadog 통합을 설치할 수 있습니다.

`dogstatsd-ruby` 패키지 설치:

```shell
gem install dogstatsd-ruby
```

이니셜라이저에서 Sidekiq 프로 메트릭 수집을 사용하도록 설정합니다.

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

Sidekiq 엔터프라이즈를 사용하고 있고 과거 메트릭을 수집하려는 경우 다음을 포함하세요.

```ruby
      Sidekiq.configure_server do |config|
        # history is captured every 30 seconds by default
        config.retain_history(30)
      end
```

[`datadog/prerun.sh`][14] 스크립트에 다음을 추가하세요.

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

Heroku에 배포:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Sidekiq 점검을 시작합니다. [Datadog 에이전트 상태 실행](#appendix-getting-the-datadog-agent-status)를 실행해 Sidekiq 점검이 제대로 실행되고 있는지 확인합니다.

### Memcached

Memcached는 Rails 애플리케이션에서 인기 있는 분산 메모리 개체 캐싱 시스템입니다. 이 예시에서는 [Heroku Memcached 클라우드 추가][17]를 Heroku 애플리케이션에 연결할 수 있습니다.

```shell
heroku addons:create memcachedcloud:30
```

Memcached가 애플리케이션에 성공적으로 연결되었는지 점검하려면 다음 명령을 실행하세요.

```shell
heroku addons | grep -A2 memcachedcloud
```

다음 출력이 나타납니다.

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

다음을 실행해 Heroku에서 자격 증명을 가져오세요.

```shell
heroku config | grep MEMCACHEDCLOUD
```

애플리케이션의 루트에 이름이  `/datadog/conf.d/mcache.yaml`인 설정 파일을 만들어 호스트, 포트, 사용자 이름, 암호를 이전 명령의 정보로 바꿉니다.

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

수동으로 구성을 업데이트하는 대신 [사전 실행 스크립트][14]를 사용해 Heroku 환경 변수를 기반으로 Memcached 통합을 설정할 수 있습니다. 그러면 Datadog 에이전트를 시작하기 전에 해당 값을 바꿀 수 있습니다.

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

Heroku에 배포:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Memcached 점검을 시작합니다. [Datadog 에이전트 상태](#appendix-getting-the-datadog-agent-status)를 실행해 Memcached 점검이 제대로 실행되고 있는지 확인합니다.

다음 출력이 나타납니다.

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
## 트레이스

Heroku Ruby 애플리케이션에서 분산 추적을 가져오려면 계측을 활성화합니다.

애플리케이션 코드가 있는 폴더에서 작업 중인지 확인합니다.

```shell
cd ruby-getting-started
```

`Gemfile`을 편집하고 `ddtrace`을 추가합니다.

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

`bundle install`을 사용해 gem을 설치합니다.

```shell
bundle install
```

변경 사항을 커밋한 후 Heroku로 푸시하기 전에 애플리케이션에 [통합 태깅][18]을 설정합니다.

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

변경 사항을 확인하고 Heroku로 이동합니다.

```shell
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

빌드하는 동안 트레이서가 Datadog 애플리케이션 성능 모니터링(APM) 에이전트 엔드포인트에 도달할 수 없다는 오류 메시지가 표시됩니다. 이는 빌드 프로세스 중에 Datadog 에이전트가 아직 시작되지 않았기 때문에 나타나는 일반적인 현상입니다. 다음 메시지는 무시해도 됩니다.

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

빌드가 완료되면 애플리케이션에서 Datadog로 트레이스를 전송합니다. 트레이스 흐름을 잘 확인하려면 애플리케이션에 트래픽을 생성을 시작하세요(예: 애플리케이션의 /위젯 페이지 방문).

[부록 섹션](#appendix-getting-the-datadog-agent-status)에 안내된 설명에 따라 Datadog 에이전트 상태를 실행하여 애플리케이션 성능 모니터링(APM) 에이전트가 올바르게 실행되고 있는지 확인하고 트레이스를 Datadog에 전송합니다. 다음 섹션에 유의하세요.

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

이 출력은 애플리케이션 성능 모니터링(APM) 에이전트가 올바르게 실행되고 있으며 트레이스를 Datadog으로 전송하고 있음을 나타냅니다.

[애플리케이션 성능 모니터링(APM) 트레이스 섹션][19]으로 이동하여 트레이스를 확인합니다.

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Datadog의 Ruby 애플리케이션 트레이스" >}}

[Service Catalog][20]로 이동해 애플리케이션 서비스 및 애플리케이션 서비스 모두 보기를 확인합니다.

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog의 Service Catalog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog의 Ruby 애플리케이션 서비스 상세 정보 페이지" >}}

## 로그

다음으로 Heroku 로그 드레인을 설정해 로그를 활성화합니다.

로그 드레인을 사용하면 모든 로그가 동일한 `ddsource` (일반적으로 `heroku`) Datadog에 도착하므로 Heroku 이외의 통합을 사용한 로그 자동 파싱이 실행되지 않습니다.

### Rails 로그 생성

Rails 로그를 설정하려면 Lograge를 사용하는 것이 좋습니다. 이 샘플 애플리케이션에서는 로그와 트레이스가 상관 관계에 있도록 설정합니다.

애플리케이션 코드가 있는 폴더에 있는지 확인합니다.
```shell
cd ruby-getting-started
```

`Gemfile`를 편집한 후 `lograge`를 추가합니다.

```ruby
gem 'lograge'
```

`bundle install`을 사용해 gem을 설치합니다.

```shell
bundle install
```

Lograge를 설정하려면 `config/initializers/lograge.rb` 이름의 파일을 만들고 다음을 추가합니다.

```ruby
Rails.application.configure do
  # Lograge config
  config.lograge.enabled = true

  # JSON 형식 로그인을 지정
  config.lograge.formatter = Lograge::Formatters::Json.new

  ## 로그 색상화 비활성화
  config.colorize_logging = false

  # 로그를 STDOUT로 설정
  config.lograge.logger = ActiveSupport::Logger.new(STDOUT)

  config.lograge.custom_options = lambda do |event|
    # 현재 스레드에서 트레이스 정보를 가져옴
    correlation = Datadog::Tracing.correlation

    {
      # 로그 출력에 ID를 태그로 추가
      :dd => {
        # JSON 직렬화 중 정확성을 보장하기 위해 큰 수에 문자열을 사용
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

Heroku에 배포:

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### Heroku 로그 드레인 설정

Heroku에는 로그 드레인이라는 네이티브 로그 라우터가 있는데, 이는 애플리케이션에서 실행 중인 모든 dynos의 로그를 수집해 Heroku에 보냅니다. 로그에는 애플리케이션 로그, Heroku 라우터 로그, Heroku 시스템 dyno 로그가 포함됩니다. 이러한 로그를 Datadog으로 라우팅하도록 로그 드레인을 설정할 수 있습니다. 로그 드레인은 Heroku 시스템 로그를 `ddsource=heroku`에서 Datadog으로 보냅니다.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="Heroku 로그 보기" >}}

또한 Heroku 로그 드레인을 설정하면 dyno 시스템 메트릭(CPU, 메모리)을 Datadog으로 가져올 수 있습니다.

터미널에서 Heroku 로그 드레인을 설정하려면 다음을 실행합니다.

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

로그 드레인을 활성화하는 것 외에 dynos에서 시스템 메트릭을 가져오려면 [로그-런타임-메트릭][21]도 활성화합니다.

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

드레인이 설정되면 Heroku 로그가 [Datadog의 로그 섹션][22]에 나타납니다.

#### Heroku 라우터 로그에서 메트릭 생성

애플리케이션에 라우팅된 트래픽은 Heroku 라우터 로그를 생성합니다.

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog의 Heroku 라우터 로그" >}}

Heroku 라우터 로그는 자동으로 파싱됩니다. Heroku 통합 로그 파이프라인을 사용하여 `appname`,`dyno`, `dynotype`가 태그로 추출됩니다.

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="Heroku 로그 파이프라인" >}}

이렇게 파싱된 파라미터를 기반으로 지연 시간 메트릭을 생성할 수 있습니다.

Logs -> Generate Metrics로 이동하여 "+ New Metric" 버튼을 클릭합니다.

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="새 로그 기반 메트릭" >}}

모든 Heroku 로그를 필터링하기 위해 쿼리를 `Source:heroku`로 정의합니다. `Duration` 측정값을 선태하세요. 또 `appname`, `dyno`, `dynotype`, `@http.status_code`로 해당 메트릭을 그룹화하세요. 로그 파싱을 통해 생성된 메트릭은 커스텀 메트릭으로 간주됩니다. 새 로그 항목의 흐름을 잘 얻으려면 애플리케이션에 트래픽을 생성할 것을 권장합니다.

마지막으로 메트릭 이름을 추가하고 **Create Metric**:을 클릭합니다.

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="새 로그 기반 메트릭 생성" >}}

규칙이 생성되면 몇 분 후 새 메트릭을 수집한 다음 "See in Metric Explorer"를 클릭해 새 메트릭을 확인합니다.

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="사용 가능한 로그 기반 메트릭" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="Metrics Explorer 보기" >}}

#### Heroku 메트릭 로그에서 Datadog 메트릭 생성

애플리케이션에 [로그-런타임-메트릭][21]이 설정되어 있는 경우 Heroku에서는 각 dynos에 시스템 메트릭과 함께 로그 항목을 생성합니다.

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Dyno 메모리 사용 로그 항목" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Dyno CPU 사용 로그 항목" >}}

또 이 같은 로그는 Heroku 로그 통합 파이프라인에 의해 자동으로 파싱되어 다음 `measures`를 추출합니다.

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

각 값이 의미하는 바를 살펴보려면 공식 [Heroku 설명서][23]를 참고하세요.

앞 단계에서 설명한 것과 동일한 단계에 따라 각 측정값에 15개월 보존 상태의 메트릭을 생성합니다.

#### 로그와 트레이스의 상관관계

위 설정 지침에 따랐다면 Heroku 로그 드레인에서 전송된 로그는 트레이스와 상관 관계가 있습니다.

<div class="alert alert-info">
<strong>참고</strong>: Heroku 라우터와 시스템 로그는 Heroku에서 생성되며, 트레이스와 상관 관계를 만드는 것이 불가능합니다.
</div>

[로그 보기][24]로 이동해 Rails 애플리케이션 로그에 상관 관계가 있는 트레이스가 있는지 확인하여 성공적으로 구성되었는지 점검할 수 있습니다.

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="로그 및 트레이스 상관 관계" >}}

## 요약

이 가이드에서는 샘플 Rails 애플리케이션을 Heroku에 배포하고 Datadog와 함께 계측하여 메트릭, Dyno 시스템 메트릭, 로그, 트레이스, 통합을 설정했습니다.

다른 Datadog 통합을 사용해 애플리케이션을 계속 계측하려면 공식 [통합 설명서][25]에 문서화된 설정 파일을 사용하여 Postgres 통합에 실행한 것과 동일한 단계를 따릅니다.

## 부록: Datadog 에이전트 상태 확인

Datadog 에이전트 상태를 파악하는 것은 Datadog 에이전트가 올바르게 실행되고 있는지 확인하고 잠재적인 문제를 디버그하는 좋은 방법입니다. 먼저 `heroku ps:exec`을 사용하여 dyno에 SSH를 입력합니다.

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

`DD_API_KEY`가 설정되지 것과 관련한 경고는 정상이며 무시해도 됩니다. 왜냐하면 [Heroku가 SSH 세션 자체의 구성 변수를 설정하지 않고][26] Datadog 에이전트 프로세스가 SSH 세션에 액세스할 수 있기 때문입니다.

SSH 세션 내에서 Datadog 상태 명령을 실행합니다.

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

## 참고 자료

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
[15]: https://app.datadoghq.com/metric/summary?filter=postgresql
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