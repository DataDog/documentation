---
code_lang: python
code_lang_weight: 20
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM トラブルシューティング
title: Python プロファイラーのトラブルシューティング
type: multi-code-lang
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Python 3.9.5)

Refer to the python APM client [troubleshooting documentation][3] for additional guidance.  


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
[3]: https://ddtrace.readthedocs.io/en/stable/troubleshooting.html