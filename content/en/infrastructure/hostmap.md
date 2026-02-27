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

{{< img src="infrastructure/hostmap/new-host-map.png" alt="Your image description" style="width:100%;" >}}

## Usage

Use the drop-down in the upper left to view suggested queries, or click <span class="ui">Create</span> to write a custom query.

{{< img src="infrastructure/hostmap/draft-query.png" alt="Your image description" style="width:100%;" >}}

- <span class="ui">Parent/Child Object</span>: Select resources (<span class="ui">Host</span>, <span class="ui">Pod</span>, <span class="ui">Container</span>, <span class="ui">Cluster</span>) to view. Parent and Child objects have hierarchical relationships.
- <span class="ui">Fill by</span>: By default, the color of each object represents CPU usage, where the color ranges from green (0% utilized) to orange (100% utilized). Use the <span class="ui">Fill by</span> drop-down to color your objects by various metrics or signals, such as memory or error logs.
- <span class="ui">Group by</span>: Spatially arrange your objects into groups. You can use multiple groupings. For example, if you group by `tags.availability-zone` `tags.instance-type`, your objects are first arranged by availability zone and then further subdivided by instance type.

  {{< img src="infrastructure/hostmap/group-by.png" alt="Your image description" style="width:85%;" >}}
- <span class="ui">Filter</span>: Limit the Host Map to a specific subset of your infrastructure. For example, you can filter by `production` to only view your production resources. The <span class="ui">Filter</span> input supports logical operators (`AND`, `NOT`, `OR`) and wildcards (`*`). For example: `(availability-zone:ap* OR availability-zone:eu*) NOT agent_version:5.3*`.

## Use the legacy Host Map

To revert to the classic Datadog Host Map view, use the <span class="ui">Legacy</span> toggle in the upper right.

## Use cases

### Troubleshoot degraded server performance

Identify whether performance issues stem from overloaded hosts, unhealthy pods, container restarts, or cluster-level bottlenecks. Check for `kubernetes_state.pod.status:unready` or `system.cpu.user > 80` and use hierarchical views to isolate the root cause.

### Identify cost hotspots
Identify clusters, nodes, or workloads contributing disproportionately to cloud spend by querying tags like `kube_node_instance_type`, `cloud_provider`, or custom allocation tags. Combine this with container/host CPU and memory signals to detect under- or over-provisioning.

### Fleet-wide Datadog Agent management

Find hosts or containers running outdated Datadog Agent versions using queries like `agent_version < 7.50`. Then group by availability zone, cluster, or service to drive rollout planning.

### Monitor Kubernetes rollouts or infrastructure migrations

Visualize the distribution and health of pods, nodes, and clusters during a deployment or migration. View your clusters, nested with pods, and watch changes in real time to detect regressions.

### Verify tagging and metadata hygiene

Use logical operators to validate whether your hosts and pods are correctly tagged for ownership, environment, region, or cost allocation. For example, `env:prod AND NOT (team:*)` to surface unowned or improperly tagged resources.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/
[2]: /integrations/
[3]: /infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /agent/
[7]: /agent/docker/
