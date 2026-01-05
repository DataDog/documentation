---
app_id: akamai
app_uuid: 5ee63b45-092e-4d63-b980-1675f328bf6b
assets:
  dashboards:
    akamai-application-security-overview: assets/dashboards/akamai_application_security_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10392
    source_type_name: Akamai
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_application_security
integration_id: akamai
integration_title: Akamai 애플리케이션 보안
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_application_security
public_title: Akamai Application Security
short_description: Akamai를 통합하여 Akamai 제품에 관한 이벤트 로그를 확보하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 제출한 데이터 유형::로그
  - Category::Log Collection
  - 카테고리::보안
  - 제공::통합
  configuration: README.md#Setup
  description: Akamai를 통합하여 Akamai 제품에 관한 이벤트 로그를 확보하세요.
  media:
  - caption: Akamai 애플리케이션 보안 대시보드 개요
    image_url: images/akamai-application-security-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai 애플리케이션 보안
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요 

### Akamai 애플리케이션 보안 

Datadog은 Akamai 애플리케이션 보안 통합을 통해 Akamai 보안 구성에서 생성된 보안 이벤트 로그를 수집할 수 있습니다. 

이 통합은 웹 트래픽 패턴에 대한 실시간 가시성과 인사이트를 제공하여 악의적인 활동을 신속하게 탐지할 수 있게 합니다. 

또한 DDoS 공격, 봇넷 침입, 애플리케이션 계층 취약점과 같은 보안 위협을 식별하는 데 도움이 됩니다. 

이벤트를 수집한 후 Datadog은 공격 데이터 보안 이벤트, 위협 인텔, IP 로그 활동, 드문 IP 활동에 대한 인사이트를 기본 제공 Akamai 애플리케이션 보안 개요 대시보드에 표시합니다. 

---

## 설정 

### 설치 

설치가 필요하지 않습니다. 

### 구성 

#### 로그 수집 

Akamai 보안 구성에서 생성된 보안 이벤트 로그를 수집하려면, Akamai 계정에서 API 클라이언트를 생성한 후, 생성된 자격 증명을 Datadog의 Akamai 통합 타일에 입력하세요. 

---

#### Akamai에서 API 클라이언트 생성하기 

1. Akamai 계정에 로그인합니다. 
2. **Identity and Access Management**를 검색합니다. 
3. **Create API Client**를 클릭합니다. 
4. **Select APIs**에서 **SIEM**을 검색하고 **READ-ONLY** 접근 권한을 부여합니다. 
5. **Select groups**에서 보안 정책과 연결된 그룹에 **Manage SIEM** 권한을 부여합니다. 
6. API 클라이언트를 생성한 후 **Create credential**을 클릭하여 자격 증명 세트를 생성합니다. 

---

<!--4. 아래 지침을 따라 Akamai 제품에 필요한 권한을 할당하세요. --> 

<!-- TODO: 다른 Akamai 제품이 추가될 경우, 위의 #4-6을 제거하고, 위 #4를 주석 해제한 뒤, 이 섹션을 주석 해제하여 동일한 형식으로 다른 Akamai 제품 지침을 포함하세요. --> 

<!-- 
#### Akamai 보안 이벤트 

1. **Select APIs**에서 **SIEM**을 검색하고 **READ-ONLY** 접근 권한을 부여합니다. 
2. **Select groups**에서 보안 정책과 연결된 그룹에 **Manage SIEM** 권한을 부여합니다. 
3. API 클라이언트를 생성한 후 **Create credential**을 클릭하여 자격 증명 세트를 생성합니다. 
--> 

#### 계정에 관한 구성 ID 가져오기

1. 로그인하면 **Security Configurations**으로 이동합니다.
2. 보안 구성 목록에서 로그를 가져오려는 구성을 선택합니다.
3. 선택한 구성의 Config ID는 URL에서 확인할 수 있습니다. URL 형식은 다음과 같습니다.`http\://control.akamai.com/apps/security-config/#/next/configs/**CONFIG_ID**`
4. 계정에서 **Add New**를 클릭한 후, 이전 단계에서 확인한 구성 ID를 입력합니다.

## 수집한 데이터

### 메트릭

Akamai 통합은 어떠한 메트릭도 포함하지 않습니다.

### 로그

Akamai 통합은 Akamai 계정의 보안 이벤트에서 로그를 수집합니다.
Akamai API의 제한으로 인해 Datadog은 최대 지난 12시간 이내의 이력 이벤트만 수집할 수 있습니다.

### 이벤트

Akamai 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "akamai_application_security" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://app.datadoghq.com/dash/integration/Akamai-Application-Security-Overview
[2]: https://app.datadoghq.com/integrations/akamai
[3]: https://control.akamai.com/apps/auth/#/login
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/akamai/assets/service_checks.json
[5]: https://docs.datadoghq.com/ko/help/