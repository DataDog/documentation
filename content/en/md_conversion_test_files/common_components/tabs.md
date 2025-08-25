---
title: Tabs
---

## Expected .md output

- Each tab set is wrapped in `{% tabs %}` and `{% /tabs %}` tags.
- Each tab is enclosed in `{% tab %}` and `{% /tabs %}` tags.
- Each tab includes its label at the top (for example, "Python"), formatted as a heading of the appropriate level based on context. If no heading levels are left, bold is used, on its own line.

## Example input

A random sentence goes here.

{{< tabs >}}
{{% tab "Python" %}}
This tab is for Python. It has a code fence in it:

```python
print('Hello world')
```
{{% /tab %}}

{{% tab "JavaScript" %}}
This tab is for JavaScript. It has a code fence in it:

```javascript
console.log('Hello world');
```
{{% /tab %}}
{{< /tabs >}}

A random sentence goes here.