---
aliases:
- /fr/agent/kubernetes/legacy
- /fr/agent/faq/kubernetes-legacy
- /fr/agent/guide/kubernetes-legacy
further_reading:
- link: /agent/kubernetes/daemonset_setup/
  tag: documentation
  text: Exécuter l'Agent avec un DaemonSet Kubernetes
- link: /agent/kubernetes/host_setup/
  tag: documentation
  text: Exécuter l'Agent sur un host avec Kubernetes
- link: /agent/kubernetes/metrics/
  tag: documentation
  text: Métriques Kubernetes
kind: guide
title: Versions antérieures de Kubernetes
---

La configuration par défaut concerne la version 1.7.6 de Kubernetes et les versions ultérieures, car l'Agent repose sur des fonctionnalités et des endpoints ajoutés dans cette version. Vous devez effectuer davantage d'étapes d'installation pour les versions antérieures :

- Les [objets RBAC][1] (`ClusterRoles` et `ClusterRoleBindings`) sont disponibles depuis la version 1.6 de Kubernetes et 3.3 de OpenShift, mais sont disponibles sous d'autres préfixes `apiVersion` :

  * `rbac.authorization.k8s.io/v1` dans Kubernetes 1.8 et ultérieur (et OpenShift 3.9 et ultérieur), à savoir l'apiVersion par défaut
  * `rbac.authorization.k8s.io/v1beta1` dans les versions 1.5 à 1.7 de Kubernetes (et OpenShift 3.7)
  * `v1` pour les versions 3.3 à 3.6 d'Openshift

    Appliquez les manifestes yaml de l'Agent Datadog avec les appels `sed` suivants :

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    ou pour les versions 3.3 à 3.6 d'Openshift :

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- Le check `kubelet` récupère les métriques provenant de l'endpoint Prometheus de Kubernetes 1.7.6 et ultérieur (OpenShift 3.7.0 et ultérieur). [Activez le mode du port cAdvisor][2] pour les versions antérieures.

- Le DaemonSet par défaut utilise l'[API descendante][3] pour envoyer l'IP de Kubelet à l'Agent. Cette option ne fonctionne que sur les versions 1.7 et ultérieures. Pour les versions antérieures, voici d'autres façons d'activer la connectivité Kubelet :

  * Avec la version 1.6, utilisez `fieldPath: spec.nodeName` et vérifiez que le nom de votre nœud peut être résolu et qu'il est accessible à partir du pod.
  * Si `DD_KUBERNETES_KUBELET_HOST` est désactivé, l'Agent récupère le hostname du nœud à partir de Docker et tente de se connecter. Consultez `docker info | grep "Name:"` et vérifiez que le nom peut être résolu et qu'il est accessible.
  * Si l'adresse IP de la passerelle Docker par défaut est constante sur l'ensemble de votre cluster, envoyez cette IP dans la variable d'environnement `DD_KUBERNETES_KUBELET_HOST`. Vous pouvez récupérer l'IP avec la commande `ip addr show | grep docker0`.

- La configuration par défaut repose sur l'[authentification par Bearer Token][4] vers le serveur API et Kubelet. Pour la version 1.3, le Kubelet ne prend pas en charge l'authentification à l'aide d'un token de porteur, configurez les certificats client du compte de service `datadog-agent` et envoyez-les à l'Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/admin/authorization/rbac
[2]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[3]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[4]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens