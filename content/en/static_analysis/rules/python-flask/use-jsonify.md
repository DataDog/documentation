---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-flask/use-jsonify
  language: Python
  severity: Notice
title: use jsonify instead of json.dumps for JSON output
---
## Metadata
**ID:** `python-flask/use-jsonify`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
With the flask framework, `jsonify` helps you write API endpoints that return JSON data.

#### Learn More

 - [Python Flask: `jsonify()`](https://flask.palletsprojects.com/en/2.3.x/api/#flask.json.jsonify)



## Non-Compliant Code Examples
```python
@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return json.dumps(article) # use flask.jsonify instead of json.dumps
```

## Compliant Code Examples
```python
from flask import jsonify

@app.route("/article")
def get_article():
    article = get_article_by_id(request.args.get("id"))
    return jsonify(article)
```
