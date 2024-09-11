---
title: 다단계 인증(MFA)
---

{{< callout url="#" btn_hidden="true" >}}
  다단계 인증은 공용 베타 서비스입니다.
{{< /callout >}}

## 개요

다단계 인증(MFA) 또는 2단계 인증(2FA)에서는 사용자가 시스템에 인증하기 위해 두 가지 이상의 검증 유형을 제시해야 합니다. MFA을 사용해 무차별 대입, 자격 증명 채우기, 암호 분사와 같은 다양한 암호 관련 공격을 방지할 수 있습니다.

## 기능

-   **네이티브 Datadog 계정용 MFA**: 이메일과 비밀번호를 사용해 Datadog에 직접 로그인하는 계정에 추가적인 보안 계층으로 사용할 수 있습니다. 이메일/비밀번호를 사용하는 네이티브 계정은 ID 공급자를 통해 유지되는 계정보다 공격에 취약합니다.
-   **MFA 옵트인**: 최종 사용자는 MFA를 선택 사항으로 이용할 수 있습니다. 개인 설정을 통해 언제든지 MFA를 사용할 수 있습니다.
-   **인증 관리자 앱**: 시간 기반 일회용 비밀번호(TOTP) 인증을 지원하는 인증 관리자 앱을 MFA에 사용할 수 있습니다. 예를 들어 Microsoft Authenticator, Google Authenticator, Authy,  Duo 등이 있습니다.

## 한계

-   Single Sign-On(SSO)만을 사용하는 계정에는 MFA를 사용할 수 없습니다. SAML 및 Google Auth에 MFA를 사용하려면 ID제공자(IdP)를 통해 설정하세요.
-   MFA가 모든 유형의 공격으로부터 안전한 것은 아닙니다. 예를 들어 공격자가 사용자의 이메일에 접근할 경우 MFA를 해제하고 계정을 손상시킬 수 있습니다.
-   MFA에서는 최대 한 개의 인증 앱을 지원합니다.

## 필수 구성 요소

계정에 MFA를 설정하려면 **이메일 및 비밀번호**를 사용해 로그인하세요. SSO를 사용해 로그인하는 사용자에게는 MFA 설정 옵션이 보이지 **않습니다**. 

## 사용자 계정에 MFA 설정

[Password & Authentication 페이지 찾기[1]:

1. SSO가 아닌 사용자 이름과 암호 조합으로 로그인했는지 확인합니다.
1. 계정 메뉴에서 **Personal Settings**로 이동합니다.
1. **Security**에서 **Password & Authentication**를 선택합니다.

다단계 인증 섹션에 설정된 인증자 앱 목록이 있습니다.

1. **Authenticator App** 옆에 있는 **Add**를 선택합니다.
1. 새 QR 코드 추가와 관련한 지침은 인증자 앱 설명서를 따릅니다.
1. 인증자 앱에서 생성한 최신 코드를 입력해 장치가 올바르게 설정되었는지 확인합니다.
1. 복구 코드 복사본을 안전한 위치에 저장합니다. 설치가 완료된 후에는 코드를 다시 검색할 수 없습니다.

## MFA 복구 

인증 앱에 액세스할 수 없는 경우 로그인 과정에서 일회용 암호 대신 복구 코드를 사용할 수 있습니다. 각 복구 코드는 한 번만 사용할 수 있습니다.

1. [로그인 페이지][2]로 이동합니다.
1. 이메일 주소와 비밀번호를 입력한 후 **Login**을 선택합니다.
1. **Don't have access to your authenticator?**을 선택합니다.
1. 사용하지 않은 복구 코드 중 하나를 입력하고 **Verify**를 클릭합니다.


## MFA 레스큐

인증자 앱이나 복구 코드에 액세스할 수 없는 경우 로그인 프로세스에서 이메일을 통해 일회성 복구 링크를 요청할 수 있습니다.

1. [로그인 페이지][2]로 이동합니다.
1. 이메일 주소와 비밀번호를 입력한 후 **Login**을 선택합니다.
1. **Don't have access to your authenticator?**을 선택합니다.
1. **Don't have access to your recovery codes? Get a one time recovery link via email.**을 선택합니다.
1. 이메일 받은 편지함에서 "Recovery link for logging into your Datadog account." 제목의 메시지를 확인합니다.
1. 계정 로그인을 완료하려면 **Login to Datadog** 링크를 선택합니다.

등록된 인증 앱에 접근 권한이 없으면 분실된 기기를 제거하고 새 기기를 추가하는 것이 좋습니다. 향후 계정에서 로그인 문제를 예방하려면 유효한 인증기 앱을 유지하는 것이 좋습니다.

[1]: https://app.datadoghq.com/personal-settings/password-and-authentication
[2]: https://app.datadoghq.com