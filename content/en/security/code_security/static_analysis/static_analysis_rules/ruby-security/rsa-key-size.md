---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rsa-key-size
- /static_analysis/rules/ruby-security/rsa-key-size
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rsa-key-size
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure RSA keys are large enough
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rsa-key-size`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [326](https://cwe.mitre.org/data/definitions/326.html)

## Description
This rule pertains to the size of RSA keys used in your Ruby applications. RSA is a widely used encryption algorithm and the size of the key is crucial for the security of the data it protects. If the key is too small, it can be easily cracked using modern computational power, exposing sensitive data to potential threats.

The importance of this rule cannot be overstated. In modern security standards, a minimum of 2048 bits is recommended for RSA keys. Using a key size less than this, such as 512 bits, can lead to vulnerabilities that can be exploited by attackers.

To adhere to good coding practices and avoid violating this rule, always ensure that the size of your RSA keys is at least 2048 bits. This can be done by initializing your RSA key with the value `2048` as shown in the compliant code example: `OpenSSL::PKey::RSA.new 2048`. Avoid initializing your RSA keys with smaller values such as `512` to prevent potential security risks.

## Arguments

 * `min-length`: Minimum length for an RSA key. Default: 2048.

## Non-Compliant Code Examples
```ruby
OpenSSL::PKey::RSA.new 512
```

## Compliant Code Examples
```ruby
OpenSSL::PKey::RSA.new 2048
```
