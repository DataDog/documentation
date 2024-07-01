---
title: Grouping Logs Into Transactions
kind: documentation
description: 'Group queried logs into transactions.'
further_reading:
- link: logs/explorer/
  tag: Documentation
  text: Learn about the Log Explorer
- link: logs/explorer/analytics
  tag: Documentation
  text: Learn how to analyze your logs
---

## Overview

Transactions aggregate indexed logs according to instances of a sequence of events, such as a user session or a request processed across multiple microservices.

The transaction aggregation differs from the natural group aggregation, in the sense that resulting aggregates not only include logs matching the query, but also all logs belonging to the related transactions.

You can use the following information about transactions to customize your search query:

Duration
: The difference of timestamps for the last and first log in the transaction. _This measure is automatically added_.

Maximum Severity
: Found in logs in the transaction. _This measure is automatically added_.

Find Key Items
: For any `facet` with string values, calculate specific log information using the `count unique`, `latest`, `earliest`, and `most frequent` operations.

Get Statistics
: For any `measure`, calculate statistical information using the `min`, `max`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, and `pc99` operations.

Set Start And End Conditions
: Customize transaction boundaries by specifying the start and end of the transaction using distinct queries.

For example, an e-commerce website groups logs across various user actions, such as catalog search, add to cart, and checkout, to build a **Transactions** view using a common attribute such as `requestId` or `orderId`.

{{< img src="logs/explorer/aggregations_transactions.jpg" alt="The logs explorer showing logs grouped by transactions" style="width:100%;" >}}

Transactions support the [List Aggregates][1] visualization. Clicking a transaction in the list opens the transaction side panel from which you can:

- Access all logs within that transaction
- Search specific logs within that transaction

{{< img src="logs/explorer/transactions_side_panel.png" alt="The transaction log panel showing logs within the selected transaction" style="width:80%;" >}}

When a start or end condition is used to define a transaction, click on a transaction group in the list to open the transaction group side panel, from which you can:

- Access the transactions within that transaction group in sequence
- Access all logs within each transaction
- View statistics for each transaction and summary statistics for the entire transaction group

{{< img src="logs/explorer/transaction_group_side_panel.png" alt="The transaction group panel showing transactions within the selected group in sequence" style="width:80%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/visualize/#list-aggregates-of-logs