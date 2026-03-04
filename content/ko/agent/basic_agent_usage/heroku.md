---
aliases:
- /ko/developers/faq/how-do-i-collect-metrics-from-heroku-with-datadog
dependencies:
- https://github.com/DataDog/heroku-buildpack-datadog/blob/master/README.md
title: Datadog 헤로쿠 빌드팩
---
이 [헤로쿠(Heroku) 빌드팩][1]은 헤로쿠 dyno에 Datadog 에이전트를 설치하여 시스템 메트릭, 커스텀 애플리케이션 메트릭, 그리고 트레이스를 수집합니다. 커스텀 애플리케이션 메트릭 또는 트레이스를 수집하려면 애플리케이션에 적절한 언어 [DogStatsD 또는 Datadog 애플리케이션 성능 모니터링(APM) 라이브러리][2]를 포함하세요.

## 설치

[Fleet Automation 인앱 설치 가이드]][33]에 따라 Heroku에 Datadog Agent를 설치합니다.

이 가이드에서는 Heroku에서 애플리케이션을 이미 실행 중이라고 가정합니다. Heroku에 애플리케이션을 배포하는 방법을 알아보려면 [Heroku 설명서][34]를 참조하세요.

1. [Datadog API 설정][3]으로 이동하여 Datadog API 키를 복사합니다. 환경 변수로 내보냅니다.

   ```shell
   export DD_API_KEY=<YOUR_API_KEY>
   ```

2. 애플리케이션 이름을 APPNAME 환경 변수로 내보내기:

   ```shell
   export APPNAME=<YOUR_HEROKU_APP_NAME>
   ```

3. Datadog 사이트를 DD_SITE 환경 변수로 내보냅니다.

   ```shell
   export DD_SITE={{< region-param key=dd_site code="true" >}}
   ```

4. 프로젝트에 Datadog 빌드팩을 추가합니다.

   ```shell
   cd <HEROKU_PROJECT_ROOT_FOLDER>

   # Enable Heroku Labs Dyno Metadata to set HEROKU_APP_NAME env variable automatically
   heroku labs:enable runtime-dyno-metadata -a $APPNAME

   # Set hostname in Datadog as appname.dynotype.dynonumber for metrics continuity
   heroku config:add DD_DYNO_HOST=true -a $APPNAME

   # Set the DD_SITE env variable automatically
   heroku config:add DD_SITE=$DD_SITE -a $APPNAME

   # Add this buildpack and set your Datadog API key
   heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git -a $APPNAME
   heroku config:add DD_API_KEY=$DD_API_KEY -a $APPNAME

   # Deploy to Heroku forcing a rebuild
   git commit --allow-empty -m "Rebuild slug"
   git push heroku main
   ```

완료되면 각 dyno가 시작될 때 Datadog 에이전트가 자동으로 시작됩니다.

Datadog 에이전트는 statsd/dogstatsd 메트릭 및 이벤트에 대한 포트에 대한 수신 포트 `8125`를 제공합니다. 트레이스는 `8126` 포트에서 수집됩니다.

### 빌드팩 주문
헤로쿠 설명서 [빌드팩 보기][4]에 설명된 대로 목록의 마지막 빌드팩은 애플리케이션의 프로세스 유형을 결정하는 데 사용됩니다.

[heroku-buildpack-apt][5], [puppeteer-heroku-buildpack][6] 등 apt 패키지를 설치하는 빌드팩이나 [heroku-buildpack-monorepo][7] 등 `/app` 폴더를 수정하는 빌드팩은 Datadog 빌드팩 **전**에 추가해야 합니다. 예를 들어 애플리케이션에서 `ruby`, `datadog` 및 `apt` 빌드팩을 사용하는 경우 올바른 `heroku buildpacks` 출력이 나타납니다.

```text
1. https://github.com/heroku/heroku-buildpack-apt.git
2. https://github.com/DataDog/heroku-buildpack-datadog.git
3. heroku/ruby
```

## 특정 빌드팩 버전과 특정 Datadog 에이전트 버전 고정하기

헤로쿠는 항상 최신 빌드팩 커밋을 사용할 것을 권장합니다. 빌드팩 버전을 고정해야 하는 경우 빌드팩 릴리스 태그를 지정하여 고정할 수 있습니다:

```
heroku buildpacks:add --index 1 https://github.com/DataDog/heroku-buildpack-datadog.git#<DATADOG_BUILDPACK_RELEASE>
```

`<DATADOG_BUILDPACK_RELEASE>`를 사용하려는 [빌드팩 릴리스][8]로 대체합니다.

기본적으로 빌드팩은 릴리스 시점에 Datadog 에이전트의 최신 버전을 고정합니다. `DD_AGENT_VERSION` 환경 변수를 설정하여 에이전트를 이전 버전으로 고정할 수 있습니다.

