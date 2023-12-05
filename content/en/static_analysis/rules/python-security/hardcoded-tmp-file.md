---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-security/hardcoded-tmp-file
  language: Python
  severity: None
title: Do not hardcode temp file or directory
---
## Metadata
**ID:** `python-security/hardcoded-tmp-file`

**Language:** Python

**Severity:** None

**Category:** Best Practices

## Description
Do not hardcode the name or directory of temporary files. Use the `tempfile` Python instead of hardcoding values.


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
