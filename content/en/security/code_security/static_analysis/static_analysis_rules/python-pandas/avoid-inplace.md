---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/avoid-inplace
- /static_analysis/rules/python-pandas/avoid-inplace
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/avoid-inplace
  language: Python
  severity: Warning
  severity_rank: 2
title: Avoid using inplace=True
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/avoid-inplace`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
Avoid using `inplace=True` as it does not have clear performance impact and is potentially dangerous and does not behave as it should.

#### Learn More

 - [Why You Should Probably Never Use pandas inplace=True](https://towardsdatascience.com/why-you-should-probably-never-use-pandas-inplace-true-9f9f211849e4?gi=ae387a166946)

## Non-Compliant Code Examples
```python
df.drop(['a'], axis=1, inplace=True)
```

## Compliant Code Examples
```python
df.drop(['a'], axis=1, inplace=False)
```
