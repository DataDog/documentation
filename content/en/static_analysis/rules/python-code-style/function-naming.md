---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Code Style
  id: python-code-style/function-naming
  language: Python
  severity: Notice
title: function name and parameters should use snake_case
---
## Metadata
**ID:** `python-code-style/function-naming`

**Language:** Python

**Severity:** Notice

**Category:** Code Style

## Description
Ensure that function use `snake_case`.

This rule is not valid for tests files (prefixed by `test_` or suffixed by `_test.py`) because testing requires some camel case methods, such as, `tearDown`, `setUp`, and more.

#### Learn More

 - [Python Documentation Testing: `setUp()`](https://docs.python.org/3/library/unittest.html#unittest.TestCase.setUp)

## Non-Compliant Code Examples
```python
def my_function(myParameter, otherParameter):
  pass
```

```python
def myFunction(arg1, arg2):
  pass

def myOtherFunction():
  pass
```

## Compliant Code Examples
```python
# name used in many testing frameworks. Do not warn on it
def tearDown(self):
    """After each test case, reset and remove the dummy tracer"""
    super(TracerTestCase, self).tearDown()
```

```python
class TestModel(unittest.TestCase):
    def setUp(self):  # used in a file model_test.py, skip the rule for setUp and tearDown
        pass

    def tearDown(self):  # used in a file model_test.py, skip the rule for setUp and tearDown
        pass

    def test_violation_category(self):
        self.assertEqual(ViolationCategory.BEST_PRACTICE.value, 1)
        self.assertEqual(ViolationCategory.DESIGN.value, 2)
        v1 = Violation("bla", 1, "description", 2, ViolationCategory.BEST_PRACTICE, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Best Practices")
        v1 = Violation("bla", 1, "description", 2, 1, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Unknown")
```
