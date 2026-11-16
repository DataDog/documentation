---
description: Datadog API 테스트를 생성하여 엔드포인트를 사전에 모니터링합니다. 어설션이 포함된 단일 및 다단계 API 테스트를
  생성하고, 알림을 구성하고, 문제를 해결합니다.
further_reading:
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: 프로그램화 API 테스트 생성
- link: /synthetics/api_tests
  tag: 설명서
  text: 단일 API 테스트에 대해 자세히 알아보기
- link: /getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치 알아보기
- link: /continuous_testing/cicd_integrations/
  tag: 설명서
  text: CI/CD 파이프라인에서 Synthetic 테스트 트리거하는 방법 알아보기
- link: /synthetics/guide/identify_synthetics_bots
  tag: 설명서
  text: API 테스트용 신서틱 봇을 식별하는 방법 알아보기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: Synthetic 테스트 모니터링에 대해 알아보기
- link: /synthetics/guide/export-tests-to-terraform
  tag: 가이드
  text: Synthetic 테스트를 Terraform으로 내보내기
title: API 테스트 시작하기
---
## 개요 {#overview}

API 테스트는 언제 어디서든 고객님의 **가장 중요한 서비스**를 이용할 수 있도록 **사전에 모니터링합니다**. [단일 API 테스트][1]는 시스템의 다양한 네트워크 계층에서 요청을 실행할 수 있는 8가지 하위 유형(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`)으로 구성되어 있습니다. [다단계 API 테스트][2]를 통해 API 테스트를 순차적으로 실행하여 API 수준에서 주요 여정의 가동 시간을 모니터링할 수 있습니다.

## 단일 API 테스트 생성하기 {#create-a-single-api-test}

HTTP 테스트는 API 엔드포인트를 모니터링하며, 응답 레이턴시가 높거나 예상 HTTP 상태 코드, 응답 헤더, 응답 본문 콘텐츠 등 정의한 조건을 충족하지 못하면 경고를 보냅니다.

아래의 예시는 [단일 API 테스트][1]의 하위 유형인 [HTTP 테스트][3]를 만드는 방법을 설명합니다.

1. Datadog 사이트에서 {{< ui >}}Digital Experience{{< /ui >}}위에 마우스를 올리고 [{{< ui >}}Tests{{< /ui >}}][4] ( {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}} 아래)를 선택합니다.

2. {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}New API test{{< /ui >}}][5]를 클릭합니다.

3. 다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

   - **템플릿에서 테스트 생성하기**:

      1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 {{< ui >}}View Template{{< /ui >}}을 클릭합니다. 테스트 세부 정보, 요청 세부 정보, 어설션, 알림 조건 및 모니터링 설정이 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
      2. {{< ui >}}+Create Test{{< /ui >}}를 클릭하여 {{< ui >}}Define Request{{< /ui >}} 페이지를 열면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
      3. {{< ui >}}Save Details{{< /ui >}}를 클릭하여 API 테스트를 제출합니다.<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿이 표시된 Synthetics API 테스트 랜딩 페이지의 동영상" video="true" >}}

   - **처음부터 테스트 빌드하기**:

      1. 테스트를 처음부터 빌드하려면 {{< ui >}}+ Start from scratch{{< /ui >}} 템플릿을 클릭한 다음 `HTTP` 요청 유형을 선택합니다.

      2. 모니터링하려는 엔드포인트의 URL을 추가합니다. 무엇부터 시작해야 할지 모르겠다면 테스트용 전자상거래 웹 애플리케이션인 `https://www.shopist.io/`을 사용해 보세요. 테스트용 Shopist URL을 사용하면 테스트 이름이 자동으로 `Test on shopist.io`로 채워집니다.  

      3. (선택 사항) {{< ui >}}Advanced Options{{< /ui >}}를 선택해 커스텀 요청 옵션, 인증서와 인증 자격 추가 등을 설정하고 동적 입력이 가능하고 안전한 [전역 변수][6] 또는 [로컬 변수][7]를 생성할 수 있습니다.

         **참고**:관련 필드에 `{{`를 입력하여 변수를 선택하고 테스트 옵션에 값을 삽입할 수 있습니다. 
          
      4. Optionally, set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.

      5. Click {{< ui >}}Send{{< /ui >}} to trigger a sample test run.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="API 테스트 구성" style="width:90%;">}}

      6. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### 어설션 정의 {#define-assertions}

