---
categories:
- cloud
- 로그 수집
custom_kind: integration
dependencies: []
description: Salesforce Marketing Cloud
doc_link: https://docs.datadoghq.com/integrations/salesforce_marketing_cloud/
draft: false
git_integration_title: salesforce_marketing_cloud
has_logo: false
integration_id: ''
integration_title: Salesforce Marketing Cloud
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce_marketing_cloud
public_title: Salesforce Marketing Cloud
short_description: Salesforce Marketing Cloud에서 로그를 수집하세요.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Salesforce Marketing Cloud는 모바일, 소셜, 온라인 및 이메일 플랫폼을 통한 마케팅을 위한 자동화, 분석 도구 및 서비스를 갖춘 클라우드 기반 마케팅 플랫폼입니다.

Datadog과 Salesforce Marketing Cloud 통합은 [Datadog 로그][1]를 사용하여 로그를 확인하고 파싱하는데 사용됩니다.

## 설정

### 설치

설치할 필요가 없습니다.

### 설정

Datadog에 이벤트를 보내도록 Salesforce Marketing Cloud를 구성하려면 Salesforce Marketing Cloud Setup 페이지에서 콜백 URL을 만들고 구독을 생성해야 합니다.

#### 계정 설정

1. Salesforce Marketing Cloud에 로그인합니다.
2. 계정에서 **Settings/Setup**을 클릭합니다.
3. `Event Notifications` `Callbacks` 및 `Subscriptions`을 허용하는 사용자 계정이 속한 역할을 생성하거나 수정합니다.

#### 콜백 설정

1. Setup 페이지에서 **Feature Settings** > **Event Notifications**로 이동한 다음 **URL Callbacks**를 선택합니다.
2. **Register New**를 클릭합니다.
3. Datadog 통합 타일에 제공된 URL을 복사합니다.
5. 콜백 URL의 이름을 지정하고 URL을 붙여넣습니다.
6. **Match Batch Size**를 1000으로 설정하고 **Register**를 클릭합니다.
7. 인증 페이로드가 Datadog 엔드포인트로 전송됩니다. 인증 페이로드를 보려면 Datadog 통합 타일을 다시 로드합니다.
8. 인증 키를 복사하여 Salesforce Marketing Cloud URL Callback Setup 페이지의 **Verification** 섹션에 붙여넣습니다.

#### 구독 설정

1.  **Feature Settings**에서 **Event Notifications** > **Subscriptions**를 클릭합니다.
2. `Subscribe New`를 선택하고 구독에 대한 이름을 지정합니다.
3. 수신하려는 모든 이벤트를 선택하고 필터를 추가합니다.
4. **Subscribe**를 클릭하면 해당 이벤트가 Datadog으로 전송됩니다.

## 수집한 데이터

### 메트릭

Salesforce Marketing Cloud 통합은 메트릭을 포함하지 않습니다.

### 로그

Salesforce Marketing Cloud 통합은 [구독 설정](#subscription-setup)에서 선택한 이벤트로부터 로그 이벤트를 수집합니다.

### 서비스 점검

Salesforce Marketing Cloud 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/logs/
[2]: https://docs.datadoghq.com/ko/help/