## 업그레이드 및 슬러그 재컴파일

이 빌드팩을 업그레이드하거나 특정 빌드팩 옵션을 수정하려면 슬러그를 다시 컴파일해야 합니다.

다음 옵션을 사용하려면 슬러그를 다시 컴파일해야 합니다:

* `DD_AGENT_VERSION`
* `DD_AGENT_MAJOR_VERSION`
* `DD_PYTHON_VERSION`
* `DD_APM_ENABLED`
* `DD_PROCESS_AGENT`

이 빌드팩을 업그레이드하거나 이러한 옵션(예: `DD_AGENT_VERSION`)을 변경하려면 다음 단계가 필요합니다.

```shell
# Set new version of the Agent
heroku config:set DD_AGENT_VERSION=<NEW_AGENT_VERSION> -a <YOUR_APP_NAME>

# Rebuild your slug with the new Agent version:
git commit --allow-empty -m "Rebuild slug"
git push heroku main
```

## 설정

위에 표시된 환경 변수 외에도 설정할 수 있는 변수가 몇 가지 더 있습니다.

| 설정                    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`               | * API 키는 [조직 설정 -> API 키][3] 페이지에서 사용할 수 있습니다. **참고**: 이 키는 애플리케이션 키가 아닌 *API* 키입니다.                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_HOSTNAME`              | *선택 사항* **경고**: 호스트 이름을 수동으로 설정하면 메트릭 연속성 오류가 발생할 수 있습니다. 이 변수를 *설정하지 않는 것*을 권장합니다. dyno 호스트 는 임시적이므로 태그 `dynoname` 또는 `appname` 를 기반으로 모니터링하는 것을 권장합니다.                                                                                                                                                                                                                                                       |
| `DD_DYNO_HOST`             | *선택 사항* `web.1` 또는 `run.1234` 와 같은 dyno 이름을 호스트 이름으로 사용하려면 `true`로 설정합니다. 자세한 내용은 아래의 [호스트 이름 섹션](#hostname)을 참조하세요. 기본값은 `false`입니다.                                                                                                                                                                                                                                                                                                                                          |
| `DD_TAGS` | *선택 사항* 추가로 태그를 공백으로 구분된 문자열로 설정합니다(**주**: 빌드팩 버전 `1.16` 이하에서는 쉼표로 구분된 문자열이며, 이전 버전과의 호환성을 유지하기 위해 계속 지원됨). 예:`heroku config:set DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`. 빌드팩은 `web.1`, `dynotype`(예: `run` 또는 `web`) 등 dyno 이름을 나타내는 태그 `dyno`를 자동으로 추가합니다. 자세한 내용은 [태깅 가이드][10]를 참조하세요. |
| `DD_VERSION`                  | *선택 사항* 애플리케이션의 버전을 설정하며, 트레이스을 버전별로 구성하는 데 사용됩니다.                                                                                                                                          |
| `DD_HISTOGRAM_PERCENTILES` | *선택 사항* 선택적으로 히스토그램 메트릭에 대한 추가 백분위수를 설정합니다. [백분위수를 그래프로 표시하는 방법][11]을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `DISABLE_DATADOG_AGENT`    | *선택 사항* 설정하면 Datadog 에이전트가 실행되지 않습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_APM_ENABLED`           | *선택 사항* 트레이스 수집은 기본적으로 활성화되어 있습니다. 트레이스 수집을 비활성화하려면 `false`로 설정합니다. 이 옵션을 변경하려면 슬러그를 다시 컴파일해야 합니다. 점검 자세한 내용은 [업그레이드 및 슬러그 재컴파일 섹션](#upgrading-and-slug-recompilation)을 참조하세요.                                                                                                                                                                                                                                                          |
| `DD_PROCESS_AGENT`         | *선택 사항* Datadog 프로세스 에이전트는 기본적으로 비활성화되어 있습니다. 프로세스 에이전트를 활성화하려면 `true`로 설정합니다. 이 옵션을 변경하려면 슬러그를 다시 컴파일해야 합니다. 자세한 내용은 [업그레이드 및 슬러그 재컴파일 섹션](#upgrading-and-slug-recompilation)을 확인합니다.                                                                                                                                                                                                                                                 |
| `DD_SITE`                  | *선택 사항* app.datadoghq.eu 서비스를 사용하는 경우, `datadoghq.eu`로 설정합니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `DD_AGENT_VERSION`         | *선택 사항* 기본적으로 빌드팩은 패키지 리포지토리에서 제공되는 Datadog 에이전트 의 최신 6.x 버전을 설치합니다. 이전 버전의 Datadog 에이전트를 설치하려면 이 변수를 사용하세요. **참고**: 에이전트의 모든 버전을 사용할 수 있는 것은 아닙니다. 이 옵션은 `DD_AGENT_MAJOR_VERSION` 보다 우선합니다. 이 옵션을 변경하려면 슬러그를 다시 컴파일해야 합니다. 자세한 내용은 [업그레이드 및 슬러그 재컴파일](#upgrading-and-slug-recompilation)을 참조하세요.                                           |
| `DD_AGENT_MAJOR_VERSION`   | *선택 사항* 기본적으로 빌드팩은 패키지 리포지토리에서 제공되는 Datadog 에이전트 의 최신 7.x 버전을 설치합니다. 점검 이 변수를 `6` 로 설정하면 Datadog 에이전트 의 최신 6.x 버전이 설치됩니다. 에이전트 버전과 파이썬(Python) 버전의 관계에 대한 자세한 내용은 [파이썬(Python) 버전 섹션](#python-and-agent-versions)을 참조하세요. 이 옵션을 변경하려면 슬러그를 다시 컴파일해야 합니다. 자세한 내용은 [업그레이드 및 슬러그 재컴파일](#upgrading-and-slug-recompilation)을 참조하세요.     |
| `DD_DISABLE_HOST_METRICS`  | *선택 사항* 기본적으로 빌드팩은 dyno를 실행하는 호스트 머신에 대해 메트릭 시스템을 보고합니다. 시스템 메트릭 수집을 비활성화하려면 `true` 로 설정하세요. 자세한 내용은 아래 [시스템 메트릭 섹션](#system-metrics)을 참조하세요.                                                                                                                                                                                                                                                                                  |
| `DD_PYTHON_VERSION`        | *선택 사항* 버전 `6.14.0`, Datadog 에이전트는 파이썬(Python) 버전 `2` 및 `3`과 함께 제공됩니다. 빌드팩은 이중 하나의 버전만 유지합니다. `2` 또는 `3`으로 설정하여 에이전트에 유지하려는 파이썬(Python) 버전을 선택합니다. 설정하지 않으면 빌드팩은 `2`. 자세한 내용은 [파이썬(Python) 버전 섹션](#python-and-agent-versions)을 확인하세요. 이 옵션을 변경하려면 슬러그를 다시 컴파일해야 합니다. 자세한 내용은 [업그레이드 및 슬러그 재컴파일 섹션](#upgrading-and-slug-recompilation)을 참조하세요. |
| `DD_HEROKU_CONF_FOLDER`    | *선택 사항* 기본적으로 빌드팩은 애플리케이션 루트의 `/datadog` 폴더에서 포함하려는 설정 파일을 찾습니다. [prerun.sh script](#prerun-script)를 참조하세요. 이 위치를 원하는 경로로 설정하여 재정의할 수 있습니다. |
| `DD_ENABLE_HEROKU_REDIS`    | *선택 사항* Redis 통합 자동 검색을 활성화하려면 true로 설정합니다. 자세한 내용은 [Datadog Redis 통합 섹션 활성화](#enabling-the-datadog-redis-integration)를 확인하세요. |
| `DD_REDIS_URL_VAR`    | *선택 사항* 기본적으로 Redis 통합 자동 검색은 `REDIS_URL`에 저장된 연결 문자열을 사용합니다. 이를 재정의하려면 이 변수를 연결 문자열을 저장하는 쉼표로 구분된 변수 이름 목록 으로 설정합니다. 자세한 내용은 [Datadog Redis 통합 섹션 활성화하기](#enabling-the-datadog-redis-integration)를 확인하세요. |
| `DD_ENABLE_HEROKU_POSTGRES`    | *선택 사항* Postgres 통합 자동 검색을 활성화하려면 true로 설정합니다. 자세한 내용은 [Datadog Postgres 통합 섹션 활성화](#enabling-the-datadog-postgres-integration)를 참조하세요. |
| `DD_POSTGRES_URL_VAR`    | *선택 사항* 기본적으로 Postgres 통합 자동 검색은 `DATABASE_URL`에 저장된 연결 문자열을 사용합니다. 이를 재정의하려면 이 변수를 연결 문자열을 저장하는 쉼표로 구분된 변수 이름 목록으로 설정합니다. 자세한 내용은 [Datadog Postgres 통합 섹션 활성화하기](#enabling-the-datadog-postgres-integration)를 참조하세요. |
| `DD_ENABLE_DBM`    | *선택 사항* [이 가이드](#enabling-the-datadog-postgres-integration)에 따라 Datadog Postgres 통합을 활성화하는 경우 `DD_ENABLE_DBM`를 `true`로 설정하여 데이터베이스 모니터링를 활성화합니다. |

추가 문서는 [Datadog 에이전트 설명서][12]를 참조하세요.

## 호스트네임

헤로쿠(Heroku) dyno는 임시적이므로 새 코드가 배포되거나 설정 변경이 이루어지거나 리소스 요구/가용성이 변경될 때마다 다른 호스트 머신으로 이동할 수 있습니다. 따라서 헤로쿠가 유연하고 뛰어난 대응성을 갖추게 되지만 Datadog 에 호스트 보고되는 건수가 많을 수 있습니다. Datadog는 호스트 기준으로 청구하며 빌드팩 기본값은 실제 호스트를 보고하므로 예상 비용이 높아질 수 있습니다.

사용 사례에 따라 호스트 가 집계되어 더 낮은 수치를 보고하도록 호스트 이름을 설정할 수 있습니다. 이렇게 하려면 `DD_DYNO_HOST`를 `true`로 설정하면 에이전트 이 호스트 이름을 앱 및 dyno 이름(예: `appname.web.1` 또는 `appname.run.1234`)으로 보고하고 호스트 카운트가 dyno 사용량과 거의 일치하게 됩니다. 한 가지 단점은 다이노가 순환될 때마다 메트릭 연속성 오류가 표시될 수 있다는 것입니다.

이 기능이 제대로 작동하려면 `HEROKU_APP_NAME`을 설정해야 합니다. 가장 쉬운 방법은 [dyno 메타데이터를 활성화][13]하는 것입니다. **참고**: dyno 메타데이터는 아직 비공개 스페이스에서 사용할 수 없으며, 이 경우 `HEROKU_APP_NAME`을 수동으로 설정해야 합니다.

## 수명이 짧은 dyno의 경우 Datadog 에이전트 비활성화하기

기본적으로 Datadog 에이전트는 애플리케이션의 일부인 각 dyno에서 실행됩니다. 여기에는 `scheduler`, `release` 또는 `run` dyno가 포함됩니다. 대부분의 경우 이러한 dyno의 메트릭은 필요하지 않으므로 Datadog 에이전트를 비활성화하는 것이 좋습니다.

dyno 유형에 따라 Datadog 에이전트를 비활성화하려면 [prerun.sh 스크립트](#prerun-script)에 다음 스니펫을 추가하세요(모니터링을 원하지 않는 dyno 유형에 맞게 조정).

```shell
DYNOTYPE=${DYNO%%.*}
# Disable the Datadog Agent based on dyno type
if [ "$DYNOTYPE" == "run" ] || [ "$DYNOTYPE" == "scheduler" ] || [ "$DYNOTYPE" == "release" ]; then
  DISABLE_DATADOG_AGENT="true"
fi
```

## 시스템 메트릭

기본적으로 빌드팩은 dyno를 실행하는 호스트 머신에 대한 시스템 메트릭을 수집합니다. 이 빌드팩을 사용하는 개별 dyno에는 시스템 메트릭을 사용할 수 없습니다. 호스트 시스템 메트릭 수집을 비활성화하려면 `DD_DISABLE_HOST_METRICS` 환경 변수를 `true`로 설정하세요.

dyno를 위한 시스템 메트릭을 수집하려면 반드시 필요합니다.

1. [Heroku Labs: log-runtime-metrics][14]를 활성화합니다.
2. [Datadog 로그 드레인][15]를 사용하여 헤로쿠 로그플렉스에서 메트릭 로그를 수집하여 Datadog로 전달합니다.
3. 수집된 로그에 [로그 기반 메트릭][16]을 생성합니다.

## 파일 위치

* Datadog 에이전트 은 다음 주소에 설치됩니다. `/app/.apt/opt/datadog-agent`
* Datadog 에이전트 설정 파일은 다음 주소에 있습니다. `/app/.apt/etc/datadog-agent`
* Datadog 에이전트 로그는 다음 위치에 있습니다. `/app/.apt/var/log/datadog`

## 활성화 통합

### Datadog Redis 통합 활성화

헤로쿠 애플리케이션에서 Redis 애드온을 사용하는 경우(예: Heroku Data for Redis 또는 Redis Enterprise Cloud), 환경 변수를 설정하여 Datadog Redis 통합을 활성화할 수 있습니다:

```
heroku config:set DD_ENABLE_HEROKU_REDIS=true
```

기본적으로 이 통합은 `REDIS_URL`라는 환경 변수에 Redis 연결 URL이 정의되어 있다고 가정합니다(Heroku Data for Redis 및 기타 Redis 애드온의 경우 기본값 설정).

연결 URL이 다른 환경 변수에 정의되어 있거나 Redis 인스턴스를 2개 이상 설정하려는 경우 `DD_REDIS_URL_VAR` 환경 변수를 연결 문자열의 쉼표로 구분된 변수 이름으로 설정하세요. 예를 들어  Heroku Redis 및 Redis Enterprise Cloud를 모두 사용하는 경우 `DD_REDIS_URL_VAR`를 설정합니다:

```
heroku config:set REDIS_URL="redis://aaaaa:bbbbb@redis-url"
heroku config:set REDISCLOUD_URL="redis://xxxxx:yyyyy@redis-cloud-url"

# This env var must point to other env vars.
heroku config:set DD_REDIS_URL_VAR=REDIS_URL,REDISCLOUD_URL
```

### Datadog Postgres 활성화 통합

헤로쿠 애플리케이션에서 Postgres 애드온을 사용하는 경우(예: 헤로쿠 Postgres), 환경 변수를 설정하여 Datadog Postgres 통합을 활성화할 수 있습니다:

```
heroku config:set DD_ENABLE_HEROKU_POSTGRES=true
```

기본적으로 이 통합은 `DATABASE_URL`이라는 환경 변수에 Postgres 연결 URL이 정의되어 있다고 가정합니다( Heroku Postgres 및 기타 Postgres 추가 기능의 경우 기본값 설정).

연결 URL이 다른 환경 변수에 정의되어 있거나 Postgres 인스턴스 2개 이상을 설정하려는 경우 `DD_POSTGRES_URL_VAR` 환경 변수를 연결 문자열의 쉼표로 구분된 변수 이름으로 설정합니다. 예를 들어, 2개의 Postgres 인스턴스가 있고 연결 문자열이 `POSTGRES_URL1` 및 `POSTGRES_URL2`에 저장되어 있는 경우 `DD_POSTGRES_URL_VAR`를 적절히 설정합니다.

```
heroku config:set POSTGRES_URL1="postgres://aaaaa:bbbbb@postgres-url-1:5432/dbname"
heroku config:set POSTGRES_URL2="postgres://xxxxx:yyyyy@postgres-url-2:5432/dbname"

# This env var must point to other env vars.
heroku config:set DD_POSTGRES_URL_VAR=POSTGRES_URL1,POSTGRES_URL2
```

Postgres 인스턴스에 대해 [데이터베이스 모니터링][17]를 활성화하려면 [이 지침][18]에 따라 에이전트 데이터베이스에 대한 액세스 권한을 부여하고 `DD_ENABLE_DBM` 를 true로 설정합니다.

```
heroku config:set DD_ENABLE_DBM=true
```

데이터베이스 모니터링를 사용하려면 Datadog 에이전트에 대한 데이터베이스 자격 증명을 생성해야 하므로 Heroku Postgres Essential Tier 요금제에서는 DBM을 사용할 수 없습니다.

### DogStatsD 매퍼 프로필 활성화(Sidekiq)

[Sidekiq](https://docs.datadoghq.com/integrations/sidekiq/)와 같은 일부 통합은 [DogStatsD Mapper](https://docs.datadoghq.com/developers/dogstatsd/dogstatsd_mapper/) 프로파일이 필요합니다.

새 DogStatsD Mapper 프로필을 추가하려면 [prerun.sh 스크립트](#prerun-script)에 다음 스니펫을 추가하세요.

```
cat << 'EOF' >> "$DATADOG_CONF"

dogstatsd_mapper_profiles:
  - name: '<PROFILE_NAME>'
    prefix: '<PROFILE_PREFIX>'
    mappings:
      - match: '<METRIC_TO_MATCH>'
        match_type: '<MATCH_TYPE>'
        name: '<MAPPED_METRIC_NAME>'
        tags:
          '<TAG_KEY>': '<TAG_VALUE_TO_EXPAND>'
EOF
```

예를 들어, Sidekiq 통합을 활성화하려면 다음 스니펫을 추가합니다.

```
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

### 추가 통합 활성화

[Datadog-<INTEGRATION_NAME> 통합 ][19] 활성화:

* 애플리케이션 내에 `datadog/conf.d` 폴더를 생성합니다.
* 활성화할 통합 폴더마다 `<INTEGRATION_NAME>.d` 폴더를 생성합니다.
* 해당 폴더 아래에 [통합에 대한 설정][20]을 사용하여 `conf.yaml`을 생성합니다.

dyno가 시작되는 동안 YAML 파일은 적절한 Datadog 에이전트 설정 디렉터리에 복사됩니다.

예를 들어 [Datadog-Memcache 통합][21]을 활성화하려면 애플리케이션 루트에 `/datadog/conf.d/mcache.d/conf.yaml` 파일을 추가합니다(또는 이 [설정 옵션](#configuration)을 변경한 경우 `/$DD_HEROKU_CONF_FOLDER/conf.d/mcache.d/conf.yaml`).

```yaml
init_config:

instances:
  ## @param url - string - required
  ## url used to connect to the Memcached instance.
  #
  - url: localhost
```

**참고**: 사용 가능한 모든 설정 옵션은 샘플 [mcache.d/conf.yaml][22]을 참조하세요.

#### prerun.sh 스크립트를 사용하여 통합 설정을 동적 변경

환경 변수에 저장된 설정 세부 정보(예: 데이터베이스 설정 또는 시크릿)가 있는 경우, [prerun.sh 스크립트](#prerun-script)를 사용하여 에이전트 시작 전에 Datadog 에이전트 설정에 동적 추가할 수 있습니다.

예를 들어, Postgres 통합을 활성화하려면 애플리케이션 루트에서 `datadog/conf.d/postgres.d/conf.yaml` 파일을 플레이스홀더와 같이 추가할 수 있습니다(또는 본 [설정 옵션](#configuration)을 변경한 경우 `/$DD_HEROKU_CONF_FOLDER/conf.d/postgres.d/conf.yaml`).

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

그런 다음 `prerun.sh` 스크립트를 사용하여 해당 플레이스홀더를 다음과 같이 환경 변수의 실제 값으로 바꿉니다.

```bash
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

### 커뮤니티 통합

활성화하려는 통합이 [커뮤니티 통합 ][23]의 일부인 경우, [prerun 스크립트](#prerun-script)의 일부로 패키지를 설치합니다.

```
agent-wrapper integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

예를 들어 [ping 통합][24]을 설치하려면 설정 파일 `datadog/conf.d/ping.d/conf.yaml` 을 만들고 사전 실행 스크립트에 다음 줄을 추가합니다.

```
agent-wrapper integration install -t datadog-ping==1.0.0
```

### dyno를 기준으로 통합 비활성화

헤로쿠(Heroku) 애플리케이션의 파일시스템은 모든 dyno에서 공유되므로 통합을 활성화하면 `run` 또는 `worker` dyno를 포함한 모든 dyno에서 실행됩니다. dyno 이름이나 유형에 따라 통합 실행을 제한하려면 [사전 실행 스크립트](#prerun-script)에 작은 스니펫을 추가하면 됩니다.

예를 들어 Gunicorn 통합이 `web` 유형의 dyno에서만 실행되어야 하는 경우, 사전 실행 스크립트에 다음을 추가하세요.

```shell
DYNOTYPE=${DYNO%%.*}
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi
```

## 활성화 커스텀 점검

자신만의 [에이전트 커스텀 점검 ][25]을 활성화하려면 애플리케이션 내 Datadog 설정 폴더에 `checks.d` 폴더를 생성합니다. 그 아래에 커스텀 점검에서 `.py` 및 `.yaml` 파일을 모두 복사합니다. dyno가 시작되는 동안 파일이 적절한 Datadog 에이전트 설정 디렉터리에 복사됩니다.

예를 들어 커스텀 점검, `foo` 및 `bar`이 두 개가 있는 경우 올바른 폴더 트리입니다.

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

위의 모든 설정에 추가하여 애플리케이션에 `/datadog/prerun.sh` 스크립트를 포함할 수 있습니다. 이 사전 실행 스크립트는 모든 표준 설정 작업이 끝나고 Datadog 에이전트를 시작하기 직전에 실행됩니다. 이를 통해 환경 변수를 수정하고(예: DD_TAGS 또는 DD_VERSION), 추가 설정을 수행하고, 커뮤니티 통합을 설치하거나, Datadog 에이전트를 프로그래밍 방식으로 비활성화할 수도 있습니다.

아래 예는 `prerun.sh` 스크립트에서 수행할 수 있는 몇 가지 작업을 보여줍니다.

```shell
#!/usr/bin/env bash

# Heroku '$DYNO' 환경 변수에서 dyno 유형 추출 
DYNOTYPE="${DYNO%%.*}"

# dyno 유형에 따라 Datadog Agent 비활성화
if [ "$DYNOTYPE" == "run" ]; then
  DISABLE_DATADOG_AGENT="true"
fi

# dyno 유형에 따라 통합 비활성화
if [ "$DYNOTYPE" != "web" ]; then
  rm -f "$DD_CONF_DIR/conf.d/gunicorn.d/conf.yaml"
fi

# HEROKU_SLUG_COMMIT 기반 앱 버전 설정
if [ -n "$HEROKU_SLUG_COMMIT" ]; then
  DD_VERSION=$HEROKU_SLUG_COMMIT
fi

# "ping" 커뮤니티 통합 설치
agent-wrapper integration install -t datadog-ping==1.0.0
```

## Datadog 콘솔 출력 제한

경우에 따라 Datadog 빌드팩이 콘솔에 쓰는 로그의 양을 제한하길 원할 수 있습니다.

빌드팩 로그 출력을 제한하려면 `DD_LOG_LEVEL` 환경 변수를 다음 중 하나로 설정합니다. `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`, `CRITICAL`, `OFF`.

```shell
heroku config:add DD_LOG_LEVEL=ERROR
```

## 부수적인 바이너리

슬러그 공간을 절약하기 위해 `DD_APM_ENABLED`가 `false`로 설정되거나 `DD_PROCESS_AGENT`가 설정되지 않았거나 `false`로 설정된 경우 컴파일 중에 `trace-agent` 및 `process-agent` 부수적인 바이너리가 제거됩니다 .

슬러그 크기를 줄이려면, 애플리케이션 성능 모니터링(APM) 기능을 사용하지 않는 경우 `DD_APM_ENABLED`이 `false`로 설정되어 있는지 확인합니다. 프로세스 모니터링을 사용하지 않는 경우 `DD_PROCESS_AGENT`이 `true`로 설정되어 있지 않은지 확인합니다.

## 디버깅

[정보 또는 디버깅 명령][26] 중 하나를 실행하려면 `agent-wrapper` 명령을 사용합니다.

예를 들어, Datadog 에이전트 및 활성화된 통합의 상태를 표시하려면 실행합니다.

```shell
agent-wrapper status
```

## 파이썬(Python) 및 에이전트 버전

`6.14` 버전 이전에는 Datadog v6 에이전트에는 파이썬(Python) 버전 `2`이 포함된 상태로 제공되었습니다. `6.14` 2020년 1월에 발표될 파이썬 버전 `2` 수명 종료에 대비하여, Datadog v6 에이전트에는 파이썬 버전 `2` 과 `3` 버전이 모두 포함되어 제공되어 고객이 커스텀 점검을 파이썬 버전 `3`으로 마이그레이션할 수 있는 충분한 시간을 제공합니다. 헤로쿠 빌드팩은 두 버전 중 하나만 유지합니다. `DD_PYTHON_VERSION`을 `2` 또는 `3`로 설정하여 에이전트에 유지하려는 파이썬 버전을 선택합니다. 설정하지 않으면 빌드팩은 파이썬 버전 `2`를 유지합니다. 파이썬 버전 `2`에서만 작동하는 커스텀 점검을 사용하는 경우 EOL 이전에 `3` 버전으로 마이그레이션하세요.

에이전트 v7은 파이썬 버전 `3`과 함께 제공됩니다. 커스텀 점검을 사용하지 않거나 커스텀 점검을 이미 `3` 버전으로 마이그레이션한 경우 가능한 한 빨리 에이전트 v7로 이동하세요. `6.15`부터는 동일한 부 버전을 가진 v7 릴리스가 동일한 기능 세트를 공유하므로 두 버전 간에 이동해도 안전합니다. 예를 들어 `6.16` 을 실행 중이고 파이썬 버전 `2`이 필요하지 않은 경우 `7.16` 으로 이동하는 것이 안전합니다.

## 헤로쿠 로그 수집

Datadog 빌드팩은 헤로쿠 플랫폼에서 로그를 수집하지 않습니다. 헤로쿠 로그 수집을 설정하려면 [전용 가이드][15]를 참조하세요.

## 도커(Docker) 이미지를 통한 헤로쿠 사용

이 빌드팩은 [헤로쿠의 슬러그 컴파일러][27]를 사용하는 헤로쿠 배포에서만 작동합니다. 도커 컨테이너를 사용하여 헤로쿠에 애플리케이션을 배포하는 경우 다음을 확인합니다.

1. 도커 이미지의 일부로 Datadog 에이전트를 추가하고 에이전트를 컨테이너에서 다른 프로세스로 시작합니다.
2. 헤로쿠 애플리케이션에서 다음 설정 옵션을 설정하여 Datadog dyno가 헤로쿠 dyno로 올바르게 보고하도록 합니다.

```shell
heroku config:add DD_HEROKU_DYNO=true
```

예를 들어 데비안(Debian) 기반 OS를 사용하여 도커(Docker) 이미지를 빌드하는 경우 `Dockerfile`에 다음 줄을 추가합니다.

```
# Install GPG dependencies
RUN apt-get update \
 && apt-get install -y gnupg apt-transport-https gpg-agent curl ca-certificates

# Add Datadog repository and signing keys
ENV DATADOG_APT_KEYRING="/usr/share/keyrings/datadog-archive-keyring.gpg"
ENV DATADOG_APT_KEYS_URL="https://keys.datadoghq.com"
RUN sh -c "echo 'deb [signed-by=${DATADOG_APT_KEYRING}] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
RUN touch ${DATADOG_APT_KEYRING}
RUN curl -o /tmp/DATADOG_APT_KEY_CURRENT.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_CURRENT.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_CURRENT.public
RUN curl -o /tmp/DATADOG_APT_KEY_06462314.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_06462314.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_06462314.public
RUN curl -o /tmp/DATADOG_APT_KEY_C0962C7D.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_C0962C7D.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_C0962C7D.public
RUN curl -o /tmp/DATADOG_APT_KEY_F14F620E.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_F14F620E.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_F14F620E.public
RUN curl -o /tmp/DATADOG_APT_KEY_382E94DE.public "${DATADOG_APT_KEYS_URL}/DATADOG_APT_KEY_382E94DE.public" && \
    gpg --ignore-time-conflict --no-default-keyring --keyring ${DATADOG_APT_KEYRING} --import /tmp/DATADOG_APT_KEY_382E94DE.public


# Install the Datadog Agent
RUN apt-get update && apt-get -y --force-yes install --reinstall datadog-agent

# Copy entrypoint
COPY entrypoint.sh /

# Expose DogStatsD and trace-agent ports
EXPOSE 8125/udp 8126/tcp

# Copy your Datadog configuration
COPY datadog-config/ /etc/datadog-agent/

CMD ["/entrypoint.sh"]
```

도커 컨테이너 엔트리 포인트에서 Datadog 에이전트, Datadog 애플리케이션 성능 모니터링(APM) 에이전트 , Datadog 프로세스 에이전트를 시작합니다.

```
#!/bin/bash

datadog-agent run &
/opt/datadog-agent/embedded/bin/trace-agent --config=/etc/datadog-agent/datadog.yaml &
/opt/datadog-agent/embedded/bin/process-agent --config=/etc/datadog-agent/datadog.yaml
```

도커 이미지의 고급 옵션은 [Datadog 에이전트 도커 파일][28]을 참조하세요.

## 기여하기

[기여 가이드라인][29]을 참조하여 이슈 또는 PR을 [Heroku-buildpack-datadog repository][30]에 여는 방법을 알아보세요.

## 기록

이 프로젝트의 이전 버전은 [miketheman heroku-buildpack-datadog project][31]에서 가져온 것입니다. 대부분 Datadog 에이전트 버전 6을 위해 재작성되었습니다. 변경 사항과 자세한 정보는 [변경 로그][32]에서 찾을 수 있습니다.

## 트러블슈팅

### 에이전트 상태 가져오기

빌드팩을 설정했는데 Datadog에서 예상한 일부 데이터를 받지 못한 경우 Datadog 에이전트에 대한 상태 명령을 실행하여 원인을 찾아볼 수 있습니다.

```shell
# Export the name of your Heroku application as an environment variable
export APPNAME=your-application-name

heroku ps:exec -a $APPNAME

# Establishing credentials... done
# Connecting to web.1 on ⬢ ruby-heroku-datadog...
# DD_API_KEY environment variable not set. Run: heroku config:add DD_API_KEY=<your API key>
# The Datadog Agent has been disabled. Unset the DISABLE_DATADOG_AGENT or set missing environment variables.

~ $
```

DD_API_KEY가 설정되지 않았다는 경고를 무시할 수 있습니다. 헤로쿠는 SSH 세션 자체에 대해 설정 변수를 설정하지 않지만(https://devcenter.heroku.com/articles/exec#environment-variables), Datadog 에이전트 프로세스 에서는 이 변수에 액세스할 수 있습니다.

SSH 세션에 들어가면 Datadog status 명령을 실행합니다.

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

`status` 명령이 올바르게 실행되고 출력의 이 섹션에 API 키가 유효하다는 메시지가 표시되는지 확인합니다.

```
  API Keys status
  ===============
    API key ending with 68306: API Key valid
```

#### 통합 점검

활성화한 통합이 올바르게 실행되고 있는지 확인하려면 `Collector` 섹션에서 점검이 올바르게 실행되는지 알아볼 수 있습니다.

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

#### 애플리케이션 성능 모니터링(APM) 에이전트 확인

애플리케이션 성능 모니터링(APM)에 대한 애플리케이션을 계측했는데 Datadog에서 트레이스가 표시되지 않는 경우 애플리케이션 성능 모니터링(APM) 에이전트가 올바르게 실행되고 트레이스를 수집하고 있는지 확인할 수 있습니다.

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

### Datadog는 dyno보다 더 많은 수의 에이전트를 보고하고 있습니다.

`DD_DYNO_HOST`을 `true`로 설정하고 `HEROKU_APP_NAME`에 모든 헤로쿠 애플리케이션에 대한 값이 설정되어 있는지 확인하세요. 자세한 내용은 [호스트 이름 섹션](#hostname)을 참조하세요.

### 빌드팩 또는 에이전트를 업그레이드한 후 시작 시 에이전트에서 오류를 보고합니다.

빌드팩 또는 에이전트를 업그레이드한 후에는 애플리케이션의 슬러그를 다시 컴파일해야 합니다. 자세한 내용은 [업그레이드 및 슬러그 재컴파일 섹션](#upgrading-and-slug-recompilation)을 참조하세요.

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
[18]: https://docs.datadoghq.com/ko/database_monitoring/setup_postgres/heroku/
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
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=heroku
[34]: https://devcenter.heroku.com/categories/deployment