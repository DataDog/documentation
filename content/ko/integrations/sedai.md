---
app_id: sedai
app_uuid: fa7de455-fef8-4cb2-af30-9baa50e351f2
assets:
  dashboards:
    Sedai Overview: assets/dashboards/sedai_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sedai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10249
    source_type_name: Sedai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sedai
  sales_email: praveen.prakash@sedai.io
  support_email: praveen.prakash@sedai.io
categories:
- 자동화
- 클라우드
- cost management
- 알림
- 오케스트레이션
- 프로비저닝
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md
display_on_public_website: true
draft: false
git_integration_title: sedai
integration_id: sedai
integration_title: Sedai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sedai
public_title: Sedai
short_description: 클라우드 애플리케이션을 지능적으로 관리하는 자율 플랫폼
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::자동화
  - Category::Cloud
  - Category::Cost Management
  - Category::Notifications
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 클라우드 애플리케이션을 지능적으로 관리하는 자율 플랫폼
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sedai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Sedai는 프로덕션을 선제적으로 관리하여 환경 문제를 예방하고 가용성, 성능 및 클라우드 비용을 개선하는 자율 클라우드 플랫폼입니다. SRE를 위한 지능형 자동 조종 장치인 Sedai는 모니터링 데이터를 독립적으로 감지, 우선순위를 지정 및 분석하여 임계값 없이 안전하고 자율적으로 프로덕션에서 작동합니다.

이 통합을 활성화하면 Datadog 알림에서 Sedai가 프로덕션 환경에서 자율적으로 실행하는 작업에 관한 정보를 받을 수 있습니다.

### 작동 방식

* **에이전트 없이 사용 가능:** 클라우드 계정에 원활하게 연결하여 프로덕션 환경을 자동으로 검색하고 이해합니다.

* **무료 구성:** Datadog API 에 쉽게 연결하여 메트릭 행동을 지능적으로 식별하고 우선순위를 정해 학습합니다.

* **선제적인 조치 조치:** 사용자를 대신해 프로덕션 환경에서 안전하게 작업하여 리소스가 가용성 문제를 방지하고 항상 최적으로 실행되도록 합니다.

## 설정

Sedai 내에서:

1. Settings > Notifications > Add Integration > Datadog 아이콘으로 이동합니다.

   ![Datadog 통합 추가][1]

2. 별명과 Datadog 계정의 API 키를 입력합니다. 통합을 활성화하고 테스트합니다.

   ![Datadog API 키 설정][2]

3. 테스트 작동을 확인하면 저장을 클릭합니다.

   ![활성된 Datadog 통합 저장][3]

4. Settings > Notifications에서 Datadog에 보내고 싶은 [알림을 선택][4]합니다.

   ![Datadog 알림 활성화][5]

## 수집한 데이터

이 통합은 이벤트를 Datadog로 전송합니다.

## 지원

이 통합과 관련해 도움이 필요할 경우 [Datadog 지원팀][6]에 문의하시기 바랍니다.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/ko/help/