---
description: 체인 요청을 통해 주요 서비스에 대한 정교한 트랜잭션을 모니터링합니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: 블로그
  text: Datadog 다단계 API 테스트로 워크플로 모니터링
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에서 다단계 API 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터에 대해 알아보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 테라폼
  text: Terraform으로 Synthetic 다단계 API 테스트 생성 및 관리
kind: 설명서
title: 다단계 API 테스트
---

## 개요

다단계 API 테스트를 사용하면 여러 [HTTP 요청][1]을 한 번에 연결하여 언제 어디서나 주요 서비스에 대한 정교한 여정을 사전에 모니터링하고 보장할 수 있습니다. 서비스에 대한 단일 요청을 수행하려면 [API 테스트][2]를 활용하세요.

다음을 수행할 수 있습니다.

* 인증이 필요한 API 엔드포인트에서 HTTP 요청을 실행합니다(예: 토큰을 통한 인증).
* API 수준에서 주요 비즈니스 트랜잭션 모니터링
* 엔드투엔드 모바일 애플리케이션 여정 시뮬레이션

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="다단계 API 테스트의 여러 테스트 단계" style="width:90%;" >}}

서비스 중 하나가 더 느리게 응답하거나 예상치 못한 방식으로 응답하기 시작하면(예: 예상치 못한 응답 본문 또는 상태 코드), 테스트에서 [**팀에 알림**][3], [**CI 파이프라인 차단**][4], 또는 [**결함 배포 롤백**][4]을 할 수도 있습니다.

다단계 API 테스트는 Datadog [관리되는 위치](#select-locations) 및 [프라이빗 위치][5]에서 실행할 수 있으므로 외부 및 내부 시스템을 모두 **완전하게 커버**할 수 있습니다.

## 설정

### 테스트에 이름 및 태그 지정

1. 다단계 API 테스트에 이름을 지정하세요.
2. 다단계 API 테스트에 `env` 및 기타 태그를 추가합니다. 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing page][6]에서 Synthetic 테스트를 필터링할 수 있습니다.

### 위치 선택

다단계 API 테스트의 **Locations**를 선택합니다. 다단계 API 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하는 선호도에 따라 관리되는 위치 및 [프라이빗 위치][5]에서 모두 실행할 수 있습니다.

{{% managed-locations %}} 

### 단계 정의

HTTP 요청 단계를 생성하려면 **Create Your First Step**을 클릭합니다.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Multistep API 테스트 요청 생성" style="width:90%;" >}}

기본적으로 테스트 단계는 최대 10개까지 생성할 수 있습니다. 이 제한을 늘리려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.

#### 요청 정의

