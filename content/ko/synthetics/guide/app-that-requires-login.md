---
description: 신서틱 브라우저 테스트가 애플리케이션에 로그인할 수 있도록 하는 방법을 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
- link: /synthetics/guide/browser-tests-totp
  tag: 설명서
  text: 브라우저 테스트에서 MFA(Multi-Factor Authentication)로 TOTP 사용하기
- link: /synthetics/guide/browser-tests-passkeys
  tag: 설명서
  text: 브라우저 테스트에서 Passkey 알아보기
- link: /synthetics/browser_tests/actions
  tag: 설명서
  text: 브라우저 테스트 단계 알아보기
kind: 가이드
title: 브라우저 테스트로 인증이 필요한 애플리케이션 모니터링하기
---

## 개요

<div class="alert alert-info">MFA를 사용하는 애플리케이션을 테스트하고 싶을 경우 <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">다단계 인증 섹션</a>을 확인하고 <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">피드백을 보내주세요.</a>. 피드백은 Datadog가 고객이 중요하게 생각하는 시스템을 개선하는 데 큰 도움이 됩니다.</div>

로그인 후의 사용자 여정을 모니터링해야 할 수 있습니다. 다음 두 가지 방법을 사용해 Datadog 브라우저 테스트에서 애플리케이션 로그인 단계를 정확하게 실행하여 로그인 후에 나타나는 페이지의 유효성 검사할 수 있습니다.

- [브라우저 테스트 기록에 로그인 단계를 포함하기](#include-the-login-steps-in-your-recording)
- [브라우저 테스트에서 고급 옵션 활용하기](#leverage-browser-test-configuration-options)

애플리케이션에서 인증 정보가 안전하게 저장 및 난독 처리 되었는지 확인하려면 [난독 처리된 전역 변수](#account-security)를 사용하세요.

## 기록에 로그인 단계 포함하기

첫 번째 방법은 브라우저 테스트를 시작할 때 로그인에 필요한 단계인 사용자 이름 입력, 패스워드 입력, 로그인 클릭을 기록하는 것입니다. 그 후 [다음 단계 기록을 시작][1]하세요.
테스트를 실행하면 브라우저 테스트에서 나머지 여정 전에 자동으로 첫 로그인 단계를 실행합니다.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="로그인 기록 데모">}}

기본적으로 레코더 iframe/팝업에서는 내 브라우저를 사용합니다. 애플리케이션에 로그인한 상태로 기록을 시작하면 iframe/팝업에서 로그인 이후 페이지를 바로 표시하기 때문에 먼저 로그아웃한 후에 로그인 단계를 기록할 수 있게 도와줍니다.

애플리케이션에서 로그아웃하지 않고 단계를 기록하려면 레코더의 **시크릿 모드**를 활용하세요.

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="시크릿 모드 로그인 기록 데모">}}

시크릿 모드로 팝업을 열면 테스트 구성에서 설정한 시작 URL에서 내 브라우저의 메인 세션과 사용자 데이터로부터 완전히 분리된 상태로 세션을 시작하고 테스트를 기록할 수 있습니다. 시크릿 모드로 팝업을 열면 쿠키와 로컬 데이터를 비롯한 이전 브라우저 기록이 없는 상태에서 세션을 진행합니다. 이에 따라 내 계정이 로그아웃되어 있으며 처음으로 웹 사이트를 방문하는 사람과 동일하게 로그인 단계를 진행할 수 있습니다.

**참고**: 로그인 단계를 단일 하위 테스트로 그룹화하려면 [하위 테스트 기능][2]을 사용하세요. 그러면 로그인이 필요한 다른 브라우저 테스트에서 재사용할 수 있습니다.

### SSO 로그인

웹 사이트에 로그인할 때 SSO를 사용하는 경우 브라우저 테스트의 시작 URL에 애플리케이션의 URL을 입력하세요. 테스트에서 기본 **URL로 탐색** 단계를 통해 필수 리디렉션을 실행합니다.

일부 SSO 공급자의 경우 Datadog의 브라우저 테스트를 봇으로 인식해 reCAPHA를 추가하는 등의 방법으로 로그인을 막을 수 있습니다. 이 경우 SSO 공급자에게 연락하여 테스트를 위해 [신서틱 브라우저 테스트에서 오는 요청을 파악]하여(예: 특정 인증 정보나 고유한 신서틱 테스트 헤더) 봇으로 인식하는 기능을 끌 수 있는지 알아보세요. 

다른 대안으로는 SSO가 아니라 사용자 이름과 패스워드를 사용하는 일반적 방법으로 로그인하는 것입니다.

### Passkeys
Datadog 신서틱 모니터링에서는 [Passkeys][4]를 지원합니다. Passkeys는 피싱, 패스워드 도용, 재전송 공격의 위험으로부터 보호하는 보안 메서드입니다.

