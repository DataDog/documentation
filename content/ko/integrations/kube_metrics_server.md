---
app_id: kube-metrics-server
app_uuid: df9c9e3c-368a-4472-b0cb-b32f1066a2f5
assets:
  dashboards:
    Kubernetes Metrics Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_metrics_server.process.open_fds
      metadata_path: metadata.csv
      prefix: kube_metrics_server.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10061
    source_type_name: Kube metrics server
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_metrics_server
integration_id: kube-metrics-server
integration_title: Kubernetes Metrics Server
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: kube_metrics_server
public_title: Kubernetes Metrics Server
short_description: Kubernetes Metrics Server 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Kubernetes Metrics Server 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Metrics Server
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Kubernetes 컨트롤 플레인에서 사용되는 구성 요소인 [Kube_metrics_server][1] v0.3.0+를 모니터링합니다.

## 설정

### 설치

Kube_metrics_server 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 추가 설치가 필요하지 않습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `kube_metrics_server.d/conf.yaml` 파일을 편집하여 kube_metrics_server 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 kube_metrics_server.d/conf.yaml][4]을 참조하세요.

2. [에이전트를 재시작합니다][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 아래 파라미터 적용에 대한 지침은 [Kubernetes Autodiscovery 통합 템플릿][1]을 참조하세요. 

| 파라미터            | 값                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kube_metrics_server `                                         |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### SSL

엔드포인트에 보안이 설정된 경우 추가 구성이 필요합니다.

1. 메트릭 엔드포인트 보안에 사용되는 인증서를 식별합니다.

2. Agent 파드에 관련 인증서 파일을 마운트합니다.

3. SSL 설정을 적용합니다. 자세한 내용은 [기본 설정 파일][3]을 참조하세요.

### 검증

[Agent의 상태 하위 명령을 실행][4]하고 Checks 섹션에서 `kube_metrics_server`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kubernetes_state_core" >}}


### 이벤트

Kube_metrics_server는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "kubernetes_state_core" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.



[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ko/help/