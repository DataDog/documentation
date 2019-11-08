---
title: Network Performance Monitoring Installation
kind: documentation
disable_toc: true
description: Collect your Network Data with the Agent.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: "Blog"
  text: "Network Performance Monitoring"
- link: "/integrations/snmp"
  tag: "Documentation"
  text: "SNMP integration"
- link: "/graphing/widgets/network"
  tag: "Documentation"
  text: "Network Widget"
---

<div class="alert alert-warning">
Request access by completing the <a href="https://app.datadoghq.com/network/2019signup">Datadog Network Performance Monitoring Request form</a>.
</div>

Network performance monitoring requires Datadog Agent v6.13+. Since this product is built on eBPF, Datadog minimally requires platforms that have an underlying Linux kernel versions of 4.4.0+. 

Supported platforms include:

* Ubuntu 16.04+
* Debian 9+
* Fedora 26+
* SUSE 15+

There is an exemption to the 4.4.0+ kernel requirement for [CentOS/RHEL 7.6+][4]. 

**Note**: Datadog does not currently support Windows and macOS platforms for Network Performance Monitoring.

The following provisioning systems are supported:

* Daemonset / Helm: See the [Datadog Helm chart][1]
* Chef: See the [Datadog Chef recipe][2]
* Ansible

## Setup

To enable network performance monitoring, configure it in your [Agent's main configuration file][3] based on your system setup:

{{< tabs >}}
{{% tab "Agent" %}}

To enable network performance monitoring with the Datadog Agent, use the following configurations:

1. Enable Live Processes collection by editing the [Agent main configuration file][1] by setting the following parameter to `true`:

    ```
    process_config:
      enabled: "true"
    ```
    Learn more about [Datadog Live Processes data collection][2].

2. Copy the system-probe example configuration:<br>
`sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml`
3. Modify the system-probe configuration file to set the enable flag to `true`.<br>

4. Optionally uncomment the `system_probe_config` parameter to add a custom object:
    ```
    ## @param system_probe_config - custom object - optional
    ## (...)
    #
    system_probe_config:
    ```

5. Enter specific configurations for your System Probe data collection:
    ```
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

6. Start the system-probe: `sudo service datadog-agent-sysprobe start`
7. [Restart the Agent][3]: `sudo service datadog-agent restart`

[1]: /agent/guide/agent-configuration-files/?tab=agentv6
[2]: /graphing/infrastructure/process
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable network performance monitoring with Kubernetes, use the following configuration:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  selector:
    matchLabels:
      app: datadog-agent
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
      - image: datadog/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        securityContext:
          capabilities:
            add: ["SYS_ADMIN", "SYS_RESOURCE", "SYS_PTRACE", "NET_ADMIN"]
        ports:
          - {containerPort: 8125, name: dogstatsdport, protocol: UDP}
          - {containerPort: 8126, name: traceport, protocol: TCP}
        env:
          - {name: DD_API_KEY, value: <DATADOG_API_KEY>}
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

Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Docker" %}}

To enable network performance monitoring in Docker, use the following configuration when starting the container Agent:

```
$ docker run -e DD_API_KEY="<DATADOG_API_KEY>" \
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
	datadog/agent:latest
  ```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/helm/charts/blob/master/stable/datadog/README.md#enabling-system-probe-collection
[2]: https://github.com/DataDog/chef-datadog
[3]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[4]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
