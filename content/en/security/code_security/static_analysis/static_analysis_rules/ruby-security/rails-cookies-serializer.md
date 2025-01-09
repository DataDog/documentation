---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-cookies-serializer
- /static_analysis/rules/ruby-security/rails-cookies-serializer
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rails-cookies-serializer
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure cookies are serialized using JSON
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-cookies-serializer`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
This rule states that cookies in a Ruby on Rails application should be serialized using JSON. This is important because JSON is a safer method for serialization compared to others like `:marshal` and `:hybrid`. The `:marshal` method is known to have potential security vulnerabilities, and the `:hybrid` method, while safer than `:marshal`, is still not as secure as JSON.

Cookies often contain sensitive data, and if they are not properly serialized, it could lead to security issues such as unauthorized access to user data. Therefore, it's crucial to use a secure method for cookie serialization to protect your application and its users.

To adhere to this rule, always set your cookie serializer to `:json` in your Rails application configuration. This can be done by adding the line `Rails.application.config.action_dispatch.cookies_serializer = :json` to your configuration file. This ensures that all cookies are serialized safely using JSON, thus reducing the risk of potential security vulnerabilities.

## Non-Compliant Code Examples
```ruby
Rails.application.config.action_dispatch.cookies_serializer = :hybrid
Rails.application.config.action_dispatch.cookies_serializer = :marshal
```

## Compliant Code Examples
```ruby
Rails.application.config.action_dispatch.cookies_serializer = :json
```
