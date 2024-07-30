---
aliases:
- /ko/guides/billing
- /ko/account_management/settings
cascade:
  algolia:
    rank: 70
description: Datadog 계정과 조직을 관리하세요
title: 계정 관리
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">정부 사이트용 Datadog는 SAML 로그인만을 지원합니다.</div>
{{< /site-region >}}

## 개인 설정

Datadog의 개인 설정 페이지를 사용하면 조직에서 다른 사람들에게 어떻게 표시되는지를 관리하고, 조직을 전환하거나 떠날 수 있습니다. 알림 설정 역시 관리할 수 있습니다.

### 프로필

사용자의 프로필은 조직에 소속된 다른 사람들이 Datadog에서 고객님을 인지하는 방식입니다. 이름, 이메일 주소, 직함을 **개인 설정** 페이지의 [프로필 탭][11]에서 설정하거나 갱신하세요.

사진을 업데이트하려면 [Gravatar][1] 계정을 만든 다음 이메일 주소와 연동하세요.

Google Authentication을 사용해 Datadog에 로그인하는 경우 이메일 주소는 Google 계정으로 설정되며 Datadog에서 편집할 수 **없습니다**. Google 이메일 주소를 변경하려면 [Google 설명서][2]를 참조하세요.

### 선호 사항

{{% site-region region="us,us3,us5,eu,ap1" %}}
**개인 설정** 페이지의 [기본 설정 탭][3]에서 시간대, 시각 접근성 설정, 이메일 구독을 관리할 수 있습니다. 

#### 이메일 구독

이메일을 구독하면 다음 보고서에 접근할 수 있습니다.

* 일간 다이제스트
* 주간 다이제스트

이메일 다이제스트가 관련성이 있는지 확실하지 않다면 각 이메일 구독 옆의 **예시** 링크를 클릭해 예시를 살펴보세요. 또 **모든 구독 해제** 버튼을 선택해 이메일 구독을 모두 해제할 수 있습니다.
{{% /site-region %}}


{{% site-region region="gov" %}}
**개인 설정** 페이지의 [**기본 설정** 탭][3]에서 시간대, 시각 접근성 설정을 관리할 수 있습니다.
{{% /site-region %}}

#### 시각 접근성

시각 접근성 환경설정에는 색약, 저시력, 밝은 색 민감도를 해결해 드리는 5가지 설정이 있습니다. 컬러 접근성 설정을 선택하면 Datadog은 클래식 색상표를 사용하는 모든 그래프를 고객님의 시각적 요구 사항에 맞는 컬러 접근성 설정으로 변환합니다.

**참고**: 시각 접근성 환경설정은 브라우저에 로컬 저장됩니다. 다른 브라우저를 사용하거나 캐시를 삭제하면 기본 설정이 적용됩니다.

### 조직

**개인 설정**의 [조직 탭][12]은 사용자가 소속된 모든 조직의 목록을 표시합니다. 본 페이지에서 조직 간 전환하거나, 왼쪽 내비게이션의 계정 메뉴 위에 커서를 올려 전환합니다.

**참조**: 더 이상 조직 소속이 아닌 경우, 조직 관리자가 초대하지 않는 이상 다시 조직에 참여할 수 없습니다.

기존 조직에 참여하려면 관리자가 초대해야 합니다. 초대를 받았다면 '<Organization Name>에 참여하도록 초대받았습니다'라는 제목의 이메일이 발송됩니다. 이메일의 **계정 참여** 버튼을 클릭합니다.

사용자가 조직 관리자인 경우 다음의 추가 설명서를 확인하시기 바랍니다.

* [조직 사용자 관리하기][4]
* [SAML 싱글 사인온 설정하기][5]
* [조직 이름 변경하기][6]
* [여러 조직의 계정 관리하기][7]
* [Datadog 요금제 변경 및 사용량, 요금 청구 내역 확인하기][8]

### 보안

#### 애플리케이션 키

**개인 설정**의 [애플리케이션 키 탭][13]에서는 애플리케이션 키를 관리할 수 있습니다. 키를 복사하려면 오른쪽에 **키 복사하기** 아이콘이 나타날 때까지 커서를 올렸다가 클릭하세요. 특정 키를 클릭하여 이름 수정, 생성일시 확인, 키 소유자의 프로필 조회, 복사, 권한 취소를 할 수 있습니다.

#### 앱

**개인 설정**의 [앱 탭][14]에서는 조직 구성원이 설치 또는 생성한 앱을 관리할 수 있습니다. 검색 문자열로 앱을 필터링하거나 체크박스를 사용해 활성화 또는 비활성화된 앱만 확인하도록 선택할 수 있습니다.

앱 위로 마우스를 올리면 앱 목록의 오른쪽에 활성화 또는 비활성화 옵션이 표시됩니다.

## 디스플레이

사이드바의 아바타 위에 커서를 두거나 `Ctrl+Opt+D` / `Ctrl+Alt+D` 키를 누르면 Datadog를 어두운 모드로 볼 수 있습니다.

컴퓨터 디스플레이 설정에 맞게 조정하려면 *System* 옵션을 선택하세요. 이는 Datadog의 디스플레이를 OS 수준에서 설정한 테마와 자동으로 일치시킵니다.

## GitHub로 연결

Datadog에서 이벤트를 생성하기 위해 [GitHub 통합][9]을 설치한 경우 개인 GitHub 계정을 Datadog 사용자 계정에 연결하세요. 계정을 연결하면 Datadog 내 GitHub 이벤트에 게시한 댓글이 자동으로 해당하는 GitHub  문제나 풀 요청에 게시됩니다.

## 조직 계정 비활성화

Datadog 조직 계정을 비활성화하려면 [Datadog 지원팀][10]에 문의하세요.

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