---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-django/open-filename-from-request
  language: Python
  severity: Error
title: Filename coming from the request
---
## Metadata
**ID:** `python-django/open-filename-from-request`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Improper validation of input data, leading to potential data leaks. The path should be checked and validated before opening a file in order to prevent opening random files and leaking data.

#### Learn More

 - [CWE-22: Improper Limitation of a Pathname to a Restricted Directory](https://cwe.mitre.org/data/definitions/22.html)

## Non-Compliant Code Examples
```python
def download_file1(request):
    url = request.GET.get("filename")
    print(f"url of the file: {url}")
    file = open(url, "rb")

    with open(url) as f:
        pass
    pass


def download_file2(request):
    url = request.POST.get("filename")
    print(f"url of the file: {url}")
    file = open(url, "rb")

    with open(url) as f:
        pass
    pass

def download_file3(request):
    url = request.BLA.get("filename")
    print(f"url of the file: {url}")
    file = open(url, "rb")

    with open(url) as f:
        pass
    pass
```

## Compliant Code Examples
```python
import os

def download_file(request):
    url = request.GET.get("filename")

    if ".." in url:
        return

    sanitized_path = os.path.realpath(url, strict=True)

    print(f"url of the file: {url}")
    file = open(sanitized_path, "rb")

    with open(sanitized_path) as f:
        pass
    pass
```
