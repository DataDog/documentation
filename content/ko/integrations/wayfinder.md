---
app_id: wayfinder
app_uuid: a68bad83-ba55-4350-a913-2f98bb667bad
assets:
  dashboards:
    Wayfinder: assets/dashboards/wayfinder_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: wayfinder.workqueue.depth
      metadata_path: metadata.csv
      prefix: wayfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10370
    source_type_name: wayfinder
  logs: {}
author:
  homepage: https://www.appvia.io/product/
  name: Appvia
  sales_email: info@appvia.io
  support_email: support@appvia.io
categories:
- 컨테이너
- 개발 툴
- Kubernetes
- 메트릭
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/wayfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: wayfinder
integration_id: wayfinder
integration_title: Wayfinder
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: wayfinder
public_title: Wayfinder
short_description: Wayfinder 메트릭을 Datadog으로 전송
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Developer Tools
  - Category::Kubernetes
  - 'Category::Metrics '
  - Category::Orchestration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Wayfinder 메트릭을 Datadog으로 전송
  media:
  - caption: Wayfinder 샘플 Datadog 대시보드
    image_url: images/wayfinder-datadog-dash.png
    media_type: image
  - caption: Wayfinder UI
    image_url: images/wayfinder-ui.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Wayfinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Wayfinder][1]는 중앙 집중식 설정을 통해 개발자 셀프 서비스를 지원하는 인프라스트럭처 관리 플랫폼입니다. 이 점검은 Datadog Agent를 통해 Wayfinder 주요 관리 구성 요소를 모니터링합니다.

이 통합은 Wayfinder API 서버, 컨트롤러 및 웹훅 구성 요소에서 주요 메트릭을 수집합니다. 이 메트릭은 관리형 워크스페이스의 문제를 파악하는 데 도움이 됩니다.

## 설정

아래 지침을 참고해 Wayfinder Kubernetes 관리 클러스터에 통합을 설치하세요.

### 설치

컨테이너화된 환경에서 이 통합을 Docker Agent와 가장 효과적으로 사용하려면 Wayfinder 통합이 설치된 Agent를 빌드하세요.

### 요구 사항:

Datadog Agent가 Wayfinder 구성 요소에 연결할 수 있도록 네트워크 정책을 구성해야 합니다. 아래 네트워크 정책은 Datadog가 Datadog 네임스페이스에 배포되고, Wayfinder가 Wayfinder 네임스페이스에 배포되었다고 가정합니다.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: datadog-agent
  namespace: wayfinder
spec:
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: datadog
      podSelector:
        matchLabels:
          app: datadog-agent
    ports:
    - port: 9090
      protocol: TCP
  podSelector:
    matchExpressions:
    - key: name
      operator: In
      values:
      - wayfinder-controllers
      - wayfinder-apiserver
      - wayfinder-webhooks
  policyTypes:
  - Ingress
```

Agent의 업데이트 버전을 빌드하는 방법:

1. 다음 Dockerfile을 사용합니다.

    ```dockerfile
    FROM gcr.io/datadoghq/agent:latest

    ARG INTEGRATION_VERSION=1.0.0

    RUN agent integration install -r -t datadog-wayfinder==${INTEGRATION_VERSION}
    ```

2. 이미지를 빌드하여 비공개 Docker 레지스트리에 푸시합니다.

3. Datadog Agent 컨테이너 이미지를 업그레이드하세요. Helm 차트를 사용하는 경우,
   `values.yaml` 파일의 `agents.image` 섹션을 수정해야 합니다.
   이렇게 하면 기본 Agent 이미지를 교체할 수 있습니다.

    ```yaml
    agents:
      enabled: true
      image:
        tag: <NEW_TAG>
        repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
    ```

4. 새 `values.yaml` 파일을 사용하여 에이전트를 업그레이드합니다.

    ```shell
    helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
    ```

### 설정

1. Agent의 설정 디렉터리 루트에 있는 `conf.d/` 폴더에서 `wayfinder/conf.yaml` 파일을 편집합니다.
   이렇게 하면 Wayfinder 데이터를 수집할 수 있습니다.
   사용 가능한 모든 설정 옵션은 [샘플 wayfinder/conf.yaml][4]을 
   참조하세요.

2. [Agent를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `wayfinder`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "wayfinder" >}}


### 서비스 점검

Wayfinder는 서비스 점검을 포함하지 않습니다.

### 이벤트

Wayfinder는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[4]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/datadog_checks/wayfinder/data/conf.yaml.example
[5]:
    https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]:
    https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/metadata.csv
[8]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/assets/service_checks.json

[1]: https://www.appvia.io/product/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/