---
title: Screenboard Layout
kind: documentation
aliases:
    - /graphing/dashboards/screenboards/
    - /graphing/dashboards/screenboard/
    - /dashboards/screenboard/
    - /screenboards/
    - /screenboard/
further_reading:
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Screenboards are dashboards with free-form layouts which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past.

## Graph menu

Click on any screenboard graph to open an options menu:

| Option                 | Description                                                      |
|------------------------|------------------------------------------------------------------|
| View in full screen    | View the graph in [full screen mode][1].                         |
| View related processes | Navigate to the [Live Processes][2] page scoped to your graph.   |
| View related hosts     | Navigate to the [Host Map][3] page scoped to your graph.         |
| View related logs      | Populate a [Logs][4] panel scoped to your graph.                 |
| View related traces    | Populate a [Traces][5] panel scoped to your graph.               |
| View related profiles  | Navigate to the [Profiling][6] page scoped to your graph.        |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/#full-screen
[2]: https://app.datadoghq.com/process
[3]: https://app.datadoghq.com/infrastructure/map
[4]: /logs/
[5]: /tracing/
[6]: /tracing/profiler/
