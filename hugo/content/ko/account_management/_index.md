---
aliases:
- /ko/guides/billing
- /ko/account_management/settings
cascade:
  algolia:
    rank: 70
description: Datadog 계정 및 조직 관리
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: 블로그
  text: 대규모 Datadog 조직 관리의 모범 사례
title: 계정 관리
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog for Government 플랫폼은 SAML 또는 사용자 이름/이메일 및 비밀번호를 사용하는 기본 인증만 지원합니다. SAML 인증을 구성하기 전에, 하나 이상의 사용자 이름/이메일 및 비밀번호 계정이 설정되어 있어야 설정 프로세스 동안 액세스를 유지할 수 있습니다. Datadog에서는 비밀번호 기반 계정의 경우 다단계 인증(MFA)을 활성화할 것을 권장합니다.

평가판 계정에 SAML을 활성화해야 하는 경우, <a href="https://docs.datadoghq.com/getting_started/support/">Datadog 지원팀</a>에 문의하세요.</div>

{{< /site-region >}}

## 개인 설정 {#personal-settings}

Datadog의 개인 설정 페이지를 사용하면 사용자가 조직에서 다른 사용자들에게 어떻게 표시되는지 제어하고, 조직을 전환하거나 떠날 수 있으며 알림 기본 설정을 관리할 수 있습니다.

### 프로필 {#profile}

프로필은 조직의 다른 사용자들이 Datadog에서 사용자를 알아보는 방식입니다. {{< ui >}}Personal Settings{{< /ui >}} 페이지의 [프로필 탭][11]에서 이름, 이메일 주소 및 직함을 설정하거나 업데이트하세요.

사진을 업데이트하려면 [Gravatar][1]에 계정을 생성하여 이메일 주소와 연결합니다.

Google 인증을 사용하여 Datadog에 로그인하면 Google 계정이 이메일 주소를 제공하며, Datadog 내에서는 편집할 수 **없습니다**. Google에서 이메일 주소를 변경하는 방법은 [Google 설명서][2]를 참조하세요.

### 기본 설정 {#preferences}

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
{{< ui >}}Personal Settings{{< /ui >}} 페이지의 [기본 설정 탭][3]에서 표준 시간대, 시간 형식, 시각 접근성 기본 설정과 이메일 구독을 관리할 수 있습니다.

#### 이메일 구독 {#email-subscriptions}

이메일 구독 아래에서 다음 보고서에 액세스할 수 있습니다.
{{< site-region region="us3,us5,gov,gov2,ap1,ap2" >}}
<div class="alert alert-danger">이메일 다이제스트는 몇몇 사이트에서는 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

* 일일 다이제스트
* 주간 다이제스트

이메일 다이제스트가 본인과 관련이 있는지 잘 모르는 경우, 각 이메일 구독 옆에 있는 {{< ui >}}Example{{< /ui >}} 링크를 클릭하여 예시를 조회할 수 있습니다. {{< ui >}}Unsubscribe From All{{< /ui >}} 버튼을 사용하여 모든 이메일 구독을 구독 취소할 수도 있습니다.
{{% /site-region %}}


{{% site-region region="gov,gov2" %}}
{{< ui >}}Personal Settings{{< /ui >}} 페이지의 [**기본 설정** 탭][3]에서 표준 시간대, 시간 형식, 시각 접근성 기본 설정을 관리할 수 있습니다.
{{% /site-region %}}

#### 시간 형식 {#time-format}

Datadog에 시간이 12시간 형식 또는 24시간 형식 중 무엇으로 표시될지 선택합니다(예: "2:30 pm" 또는 "14:30"). 새 계정은 기본적으로 12시간 형식으로 설정됩니다. 그래프 및 특정 표 형식 데이터는 항상 24시간 형식으로 표시됩니다.

#### 시각 접근성 {#visual-accessibility}

시각 접근성 기본 설정에는 다섯 가지 설정이 있어 색각 이상, 저시력 및 밝은 색상에 대한 민감증에 대처합니다. 접근성이 우수한 색상 설정을 옵트인하면 Datadog이 일반적인 색상판을 사용하는 모든 그래프를 사용자의 시각적 필요에 맞춰 조정된, 접근성이 우수한 색상 세트로 변환합니다.

**참고**: 시각 접근성 기본 설정은 브라우저에 로컬로 저장됩니다. 다른 브라우저를 사용하거나 캐시를 지우면 해당 기본 설정은 기본값 설정으로 설정됩니다.

### 조직 {#organizations}

{{< ui >}}Personal Settings{{< /ui >}}의 [조직 탭][12]에 사용자와 연결된 모든 조직이 목록으로 나열됩니다. 이 페이지에서 이러한 조직을 전환하거나 왼쪽 탐색 창의 계정 메뉴 위에 마우스 커서를 올리세요.

**참고**: 조직을 떠나면 해당 조직의 관리자가 초대해 주지 않는 이상 다시 참여할 수 없습니다.

기존 조직에 참여하려면 관리자가 초대해 주어야 합니다. 초대되고 나면 제목이 "<조직 이름>에 참여하도록\초대됨"인 이메일이 발송됩니다. 이메일의 {{< ui >}}Join Account{{< /ui >}} 버튼을 클릭하세요.

조직 관리자인 경우, 다음에 관한 추가 설명서를 참조하세요.

* [조직의 사용자 관리][4]
* [SAML을 사용한 Single Sign On(SSO) 구성][5]
* [조직 이름 바꾸기][6]
* [다중 조직 계정 관리][7]
* [Datadog 요금제 변경 및 사용량과 청구 기록 조회][8]
* [조직 토폴로지 선택(단일 조직 vs. 다중 조직)][15]

