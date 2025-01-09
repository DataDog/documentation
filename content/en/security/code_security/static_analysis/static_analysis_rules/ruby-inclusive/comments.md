---
aliases:
- /continuous_integration/static_analysis/rules/ruby-inclusive/comments
- /static_analysis/rules/ruby-inclusive/comments
dependencies: []
disable_edit: true
group_id: ruby-inclusive
meta:
  category: Best Practices
  id: ruby-inclusive/comments
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Check comments for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-inclusive/comments`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule checks the comments in your Ruby code for potentially insensitive or inappropriate wording. It specifically flags terms considered problematic due to historical connotations.

To avoid violating this rule, use neutral, descriptive terms in your comments. For example, instead of using "master", you could use terms like "primary", "main", or "leader".

## Non-Compliant Code Examples
```ruby
# master
print("foo")
```

## Compliant Code Examples
```ruby
# primary
print("foo")
```
