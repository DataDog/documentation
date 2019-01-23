---
title: Synthetics
kind: documentation
beta: true
description: documentation
aliases:
  - /integrations/synthetics/
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/uptime_check"
  tag: "Documentation"
  text: "Configure an Uptime Check"
---

<div class="alert alert-warning">Synthetics is currently in beta for the Datadog US Region. To request access complete the <a href="https://app.datadoghq.com/synthetics/beta">Datadog Synthetics Request form</a>.</div>

## Overview

Datadog Synthetics gives you a new layer of visibility on the Datadog platform. By monitoring your applications and API endpoints via simulated user requests and browser rendering, Synthetics helps you ensure uptime, identify regional issues, and track application performance. By unifying Synthetics with your metrics, traces, and logs, Datadog allows you to observe how all your systems are performing as experienced by your users.

{{< img src="synthetics/synthetics_home_page.png" alt="Synthetics home page" responsive="true">}}

## Search 

Advanced search lets you query checks by any combination of checks attributes:

* `title` and `message` - text search
* `status` - Alert, No Data, Ok
* `creator`
* `region`
* `muted`
* `notification` 
* `tags`

To run a search, construct your query using the checkboxes on the left and/or the search bar along the top. The search bar updates with the equivalent query as you check the boxes. Likewise, when you modify the search bar query (or write one from scratch), the checkboxes update to reflect that change. Query results update in real-time as you edit the query; there's no 'Search' button to click.

### Write a query

To search for specific text across all checks, titles, and notification messages, enter your text in the search bar.

Otherwise, use Boolean operators (`AND`, `OR`, and `NOT`) and parentheses to write complex queries using any check field:

* Regular expressions are not supported
* Single-character wildcard (`?`) is not supported, but the general wildcard (`*`) is
* Proximity searches are not supported, but the [fuzzy][1] operator is
* Ranges are not supported
* Boosting is not supported

Finally, the following characters are reserved: `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.`, and whitespace. To search check fields that include any of them, wrap the field string in quotes: `status:("OK") AND "doc-check"` is a valid query string; `status:("OK") AND doc check` is not.

## Create a check

Select **Create a New check +** in the upper right corner of the Synthetics page to create an [Uptime Check][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[2]: /synthetics/uptime_check
