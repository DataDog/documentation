---
aliases:
- /continuous_integration/static_analysis/rules/php-security/extract-untrusted-data
- /static_analysis/rules/php-security/extract-untrusted-data
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/extract-untrusted-data
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not call extract on untrusted user data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/extract-untrusted-data`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [95](https://cwe.mitre.org/data/definitions/95.html)

## Description
The `extract()` function in PHP can be used to import variables into the local symbol table from an array. However, using it on untrusted data, such as user input, can lead to a variety of security vulnerabilities, including arbitrary code execution and SQL injection, making it a dangerous practice.

By using `extract()` on untrusted data, you may inadvertently create variables that overwrite important ones, or worse, you could execute harmful code that was injected by a malicious user.

To adhere to this rule, you should explicitly assign and sanitize user input rather than using `extract()`. This will ensure your code remains secure and compliant.

## Non-Compliant Code Examples
```php
<?php
// Insecure: Using extract() on untrusted data from $_GET
extract($_GET);

echo "Hello, $name!";

// Insecure: Using extract() on untrusted data from $_POST
extract($_POST);

if ($isAdmin) {
    echo "Welcome, admin!";
} else {
    echo "Welcome, user!";
}

// Insecure: Using extract() on untrusted data from $_FILES
extract($_FILES['uploadedFile']);

if (move_uploaded_file($tmp_name, "uploads/$name")) {
    echo "File uploaded successfully!";
} else {
    echo "File upload failed.";
}
?>
```

## Compliant Code Examples
```php
<?php
// Secure: Explicitly assign and sanitize user input
$name = htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');

echo "Hello, $name!";

// Secure: Explicitly assign and validate user input
$isAdmin = isset($_POST['isAdmin']) && $_POST['isAdmin'] == '1';

if ($isAdmin) {
    echo "Welcome, admin!";
} else {
    echo "Welcome, user!";
}

// Secure: Explicitly handle file upload variables and validate
$file = $_FILES['uploadedFile'];
$uploadDir = 'uploads/';
$uploadFile = $uploadDir . basename($file['name']);

if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
    echo "File uploaded successfully!";
} else {
    echo "File upload failed.";
}
?>
```
