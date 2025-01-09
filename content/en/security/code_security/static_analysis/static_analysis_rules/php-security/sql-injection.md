---
aliases:
- /continuous_integration/static_analysis/rules/php-security/sql-injection
- /static_analysis/rules/php-security/sql-injection
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/sql-injection
  language: PHP
  severity: Error
  severity_rank: 1
title: Prevent SQL queries built from unsanitized input
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/sql-injection`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
This rule prohibits the construction of SQL queries from unsanitized input. This is crucial because it helps prevent SQL Injection attacks, a common and serious security vulnerability where an attacker can manipulate SQL queries to gain unauthorized access to a database or perform malicious actions.

In a SQL Injection attack, an attacker can insert malicious SQL code into input fields, which can then be executed by the database if the input is not properly sanitized. This can lead to data theft, data corruption, or even loss of control over the database.

To avoid this, it's important to use prepared statements or parameterized queries, which can ensure that user input is always treated as literal data and not part of the SQL command. In PHP, you can use the `prepare` and `bind_param` functions of the `mysqli` extension to create safe SQL queries. For example, instead of concatenating user input into the query string, you should use placeholders (like `:username` and `:password` in the example) and then bind the actual user input to these placeholders.

## Non-Compliant Code Examples
```php
<?php
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE user = '" . $username . "' AND pass = '" . $password . "'";
$statement = $conn->query($query);
```

## Compliant Code Examples
```php
<?php
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE user = :username AND pass = :password";

$statement = $conn->prepare($query);
$statement->bind_param(":username", $username);
$statement->bind_param(":password", $password);
$statement->execute();
$statement->store_result();
```
