---
aliases:
- /ja/synthetics/explorer/search_syntax
description: Learn how to create a search query in the Synthetic Monitoring & Testing
  Results Explorer.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
kind: documentation
title: Search Syntax
---

## Overview

A query is composed of terms and operators. 

There are two types of terms:

- A **single term** is a single word such as `test` or `hello`.
- A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| Operator | Description                                                                                        |
|--------------|------------------------------------------------------------------------------------------------------- |
| `AND`        | **Intersection**: Both terms are in the selected views. If no operator is used, `AND` is used by default. |
| `OR`         | **Union**: Either term is contained in the selected views.                                             |
| `-`          | **Exclusion**: The following term is not in the view.                                                  |

## Autocomplete

Use the search bar's autocomplete functionality to complete your queries with existing values.

## Numerical values

You can search for a numerical attribute within a specific range. For example, retrieve all batches with an average duration between two and ten nanoseconds in the **Duration** facet. The search query updates with `Duration:[2-10]`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}