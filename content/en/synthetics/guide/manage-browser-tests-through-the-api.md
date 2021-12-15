---
title: Manage Your Browser Tests Programmatically
kind: guide
further_reading:
    - link: '/synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Learn about Browser Tests'
    - link: '/api/latest/synthetics'
      tag: 'API'
      text: 'Synthetics API'
    - link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test'
      tag: 'Terraform'
      text: 'Create and manage Synthetic Browser Tests with Terraform'
---

## Overview

Monitoring your application end-to-end is crucial to understanding your users' experience. The [Datadog test recorder][1] allows you to simplify configuration for these complex testing workflows. However, you may want to manage your Synthetics resources programmatically and define browser tests with the API.

## Manage your browser tests with the API

Datadog recommends creating your browser tests in the Datadog UI first and retrieving your tests configurations with the API.

1. [Create a browser test][2] and [save a recording][3].
2. Use the [Get the list of all tests endpoint][4] to retrieve the list of all Synthetics tests.
3. Filter on `type: browser` and retrieve the `public_ids` of the browser tests you want to manage with the API. 
4. Use the [Get a browser test endpoint][5] to retrieve the configuration files of every browser test.

You can store the browser test configuration files for later usage or use them to duplicate, update, and delete your browser tests programmatically.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: /getting_started/synthetics/browser_test#create-a-browser-test
[3]: /getting_started/synthetics/browser_test#create-recording
[4]: /api/latest/synthetics/#get-the-list-of-all-tests
[5]: /api/latest/synthetics/#get-a-browser-test
