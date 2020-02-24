---
title: Network Performance Monitoring Installation
kind: documentation
description: Collect your Network Data with the Agent.
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
    - link: '/integrations/snmp'
      tag: 'Documentation'
      text: 'SNMP integration'
    - link: '/dashboards/widgets/network'
      tag: 'Documentation'
      text: 'Network Widget'
---

Network performance monitoring requires [Datadog Agent v6.14+][1]. Since this product is built on eBPF, Datadog minimally requires platforms that have an underlying Linux kernel versions of 4.4.0+.

Supported platforms include:

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2

There is an exemption to the 4.4.0+ kernel requirement for [CentOS/RHEL 7.6+][2].

**Note**: Datadog does not currently support Windows and macOS platforms for Network Performance Monitoring.

The following provisioning systems are supported:

- Daemonset / Helm 1.38.11+: See the [Datadog Helm chart][3]
- Chef 12.7+: See the [Datadog Chef recipe][4]
- Ansible 2.6+: See the [Datadog Ansible role][5]

## Setup

To enable network performance monitoring, configure it in your [Agent's main configuration file][6] based on your system setup:

{{< tabs >}}
{{% tab "Agent" %}}

To enable network performance monitoring with the Datadog Agent, use the following configurations:

1. If you are not using Agent v6.14+, enable [live process collection][1] first, otherwise skip this step.

2. Copy the system-probe example configuration:

    ```shell
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edit `/etc/datadog-agent/system-probe.yaml` to set the enable flag to `true`:

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

4. If you are running an Agent older than v6.18/7.18, manually start the system-probe and enable it to start on boot (since v6.18/v7.18, system-probe will start automatically when the Agent is started by systemd):

    ```shell
    sudo systemctl start datadog-agent-sysprobe 
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Restart the Agent][2]

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`


[1]: /infrastructure/process/?tab=linuxwindows#installation
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable network performance monitoring with Kubernetes, use the following configuration:

```yaml
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
                container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
        spec:
            serviceAccountName: datadog-agent
            containers:
                - image: 'datadog/agent:latest'
                  imagePullPolicy: Always
                  name: datadog-agent
                  ports:
                      - containerPort: 8125
                        name: dogstatsdport
                        protocol: UDP
                      - containerPort: 8126
                        name: traceport
                        protocol: TCP
                  env:
                      - name: DD_API_KEY
                        value: '<DATADOG_API_KEY>'
                      - name: KUBERNETES
                        value: 'true'
                      - name: DD_HEALTH_PORT
                        value: '5555'
                      - name: DD_PROCESS_AGENT_ENABLED
                        value: 'true'
                      - name: DD_SYSTEM_PROBE_ENABLED
                        value: 'true'
                      - name: DD_SYSTEM_PROBE_EXTERNAL
                        value: 'true'
                      - name: DD_SYSPROBE_SOCKET
                        value: /var/run/s6/sysprobe.sock
                      - name: DD_KUBERNETES_KUBELET_HOST
                        valueFrom:
                            fieldRef:
                                fieldPath: status.hostIP
                  resources:
                      requests:
                          memory: 256Mi
                          cpu: 200m
                      limits:
                          memory: 256Mi
                          cpu: 200m
                  volumeMounts:
                      - name: dockersocket
                        mountPath: /var/run/docker.sock
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: s6-run
                        mountPath: /var/run/s6
                  livenessProbe:
                      httpGet:
                          path: /health
                          port: 5555
                      initialDelaySeconds: 15
                      periodSeconds: 15
                      timeoutSeconds: 5
                      successThreshold: 1
                      failureThreshold: 3
                - name: system-probe
                  image: 'datadog/agent:latest'
                  imagePullPolicy: Always
                  securityContext:
                      capabilities:
                          add:
                              - SYS_ADMIN
                              - SYS_RESOURCE
                              - SYS_PTRACE
                              - NET_ADMIN
                              - IPC_LOCK
                  command:
                      - /opt/datadog-agent/embedded/bin/system-probe
                  env:
                      - name: DD_SYSTEM_PROBE_ENABLED
                        value: 'true'
                      - name: DD_SYSPROBE_SOCKET
                        value: /var/run/s6/sysprobe.sock
                  resources:
                      requests:
                          memory: 150Mi
                          cpu: 200m
                      limits:
                          memory: 150Mi
                          cpu: 200m
                  volumeMounts:
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: s6-run
                        mountPath: /var/run/s6
            volumes:
                - name: dockersocket
                  hostPath:
                      path: /var/run/docker.sock
                - name: procdir
                  hostPath:
                      path: /proc
                - name: cgroups
                  hostPath:
                      path: /sys/fs/cgroup
                - name: s6-run
                  emptyDir: {}
                - name: debugfs
                  hostPath:
                      path: /sys/kernel/debug
```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].


[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "Docker" %}}

To enable network performance monitoring in Docker, use the following configuration when starting the container Agent:

```shell
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

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[3]: https://github.com/helm/charts/blob/master/stable/datadog/README.md#enabling-system-probe-collection
[4]: https://github.com/DataDog/chef-datadog
[5]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[6]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