1. 단계에 **이름을 지정하세요**.
2. **HTTP Method**를 선택하고 쿼리에 대한 **URL**을 지정하세요. 가능한 메서드는: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, `OPTIONS`입니다. `http` 및  `https` URL 모두 지원됩니다.
3. **고급 옵션**을 통해 HTTP 요청을 강화하세요 (선택 사항).

   {{< tabs >}}

   {{% tab "요청 옵션" %}}

   * **Follow redirects**: 요청을 수행할 때 HTTP 테스트가 최대 10개의 리디렉션을 따르도록 하려면 선택합니다.
   * **Ignore server certificate error*: SSL 인증서의 유효성을 검사할 때 오류가 발생하더라도 연결을 통해 HTTP 테스트를 계속하려면 선택하세요.
   * **Request headers**: HTTP 요청에 추가할 헤더를 정의합니다. 기본 헤더(예: `user-agent` 헤더)를 재정의할 수도 있습니다.
   * **Cookies**: HTTP 요청에 추가할 쿠키를 정의합니다. `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` 형식을 사용하여 여러 쿠키를 설정합니다.

   {{% /tab %}}

   {{% tab "인증" %}}

   * **Client certificate**: 클라이언트 인증서 및 연결된 개인 키를 업로드하여 mTLS를 통해 인증합니다.
   * **HTTP Basic Auth**: HTTP 기본 인증 자격 증명을 추가합니다.
   * **Digest Auth**: Digest 인증 자격 증명을 추가합니다.
   * **NTLM**: NTLM 인증 자격 증명을 추가합니다. NTLMv2와 NTLMv1을 모두 지원합니다.
   * **AWS Signature v4**: 액세스 키 ID와 비밀 액세스 키를 입력합니다. Datadog이 요청에 대한 서명을 생성합니다. 이 옵션은 SigV4의 기본 구현을 사용합니다. AWS S3와 같은 특정 서명은 기본적으로 지원되지 않습니다.
   AWS S3 버킷에 대한 "Single Chunk" 전송 요청의 경우, 요청의 sha256 인코딩된 본문을 포함하는 `x-amz-content-sha256`을 헤더로 추가합니다(본문이 비어 있는 경우: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: 클라이언트 자격 증명 또는 리소스 소유자 비밀번호 부여 중에서 선택하고 액세스 토큰 URL을 입력합니다. 선택에 따라 클라이언트 ID와 비밀번호 또는 사용자 이름과 비밀번호를 입력합니다. 드롭다운 메뉴에서 API 토큰을 기본 인증 헤더로 보낼지, 아니면 본문에 클라이언트 자격 증명을 보낼지 옵션을 선택합니다. 선택 사항으로 대상, 리소스 및 범위와 같은 추가 정보를 제공할 수 있습니다(**Resource Owner Password**를 선택한 경우 클라이언트 ID 및 비밀번호도 함께).

   {{% /tab %}}

   {{% tab "쿼리 파라미터" %}}

   * **Encode parameters**: 인코딩이 필요한 쿼리 파라미터의 이름과 값을 추가합니다.

   {{% /tab %}}

   {{% tab "요청 본문" %}}

   * **Body type**: HTTP 요청에 추가하려는 요청 본문 유형(`text/plain`, `application/json`,`text/xml` ,`text/html` ,`application/x-www-form-urlencoded`, `GraphQL` 또는 `None`)을 선택합니다.
   * **Request body**: HTTP 요청 본문의 내용을 추가합니다. 요청 본문의 최대 크기는 50KB로 제한됩니다.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: HTTP 요청이 통과해야 하는 프록시의 URL을 지정합니다(`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header**: 프록시에 대한 HTTP 요청에 포함할 헤더를 추가합니다.

   {{% /tab %}}

   {{% tab "Privacy" %}}

   * **Do not save response body**: 런타임에 응답 본문이 저장되지 않도록 하려면 이 옵션을 선택합니다. 이 옵션은 테스트 결과에 민감한 데이터가 표시되지 않도록 하는 데 유용하지만, 장애 문제 해결을 더 어렵게 만들 수 있습니다. 보안 권장 사항에 대한 자세한 내용은 [Synthetic 모니터링 데이터 보안][1]을 참조하세요.

[1]: /ko/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}

**Test URL**을 클릭하여 설정 요청을 시도합니다. 응답 미리보기가 나타납니다.

{{< img src="synthetics/api_tests/ms_define_request.png" alt="다단계 API 테스트에 대한 요청 정의" style="width:90%;" >}}

#### 어설션 추가

어설션은 예상되는 테스트 결과를 정의합니다. **Test URL**을 클릭하면 , `response time`, `status code`, `header`, `content-type`에 있는 기본 어설션이 획득한 응답에 따라 추가됩니다. 어설션은 다단계 API 테스트에서 선택 사항입니다.

| 유형          | 연산자                                                                                               | 값 유형                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 본문          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][7], [`xpath`][8] | _String_ <br> _[Regex][9]_ <br> _String_, _[Regex][9]_ |
| 헤더        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][9]_                                      |
| 응답 시간 | `is less than`                                                                                         | _정수 (ms)_                                                  |
| 상태 코드   | `is`, `is not`                                                                                         | _정수_                                                      |

HTTP 테스트는 다음 `content-encoding` 헤더가 있는 본문의 압축을 풀 수 있습니다: `br`, `deflate`, `gzip`, `identity`.

- 테스트에 응답 본문에 대한 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

- 테스트에 응답 본문에 대한 어설션이 포함되어 있고 제한 시간에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

{{< img src="synthetics/api_tests/ms_assertions.png" alt="다단계 API 테스트의 성공 또는 실패에 대한 어설션 정의" style="width:90%;" >}}

**New Assertion**을 클릭하거나 응답 미리보기를 클릭하여 단계당 최대 20개의 어설션을 생성할 수 있습니다.

#### 실행 파라미터 추가

**Continue with test if this step fails**를 클릭하여 단계 실패 후 테스트가 다음 단계로 넘어갈 수 있도록 합니다. 이렇게 하면 테스트가 스스로 정리할 수 있습니다. 예를 들어, 테스트가 리소스를 만들고 해당 리소스에 대해 여러 가지 작업을 수행한 후 해당 리소스를 삭제하는 것으로 끝낼 수 있습니다.

중간 단계 중 하나가 실패하는 경우, 테스트가 끝날 때 리소스가 삭제되고 오탐이 생성되지 않도록 모든 중간 단계에서 이 설정을 사용하도록 설정할 수 있습니다.

엔드포인트가 예상대로 응답하지 않으면 테스트에서 알림을 생성합니다. 테스트 결과가 실패한 경우 테스트는 Y 밀리초후 X회 재시도를 트리거할 수 있습니다. 알림 민감도에 맞게 재시도 간격을 사용자 지정할 수 있습니다.

#### 응답에서 변수 추출

선택 사항으로 응답 헤더 또는 본문을 구문 분석하여 HTTP 요청의 응답에서 변수를 추출합니다. 변수 값은 HTTP 요청 단계가 실행될 때마다 업데이트됩니다.

변수에 대한 파싱을 시작하려면, **Extract a variable from response content**를 클릭하세요:

1. **Variable Name**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있으며 3자 이상이어야 합니다.
2. 응답 헤더에서 변수를 추출할지, 응답 본문에서 추출할지 결정합니다.

   * **응답 헤더**에서 값 추출: HTTP 요청의 전체 응답 헤더를 변수 값으로 사용하거나 [`regex`][9]로 구문 분석합니다.
   * **응답 본문**에서 값 추출: HTTP 요청의 전체 응답 본문을 변수 값으로 사용하거나  [`regex`][9], [`JSONPath`][7] 또는 [`XPath`][8]를 사용하여 구문 분석합니다.

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="다단계 API 테스트의 HTTP 요청에서 변수 추출하기" style="width:90%;" >}}

테스트 단계당 최대 10개의 변수를 추출할 수 있습니다. 생성된 변수는 다단계 API 테스트의 다음 단계에서 사용할 수 있습니다. 자세한 내용은 [변수 사용](#use-variables)을 참조하세요.

### 테스트 빈도 지정

다단계 API 테스트는 다음을 실행할 수 있습니다.

* **일정에 따라** 사용자가 가장 중요한 엔드포인트에 항상 액세스할 수 있도록 보장합니다. Datadog이 다단계 API 테스트를 실행할 빈도를 선택하세요.
* [**CI/CD 파이프라인 내에**][4] 결함이 있는 코드가 고객 경험에 영향을 미칠지에 대한 염려 없이 출시를 시작할 수 있습니다.
* **온디맨드**로 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 변수 추출

로컬 변수를 만드는 것 외에도 다단계 API 테스트의 [모든 단계에서 변수를 추출하고](#extract-variables-from-the-response), [후속 단계에서 값을 다시 삽입할 수 있습니다](#use-variables).

### 변수 사용

[`Settings`에 정의된 글로벌 변수][14] 및 [로컬로 정의된 변수](#create-local-variables)를 HTTP 테스트의 URL, 고급 옵션 및 어설션에 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="다단계 API 테스트에서 변수 사용" video="true" width="90%" >}}

## 테스트 실패

단계가 하나 또는 여러 개의 어설션을 충족하지 않거나 단계의 요청이 조기에 실패한 경우 테스트가 `FAILED`로 간주됩니다. 어떤 경우에는 엔드포인트에 대한 어설션을 테스트하지 못하고 테스트가 실제로 실패할 수 있으며, 이러한 이유는 다음과 같습니다:

`CONNREFUSED`
: 대상 머신이 적극적으로 거부했기 때문에 연결할 수 없습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹서버가 응답하는 동안 오류가 발생하거나 충돌이 발생하거나 웹서버의 연결이 끊어졌기 때문일 수 있습니다.

`DNS`
: 테스트 URL에 대한 DNS 항목을 찾을 수 없습니다. 가능한 원인으로는 테스트 URL이 잘못 구성되었거나 DNS 항목의 구성이 잘못되었을 수 있습니다.

`INVALID_REQUEST` 
: 테스트 구성이 유효하지 않습니다(예: URL에 오타가 있습니다).

`SSL`
: SSL 연결을 수행할 수 없습니다. [자세한 내용은 전용 오류 페이지를 참조하세요][15].

`TIMEOUT`
: 요청을 적절한 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`이 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`는 요청 기간이 테스트에 정의된 시간 제한에 도달했음을 나타냅니다(기본값은 60초로 설정됨).
  각 요청에 대해 완료된 요청 단계만 네트워크 폭포에 표시됩니다. 예를 들어, `Total response time`만 표시되는 경우 DNS 확인 중에 시간 초과가 발생했습니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 요청 및 어설션 지속 시간이 최대 지속 시간(60.5초)에 도달했음을 나타냅니다.

`MALFORMED_RESPONSE` 
: 원격 서버가 HTTP 사양을 준수하지 않는 페이로드로 응답했습니다.

## 권한 허용

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][16]이 있는 사용자만 Synthetic 다단계 API 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic 다단계 API 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면 사용자를 이 두 가지 [기본 역할][16] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][17]을 사용하는 경우 Synthetic 모니터링에 대한 `synthetics_read` 및 `synthetics_write` 권한이 포함된 커스텀 역할에 사용자를 추가합니다.

### 액세스 제한 

계정에서 [커스텀 역할][18]을 사용하는 고객은 액세스 제한을 사용할 수 있습니다.

조직의 역할에 따라 다단계 API 테스트에 대한 액세스를 제한할 수 있습니다. 다단계 API 테스트를 만들 때 사용자 외에 어떤 역할이 테스트를 읽고 쓸 수 있는지 선택하세요.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests
[2]: /ko/synthetics/api_tests/
[3]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[4]: /ko/synthetics/cicd_integrations
[5]: /ko/synthetics/private_locations
[6]: /ko/synthetics/search/#search-for-tests
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /ko/monitors/notify/?tab=is_alert#notify-your-team
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[13]: /ko/synthetics/guide/synthetic-test-monitors
[14]: /ko/synthetics/settings/#global-variables
[15]: /ko/synthetics/api_tests/errors/#ssl-errors
[16]: /ko/account_management/rbac/
[17]: /ko/account_management/rbac#custom-roles
[18]: /ko/account_management/rbac/#create-a-custom-role
