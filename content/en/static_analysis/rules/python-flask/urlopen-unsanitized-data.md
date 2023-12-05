---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-flask/urlopen-unsanitized-data
  language: Python
  severity: Error
title: Use of unsanitized data to open API
---
## Metadata
**ID:** `python-flask/urlopen-unsanitized-data`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Use of unsanitized from incoming request, leading to potential data leak and lack of control of the service. The code should check any incoming data and make sure it's safe to use it.

#### Learn More

 - [CWE-918: Server-Side Request Forgery (SSRF)](https://cwe.mitre.org/data/definitions/918.html)

## Non-Compliant Code Examples
```python
import flask
from urllib.request import urlopen

app = flask.Flask(__name__)



@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file1 = urlopen(resource_id)
    file2 = urlopen(f"/path/to/{resource_id}")


@app.route("/route/to/resource")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    file1 = urlopen(resource_id)
    file2 = urlopen(f"/path/to/{resource_id}")
    file3 = urlopen("/path/to/{0}".format(resource_id))
```

## Compliant Code Examples
```python
import flask
from urllib.request import urlopen

app = flask.Flask(__name__)

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    sanitized_resource_id = sanitize(resource_id)
    file1 = urlopen(sanitized_resource_id)
```
