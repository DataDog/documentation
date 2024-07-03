---
core_product:
- ci-cd
title: flaky test
---
A flaky test is a test that exhibits both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the test passes, that test is unreliable as proof of quality code. For more information, <a href="/tests/search/#test-results">see the documentation</a>.