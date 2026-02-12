---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: 프로그래밍 방식으로 API 테스트 생성
- link: /synthetics/api_tests
  tag: 설명서
  text: 싱글 API 테스트에 대해 자세히 알아보기
- link: /synthetics/multistep
  tag: 설명서
  text: 멀티스텝 API 테스트에 대해 자세히 알아보기
- link: /getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치 알아보기
- link: /continuous_testing/cicd_integrations/
  tag: 설명서
  text: CI/CD 파이프라인에서 신서틱 테스트 트리거하는 방법 알아보기
- link: /synthetics/guide/identify_synthetics_bots
  tag: 설명서
  text: API 테스트용 신서틱 봇을 식별하는 방법 알아보기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 설명서
  text: 신서틱 테스트 모니터에 대해 알아보기
title: API 테스트 시작하기
---

## 개요

API 테스트는 언제 어디서나 **가장 중요한 서비스**가 정상적으로 작동하는지 **사전 모니터링**합니다. [싱글 API 테스트][1]에는 시스템의 다양한 네트워크 레이어에서 요청을 실행하는 하위 유형 8가지가(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`) 존재합니다. [멀티스텝 API 테스트][2]는 연속으로 API 테스트를 실행하여 API 레벨에서 주요 여정의 업타임을 모니터링합니다.

## 싱글 API 테스트 만들기

HTTP 테스트는 API 엔드포인트를 모니터링하고 응답 레이턴시가 정의된 조건보다 높거나 충족하지 못하는 경우 경고를 보냅니다. 예를 들면 예상되는 HTTP 상태 코드, 응답 시간이나 응답 본문의 내용 등이 정의된 조건을 충족하는지 검증할 수 있습니다.

아래의 예시는 [싱글 API 테스트][1]의 하위 유형인 [HTTP 테스트][3]를 만드는 방법을 설명합니다.

1. Datadog 사이트에서 **디지털 경험** 위로 마우스를 올리고 **[테스트][4]**(**신서틱(Synthetic) 모니터링 & 테스트** 하단의)를 선택합니다.

2. **New Test** > **[New API test][5]**를 클릭합니다.

3. 다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

   - **템플릿에서 테스트 생성하기**:

      1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 **템플릿 보기**를 클릭합니다. 테스트 세부 정보, 요청 세부 정보, 어설션, 알림 조건 및 모니터링 설정이 포함된, 사전에 채워진 설정 정보가 표시되는 사이드 패널이 열립니다.
      2. **+테스트 생성하기**를 클릭하면 사전 입력된 설정 옵션을 검토하고 편집할 수 있는 **요청 정의** 페이지가 열립니다. 표시되는 필드는 테스트 초기 생성 시사용할 수 있는 필드와 동일합니다.
      3. **세부 정보 저장**을 클릭하여 API 테스트를 제출합니다.<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="템플릿을 사용한 Synthetics API 테스트 랜딩 페이지 영상" video="true" >}}

   - **테스트 처음부터 빌드하기**:

      1. 테스트를 처음부터 빌드하려면 **+Start from scratch** 템플릿을 클릭한 다음 `HTTP` 요청 유형을 선택합니다.

      2. 모니터링할 엔드포인트의 URL을 추가합니다. 어디에서 시작해야 할지 모르겠다면 테스트용 이커머스 웹 애플리케이션인 `https://www.shopist.io/`를 사용할 수 있습니다. 테스트 Shopist URL을 사용할 경우, 테스트 이름이 자동으로 `Test on shopist.io`로 채워집니다.

      3. (선택 사항) **Advanced Options**를 선택해 커스텀 요청 옵션, 인증서와 인증 자격 추가 등을 설정하고 동적 입력이 가능하고 안전한 [전역 변수][6] 또는 [로컬 변수][7]를 생성할 수 있습니다.

         **참고**: 관련 필드에 `{{`를 입력하여 변수를 선택하고 테스트 옵션에 값을 삽입할 수 있습니다.

      4. (선택 사항) `env:prod`, `app:shopist` 등의 태그를 테스트에 설정할 수 있습니다. 태그를 사용하면 테스트 제품군을 정리하고, 홈페이지에서 관심 있는 테스트를 빠르게 찾을 수 있습니다.

      5. **Send**를 클릭해 샘플 테스트 실행을 트리거합니다.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="API 테스트 설정" style="width:90%;">}}

      6. **테스트 생성하기**를 클릭하여 API 테스트를 제출합니다.

### 어설션 정의

**Send** 버튼을 누르면 엔드포인트 응답의 기본 어설션이 자동으로 채워집니다. 어설션으로 테스트 성공을 정의합니다.

이번 예시에서는 샘플 테스트 실행을 트리거한 후 세 가지 기본 어설션이 입력됩니다.

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="기본 표명" style="width:100%;">}}

어설션을 사용자 지정했습니다. 커스텀 어설션을 추가하려면 헤더와 같은 미리보기 응답 요소를 클릭하거나 **New Assertion**을 클릭해 처음부터 새 어설션을 정의합니다.

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="예시 API 테스트 설정" video="true" >}}

