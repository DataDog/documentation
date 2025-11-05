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

헤로쿠(Heroku) 는 루비(Ruby) 개발자, 특히  Ruby on Rails 개발자 사이에서 인기 있는 플랫폼입니다. Datadog 는 헤로쿠(Heroku) 와 루비(Ruby)를 지원하므로 헤로쿠 루비 애플리케이션 메트릭, 로그, 트레이스를 Datadog로 전송할 수 있습니다.

이 가이드는 헤로쿠(Heroku)에 배포된 레일스(Rails) 애플리케이션을 가져와 메트릭, 통합 데이터, 로그, 트레이스를 Datadog로 전송하는 데 필요한 단계를 안내합니다.

## 사전 필수 조건

이 가이드에서는 다음과 같은 상황을 가정합니다.

* 이미 Datadog 계정이 있습니다. 계정이 없는 경우 [무료 평가판에 가입][1]할 수 있습니다.
* 이미 헤로쿠(Heroku) 계정이 있습니다. 계정이 없는 경우 [무료 티어에 가입][2]할 수 있습니다.
* 로컬 시스템에 [Git][3]이 설치되어 있습니다.
* 로컬 시스템에 [헤로쿠(Heroku) CLI 도구][4]가 설치되어 있습니다.

## 헤로쿠(Heroku) 애플리케이션 생성 및 샘플 루비(Ruby) 애플리케이션 배포

이 가이드에서는 [헤로쿠(Heroku) 레일스(Rails) 샘플 애플리케이션][5]을 사용합니다. 가이드는 루비(Ruby) 애플리케이션을 배포하는 방법에 대한 자세한 정보를 제공하는 [루비 시작하기 문서][6]를 따르는 베어본 레일스 애플리케이션입니다. 헤로쿠에서 자세한 내용을 확인할 수 있습니다. 이 가이드는 Datadog을 사용하여 레일스 애플리케이션을 계측하는 데 중점을 둡니다.

샘플 애플리케이션에는 [로컬에 Postgres를 설치한 경우][7]에만 해결되는 종속성 pg가 있습니다. 계속하기 전에 Postgres를 설치하세요.
 `psql` 명령을 실행하여 Postgres가 성공적으로 설치되었는지 확인할 수 있습니다. 다음과 유사한 출력이 반환됩니다.

```shell
which psql
/usr/local/bin/psql
```

샘플 애플리케이션에서 코드를 가져와서 새 헤로쿠 애플리케이션에 그대로 배포합니다.

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

기본 브라우저가 샘플 애플리케이션과 함께 열립니다. 이 UI와 비슷한 결과를 확인할 수 있습니다.

{{< img src="agent/guide/heroku_ruby/sample_app.png" alt="Heroku Ruby sample application" >}}

## Datadog 계정을 애플리케이션에 연결하고 Datadog 에이전트를 배포합니다.

Datadog를 사용하여 헤로쿠(Heroku) 애플리케이션에 대한 완전한 가시성을 확보하는 첫 번째 단계는 Datadog 에이전트를 배포하고 Datadog 계정에 연결하는 것입니다.

Datadog에서 계정을 식별하는 방법은 API 키를 사용하는 것입니다. [Datadog 계정에 로그인하고][8] [API 키 섹션][9]으로 이동합니다. API 키를 복사합니다.

{{< img src="agent/guide/heroku_ruby/apikey.png" alt="Datadog API keys section" >}}

그런 다음 Datadog 에이전트을 애플리케이션에 배포합니다. 이 가이드에서는 [Datadog 헤로쿠 빌드팩][10]을 사용합니다. [헤로쿠 빌드팩][11]과 그 기능에 대한 자세한 내용은 공식 문서에서 확인할 수 있습니다.

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

