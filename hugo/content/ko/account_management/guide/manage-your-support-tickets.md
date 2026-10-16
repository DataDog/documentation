---
aliases:
- /ko/developers/faq/access-your-support-ticket
- /ko/account_management/faq/access-your-support-ticket
- /ko/account_management/guide/access-your-support-ticket
description: GovCloud 지원 포털을 포함하여 Datadog 지원 티켓을 생성하고 관리하는 방법을 알아봅니다.
further_reading:
- link: /getting_started/support/
  tag: 설명서
  text: Datadog 지원 시작하기
title: 지원 티켓 관리
---
<div class="alert alert-info">Datadog 사이트를 선택하여 지원 포털에 대한 지침을 확인합니다.</div>

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

## 지원 티켓 생성 {#create-a-support-ticket}

새 지원 티켓을 생성하려면 [Datadog 지원 사이트][1]로 이동합니다. 페이지 하단에서 **Create a New Ticket**을 클릭하여 티켓 양식을 작성합니다.

Datadog에서도 이 양식에 액세스할 수 있습니다. 왼쪽 탐색 메뉴에서 **Help** 위로 마우스를 가져간 후 **Support**를 클릭합니다. 또는 [Datadog 도움말 페이지][2]로 이동하여 **New Support Ticket**을 클릭합니다.

## 기존 티켓 조회 {#access-existing-tickets}

Datadog 지원 티켓을 하나 이상 열었다면 이 프로세스에 따라 모든 Datadog 지원 티켓에 액세스합니다.

1. [지원 페이지][1]에서 오른쪽 상단의 **Sign in**을 클릭합니다.
1. Datadog Zendesk 계정에 처음 로그인하는 경우 **New to your Datadog Zendesk account? Sign up**을 클릭합니다.
1. 이전에 Datadog 지원팀에 이메일로 문의한 적이 있다면 **Emailed us for support? Get a password**를 클릭하고, Datadog 지원팀에 문의할 때 사용한 이메일 주소를 입력합니다.
1. 이메일로 비밀번호를 받은 후, 로그인하여 **Manage your tickets**를 클릭해 요청 내역을 확인합니다.
1. 로그인 후 **My Activities** 페이지가 보이지 않으면, 오른쪽 상단의 이름을 클릭한 후 **My Activities**를 클릭합니다.
1. 조직 전체의 티켓을 조회하려면 Datadog 지원팀에 요청합니다.

## 비밀번호 요구 사항 {#password-requirements}

계정 보안을 유지하기 위해 Datadog의 Zendesk 지원 포털에 로그인하는 데 사용되는 모든 비밀번호는 다음 요구 사항을 충족해야 합니다.

- 비밀번호 복잡성
   - 최소 **12자**를 포함해야 합니다.
   - **대문자와 소문자(A~Z)**를 모두 포함해야 합니다.
   - 최소 **숫자 1개(0~9)**를 포함해야 합니다.
   - 최소 **특수 문자 1개**(예: `!`, `@`, `#` 또는 `%`)를 포함해야 합니다.
   - **이메일 주소와 유사하지 않아야** 합니다.
   - **'Zendesk'라는 단어를 포함하지 않아야** 합니다.
- 금지된 연속 문자
   - 비밀번호에는 지정된 개수를 초과하는 연속된 문자나 숫자를 포함할 수 없습니다. 예를 들어, 제한이 4로 설정된 경우 시스템은 `admin12345`와 같은 비밀번호를 거부합니다.
- 이전 비밀번호
   - 사용자는 이전에 사용한 비밀번호 중 일정 개수의 비밀번호를 재사용할 수 없습니다.
- 만료 정책
   - 비밀번호는 최소 **90일마다** 또는 시스템에서 변경을 요청할 때마다 업데이트해야 합니다.
- 실패 시도 및 잠금
   - 사용자는 최대 **5회**까지 시도할 수 있으며, 이후에는 계정이 일시적으로 잠깁니다.

## 문제 해결 {#troubleshooting}

### 오류: Refused to connect {#error-refused-to-connect}

**Refused to connect** 오류는 타사 쿠키를 차단하는 개인정보 보호 설정으로 인해 발생합니다. 이 문제를 해결하려면 브라우저에서 Zendesk의 타사 쿠키를 허용하도록 설정되어 있는지 확인합니다. Google Chrome 고객센터에서 [Chrome에서 쿠키 삭제, 사용 설정 및 관리하는 방법][3]에 대한 지침을 확인합니다.

브라우저에 광고 차단기가 있는 경우, 이를 비활성화하여 로그인할 수 있는지 확인합니다. 일부 광고 차단기에는 자체 예외 목록이 있습니다. 이 경우 **datadog.zendesk.com**을 허용 목록에 추가합니다.

### 더 이상 사용할 수 없는 티켓 {#ticket-is-no-longer-available}

Datadog은 마지막 업데이트 후 15개월이 지나면 첨부 파일을 포함하여 종료된 티켓을 삭제합니다.

