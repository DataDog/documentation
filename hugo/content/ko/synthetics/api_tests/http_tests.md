---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - http
  - http test
  - http tests
aliases:
- /ko/synthetics/http_test
- /ko/synthetics/http_check
- /ko/synthetics/guide/or-logic-api-tests-assertions
description: 공개 및 내부 API 엔드포인트 모니터링을 위해 HTTP 요청을 시뮬레이션합니다.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: Synthetic 테스트 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: HTTP 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에서 HTTP 테스트 실행
- link: /synthetics/multistep
  tag: 설명서
  text: 다단계 HTTP 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터링에 대해 알아보기
title: HTTP 테스트
---
## 개요 {#overview}

HTTP 테스트를 사용하면 애플리케이션의 API 엔드포인트에 HTTP 요청을 보내 응답 및 전체 응답 시간, 예상 상태 코드, 헤더 또는 본문 콘텐츠와 같은 응답과 정의된 조건을 검증할 수 있습니다.

HTTP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 사용자의 선호도에 따라 [관리형](#select-locations) 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다. HTTP 테스트는 일정에 따라, 온디맨드로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 구성 {#configuration}

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

   - **템플릿에서 테스트 생성하기**:
   
     1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 {{< ui >}}View Template{{< /ui >}}을 클릭합니다. 이렇게 하면 {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}}, {{< ui >}}Monitor Settings{{< /ui >}} 등 사전에 채워진 구성 정보가 표시되는 사이드 패널이 열립니다. 
     2. {{< ui >}}+Create Test{{< /ui >}}를 클릭하여 {{< ui >}}Define Request{{< /ui >}} 페이지를 열면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
     3. {{< ui >}}Save Details{{< /ui >}}를 클릭하여 API 테스트를 제출합니다<br /><br>.

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿이 표시된 Synthetics API 테스트 랜딩 페이지의 동영상" video="true" >}}

  - **</md_tag처음부터 테스트 빌드하기**:
    
     1. 테스트를 처음부터 빌드하려면 {{< ui >}}+ Start from scratch{{< /ui >}}템플릿을 클릭한 다음 `HTTP` 요청 유형을 선택하고 쿼리할 {{< ui >}}URL{{< /ui >}}을 지정합니다. 
        사용 가능한 방법은 `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` 및 `OPTIONS`입니다. `http` 및 `https` URL이 둘 다 지원됩니다.

        <div class="alert alert-info">자세한 옵션은 <a href=#advanced-options>고급 옵션</a>을 참조하세요.</div>

     2. {{< ui >}}Name{{< /ui >}} HTTP 테스트의 이름을 지정합니다.

     3. Add Environment {{< ui >}}Tags{{< /ui >}} HTTP 테스트에 Environment 태그 및 기타 태그를 추가합니다. 그런 다음 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing 페이지][3]에서 Synthetic 테스트를 필터링할 수 있습니다. 
     
     4. Click {{< ui >}}Send{{< /ui >}}를 클릭하여 요청 구성을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="HTTP 요청 정의" style="width:90%;" >}}

     5. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### 스니펫 {#snippets}

{{% synthetics-api-tests-snippets %}}

### 고급 옵션 {#advanced-options}

   {{< tabs >}}

   {{% tab "요청 옵션" %}}
   * {{< ui >}}HTTP version{{< /ui >}}: `HTTP/1.1 only`, `HTTP/2 only`, 또는 `HTTP/2 fallback to HTTP/1.1`를 선택합니다.

     CDN(Akamai, CloudFront, Fastly 등)을 앞단에 배치한 엔드포인트의 경우 HTTP 버전을 기본값인 `HTTP/2 with fallback to HTTP/1.1` 대신 `HTTP/2 only` 또는 `HTTP/1.1 only`로 설정합니다. 지원되는 HTTP 버전은 프로브마다 다르며, 기본 설정을 사용할 경우 다음과 같은 [HTTP 오류][1]가 간헐적으로 발생할 수 있습니다.
     - `MALFORMED_RESPONSE: Unable to parse HTTP response`
     - `Session closed without receiving a SETTINGS frame`
     - `Error HTTP2: Error performing HTTP/2 request`
   * {{< ui >}}Follow redirects{{< /ui >}}: 선택하면 요청을 수행할 때 HTTP 테스트에서 최대 10개의 리디렉션을 팔로우합니다.
   * {{< ui >}}Ignore server certificate error{{< /ui >}}: 선택하면 SSL 인증서를 확인할 때 오류가 발생하더라도 HTTP 테스트가 연결을 계속합니다.
   * {{< ui >}}Timeout{{< /ui >}}: 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다.
   * {{< ui >}}Request headers{{< /ui >}}: HTTP 요청에 추가할 헤더를 정의합니다. 기본 헤더(예: `user-agent` 헤더)를 재정의할 수도 있습니다.
   * {{< ui >}}Cookies{{< /ui >}}: HTTP 요청에 추가할 쿠키를 정의합니다. `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` 형식을 사용하여 여러 개의 쿠키를 설정합니다.

