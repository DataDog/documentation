---
app_id: argo-rollouts
app_uuid: 28d531ac-954c-4c5a-8769-589589f793e0
assets:
  dashboards:
    Argo Rollouts Overview: assets/dashboards/argo_rollouts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: argo_rollouts.go.threads
      metadata_path: metadata.csv
      prefix: argo_rollouts.
    process_signatures:
    - rollouts-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8465752
    source_type_name: Argo Rollouts
  monitors:
    Argo Rollout is in Non Running or Completed State: assets/monitors/rollout_phase.json
  saved_views:
    Argo Rollouts Error Logs Overview: assets/saved_views/error_logs_overview.json
    Argo Rollouts Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- 쿠버네티스(Kubernetes)
- 개발 툴
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_rollouts
integration_id: argo-rollouts
integration_title: Argo Rollouts
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: argo_rollouts
public_title: Argo Rollouts
short_description: Argo Rollouts의 상태 및 성능 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Category::Metrics
  - Category::Kubernetes
  - Category::Developer Tools
  - 카테고리::로그 수집
  - Submitted Data Type::Metrics
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: Argo Rollouts의 상태 및 성능 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Rollouts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent를 통해 [Argo Rollouts][1]를 모니터링합니다.

## 설정

아래 지침에 따라 Kubernetes 환경에서 실행되는 Agent의 본 점검을 설치 및 구성합니다. 컨테이너화된 환경에서의 구성에 관한 자세한 정보는 [Autodiscovery 통합 템플릿][2] 지침을 참조하세요.

### 설치

Agent 릴리스 7.53.0부터 Argo Rollouts 점검이 [Datadog Agent][3] 패키지에 포함되었습니다. 환경에 추가 설치가 필요하지 않습니다.

본 점검은 Argo Rollouts가 노출할 수 있는 OpenMetrics 엔드포인트에서 메트릭을 수집하기 위해 [OpenMetrics][4]를 사용하며, 이를 위해 Python 3이 필요합니다.

### 구성

Argo Rollouts 컨트롤러를 통해 포트 `8090`의 `/metrics` 에서 Prometheus 형식의 메트릭을 쉽게 사용할 수 있습니다. Agent에서 메트릭 수집을 시작하려면 Argo Rollouts 포드에 주석 처리를 해야 합니다. 어노테이션에 관한 자세한 내용은 [Autodiscovery 통합 템플릿][2] 지침을 참조하세요. [샘플 argo_rollouts.d/conf.yaml][5]을 검토하여 추가 구성 옵션을 확인할 수 있습니다.

**참고**: 목록에 표시된 메트릭은 사용 가능한 경우에만 수집할 수 있습니다. 일부 메트릭은 특정 작업을 수행할 때만 생성됩니다. 예를 들어, `argo_rollouts.info.replicas.updated` 메트릭은 복제본이 업데이트된 후에만 노출됩니다.

다음은 Argo Rollouts 점검을 구성하는 데 필요한 유일한 파라미터입니다.
- `openmetrics_endpoint`: 본 파라미터는 Prometheus 형식의 메트릭이 노출되는 위치로 설정해야 합니다. 기본 포트는 `8090`입니다. 컨테이너화된 환경에서는 [호스트 자동 감지][2]에 `%%host%%`을 사용해야 합니다. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-rollouts.checks: |
      {
        "argo_rollouts": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-rollouts'
# (...)
```

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Argo Rollouts 로그는 Kubernetes를 통해 여러 Argo Rollouts 포드에서 수집할 수 있습니다. Datadog Agent에는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][6]을 참고하세요.

아래 파라미터를 적용하는 방법은 [Autodiscovery 통합 템플릿][2]을 참고하세요.

| 파라미터      | 값                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_rollouts", "service": "<SERVICE_NAME>"}`  |

### 검증

[Agent 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `argo_rollouts`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "argo_rollouts" >}}


### 이벤트

Argo Rollouts 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "argo_rollouts" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [컨테이너 네이티브 CI/CD 파이프라인의 상태 및 성능 모니터링하기][11]

[1]: https://argoproj.github.io/rollouts/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/datadog_checks/argo_rollouts/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/assets/service_checks.json
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/