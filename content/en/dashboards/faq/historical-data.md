---
title: Historical Data
aliases:
  - /graphing/faq/how-do-i-delete-a-host-or-metric-from-the-ui/
  - /graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed/
  - /agent/faq/i-stopped-my-agent-but-i-m-still-seeing-the-host/
  - /graphing/faq/historical-data
---

## Graphing

If you stop reporting data to Datadog, after a certain period of time metrics, tags, and hosts no longer appear in the Datadog UI:

| Item                                 | Age Out  |
|--------------------------------------|----------|
| Hosts                                | 2 hours  |
| Metrics                              | 24 hours |
| Tags in template variable dropdown panels | 48 hours |
| Tags in other dropdown panels             | 12 hours |
| APM `env` tags                       | 60 days  |

Even though the data is not listed, you can still query the data with the [JSON editor][1]. A simple solution is to query for the host name or tags.

If you're planning to frequently churn hosts, add a tag to the [Agent][2] in `datadog.yaml` or use the [Infrastructure list][3] (user tags).

## Deleting

### Metrics and tags

There is no way to delete a metric or tag immediately. The list above shows how long a metric or tag stays in the UI if it is no longer reporting.

For monitors, the metric stream is no longer considered after the age-out period.

For dashboards, the metric or tag appears in the visualization following the age-out period but is not available in the dropdown panels for graphing with the UI editor. The corresponding metric or tag remains available for graphing by using the [JSON][1] method.

### Hosts

If you're running the Agent, and you've intentionally [stopped][4] or [removed][5] your host, all hosts that have not seen new data in 2 hours disappear from the UI. You can still query against them. However, they do not appear in dropdowns, the infrastructure list, or host map.

[1]: /dashboards/graphing_json/
[2]: /agent/
[3]: /infrastructure/
[4]: /agent/configuration/agent-commands/#start-stop-restart-the-agent
[5]: /agent/guide/how-do-i-uninstall-the-agent/
