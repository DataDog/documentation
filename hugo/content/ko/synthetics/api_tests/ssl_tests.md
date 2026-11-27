---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - ssl
  - ssl test
  - ssl tests
aliases:
- /ko/synthetics/ssl_test
- /ko/synthetics/ssl_check
description: 전 세계 여러 위치에서 SSL 인증서를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 호스트에서 SSL 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터링에 대해 알아보기
title: SSL 테스트
---
## 개요 {#overview}

SSL 테스트를 사용하면 SSL/TLS 인증서의 유효성과 만료를 사전에 모니터링하여 주요 서비스와 사용자 간의 보안 연결을 보장할 수 있습니다. 인증서가 곧 만료되거나 보안이 침해된 경우 Datadog은 실패에 대한 세부 정보가 포함된 경보를 보내 문제의 근본 원인을 파악하고 해결할 수 있도록 합니다.

네트워크 외부 또는 내부에서 테스트를 실행하려는 방식에 따라 SSL 테스트를 [관리형](#select-locations) 위치와 [프라이빗 위치][1] 모두에서 실행할 수 있습니다. SSL 테스트는 일정에 따라, 온디맨드로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 구성 {#configuration}

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다

- **템플릿에서 테스트 생성하기**:
   
     1. 미리 입력된 템플릿 중 하나 위로 마우스를 가져가고 {{< ui >}}View Template{{< /ui >}}를 클릭합니다. 테스트 세부 정보, 요청 세부 정보, 어설션, 경보 조건 및 모니터링 설정이 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
     2. {{< ui >}}\+ Create Test{{< /ui >}}를 클릭하여 {{< ui >}}Define Request{{< /ui >}} 페이지를 열면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
     3. {{< ui >}}Save Details{{< /ui >}}를 클릭하여 API 테스트를 제출합니다.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿이 표시된 Synthetics API 테스트 랜딩 페이지의 동영상" video="true" >}}

- **처음부터 테스트 빌드하기**:

   1. 테스트를 처음부터 빌드하려면 {{< ui >}}\+ Start from scratch{{< /ui >}} 템플릿을 클릭한 다음 SSL 요청 유형을 선택하세요.
   1. 테스트를 실행할 {{< ui >}}Host{{< /ui >}} 및 {{< ui >}}Port{{< /ui >}}를 지정합니다. 기본 SSL 포트는 `443`입니다.
   1. 테스트에 {{< ui >}}Advanced Options{{< /ui >}} (선택 사항)를 추가하세요.
      * {{< ui >}}Accept self-signed certificates{{< /ui >}}: 자체 서명된 인증서와 관련된 서버 오류를 무시합니다.
      * {{< ui >}}Fail on revoked certificate in stapled OCSP{{< /ui >}}: OCSP 스테이플링을 통해 인증서가 폐지된 것으로 표시되면 테스트가 실패합니다.
      * {{< ui >}}Fail on incomplete certificate chain{{< /ui >}}: AIA 가져오기를 비활성화하여 서버의 인증서 체인에서 중간 인증서가 누락된 경우 테스트가 실패하도록 합니다.
      * {{< ui >}}Timeout{{< /ui >}}: 테스트 시간 초과로 간주하기까지의 시간을 초 단위로 지정합니다.
      * {{< ui >}}Server Name{{< /ui >}}: TLS 핸드셰이크를 시작할 서버를 지정하여 서버가 동일한 IP 주소 및 TCP 포트 번호에서 여러 개의 가능한 인증서 중 하나를 제시할 수 있도록 합니다. 기본적으로 이 매개변수는 {{< ui >}}Host{{< /ui >}} 값으로 채워집니다.
      * {{< ui >}}Client certificate{{< /ui >}}: 클라이언트 인증서(`.crt`) 및 연결된 개인 키(`.key`)를 `PEM` 형식으로 업로드하여 mTLS를 통해 인증합니다. 
   
      인증서를 변환하기 위해 `openssl` 라이브러리를 사용할 수 있습니다. 예를 들어 `PKCS12` 인증서를 `PEM` 형식의 개인 키 및 인증서로 변환합니다.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   1. {{< ui >}}Name{{< /ui >}} SSL 테스트.

   1. SSL 테스트에 Environment {{< ui >}}Tags{{< /ui >}}와 다른 태그를 추가하세요. 그런 다음 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing 페이지][3]에서 Synthetic 테스트를 필터링할 수 있습니다.
   1. {{< ui >}}Test Certificate{{< /ui >}}를 클릭하여 요청 구성을 테스트하세요. 화면 오른쪽에 응답 미리보기가 표시됩니다.<br /><br>

      {{< img src="synthetics/api_tests/synthetics_ssl_test_cert.png" alt="SSL 요청 정의" style="width:90%;" >}}

   1. {{< ui >}}Create Test{{< /ui >}}를 클릭하여 API 테스트를 제출하세요.

   

