---
title: Manually Add The Chrome Extension For Your Browser Tests
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Manually Add The Chrome Extension For Your Browser Tests
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/index.html
---

# Manually Add The Chrome Extension For Your Browser Tests

## Overview{% #overview %}

If you are unable to download applications directly from the Chrome Web Store because of security reasons, leverage Datadog's extension detection system, available for the Datadog Synthetics Chrome Extension v3.1.6+, to record Synthetic browser tests.

1. Download the Datadog test recorder extension's [latest CRX file](https://github.com/DataDog/synthetics-browser-extension).

1. Upload this CRX file to your internal application store and repackage the extension. The new extension's icon appears in the Chrome browser next to your extensions.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/manually_adding_chrome_extension/icon.e426c752336116056c03d94990b35a65.png?auto=format"
      alt="the icon that appears in your browser" /%}

1. Create your [browser test](https://app.datadoghq.com/synthetics/browser/create) by [defining your test configuration](https://docs.datadoghq.com/synthetics/browser_tests/#test-configuration) (such as the test name, tags, locations, and frequency) and clicking **Save Details & Record Test**. To get started with your recording, first download the [Datadog test recorder extension](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en).

1. Click the recorder extension icon on the top right hand corner of your browser. The Datadog test recorder extension automatically detects the extension uploaded in your internal application store.

1. Start [recording your browser test's steps](https://docs.datadoghq.com/synthetics/browser_tests/#record-your-steps) and click **Save Recording** when you're done.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/manually_adding_chrome_extension/record_test.682a36f6172eb4e59b1c0474edb33d15.png?auto=format"
      alt="record your browser tests" /%}

**Note:** Datadog releases test recorder extension updates on the [Chrome Web Store](https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa?hl=en). You can manually update your internal extension to record browser tests.

## Further Reading{% #further-reading %}

- [User experience monitoring with Datadog Browser Tests](https://www.datadoghq.com/blog/browser-tests/)
- [Create a browser Test](https://docs.datadoghq.com/synthetics/browser_tests)
