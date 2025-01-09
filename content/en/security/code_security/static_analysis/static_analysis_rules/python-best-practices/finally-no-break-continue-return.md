---
aliases:
- /continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return
- /static_analysis/rules/python-best-practices/finally-no-break-continue-return
dependencies: []
disable_edit: true
group_id: python-best-practices
meta:
  category: Best Practices
  id: python-best-practices/finally-no-break-continue-return
  language: Python
  severity: Warning
  severity_rank: 2
title: do not use break or continue in finally block
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `python-best-practices/finally-no-break-continue-return`

**Language:** Python

**Severity:** Warning

**Category:** Best Practices

## Description
When using `return`, `break` or `continue` in a `finally` block, it will stop the spread of any exceptions that were thrown in the `try`, `else`, or `except` blocks and will disregard any return statements.

#### Learn More

 - [Official Python documentation](https://docs.python.org/3/reference/compound_stmts.html#except)

## Non-Compliant Code Examples
```python
try:
	client_obj.get_url(url)
except (URLError, ValueError):
	client_obj.remove_url(url)
except SocketTimeout:
	client_obj.handle_url_timeout(url)
finally:
	break  # avoid break in the finally block
```

```python
try:
	client_obj.get_url(url)
except (URLError, ValueError):
	client_obj.remove_url(url)
except SocketTimeout:
	client_obj.handle_url_timeout(url)
finally:
	return 0  # avoid return in the finally block
```

```python
try:
	client_obj.get_url(url)
except (URLError, ValueError):
	client_obj.remove_url(url)
except SocketTimeout:
	client_obj.handle_url_timeout(url)
finally:
	continue  # avoid continue in the finally block
```

## Compliant Code Examples
```python
try:
  client_obj.get_url(url)
except (URLError, ValueError):
  client_obj.remove_url(url)
except SocketTimeout:
  client_obj.handle_url_timeout(url)
finally:
  print("cleanup the mess")
```
