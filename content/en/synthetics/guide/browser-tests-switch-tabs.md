---
title: Can browser tests switch tabs?
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

If some actions performed by the Browser test on your application (for instance, a click on a link) lead to opening another tab where you want your Browser test to execute other steps, just record all steps normally. The Browser test is able to switch tabs automatically at test execution to run its steps on the fresh tab.

**Note:** Your test first needs to interact with the page (for instance, through a click) to be able to perform an [assertion][1] on that new page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions#assertion
