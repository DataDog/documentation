---
title: Network Performance Monitoring Setup
kind: documentation
description: Collect your Network Data with the Agent.
aliases:
    - /network_performance_monitoring/installation/
further_reading:
    - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
      tag: 'Blog'
      text: 'Network Performance Monitoring'
    - link: '/network_monitoring/devices'
      tag: 'Documentation'
      text: 'Network Device Monitoring'
    - link: '/dashboards/widgets/network'
      tag: 'Documentation'
      text: 'Network Widget'
---

Datadog Network Performance Monitoring (NPM) gives you visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog so you can:

- Pinpoint unexpected or latent service dependencies.
- Optimize costly cross-regional or multi-cloud communication.
- Identify outages of cloud provider regions and third-party tools.
- Troubleshoot faulty service discovery with DNS server metrics.

Network performance monitoring requires [Datadog Agent v6.14+][1].

## Supported Platforms

### Operating Systems

#### Linux OS

Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.4.0+ or have eBPF features backported. NPM supports the following Linux distributions:

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/RHEL 7.6+

**Note:** There is an exception to the 4.4.0+ kernel requirement for [CentOS/RHEL 7.6+][2]. The [DNS Resolution][3] feature is not supported on CentOS/RHEL 7.6.

#### macOS

Datadog Network Performance Monitoring does not currently support macOS platforms.

### Container Setups

NPM helps you visualize the architecture and performance of your containerized and orchestrated environments, with support for [Docker][4], [Kubernetes][5], [ECS][6], and other container technologies. Datadog’s container integrations enable you to aggregate traffic by meaningful entities -- such as containers, tasks, pods, clusters, and deployments -- with out-of-the -box tags (such as `container_name`, `task_name`, `kube_service`).

### Network Routing Tools

#### Istio

With NPM, you can map network communication between containers, pods, and services over the Istio service mesh.

Datadog monitors every aspect of your Istio environment, so you can also:

- Assess the health of Envoy and the Istio control plane with [logs][7].
- Break down the performance of your service mesh with request, bandwidth, and resource consumption [metrics][7].
- Drill into distributed traces for applications transacting over the mesh with [APM][8].

NPM supports Istio v1.6.4+ with [Datadog Agent v7.24.1+][1].

To learn more about monitoring your Istio environment with Datadog, [see the Istio blog][9].

#### Cilium

Network Performance Monitoring is compatible with **Cilium** installations, provided the following requirements are met:
1) Cilium version 1.6 and above, and
2) Kernel version 5.1.16 and above, or 4.19.57 and above for 4.19.x kernels

### Provisioning Systems

Network Performance Monitoring supports use of the following provisioning systems:

- Daemonset / Helm 1.38.11+: See the [Datadog Helm chart][10]
- Chef 12.7+: See the [Datadog Chef recipe][11]
- Ansible 2.6+: See the [Datadog Ansible role][12]

## Setup

Given this tool's focus and strength is in analyzing traffic _between_ network endpoints and mapping network dependencies, it is recommended to install it on a meaningful subset of your infrastructure and a **_minimum of 2 hosts_** to maximize value.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

To enable network performance monitoring with the Datadog Agent, use the following configurations:

1. If you are not using Agent v6.14+, enable [live process collection][1] first, otherwise skip this step.

2. Copy the system-probe example configuration:

    ```shell
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edit `/etc/datadog-agent/system-probe.yaml` to set the enable flag to `true`:

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable Network Performance Monitoring.
        #
        enabled: true
    ```

4. **If you are running an Agent older than v6.18 or 7.18**, manually start the system-probe and enable it to start on boot (since v6.18 and v7.18 the system-probe starts automatically when the Agent is started):

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

### SELinux-enabled systems

On systems with SELinux enabled, the system-probe binary needs special permissions to use eBPF features.

The Datadog Agent RPM package for CentOS-based systems bundles [an SELinux policy][3] to grant these permissions to the system-probe binary.

If you need to use Network Performance Monitoring on other systems with SELinux enabled, do the following:

1. Modify the base [SELinux policy][3] to match your SELinux configuration.
    Depending on your system, some types or attributes may not exist (or have different names).

