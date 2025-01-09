---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/os-system-unsanitized-data
- /static_analysis/rules/python-flask/os-system-unsanitized-data
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/os-system-unsanitized-data
  language: Python
  severity: Error
  severity_rank: 1
title: Use of unsanitized data to create processes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/os-system-unsanitized-data`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
Use of unsanitized from incoming request to execute a command may lead to command injection. It is highly recommended that data is checked and sanitized before use.

#### Learn More

 - [CWE-78: roper Neutralization of Special Elements used in an OS](https://cwe.mitre.org/data/definitions/78.html)

## Non-Compliant Code Examples
```python
import flask
import os

app = flask.Flask(__name__)



@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file1 = subprocess.call(resource_id)
    file2 = subprocess.capture_output(f"/path/to/{resource_id}")

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file4 = os.system("/path/to/{0}".format(resource_id))
    os.system(request.remote_addr)
    bla = os.system(request.foo)

@app.route("/route/to/resource")
def resource2():
    resource_id = flask.request.args.get("resource_id")
    subprocess.call(resource_id)
    subprocess.run(["command", resource_id])
```

## Compliant Code Examples
```python
import flask
import os

app = flask.Flask(__name__)

@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    file1 = subprocess.call(sanitize(resource_id))
    file2 = subprocess.capture_output(f"/path/to/{sanitize(resource_id)}")
```
