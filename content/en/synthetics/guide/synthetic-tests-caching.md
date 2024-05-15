---
title: Avoid Cache Issues In Synthetic Tests
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/api_tests/http_tests'
      tag: 'Documentation'
      text: 'Configure an HTTP test'

---

## Overview

This guide describes how you can avoid caching issues while using Synthetic tests.

## API tests

### HTTP tests

You can leverage [local variables][1] to generate a random string and send it with your payload to ensure your [HTTP tests][2] do not use your caching systems.

## Browser tests

Browsers are killed after every test execution, which ensures that your browser tests do not experience cache-related issues on the client side.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /synthetics/api_tests/http_tests
