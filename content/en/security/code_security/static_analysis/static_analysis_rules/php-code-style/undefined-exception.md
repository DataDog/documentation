---
aliases:
- /continuous_integration/static_analysis/rules/php-code-style/undefined-exception
- /static_analysis/rules/php-code-style/undefined-exception
dependencies: []
disable_edit: true
group_id: php-code-style
meta:
  category: Error Prone
  id: php-code-style/undefined-exception
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid using undefined exceptions
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-code-style/undefined-exception`

**Language:** PHP

**Severity:** Error

**Category:** Error Prone

## Description
This rule is crucial in PHP development as it ensures that the exceptions being caught are actually defined and can be handled appropriately. Undefined exceptions can cause unexpected behavior in your code, making it difficult to debug and maintain.

Catching an undefined exception can lead to a fatal error that halts the execution of your script. This can be particularly problematic in a production environment, where it can lead to a poor user experience or even data loss.

To adhere to this rule, make sure that any exception you are trying to catch is defined in your code or within the PHP core exceptions. Using the `use` keyword at the start of your scripts to import exceptions from other namespaces is a good practice. Always remember to catch the most specific exceptions first and then the more generic ones. This way, you can handle specific errors in a custom way and have a fallback for any unexpected exception.

For instance, instead of using `catch (Exception $ex)`, use the specific exception that your code may throw like `catch (SpecificException $se)`. This way, you ensure that your code is ready to handle the specific exceptions it may encounter during execution.

## Non-Compliant Code Examples
```php
<?php
try {
    willThrow();
} catch (Exception $ex) {
    echo $ex->message;
}
```

## Compliant Code Examples
```php
<?php

use Foo\SpecificException;

try {
    willThrow();
} catch (\Exception $ex) {
    echo $ex->message;
}

try {
    willThrow();
} catch (SpecificException $se) {
    echo $se->message;
}
```

```php
<?php

use Exception;

try {
    willThrow();
} catch (Exception $ex) {
    echo $ex->message;
}
```
