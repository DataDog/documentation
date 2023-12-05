---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/aws-boto-credentials
  language: Python
  severity: Notice
title: use env vars over hardcoded values
---
## Metadata
**ID:** `python-security/aws-boto-credentials`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
This rule makes sure that the `boto3` library use the environments variables to authenticate instead of using hardcoded credentials. This rule checks for the `boto3.client` and `boto3.Session` calls. It addresses the [CWE-798 rule](https://cwe.mitre.org/data/definitions/798.html) - uses of hardcoded credentials in code.

#### Learn More

 - [AWS credentials](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html#configuring-credentials)
 - [CWE-798: Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)

## Non-Compliant Code Examples
```python
from boto3 import client

cli = client(
    's3',
    aws_access_key_id="AGPAFOOBAR",
    aws_secret_access_key="bar",
    aws_session_token=SESSION_TOKEN
)
```

```python
import boto3 

client = boto3.client(
    's3',
    aws_access_key_id="AGPAFOOBAR",
    aws_secret_access_key="bar",
    aws_session_token=SESSION_TOKEN
)
```

```python
import boto3

client = boto3.Session(
    's3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    aws_session_token="foobar" # hard coded credential
)
```

## Compliant Code Examples
```python
import boto3

client = boto3.Session(
    's3',
    aws_session_token=SESSION_TOKEN
)
```

```python
import boto3

client = boto3.client(
    's3',
    aws_session_token=SESSION_TOKEN
)
```

```python
client = boto3.client(
    's3',
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    aws_session_token=SESSION_TOKEN
)
```