{{< ui >}}Send{{< /ui >}}를 클릭하면 엔드포인트 응답에 대한 기본 어설션이 자동으로 채워집니다. 어설션은 성공적인 테스트 실행을 정의합니다.

이번 예시에서는 샘플 테스트 실행을 트리거한 후 세 가지 기본 어설션이 입력됩니다.

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="기본 어설션" style="width:100%;">}}

어설션은 완전히 사용자 정의할 수 있습니다. 커스텀 어설션을 추가하려면 헤더와 같은 미리보기 응답 요소를 클릭하거나 {{< ui >}}New Assertion{{< /ui >}}을 클릭해 처음부터 새 어설션을 정의합니다. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="API 테스트 구성 예시" video="true" >}}

### 위치 선택 {#select-locations}

테스트를 실행할 {{< ui >}}Managed Locations{{< /ui >}} 또는 {{< ui >}}Private Locations{{< /ui >}}를 하나 이상 선택합니다. {{% managed-locations %}}

Shopist 애플리케이션은 `https://www.shopist.io/`에 공개되어 있으므로, 관리형 위치를 선택해 테스트를 실행할 수 있습니다. 내부 애플리케이션을 테스트하거나 별도 지역의 사용자 행동을 시뮬레이션하는 경우에는 [프라이빗 위치(private locations)][8]를 선택하세요.

### 테스트 주기 지정 {#specify-test-frequency}

테스트 실행 주기를 선택합니다. 기본값 주기(1분)를 그대로 둘 수 있습니다.

Synthetic 테스트를 일정대로 실행하는 것과 더불어 [CI/CD 파이프라인][9]에서 수동으로 또는 직접 트리거할 수 있습니다. 

### 경보 조건 정의 {#define-alert-conditions}

경고 조건을 정의하여 이따금 일시적으로 발생하는 네트워크 문제 등에 대하여 테스트가 트리거되지 않도록 설정할 수 있습니다. 이렇게 하면 엔드포인트에 실제 문제가 발생한 경우에만 경고를 받습니다.

위치에서 실행할 수 없다고 판단하기 전에 발생해야 하는 연속 실패 횟수를 지정할 수 있습니다.

```text
Retry test 2 times after 300 ms in case of failure
```

또한 엔드포인트가 일정 시간 동안 특정 수의 위치에서 다운되는 경우에만 알림이 트리거되도록 테스트를 구성할 수 있습니다. 아래 예시에서 경보 규칙은 서로 다른 두 군데의 위치에서 3분 동안 테스트가 실패할 경우 알림을 보내도록 설정되어 있습니다.

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### 테스트 모니터링 구성 {#configure-the-test-monitor}

이 섹션에서 알림과 함께 전송할 **메시지**를 작성하세요. 알림 내용에는 사용자 지정 메시지와 실패 위치에 대한 세부 정보가 포함됩니다. 사전에 채워진 모니터링 메시지가 메시지 본문에 포함되어 있습니다.

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring 모니터링 섹션, 사전에 채워진 모니터링 메시지가 강조 표시됨" style="width:100%;" >}}

