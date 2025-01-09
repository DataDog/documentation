---
aliases:
- /continuous_integration/static_analysis/rules/python-security/sql-server-security-credentials
- /static_analysis/rules/python-security/sql-server-security-credentials
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/sql-server-security-credentials
  language: Python
  severity: Error
  severity_rank: 1
title: do not pass hardcoded credentials
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/sql-server-security-credentials`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Hardcoding database credentials directly in your source code is a security risk as anyone with access to your source code and see your credentials. It's strongly recommended to use a different approach that limits the exposure of your credentials.

## Non-Compliant Code Examples
```python
import psycopg2

conn = psycopg2.connect(database="db_name",
                        host="db_host",
                        user="db_user",
                        password="db_pass", # hardcoded password
                        port="db_port")
```

```python
import mysql.connector

connection = mysql.connector.connect(
  host=host,
  user=user,
  passwd=f"password", # hardcoded password
  database=database,
  charset='utf8mb4',
  use_pure=True,
  connection_timeout=5)
```

```python
import mysql.connector

connection = mysql.connector.connect(
  host=host,
  user=user,
  passwd="password", # hardcoded password
  database=database,
  charset='utf8mb4',
  use_pure=True,
  connection_timeout=5)
```

## Compliant Code Examples
```python
import mysql.connector

connection = mysql.connector.connect(
  host=host,
  user=user,
  passwd=password,
  database=database,
  charset='utf8mb4',
  use_pure=True,
  connection_timeout=5)
```

```python
import mysql.connector

connection = mysql.connector.another_function(
  host=host,
  user=user,
  passwd=f"password",
  database=database,
  charset='utf8mb4',
  use_pure=True,
  connection_timeout=5)
```