### 보안 {#security}

#### 애플리케이션 키 {#application-keys}

{{< ui >}}Personal Settings{{< /ui >}}의 [애플리케이션 키 탭][13]을 사용하면 애플리케이션 키를 관리할 수 있습니다. 키를 복사하려면 복사하고자 하는 키에 마우스 커서를 올리고 키 오른쪽에 {{< ui >}}Copy Key{{< /ui >}} 아이콘이 표시되면 해당 아이콘을 클릭합니다. 특정 키를 클릭해 이름을 편집하고, 언제 생성되었는지 조회하고, 키 소유자의 프로필을 조회하고, 키를 복사하거나 취소할 수도 있습니다.

#### 앱 {#apps}

{{< ui >}}Personal Settings{{< /ui >}}의 [앱 탭][14]을 사용하면 조직 구성원이 설치했거나 생성한 앱을 관리할 수 있습니다. 검색 문자열로 앱을 필터링하거나, 체크박스를 사용하여 활성화된 앱이나 비활성화된 앱만 조회할 수도 있습니다.

앱 위에 마우스 커서를 올리면 앱 목록 오른쪽에 해당 앱을 활성화 또는 비활성화하는 옵션이 표시됩니다.

#### 이메일 확인 {#email-verification}
이메일 주소를 확인하여 계정 보안을 강화하고 더 많은 관리 기능에 액세스하세요. 확인된 사용자는 자신의 계정 보안을 더 주도적으로 제어할 수 있고 자신이 속한 모든 조직을 볼 수 있습니다.

- **Google 로그인 사용자**는 처음 로그인할 때 자동으로 확인됩니다.
- **비밀번호 기반 사용자**는 비밀번호를 처음 설정할 때 이메일을 확인합니다.
- **SAML 사용자**는 반드시 Datadog을 통해 이메일을 수동으로 확인해야 합니다.

확인하고 나면 다음과 같은 기능에 액세스할 수 있게 됩니다.
- 여러 장치 전체에서 **모든 활성 웹 세션에서 로그아웃**할 수 있어 자격 증명 침해 시 보안이 보장됩니다.
- 현재 조직 계층 구조 외부의 **조직을 조회하고 조직 간에 전환**할 수 있습니다.

확인되지 않은 사용자도 Datadog에 액세스할 수는 있지만, 자신의 계층구조 내에 속한 조직을 조회하는 데만 제한되며 활성 세션을 취소할 수 없습니다.

#### 이메일 확인하기 {#verify-your-email}

이메일을 확인하는 방법:
1. {{< ui >}}Profile Settings{{< /ui >}}로 이동합니다.
2. {{< ui >}}Verify Account{{< /ui >}}를 클릭합니다.
3. 등록 이메일로 발송된 **확인 코드**를 입력합니다.
4. {{< ui >}}Submit{{< /ui >}}을 클릭하여 확인 프로세스를 완료합니다.

#### 모든 활성 웹 세션에서 로그아웃 {#log-out-of-all-active-web-sessions}

모든 활성 웹 세션에서 로그아웃하는 방법:
모든 활성 웹 세션에서 로그아웃하면 사용 중인 것을 포함한 장치 전체의 모든 현재 세션에서 로그아웃됩니다.


모든 활성 세션에서 로그아웃하는 방법:
1. {{< ui >}}Personal Settings{{< /ui >}}로 이동합니다.
2. {{< ui >}}Log Out of All Web Sessions{{< /ui >}}를 클릭합니다.
3. 액션을 확인합니다.

확인하고 나면 모든 장치에서 로그아웃되며 다시 로그인해야 합니다.

## 디스플레이 {#appearance}

Datadog을 다크 모드로 보려면 사이드바의 아바타 위로 마우스 커서를 올리거나 `Ctrl+Opt+D`/`Ctrl+Alt+D`를 누르세요.

컴퓨터의 디스플레이 설정에 따라 맞추려면 {{< ui >}}System{{< /ui >}} 옵션을 선택합니다. 이렇게 하면 Datadog의 디스플레이를 사용자가 OS 수준에서 설정한 테마에 자동으로 일치시킵니다.

## GitHub에 연결 {#connecting-to-github}

Datadog에 이벤트를 생성하려고 [GitHub 통합][9]을 설치한 경우, 개인 GitHub 계정을 Datadog 사용자 계정에 연결하세요. 계정을 연결하면 Datadog의 GitHub 이벤트에 게시하는 모든 코멘트가 GitHub의 해당 문제 또는 풀 요청에 자동으로 게시됩니다.

## 조직의 계정 비활성화 {#disabling-your-organizations-account}

Datadog 조직 계정을 비활성화하려면 [Datadog 지원 팀][10]에 문의하세요.

[1]: https://gravatar.com
[2]: https://support.google.com/accounts/answer/19870?hl=en
[3]: https://app.datadoghq.com/personal-settings/preferences
[4]: /ko/account_management/users/
[5]: /ko/account_management/saml/
[6]: /ko/account_management/org_settings/#change-your-organization-name
[7]: /ko/account_management/multi_organization/
[8]: /ko/account_management/org_settings/
[9]: /ko/integrations/github/
[10]: /ko/help/
[11]: https://app.datadoghq.com/personal-settings/profile
[12]: https://app.datadoghq.com/personal-settings/organizations
[13]: https://app.datadoghq.com/personal-settings/application-keys
[14]: https://app.datadoghq.com/personal-settings/apps
[15]: /ko/getting_started/organization_topology/