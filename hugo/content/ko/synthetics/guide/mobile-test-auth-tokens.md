---
description: 실시간으로 자동 새로 고침되는 인증 토큰을 모바일 애플리케이션 테스트에 전달하여 로그인 흐름을 우회하세요.
further_reading:
- link: /synthetics/guide/authentication-protocols/
  tag: 문서
  text: API 및 다단계 API 테스트에서 인증 사용하기
- link: /synthetics/mobile_app_testing/
  tag: 문서
  text: 모바일 애플리케이션 테스트 생성하기
- link: /synthetics/platform/settings/#global-variables
  tag: 문서
  text: 전역 변수 생성하기
title: 모바일 애플리케이션 테스트에서 인증 토큰 주입 및 자동으로 새로 고침하기
---
## 개요 {#overview}

모든 [모바일 애플리케이션 테스트][1] 시작 시 앱 UI를 통해 로그인하면 테스트와 관련 없는 시간이 소요되고 불안정성이 증가합니다. 이 가이드는 실시간 인증 토큰을 주입하여 로그인 단계를 건너뛰고 테스트가 이미 인증된 상태로 시작되도록 하는 방법을 보여줍니다.

이 흐름은 세 부분으로 구성됩니다.

1. [API 테스트][2]는 일정에 따라 인증 공급자에 로그인하고 액세스 토큰을 추출합니다.
2. 해당 테스트에서 가져온 [전역 변수][3]가 토큰 값을 보유합니다.
3. 모바일 앱 테스트는 전역 변수를 시작 인수 또는 인텐트 엑스트라로 앱에 전달합니다. 앱은 시작 시 이를 읽고 일반적인 로그인 흐름을 건너뜁니다.

API 테스트가 일정에 따라 토큰을 새로 고치므로 전역 변수의 값은 수동 작업이나 Datadog API 호출 없이 자동으로 업데이트됩니다.

## 1단계: 토큰 가져오기 API 테스트 생성 {#step-1-create-the-token-fetch-api-test}

인증 공급자가 클라이언트 암호를 요구하는 경우, 요청에 하드코딩하는 대신 먼저 보안 [전역 변수][3]로 저장하세요. 생성 시 `AUTH_CLIENT_SECRET`와 같은 이름을 입력하고 {{< ui >}}Hide and obfuscate variable value{{< /ui >}}를 선택하세요.

공급자의 토큰 엔드포인트에 토큰을 요청하는 [HTTP 테스트][2]를 생성하세요.

- **요청**: `https://auth.yourdomain.com/oauth/token`과 같은 토큰 엔드포인트에 `POST`를 사용합니다.
- **헤더**: `Content-Type: application/json`.
- **본문**: `AUTH_CLIENT_SECRET` 전역 변수를 참조하는 클라이언트 자격 증명이 포함된 JSON 페이로드:

{{< code-block lang="json" >}}
{
  "client_id": "synthetic_bot",
  "client_secret": "{{ AUTH_CLIENT_SECRET }}",
  "grant_type": "client_credentials"
}
{{< /code-block >}}

- **어설션**: 상태 코드는 `200`입니다.
- **추출된 변수**: 응답 본문에서 `EXTRACTED_TOKEN`이라는 [변수 추출][4]을 수행합니다. 이때 토큰 필드와 일치하는 `jsonpath` 식(예: `$.access_token`)을 사용합니다. 토큰이 테스트 결과에 표시되지 않도록 {{< ui >}}Hide and obfuscate variable value{{< /ui >}}를 선택합니다.

토큰이 실행 사이에 만료되지 않도록 테스트 [주기][5]를 토큰의 만료 기간보다 짧게 설정합니다. 예를 들어, 1시간 후에 만료되는 토큰의 경우 30분마다 테스트를 실행하세요. 테스트에 실패 경보를 연결하여 토큰 새로 고침이 중단되었는지 확인할 수도 있습니다.

## 2단계: 테스트에서 전역 변수 생성 {#step-2-create-a-global-variable-from-the-test}

모바일 앱 테스트가 해당 값을 참조할 수 있도록 토큰 가져오기 테스트에서 [전역 변수를 생성하세요][3].

1. [{{< ui >}}Settings{{< /ui >}} 페이지][6]의 {{< ui >}}Global Variables{{< /ui >}} 탭으로 이동합니다. {{< ui >}}\+ New Global Variable{{< /ui >}}를 클릭합니다.
2. {{< ui >}}Create From Test{{< /ui >}} 탭을 선택하고 토큰 가져오기 테스트를 선택합니다.
3. {{< ui >}}Variable Name{{< /ui >}}을 입력합니다(예: `MOBILE_AUTH_TOKEN`).
4. 토큰이 테스트 결과에 표시되지 않도록 {{< ui >}}Hide and obfuscate variable value{{< /ui >}}를 선택합니다.
5. 값을 가져올 위치를 선택합니다.
   - 토큰 가져오기 테스트가 단일 HTTP 요청인 경우, {{< ui >}}Response Body{{< /ui >}}를 선택하고 테스트 어설션의 `jsonpath` 식(예: `$.access_token`)을 재사용합니다.
   - 토큰 가져오기 테스트에 여러 단계가 있는 경우, 1단계에서 추출한 {{< ui >}}EXTRACTED_TOKEN{{< /ui >}} 로컬 변수를 선택합니다.

