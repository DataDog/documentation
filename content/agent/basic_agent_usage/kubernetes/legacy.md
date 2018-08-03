---
title: Legacy Kubernetes versions
kind: documentation
further_reading:
- link: "agent/basic_agent_usage/kubernetes/daemonset_setup"
  tag: "documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "agent/basic_agent_usage/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/basic_agent_usage/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

Our default configuration targets Kubernetes 1.7.6 and later, as the Datadog Agent relies on features and endpoints introduced in this version. More installation steps are required for older versions:

- [RBAC objects][16] (`ClusterRoles` and `ClusterRoleBindings`) are available since Kubernetes 1.6 and OpenShift 1.3, but are available under different `apiVersion` prefixes:

  * `rbac.authorization.k8s.io/v1` in Kubernetes 1.8+ (and OpenShift 3.9+), the default apiVersion we target
  * `rbac.authorization.k8s.io/v1beta1` in Kubernetes 1.5 to 1.7 (and OpenShift 3.7)
  * `v1` in Openshift 1.3 to 3.6

    Apply our yaml manifests with the following `sed` invocations:

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    or for Openshift 1.3 to 3.6:

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- The `kubelet` check retrieves metrics from the Kubernetes 1.7.6+ (OpenShift 3.7.0+) prometheus endpoint. [Enable cAdvisor port mode][17] for older versions.

- Our default daemonset makes use of the [downward API][7] to pass the kubelet's IP to the agent. This only works on versions 1.7 and up. For older versions, here are other ways to enable kubelet connectivity:

  * On version 1.6, use `fieldPath: spec.nodeName` and verify your node name is resolvable and reachable from the pod.
  * If `DD_KUBERNETES_KUBELET_HOST` is unset, the agent retrieves the node hostname from docker and tries to connect there. See `docker info | grep "Name:"` and verify the name is resolvable and reachable.
  * If the IP of the docker default gateway is constant across your cluster, pass that IP in the `DD_KUBERNETES_KUBELET_HOST` envvar. You can retrieve the IP with the `ip addr show | grep docker0` command.

- Our default configuration relies on [bearer token authentication][18] to the APIserver and kubelet. On 1.3, the kubelet does not support bearer token auth, setup client certificates for the `datadog-agent` serviceaccount and pass them to the agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/kubernetes
[2]: /agent/faq/agent-5-kubernetes-basic-agent-usage
[3]: https://hub.docker.com/r/datadog/agent/
[4]: /integrations/faq/using-rbac-permission-with-your-kubernetes-integration
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://kubernetes.io/docs/concepts/configuration/secret/
[7]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[8]: /agent/basic_agent_usage/docker/#environment-variables
[9]: https://docs.datadoghq.com/agent/autodiscovery
[10]: /logs
[11]: /logs/docker/#configuration-file-example
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/rbac
[13]: /agent/autodiscovery
[14]: https://app.datadoghq.com/account/settings#agent
[15]: /agent/faq/agent-commands/#agent-status-and-information
[16]: https://kubernetes.io/docs/admin/authorization/rbac/
[17]: https://github.com/DataDog/integrations-core/tree/master/kubelet#compatibility
[18]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens
[19]: /agent/basic_agent_usage/docker/#dogstatsd-custom-metrics
[20]: /tracing/setup/kubernetes

