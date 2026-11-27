---
description: 핵심 서비스의 복잡한 트랜잭션을 모니터링하려면 요청을 연결하세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: 블로그
  text: Datadog 다단계 API 테스트로 워크플로 모니터링
- link: /synthetics/guide/version_history/
  tag: 가이드
  text: Synthetic Monitoring 버전 기록
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에서 다단계 API 테스트 실행
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터링에 대해 알아보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 외부 사이트
  text: Terraform을 사용하여 Synthetic 다단계 API 테스트 생성 및 관리
- link: /synthetics/guide/export-tests-to-terraform
  tag: 가이드
  text: Synthetic API 테스트를 Terraform으로 내보내기
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: 학습 센터
  text: Synthetic Monitoring 및 브라우저 테스트 시작하기
title: 다단계 API 테스트
---
## 개요 {#overview}

다단계 API 테스트를 사용하면 여러 [API 테스트][1]를 한 번에 연결하여 핵심 서비스의 복잡한 사용자 여정이 언제 어디서나 이용 가능한지 사전에 모니터링하고 확인할 수 있습니다. 서비스에 단일 요청을 수행하려면 [API 테스트][1]를 사용하세요.

다음 작업을 수행할 수 있습니다.

* 인증이 필요한 API 엔드포인트에서 HTTP 요청 실행(예: 토큰을 통한 인증)
* API 수준에서 주요 비즈니스 트랜잭션 모니터링
* 엔드투엔드 모바일 애플리케이션 여정 시뮬레이션

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="다단계 API 테스트의 여러 테스트 단계" style="width:90%;" >}}

서비스 중 하나가 더 느리게 응답하거나 예상치 못한 방식(예: 예상치 못한 응답 본문 또는 상태 코드)으로 응답하기 시작하면, 테스트를 통해 [**팀에 경보를 보내거나**][2], [**CI 파이프라인을 차단하거나**][3], [**결함이 있는 배포를 롤백할 수도**][3] 있습니다.

다단계 API 테스트는 Datadog [관리형](#select-locations) 위치 및 [프라이빗 로케이션][4]에서 실행할 수 있으므로 외부 및 내부 시스템 모두에 대해 **완벽한 커버리지**를 제공합니다.

## 구성 {#configuration}

### 테스트 이름 지정 및 태그 지정 {#name-and-tag-your-test}

1. 다단계 API 테스트의 이름을 지정하세요.
2. 다단계 API 테스트에 `env` 및 기타 태그를 추가하세요. 이러한 태그를 사용하여 [Synthetic Monitoring & Continuous Testing 페이지][5]에서 Synthetic 테스트를 필터링할 수 있습니다.

### 위치 선택 {#select-locations}

다단계 API 테스트에 사용할 항목으로 {{< ui >}}Locations{{< /ui >}}을 선택하세요. 다단계 API 테스트는 네트워크 외부 또는 내부 중 어디에서 테스트를 실행할지에 따라 관리형 로케이션과 [프라이빗 로케이션][4] 모두에서 실행할 수 있습니다.

{{% managed-locations %}} 

### 단계 정의 {#define-steps}

API 요청 단계를 생성하려면 {{< ui >}}Create Your First Step{{< /ui >}}을 클릭하세요.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="다단계 API 테스트 요청 생성" style="width:90%;" >}}

기본적으로 최대 10개의 테스트 단계를 생성할 수 있습니다. 이 제한을 늘리려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.

#### 요청 정의 {#define-the-request}

단계의 1. **이름**을 지정하세요.
2. 요청 유형을 선택하세요.
   
   {{< tabs >}}
   {{% tab "HTTP" %}}

   HTTP 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [HTTP 테스트 문서][101]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   gRPC 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [gRPC 테스트 문서][102]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [102]: /synthetics/api_tests/grpc_tests/

   {{% /tab %}}

   {{% tab "SSL" %}}

   SSL 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [SSL 테스트 문서][103]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [103]: /synthetics/api_tests/ssl_tests/

   {{% /tab %}}

   {{% tab "DNS" %}}

   DNS 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [DNS 테스트 문서][104]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [104]: /synthetics/api_tests/dns_tests/

   {{% /tab %}}

   {{% tab "WebSocket" %}}

   WebSocket 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [WebSocket 테스트 문서][105]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [105]: /synthetics/api_tests/websocket_tests/

   {{% /tab %}}

   {{% tab "TCP" %}}

   TCP 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [TCP 테스트 문서][106]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [106]: /synthetics/api_tests/tcp_tests/

   {{% /tab %}}

   {{% tab "UDP" %}}

   UDP 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [UDP 테스트 문서][107]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [107]: /synthetics/api_tests/udp_tests/

   {{% /tab %}}

   {{% tab "ICMP" %}}

   ICMP 요청을 생성하고 동작 확인 또는 상태 확인을 위한 어설션을 추가하려면 [ICMP 테스트 문서][108]를 참조하세요. 다단계 API 테스트에서 어설션은 선택 사항입니다.

   [108]: /synthetics/api_tests/icmp_tests/

   {{% /tab %}}

   {{< /tabs >}}

