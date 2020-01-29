---
title: Facet Panel
kind: documentation
description: "Slice and dice"
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---

## Search syntax

A query is composed of terms and operators.

There are two types of terms:

* A **single term** is a single word such as `test` or `hello`.

* A **sequence** is a group of words surrounded by double quotes, such as `"hello dolly"`.

To combine multiple terms into a complex query, you can use any of the following Boolean operators:

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Operator** | **Description**                                                                                        | **Example**                  |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure   |
| `OR`         | **Union**: either term is contained in the selected events                                             | authentication OR password   |
| `-`          | **Exclusion**: the following term is NOT in the event                                                  | authentication AND -password |


### Arrays

You can add facets on arrays of strings or numbers. All values included in the array become listed in the facet and can be used to search the logs.

In the below example, clicking on the `Peter` value in the facet returns all the logs that contains a `users.names` attribute, whose value is either `Peter` or an array that contains `Peter`:

{{< img src="logs/explorer/search/array_search.png" alt="Array and Facets"  style="width:80%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/?tab=facets#setup
[2]: /infrastructure
[3]: /integrations/#cat-log-collection
[4]: /tagging/#tags-best-practices
[5]: /logs/explorer/saved_views
