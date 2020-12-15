---
title: Transactions
kind: documentation
description: 'Group multiple related log events into a single higher level event called transaction.'
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/explorer/patterns'
      tag: 'Documentation'
      text: 'Detect patterns inside your logs'
---

## Overview

Transactions are multiple related log events grouped by a common unique identifier into a single aggregated event and can be used to track and analyze business activity. For example, an e-commerce website would group log events across various user actions, such as catalog search, add to cart, and checkout, to build a transaction view using a common attribute such as `requestId` or `orderId`.

In the Log Explorer, build transactions from your log data without any pre-processing or setup.

{{< img src="logs/explorer/transactions_walkthrough.gif" alt="Build transaction queries in log explorer" style="width:80%;" >}}

## Transactions Table View

Switch to the Transactions view, and select a facet to build a transaction on. Facets commonly used for transactions are unique identifiers available across your data sources such as `requestId`, `sessionId`, `transactionId`, `clientIP`, and `userId`. The following information is displayed for each transaction in the table:

- A **mini graph** displaying a rough timeline of its log volume.
- **Duration** of the transaction calculated by the difference in the timestamps of its earliest and most recent events.
- **Max severity** based on the max severity of a log event in the transaction.
- **Total count** of log events within the transaction.

Click on a transaction row to drill down into its underlying log events.

{{< img src="logs/explorer/transactions_details.png" alt="Drill down to see transaction log events" style="width:80%;" >}}

## Transactions Operations

- **Adding aggregations:** Click the `+` icon to add aggregations as columns to the Transaction Table. You can add up to five aggregations.
- **Finding key items:** For any `facet` with string values, calculate specific log event information using the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, calculate statistical information using the operations `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99`.

Sort the results based on the facet used to group. Click on the column header to change the sort order. By default, the sort order is ascending.

## Saved View and Export Options

Save the transaction query as a [Saved View][1] for future use. You can also export a transaction view to a CSV for sharing. Export up to 5,000 logs at once.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/saved_views
