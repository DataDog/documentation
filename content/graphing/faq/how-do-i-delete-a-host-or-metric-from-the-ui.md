---
title: How do I delete a host or metric from the UI?
kind: faq
---

### Metrics/Tags

There is not a way to immediately delete a metric/tag, though they'll age out of the UI naturally after 24 hours.

With respect to monitors, the metric stream will stop being considered after that period.

With respect to dashboards, the metric/tag will still appear in the visualizations, but will not be available in the dropdown menus for graphing via our UI. The corresponding metric + tag space is however still available for graphing using the [JSON][1] method

### Hosts

If you're running the agent, assuming you've intentionally [stopped][2] or [removed][3] your host, all hosts or metrics that have not seen data in 24 hours will disappear from the UI, you may still [query against them though][4] it will not appear in drop downs or the infrastructure or host map views.

[1]: /graphingjson/
[2]: /agent/faq/agent-commands/#start-stop-restart-the-agent
[3]: /agent/faq/how-do-i-uninstall-the-agent/
[4]: /graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed/
