---
app_id: clickhouse
app_uuid: 668f43c1-bdd8-4686-bb92-d40f0c48fda9
assets:
  dashboards:
    ClickHouse Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: clickhouse.query.active
      metadata_path: metadata.csv
      prefix: clickhouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10078
    source_type_name: ClickHouse
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱
- 데이터 저장소
- 로그 수집
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/clickhouse/README.md
display_on_public_website: true
draft: false
git_integration_title: clickhouse
integration_id: clickhouse
integration_title: ClickHouse
integration_version: 5.3.0
is_public: true
manifest_version: 2.0.0
name: clickhouse
public_title: ClickHouse
short_description: ClickHouse 클러스터의 서비스 상태 및 성능을 모니터링하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: ClickHouse 클러스터의 서비스 상태 및 성능을 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ClickHouse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog 에이전트로 [ClickHouse][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

ClickHouse 점검은 [Datadog 에이전트][3] 패키지에 포함됩니다. 서버에 추가 설치할 필요가 없습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

#### 메트릭 수집

1. ClickHouse 성능 데이터 수집을 시작하려면 에이전트 구성 디렉터리 루트의 `conf.d/` 폴더에서 `clickhouse.d/conf.yaml` 파일을 편집합니다. 사용할 수 있는 구성 옵션 전체를 보려면 [clickhouse.d/conf.yaml 샘플][1]을 참고하세요.

2. [에이전트를 재시작합니다][2].

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. 원하는 로그 파일을 `clickhouse.d/conf.yaml` 파일에 추가하여 ClickHouse 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/clickhouse-server/clickhouse-server.log
         source: clickhouse
         service: "<SERVICE_NAME>"
   ```

    `path`, `service` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 사용 가능한 모든 설정 옵션은 [clickhouse.d/conf.yaml 샘플][1]을 참조하세요.

3. [에이전트를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/clickhouse/datadog_checks/clickhouse/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

#### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `clickhouse`                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "clickhouse", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 **Checks** 섹션에서 `clickhouse`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "clickhouse" >}}


### 이벤트

ClickHouse 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "clickhouse" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.



[1]: https://clickhouse.yandex
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/