---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-basic-auth
- /static_analysis/rules/ruby-security/rails-basic-auth
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rails-basic-auth
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid hardcoded basic auth with rails
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-basic-auth`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [798](https://cwe.mitre.org/data/definitions/798.html)

## Description
This rule advises against hardcoding basic authentication credentials directly in your Rails application. Hardcoded credentials pose a significant security risk as they can easily be exposed unintentionally, leading to unauthorized access to sensitive data or systems.

It is important to adhere to this rule because it promotes good security practices. By avoiding hardcoded credentials, you reduce the potential for security breaches and ensure that your application's authentication mechanisms are robust and secure.

To avoid violating this rule, store your basic authentication credentials in a secure and encrypted format, such as environment variables or a secure credentials storage system. For instance, instead of hardcoding the password directly in the `http_basic_authenticate_with` method, you can fetch it from an environment variable like this: `http_basic_authenticate_with :name => "dhh", :password => ENV['SECRET_PASSWORD'], :except => :index`. This way, the actual password is not exposed in the code and can be securely managed outside of the application.

## Non-Compliant Code Examples
```ruby
class PostsController < ApplicationController
  http_basic_authenticate_with :name => "dhh", :password => "secret", :except => :index
end
```

## Compliant Code Examples
```ruby
class PostsController < ApplicationController
  http_basic_authenticate_with :name => "dhh", :password => secret, :except => :index
end
```