[1]: /ko/synthetics/api_tests/errors/#http-errors

   {{% /tab %}}

   {{% tab "인증" %}}

   * {{< ui >}}Client Certificate{{< /ui >}}: 클라이언트 인증서(`.crt`) 및 연결된 개인 키(`.key`)를 `PEM` 형식으로 업로드하여 mTLS를 통해 인증합니다. 인증서를 변환하기 위해 `openssl` 라이브러리를 사용할 수 있습니다. 예를 들어 `PKCS12` 인증서를 `PEM` 형식의 개인 키 및 인증서로 변환합니다.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * {{< ui >}}HTTP Basic Auth{{< /ui >}}: HTTP 기본 인증 자격 증명을 추가합니다.
   * {{< ui >}}Digest Auth{{< /ui >}}: Digest 인증 자격 증명을 추가합니다.
   * {{< ui >}}NTLM{{< /ui >}}: NTLM 인증 자격 증명을 추가합니다. NTLMv2와 NTLMv1을 모두 지원합니다.
   * {{< ui >}}AWS Signature v4{{< /ui >}}: 액세스 키 ID와 시크릿 액세스 키를 입력합니다. Datadog은 요청에 대한 서명을 생성합니다. 이 옵션은 SigV4의 기본 구현을 사용합니다. Amazon S3와 같은 특정 서명은 기본적으로 지원되지 않습니다.
     Amazon S3 버킷에 대한 '단일 청크' 전송 요청의 경우, 요청 본문의 SHA-256 해시값을 인코딩한 `x-amz-content-sha256`을 헤더에 추가합니다(본문이 비어 있는 경우: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * {{< ui >}}OAuth 2.0{{< /ui >}}: 클라이언트 자격 증명 또는 리소스 소유자 비밀번호를 부여하고 액세스 토큰 URL을 입력합니다. 선택에 따라 클라이언트 ID와 시크릿, 또는 사용자 이름과 비밀번호를 입력합니다. 드롭다운 메뉴에서 API 토큰을 기본 인증 헤더로 전송하거나 본문에 클라이언트 자격 증명을 전송하는 옵션을 선택합니다. 필요시 대상, 리소스 및 범위와 같은 추가 정보를 제공할 수 있습니다({{< ui >}}Resource Owner Password{{< /ui >}}를 선택한 경우 클라이언트 ID 및 시크릿까지 제공).
   * {{< ui >}}JWT{{< /ui >}}: 인증을 위해 서명된 JWT Bearer 토큰을 생성합니다. 서명 알고리즘(`HS256`, `RS256` 또는 `ES256`)을 선택하고 서명 키를 제공합니다. `HS256`의 경우 텍스트 시크릿을 입력하거나 `RS256` 및 `ES256`의 경우 PEM 형식의 개인 키를 업로드합니다. 다음 두 가지를 모두 허용합니다.{{ GLOBAL_VARIABLE }}` references. Enter payload claims as a JSON object; claims can be strings, numbers, Booleans, arrays, or nested objects. The `iat` (issued at) and `exp` (expiration) claims are auto-added by default. If you include `iat` or `exp` in the payload JSON, those values take precedence over the auto-generated ones. Optionally, set the expiration window in seconds (default: `3600`), add custom JWT header fields such as `kid` or `x5t`, and customize the token prefix in the `Authorization` header (default: `Bearer`).

   {{% /tab %}}

   {{% tab "쿼리 파라미터" %}}

   * {{< ui >}}Encode parameters{{< /ui >}}: 인코딩이 필요한 쿼리 파라미터의 이름과 값을 추가합니다.

   {{% /tab %}}

   {{% tab "요청 본문" %}}

   * {{< ui >}}Body type{{< /ui >}}: HTTP 요청에 추가하려는 요청 본문 유형(`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` 또는 `None`)을 선택합니다.
   * {{< ui >}}Request body{{< /ui >}}: HTTP 요청 본문의 내용을 추가합니다.
       * 요청 본문은 `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`에 대해 최대 50KB로 제한됩니다.
       * 요청 본문은 `application/octet-stream`에 대해 3MB의 파일 1개로 제한됩니다.
       * 요청 본문은 `multipart/form-data`에 대해 3MB의 파일 3개로 제한됩니다.
   {{% /tab %}}

   {{% tab "프록시" %}}

   * {{< ui >}}Proxy URL{{< /ui >}}: HTTP 요청이 통과해야 하는 프록시의 URL을 지정합니다(`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * {{< ui >}}Proxy header{{< /ui >}}: 프록시에 대한 HTTP 요청에 포함할 헤더를 추가합니다.

   {{% /tab %}}

   {{% tab "개인정보 보호" %}}

   * {{< ui >}}Do not save response body{{< /ui >}}: 이 옵션을 선택하면 런타임에 응답 본문이 저장되지 않도록 하고 실패한 JavaScript 어설션의 오류 메시지를 잘라냅니다. 이렇게 하면 테스트 결과에 민감한 데이터가 표시되지 않게 할 수 있지만, 실패 시 문제 해결이 더 어려워질 수 있습니다. 전체 보안 권장 사항은 [Synthetic Monitoring 데이터 보안][1]을 참조하세요.


[1]: /ko/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

JavaScript를 사용하여 HTTP API 테스트용 변수를 정의하세요.

{{< img src="synthetics/api_tests/http_javascript.png" alt="JavaScript를 사용하여 HTTP API 테스트 정의하기" style="width:90%;" >}}

<div class="alert alert-info">Windows 프라이빗 위치에서는 API 테스트에 대한 JavaScript 기능이 지원되지 않습니다.</div>

   {{% /tab %}}

   {{< /tabs >}}

### 어설션 정의 {#define-assertions}

어설션은 예상되는 테스트 결과가 무엇인지 정의합니다. {{< ui >}}Test URL{{< /ui >}}을 클릭하면 `response time`, `status code`, `header`, `content-type` 에 대한 기본 어설션이 응답을 기반으로 추가됩니다. 모니터링할 테스트에 대해 최소한 하나의 어설션을 정의해야 합니다.

<div class="alert alert-info">어설션 헤더, 본문 및 JavaScript 섹션은 어설션을 정의하는 데만 사용됩니다. 추가 HTTP 요청을 만드는 데는 사용할 수 없습니다.</div>

{{< tabs >}}
{{% tab "응답 어설션" %}}

| 유형          | 연산자                                                                                               | 값 유형                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5], <br> [`jsonschema`][7] | _String_ <br> _[Regex][6]_ <br> _String_, _[Regex][6]_ <br> _String_ |
| body hash     | `md5`, `sha1`, `sha256`                                                                                 | _String_                                                        |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> `does not exist`, <br> `is less than`, `is less than or equal`, `is more than`, `is more than or equal` | _String_ <br> _[Regex][6]_ <br> _None_ <br> _Integer_ |
| 응답 시간 | `is less than`                                                                                         | _정수(ms)_                                                  |
| 상태 코드   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _정수_ <br> _[정규식][6]_                                                     |