예를 들어, 다음 모니터링 메시지는 단계를 반복하고 브라우저 테스트용 변수를 추출하는 모니터링을 생성합니다.

   ```text
   {{! List extracted variables across all successful steps }}
   # Extracted variables
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Name**: `{{extractedValue.name}}`
   **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][13].


## Create a multistep API test 

[Multistep API tests][2] allow you to monitor key business transactions at the API level. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="다단계 Synthetic API 테스트 개요" style="width:100%;" >}}

[API 테스트][3]와 유사하게, 다단계 API 테스트는 엔드포인트 응답 속도가 지나치게 느려지거나 정의한 조건을 충족하지 못할 때 알림을 보냅니다. 개별 스텝 응답에서 변수를 생성할 수 있고, 해당 값을 다음 단계에 다시 입력해 애플리케이션이나 서비스의 작동을 모사하는 방식으로 각 단계를 연결할 수 있습니다.

아래의 예시는 장바구니에 제품을 추가하는 행동을 모니터링하는 다단계 API 테스트를 만드는 방법을 설명합니다. 테스트는 3단계 절차로 구성됩니다. 

- 장바구니 만들기
- 제품 만들기
- 제품을 장바구니에 추가하기

어느 API 엔드포인트에서 다단계 API 테스트를 만들어야 할지 모르겠다면 아래의 예시 엔드포인트를 사용하세요. 

다단계 API 테스트를 새로 생성하려면 {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Multistep API test{{< /ui >}}][12]를 클릭합니다. `Add product to cart`와 같은 테스트 이름을 추가하고, 태그를 포함하고, 위치를 선택합니다. 

### 장바구니 만들기 {#get-a-cart}

1. {{< ui >}}Define steps{{< /ui >}}에서 {{< ui >}}Create Your First Step{{< /ui >}}을 클릭합니다. 
2. 단계에 이름을 추가합니다(예: `Get a cart`).
3. HTTP 메서드와 쿼리하려는 URL을 지정합니다. `POST` 및 `https://api.shopist.io/carts`을 입력할 수 있습니다. 
4. {{< ui >}}Test URL{{< /ui >}}을 클릭합니다. 이렇게 하면 Shopist 애플리케이션 백엔드에 장바구니 항목이 생성됩니다.
5. 기본값 어설션을 그대로 두거나 수정합니다.
6. (선택 사항) 실행 파라미터를 정의할 수 있습니다. 

    {{< ui >}}Continue with test if this step fails{{< /ui >}}을 선택하면 전체 엔드포인트 컬렉션을 테스트하거나 이전 단계의 성공/실패와 관계없이 마지막 정리 단계를 실행하는 데 도움이 됩니다. {{< ui >}}Retry{{< /ui >}} 단계 기능은 API 엔드포인트가 응답하기까지 시간이 어느 정도 소요될 수 있는 상황에서 유용합니다. 
    
    이 예시에서는 특정 실행 파라미터가 필요하지 않습니다. 

7. `location` 헤더 끝에 있는 장바구니 ID 값으로 변수를 생성하는 방법은 다음과 같습니다.
    - {{< ui >}}Extract a variable from response content{{< /ui >}}를 클릭합니다.
    - 변수 이름을 `CART_ID`라고 설정합니다.
    - {{< ui >}}Response Header{{< /ui >}}에서 `location`을 선택합니다.
    - {{< ui >}}Parsing Regex{{< /ui >}} 필드에 `(?:[^\\/](?!(\\|/)))+$` 등의 정규 표현식을 추가합니다.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="응답 콘텐츠에서 추출된 변수" style="width:100%;" >}}

8. {{< ui >}}Save Variable{{< /ui >}}를 클릭합니다.
9. 테스트 단계 만들기를 완료했다면 {{< ui >}}Save Step{{< /ui >}}을 클릭합니다.

### 제품 만들기 {#get-a-product}
   
1. {{< ui >}}Define another step{{< /ui >}}에서 {{< ui >}}Add Another Step{{< /ui >}}을 클릭합니다. 기본적으로 최대 10개의 단계를 생성할 수 있습니다.
2. 단계에 이름을 추가합니다(예: `Get a product`).
3. HTTP 메서드와 쿼리하려는 URL을 지정합니다. 여기에서 `GET` 및 `https://api.shopist.io/products.json`를 추가할 수 있습니다. 
4. {{< ui >}}Test URL{{< /ui >}}을 클릭합니다. 이렇게 하면 Shopist 애플리케이션에서 이용 가능한 제품 목록을 불러옵니다.
5. 기본값 어설션을 그대로 두거나 수정합니다.
6. (선택 사항) 실행 파라미터를 정의할 수 있습니다. 이 예시에서는 특정 실행 파라미터가 필요하지 않습니다.
7. 제품 ID에서 벗어난 변수를 응답 본문에 위치하도록 만드는 방법은 다음과 같습니다.
    - {{< ui >}}Extract a variable from response content{{< /ui >}}를 클릭합니다.
    - 변수 이름을 `PRODUCT_ID`라고 설정합니다.
    - {{< ui >}}Response Body{{< /ui >}} 탭을 클릭합니다.
    - 제품의 `$oid` 키를 클릭해 `$[0].id['$oid']` 등의 JSON Path를 생성합니다.
8. {{< ui >}}Save Variable{{< /ui >}}를 클릭합니다.
9. 테스트 단계 만들기를 완료했다면 {{< ui >}}Save Step{{< /ui >}}을 클릭합니다.

### 제품을 장바구니에 추가하기{#add-product-to-cart}

