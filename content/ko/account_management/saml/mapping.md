---
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: SAML을 이용한 Single Sign On
title: SAML 그룹 매핑
---

## 개요

Datadog을 사용해 ID 공급자(IdP) 응답에 있는 속성을 Datadog 엔터티에 매핑할 수 있습니다.

다음 주체에 속성을 매핑할 수 있습니다. 
- [Datadog 역할][1]
- [Datadog 팀][2]

 액세스 관리 권한이 있는 사용자는 사용자에 할당된 SAML 속성에 따라 Datadog 보안 주체를 할당하거나 제거할 수 있습니다.

 SAML 속성에서 Datadog 개체로 매핑을 설정하면 ID 공급자에서만 사용자를 관리할 수 있습니다. 그러면 시스템은 사용자가 설정한 매핑에 따라 Datadog의 사용자를 프로비저닝합니다.

## 필수 구성 요소

매핑에 올바른 특성을 사용해야 하기 때문에 매핑을 설정하기 전에 어설션 내용을 이해하는 것이 중요합니다. 각 IdP에는 고유한 매핑 특징이 있습니다. 예를 들어, Azure에서는 개체 ID를 사용하고 Okta에서는 [Okta 설정][3]에서 속성을 설정해야 합니다. Datadog에서는 [SAML 어설션 유효성 검사][5]를 하기 **전에** 매핑을 생성하는 Chrome DevTools나 브라우저 확장명과 같은 [빌트인 브라우저 툴링][4]을 사용해 교차로 검증할 것을 권장합니다.

## SAML 특성을 Datadog 역할에 매핑

1. SAML 어설션을 [교차 검증][4]하고 [확인][5]하여 IdP 속성을 먼저 이해합니다.
2. **Organization Settings**로 이동해 **SAML Group Mappings** 탭을 클릭합니다.
3. 화면이 나타나면 **Role Mappings** 탭이 선택되어 있는지 확인합니다.
4. **New Mapping**을 클릭하면 대화상자가 나타납니다.
5. 기존 Datadog 역할(기본값 또는 커스텀)에 연결할 SAML ID 공급자 `key-value` 쌍을 지정합니다. **참고**: 이 항목은 대소문자를 구분합니다.
   예를 들어, `member_of` 속성에 `Development` 값이 있는 모든 사용자에게 Datadog 역할 `Devs`를 부여하려면 다음과 같이 합니다.

    {{< img src="account_management/saml/create_mapping.png" alt="Datadog 역할에 SAML 매핑 생성" >}}

   **참고**: ID 공급자마다 방법이 다르니 유의하세요. 속성 키나 레이블을 설정할 수 있는 경우도 있고, 특정 기본값 한 개를 제공하는 경우도 있습니다. Datadog에서는 로그인 시 어설션 검사자를 사용해 특정 어설션의 세부 정보를 확인하는 것을 권장합니다. 이렇게 하면 ID 제공자가 그룹 구성원 자격을 전송하는 방법을 알 수 있습니다.
6. 아직 매핑을 활성화하지 않은 경우 **Enable Mappings**을 클릭하여 매핑을 사용하도록 설정합니다.

지정된 ID 공급자 속성으로 사용자가 로그인하면 자동으로 Datadog 역할이 할당됩니다. 마찬가지로 해당 ID 공급자 특성을 제거하면 사용자는 해당 역할의 액세스 권한을 잃게 됩니다(다른 매핑에서 추가하지 않는 한).

<div class="alert alert-warning">
  <strong>중요</strong>: 사용자가 매핑과 일치하지 <i>않으면</i> 이전에 가지고 있던 역할을 잃고 SAML로 조직에 로그인할 수 없습니다. 매핑을 활성화하기 전에 매핑 정의를 다시 확인하고 어설션을 검사해 사용자가 로그인할 수 없는 시나리오를 방지하세요.
</div>

연필 아이콘(**Edit**)을 클릭해 매핑을 변경하거나 휴지통(**Delete**) 아이콘을 클릭해 매핑을 제거할 수 있습니다. 이 작업은 ID 공급자 속성이나 Datadog 역할이 아닌 매핑에만 영향을 미칩니다.

또는 `authn_mappings` 엔드포인트를 사용해 SAML 속성을 Datadog 역할에 매핑하고 변경할 수도 있습니다. 자세한 내용은 [역할 매핑의 API 연합 인증][6]을 참고하세요.

## SAML 속성을 팀에 매핑

{{< callout url="/help/" >}}
팀에 SAML 속성을 매핑하는 기능은 베타 서비스 중입니다. 액세스를 요청하려면 지원팀에 문의하세요.
{{< /callout >}}

1. 팀 구성원 자격으로 [프로비저닝 소스][7]를 선택할 때 **SAML** 또는 **All source**를 선택했는지 확인합니다.
2. SAML 어설션을 [교차 검증][4]하고 [확인][5]하여 IdP 속성을 먼저 이해합니다.
3. **Organization Settings**로 이동하여 **SAML Group Mappings** 탭을 클릭합니다.
4. **Team Mappings** 탭이 선택되었는지 확인합니다.
5. **New Mapping**을 클릭하면 대화상자가 나타납니다.
6. Datadog 팀과 연결할 SAML ID 공급자 `key-value` 쌍을 지정합니다. **참고**: 이 항목은 대소문자를 구분합니다.
    **참고**: ID 공급자마다 방법이 다르니 유의하세요. 속성 키나 레이블을 설정할 수 있는 경우도 있고, 특정 기본값 한 개를 제공하는 경우도 있습니다. Datadog에서는 로그인 시 어설션 검사자를 사용해 특정 어설션의 세부 정보를 확인하는 것을 권장합니다. 이렇게 하면 ID 제공자가 그룹 구성원 자격을 전송하는 방법을 알 수 있습니다.
8. 드롭다운 메뉴에서 **Team**을 선택합니다.
9. 매핑을 추가하려면 **Add Row**를 클릭합니다.
10. 매핑 추가가 완료되면 **Create**를 클릭합니다.
11. 아직 매핑을 활성화하지 않은 경우 **Enable Mappings**을 클릭하여 매핑을 사용하도록 설정합니다.

연필 아이콘(**Edit**)을 클릭해 매핑을 변경하거나 휴지통(**Delete**) 아이콘을 클릭해 매핑을 제거할 수 있습니다. 이 작업은 ID 공급자 속성이나 Datadog Team이 아닌 매핑에만 영향을 미칩니다.

**참고:** 팀은 역할과 달리 로그인 경험에 영향을 전혀 미치지 않습니다. Datadog에서는 팀 매핑을 프로비저닝 소스로만 사용합니다. 예를 들어 사용자가 팀에 속하지 않아도 Datadog에 로그인할 수 있습니다.

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /ko/account_management/authn_mapping/
[7]: /ko/account_management/teams/#choose-provisioning-source