HTTP 테스트는 다음과 같은 `content-encoding` 헤더로 본문을 압축 해제할 수 있습니다. `br`, `deflate`, `gzip`, 및 `identity`

{{< ui >}}New Assertion{{< /ui >}}을 클릭하거나 응답 미리보기를 직접 클릭하여 API 테스트당 최대 20개의 어설션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_http.png" alt="HTTP 테스트의 성공 또는 실패를 판단할 어설션 정의하기" style="width:90%;" >}}

어설션에서 `OR` 논리를 수행하려면 `matches regex` 비교기를 사용하여 `(200|302)`와 같은 여러 예상 값으로 정규식을 정의하세요. 예를 들어 서버가 `200` 또는 `302` 상태 코드로 응답하는 경우에만 HTTP 테스트가 성공하도록 설정할 수 있습니다. 상태 코드가 200 또는 302인 경우 `status code` 어설션이 성공합니다. `OR` 비교기를 사용하여 `body` 또는 `header` 어설션에 `matches regex` 논리를 추가할 수도 있습니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

응답 본문은 해당 내용에 대한 어설션을 추가하고 이러한 어설션이 실패한 경우에만 반환됩니다. 테스트에 응답 본문에 대한 어설션이 포함되어 있고 성공할 경우, 본문 페이로드가 삭제되고 응답 본문의 처음 50자만 표시됩니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있고 시간 초과 제한에 도달할 경우, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: https://json-schema.org/

{{% /tab %}}
{{% tab "JavaScript" %}}

표준 응답 어설션이 유효성 요구 사항을 충족하지 않는 경우 JavaScript 어설션을 사용하세요. Synthetic Monitoring은 `dd.expect()`, `dd.should` 및 `dd.assert()`과 같은 유연한 어설션 스타일을 제공하는 [Chai 어설션 라이브러리][20]를 사용합니다.

