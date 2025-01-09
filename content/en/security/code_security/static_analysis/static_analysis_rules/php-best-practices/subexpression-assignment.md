---
aliases:
- /continuous_integration/static_analysis/rules/php-best-practices/subexpression-assignment
- /static_analysis/rules/php-best-practices/subexpression-assignment
dependencies: []
disable_edit: true
group_id: php-best-practices
meta:
  category: Code Style
  id: php-best-practices/subexpression-assignment
  language: PHP
  severity: Warning
  severity_rank: 2
title: Assignments within subexpressions reduce code clarity
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-best-practices/subexpression-assignment`

**Language:** PHP

**Severity:** Warning

**Category:** Code Style

**CWE**: [481](https://cwe.mitre.org/data/definitions/481.html)

## Description
This rule against assignments within subexpressions is designed to enhance code clarity. Assignments within subexpressions can make the code more difficult to read and understand, as it combines two different operations-assignment and comparison-into a single line. This can potentially lead to confusion and errors, particularly for less experienced developers or those unfamiliar with the codebase.

The importance of this rule lies in the promotion of clean, simple, and readable code. Clear and concise code is easier to maintain, debug, and is less prone to errors. It also aids in the onboarding of new team members who need to quickly understand and contribute to the codebase.

Avoiding this rule violation involves separating the assignment and comparison operations into distinct lines of code. Instead of performing the assignment within the subexpression, perform the assignment first, then use the assigned variable in the subexpression. This practice not only makes the code cleaner and easier to understand, but it also helps to prevent potential errors that could occur from misunderstanding the combined operations.

## Non-Compliant Code Examples
```php
<?php
if (($var = call()) && check())) { // Not compliant
}

if ($var = call()) { // Not compliant
}
```

## Compliant Code Examples
```php
<?php
$var = call();
if ($var && check())) {
}

$var = call();
if ($var) {
}
```
