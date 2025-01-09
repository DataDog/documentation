---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/infinite-loop
- /static_analysis/rules/ruby-best-practices/infinite-loop
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/infinite-loop
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use Kernel#loop instead of while/until
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/infinite-loop`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The Ruby static analysis rule "Use Kernel#loop instead of while/until" focuses on promoting the use of `Kernel#loop` for infinite loops rather than `while true` or `until false`. This is because `Kernel#loop` is more idiomatic to Ruby, and it communicates the intent of an infinite loop more clearly. This rule helps to maintain readability, which is crucial in large codebases where understanding the flow and function of the code is important.

The `while true` or `until false` expressions can be misleading as they suggest a condition that might change, even though they are used to create infinite loops. Using `Kernel#loop` eliminates this ambiguity, making the code easier to understand.

To adhere to this rule, replace any `while true` or `until false` loops with `Kernel#loop`. The body of the loop remains the same. This small change can significantly improve the clarity of the code, making it more understandable for other developers who might work on the same codebase.

## Non-Compliant Code Examples
```ruby
while true
  do_something
end

until false
  do_something
end
```

## Compliant Code Examples
```ruby
loop do
  do_something
end
```
