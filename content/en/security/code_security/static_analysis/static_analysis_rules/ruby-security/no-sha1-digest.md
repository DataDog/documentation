---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-sha1-digest
- /static_analysis/rules/ruby-security/no-sha1-digest
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-sha1-digest
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Avoid SHA1 to generate hashes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-sha1-digest`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
The rule "Avoid SHA1 to generate hashes" is important as it helps to maintain the integrity and security of your data. SHA1 is a widely used cryptographic hash function that produces a 160-bit hash value, however, it is no longer considered secure against well-funded attackers. In 2005, cryptanalysts found attacks on SHA1 suggesting that the algorithm might not be secure enough for ongoing use. 

The weakness of SHA1 lies in its inability to avoid hash collisions, which occur when two different inputs produce the same hash output. This can be exploited by attackers to mimic a data piece without having its actual content, leading to potential security risks and data integrity issues.

To avoid violating this rule, use more secure hash functions such as SHA256 or SHA3. In Ruby, you can use `Digest::SHA256.hexdigest 'foo'` or `OpenSSL::Digest::SHA256.new` to generate a SHA256 hash. Similarly, for HMAC, use `OpenSSL::HMAC.hexdigest("SHA256", key, data)`. By using these more secure hash functions, you can ensure the integrity and security of your data.

## Non-Compliant Code Examples
```ruby
require 'digest'
class Bad_md5
    def bad_md5_code()
        sha = Digest::SHA1.hexdigest 'foo'
        sha = Digest::SHA1.new
        sha = Digest::SHA1.base64digest 'foo'
        sha = Digest::SHA1.digest 'foo'

        digest = OpenSSL::Digest::SHA1.new
        digest = OpenSSL::Digest::SHA1.hexdigest 'foo'
        digest = OpenSSL::Digest::SHA1.new
        digest = OpenSSL::Digest::SHA1.base64digest 'foo'
        digest = OpenSSL::Digest::SHA1.digest 'foo'
        OpenSSL::HMAC.hexdigest("sha1", key, data)
        OpenSSL::HMAC.hexdigest("SHA256", key, data)
        digest = OpenSSL::Digest::SHA256.new
        digest = OpenSSL::Digest::SHA256.hexdigest 'foo'
    end
end

```
