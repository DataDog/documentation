---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-avoid-constantize
- /static_analysis/rules/ruby-security/rails-avoid-constantize
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Best Practices
  id: ruby-security/rails-avoid-constantize
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid constantize
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-avoid-constantize`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule "Avoid constantize" advises against the use of `constantize` and `safe_constantize` methods in Ruby. These methods are used to convert a string into a constant, but they pose a significant security risk.

The `constantize` method can be exploited to run arbitrary code in your application, which makes it a potential target for code injection attacks. For example, a malicious user could manipulate the string to reference a class that performs destructive actions when loaded.

Instead of using `constantize` or `safe_constantize`, explicitly reference the constant you need. If you have a limited set of constants you want to access based on a string, consider using a hash or case statement to map strings to constants. This gives you control over which constants are accessible, and prevents arbitrary constants from being referenced.

In general, it's best to avoid methods that can execute code based on user input or other untrusted sources. Always prioritize secure coding practices to maintain the integrity and safety of your application.

#### Learn More

- [`constantize`](https://apidock.com/rails/String/constantize)
- [`safe_constantize`](https://apidock.com/rails/String/safe_constantize)
- [Handle unsafe reflection](https://stackoverflow.com/questions/23741259/brakeman-unsafe-reflection-method-constantize-called-with-model-attribute)

## Non-Compliant Code Examples
```ruby
"Module".constantize
"Class".safe_constantize
```
