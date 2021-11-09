---
title: Clone your Synthetic tests
kind: faq
further_reading:
- link: "/synthetics/"
  tag: "Documentation"
  text: "Manage your checks"
---

You can clone your Synthetic tests using our API:

1. Retrieve your test configuration using the [Get a test][1] endpoint.
2. Perform modifications if needed (URL, tags, etc.).
3. Send your new test configuration using the [Create a test][2] endpoint.
For browser tests, add the `from_test_id` parameter at the end of the endpoint and set its value to the id of the test being cloned. This will allow steps cloning. The endpoint should be `https://api.datadoghq.com/api/v1/synthetics/tests?from_test_id=<SYNTHETIC_TEST_PUBLIC_ID>`.

[1]: /api/v1/synthetics/#get-test
[2]: /api/v1/synthetics/#create-or-clone-test
