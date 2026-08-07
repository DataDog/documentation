---
app_id: singlestore
app_uuid: 5e8c3b5f-278f-4423-90d9-969c06a478eb
assets:
  dashboards:
    Singlestore Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: singlestore.bytes_received
      metadata_path: metadata.csv
      prefix: singlestore.
    process_signatures:
    - memsqld
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10215
    source_type_name: SingleStore
  monitors:
    License will expire soon: assets/monitors/license_expiration.json
    Read queries failure rate is high: assets/monitors/read_failures.json
    Write queries failure rate is high: assets/monitors/write_failures.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 데이터 스토어
- 로그 수집
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/singlestore/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestore
integration_id: singlestore
integration_title: SingleStore
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: singlestore
public_title: SingleStore
short_description: 리프 및 애그리게이터 노드에서 SingleStore 메트릭을 수집합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::데이터 저장
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: 리프 및 애그리게이터 노드에서 SingleStore 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SingleStore
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent를 통해 [SingleStore][1]를 모니터링합니다. SingleStore는 저장된 데이터의 트랜잭션 및 분석 처리를 제공합니다. Datadog-SingleStoreDB 통합을 활성화하면 다음 작업을 할 수 있습니다.

- 메트릭과 이벤트로 클러스터와 노드의 상태를 파악합니다.
- 스토리지 용량 감소 문제를 해결합니다.
- 리소스 활용 효율성을 개선합니다.


## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 이러한 지침을 적용하는 데 가이드가 필요하면 [오토파일럿 통합 템플릿][3]을 참조하세요.

### 설치

SingleStore 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

#### 호스트

##### 메트릭 수집
1. Agent 설정 디렉터리 루트의 `conf.d/` 폴더에서 `singlestore.d/conf.yaml` 파일을 편집해 SingleStore 성능 데이터 수집을 시작합니다. 사용할 수 있는 설정 옵션을 모두 보려면 [singlestore.d/conf.yaml 샘플][4]을 참고하세요.

2. [Agent를 재시작합니다][5].

**참고**: 기본적으로 SingleStore 통합은 `MV_GLOBAL_STATUS`, `AGGREGATORS`, `LEAVES` 테이블의 메트릭만 수집합니다. 추가 시스템 수준 메트릭(CPU, 디스크, 네트워크 IO, 메모리)을 수집하려면 `singlestore.d/conf.yaml` 파일에서 `collect_system_metrics: true`를 설정하세요.

##### 로그 수집


{{< site-region region="us3" >}}
**로그 수집은 이 사이트에서 지원되지 않습니다.**
{{< /site-region >}}


1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 원하는 로그 파일을 `singlestore.d/conf.yaml` 파일에 추가하여 SingleStore 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/lib/memsql/<NODE_ID>/tracelogs/memsql.log
         source: singlestore
         service: "<SERVICE_NAME>"
   ```

    `path` 및 `service` 파라미터 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 singlestore.d/conf.yaml][4]을 참조하세요.

3. [Agent를 재시작합니다][5].

#### 컨테이너화

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿][2]에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

#### 메트릭 수집

| 파라미터            | 값                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `singlestore`                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<USER>", "password": "<PASSWORD>"}`       |

##### 로그 수집


{{< site-region region="us3" >}}
**로그 수집은 이 사이트에서 지원되지 않습니다.**
{{< /site-region >}}


Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][6]을 참고하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "singlestore", "service": "<SERVICE_NAME>"}` |


### 검증

[Agent의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `singlestore`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "singlestore" >}}



### 이벤트

SingleStore 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "singlestore" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.


[1]: https://www.singlestore.com/
[2]: https://docs.datadoghq.com/ko/getting_started/agent/autodiscovery#integration-templates
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/singlestore/datadog_checks/singlestore/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/singlestore/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/singlestore/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/