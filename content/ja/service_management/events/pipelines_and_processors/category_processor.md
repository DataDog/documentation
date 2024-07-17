---
kind: ドキュメント
title: カテゴリプロセッサー
---

Use the category processor to add a new attribute (without spaces or special characters in the new attribute name) to an event matching a provided search query. Then, use categories to create groups for an analytical view (for example, URL groups, machine groups, environments, and response time buckets).

**注**:

* The syntax of the query is the one in the Event Explorer search bar. This query can be done on any event attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
* Once the event has matched one of the processor queries, it stops. Make sure they are properly ordered in case an event could match several queries.
* カテゴリ名は一意でなければなりません。
* Once defined in the category processor, you can map categories to status using the status remapper

Example category processor to categorize your web access events based on the status code range value (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`) add this processor:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="カテゴリプロセッサー" style="width:80%;" >}}

このプロセッサーは、次のような結果をもたらします。

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="カテゴリプロセッサー結果" style="width:80%;" >}}