빌드가 완료되면 애플리케이션에서 Datadog 에이전트가 실행됩니다. [부록 섹션](#appendix-getting-the-datadog-agent-status)에 설명된 대로 Datadog 에이전트 상태를 실행하여 모든 것이 올바르게 실행되고 있는지 확인합니다. 다음 섹션을 주의 깊게 살펴봐야 합니다.

```bash
[...]
  API Keys status
  ===============
    API key ending with 68306: API Key valid

[...]
```

이 출력은 헤로쿠(Heroku) 애플리케이션에서 Datadog 에이전트이 실행 중이며 Datadog 계정에 성공적으로 연결되었음을 의미합니다.

[Datadog의 호스트 맵][12]을 열면 Datadog에서 dyno가 올바르게 보고되고 있음을 확인할 수 있습니다:

{{< img src="agent/guide/heroku_ruby/dyno_host.png" alt="Datadog Host Map" >}}

## 설정 통합

Datadog는 다양한 기술 스택에서 메트릭을 수집하는 400개 이상의 턴키 통합을 함께 제공됩니다. Datadog 빌드팩을 사용하면 헤로쿠 애플리케이션에 이러한 통합을 활성화할 수 있습니다.

일반적으로 사용되는 헤로쿠(Heroku) 통합 설정 네 가지 예가 아래에 나열되어 있습니다.

### Postgres

헤로쿠(Heroku)에 배포되는 모든 레일스(Rails) 애플리케이션에 대해 애드온을 통해 Postgres 데이터베이스를 추가합니다. 애플리케이션에 Postgres 애드온이 활성화되어 있는지 확인합니다.

 ```shell
heroku addons -a $APPNAME
```
다음과 같은 출력이 표시됩니다.


```bash
Add-on                                         Plan       Price  State
─────────────────────────────────────────────  ─────────  ─────  ───────
heroku-postgresql (postgresql-infinite-14462)  hobby-dev  free   created
 └─ as DATABASE

The table above shows add-ons and the attachments to the current app (ruby-heroku-datadog) or other apps.
```

예제 애플리케이션의 코드에서 이미 해당 데이터베이스를 사용하고 있지만 아직 테이블을 만들지 않은 경우 실행합니다:

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

그러면 해당 데이터베이스를 사용하는 애플리케이션의 `/widgets` 엔드포인트를 성공적으로 볼 수 있습니다.

Postgres Datadog 통합을 활성화하려면 헤로쿠(Heroku)에서 데이터베이스 자격 증명을 검색합니다. `psql` 터미널에서 다음 명령을 실행합니다.

```shell
heroku pg:credentials:url DATABASE -a $APPNAME
```
통합은 Datadog 빌드팩을 사용할 때 특정 방식으로 활성화됩니다. 통합을 활성화하는 방법은 [빌드팩 문서][13]에서 확인할 수 있습니다.

애플리케이션의 루트에 `datadog/conf.d` 폴더를 생성합니다.

```shell
cd ruby-getting-started
# Create the folder for the integrations configuration in your application code
mkdir -p datadog/conf.d/
```

이전 명령에서 얻은 정보로 호스트, dbname, 사용자 이름, 비밀번호를 대체하는 `postgres.yaml` 설정 파일을 생성합니다.

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

설정을 수동으로 업데이트하는 대신 [prerun 스크립트][14]를 사용하여 헤로쿠(Heroku) 환경 변수를 기반으로 Postgres 통합을 설정하여 Datadog 에이전트를 시작하기 전에 해당 값을 대체할 수 있습니다.

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

헤로쿠에 배포:

```shell
git add .
git commit -m "Enable postgres integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트에서 Postgres 점검을 시작합니다. [부록 섹션](#appendix-getting-the-datadog-agent-status)에 설명된 대로 Datadog 에이전트 상태를 실행하여 Postgres 점검이 올바르게 실행되고 있는지 확인합니다. 다음 섹션을 살펴봅니다.

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

Postgres 점검이 올바르게 실행되고 있는지 확인하면 [메트릭 요약][15] 페이지에서 제공되는 Postgres 메트릭을 살펴볼 수 있습니다.

{{< img src="agent/guide/heroku_ruby/postgres_metrics.png" alt="Datadog Metrics Explorer" >}}

### Redis

Redis의 경우, 헤로쿠(Heroku) 애플리케이션에 [헤로쿠(Heroku) Redis 애드온][16]을 추가합니다.

```shell
heroku addons:create heroku-redis:hobby-dev
```

Redis가 애플리케이션에 성공적으로 연결되었는지 확인하려면 다음 명령을 실행합니다.

 ```shell
heroku addons:info REDIS
```

다음과 유사한 출력이 표시됩니다.

```bash
=== redis-cylindrical-59589
Attachments:  ruby-heroku-datadog::REDIS
Installed at: Wed Nov 17 2021 14:14:13 GMT+0100 (Central European Standard Time)
Owning app:   ruby-heroku-datadog
Plan:         heroku-redis:hobby-dev
Price:        free
State:        created
```

다음 명령을 실행하여 헤로쿠(Heroku) 에서 자격 증명을 검색합니다.

```shell
heroku config -a $APPNAME | grep REDIS_URL
```

애플리케이션의 루트에 `/datadog/conf.d/redisdb.yaml`이라는 이름의 설정 파일을 생성하여 호스트, 포트 및 비밀번호를 이전 명령의 정보로 대체합니다.

```yaml
init_config:

instances:
  - host: <YOUR_REDIS_HOST>
    password: <YOUR_REDIS_PASSWORD>
    port: <YOUR_REDIS_PORT>
```

설정을 수동으로 업데이트하는 대신 [prerun 스크립트][14]를 사용하여 헤로쿠 환경 변수를 기반으로 Redis 통합을 설정하여 Datadog 에이전트를 시작하기 전에 해당 값을 대체할 수 있습니다.

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

헤로쿠에 배포:

```shell
# Deploy to Heroku
git add .
git commit -m "Enable redis integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Redis 점검을 시작합니다. [Datadog 에이전트 상태](#appendix-getting-the-datadog-agent-status)를 실행하여 Redis 점검이 올바르게 실행되고 있는지 확인합니다.

다음 출력이 표시됩니다.

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

Sidekiq는 루비(Ruby)의 배경 처리 프레임워크입니다. Sidekiq Pro 또는 Enterprise를 사용하는 경우 Sidekiq용 Datadog 통합을 설치할 수 있습니다.

`dogstatsd-ruby` 패키지를 설치합니다.

```shell
gem install dogstatsd-ruby
```

시작 관리자에서 Sidekiq Pro 메트릭 수집을 활성화합니다.

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

Sidekiq Enterprise를 사용 중이고 과거 메트릭을 수집하려면, 다음을 포함합니다.

```ruby
      Sidekiq.configure_server do |config|
        # history is captured every 30 seconds by default
        config.retain_history(30)
      end
```

`datadog/prerun.sh`][14] 스크립트에 다음을 추가합니다.

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