Virtual Autheticator 전역 변수를 생성하고 내 테스트로 가져오세요. 그리고 브라우저에서 패스키 관련 단계를 기록하세요.

### 다단계 인증

Datadog 신서틱 모니터링은 [TOTP(시간 기반 일회용 비밀번호)][5]를 지원합니다. TOTP는 비밀 키와 현재 시간을 조합해 일회용 비밀번호를 생성하는 다단계 인증 방법입니다.

브라우저 테스트에서는 일반 사용자가 브라우저에서 할 수 있는 작업을 모두 할 수 있습니다. 테스트를 설정할 때 브라우저 내 필요한 다단계 인증(2FA 또는 TFA 포함)을 기록하세요.

일부 MFA 공급자의 경우 Datadog의 브라우저 테스트를 봇으로 인식해 reCAPHA를 추가하는 등의 방법으로 로그인을 막을 수 있습니다. 이 경우 MFA 공급자에게 연락하여 [신서틱 브라우저 테스트에서 오는 요청을 파악]하여(예: 특정 인증 정보나 고유한 신서틱 테스트 헤더) 봇으로 인식하는 기능을 끌 수 있는지 알아보세요. 

MFA 프로세스에 브라우저 외에서 해야 하는 작업이 있는 경우(예: 음성, 문자 메시지, 또는 TOTP를 사용하지 않는 모바일 애플리케이션), MFA 공급자에게 연락하여 테스트를 위해 MFA 설정을 수정할 수 있는지, 혹은 [신서틱 브라우저 테스트에서 오는 요청을 파악][3](예: 특정 인증 정보나 신서틱 테스트 고유 헤더)하여 MFA를 끌 수 있는지 물어보세요.
애플리케이션에 활용하는 MFA 종류에 따라 [JavaScript 단계][6]를 사용해 이 문제를 해결할 수도 있습니다.

<div class="alert alert-info">Datadog에서는 테스트 시나리오를 쉽게 기록하는 방법을 계속해서 연구 중입니다. MFA 시스템과 관련해 중요한 문제가 있을 경우 언제든지 <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">피드백을 보내주세요.</a></div>

## 브라우저 테스트 구성 옵션 활용하기

Datadog 브라우저 테스트가 애플리케이션에 로그인하도록 하는 두 번째 방법은 사용할 수 있는 브라우저 테스트 구성을 하나, 또는 여럿 사용하는 것입니다. 다음을 적용할 수 있습니다.

- 특정 헤더
- 쿠키
- Basic Auth, Digest Auth, 또는 NTLM 인증 정보

이 구성 옵션은 각 테스트 실행마다 설정되어 있으며, 브라우저 테스트를 할 때는 기록 시간이 아니라 실행 시간마다 각 단계에 적용됩니다.

기록 중인 페이지에 이와 같은 헤더, 쿠키, 자격 증명 구성을 수동으로 적용할 수 있고 테스트에 로그인한 후에 나타나는 페이지를 테스트 및 기록할 수 있습니다. 기본적으로 브라우저 테스트에서는 실행하는 동안 특정 헤더, 쿠키, 인증 정보를 자동으로 인증 검사하며 그 후 기록된 단계를 실행합니다.

{{< img src="synthetics/guide/app_that_requires_login/bt_adv_options.jpg" alt="브라우저 테스트 구성 옵션으로 앱에 로그인">}}

## 계정 보안

### 인증 데이터 보안

[전역 변수][7]로 자격 증명을 저장(예: 사용자 이름용 전역 변수 하나, 패스워드용 전역 변수 하나)한 후 **Hide and obfuscate variable value**를 선택해 테스트 결과에 해당 값이 표시되지 않도록 하세요. Datadog 인스턴스에 접근할 수 있는 사람의 브라우저 테스트 권한을 제한할 수 있습니다.

난독 처리된 변수를 생성한 후 [이 전역 변수를 브라우저 테스트로 가져온][8] 다음 로그인 단계에 활용하세요.

**참고**: Datadog 글로벌 변수가 암호화되어 안전하게 저장되더라도 더미 인증 정보를 사용해 테스팅 전용 계정을 사용하는 것이 좋습니다.

계정 보안과 관련한 자세한 정보는 [신서틱 모니터링 데이터 보안][9]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/actions/
[2]: /ko/synthetics/browser_tests/actions/#subtests
[3]: /ko/synthetics/guide/identify_synthetics_bots/
[4]: /ko/synthetics/guide/browser-tests-passkeys
[5]: /ko/synthetics/guide/browser-tests-totp
[6]: /ko/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[7]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /ko/synthetics/browser_tests/actions#a-global-variable
[9]: /ko/data_security/synthetics