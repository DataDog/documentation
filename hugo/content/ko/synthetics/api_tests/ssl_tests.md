---
algolia:
  category: 설명서
  rank: 70
  subcategory: 신서틱(Synthetic) API 테스트
  tags:
  - ssl
  - ssl test
  - ssl tests
aliases:
- /ko/synthetics/ssl_test
- /ko/synthetics/ssl_check
description: 전 세계 어디에서나 SSL 인증서를 모니터링하세요
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 호스트에서 SSL 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터에 대해 알아보기
title: SSL 테스트
---

## 개요

SSL 테스트를 통해 SSL/TLS 인증서의 유효성 및 만료 여부를 사전에 모니터링하여 주요 서비스와 사용자 간의 안전한 연결을 보장할 수 있습니다. 인증서가 곧 만료되거나 손상될 경우, Datadog은 오류에 대한 세부 정보가 포함된 알림을 전송하여 문제의 근본 원인을 신속하게 파악하고 수정할 수 있도록 합니다.

SSL 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 기본 설정에 따라 [관리형](#select-locations) 및 [프라이빗 위치][1]에서 모두 실행할 수 있습니다. SSL 테스트는 일정에 따라, 주문형으로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 설정

`SSL` 테스트 생성을 선택한 후 테스트 요청을 정의합니다.

### 요청 정의하기

1. 테스트를 실행할 **Host** 및 **Port**를 지정합니다. 기본 SSL 포트는 `443`입니다.
2. 테스트에 **고급 옵션**(선택 사항)을 추가합니다.
   * **Accept self-signed certificates**: 자체 서명된 인증서와 관련된 모든 서버 오류를 우회합니다.
   * **Fail on revoked certificate in stapled OCSP**: 인증서가 OCSP 스테이플링에 의해 해지된 것으로 레이블이 지정되면 테스트에 실패합니다.
   * **타임아웃**: 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다(옵션).
   * **Server Name**: TLS 핸드셰이크를 시작할 서버를 지정하여 서버가 동일한 IP 주소 및 TCP 포트 번호에 대해 가능한 여러 인증서 중 하나를 제공할 수 있도록 합니다. 기본적으로 파라미터는 **Host** 값으로 채워집니다.
   * **클라이언트 인증서**: 클라이언트 인증서(`.crt`) 및 연결된 프라이빗 키(`.key`)를 `PEM` 형식으로 업로드하여 mTLS를 통해 인증합니다.

   `openssl` 라이브러리를 사용하여 인증서를 변환할 수 있습니다. 예를 들어, `PKCS12` 인증서를 `PEM` 형식의 비공개 키 및 인증서로 변환합니다.

   ```
   openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
   openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
   ```

3. SSL 테스트의 **이름**을 지정합니다.

4. SSL 테스트에 `env` **태그** 및 기타 태그를 추가합니다. 그런 다음 이러한 태그를 사용하여  [Synthetic Monitoring & Continuous Testing 페이지][3]에서 신서틱(Synthetic) 테스트를 필터링할 수 있습니다.

   {{< img src="synthetics/api_tests/ssl_test_config.png" alt="SSL 요청 정의" style="width:90%;" >}}

**URL 테스트**를 클릭하여 요청 설정을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.

### 어서션(표명) 정의하기

어설션은 예상되는 테스트 결과가 무엇인지 정의합니다. **Test URL**을 클릭하면 인증서 유효성, 만료 데이터, TLS 버전, `response time`에 대한 기본 어설션이 획득한 응답을 기반으로 추가됩니다. 테스트에서 모니터링할 어설션을 하나 이상 정의해야 합니다.

| 유형                  | 연산자                                                                               | 가치 유형                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| 인증           | `expires in more than`, `expires in less than`                                         | _정수(일수)_ |
| 속성              | `contains`, `does not contain`, `is`, `is not`, <br>`matches`, `does not match`        | _String_ <br> _[Regex][4]_ |
| 응다         | `is less than`                                                                         | _Integer (ms)_             |
| 최대 TLS 버전   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _소수_                  |
| 최소 TLS 버전   | `is more than`, `is more than or equal`                                                | _소수_                  |

**신규 어서션**을 클릭하거나 응답 미리보기를 클릭하여 API 테스트당 최대 20개의 어서션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="SSL 테스트의 성공 또는 실패에 대한 어설션 정의" style="width:90%;" >}}

