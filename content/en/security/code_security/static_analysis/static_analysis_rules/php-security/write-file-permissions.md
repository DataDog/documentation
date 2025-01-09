---
aliases:
- /continuous_integration/static_analysis/rules/php-security/write-file-permissions
- /static_analysis/rules/php-security/write-file-permissions
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/write-file-permissions
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not create a file with too many permissions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/write-file-permissions`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [732](https://cwe.mitre.org/data/definitions/732.html)

## Description
This rule helps you prevent unauthorized access to your files. Granting too many permissions can expose your files to malicious activities such as unauthorized modifications, data theft, or even deletion.

The PHP `chmod()` function is used to change the permissions of a file. It takes two arguments: the file name and the permissions. Permissions are represented as octal numbers, where each digit represents different permissions for the owner, group, and others.

To adhere to this rule, avoid setting permissions higher than 0750. This means the owner can read, write, and execute the file, the group can read and execute, and others have no permissions. For example, `chmod("test", 0750);`. Be sure to only grant write permissions when necessary and restrict access for others as much as possible to ensure the security of your files.

## Non-Compliant Code Examples
```php
<?php
chmod("test", 0770);
```

## Compliant Code Examples
```php
<?php
chmod("test", 0750);
```
