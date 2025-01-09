---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-md5-digest
- /static_analysis/rules/ruby-security/no-md5-digest
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-md5-digest
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Avoid MD5 to generate hashes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-md5-digest`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
The rule "Avoid MD5 to generate hashes" is important because MD5 (Message Digest Algorithm 5) is a widely used cryptographic hash function that produces a 128-bit (16-byte) hash value. However, it is considered to be a weak algorithm for generating hashes due to its vulnerabilities to collision attacks. A collision occurs when two different inputs produce the same hash output, which can lead to security risks such as data integrity issues or unauthorized access.

The significance of this rule is that it promotes the use of more secure hash functions. In cryptography, the strength of a hash function is determined by its resistance to collision attacks. More modern algorithms such as SHA-256 and SHA-3 are recommended as they provide better security than MD5.

To adhere to this rule, replace any use of MD5 in your code with a more secure hash function. For example, instead of `Digest::MD5.hexdigest 'foo'`, you should use `Digest::SHA256.hexdigest 'foo'`. Similarly, replace instances of `OpenSSL::Digest::MD5.new` with `OpenSSL::Digest::SHA256.new`. By doing so, you can ensure the integrity and security of your data.

## Non-Compliant Code Examples
```ruby
require 'digest'
class Bad_md5
    def bad_md5_code()
        md5 = Digest::MD5.hexdigest 'foo'
        md5 = Digest::MD5.new
        md5 = Digest::MD5.base64digest 'foo'
        md5 = Digest::MD5.digest 'foo'

        digest = OpenSSL::Digest::MD5.new
        digest = OpenSSL::Digest::MD5.hexdigest 'foo'
        digest = OpenSSL::Digest::MD5.new
        digest = OpenSSL::Digest::MD5.base64digest 'foo'
        digest = OpenSSL::Digest::MD5.digest 'foo'
    end
end

```