헤로쿠에 배포:

```shell
git add .
git commit -m "Enable sidekiq integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트가 Sidekiq 점검을 시작합니다. [ Datadog 에이전트 상태](#appendix-getting-the-datadog-agent-status)를 실행하여 Sidekiq 점검이 올바르게 실행되고 있는지 확인합니다.

### Memcached

Memcached는 Rails 애플리케이션에서 널리 사용되는 분산 메모리 객체 캐싱 시스템입니다. 이 예시에서 헤로쿠 애플리케이션에 [헤로쿠 Memcached Cloud 애드온][17]을 추가할 수 있습니다.

```shell
heroku addons:create memcachedcloud:30
```

Memcached가 애플리케이션에 성공적으로 연결되었음을 확인하려면 다음 명령을 실행합니다.

```shell
heroku addons | grep -A2 memcachedcloud
```

다음 출력이 표시됩니다.

```bash
memcachedcloud (memcachedcloud-fluffy-34783)   30         free   created
 └─ as MEMCACHEDCLOUD
```

다음을 실행하여 헤로쿠에서 자격 증명을 검색합니다.

```shell
heroku config | grep MEMCACHEDCLOUD
```

애플리케이션의 루트에 `/datadog/conf.d/mcache.yaml`이라는 이름의 설정 파일을 만들어 호스트, 포트, 사용자 이름 및 비밀번호를 이전 명령의 정보로 대체합니다.

```yaml
instances:
  - url: <YOUR_MCACHE_HOST>
    port: <YOUR_MCACHE_PORT>
    username: <YOUR_MCACHE_USERNAME>
    password: <YOUR_MCACHE_PASSWORD>
