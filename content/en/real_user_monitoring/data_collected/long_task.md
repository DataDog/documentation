---
title: RUM Long Task
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

[Long tasks][1] are tasks that block the main thread for 50 milliseconds or more. They cause high input latency and delayed time to interactive for instance. Understand what causes these long tasks in your browser performance profiler.

## Measure Collected

| Attribute  | Type   | Description                |
|------------|--------|----------------------------|
| `duration` | number | Duration of the long task. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