어설션에서 `OR` 논리를 수행하려면 `matches regex` 또는 `does not match regex` 비교기를 사용하여 `(0|100)`와 같은 동일한 어설션 유형에 대해 여러 예상 값이 있는 정규식을 정의합니다. 속성 어설션 값이 0 또는 100이면 테스트 결과가 성공한 것입니다.

테스트에 응답 본문에 대한 어션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어서션이 포함되어 있고 제한 시간 제한에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택

SSL 테스트를 실행할 **Locations**를 선택합니다. SSL 테스트는 네트워크 외부 또는 내부의 인증서 모니터링에 대한 기본 설정에 따라 관리형 위치와 [프라이빗 위치][1] 모두에서 실행할 수 있습니다.

{{% managed-locations %}} 

### 테스트 빈도 지정

SSL 테스트는 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 실행합니다. 이를 통해 SSL/TLS 인증서가 항상 유효한지 확인하고 주요 서비스 사용자에게 보안 연결이 보장되도록 합니다. Datadog이 SSL 테스트를 실행할 빈도를 선택하세요.
* [** CI/CD 파이프라인 내**][2].
* **온디맨드**로 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### 변수 사용

URL, 고급 옵션 및 SSL 테스트의 어설션에서 [**Settings** 페이지에 정의된 전역 변수][9]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`를 입력하세요.

## 테스트 실패

하나 이상의 어서션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라서는 엔드포인트 어서션 테스트 없이 해당 테스트가 실패할 수 있습니다.

다음과 같은 이유가 있습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹 서버가 응답 도중 오류 또는 충돌이 발생하였거나 웹 서버의 연결이 끊어졌기 때문일 수 있습니다.

`DNS`
: 테스트 URL에 대한 DNS 엔트리를 찾을 수 없습니다. 가능한 원인으로는 테스트 URL이 잘못 설정되었거나 DNS 엔티티 설정이 잘못되었기 때문일 수 있습니다.

`INVALID_REQUEST` 
: 테스트 구성이 유효하지 않습니다(예: URL에 오타가 있습니다).

`SSL`
: SSL 연결을 수행할 수 없습니다. [자세한 내용은 전용 오류 페이지를 참조하세요][10].

`TIMEOUT`
: 요청을 적절한 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`이 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.`는 요청 기간이 테스트에 정의된 시간 제한에 도달했음을 나타냅니다(기본값은 60초로 설정됨).
  각 요청에 대해 완료된 요청 단계만 네트워크 폭포에 표시됩니다. 예를 들어, `Total response time`만 표시되는 경우 DNS 확인 중에 시간 초과가 발생했습니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 요청 및 어서션 실행 시간이 최대 실행 시간(60.5초)에 도달했음을 나타냅니다.

## 권한 허용

기본적으로 [Datadog Admin 및 Datadog Standard 역할][11]을 가진 사용자만 신서틱(Synthetic) SSL 테스트를 생성, 편집 및 삭제할 수 있습니다. 신서틱(Synthetic) SSL 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면 사용자를 두 가지 [기본 역할][11] 중 하나로 업그레이드하세요.

[사용자 정의 역할 기능][12]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

### 액세스 제한 

계정에서 [사용자 정의 역할][10]을 사용하는 고객은 액세스 제한을 사용할 수 있습니다.

조직 내 역할에 따라 SSL 테스트의 액세스를 제한할 수 있습니다. SSL 테스트를 생성할 때 사용자 외에 어떤 역할이 테스트를 읽고 쓸 수 있는지 선택합니다.

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ko/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ko/synthetics/guide/synthetic-test-monitors
[9]: /ko/synthetics/settings/#global-variables
[10]: /ko/synthetics/api_tests/errors/#ssl-errors
[11]: /ko/account_management/rbac/
[12]: /ko/account_management/rbac#custom-roles
[13]: /ko/account_management/rbac/#create-a-custom-role