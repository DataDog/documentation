---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/unnecessary-preg-replace
- /static_analysis/rules/php-best-practices/unnecessary-preg-replace
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Best Practices
  id: php-best-practices/unnecessary-preg-replace
  language: PHP
  severity: Warning
  severity_rank: 2
title: Use str_replace when a regex is unnecessary
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/unnecessary-preg-replace`

**Language:** PHP

**Severity:** Warning

**Category:** Best Practices

## Description
The rule emphasizes the use of `str_replace` over `preg_replace` when regular expressions are not necessary. This is important because `str_replace` is faster and consumes less memory than `preg_replace`, making your PHP code more efficient.

Using regular expressions when they are not necessary can lead to slow performance and increased memory usage. It can also make your code harder to understand since regular expressions can be quite complex.

To avoid violating this rule, always use `str_replace` when you're simply replacing one string with another. Only use `preg_replace` when you need to match a pattern, not a specific string. By following this rule, you can improve the performance of your PHP code and make it easier for other developers to understand.

## Non-Compliant Code Examples
```php
<?php
$str = "The document is ready for revew.";
$changed = preg_replace("/revew/", "review", $str);
$changed = preg_replace("/\./", "!", $changed);
```

## Compliant Code Examples
```php
<?php
$str = "The document is ready for revew.";
$changed = str_replace("revew", "review", $str);
$changed = str_replace(".", "!", $changed);

$str = "The document is ready for  revew...";
$changed = preg_replace("/\s*revew/", " review", $str);
$changed = preg_replace("/\.{3}/", "!", $changed);
```
