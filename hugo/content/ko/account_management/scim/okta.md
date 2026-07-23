---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Okta
title: Okta로 SCIM 설정
---

SCIM을 사용하여 Datadog 사용자를 Okta와 동기화하려면 다음 지침을 참조하세요.

전제 조건, 기능 및 제한 사항은 [SCIM][1]을 참조하세요.

## Okta 애플리케이션 갤러리에서 Datadog 애플리케이션 선택

1. Okta 포털에서 **Applications**로 이동
2. **Browse App Catalog** 클릭
3. 검색 박스에 "Datadog" 입력
4. Datadog 애플리케이션 선택
5. **Add Integration** 클릭

**참고:** 이미 Okta로 설정된 Datadog이 있는 경우 기존 Datadog 애플리케이션을 선택합니다.

## 자동 사용자 프로비저닝 설정

1. 애플리케이션 관리 화면의 왼쪽 패널에서 **Provisioning** 선택
2. **ConfigurationAPI integration**을 클릭합니다.
3. **Enable API integration**을 선택합니다.
3. **Credentials** 섹션을 다음과 같이 완료합니다:
    - **Base URL**: `https://app.datadoghq.com/api/v2/scim` **참고:** 사이트에 적합한 하위 도메인을 사용하세요. URL을 찾으려면 [Datadog 사이트][2]를 참조하세요.
    - **API Token**: 유효한 Datadog 애플리케이션 키를 사용하세요. [조직 설정 페이지][3]에서 애플리케이션 키를 생성할 수 있습니다. 지속적인 데이터 액세스를 유지하려면 [서비스 계정][4] 애플리케이션 키를 사용하세요.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta Admin Credentials 설정 화면">}}

5. **Test API Credentials**를 클릭하고 자격 증명이 확인되었음을 알리는 메시지를 기다립니다.
6. **Save**를 클릭합니다. 설정 섹션이 나타납니다.
7. **Provisioning to App** 옆의 **Edit**를 선택하여 기능을 활성화합니다:
    - **사용자 만들기**
    - **사용자 속성 업데이트**
    - **사용자 비활성화**
8. **Datadog Attribute Mappings**에서 미리 구성된 Datadog 속성에 대한 Okta 속성의 매핑을 찾습니다. 필요한 경우 다시 매핑할 수 있지만, Okta 값을 동일한 Datadog 값 집합에 매핑하세요.

### 그룹 속성

그룹 매핑을 지원하지 않습니다.

[1]: /ko/account_management/scim/
[2]: /ko/getting_started/site
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /ko/account_management/org_settings/service_accounts