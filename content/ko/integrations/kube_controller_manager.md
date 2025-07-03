---
app_id: kube-controller-manager
app_uuid: 25d4ccd6-de50-4ef0-849f-b7ab1aea203e
assets:
  dashboards:
    kube_controller_manager: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_controller_manager.threads
      metadata_path: metadata.csv
      prefix: kube_controller_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10055
    source_type_name: Kubernetes Controller Manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_controller_manager
integration_id: kube-controller-manager
integration_title: Kubernetes Controller Manager
integration_version: 7.1.0
is_public: true
manifest_version: 2.0.0
name: kube_controller_manager
public_title: Kubernetes Controller Manager
short_description: Kubernetes Controller Manager 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Kubernetes Controller Manager 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Controller Manager
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kube Controller Manager 대시보드][1]

## 개요

이 점검은 Kubernetes 컨트롤 플레인의 일부인 [Kubernetes Controller Manager][2]를 모니터링합니다.

**참고**: 이 점검은 해당 서비스가 노출되지 않기 때문에 Amazon EKS 클러스터에 대한 데이터를 수집하지 않습니다. 

## 설정

### 설치

Kubernetes Controller Manager 점검은 [Datadog Agent][3] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 구성

1. Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `kube_controller_manager.d/conf.yaml` 파일을 편집하여 kube_controller_manager 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 kube_controller_manager.d/conf.yaml][4]을 참조하세요.

2. [Agent를 재시작합니다][5]

이 통합을 위해서는 컨트롤러 관리자의 메트릭 엔드포인트에 대한 액세스가 필요합니다. 메트릭 엔드포인트에 액세스하려면 다음을 수행해야 합니다.

* controller-manager 프로세스의 IP/포트에 대한 액세스가 있어야 합니다.
* /metrics 엔드포인트에 대한 `get` RBAC 권한이 있어야 합니다. (기본 Datadog Helm 차트에는 이미 이에 대한 올바른 RBAC 역할과 바인딩이 추가되어 있습니다.)

### 검증

[Agent의 `status` 하위 명령을 실행][6]하고 Checks 섹션에서 `kube_controller_manager`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kube-controller-manager" >}}


### 이벤트

Kubernetes Controller Manager 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kube-controller-manager" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_controller_manager/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/datadog_checks/kube_controller_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/kube_controller_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/ko/help/