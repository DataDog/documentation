---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱(Synthetic) API 테스트
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
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
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
  text: Synthetic 테스트 모니터에 대해 알아보기
title: HTTP 테스트
---
## 개요

HTTP 테스트를 사용하면 애플리케이션의 API 엔드포인트에 HTTP 요청을 보내 응답 및 전체 응답 시간, 예상 상태 코드, 헤더 또는 본문 콘텐츠와 같은 정의된 조건을 확인할 수 있습니다.

HTTP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 기본 설정에 따라 [관리](#select-locations) 및 [비공개 위치][1]에서 실행할 수 있습니다. HTTP 테스트는 일정에 따라, 온디맨드로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 설정

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

   - **템플릿에서 테스트 생성하기**:

     1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 **템플릿 보기**를 클릭합니다. 테스트 세부 정보, 요청 세부 정보, 어설션, 알림 조건 및 모니터링 설정이 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
     2. **+테스트 생성하기**를 클릭하면 사전 입력된 설정 옵션을 검토하고 편집할 수 있는 **요청 정의** 페이지가 열립니다. 표시되는 필드는 테스트 초기 생성 시사용할 수 있는 필드와 동일합니다.
     3. **세부 정보 저장**을 클릭하여 API 테스트를 제출합니다.<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿을 사용한 Synthetics API 테스트 랜딩 페이지 영상" video="true" >}}

  - **테스트 처음부터 빌드하기**:

     1. 테스트를 처음부터 빌드하려면 **+처음부터 시작** 템플릿을 클릭한 다음 `HTTP` 요청 유형을 선택하고 쿼리할 **URL**을 지정합니다.
        사용 가능한 메소드는 `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, `OPTIONS`입니다. `http` 및 `https` URL이 모두 지원됩니다.

        <div class="alert alert-info">더 많은 옵션은 <a href=#advanced-options>고급 옵션</a>에서 확인하세요.</div>

     2. HTTP 테스트의 **이름을 지정합니다**.

     3. HTTP 테스트에 환경 **태그** 및 기타 태그를 추가합니다. 이러한 태그를 사용하여 [신서틱 모니터링 & 지속적인 테스트 페이지][3]에서 신서틱 테스트를 필터링할 수 있습니다.

     4. **전송**을 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="HTTP 요청 정의" style="width:90%;" >}}

     5. **테스트 생성하기**를 클릭하여 API 테스트를 제출합니다.

### Snippets

{{% synthetics-api-tests-snippets %}}

### 고급 옵션

   {{< tabs >}}

   {{% tab "Request Options" %}}
   * **HTTP 버전**: `HTTP/1.1 only`, `HTTP/2 only`,`HTTP/2 fallback to HTTP/1.1` 중 선택합니다.
   * **Follow redirects**: 선택하면 요청을 수행할 때 HTTP 테스트에서 최대 10개의 리디렉션을 팔로우합니다.
   * **Ignore server certificate error**: 선택하면 SSL 인증서를 확인할 때 오류가 발생하더라도 HTTP 테스트가 연결을 계속합니다.
   * **타임아웃**: 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다(옵션).
   * **요청 헤더**: HTTP 요청에 추가할 헤더를 정의합니다. 기본 헤더(예: `user-agent` 헤더)를 재정의할 수도 있습니다.
   * **Cookies**: HTTP 요청에 추가할 쿠키를 정의합니다. `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` 형식을 사용하여 여러 쿠키를 설정합니다.

   {{% /tab %}}

   {{% tab "Authentication" %}}

   * **Client Certificate**: 클라이언트 인증서(`.crt`) 및 관련 개인 키(`.key`)를 `PEM` 형식으로 업로드하여 mTLS를 통해 인증합니다. `openssl` 라이브러리를 사용하여 인증서를 변환할 수 있습니다. 예를 들어 `PKCS12` 인증서를 `PEM` 형식의 개인 키 및 인증서로 변환합니다.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **HTTP 기본 인증**: HTTP 기본 인증 자격 증명을 추가합니다.
   * **Digest 인증**: Digest 인증 자격 증명을 추가합니다.
   * **NTLM**: NTLM 인증 자격 증명을 추가합니다. NTLMv2와 NTLMv1을 모두 지원합니다.
   * **AWS Signature v4**: Access Key ID와 Secret Access Key를 입력합니다. Datadog은 요청에 대한 서명을 생성합니다. 이 옵션은 SigV4의 기본 구현을 사용합니다. Amazon S3와 같은 특정 서명은 기본적으로 지원되지 않습니다.
     Amazon S3 버킷에 대한 "Single Chunk" 전송 요청의 경우 sha256으로 인코딩된 요청 본문을 헤더로 포함하는 `x-amz-content-sha256`을 추가합니다(빈 본문의 경우: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: 클라이언트 자격 증명 또는 리소스 소유자 비밀번호 부여 중에서 선택하고 액세스 토큰 URL을 입력합니다. 선택에 따라 클라이언트 ID와 비밀번호 또는 사용자 이름과 비밀번호를 입력합니다. 드롭다운 메뉴에서 API 토큰을 기본 인증 헤더로 보낼지, 아니면 본문에 클라이언트 자격 증명을 보낼지 옵션을 선택합니다. 선택 사항으로 대상, 리소스 및 범위와 같은 추가 정보를 제공할 수 있습니다(**Resource Owner Password**를 선택한 경우 클라이언트 ID 및 비밀번호도 함께).

   {{% /tab %}}

   {{% tab "Query Parameters" %}}

   * **인코딩 파라미터**: 인코딩이 필요한 쿼리 파라미터의 이름과 값을 추가합니다.

   {{% /tab %}}

   {{% tab "Request Body" %}}

   * **Body type**: HTTP 요청에 추가하려는 요청 본문 유형 (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL`, `None`)을 선택합니다.
   * **Request body**: HTTP 요청 본문의 콘텐츠를 추가합니다.
       * 요청 본문은 `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`에 대해 최대 50KB로 제한됩니다.
       * 요청 본문은 `application/octet-stream`에 대해 3MB의 파일 1개로 제한됩니다.
       * 요청 본문은 `multipart/form-data`에 대해 3MB의 파일 3개로 제한됩니다.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: HTTP 요청이 통과해야 하는 프록시의 URL을 지정합니다(`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy header**: 프록시에 대한 HTTP 요청에 포함할 헤더를 추가합니다.

   {{% /tab %}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: 런타임 시 응답 본문이 저장되지 않도록 하려면 이 옵션을 선택합니다. 이는 테스트 결과에 민감한 데이터가 포함되지 않도록 하는 데 도움이 될 수 있습니다. 하지만 오류 발생시 문제 해결이 더 어려워질 수 있으므로 주의해서 사용하세요. 자세한 보안 권장 사항은 [Synthetic Monitoring Security][1]을 참조하세요.


[1]: /ko/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

JavaScript를 사용하여 HTTP API 테스트에 대한 변수를 정의합니다.

  {{< img src="synthetics/api_tests/http_javascript.png" alt="Javascript로 HTTP API 테스트 정의" style="width:90%;" >}}

   {{% /tab %}}

   {{< /tabs >}}

### 어설션 정의

어설션은 예상되는 테스트 결과를 정의합니다. **Test URL**을 클릭하면 얻은 응답을 기반으로 `response time`, `status code`, `header`, `content-type`에 대한 기본 어설션이 추가됩니다. 모니터링할 테스트에 대한 어설션을 하나 이상 정의해야 합니다.

| 유형          | 연산자                                                                                               | 값 유형                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 본문          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _문자열_ <br> _[정규식][6]_ |
| 헤더        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _문자열_ <br> _[정규식][6]_                                      |
| 응답 시간 | `is less than`                                                                                         | _정수 (ms)_                                                  |
| 상태 코드   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _정수_ <br> _[정규식][6]_                                                     |

HTTP 테스트는 다음 `content-encoding` 헤더가 있는 본문의 압축을 풀 수 있습니다: `br`, `deflate`, `gzip`, `identity`.

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_http.png" alt="HTTP 테스트의 성공 또는 실패에 대한 어설션을 정의합니다." style="width:90%;" >}}

어설션에서 `OR` 로직을 수행하려면 `matches regex` 비교기를 사용하여 `(200|302)`와 같은 여러 예상 값이 있는 정규식을 정의합니다. 예를 들어, 서버가 `200` 또는 `302` 상태 코드로 응답해야 할 때 HTTP 테스트가 성공하기를 원할 수 있습니다. 상태 코드가 200 또는 302이면 `status code` 어설션은 성공합니다. `body` 또는 `header` 어설션에 `OR` 로직을 추가할 수도 있습니다.

테스트에 응답 본문 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어서션이 포함되어 있고 제한 시간에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

HTTP 테스트를 실행할 **위치(Locations)**를 선택합니다. HTTP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 사용자의 선호도에 따라 관리형 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다.

{{% managed-locations %}}

### 테스트 빈도 지정

HTTP 테스트는 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 가장 중요한 엔드포인트에 사용자가 항상 액세스할 수 있도록 합니다. Datadog이 HTTP 테스트를 실행할 빈도를 선택합니다.
* [**CI/CD 파이프라인 내에서**][2] 결함이 있는 코드가 고객 경험에 영향을 미칠 지에 대한 염려 없이 발송을 시작할 수 있습니다.
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

## 원클릭

API 테스트 생성은 [API 카탈로그][17] 및 기존 API 테스트에서 엔드포인트를 제안하여 테스트 양식을 관련 옵션으로 미리 채웁니다.
애플리케이션 성능 모니터링(APM) 트레이스, API 카탈로그 엔드포인트 검색 및 사용자가 생성한 유사한 기존 신서틱(Synthetic) 테스트와 같은 기존 Datadog 데이터 소스를 사용합니다.

API 테스트 **URL** 인풋값을 입력하여 신서틱(Synthetic) 모니터링에서 엔드포인트 제안 또는 유사한 테스트를 얻습니다.

   {{< img src="synthetics/api_tests/api-one-click.png" alt="기존 API 테스트에 대한 GET 검색을 표시하는 HTTP API 테스트" style="width:90%;" >}}

그런 다음 테스트 미리 채우기 제안을 선택하여 설정 (요청 옵션 및 헤더, 인증 및 변수)을 작성합니다.

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="선택" style="width:90%;" >}}

{{% synthetics-variables %}}

### 변수 사용

HTTP 테스트의 URL, 고급 옵션 및 어설션에서 [**Settings** 페이지에 정의된 전역 변수][11]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에서 `{{`을 입력하세요.

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="HTTP 테스트에서 변수 사용" video="true" width="100%" >}}

## 테스트 실패

하나 이상의 어서션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라서는 엔드포인트 어서션 테스트 없이 해당 테스트가 실패할 수 있습니다.

가장 일반적인 오류는 다음과 같습니다.

`AUTHENTICATION_ERROR`
: 신서틱(Synthetic) 모니터링은 인증이 실패하면 자동으로 테스트 재시도를 비활성화합니다. 해당 안전 조치는 유효한 자격 증명으로 테스트를 업데이트할 때까지 유효합니다. 잘못된 알림을 생성하고 비용이 청구되는 사용량을 증가시키는 불필요한 테스트 실행을 방지할 수 있습니다.

`CONNREFUSED`
: 대상 머신이 적극적으로 거부했기 때문에 연결할 수 없습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹 서버가 응답 도중 오류 또는 충돌이 발생하였거나 웹 서버의 연결이 끊어졌기 때문일 수 있습니다.

`DNS`
: 테스트 URL의 DNS 항목을 찾을 수 없는 경우입니다. 가능한 원인으로는 테스트 URL이 잘못 설정되었거나 DNS 엔티티 설정이 잘못되었기 때문일 수 있습니다.

`Error performing HTTP/2 request`
: 요청을 수행할 수 없습니다. 자세한 내용은 전용 [오류][16] 페이지를 참조하세요.

`INVALID_REQUEST` 
: 테스트 설정이 유효하지 않습니다(예: URL 오타).

`SSL`
: SSL 연결을 수행할 수 없습니다. [자세한 내용은 전용 오류 페이지를 참조하세요][12].

`TIMEOUT`
: 요청을 적절한 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`이 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`는 요청 기간이 테스트에 정의된 시간 제한에 도달했음을 나타냅니다(기본값은 60초로 설정됨).
  각 요청에 대해 완료된 요청 단계만 네트워크 폭포에 표시됩니다. 예를 들어, `Total response time`만 표시되는 경우 DNS 확인 중에 시간 초과가 발생했습니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 요청 및 어서션 실행 시간이 최대 실행 시간(60.5초)에 도달했음을 나타냅니다.

`MALFORMED_RESPONSE` 
: 원격 서버가 HTTP 사양을 준수하지 않는 페이로드로 응답했습니다.

## 권한

기본적으로 [Datadog Admin 및 Datadog Standard 역할][13]을 가진 사용자만 Synthetic HTTP 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic HTTP 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면 사용자를 두 가지 [기본 역할][13] 중 하나로 업그레이드하세요.

[사용자 정의 역할 기능][14]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가합니다.

### 액세스 제한 

{{% synthetics_grace_permissions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: /ko/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /ko/synthetics/guide/synthetic-test-monitors
[11]: /ko/synthetics/settings/#global-variables
[12]: /ko/synthetics/api_tests/errors/#ssl-errors
[13]: /ko/account_management/rbac/
[14]: /ko/account_management/rbac#custom-roles
[15]: /ko/account_management/rbac/#create-a-custom-role
[16]: /ko/synthetics/api_tests/errors/#http-errors
[17]: /ko/api_catalog