---
title: RUM Custom User Action
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

It is a custom event generated for a given user action. [Add one by instrumenting your code][1].

## Facet Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `event.name` | string | Name of the user action. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /real_user_monitoring/installation/advanced_configuration
