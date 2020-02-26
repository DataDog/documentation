---
title: RUM Performance overview Dashboard
kind: documentation
further_reading:
- link: "/real_user_monitoring/installation/advanced_configuration"
  tag: "Documentation"
  text: "Advanced configuration for RUM data collection"
- link: "/real_user_monitoring/explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---

The performance overview dashboard offers a bird’s-eye view of RUM applications. It is separated in 3 sections:

- **Performance metrics**:
    For all views(link), we highlight 3 browser metrics from the ones we collect automatically: First Contentful Paint, DOM Content Loaded and Load Event. For each of these metrics, widgets show the median, the 75th percentile and the 90th percentile.
- **Trends**:
    Visualize the evolution of page views, front-end errors related to back-end calls failing, JS errors and long tasks.
- **Page views breakdown**:
    Analyze the nature of your traffic and the associated load time for each segment.

{{< img src="real_user_monitoring/dashboards/performance_overview.png" alt="Performance overview Dashboard" >}}

For more information about the information displayed, check the [RUM Data Collected documentation][1]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}[1]: /real_user_monitoring/data_collected/
