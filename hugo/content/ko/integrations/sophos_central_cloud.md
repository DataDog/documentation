---
app_id: sophos-central-cloud
app_uuid: 7293cd88-ceda-4094-94cd-09851f203f0e
assets:
  dashboards:
    Sophos Central Cloud - Alerts: assets/dashboards/sophos_central_cloud_alerts.json
    Sophos Central Cloud - Events: assets/dashboards/sophos_central_cloud_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18598661
    source_type_name: Sophos Central Cloud
  logs:
    source: sophos-central-cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sophos_central_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: sophos_central_cloud
integration_id: sophos-central-cloud
integration_title: Sophos Central Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sophos_central_cloud
public_title: Sophos Central Cloud
short_description: Sophos Central Cloud 알림 및 이벤트 로그에 관한 인사이트를 얻으세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Sophos Central Cloud 알림 및 이벤트 로그에 대한 인사이트를 얻어보세요.
  media:
  - caption: Sophos Central Cloud - 알림
    image_url: images/sophos_central_cloud_alerts.png
    media_type: 이미지
  - caption: Sophos Central Cloud - 이벤트
    image_url: images/sophos_central_cloud_events.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos Central Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Sophos Central][1]은 위협으로부터 조직을 보호하고 모니터링할 수 있는 통합 클라우드 기반 관리 플랫폼입니다. 모든 규모의 기업이 Sophos 솔루션 제품군을 단일 관리 솔루션으로 통합하는 데 사용합니다.

본 통합은 다음 로그를 수집합니다.

- 알림: 보안 이벤트 또는 잠재적 위협에 대응하여 Sophos Central Cloud가 생성한 알림 또는 경고를 나타냅니다. 알림은 사전 정의된 보안 정책, 탐지 규칙 또는 Sophos Central Cloud가 식별한 비정상적 활동에 기반하여 트리거됩니다.
- 이벤트: Sophos Central Cloud가 감지 및 기록하는 특정 상황을 나타냅니다. 이벤트에는 멀웨어 탐지, 무단 액세스 시도, 시스템 취약성 및 기타 보안 이벤트와 같은 다양한 보안 관련 활동이 포함될 수 있습니다.

Sophos Central Cloud 통합은 위에 명시한 로그를 원활하게 수집하여 Datadog에 전송해 분석합니다. 기본 제공 로그 파이프라인을 활용하면 해당 로그를 파싱 및 보강하여 쉽게 검색 및 분석할 수 있습니다. 이 통합은 즉시 사용 가능한 대시보드로 알림 및 이벤트에 대한 인사이트를 제공합니다. 또한, 본 통합은 **get_endpoint_details** 플래그를 통해 알림 및 이벤트 로그와 같이 해당 엔드포인트 세부 정보를 보강합니다.

## 설정

### Sophos Central Cloud에서 API 자격 증명 생성하기

1. [**Sophos Central 계정**][2]에 로그인합니다.
2. Sophos Central Admin에서 **My Products** > **General Settings** > **API Credentials Management**로 이동합니다.
3. **Add Credential**을 클릭합니다.
4. 자격 증명 이름을 입력하고, 적절한 역할을 선택합니다. 그런 다음 옵션 설명을 추가하고 **Add** 버튼을 클릭합니다. 클라이언트 ID가 포함된 API 자격 증명 요약 페이지가 표시됩니다.
5. **Show Client Secret**을 클릭하여 **Client Secret**을 표시합니다.

### Sophos Central Cloud 계정을 Datadog에 연결하기

1. Sophos Central Cloud 자격 증명을 추가합니다.

    | 파라미터 | 설명                                                                                     |
    | ------------------------------- | -------------------------------------------------------------------------- |
    | 클라이언트 ID                       | Sophos Central Cloud 클라이언트 ID입니다.                                   |
    | 클라이언트 시크릿                   | Sophos Central Cloud 클라이언트 시크릿입니다.                               |
    | 엔드포인트 세부 정보 가져오기            | Sophos Central Cloud 알림 및 이벤트 로그 엔드포인트 세부 정보를 수집하려면 기본값을 'True'로 그대로 둡니다. 그렇지 않으면 'false'로 설정합니다.                  |

2. **Save** 버튼을 클릭하여 설정을 저장합니다.

## 수집한 데이터

### 로그

본 통합은 Sophos Central Cloud 알림 및 이벤트 로그를 수집하여 Datadog에 전달합니다.

### 메트릭

Sophos Central Cloud 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Sophos Central Cloud 통합은 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://www.sophos.com/en-us/products/sophos-central
[2]: https://cloud.sophos.com/manage/login
[3]: https://docs.datadoghq.com/ko/help/