---
aliases:
- /continuous_integration/static_analysis/rules/php-security/avoid-potential-ssrf
- /static_analysis/rules/php-security/avoid-potential-ssrf
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/avoid-potential-ssrf
  language: PHP
  severity: Error
  severity_rank: 1
title: Avoid potential server side request forgeries (SSRFs)
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/avoid-potential-ssrf`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [918](https://cwe.mitre.org/data/definitions/918.html)

## Description
In server-side request forgery (SSRF) attacks, an attacker can trick a server into making requests to other servers, potentially bypassing access controls and revealing sensitive information. SSRF vulnerabilities often arise when a web application makes a request to a URL provided by a user, without properly validating or sanitizing the input.

To adhere to this rule and prevent SSRF, always sanitize and validate user-provided URLs and file paths before making requests. PHP's built-in `filter_var` function can be used with the `FILTER_SANITIZE_URL` and `FILTER_VALIDATE_URL` filters to ensure the URL is safe to use. If handling file paths, use `realpath` to resolve any relative paths or symbolic links, and then ensure the resolved path is within a safe base directory. This will prevent directory traversal attacks where an attacker can read or write files outside of the intended directory.

## Non-Compliant Code Examples
```php
<?php
function foo() {
    $ch = curl_init($_GET['data']);
}

function bar(){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $_POST['url']);
}

function baz(){
    $path = $_GET['path'];
    $file = fopen($path, 'rb');
}

function quux(){
    $path = $_POST['path'];
    $file = file_get_contents($path);
}
```

## Compliant Code Examples
```php
<?php
function foo() {
    $url = filter_var($_GET['data'], FILTER_SANITIZE_URL);
    if (filter_var($url, FILTER_VALIDATE_URL)) {
        $ch = curl_init($url);
    } else {
        die('Invalid URL');
    }
}

function bar() {
    $ch = curl_init();
    $url = filter_var($_POST['url'], FILTER_SANITIZE_URL);
    if (filter_var($url, FILTER_VALIDATE_URL)) {
        curl_setopt($ch, CURLOPT_URL, $url);
    } else {
        die('Invalid URL');
    }
}

function baz() {
    $path = realpath($_GET['path']);
    if ($path && strpos($path, '/valid/base/dir') === 0) {
        $file = fopen($path, 'rb');
    } else {
        die('Invalid file path');
    }
}

function quux() {
    $path = realpath($_POST['path']);
    if ($path && strpos($path, '/valid/base/dir') === 0) {
        $file = file_get_contents($path);
    } else {
        die('Invalid file path');
    }
}
```
