---
aliases:
- /ko/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
dependencies:
- https://github.com/DataDog/heroku-buildpack-datadog/blob/master/README.md
title: Datadog 헤로쿠 빌드팩
---
이 [헤로쿠(Heroku) 빌드팩][1]은 Heroku dyno에 Datadog 에이전트를 설치하여 시스템 메트릭, 커스텀 애플리케이션 메트릭 및 트레이스를 수집합니다. 커스텀 애플리케이션 메트릭 또는 트레이스를 수집하려면 애플리케이션에서 [DogStatsD 또는 Datadog APM 라이브러리][2]에 적합한 언어를 포함합니다.

## 설치

이 가이드는 이미 헤로쿠를 실행하는 애플리케이션이 있는 것으로 가정합니다. 헤로쿠 설명서를 참조해 헤로쿠에 애플리케이션을 구축하는 방법을 배워보세요.

1. [Datadog API 설정][3]으로 이동해 Datadog API 키를 복사하세요. 키를 환경 변수에 내보내기하세요.

   ```shell
   export DD_API_KEY=<YOUR_API_KEY>
   ```

2. 애플리케이션 이름을 APPNAME 환경 변수로 내보내기:

   ```shell
   export APPNAME=<YOUR_HEROKU_APP_NAME>
   ```

3. Datadog 사이트를 DD_SITE 환경 변수로 내보내기:

   ```shell
   export DD_SITE={{< region-param key=dd_site code="true" >}}
   ```

4. Datadog 빌드팩을 프로젝트에 추가:

   ```shell
   cd <HEROKU_PROJECT_ROOT_FOLDER>

   # Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
   heroku labs:enable runtime-dyno-metadata -a $APPNAME

   # Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
   heroku config:add DD_DYNO_HOST=true

   # Set the DD_SITE env variable automatically
   heroku config:add DD_SITE=$DD_SITE

   # Add this buildpack and set your Datadog API key
   heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git
   heroku config:add DD_API_KEY=$DD_API_KEY

   # Deploy to Heroku forcing a rebuild
   git commit --allow-empty -m "Rebuild slug"
   git push heroku main
   ```

완료 후 각 dyno가 시작되면 Datadog 에이전트가 자동으로 시작됩니다.

Datadog Agent는 statsd/dogstatsd 메트릭 및 이벤트에 대한 `8125` 수신 포트를 제공합니다. 트레이스는 `8126` 포트에서 수집합니다.

### 빌드팩 주문
헤로쿠 설명서의 [빌드팩 보기][4]에서 설명된 대로 목록에 있는 마지막 빌드팩에서 애플리케이션에 대한 프로세스 유형을 결정하는 데 사용됩니다.

[heroku-buildpack-apt][5], [puppeteer-heroku-buildpack][6], 또는 [heroku-buildpack-monorepo][7] 등 `/app` 폴더를 수정하는 빌드팩 등 apt 패키지를 설치하는 빌드팩은 Datadog 빌드팩 **이전에** 추가될 필요가 있습니다. 예를 들어, 애플리케이션에서 `ruby`, `datadog` 및 `apt` 빌드팩을 사용하는 경우 이것이 올바른 `heroku buildpacks` 출력입니다.

```text
1. https://github.com/heroku/heroku-buildpack-apt.git
2. https://github.com/DataDog/heroku-buildpack-datadog.git
3. heroku/ruby
```

## 특정 빌드팩 버전 및 특정 Datadog 에이전트 버전 고정

헤로쿠는 항상 최신 빌드팩을 사용할 것을 권장합니다. 빌드팩 버전을 고정하려면 빌드팩 릴리스 태그를 지정하여 이를 수행할 수 있습니다.

```
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#<DATADOG_BUILDPACK_RELEASE>
```

`<DATADOG_BUILDPACK_RELEASE>`를 사용하려는 [빌드팩 릴리스][8]로 교체합니다.

기본적으로 빌드팩은 릴리스 시점 최신 버전의 Datadog 에이전트를 고정합니다. `DD_AGENT_VERSION` 환경 변수를 설정해 이전 버전에 에이전트를 고정할 수 있습니다.

## 업그레이드 및 slug 재컴파일

이 빌드팩을 업그레이드하거나 특정 빌드팩 옵션을 수정하면 slug를 다시 컴파일해야 합니다.

다음 옵션은 slug를 다시 컴파일해야 합니다.

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

