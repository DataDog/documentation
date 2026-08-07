---
app_id: kube-scheduler
app_uuid: 1cf58691-ac6b-4f1d-b410-0132a4590378
assets:
  dashboards:
    kube_scheduler: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_scheduler.threads
      metadata_path: metadata.csv
      prefix: kube_scheduler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10056
    source_type_name: Kube_scheduler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
- 로그 수집
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_scheduler
integration_id: kube-scheduler
integration_title: Kubernetes Scheduler
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: kube_scheduler
public_title: Kubernetes Scheduler
short_description: Kubernetes Scheduler 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Kubernetes Scheduler 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Scheduler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Scheduler 대시보드][1]

## 개요

이 점검은 Kubernetes 컨트롤 플레인의 일부인 [Kubernetes Scheduler][2]를 모니터링합니다.

**참고**: 이 점검은 해당 서비스가 노출되지 않기 때문에 Amazon EKS 클러스터에 대한 데이터를 수집하지 않습니다. 

## 설정

### 설치

Kubernetes Scheduler 점검은 [Datadog Agent][3] 패키지에 포함되어 있으므로 서버에 추가 설치가 필요하지 않습니다.

### 설정

아래 파라미터 적용에 대한 지침은 [Autodiscovery 통합 템플릿][4]을 참조하세요. 

#### 메트릭 수집

1. Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `kube_scheduler.d/conf.yaml` 파일을 편집하여 kube_scheduler 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 kube_scheduler.d/conf.yaml][5]을 참조하세요.

2. [에이전트를 재시작합니다][6].

#### 로그 수집

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][7]을 참조하세요.

| 파라미터      | 값                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "kube_scheduler", "service": "<SERVICE_NAME>"}` |

### 검증

[Agent의 상태 하위 명령을 실행][8]하고 Checks 섹션에서 `kube_scheduler`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kube-scheduler" >}}


### 이벤트

Kube Scheduler는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kube-scheduler" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_scheduler/images/kube_scheduler_screenshot.jpeg
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[5]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/datadog_checks/kube_scheduler/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kube_scheduler/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/