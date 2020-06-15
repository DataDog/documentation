---
title: Collecte d'événements
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent de cluster Datadog
---
Si vous ne l'avez pas déjà fait, passez en revue les [instructions d'installation de l'Agent de cluster Datadog][1] et activez la collecte d'événements.

1. Désactivez l'élection de leader dans le DaemonSet de l'Agent de nœud Datadog en définissant la variable `leader_election` ou la variable d'environnement `DD_LEADER_ELECTION` sur `false`.

2. Dans le fichier de déploiement de l'Agent de cluster, définissez les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` :

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

L'activation de l'élection de leader de cette façon garantit la collecte des événements par un seul Agent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/cluster_agent/setup/