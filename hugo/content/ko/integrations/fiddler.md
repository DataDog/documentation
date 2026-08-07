---
app_id: fiddler
app_uuid: ee617671-508e-4bb3-ba25-8815b11a16aa
assets:
  dashboards:
    Fiddler: assets/dashboards/fiddler_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fiddler.accuracy
      metadata_path: metadata.csv
      prefix: fiddler.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10307
    source_type_name: fiddler
author:
  homepage: http://www.fiddler.ai
  name: Fiddler
  sales_email: sales@fiddler.ai
  support_email: sales@fiddler.ai
categories:
- 경고
- 메트릭
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fiddler/README.md
display_on_public_website: true
draft: false
git_integration_title: fiddler
integration_id: fiddler
integration_title: Fiddler
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: fiddler
public_title: Fiddler
short_description: Fiddler Datadog 통합을 통해 ML 시스템에 대한 가시성을 확보하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - 카테고리::메트릭
  - Category::AI/ML
  - Offering::Integration
  - Queried Data Type::Metrics
  - Submitted Data Type::Events
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Fiddler Datadog 통합을 통해 ML 시스템에 대한 가시성을 확보하세요.
  media:
  - caption: DataDog의 Fiddler Dashboard
    image_url: images/fiddler-datadog.png
    media_type: image
  - caption: 모델 정확도 차트
    image_url: images/accuracy-drift.png
    media_type: image
  - caption: 모델 분석
    image_url: images/analytics.png
    media_type: image
  - caption: 반사실적 설명 수행
    image_url: images/counterfactual.png
    media_type: image
  - caption: 데이터 드리프트 차트
    image_url: images/data-drift.png
    media_type: image
  - caption: 모델 설명
    image_url: images/explanation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Fiddler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Fiddler의 Model Performance Management 플랫폼은 모델 성능 메트릭이 저하될 때 실시간 경고를 보내 기계 학습 모델 성능을 모니터링합니다. 이를 통해 사용자는 추론 데이터를 분석하여 모델 성능이 저하되는 이유를 이해할 수 있습니다. 이 통합에는 정확도, 트래픽, 드리프트 등의 성능 메트릭을 표시하는 기본 대시보드와 메트릭이 포함되어 있습니다.


## 설정

Fiddler 검사는 [Datadog Agent][1] 패키지에 포함되어 있지 않으므로 설치해야 합니다.

### 설치

Agent v7.21+ / v6.21+의 경우 아래 지침에 따라 호스트에 Fiddler 검사를 설치하세요. Docker Agent 또는 이전 버전의 Agent와 함께 설치하려면 [커뮤니티 통합 사용][2]을 참조하세요.

1. 다음 명령어를 실행해 Agent 통합을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-fiddler==3.0.0
   ```

2. Agent 기반 [통합][3]과 유사하게 통합을 구성합니다.

### 설정

1. Fiddler 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트에 있는 `conf.d/` 폴더에서 `fiddler.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 `fiddler.d/conf.yaml`][4]을 참조합니다. 통합에서 쿼리하려는 Fiddler 환경에 대해 `url`, `org`, `fiddler_api_key`  파라미터를 업데이트해야 합니다. Fiddler는 또한 `conf.yaml` 파일에서 `minimum_collection_interval` 설정을 `300`(5분)으로 설정할 것을 제안합니다.

2. [에이전트를 재시작합니다][5].

### 검증

[Agent의 상태 하위 명령을 실행][6]하고 Checks 섹션에서 `fiddler`를 찾습니다.

## 수집한 데이터

### 메트릭

이 검사에서 제공되는 메트릭 목록은 [metadata.csv][7]를 참조하세요.

### 서비스 점검
{{< get-service-checks-from-git "fiddler" >}}


## 트러블슈팅

도움이 필요하신가요? [Fiddler 지원팀][9]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ko/getting_started/integrations/
[4]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/datadog_checks/fiddler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/fiddler/assets/service_checks.json
[9]: https://fiddlerlabs.zendesk.com/hc/en-us