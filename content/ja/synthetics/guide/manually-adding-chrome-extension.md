---
title: Manually Add The Chrome Extension For Your Browser Tests
kind: guide
further_reading:
    - link: "https://www.datadoghq.com/blog/browser-tests/"
      tag: Blog
      text: User experience monitoring with Datadog Browser Tests
    - link: /synthetics/browser_tests
      tag: Documentation
      text: Create a browser Test
---

## Overview

If you are unable to download applications directly from the Chrome Web Store because of security reasons, leverage Datadog's extension detection system, available for the Datadog Synthetics Chrome Extension v3.1.6+, to record Synthetic browser tests.

1. Download the Datadog test recorder extension's [latest CRX file][1].
2. Upload this CRX file to your internal application store and repackage the extension. The new extension's icon appears in the Chrome browser next to your extensions.

   {{< img src="synthetics/guide/manually_adding_chrome_extension/icon.png" alt="the icon that appears in your browser" style="width:100%;" >}}

3. Create your [browser test][2] by [defining your test configuration][3] (such as the test name, tags, locations, and frequency) and clicking **Save Details & Record Test**. To get started with your recording, first download the [Datadog test recorder extension][4].
4. Click the recorder extension icon on the top right hand corner of your browser. The Datadog test recorder extension automatically detects the extension uploaded in your internal application store.
5. Start [recording your browser test's steps][5] and click **Save Recording** when you're done. 

   {{< img src="synthetics/guide/manually_adding_chrome_extension/record_test.png" alt="record your browser tests" style="width:100%;" >}}

**Note:** Datadog releases test recorder extension updates on the [Chrome Web Store][4]. You can manually update your internal extension to record browser tests.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/synthetics-browser-extension
[2]: https://app.datadoghq.com/synthetics/browser/create
[3]: /synthetics/browser_tests/#test-configuration
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en
[5]: /synthetics/browser_tests/#record-your-steps
