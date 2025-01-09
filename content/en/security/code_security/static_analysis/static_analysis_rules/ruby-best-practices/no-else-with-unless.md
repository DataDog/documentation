---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-else-with-unless
- /static_analysis/rules/ruby-best-practices/no-else-with-unless
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-else-with-unless
  language: Ruby
  severity: Info
  severity_rank: 4
title: Do not use unless with else
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-else-with-unless`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Do not use unless with else" is a coding guideline that promotes clarity and readability in Ruby code. The `unless` keyword in Ruby is used as the inverse of `if`, meaning it executes the code block only if the condition is false. When an `else` statement is added to an `unless` statement, it can make the logic harder to follow and understand, especially for those new to the language or the codebase.

Why is this important? Readability and clarity are essential for maintaining a healthy codebase. Code is read more often than it is written, and it is crucial that it remains clear to all developers in a team. An `unless-else` construct can be confusing because it effectively double-negates the logic, making it harder to understand at a glance. 

To avoid violating this rule, use an `if-else` construct instead. It conveys the same logic in a more straightforward manner. The `if-else` construct is also more common across different programming languages, making it easier for developers with different backgrounds to understand. For example, instead of writing `unless condition; else; end`, write `if !condition; else; end`.

## Non-Compliant Code Examples
```ruby
unless success?
  puts 'failure'
else
  # foo
  puts 'success'
end

```

## Compliant Code Examples
```ruby
if success?
  puts 'failure'
else
  #foo
  puts 'success'
end
```
