---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: 블로그
  text: Datadog 브라우저 테스트로 사용자 경험 모니터링
- link: synthetics/browser_tests
  tag: 설명서
  text: 신서틱(Synthetic) 브라우저 테스트 알아보기
title: 브라우저 테스트 중 팝업 처리하기
---
## 개요

이 가이드에서는 신서틱 [브라우저 테스트][5]에서 모달이나 애플리케이션 윈도우와 같은 팝업을 처리하는 방법을 설명합니다.

## 모달

### JavaScript

신서티 브라우저 테스트는 [JavaScript 모달][1]을 자동으로 처리합니다.

 - 확인 버튼을 누르면 `alert` 모달은 바로 사라집니다.
 - `prompt` 모달의 경우 Google Chrome이나 Microsoft Edge 테스트에서 `Lorem Ipsum`로 채워집니다.
 - `confirm` 모달의 경우 수락 확인을 요청합니다.

### 기본 인증

기본 인증 팝업의 경우 브라우저 테스트 구성의 [**Advanced Options**][2]에서 연결된 자격 증명을 지정하세요.

{{< img src="synthetics/guide/popup/http_authentication.png" alt="기본 인증 팝업" style="width:90%" >}}

## 애플리케이션 팝업

### 고정된 팝업

여정 내 특정 지점에서 팝업이 나타날 경우, 팝업을 닫는 단계를 레코딩한 후 [상응하는 옵션][3]을 사용해 단계가 실패하도록 놔둡니다. 이를 통해 테스트 과정에서 팝업이 나타날 경우 어떤 동작을 취해야 할지 알 수 있습니다. 팝업이 나타나지 않을 때는 단계만 실패한 것이며 테스트 전체가 실패한 것이 아닙니다.

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="팝업을 처리하기 위해 단계가 실패하도록 두기" style="width:60%" >}}

### 팝업 이동

세션에서 팝업이 나타나는 시점을 에측하기 어려울 경우, 팝업을 제공하는 타자 업체와 브라우저 테스트를 실행하는 동안 팝업이 나타나지 않도록 규칙을 생성할 수 있는지 상의해 보세요. 예를 들어 타자 업체에서 테스트의 [**Advanced Options** 섹션][2]에 입력할 수 있는 쿠키를 제공할 수 있습니다.

또는 다음 방법 중 하나를 사용해 팝업을 닫고 테스트 여정을  계속하세요.
  * 브라우저 테스트 도입부에 [JavaScript 어설션][4]을 생성해 팝업을 정기적으로 닫도록 합니다.

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

  * 팝업을 닫는 단계를 레코딩한 후 다른 브라우저 테스트 단계 사이에 추가하고 각 추가 항목에 [**Allow this step to fail** 옵션][3]을 선택합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /ko/synthetics/browser_tests/#test-configuration
[3]: /ko/synthetics/browser_tests/advanced_options/#optional-step
[4]: /ko/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
[5]: /ko/synthetics/browser_tests