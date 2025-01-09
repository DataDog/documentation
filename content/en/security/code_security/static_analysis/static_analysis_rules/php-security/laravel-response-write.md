---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-response-write
- /static_analysis/rules/php-security/laravel-response-write
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-response-write
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not write responses with unsanitized data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-response-write`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Injecting unsanitized data into responses can lead to several security vulnerabilities, including Cross-Site Scripting (XSS) attacks. XSS attacks occur when a malicious script is injected into a trusted website, which can compromise the data integrity or steal sensitive information.

To comply with this rule, always sanitize or validate data before including it in a response. PHP provides several built-in functions such as `filter_var()`, `htmlspecialchars()`, and `strip_tags()` that can be used for sanitizing data.

## Non-Compliant Code Examples
```php
<?php
class UserController extends Controller
{
  public function test0($data)
  {
    return response('Data is '.$data, 200)->header('Content-Type', 'text/html');
  }

  public function test1($data)
  {
    return response("Data is {$data}")
      ->withHeaders([
        'Content-Type' => "text/html",
      ]);
  }
}

Route::get('/endpoint/{data}', function ($data) {
  return response("Data is {$data}")
    ->cookie($cookie)
    ->withHeaders([
      'Content-Type' => 'text/html',
    ]);
});
```

## Compliant Code Examples
```php
<?php
class UserController extends Controller
{
  public function test0($data)
  {
    $content = sanitize($data);
    return response('Data is '. $content, 200)->header('Content-Type', 'text/html');
  }

  public function test1($data)
  {
    $content = validate($data);
    return response("Data is {$content}")
      ->withHeaders([
        'Content-Type' => "text/html",
      ]);
  }
}

Route::get('/endpoint/{data}', function ($data) {
  $var = sanitize($data);
  return response("Data is {$var}")
    ->cookie($cookie)
    ->withHeaders([
      'Content-Type' => 'text/html',
    ]);
});
```