예를 들어 `DD_AGENT_VERSION` 등, 이 빌드팩을 업그레이드하거나 옵션을 변경하려면, 다음 단계가 필요합니다.

```shell
# Set new version of the Agent
heroku config:set DD_AGENT_VERSION=<NEW_AGENT_VERSION> -a <YOUR_APP_NAME>

# Rebuild your slug with the new Agent version:
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

## 설정

위에 표시된 환경 변수와 함께 설정할 수 있는 몇 가지 옵션들이 있습니다.

| 설정                    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | *필수* API 키는 [조직 설정 -> API 키][3] 페이지에서 사용할 수 있습니다. **참고**: 애플리케이션 키가 아닌 *API*키입니다.                                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_HOSTNAME`              | *옵션* **경고**: 수동으로 호스트 이름을 설정하면 메트릭스 연속성 오류가 발생할 수 있습니다. 이 변수를 설정하지 *않는 것이* 좋습니다. dyno 호스트가 오래 지속되지 않기 때문에 `dynoname` 또는 `appname`을 모니터링하는 것이 좋습니다.                                                                                                                                                                                                                                                        |
| `DD_DYNO_HOST`             | *옵션* `true`로 설정하여 `web.1` 또는 `run.1234` 등 dyno 이름을 호스트 이름으로 사용합니다. 자세한 정보는 아래 [호스트 이름 섹션](#hostname)을 참조하세요. 기본값은 `false`입니다.                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS` | *옵션* 공백으로 구분된 열로 제공된 추가 태그를 설정합니다(**참고**: 빌드팩 버전 `1.16` 이전에서 쉼표로 구분된 열, 이는 여전히 역호환성을 위해 지원됩니다.) 예: `heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`. 빌드팩은 자동으로 `web.1` 및 `dynotype`(dyno 유형, 예: `run` 또는 `web`) 등 dyno 이름을 대표하는 `dyno` 태그를 추가합니다. 자세한 정보는 [태깅 가이드][10]를 참조하세요. |
| `DD_VERSION`                  | *옵션* 버전별 트레이스를 구성하는 데 사용되는 애플리케이션 버전을 설정합니다.                                                                                                                                          |
| `DD_HISTOGRAM_PERCENTILES` | *옵션* 선택적으로 히스토그램 메트릭을 위한 추가 백분위수를 설장합니다. [백분위수를 그래프로 만드는 방법][11]을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | *옵션* 설정한 경우 Datadog 에이전트가 실행되지 ㅇ낳습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | *옵션* 트레이스 수집은 기본적으로 활성화됩니다. `false`로 설정해 트레이스 수집을 비활성화합니다. 이 옵션을 변경하려면 slug를 다시 컴파일해야 합니다. 자세한 정보는 [slug 업그레이드 및 재컴파일 섹션](#slug-업그레이드-및-재컴파일)을 확인하세요.                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | *옵션* Datadog 프로세스 에이전트는 기본적으로 비활성화됩니다. `true`로 설정해 프로세스 에이전트를 활성화합니다. 이 옵션을 변경하려면 slug를 재컴파일해야 합니다. 자세한 정보는 [slug 업그레이드 및 재컴파일 섹션](#slug-업그레이드-및-재컴파일)을 참조하세요.                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | *옵션* app.datadoghq.eu 서비스를 사용하는 경우 이를 `datadoghq.eu`로 설정합니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *옵션* 기본적으로 빌드팩은 패키지 리포지토리에서 사용 가능한 최신 Datadog 에이전트 6.x 버전을 설치합니다. 이 변수를 사용해 Datadog 에이전트 이전 버전을 설치하세요. **참고**: 일부 에이전트는 사용하지 않을 수 있습니다. 이 옵션은 `DD_AGENT_MAJOR_VERSION`보다 우선합니다. 이 옵션을 변경하려면 slug를 재컴파일해야 합니다. 자세한 정보는 [slug 업그레이드 및 재컴파일](#slug-업그레이드-및-재컴파일)을 참조하세요.                                           |
| `DD_AGENT_MAJOR_VERSION`   | *옵션* 기본적으로 빌드팩은 패키지 리포지토리에서 사용 가능한 Datadog 에이전트 최신 7.x 버전을 설치합니다. 이 변수를 `6`로 설정해 Datadog 에이전트 최신 6.x 버전을 설치합니다. 에이전트 버전과 파이썬(Python) 버전과 관련된 자세한 정보는 [파이썬 버전 섹션](#파이썬-및-에이전트-버전)을 참조하세요. 이 옵션을 변경하려면 slug를 재컴파일합니다. 자세한 정보는 [slug 업그레이드 및 재컴파일](#slug-업그레이드-및-재컴파일)을 참조하세요.     |
| `DD_DISABLE_HOST_METRICS`  | *옵션* 기본적으로 빌드팩은 dyno가 실행되는 호스트 머신의 시스템 메트릭을 보고합니다. 이를 `true`로 설정하여 시스템 메트릭 수집을 비활성화하세요. 자세한 정보는 아래에서 [시스템 메트릭 섹션](#시스템-메트릭)을 참조하세요.                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *옵션* `6.14.0` 버전부터 Datadog 에이전트는 파이썬 버전 `2` 및 `3`과 함께 제공됩니다. 빌드팩은 버전 중 하나만 유지합니다. 이를 `2` 또는 `3`로 설정하여 에이전트에서 유지하려는 파이썬 버전을 선택하세요. 설정하지 않으면 빌드팩은 `2`을 유지합니다. 자세한 정보는 [파이썬 버전 섹션](#파이썬-및-에이전트-버전)을 참조하세요. 이 옵션을 변경하려면 slug를 재컴파일해야 합니다. 자세한 정보는 [slug 업그레이드 및 재컴파일 섹션](#slug-업그레이드-및-재컴파일)을 확인하세요. |
| `DD_HEROKU_CONF_FOLDER`    | *옵션* 기본적으로 빌드팩은 포함하려는 모든 설정 파일에 대해 `/datadog` 폴더의 애플리케이션 루트를 포함합니다. 이를 설정하여 원하는 경로에 이 위치를 재정의할 수 있습니다. |
| `DD_ENABLE_HEROKU_REDIS`    | *옵션* 참으로 설정하여 Redis 통합 자동 검색을 활성화하세요. [Datadog Redis 통합 섹션 활성화](#Datadog-Redis-통합-활성화)를 확인하세요. |
| `DD_REDIS_URL_VAR`    | *옵션* 기본적으로 Redis 통합 자동 검색은 `REDIS_URL`에 저장된 연결 문자열을 사용합니다. 재정의하려면 이 변수를 쉼표로 구분된 연결 문자열에 저장된 변수 이름 목록으로 설정합니다. 자세한 정보는 [Datadog Redis 통합 섹션](#datadog-redis-통합-활성화)을 확인하세요. |
| `DD_ENABLE_HEROKU_POSTGRES`    | *옵션* 이를 참으로 설정하여 Postgres 통합 자동 검색을 활성화합니다. 자세한 정보는 [Datadog Postgres 통합 섹션 활성화](datadog-postgres-통합-활성화)를 확인하세요. |
| `DD_POSTGRES_URL_VAR`    | *옵션* 기본적으로 Postgres 통합 자동 검색은 `DATABASE_URL`에 저장된 연결 문자열을 사용합니다. 재정의하려면 이 변수를 쉼표로 구분된 연결 문자열이 저장된 변수 이름 목록으로 설정합니다. 자세한 정보는 [Datadog Postgres 통합 섹션 활성화](#datadog-postgres-통합-활성화)를 확인하세요. |
| `DD_ENABLE_DBM`    | *옵션* [이 가이드](#datadog-postgres-통합-활성화)를 따라 Datadog Postgres 통합을 활성화하면 `DD_ENABLE_DBM`을 `true`로 설정해 Database 모니터링을 활성화합니다. |

추가 설명서는 [Datadog 에이전트 설명서][12]를 참조하세요.

## 호스트네임

헤로쿠(Heroku) dyno는 수명이 짧습니다. 새로운 코드가 구축되고, 설정 변경이 있거나 리소스 필요/가용성이 변경될 때마다 각기 다른 호스트 머신으로 이동될 수 있습니다. 헤로쿠는 유연하고 반응성이 뛰어나므로 Datadog에서 많은 수의 호스트가 보고될 수 있습니다. Datadog는 호스트 기반으로 청구하고 빌드팩 기본값은 실제 호스트를 보고하므로 예상보다 더 높은 비용이 발생할 수 있습니다. 

사용 사례에 따라 더 적은 수의 호스트를 집계하고 보고하도록 호스트 이름을 설정하길 원할 수 있습니다. 그렇게 하려면 `DD_DYNO_HOST`를 `true`로 설정하세요. 그러면 에이전트가 호스트 이름을 앱 및 dyno 이름을 보고합니다(예: `appname.web.1` 또는 `appname.run.1234`) 또한 호스트 개수는 dyno 사용량과 일치하게 됩니다. 하나의 단점은 dyno가 순환할 때마다 메트릭 지속성 오류가 다소 발생할 수 있다는 점입니다.

올바르게 작동하도록 하려면 `HEROKU_APP_NAME`을 설정해야 합니다. 가장 손쉬운 방법은 [dyno 메타데이터를 활성화][13]하는 것입니다. **참고**: Dyno 메타데이터는 아직 비공개 영역에서 사용할 수 없습니다. 이 경우 수동으로 `HEROKU_APP_NAME`을 설정해야 합니다. 

## 수명이 짧은 dyno를 위한 Datadog 에이전트 비활성화

기본적으로, Datadog 에이전트는 애플리케이션의 일부인 각 dyno에서 실행됩니다. `scheduler`, `release` 또는 `run`를 포함합니다. 많은 경우 이런 dyno의 메트릭은 필요하지 않으며 이에 대해 Datadog 에이전트를 비활성화해도 좋습니다.

dyno 유형에 따라 Datadog 에이전트를 비활성화하려면 다음 스니펫을 [prerun.sh script](#prerun-스크립트)(모니터링하려는 dyno 유형에 적응)에 추가합니다.

```shell
# Disable the Datadog Agent based on dyno type
if [ "$DYNOTYPE" == "run" ] || [ "$DYNOTYPE" == "scheduler" ] || [ "$DYNOTYPE" == "release" ]; then
  DISABLE_DATADOG_AGENT="true"
fi
```

## 시스템 메트릭

기본적으로, 빌드팩은 dyno에서 실행되는 호스트 머신의 시스템 메트릭을 수집합니다. 시스템 메트릭은 이 빌드팩을 사용하는 개별 dyno에서 사용할 수 없습니다. 호스트 시스템 메트릭 수집을 비활성화하려면 `DD_DISABLE_HOST_METRICS` 환경 변수를 `true`로 설정합니다.

dyno에 대한 시스템 메트릭을 수집하려면, 다음을 해야 합니다.

1. [헤로쿠 랩: 로그-런타임-메트릭][14]을 활성화합니다.
2. [Datadog 로그 드레인][15]을 사용하여 헤로쿠 Logplex에서 메트릭 로그를 수집하여 Datadog로 전달합니다.
3. 수집된 로그에 대해 [로그-기반 메트릭][16]을 생성합니다.

## 파일 위치

* Datadog 에이전트는 `/app/.apt/opt/datadog-agent`에 설치되어 있습니다.
* Datadog 에이전트 설정 파일은 `/app/.apt/etc/datadog-agent`에 있습니다.
* Datadog 에이전트 로그는 `/app/.apt/var/log/datadog`에 있습니다.

## 통합 활성화

### Datadog Redis 통합 활성화

헤로쿠 애플리케이션에서 Redis 애드온을 사용하는 경우(예: Redis용 헤루쿠 데이터 또는 Redis Enterprise Cloud), 환경 변수를 설정해 Datadog Redis 통합을 활성화할 수 있습니다.

```
heroku config:set DD_ENABLE_HEROKU_REDIS=true
```

기본적으로 이 통합은 Redis 연결 URL이 `REDIS_URL` 환경 변수에 정의되어 있다고 가정합니다. 해당 환경 변수는 Redis용 헤로쿠 데이터 및 기타 Redis 애드온 기본값입니다.

연결 URL이 각기 다른 환경 변수에 정의되었거나 Redis 인스턴스 1개 이상을 설정해야 하는 경우, `DD_REDIS_URL_VAR` 환경 변수를 쉼표로 구분된 연결 문자열 이름으로 설정합니다. 예를 들어 헤로쿠 Redis와 Redis Enterprise Cloud을 사용하는 경우 `DD_REDIS_URL_VAR`를 설정합니다.

```
heroku config:set DD_REDIS_URL_VAR=REDIS_URL,REDISCLOUD_URL
```

### Datadog Postgres 통합 활성화

헤로쿠(Heroku) 애플리케이션에서 Postgres 애드온을 사용하는 경우(예: 헤로쿠 Postgres), 환경 변수를 설정하여 Datadog Postgres 통합을 활성화할 수 있습니다.

```
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
```

기본적으로 이 통합은 Postgres 연결 URL이 `DATABASE_URL` 환경 변수에 정의되어 있는 것으로 간주합니다. 이는 헤로쿠 Postgres 및 기타 Postgres 애드온 기본 설정입니다.

연결 URL이 각기 다른 환경 변수에 정의되어 있거나 Postgres 인스턴스를 1개 이상 설정하려면, `DD_POSTGRES_URL_VAR` 환경 변수를 쉼표로 구분된 연결 문자열 변수 이름으로 설정합니다. 예를 들어 Postgres 인스턴스 2개가 있고, 연결 문자열이 `POSTGRES_URL1` 및 `POSTGRES_URL2`에 저장된 경우 `DD_POSTGRES_URL_VAR`를 설정하세요.

```
heroku config:set DD_POSTGRES_URL_VAR=POSTGRES_URL1,POSTGRES_URL2
```

Postgres 인스턴스를 위해 [Database 모니터링][17]을 활성화하려면 [이러한 지침][18]에 따라 에이전트가 데이터베이스에 액세스하도록 허용하고 `DD_ENABLE_DBM`을 참으로 설정합니다.

```
heroku config:set DD_ENABLE_DBM=true
```

Database 모니터링을 사용하려면 Datadog 에이전트용 데이터베이스 자격 증명을 생성해야 합니다. 그러므로 DBM은 헤로쿠 Postgres Essential Tier 플랜에서 사용할 수 없습니다.

### 기타 통합 활성화

[Datadog<INTEGRATION_NAME> 통합][19]을 활성화하는 경우

* 애플리케이션 내 `datadog/conf.d` 폴더를 생성합니다.
* 각 통합을 활성화하려면 `<INTEGRATION_NAME>.d` 폴더를 생성합니다.
* 폴더에서 [통합 설정][20]을 사용해 `conf.yaml`을 생성합니다.

dyno 시작 동안 YAML 파일은 적절한 Datadog 에이전트 설정 디렉터리에 복사됩니다.

예를 들어 [Datadog-Memcache 통합][21]을 활성화하려면 애플리케이션 루트 `/datadog/conf.d/mcache.d/conf.yaml`에 파일을 추가합니다(또는 `/$DD_HEROKU_CONF_FOLDER/conf.d/mcache.d/conf.yaml`). 이 [설정 옵션](#설정)을 변경한 경우:

```yaml
init_config:

instances:
  ## @param url - string - required
  ## url used to connect to the Memcached instance.
  #
  - url: localhost
```

모든 사용 가능한 설정 옵션은 샘플 [mcache.d/conf.yaml][22]을 참조하세요.

### 커뮤니티 통합

활성화하려는 통합이 [커뮤니티 통합][23]의 일부인 경우, 패키지를 [prerun script](#prerun-script)의 일부로 패키지를 설치합니다.

```
agent-wrapper integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

예를 들어 [핑 통합][24]를 설치하려면 설정 파일 `datadog/conf.d/ping.d/conf.yaml`을 생성하고 다음 라인을 사전 실행 스크립트에 다음 라인을 추가합니다.

```
agent-wrapper integration install -t datadog-ping==1.0.0
```

### dyno 기반 통합 비활성화

모든 dyno에서 헤로쿠 애플리케이션에 있는 파일 시스템이 공유됨에 따라 통합을 활성화하면 `run` 또는 `worker` dyno를 포함하는 각 dyno에서 실행됩니다. dyno 이름 또는 유형에 따라 통합 실행을 제한하려면 작은 스니펫을 [사전 실행 스크립트](#사전 실행-스크립트)에 추가할 수 있습니다.

예를 들어, Gunicorn 통합이 `web` 유형 dyno에서만 실행되어야 하는 경우 다음을 사전 실행 스크립트에 추가합니다.

```
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi
```

## 커스텀 점검 활성화

자체적인 [에이전트 커스텀 점검][25]을 활성화하려면 애플리케이션 내에 있는 Datadog 설정 폴더에 `checks.d` 폴더를 생성합니다. 폴더 아래에 커스텀 점검에 있는 모든 `.py` 및 `.yaml` 파일을 복사합니다. dyno 시작 동안 파일은 적합한 Datadog 에이전트 설정 디렉터리로 복사됩니다.

예를 들어 `foo` 및 `bar`, 2개의 커스텀 점검이 있는 경우 다음이 올바른 폴더 트리입니다.

```
.
└── app
    └── datadog
        └── checks.d
            ├── foo.py
            ├── foo.yaml
            ├── bar.py
            └── bar.yaml

```

## 사전 실행 스크립트

위의 모든 설정과 더불어 애플리케이션에 `/datadog/prerun.sh` 사전 실행 스크립트를 포함할 수 있습니다. 사전 실행 스크립트는 모든 표준 설정 작업 이후, 그리고 Datadog 에이전트 시작 전에 실행됩니다. DD_TAGS 또는 DD_VERSION 등 환경 변수를 수정하고, 추가 설정을 구성하고, 커뮤니티 통합을 설치하거나 심지어 프로그램에서 Datadog 에이전트를 비활성화할 수 있습니다.

아래 예는 `prerun.sh` 스크립트에서 할 수 있는 몇 가지 작업을 보여줍니다.

```shell
#!/usr/bin/env bash

# dyno 유형에 따라 Datadog 에이전트 비활성화
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# dyno 유형에 따라 통합 비활성화
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi

# HEROKU_SLUG_COMMIT에 따라 앱 버전 설정
if [ -n "$HEROKU_SLUG_COMMIT" ]; then
  DD_VERSION=$HEROKU_SLUG_COMMIT
fi

# "ping" 커뮤니티 통합 설치
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Datadog 콘솔 출력 제한

일부 경우 Datadog 빌드팩이 콘솔에 작성하는 로그 양을 제한하길 원할 수 있습니다.

빌드팩의 로그 출력을 제한하려면 `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`, `OFF` 중 하나에 `DD_LOG_LEVEL` 환경 변수를 설정합니다.

```shell
heroku config:add DD_LOG_LEVEL=ERROR
```

## 선택적 바이너리

slug 영역을 저장하려면, `DD_APM_ENABLED`가 `false`로 설정되어 있거나 `DD_PROCESS_AGENT`이 설정 안 됨 또는 `false`로 설정되어 있는 경우 컴파일 동안 선택적 `process-agent` 바이너리가 제거됩니다.

slug 크기를 줄이려면 `DD_APM_ENABLED`이 `false`로 설정되어 있도록 합니다. APM 기능을 사용하지 않고 `DD_PROCESS_AGENT`가 `true`로 설정되지 않은 경우, 프로세스 모니터링을 사용하지 않은 것입니다.

## 디버깅

[정보 또는 디버깅 명령][26]을 실행하려면 `agent-wrapper` 명령을 사용합니다.

예를 들어 Datadog 에이전트 상태와 활성화된 통합을 표시하려면 다음을 실행합니다.

```shell
agent-wrapper status
```

## 파이썬 및 에이전트 버전

`6.14` 버전 이전 파이썬 버전 `2`이 내장된 Datadog v6 에이전트가 출시되었습니다. 2020년 1월  `6.14`부터 파이썬 버전 `2` 수명 종료를 준비 중임을 발표했습니다. Datadog v6 에이전트는 파이썬 버전 `2` 및 `3` 모두를 포함해 출시되어 소비자가 커스텀 점검을 파이썬 버전 `3`으로 이전할 수 있는 충분한 시간을 제공합니다. 헤로쿠 빌드팩은 버전 중 하만을 유지합니다. `DD_PYTHON_VERSION`을 `2` 또는 `3`로 설정하여 에이전트에서 유지하려는 파이썬 버전을 선택합니다. 설정하지 않는 경우 빌드팩은 파이썬 버전 `2`을 유지합니다. 오직 파이썬 버전 `2`와 호환되는 커스텀 점검을 사용하는 경우 수명 종료 전 `3` 버전으로 마이그레이션합니다.

에이전트 v7는 파이썬 버전 `3`을 포함해 출시합니다. 커스텀 점검을 사용하지 않거나 커스텀 점검이 이미 버전 `3`에 마이그레이션된 경우 가능한 한 빨리 에이전트 v7에 이동합니다. `6.15`부터 v7은 동일한 기능 설정을 공유하는 동일한 부 버전과 함께 릴리스되어 두 버전 간 안전한 이동이 가능합니다. 예를 들어 `6.16`을 실행하는 경우 파이썬 버전 `2`이 필요하지 않으며 안전하게 `7.16`로 건너뛸 수 있습니다. 

## 헤로쿠 로그 수집

Datadog 빌드팩은 헤로쿠 플랫폼에서 로그를 수집하지 않습니다. 헤로쿠 로그 수집을 설정하려면 [전용 가이드][15]를 참조하세요.

## 도커(Docker) 이미지를 포함하는 헤로쿠 사용

이 빌드팩은 [헤로쿠 Slug 컴파일러][27]를 사용하는 헤로쿠 구축 환경에서만 작동합니다. 도커 컨테이너를 사용하는 헤로쿠에서 애플리케이션을 구축하는 경우

1. 도커 이미지의 일부로 Datadog 에이전트를 추가하고 컨테이너의 다른 프로세스로 에이전트를 시작합니다.
2. 헤로쿠 애플리케이션에서 다음 설정 옵션을 사용해 Datadog가 이를 헤로쿠 dyno로 올바르게 보고하도록 합니다.

```shell
heroku config:add DD_HEROKU_DYNO=true
```

예를 들어, 데비안(Debian) 기반 OS를 사용해 도커 이미지를 빌드하는 경우 `Dockerfile`에 다음 라인을 추가하세요.

```
# GPG 종속성 설치
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Datadog 리포지토리 및 서명 키 추가
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_C0962C7D.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_C0962C7D.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_C0962C7D.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public


# Datadog 에이전트 설치
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# 엔트리포인트 복사
COPY entrypoint.sh /

# DogStatsD 및 트레이스-에이전트 포트 익스포즈
EXPOSE 8125/udp 8126/tcp

# Datadog 설정 복사
COPY datadog-config/ /etc/datadog-agent/

CMD ["/entrypoint.sh"]
```

도커 컨테이너 엔트리 포인트에서 Datadog 에이전트, Datadog 애플리케이션 성능 모니터링(APM) 에이전트 및 Datadog 프로세스 에이전트를 시작합니다.

```
#!/bin/bash

datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml
```

도커 이미지의 더 많은 고급 옵션을 보려면 [Datadog 에이전트 도커 파일][28]을 참조하세요.

## 기여하기

[기여 가이드라인][29]를 참조하여 [헤로쿠-빌드팩-Datadog 리포지토리][30]에 이슈나 PR을 시작하는 방법을 알아보세요.

## 내역

이 프로젝트의 이전 버전은 [마이크더맨 헤로쿠-빌드팩-datadog 프로젝트][31]에서 가져온 것입니다. 대부분 Datadog 에이전트 버전 6을 위해 재작성되었습니다. 변경 사항과 자세한 정보는 [변경 로그][32]에서 찾을 수 있습니다.

## 트러블슈팅

### 에이전트 상태 받기

빌드팩을 설정했고 Datadog에서 예상 데이터를 일부 받지 못하고 있다면, Datadog 에이전트에 대한 상태 명령을 실행해 원인을 파악할 수 있습니다.

```shell
# 환경 변수로 헤로쿠 애플리케이션 이름 내보내기
export APPNAME=your-application-name

heroku ps:exec -a $APPNAME

# 자격 증명 설정 중... 완료
# ⬢ ruby-heroku-datadog에서 web.1으로 연결 중...
# DD_API_KEY 환경 변수가 설정되지 않았습니다. 다음 실행: heroku config:add DD_API_KEY=<your API key>
# Datadog 에이전트가 비활성화되었습니다. DISABLE_DATADOG_AGENT를 설정 취소하거나 누락된 환경 변수를 설정합니다.

~ $
```

설정되지 않은 DD_API_KEY에 대한 경고는 무시해도 좋습니다. [헤로쿠는 SSH 세션에 대한 설정 변수를 설정하지 않지만](https://devcenter.heroku.com/articles/exec#environment-variables) Datadog 에이전트 프로세스가 해당 변수에 액세스할 수 있습니다.

SSH 세션이 시작되면 Datadog 상태 명령을 실행합니다.

```shell
~ $ agent-wrapper status

Getting the status from the agent.

===============
Agent (v7.27.0)
===============

[...]

```

### 디버깅

#### Datadog에 데이터 없음

`status` 명령이 올바르게 실행되고 출력 섹션이 API 키의 유효성을 표시하는지 확인하세요.

```
  API Keys status
  ===============
    API key ending with 68306: API Key valid
```

#### 통합 확인

활성화한 통합이 올바르게 실행되는지 확인하려면 `Collector` 섹션에서 점검이 올바르게 실행되는지 확인하세요.

```
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
      Total Runs: 4,282
      Metric Samples: Last Run: 15, Total: 64,230
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 4,282
      Average Execution Time : 43ms
      Last Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      Last Successful Execution Date : 2021-05-13 08:15:46 UTC (1620893746000)
      metadata:
        version.major: 13
        version.minor: 2
        version.patch: 0
        version.raw: 13.2 (Ubuntu 13.2-1.pgdg20.04+1)
        version.scheme: semver
```

#### APM 에이전트 점검

APM에 대해 애플리케이션을 계측하였고 Datadog에서 트레이스를 받지 못하고 있는 경우 APM 에이전트가 올바르게 실행되어 트레이스를 수집하는지 점검할 수 있습니다.

```
[...]
=========
APM Agent
=========
  Status: Running
  Pid: 63
  Uptime: 64702 seconds
  Mem alloc: 10,331,128 bytes
  Hostname: ruby-heroku-datadog.web.1
  Receiver: localhost:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    From ruby 2.6.6 (ruby-x86_64-linux), client 0.48.0
      Traces received: 11 (14,181 bytes)
      Spans received: 33

    Default priority sampling rate: 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:': 100.0%
    Priority sampling rate for 'service:ruby-heroku-datadog,env:development': 100.0%

[...]
```

### Datadog가 dyno보다 많은 수의 에이전트를 보고합니다.

`DD_DYNO_HOST`가 `true`로 설정되어 있고 모든 헤로쿠 애플리케이션에 대해 `HEROKU_APP_NAME` 값이 설정되어 있어야 합니다. 자세한 정보는 [호스트 이름 섹션](#호스트이름)을 참조하세요.

### 빌드팩이나 에이전트를 업그레이드한 후, 시작 시 에이전트가 오류를 보고합니다.

빌드팩 또는 에이전트 업그레이드 이후 애플리케이션의 slug을 컴파일해야 합니다. 자세한 정보는 [업그레이드 및 slug 재컴파일 섹션](#업그레이드-및-slug-재컴파일)을 확인하세요.

[1]: https://devcenter.heroku.com/articles/buildpacks
[2]: https://docs.datadoghq.com/ko/libraries
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app#viewing-buildpacks
[5]: https://github.com/heroku/heroku-buildpack-apt
[6]: https://github.com/jontewks/puppeteer-heroku-buildpack
[7]: https://github.com/lstoll/heroku-buildpack-monorepo
[8]: https://github.com/DataDog/heroku-buildpack-datadog/releases
[10]: https://docs.datadoghq.com/ko/tagging/
[11]: https://docs.datadoghq.com/ko/dashboards/guide/how-to-graph-percentiles-in-datadog/
[12]: https://docs.datadoghq.com/ko/agent
[13]: https://devcenter.heroku.com/articles/dyno-metadata
[14]: https://devcenter.heroku.com/articles/log-runtime-metrics
[15]: https://docs.datadoghq.com/ko/logs/guide/collect-heroku-logs
[16]: https://docs.datadoghq.com/ko/logs/logs_to_metrics/
[17]: https://docs.datadoghq.com/ko/database_monitoring/
[18]: https://docs.datadoghq.com/ko/database_monitoring/setup_postgres/selfhosted/?tab=postgres10#grant-the-agent-access
[19]: https://docs.datadoghq.com/ko/integrations/
[20]: https://docs.datadoghq.com/ko/getting_started/integrations/#configuring-agent-integrations
[21]: https://docs.datadoghq.com/ko/integrations/mcache/
[22]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[23]: https://github.com/DataDog/integrations-extras/
[24]: https://github.com/DataDog/integrations-extras/tree/master/ping
[25]: https://docs.datadoghq.com/ko/developers/custom_checks/
[26]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[27]: https://devcenter.heroku.com/articles/slug-compiler
[28]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles
[29]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CONTRIBUTING.md
[30]: https://github.com/DataDog/heroku-buildpack-datadog
[31]: https://github.com/miketheman/heroku-buildpack-datadog
[32]: https://github.com/DataDog/heroku-buildpack-datadog/blob/master/CHANGELOG.md