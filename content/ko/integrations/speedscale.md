---
app_id: speedscale
app_uuid: 35e3ad0c-9189-4453-b3c3-2b4aefa7c176
assets:
  dashboards:
    speedscale: assets/dashboards/SpeedscaleOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: speedscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10271
    source_type_name: Speedscale
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Speedscale
  sales_email: support@speedscale.com
  support_email: support@speedscale.com
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- orchestration
- 테스팅
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md
display_on_public_website: true
draft: false
git_integration_title: speedscale
integration_id: speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: speedscale
public_title: Speedscale
short_description: Speedscale에서 Datadog로 트래픽 리플레이 결과 게시
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
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Speedscale에서 Datadog로 트래픽 리플레이 결과 게시
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Speedscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

이 통합은 [Speedscale][1]의 트래픽 리플레이 결과를 Datadog에 게시합니다. 이를 통해 Datadog의 관측 데이터와 특정 Speedscale 리플레이 결과를 결합하여 성능 저하의 근본 원인을 조사할 수 있습니다. Speedscale–Datadog 통합을 사용하면 프로덕션 환경에 문제가 발생하기 전 잠재적인 성능 문제를 찾아내고 해결할 수 있습니다.

## 설정

### 구성

1. 이 통합을 사용하려면 Datadog [API 키][2]가 필요합니다. 그래야만 이벤트를 Datadog에 제출할 수 있습니다.

    모범 사례는 이 값을 환경 변수로 저장하는 것입니다. 지속적 통합 시스템에서 이 환경 변수를 저장하게 될 가능성이 높지만 1회성 테스트 실행 시 터미널에서도 액세스할 수 있습니다.

   ```
   export DDOG_API_KEY=0
   ```

2. Datadog에 업로드하려는 특정 보고서의 보고서 ID를 수집하세요. 지속적 통합 환경에서 작업할 때는 커밋 해시와 연결된 보고서 ID를 가져오세요. 이 보고서 ID를 환경 변수에 저장합니다.

   ```
   export SPD_REPORT_ID=0
   ```

3. 특정 보고서 ID와 Datadog API 키를 사용하여`speedctl` 명령어를 실행하면 해당 트래픽 리플레이 보고서를 Datadog 이벤트로 내보낼 수 있습니다.

   ```
   speedctl export datadog ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### 검증

Datadog [이벤트 스트림][2]을 확인하여 내보낸 보고서를 봅니다.

## 수집한 데이터

### 메트릭

Speedscale에는 어떠한 메트릭도 포함되어 있지 않습니다.

### 서비스 점검

Speedscale에는 어떠한 서비스 점검도 포함되어 있지 않습니다.

### 이벤트

Speedscale 통합은 트리픽 리플레이가 완료되면 [Datadog 이벤트 스트림][3]으로 이벤트를 전송하여 사용자가 해당 작업이 메트릭에 미치는 영향을 이해할 수 있도록 해줍니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/ko/help/