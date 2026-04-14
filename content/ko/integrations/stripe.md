---
app_id: stripe
app_uuid: ad2b7df2-b230-4a7d-b1d0-a964443a6534
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 624
    source_type_name: Stripe
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: stripe
integration_id: stripe
integration_title: Stripe
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: stripe
public_title: Stripe
short_description: Stripe 계정에서 발생하는 이벤트 변경 사항에 관한 로그를 수신하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Stripe 계정에서 발생하는 이벤트 변경 사항에 관한 로그를 수신하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Stripe
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Stripe는 모든 규모의 인터넷 기업을 위한 온라인 결제 처리 및 커머스 솔루션을 지원하는 API 모음입니다. Datadog을 Stripe 계정에 연결하여 계정의 이벤트 변경 사항에 관한 로그를 받으세요.

## 설정

### 구성

#### 로그

1. Datadog [Stripe 통합 타일][1]에서 **Configuration** 탭 내부에 생성된 URL을 복사합니다.
2. Stripe 계정의 [Webhooks][2] 페이지로 이동합니다.
3. **Add Endpoint**를 클릭합니다.
4. 1단계에서 생성된 URL을 **Endpoint URL**에 붙여넣습니다.
5. **Description**에 설명을 추가합니다.
6. 수신할 이벤트를 선택합니다.
7. **Add endpoint**를 클릭합니다.


## 수집한 데이터

### 메트릭

Stripe 통합은 메트릭을 포함하지 않습니다.

### 로그

Stripe 이벤트는 `stripe` 소스 아래에 로그로 나타납니다.

### 이벤트

Stripe 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Stripe 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/stripe
[2]: https://dashboard.stripe.com/webhooks
[3]: https://docs.datadoghq.com/ko/help