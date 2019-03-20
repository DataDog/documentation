---
title: Kubernetes
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/kubernetes
  - /fr/agent/basic_agent_usage/kubernetes
  - /fr/tracing/kubernetes/
  - /fr/tracing/setup/kubernetes
further_reading:
  - link: agent/kubernetes/daemonset_setup
    tag: documentation
    text: Configuration de DaemonSet avec Kubernetes
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Configuration de host avec Kubernetes
  - link: agent/kubernetes/metrics
    tag: documentation
    text: Métriques Kubernetes
  - link: agent/kubernetes/legacy
    tag: documentation
    text: Versions antérieures de Kubernetes
---
**Remarque** : les versions 6.0 et ultérieures de l'Agent prennent seulement en charge les versions de Kubernetes ultérieures à 1.7.6. Pour les versions antérieures de Kubernetes, consultez la [section Versions antérieures de Kubernetes][1].

## Installation

Vous pouvez recueillir des métriques, des traces et des logs à partir de vos clusters Kubernetes de deux façons différentes :

1. [Installation de conteneur][2] (**conseillée**) : l'Agent s'exécute dans un Pod. Cette implémentation est suffisante pour la majorité des cas d'utilisation, mais ne permet pas de visualiser des composants du système qui existent en dehors de Kubernetes. Cette méthode ne surveille pas non plus la phase de démarrage de votre cluster Kubernetes.
2. [Installation de host][3] (facultative) : l'installation de l'Agent sur le host vous permet de gagner en visibilité sur votre écosystème, indépendamment de Kubernetes.

## RBAC

Lorsque vous utilisez l'intégration Kubernetes et déployez les Agents dans un cluster Kubernetes, vous devez accorder un ensemble de droits pour optimiser l'intégration de l'Agent.

L'Agent doit pouvoir effectuer les actions suivantes :

- `get` et `update` les `Configmaps` intitulés `datadogtoken` pour mettre à jour et récupérer la dernière version du token correspondant au dernier événement enregistré dans ETCD.
- `list` et `watch` les `Events` pour extraire les événements du serveur API, les formater et les envoyer.
- `get`, `update` et `create` pour le `Endpoint`. L'endpoint utilisé par l'Agent pour la fonction [d'élection de leader][4] s'appelle `datadog-leader-election`.
- `list` la ressource `componentstatuses` afin d'envoyer des checks de service pour le statut des composants du plan de contrôle.

Des modèles sont disponibles dans `manifests/rbac` du [référentiel GitHub de datadog-agent][5]. Ils permettent de créer un compte de service dans l'espace de nommage par défaut, un rôle de cluster avec les droits ci-dessus et une liaison de rôle de cluster.

## Intégrations personnalisées

Pour obtenir plus d'informations sur l'utilisation de ConfigMaps dans Kubernetes, consultez [la documentation relative aux intégrations personnalisées Kubernetes de Datadog][6].

## Dépannage

* [Puis-je installer l'Agent sur mon ou mes nœuds principaux sur mon Kubernetes ?][7]
* [Pourquoi mon check Kubernetes échoue-t-il et affiche-t-il une erreur ConnectTimeout sur le port 10250 ?][8]
* [Comment transmettre les métriques sur le disque host lorsque dd-agent s'exécute sur un conteneur docker ?][9]
* [Authentification client auprès de l'apiserver et de kubelet][10]
* [Utilisation de l'autorisation RBAC avec votre intégration Kubernetes][11]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/legacy
[2]: /fr/agent/kubernetes/daemonset_setup
[3]: /fr/agent/kubernetes/host_setup
[4]: /fr/agent/kubernetes/event_collection#leader-election
[5]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[6]: /fr/agent/kubernetes/integrations
[7]: /fr/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[8]: /fr/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[9]: /fr/agent/faq/getting-further-with-docker
[10]: /fr/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[11]: /fr/integrations/faq/using-rbac-permission-with-your-kubernetes-integration