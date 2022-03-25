---
title: Getting Started with Cloud Workload Security
kind: documentation
description: "Follow the setup and installation instructions to get started with Cloud Workload Security."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-runtime-security/"
  tag: "Blog"
  text: "Learn more about Datadog Cloud Runtime Security"
- link: "https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/"
  tag: "Blog"
  text: "How to detect security threats in your systems' Linux processes"
- link: "https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The PwnKit vulnerability: Overview, detection, and remediation"
- link: "https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/"
  tag: "Blog"
  text: "The Dirty Pipe vulnerability: Overview, detection, and remediation"
---

## Overview

There are two types of monitoring that the Datadog Agent uses for Cloud Workload Security:

1. **File Integrity Monitoring** to watch for changes to key files and directories on hosts or containers in real-time.
2. **Process Execution Monitoring** to monitor process executions for malicious activity on hosts or containers in real-time.

## Requirements

* Datadog Agent >= 7.27.0
* Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.15.0+ or have eBPF features backported. CWS supports the following Linux distributions:
  * Ubuntu 18.04+
  * Debian 10+
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
4. **Optional, if Cloud SIEM is checked** Follow [these instructions][2] to collect audit logs for Kubernetes.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/integrations/kubernetes_audit_logs/
{{% /tab %}}

{{% tab "Docker" %}}

The following command can be used to start the Runtime Security Agent and `system-probe` in a Docker environment:

{{< code-block lang="bash" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

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
