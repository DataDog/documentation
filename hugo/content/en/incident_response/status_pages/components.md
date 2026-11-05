---
title: Components
description: Add components to a status page to show the availability of the services and features your users rely on.
further_reading:
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Datadog Status Pages"
---

{{< img src="/incident_response/status_pages/status_page_components.png" alt="Status page component configuration with live preview panel" style="width:100%;" >}}

Components are the building blocks of your status page. Each one represents a service or feature your users care about. Some examples of components include:
- API Gateway
- Web Dashboard
- Database Cluster
- US Region Services

You can add components to your status page either on initial setup or through the status page settings:

1. From your status page, click **Settings** and select the **Components** tab.
1. Create individual components or a group of related components. You can associate [notices][1] with these components to reflect impact on your status page.
1. Select a visualization type:
   1. Bars and Uptime Percentage
   1. Bars Only
   1. Component Name Only

## Component hierarchy

If multiple notices affect the same component, the notice with the greatest impact takes precedence:
Major Outage > Partial Outage > Degraded Performance > Maintenance > Operational

## Component status and uptime

Each component status affects the uptime bars and uptime percentage differently:

| Status | Uptime bars | Uptime percentage |
|--------|-------------|-------------------|
| Major Outage | Shown | Counts as downtime |
| Partial Outage | Shown | Counts as downtime |
| Degraded Performance | Shown | No impact |
| Maintenance | Shown | No impact |
| Operational | Shown as healthy | No impact |

**Note**: Partial Outage and Major Outage are weighted equally. The full duration at either status counts as downtime in the uptime percentage calculation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/status_pages/notices/
