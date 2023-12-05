---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Best Practices
  id: python-best-practices/no-bare-except
  language: Python
  severity: Warning
title: do not use bare except
---
## Metadata
**ID:** `python-best-practices/no-bare-except`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Avoid bare `except`. Try to always use specialized exception names in `except` blocks.

## Non-Compliant Code Examples
```python
try:
  print("foo")
except:  # use a specialized exception name
  print("bar")
```

## Compliant Code Examples
```python
try:
    parsed = json.loads(response.body)
except json.JSONDecodeError:
    log.warning("Test skips request responded with invalid JSON '%s'", response.body)
    return
```

```python
try:
  pass
except (TypeError, ValueError):
    log.debug(
        (
            "received invalid x-datadog-* headers, "
            "trace-id: %r, parent-id: %r, priority: %r, origin: %r, tags:%r"
        ),
        trace_id,
        parent_span_id,
        sampling_priority,
        origin,
        tags_value,
    )
```

```python
try:
    foo()
except MyError as e:
    bar()
```

```python
try:
  print("foo")
except MyException:
  print("bar")
```
