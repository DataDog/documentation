---
aliases:
- /continuous_integration/static_analysis/rules/php-security/unsafe-cors
- /static_analysis/rules/php-security/unsafe-cors
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/unsafe-cors
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid unsafe CORS headers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/unsafe-cors`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
The Cross-Origin Resource Sharing (CORS) mechanism allows many resources (such as fonts or JavaScript) on a web page to be requested from another domain outside the domain from which the resource originated. It's a crucial feature, but it can also pose a significant security risk if not implemented properly.

This rule is important because it helps prevent potential security vulnerabilities. Specifically, it prevents the misuse of the `Access-Control-Allow-Origin` header. This header indicates which origins are allowed to read the response from the server. If the server sends back a response with the `Access-Control-Allow-Origin: *` header, this means it's allowing all origins to access its resources, which is an unsafe practice.

To adhere to this rule and ensure good coding practices, always specify the exact origin that is allowed to access the resources. For example, instead of using `header("Access-Control-Allow-Origin: *");`, which allows all origins, use `header("Access-Control-Allow-Origin: https://domain.tld");`, which only allows the specified domain to access the resources. This ensures that only trusted domains have access to your server's resources, thereby reducing the risk of cross-site request forgery (CSRF) or data leakage.

## Non-Compliant Code Examples
```php
<?php
// Insecure: Allowing all origins
header("Access-Control-Allow-Origin: *");
```

## Compliant Code Examples
```php
<?php
// Secure: Only allows specified origin
header("Access-Control-Allow-Origin: https://domain.tld");
```
