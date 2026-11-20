---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
description: Microsoft Entra ID 및 Okta ID 공급자와의 SCIM 통합을 사용하여 Datadog에서 사용자 프로비저닝
  및 프로비저닝 해제를 자동화하십시오.
further_reading:
- link: /account_management/scim/azure/
  tag: 설명서
  text: Azure Active Directory로 SCIM 구성하기
- link: account_management/scim/okta
  tag: 설명서
  text: Okta로 SCIM 구성
title: SCIM을 이용한 사용자 프로비저닝
---
<div class="alert alert-info">
SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있습니다.
</div>

## 개요 {#overview}

System for Cross-domain Identity Management, 즉 [SCIM][9]은 사용자 프로비저닝을 자동화할 수 있는 개방형 표준입니다. SCIM을 사용하면 조직의 ID 공급자(IdP)와 동기화하여 Datadog 조직에서 사용자를 자동으로 프로비저닝하고 프로비저닝 해제할 수 있습니다.

### 지원되는 기능 {#supported-capabilities}

- Datadog에서 사용자 생성
- 더 이상 액세스 권한이 필요하지 않은 경우 Datadog에서 사용자 제거
- Datadog에 대한 싱글 사인온(권장)
- Managed Teams: ID 공급자 그룹에서 Datadog Teams를 생성하고 Datadog Teams의 멤버십을 ID 공급자의 그룹 멤버십과 동기화 상태로 유지합니다.
- 역할 프로비저닝: ID 공급자 속성에서 사용자의 Datadog 역할(기본 제공 또는 사용자 지정)을 프로비저닝하고 동기화 상태로 유지합니다. ID 공급자에서 속성이 변경되면 사용자의 Datadog 역할이 실시간으로 업데이트됩니다.

Datadog은 SCIM 서버 프로토콜을 구현합니다. Datadog은 Microsoft Entra ID 및 Okta ID 공급자와 함께 SCIM을 사용하는 것을 지원합니다. 다른 ID 공급자도 작동할 수 있지만 명시적으로 지원되지는 않습니다.

지원되는 ID 공급자에 대해 SCIM을 구성하려면 해당 IdP의 설명서를 참조하십시오:
- [Microsoft Entra ID][2]
- [Okta][3]

### 전제 조건 {#prerequisites}

Datadog의 SCIM은 인프라 Pro, 인프라 Enterprise 및 Startup 플랜에서 사용할 수 있는 고급 기능입니다.

이 문서에서는 조직이 ID 공급자를 사용하여 사용자 ID를 관리한다고 가정합니다.

Datadog에서는 액세스 중단을 방지하기 위해 SCIM을 구성할 때 서비스 계정 애플리케이션 키를 사용할 것을 강력히 권장합니다. 자세한 내용은 [SCIM과 함께 서비스 계정 사용][4]을 참조하십시오.

SAML과 SCIM을 함께 사용할 때 Datadog에서는 액세스 불일치를 방지하기 위해 SAML JIT(Just-In-Time) 프로비저닝을 비활성화할 것을 권장합니다. SCIM을 통해서만 사용자 프로비저닝을 관리하세요.

### 역할 프로비저닝 동작 {#role-provisioning-behavior}

SCIM 요청에 하나 이상의 역할이 포함된 경우, Datadog은 조직의 역할과 일치하는 역할만 프로비저닝합니다. 일치하는 역할이 없으면 사용자의 역할은 조직의 기본 역할(Standard)로 대체됩니다. 일치하지 않는 역할은 [Audit Trail][11]에 기록됩니다.

SCIM은 역할 할당의 신뢰할 수 있는 소스이며 [SAML 역할 매핑][12]보다 우선합니다. SCIM 역할 프로비저닝 이벤트는 Audit Trail 및 StatsD 메트릭으로 기록됩니다.

역할은 [RFC 7643][13]에 정의된 SCIM 다중 값 속성 규칙을 따릅니다. Okta와 Microsoft Entra ID 모두 이 매핑을 기본적으로 지원하므로 사용자 지정 스크립트가 필요하지 않습니다. 설정 지침은 사용 중인 ID 공급자의 문서를 참조하십시오.

## SCIM에서 서비스 계정 사용 {#using-a-service-account-with-scim}

SCIM을 활성화하려면 [애플리케이션 키][5]를 사용하여 ID 공급자와 Datadog 계정 간의 연결을 보호해야 합니다. 각 애플리케이션 키는 특정 사용자 또는 서비스 계정에 의해 제어됩니다.

사용자와 연결된 애플리케이션 키를 사용하여 SCIM을 활성화한 상태에서 해당 사용자가 조직을 떠나면, 그 사용자의 Datadog 계정은 프로비저닝이 해제됩니다. 해당 사용자 전용 애플리케이션 키가 취소되면 SCIM 통합이 영구적으로 중단되어 조직 내 사용자가 Datadog에 액세스할 수 없게 됩니다.

데이터 액세스 권한 상실을 방지하기 위해 Datadog은 SCIM 전용 [서비스 계정][6]을 생성할 것을 강력히 권장합니다. 해당 서비스 계정 내에서 SCIM 통합에 사용할 애플리케이션 키를 생성하십시오.

서비스 계정에는 최소한 `user_access_invite` 및 `user_access_manage` 권한이 필요합니다. 필요한 전체 권한 목록은 [SCIM API 문서][10]를 참조하십시오.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/scim/#email-verification
[2]: /ko/account_management/scim/azure
[3]: /ko/account_management/scim/okta
[4]: /ko/account_management/scim/#using-a-service-account-with-scim
[5]: /ko/account_management/api-app-keys
[6]: /ko/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /ko/help/
[9]: https://scim.cloud/
[10]: /ko/api/latest/scim/
[11]: /ko/account_management/audit_trail/
[12]: /ko/account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[13]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2