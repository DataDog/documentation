---
description: Datadog 브라우저 테스트를 생성하여 기기 및 브라우저 전반에서 사용자 여정을 모니터링합니다. 테스트 시나리오를 기록하고,
  경보를 설정하며, 비즈니스 트랜잭션을 검증합니다.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: 학습 센터
  text: Synthetic 브라우저 테스트 시작하기
- link: /synthetics/browser_tests
  tag: 문서
  text: 브라우저 테스트 알아보기
- link: /getting_started/synthetics/private_location
  tag: 문서
  text: 프라이빗 위치 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 문서
  text: CI/CD 파이프라인에서 Synthetic 테스트 트리거하는 방법 알아보기
- link: /synthetics/identify_synthetics_bots
  tag: 문서
  text: API 테스트용 Synthetic 봇을 식별하는 방법 알아보기
- link: /synthetics/guide/synthetic-test-monitors
  tag: 문서
  text: Synthetic 테스트 모니터링에 대해 알아보기
- link: /synthetics/guide/export-tests-to-terraform
  tag: 가이드
  text: Synthetic 테스트를 Terraform으로 내보내기
title: 브라우저 테스트 시작하기
---
## 개요 {#overview}

[브라우저 테스트][1]는 Datadog이 웹 애플리케이션에서 실행하는 시나리오입니다. 주기적인 간격을 구성하여 여러 위치, 기기, 브라우저에서 테스트를 실행할 수 있으며 CI/CD 파이프라인에서 테스트를 실행할 수도 있습니다. 이러한 테스트는 사용자가 애플리케이션에서 **주요 비즈니스 트랜잭션**을 수행할 수 있는지, 최신 코드 변경으로 인해 악영향을 받지 않았는지 확인합니다.

## 브라우저 테스트 생성 {#create-a-browser-test}

아래 예시는 장바구니에 아이템을 추가한 후 결제에 성공하기까지의 사용자 여정을 매핑하는 브라우저 테스트를 생성하는 방법을 보여줍니다. 

### 테스트 상세 정보 구성 {#configure-your-test-details}

1. Datadog 사이트의 왼쪽 메뉴에서 {{< ui >}}Digital Experience{{< /ui >}} 위에 마우스를 올리고 [{{< ui >}}Tests{{< /ui >}}][2]({{< ui >}}Synthetic Monitoring & Testing{{< /ui >}} 아래)를 선택합니다.
2. 오른쪽 상단 모서리에서 {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Browser Test{{< /ui >}}][3]를 클릭합니다.

다음 옵션 중 하나를 사용하여 테스트를 생성할 수 있습니다.

- **템플릿에서 테스트 생성하기**:

    1. 사전에 채워진 템플릿 중 하나에 마우스를 올리고 {{< ui >}}View Template{{< /ui >}}을 클릭합니다. 테스트 세부 정보, 경보 조건, 단계, 변수(선택 사항)를 포함한 사전에 채워진 구성 정보가 표시된 사이드 패널이 열립니다.
    2. {{< ui >}}\+ Create Test{{< /ui >}}를 클릭하여 구성 페이지를 열면 사전에 채워진 구성 옵션을 검토하고 편집할 수 있습니다. 표시되는 필드는 테스트 처음 생성 시 제공되는 필드와 동일합니다.
    3. 오른쪽 상단의 {{< ui >}}Save & Quit{{< /ui >}}을 클릭하여 브라우저 테스트를 제출합니다.<br /><br>

       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="템플릿이 표시된 Synthetics 브라우저 테스트 랜딩 페이지의 동영상" video="true" >}}

- **처음부터 테스트 빌드하기**:

    1. 새 브라우저 테스트를 처음부터 시작하려면 {{< ui >}}\+{{< /ui >}} 템플릿을 클릭합니다.
    1. 모니터링하려는 웹사이트의 URL을 추가합니다. 무엇부터 시작해야 할지 모르겠다면 테스트용 전자상거래 웹 애플리케이션인 `https://www.shopist.io`을 사용해 보세요.
    2. {{< ui >}}Advanced Options{{< /ui >}}를 선택하여 사용자 지정 요청 옵션, 인증서, 인증 자격 등을 설정할 수 있습니다. 
    3. 테스트 이름을 지정하고 `env:prod`, `app:shopist` 등의 태그를 설정합니다. 태그를 사용하면 테스트 모음을 체계적으로 관리하고 홈페이지에서 관심 있는 테스트를 빠르게 찾을 수 있습니다.
    4. 테스트할 브라우저와 기기를 선택합니다. 
    5. {{< ui >}}Save & Edit Recording{{< /ui >}}을 클릭하여 브라우저 테스트를 제출합니다.

### 위치 선택 {#select-locations}

테스트를 실행할 {{< ui >}}Managed Locations{{< /ui >}} 또는 {{< ui >}}Private Locations{{< /ui >}}를 하나 이상 선택합니다.

관리형 위치를 사용하면 공개 웹사이트 및 엔드포인트를 테스트할 수 있습니다. 내부 애플리케이션을 테스트하거나 별도 지역의 사용자 행동을 시뮬레이션하려면 대신 [프라이빗 위치][4]를 사용하세요.

Shopist 애플리케이션은 `https://www.shopist.io/`에 공개되어 있으므로, 관리형 위치를 선택해 테스트를 실행할 수 있습니다.

### 테스트 주기 지정 {#specify-test-frequency}

테스트 실행 주기를 선택합니다. 기본값 주기(1시간)를 그대로 둘 수 있습니다.

Synthetic 테스트를 일정대로 실행하는 것과 더불어 [CI/CD 파이프라인][5]에서 수동으로 또는 직접 트리거할 수 있습니다.

