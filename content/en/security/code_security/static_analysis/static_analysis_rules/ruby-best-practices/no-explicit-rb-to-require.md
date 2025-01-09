---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-explicit-rb-to-require
- /static_analysis/rules/ruby-best-practices/no-explicit-rb-to-require
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-explicit-rb-to-require
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Omit the rb file extension in a require
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-explicit-rb-to-require`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Omit the rb file extension in a require" is a coding convention in Ruby programming. It is designed to enforce the best practice of omitting the ".rb" extension when using the `require` or `require_relative` methods to include another Ruby file. This is because Ruby's `require` method automatically searches for the ".rb" extension, and including it is redundant.

This rule is important because it promotes cleaner and more readable code. Writing the extension in a `require` statement is unnecessary and can lead to confusion. In addition, adhering to this rule can prevent potential issues with file loading, as Ruby might interpret a require with an explicit ".rb" extension differently.

To avoid violating this rule, omit the ".rb" extension when using `require` or `require_relative`. For example, instead of writing `require 'foo.rb'`, write `require 'foo'`. For relative paths, instead of `require_relative '../bar.rb'`, use `require_relative '../bar'`. This will ensure your code is clean, readable, and adheres to Ruby's best practices.

## Non-Compliant Code Examples
```ruby
require 'foo.rb'
require_relative '../bar.rb'
```

## Compliant Code Examples
```ruby
require 'foo'
require 'bar.so'
require_relative '../baz'
require_relative '../qux.so'
```