### 실행 설정 추가 {#add-execution-settings}

{{< ui >}}Execution Settings{{< /ui >}} 아래에서 다음 옵션을 사용할 수 있습니다.

#### 단계 성공: {#step-success}

단계가 성공하면 테스트가 후속 단계를 진행하도록 하려면 {{< ui >}}If step succeeds, continue to next step{{< /ui >}}을 클릭하세요.  

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="단계 성공 시 다음 단계로 계속 진행하는 옵션을 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

단계가 성공적으로 완료된 후 테스트를 종료하려면 {{< ui >}}If step succeeds, exit test and mark it as passed{{< /ui >}}을 클릭하세요. 이렇게 하면 불필요한 단계가 실행되는 것을 방지하고 테스트가 실패로 표시되는 것을 피할 수 있습니다. 

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="단계 성공 시 종료 및 통과로 표시됨을 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

#### 단계 실패 {#step-failure}

단계 실패 후에도 후속 단계를 진행하려면 {{< ui >}}If step fails, continue to next step{{< /ui >}}을 클릭하세요. 이 옵션을 선택하면 {{< ui >}}and mark test as{{< /ui >}} 메뉴가 나타납니다. 이 단계가 실패할 때 테스트를 실패 처리하려면 {{< ui >}}failed{{< /ui >}} (기본값으로 선택됨)을 유지하세요. 이 단계의 실패가 테스트 실패로 이어지지 않도록 {{< ui >}}passed{{< /ui >}}을 선택하세요.

후속 단계를 실행해야 할 때 실패한 단계 이후에도 계속 진행하도록 설정하면 정리 작업에 유용할 수 있습니다. 예를 들어, 테스트가 리소스를 생성하고, 그 리소스에 대해 여러 작업을 수행한 다음, 삭제하는 경우가 있습니다.

중간 단계 중 하나가 실패하더라도 테스트 마지막에 리소스가 삭제되고 오탐이 발생하지 않도록 모든 중간 단계에서 이 설정을 활성화하세요.

엔드포인트가 예상대로 응답하지 않으면 테스트에서 경보를 생성합니다. 테스트 결과가 실패할 경우 Y ms 간격으로 최대 X번 재시도하도록 설정할 수 있습니다. 경보 민감도에 맞게 재시도 간격을 사용자 지정하세요.

{{< img src="synthetics/multistep_tests/step_failure.png" alt="단계 실패를 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

#### 응답에서 변수 추출 {#extract-variables-from-the-response}

선택적으로, API 요청의 응답 헤더나 본문을 구문 분석하여 응답에서 변수를 추출할 수 있습니다. 변수 값은 API 요청 단계가 실행될 때마다 업데이트됩니다.

변수 구문 분석을 시작하려면 {{< ui >}}Extract a variable from response content{{< /ui >}}을 클릭하세요.

1. {{< ui >}}Variable Name{{< /ui >}}을 입력합니다. 변수 이름에는 대문자, 숫자, 밑줄만 사용할 수 있으며 최소 3자여야 합니다.
2. 응답 헤더에서 변수를 추출할지 응답 본문에서 추출할지 결정하세요.

   * {{< ui >}}response header{{< /ui >}}에서 값 추출: API 요청의 전체 응답 헤더를 변수 값으로 사용하거나 [`regex`][8]로 구문 분석하세요.
   * {{< ui >}}response body{{< /ui >}}에서 값 추출: API 요청의 전체 응답 본문을 변수 값으로 사용하거나 [`regex`][8], [`JSONPath`][6] 또는 [`XPath`][7]로 구문 분석하세요.

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="다단계 API 테스트의 API 요청에서 변수 추출" style="width:90%;" >}}

