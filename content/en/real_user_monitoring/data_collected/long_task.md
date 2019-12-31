---
title: RUM Long Task
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/dashboards/"
  tag: "Documentation"
  text: "Visualize your RUM data in out of the box Dashboards"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

[Long tasks][1] are tasks that block the main thread for 50 milliseconds or more. They may cause high input latency, delayed time to interaction, etc. Understand what causes these long tasks in your browser performance profiler.

## Measure Collected

| Attribute  | Type   | Description                |
|------------|--------|----------------------------|
| `duration` | number | Duration of the long task. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
