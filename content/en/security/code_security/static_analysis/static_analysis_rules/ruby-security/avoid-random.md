---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/avoid-random
- /static_analysis/rules/ruby-security/avoid-random
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/avoid-random
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid Random
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/avoid-random`

**Language:** Ruby

**Severity:** Notice

**Category:** Security

**CWE**: [330](https://cwe.mitre.org/data/definitions/330.html)

## Description
The "Avoid Random" rule is focused on discouraging the use of the `rand` method with negative numbers or without any arguments. This is because `rand` without arguments returns a floating-point number between 0 and 1, which can lead to unpredictable results and make the code harder to test and debug. Moreover, using `rand` with negative numbers is not allowed and will raise an error.

This rule is important because it promotes the use of predictable and testable code. Randomness in code can lead to inconsistent behavior, which makes it more difficult to identify and fix bugs. Additionally, the use of a random number generator without a defined range or with a negative range can lead to unexpected results or runtime errors, respectively.

To avoid this, always use `rand` with a positive integer argument to define the range of the random numbers that can be generated. This ensures that the output is predictable and within a specific range. For example, use `rand(100)` to generate a random number between 0 and 99. If you need a random floating-point number within a specific range, you can use `rand` in combination with `Range#to_a`, like `rand(1.0..10.0)`. This will generate a random floating-point number between 1.0 and 10.0.

## Non-Compliant Code Examples
```ruby
rand(-100)
```
