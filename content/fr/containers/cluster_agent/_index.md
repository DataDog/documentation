---
aliases:
- /fr/agent/kubernetes/cluster/
- /fr/agent/cluster_agent/
- /fr/containers/cluster_agent/event_collection
- /fr/containers/cluster_agent/metadata_provider
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
kind: documentation
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

Si vous utilisez Docker, l'Agent de cluster Datadog est disponible sur Docker Hub et GCR :

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

<div class="alert alert-warning">Docker Hub est soumis à des limites de pull d'images. Si vous n'êtes pas client Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Agent Datadog et de votre Agent de cluster afin de récupérer les images à partir de GCR ou ECR. Pour connaître la marche à suivre, consultez la section <a href="/agent/guide/changing_container_registry">Modifier votre registre de conteneurs</a>.</div>

### Versions minimales de l'Agent et de l'Agent de cluster

Pour utiliser certaines fonctionnalités des versions récentes de Kubernetes, vous devez exécuter des versions minimales de l'Agent Datadog et de l'Agent de cluster.

| Version de Kubernetes | Version de l'Agent  | Version de l'Agent de cluster | Raison                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Obsolescence des métriques Kubelet           |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Obsolescence des ressources Kubernetes       |
| 1.22.0+            | 7.37.0+        | 7.37.0+               | Prise en charge du token de compte de service dynamique |

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Configuration</u> : configurez l'Agent de cluster Datadog sur votre cluster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Commandes et options</u> : affichez la liste de toutes les commandes et options disponibles pour l'Agent de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Checks de cluster</u> : découvrez automatiquement des services de cluster à charge équilibrée, comme les services Kubernetes, et effectuez des checks sur ces services.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Checks d'endpoint</u> : surveillez n'importe quel endpoint derrière des services de cluster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Contrôleur d'admission </u> : configurez le contrôleur d'admission pour simplifier la configuration des pods d'application.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Dépannage de l'Agent de cluster</u> : consultez des informations de dépannage sur l'Agent de cluster Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/guide/cluster_agent_autoscaling_metrics
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent