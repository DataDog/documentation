---
aliases:
- /continuous_integration/static_analysis/rules/php-security/symfony-unsafe-cors
- /static_analysis/rules/php-security/symfony-unsafe-cors
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/symfony-unsafe-cors
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid unsafe CORS headers in Symfony
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/symfony-unsafe-cors`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [346](https://cwe.mitre.org/data/definitions/346.html)

## Description
This rule is centered around the importance of preventing Cross-Origin Resource Sharing (CORS) vulnerabilities in Symfony applications. The Access-Control-Allow-Origin header determines which origins are allowed to read the response.

The use of a wildcard (*) in the 'Access-Control-Allow-Origin' header, which signifies that any origin is allowed, is considered unsafe and can expose your application to potential security risks like Cross-Site Request Forgery (CSRF) and data breaches.

To comply with this rule and ensure the security of your application, it is recommended to always specify the exact domain (origin) that is allowed to access the resources. For instance, instead of using a wildcard (*), use `'Access-Control-Allow-Origin' => 'domain.tld'`. This practice restricts the access to your resources to only the specified domain, thereby reducing potential security risks.

## Non-Compliant Code Examples
```php
<?php
$response = new Response('content', Response::HTTP_OK, Array('Access-Control-Allow-Origin' => '*'));

$var = ['Access-Control-Allow-Origin' => '*'];
$response = new Response('content', Response::HTTP_OK, $var);

$response->headers->set('access-control-allow-origin', '*');
```

## Compliant Code Examples
```php
<?php
$response = new Response('content', Response::HTTP_OK, Array('Access-Control-Allow-Origin' => 'domain.tld'));

$response->headers->set('access-control-allow-origin', 'domain.tld');
```
