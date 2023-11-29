---
title: CD Visibility Explorer Search Syntax
kind: documentation
description: Search all of your deployment executions.
further_reading:
- link: "/continuous_delivery/search"
  tag: "Documentation"
  text: "Filter and group deployments"
- link: "/continuous_delivery/explorer/facets"
  tag: "Documentation"
  text: "Learn about facets"
---

## Overview

A query filter is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following case sensitive Boolean operators:

| **Operator** | **Description**                                                                                        | **Example**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event (apply to each individual raw text search)                                                  | authentication AND -password |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}