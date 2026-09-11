---
app_id: etcd
app_uuid: 7f16875b-4aa8-44e3-adff-63622c234253
assets:
  dashboards:
    Etcd Overview: assets/dashboards/etcd_overview.json
    etcd-Screenboard: assets/dashboards/etcd_2_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - etcd.store.watchers
      - etcd.server.has_leader
      metadata_path: metadata.csv
      prefix: etcd.
    process_signatures:
    - etcd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 111
    source_type_name: etcd
  saved_views:
    etcd_overview: assets/saved_views/etcd_overview.json
    etcd_processes: assets/saved_views/etcd_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- orchestration
- containers
- configuration & deployment
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/etcd/README.md
display_on_public_website: true
draft: false
git_integration_title: etcd
integration_id: etcd
integration_title: etcd
integration_version: 8.1.0
is_public: true
manifest_version: 2.0.0
name: etcd
public_title: etcd
short_description: 쓰기, 업데이트, 삭제, 노드 간 대기 시간 및 기타 Etcd 메트릭을 추적하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Orchestration
  - Category::Containers
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 쓰기, 업데이트, 삭제, 노드 간 대기 시간 및 기타 Etcd 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-etcd-performance
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-etcd-with-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/etcd-monitoring-tools/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/etcd-key-metrics/
  support: README.md#Support
  title: etcd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Etcd Dashboard][1]

## 개요

Etcd 메트릭을 수집하여 다음을 수행합니다.

- Etcd 클러스터의 상태를 모니터링합니다.
- 호스트 구성이 동기화되지 않을 수 있는 시기를 파악합니다.
- Etcd의 성능을 나머지 애플리케이션과 상호 연관시킵니다.

## 설정

### 설치

Etcd 검사는 [Datadog Agent][2] 패키지에 포함되어 있으므로 Etcd 인스턴스에 다른 것을 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1]의 루트에 있는 `conf.d/` 폴더에서 `etcd.d/conf.yaml` 파일을 편집하여 Etcd 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 etcd.d/conf.yaml][2]을 참조하세요.
2. [에이전트]를 다시 시작합니다[3].

##### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. `etcd.d/conf.yaml`의 하단에서 이 구성 블록의 주석 처리를 제거하고 편집합니다.

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: etcd
        service: "<SERVICE_NAME>"
    ```

   환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 etcd.d/conf.yaml][2]을 참조하세요.

3. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `etcd`                                               |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "http://%%host%%:2379/metrics"}` |

##### 로그 수집

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "etcd", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 `status` 하위 명령을 실행][3]하고 Checks 섹션에서 `etcd`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "etcd" >}}


Etcd 메트릭에는 노드 상태에 따라 `etcd_state:leader` 또는 `etcd_state:follower` 태그가 지정되므로 상태별로 메트릭을 쉽게 집계할 수 있습니다.

### 이벤트

Etcd 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "etcd" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

- [Kubernetes 컨트롤 플레인 모니터링][5]
- [일관된 Docker 구성을 보장하기 위해 Etcd 성능을 모니터링합니다.][6]
- [Datadog으로 Etcd를 모니터링하는 방법][7]
- [Etcd 메트릭 및 로그 수집 도구][8]
- [Etcd 모니터링을 위한 주요 메트릭][9]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/etcd/images/etcd_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/control_plane/?tab=helm
[6]: https://www.datadoghq.com/blog/monitor-etcd-performance
[7]: https://www.datadoghq.com/blog/monitor-etcd-with-datadog/
[8]: https://www.datadoghq.com/blog/etcd-monitoring-tools/
[9]: https://www.datadoghq.com/blog/etcd-key-metrics/