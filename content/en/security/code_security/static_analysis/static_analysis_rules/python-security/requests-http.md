---
aliases:
- /continuous_integration/static_analysis/rules/python-security/requests-http
- /static_analysis/rules/python-security/requests-http
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Security
  id: python-security/requests-http
  language: Python
  severity: Warning
  severity_rank: 2
title: Do not make http calls without encryption
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/requests-http`

**Language:** Python

**Severity:** Warning

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
Making a request with http enables attackers to listen to the traffic and obtain sensitive information. Use `https://` instead.

#### Learn More

 - [CWE-319: Cleartext Transmission of Sensitive Information](https://cwe.mitre.org/data/definitions/319.html)

## Non-Compliant Code Examples
```python
def test1():
    url1 = "http://api.tld"
    requests.get(url1)


def test2():
    url2 = "http://api.tld/user/{0}".format(user_id)
    requests.get(url2)

def test3():
    url3 = f"http://api.tld/user/{user_id}"
    requests.get(url3)
    requests.get(url4)
```

```python
def test1():
    requests.get("http://api.tld")
    requests.get("http://api.tld/user/{0}".format(user_id))
    requests.get(f"http://api.tld/user/{user_id}")
```

## Compliant Code Examples
```python
def download_stuff(identifier, data):
    directory = "/tmp"
    attachments = data.get("attachments", [])

    attachment_url = attachments[0].get("attachment_url", "")

    try:
        response = requests.get(attachment_url, timeout=300)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return (False, "")
```

```python
def test1():
    requests.get("https://api.tld")
    requests.get("https://api.tld/user/{0}".format(user_id))
    requests.get(f"https://api.tld/user/{user_id}")
    requests.get(f"http://localhost.tld/user/{user_id}") # localhost and 127.0.0.1 are safe
```
