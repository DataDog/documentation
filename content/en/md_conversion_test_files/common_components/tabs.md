---
title: Tabs
---

## Expected .md output

- Each tab starts with `[BEGIN TAB]` and end with `[END TAB]`.
- Each tab includes its label at the top (for example, "Python"), formatted as a heading.

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