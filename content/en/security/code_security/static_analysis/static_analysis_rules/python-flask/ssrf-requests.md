---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/ssrf-requests
- /static_analysis/rules/python-flask/ssrf-requests
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Security
  id: python-flask/ssrf-requests
  language: Python
  severity: Error
  severity_rank: 1
title: Use of unsanitized data to make API calls
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-flask/ssrf-requests`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [918](https://cwe.mitre.org/data/definitions/918.html)

## Description
Use of unsanitized data from incoming request for handling SQL request may lead to SQL injection. Incoming request data must always be sanitized before used.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)

## Non-Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)

@app.route("/route/to/resource/<resource_id>")
def resource(resource_id):
    foo = requests.get(f"https://api.service.ext/get/by/id/{resource_id}")
    return None


@app.route("/route/to/resource/<resource_id>")
def resource2(resource_id):
    bar = requests.get("https://api.service.ext/get/by/id/" + resource_id})
    return None

@app.route("/route/to/resource/<resource_id>")
def resource3(resource_id):
    baz = requests.get("https://api.service.ext/get/by/id/{0}".format(resource_id}))
    return None


@app.get("/route/to/another/resource/<resource_id>")
def resource4(resource_id):
    foo = requests.get(f"https://api.service.ext/get/by/id/{resource_id}")
    return None

@app.get("/route/to/another/resource/<resource_id>")
def resource5(resource_id):
    bar = requests.get("https://api.service.ext/get/by/id/" + resource_id})
    return None

@app.get("/route/to/another/resource/<resource_id>")
def resource6(resource_id):
    baz = requests.get("https://api.service.ext/get/by/id/{0}".format(resource_id}))
    return None

@app.route("/route/to/resource/the/return/<resource_id>", methods=["GET"])
def get_param():
    rid = flask.request.args.get("resource_id")
    # unsanitized data
    requests.post(f"https://api.service.ext/get/by/id/{rid}", timeout=10)
    requests.patch(rid, timeout=10)
    requests.get("https://api.service.ext/get/by/id/{0}".format(rid))
    requests.get("https://api.service.ext/get/by/id/" + rid)
    requests.patch(rid, timeout=10)
    return None

@app.route("/this/is/fine/<sure>")
def fine(sure):
    print("foobar")
    return requests.get("https://api.service.ext/nothing")
```

## Compliant Code Examples
```python
import flask
import requests

app = flask.Flask(__name__)

@app.route("/route/to/resource/<resource_id>")
def resource(resource_id):
    sanitized_resource_id = sanitize(resource_id)
    foo = requests.get(f"https://api.service.ext/get/by/id/{sanitized_resource_id}")
    return foo
```