### 위치 선택하기

테스트를 실행할 **Managed Locations** 또는 **Private Locations** 하나 이상을 선택하세요. {{% managed-locations %}}

Shopist 애플리케이션은 `https://www.shopist.io/`에 공개되어 있기 때문에 테스트를 실행할 관리 위치를 원하는 곳으로 지정할 수 있습니다. 내부 애플리케이션을 테스트하거나 개별적인 지리적 리전에서 사용자 행동을 시뮬레이션하고 싶을 경우에는 대신 [프라이빗 위치][8]를 사용하세요.

### 테스트 빈도 지정

테스트를 실행할 빈도를 선택합니다. 기본 빈도인 1분을 그대로 둘 수도 있습니다.

신서틱 테스트를 일정대로 실행하는 것과 더불어 [CI/CD 파이프라인][9]에서 수동으로 또는 직접 트리거할 수 있습니다.

### 경고 조건 정의

경고 조건을 정의하여 이따금 일시적으로 발생하는 네트워크 문제 등에 대하여 테스트가 트리거되지 않도록 설정할 수 있습니다. 이렇게 하면 엔드포인트에 실제 문제가 발생한 경우에만 경고를 받습니다.

위치에서 실행할 수 없다고 판단하기 전에 발생해야 하는 연속 실패 횟수를 지정할 수 있습니다.

```text
Retry test 2 times after 300 ms in case of failure
```

또한 엔드포인트가 특정 시간 동안, 특정 개수의 위치에서 실행에 실패했을 때만 알림을 보내도록 테스트를 설정할 수도 있습니다. 다음 예시에서는 서로 다른 위치 두 곳에서 테스트가 3분간 실패할 경우 알림을 전송하도록 경고 규칙이 설정되어 있습니다.

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### 테스트 모니터링 설정

나만의 경고 메시지를 디자인하고 테스트에서 경고를 보낼 이메일 주소를 추가하세요. 또한 Slack, PagerDuty, Microsoft Teams, 웹훅 등의 [알림 통합][10]을 사용할 수도 있습니다. 이러한 도구에서 신서틱 경고를 트리거하려면 먼저 해당하는 [통합][11]을 설정하셔야 합니다.

테스트 구성과 모니터링을 저장할 준비가 되면 **Create**을 클릭합니다.

## 멀티스텝 API 테스트 만들기

[멀티스텝 API 테스트][2]를 사용하면 주요 비즈니스 트랜잭션을 API 수준에서 모니터링할 수 있습니다.

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="멀티스텝 신서틱 API 테스트의 개요" style="width:100%;" >}}

[API 테스트][3]와 유사하게, 멀티스텝 API 테스트는 엔드포인트가 너무 느리거나 정의한 조건을 충족하지 못할 때 경고를 보냅니다. 개별 스텝 응답에서 변수를 생성할 수 있고, 해당 값을 다음 단계에 다시 입력해 애플리케이션이나 서비스의 작동을 모사하는 방식으로 각 절차를 연결할 수 있습니다.

아래의 예시는 장바구니에 제품을 추가하는 행동을 모니터링하는 멀티스텝 API 테스트를 만드는 방법을 설명합니다. 테스트는 3단계 절차로 구성됩니다.

- 장바구니 만들기
- 제품 만들기
- 제품을 장바구니에 추가하기

어느 API 엔드포인트에서 멀티스텝 API 테스트를 만들어야 할지 모르겠다면 아래의 예시 엔드포인트를 사용하세요.

새로운 멀티스텝 API 테스트를 만들려면 **New Test** > **[Multistep API test][12]**를 클릭하세요. `Add product to cart`와 같은 테스트 이름을 추가하고 태그를 포함한 다음 위치를 선택합니다.

### 장바구니 만들기

1. **Define steps**에서 **Create Your First Step**를 클릭합니다. 
2. 단계에 이름을 추가합니다(예: `Get a cart`).
3. 쿼리할 HTTP 메소드와 URL을 지정합니다. `POST` 및 `https://api.shopist.io/carts`를 입력할 수 있습니다. 
4. **Test URL**을 클릭하세요. 이렇게 하면 Shopist 애플리케이션 백엔드에 장바구니 제품이 생성됩니다.
5. 기본값 어설션을 그대로 두거나 수정합니다.
6. 선택 사항으로, 실행 파라미터를 정의할 수 있습니다.

    **Continue with test if this step fails**를 선택하면 전체 엔드포인트 컬렉션을 테스트했는지, 이전 단계의 성공이나 실패와 관계없이 최근 정리 단계를 실행했는지를 확인하는 데 도움이 됩니다. **Retry** 단계 기능은 API 엔드포인트에서 응답하기까지 시간이 다소 소요된다는 점을 알고 있는 상황에 유용합니다.

   이 예시에서는 특정 실행 파라미터가 필요하지 않습니다.

