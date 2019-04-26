---
title: How do I delete a host or metric from the UI?
kind: faq
---

### Metrics and Tags

There is no way to delete a metric or tag immediately. The list below shows how long a metric or tag stays in the UI if it is no longer reporting.

| Item                                 | Age Out  |
|--------------------------------------|----------|
| Metrics                              | 24 hours |
| Tags in template variable drop-downs | 30 days  |
| Tags in other drop-downs             | 12 hours |

For monitors, the metric stream is no longer considered after the age-out period.

For dashboards, the metric or tag appears in the visualization following the age-out period but is not available in the drop-downs for graphing with the UI editor. The corresponding metric or tag remains available for graphing using the [JSON][1] method.

### Hosts

If you're running the Agent, and you've intentionally [stopped][2] or [removed][3] your host, all hosts that have not seen new data in 12 hours disappear from the UI. You may still [query against them][4]. However, they do not appear in drop-downs, the infrastructure list, or host map.

[1]: /graphingjson
[2]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[3]: /agent/faq/how-do-i-uninstall-the-agent
[4]: /graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed
