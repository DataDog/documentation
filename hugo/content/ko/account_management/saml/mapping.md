---
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: SAML을 이용한 Single Sign On
title: SAML 그룹 매핑
---

## 개요

Datadog를 사용해 IDP(Identity Provider) 응답의 속성을 Datadog 엔터티에 매핑할 수 있습니다.

다음 보안 주체에 속성을 매핑할 수 있습니다.
- [Datadog 역할][1]
- [Datadog 팀][2]

 접근 관리 권한이 있는 사용자는 SAML 할당 속성을 기반으로 Datadog 보안 주체를 할당하거나 제거할 수 있습니다.

 SAML 속성에서 Datadog 개체로 매핑을 설정하면 ID 공급자에서만 사용자를 관리할 수 있습니다. 그러면 시스템은 사용자가 설정한 매핑에 따라 Datadog의 사용자를 프로비저닝합니다.

## 사전 필수 조건

매핑에는 정확한 속성이 필요하기 때문에 매핑을 시작하기 전에 어설션에 전송한 대상을 먼저 이해하는 것이 중요합니다. 각 IDP에는 고유한 매핑이 있습니다. 예를 들어 Azure에는 개체 ID가 있고, Okta의 경우에는 [Okta 설정][3]에서 속성을 설정해야 합니다. Datadog에서는 매핑을 만들기 **전에** Chrome DevTools 또는 브라우저 확장과 같은 [기본 브라우저 도구][4]와 상호 참조하거나 [SAML 어설션을 검증][5]하는 것을 권고합니다.

## SAML 속성을 Datadog 역할에 매핑

1. IDP 속성을 이해하기 위해 [상호 참조][4]하고 SAML 어설션을 [검증][5]합니다.
2. **Organization Settings**으로 이동해 **SAML Group Mappings** 탭을 클릭합니다.
3. 보이지 않을 경우, **Role Mappings** 탭이 선택되어 있는지 확인합니다.
4. **New Mapping**을 클릭합니다. 대화 상자가 나타납니다.
5. Datadog 역할(기본 또는 커스텀)과 연결하고 싶은 SAML IDP `key-value` 쌍을 지정합니다. **참고**: 이 항목은 대소문자를 구별합니다.
   예를 들어, `member_of` 속성에 `Development` 값이 있는 모든 사용자에게 Datadog 역할 `Devs`를 부여하려면 다음과 같이 합니다.

    {{< img src="account_management/saml/create_mapping.png" alt="Datadog 역할에 SAML 매핑 생성하기" >}}

   **참고**: IDP마다 사례가 다릅니다. 속성 키 또는 레이블을 설정할 수 있는 IDP가 있는 반면, 기본값만 제공하는 IDP도 있습니다. Datadog에서는 로그인한 후 어설션 검사기를 사용해 특정 어설션의 상세 내역을 보고 IDP에서 그룹 멤버십을 전송하는 방법을 확인할 것을 권고합니다.
6. 아직 매핑을 활성화하지 않은 경우, **Enable Mapping**을 클릭해 매핑을 활성화합니다.

IDP 속성을 지정한 사용자가 로그인할 경우, 자동으로 Datadog 역할이 할당됩니다. 마찬가지로, IDP 속성이 제거된 사용자의 경우, 역할 접근 권한을 잃게 됩니다(다른 매핑으로 추가하지 않는 한).

<div class="alert alert-danger">
  <strong>중요</strong> 매칭하는 매핑이 <i>없는</i> 사용자의 경우 이전에 있었던 역할을 모두 잃고 SAML로 조직에 로그인할 수 없게 됩니다. 사용자가 로그인을 할 수 없는 상황을 피하려면 매핑을 활성화하기 전에 매핑 정의를 재확인하고 내 어설션을 다시 점검하세요.
</div>

연필(**Edit**) 아이콘을 클릭해 매핑을 변경하거나 쓰레기통(**Delete**) 아이콘을 클릭해 매핑을 삭제할 수 있습니다. 이와 같은 작업은 매핑에만 영향을 미치며 IDP 속성이나 Datadog 역할에는 영향을 미치지 않습니다.

또는 `authn_mappings` 엔드포인트를 사용해 Datadog 역할의 SAML 속성 매핑을 생성하고 변경할 수도 있습니다. 자세한 내용은 [역할 매핑 API의 통합 인증][6]을 참고하세요.

## SAML 속성을 팀에 매핑

1. 팀 멤버십의 [프로비저닝 소스][7]를 선택할 때 **SAML** 또는 **All sources** 중 하나를 선택해야 합니다.
2. IDP 속성을 이해하기 위해 [상호 참조][4]하고 SAML 어설션을 [검증][5]합니다.
3. **Organization Settings**으로 이동해 **SAML Group Mappings** 탭을 클릭합니다.
4. **Team Mappings** 탭이 선택되어 있는지 확인합니다.
5. **New Mapping**을 클릭합니다. 대화 상자가 나타납니다.
6. Datadog 팀과 연결하고 싶은 SAML IDP `key-value` 쌍을 지정합니다. **참고**: 이 항목은 대소문자를 구별합니다.
   **참고**: IDP마다 사례가 다릅니다. 속성 키 또는 레이블을 설정할 수 있는 IDP가 있는 반면, 기본값만 제공하는 IDP도 있습니다. Datadog에서는 로그인한 후 어설션 검사기를 사용해 특정 어설션의 상세 내역을 보고 IDP에서 그룹 멤버십을 전송하는 방법을 확인할 것을 권고합니다.
8. 드롭다운 메뉴에서 **Team**을 선택합니다.
9. 추가 매핑을 더하려면 **Add Row**를 클릭합니다.
10. 매핑 추가를 완료한 후 **Create**을 클릭합니다.
11. 아직 매핑을 활성화하지 않은 경우, **Enable Mapping**을 클릭해 매핑을 활성화합니다.

연필(**Edit**) 아이콘을 클릭해 매핑을 변경하거나 쓰레기통(**Delete**) 아이콘을 클릭해 매핑을 삭제할 수 있습니다. 이와 같은 작업은 매핑에만 영향을 미치며 IDP 속성이나 Datadog 팀에는 영향을 미치지 않습니다.

**참고**: 역할과는 달리, 팀에서는 로그인 경험이 영향을 미치지 않습니다. Datadog에서는 팀 매핑을 프로비저닝 소스로만 사용합니다. 예를 들어, 사용자가 소속된 팀이 없는 경우에도 Datadog에 로그인할 수 있습니다.

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/teams/
[3]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[4]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[5]: https://www.samltool.com/validate_response.php
[6]: /ko/account_management/authn_mapping/
[7]: /ko/account_management/teams/#choose-provisioning-source