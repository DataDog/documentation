---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/find-each
- /static_analysis/rules/rails-best-practices/find-each
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/find-each
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Use find_each to iterate over a collection of AR objects
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/find-each`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule ensures efficient use of memory when dealing with large collections of ActiveRecord (AR) objects. The `each` method loads all the objects at once into memory, which can cause significant performance issues if the collection is large. In contrast, `find_each` loads a batch of records (1000 by default) into memory, processes them, and then loads the next batch, significantly reducing memory usage.

This rule is especially relevant when dealing with large datasets, where the `each` method can lead to 'out of memory' errors.

To adhere to this rule, replace `each` with `find_each` when iterating over collections of ActiveRecord objects. For example, instead of writing `Foo.all.each`, write `Foo.all.find_each`. Similarly, replace `Foo.where('foo > 42').each` with `Foo.where('foo > 42').find_each`.

## Non-Compliant Code Examples
```ruby
Foo.all.each do |foo_instance|
  foo_instance.do_awesome_stuff
end

Foo.where('foo > 42').each do |foo_instance|
  foo_instance.party_all_night!
end
```

## Compliant Code Examples
```ruby
Foo.all.find_each do |foo_instance|
  foo_instance.do_awesome_stuff
end

Foo.where('foo > 42').find_each do |foo_instance|
  foo_instance.party_all_night!
end
```
