---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/sqlalchemy-injection
- /static_analysis/rules/python-flask/sqlalchemy-injection
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/sqlalchemy-injection
  language: Python
  severity: Error
  severity_rank: 1
title: Use of unsanitized data to issue SQL queries
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/sqlalchemy-injection`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
Use of unsanitized data from incoming requests in SQL queries may lead to SQL injections. Instead, the data should be filtered and sanitized before use, making sure all potential SQL injections are avoided.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)

## Non-Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)



@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file1 = query.order_by(resource_id)
    file2 = query.having(f"{resource_id}")

@app.route("/route/to/resource/<resource_id>")
def resource3(resource_id):
    file3 = query.filter("{0}".format(resource_id))


@app.route("/route/to/resource")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    file1 = query.group_by(resource_id)
```

## Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)

@app.route("/route/to/resource")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    file1 = query.group_by(sanitize(resource_id))
```