### 경보 조건 정의 {#define-alert-conditions}

경보 조건을 정의하여 이따금 일시적으로 발생하는 네트워크 문제 등에 대하여 테스트가 트리거되지 않도록 설정할 수 있습니다. 이렇게 하면 애플리케이션에 실제 문제가 발생한 경우에만 경고를 받습니다.

위치에서 실행할 수 없다고 판단하기 전에 발생해야 하는 연속 실패 횟수를 지정할 수 있습니다.

```text
Retry test 2 times after 300 ms in case of failure
```

또한 애플리케이션이 일정 시간 동안 특정 수의 위치에서 다운되는 경우에만 알림이 트리거되도록 테스트를 구성할 수 있습니다. 아래 예시에서 경보 규칙은 서로 다른 두 군데의 위치에서 3분 동안 테스트가 실패할 경우 알림을 보내도록 설정되어 있습니다.

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
   **Value:** {{#if extractedValue.secure}}*Obfuscated(value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][8].

## Create recording 

Once your test configuration is saved, Datadog prompts you to download and install the [Datadog test recorder][9] Chrome extension. (This Chrome extension can also be installed on a Microsoft Edge browser)

Once you have installed the extension, click {{< ui >}}Start Recording{{< /ui >}} to begin recording your test steps.

Navigate through the page in the iframe located on the right of the recorder page. When you select a div, image, or any area of the page, Datadog records and creates the associated step in the browser test. 

To end recording your test steps, click {{< ui >}}Stop Recording{{< /ui >}}.

The example below demonstrates how to map a user journey from adding an item to a cart to successfully checking out in `https://www.shopist.io`:

1. Navigate to one of the furniture sections on the example website such as {{< ui >}}Chairs{{< /ui >}} and select {{< ui >}}Add to cart{{< /ui >}}.
2. Click on {{< ui >}}Cart{{< /ui >}} and {{< ui >}}Checkout{{< /ui >}}.
3. Under {{< ui >}}Add New{{< /ui >}}, select {{< ui >}}Assertion{{< /ui >}} and click {{< ui >}}"Test that some text is present on the active page"{{< /ui >}}.
4. To confirm that the words "Thank you!" appear after checking out, enter `Thank you!` in the {{< ui >}}Value{{< /ui >}} field. 
5. Press {{< ui >}}Save & Quit{{< /ui >}}.

It is important to finish your browser test with an {{< ui >}}Assertion{{< /ui >}} to ensure your application resulted in the expected state after the defined user journey.

{{< img src="getting_started/synthetics/record-test.mp4" alt="테스트 단계 기록" video="true" >}}

예제 웹사이트는 정기적으로 오류를 발생시켜 의도적으로 실패하게 만듭니다. {{< ui >}}Configure the monitor for this test{{< /ui >}} 필드에 이메일 주소를 입력하면 테스트가 실패하거나 복구될 때 이메일 알림을 받을 수 있습니다.

## 테스트 결과 보기{#look-at-test-results}

{{< ui >}}Browser Test{{< /ui >}} 세부 정보 페이지에는 테스트 구성 개요, 글로벌 및 위치별 가동 시간, 상호 작용까지 걸리는 시간 및 테스트 기간에 대한 그래프, 성공 및 실패한 테스트 결과 샘플, 모든 테스트 결과 목록이 표시됩니다. 테스트 길이에 따라 첫 번째 테스트 결과가 나타날 때까지 몇 분 정도 기다려야 할 수도 있습니다.

[실패한 테스트][10] 문제를 해결하려면 **Activity** 탭 또는 **Test Runs** 탭에서 실패 내역을 검토합니다. 타임라인에서 경보를 선택하여 실패한 단계와 오류 메시지를 설명하는 **What happened?** 요약을 확인합니다. **다음 단계** 패널에서 Bits Investigation으로 조사하거나, 복구를 조회하거나, 일정을 일시 중지하거나, 인시던트를 선언할 수 있습니다. 문제를 진단하기 위해 잠재적 [{{< ui >}}Errors & Warnings{{< /ui >}}][11], [{{< ui >}}Resources{{< /ui >}}][12], [{{< ui >}}Core Web Vitals{{< /ui >}}][13]를 검토할 수도 있습니다.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="경보 타임라인, 실패 요약, 다음 단계 패널이 있는 Activity 탭을 보여주는 브라우저 테스트 세부 정보 페이지" style="width:100%;">}}

Datadog의 [Synthetic Monitoring과 APM 통합][14]을 이용하면 {{< ui >}}Traces{{< /ui >}} 탭에서 실행된 테스트를 통해 백엔드에서 생성된 트레이스를 확인할 수 있습니다.

### Bits Investigation 시작하기 {#launch-a-bits-investigation}

Synthetic 브라우저 테스트 실패의 근본 원인을 파악하려면 [Bits Investigation][15]을 시작합니다. Bits Investigation은 테스트 결과, 트레이스, 로그, 메트릭을 분석하여 근본 원인을 파악하고, 실패 유형(회귀 또는 구성 오류)을 표시합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/synthetics/browser_tests/
[2]: https://app.datadoghq.com/synthetics/tests
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /ko/getting_started/synthetics/private_location
[5]: /ko/continuous_testing/cicd_integrations
[6]: /ko/integrations/#cat-notification
[7]: https://app.datadoghq.com/account/settings
[8]: /ko/monitors/types/synthetic_monitoring/
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ko/synthetics/browser_tests/test_results#test-failure
[11]: /ko/synthetics/browser_tests/test_results#errors
[12]: /ko/synthetics/browser_tests/test_results#resources
[13]: /ko/synthetics/browser_tests/test_results#test-performance
[14]: /ko/synthetics/apm/
[15]: /ko/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page