---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-escape-json-entities
- /static_analysis/rules/ruby-security/rails-escape-json-entities
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rails-escape-json-entities
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure HTML entities are escaped in JSON
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-escape-json-entities`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
This rule is designed to ensure that HTML entities are escaped when they are included in JSON. Escaping HTML entities in JSON is important because it helps to prevent cross-site scripting (XSS) attacks. XSS attacks can allow attackers to inject malicious scripts into web pages viewed by other users, leading to a wide range of potential security issues.

The `ActiveSupport.escape_html_entities_in_json` configuration option in Ruby on Rails controls whether or not HTML entities are escaped in JSON. By default, this option is set to `false`. However, for better security, it should be set to `true`.

To avoid violating this rule, always set `ActiveSupport.escape_html_entities_in_json = true` in your Ruby on Rails applications. This will ensure that any HTML entities that are included in your JSON are properly escaped, helping to protect your application from potential XSS attacks.

## Non-Compliant Code Examples
```ruby
ActiveSupport.escape_html_entities_in_json = false
```

## Compliant Code Examples
```ruby
ActiveSupport.escape_html_entities_in_json = true
```
