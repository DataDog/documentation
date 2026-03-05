---
title: Host Map
aliases:
  - /graphing/infrastructure/hostmap/
  - /infrastructure/containermap/
  - /guides/hostmap
further_reading:
- link: "/infrastructure/livecontainers/"
  tag: "Documentation"
  text: "Get real-time visibility of all of the containers across your environment"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Understand what is going on at any level of your system"
---

Datadog's [Host Map][1] visualizes your hosts, pods, containers, and clusters, helping you to understand and diagnose your infrastructure.

{{< img src="infrastructure/hostmap/new-host-map.png" alt="The Host Map showing hosts grouped by availability zone and colored by CPU usage. Hexagonal cells range from green (low usage) to orange-red (high usage). Groups include no availability-zone with 395 hosts, eastus with 183, eastus-1 with 153, and many additional regions." style="width:100%;" >}}

## Usage

{{< img src="infrastructure/hostmap/query-selector.png" alt="The query selector dropdown showing a list of suggested queries such as 'What is the CPU usage across my hosts?' and 'How many errors are being logged across my infrastructure?', along with saved custom queries. A Create button and Filter views search field are at the top." style="width:60%;" >}}

Use the drop-down in the upper left to view suggested queries, or the saved custom queries written by you or someone else in your organization. To write a custom query, click {{< ui >}}Create{{< /ui >}}.

{{< img src="infrastructure/hostmap/draft-query.png" alt="The Draft Query editor with two levels. The parent object is set to Host with Fill by CPU usage. The child object is set to Pod with Fill by Readiness." style="width:100%;" >}}

- {{< ui >}}Parent/Child Object{{< /ui >}}: Select resources ({{< ui >}}Host{{< /ui >}}, {{< ui >}}Pod{{< /ui >}}, {{< ui >}}Container{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}) to view. Parent and Child objects have hierarchical relationships.
- {{< ui >}}Fill by{{< /ui >}}: By default, the color of each object represents CPU usage, where the color ranges from green (0% utilized) to orange (100% utilized). Use the {{< ui >}}Fill by{{< /ui >}} drop-down to color your objects by various metrics or signals, such as memory or error logs.
- {{< ui >}}Size by{{< /ui >}}: If you do not specify a Child object, you can use the {{< ui >}}Size by{{< /ui >}} selector to size each object by a metric or signal.
  {{< img src="infrastructure/hostmap/size-by.png" alt="The Host Map query editor with Parent Object set to Host, Fill by set to CPU usage, and Size by set to Error logs. The map below shows 1.61k hosts as hexagons of varying sizes and colors, with a tooltip on one host showing 88% average CPU usage." style="width:85%;" >}}
- {{< ui >}}Group by{{< /ui >}}: Spatially arrange your objects into groups. You can use multiple groupings. For example, if you group by `tags.availability-zone` `tags.instance-type`, your objects are first arranged by availability zone and then further subdivided by instance type.

  {{< img src="infrastructure/hostmap/group-by.png" alt="The Host Map grouped by both tags.availability-zone and tags.instance-type. Hosts are arranged first into availability zone sections such as us-east-1a and us-east-1b, then subdivided by instance type such as m5a.2xlarge and t2.micro. Cells are colored by CPU usage from green to orange-red." style="width:85%;" >}}
- {{< ui >}}Filter{{< /ui >}}: Limit the Host Map to a specific subset of your infrastructure. For example, you can filter by `production` to only view your production resources. The {{< ui >}}Filter{{< /ui >}} input supports logical operators (`AND`, `NOT`, `OR`) and wildcards (`*`). For example: `(tags.availability-zone:ap* OR tags.availability-zone:eu*) NOT tags.agent_version:5.3*`.

## Use cases

### Troubleshoot degraded server performance

Identify whether performance issues stem from overloaded hosts, unhealthy pods, container restarts, or cluster-level bottlenecks. Check for `kubernetes_state.pod.status:unready` or `system.cpu.user > 80` and use hierarchical views to isolate the root cause.

### Identify cost hotspots
Identify clusters, nodes, or workloads contributing disproportionately to cloud spend by querying tags like `tags.kube_node_instance_type`, `tags.cloud_provider`, or custom allocation tags. Combine this with container/host CPU and memory signals to detect under- or over-provisioning.

### Fleet-wide Datadog Agent management

Find hosts or containers running outdated Datadog Agent versions using queries like `tags.agent_version < 7.50`. Then group by availability zone, cluster, or service to drive rollout planning.

### Monitor Kubernetes rollouts or infrastructure migrations

Visualize the distribution and health of pods, nodes, and clusters during a deployment or migration. View your clusters, nested with pods, and watch changes in real time to detect regressions.

### Verify tagging and metadata hygiene

Use logical operators to validate whether your hosts and pods are correctly tagged for ownership, environment, region, or cost allocation. For example, `tags.env:prod AND NOT (tags.team:*)` to surface unowned or improperly tagged resources.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/
[2]: /integrations/
[3]: /infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /agent/
[7]: /agent/docker/