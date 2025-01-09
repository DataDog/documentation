---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/nested-blocks
- /static_analysis/rules/python-best-practices/nested-blocks
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Code Style
  id: python-best-practices/nested-blocks
  language: Python
  severity: Error
  severity_rank: 1
title: Do not have too many nested blocks
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/nested-blocks`

**Language:** Python

**Severity:** Error

**Category:** Code Style

## Description
Avoid to nest too many loops together. Having too many loops make your code harder to understand.
Prefer to organize your code in functions and unit of code you can clearly understand.

#### Learn More

 - [Computer Programming wikibooks - Minimize nesting](https://en.wikibooks.org/wiki/Computer_Programming/Coding_Style/Minimize_nesting)
 

## Arguments

 * `max-levels`: Maximum number of nesting levels. Default: 4.

## Non-Compliant Code Examples
```python
def func():
	for v in bla:
		if bar:
			if baz:
				if wiz:
					if quux: # too many nested elements
						pass
```

```python
def func():
	if foo:
		pass
	else:
		if bar:
			if baz:
				if wiz:  # too many nested elements
					pass
```

```python
def func():
	if foo:
		if bar:
			if baz:
				if wiz:  # too many nested elements
					pass
```

```python
def func():
	if foo:
		pass
	elif bar:
		if bar:
			if baz:
				if wiz:  # too many nested elements
					pass
	else:
		pass
```

## Compliant Code Examples
```python
while Foo:
    while Bar:
        print("foobar")
```
