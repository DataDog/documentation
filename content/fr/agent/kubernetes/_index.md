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
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Exécuter l'Agent sur un host avec Kubernetes
  - link: agent/kubernetes/metrics
    tag: documentation
    text: Métriques Kubernetes
  - link: agent/kubernetes/legacy
    tag: documentation
    text: Versions antérieures de Kubernetes
---
**Remarque** : les versions 6.0 et ultérieures de l'Agent prennent seulement en charge les versions de Kubernetes ultérieures à 1.7.6. Pour les versions antérieures de Kubernetes, consultez la [section Versions antérieures de Kubernetes][1].

Il existe plusieurs manières de surveiller votre système Kubernetes avec Datadog. Choisissez en fonction de la structure de votre système et du type de surveillance souhaité. Quatre options sont disponibles à l'installation de l'Agent Datadog pour Kubernetes : DaemonSets, graphiques Helm, installer l'Agent directement sur le host, et l'Agent de cluster Datadog.

## Installation

Il existe quatre options permettant de recueillir des métriques, des traces et des logs de vos clusters Kubernetes :

* [Installation de conteneur][2] (**conseillée**) : l'Agent s'exécute dans un Pod. Cette implémentation est suffisante pour la majorité des cas d'utilisation, mais ne surveille pas la phase de démarrage de votre cluster Kubernetes.
* [Installation Helm][3] : [Helm][4] est un gestionnaire de paquet pour Kubernetes qui vous permet d'installer facilement l'Agent Datadog et d'activer ses différentes fonctionnalités.
* [Installation host][5] : si le kubelet rencontre un problème, et si l'Agent meurt en tant que conteneur, vous perdrez la visibilité sur le nœud. En revanche, si l'Agent s'exécute *sur* le nœud, vous pouvez surveiller le kubelet sur l'ensemble de son cycle de vie. Si cela est important pour vous, installez l'Agent comme un host.
* [Agent de cluster][6] : pour les systèmes avec de très grands clusters Kubernetes, l'Agent de cluster Datadog peut réduire la charge serveur.

**Remarque** : un seul Agent Datadog doit fonctionner sur chaque nœud ; un sidecar par pod est généralement déconseillé et peut ne pas fonctionner comme prévu.

## RBAC

Lorsque vous utilisez l'intégration Kubernetes et déployez les Agents dans un cluster Kubernetes, vous devez accorder un ensemble de droits pour optimiser l'intégration de l'Agent.

L'Agent doit pouvoir effectuer les actions suivantes :

- `get` et `update` les `Configmaps` intitulées `datadogtoken` pour mettre à jour et récupérer la dernière version du token correspondant au dernier événement enregistré dans ETCD.
- `list` et `watch` les `Events` pour extraire les événements du serveur d'API, les formater et les envoyer.
- `get`, `update`, et `create` pour le `Endpoint`. Le Endpoint utilisé par l'Agent pour la fonction d'[élection de Leader][7] est nommé `datadog-leader-election`.
- `list` la ressource `componentstatuses` afin d'envoyer des checks de service pour le statut des composants du plan de contrôle.

Des modèles sont disponibles dans `manifests/rbac` du [référentiel GitHub de datadog-agent][8]. Ils permettent de créer un compte de service dans l'espace de nommage par défaut, un rôle de cluster avec les droits ci-dessus et une liaison de rôle de cluster.

## Intégrations personnalisées

Pour obtenir plus d'informations sur l'utilisation de ConfigMaps dans Kubernetes, consultez [la documentation relative aux intégrations personnalisées Kubernetes de Datadog][9].

## Dépannage

* [Est-il possible d'installer l'Agent sur mon ou mes nœuds Kubernetes maîtres ?][10]
* [Pourquoi mon check Kubernetes échoue-t-il et affiche-t-il une erreur ConnectTimeout sur le port 10250 ?][11]
* [Authentification client auprès de l'apiserver et de kubelet][12]
* [Utilisation de l'autorisation RBAC avec votre intégration Kubernetes][13]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/legacy
[2]: /fr/agent/kubernetes/daemonset_setup
[3]: /fr/agent/kubernetes/helm
[4]: https://helm.sh
[5]: /fr/agent/kubernetes/host_setup
[6]: /fr/agent/kubernetes/cluster
[7]: /fr/agent/kubernetes/event_collection#leader-election
[8]: https://github.com/DataDog/datadog-agent/tree/0bef169d4e80e838ec6b303f5ad1da716b424b0f/Dockerfiles/manifests/rbac
[9]: /fr/agent/kubernetes/integrations
[10]: /fr/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
[11]: /fr/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250
[12]: /fr/integrations/faq/client-authentication-against-the-apiserver-and-kubelet
[13]: /fr/agent/kubernetes/daemonset_setup/#configure-rbac-permissions