---
title: Handling popups in browser tests
kind: guide
further_reading:
    - link: 'https://www.datadoghq.com/blog/browser-tests/'
      tag: 'Blog'
      text: 'User experience monitoring with Datadog Browser Tests'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
---

Datadog browser tests automatically handle **[JavaScript modals][1]**: `alert` modals are closed and `prompt` and `confirm` ones are answered `Lorem Ipsum`. For Basic Auth popups, you need to specify the associated credentials in your browser test configuration, below the [`HTTP Auth` **Advanced option**][2]:

{{< img src="synthetics/guide/popup/http_auth_option.png" alt="Basic Auth Popup">}}

If a **popup appears at a specific point of your journey**, you can record a step to close it and allow this step to fail using the [corresponding option][3]. This way, your test knows how to behave in case a popup appears. If the popup does not show up, the step fails without causing the whole test to fail. 

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Allow step to fail to handle popup">}}

If the time at which these **popups appear in a session is not predictable**:

* You should sync with the **third party** providing the popup to see if they could create a rule that would prevent the popup from appearing during your browser test execution. They could for instance provide you with a cookie that you could then input below the [dedicated **Advanced option**][2] of your test.

* Alternatively, you can use one of these two methods to ensure your popup gets closed and your test is able to continue its journey:
  * Create a **[JavaScript assertion][4]** at the very beginning of your browser test to regularly try to close the popup:

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

  * Record steps to close your popup, add them in-between all your other browser test steps, and tick the **[`Allow this step to fail` box][3]** for each of them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /synthetics/browser_tests/#test-configuration
[3]: /synthetics/browser_tests/advanced_options/#optional-step
[4]: /synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
