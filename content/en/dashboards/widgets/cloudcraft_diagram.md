---
title: Cloudcraft Diagram Widget
description: "Display a live Cloudcraft architecture diagram in your dashboards."
widget_type: cloud_graph
further_reading:
- link: "/datadog_cloudcraft/"
  tag: "Documentation"
  text: "Cloudcraft in Datadog"
- link: "/datadog_cloudcraft/overlays/"
  tag: "Documentation"
  text: "Cloudcraft Overlays"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The Cloudcraft Diagram widget displays a live architecture diagram of your AWS, Azure, or GCP infrastructure directly in a dashboard. Use it alongside other widgets to correlate infrastructure context with metrics, logs, or alerts.

## Setup

### Configuration

1. Select a cloud provider: {{< ui >}}AWS{{< /ui >}}, {{< ui >}}Azure{{< /ui >}}, or {{< ui >}}GCP{{< /ui >}}.
1. Select an [overlay][1] to determine what information is displayed on the diagram:
   - **Infrastructure**: High-level view of services and resources.
   - **Observability**: Indicates which hosts have the Datadog Agent installed.
   - **Security**: IAM, firewall, and security group visibility.
   - **Cost**: Track and optimize resource spend (AWS and Azure only).
   - **APM**: Visualize distributed traces between cloud resources (AWS only, Preview).
1. Select an account (AWS), subscription (Azure), or project (GCP) to diagram.
1. Optionally filter the diagram by resource type, region, or tags. Available filters vary by provider.
1. Optionally configure **Group by** to organize resources into sections. You can group by provider-native groupings or by any resource tags.
1. Enter a title for the widget.
1. Click {{< ui >}}Save{{< /ui >}}.

### Diagram controls

After saving, the following controls are available directly on the widget:

| Control | Description |
|---------|-------------|
| Zoom in / Zoom out | Adjust the zoom level of the diagram. |
| 2D / 3D toggle | Switch between a top-down (2D) and isometric (3D) projection. |
| Reset view | Return the diagram to its default zoom and position. |
| Find in diagram | Search for a resource by name or ID to highlight and zoom in on it. |

**Note**: The Cloudcraft Diagram widget is independent from the full-page Cloudcraft view at [**Infrastructure** > **Resources** > **Cloudcraft**][2]. Changes or selections in one do not affect the other. To display the same view in the widget, configure the widget with the same provider, account, and filter settings.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /datadog_cloudcraft/overlays/
[2]: https://app.datadoghq.com/cloud-maps
