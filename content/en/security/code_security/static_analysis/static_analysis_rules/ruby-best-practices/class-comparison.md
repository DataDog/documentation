---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/class-comparison
- /static_analysis/rules/ruby-best-practices/class-comparison
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/class-comparison
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use instance_of? for class comparison
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/class-comparison`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
In Ruby, it is recommended to use the `instance_of?` method for class comparison. This is because `instance_of?` only returns true if the object is an instance of that exact class, not a subclass. The method provides a strict way of checking an object's class, which helps in maintaining the integrity of the code.

Using other methods such as `something.class == Date` or `something.class.equal?(Date)` are not considered good coding practice. These methods could lead to unwanted behavior, particularly if the object's class is a subclass of the specified class. 

To adhere to this rule, always use `something.instance_of?(Date)` when you need to check if an object is an instance of a specific class. This ensures the object is exactly an instance of the class, not a subclass, providing more accurate and reliable results. This practice can help avoid potential bugs and make your code more robust and easier to understand.

## Non-Compliant Code Examples
```ruby
something.class == Date
something.class.equal?(Date)
something.class.eql?(Date)
something.class.name == 'Date'
something.class.name == "Date"
```

## Compliant Code Examples
```ruby
something.instance_of?(Date)

```
