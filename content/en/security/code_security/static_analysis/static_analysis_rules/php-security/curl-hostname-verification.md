---
aliases:
- /continuous_integration/static_analysis/rules/php-security/curl-hostname-verification
- /static_analysis/rules/php-security/curl-hostname-verification
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/curl-hostname-verification
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not disable hostname validation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/curl-hostname-verification`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [297](https://cwe.mitre.org/data/definitions/297.html)

## Description
Disabling hostname validation can expose your application to security risks, such as man-in-the-middle attacks, where an attacker can impersonate the server you're trying to connect to.

Hostname validation is a security feature that ensures the server you're connecting to is the one it claims to be. It does this by checking the server's SSL certificate against the hostname you're using to connect. If they don't match, the connection is refused. This protects your application by ensuring it's communicating with the correct server.

To ensure you're following this rule, do not set `CURLOPT_SSL_VERIFYHOST` to `0` when initializing a cURL session. Instead, you should either omit this option, or set it to `2` which also checks that the common name exists and that it matches the hostname provided in the URL. This will ensure that hostname validation is enabled and your application is protected from potential security threats.

## Non-Compliant Code Examples
```php
<?php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://domain.tld/');
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
```

## Compliant Code Examples
```php
<?php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://domain.tld/');
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // This can be omitted as it's the default
```
