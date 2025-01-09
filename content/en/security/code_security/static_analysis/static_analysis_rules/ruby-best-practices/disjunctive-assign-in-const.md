---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/disjunctive-assign-in-const
- /static_analysis/rules/ruby-best-practices/disjunctive-assign-in-const
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/disjunctive-assign-in-const
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid unnecessary disjunctive assignments in constructor
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/disjunctive-assign-in-const`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule pertains to the practice of avoiding unnecessary disjunctive (or conditional) assignments in class constructors in Ruby. A disjunctive assignment, denoted by `||=`, is a shorthand way of saying "if this variable is `nil` or `false`, assign it this value; otherwise, leave it as it is." While this can be a useful tool in some instances, using it in a class constructor can lead to confusing and unexpected behavior.

The main reason to avoid this practice is that it can lead to unexpected values for instance variables. In the non-compliant code example, if `@foo` somehow has a value before the constructor is called, that value will be preserved instead of being set to `42` as might be expected. This can make debugging more difficult and lead to subtle, hard-to-find bugs.

To avoid this issue, assign the value directly in the constructor, as shown in the compliant code example. This ensures that the instance variable will always have the expected value when the constructor is finished. It's a small change, but it can make your code much easier to understand and debug.

## Non-Compliant Code Examples
```ruby
def initialize
  @foo ||= 42
end
```

## Compliant Code Examples
```ruby
def initialize
  @foo = 42
end
```
