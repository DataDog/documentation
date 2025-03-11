---
title: Run Tests On Applications Using A Shadow DOM

further_reading:
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn about Browser Tests'
---

## Overview

The Shadow Document Object Model (DOM) API is a web component that allows an encapsulated DOM tree to attach to an HTML element. The [shadow DOM][1] is self-contained and stays isolated from the main document's DOM. 

You may use a shadow DOM for the following use cases:

- Forms and components from third-party libraries
- Embedded content (such as a video or an image)
- Chat pop-up integrations

<div class="alert alert-info">
The <a href="https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa">Datadog browser test recorder extension</a> is unable to capture the <a href="https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance">full set of locators needed to target the element on test runs</a>, causing the step to fail on test runs.
</div>

Depending on the [encapsulation mode][2] and the step objective, leverage browser test actions to configure a test that interacts with and validates elements rendered within a shadow DOM. This guide highlights these actions and assertion types.

## Open mode

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.png" alt="Open Shadow DOM" style="width:50%;" >}}

In `open` mode, normal assertions are unavailable. You can use JavaScript assertions to interact with and validate elements rendered in a shadow DOM with the `Element.shadowRoot` property. 

### Assert text presence

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.png" alt="Validate text rendered in a shadow DOM" style="width:90%;" >}}

To validate that the text "TODO" appears on a page, query the `innerHTML` property directly from the `<body>` element of the main document.

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### Validate rendered text

To validate that text is rendered within a given element rendered in a shadow DOM, use the `shadowRoot` property to access the respective element and `innerHTML` or `textContent` properties to validate the text is rendered.

For example, the following code snippet validates the text "TODO" rendered in an `<h3>` HTML tag:

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")
 
// use the shadowRoot property to locate the <h3> element in the Shadow DOM:
let shadowDomElement = element.shadowRoot.querySelector("div > h3")
 
// check textContent of the Shadow DOM element:
return shadowDomElement.textContent.includes("TODO")
```

### Enter text into input fields

When text input fields are rendered in the main document's DOM tree, the Datadog browser test recorder automatically records inputted values and creates a [Type Text][3] test step. 

When working with input fields rendered in a shadow DOM, the recorder may be unable to capture a complete set of reference points to the element, causing the step to fail on test runs. As a workaround for entering text into a text input field rendered in a shadow DOM, add a JavaScript assertion that locates the respective `<input>` element and sets the `value` field.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.png" alt="Validate entered text rendered in a shadow DOM" style="width:90%;" >}}

For example, the following code snippet adds the text "Item added with JS assertion" in the input field:

```js
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")
 
// use the shadowRoot property to locate the <input> element in the Shadow DOM:
let shadowDomInput = element.shadowRoot.querySelector("input")
 
// set the value property of the <input> element:
shadowDomInput.value = "Item added with JS assertion"
 
return true
```

### Click on an element

To trigger a click on an element rendered in a shadow DOM, locate the respective element and run `.click()` on it.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.png" alt="Validate triggered click on an element rendered in a shadow DOM" style="width:90%;" >}}

For example, the following code snippet triggers a click on a button element.

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")
 
// use the shadowRoot property to locate the <button> element in the Shadow DOM:
let shadowDomButton = element.shadowRoot.querySelector("button.editable-list-add-item")
 
// trigger a click on the button:
shadowDomButton.click()
 
return true
```

## Closed mode

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.png" alt="Closed Shadow DOM" style="width:30%;" >}}

In `closed` mode, normal assertions are unavailable. Additionally, elements rendered in a shadow DOM are not accessible with JavaScript, so you cannot use JavaScript assertions in your browser tests.

You can use the `Press Key` action to select the appropriate options. For example, to navigate to a different page by selecting an option from a navigation menu and the menu is rendered in a shadow DOM, use the `tab` key to navigate to the respective option and click the `enter` key to select an option.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" alt="Using tab keys to workaround a shadow DOM in a browser test" video=true >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[2]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage
[3]: https://docs.datadoghq.com/synthetics/browser_tests/actions#type-text
