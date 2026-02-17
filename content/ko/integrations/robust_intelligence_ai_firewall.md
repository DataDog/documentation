---
app_id: robust-intelligence-ai-firewall
app_uuid: 1d208134-9005-4a79-bbc1-445950d1a5c7
assets:
  dashboards:
    ai_firewall_results: assets/dashboards/robust_intelligence_ai_firewall_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: robust_intelligence_ai_firewall.firewall_requests.count
      metadata_path: metadata.csv
      prefix: robust_intelligence_ai_firewall.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10418
    source_type_name: Robust Intelligence AI Firewall
author:
  homepage: https://www.robustintelligence.com/
  name: Robust Intelligence
  sales_email: contact@robustintelligence.com
  support_email: help@robustintelligence.com
categories:
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/README.md
display_on_public_website: true
draft: false
git_integration_title: robust_intelligence_ai_firewall
integration_id: robust-intelligence-ai-firewall
integration_title: Robust Intelligence AI Firewall
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: robust_intelligence_ai_firewall
public_title: Robust Intelligence AI Firewall
short_description: Datadog을 사용하여 AI Firewall 결과 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Datadog을 사용하여 AI Firewall 결과 모니터링
  media:
  - caption: Robust Intelligence AI Firewall
    image_url: images/ai-firewall.png
    media_type: image
  - caption: Robust Intelligence AI Firewall 결과 대시보드
    image_url: images/firewall-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Robust Intelligence AI Firewall
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Robust Intelligence AI Firewall][1]은 AI 모델을 위한 보호 레이어입니다.

AI 방화벽은 들어오는 사용자 프롬프트를 검사하여 프롬프트 삽입, 프롬프트 추출 또는 PII 감지를 시도하는 모든 시도를 포함하여 악성 페이로드를 차단합니다. AI Firewall은 LLM 모델 출력을 검사하여 잘못된 정보, 민감한 데이터 및 유해한 콘텐츠가 없는지 확인합니다. 조직의 표준을 벗어나는 응답은 애플리케이션에서 차단됩니다.

이 통합은 Datadog Agent를 통해 AI Firewall 결과를 모니터링합니다. 이는 허용된 데이터 포인트, 차단된 데이터 포인트에 대한 메트릭, 각 데이터 포인트가 차단된 이유에 대한 인사이트를 포함하여 AI 보안 문제에 대한 옵저버빌리티를 사용자에게 제공합니다.

## 설정

호스트에서 실행 중인 에이전트의 경우 다음 지침에 따라 설치하고 구성하세요. 컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][2]에 다음 지침을 적용하는 방법이 안내되어 있습니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Robust Intelligence AI Firewall를 설치하세요. Docker Agent 또는 이전 버전의 Agent와 함께 설치하려면 [커뮤니티 통합 사용][3]을 참조하세요.

1. 다음 명령어를 실행해 Agent 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-robust-intelligence-ai-firewall==1.0.0
   ```

2. 핵심 [통합][2]과 유사하게 통합을 구성합니다. 이 통합과 관련된 단계는 아래 Configuration 섹션을 참조하세요.

### 설정

1. Robust Intelligence AI Firewall 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `robust_intelligence_ai_firewall.d/conf.yaml` 파일을 편집하세요.
    ```yaml
    init_config:

    instances:
        ## @param metrics_endpoint - string - required
        ## The URL to Robust Intelligence AI Firewall 
        ## internal metrics per loaded plugin in Prometheus
        ## format.
        #
      - openmetrics_endpoint: http://localhost:8080/metrics
    ```
   사용 가능한 모든 구성 옵션은 [샘플 robust_intelligence_ai_firewall.d/conf.yaml][4] 파일을 참조하세요.

2. 컨테이너화된 환경에서 실행되는 AI Firewall에 대한 통합을 구성하려면 파드에 다음 주석을 추가합니다.
   ```yaml
   apiVersion: v1
   kind: Pod
   # (...)
   metadata:
     name: '<POD_NAME>'
     annotations:
       ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
         {
           "robust_intelligence_ai_firewall": {
             "init_config": {},
             "instances": [
               {
                 "openmetrics_endpoint": "http://%%host%%:8080/metrics"
               }
             ]
           }
         }
       # (...)
   ```

3. [에이전트를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `robust_intelligence_ai_firewall`을 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "robust-intelligence-ai-firewall" >}}


### 서비스 점검

Robust Intelligence AI Firewall은 서비스 점검을 포함하지 않습니다.

### 이벤트

Robust Intelligence AI Firewall은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Robust Intelligence 지원팀][8]에 문의하세요.


[1]: https://www.robustintelligence.com/platform/ai-firewall
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/datadog_checks/robust_intelligence_ai_firewall/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/robust_intelligence_ai_firewall/metadata.csv
[8]: mailto:help@robustintelligence.com