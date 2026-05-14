---
aliases:
- /fr/agent/kubernetes/cluster/
- /fr/agent/cluster_agent/
- /fr/containers/cluster_agent/event_collection
- /fr/containers/cluster_agent/metadata_provider
description: Approche centralisée de la collecte des données de surveillance au niveau
  du cluster avec l'Agent de cluster de Datadog
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apporter une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le driver CSI Datadog
title: Agent de cluster pour Kubernetes
---

## Présentation

L'Agent de cluster Datadog fournit une méthode simplifiée et centralisée de collecte des données de surveillance au niveau des clusters. En agissant comme un proxy entre le serveur d'API et les Agents basés sur des nœuds, l'Agent de cluster permet de réduire la charge du serveur. Il transmet également les métadonnées de cluster aux Agents de nœud afin d'enrichir les métadonnées des métriques recueillies localement.

Grâce à l'Agent de cluster Datadog, vous pouvez :

* atténuer l'incidence des Agents sur votre infrastructure ;
* isoler les Agents de nœud dans leurs nœuds respectifs, afin de limiter les règles RBAC à la lecture des métriques et des métadonnées du kubelet ;
* transmettre les métadonnées de cluster qui se trouvent dans le serveur d'API aux Agents de nœud, de façon à enrichir les métadonnées des métriques recueillies localement ;
* activer la collecte de données au niveau du cluster, telles que les données de surveillance de services, les SPOF et les événements ;
* Utilisez l'autoscaling de pods horizontaux en vous basant sur des métriques Kubernetes personnalisées et des métriques externes. Consultez la section [Autoscaling avec des métriques custom et externes de l'Agent de cluster][1] pour en savoir plus.

Si vous avez installé l'Agent Datadog à l'aide du chart Helm v2.7.0 ou de l'Operator Datadog v.1.0.0+, l'**Agent de cluster Datadog est activé par défaut**.

Datadog publie des images de conteneur sur Google Artifact Registry, Amazon ECR, Azure ACR et Docker Hub :

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

Par défaut, l'image de l'Agent de cluster est extraite de Google Artifact Registry ('gcr.io/datadoghq'). Si Artifact Registry n'est pas accessible dans votre région de déploiement, utilisez un autre registre.

<div class="alert alert-danger">Docker Hub est soumis à des limites de taux d'extraction d'images. Si vous n'êtes pas client Docker Hub, Datadog recommande de mettre à jour votre configuration de l'Agent Datadog et de l'Agent de cluster pour extraire depuis GCR ou ECR. Pour obtenir des instructions, consultez la section <a href="/agent/guide/changing_container_registry">Modifier votre registre de conteneurs</a>.</div>

### Versions minimales de l'Agent et de l'Agent de cluster

Pour une compatibilité optimale, Datadog recommande de maintenir votre Agent de cluster et votre Agent sur des versions correspondantes. Pour une matrice de compatibilité complète des versions Kubernetes et des versions Datadog, consultez la [page d'installation Kubernetes][2].

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Configuration</u> : configurez l'Agent de cluster Datadog sur votre cluster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Commandes et options</u> : affichez la liste de toutes les commandes et options disponibles pour l'Agent de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Checks de cluster</u> : découvrez automatiquement des services de cluster à charge équilibrée, comme les services Kubernetes, et effectuez des checks sur ces services.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Checks d'endpoint</u> : surveillez n'importe quel endpoint derrière des services de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Contrôleur d'admission </u> : configurez le contrôleur d'admission pour simplifier la configuration des pods d'application.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Dépannage de l'Agent de cluster</u> : consultez des informations de dépannage sur l'Agent de cluster Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Surveillance de l'Agent de cluster
L'Agent Datadog inclut une intégration qui surveille automatiquement l'Agent de cluster. L'intégration s'exécute sur le pod de l'Agent Datadog standard qui se trouve sur le même nœud que l'Agent de cluster. Elle ne s'exécutera pas dans l'Agent de cluster lui-même. Consultez la [documentation de l'intégration Agent de cluster de Datadog][3] pour plus de détails.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/guide/cluster_agent_autoscaling_metrics
[2]: /fr/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/fr/integrations/datadog_cluster_agent/