---
aliases:
- /continuous_integration/static_analysis/rules/ruby-inclusive/var-definition
- /static_analysis/rules/ruby-inclusive/var-definition
dependencies: []
disable_edit: true
group_id: ruby-inclusive
meta:
  category: Best Practices
  id: ruby-inclusive/var-definition
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Check variable names for wording issues
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-inclusive/var-definition`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The rule checks the variable names in your Ruby code for potential wording issues. The purpose of this rule is to encourage the use of inclusive language in your codebase. Using inclusive language helps to create a more welcoming and respectful environment for everyone involved in the project. 

Non-compliant code may contain variable names that have been identified as potentially offensive or non-inclusive, such as `master`.

To comply with this rule, use alternative, inclusive terms when naming your variables. For instance, instead of using `master`, you could use `primary` or `main`.

## Non-Compliant Code Examples
```ruby
master = 1
```

## Compliant Code Examples
```ruby
primary = 1
```
