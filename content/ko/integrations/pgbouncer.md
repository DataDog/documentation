---
app_id: pgbouncer
app_uuid: 8aabdf7d-2d07-4d77-a76e-0ade64d8e70f
assets:
  dashboards:
    pgbouncer: assets/dashboards/pgbouncer_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pgbouncer.pools.sv_idle
      metadata_path: metadata.csv
      prefix: pgbouncer.
    process_signatures:
    - pgbouncer
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 118
    source_type_name: PGBouncer
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    instance_overview: assets/saved_views/instance_overview.json
    pgbouncer_processes: assets/saved_views/pgbouncer_processes.json
    user_overview: assets/saved_views/user_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md
display_on_public_website: true
draft: false
git_integration_title: pgbouncer
integration_id: pgbouncer
integration_title: PGBouncer
integration_version: 8.1.1
is_public: true
manifest_version: 2.0.0
name: pgbouncer
public_title: PGBouncer
short_description: 애플리케이션과 주고받는 연결 풀 메트릭 및 모니터링 트래픽을 추적합니다.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 애플리케이션과 주고받는 연결 풀 메트릭 및 모니터링 트래픽을 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PGBouncer
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

PgBouncer 점검은 연결 풀 메트릭을 추적하고 애플리케이션과 주고받는 모니터링 트래픽을 추적합니다.

## 설정

### 설치

PgBouncer 점검이 [Datadog 에이전트 ][1] 패키지에 포함되어 있으므로 PgBouncer 노드에 아무 것도 설치하지 않아도 됩니다.

이 점검에는 연결된 사용자가 쿼리 PgBouncer 인스턴스에 필요합니다.

1. PgBouncer `pgbouncer.ini` 파일에 Datadog 사용자를 생성합니다.

   ```ini
   stats_users = datadog
   ```

2. `userlist.txt` 파일에 `datadog` 사용자에 대한 연결된 비밀번호를 추가합니다.

   ```text
   "datadog" "<PASSWORD>"
   ```

3. 자격 증명을 확인하려면 다음 명령을 실행합니다.

   ```shell
   psql -h localhost -U datadog -p 6432 pgbouncer -c \
   "SHOW VERSION;" \
   && echo -e "\e[0;32mpgBouncer connection - OK\e[0m" \
   || echo -e "\e[0;31mCannot connect to pgBouncer\e[0m"
   ```

   비밀번호를 입력하라는 메시지가 표시되면 `userlist.txt`에 추가한 비밀번호를 입력합니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [에이전트 설정 디렉토리][1] 루트의 `conf.d/` 폴더에 있는 `pgbouncer.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 pgbouncer.d/conf.yaml][2]을 참조하세요:

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url (ie. "pgbouncer")
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

   **참고**: PgBouncer 인스턴스가 SSL을 지원하지 않는 경우 서버 오류를 방지하기 위해 `sslmode=require`을 `sslmode=allow`로 바꾸세요. 자세한 내용은 [SSL 지원][3]에 대한 Postgres 설명서를 참조하세요.

2. [Agent를 재시작합니다][4].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `pgbouncer.d/conf.yaml` 파일에 추가하여 Pgbouncer 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/postgresql/pgbouncer.log
       source: pgbouncer
       service: "<SERVICE_NAME>"
   ```

   `path` 및 `service` 파라미터 값을 변경하고 설정를 환경으로 변경합니다. 사용 가능한 모든 설정 옵션은 [샘플 pgbouncer.d/conf.yaml][2]을 참조하세요.

3. [Agent를 재시작합니다][5].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[3]: https://www.postgresql.org/docs/9.1/libpq-ssl.html
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `pgbouncer`                                                                                            |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                          |
| `<INSTANCE_CONFIG>`  | `{"database_url": "postgresql://datadog:<PASSWORD>@%%host%%:%%port%%/<DATABASE_URL>?sslmode=require"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 상태 하위 명령][2]을 실행하고 점검 섹션에서 `pgbouncer`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pgbouncer" >}}


**참고**: 일부 메트릭은 일부 버전의 PgBouncer에서 사용 가능하지 않습니다.

### 이벤트

PgBouncer 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "pgbouncer" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/