---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/initialization-shorthand
- /static_analysis/rules/ruby-best-practices/initialization-shorthand
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/initialization-shorthand
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use ||= to initialize variables if they are not already
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/initialization-shorthand`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Use ||= to initialize variables if they are not already" is a best practice in Ruby to ensure clean, readable, and efficient code. The '||=' operator is used to assign a value to a variable only if the variable is currently `nil` or `false`. This is a more concise and readable way to express conditional assignment, as opposed to using the `unless` keyword.

This rule is important because it promotes code clarity and efficiency. Using '||=' for conditional assignment reduces the cognitive load on the developer reading the code, as it clearly expresses the intent in a single, straightforward operation. It also avoids unnecessary assignments when the variable is already initialized, potentially improving performance.

To adhere to this rule, use '||=' whenever you want to assign a value to a variable only if it's not already initialized. For instance, instead of writing `name = 'Bozhidar' unless name`, write `name ||= 'Bozhidar'`. This clearly communicates the intent and ensures the assignment only happens when necessary.

## Non-Compliant Code Examples
```ruby
name = 'Bozhidar' unless name
```

## Compliant Code Examples
```ruby
name ||= 'Bozhidar'
```
