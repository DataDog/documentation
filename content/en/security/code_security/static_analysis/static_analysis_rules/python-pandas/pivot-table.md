---
aliases:
- /continuous_integration/static_analysis/rules/python-pandas/pivot-table
- /static_analysis/rules/python-pandas/pivot-table
dependencies: []
disable_edit: true
group_id: python-pandas
meta:
  category: Best Practices
  id: python-pandas/pivot-table
  language: Python
  severity: Notice
  severity_rank: 3
title: Use pivot_table instead of pivot or unstack
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-pandas/pivot-table`

**Language:** Python

**Severity:** Notice

**Category:** Best Practices

## Description
The functions `isna` and `isnull` are similar. However, this is a best practice to use `isna` since other methods use the same naming patterns.

#### Learn More

 - [Pandas isna() and isnull(), what is the difference?](https://stackoverflow.com/questions/52086574/pandas-isna-and-isnull-what-is-the-difference)

## Non-Compliant Code Examples
```python
table = df.unstack(level=0)
```

```python
table = pd.pivot(
        df,
        index='foo',
        columns='bar',
        values='baz'
        )
```

## Compliant Code Examples
```python
table = df.pivot_table(
        df,
        values='D',
        index=['A', 'B'],
        columns=['C'],
        aggfunc=np.sum,
        fill_value=0
```
