---
title: Troubleshooting the PHP Profiler
kind: Documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, run the `phpinfo()` function. The profiler hooks into `phpinfo()` to run diagnostics. If the webserver is having problems, run `phpinfo()` from the webserver and not from the command line as each Server API (SAPI) can be configured independently.

[Open a support ticket][1] with the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- The output from `phpinfo()`, which includes PHP version, SAPI type, Datadog library versions, and the profiler diagnostics.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help/
