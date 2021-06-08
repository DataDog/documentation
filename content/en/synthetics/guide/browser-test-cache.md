---
title: Avoiding cache issues in browser tests
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/browser_tests/actions'
      tag: 'Documentation'
      text: 'Create Browser Test Steps'
    - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
      tag: 'Blog'
      text: 'Best practices for creating end-to-end tests'

---

Browsers are killed after every test execution. This ensures your tests do not face cache related issues on the client side.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
