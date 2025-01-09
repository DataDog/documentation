---
aliases:
- /continuous_integration/static_analysis/rules/python-code-style/class-name
- /static_analysis/rules/python-code-style/class-name
dependencies: []
disable_edit: true
group_id: python-code-style
meta:
  category: Code Style
  id: python-code-style/class-name
  language: Python
  severity: Notice
  severity_rank: 3
title: class name should be PascalCase
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-code-style/class-name`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Class names should be `PascalCase` and not `camelCase` or `snake_case`.

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

class Float64Serializer(object):
    pass

class LongNameThatHa5SomeNumbers999:
    pass

class K8sFaultyChangeSignal:
    pass

class ModeA:
    pass

class CreateAMode:
    pass

class context(ContextDecorator):
    pass
```