```

설정을 수동으로 업데이트하는 대신 [prerun 스크립트][14]를 사용하여 헤로쿠 환경 변수를 기반으로 Memcached 통합을 설정하여 Datadog 에이전트를 시작하기 전에 해당 값을 대체할 수 있습니다.

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

헤로쿠에 배포:

```shell
git add .
git commit -m "Enable memcached integration"
git push heroku main
```

빌드가 완료되면 Datadog 에이전트 Memcached 점검을 시작합니다. [Datadog 에이전트 상태](#appendix-getting-the-datadog-agent-status)를 실행하여 Memcached 점검이 올바르게 실행되고 있는지 확인합니다.

다음 출력이 표시됩니다.

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

헤로쿠 루비(Ruby) 애플리케이션에서 분산 추적을 받으려면 계측을 활성화합니다.

애플리케이션 코드가 있는 폴더에 있는지 확인합니다.

```shell
cd ruby-getting-started
```

`Gemfile`을 편집하고 `ddtrace`을 추가합니다.

```ruby
source 'https://rubygems.org'
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

`bundle install`로 gem을 설치합니다.

```shell
bundle install
```

변경 사항을 커밋하고 헤로쿠로 푸시하기 전에 애플리케이션에 대해 [통합 태깅][18]을 설정합니다:

```shell
# Set the environment of your application
heroku config:add DD_ENV=production -a $APPNAME

# Set the version of your application
heroku config:add DD_VERSION=0.1 -a $APPNAME

# Set the service of your application
heroku config:add DD_SERVICE=$APPNAME -a $APPNAME
```

변경 사항을 커밋하고 헤로쿠(Heroku) 으로 푸시합니다.

```shell
git add .
git commit -m "Enable distributed tracing"
git push heroku main
```

빌드하는 동안 추적기가 Datadog 애플리케이션 성능 모니터링(APM) 에이전트 엔드포인트에 도달할 수 없다는 오류 메시지가 표시됩니다. 이는 프로세스 빌드 중 Datadog 에이전트가 아직 시작되지 않았기 때문에 발생하며 정상적인 동작입니다. 이 메시지는 무시해도 됩니다.

