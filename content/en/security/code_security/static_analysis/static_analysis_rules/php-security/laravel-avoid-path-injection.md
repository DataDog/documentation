---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-avoid-path-injection
- /static_analysis/rules/php-security/laravel-avoid-path-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-avoid-path-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid potential path injections in Laravel
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-avoid-path-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
Path injection attacks occur when user-supplied data is used to construct a pathname that leads to access of a filesystem. This would let attackers manipulate the file path in a manner that allows them to access, modify, or delete sensitive files in your system.

This rule is important because it helps protect your application from unauthorized file access, potential data loss, or leakage of sensitive information. If an attacker is able to manipulate your filesystem through path injection, they might gain access to confidential data, perform unauthorized changes, or even execute arbitrary code.

Always sanitize user-supplied inputs that will be used in filesystem operations. Use functions to handle file paths safely, and use allowlists to limit the paths that can be specified by the user.

## Non-Compliant Code Examples
```php
<?php
class Foo extends Controller
{
  public function __invoke($name)
  {
    $path = 'uploads/'.$name;
    return response()->download($path);
  }
}

Route::get('/endpoint/{var}', function ($var) {
  require_once('includes/'.$var);
});

Route::match(['get', 'post'], '/endpoint/{var}', function ($var) {
  include_once('includes/'.$var);
});

```

## Compliant Code Examples
```php
<?php
class Foo extends Controller
{
  public function __invoke($name)
  {
    $path = 'uploads/'.basename($name);
    if (!file_exists($path)) {
      abort(404);
    }
    return response()->download($path);
  }
}

Route::get('/endpoint/{var}', function ($var) {
  $allowed_files = ['file1.php', 'file2.php', 'file3.php'];
  if (in_array($var, $allowed_files)) {
    include_once('includes/'.$var);
  } else {
    abort(404);
  }
});

Route::match(['get', 'post'], '/endpoint/{var}', function ($var) {
  $allowed_files = ['file1.php', 'file2.php', 'file3.php'];
  if (in_array($var, $allowed_files)) {
    include_once('includes/'.$var);
  } else {
    abort(404);
  }
});
```
