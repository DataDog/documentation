---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/proc-over-procnew
- /static_analysis/rules/ruby-best-practices/proc-over-procnew
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/proc-over-procnew
  language: Ruby
  severity: Info
  severity_rank: 4
title: Prefer proc over Proc.new
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/proc-over-procnew`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Prefer proc over Proc.new" is an important guideline in Ruby programming. It advises developers to use the `proc` method rather than `Proc.new` when creating a new Proc object. The `proc` method is more idiomatic to Ruby and is preferred because of its simplicity and readability.

The importance of this rule lies in maintaining consistency and clarity in your code. Using `proc` instead of `Proc.new` makes your code more concise and easier to read and understand. It also aligns with the Ruby community's best practices, which favor simplicity and readability.

To avoid violating this rule, always use `proc` when you need to create a new Proc object. For example, instead of writing `Proc.new { |n| puts n }`, you should write `proc { |n| puts n }`. This small change can significantly improve the readability of your code.

## Non-Compliant Code Examples
```ruby
p = Proc.new { |n| puts n }

```

## Compliant Code Examples
```ruby
p = proc { |n| puts n }

```
