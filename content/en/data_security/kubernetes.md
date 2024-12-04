---
title: Kubernetes Data Security
further_reading:
- link: "/data_security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

This guide explains how to navigate permissions and security in Kubernetes when deploying and configuring the Datadog Agent, so that you can maintain both the security of your Kubernetes environment and the necessary functionality of your monitoring systems.

### Permissions versus operational needs
In the context of Kubernetes security, a balance is essential between the principle of least privilege and the smooth operation of vital components like the Datadog Agent. While Kubernetes pod security standards and CIS Benchmarks frequently emphasize minimizing permissions to avoid elevated access violations, it's necessary to acknowledge that monitoring tools like the Datadog Agent may demand certain permissions for optimal performance.

## Common violations of security standards

### Restricted Security Level in Kubernetes Pod Security Admission
The Restricted pod security standard is the most strict security standard level enforced by the built in admission controller. It's intended to enforce pod security best practices at the cost of compatibility and functionality. Intended use cases include applications that process sensitive financial information and PII. 

Running the Datadog Agent with the restricted pod standards would prevent the agent from accessing the data required to be useful and is not recommended.

### Pod running with hostPID
A container running in the host's process ID (PID) namespace can inspect processes running outside the container. If the container also has access to `ptrace` capabilities, this can be used to escalate privileges outside of the container.

DogStatsD can be configured to receive metrics over a UDP port or a Unix Domain Socket. Using the Unix Domain Socket offers some advantages including improved performance, error handling, and origin detection. When running inside a container, DogStatsD needs to run in the host's PID namespace for origin detection to work reliably. It is possible to disable origin detection, but [this causes DogStatsD collected metrics to no longer have container level tagging][1].

### hostPath volumes
Utilizing hostPath volumes in Kubernetes can introduce potential security vulnerabilities, including the inadvertent exposure of system credentials and unauthorized access to privileged APIs. However, the Datadog Agent relies on direct host access to effectively monitor host-level resources.

While hostPath volumes can be a security concern, the Datadog Agent's need for host-level monitoring necessitates these mounts. It's important to note that the hostPath volumes required by the Datadog Agent are carefully scoped to essential paths and are mounted in read-only mode whenever feasible.

By enabling the following hostPath mounts within well-defined boundaries, organizations can strike a balance between providing the necessary access for monitoring purposes and maintaining the security of their Kubernetes environment.

| Mount            | Description |
| ---------------- | ----------- |
| `procdir`          | Mounted read-only. Used for system check. |
| `cgroups`          | Mounted read-only. Used for container metadata collection. |
| `os-release-file`  | Mounted read-only. Used for OS detection.
| `dsdsocket`        | Mounted read-write. [DogStatsD socket, optionally configured with a port.][1] |
| `apmsocket`        | Mounted read-write. [APM socket, optionally configured with a port.][2] |
| `passwd`           | Mounted read-only. Used by Process Agent to associate processes with users. |
| `runtimesocketdir` | Mounted read-only. Used for container metrics collection. |

### Running container as root user
In a Kubernetes environment, containers have the flexibility to run as any Linux user. Although container runtime security features provide some constraints, running containers as the root user can still pose an increased risk of container breakout. Therefore, it is recommended to adhere to best practices and run containers, especially those for normal workloads, as non-UID 0 users.

The Datadog Agent's default configuration is designed to be highly compatible with standard kubelet and container socket configurations and runs as the root user within the container. This default configuration is chosen to maximize compatibility. While it's possible to configure the Agent to run as a non-root user, there are special considerations and updates to the underlying host's configuration that may be necessary for some integrations to function properly. These include the following:

* Datadog recommends using the `dd-agent` user (UID: 100). This user is created in the container image.
  * **Note**: In Agent versions `7.47.0` and below, use the UID: 101.
* The container runtime socket needs to be configured to allow access by the Agent user.
* For log collection, logs generated by the kubelet must be accessible by the Agent user.
* Some integrations may fail due to the lack of access to commands or files on the host.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/unix_socket/?tab=host 
[2]: /containers/kubernetes/apm/ 
[3]: https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted
