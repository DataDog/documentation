---
aliases:
- /continuous_integration/static_analysis/rules/python-security/html-string-from-parameters
- /static_analysis/rules/python-security/html-string-from-parameters
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/html-string-from-parameters
  language: Python
  severity: Error
  severity_rank: 1
title: Avoid HTML built in strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/html-string-from-parameters`

**Language:** Python

**Severity:** Error

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Detect unsafe HTML content. User-input may be injected into HTML content without being sanitized.

User input should always be checked before being used in HTML data.

#### Learn More

- [CWE-79: Improper Neutralization of Input During Web Page Generation](https://cwe.mitre.org/data/definitions/79.html)

## Non-Compliant Code Examples
```python
def my_function(arg1: str, arg2, arg3 = "blabla", arg4: str = "blibli"):
    html1 = f"<div>{arg1}</div>"
    html1 = "<div>{0}</div>".format(arg1)
    html2 = f"<div>{arg2['bli']}</div>"
    html2 = "<div>{0}</div>".format(arg2['bli'])
    html3 = "<div>" + arg1 + "</div>"
    render(f"<div>{arg1}</div>")
    return html


def my_function2(arg1: str, arg2, arg3 = "blabla", arg4: str = "blibli"):
    html1 = f"<div>{arg51}</div>"
    html1 = "<div>{0}</div>".format(arg42)
    html2 = f"<div>{arg26['bli']}</div>"
    html2 = "<div>{0}</div>".format(arg51['bli'])
    html3 = "<div>" + arg41 + "</div>"
    render(f"<div>{arg51}</div>")
    return html


def my_function3(arg1: str, arg2, arg3 = "blabla", arg4: str = "blibli"):
    html1 = f"<div>{arg1}</div>"
    html1 = "<div>{0}</div>".format(arg1)
    html2 = f"<div>{arg2['bli']}</div>"
    html2 = "<div>{0}</div>".format(arg2['bli'])
    html3 = "<div>" + arg1 + "</div>"
    render(f"<div>{arg1}</div>")
    return html
```

## Compliant Code Examples
```python
def my_function(arg1: str, arg2, arg3 = "blabla", arg4: str = "blibli"):
    html1 = f"<div>{sanitize_value(arg1)}</div>"
    html1 = "<div>{0}</div>".format(sanitize_value(arg1))
    html2 = f"<div>{sanitize_value(arg2['bli'])}</div>"
    html2 = "<div>{0}</div>".format(sanitize_value(arg2['bli']))
    html3 = "<div>" + sanitize_value(arg1) + "</div>"
    render(f"<div>{sanitize_value(arg1)}</div>")
    return html




```
