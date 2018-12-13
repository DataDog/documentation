---
title: Agent v5 versus Agent v6 for Docker and Kubernetes
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
- link: "agent/basic_agent_usage/docker"
  tag: "documentation"
  text: "Docker"
- link: "agent/kubernetes/"
  tag: "documentation"
  text: "Kubernetes"
---

In Datadog Agent 5, Docker and Kubernetes support relies on Python integrations: see the [Docker integration][1] and the [Kubernetes integration][2], respectively. Configuration happens partially in `datadog.conf`, and partially in the integration YAMLs.

In Agent 6, however, there are a few changes. For Docker, the configuration is found in `docker.d/conf.yaml`. For Kubernetes, configuration is partly in `datadog.yaml` and partly in `kubelet.d/conf.yaml`.

Both Agent 5 and Agent 6 have the following Python checks:

- [`kubernetes_state`][3], a Python Prometheus check that reaches a `kube-state-metrics` pod
- [`kube_dns`][4], for monitoring DNS metrics
- [`kube_proxy`][5], for metrics from `kube_proxy` states

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/tree/master/docker_daemon
[2]: https://github.com/DataDog/integrations-core/tree/master/kubernetes
[3]: https://github.com/DataDog/integrations-core/tree/master/kubernetes_state
[4]: https://github.com/DataDog/integrations-core/tree/master/kube_dns
[5]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
