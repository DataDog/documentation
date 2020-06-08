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

To enable Network Performance Monitoring, configure it in your [Agent's main configuration file][6] based on your system setup. 

Given this tool's focus and strength is in analyzing traffic _between_ network endpoints and mapping network dependencies, it is recommend to install it on a meaningful subset of your infrastructure and a **_minimum of 2 hosts_** to maximize value. 

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

4. If you are running an Agent older than v6.18 or 7.18, manually start the system-probe and enable it to start on boot (since v6.18 and v7.18 the system-probe starts automatically when the Agent is started):

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

4. Change the system-probe binary type to use the one defined in the policy; assuming your Agent installation directory is `system_probe_policy.te`:

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

To enable network performance monitoring with Kubernetes from scratch:

1. Download the [datadog-agent.yaml manifest][1] template.
2. Replace `<DATADOG_API_KEY>` with your [Datadog API key][2].
3. Optional - **Set your Datadog site**. If you are using the Datadog EU site, set the `DD_SITE` environment variable to `datadoghq.eu` in the `datadog-agent.yaml` manifest.
4. **Deploy the DaemonSet** with the command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

If you already have the [Agent running with a manifest][3]:

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

2. Enable process collection and the system prob for the Agent container with the following environment variables:

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
                            value: /var/run/s6/sysprobe.sock
    ```

3. Mount the following extra volumes into the `datadog-agent` container:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'datadog/agent:latest'
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
                      - name: s6-run
                        mountPath: /var/run/s6
    ```

4. Add a new system-prob as a side car to the Agent:

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
    ```

5. Finally, add the following volumes to your manifest:

    ```yaml
                volumes:
                    - name: s6-run
                      emptyDir: {}
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
    ```


[1]: /resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/account/settings#api
[3]: /agent/kubernetes/
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
--cap-add=IPC_LOCK \
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
