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
  tag: 외부 사이트
  text: Terraform으로 Synthetic 다단계 API 테스트 생성 및 관리
title: 다단계 API 테스트
---

## 개요

다단계 API 테스트를 사용하면 여러 [HTTP 요청][1] 또는 [gRPC 요청][20]을 한 번에 연결하여 선제적으로 모니터링하고 정교한 핵심 서비스가 언제 어디서나 사용될 수 있도록 보장할 수 있습니다. 서비스에 대한 단일 요청을 수행하려면 [API 테스트][2]를 사용하세요.

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

API 요청 단계를 만들려면 **첫 번째 단계 생성**을 클릭합니다.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Multistep API 테스트 요청 생성" style="width:90%;" >}}

기본적으로 테스트 단계는 최대 10개까지 생성할 수 있습니다. 이 제한을 늘리려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.

#### 요청 정의

1. 단계에 **이름을 지정하세요**.
2. 요청 유형으로 HTTP 또는 gRPC를 선택합니다.

   {{< tabs >}}
   {{% tab "HTTP" %}}

   HTTP 요청을 생성하고 어설션을 추가하려면 [HTTP 테스트 설명서][101]를 참조하세요. 어설션은 다단계 API 테스트에서 선택적입니다.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

gRPC 요청을 만들고 동작 점검 또는 상태 점검에 대한 어설션을 추가하려면 [gRPC 테스트 설명서][101]를 참조하세요. 어설션은 다단계 API 테스트에서 선택적입니다.

   [101]: /synthetics/api_tests/grpc_tests#define-the-request

   {{% /tab %}}
   {{< /tabs >}}

### 실행 설정 추가

**실행 설정**에서 다음 옵션을 사용할 수 있습니다.

#### 단계 성공:

**단계가 성공하면 다음 단계로 계속**을 클릭하여 단계 성공 후 다음 단계로 테스트를 진행합니다.  

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="단계가 성공하면 다음 단계로 계속을 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

단계를 성공적으로 완료한 후 테스트를 종료하려면 **단계가 성공하면 테스트를 종료하고 성공으로 표시**를 클릭합니다. 이렇게 하면 불필요한 단계가 실행되는 것을 방지하고 테스트가 실패로 표시되는 것을 방지할 수 있습니다. 

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="단계가 성공하면 테스트를 종료하고 성공으로 표시를 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

#### 단계 실패

단계 실패 후 후속 단계를 진행하려면 **단계 실패 시 다음 단계로 계속**을 클릭합니다. 이 기능은 후속 단계를 진행하려는 정리 작업에 유용할 수 있습니다. 예를 들어, 테스트에서 리소스를 만들고 해당 리소스에 대해 여러 작업을 수행한 다음 해당 리소스를 삭제하는 것으로 끝낼 수 있습니다. 

중간 단계 중 하나가 실패하는 경우, 테스트가 끝날 때 리소스가 삭제되고 오탐이 생성되지 않도록 모든 중간 단계에서 이 설정을 사용하도록 설정할 수 있습니다.

엔드포인트가 예상대로 응답하지 않으면 테스트에서 알림을 생성합니다. 테스트 결과가 실패한 경우 테스트는 Y 밀리초후 X회 재시도를 트리거할 수 있습니다. 알림 민감도에 맞게 재시도 간격을 사용자 지정할 수 있습니다.

{{< img src="synthetics/multistep_tests/step_failure.png" alt="단계 실패 시 다음 단계로 계속을 보여주는 실행 설정 스크린샷" style="width:90%;" >}}

#### 응답에서 변수 추출

선택 사항으로 API 요청의 응답에서 파싱 응답 헤더 또는 본문에서 변수를 추출합니다. 변수의 값은 API 요청 단계가 실행될 때마다 업데이트됩니다.

변수에 대한 파싱을 시작하려면, **응답 콘텐츠에서 변수 추출**을 클릭하세요:

1. **변수 이름**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있으며 세 글자 이상이어야 합니다.
2. 응답 헤더에서 변수를 추출할지, 응답 본문에서 추출할지 결정합니다.

   * **응답 헤더**에서 값 추출: API 요청의 전체 응답 헤더를 변수 값으로 사용하거나 [`regex`][9]로 파싱합니다.
   * **응답 본문**에서 값 추출: API 요청의 전체 응답 본문을 변수 값으로 사용하거나 [`regex`][9], [`JSONPath`][7] 또는 [`XPath`][8]로 파싱합니다.

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="다단계 API 테스트에서 API 요청의 변수 추출" style="width:90%;" >}}

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

`Settings`][14]에 정의된 [글로벌 변수]와 [로컬 정의된 변수](#create-local-variables)를 API 테스트의 URL, 고급 옵션 및 어설션에 사용할 수 있습니다.

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
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.`는 요청 및 어설션 기간이 최대 기간(30분)에 도달했음을 나타냅니다.

HTTP 단계의 경우 [일반적인 HTTP 단계 실패][15]를 참조하세요. gRPC 단계의 경우 [일반적인 gRPC 단계 실패][16]를 참조하세요.

## 권한

기본적으로 [Datadog 관리자 및 Datadog 표준 역할][17]을 가진 사용자만 신서틱(Synthetic) 멀티스텝 API 테스트를 만들고, 편집하고, 삭제할 수 있습니다. 신서틱(Synthetic) 다단계 API 테스트에 대한 생성, 편집 및 삭제 액세스 권한을 얻으려면 사용자를 이 두 [기본 역할][17] 중 하나로 업그레이드하세요.

[커스텀 역할 기능][18]을 사용하는 경우 신서틱(Synthetic) 모니터링에 대한 `synthetics_read` 및 `synthetics_write` 권한이 포함된 커스텀 역할에 사용자를 추가합니다.

### 액세스 제한 

계정에서 [커스텀 역할][19]을 사용하는 고객은 액세스 제한을 사용할 수 있습니다.

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
[10]: /ko/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /ko/monitors/notify/variables/?tab=is_alert#conditional-variables
[13]: /ko/synthetics/guide/synthetic-test-monitors
[14]: /ko/synthetics/settings/#global-variables
[15]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#test-failure
[16]: /ko/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[17]: /ko/account_management/rbac/
[18]: /ko/account_management/rbac#custom-roles
[19]: /ko/account_management/rbac/#create-a-custom-role
[20]: /ko/synthetics/api_tests/grpc_tests
