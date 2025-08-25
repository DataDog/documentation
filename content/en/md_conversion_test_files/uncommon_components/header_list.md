---
title: Header List
---

## Expected .md output

A list of links. If the header is present, it introduces the list:

Some header:
- Link one
- Link two

## Example input

{{< header-list header="Section title" >}}
    {{< nextlink href="link/here" >}}Link one{{< /nextlink >}}
    {{< nextlink href="link/here" >}}Link two{{< /nextlink >}}
{{< /header-list >}}