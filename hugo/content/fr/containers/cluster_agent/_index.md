---
aliases:
- /fr/agent/kubernetes/cluster/
- /fr/agent/cluster_agent/
- /fr/containers/cluster_agent/event_collection
- /fr/containers/cluster_agent/metadata_provider
description: Approche centralisée de collecte des données de surveillance au niveau
  du cluster avec le Datadog Cluster Agent
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle
    métrique Datadog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apportez une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le pilote CSI de Datadog
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: Centre d'architecture
  text: Surveillance efficace de Kubernetes avec le Datadog Cluster Agent
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: Centre d'architecture
  text: Applications concrètes du Datadog Cluster Agent (Partie 1)
title: Agent de cluster pour Kubernetes
---
## Présentation {#overview}

Le Datadog Cluster Agent offre une approche rationalisée et centralisée pour collecter les données de surveillance au niveau du cluster. En agissant comme un proxy entre le serveur API et les agents basés sur les nœuds, le Cluster Agent aide à alléger la charge du serveur. Il relaie également les métadonnées au niveau du cluster aux agents basés sur les nœuds, leur permettant d'enrichir les métadonnées des métriques collectées localement.

Grâce à l'Agent de cluster Datadog, vous pouvez :

* Réduisez l'impact des agents sur votre infrastructure.
* Isolez les agents basés sur les nœuds sur leurs nœuds respectifs, en réduisant les règles RBAC à la simple lecture des métriques et des métadonnées depuis le kubelet.
* Fournissez aux agents de nœud les métadonnées au niveau du cluster qui ne peuvent être trouvées que dans le serveur API, afin qu'ils puissent enrichir les métadonnées des métriques collectées localement.
* Activez la collecte de données au niveau du cluster, comme la surveillance des services ou des points de défaillance uniques (SPOF) et des événements.
* Utilisez le dimensionnement automatique horizontal des pods (HPA) avec des métriques Kubernetes personnalisées et des métriques externes. Consultez le [guide sur le dimensionnement automatique basé sur des métriques personnalisées et externes][1] pour plus de détails.

Si vous avez installé le Datadog Agent à l'aide du chart Helm v2.7.0 ou du Datadog Operator v1.0.0+, le **Datadog Cluster Agent est activé par défaut**.

Datadog publie des images de conteneur sur le Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR et Docker Hub :

{{% container-images-table %}}

Par défaut, le chart Helm du Datadog Agent détermine le registre d'images de l'Agent à partir de votre site Datadog, du type de cluster et de `registryMigrationMode`. Selon ces valeurs et les exclusions d'environnement, les images de l'Agent peuvent être extraites du Datadog Container Registry (`registry.datadoghq.com`) ou d'un registre spécifique au site. Le chart Datadog Operator est inclus par défaut en tant que dépendance du chart Helm du Datadog Agent. À partir de la version 2.19.0 du chart Datadog Operator, lorsque vous installez l'Operator via cette dépendance, le `registryMigrationMode` du chart Helm du Datadog Agent s'applique aux images de l'Agent gérées par l'Operator. Le chart Helm de l'Operator lui-même ne définit pas `registryMigrationMode` ; l'image du pod de l'Operator est contrôlée séparément par la valeur `image.repository` du chart de l'Operator.

<div class="alert alert-warning">Docker Hub est soumis à des limites de taux de pull d'images. Si vous n'êtes pas client Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Datadog Agent et de votre Cluster Agent pour effectuer le pull depuis un autre registre. Pour obtenir des instructions, consultez <a href="/agent/guide/changing_container_registry">Modification de votre registre de conteneur</a>.</div>

### Versions minimales de l'Agent et du Cluster Agent {#minimum-agent-and-cluster-agent-versions}

Pour une compatibilité optimale, Datadog recommande de maintenir votre Cluster Agent et votre Agent sur des versions correspondantes. Pour une matrice de support complète des versions de Kubernetes et des versions de Datadog, consultez la [page d'installation Kubernetes][2].

{{< whatsnext desc="Cette section comprend les sujets suivants :">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Configuration</u> : Configurez le Datadog Cluster Agent dans votre cluster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Commandes et options</u> : Liste de toutes les commandes et options disponibles pour le Cluster Agent.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Cluster Checks</u> : Les Cluster Checks offrent la possibilité de découvrir automatiquement et d'effectuer des vérifications sur les services de cluster à charge équilibrée, tels que les services Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Endpoint Checks</u> : Les Endpoint Checks étendent les Cluster Checks pour surveiller tout point de terminaison derrière les services de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u> : Configurez l'Admission Controller pour une configuration simplifiée des Pods d'application.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Dépannage du Cluster Agent</u> : Trouvez des informations de dépannage pour le Datadog Cluster Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Surveillance du Cluster Agent {#monitoring-the-cluster-agent}
Le Datadog Agent inclut une intégration qui surveille automatiquement le Cluster Agent. L'intégration s'exécute sur le pod Datadog Agent standard situé sur le même nœud que le Cluster Agent. Elle ne s'exécutera pas dans le Cluster Agent lui-même. Consultez la [documentation de l'intégration Datadog Cluster Agent][3] pour plus de détails.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/guide/cluster_agent_autoscaling_metrics
[2]: /fr/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/fr/integrations/datadog_cluster_agent/