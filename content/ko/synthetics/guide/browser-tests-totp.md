---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: 블로그
  text: Datadog 신서틱 테스트에 다단계 인증 사용하기
- link: /synthetics/guide/browser-tests-passkeys
  tag: 설명서
  text: 브라우저 테스트에서 Passkey 알아보기
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: 설명서
  text: 전역 변수에 대해 자세히 알아보기
title: 브라우저 테스트에서 MFA(다단계 인증)에 TOTP(시간 기반 일회용 비밀번호) 사용하기
---

## 개요

TFA와 MFA와 같은 다단계 인증 메서드를 이용하면 인증받지 않은 액세스로부터 애플리케이션을 보호하도록 도와줍니다. 그러나 이 메서드 때문에 테스트 기능을 이용할 때 어려움을 겪을 수 있습니다.

Datadog 신서틱 MFA 전역 변수를 사용하면 중요 보안 조치를 해제하거나 다른 도구를 통해 인증 코드를 수동으로 입력하지 않고도 애플리케이션의 TOTP 기반 MFA 모듈과 중요 사용자 여정을 테스트할 수 있습니다. MFA 기반 사용자 여정을 테스트하기 위해 전용 환경을 생성하거나 유지해야 할 필요가 없습니다.

## 비밀 키나 QR 코드를 전역 변수에 보관

전역 변수를 생성하면 인증 공급업체에서 비밀 키나 QA 코드를 업로드할 수 있습니다. **Settings** 페이지의 **Global Variables** 탭에서 **Create Global Variable**을 클릭하세요.
1. **변수 유형 선택**에서 **MFA 토큰**을 선택합니다.
2. **Define variable**에 **변수 이름**을 입력하세요. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있습니다.
3. 해당 변수의 **설명**을 입력하세요(선택 사항).
4. 변수에 연결할 **태그**를 선택하세요(선택 사항).
5. 변수에 **보안 키**를 입력하거나 QR코드 이미지를 업로드합니다.
6. **+Generate**을 클릭해 TOTP를 생성합니다. **Copy** 아이콘으로 생성한 TOTP를 복사할 수 있습니다.
7. **Permission settings**에서 조직 역할에 따라 변수 접근을 제한할 수 있습니다. 역할에 관한 자세한 정보는 [BRAC 설명서][1]를 참고하세요.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="MFA 토큰 생성" style="width:100%;" >}}

## 신서틱 테스트에서 TOTP 사용하기
전역 변수에 저장된 비밀 키나 QR 코드를 신서틱 테스트 전반에서 사용할 수 있습니다. [브라우저 테스트][2]를 생성할 때 전역 변수에 저장된 비밀 키나 QR 코드에서 생성한 TOTP를 삽입하세요. 그러면 애플리케이션의 인증 워크플로우를 검증할 수 있습니다.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="TOTP 검증 비디오 레코딩" video="true" >}}

[브라우저 테스트][2]에서 TOTP를 사용하는 방법:

1. 전역 변수를 가져오세요.
2. 테스트를 기록할 때 **손** 아이콘을 클릭해 TOTP를 생성하세요.
3. 테스트 브라우저 애플리케이션에서 필드를 클릭해 TOTP를 붙여 넣으세요. 테스트에 컴퓨팅된 코드를 삽입하면 다음 테스트 단계가 생성됩니다.
4. 테스트 단계를 기록한 후 **Save & Launch Test**를 클릭하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /ko/synthetics/browser_tests/