관련 문제에 대한 도움이 필요한 경우 새 티켓을 열거나 Datadog 설명서를 검색할 수 있습니다.

{{% /site-region %}}

{{% site-region region="gov,gov2" %}}

## 전제 조건 {#prerequisites}

등록 인증 코드, 비밀번호 재설정 이메일 및 케이스 알림 이메일을 받으려면 `ddog-gov.com` 도메인을 이메일 허용 목록에 추가합니다. 여기에는 `help@ddog-gov.com` 및 `support@ddog-gov.com`이 포함됩니다.

## 포털 계정 등록 {#register-on-the-portal}

처음 사용하는 경우 계정을 등록하려면 다음 단계를 따르세요.

1. [Datadog GovCloud 지원 포털][4]로 이동합니다.
1. **Sign Up**을 클릭합니다.
1. 기존 GovCloud Datadog 계정과 연결된 이메일 주소를 사용하여 등록 양식을 작성합니다. 이 페이지를 열어 둡니다.
1. 별도의 브라우저 탭에서 이메일 계정에 접속합니다. `help@ddog-gov.com`에서 보낸 인증 이메일을 열고 인증 코드를 복사합니다.
1. Datadog GovCloud 지원 포털에 인증 코드를 입력합니다.
1. **Verify**를 클릭합니다.

**참고**: 등록 후 로그인 사용자 이름은 이메일에 `.ddgov.support`가 추가된 형태입니다(예: `[name]@[domain].ddgov.support`). 로그인할 때 이 전체 사용자 이름을 사용합니다.

## 케이스 생성{#create-a-case}

케이스를 생성하려면 다음 단계를 따르세요.

1. [Datadog GovCloud 지원 포털](https://govsupport.ddog-gov.com)로 이동합니다.
1. 사용자 이름 형식 `[name]@[domain].ddgov.support`로 로그인합니다.
1. **Create a New Case**를 클릭합니다.
1. 양식을 작성합니다.
1. **Submit & Upload Files**를 클릭합니다.
1. 필요시 증빙 파일을 업로드합니다. 허용되는 파일 형식은 `.txt`, `.csv`, `.xls`, `.xlsx`, `.doc`, `.otf`, `.yaml`, `.log`, `.conf`, `.tf`, `.zip`, `.pcap`, `.png` 및 `.jpeg`입니다.
1. **Submit**을 클릭합니다.

## 기존 케이스 조회 {#access-existing-cases}

Datadog 케이스를 하나 이상 열었다면 이 프로세스에 따라 케이스에 액세스합니다.

1. [Datadog GovCloud 지원 포털][4]에 로그인합니다.
1. 필터를 **Recently Viewed**에서 **Cases**로 변경하여 모든 케이스를 확인합니다.
1. **Case Number** 또는 **Subject**를 클릭하여 세부 정보를 확인합니다.

**참고**: 이전 Zendesk 케이스는 마이그레이션되지 않으며, 레거시 Zendesk는 읽기 전용입니다.

## 문제 해결 {#troubleshooting-1}

### 새 케이스가 보이지 않음 {#cannot-see-new-cases}

필터를 **Recently Viewed**에서 **Cases**로 변경합니다.

### 로그인 문제 {#login-issues}

전체 사용자 이름에 `.ddgov.support` 접미사가 포함되어 있는지 확인합니다.

### 비밀번호 재설정 이메일을 받지 못함 {#password-reset-not-received}

**Forgot Your Password?**를 클릭하여 **Reset Your Password** 페이지를 연 다음, **Enter your username** 필드에 `.ddgov.support` 접미사를 포함한 전체 사용자 이름을 입력합니다. 여전히 이메일을 받지 못한 경우, `ddog-gov.com`을 이메일 허용 목록에 추가합니다.

### 사용자 이름을 모름 {#do-not-know-your-username}

**Forgot Your Password?** > **Forgot your username?** > **Use Your Email Address**를 차례로 클릭합니다. 이 링크를 클릭하면 GovCloud 지원 포털에서 나가 Salesforce Identity가 열립니다. 해당 페이지의 제목도 **Reset Your Password**이지만, **Enter your email address** 필드에는 `.ddgov.support` 사용자 이름이 아닌 업무용 이메일 주소를 입력해야 합니다.

### 등록 오류 {#registration-error}

이미 계정이 존재할 수도 있습니다. **Forgot Your Password?**를 클릭한 다음, `.ddgov.support` 접미사를 포함한 전체 사용자 이름(예: `[name]@[domain].ddgov.support`)을 **Enter your username** 필드에 입력합니다. 여전히 계정에 액세스할 수 없는 경우, `support@ddog-gov.com`에 문의하세요.

{{% /site-region %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/
[2]: https://app.datadoghq.com/help
[3]: https://support.google.com/chrome/answer/95647
[4]: https://govsupport.ddog-gov.com