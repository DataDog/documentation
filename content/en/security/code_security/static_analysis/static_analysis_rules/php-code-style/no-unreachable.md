---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/no-unreachable
- /static_analysis/rules/php-code-style/no-unreachable
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/no-unreachable
  language: PHP
  severity: Warning
  severity_rank: 2
title: All code should be reachable, dead code should be avoided
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/no-unreachable`

**Language:** PHP

**Severity:** Warning

**Category:** Error Prone

## Description
This rule requires that all code in a function or method must be reachable, and dead code (code that can never be executed) should be avoided. This rule is important because dead code can make the program more difficult to understand and maintain. It can also lead to confusion and bugs if other developers mistakenly believe the dead code is doing something.

Dead code often occurs when developers leave behind commented-out code or functions that are no longer called. It can also happen when a return statement or an exception is thrown before the code.

To ensure compliance with this rule, always remove code that is no longer needed. Use version control systems to keep track of changes instead of leaving old code in comments. Be mindful of the flow of your functions and methods to ensure all code is reachable. For example, if you have a `return` statement in your function, make sure it's the last operation in your function.

## Non-Compliant Code Examples
```php
<?php
function test() {
    echo "test";
    return;
    echo "testing";
}
```

## Compliant Code Examples
```php
<?php
function test() {
    echo "test";
    echo "testing";
    return;
}
```