이 변수의 값은 토큰 가져오기 테스트가 실행될 때마다 자동으로 업데이트됩니다.

## 3단계: 모바일 앱 테스트에 토큰 전달 {#step-3-pass-the-token-to-your-mobile-app-test}

모바일 앱 테스트는 [고급 옵션][7]을 통해 앱 실행 시 `key:value` 쌍을 앱에 전달하는 기능을 지원합니다. 전역 변수를 참조하려면 필드에 `{{`를 입력합니다. 그러면 런타임에 현재 값으로 대체됩니다.

{{< tabs >}}
{{% tab "Android(초기 인텐트 추가 항목)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Android 기기에 대한 고급 옵션 예시를 보여주는 모바일 앱 테스트 생성 페이지입니다." style="width:100%;" >}}

{{% /tab %}}
{{% tab "iOS(프로세스 인수)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="iOS 기기에 대한 고급 옵션 예시를 보여주는 모바일 앱 테스트 생성 페이지입니다." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 4단계: 앱에서 토큰 처리 {#step-4-handle-the-token-in-your-app}

앱은 시작 시 주입된 값을 읽어 안전하게 저장하고, 이를 사용하여 로그인 흐름을 건너뛰어야 합니다. 이 동작을 빌드 플래그 뒤에 두어 코드 경로가 테스트 또는 자동화 빌드에만 존재하도록 하세요.

{{< tabs >}}
{{% tab "Android(Java)" %}}

{{< code-block lang="java" >}}
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SecureTokenStore.getInstance(this).save(authToken);
        SessionManager.getInstance().restoreSession(authToken);
    }
}
{{< /code-block >}}

토큰을 일반 `SharedPreferences`에 저장하는 대신 `SecureTokenStore`를 `EncryptedSharedPreferences` 및 `MasterKey`로 보호하세요.

{{% /tab %}}
{{% tab "iOS (Swift)" %}}

{{< code-block lang="swift" >}}
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    KeychainManager.shared.save(token: authToken)
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
{{< /code-block >}}

토큰을 `UserDefaults` 대신 키체인에 저장하여 실제 로그인 시 앱이 받는 토큰처럼 저장된 상태에서도 보호되도록 하세요.

{{% /tab %}}
{{% tab "React Native" %}}

{{< code-block lang="javascript" >}}
import { LaunchArguments } from 'react-native-launch-arguments';
import * as Keychain from 'react-native-keychain';

if (__DEV__ || Config.AUTOMATION) {
  const { auth_token: authToken } = LaunchArguments.value();
  if (authToken) {
    await Keychain.setGenericPassword('auth_token', authToken);
    SessionManager.restoreSession(authToken);
  }
}
{{< /code-block >}}

`react-native-launch-arguments`는 하나의 API를 통해 iOS의 프로세스 인수와 Android의 인텐트 엑스트라를 읽습니다. `react-native-keychain`은 `AsyncStorage` 대신 플랫폼 키체인 또는 키스토어에 토큰을 저장합니다.

{{% /tab %}}
{{< /tabs >}}

## 보안 고려 사항 {#security-considerations}

주입된 인증 토큰은 테스트 또는 자동화 빌드에서만 허용하고, 프로덕션 빌드에서는 절대 허용하지 마세요. 인수를 읽기 전에 빌드 플래그를 확인하고, 앱 스토어에 배포하는 빌드에서는 해당 플래그가 설정되지 않았는지 확인하세요.

이는 Android에서 가장 중요합니다. 내보낸 런처 `Activity`로 전송된 인텐트 엑스트라는 Datadog의 테스트 러너뿐만 아니라 기기의 모든 앱에서 올 수 있습니다. 빌드 플래그 확인이 없으면, 시작 인텐트에서 `auth_token`을 읽고 신뢰하는 프로덕션 앱은 모든 로컬 앱이 테스트 계정으로 인증하도록 허용하게 됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/mobile_app_testing/
[2]: /ko/synthetics/api_tests/http_tests/
[3]: /ko/synthetics/platform/settings/#global-variables
[4]: /ko/synthetics/api_tests/http_tests/#define-assertions
[5]: /ko/synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /ko/synthetics/mobile_app_testing/#advanced-options