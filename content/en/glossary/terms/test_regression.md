---
# Glossary Term
title: test regression

core_product:
  - ci-cd
  
---
A test run is marked as a regression when its duration is both five times the mean and greater than the max duration for the same test in the default branch. A benchmark test run is marked as a regression when its duration is five times the standard deviation above the mean for the same test in the default branch. 

A benchmark test has `@test.type:benchmark`. The mean and the max of the default branch is calculated over the last week of test runs. For more information, <a href="/tests/search/#test-regressions">see the documentation</a>.