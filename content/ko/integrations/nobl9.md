---
app_id: nobl9
app_uuid: 678f6805-2038-4705-80b3-de7cc143baef
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: nobl9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10230
    source_type_name: Nobl9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nobl9
  sales_email: support@nobl9.com
  support_email: support@nobl9.com
categories:
- 메트릭
- 알림
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nobl9/README.md
display_on_public_website: true
draft: false
git_integration_title: nobl9
integration_id: nobl9
integration_title: Nobl9
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nobl9
public_title: Nobl9
short_description: Nobl9으로 SLI 수집, SLO 계산, 오류 예산 알림 활성화하기
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Nobl9으로 SLI 수집, SLO 계산, 오류 예산 알림 활성화하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nobl9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
Nobl9는 실시간 SLO 리포트를 제공하는 SLO 플랫폼입니다. Nobl9는 Datadog와 통합되어 SLI 메트릭을 수집하고 SLO 타겟과 대비해 측정합니다. Nobl9는 허용 가능한 상한의 오류 예산을 계산하기 때문에 오류 경비 지출이 너무 높거나 초과했을 경우 워크플로우와 알림을 트리거할 수 있습니다.

Datadog Nobl9 통합으로 다음을 할 수 있습니다.

- 모니터링 데이터에 비즈니스 맥락 전송
- 안정성 목표를 정의하고 측정
- 오류 예산에 설정된 우선순위와 활동을 합치

### SLO 그리드 보기
![SLO 그리드 보기][1]

### SLO 상세 정보
![상세 정보][2]

### SLO 리포트
![SLO 리포트][3]

### 서비스 상태 대시보드
![서비스 상태 대시보드][4]

## 설정

모든 구성은 Nobl9 SLO 플랫폼에서 이루어 집니다.

1. Datadog API 엔드포인트를 추가해 `https://api.datadoghq.com/` 또는 `https://api.datadoghq.eu/`데이터 소스를 연결합니다(필수).
2. **Project** 이름을 입력합니다. 이 필드는 여러 사용자가 여러 팀이나 프로젝트에 흩어져 있을 때 사용할 수 있습니다. 이 필드가 비워져 있으면 기본값이 나타납니다.
3. **Name** 필드에 이름 값이 입력되어 있으면 **Display Name**이 자동으로 나타납니다.
4. 내 데이터 소스 이름을 입력합니다(필수). 각 프로젝트에 메타데이터 이름은 고유하고 일부 RFC와 DNS 이름과 대비하여 검증됩니다. 이 데이터 소스 이름은 알파벳 소문자와 대시만 포함할 수 있습니다(예: `my-datadog-data-source`).
5. 설명을 입력합니다(선택 사항). 팀이나 소유자 이름 및 이 특정 데이터 소스를 생성한 이유를 설명합니다. 설명으로 팀원에 관한 직접적인 컨텍스트를 제공할 수 있습니다.

Nobl9 플랫폼에서 SLO를 생성하는 정보와 관련한 자세한 내용은 Nobl9 [사용자 가이드][5]를 참고하세요.

## 트러블슈팅

도움이 필요하신가요? [Nobl9 지원팀][6] 또는 [Datadog 지원팀][7]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/grid_view.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_detail.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_report.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/service_health.png
[5]: https://nobl9.github.io/techdocs_User_Guide/#service-level-objectives-38
[6]: https://nobl9.com/about/#contact
[7]: https://docs.datadoghq.com/ko/help/