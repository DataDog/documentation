---
app_id: argo-workflows
app_uuid: f96fd144-a3c0-4fed-adcc-53f11f80ec04
assets:
  dashboards:
    Argo Workflows: assets/dashboards/argo_workflows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argo_workflows.go.info
      metadata_path: metadata.csv
      prefix: argo_workflows.
    process_signatures:
    - workflow-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8511369
    source_type_name: Argo Workflows
  monitors:
    New errors detected in Argo Workflows: assets/monitors/errors.json
  saved_views:
    errors: assets/saved_views/errors.json
    overview: assets/saved_views/overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 개발 툴
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_workflows/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_workflows
integration_id: argo-workflows
integration_title: Argo Workflows
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: argo_workflows
public_title: Argo Workflows
short_description: Argo Workflows의 상태 및 성능 모니터링
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
  - Category::Developer Tools
  - 카테고리::로그 수집
  - 제공::통합
  configuration: README.md#Setup
  description: Argo Workflows의 상태 및 성능 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Workflows
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

본 점검은 Datadog Agent를 통해 [Argo Workflows][1]를 모니터링합니다.

## 설정

아래 지침에 따라 Kubernetes 환경에서 실행되는 Agent에 대한 본 점검을 설치 및 설정합니다. 컨테이너화된 환경의 경우 구성에 대한 자세한 정보는 [Autodiscovery 통합 템플릿][2]을 참조하세요.

### 설치

Agent 릴리스 7.53.0부터 Argo Workflows 점검이 [Datadog Agent][3] 패키지에 포함되었습니다. 환경에 추가 설치가 필요하지 않습니다.

본 점검은 [OpenMetrics][4]를 사용하여 OpenMetrics 엔드포인트에서 메트릭을 수집합니다.

### 구성

Argo Workflows Workflow Controller를 통해 포트 `9090`의 `/metrics`에서 [Prometheus 형식의 메트릭][5]을 사용할 수 있습니다. Agent에서 메트릭 수집을 시작하려면 Workflow Controller 포드에 주석 처리를 해야 합니다. 어노테이션에 대한 자세한 내용은 [Autodiscovery 통합 템플릿][2] 지침을 참조하세요. [샘플 argo_workflows.d/conf.yaml][6]을 검토하여 추가 구성 옵션을 확인할 수 있습니다.

다음은 Argo Workflows 점검을 구성하는 데 필요한 유일한 파라미터입니다.
- `openmetrics_endpoint`: 본 파라미터는 Prometheus 형식의 메트릭이 노출되는 위치로 설정해야 합니다. 기본 포트는 `9090`입니다. 컨테이너화된 환경에서는 [호스트 자동 감지][2]에 `%%host%%`을 사용해야 합니다. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-workflows.checks: |
      {
        "argo_workflows": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-workflows'
# (...)
```

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Argo Workflows 로그는 Kubernetes를 통해 여러 Argo Workflows 포드에서 수집할 수 있습니다. Datadog Agent에는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집][7]을 참고하세요.

아래 파라미터를 적용하는 방법은 [Autodiscovery 통합 템플릿][2]을 참고하세요.

| 파라미터      | 값                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_workflows", "service": "<SERVICE_NAME>"}`  |

### 검증

[Agent 상태 하위 명령을 실행][8]하고 점검 섹션에서 `argo_workflows`를 검색합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "argo_workflows" >}}


### 이벤트

Argo Workflows 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "argo_workflows" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [컨테이너 네이티브 CI/CD 파이프라인의 상태 및 성능 모니터링하기][12]

[1]: https://argo-workflows.readthedocs.io/en/stable/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[5]: https://argo-workflows.readthedocs.io/en/stable/metrics/
[6]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/datadog_checks/argo_workflows/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/