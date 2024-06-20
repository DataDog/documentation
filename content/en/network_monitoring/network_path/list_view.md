---
title: List View
kind: documentation
description: Investigate the Network Path List View
is_beta: true
further_reading:
- link: "/network_monitoring/network_path/path_view"
  tag: "Documentation"
  text: "Learn more about the Path View in Network Path"
- link: "/network_monitoring/network_path/setup"
  tag: "Documentation"
  text: "Setup Network Path"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Network Path for Datadog Network Performance Monitoring is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Network Path for Datadog Network Performance Monitoring is in private beta. Reach out to your Datadog representative to sign up.</div>

## Overview

The List View of Network Path is the default view for exploring various paths. Group by sources such as `hostname` and `service`.
Use the search bar to search for specific endpoints, source, or destination locations.

For example, search by a specific `source.service` and `destination.service` to narrow your results:

{{< img src="network_performance_monitoring/network_path/network_path_list_search_2.png" alt="The Network Path view, using the search by to sort by a specific source service and destination service" >}}

Additionally, search specific paths using the **Destination** and **Source** facet panels on the left hand side, such as `Destination AS Name`, `Destination Service`, or `Source Hostname`.

{{< img src="network_performance_monitoring/network_path/path_destination_facet_2.png" alt="The Network Path view, using the destination facet panel to sort by a specific destination service" >}}

## Filter controls

The top of the List View page also contains filter controls that can be used to give you a more granular search into the overall health of your network:

{{< img src="network_performance_monitoring/network_path/reachable_unreachable.png" alt="Image of the reachable abd unreachable toggle controls" >}}

Unreachable
: Filters to paths where the `traceroute` has not successfully reached the destination. This filter control can be useful to dive into a specific hop to determine where the failure is occurring.

Reachable
: Filters to paths where the `traceroute` has successfully reached the destination.


## Multi-path map

Use the **Multi-path map** button to build a path map based on one or more selected paths:

{{< img src="network_performance_monitoring/network_path/multi_path.png" alt="Multi-path view showing 3 selected paths" >}}

From this view, you can view the latency and reachability for the selected paths, as well as investigate end-to-end packet loss and hop-to-hop latency.
For more information on this view, see the [Path View][1] documentation.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/network_path/path_view
[2]: https://app.datadoghq.com/network/path
