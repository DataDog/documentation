---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/identity-comparison
- /static_analysis/rules/ruby-best-practices/identity-comparison
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/identity-comparison
  language: Ruby
  severity: Info
  severity_rank: 4
title: Prefer equal? over == when comparing object_id
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/identity-comparison`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
In Ruby, the rule "Prefer `equal?` over `==` when comparing `object_id`" is important to remember because of how these two comparison methods function. The `equal?` method checks if the two compared references point to the exact same object, while the `==` method checks if the values of the two objects are the same.

This rule is crucial because when you are comparing `object_id`, you are actually interested in whether the two objects are the same object, not whether their values are equal. Using `==` can lead to unexpected results if two different objects have the same `object_id`.

To adhere to this rule and maintain good coding practices, always use `equal?` when comparing `object_id`. This ensures that you are accurately checking if the two objects are the same. For instance, instead of writing `foo.object_id == bar.object_id`, you should write `foo.equal?(bar)`. This way, you are properly checking for object identity, not object equality.

## Non-Compliant Code Examples
```ruby
foo.object_id == bar.object_id
```

## Compliant Code Examples
```ruby
foo.equal?(bar)
```
