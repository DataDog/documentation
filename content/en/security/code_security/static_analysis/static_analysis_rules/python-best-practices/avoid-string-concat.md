---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/avoid-string-concat
- /static_analysis/rules/python-best-practices/avoid-string-concat
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Performance
  id: python-best-practices/avoid-string-concat
  language: Python
  severity: Warning
  severity_rank: 2
title: avoid string concatenation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/avoid-string-concat`

**Language:** Python

**Severity:** Warning

**Category:** Performance

## Description
Concatenation of multiple strings is not efficient and make the code hard to read and understand.

Instead of concatenating multiple strings, use an f-string or a format string.

#### Learn More

 - [Python Documentation: `str.format()`](https://docs.python.org/3/library/stdtypes.html#str.format)
 - [Python Documentation - f-string](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)

## Non-Compliant Code Examples
```python
"my" + awesome + "string"
plop = "super" + "awesome" + "text"
```

## Compliant Code Examples
```python
"my {0} string".format(awesome)
f"my {awesome} string"
plop = "superawesometext"

function(
    tags = (
    user_tags
    + s.get("tags", [])
    + [
        f"schedule_id:{s['_id']}",
        f"schedule_name:{s['schedule_name']}",
        f"git_ref:{schedule_git_ref}",
    ]
)
)

ROOT = Path("/tmp")
my_path = ROOT / "mydir" / "subdir"
```
