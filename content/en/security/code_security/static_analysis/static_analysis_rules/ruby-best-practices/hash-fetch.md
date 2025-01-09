---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/hash-fetch
- /static_analysis/rules/ruby-best-practices/hash-fetch
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/hash-fetch
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use fetch to check hash keys
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/hash-fetch`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Use fetch to check hash keys" encourages the use of the `fetch` method over the direct hash access method `[]` for checking hash keys. This is because `fetch` raises an error when the key does not exist in the hash, making the code more robust and fail-safe by preventing any unexpected behavior due to missing hash keys.

The significance of this rule lies in its ability to make the code more predictable and error-resistant. When a hash key is accessed directly using `[]`, and the key does not exist, Ruby returns `nil` by default. This can lead to subtle bugs if the existence of the key is crucial for the subsequent code. Using `fetch`, on the other hand, will raise a `KeyError` if the key is not found, making it immediately clear that there's an issue with the code.

Adhering to this rule is straightforward. Instead of using direct hash access, use the `fetch` method whenever you need to access a hash key. For example, instead of `hash[:key]`, use `hash.fetch(:key)`. This way, if the key does not exist in the hash, your code will raise an error, allowing you to catch and handle the problem early on.

## Non-Compliant Code Examples
```ruby
test = { foo: 'foo', bar: 'bar', magic_num: 42 }
test[:foo] # => 'foo'
test[:qux] # => nil

def foo(opts)
  puts opts[:bar]
end
```

## Compliant Code Examples
```ruby
test = { foo: 'foo', bar: 'bar' }
test.fetch(:foo) # => 'foo'
test[:bar] = 42
test.fetch(:qux) # => KeyError
```
