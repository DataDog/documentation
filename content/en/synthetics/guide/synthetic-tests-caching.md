---
title: Avoiding cache issues in Synthetic tests
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/api_tests/http_tests'
      tag: 'Documentation'
      text: 'Configure an HTTP test'

---

## Browser tests

Browsers are killed after every test execution. This ensures your Browser tests do not face cache related issues on the client side.

## API tests

### HTTP tests

You can leverage [local variables][1] to generate a random string to send with your payload and ensure your [HTTP tests][2] do not use your caching systems.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /synthetics/api_tests/http_tests