### 스니펫 {#snippets}

{{% synthetics-api-tests-snippets %}}

### 어설션 정의 {#define-assertions}

어설션은 예상되는 테스트 결과가 무엇인지 정의합니다. {{< ui >}}Test URL{{< /ui >}} 클릭 후, 받은 응답을 기반으로 인증서 유효성, 만료 정보, TLS 버전 및 `response time`에 대한 기본 어설션이 추가됩니다. 모니터링할 테스트에 대해 최소한 하나의 어설션을 정의해야 합니다.

| 유형                  | 연산자                                                                               | 값 유형                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| 인증서           | `expires in more than`, `expires in less than`                                         | _정수(일수)_ |
| 속성              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | _문자열_ <br> _[Regex][4]_ |
| 응답 시간         | `is less than`                                                                         | _정수(ms)_             |
| 최대 TLS 버전   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _10진수_                  |
| 최소 TLS 버전   | `is more than`, `is more than or equal`                                                | _10진수_                  |

SSL 테스트는 TLS 1.2 또는 TLS 1.3으로 연결되므로 서버는 이 버전 중 하나 이상을 지원해야 합니다. `minimum TLS version` 어설션은 서버가 허용하는 버전 중 TLS 1.2와 TLS 1.3 가운데 더 낮은 버전을 확인합니다. SSL 테스트는 TLS 1.0 또는 TLS 1.1을 테스트하지 않습니다.

{{< ui >}}New Assertion{{< /ui >}}을 클릭하거나 응답 미리보기를 직접 클릭하여 API 테스트당 최대 20개의 어설션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="SSL 테스트의 성공 또는 실패를 판단할 어설션 정의" style="width:90%;" >}}

어설션에서 `OR` 논리를 수행하려면 `matches regex` 또는 `does not match regex` 비교 연산자를 사용하여 `(0|100)`와 같이 동일한 어설션 유형의 여러 예상 값을 포함하는 정규식을 정의하세요. 속성 어설션의 값이 0 또는 100이면 테스트 결과가 성공입니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있고 시간 초과 제한에 도달할 경우, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택 {#select-locations}

SSL 테스트를 실행할 {{< ui >}}Locations{{< /ui >}}를 선택하세요. 네트워크 외부에서 인증서를 모니터링할지 내부에서 모니터링할지에 따라 SSL 테스트를 관리형 위치와 [프라이빗 위치][1]에서 모두 실행할 수 있습니다.

{{% managed-locations %}}

### 테스트 주기 지정 {#specify-test-frequency}

SSL 테스트는 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 실행하여 SSL/TLS 인증서가 항상 유효하고 주요 서비스 사용자에게 안전한 연결이 보장되도록 합니다. Datadog이 SSL 테스트를 실행할 빈도를 선택하세요.
* [**CI/CD 파이프라인 내**][2].
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 변수 사용 {#use-variables}

SSL 테스트의 URL, 고급 옵션 및 어설션에서 [{{< ui >}}Settings{{< /ui >}} 페이지에 정의된 전역 변수][9]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`을 입력하세요.

## 테스트 실패 {#test-failure}

하나 이상의 어설션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라 엔드포인트에 대해 어설션을 테스트하지 않고도 테스트가 실패할 수 있습니다.

SSL 오류 코드의 전체 목록은 [API 테스트 오류][10]를 참조하세요.

## 권한 {#permissions}

기본적으로 [Datadog Admin 및 Datadog Standard 역할][11]을 가진 사용자만 Synthetic SSL 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic SSL 테스트의 생성, 편집 및 삭제 권한을 얻으려면 사용자 계정을 두 [기본 역할][11] 중 하나로 업그레이드하세요.

[사용자 지정 역할 기능][12]을 사용하는 경우 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 추가 자료 {#further-reading}

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
[10]: /ko/synthetics/api_tests/errors/
[11]: /ko/account_management/rbac/
[12]: /ko/account_management/rbac#custom-roles