JSON 응답을 처리할 때는 속성에 접근하기 전에 `JSON.parse(dd.response.body)`를 사용하여 응답 본문을 구문 분석하세요. JSON 데이터를 검증할 때는 모든 어설션 메서드(`dd.assert()`, `dd.expect()`, 및 `dd.should`)에 이 방식을 적용해야 합니다.

{{< img src="synthetics/api_tests/JS_assertion.png" alt="HTTP API 테스트를 위한 JavaScript 어설션" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Windows 프라이빗 위치에서는 API 테스트에 대한 JavaScript 기능이 지원되지 않습니다.</li>
    <li>실패한 JavaScript 어설션의 오류 메시지에 민감한 데이터가 포함될 수 있는 경우, {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Privacy{{< /ui >}}에서 {{< ui >}}Do not save response body{{< /ui >}}를 활성화하세요. 이렇게 하면 어설션 오류 메시지를 잘라낼 수 있습니다.</li>
  </ul>
</div>

#### dd.assert() 사용 {#using-ddassert}

기존 방식의 어설션 구문에는 `dd.assert()`을 사용하세요.

예를 들어 `status.code` 필드가 여러 허용된 값 중 하나인지 검증하는 방법은 다음과 같습니다.

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
// Assert that the status code is 200, 210, 320, or 330
dd.assert.include([200, 210, 320, 330], response.status.code);
{{< /code-block >}}

응답 예시:

```json
{
  "status": {
    "code": 200,
    "message": "Success"
  }
}
```

이 어설션:
- JSON 응답 본문을 구문 분석합니다.
- `status.code`가 허용된 값의 배열(200, 210, 320 또는 330)에 포함되어 있는지 확인합니다.

이 경우 테스트는 **통과**합니다. `status.code`가 `200`이며, 이는 허용된 값 배열에 포함되어 있기 때문입니다.

`assert.include()`에 대한 자세한 내용은 [Chai assert.include() 문서][21]를 참조하세요.

#### dd.expect() 사용 {#using-ddexpect}

중첩 속성 검증이 포함된 어설션을 수행하려면 `dd.expect()`를 사용하세요.

예를 들어 `status.indicator` 필드가 여러 예상 값 중 하나와 일치하는지 검증하는 방법은 다음과 같습니다.

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
const regex = /^(major|critical|minor|none)$/;

dd.expect(response)
  .to.have.nested.property('status.indicator')
  .that.matches(regex);
{{< /code-block >}}

응답 예시:

```json
{
  "status": {
    "indicator": "none"
  }
}
```
이 어설션:
- JSON 응답 본문을 구문 분석합니다.
- 중첩 속성 `status.indicator`가 존재하는지 검증합니다.
- 값이 정규식 패턴(다음 중 하나: `major`, `critical`, `minor` 또는 `none`)과 일치하는지 확인합니다.

정규식 `/^(major|critical|minor|none)$/`의 경우, 테스트는 **통과**합니다. `status.indicator`가 `"none"`이며, 이는 패턴과 일치하기 때문입니다.

정규식 `/^(major|critical|minor)$/`의 경우, 테스트는 **실패**합니다. `"none"`이 허용된 값에 포함되지 않기 때문입니다.

`expect()`에 대한 자세한 내용은 [Chai expect() 문서][22]를 참조하세요.

#### dd.should 사용{#using-ddshould}

자연어 구문으로 어설션을 작성하려면 `dd.should`를 사용하세요.

예를 들어 `status.indicator` 필드가 존재하고 특정 값과 같음을 검증하는 방법은 다음과 같습니다.

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
response.status.should.exist();
const indicator = response.status.indicator;
indicator.should.equal('none');
{{< /code-block >}}

응답 예시:

```json
{
  "status": {
    "indicator": "none"
  }
}
```

이 어설션:
- JSON 응답 본문을 구문 분석합니다.
-  `status` 속성이 존재하는지 확인합니다.
- 지표 값을 변수로 추출합니다.
-  `status.indicator`가 `"none"`과 같은지 확인합니다.

테스트는 **통과**합니다. `status`가 존재하고 `status.indicator`가 `"none"`이기 때문입니다.

`should()`에 대한 자세한 내용은 [Chai should() 문서][23]를 참조하세요.

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### 위치 선택 {#select-locations}

HTTP 테스트를 실행할 {{< ui >}}Locations{{< /ui >}}를 선택합니다. HTTP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 사용자의 선호도에 따라 관리형 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다.

{{% managed-locations %}}

### 테스트 주기 지정 {#specify-test-frequency}

HTTP 테스트는 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 가장 중요한 엔드포인트가 사용자가 항상 액세스할 수 있도록 합니다. Datadog이 HTTP 테스트를 실행할 빈도를 선택합니다.
* [**CI/CD 파이프라인 내에서**][2] 결함이 있는 코드가 고객 경험에 영향을 미칠지에 대한 염려 없이 전송을 시작할 수 있습니다.
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## 원클릭 {#one-click}

API 테스트 생성은 [카탈로그][17] 및 기존 API 테스트에서 엔드포인트를 제안하여 테스트 양식을 관련 옵션으로 미리 채웁니다.
APM 트레이스, 카탈로그 엔드포인트 검색 및 사용자가 생성한 기존 유사 Synthetic 테스트와 같은 기존 Datadog 데이터 소스를 사용하세요.

API 테스트 {{< ui >}}URL{{< /ui >}} 입력값을 입력하여 Synthetic Monitoring에서 엔드포인트 제안 또는 유사한 테스트를 얻습니다.

   {{< img src="synthetics/api_tests/api-one-click.png" alt="기존 API 테스트에 대한 GET 검색을 보여주는 HTTP API 테스트" style="width:90%;" >}}

그런 다음 테스트 미리 채우기 제안을 선택하여 설정(요청 옵션 및 헤더, 인증 및 변수)을 작성합니다.

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="선택" style="width:90%;" >}}

{{% synthetics-variables %}}

### 변수 사용 {#use-variables}

HTTP 테스트의 URL, 고급 옵션 및 어설션에서 [{{< ui >}}Settings{{< /ui >}} 페이지에 정의된 전역 변수][11]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`을 입력하세요.

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="HTTP 테스트에서 변수 사용하기" video="true" width="100%" >}}

## 테스트 실패 {#test-failure}

하나 이상의 어설션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라 엔드포인트 어설션을 테스트하지 않고도 테스트가 실패할 수 있습니다.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="전체 가동 시간, 경보 타임라인, 최근 실행된 테스트 중 경고 상태에 있는 항목 목록이 포함된 Activity 탭을 보여주는 HTTP API 테스트 세부 정보 페이지" style="width:100%;">}}

### 타임라인 요약 {#timeline-summary}

{{< ui >}}Summary{{< /ui >}} 패널은 선택한 기간 동안 테스트 실행 전반에서 실패를 유발하는 고유한 문제를 식별합니다. 각 문제에 대해 패널에 표시되는 내용은 다음과 같습니다.

- {{< ui >}}First seen{{< /ui >}}: 테스트 실행 과정에서 문제가 처음 발생한 시점
- {{< ui >}}Last seen{{< /ui >}}: 테스트 실행 과정에서 가장 최근에 문제가 발생한 시점
- {{< ui >}}Classification{{< /ui >}}: AI 실패 요약을 바탕으로 해당 문제가 {{< ui >}}True failure{{< /ui >}}(애플리케이션의 실제 문제)인지, {{< ui >}}Test Misconfiguration{{< /ui >}}(테스트 설정 문제)인지 여부
- {{< ui >}}Description{{< /ui >}}: 오류에 대한 간략한 설명
- {{< ui >}}Latest alerts{{< /ui >}}: 해당 문제와 관련하여 가장 최근에 나타난 경보 목록

HTTP 및 SSL 오류 코드의 전체 목록은 [API 테스트 오류][12]를 참조하세요.

## Bits Investigation 시작하기 {#launch-a-bits-investigation}

Synthetic HTTP 테스트 실패의 근본 원인을 파악하려면 [Bits Investigation][18]을 시작하세요. Bits Investigation은 테스트 결과, 트레이스, 로그, 메트릭을 분석하여 근본 원인을 파악하고, 실패 유형(회귀 또는 구성 오류)을 표시합니다.

## 권한 {#permissions}

기본적으로, [Datadog Admin 및 Datadog Standard 역할][13]을 가진 사용자만 Synthetic HTTP 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic HTTP 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자를 두 가지 [기본 역할][13] 중 하나로 업그레이드하세요.

[사용자 정의 역할 기능][14]을 사용하는 경우, `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[7]: /ko/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /ko/synthetics/guide/synthetic-test-monitors
[11]: /ko/synthetics/settings/#global-variables
[12]: /ko/synthetics/api_tests/errors/
[13]: /ko/account_management/rbac/
[14]: /ko/account_management/rbac#custom-roles
[15]: /ko/account_management/rbac/#create-a-custom-role
[16]: /ko/synthetics/api_tests/errors/#http-errors
[17]: /ko/api_catalog
[18]: /ko/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page