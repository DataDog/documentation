---
title: Is it possible to query historical data after a host has been destroyed?
kind: faq
---

If a host stops reporting data for more than 24 hours Datadog will no longer list metrics for that host in the UI dropdown menus, however, though the metrics are not listed, you can still query this data with the JSON editor. A simple solution is to query for the host name or tags.

{{< img src="graphing/faq/query_post_deletion.png" alt="query post deletion" responsive="true" >}}

If you're planning to frequently churn hosts, add a tag [to the Agent][1] in the `datadog.yaml` file or in the the [Infrastructure page][2] (user tags) or with the [other methods available][3].

[1]: /agent
[2]: /graphing/infrastructure
[3]: /tagging
