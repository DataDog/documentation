---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-raw-sql-injection
- /static_analysis/rules/php-security/laravel-raw-sql-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-raw-sql-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Prevent raw SQL injections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-raw-sql-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
Do not input variables directly into SQL statements. This is important due to the security vulnerabilities it can create. Raw SQL injections can expose your database to malicious attacks, potentially leading to data loss, data corruption, and unauthorized access to sensitive data.

A common way to inject malicious code is through user input fields, where an attacker can input SQL code that will be executed by the server. This can lead to various harmful actions such as data extraction, modification, or even deletion.

To avoid this, you can use prepared statements or parameterized queries. These techniques ensure that user input is always treated as plain text and not executable code. This way, even if an attacker attempts to input SQL code, it will not be executed by the server. Instead, it will be treated as a simple string, maintaining the security of your application.

## Non-Compliant Code Examples
```php
<?php
class Test extends Controller
{
  public function get($user)
  {
    $users = DB::table('users')->whereRaw('user = "'.$user.'"')->get();
    return view('user.index', ['users' => $users]);
  }

  public function getAge($age)
  {
    $posts = Post::whereRaw('age = "'.$age.'"')->get();
    return view('user.index', ['users' => $posts]);
  }
}

class Bar
{
  function getInfo(Request $request) {
    $id = $request->input('id');
    $items = DB::table('items')->selectRaw('price * where id = '.$id);
    return organize($items);
  }
}

class Baz extends FormRequest
{
  public function getInfo(){
    $id = $this->input('id');
    $items = DB::table('items')->selectRaw('price * where id = '.$id);
    return organize($items);
  }
}
```

## Compliant Code Examples
```php
<?php
class Test extends Controller
{
  public function get($user)
  {
    $users = DB::table('users')->where('user', $user)->get();
    return view('user.index', ['users' => $users]);
  }

  public function getAge($age)
  {
    $posts = Post::where('age', $age)->get();
    return view('user.index', ['users' => $posts]);
  }
}

class Bar
{
  function getInfo(Request $request) {
    $id = $request->input('id');
    $items = DB::table('items')->where('id', $id)->select('price')->get();
    return organize($items);
  }
}

class Baz extends FormRequest
{
  public function getInfo(){
    $id = $this->input('id');
    $items = DB::table('items')->where('id', $id)->select('price')->get();
    return organize($items);
  }
}
```
