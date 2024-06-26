---
further_reading:
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트에 대해 자세히 알아보기
kind: 가이드
title: Shadow DOM을 사용해 애플리케이션에서 테스트 실행
---

## 개요

Shadow DOM(Document Object Model) API은 캡슐화된 DOM 트리에 HTML 요소를 추가할 수 있도록 해주는 웹 구성 요소입니다. [Shadow DOM][1]은 자가 컨테이너화되어 기본 문서의 DOM과 격리된 채 유지됩니다.

다음 사용 사례에서 Shadow DOM을 이용할 수 있습니다.

- 타사 라이브러리의 양식 및 구성 요소
- 임베디드 콘텐츠(비디오 또는 이미지)
- 채팅 팝업 통합

<div class="alert alert-info">
<a href="https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa">Datadog 브라우저 테스트 레코더 확장</a>은 <a href="https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance">테스트 실행 시 요소를 타겟팅하는 데 필요한 전체 로케이터를 캡처할 수 없으므로</a>, 해당 단계는 테스트 실행에서 실패하게 됩니다.
</div>

[캡슐화 모드][2]와 단계 목표에 따라 브라우저 테스트 작업을 활용해 Shadow DOM 내에서 렌더링되는 요소와 상호 작용하고 이를 검증하는 테스트를 설정할 수 있습니다. 이 가이드는 해당 작업과 어서션(assertion) 유형을 집중적으로 살펴봅니다.

## Open 모드

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.png" alt="Open Shadow DOM" style="width:50%;" >}}

`open` 모드에서 일반 어서션은 사용할 수 없습니다. 자바스크립트(Javascript) 어서션을 사용해  `Element.shadowRoot` 속성을 포함하는 Shadow DOM에서 렌더링되는 요소와 상호작용하고 이를 검증할 수 있습니다.

### 텍스트 존재 여부 검증

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.png" alt="Shadow DOM에서 렌더링된 텍스트 검증" style="width:90%;" >}}

"TODO" 텍스트가 페이지에 나타나는지 검증하려면 기본 문서의 `<body>` 요소에서 직접 `innerHTML` 속성을 쿼리합니다.

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### 렌더링된 텍스트 검증

Shadow DOM에서 렌더링된 해당 요소 내에서 텍스트가 제공되었는지 검증하려면 `shadowRoot` 속성을 사용해 해당 요소 및 `innerHTML`이나 `textContent`속성에 액세스하여 텍스트가 제공되었는지 검증합니다. 

예를 들어 다음 코드 스니펫은 `<h3>` HTML 태그에서 "TODO" 텍스트가 렌더링되었는지 검증합니다.

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <h3> element in the Shadow DOM:
let shadowDomElement = element.shadowRoot.querySelector("div > h3")

// check textContent of the Shadow DOM element:
return shadowDomElement.textContent.includes("TODO")
```

### 입력 필드에 텍스트 입력

텍스트 입력 필드가 기본 문서의 DOM 트리에 렌더링되면 Datadog 브라우저 테스트 레코드더는 자동으로 입력된 값을 기록하고 [텍스트 입력][3] 테스트 단계를 생성합니다.

Shadow DOM에서 렌더링된 입력 필드를 사용하면 레코더가 요소에 대한 참조 포인트 전체 세트를 캡처하지 못하여 테스트 실행 중 해당 단계가 실패할 수 있습니다. Shadow DOM에서 렌더링된 텍스트 입력 필드에 텍스트를 입력하는 또 다른 방법은 해당 `<input>` 요소를 찾고 `value` 필드를 설정하는 자바스크립트(Javascript) 어서션을 추가하는 것입니다.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.png" alt="Shadow DOM에서 렌더링된 입력 텍스트 검증" style="width:90%;" >}}

예를 들어 다음 코드 스니펫은 입력 필드에 "JS 어서션으로 추가된 항목(Item added with JS assertion)"을 추가합니다.

```js
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <input> element in the Shadow DOM:
let shadowDomInput = element.shadowRoot.querySelector("input")

// set the value property of the <input> element:
shadowDomInput.value = "Item added with JS assertion"

return true
```

### 요소 클릭

Shadow DOM에서 렌더링된 요소 클릭을 트리거하려면 해당 요소를 찾고 `.click()`을 실행합니다.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.png" alt="Shadow DOM에서 렌더링 요소 클릭 트리거 검증" style="width:90%;" >}}

예를 들어 다음 코드 스니펫은 버튼 클릭 요소를 트리거합니다.

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <button> element in the Shadow DOM:
let shadowDomButton = element.shadowRoot.querySelector("button.editable-list-add-item")

// trigger a click on the button:
shadowDomButton.click()

return true
```

## Closed 모드

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.png" alt="Closed Shadow DOM" style="width:30%;" >}}

`closed` 모드에서 일반적인 어서션을 사용할 수 없습니다. 추가로 Shadow DOM에서 렌더링된 요소는 자바스크립트(Javascript)를 사용해 액세스할 수 없습니다. 그러므로 브라우저 테스트에서 자바스크립트 어서션을 사용할 수 없습니다.

작업을 사용해 적절한 옵션을 선택할 수 있습니다. 예를 들어 탐색 메뉴에서 옵션을 선택하여 각기 다른 페이지로 이동하고 메뉴가 Shadow DOM에서 렌더링되도록 하려면 `tab` 키를 사용해 해당 옵션으로 이동한 다음 `enter` 키를 클릭해 옵션을 선택합니다. 

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" alt="탭 키를 사용해 브라우저 테스트에서 Shadow DOM을 활용하는 방법" video=true >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[2]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage
[3]: https://docs.datadoghq.com/ko/synthetics/browser_tests/actions#type-text