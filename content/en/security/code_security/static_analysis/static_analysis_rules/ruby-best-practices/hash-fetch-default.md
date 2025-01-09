---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/hash-fetch-default
- /static_analysis/rules/ruby-best-practices/hash-fetch-default
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/hash-fetch-default
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use fetch with default over custom check
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/hash-fetch-default`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule emphasizes the importance of using the `fetch` method with a default value in Ruby, rather than a custom check. This is because the `fetch` method correctly handles 'falsey' values, such as `false` or `nil`, and will return them when they are the actual value associated with a key in a hash. This prevents unexpected results that may occur when using a custom check, as it may incorrectly evaluate a 'falsey' value as not present and return the default value instead.

The importance of this rule lies in the accuracy and predictability of your code. It ensures that you are correctly handling all potential values in a hash and not mistakenly returning a default value when the key is present but associated with a 'falsey' value. This can lead to bugs that are hard to track down and fix in your code.

To abide by this rule, always use the `fetch` method with a default value when checking if a key is present in a hash and you want to return a default value if it isn't. This method will correctly handle all values, including 'falsey' ones, and return the accurate result. For example, instead of using `hash[:key] || default_value`, use `hash.fetch(:key, default_value)`.

## Non-Compliant Code Examples
```ruby
test = { foo: 'foo', is_bar: false }

# on a falsey value, you get unexpected results
test[:is_bar] || true # => true
```

## Compliant Code Examples
```ruby
test = { foo: 'foo', is_bar: false }

# fetch works on falsey values, so you get expected results
test.fetch(:is_bar, true) # => false
```
