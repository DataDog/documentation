---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - tcp
  - tcp test
  - tcp tests
aliases:
- /ko/synthetics/tcp_test
- /ko/synthetics/tcp_check
description: 호스트에서 TCP 연결 시뮬레이션
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog Synthetic Monitoring 소개
- link: /getting_started/synthetics/api_test
  tag: 문서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 문서
  text: 내부 호스트에서 TCP 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 문서
  text: Synthetic 테스트 모니터링에 대해 알아보기
title: TCP 테스트
---
## 개요 {#overview}

TCP 테스트를 사용하면 지정된 호스트의 포트에서 저수준 TCP 연결이 설정될 수 있는지 여부를 모니터링하여 `SSH`(22), `SMTP`(25), `DNS`(53), VPN over `HTTPS`(443) 및 기타 포트에서 실행되는 사용자 지정 서비스와 같은 여러 주요 서비스의 가용성을 보장할 수 있습니다. 내장된 응답 시간 데이터를 통해 네트워크 애플리케이션의 성능을 추적하고, 예기치 않은 속도 저하가 발생할 경우 알림을 받을 수 있습니다.

TCP 테스트는 네트워크 외부 또는 내부에서 테스트를 실행하려는 사용자의 선호도에 따라 [관리형](#select-locations) 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다. TCP 테스트는 일정에 따라, 온디맨드로 또는 [CI/CD 파이프라인][2] 내에서 직접 실행할 수 있습니다.

## 구성 {#configuration}

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

- **템플릿에서 테스트 생성하기**:
   
     1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 {{< ui >}}View Template{{< /ui >}}을 클릭합니다. 이렇게 하면 {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}}, {{< ui >}}Monitor Settings{{< /ui >}} 등 사전에 채워진 구성 정보가 표시되는 사이드 패널이 열립니다.
     2. {{< ui >}}\+ Create Test{{< /ui >}}를 클릭하여 {{< ui >}}Define Request{{< /ui >}}페이지를 열면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
     3. {{< ui >}}Save Details{{< /ui >}}를 클릭하여 API 테스트를 제출합니다.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿이 표시된 Synthetics API 테스트 랜딩 페이지의 동영상" video="true" >}}

- **처음부터 테스트 빌드하기**:

    1. 테스트를 처음부터 빌드하려면 {{< ui >}}\+ Start from scratch{{< /ui >}} 템플릿을 클릭한 다음 `TCP` 요청 유형을 선택합니다.
    1. 테스트를 실행할 {{< ui >}}Host{{< /ui >}} 및 {{< ui >}}Port{{< /ui >}}를 지정합니다.
    1. {{< ui >}}Track number of network hops (TTL){{< /ui >}} 사용 여부를 결정합니다. 이 옵션을 사용하면 네트워크 홉의 개수를 어설션하고 테스트 결과에서 TCP Traceroute에 액세스할 수 있습니다.
    1. 테스트 시간 초과로 간주하기까지의 시간을 초단위로 지정합니다(선택 사항).
    1. TCP 테스트의 {{< ui >}}Name{{< /ui >}}을 지정합니다.
    1. TCP 테스트에 환경 {{< ui >}}Tags{{< /ui >}} 및 기타 태그를 추가합니다. 그런 다음 이러한 태그를 사용하여 [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} 페이지][3]에서 Synthetic 테스트를 필터링할 수 있습니다. 
    1. {{< ui >}}Test Host{{< /ui >}}를 클릭하여 요청 구성을 테스트합니다. 화면 오른쪽에 응답 미리보기가 표시됩니다.<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="TCP 연결 정의" style="width:90%;" >}}

    8. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.


### 스니펫 {#snippets}

{{% synthetics-api-tests-snippets %}}

### 어설션 정의 {#define-assertions}

어설션은 예상되는 테스트 결과가 무엇인지 정의합니다. {{< ui >}}Test URL{{< /ui >}}을 클릭하면 `response time`에 대한 기본 어설션이 추가됩니다. 모니터링할 테스트에 대해 최소한 하나의 어설션을 정의해야 합니다.

| 유형          | 연산자                                                                | 값 유형     |
|---------------|-------------------------------------------------------------------------|----------------|
| 응답 시간 | `is less than`                                                          | _정수(ms)_ |
| 네트워크 홉    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _정수_        |
| 연결 | `is`                                                          | `established`, `refused`, `timeout` |

{{< ui >}}New Assertion{{< /ui >}}을 클릭하거나 응답 미리보기를 직접 클릭하여 API 테스트당 최대 20개의 어설션을 생성할 수 있습니다.

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="TCP 테스트의 성공 또는 실패를 판단할 어설션 정의하기" style="width:90%;" >}}

테스트에 응답 본문에 대한 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

테스트에 응답 본문에 대한 어설션이 포함되어 있고 시간 초과 제한에 도달할 경우, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

### 위치 선택 {#select-locations}

TCP 테스트를 실행할 {{< ui >}}Locations{{< /ui >}}를 선택합니다. TCP 테스트는 네트워크 외부 또는 내부에서 연결을 시작하려는 사용자의 선호도에 따라 관리형 위치와 [프라이빗 위치][1] 모두에서 실행될 수 있습니다.

{{% managed-locations %}}

### 테스트 주기 지정 {#specify-test-frequency}

TCP 테스트를 다음과 같이 실행할 수 있습니다.

* **일정에 따라** 가장 중요한 서비스를 사용자가 항상 액세스할 수 있도록 합니다. Datadog이 TCP 테스트를 실행할 빈도를 선택합니다.
* [**CI/CD 파이프라인 내**][2].
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 변수 사용 {#use-variables}

TCP 테스트의 URL, 고급 옵션 및 어설션에서 [{{< ui >}}Settings{{< /ui >}} 페이지에 정의된 전역 변수][8]를 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`을 입력하세요.

## 테스트 실패 {#test-failure}

하나 이상의 어설션을 충족하지 않거나 요청이 초기에 실패한 경우 테스트는 `FAILED`로 간주됩니다. 경우에 따라 엔드포인트에 대해 어설션을 테스트하지 않고도 테스트가 실패할 수 있습니다.

오류 코드의 전체 목록은 [API 테스트 오류][11]를 참조하세요.

## 권한 {#permissions}

기본적으로, [Datadog Admin 및 Datadog Standard 역할][9]을 가진 사용자만 Synthetic TCP 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic TCP 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자를 2가지 [기본 역할][9] 중 하나로 업그레이드하세요.

[사용자 지정 역할 기능][10]을 사용하는 경우, `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/private_locations
[2]: /ko/synthetics/cicd_integrations
[3]: /ko/synthetics/search/#search
[4]: /ko/monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /ko/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /ko/synthetics/guide/synthetic-test-monitors
[8]: /ko/synthetics/settings/#global-variables
[9]: /ko/account_management/rbac/
[10]: /ko/account_management/rbac#custom-roles
[11]: /ko/synthetics/api_tests/errors/#tcp-errors