---
title: Autodiscovery Template Variables
kind: faq
aliases:
 - /agent/autodiscovery/template_variables
 - /agent/faq/template_variables
further_reading:
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Create and load an Autodiscovery integration template"
- link: "/agent/guide/ad_identifiers/"
  tag: "Documentation"
  text: "Match a container with the corresponding integration template"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Manage which container to include in the Agent Autodiscovery"
---

Use the following template variables when configuring Autodiscovery in order to dynamically assign your container's values:

| Template Variable           | Description                                                                                                                                                                                                 |
| --------------------------  | ---                                                                                                                                                                                                         |
| `"%%host%%"`                | Auto-detects the network. For single-network containers, it returns its corresponding IP.                                                                                                                   |
| `"%%host_<NETWORK NAME>%%"` | Specifies the network name to use, when attached to multiple networks.                                                                                                                                      |
| `"%%port%%"`                | Uses the highest exposed port **sorted numerically and in ascending order**,<br>For example, it would return `8443` for a container that exposes ports `80`, `443`, and `8443`.                                    |
| `"%%port_<NUMBER_X>%%"`     | Uses the `<NUMBER_X>` port **sorted numerically and in ascending order**,<br>For example, if a container exposes ports `80`, `443`, and `8443`, `"%%port_0%%` refers to port `80`, `"%%port_1%%"` refers to `443`. |
| `"%%port_<NAME>%%"`     | Uses the port associated with the port name `<NAME>`.                                                                                                                                                           |
| `"%%pid%%"`                 | Retrieves the container process ID as returned by `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`.                                                                                              |
| `"%%hostname%%"`            | Retrieves the `hostname` value from the container configuration. Only use it if the `"%%host%%"` variable cannot fetch a reliable IP (example: [ECS awsvpc mode][1]).                                       |
| `"%%env_<ENV_VAR>%%"`       | Uses the contents of the `$<ENV_VAR>` environment variable **as seen by the Agent process**.                                                                                                                |
| `"%%kube_namespace%%"`      | Auto-detects the Kubernetes namespace |
| `"%%kube_pod_name%%"`       | Auto-detects the Kubernetes pod name  |
| `"%%kube_pod_uid%%"`        | Auto-detects the Kubernetes pod UID   |

**Fall back**:

* For the `"%%host%%"` template variable: in case the Agent is not able to find it, this template variable falls back to the `bridge` network IP.
* For the `"%%host_<NETWORK NAME>%%"`: if the `<NETWORK_NAME>` specified was not found this template variable behaves like `"%%host%%"`.

Depending on your platform, not all template variables are be supported:

| Platform    | Auto-discovery identifiers  | Host | Port | Tag | Pid | Env | Hostname | Kube Namespace | Pod Name | Pod UID |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html
