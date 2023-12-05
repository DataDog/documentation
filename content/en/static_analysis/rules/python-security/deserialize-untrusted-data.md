---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/deserialize-untrusted-data
  language: Python
  severity: Notice
title: avoid unsafe function to (de)serialize data
---
## Metadata
**ID:** `python-security/deserialize-untrusted-data`

**Language:** Python

**Severity:** Notice

**Category:** Security

## Description
Do not deserialize untrusted data. Make sure you use alternatives to check that the data can be deserialized safely. There is no workaround around this: unless you **really** trust the data source, it's better to use another way to exchange data, such as an API or other protocols such as [protobuf](https://developers.google.com/protocol-buffers) or [thrift](https://thrift.apache.org/).

**Read More**

 - [Unsafe Deserialization in Python (CWE-502)](https://www.codiga.io/blog/python-unsafe-deserialization/)

 - [CWE-502: Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)

## Non-Compliant Code Examples
```python
import marshal
person = {"name":"xyz", "age":22, "marks":[45,56,78]}
data = marshal.dumps(person)
obj = marshal.loads(data)
```

```python
import pickle

data = pickle.loads(data)
```

## Compliant Code Examples
```python
import pickle

data = pickle.loads(data)

```

```python
data = pickle.loads(data)
```
