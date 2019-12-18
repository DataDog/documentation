---
title: RUM Custom User Action
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

It is a custom event generated for a given user action. [Add one by instrumenting your code][1].

## Facet Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `event.name` | string | Name of the user action. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /real_user_monitoring/installation/advanced_configuration
