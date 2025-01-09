---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/init-method-required
- /static_analysis/rules/python-best-practices/init-method-required
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/init-method-required
  language: Python
  severity: Notice
  severity_rank: 3
title: ensure classes have an __init__ method
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/init-method-required`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
Ensure that a class has an `__init__` method. This check is bypassed when the class is a data class (annotated with @dataclass).

## Non-Compliant Code Examples
```python
class Foo:  # need to define __init__
	def foo(bar):
		pass
	def bar(baz):
		pass
```

## Compliant Code Examples
```python
# dataclass do not require an init class
@dataclass
class Requests:
    cpu: float  # expressed in cpu cores
    memory: int  # expressed in bytes

    @staticmethod
    def from_pod(pod: V1Pod):
        cpu = 0.0
        memory = 0

        for container in pod.spec.containers:
            cpu += parse_cpu_string(container.resources.requests["cpu"])
            memory += parse_memory_string(container.resources.requests["memory"])

        return Requests(cpu, memory)

    def add(self, other):
        self.cpu += other.cpu
        self.memory += other.memory


@frozen
class AnotherClass:
    cpu: float
    memory: int
    def add(self, other):
        self.cpu += other.cpu
        self.memory += other.memory
```

```python
class Child(Parent):
  def fn():
      pass

class AnotherChild(modname.Parent):
  def another_fn():
    pass

```

```python
class UserLoginTest(TestCase):
    def setUp(self):
        self.username = 'testuser'
        self.password = 'testpassword'
        self.user = User.objects.create_user(username=self.username, password=self.password)

    def test_correct_credentials(self):
        user = authenticate(username=self.username, password=self.password)
        self.assertIsNotNone(user)
        self.assertEqual(user, self.user)

    def test_incorrect_credentials(self):
        user = authenticate(username=self.username, password='wrongpassword')
        self.assertIsNone(user)
```

```python
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
    ]
```

```python
@dataclass
class Foo:  # no __init__ required for dataclass
	value = 51
```

```python
class Foo:
	def __init__(self):
		pass
```
