---
core_product:
- ci-cd
related_terms:
- performance regression
title: test regression
---
In Datadog CI Test Visibility, a test run is marked as a regression when its duration is both five times the mean and greater than the max duration for the same test in the default branch. Additionally, the test run must have a minimum duration of 500ms to be considered a regression. A benchmark test run (`@test.type:benchmark`) is marked as a regression when its duration is five times the standard deviation above the mean for the same test in the default branch.

The mean and maximum durations of the default branch are calculated based on the test runs from the past week. For the algorithm to consider a test run, there must be a minimum of 100 test runs on the default branch. For benchmark test runs, the minimum number of test runs is 10.
For more information, <a href="/tests/search/#test-regressions">see the documentation</a>.