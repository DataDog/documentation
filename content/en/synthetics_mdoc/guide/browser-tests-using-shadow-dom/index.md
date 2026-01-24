---
title: Run Tests On Applications Using A Shadow DOM
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Run
  Tests On Applications Using A Shadow DOM
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/browser-tests-using-shadow-dom/index.html
---

# Run Tests On Applications Using A Shadow DOM

## Overview{% #overview %}

The Shadow Document Object Model (DOM) API is a web component that allows an encapsulated DOM tree to attach to an HTML element. The [shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is self-contained and stays isolated from the main document's DOM.

You may use a shadow DOM for the following use cases:

- Forms and components from third-party libraries
- Embedded content (such as a video or an image)
- Chat pop-up integrations

{% alert level="info" %}
The [Datadog browser test recorder extension](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa) is unable to capture the [full set of locators needed to target the element on test runs](https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance), causing the step to fail on test runs.
{% /alert %}

Depending on the [encapsulation mode](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage) and the step objective, leverage browser test actions to configure a test that interacts with and validates elements rendered within a shadow DOM. This guide highlights these actions and assertion types.

## Open mode{% #open-mode %}

{% alert level="info" %}
The following options are available to test a Shadow DOM in open mode. However, Datadog supports testing open mode by recording the steps as if the elements are not in a Shadow DOM. You can use the methods described in [create a recording](https://docs.datadoghq.com/getting_started/synthetics/browser_test/#create-recording), or [record your steps.](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions#record-your-steps)
{% /alert %}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.00fe82097847b31b0ed059fdcdbe91ca.png?auto=format"
   alt="Open Shadow DOM" /%}

In `open` mode, normal assertions are unavailable. You can use JavaScript assertions to interact with and validate elements rendered in a shadow DOM with the `Element.shadowRoot` property.

### Assert text presence{% #assert-text-presence %}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.325209f2d0e5f1e4e3c70aae5c889c24.png?auto=format"
   alt="Validate text rendered in a shadow DOM" /%}

To validate that the text "TODO" appears on a page, query the `innerHTML` property directly from the `<body>` element of the main document.

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### Validate rendered text{% #validate-rendered-text %}

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

### Enter text into input fields{% #enter-text-into-input-fields %}

When text input fields are rendered in the main document's DOM tree, the Datadog browser test recorder automatically records inputted values and creates a [Type Text](https://docs.datadoghq.com/synthetics/browser_tests/actions#type-text) test step.

When working with input fields rendered in a shadow DOM, the recorder may be unable to capture a complete set of reference points to the element, causing the step to fail on test runs. As a workaround for entering text into a text input field rendered in a shadow DOM, add a JavaScript assertion that locates the respective `<input>` element and sets the `value` field.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.4143f107938d72e7fc7c8077c5968043.png?auto=format"
   alt="Validate entered text rendered in a shadow DOM" /%}

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

### Click on an element{% #click-on-an-element %}

To trigger a click on an element rendered in a shadow DOM, locate the respective element and run `.click()` on it.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.f8d95bce7b41c201d4a79a500eef6837.png?auto=format"
   alt="Validate triggered click on an element rendered in a shadow DOM" /%}

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

## Closed mode{% #closed-mode %}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.7bb11ca910c8eb77b42e89ccda569689.png?auto=format"
   alt="Closed Shadow DOM" /%}

In `closed` mode, normal assertions are unavailable. Additionally, elements rendered in a shadow DOM are not accessible with JavaScript, so you cannot use JavaScript assertions in your browser tests.

You can use the `Press Key` action to select the appropriate options. For example, to navigate to a different page by selecting an option from a navigation menu and the menu is rendered in a shadow DOM, use the `tab` key to navigate to the respective option and click the `enter` key to select an option.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" /%}

## Further Reading{% #further-reading %}

- [Learn about Browser Tests](https://docs.datadoghq.com/synthetics/browser_tests)
