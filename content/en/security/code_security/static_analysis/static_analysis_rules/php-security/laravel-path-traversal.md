---
aliases:
- /continuous_integration/static_analysis/rules/php-security/laravel-path-traversal
- /static_analysis/rules/php-security/laravel-path-traversal
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/laravel-path-traversal
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid building paths from untrusted data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/laravel-path-traversal`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
When path information is derived from untrusted data, it can lead to vulnerabilities such as directory traversal attacks. In such attacks, an attacker can access restricted directories and execute files outside of the web server's root directory.

Developers should use functions that sanitize the input data before using it to construct a path, use functions for path manipulation, or use allowlists to limit the paths that a user can specify.

## Non-Compliant Code Examples
```php
<?php
class Foo extends Controller
{
  public function __invoke($path)
  {
    $path = 'path/'.$path;
    return response()->download($path);
  }
}

Route::get('/items/{page}', function ($page) {
  require_once('path/'.$page);

  $posts = DB::table($this->table);
  $result = $posts->where(['query']);
  return view('user.index', ['result', $result]);
});

Route::match(['get', 'post'], '/items/{page}', function ($page) {
  include_once('path/'.$page);

  $result = DB::table($this->table)->where(['query']);
  return view('user.index', ['result', $result]);
});

class Bar {
  function handle($request, Closure $next) {
    $response = $next($request);
    $source = $request->file()->store($request->input('col'));
    return $response;
  }
}
```

## Compliant Code Examples
```php
<?php
class Foo extends Controller
{
  public function __invoke($path)
  {
    $path = sanitize($path);
    $fullPath = storage_path('downloads/' . $path);
    if (!file_exists($fullPath) || strpos($fullPath, storage_path('downloads')) !== 0) {
        abort(404);
    }
    return response()->download($fullPath);
  }
}

Route::get('/items/{item}', function ($item) {
  $allowed_files = ['file1.php', 'file2.php'];
  if (in_array($item, $allowed_files)) {
    include_once(storage_path('includes/' . $item));
  } else {
    abort(404);
  }

  $result = DB::table('posts')->where('query', '=', 'value')->get();
  return view('user.index', ['result' => $result]);
});

Route::match(['get', 'post'], '/items/{item}', function ($item) {
  $allowed_files = ['file1.php', 'file2.php'];
  if (in_array($item, $allowed_files)) {
    include_once(storage_path('includes/' . $item));
  } else {
    abort(404);
  }

  $result = DB::table('posts')->where('query', '=', 'value')->get();
  return view('user.index', ['result' => $result]);
});

class Bar {
  function handle($request, Closure $next) {
    $response = $next($request);
    $folder = sanitize($request->input('col'));
    if (in_array($folder, ['allowed_folder1', 'allowed_folder2'])) {
      $source = $request->file('file')->store($folder);
    } else {
      abort(403);
    }
    return $response;
  }

  function getInfo(Request $request) {
    $name = sanitize($request->input('name'));
    $remote = $request->file('file');
    if (in_array($name, ['allowed_name1', 'allowed_name2'])) {
      $source = $remote->store($name);
    } else {
      abort(403);
    }
    return process($source);
  }
}
```
