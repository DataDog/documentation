---
app_id: ambari
app_uuid: 081f9cd9-a86a-4cea-ae5b-b4f7e163f413
assets:
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ambari.cpu.cpu_user
      metadata_path: metadata.csv
      prefix: ambari.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10064
    source_type_name: Ambari
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ambari/README.md
display_on_public_website: true
draft: false
git_integration_title: ambari
integration_id: ambari
integration_title: Ambari
integration_version: 4.2.1
is_public: true
manifest_version: 2.0.0
name: ambari
public_title: Ambari
short_description: 모든 ambari 관리형 클러스터에 대해 호스트 또는 서비스별로 메트릭 가져오기
supported_os:
- 리눅스
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 모든 ambari 관리형 클러스터에 대해 호스트 또는 서비스별로 메트릭 가져오기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambari
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 검사는 Datadog Agent를 통해 [Ambari][1]를 모니터링합니다.

## 설정

### 설치

Ambari 검사는 [Datadog Agent][2] 패키지에 포함되어 있어 서버에 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "호스트" %}}

#### 호스트

호스트에서 실행 중인 Agent에 대해 이 검사를 설정하려면:

##### 메트릭 수집

1. Ambari 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서  `ambari.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 ambari.d/conf.yaml][1]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Agent를 재시작합니다][2].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

    ```yaml
    logs_enabled: true
    ```

2. 맨 아래 `logs` 줄의 주석을 제거하여 `ambari.d/conf.yaml`을 편집합니다. Ambari 로그 파일의 올바른 경로로 로그 `path`를 업데이트하세요.

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Agent를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                        |
| -------------------- | ---------------------------- |
| `<INTEGRATION_NAME>` | `ambari`                     |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `ambari`를 찾으세요.

## 수집한 데이터

이 통합은 모든 클러스터의 모든 호스트에 대해 다음 시스템 메트릭을 수집합니다.

- boottime
- cpu
- disk
- memory
- load
- network
- process

`collect_service_metrics`로 서비스 메트릭 수집이 활성화된 경우 이 통합은 포함된 각 서비스 구성 요소에 대해 포함 목록의 헤더가 있는 메트릭을 수집합니다.

### 메트릭
{{< get-metrics-from-git "ambari" >}}


### 이벤트

Ambari에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "ambari" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.



[1]: https://ambari.apache.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/