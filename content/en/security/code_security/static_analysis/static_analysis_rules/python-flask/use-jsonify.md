---
aliases:
- /continuous_integration/static_analysis/rules/python-flask/use-jsonify
- /static_analysis/rules/python-flask/use-jsonify
dependencies: []
disable_edit: true
group_id: python-flask
meta:
  category: Best Practices
  id: python-flask/use-jsonify
  language: Python
  severity: Notice
  severity_rank: 3
title: use jsonify instead of json.dumps for JSON output
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
