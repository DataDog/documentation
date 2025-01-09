---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else
- /static_analysis/rules/python-best-practices/if-return-no-else
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/if-return-no-else
  language: Python
  severity: Notice
  severity_rank: 3
title: when an if condition returns an value, else is not necessary
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/if-return-no-else`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
If the code in the `if` branch returns a value, do not have the `else` branch present.

## Non-Compliant Code Examples
```python
if bla:
	foo()
	return 1
else:  # unnecessary, remove the else branch
	return 2
```

## Compliant Code Examples
```python
if bla:
	foo()
	return 1
elif bar:
	return 2
```

```python
if bla:
	foo()
	return 1
return 2
```

```python
if bla:
	foo()
else:
	return 2
```
