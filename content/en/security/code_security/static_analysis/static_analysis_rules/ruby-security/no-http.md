---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-http
- /static_analysis/rules/ruby-security/no-http
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-http
  language: Ruby
  severity: Info
  severity_rank: 4
title: Prevent use of http protocol
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-http`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
This rule is designed to prevent the use of the insecure HTTP protocol in your Ruby code. The HTTP protocol does not encrypt the data that is sent between the client and the server, which can lead to sensitive information being intercepted by malicious parties. This is particularly risky when dealing with sensitive data such as API keys, user credentials, or personal user information.

The importance of this rule lies in the security and integrity of your application. By using an unsecured protocol like HTTP, you expose your application and its users to potential data breaches. A breach can lead to loss of trust, legal liability, and significant remediation costs. 

To avoid violating this rule, always use the HTTPS protocol when making network requests. HTTPS encrypts the data sent between the client and server, protecting it from interception. By using libraries like `Faraday`, `HTTPX`, `HTTParty`, `RestClient`, or Ruby's built-in `Net::HTTP`, you can specify HTTPS by simply replacing 'http://' with 'https://'. For example, instead of `HTTP.get("http://example.org")`, use `HTTP.get("https://example.org")`. Always ensure that any third-party services your application interacts with support HTTPS.

## Non-Compliant Code Examples
```ruby
require "faraday"
require 'uri'

params = {title: "foo", body: "bar", userID: 1}
encoded_params = URI.encode_www_form(params)
response = Faraday.post("http://example.org", encoded_params)
p response.body if response.status == 201
```

```ruby
require "httpx"

response = HTTPX.get("http://www.example.org")
puts response.body if response.status == 200
```

```ruby
require "http"

response = HTTP.get("http://example.org", :params => {:api_key => "API_KEY"})
response = HTTP.post("http://example.org", :form => something)

```

```ruby
require 'httparty'

response = HTTParty.get('http://example.org')
puts response.body if response.code == 200

response = HTTParty.get('http://example.com', format: :plain)
RestClient.post "http://example.com", {'x' => 1}.to_json, {content_type: :json, accept: :json}
```

```ruby
require 'uri'
require 'net/http'

uri = URI('http://example.org')
```
