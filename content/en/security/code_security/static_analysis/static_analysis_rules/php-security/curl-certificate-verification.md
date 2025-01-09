---
aliases:
- /continuous_integration/static_analysis/rules/php-security/curl-certificate-verification
- /static_analysis/rules/php-security/curl-certificate-verification
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/curl-certificate-verification
  language: PHP
  severity: Error
  severity_rank: 1
title: Verify certificates during SSL/TLS connections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/curl-certificate-verification`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [295](https://cwe.mitre.org/data/definitions/295.html)

## Description
The rule requires that all SSL or TLS connections made in PHP must undergo certificate verification. This is a security measure designed to prevent man-in-the-middle attacks, where an attacker intercepts and possibly alters the communication between two parties who believe they are directly communicating with each other.

If certificate verification is not performed, it opens up the possibility for these types of attacks. This can lead to data breaches, loss of sensitive information, and other security issues. Therefore, it is crucial to ensure that all SSL or TLS connections have certificate verification enabled.

In PHP, this can be achieved by using the `curl_setopt` function with the `CURLOPT_SSL_VERIFYPEER` option set to `true`. This tells the cURL library to verify the peer's certificate. By default, this option is set to `true`, so if it's not explicitly set in your code, cURL will verify the certificate. Avoid setting `CURLOPT_SSL_VERIFYPEER` to `false` as this disables certificate verification.

## Non-Compliant Code Examples
```php
<?php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://domain.tld/');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // Not compliant
curl_exec($curl);
curl_close($curl);
```

## Compliant Code Examples
```php
<?php
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://domain.tld/');
curl_exec($curl);
curl_close($curl);
```