1.  {{< ui >}}Add Another Step{{< /ui >}}을 클릭해 마지막 단계를 추가하여, 제품을 장바구니에 넣는 단계를 더합니다.
2. 단계에 이름을 추가합니다(예: `Add product to cart`).
3. HTTP 메서드와 쿼리하려는 URL을 지정합니다. 여기에서 `POST` 및 `https://api.shopist.io/add_item.json`를 추가할 수 있습니다. 
4. {{< ui >}}Request Body{{< /ui >}} 탭에서 `application/json` 본문 유형을 선택하고 다음을 삽입합니다.
        
    {{< code-block lang="java" disable_copy="true" collapsible="true" >}}
    {
      "cart_item": {
        "product_id": "{{ PRODUCT_ID }}",
        "amount_paid": 500,
        "quantity": 1
      },
      "cart_id": "{{ CART_ID }}"
    } 
    {{< /code-block >}}
        
5. {{< ui >}}Test URL{{< /ui >}}을 클릭합니다. 이렇게 하면 2단계에서 추출한 제품이 1단계에서 생성한 장바구니에 들어가고, 결제 URL이 반환됩니다.
6. {{< ui >}}Add assertions (optional){{< /ui >}}에서 {{< ui >}}Response Body{{< /ui >}}를 클릭하고 `url` 키를 클릭해, 결제 완료 URL을 포함한 응답을 포함하여 테스트에서 여정이 완료되었음을 표명합니다.
7. 이번 마지막 단계에서는 실행 파라미터와 변수 추출이 필요하지 않습니다.
10. 테스트 단계 만들기를 완료했다면 {{< ui >}}Save Step{{< /ui >}}을 클릭합니다.

{{< img src="getting_started/synthetics/defined-steps.png" alt="생성된 테스트 단계" style="width:100%;" >}}

그런 다음 테스트 빈도, 경고 조건, 테스트 모니터 등 나머지 테스트 조건을 구성할 수 있습니다. 테스트 구성과 모니터를 저장할 준비가 되면 {{< ui >}}Create{{< /ui >}}를 클릭합니다. 

자세한 정보는 [Synthetic 테스트 모니터링 사용][13]을 참고하세요.

## 테스트 결과 보기{#look-at-test-results}

{{< ui >}}API test{{< /ui >}} 및 {{< ui >}}Multistep API test detail{{< /ui >}} 페이지는 테스트 설정의 개요, 테스트한 엔드포인트와 관련된 위치별 글로벌 업타임, 응답 시간과 네트워크 타이밍을 보여주는 그래프, 테스트 결과와 이벤트 목록을 표시합니다.

실패한 테스트 관련 문제를 해결하려면 **Activity** 탭 또는 **테스트 실행** 탭에서 실패 내용을 검토한 후 실패한 테스트 결과를 클릭합니다. 실패한 어설션과 응답 세부 정보(상태 코드, 응답 시간, 관련 헤더 및 본문 등)를 검토하여 문제를 진단하세요.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="전체 가동 시간, 경보 타임라인, 최신 테스트 실행 목록이 포함된 Activity 탭을 보여주는 API 테스트 세부 정보 페이지" style="width:100%;">}}

Datadog의 [APM과 Synthetic Monitoring 통합][14]을 이용하면 실행된 테스트 실행에서 생성된 트레이스를 {{< ui >}}Traces{{< /ui >}} 탭에서 살펴보고, 실패한 테스트 실행의 근본 원인에 접근할 수 있습니다.

### Bits Investigation 시작하기 {#launch-a-bits-investigation}

Synthetic API 테스트 실패의 근본 원인을 파악하려면 [Bits Investigation][16]을 시작하세요. Bits Investigation은 테스트 결과, 트레이스, 로그, 메트릭을 분석하여 근본 원인을 파악하고, 실패 유형(회귀 또는 구성 오류)을 표시합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/
[2]: /ko/synthetics/multistep
[3]: /ko/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/tests
[5]: https://app.datadoghq.com/synthetics/create
[6]: /ko/synthetics/settings/#global-variables
[7]: /ko/synthetics/api_tests/http_tests#variables
[8]: /ko/getting_started/synthetics/private_location
[9]: /ko/synthetics/ci
[10]: /ko/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /ko/monitors/types/synthetic_monitoring/
[14]: /ko/synthetics/apm/
[15]: /ko/synthetics/api_tests/grpc_tests
[16]: /ko/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page