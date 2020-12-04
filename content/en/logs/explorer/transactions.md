---
title: Transactions
kind: documentation
description: 'Group related log events into a single higher level called transaction.'
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/explorer/patterns'
      tag: 'Documentation'
      text: 'Detect patterns inside your logs'
---

## Overview

Transactions are an efficient way to track and analyze multiple related log events based on some unique identifier. Logs coming from e-commerce applications, user activity on websites, payment integrations, financial transactions, or stock trades can all be grouped together to get a better sense of the actual underlying business activity.

In the Log Explorer, build transactions from your log data easily without doing any pre-processing or setup.

## Transactions Table

Switch to the Transactions view to start building and viewing your log data as transactions in the selected context. A [context][1] is composed of a time range and a search query.

You can select any facet from your log data. But facets commonly used for transactions are a unique identifier available across your data sources such as requestId, sessionId, transactionId, clientIP, and userId. Each transaction comes with highlights to get you straight to its characteristic features:

- A mini graph displays a rough timeline for the volume of its logs to help you identify how that transaction differs from other transactions.
- The duration of the transaction calculated by the difference in the timestamps of the earliest event and most recent event in the transaction.
- The max severity of the transaction based on the max severity of log events within the transaction.
- The total count of log events within the transaction.

Click on a transaction to see the underlying logs and eventually drill-down to each individual log event.

## Transaction Operations

- **Adding aggregations:** Click the `+` icon to add more aggregations as columns to the Transaction Table. You can add upto 5 aggregations.
- **Cardinality:** When selecting a `facet` with string values, the operations available are `count unique`, `latest`, `earliest` and `most frequent`.
- **Statistics:** When selecting a `measure`, the operations available are `min`, 'max', `avg`, `sum`, `median', `pc75`, `pc90`,`pc95`, and `pc99`.

You can sort the results based on the facet used to group. Click on the column header to change the sort order. The default sort order is ascending order. 

## Saved View & Export options

You can save the transaction query as a Saved View[2] for future use. You also have the option to export the results of the Transaction table to a CSV for sharing it with others in your team. Export your current transaction view with its selected columns to a CSV file. You can export up to 5,000 logs at once.

[1]: /logs/explorer/#context
[2]: /logs/explorer/saved_views
