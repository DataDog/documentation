---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: 블로그
  text: Datadog 브라우저 테스트를 통한 사용자 경험 모니터링
- link: synthetics/browser_tests
  tag: 설명서
  text: Synthetic 브라우저 테스트 알아보기
title: 브라우저 테스트에서 팝업 처리
---
## 개요 {#overview}

이 가이드는 Synthetic [브라우저 테스트][5]에서 모달이나 애플리케이션 창과 같은 팝업을 관리하는 방법을 설명합니다.

## 모달 {#modals}

### JavaScript {#javascript}

Synthetic 브라우저 테스트는 [JavaScript 모달][1]을 자동으로 처리합니다:

 - `alert` 모달은 즉시 OK를 눌러 닫습니다. 
 - `prompt` 모달은 Google Chrome 또는 Microsoft Edge에서 테스트할 때 `Lorem Ipsum`로 채워집니다.
 - `confirm` 확인을 요청하는 모달은 수락됩니다.

### 기본 인증 {#basic-authentication}

기본 인증 팝업의 경우, 브라우저 테스트 구성의 [{{< ui >}}Advanced Options{{< /ui >}}][2]에 관련 자격 증명을 지정하세요.

{{< img src="synthetics/guide/popup/http_authentication.png" alt="기본 인증 팝업" style="width:90%" >}}

## 애플리케이션 팝업 {#application-pop-ups}

### 고정 팝업 {#anchored-pop-ups}

여정의 특정 지점에서 팝업이 나타나면 팝업을 닫는 단계를 기록합니다. 단계의 고급 옵션에서 {{< ui >}}If this step fails, continue to next step{{< /ui >}}를 선택합니다. 그런 다음 {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (기본적으로 선택됨)의 선택을 해제합니다. 팝업이 나타나지 않으면 전체 테스트가 실패하지 않고 해당 단계만 실패합니다. 자세한 내용은 [선택적 단계][3] 섹션을 참조하세요.

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="continue to next step이 선택되고 mark test as failed가 선택 해제된 단계의 고급 옵션입니다." style="width:60%" >}}

### 이동 팝업 {#moving-pop-ups}

세션에서 이러한 팝업이 나타나는 시간을 예측할 수 없는 경우, 팝업을 제공하는 타사에 문의하여 브라우저 테스트 실행 중에 팝업이 나타나지 않도록 하는 규칙을 만들 수 있는지 확인하세요. 예를 들어, 테스트의 [{{< ui >}}Advanced Options{{< /ui >}} 섹션][2]에 입력할 수 있는 쿠키를 제공할 수 있습니다.

또는 다음 방법 중 하나를 사용하여 팝업이 닫히고 테스트가 계속 진행될 수 있도록 하세요.
  * 브라우저 테스트 시작 부분에 [JavaScript 어설션][4]을 생성하여 정기적으로 팝업을 닫도록 시도합니다.

    ```javascript
    if (document.querySelector("<ELEMENT>")) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        const isPopupDisplayed = () => {
          if (document.querySelector("<ELEMENT>")) {
            clearInterval(popup);
            resolve(true);
          }
        };
        let popup = setInterval(isPopupDisplayed, 500);
      });
    }
    ```

  * 팝업을 닫는 단계를 기록하고 다른 모든 브라우저 테스트 단계 사이에 추가합니다. 각 단계에서 {{< ui >}}If this step fails, continue to next step{{< /ui >}}를 선택합니다. 그런 다음 {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (기본적으로 선택됨)의 선택을 해제합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /ko/synthetics/browser_tests/#test-configuration
[3]: /ko/synthetics/browser_tests/advanced_options/#optional-step
[4]: /ko/synthetics/browser_tests/test_steps#test-your-ui-with-custom-javascript
[5]: /ko/synthetics/browser_tests