7. 장바구니 ID의 변수를 벗어난 변수를 `location` 헤더 끝에 위치하도록 만드는 방법은 다음과 같습니다.
    - **Extract a variable from response content**를 클릭합니다.
    - 변수 이름을 `CART_ID`라고 설정합니다.
    - **Response Header**에서 `location`을 선택합니다.
    - **Parsing Regex** 필드에서 `(?:[^\\/](?!(\\|/)))+{TX-PL-LABEL}#x60; 등의 정규 표현식을 추가합니다.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="응답 콘텐츠에서 추출한 변수" style="width:100%;" >}}

8. **Save Variable**을 클릭합니다.
9. 테스트 절차 만들기를 완료했다면 **Save Step**을 클릭합니다.

### 제품 만들기

1. **Define another step**에서 **Add Another Step**를 클릭합니다. 기본적으로 최대 10단계까지 절차를 만들 수 있습니다.
2. 단계에 이름을 추가합니다(예: `Get a product`).
3. 쿼리할 HTTP 메소드와 URL을 지정합니다. 여기에서는 `GET` 및 `https://api.shopist.io/products.json`를 추가할 수 있습니다. 
4. **Test URL**을 클릭합니다. 이렇게 하면 Shopist 애플리케이션에서 이용 가능한 제품 목록을 불러옵니다.
5. 기본값 어설션을 그대로 두거나 수정합니다.
6. 선택 사항으로, 실행 파라미터를 정의할 수 있습니다. 이번 예시에서는 특정 실행 파라미터가 필요하지 않습니다.
7. 제품 ID에서 벗어난 변수를 응답 본문에 위치하도록 만드는 방법은 다음과 같습니다.
    - **Extract a variable from response content**를 클릭합니다.
    - 변수 이름을 `PRODUCT_ID`라고 설정합니다.
    - **Response Body** 탭을 클릭합니다.
    - 제품의 `$oid` 키를 클릭해 JSON Path를 생성합니다(예: `$[0].id['$oid']`).
8. **Save Variable**을 클릭합니다.
9. 테스트 절차 만들기를 완료했다면 **Save Step**을 클릭합니다.

### 제품을 장바구니에 추가하기

1. **Add Another Step**를 클릭해 마지막 단계를 추가해, 제품을 장바구니에 넣는 단계를 더합니다.
2. 단계에 이름을 추가합니다(예: `Add product to cart`).
3. 쿼리할 HTTP 메소드와 URL을 지정합니다. 여기에서는 `POST` 및 `https://api.shopist.io/add_item.json`를 추가할 수 있습니다. 
4. **Request Body** 탭에서 `application/json` 본문 유형을 선택하고 다음을 입력합니다.

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

5. **Test URL**을 클릭합니다. 이렇게 하면 2단계에서 추출한 제품이 1단계에서 생성한 장바구니에 들어가고, 결제 URL이 반환됩니다.
6. **Add assertions (optional)**에서 **Response Body**를 클릭하고 `url` 키를 클릭해, 결제 완료 URL을 포함한 응답을 포함하여 테스트에서 여정이 완료되었음을 표명합니다.
7. 이번 마지막 단계에서는 실행 파라미터와 변수 추출이 필요하지 않습니다.
10. 테스트 절차 만들기를 완료했다면 **Save Step**을 클릭합니다.

{{< img src="getting_started/synthetics/defined-steps.png" alt="생성된 테스트 절차" style="width:100%;" >}}

이제 다른 테스트 조건(테스트 빈도, 경고 조건, 경고 메시지 등)을 구성하고 모니터를 테스트할 수 있습니다. 테스트 구성과 모니터를 저장할 준비가 되면 **Create**를 클릭하세요.

자세한 정보는 [신서틱 테스트 모니터 사용][13]을 참고하세요.

## 테스트 결과 보기

**API test**와 **Multistep API test detail** 페이지는 테스트 설정의 개요, 테스트한 엔드포인트와 관련된 위치별 글로벌 업타임, 응답 시간과 네트워크 타이밍을 보여주는 그래프, 테스트 결과와 이벤트 목록을 표시합니다.

실패한 테스트를 트러블슈팅하려면 화면 아래로 이동해 **Test Results**에서 실패한 테스트 결과를 클릭합니다. 실패한 어설션과 응답 상세 내역(예: 상태 코드, 응답 시간, 관련 헤더 및 바디)를 확인해 문제를 진단합니다.

{{< img src="getting_started/synthetics/api-test-failure-5.png" alt="API 테스트 실패" style="width:100%;">}}

Datadog의 [APM 통합과 신서틱 모니터링][14]을 이용하면 실행된 테스트에서 생성된 트레이스를 **Traces** 탭에서 살펴보고, 실패한 테스트의 근본 원인에 접근할 수 있습니다.

## 참고 자료

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
[13]: /ko/synthetics/guide/synthetic-test-monitors
[14]: /ko/synthetics/apm/
[15]: /ko/synthetics/api_tests/grpc_tests