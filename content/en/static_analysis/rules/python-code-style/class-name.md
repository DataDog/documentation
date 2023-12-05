---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-code-style/class-name
  language: Python
  severity: Notice
title: class name should be CamelCase
---
## Metadata
**ID:** `python-code-style/class-name`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Class names should be `CamelCase` and not `camelCase` or `snake_case`.

#### Learn More

 - [PEP8 style guide](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## Non-Compliant Code Examples
```python
class _runtimeMetricsStatus(type):
    pass
```

```python
class myClass(Parent):
    def __init__(self):
        pass


```

## Compliant Code Examples
```python
class REQUESTS_MODE(IntEnum):
    AGENTLESS_EVENTS = 0
    EVP_PROXY_EVENTS = 1
```

```python
class _RuntimeMetricsStatus(type):
    pass
```

```python
class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='tweets.tweet'),
        ),
        migrations.DeleteModel(
            name='Reply',
        ),
    ]
```

```python
class MyClass(Parent):
    def __init__(self):
        pass

class TestRestapiV4Lock(FunctionalTestController):
    pass

class TestS3Storage(TestCase):
    pass


class TestS35Storage(TestCase):
    pass



class TestS35Storage(TestCase):
    pass

```
