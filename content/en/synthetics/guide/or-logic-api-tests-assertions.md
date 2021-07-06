---
title: Perform OR logic in API tests assertions
kind: guide
further_reading:
    - link: '/synthetics/api_tests'
      tag: 'Documentation'
      text: 'Create an API Test'
    - link: '/synthetics/multistep'
      tag: 'Documentation'
      text: 'Create a Multistep API Test'
    - link: "/getting_started/synthetics/api_test"
      tag: "Documentation"
      text: "Get started with HTTP tests"
---

In some cases, you might want to perform `OR` logic on your [API tests][1] assertions in order to define several different expected values for a same assertion type. For example, you would like your [HTTP test][2] `status code` assertion to succeed in case your server responds with a `200` **or** with a `302`.

To do this, you can use the [`matches regex` comparator][3] and define a regex like `(200|302)`. With such an assertion, your test result is successful if the status code returned by the server is 200 or 302.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/api_tests/http_tests/
[3]: /synthetics/api_tests/http_tests/?tab=requestoptions#define-assertions
