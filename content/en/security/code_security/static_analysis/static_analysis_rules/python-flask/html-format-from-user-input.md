---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/html-format-from-user-input
- /static_analysis/rules/python-flask/html-format-from-user-input
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/html-format-from-user-input
  language: Python
  severity: Error
  severity_rank: 1
title: Use of unsanitized data to make API calls
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/html-format-from-user-input`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Use of unsanitized from incoming request for SQL queries is unsafe and leads to SQL injections. Data from requests must be sanitized before being used to issues SQL queries, open file or deserialize data. Make sure the data is sanitized before use.

#### Learn More

 - [CWE-79: Improper Neutralization of Input During Web Page Generation](https://cwe.mitre.org/data/definitions/79.html)

## Non-Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)


@app.route("/route/to/resource/<resource_id>")
def resource1(resource_id):
    return f"<a href='/path/to/{resource_id}'>Click me!</a>"

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    return "<a href='/path/to/{0}'>Click me!</a>".format(resource_id)


@app.route("/route/to/resource/<resource_id>")
def resource3():
    resource_id = flask.request.args.get("resource_id")
    return "<a href='/path/to/%s'>Click me!</a>" % resource_id


@app.route("/route/to/resource/<resource_id>")
def resource4(resource_id):
    ret = f"<a href='/path/to/{resource_id}'>Click me!</a>"
    return ret

@app.route("/route/to/resource/<resource_id>")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    ret = "<a href='/path/to/{0}'>Click me!</a>".format(resource_id)
    return ret


@app.route("/route/to/resource/<resource_id>")
def resource3(resource_id):
    ret = "<a href='/path/to/%s'>Click me!</a>" % resource_id
    return ret

```

## Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)


@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    return "<a href='/path/to/{0}'>Click me!</a>".format(sanitize(resource_id))


@app.route("/route/to/resource/<resource_id>")
def resource2():
    resource_id = get.data()
    ret = requests.get(foo);
    ret = "<a href='/path/to/{0}'>Click me!</a>".format(resource_id)
    return ret


```
