---
# Glossary Term
title: flaky test

core_product:
  - ci-cd
short_definition: A flaky test is a test that exhibits both a passing and failing status across multiple test runs for the same commit.
---
A flaky test is a test that exhibits both a passing and failing status across multiple test runs for the same commit. If you commit some code and run it through CI, and a test fails, and you run it through CI again and the test passes, that test is unreliable as proof of quality code. For more information, <a href="/tests/flaky_test_management">see the documentation</a>.