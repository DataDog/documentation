---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-assert
  language: Python
  severity: Error
title: do not use assert in production code
---
## Metadata
**ID:** `python-best-practices/no-assert`

**Language:** Python

**Severity:** Error

**Category:** Best Practices

## Description
Avoid having `assert` statements in code as they are not being used when . This rule does not apply to test files, such as, files ending with `_test.py`.

## Non-Compliant Code Examples
```python
def foo(bar):
  assert bar  # no assert in production code
```

## Compliant Code Examples
```python
ctx1.set_baggage_item("test", 3)
ctx2 = SpanContext()
# Assert in a test file does not raise an error
assert "test" not in ctx2._baggage
```

```python
def foo(bar):
  assert bar  # assert ok in test code (see filename)
```

```python
def foo(bar):
  assert bar  # assert ok in test code
```
