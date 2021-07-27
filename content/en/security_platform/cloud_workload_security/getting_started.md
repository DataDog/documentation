---
title: Getting Started with Cloud Workload Security
kind: documentation
description: "Follow the setup and installation instructions to get started with Cloud Workload Security."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
---

<div class="alert alert-warning">
Cloud Workload Security is currently in <a href="https://app.datadoghq.com/security/configuration">public beta</a>.
</div>

## Overview

There are two types of monitoring that the Datadog Agent uses for Cloud Workload Security:

1. **File Integrity Monitoring** to watch for changes to key files and directories on hosts or containers in real-time.
2. **Process Execution Monitoring** to monitor process executions for malicious activity on hosts or containers in real-time.

## Requirements

* Datadog Agent >= 7.27.0
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. CWS supports the following Linux distributions:
  * Ubuntu 16.04+
  * Debian 9+
  * Amazon Linux 2
  * Fedora 26+
  * SUSE 15+
  * CentOS/RHEL 7.6+
  * Custom kernel builds are not supported.

## Installation

{{< tabs >}}
{{% tab "Kubernetes" %}}

1. If you have not already, install the [Datadog Agent][1] (version 7.27+).

2. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:

    # Add this to enable Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true
    ```

3. Restart the Agent.
4. **Optional, if Security Monitoring is checked** Follow [these instructions][2] to collect audit logs for Kubernetes.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/
{{% /tab %}}

{{% tab "Docker" %}}

The following command can be used to start the Runtime Security Agent and `system-probe` in a Docker environment:

{{< code-block lang="bash" filename="docker-runtime-security.sh" >}}

DOCKER_CONTENT_TRUST=1 \
  docker run -d --name dd-agent \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add IPC_LOCK \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_SYSTEM_PROBE_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> datadog/agent:7-jmx

{{< /code-block >}}

{{% /tab %}}

{{% tab "Debian" %}}

For a package-based deployment, the Datadog package has to be deployed: run `dkpg -i datadog-agent_7….deb`

By default Runtime Security is disabled. To enable it, both the datadog.yaml and the system-probe.yaml files need to be adapted. Run the following commands to enable these configurations:

{{< code-block lang="bash" filename="debian-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

Once you apply the changes, restart both the Security Agent and the system-probe.

{{% /tab %}}

{{% tab "Fedora/CentOS" %}}

For a package-based deployment, the Datadog package has to be deployed: run `yum/dnf install datadog-agent_7….rpm`

{{< code-block lang="bash" filename="fedora-centos-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
