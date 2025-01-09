---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-optional-hash-params
- /static_analysis/rules/ruby-best-practices/no-optional-hash-params
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-optional-hash-params
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid hash optional paramters
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-optional-hash-params`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule "Avoid hash optional parameters" is a guideline that encourages developers to explicitly declare parameters instead of using a hash for optional parameters. This is because using a hash for optional parameters can make the code harder to understand and maintain. It can also lead to unexpected behavior if a developer accidentally includes a key in the hash that the method does not expect.

This rule is important because it promotes code readability and maintainability. It also helps prevent potential bugs that may occur due to unexpected keys in the optional hash. By explicitly declaring each parameter, developers can easily see what parameters a method expects, making the code easier to read and understand.

To adhere to this rule, instead of using a hash for optional parameters, explicitly declare each parameter in the method definition. For example, instead of using `options = {}` in the method definition, declare each parameter like `name, email, age`. This way, anyone reading the code can easily understand what parameters the method expects and in what order.

## Non-Compliant Code Examples
```ruby
def create_person(options = {})
  person = Person.new(options)
  person.save
  person
end
```

## Compliant Code Examples
```ruby
def create_person(name, email, age)
  person = Person.new(name: name, email: email, age: age)
  person.save
  person
end
```
