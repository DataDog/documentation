---
title: Clone Your Synthetic Tests
kind: guide
aliases:
  - /synthetics/faq/clone-test/
further_reading:
- link: /synthetics/
  tag: Documentation
  text: Learn about Synthetic Monitoring
---

## Overview

To clone a Synthetics test, use the UI or API endpoints.

## Use the UI

1. In a Synthetics test, click the **Gear** icon on the right.  
2. Click **Clone** in the dropdown menu.

{{< img src="synthetics/faq/clone-test.mp4" alt="Cloning your Synthetic tests" video="true" width="90%" >}}

## Use the API

1. Retrieve your test configuration with the relevant endpoint. See [Get an API test][1] or [Get a browser test][2].
2. Perform modifications as needed (such as changing the URL or tags).
3. Send your updated test configuration with the relevant endpoint. See [Create an API test][3] or [Create a browser test][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/synthetics/#get-an-api-test
[2]: /api/latest/synthetics/#get-a-browser-test
[3]: /api/latest/synthetics/#create-an-api-test
[4]: /api/latest/synthetics/#create-a-browser-test
