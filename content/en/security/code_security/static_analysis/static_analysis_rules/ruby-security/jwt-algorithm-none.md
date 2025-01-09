---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/jwt-algorithm-none
- /static_analysis/rules/ruby-security/jwt-algorithm-none
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/jwt-algorithm-none
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure JWT use an algorithm
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/jwt-algorithm-none`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
The rule "Ensure JWT use an algorithm" is important because it checks whether your JSON Web Tokens (JWT) are using a secure encryption algorithm. JWT is a compact, URL-safe means of representing claims to be transferred between two parties. However, if a JWT is encoded without a secure algorithm, it can be easily manipulated and decoded, compromising the security of the data it carries.

The 'none' algorithm is a security vulnerability as it allows a token to be validated without any signature. This means anyone can create a valid token.

To avoid this, always specify a secure algorithm when encoding a JWT. For instance, 'HS256' is a commonly used, secure algorithm. In Ruby, when using the `JWT.encode` method, the third parameter should be a secure algorithm, such as 'HS256'. For example: `jwt_token = JWT.encode content, nil, 'HS256'`. Never use 'none' as the algorithm. This will ensure the integrity and confidentiality of your JWTs.

## Non-Compliant Code Examples
```ruby
jwt_token = JWT.encode content, nil, 'none'
```

## Compliant Code Examples
```ruby
jwt_token = JWT.encode content, nil, 'HS256'
```
