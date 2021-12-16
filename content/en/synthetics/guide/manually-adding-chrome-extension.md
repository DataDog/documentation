---
title: Manually adding the Browser Test Chrome Extension to Internal Applications Stores
kind: guide
further_reading:
    - link: 'https://www.datadoghq.com/blog/browser-tests/'
      tag: 'Blog'
      text: 'User experience monitoring with Datadog Browser Tests'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
---

If you are unable to download applications directly from the Chrome Web Store for security reasons, you can still record Synthetic browser tests by leveraging Datadog's smart extension detection system (available starting from extension version 3.1.6).

1. Download the [Datadog test recorder extension][1] CRX file.
2. Upload this CRX file to your internal application store and repackage it. The icon of your new extension should appear in your Chrome browser, next to your other Chrome extensions.
  {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="the icon that appears in your browser">}}
3. Start creating your [browser test][2]: [define your test configuration][3] (test name, tags, locations, frequency, etc.), then click `Save Details & Record Test`. You are on the recorder page: you should see a message asking you to download the [Datadog test recorder extension][1] to get started with your recording.
4. Click the icon that just appeared at the top right hand corner of your browser. The [Datadog test recorder extension][1] automatically detects the extension that was uploaded to your internal application store and you’re now able to [start recording your browser test’ steps][4].
  {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="record your browser tests">}}

**Note:** Manually update your internal extension when Datadog releases test recorder extension updates.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[2]: /synthetics/browser_tests
[3]: /synthetics/browser_tests/#configuration
[4]: /synthetics/browser_tests/#record-test
