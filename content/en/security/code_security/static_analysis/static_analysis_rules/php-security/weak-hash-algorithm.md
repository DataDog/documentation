---
aliases:
- /continuous_integration/static_analysis/rules/php-security/weak-hash-algorithm
- /static_analysis/rules/php-security/weak-hash-algorithm
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/weak-hash-algorithm
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not use a weak hash algorithm
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/weak-hash-algorithm`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [1240](https://cwe.mitre.org/data/definitions/1240.html)

## Description
This rule is set to prevent the use of outdated or weak cryptographic hash functions in your PHP code. Hash functions are a crucial part of many data security operations, including password storage and data integrity checks. However, not all hash functions offer the same level of security.

Weak hash algorithms, such as MD5 or SHA1, are vulnerable to various types of attacks, including collision attacks and preimage attacks. This can potentially lead to unauthorized access to sensitive data, data corruption, or other security breaches.

To adhere to this rule and maintain high levels of security in your PHP applications, it's recommended to use strong, up-to-date hash functions. PHP offers the `password_hash()` function, which uses a strong hash algorithm (bcrypt by default) and automatically handles the creation of salt values. Alternatively, you can use the `hash()` function with a strong algorithm such as SHA256 or SHA3.

## Non-Compliant Code Examples
```php
<?php
$hash = md5($data);
$hash = sha1($data);
$hash = hash('md4', $data);
$hash = hash("md4", $data);
$hash = hash('md2', $data);
$hash = hash('haval128,3', $data);
$hash = hash('haval128,4', $data);
$hash = hash('haval128,5', $data);
$hash = hash('ripemd128', $data);
$hash = hash('ripemd160', $data);
```

## Compliant Code Examples
```php
<?php
$hash = hash('sha256', $data); // Secure
$hash = hash('sha512', $data); // Secure
$hash = hash('sha3-256', $data); // Secure
$hash = hash('sha3-512', $data); // Secure
```
