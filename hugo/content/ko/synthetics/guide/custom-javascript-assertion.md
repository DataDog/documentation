---
description: Synthetic 브라우저 테스트에서 커스텀 JavaScript 어설션을 사용하는 방법 알아보기
further_reading:
- link: /synthetics/browser_tests/test_steps/
  tag: 설명서
  text: 브라우저 테스트 단계 알아보기
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 테스트 단계에서 고급 옵션을 구성하는 방법 알아보기
- link: /synthetics/guide/popup/#moving-popups
  tag: 설명서
  text: 갑자기 트리거되어 나타나는 팝업 처리하는 방법 알아보기
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: 블로그
  text: Datadog을 통해 고객의 브라우저 테스트 확장을 지원한 사례
title: 브라우저 테스트에서 커스텀 JavaScript 어설션 사용
---
## 개요 {#overview}

이 가이드는 [브라우저 테스트][1]에서 사용자 인터페이스(UI)를 테스트하는 데 사용자 지정 JavaScript를 사용하는 방법을 설명합니다. JavaScript 어설션은 동기 및 비동기 코드를 지원합니다.

커스텀 JavaScript를 사용해 어설션을 생성하려면 다음 단계를 따르세요.

1. {{< ui >}}Assertion{{< /ui >}}을 클릭하고 {{< ui >}}Test custom JavaScript assertion{{< /ui >}}을 선택합니다.
2. 어설션 본문을 작성합니다.
3. 필요시 UI에서 대상 요소를 선택합니다. 
4. {{< ui >}}Apply{{< /ui >}}를 클릭합니다.

어설션과 관련한 자세한 정보는 [브라우저 테스트 단계][2]를 참고하세요.

## 페이지에 요소가 없는지 어설션 {#assert-that-an-element-is-not-on-the-page}

특정 ID를 가진 요소가 페이지에 *존재하지 않는지* 확인하려면 `return !document.getElementById("<ELEMENT_ID>");`를 사용하세요.

요소가 페이지에 *존재하지 않는지* 확인하고 콘솔 오류에 요소 수를 반환하려면 어설션 본문에 다음을 추가하세요.

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

브라우저 테스트 결과에는 `console.error` 로그가 포함되며 JavaScript 함수당 최대 4개의 로그가 허용됩니다. 명확성과 효율성을 높이기 위해 로그를 결합하는 것이 좋습니다.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="테스트 단계 사이드 패널의 Errors & Warnings 탭에 표시되는 콘솔 오류 로그" style="width:80%;" >}}

## 라디오 버튼이 선택되었는지 확인 {#assert-that-a-radio-button-is-checked}

라디오 버튼이 선택되었는지 확인하려면 어설션 본문에 `return document.querySelector("<SELECTORS>").checked === true;`를 사용하세요.

## 특정 로컬 스토리지 항목의 값 설정 {#set-the-value-of-a-specified-local-storage-item}

특정 로컬 스토리지 항목 값을 설정하려면 어설션 본문에 다음을 추가하세요.

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

예를 들어 다음은 'mytime'의 값을 1970년 1월 1일 00:00:00 UTC 이후 경과한 밀리초 수로 설정합니다.

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

특정 값을 비교해야 하는 경우 다른 JavaScript 어설션에서 `localStorage`에 액세스할 수 있습니다.

{{< code-block lang="javascript" >}}
localStorage.getItem("mytime");
return true
{{< /code-block >}}

## 렌더링된 PDF에 포함된 텍스트 확인 {#assert-on-text-contained-in-a-rendered-pdf}

렌더링된 PDF의 콘텐츠를 테스트하려면 외부 라이브러리를 사용합니다. 

외부 라이브러리를 로딩하려면 어설션 본문에 프라미스를 사용하세요.

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//load external library
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/
[2]: /ko/synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion