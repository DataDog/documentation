---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/open-file-unsanitized-data
- /static_analysis/rules/python-flask/open-file-unsanitized-data
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/open-file-unsanitized-data
  language: Python
  severity: Error
  severity_rank: 1
title: Use of unsanitized data to open file
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/open-file-unsanitized-data`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
Use of unsanitized from incoming request, leading to potential data leak and lack of control of the service. Do not use unsanitized data to control file operations. The code should check any incoming data and make sure it's safe to use it.

#### Learn More

 - [CWE-22: CWE-22: Improper Limitation of a Pathname to a Restricted Directory](https://cwe.mitre.org/data/definitions/22.html)

## Non-Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)


@app.route("/route/to/resource/<resource_id>")
def resource1(resource_id):
    with open(resource_id) as f:
        pass
    with open(f"/path/to/{resource_id}") as f:
        pass
    with open("/path/to/{0}".format(resource_id)) as f:
        pass
    with open("/path/to/{0}".other(resource_id)) as f:
        pass

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file1 = open(resource_id)
    file2 = open(f"/path/to/{resource_id}")
    file3 = open("/path/to/{0}".format(resource_id))


@app.route("/route/to/resource")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    file1 = open(resource_id)
    file2 = open(f"/path/to/{resource_id}")
    file3 = open("/path/to/{0}".format(resource_id))

from flask import Flask, request, render_template


app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config['DEBUG'] = True


@app.route("/")
def start():
    return render_template("index.html")
```

## Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    sanitized_resource_id = sanitize(resource_id)
    file1 = open(sanitized_resource_id)
```
