---
description: HMAC를 사용하여 HTTP 테스트 만들기
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: 설명서
  text: HTTP 테스트
- link: /synthetics/api_tests/http_tests#variables
  tag: 설명서
  text: 신서틱(Synthetic) 테스트 변수
title: HMAC 인증을 사용하여 HTTP 테스트 만들기
---

## 개요

Synthetic Monitoring을 사용하면 JavaScript 스크립트에서 변수를 생성하여 사용자 정의 인증을 정의하거나 파라미터를 인코딩할 수 있습니다.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="HMAC 인증을 사용한 HTTP 테스트" style="width:100%;" >}}

이 가이드에서는 스크립트의 변수를 사용하여 HMAC 서명이 포함된 HTTP 테스트를 만드는 방법을 안내합니다.

**참고**: 표준 HMAC 인증은 없으며 자체 HMAC 인증은 약간 다를 수 있습니다(예: 다른 헤더 이름 사용).

## 설정

### 로컬 변수를 사용하여 HMAC 인증의 빌딩 블록 만들기

[Synthetic HTTP 테스트][3]를 생성하고 **Create a Local Variable**을 클릭하여 다음 변수를 추가합니다.

`MY_SECRET_KEY`
: 메시지 서명에 사용되는 UTF-8 인코딩 키입니다([글로벌 변수][4]에서도 가져올 수 있음).

`BODY`
: **Request Body**에 설정된 요청 본문이며 HMAC 인증을 계산하는 데 사용됩니다.

`DATETIME`
: HMAC 서명을 계산하는 파라미터입니다. 이것을 [로컬 변수][1]로 생성하거나 `dd.variable.set('DATETIME', new Date().toISOString())`을 사용하여 [스크립트의 변수](#compute-the-hmac-signature-with-javascript) 내에서 생성하고 내보낼 수 있습니다.

### 테스트 URL 및 요청 본문 정의하기

HTTP 테스트에 대한 URL과 요청 유형을 정의합니다. 그런 다음 **Advanced Options** > **Request Body**를 클릭하여 `{{ BODY }}` 변수를 요청 본문으로 추가합니다.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="HTTP 테스트의 요청 본문으로 설정된 로컬 변수" style="width:80%;" >}}

### JavaScript로 HMAC 서명 생성

HTTP 요청에 대한 HMAC 서명을 생성하려면 ***Variable From Script**를 클릭합니다. 

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="JavaScript로 생성된 로컬 변수" style="width:80%;" >}}

* 변수를 스크립트로 가져오려면 `dd.variable.get("<variable_name>")`를 사용합니다. 
* 변수를 정의하려면 `dd.variable.set("<variable_name>", <value>)` 또는 `dd.variable.setObfuscated("<variable_name>", <value>)`를 사용합니다.

다음과 같은 헬퍼 함수에도 액세스할 수 있습니다.
* [`std` 라이브러리][5]의 대부분은 `std.*`를 사용하여 접근할 수 있습니다. 예를 들어, `@std/encoding/hex.ts`에 정의된 `encodeHex` 함수를 호출하려면 `std.encoding.hex.encodeHex`를 사용합니다.
* [Web Crypto API][6]와 같은 표준 JavaScript API.

*참고**: 이러한 API 중 일부는 보안상의 이유로 비활성화되어 있습니다.

예시:

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// UI에서 DATETIME을 값으로 사용하여 "날짜" HTTP 헤더를 설정합니다.
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// UI에서 BODY를 요청 본문으로 사용
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

// UI에서 SIGNATURE를 값으로 사용하여 "인증" HTTP 헤더를 설정합니다.
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// 대안
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### 요청 헤더에 HMAC 서명 추가

내보낸 `SIGNATURE` 변수를 사용하여 HTTP 요청 헤더를 만듭니다.

**Request Options** 탭에서 `Name`이  `Authentication`로, `Value`가 `{{ SIGNATURE }}`로 설정된 헤더를 추가합니다. 이어서 `Name`이 `Date`로, `Value`이 `{{ DATETIME }}`로 설정된 것을 추가합니다. `Authorization`와 같은 다른 헤더를 정의할 수 있습니다.

나머지 HTTP 테스트를 구성한 후 **Create**를 클릭하여 저장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /ko/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto