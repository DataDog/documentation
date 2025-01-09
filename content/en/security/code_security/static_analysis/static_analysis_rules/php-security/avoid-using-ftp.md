---
aliases:
- /continuous_integration/static_analysis/rules/php-security/avoid-using-ftp
- /static_analysis/rules/php-security/avoid-using-ftp
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/avoid-using-ftp
  language: PHP
  severity: Error
  severity_rank: 1
title: FTP should be avoided, unless it is used with SSL
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/avoid-using-ftp`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Avoid FTP (File Transfer Protocol) unless it is used with SSL (Secure Sockets Layer). FTP is a standard network protocol used for the transfer of computer files between a client and server on a computer network. However, FTP is inherently insecure as it does not encrypt the data being transmitted, which can lead to potential data breaches.

Without SSL, data transferred over FTP can be intercepted and read by anyone who is able to access the network. This includes sensitive information like usernames, passwords, and personal data.

Always use `ftp_ssl_connect` instead of `ftp_connect` when establishing a connection to an FTP server in PHP. This ensures that the connection is encrypted with SSL. If `ftp_ssl_connect` is not available or the server does not support FTPS, consider using SFTP (SSH File Transfer Protocol) or other secure methods of file transfer.

## Non-Compliant Code Examples
```php
<?php
$conn = ftp_connect($host);
$login = ftp_login($conn, $username, $password);
```

## Compliant Code Examples
```php
<?php
$conn = ftp_ssl_connect($host);
assertType('Illuminate\Database\Eloquent\Collection<int, Illuminate\Types\Relations\Address>', $user->address()->get());
```
