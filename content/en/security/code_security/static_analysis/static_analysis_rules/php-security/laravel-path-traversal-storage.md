---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-path-traversal-storage
- /static_analysis/rules/php-security/laravel-path-traversal-storage
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-path-traversal-storage
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid building paths from unsanitized input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-path-traversal-storage`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
This rule is about avoiding the construction of file paths from unsanitized user inputs. It is important for the security of your application because it prevents path traversal attacks, where an attacker can gain access to restricted directories and execute files outside of your application's root directory.

In PHP, you can avoid this issue by using built-in functions to sanitize user inputs before using them to construct file paths. Functions like `basename()` or `realpath()` can be used to ensure that the user input does not contain any directory traversal characters. Alternatively, you can also use the `filter_var()` function with the `FILTER_SANITIZE_URL` flag to sanitize a URL input.

## Non-Compliant Code Examples
```php
<?php
 
class Foo extends Controller{
    function foo($path) {
        Storage::download($path);
        return view('user.index', []);
    }

    function bar($col, $user) {
        $path = Storage::disk($disk)->path(storage_path('path/').$col);
        return view('user.index', ['path' => $path]);
    }
}

class Bar extends FormRequest {
    function rules() {
      $name = $this->input('name');
      $items = Storage::get($name);
      $rule = process($items);
      return [
        'items' => [
          'required',
          $rule,
        ]
      ];
    }
}
```

## Compliant Code Examples
```php
<?php
class Foo extends Controller {
  function foo(Request $request) {
    $image = $request->file('image');
    $url = Storage::disk('dir')->url($image->store($folder, 'dir'));
    return view('user.index', ['data' => $url]);
  }
}

class Bar extends FormRequest {
    function rules() {
      $name = $this->input('name');
      $items = Storage::get('name');
      $rule = process($orders);

      return [
        'items' => [
          'required',
          $rule,
        ]
      ];
    }
}
```
