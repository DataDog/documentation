---
title: Fournisseur de métadonnées sur le cluster
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépanner l'Agent de cluster Datadog
---
Pour activer la fonction Fournisseur de métadonnées sur le cluster :

1. Assurez vous que les Agents de nœud et l'Agent de cluster Datadog [peuvent communiquer entre eux][1].
2. Créez un [service d'Agent de cluster][2] devant l'Agent de cluster Datadog.
3. [Veillez à ce qu'un auth_token soit bien partagé entre les Agents][1].
4. [Vérifiez que les règles RBAC sont bien définies][1].
5. Dans l'Agent de nœud, définissez la variable d'environnement `DD_CLUSTER_AGENT_ENABLED` sur `true`.
6. Facultatif : la variable d'environnement `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` peut être définie afin de spécifier à quelle fréquence les Agents de nœud communiquent avec l'Agent de cluster Datadog.
7. *Facultatif* : vous pouvez désactiver la collecte de tags de métadonnées Kubernetes avec `DD_KUBERNETES_COLLECT_METADATA_TAGS=false`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/cluster_agent/troubleshooting/
[2]: /fr/agent/cluster_agent/setup/#step-3-create-the-cluster-agent-and-its-service