---
app_id: mergify-oauth
app_uuid: 3b53fe32-b47e-4a29-881f-b90397a11589
assets:
  dashboards:
    Mergify Merge Queue Overview: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - mergify.merge_queue_length
      - mergify.time_to_merge.median
      - mergify.time_to_merge.mean
      - mergify.queue_checks_outcome
      - mergify.queue_freeze.duration
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10350
    source_type_name: Mergify OAuth
  oauth: assets/oauth_clients.json
author:
  homepage: https://mergify.com
  name: Mergify
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- 개발 툴
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify_oauth/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify_oauth
integration_id: mergify-oauth
integration_title: Mergify
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mergify_oauth
public_title: Mergify
short_description: Mergify 병합 대기열 통계 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Mergify 병합 대기열 통계 모니터링
  media:
  - caption: Mergify - 대시보드
    image_url: images/dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 통합 기능은 [Mergify][1]에서 구성된 각 리포지토리의 병합 대기열 길이를 모니터링하고 Mergify 글로벌 가용성을 추적합니다. Datadog 계정으로 메트릭을 전송하여 이상 알림 모니터를 설정하고 병합 대기열 성능을 분석합니다. Datadog 통합으로 Mergify 서비스 가용성을 지속적으로 파악하고 워크플로 개발을 최적화합니다.

## 설정

- **Datadog에서**: **Integrations**로 이동해 Mergify 타일을 선택한 다음 **Install Integration**를 클릭합니다.
- **Connect Accounts**를 클릭하여 본 통합의 인증을 시작합니다. [Mergify 대시보드][2]로 리디렉션됩니다.
- **Mergify 대시보드에서**: 로그인하고 **Datadog Integration**을 설정할 조직을 선택한 후 **Connect the integration**을 클릭합니다.

이제 Mergify 앱 통계가 Datadog에 나타납니다.

## 삭제

1. [Mergify 대시보드][2]로 이동하여 로그인 후 **Integrations**로 이동합니다.
2. **Datadog** 타일에서 **Disconnect** 버튼을 클릭합니다.

이 통합이 설치 제거되면 이전 인증은 취소됩니다.

참고: Datadog [API 키 페이지][3]에서 통합 이름을 검색하여 본 통합과 관련된 모든 API 키가 비활성화되었는지 확인합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mergify_oauth" >}}


메트릭 `mergify.queue_checks_outcome`의 경우 사용 가능한 `outcome_type` 태그는 다음과 같습니다.

- `PR_DEQUEUED`: 대기열에서 수동으로 제거된 PR의 수입니다.
- `PR_AHEAD_DEQUEUED`: 선행 PR이 대기열에서 제거됨으로써 대기열에서 제거된 PR의 수입니다.
- `PR_AHEAD_FAILED_TO_MERGE`: 선행 PR이 병합에 실패함으로써 대기열에서 제거된 PR의 수입니다.
- `PR_WITH_HIGHER_PRIORITY_QUEUED`: 우선 순위가 더 높은 PR이 대기열에 있기 때문에 대기열에서 제거된 PR의 수입니다.
- `PR_QUEUED_TWICE`: 대기열에 두 번 추가되었기 때문에 대기열에서 제거된 PR의 수입니다.
- `SPECULATIVE_CHECK_NUMBER_REDUCED`: 구성의 투기적 검사(Speculative Checks) 수가 변경되어 대기열에서 제거된 PR의 수입니다.
- `CHECKS_TIMEOUT`: 투기적 검사(Speculative Checks)의 시간이 초과되어 대기열에서 제거된 PR의 수입니다.
- `CHECKS_FAILED`: 투기적 검사(Speculative Checks)에 실패하여 대기열에서 제거된 PR의 수입니다.
- `QUEUE_RULE_MISSING`: PR을 대기열에 올리는 데 사용되었던 대기열 규칙이 삭제되었기 때문에 대기열에서 제거된 PR의 수입니다.
- `UNEXPECTED_QUEUE_CHANGE`: 사용자가 대기열에 있는 풀 요청에 관한 작업을 실행하여 대기열에서 제거된 PR의 수입니다.
- `PR_FROZEN_NO_CASCADING`: 캐스케이딩 효과 없이 동결(freeze) 조치로 인해 동결되어 대기열에서 제거된 PR의 수입니다.
- `TARGET_BRANCH_CHANGED`: PR 대상 브랜치가 변경되어 대기열에서 제거된 PR의 수입니다.
- `TARGET_BRANCH_MISSING`: PR 대상 브랜치가 더 이상 존재하지 않기에 대기열에서 제거된 PR의 수입니다.
- `PR_UNEXPECTEDLY_FAILED_TO_MERGE`: 예기치 않게 병합에 실패하여 대기열에서 제거된 PR의 수입니다.
- `BATCH_MAX_FAILURE_RESOLUTION_ATTEMPTS`: 배치 장애 해결 시도 최대 한도에 도달하여 대기열에서 제거된 PR의 수입니다.

### 서비스 점검

Mergify는 서비스 점검을 포함하지 않습니다.

### 이벤트

Mergify는 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [Mergify 지원 팀][1]에 문의하세요.

[1]: https://mergify.com
[2]: https://dashboard.mergify.com
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Mergify
[4]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv