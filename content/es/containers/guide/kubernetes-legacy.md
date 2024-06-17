---
aliases:
- /es/agent/kubernetes/legacy
- /es/agent/faq/kubernetes-legacy
- /es/agent/guide/kubernetes-legacy
further_reading:
- link: /agent/kubernetes/daemonset_setup/
  tag: documentation
  text: Configuración de DaemonSet de Kubernetes
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Configuración del host de Kubernetes
- link: /agent/kubernetes/metrics/
  tag: documentation
  text: Métricas de Kubernetes
kind: guía
title: Versiones legacy de Kubernetes
---

Por defecto, la configuración está orientada a Kubernetes 1.7.6 y versiones posteriores, ya que el Agent se basa en funciones y endpoints introducidos en esta versión. Las versiones anteriores requieren más pasos de instalación:

- Los [objetos RBAC][1] (`ClusterRoles` y `ClusterRoleBindings`) están disponibles desde Kubernetes 1.6 y OpenShift 3.3, pero están disponibles bajo diferentes prefijos `apiVersion`:

  * `rbac.authorization.k8s.io/v1` en Kubernetes 1.8+ (y OpenShift 3.9+), la apiVersion por defecto
  * `rbac.authorization.k8s.io/v1beta1` en Kubernetes 1.5 a 1.7 (y OpenShift 3.7)
  * `v1` en Openshift 3.3 a 3.6

    Aplica los manifiestos yaml de Datadog Agent con las siguientes invocaciones `sed`:

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    o para Openshift 3.3 a 3.6:

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- El check `kubelet` recupera métricas del endpoint de prometheus Kubernetes 1.7.6+ (OpenShift 3.7.0+). [Habilita el modo de puerto cAdvisor][2] para versiones anteriores.

- El DaemonSet por defecto hace uso de la [API descendente][3] para pasar la IP de kubelet al Agent. Esto solo funciona en las versiones 1.7 y superiores. Para versiones anteriores, aquí hay otras maneras de habilitar la conectividad kubelet:

  * En la versión 1.6, utiliza `fieldPath: spec.nodeName` y comprueba que el nombre de tu nodo se puede resolver y es accesible desde el pod.
  * Si `DD_KUBERNETES_KUBELET_HOST` no está configurado, Agent recupera el nombre de host del nodo de Docker e intenta conectarse allí. Consulta `docker info | grep "Name:"` y comprueba que el nombre se puede resolver y alcanzar.
  * Si la IP de la puerta de enlace Docker por defecto es constante a través de tu clúster, pasa esa IP en el envvar `DD_KUBERNETES_KUBELET_HOST`. Puedes recuperar la IP con el comando `ip addr show | grep docker0`.

- Por defecto, la configuración se basa en la [autenticación con token portador][4] para el servidor API y el kubelet. En la versión 1.3, el kubelet no admite la autenticación con token portador, configura certificados de cliente para la cuenta de servicio `datadog-agent` y los pasa al Agent.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/admin/authorization/rbac
[2]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[3]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[4]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens