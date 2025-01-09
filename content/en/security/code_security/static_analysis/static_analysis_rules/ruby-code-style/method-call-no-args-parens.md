---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/method-call-no-args-parens
- /static_analysis/rules/ruby-code-style/method-call-no-args-parens
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/method-call-no-args-parens
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid parentheses when methods take no arguments
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/method-call-no-args-parens`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The rule "Avoid parentheses when methods take no arguments" is part of the Ruby style guide. It suggests that when a method takes no arguments, you should not use parentheses. This is because the use of parentheses in such a case is redundant and unnecessary, and it can make your code more difficult to read and understand.

This rule is important because it promotes cleaner, more readable code. In Ruby, clean and readable code is highly valued. By following this rule, you can ensure your code is easier to understand and maintain, which is crucial for long-term project success.

To adhere to this rule, remove the parentheses when calling a method that does not require any arguments. For example, instead of writing `'test'.upcase()`, you should write `'test'.upcase`. Similarly, instead of `Kernel.exit!()`, write `Kernel.exit!`. However, note that there is an exception for `super` - `super` by itself is different from `super()`, so in this case, parentheses may be necessary.

## Non-Compliant Code Examples
```ruby
Kernel.exit!()
2.even?()
fork()
'test'.upcase()

```

## Compliant Code Examples
```ruby
Kernel.exit!
2.even?
fork
'test'.upcase

# 'super' with empty parentheses is different from 'super' by itself
super
super()

```
