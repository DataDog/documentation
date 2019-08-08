---
title: Network Performance Monitoring
kind: documentation
description: Explore metrics for point to point communication on your infrastructure.
aliases:
  - /monitors/network_flow_monitors/
further_reading:
    - link: "https://www.datadoghq.com/blog/network-performance-monitoring"
      tag: "Blog"
      text: "Network Performance Monitoring"
    - link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
      tag: "Blog"
      text: "Monitoring 101: Alerting on what matters"
    - link: "/api/#monitors"
      tag: "Documentation"
      text: "Datadog Monitors API"
---

<div class="alert alert-warning">
This feature is currently in beta. Request access by filling out the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Beta Request form</a>.
</div>

## Overview

Network Performance Monitoring allows you to explore metrics for point-to-point communication between anything in your environment.

Each end of any point-to-point communication represents a hash of a `{host | process ID | port}` or `{container | process ID | port}` for uniqueness. This is resolved in Datadog to any collected tag. This allows you to aggregate communication based on arbitrary queries.

{{< img src="monitors/network_flow_monitoring/network_flow_overview.png" alt="notification" responsive="true" >}}

## Setup
### Installation

Network performance monitoring requires Datadog Agent v6.12+. To enable network performance monitoring, configure your `agent.yaml` file based on your system setup. For more configurations, see the [example agent.yaml files][1].

{{< tabs >}}
{{% tab "Agent" %}}

To enable network performance monitoring with the Datadog Agent, use these configurations:

1. Copy the system-probe example configuration:<br>
`sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml`
2. Modify the system-probe configuration file to set the enable flag to `true`:<br>
`sudo -u dd-agent vim /etc/datadog-agent/system-probe.yaml`
3. Optionally uncomment the `system_probe_config` parameter to add a custom object:
  ```
  ## @param system_probe_config - custom object - optional
  ## (...)
  #
  system_probe_config:
  ```

4. Enter specific configurations for your System Probe data collection:
  ```
  system_probe_config:
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable the System Probe.
      #
      enabled: true
  ```
5. Start the system-probe:
`sudo service datadog-agent-sysprobe start`
6. Restart the main datadog-agent:
`sudo service datadog-agent restart `

**Note**: This command works for Linux, for a full list of Agent commands, see the [full list of Agent commands][1].

[1]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable network performance monitoring with Kubernetes, use these configurations:

```
apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
      annotations:
        container.apparmor.security.beta.kubernetes.io/datadog-agent: unconfined
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: datadog/agent:6.12.0
        imagePullPolicy: Always
        name: datadog-agent
        securityContext:
          capabilities:
            add: ["SYS_ADMIN", "SYS_RESOURCE", "SYS_PTRACE", "NET_ADMIN"]
        ports:
          - {containerPort: 8125, name: dogstatsdport, protocol: UDP}
          - {containerPort: 8126, name: traceport, protocol: TCP}
        env:
          - {name: DD_API_KEY, value: <YOUR_API_KEY>}
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_PROCESS_AGENT_ENABLED, value: "true"}
          - {name: DD_SYSTEM_PROBE_ENABLED, value: "true"}
          - {name: DD_SYSPROBE_SOCKET, value: "/var/run/s6/sysprobe.sock"}
          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocket, mountPath: /var/run/docker.sock}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: debugfs, mountPath: /sys/kernel/debug}
          - {name: s6-run, mountPath: /var/run/s6}
        livenessProbe:
          httpGet:
            path: /health
            port: 5555
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
      volumes:
        - {name: dockersocket, hostPath: {path: /var/run/docker.sock}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: debugfs, hostPath: {path: /sys/kernel/debug}}
```

{{% /tab %}}
{{% tab "Docker" %}}

To enable Network Performance monitoring in Docker, use these configurations:

```
# Configured with exact capabilities that we need
$ docker run -e DD_API_KEY="YOUR_API_KEY" \
	-e DD_SYSTEM_PROBE_ENABLED=true \
	-e DD_PROCESS_AGENT_ENABLED=true \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        -v /proc/:/host/proc/:ro \
        -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
	-v /sys/kernel/debug:/sys/kernel/debug \
	--security-opt apparmor:unconfined \
	--cap-add=SYS_ADMIN \
	--cap-add=SYS_RESOURCE \
	--cap-add=SYS_PTRACE \
	--cap-add=NET_ADMIN \
	datadog/agent:6.12.0
  ```

{{% /tab %}}
{{< /tabs >}}

### Queries

Queries aggregate and filter all flows based on tags, similar to a timeseries. The following is the default view, which aggregates by `service`. This means the throughput for every flow with the same source `service` and destination `service` are summed and represented as one row for that service-to-service communication.

{{< img src="monitors/network_flow_monitoring/query_1.png" alt="notification" responsive="true" >}}

The following shows all flows from IP addresses to Security groups. Only flows where the source IP address represents a specific set of services is included. This complex query shows that no two fields have to match—you can query for communication metrics between one `service` to any `consul` server, broken down by source `pod` and destination `host`, among other things.

{{< img src="monitors/network_flow_monitoring/query_2.png" alt="notification" responsive="true" >}}

### Metric collection

- `Sent` metrics measure the value of something from the `source` to the `destination`
- `Received` metrics measure the value of something from the `destination` to the `source` as measured from the source.

The default collection interval is five minutes and retention is five days. Metrics might be different for `some.metric(a to b)` and `some.metric(b to a)` if there is a large number of packet drops. In this case, if `b` sends a lot of bytes to `a`, the flows that originate at `b` include those bytes, but the flows that originate at `a` do not see them as received.

- **Throughput** - The number of bytes sent or received over a period. Measured in bytes (or orders of magnitude thereof) bidirectionally.
- **Bandwidth** - The rate of bytes sent or received over a period. Measured in bytes per second, bidirectionally.
- **Retransmits** - TCP is a connection-oriented protocol that guarantees in-order delivery of packets. Retransmits represent detected failures that are retransmitted to ensure delivery. Measured in count of retransmits from the `source`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gist.github.com/sunhay/ce7b072c9c9a0193b12f81f18eeaf2e7
