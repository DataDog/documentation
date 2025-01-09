---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-sql-injection
- /static_analysis/rules/php-security/laravel-sql-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-sql-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Prevent SQL queries built from unsanitized input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-sql-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
SQL Injection is a common and serious security vulnerability where an attacker can manipulate SQL queries by injecting malicious input. SQL Injection can lead to unauthorized data access, data corruption, or even data loss.

The rule specifically targets PHP code that constructs SQL queries using unsanitized input. This practice is risky as it allows potentially harmful data to directly interact with the database. For instance, if a user is able to pass input that is directly used in a SQL `WHERE` clause, they could manipulate the query to return unintended data, or even execute arbitrary SQL statements.

To avoid violating this rule and to prevent SQL Injection, you should never build SQL queries using raw, unsanitized input. Instead, use prepared statements, parameterized queries, or ORM methods that automatically sanitize inputs. These practices ensure that user input cannot interfere with the query structure. Another good practice is to allowlist permitted inputs, particularly when dealing with identifiers such as column names, which can't be parameterized in the same way as data values. For example, if you need to order by a user-specified column, ensure the column name is one of a predefined list of allowable columns.

## Non-Compliant Code Examples
```php
<?php
class Foo extends Controller {
  public function foo($col) {
    $titles = DB::table('users')->pluck($col);
    return view('user.index', ['data' => $titles]);
  }

  public function bar($col, $user) {
    $user = DB::table('users')->where('uid', $user->id)
        ->where($col, $user->aid);
    return view('user.index', ['user' => $user]);
  }
}

class Bar {
  function getInfo(Request $request) {
    $id = $request->input('id');
    $name = $request->input('name');
    $items = DB::table('items')->orderBy($name);
    return process($items);
  }
}

class Baz extends FormRequest {
    function rules() {
      $name = $this->input('name');
      $items = DB::table('items')->orderBy($name);
      $rule = process($items);

      return [
        'items' => [
          'required',
          $rule,
          $okRule,
        ]
      ];
    }
}
```

## Compliant Code Examples
```php
<?php
class Foo extends Controller {
  public function foo($col) {
    $allowed_columns = ['name', 'email', 'age'];
    if (in_array($col, $allowed_columns)) {
      $titles = DB::table('users')->pluck($col);
      return view('user.index', ['data' => $titles]);
    } else {
      abort(400, 'Invalid column name');
    }
  }

  public function bar($col, $user) {
    $allowed_columns = ['name', 'email', 'age'];
    if (in_array($col, $allowed_columns)) {
      $user = DB::table('users')->where('uid', $user->id)
          ->where($col, $user->aid);
      return view('user.index', ['user' => $user]);
    } else {
      abort(400, 'Invalid column name');
    }
  }
}

class Bar {
  function getInfo(Request $request) {
    $id = $request->input('id');
    $name = $request->input('name');
    $allowed_columns = ['name', 'created_at', 'updated_at'];
    if (in_array($name, $allowed_columns)) {
      $items = DB::table('items')->orderBy($name);
      return process($items);
    } else {
      abort(400, 'Invalid column name');
    }
  }
}

class Baz extends FormRequest {
    function rules() {
      $name = $this->input('name');
      $allowed_columns = ['name', 'price', 'quantity'];
      if (in_array($name, $allowed_columns)) {
        $items = DB::table('items')->orderBy($name);
        $rule = process($items);

        return [
          'items' => [
            'required',
            $rule,
          ]
        ];
      } else {
        abort(400, 'Invalid column name');
      }
    }
}
```
