---
title: RUM Resources Dashboard
kind: documentation
further_reading:
- link: "/real_user_monitoring/installation/advanced_configuration"
  tag: "Documentation"
  text: "Advanced configuration for RUM data collection"
- link: "/real_user_monitoring/explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---


The resources dashboard provides insights about your applications’ resources. It is separated in 4 sections:

- **Resources overview**:
    Visualize which resources are being loaded the most, the status code and the sizes split by resource type.
- **First party resources**:
    Get insight about your first party resources. For more information about resources categorization, visit the resources page from the collected data section.
- **Third party resources**:
    Get insight about your third party resources. For more information about resources categorization, visit the resources page from the collected data section.
- **Resource load timings**:
    Monitor the trends of [Resource Timings][1] collected from the browser API.

{{< img src="real_user_monitoring/dashboards/resources_dashboard.png" alt="Resource Dashboard" >}}

For more information about the information displayed, check the [RUM Data Collected documentation][2]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}[1]: https://www.w3.org/TR/resource-timing-1/
[2]: /real_user_monitoring/data_collected/
