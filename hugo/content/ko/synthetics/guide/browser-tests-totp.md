---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: 블로그
  text: Datadog Synthetic 테스트에 다단계 인증 도입하기
- link: /synthetics/guide/browser-tests-passkeys
  tag: 설명서
  text: 브라우저 테스트에서 Passkeys에 대해 알아보기
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: 설명서
  text: 전역 변수에 대해 더 알아보기
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: 블로그
  text: Datadog을 통해 고객의 브라우저 테스트 확장을 지원한 사례
title: 브라우저 테스트에서 다단계 인증(MFA)을 위한 시간 기반 일회용 암호(TOTP) 사용
---
## 개요 {#overview}

TFA 및 MFA와 같은 다단계 인증 방법은 무단 액세스로부터 애플리케이션을 보호하는 데 도움이 되지만, 이러한 방법으로 인해 기능을 테스트하기가 더 어려워질 수 있습니다.

Datadog Synthetic MFA 전역 변수를 사용하면 중요한 보안 조치를 비활성화하거나 별도의 도구로 인증 코드를 수동으로 입력하지 않고도 애플리케이션의 TOTP 기반 MFA 모듈과 중요한 사용자 여정을 테스트할 수 있습니다. MFA가 활성화된 사용자 여정을 테스트하기 위해 전용 환경을 생성하거나 유지 관리할 필요가 없습니다.

**참고**: Datadog은 SHA-1 알고리즘으로 TOTP를 생성하며 다른 알고리즘을 사용하는 토큰은 지원하지 않습니다. TOTP 토큰이 Google Authenticator에서 작동한다면 Datadog과 호환될 가능성이 높습니다.


## 비밀 키 또는 QR 코드를 전역 변수에 저장 {#store-your-secret-key-or-qr-code-in-a-global-variable}

인증 제공자의 비밀 키를 입력하거나 QR 코드를 업로드할 전역 변수를 생성합니다. {{< ui >}}Settings{{< /ui >}} 페이지의 {{< ui >}}Global Variables{{< /ui >}} 탭에서 {{< ui >}}Create Global Variable{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Choose variable type{{< /ui >}}에서 {{< ui >}}MFA Token{{< /ui >}}을 선택합니다.
2. {{< ui >}}Define variable{{< /ui >}}에서 {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 변수에 대한 {{< ui >}}Description{{< /ui >}}을 입력합니다(선택 사항).
4. 변수와 연결할 {{< ui >}}Tags{{< /ui >}}을 선택합니다(선택 사항).
5. 비밀 키 생성 또는 새 QR 코드 추가에 대한 지침은 인증 앱의 설명서를 따르세요.
6. 변수에 {{< ui >}}Secret Key{{< /ui >}}를 입력하거나 QR 코드 이미지를 업로드합니다.

    **참고**: QR 코드를 업로드하면 Datadog은 비밀 키만 읽습니다. 제공자가 다른 코드 길이 또는 새로 고침 주기를 사용하는 경우, 7단계에서 설정하세요.

7. (선택 사항) 다른 코드 길이 또는 새로 고침 주기를 사용하려면 {{< ui >}}Generate the OTP{{< /ui >}} 아래의 {{< ui >}}Advanced Options{{< /ui >}}을 확장하고 값을 조정합니다.
8. {{< ui >}}\+ Generate{{< /ui >}}를 클릭하여 TOTP를 생성합니다. {{< ui >}}Copy{{< /ui >}} 아이콘을 사용하여 생성된 TOTP를 복사할 수 있습니다.
9. {{< ui >}}Permissions settings{{< /ui >}}에서 조직의 역할에 따라 변수에 대한 액세스를 제한합니다. 역할에 대한 자세한 정보는 [RBAC 문서][1]를 참조하세요.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA 토큰 생성" style="width:100%;" >}}

## Synthetic 테스트에서 TOTP 사용 {#use-totp-in-your-synthetic-tests}
전역 변수에 저장된 비밀 키 또는 QR 코드를 모든 Synthetic 테스트에서 사용할 수 있습니다. [브라우저 테스트][2]를 생성할 때 전역 변수에 저장된 비밀 키 또는 QR 코드에서 생성된 TOTP를 삽입하여 애플리케이션의 인증 워크플로를 확인하세요.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="TOTP 유효성 검사 기록" video="true" >}}

[브라우저 테스트][2]에서 TOTP를 사용하려면:

1. 전역 변수를 가져옵니다.
2. 테스트를 기록할 때 {{< ui >}}Hand{{< /ui >}} 아이콘을 클릭하여 TOTP를 생성합니다. 
3. 테스트 브라우저 애플리케이션에서 필드를 클릭하여 TOTP를 붙여넣습니다. 계산된 코드를 테스트에 삽입하면 테스트 단계가 하나 더 생성됩니다. 
4. 테스트 단계를 기록한 후 {{< ui >}}Save & Launch Test{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /ko/synthetics/browser_tests/