```bash
remote:        Download Yarn at https://yarnpkg.com/en/docs/install
remote:        E, [2021-05-14T10:21:27.664244 #478] ERROR -- ddtrace: [ddtrace] (/tmp/build_d5cedb1c/vendor/bundle/ruby/2.6.0/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:35:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /tmp/build_d5cedb1c/vendor/ruby-2.6.6/lib/ruby/2.6.0/net/http.rb:949:in `rescue in block in connect'
```

빌드가 완료되면 애플리케이션이 트레이스를 Datadog로 전송합니다. 애플리케이션의 트래픽을 생성하기 시작하면 (예: 애플리케이션의 /widgets 페이지를 방문하여) 트레이스의 원활한 흐름을 확보할 수 있습니다.

[부록 섹션](#appendix-getting-the-datadog-agent-status)에 설명된 대로 Datadog 에이전트 상태를 실행하여 애플리케이션 성능 모니터링(APM) 에이전트가 올바르게 실행되고 트레이스가 Datadog에 전송되는지 확인하세요. 다음 섹션을 살펴봅니다.

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

이 출력은 애플리케이션 성능 모니터링(APM) 에이전트가 올바르게 실행되고 트레이스를 Datadog로 전송하고 있음을 보여줍니다.

[애플리케이션 성능 모니터링(APM) 트레이스 섹션][19]으로 이동하여 트레이스를 확인합니다.

{{< img src="agent/guide/heroku_ruby/traces.png" alt="Ruby application traces in Datadog" >}}

[Software Catalog][20]로 이동해서 모든 애플리케이션 서비스와 애플리케이션 서비스 보기를 확인합니다.

{{< img src="agent/guide/heroku_ruby/ruby_service.png" alt="Datadog의 Software Catalog" >}}
{{< img src="agent/guide/heroku_ruby/service_page.png" alt="Datadog의 Ruby 애플리케이션 서비스 세부 정보 페이지" >}}

## 로그

다음으로 헤로그 로그 드레인을 설정하여 로그를 활성화합니다.

로그 드레인을 사용하는 경우 `ddsource`(보통, `heroku`)에서 Datadog로 모든 로그가 도착하므로 헤로쿠 외 다른 통합을 사용하여 로그를 자동으로 파싱하는 경우는 발생하지 않습니다.

### Rails 로그 생성

Rails 로그를 설정하려면 Datadog는 Lograge를 사용할 것을 권장합니다. 이 샘플 애플리케이션의 경우 로그와 트레이스가 상호 연결되도록 설정하세요.

애플리케이션 코드가 있는 폴더에 있는지 확인합니다.
```shell
cd ruby-getting-started
```

`Gemfile`을 수정하고 `lograge`를 추가합니다.

```ruby
gem 'lograge'
```

`bundle install`을 사용해 gem을 설치합니다.

```shell
bundle install
```

Lograge에 설절하려면 `config/initializers/lograge.rb`라는 파일을 생성하고 다음을 추가합니다.

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

헤로쿠에 배포:

```shell
git add .
git commit -m "Add lograge"
git push heroku main
```

### 헤로쿠(Heroku) 로그 드레인 설정

헤로쿠(Heroku)에는 로그라는 네이티브 로그 드레인 라우터가 포함되어 있습니다. 이 라우터는 애플리케이션에서 실행 중인 모든 dyno에서 로그를 수집하여 헤로쿠로 전송합니다. 로그에는 애플리케이션 로그, 헤로쿠(Heroku) 라우터 로그, 헤로쿠 시스템 dyno 로그가 포함됩니다. 로그 드레인을 설정하여 Datadog로 로그를 라우팅할 수 있습니다. 로그 드레인은  헤로쿠 시스템 로그를 `ddsource=heroku`에서 Datadog로 전송합니다.

{{< img src="agent/guide/heroku_ruby/heroku_logs.png" alt="헤로쿠 로그 보기" >}}

헤로쿠(Heroku) 로그 드레인을 설정하면 dyno 시스템 메트릭(CPU, 메모리)을 Datadog로 가져올 수 있습니다.

터미널에서 헤로쿠(Heroku) 로그를 남기다 드레인을 설정하려면 다음을 실행합니다.

```shell
export APPNAME=<YOUR_APPLICATION_NAME>
export DD_ENV=<YOUR_APPLICATION_ENVIRONMENT> # example: production, staging
export DD_SERVICE=<YOUR_SERVICE_NAME>

heroku drains:add "https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=$DD_API_KEY&ddsource=heroku&env=$DD_ENV&service=$DD_SERVICE&host=${APPNAME}.web.1" -a $APPNAME
```

dyno에서 시스템 메트릭을 받으려면 로그 드레인을 활성화하는 것과 별도로 [log-runtime-metrics][21]를 활성화하세요.

```shell
heroku labs:enable log-runtime-metrics -a $APPNAME

