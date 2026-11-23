---
description: HMAC를 사용하여 HTTP 테스트를 만드는 방법을 알아보세요.
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: 설명서
  text: HTTP 테스트 알아보기
- link: /synthetics/api_tests/http_tests#variables
  tag: 설명서
  text: Synthetic 테스트 변수 알아보기
title: HMAC 인증을 사용한 HTTP 테스트 생성
---
## 개요 {#overview}

Synthetic Monitoring에서는 JavaScript 스크립트로 변수를 생성하여 사용자 지정 인증을 정의하거나 파라미터를 인코딩할 수 있습니다.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="HMAC 인증이 적용된 HTTP 테스트" style="width:100%;" >}}

이 가이드에서는 스크립트에서 생성한 변수를 사용하여 HMAC 서명이 포함된 HTTP 테스트를 만드는 방법을 안내합니다.

**참고**: HMAC 인증에는 표준 방식이 없으므로 사용 중인 HMAC 인증 방식은 약간 다를 수 있습니다. 예를 들어, 다른 헤더 이름을 사용할 수 있습니다.

## 설정 {#setup}

### 로컬 변수를 사용한 HMAC 인증의 기본 구성 요소 생성 {#create-the-building-blocks-of-hmac-authentication-using-local-variables}

[Synthetic HTTP 테스트][3]를 생성하고 {{< ui >}}Create a Local Variable{{< /ui >}}을 클릭하여 다음 변수를 추가합니다.

`MY_SECRET_KEY`
: 메시지 서명에 사용되는 UTF-8 인코딩 키입니다(이 키는 [글로벌 변수][4]에서도 가져올 수 있습니다).

`BODY`
: 요청 본문({{< ui >}}Request Body{{< /ui >}}에서 설정하며 HMAC 인증 계산에 사용됩니다.)

`DATETIME`
: HMAC 서명을 계산하기 위한 파라미터입니다. 이를 [로컬 변수][1]로 생성하거나 [스크립트의 변수](#compute-the-hmac-signature-with-javascript) 내에서 `dd.variable.set('DATETIME', new Date().toISOString())`을 사용하여 생성하고 내보낼 수 있습니다.

### 테스트 URL 및 요청 본문 정의{#define-a-test-url-and-request-body}

HTTP 테스트를 위한 URL과 요청 유형을 정의합니다. 그런 다음 {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Request Body{{< /ui >}}를 클릭하여 '{{ BODY }}' 변수를 요청 본문으로 추가합니다.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="HTTP 테스트의 요청 본문으로 설정된 로컬 변수" style="width:80%;" >}}

### JavaScript를 사용한 HMAC 서명 생성{#compute-the-hmac-signature-with-javascript}

HTTP 요청에 사용할 HMAC 서명을 생성하려면{{< ui >}}Variable From Script{{< /ui >}}를 클릭하세요.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="JavaScript로 생성된 로컬 변수" style="width:80%;" >}}

이 스크립트는 Datadog이 HTTP 요청을 보내기 전에 실행됩니다. 요청이 완료된 후 JSON 응답 데이터를 검증하려면 [JavaScript 어설션][7] 및 `dd.response.body`를 사용하세요.

* 스크립트로 변수를 가져오려면 `dd.variable.get("<variable_name>")`을 사용하세요.
* 변수를 정의하려면 `dd.variable.set("<variable_name>", <value>)` 또는 `dd.variable.setObfuscated("<variable_name>", <value>)`를 사용하세요.

다음과 같은 헬퍼 함수도 사용할 수 있습니다.
* [`std` 라이브러리][5]의 대부분은 `std.*`로 액세스할 수 있습니다. 예를 들어, `encodeHex`에 정의된 `@std/encoding/hex.ts` 함수를 호출하려면 `std.encoding.hex.encodeHex`를 사용하세요.
* [Web Crypto API][6]와 같은 표준 JavaScript API.

**참고**: 이러한 API 중 일부는 보안상의 이유로 비활성화되어 있습니다.

예시는 다음과 같습니다.

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Set a "date" HTTP header using DATETIME as its value in the UI
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// Use BODY as the request body in the UI
dd.variable.set("BODY", message);

const secretKeyUtf8 = dd.variable.get("MY_SECRET_KEY");
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKeyUtf8),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

const rawSignature = await crypto.subtle.sign(
  { name: "HMAC" },
  key,
  new TextEncoder().encode(datetime + "." + message)
);

// Set an "authentication" HTTP header using SIGNATURE as its value in the UI
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternative:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### 요청 헤더에 HMAC 서명 추가{#add-the-hmac-signature-to-the-request-header}

내보낸 `SIGNATURE` 변수를 사용하여 HTTP 요청 헤더를 생성합니다.

{{< ui >}}Request Options{{< /ui >}} 탭에서 헤더를 추가하고 {{< ui >}}Name{{< /ui >}}을 `Authentication`으로, {{< ui >}}Value{{< /ui >}}를 '{{ SIGNATURE }}'로 설정합니다. 그리고 다른 헤더를 추가하고 {{< ui >}}Name{{< /ui >}}을 'Date'로, {{< ui >}}Value{{< /ui >}}를 '{{ DATETIME }}으로 설정합니다. 다른 헤더를 정의할 수도 있습니다(예: 'Authorization').

나머지 HTTP 테스트를 구성한 후 {{< ui >}}Create{{< /ui >}}를 클릭하여 저장합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /ko/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
[7]: /ko/synthetics/api_tests/http_tests/#define-assertions