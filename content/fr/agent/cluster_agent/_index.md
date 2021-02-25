---
title: Agent de cluster pour Kubernetes
kind: documentation
aliases:
  - /fr/agent/kubernetes/cluster/
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
  - link: /agent/kubernetes/integrations/
    tag: Documentation
    text: Intégrations personnalisées
  - link: 'https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/GETTING_STARTED.md#troubleshooting'
    tag: Github
    text: Dépanner l'Agent de cluster Datadog
---
## Présentation

L'Agent de cluster Datadog fournit une méthode simplifiée et centralisée de collecte des données de surveillance au niveau des clusters. En agissant comme un proxy entre le serveur d'API et les Agents basés sur des nœuds, l'Agent de cluster permet de réduire la charge du serveur. Il transmet également les métadonnées de cluster aux Agents de nœud afin d'enrichir les métadonnées des métriques recueillies localement.

Grâce à l'Agent de cluster Datadog, vous pouvez :

* atténuer l'incidence des Agents sur votre infrastructure ;
* isoler les Agents de nœud dans leurs nœuds respectifs, afin de limiter les règles RBAC à la lecture des métriques et des métadonnées du kubelet ;
* transmettre les métadonnées de cluster qui se trouvent dans le serveur d'API aux Agents de nœud, de façon à enrichir les métadonnées des métriques recueillies localement ;
* activer la collecte de données au niveau du cluster, telles que les données de surveillance de services, les SPOF et les événements ;
* tirer parti de l'autoscaling de pods horizontaux en fonction de métriques Kubernetes custom. Consultez le [guide dédié][1] pour en savoir plus sur cette fonctionnalité.

Si vous utilisez Docker, l'Agent de cluster Datadog est disponible sur Docker Hub et GCR :

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

**Remarque** : pour bénéficier de toutes les fonctionnalités de l'Agent de cluster Datadog, vous devez exécuter la version 1.10+ de Kubernetes.

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Configuration</u> : configurez l'Agent de cluster Datadog sur votre cluster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Commandes</u> : affichez la liste des commandes et des options disponibles pour l'Agent de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/event_collection" >}}<u>Collecte d'événements</u> : utilisez l'Agent de cluster pour recueillir l'ensemble des événements de votre cluster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/external_metrics" >}}<u>Métriques externes</u> : tirez parti du serveur de métriques custom de l'Agent de cluster pour effectuer l'autoscaling de vos applications en fonction de vos métriques Datadog.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Checks de cluster</u> : découvrez automatiquement des services de cluster à charge équilibrée, comme les services Kubernetes, et effectuez des checks sur ces services.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Checks d'endpoints</u> : surveillez n'importe quel endpoint derrière des services de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/troubleshooting/autodiscovery" >}}<u>AutoDiscovery</u> : corrigez les problèmes courants liés à Autodiscovery.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Dépannage</u> : consultez des informations afin de résoudre les problèmes liés à l'Agent de cluster Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent