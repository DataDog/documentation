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

Synthetic browser tests automatically handle [JavaScript modals][1]: 
 - `alert` modals are closed. 
 - `prompt` and `confirm` modals are answered `Lorem Ipsum`. 
 - For Basic Auth popups, specify the associated credentials in your browser test configuration, below the [`HTTP Auth` **Advanced option**][2]:

{{< img src="synthetics/guide/popup/http_auth_option.png" alt="Basic Auth Popup">}}

If a popup appears at a specific point of your journey, you can record a step to close it and allow this step to fail using the [corresponding option][3]. This way, your test knows how to behave in case a popup appears. If the popup does not show up, the step fails without causing the whole test to fail. 

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Allow step to fail to handle popup">}}

If the time at which these popups appear in a session is not predictable, check with the third party providing the popup to see if they can create a rule that prevents the popup from appearing during your browser test execution. They could, for example, provide you with a cookie that you can input below the [dedicated **Advanced option**][2] of your test.

Alternatively, use one of these methods to ensure your popup is closed and your test is able to continue its journey:
  * Create a [JavaScript assertion][4] at the beginning of your browser test to regularly try to close the popup:

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

  * Record steps to close the popup, add them between all your other browser test steps, and select the **[`Allow this step to fail` option][3]** for each of them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /synthetics/browser_tests/#test-configuration
[3]: /synthetics/browser_tests/advanced_options/#optional-step
[4]: /synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
