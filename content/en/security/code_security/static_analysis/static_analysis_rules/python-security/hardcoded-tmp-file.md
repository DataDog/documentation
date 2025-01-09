---
aliases:
- /continuous_integration/static_analysis/rules/python-security/hardcoded-tmp-file
- /static_analysis/rules/python-security/hardcoded-tmp-file
dependencies: []
disable_edit: true
group_id: python-security
meta:
  category: Best Practices
  id: python-security/hardcoded-tmp-file
  language: Python
  severity: Info
  severity_rank: 4
title: Do not hardcode temporary file or directory names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-security/hardcoded-tmp-file`

**Language:** Python

**Severity:** Info

**Category:** Best Practices

**CWE**: [377](https://cwe.mitre.org/data/definitions/377.html)

## Description
Do not hardcode the names of temporary files or directories. This may constitute a security vulnerability because an attacker might use that name to create a link to a file they want to overwrite or read.

Instead of hardcoding values, use the `tempfile` Python module to create unpredictable names.


#### Learn More

 - [CWE-377 - Insecure Temporary File](https://cwe.mitre.org/data/definitions/377.html)
 - [Create, use and remove. temporary files securely](https://security.openstack.org/guidelines/dg_using-temporary-files-securely.html)
 - [`tempfile` module](https://docs.python.org/3/library/tempfile.html)

## Non-Compliant Code Examples
```python
with open("/tmp/acme.pub", "rb") as key_file:
    public_key = serialization.load_pem_public_key(
        key_file.read(),
        backend=default_backend()
    )

def foobar():
    api_key_file = Path('/tmp/supersecret.txt')

keyfile = '/tmp/vulpy.apikey.{}.{}'.format(username, key)
keyfile = f"/tmp/vulpy.apikey.{username}.{key}"
def authenticate(request):
    if 'X-APIKEY' not in request.headers:
        return None

    key = request.headers['X-APIKEY']

    for f in Path('/tmp/').glob('vulpy.apikey.*.' + key):
        return f.name.split('.')[2]

    return None
```

## Compliant Code Examples
```python
secure_temp = tempfile.mkstemp(prefix="pre_",suffix="_suf")
print(secure_temp)

temp = tempfile.NamedTemporaryFile()
print(temp)
print(temp.name)
```