# Restart your application
heroku restart -a $APPNAME
```

드레인이 설정되면 헤로쿠 로그가 [Datadog 로그 섹션][22]에 나타납니다.

#### 헤로쿠(Heroku) 라우터 로그에서 메트릭 생성

애플리케이션으로 라우팅되는 모든 트래픽은 헤로쿠(Heroku) 라우터 로그를 생성합니다.

{{< img src="agent/guide/heroku_ruby/router_log.png" alt="Datadog의 헤로쿠 라우터 로그" >}}

보시다시피 헤로쿠(Heroku) 라우터 로그는 자동으로 파싱됩니다. 헤로쿠 통합 로그 파이프라인을 통해 `appname`, `dyno`, `dynotype`을 태그로 추출합니다. 

{{< img src="agent/guide/heroku_ruby/grok_parser.png" alt="헤로쿠 로그 파이프라인" >}}

파싱된 파라미터를 기반으로 지연 시간 메트릭을 생성할 수 있습니다.

로그 -> 생성 메트릭으로 이동하여 "+ 신규 메트릭" 버튼을 클릭합니다.

{{< img src="agent/guide/heroku_ruby/new_custom_metric.png" alt="새로운 로그 기반 메트릭" >}}

쿼리를 `Source:heroku`로 정의하여 헤로쿠 로그를 모두 필터링합니다. `Duration` 측정값을 선택합니다. 또한 메트릭을 `appname`, `dyno`, `dynotype`, `@http.status_code`로 그룹화합니다. 로그 파싱으로 생성된 메트릭은 커스텀 메트릭으로 간주되는 것을 기억하세요. Datadog는 새로운 로그 입력 항목을 받기 위해 애플리케이션에 트래픽을 생성할 것을 권장합니다.

마지막으로 메트릭의 이름을 추가하고 **메트릭 생성**를 클릭합니다.

{{< img src="agent/guide/heroku_ruby/custom_metric.png" alt="새 로그 기반 메트릭 생성" >}}

규칙이 생성되면 몇 분간 기다렸다가 새 메트릭을 수집합니다. 그런 다음 " 메트릭 탐색기에서 보기"를 클릭하여 새로운 메트릭을 확인합니다:

{{< img src="agent/guide/heroku_ruby/generated_metric.png" alt="로그 기반 사용 가능한 메트릭" >}}
{{< img src="agent/guide/heroku_ruby/metrics_explorer.png" alt="메트릭 탐색기 보기" >}}

#### 헤로크 메트릭 로그에서 Datadog 메트릭 가져오기

[log-runtime-metrics][21]이 애플리케이션에 설정된 경우 헤로쿠는 각 dyno에 대한 시스템 메트릭으로 로그 입력 항목을 생성합니다.

{{< img src="agent/guide/heroku_ruby/dyno_memory_log.png" alt="Dyno 메모리 사용량 로그 입력 항목" >}}
{{< img src="agent/guide/heroku_ruby/dyno_cpu_log.png" alt="Dyno CPU 사용량 로그 입력 항목" >}}

이 로그는 헤로쿠 로그 통합 파이파라인으로 자동 파싱되어 다음 `measures`을 추출합니다.

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

이러한 각 값의 의미에 대해서는 공식 [헤로쿠(Heroku) 설명서][23]에서 확인할 수 있습니다.

이전 섹션에서 설명한 것과 동일한 단계를 수행하여 각 측정값에 대해 15개월 보존 기간이 있는 메트릭을 생성합니다.

#### 로그와 트레이스의 상관관계

위의 설정 지침에 따라 헤로쿠 로그에서 전송된 로그가 트레이스와 연결됩니다.

<div class="alert alert-info">
<strong>참고</strong>: 헤로쿠 라우터 및 시스템 로그는 헤로쿠에서 생성되며 트레이스와의 연결은 불가능합니다.
</div>

[로그 보기][24]로 이동하여 설정이 성공했으며 Rails 애플리케이션 로그와 트레이스가 연결되었는지 확인합니다.

{{< img src="agent/guide/heroku_ruby/log_trace_correlation.png" alt="로그 및 트레이스 상호 연결" >}}

## 요약

이 가이드에서, 샘플 Rails 애플리케이션을 가져와서 헤로쿠에 배포하고 Datadog로 계측하여 메트릭, dyno 시스템 메트릭, 로그, 트레이스, 통합을 설정했습니다.

다른 Datadog 통합으로 애플리케이션을 계속 계측하려면 공식 [통합 문서][25]에 문서화된 설정 파일을 사용하여 Postgres 통합에 대해 수행한 것과 동일한 단계를 따르세요.

## 부록: Datadog 에이전트 상태 받기

Datadog 에이전트 상태를 확인하면 Datadog 에이전트가 올바르게 실행되고 있는지 확인하고 잠재적인 문제를 디버깅할 수 있습니다. 먼저 `heroku ps:exec` 을 사용하여 다이노에 SSH로 접속합니다.

```shell
heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
#The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

`DD_API_KEY` 설정되지 않았다는 경고는 무시해도 됩니다. 정상적인 동작입니다. [헤로쿠는 SSH 세션 자체에 대해 설정 변수를 설정하지 않지만][26], Datadog 에이전트 프로세스는 해당 변수에 액세스할 수 있기 때문에 발생합니다.

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