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

Transactions are an efficient way to track and analyze multiple related log events based on some unique identifier. Logs coming from e-commerce applications, user activity on websites, payment integrations, financial transactions, or stock trades can all be grouped together to get a better sense of the actual underlying business activity. For example, an ecommerce website would group log events across various actions such as catalog search, add to cart, and checkout to build a transaction view of the various actions using a common attribute such as requestId or orderId.

In the Log Explorer, build transactions from your log data easily without doing any pre-processing or setup.

## Transactions Table View

Switch to the Transactions view to start building and viewing your log data as transactions in the selected context. A [context][1] is composed of a time range and a search query.

Select any facet from your log data. But facets commonly used for transactions are a unique identifier available across your data sources such as requestId, sessionId, transactionId, clientIP, and userId. Each transaction comes with highlights to get you straight to its characteristic features:

- A **mini graph** displays a rough timeline for the volume of its logs to help you identify how that transaction differs from other transactions.
- The **duration** of the transaction calculated by the difference in the timestamps of the earliest event and most recent event in the transaction.
- The **max severity** of the transaction based on the max severity of log events within the transaction.
- The **total count** of log events within the transaction.

Click on a transaction row in the table to see the underlying logs and eventually drill-down to each individual log event.

## Transaction Operations

- **Adding aggregations:** Click the `+` icon to add more aggregations as columns to the Transaction Table. You can add upto 5 aggregations.
- **Finding key items:** For any `facet` with string values, easily calculate specific log event information using the the operations `count unique`, `latest`, `earliest` and `most frequent`.
- **Getting Statistics:** For any `measure`, easily calculate statistical information using the operations `min`, 'max', `avg`, `sum`, `median', `pc75`, `pc90`,`pc95`, and `pc99`.

Sort the results based on the facet used to group. Click on the column header to change the sort order. The default sort order is ascending order. 

## Saved View & Export options

Save the transaction query as a Saved View[2] for future use. You also have the option to export the transaction view including its columns to a CSV for sharing it with others in your team. Export up to 5,000 logs at once.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/#context
[2]: /logs/explorer/saved_views
