---
description: 신서틱 브라우저 테스트에서 커스텀 JavaScript 어설션을 사용하는 방법 알아보기
further_reading:
- link: /synthetics/browser_tests/actions/
  tag: 설명서
  text: 브라우저 테스트 단계 알아보기
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 테스트 단계에서 고급 단계를 구성하는 방법 알아보기
- link: /synthetics/guide/popup/#moving-popups
  tag: 설명서
  text: 갑자기 트리거되어 나타나는 팝업 처리하는 방법 알아보기
title: 브라우저 테스트에서 커스텀 JavaScript 어설션 사용
---

## 개요

이 가이드에서는 [브라우저 테스트][1]에서 커스텀 JavaScript를 사용해 UI(사용자 인터페이스)를 테스트하는 방법을 설명합니다. JavaScript 어설션은 동기 및 비동기 코드를 지원합니다.

커스텀 JavaScript를 사용해 어설션을 생성하는 방법:

1. **Assertion**을 클릭하고 **Test your UI with custom JavaScript**를 선택하세요.
2. 어설션 본문을 쓰세요.
3. (선택 사항) UI의 대상 구성 요소를 선택하세요.
4. **Apply**를 클릭합니다.

어설션과 관련한 자세한 정보는 [브라우저 테스트 단계][2]를 참고하세요.

## 구성 요소가 페이지에 없다는 어설션하기

특정 ID의 구성 요소가 페이지에 *없다*는 것을 확인하려면 `return !document.getElementById("<ELEMENT_ID>");`를 사용하세요. 

페이지가 구성 요소에 *없다*는 것을 확인하고 콘솔 오류의 구성 요소 개수를 반환하려면 어설션 본문에 다음을 추가하세요. 

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

브라우저 테스트 결과에 `console.error` 로그가 포함되어 있습니다.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="테스트 단계 측면 패널의 Errors & Warnings 탭에 나타난 콘솔 오류 로그" style="width:80%;" >}}

## 라디오 버튼을 체크했다는 어설션하기

라디오 버튼을 체크했다는 것을 확인하려면 어설션 본문에 `return document.querySelector("<SELECTORS>").checked === true;`을 사용하세요.

## 특정 로컬 스토리지 항목 값 설정

특정 로컬 스토리지 항목 값을 설정하려면 어설션 본문에 다음을 추가하세요.

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

예를 들어 다음은 1970년 1월 1일 00:00:00 UTC부터 "mytime"까지 흐른 시간을 밀리초로 표시합니다.

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

## 렌더링된 PDF에 포함된 텍스트를 어설션하기

렌더링된 PDF의 컨텐츠를 테스트하려면 외부 라이브러리를 사용합니다.

외부 라이브러리를 로딩하려면 어설션 본문에 프라미스를 사용하세요.

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//외부 라이브러리 로딩
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

프라미스 기다리기

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
{{< /code-block >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/
[2]: /ko/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion