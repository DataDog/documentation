---
title: Image Map Widget
description: Place live Datadog data on an uploaded image, such as a floor plan or process diagram, to show the status of each entity at its location.
widget_type: image_map
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/widgets/geomap/"
  tag: "Documentation"
  text: "Geomap Widget"
- link: "/dashboards/querying/"
  tag: "Documentation"
  text: "Querying"
- link: "/dashboards/guide/context-links/"
  tag: "Documentation"
  text: "Context Links"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The Image Map widget places live Datadog data on an image you upload, such as a floor plan, rack diagram, factory layout, or process diagram. Each point on the image represents one entity, such as a device, a production area, or a step in a business process. The point's color shows that entity's status. It can be used to:
- Monitor the health of network devices, such as access points, switches, and firewalls, at their locations on an office floor plan.
- See which machines or production areas on a factory floor need attention.
- Track the status of each step in a business process or application flow.
- Show overall system status on a command center or TV dashboard.

{{< img src="dashboards/widgets/image_map/image_map_overview.gif" alt="Image Map widget showing colored status points on a floor plan" style="width:100%;" >}}

## Setup

### Configuration

1. Upload an image. Supported formats are PNG, JPEG, and JPG.
2. Choose the data to graph. Each group in the query results becomes one point that you can place on the image.

   | Data source | Notes |
   | ----------- | ----- |
   | APM Metrics | Plot trace metrics, such as request count, error rate, or latency, for each service or resource. See the [APM metrics documentation][1] to configure a query. |
   | APM Spans | Plot values computed from indexed spans, such as error count or duration for each service. See the [Trace Explorer query syntax documentation][2] to configure a span query. |
   | Agent Observability | Plot data from your LLM applications and agents, such as error count or latency for each application. See the [Agent Observability documentation][3] to configure a query. |
   | Audit Trail | Plot activity from Audit Trail events, such as the number of actions for each user or resource. See the [Log search documentation][4] to configure a query. |
   | CI Pipelines | Plot CI pipeline results, such as failure count or duration for each pipeline. See the [CI Visibility search syntax documentation][5] to configure a query. |
   | CI Tests | Plot test results, such as failure count or duration for each test service. See the [Test Optimization search syntax documentation][6] to configure a query. |
   | Database Queries | Plot query performance from Database Monitoring, such as latency or execution count for each database host. See the [Database Monitoring documentation][7] to configure a query. |
   | Events | Plot Datadog events, such as deployments or alerts, for each source or tag. See the [Event search documentation][8] to configure an event query. |
   | Logs | Plot log counts or log attribute values, such as the number of error logs for each host. See the [Log search documentation][4] to configure a log event query. |
   | Metrics | Plot any metric, such as CPU or memory usage, for each host or device. See the [querying documentation][9] to configure a metric query. |
   | NetFlow | Plot network flow data, such as traffic volume for each device or interface. See the [NetFlow Monitoring documentation][10] to configure a query. |
   | Product Analytics | Plot user activity, such as sessions or actions for each page or feature. See the [Product Analytics documentation][11] to configure a query. |
   | RUM | Plot browser and mobile user data, such as sessions, errors, or load time for each view or country. See the [RUM documentation][12] to configure a RUM query. |
   | Synthetic Runs | Plot Synthetic test results, such as pass rate or response time for each test or location. See the [Synthetic Monitoring results documentation][13] to configure a query. |

   **Note**: To show more than one value for each point, add more queries with the same group by. You can combine queries with formulas.
3. Place each point on the image. See [Place points on the image](#place-points-on-the-image).
4. (Optional) Under {{< ui >}}Visual formatting rules{{< /ui >}}, add rules to color points by value.
5. Enter a title for the widget.

### Place points on the image

After you define a query, the editor lists one point for each result group. The list sorts points into {{< ui >}}Placed{{< /ui >}} and {{< ui >}}Not placed{{< /ui >}}.

To place points on the image:

1. In the {{< ui >}}Not placed{{< /ui >}} list, find the point that you want to place.
2. Drag the point onto the image at the entity's location, such as the device's position on a floor plan.
3. Repeat for each point that you want to show.
4. To move a point that is already placed, drag it to a new position on the image.

**Note**: Points in the {{< ui >}}Not placed{{< /ui >}} list don't appear on the widget.

### Options

#### Visual formatting rules

Customize the color of points in your Image Map widget with conditional rules. For example, define thresholds that turn points green, yellow, or red to show status. A rule applies to the combined query result for each point.

#### Point labels

Each placed point shows its name on the image. Hover over a point to see its value.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/metrics/
[2]: /tracing/trace_explorer/query_syntax/
[3]: /llm_observability/
[4]: /logs/search_syntax/
[5]: /continuous_integration/explorer/search_syntax/
[6]: /tests/explorer/search_syntax/
[7]: /database_monitoring/
[8]: /service_management/events/explorer/searching/
[9]: /dashboards/querying/
[10]: /network_monitoring/netflow/
[11]: /product_analytics/
[12]: /real_user_monitoring/explorer/search_syntax/
[13]: /synthetics/explore/results_explorer/