테스트 단계당 최대 10개의 변수를 추출할 수 있습니다. 생성된 변수는 다단계 API 테스트의 다음 단계에서 사용할 수 있습니다. 자세한 내용은 [변수 사용](#use-variables)을 참조하세요.

### 테스트 주기 지정 {#specify-test-frequency}

다단계 API 테스트는 다음과 같이 실행할 수 있습니다:

* **일정에 따라** 실행하여 사용자가 가장 중요한 엔드포인트에 항상 액세스할 수 있도록 합니다. Datadog에서 다단계 API 테스트를 실행할 빈도를 선택하세요.
* [**CI/CD 파이프라인 내에서**][3] 결함이 있는 코드가 고객 경험에 영향을 미칠까 걱정하지 않고 코드를 배포할 수 있습니다.
* **온디맨드**로 실행하면 팀에 가장 적합한 시간에 테스트를 실행할 수 있습니다.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 변수 추출 {#extract-variables}

로컬 변수를 생성하는 것 외에도 다단계 API 테스트의 [어느 단계에서든 변수를 추출](#extract-variables-from-the-response)하고 [후속 단계에서 값을 다시 주입](#use-variables)할 수 있습니다.

### 변수 사용 {#use-variables}

[{{< ui >}}Settings{{< /ui >}}에 정의된 전역 변수][13]와 [로컬로 정의된 변수](#create-local-variables)를 API 테스트의 URL, 고급 옵션 및 어설션에서 사용할 수 있습니다.

변수 목록을 표시하려면 원하는 필드에 `{{`을 입력하세요.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="다단계 API 테스트에서 변수 사용" video="true" width="90%" >}}

### 하위 테스트 {#subtests}

다단계 API 테스트는 하위 테스트를 지원하므로 기존 다단계 API 테스트를 재사용하거나 단계를 재사용 가능한 구성 요소로 추출할 수 있습니다. 하위 테스트는 최대 2단계까지 중첩할 수 있습니다.

하위 테스트 단계에는 60초 제한이 있습니다. 대기 단계를 포함한 하위 테스트 단계의 총 소요 시간이 60초를 초과하면 하위 테스트 단계가 시간 초과됩니다. 이는 하위 테스트가 독립형 테스트로 통과하는 경우에도 발생할 수 있습니다.

- **재시도**: 하위 테스트 단계의 각 재시도에는 60초가 새로 부여됩니다.
- **Private Locations**: `apiRequestMaxTimeout` 설정은 이 제한을 밀리초 단위로 제어합니다(기본값: `60000`). Private Locations 구성 페이지의 [고급 구성][20] 섹션을 참조하세요.

60초 이상 걸리는 흐름을 실행하려면 여러 하위 테스트 단계로 나누거나 상위 테스트에 단계를 직접 추가하세요.

기존 다단계 API 테스트를 하위 테스트로 사용하려면 {{< ui >}}Subtest{{< /ui >}}을 클릭하고 {{< ui >}}From Existing Test{{< /ui >}} 탭으로 이동한 다음 드롭다운 메뉴에서 다단계 API 테스트를 선택하세요.

현재 다단계 API 테스트의 단계를 하위 테스트로 변환하려면 {{< ui >}}Extract From Steps{{< /ui >}} 탭을 클릭하고 추출할 기록된 단계를 선택한 다음 {{< ui >}}Convert to Subtest{{< /ui >}} 버튼을 클릭하세요.

{{< img src="synthetics/multistep_tests/subtest.png" alt="다단계 API 테스트에 하위 테스트를 추가하기 위한 UI" width="60%" >}}

다단계 API 테스트에서 하위 테스트 변수를 재정의하려면 상위 테스트에서 동일한 이름을 사용하여 정의하세요. 변수는 항상 할당된 첫 번째 값을 사용합니다.

하위 테스트를 독립적으로 실행할 필요가 없는 경우 일시 중지할 수 있습니다. 이 경우 다단계 API 테스트의 일부로 실행되지만 단독으로는 실행되지 않습니다.

**참고:** 다단계 API 테스트만 하위 테스트로 추가할 수 있습니다. [API 테스트][1]를 하위 테스트로 사용하는 것은 지원되지 않습니다.

## 테스트 실패 {#test-failure}

단계가 하나 이상의 어설션을 충족하지 못하거나 단계의 요청이 조기에 실패하면 테스트는 `FAILED` 상태로 간주됩니다. {{< ui >}}and mark test as{{< /ui >}} 옵션이 {{< ui >}}passed{{< /ui >}}로 설정된 경우 실패한 단계로 인해 테스트가 실패하지는 않습니다. 자세한 내용은 [단계 실패](#step-failure) 섹션을 참조하세요. 경우에 따라 테스트가 엔드포인트에 대한 어설션을 확인하기 전에 실패할 수 있습니다. 이유는 다음과 같습니다:

`CONNREFUSED`
: 대상 머신에서 연결을 거부하여 연결할 수 없습니다.

`CONNRESET`
: 원격 서버에 의해 연결이 갑자기 종료되었습니다. 가능한 원인으로는 웹 서버가 응답하는 동안 오류가 발생하거나 충돌이 발생한 경우, 또는 웹 서버의 연결이 끊긴 경우가 있습니다.

`DNS`
: 테스트 URL에 대한 DNS 항목을 찾을 수 없습니다. 가능한 원인으로는 잘못 구성된 테스트 URL이나 DNS 항목의 잘못된 구성이 있습니다.

`INVALID_REQUEST` 
: 테스트 구성이 유효하지 않습니다(예: URL의 오타).

`SSL`
: SSL 연결을 수행할 수 없습니다. [자세한 내용은 전용 오류 페이지를 참조하세요][14].

`TIMEOUT`
: 요청을 적정 시간 내에 완료할 수 없습니다. 두 가지 유형의 `TIMEOUT`가 발생할 수 있습니다:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` 표시는 요청 소요 시간이 테스트에 정의된 시간 제한(기본값은 60초)에 도달했음을 나타냅니다. 
  각 요청에 대해 완료된 단계만 네트워크 워터폴에 표시됩니다. 예를 들어 `Total response time`만 표시되는 경우, DNS 확인 중에 시간 제한이 발생한 것입니다.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`은 요청 및 어설션 소요 시간이 최대 소요 시간(30분)에 도달했음을 나타냅니다.

기타 API 테스트 오류 코드의 전체 목록은 [API 테스트 오류][19]를 참조하세요.

## 권한 {#permissions}

기본적으로 [Datadog Admin 및 Datadog Standard 역할][16] 중 하나를 가진 사용자만 Synthetic 다단계 API 테스트를 생성, 편집 및 삭제할 수 있습니다. Synthetic 다단계 API 테스트에 대한 생성, 편집 및 삭제 권한을 얻으려면 사용자에게 앞서 언급한 두 [기본 역할][16] 중 하나를 부여하세요.

[사용자 지정 역할 기능][17]을 사용하는 경우, Synthetic Monitoring에 대한 `synthetics_read` 및 `synthetics_write` 권한이 포함된 사용자 지정 역할에 사용자를 추가하세요.

### 액세스 제한 {#restrict-access}

[사용자 지정 역할][18]을 사용하는 고객은 액세스 제한 기능을 이용할 수 있습니다.

조직 내 역할을 기반으로 다단계 API 테스트에 대한 액세스를 제한할 수 있습니다. 다단계 API 테스트를 생성할 때 사용자 본인 외에 어떤 역할에 테스트 읽기 및 쓰기 권한을 부여할지 선택하세요. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="테스트에 대한 권한 설정" style="width:70%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/
[2]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[3]: /ko/synthetics/cicd_integrations
[4]: /ko/synthetics/private_locations
[5]: /ko/synthetics/search/#search-for-tests
[6]: https://restfulapi.net/json-jsonpath/
[7]: https://www.w3schools.com/xml/xpath_syntax.asp
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[9]: /ko/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[10]: http://daringfireball.net/projects/markdown/syntax
[11]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[12]: /ko/monitors/types/synthetic_monitoring/
[13]: /ko/synthetics/settings/#global-variables
[14]: /ko/synthetics/api_tests/errors/#ssl-errors
[15]: /ko/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[16]: /ko/account_management/rbac/
[17]: /ko/account_management/rbac#custom-roles
[18]: /ko/account_management/rbac/#create-a-custom-role
[19]: /ko/synthetics/api_tests/errors/
[20]: /ko/synthetics/platform/private_locations/configuration/#advanced-configuration