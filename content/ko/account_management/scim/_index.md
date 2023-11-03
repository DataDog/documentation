---
algolia:
  tags:
  - SCIM
  - ID 공급자
  - IdP
kind: 설명서
title: SCIM을 이용한 사용자 프로비저닝
---

## 개요

도메인간의 ID 관리 시스템(System for Cross-domain Identity Management)인 SCIM은 사용자 프로비저닝을 자동화할 수 있는 개방형 표준입니다. SCIM을 사용하면 조직의 ID 공급자(IdP)와 동기화하여 Datadog 조직의 사용자를 자동으로 프로비저닝 및 프로비저닝 해제할 수 있습니다.

### 지원하는 기능

- Datadog에서 사용자 생성
- 사용자가 더 이상 액세스할 필요가 없을 때 Datadog에서 제거
- Azure AD와 Datadog 간 사용자 속성 동기화 유지
- Datadog Single Sign-On 서비스(권장)

Datadog에서는 SCIM과 Azure Active Directory(Azure AD) IdP와 함께 사용합니다.

### 필수 구성 요소

Datadog에서 SCIM을 사용하려면 엔터프라이즈 계정이 필요합니다.

이 설명서에서는 조직이 ID 공급자를 사용해 사용자 ID를 관리한다고 가정합니다.

Datadog에서는 액세스에 차질이 생기지 않도록 SCM을 구성할 때 서비스 계정 애플리케이션 키를 사용하는 것을 권장합니다. 자세한 내용은 [SCIM으로 서비스 계정 사용][1]을 참고하세요.

SAML과 SCIM을 함께 사용하는 경우, Datadog에서는 액세스에 혼선을 방지하기 위해 SAML 적시(JIT) 프로비저닝을 비활성화하기를 권장합니다. SCIM으로만 사용자 프로비저닝을 관리하세요.

## Azure Active Directory로 SCIM 설정하기

### Azure AD 애플리케이션 갤러리에 Datadog 추가

1. Azure 포털에서 **Azure Active Directory** -> **Enterprise Applications**로 이동
2. **New Application** -> **Create your own application** 클릭
3. 검색 박스에 "Datadog" 입력
4. 갤러리에서 Datadog 애플리케이션 선택
5. 이름 입력
6. **Create** 클릭

**참고:** Datadog에서 SSO용 Azure AD로 이미 구성된 경우 **Enterprise Applications**로 이동해 기존 Datadog 애플리케이션을 선택하세요.

### 자동 사용자 프로비저닝 설정

1. 애플리케이션 관리 화면의 왼쪽 패널에서 **Provisioning** 선택
2. **Provisioning Mode** 메뉴에서 **Automatic** 선택
3. **Admin Credentials** 열기
4. 다음에 따라 **Admin Credentials** 섹션을 완료하세요.
    - **테넌트 URL**: `https://app.datadoghq.com/api/v2/scim`
    - **비밀 토큰**: 유효한 Datadog 애플리케이션 키를 사용하세요. 애플리케이션 키는 [조직 설정 페이지][2]에서 만들 수 있습니다. 데이터에 지속적으로 액세스하려면 [서비스 계정][3] 애플리케이션 키를 사용하세요.

{{< img src="/account_management/scim/admin-credentials.png" alt="Azure AD 관리자 인증 정보 구성 화면">}}

5. **Test Connection**를 클릭하고 자격 증명이 프로비저닝을 사용할 수 있다는 승인 메시지를 기다립니다.
6. **Save**를 클릭합니다. 매핑 섹션이 나타납니다. 매핑을 설정하려면 다음 섹션을 참고하세요.

### 속성 매핑

#### 사용자 속성

1. **Mappings** 섹션 확장
2. **Provision Azure Active Directory Users** 클릭
3. **Enabled**를 **Yes**로 설정
4. **Save** 아이콘 클릭
5. **Target Object actions** 아래에서 생성, 업데이트, 작업 삭제가 선택되어 있는지 확인
6. 속성 매핑 섹션 아래 Azure AD에서 Datadog로 동기화된 사용자 속성을 확인합니다. 다음과 같이 매핑을 하세요.
| Azure Active Directory 속성 | Datadog 속성              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="속성 매핑 구성, Azure Active Directory 사용자 프로비저닝">}}

7. 매핑 설정 후 **Save**를 클릭합니다.

#### 그룹 속성

그룹 매핑을 지원하지 않습니다.

## SCIM으로 서비스 계정 사용

SCIM을 활성화하려면 [애플리케이션 키][4]를 사용해 ID 공급자와 Datadog 계정 간의 연결을 보호해야 합니다. 각 애플리케이션 키를 제어하는 특정 사용자 또는 서비스 계정이 있습니다.

사용자와 연결된 애플리케이션 키를 사용해 SCIM을 활성화했는데 해당 사용자가 조직을 떠난 경우, 해당 사용자의 Datadog 계정이 프로비저닝 해제됩니다. 또 해당 사용자의 애플리케이션 키가 취소되고 SCIM 통합이 영구적으로 중단되어 사용자가 Datadog에 액세스할 수 없습니다.

데이터에 계속 액세스하려면 SCIM 전용 [서비스 계정][3]을 생성하는 것이 좋습니다. 해당 서비스 계정 내에서 SCIM 통합에서 사용할 애플리케이션 프로그램 키를 생성하세요.

[1]: /ko/account_management/scim/#using-a-service-account-with-scim
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /ko/account_management/org_settings/service_accounts
[4]: /ko/account_management/api-app-keys