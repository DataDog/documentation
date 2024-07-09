---
title: Autodiscovery Template Variables
aliases:
 - /agent/autodiscovery/template_variables
 - /agent/faq/template_variables
 - /agent/guide/template_variables
further_reading:
- link: "/containers/kubernetes/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Kubernetes"
- link: "/containers/docker/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery on Docker"
- link: "/agent/guide/ad_identifiers/"
  tag: "Documentation"
  text: "Match a container with the corresponding integration template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which container to include in the Agent Autodiscovery"
---

[Autodiscovery][1] enables you to set static configurations for dynamic resources like containers.

You can use the following template variables to dynamically assign your container's values:

| Template Variable | Description |
| --------------------------  | ---    |
| `"%%host%%"`                | The container's network IP. |
| `"%%host_<NETWORK NAME>%%"` | When the container is attached to multiple networks, returns the network name to use. |
| `"%%port%%"`                | The highest exposed port **sorted numerically and in ascending order**.<br>For example, returns `8443` for a container that exposes ports `80`, `443`, and `8443`. |
| `"%%port_<NUMBER_X>%%"`     | The `<NUMBER_X>` port **sorted numerically and in ascending order**,<br>For example, if a container exposes ports `80`, `443`, and `8443`, `"%%port_0%%` refers to port `80`, and `"%%port_1%%"` refers to `443`. |
| `"%%port_<NAME>%%"`     | The port associated with the port name `<NAME>`. |
| `"%%pid%%"`                 | The container process ID, as returned by `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`. |
| `"%%hostname%%"`            | The `hostname` value from the container configuration. Only use this variable if the `"%%host%%"` variable cannot fetch a reliable IP (for example, in [ECS awsvpc mode][2]).                                       |
| `"%%env_<ENV_VAR>%%"`       | The contents of the `$<ENV_VAR>` environment variable **as seen by the Agent process**.  |
| `"%%kube_namespace%%"`      | The Kubernetes namespace. |
| `"%%kube_pod_name%%"`       | The Kubernetes pod name.  |
| `"%%kube_pod_uid%%"`        | The Kubernetes pod UID.   |

**Fall back**:

* For the `"%%host%%"` template variable: in case the Agent is not able to find the IP, this template variable falls back to the `bridge` network IP.
* For the `"%%host_<NETWORK NAME>%%"`: if the `<NETWORK_NAME>` specified is not found, this template variable behaves like `"%%host%%"`.

Depending on your platform, not all template variables are supported:

| Platform    | Auto-discovery identifiers  | Host | Port | Tag | Pid | Env | Hostname | Kube Namespace | Pod Name | Pod UID |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/autodiscovery
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html