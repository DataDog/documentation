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
    - link: 'https://www.datadoghq.com/blog/monitor-containers-with-npm/'
      tag: 'Blog'
      text: 'Datadog NPM with containers and service-meshed networks'
    - link: '/network_monitoring/devices'
      tag: 'Documentation'
      text: 'Network Device Monitoring'
    - link: "https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/"
      tag: "Blog"
      text: "Datadog NPM now supports Consul networking"
---

Datadog Network Performance Monitoring (NPM) gives you visibility into your network traffic between services, containers, availability zones, and any other tag in Datadog so you can:

- Pinpoint unexpected or latent service dependencies.
- Optimize costly cross-regional or multi-cloud communication.
- Identify outages of cloud provider regions and third-party tools.
- Troubleshoot faulty service discovery with DNS server metrics.

Network Performance Monitoring requires [Datadog Agent v6.14+][1]. Because metrics are automatically collected in higher versions of the Agent, see the [metrics setup section][2] to configure DNS Monitoring.

## Supported platforms

### Operating systems

#### Linux OS

Data collection is done using eBPF, so Datadog minimally requires platforms that have underlying Linux kernel versions of 4.4.0+ or have eBPF features backported. NPM supports the following Linux distributions:

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/RHEL 7.6+

**Note:** There is an exception to the 4.4.0+ kernel requirement for [CentOS/RHEL 7.6+][3]. The [DNS Resolution][4] feature is not supported on CentOS/RHEL 7.6.

#### Windows OS

Data collection is done using a device driver. Support is available as of Datadog Agent version 7.27.1, for Windows versions 2012 R2 (and equivalent desktop OSs, including Windows 10) and up.

#### macOS

Datadog Network Performance Monitoring does not support macOS platforms.

### Containers

NPM helps you visualize the architecture and performance of your containerized and orchestrated environments, with support for [Docker][5], [Kubernetes][6], [ECS][7], and other container technologies. Datadog’s container integrations enable you to aggregate traffic by meaningful entities--such as containers, tasks, pods, clusters, and deployments--with out-of-the-box tags such as `container_name`, `task_name`, and `kube_service`.

### Network routing tools

#### Istio

With NPM, you can map network communication between containers, pods, and services over the Istio service mesh.

Datadog monitors every aspect of your Istio environment, so you can also:

- Assess the health of Envoy and the Istio control plane with [logs][8].
- Break down the performance of your service mesh with request, bandwidth, and resource consumption [metrics][8].
- Examine distributed traces for applications transacting over the mesh with [APM][9].

NPM supports Istio v1.6.4+ with [Datadog Agent v7.24.1+][1].

To learn more about monitoring your Istio environment with Datadog, [see the Istio blog][10].

#### Cilium

Network Performance Monitoring is compatible with **Cilium** installations, provided the following requirements are met:
1) Cilium version 1.6 and above, and
2) Kernel version 5.1.16 and above, or 4.19.57 and above for 4.19.x kernels

### Provisioning systems

Network Performance Monitoring supports use of the following provisioning systems:

- Daemonset / Helm 1.38.11+: See the [Datadog Helm chart][11]
- Chef 12.7+: See the [Datadog Chef recipe][12]
- Ansible 2.6+: See the [Datadog Ansible role][13]

## Setup

Given this tool's focus and strength is in analyzing traffic _between_ network endpoints and mapping network dependencies, it is recommended to install it on a meaningful subset of your infrastructure and a **_minimum of 2 hosts_** to maximize value. 

{{< tabs >}}
{{< tab "Agent (Linux)" >}}
{{< /tab >}}
{{< tab "Agent (Windows)" >}}
{{< /tab >}}
{{< tab "Kubernetes" >}}
{{< /tab >}}
{{< tab "Operator" >}}
{{< /tab >}}
{{< tab "Docker" >}}
{{< /tab >}}
{{< tab "ECS" >}}
{{< /tab >}}
{{< /tabs >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/network_monitoring/dns/#setup
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /network_monitoring/dns/
[5]: https://docs.datadoghq.com/agent/docker/
[6]: https://docs.datadoghq.com/agent/kubernetes/
[7]: https://docs.datadoghq.com/agent/amazon_ecs
[8]: https://docs.datadoghq.com/integrations/istio/
[9]: https://docs.datadoghq.com/tracing/setup_overview/proxy_setup/?tab=istio
[10]: https://www.datadoghq.com/blog/istio-datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[12]: https://github.com/DataDog/chef-datadog
[13]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
