---
further_reading:
- link: /account_management/plan_and_usage/
  tag: 설명서
  text: 플랜 및 사용량 설정
- link: https://www.datadoghq.com/blog/datadog-teams/
  tag: 블로그
  text: Datadog Teams로 조직 전반의 협력을 간소화하기
title: Terraform으로 Datadog 관리
---

## 개요

[Terraform][28]을 사용해 Datadog API와 상호 작용하고 Datadog 조직, 하위 조직, 사용자, 보안 인증, 권한 등을 관리할 수 있습니다. 이 가이드에서는 Terraform으로 Datadog를 관리하는 사용 사례 예시를 제시하고, Tearraform 레지스트리에서 일반적으로 사용되는 Datadog 리소스와 데이터 소스 링크를 제공합니다.

또한 기존 리소스를 Terraform 구성에 [가져오기][29]하여 Terraform에서 추후 관리할 수 있고, Terraform [데이터 소스][30]로 기존 리소스를 참조할 수 있습니다.

## 설정

아직 구성하지 않은 경우, Datadog API와 소통할 수 있도록 [Datadog Terraform 제공자][8]를 구성하세요.

## 사용자, 역할, 팀, 서비스 계정

다음은 최소 권한의 보안 원칙을 따르도록 도와주는 리소스와 데이터 소스입니다. Datadog 조직에서 작업하는 사용자, 팀, 서비스 계정에서 작업하는 데 필요한 필수 권한만 제공합니다.

### 사용자

계정의 [사용자][10]를 생성하고 사용할 수 있는 기본 [커스텀 역할][9]을 할당하세요. [AuthN 매핑][20] 리소스를 사용해 사용자의 SAML 속성을 기반으로 역할을 자동으로 할당할 수 있습니다. 또 기존 사용자, 역할, AuthN 매핑을 내 Terraform 구성에 가져올 수도 있습니다.

Datadog 팀 멤버십 리소스와 같은 다른 리소스에서 Terraform 구성에 있는 기존 사용자 정보를 불러올 때 [사용자 데이터 소스][21]를 사용할 수 있습니다. 

### 역할

Datadog에서는 사용자 권한에 세 가지 관리 역할을 제공합니다. 그러나 [역할 리소스][18]를 사용해 커스텀 역할을 생성하고 관리할 수 있습니다.

Datadog 사용자 리소스와 같은 다른 리소스에서 기존 역할을 불러올 때 [역할 데이터 소스][22]를 사용할 수 있습니다.

### Teams

[Datadog 팀][11] 리소스를 사용해 특정 리소스를 사용자 그룹에 연결하고 Datadog 경험을 필터링해 해당 리소스에 우선 순위를 부여할 수 있습니다. [팀 멤버십][12] 리소스를 사용해 팀 멤버십을 관리하고 [팀 권한 설정][17] 리소스를 사용해 팀을 관리할 사람을 통제할 수 있습니다.

[팀 데이터 소스][23]와 [팀 멤버십 데이터 소스][24]는 각각 다른 리소스에서 기존 팀과 팀 멤버십 정보를 불러올 때 사용할 수 있습니다.

자세한 정보는 [팀 페이지][13]를 참고하세요.

### 서비스 계정

[서비스 계정][14] 리소스에서는 [서비스 계정 애플리케이션 키][15]와 다른 리소스를  소유할 수 있고 팀 전체가 공유할 수 있는 비소통형 계정을 제공합니다.

다른 리소스에서 기존 서비스 계정 정보를 불러올 때 [서비스 계정 데이터 소스][25]를 사용할 수 있습니다.

자세한 정보는 [서비스 계정][16]을 참고하세요.

## 보안 인증

### API 및 앱 키

[API 키][6]를 사용해 Datadog 계정에 데이터를 전송할 수 있고, [애플리케이션 키][7]를 사용해 Datadog 계정에 리소스를 생성할 수 있습니다. 또 기존 보안 인증 정보를 가져올 수도 있습니다.

[API 키 데이터 소스][26]와 [애플리케이션 키 데이터 소스][27]는 Terraform으로 이미 관리되고 있는 기존 보안 인증을 가져올 때 사용됩니다.

## 조직

조직 수준 리소스는 단일 계정과 멀티 계정 환경 모두에서 조직 설정을 관리할 수 있도록 해줍니다.

### 조직 설정

[조직 설정][4] 리소스로 계정 액세스와 위젯 공유 기능을 구성할 수 있습니다. 예를 들어, SAML 제한 모드 활성화 여부에 관계 없이 IdP 엔드포인트를 관리하고, URL에 로그인할 수 있습니다. 자세한 정보는 [SAML이 있는 Single Sign On][5]을 참고하세요.

또 기존 조직 설정을 Terraform 구성에 가져오기 할 수도 있습니다.

### 하위 조직

<div class="alert alert-info">멀티 조직 계정은 기본적으로 아직 활성화되어 있지 않습니다. 활성화하려면 <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog 고객지원팀</a>에 문의하세요.</div>

별도로 격리된 환경을 관리해야 하는 경우, 주 상위 조직 아래에 [하위 조직][1]을 생성할 수 있습니다. 상위 계정에서 연결된 하위 계정 사용을 추적할 수 있고, 멀티 계정 사용자는 클릭 한 번으로 다른 조직 계정으로 전환할 수 있습니다.

자세한 정보는 [멀티 조직 계정 관리][3]을 참고하세요.

**참고**: 하위 조직은 상위 조직의 SAML 구성을 상속하지 않습니다.

## 제한 정책

제한 정책은 특정 **리소스**에 연결되어 있고 역할, 팀, 또는 사용자의 접근 수준을 정의합니다. [제한 정책][19] 리소스를 사용해 제한 정책을 생성 및 관리하거나 기존 제한 정책을 Terraform 구성으로 가져오세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/child_organization
[2]: /ko/help/
[3]: /ko/account_management/multi_organization/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/organization_settings
[5]: /ko/account_management/saml/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/api_key
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/application_key
[8]: /ko/integrations/terraform/
[9]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/user
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_membership
[13]: /ko/account_management/teams/
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_account_application_key
[16]: /ko/account_management/org_settings/service_accounts
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_permission_setting
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/restriction_policy
[20]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/authn_mapping
[21]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/user
[22]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/role
[23]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team
[24]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/team_memberships
[25]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/service_account
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/api_key
[27]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/application_key
[28]: https://www.terraform.io/
[29]: https://developer.hashicorp.com/terraform/cli/import
[30]: https://developer.hashicorp.com/terraform/language/data-sources