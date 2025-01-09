---
aliases:
- /continuous_integration/static_analysis/rules/php-security/no-pseudo-random
- /static_analysis/rules/php-security/no-pseudo-random
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/no-pseudo-random
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid pseudo-random numbers
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/no-pseudo-random`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [338](https://cwe.mitre.org/data/definitions/338.html)

## Description
This rule is a security-oriented rule that discourages the use of functions like `rand()` and `mt_rand()`. These functions generate pseudo-random numbers, which are not truly random and can be predictable, making them a weak choice for any situation where security is a concern, such as generating random passwords or tokens.

Using pseudo-random numbers can lead to vulnerabilities in your code. An attacker might be able to predict the output of these functions and exploit this predictability. 

To maintain secure coding practices, you can use the `random_int()` function instead. This function generates cryptographically secure random integers, making it a much safer choice. For example, instead of using `$var = rand();`, you can use `$var = random_int(20, 40);`. By following this rule, you can help to ensure that your code is as secure as possible.

## Non-Compliant Code Examples
```php
<?php
$var = rand();
$var = mt_rand(20, 40);
```

## Compliant Code Examples
```php
<?php
$var = random_int(20, 40);
```
