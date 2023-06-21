---
integration_title: Kubernetes
name: kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 6
description: Surveillez la santé de votre cluster Kubernetes et des applications qui y sont exécutées. Enregistrez des événements de planification de pod, surveillez le statut de vos Kubelets, et plus encore.
is_public: true
aliases:
  - /fr/integrations/kubernetes_state
  - /fr/integrations/kube_proxy
  - /fr/integrations/Kubernetes
public_title: Intégration Datadog/Kubernetes
short_description: Enregistrez des événements de planification de pod, surveillez le statut de vos Kubelets, et plus encore.
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes.md
categories:
  - cloud
  - configuration & deployment
  - containers
  - orchestration
  - log collection
doc_link: /integrations/kubernetes/
ddtype: check
integration_id: kubernetes
further_reading:
  - link: https://www.datadoghq.com/blog/debug-kubernetes-pending-pods/
    tag: Blog
    text: Comment résoudre les problèmes de pods Kubernetes en attente et les échecs de planification
  - link: https://www.datadoghq.com/blog/monitoring-kubernetes-era
    tag: Blog
    text: La surveillance à l'ère de Kubernetes
---
{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Dashboard Kubernetes" >}}

## Présentation

Recueillez des métriques et des logs du service kubernetes en temps réel pour :

- Visualiser et surveiller les états de Kubernetes
- Être informé des failovers et des événements de kubernetes

## Configuration

Pour Kubernetes, nous vous conseillons d'exécuter l'Agent en tant que conteneur dans votre cluster.

**[Consultez la documentation relative à Kubernetes pour déployer l'Agent dans votre cluster Kubernetes][1].**

**Remarque** : vous pouvez également [exécuter l'Agent Datadog sur votre host][2] et le configurer de façon à rassembler vos métriques Kubernetes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/
[2]: /fr/integrations/faq/kubernetes-host-installation/