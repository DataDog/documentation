---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/jwt-no-verify
- /static_analysis/rules/ruby-security/jwt-no-verify
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/jwt-no-verify
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure JWT are verified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/jwt-no-verify`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [345](https://cwe.mitre.org/data/definitions/345.html)

## Description
The rule requires that JSON Web Tokens (JWT) should always be verified in Ruby applications. Verification is a crucial security measure that ensures the authenticity of the JWT. If a JWT is not verified, it could be tampered with or manipulated, leading to potential security risks such as unauthorized access or data leakage.

This rule is essential because it directly relates to the security of your application. JWTs are often used to store sensitive information and are used for authentication and authorization purposes. If they are not correctly verified, it could lead to serious security breaches. Therefore, it's crucial to always verify the JWT to ensure that it hasn't been tampered with and is from a trusted source.

To avoid violating this rule, always include the `true` flag when decoding a JWT to ensure that it is verified. For example, use `JWT.decode raw_token, secret, true, { algorithm: 'HS256' }`. The `true` flag indicates that the JWT should be verified. Never set this flag to `false` as it will skip the verification process, which could lead to security vulnerabilities.

## Non-Compliant Code Examples
```ruby
jwt_token = JWT.decode raw_token, secret, false, { algorithm: 'HS256' }
```

## Compliant Code Examples
```ruby
jwt_token = JWT.decode raw_token, secret, true, { algorithm: 'HS256' }
```
