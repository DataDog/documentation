---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
further_reading:
- link: /account_management/scim/azure/
  tag: 설명서
  text: Azure Active Directory로 SCIM 설정하기
- link: account_management/scim/okta
  tag: 설명서
  text: Okta로 SCIM 설정
title: SCIM을 이용한 사용자 프로비저닝
---

<div class="alert alert-info">
SCIM은 Infrastructure Pro 및 Infrastructure Enterprise 플랜에서 사용할 수 있습니다.
</div>

## 개요

SCIM(System for Cross-domain Identity Management)은 사용자 프로비저닝 자동화를 허용하는 개방형 표준입니다. SCIM을 사용하면 조직의 ID 공급자(IdP)와 동기화하여 Datadog 조직의 사용자 프로비저닝 및 프로비저닝 해제 자동화가 가능합니다. 

### 지원되는 기능

- Datadog에서 사용자 생성(첫 로그인 시 이메일 인증 필요. 자세한 내용은 [이메일 인증][1] 참조)
- 더 이상 액세스가 필요하지 않은 경우 Datadog에서 사용자 제거
- ID 공급자와 Datadog 간에 사용자 속성을 동기화된 상태로 유지
- Datadog에 대한 Single sign-on (권장)
- Managed Teams: ID 공급자 그룹에서 Datadog Teams를 만들고 Datadog Teams의 멤버십을 ID 공급자의 그룹 멤버십과 동기화된 상태로 유지

Datadog은 Microsoft Entra ID 및 Okta ID 공급자와 함께 SCIM 사용을 지원합니다. SCIM을 구성하려면 IdP 문서를 참조하세요.
- [Microsoft Entra ID][2]
- [Okta][3]

### 사전 필수 조건

Datadog의 SCIM은 Infrastructure Pro 및 Infrastructure Enterprise 플랜에 포함된 고급 기능입니다.

이 문서에서는 조직이 ID 공급자를 사용하여 사용자 ID를 관리한다고 가정합니다.

Datadog에서는 액세스 중단을 방지하기 위해 SCIM을 구성할 때 서비스 계정 애플리케이션 키를 사용할 것을 적극 권장합니다. 자세한 내용은 [SCIM으로 서비스 계정 사용][4]을 참조하세요.

Datadog에서는 SAML과 SCIM을 함께 사용 시 액세스 불일치를 방지하기 위해 SAML JIT(Just-In-Time) 프로비저닝을 비활성화할 것을 권장합니다. SCIM을 통해서만 사용자 프로비저닝을 관리하세요.

## SCIM으로 서비스 계정 사용

SCIM을 활성화하려면 [애플리케이션 키][5]를 사용하여 ID 공급자와 Datadog 계정 간의 연결을 보호해야 합니다. 특정 사용자 또는 서비스 계정이 각 애플리케이션 키를 제어합니다.

SCIM을 활성화하기 위해 사용자에게 연결된 애플리케이션 키를 사용하고 해당 사용자가 조직을 떠나면 해당 Datadog 계정의 프로비저닝이 해제됩니다. 해당 사용자별 애플리케이션 키가 취소되고 SCIM 통합이 영구적으로 중단되어 조직의 사용자가 Datadog에 액세스할 수 없게 됩니다.

Datadog에서는 데이에 대한 액세스 손실 방지를 위해 SCIM 전용 [서비스 계정][6]을 생성할 것을 권장합니다. 해당 서비스 계정 내에서 SCIM 통합에 사용할 애플리케이션 키를 만듭니다.

## 이메일 인증

SCIM을 사용하여 새 사용자를 생성하면 해당 사용자에게 이메일이 전송됩니다. 처음 접속하는 경우 이메일로 공유된 초대 링크를 통해 로그인해야 합니다. 링크는 2일 동안 유효합니다. 만료된 경우 [사용자 설정 페이지][7]로 이동하여 초대 링크를 다시 보낼 사용자를 선택하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/scim/#email-verification
[2]: /ko/account_management/scim/azure
[3]: /ko/account_management/scim/okta
[4]: /ko/account_management/scim/#using-a-service-account-with-scim
[5]: /ko/account_management/api-app-keys
[6]: /ko/account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /ko/help/