2. Compile the policy into a module; assuming your policy file is named `system_probe_policy.te`:

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Apply the module to your SELinux system:

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Change the system-probe binary type to use the one defined in the policy; assuming your Agent installation directory is `/opt/datadog-agent`:

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Restart the Agent][2]

**Note**: these instructions require to have some SELinux utilities installed on the system (`checkmodule`, `semodule`, `semodule_package`, `semanage` and `restorecon`) that are available on most standard distributions (Ubuntu, Debian, RHEL, CentOS, SUSE). Check your distribution for details on how to install them.

If these utilities do not exist in your distribution, follow the same procedure but using the utilities provided by your distribution instead.

[1]: /infrastructure/process/?tab=linuxwindows#installation
[2]: /agent/guide/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable Network Performance Monitoring with Kubernetes using Helm, add:

  ```yaml
  networkMonitoring:
      enabled: true
  ```
to your values.yaml. Helm chart version 2.4.39 or higher is required. See the [Datadog Helm Chart][1] for further information.

If you are not using Helm, you can enable Network Performance Monitoring with Kubernetes from scratch:

1. Download the [datadog-agent.yaml manifest][2] template.
2. Replace `<DATADOG_API_KEY>` with your [Datadog API key][3].
3. Optional - **Set your Datadog site**. If you are using the Datadog EU site, set the `DD_SITE` environment variable to `datadoghq.eu` in the `datadog-agent.yaml` manifest.
4. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

If you already have the [Agent running with a manifest][4]:

1. Add the annotation `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` on the `datadog-agent` template:

    ```yaml
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
                    container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```

2. Enable process collection and the system probe with the following environment variables in the Agent DaemonSet. If you are running a container per Agent process, add the following environment variables to the Process Agent container; otherwise, add them to the Agent container.

    ```yaml
      # (...)
                      env:
                      # (...)
                          - name: DD_PROCESS_AGENT_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_EXTERNAL
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
    ```

3. Mount the following extra volumes into the `datadog-agent` container:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                      # (...)
                  volumeMounts:
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: sysprobe-socket-dir
                        mountPath: /var/run/sysprobe
    ```

4. Add a new system-probe as a side car to the Agent:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'datadog/agent:latest'
                    # (...)
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
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
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
                          - name: sysprobe-socket-dir
                            mountPath: /var/run/sysprobe
    ```

5. Finally, add the following volumes to your manifest:

    ```yaml
                volumes:
                    - name: sysprobe-socket-dir
                      emptyDir: {}
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
    ```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: /resources/yaml/datadog-agent-npm.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: /agent/kubernetes/
{{% /tab %}}
{{% tab "Docker" %}}

To enable Network Performance Monitoring in Docker, use the following configuration when starting the container Agent:

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
--cap-add=IPC_LOCK \
datadog/agent:latest
```

Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

If using `docker-compose`, make the following additions to the Datadog Agent service.

```
version: '3'
services:
  ..
  datadog:
    image: "datadog/agent:latest"
    environment:
       DD_SYSTEM_PROBE_ENABLED: 'true'
       DD_PROCESS_AGENT_ENABLED: 'true'
       DD_API_KEY: '<DATADOG_API_KEY>'
    volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - /proc/:/host/proc/:ro
    - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
    - SYS_ADMIN
    - SYS_RESOURCE
    - SYS_PTRACE
    - NET_ADMIN
    - IPC_LOCK
    security_opt:
    - apparmor:unconfined
```

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "ECS" %}}
To set up on AWS ECS, see the [AWS ECS][1] documentation page.


[1]: /agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[3]: /network_monitoring/performance/network_page#dns-resolution
[4]: https://docs.datadoghq.com/network_monitoring/performance/setup/?tab=agent#windows-systems
[5]: https://docs.datadoghq.com/integrations/docker_daemon/
[6]: https://docs.datadoghq.com/agent/kubernetes/
[7]: https://docs.datadoghq.com/integrations/istio/
[8]: https://docs.datadoghq.com/tracing/setup_overview/proxy_setup/?tab=istio
[9]: https://www.datadoghq.com/blog/istio-datadog/
[10]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[11]: https://github.com/DataDog/chef-datadog
[12]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[13]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
