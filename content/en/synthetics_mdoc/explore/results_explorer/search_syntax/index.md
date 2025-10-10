---
title: Search Syntax
description: >-
  Learn how to create a search query in the Synthetic Monitoring & Testing
  Results Explorer.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests >
  Synthetic Monitoring & Testing Results Explorer > Search Syntax
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/explore/results_explorer/search_syntax/index.html
---

# Search Syntax

## Overview{% #overview %}

A query is composed of terms and operators.

There are two types of terms:

- A **single term** is a single word such as `test` or `hello`.
- A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

| Operator | Description                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------- |
| `AND`    | **Intersection**: Both terms are in the selected views. If no operator is used, `AND` is used by default. |
| `OR`     | **Union**: Either term is contained in the selected views.                                                |
| `-`      | **Exclusion**: The following term is not in the view.                                                     |

## Autocomplete{% #autocomplete %}

Use the search bar's autocomplete functionality to complete your queries with existing values.

## Numerical values{% #numerical-values %}

You can search for a numerical attribute within a specific range. For example, retrieve all batches with an average duration between two and ten nanoseconds in the **Duration** facet. The search query updates with `Duration:[2-10]`.

## Further reading{% #further-reading %}

- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/synthetics/explore/results_explorer)
