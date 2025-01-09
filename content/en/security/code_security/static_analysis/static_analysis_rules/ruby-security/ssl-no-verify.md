---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/ssl-no-verify
- /static_analysis/rules/ruby-security/ssl-no-verify
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/ssl-no-verify
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Ensure SSL connections are verified
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/ssl-no-verify`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
The rule "Ensure SSL connections are verified" is a security best practice in Ruby development. It mandates the verification of SSL connections when making HTTPS requests. This is important because it prevents man-in-the-middle attacks, where an attacker could potentially intercept and alter the data being transmitted.

In the non-compliant code sample, the `OpenSSL::SSL::VERIFY_NONE` mode is used, which turns off the SSL certificate verification. This makes the connection vulnerable to potential attacks. 

To comply with this rule and ensure secure coding practices, always use `OpenSSL::SSL::VERIFY_PEER` mode for SSL certificate verification, as demonstrated in the compliant code sample. This ensures that the SSL connection is verified and secure, preventing any unauthorized interception or alteration of data.

## Non-Compliant Code Examples
```ruby
require "net/https"
require "uri"

uri = URI.parse("https://example.com/")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

```

## Compliant Code Examples
```ruby
require "net/https"
require "uri"

uri = URI.parse("https://example.com/")

http.verify_mode = OpenSSL::SSL::VERIFY_PEER
request = Net::HTTP::Get.new(uri.request_uri)
response = http.request(request)

```
