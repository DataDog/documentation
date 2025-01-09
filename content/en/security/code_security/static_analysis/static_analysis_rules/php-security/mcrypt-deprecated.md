---
aliases:
- /continuous_integration/static_analysis/rules/php-security/mcrypt-deprecated
- /static_analysis/rules/php-security/mcrypt-deprecated
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/mcrypt-deprecated
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not use Mcrypt as it is deprecated
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/mcrypt-deprecated`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [327](https://cwe.mitre.org/data/definitions/327.html)

## Description
The Mcrypt library has been deprecated as of PHP 7.1.0 and removed entirely in PHP 7.2.0. Its use in modern applications is strongly discouraged due to its outdated and insecure cryptographic algorithms.

Using deprecated encryption methods can lead to significant security vulnerabilities, including susceptibility to brute force attacks and other forms of cryptographic hacking. These vulnerabilities can lead to the exposure of sensitive user data, which can have severe legal and reputational consequences.

To avoid this, it is recommended to use modern and secure encryption methods, such as the `openssl_encrypt` function with "aes-256-gcm" cipher method or the `sodium_crypto_aead_aes256gcm_encrypt` function. These methods provide strong encryption and are actively maintained, ensuring that your application remains secure against the latest threats. Maintaining an awareness of current best practices in cryptographic security is an essential part of responsible PHP development.

## Non-Compliant Code Examples
```php
<?php
// Weak encryption using openssl with DES
$key = "key";
$data = "Sensitive Data";
openssl_encrypt($data, "des-ofb", $key, $options=OPENSSL_RAW_DATA, $iv); // Noncompliant
```

```php
<?php
// Weak encryption using mcrypt with DES and ECB mode
$key = 'bad-key-';
$data = 'Sensitive Data';
$encryptedData = mcrypt_encrypt(MCRYPT_DES, $key, $data, MCRYPT_MODE_ECB);
```

## Compliant Code Examples
```php
<?php
// Strong encryption using sodium with aes-256
$key = "key";
$data = "Sensitive Data";
$nonce = "fh574569";
sodium_crypto_aead_aes256gcm_encrypt($data, '', $nonce, $key);
```

```php
<?php
// Strong encryption using openssl with aes-256
$key = "key";
$data = "Sensitive Data";
openssl_encrypt($data, "aes-256-gcm", $key, $options=OPENSSL_RAW_DATA, $iv);
```
