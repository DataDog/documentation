---
title: List View
kind: documentation
description: Investigate the Network Path List View
further_reading:
- link: "/network_monitoring/network_path/path_view"
  tag: "Doc"
  text: "Learn more about the Path View in Network Path"
---


## Overview

The List View of Network Path is the default view for exploring various paths. Group by sources such as `datacenter`, `hostname`, and `service`.
Use the search bar to search for specific endpoints, source, or destination locations.

For example, search by a specific `source.service` and `destination.service` to narrow your results:

{{< img src="network_performance_monitoring/network_path/network_path_list_search.png" alt="The Network Path view, using the search by to sort by a specific source service and destination service" >}}

Additionally, search specific paths using the **Destination** and **Source** facet panels on the left hand side, such as `Destination AS Name`, `Destination Service`, or `Source Hostname`.

**Need Screen shot**

## Filter controls

The top of the List View page also contains filter controls that can be used to give you a more granular search into the overall health of your network:

{{< img src="network_performance_monitoring/network_path/reachable_unreachable_static_toggle.png" alt="Image of the reachable, unreachable and Static only toggle controls" >}}

**Unreachable**: Filters to paths where the `traceroute` has not successfully reached the destination. This filter control can be useful to dive into a specific hop to determine where the failure is occurring.</br>
**Reachable**: Filters to paths where the `traceroute` has successfully reached the destination.</br>
**Show static paths only**: Filters to only static paths. Static paths are paths that are manually configured and do not change over time.


## Multi-path map

Use the **Multi-path map** button to build a path map based on one or more selected paths:

{{< img src="network_performance_monitoring/network_path/multi_path_view.png" alt="Multi-path view showing 2 selected paths with the drop down expanded" >}}

From this view, you can view the latency and reachability for the selected paths, as well as investigate end-to-end packet loss and hop-to-hop latency.
For more information on this view, see the [Path View][1] documentation.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/network_path/path_view