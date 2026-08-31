---
description: Apprenez à répartir les dépenses Cloud Cost Management dans votre organisation
  avec l'allocation des coûts des conteneurs.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus Cloud Cost Management
private: true
title: Allocation des coûts des conteneurs
---

{{< jqmath-vanilla >}}

## Section Overview

Datadog Cloud Cost Management (CCM) attribue automatiquement les coûts de vos clusters cloud aux services et charges de travail individuels exécutés dans ces clusters. Utilisez des métriques de coûts enrichies avec des tags provenant des pods, des nœuds, des conteneurs et des tâches pour visualiser le coût des charges de travail de conteneurs dans le contexte de l'ensemble de votre facture cloud.

Clouds 
: CCM attribue les coûts de vos instances host AWS, Azure ou Google. Un host est un ordinateur (comme une instance EC2 dans AWS, une machine virtuelle dans Azure ou une instance Compute Engine dans Google Cloud) qui figure dans le rapport de coûts et d'utilisation de votre fournisseur cloud et qui peut exécuter des pods Kubernetes.

Ressources 
: CCM attribue les coûts des clusters Kubernetes et inclut une analyse des coûts pour de nombreuses ressources associées, comme les volumes persistants Kubernetes utilisés par vos pods.

CCM affiche les coûts des ressources, notamment le CPU, la mémoire et d'autres encore, selon le cloud et l'orchestrateur que vous utilisez, sur la page [**Containers**][1].

{{< img src="cloud_cost/container_cost_allocation/container_allocation.png" alt="Tableau d'allocation des coûts cloud montrant les requêtes et les coûts inactifs du mois dernier sur la page Containers" style="width:100%;" >}}

## Prérequis

{{< tabs >}}
{{% tab "AWS" %}}

CCM attribue les coûts des clusters Amazon ECS ainsi que de tous les clusters Kubernetes, y compris ceux gérés via Elastic Kubernetes Service (EKS).

Le tableau suivant présente la liste des fonctionnalités collectées ainsi que les versions minimales de l'Agent et de l'Agent de cluster pour chacune d'elles.

| Fonctionnalité | Version minimale de l'Agent | Version minimale de l'Agent de cluster |
|---|---|---|
| Allocation des coûts des conteneurs | 7.27.0 | 1.11.0 |
| Allocation des coûts des conteneurs GPU | 7.54.0 | 7.54.0 |
| Allocation de volumes persistants AWS | 7.46.0 | 1.11.0 |
| Allocation des coûts de transfert de données    | 7.58.0 | 7.58.0 |

1. Configurez l'intégration AWS Cloud Cost Management sur la page relative à la [configuration de Cloud Cost][101].
1. Pour l'assistance Kubernetes, installez l'[**Agent Datadog**][102] dans un environnement Kubernetes et assurez-vous d'activer l'[**Orchestrator Explorer**][103] dans votre configuration d'Agent.
1. Pour l'assistance Amazon ECS, configurez [**Datadog Container Monitoring**][104] dans les tâches ECS.
1. Vous pouvez également activer [AWS Split Cost Allocation][105] pour une allocation ECS basée sur l'utilisation.
1. Pour activer l'allocation des coûts de stockage, configurez la [collecte de métriques EBS][108].
1. Pour activer l'allocation des coûts des conteneurs GPU, installez l'[intégration Datadog DCGM][106].
1. Pour activer l'allocation des coûts de transfert de données, configurez [Cloud Network Monitoring][107]. **Remarque** : des frais supplémentaires s'appliquent.

**Remarque** : l'allocation des coûts des conteneurs GPU prend uniquement en charge les requêtes de pods au format `nvidia.com/gpu`.

[101]: https://app.datadoghq.com/cost/setup
[102]: /fr/containers/kubernetes/installation/?tab=operator
[103]: /fr/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: /fr/containers/amazon_ecs/
[105]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[106]: /fr/integrations/dcgm/?tab=kubernetes#installation
[107]: /fr/network_monitoring/cloud_network_monitoring/setup
[108]: /fr/integrations/amazon_ebs/#metric-collection

{{% /tab %}}
{{% tab "Azure" %}}

CCM attribue les coûts de tous les clusters Kubernetes, y compris ceux gérés via Azure Kubernetes Service (AKS).

Le tableau suivant présente la liste des fonctionnalités collectées ainsi que les versions minimales de l'Agent et de l'Agent de cluster pour chacune d'elles.

| Fonctionnalité | Version minimale de l'Agent | Version minimale de l'Agent de cluster |
|---|---|---|
| Allocation des coûts des conteneurs | 7.27.0 | 1.11.0 |
| Allocation des coûts des conteneurs GPU | 7.54.0 | 7.54.0 |

1. Configurez l'intégration Azure Cost Management sur la page relative à la [configuration de Cloud Cost][101].
1. Installez l'[**Agent Datadog**][102] dans un environnement Kubernetes et assurez-vous d'activer l'[**Orchestrator Explorer**][103] dans votre configuration d'Agent.
1. Pour activer l'allocation des coûts des conteneurs GPU, installez l'[intégration Datadog DCGM][104].

**Remarque** : l'allocation des coûts des conteneurs GPU prend uniquement en charge les requêtes de pods au format `nvidia.com/gpu`.

[101]: https://app.datadoghq.com/cost/setup
[102]: /fr/containers/kubernetes/installation/?tab=operator
[103]: /fr/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/fr/integrations/dcgm/?tab=kubernetes#installation

{{% /tab %}}
{{% tab "Google" %}}

CCM attribue les coûts de tous les clusters Kubernetes, y compris ceux gérés via Google Kubernetes Engine (GKE).

Le tableau suivant présente la liste des fonctionnalités collectées ainsi que les versions minimales de l'Agent et de l'Agent de cluster pour chacune d'elles.

| Fonctionnalité | Version minimale de l'Agent | Version minimale de l'Agent de cluster |
|---|---|---|
| Allocation des coûts des conteneurs | 7.27.0 | 1.11.0 |
| Allocation des coûts des conteneurs GPU | 7.54.0 | 7.54.0 |

1. Configurez l'intégration Google Cloud Cost Management sur la page relative à la [configuration de Cloud Cost][101].
1. Installez l'[**Agent Datadog**][102] dans un environnement Kubernetes et assurez-vous d'activer l'[**Orchestrator Explorer**][103] dans votre configuration d'Agent.
1. Pour activer l'allocation des coûts des conteneurs GPU, installez l'[intégration Datadog DCGM][104].

**Remarque** : l'allocation des coûts des conteneurs GPU prend uniquement en charge les requêtes de pods au format `nvidia.com/gpu`.

**Remarque** : [GKE Autopilot][105] est uniquement pris en charge en tant que configuration Kubernetes sans Agent, soumise à des [limitations](#couts-kubernetes-sans-agent).

[101]: https://app.datadoghq.com/cost/setup
[102]: /fr/containers/kubernetes/installation/?tab=operator
[103]: /fr/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/fr/integrations/dcgm/?tab=kubernetes#installation
[105]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview

{{% /tab %}}
{{< /tabs >}}

## Répartir les coûts

L'allocation des coûts divise les coûts de calcul des hosts et autres ressources de votre fournisseur cloud en tâches ou pods individuels qui leur sont associés. Ces coûts répartis sont ensuite enrichis avec des tags provenant des ressources associées, afin que vous puissiez ventiler les coûts selon n'importe quelles dimensions associées.

Utilisez le tag `allocated_resource` pour visualiser la ressource de dépense associée à vos coûts à différents niveaux, y compris le nœud Kubernetes, le host d'orchestration de conteneurs, le volume de stockage ou l'ensemble du cluster.

{{< tabs >}}
{{% tab "AWS" %}}

Ces coûts répartis sont enrichis avec des tags provenant des nœuds, pods, tâches et volumes. Vous pouvez utiliser ces tags pour ventiler les coûts selon n'importe quelles dimensions associées.

### Extraction de tags Kubernetes

Seuls les _tags_ de la ressource directe, comme un pod, ainsi que des nœuds sous-jacents, sont ajoutés aux métriques de coûts par défaut. Pour inclure des labels en tant que tags, des annotations en tant que tags ou des tags provenant de ressources associées comme les namespaces, consultez la section [Extraction de tags Kubernetes][201].

[201]: /fr/containers/kubernetes/tag/

### Calculer

Pour l'allocation de calcul Kubernetes, un nœud Kubernetes est associé aux coûts de son instance host. Le nom de cluster du nœud et tous les tags du nœud sont ajoutés au coût de calcul total du nœud. Cela vous permet d'associer des dimensions au niveau du cluster au coût de l'instance, sans prendre en compte les pods planifiés sur le nœud.

Ensuite, Datadog examine tous les pods ayant été exécutés sur ce nœud pendant la journée. Le coût du nœud est attribué à chaque pod en fonction des ressources utilisées et de la durée d'exécution. Ce coût calculé est enrichi avec l'ensemble des tags du pod.

**Remarque** : seuls les _tags_ des pods et des nœuds sont ajoutés aux métriques de coûts. Pour inclure des labels, activez les labels en tant que tags pour les [nœuds][101] et les [pods][102].

Tous les autres coûts reçoivent la même valeur et les mêmes tags que la métrique source `aws.cost.amortized`.

### Stockage de volumes persistants

Pour l'allocation du stockage de volumes persistants Kubernetes, les volumes persistants (PV), les demandes de volumes persistants (PVC), les nœuds et les pods sont associés aux coûts de leurs volumes EBS. Tous les tags associés aux PV, aux PVC, aux nœuds et aux pods sont ajoutés aux postes de coûts des volumes EBS.

Ensuite, Datadog examine tous les pods ayant revendiqué le volume ce jour-là. Le coût du volume est attribué à un pod en fonction des ressources utilisées et de la durée d'exécution. Ces ressources incluent la capacité de stockage provisionnée, les IOPS et le débit. Ce coût attribué est enrichi avec l'ensemble des tags du pod.

### Amazon ECS sur EC2

Pour l'allocation ECS, Datadog détermine quelles tâches ont été exécutées sur chaque instance EC2 utilisée pour ECS. Si vous activez AWS Split Cost Allocation, les métriques attribuent les coûts ECS en fonction de l'utilisation plutôt que de la réservation, offrant ainsi un niveau de détail plus granulaire.

En fonction des ressources utilisées par la tâche, Datadog attribue à celle-ci la part correspondante du coût de calcul de l'instance. Le coût calculé est enrichi avec l'ensemble des tags de la tâche ainsi que tous les tags des conteneurs (à l'exception des noms de conteneurs) exécutés dans la tâche.

### Amazon ECS sur Fargate

Les tâches ECS exécutées sur Fargate sont déjà entièrement allouées [dans le CUR][103]. CCM enrichit ces données en ajoutant des tags prêts à l'emploi et des tags de conteneurs au coût AWS Fargate.

### Transfert de données

Pour l'allocation du transfert de données Kubernetes, un nœud Kubernetes est associé à ses coûts de transfert de données provenant du [CUR][103]. Le nom de cluster du nœud et tous les tags du nœud sont ajoutés au coût total de transfert de données du nœud. Cela vous permet d'associer des dimensions au niveau du cluster au coût du transfert de données, sans prendre en compte les pods planifiés sur le nœud.

Ensuite, Datadog examine les [ressources de charge de travail][104] quotidiennes exécutées sur ce nœud. Le coût du nœud est attribué au niveau de la charge de travail en fonction du volume de trafic réseau utilisé. Ce coût calculé est enrichi avec l'ensemble des tags de la ressource de charge de travail.

**Remarque** : seuls les _tags_ des pods et des nœuds sont ajoutés aux métriques de coûts. Pour inclure des labels, activez les labels en tant que tags pour les [nœuds][101] et les [pods][102].

[Cloud Network Monitoring][105] doit être activé sur tous les hosts AWS pour permettre une allocation précise des coûts de transfert de données. Si certains hosts n'ont pas Cloud Network Monitoring activé, les coûts de transfert de données de ces hosts ne sont pas alloués et peuvent apparaître comme un compartiment `n/a` selon les conditions de filtre et de regroupement.

Datadog prend en charge l'allocation des coûts de transfert de données uniquement avec les [ressources de charge de travail standard 6][104]. Pour les [ressources de charge de travail personnalisées][106], les coûts de transfert de données ne peuvent être alloués qu'au niveau du cluster, et non au niveau du nœud ou du namespace.

[101]: /fr/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /fr/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[104]: https://kubernetes.io/docs/concepts/workloads/
[105]: /fr/network_monitoring/cloud_network_monitoring/setup
[106]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

{{% /tab %}}
{{% tab "Azure" %}}

### Extraction de tags Kubernetes

Seuls les _tags_ de la ressource directe, comme un pod, ainsi que des nœuds sous-jacents, sont ajoutés aux métriques de coûts par défaut. Pour inclure des labels en tant que tags, des annotations en tant que tags ou des tags provenant de ressources associées comme les namespaces, consultez la section [Extraction de tags Kubernetes][201].

[201]: /fr/containers/kubernetes/tag/

### Calculer

Pour l'allocation de calcul Kubernetes, un nœud Kubernetes est associé aux coûts de son instance host. Le nom de cluster du nœud et tous les tags du nœud sont ajoutés au coût de calcul total du nœud. Cela vous permet d'associer des dimensions au niveau du cluster au coût de l'instance, sans prendre en compte les pods planifiés sur le nœud.

Ensuite, Datadog examine tous les pods ayant été exécutés sur ce nœud pendant la journée. Le coût du nœud est attribué à chaque pod en fonction des ressources utilisées et de la durée d'exécution. Ce coût calculé est enrichi avec l'ensemble des tags du pod.

**Remarque** : seuls les _tags_ des pods et des nœuds sont ajoutés aux métriques de coûts. Pour inclure des labels, activez les labels en tant que tags pour les [nœuds][101] et les [pods][102].

Tous les autres coûts reçoivent la même valeur et les mêmes tags que la métrique source `azure.cost.amortized`.

[101]: /fr/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /fr/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags

{{% /tab %}}
{{% tab "Google" %}}

### Extraction de tags Kubernetes

Seuls les _tags_ de la ressource directe, comme un pod, ainsi que des nœuds sous-jacents, sont ajoutés aux métriques de coûts par défaut. Pour inclure des labels en tant que tags, des annotations en tant que tags ou des tags provenant de ressources associées comme les namespaces, consultez la section [Extraction de tags Kubernetes][201].

[201]: /fr/containers/kubernetes/tag/

### Calculer

Pour l'allocation de calcul Kubernetes, un nœud Kubernetes est associé aux coûts de son instance host. Le nom de cluster du nœud et tous les tags du nœud sont ajoutés au coût de calcul total du nœud. Cela vous permet d'associer des dimensions au niveau du cluster au coût de l'instance, sans prendre en compte les pods planifiés sur le nœud.

Ensuite, Datadog examine tous les pods ayant été exécutés sur ce nœud pendant la journée. Le coût du nœud est attribué à chaque pod en fonction des ressources utilisées et de la durée d'exécution. Ce coût calculé est enrichi avec l'ensemble des tags du pod.

**Remarque** : seuls les _tags_ des pods et des nœuds sont ajoutés aux métriques de coûts. Pour inclure des labels, activez les labels en tant que tags pour les [nœuds][101] et les [pods][102].

Tous les autres coûts reçoivent la même valeur et les mêmes tags que la métrique source `gcp.cost.amortized`.

### Coûts Kubernetes sans Agent

Pour afficher les coûts des clusters GKE sans activer Datadog Infrastructure Monitoring, utilisez [GKE cost allocation][103]. Activez GKE cost allocation sur les clusters GKE non surveillés pour accéder à cet ensemble de fonctionnalités. Cette approche comporte un certain nombre de limitations (voir ci-dessous).

#### Limitations et différences par rapport à l'Agent Datadog

- Il n'y a pas de prise en charge du suivi des coûts inactifs des charges de travail.
- Le coût des pods individuels n'est pas suivi, seuls le coût agrégé d'une charge de travail et du namespace le sont. Il n'existe pas de tag `pod_name`.
- GKE enrichit les données uniquement avec les labels de pods et ignore tous les tags Datadog que vous ajoutez.
- La liste complète des limitations se trouve dans la [documentation officielle de GKE][104].

Pour activer l'allocation des coûts GKE, consultez la [documentation officielle de GKE][105].

[101]: /fr/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /fr/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations
[104]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations
[105]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown

{{% /tab %}}
{{< /tabs >}}

## Comprendre les dépenses

Utilisez le tag `allocated_spend_type` pour visualiser la catégorie de dépense associée à vos coûts à différents niveaux, y compris le nœud Kubernetes, le host d'orchestration de conteneurs, le volume de stockage ou l'ensemble du cluster.

{{< tabs >}}
{{% tab "AWS" %}}

### Calculer

Le coût d'une instance host est divisé en deux composantes : 60 % pour le CPU et 40 % pour la mémoire. Si l'instance host dispose de GPU, le coût est divisé en trois composantes : 95 % pour le GPU, 3 % pour le CPU et 2 % pour la mémoire. Chaque composante est attribuée aux charges de travail individuelles en fonction de leurs réservations de ressources et de leur utilisation.

Les coûts sont répartis entre les types de dépenses suivants :

| Type de dépenses | Rôle    |
| -----------| -----------    |
| Utilisation | Coût des ressources (telles que la mémoire, le CPU et le GPU) utilisées par les charges de travail, basé sur l'utilisation moyenne de la journée. |
| Inactivité des charges de travail | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui sont réservées et attribuées mais non utilisées par les charges de travail. Il s'agit de la différence entre le total des ressources demandées et l'utilisation moyenne. |
| Inactivité du cluster | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui ne sont pas réservées par les charges de travail dans un cluster. Il s'agit de la différence entre le coût total des ressources et ce qui est attribué aux charges de travail. |

### Volume persistant

Le coût d'un volume EBS comporte trois composantes : les IOPS, le débit et le stockage. Chacune est attribuée en fonction de l'utilisation d'un pod lorsque le volume est monté.

| Type de dépenses | Rôle    |
| -----------| -----------    |
| Utilisation | Coût des IOPS, du débit ou du stockage provisionnés utilisés par les charges de travail. Le coût du stockage est basé sur la quantité maximale de stockage de volume utilisée ce jour-là, tandis que les coûts des IOPS et du débit sont basés sur la quantité moyenne de stockage de volume utilisée ce jour-là. |
| Inactivité des charges de travail | Coût des IOPS, du débit ou du stockage provisionnés qui sont réservés et attribués mais non utilisés par les charges de travail. Le coût du stockage est basé sur la quantité maximale de stockage de volume utilisée ce jour-là, tandis que les coûts des IOPS et du débit sont basés sur la quantité moyenne de stockage de volume utilisée ce jour-là. Il s'agit de la différence entre le total des ressources demandées et l'utilisation moyenne. **Remarque :** ce tag est uniquement disponible si vous avez activé `Resource Collection` dans votre [**Intégration AWS**][101]. Pour éviter d'être facturé pour `Cloud Security Posture Management`, assurez-vous que lors de la configuration de `Resource Collection`, la case `Cloud Security Posture Management` est décochée. |
| Inactivité du cluster | Coût des IOPS, du débit ou du stockage provisionnés qui ne sont réservés par aucun pod ce jour-là. Il s'agit de la différence entre le coût total des ressources et ce qui est attribué aux charges de travail. |

**Remarque** : l'allocation de volumes persistants est uniquement prise en charge dans les clusters Kubernetes et est disponible uniquement pour les pods faisant partie d'un StatefulSet Kubernetes.

[101]: https://app.datadoghq.com/integrations/amazon-web-services

### Transfert de données

Les coûts sont répartis entre les types de dépenses suivants :

| Type de dépenses | Rôle    |
| -----------| -----------    |
| Utilisation | Coût du transfert de données surveillé par Cloud Network Monitoring et attribué. |
| Non surveillé | Coût du transfert de données non surveillé par Cloud Network Monitoring. Ce coût n'est pas attribué. |

{{% /tab %}}
{{% tab "Azure" %}}

### Calculer

Le coût d'une instance host est divisé en deux composantes : 60 % pour le CPU et 40 % pour la mémoire. Si l'instance host dispose de GPU, le coût est divisé en trois composantes : 95 % pour le GPU, 3 % pour le CPU et 2 % pour la mémoire. Chaque composante est attribuée aux charges de travail individuelles en fonction de leurs réservations de ressources et de leur utilisation.

Les coûts sont répartis entre les types de dépenses suivants :

| Type de dépenses | Rôle    |
| -----------| -----------    |
| Utilisation | Coût des ressources (telles que la mémoire, le CPU et le GPU) utilisées par les charges de travail, basé sur l'utilisation moyenne de la journée. |
| Inactivité des charges de travail | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui sont réservées et attribuées mais non utilisées par les charges de travail. Il s'agit de la différence entre le total des ressources demandées et l'utilisation moyenne. |
| Inactivité du cluster | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui ne sont pas réservées par les charges de travail dans un cluster. Il s'agit de la différence entre le coût total des ressources et ce qui est attribué aux charges de travail. |

{{% /tab %}}
{{% tab "Google" %}}

### Calculer

Le coût d'une instance host est divisé en deux composantes : 60 % pour le CPU et 40 % pour la mémoire. Si l'instance host dispose de GPU, le coût est divisé en trois composantes : 95 % pour le GPU, 3 % pour le CPU et 2 % pour la mémoire. Chaque composante est attribuée aux charges de travail individuelles en fonction de leurs réservations de ressources et de leur utilisation.

Les coûts sont répartis entre les types de dépenses suivants :

| Type de dépenses | Rôle    |
| -----------| -----------    |
| Utilisation | Coût des ressources (telles que la mémoire, le CPU et le GPU) utilisées par les charges de travail, basé sur l'utilisation moyenne de la journée. |
| Inactivité des charges de travail | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui sont réservées et attribuées mais non utilisées par les charges de travail. Il s'agit de la différence entre le total des ressources demandées et l'utilisation moyenne. |
| Inactivité du cluster | Coût des ressources (telles que la mémoire, le CPU et le GPU) qui ne sont pas réservées par les charges de travail dans un cluster. Il s'agit de la différence entre le coût total des ressources et ce qui est attribué aux charges de travail. |
| Non surveillé | Coût des ressources dont le type de dépense est inconnu. Pour résoudre ce problème, installez l'Agent Datadog sur ces clusters ou nœuds. |

{{% /tab %}}
{{< /tabs >}}

## Comprendre les ressources

Selon le fournisseur cloud, certaines ressources peuvent ou non être disponibles pour l'allocation des coûts.

| Ressource | AWS | Azure | Google Cloud |
|---:|---:|---|---|
| CPU | {{< X >}} | {{< X >}} | {{< X >}} |
| Mémoire | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< tooltip text="Volumes persistants" tooltip="Ressources de stockage au sein d'un cluster, provisionnées par des administrateurs ou de manière dynamique, qui conservent les données indépendamment du cycle de vie des pods." case="title" >}} | {{< X >}} |  |  |
| {{< tooltip text="Frais de service managé" tooltip="Coût des frais associés facturés par le fournisseur cloud pour la gestion du cluster, tels que les frais pour les services Kubernetes managés ou d'autres options d'orchestration de conteneurs." case="title" >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Coûts ECS | {{< X >}} | S. O. | S. O. |
| Coûts de transfert de données | {{< X >}} | Limited* | Limited* |
| GPU | {{< X >}} | {{< X >}} | {{< X >}}  |
| {{< tooltip text="Stockage local" tooltip="Ressources de stockage directement attachées à un nœud." case="title" >}} |  | Limited* | Limited* |

Les ressources `Limited*` ont été identifiées comme faisant partie de vos dépenses Kubernetes, mais ne sont pas entièrement attribuées à des charges de travail ou pods spécifiques. Ces ressources correspondent à des coûts au niveau du host, et non au niveau du pod ou du namespace, et sont identifiées avec `allocated_spend_type:<resource>_not_supported`.

## Métriques de coûts

Lorsque les prérequis sont remplis, les métriques de coûts suivantes apparaissent automatiquement.

{{< tabs >}}
{{% tab "AWS" %}}

| Métrique de coûts                    | Rôle    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | Coûts EC2 attribués en fonction du CPU et de la mémoire utilisés par un pod ou une tâche ECS, avec une répartition 60:40 pour le CPU et la mémoire respectivement, et une répartition 95:3:2 pour le GPU, le CPU et la mémoire respectivement si un GPU est utilisé par un pod. Inclut également les coûts EBS attribués. <br> *Basé sur `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | Coûts nets EC2 attribués en fonction du CPU et de la mémoire utilisés par un pod ou une tâche ECS, avec une répartition 60:40 pour le CPU et la mémoire respectivement, et une répartition 95:3:2 pour le GPU, le CPU et la mémoire respectivement si un GPU est utilisé par un pod. Inclut également les coûts EBS attribués. <br> *Basé sur `aws.cost.net.amortized`, si disponible* |

{{% /tab %}}
{{% tab "Azure" %}}

| Métrique de coûts                    | Rôle    |
| ---                                | ----------- |
| `azure.cost.amortized.shared.resources.allocated` | Coûts Azure VM attribués en fonction du CPU et de la mémoire utilisés par un pod ou une tâche de conteneur, avec une répartition 60:40 pour le CPU et la mémoire respectivement, et une répartition 95:3:2 pour le GPU, le CPU et la mémoire respectivement si un GPU est utilisé par un pod. Inclut également les coûts Azure attribués. <br> *Basé sur `azure.cost.amortized`* |

{{% /tab %}}
{{% tab "Google" %}}

| Métrique de coûts                    | Rôle    |
| ---                                | ----------- |
| `gcp.cost.amortized.shared.resources.allocated` | Coûts Google Compute Engine attribués en fonction du CPU et de la mémoire utilisés par un pod, avec une répartition 60:40 pour le CPU et la mémoire respectivement, et une répartition 95:3:2 pour le GPU, le CPU et la mémoire respectivement si un GPU est utilisé par un pod. Cette méthode d'allocation est utilisée lorsque la facture ne fournit pas déjà une répartition spécifique entre l'utilisation du CPU et de la mémoire. <br> *Basé sur `gcp.cost.amortized`* |

{{% /tab %}}
{{< /tabs >}}

Ces métriques de coûts incluent l'ensemble de vos coûts cloud. Cela vous permet de continuer à visualiser tous vos coûts cloud en une seule fois.

Par exemple, si vous avez le tag `team` sur un bucket de stockage, une base de données managée par un fournisseur cloud et des pods Kubernetes, vous pouvez utiliser ces métriques pour regrouper les coûts par `team`, ce qui inclut les coûts des trois.

## Appliquer des tags

Datadog consolide et applique les tags suivants, provenant de différentes sources, aux métriques de coûts.

{{< tabs >}}
{{% tab "AWS" %}}

### Kubernetes

En plus des tags de pods Kubernetes et de nœuds Kubernetes, la liste non exhaustive suivante de tags prêts à l'emploi est appliquée aux métriques de coûts :

| Tag prêt à l'emploi  |  Rôle |
| ---                 | ------------ |
| `orchestrator:kubernetes` | La plateforme d'orchestration associée à l'élément est Kubernetes. |
| `kube_cluster_name` | Le nom du cluster Kubernetes. |
| `kube_namespace` | Le namespace où s'exécutent les charges de travail. |
| `kube_deployment` | Le nom du déploiement Kubernetes. |
| `kube_stateful_set` | Le nom du StatefulSet Kubernetes. |
| `pod_name` | Le nom d'un pod individuel. |

Les conflits sont résolus en privilégiant les tags de plus grande spécificité, comme les tags de pods, par rapport aux tags de moindre spécificité, comme les tags de hosts. Par exemple, un pod Kubernetes tagué `service:datadog-agent` exécuté sur un nœud tagué `service:aws-node` aboutit à un tag final `service:datadog-agent`.

#### Volume persistant

En plus des tags de pods Kubernetes et de nœuds Kubernetes, les tags prêts à l'emploi suivants sont appliqués aux métriques de coûts.

| Tag prêt à l'emploi                      | Rôle                                                                                                                                  |
| ---                                     |----------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent_volume_reclaim_policy`      | La politique de récupération de Kubernetes sur le volume persistant.                                                                                      |
| `storage_class_name`                    | La classe de stockage Kubernetes utilisée pour instancier le volume persistant.                                                                      |
| `volume_mode`                           | Le mode de volume du volume persistant.                                                                                                    |
| `ebs_volume_type`                       | Le type de volume EBS. Peut être `gp3`, `gp2`, ou autre.                                                                              |

### Amazon ECS

En plus des tags de tâches ECS, les tags prêts à l'emploi suivants sont appliqués aux métriques de coûts.

**Remarque** : la plupart des tags des conteneurs ECS sont appliqués (à l'exception de `container_name`).

| Tag prêt à l'emploi      |  Rôle |
| ---                     | ------------ |
| `orchestrator:ecs`      | La plateforme d'orchestration associée à l'élément est Amazon ECS. |
| `ecs_cluster_name`      | Le nom du cluster ECS. |
| `is_aws_ecs`            | Tous les coûts liés au fonctionnement d'ECS. |
| `is_aws_ecs_on_ec2`     | Tous les coûts de calcul EC2 associés à l'exécution d'ECS sur EC2. |
| `is_aws_ecs_on_fargate` | Tous les coûts associés à l'exécution d'ECS sur Fargate. |

### Transfert de données

La liste suivante de tags prêts à l'emploi est appliquée aux métriques de coûts associées aux charges de travail Kubernetes :

| Tag prêt à l'emploi      |  Rôle |
| ---                     | ------------ |
| `source_availability_zone` | Le nom de la zone de disponibilité d'où provient le transfert de données. |
| `source_availability_zone_id` | L'ID de la zone de disponibilité d'où provient le transfert de données. |
| `source_region` | La région d'où provient le transfert de données. |
| `destination_availability_zone` | Le nom de la zone de disponibilité vers laquelle le transfert de données a été envoyé. |
| `destination_availability_zone_id` | L'ID de la zone de disponibilité vers laquelle le transfert de données a été envoyé. |
| `destination_region` | La région où le transfert de données a été envoyé. |
| `allocated_resource:data_transfer` | Le suivi et la répartition des coûts associés aux activités de transfert de données. |

De plus, certains tags de pods Kubernetes communs à tous les pods d'un même nœud sont également appliqués.

{{% /tab %}}
{{% tab "Azure" %}}

### Kubernetes

En plus des tags de pods Kubernetes et de nœuds Kubernetes, la liste non exhaustive suivante de tags prêts à l'emploi est appliquée aux métriques de coûts :

| Tag prêt à l'emploi                         | Rôle                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | La plateforme d'orchestration associée à l'élément est Kubernetes.                                                                                            |
| `kube_cluster_name` | Le nom du cluster Kubernetes. |
| `kube_namespace` | Le namespace où s'exécutent les charges de travail. |
| `kube_deployment` | Le nom du déploiement Kubernetes. |
| `kube_stateful_set` | Le nom du StatefulSet Kubernetes. |
| `pod_name` | Le nom d'un pod individuel. |
| `allocated_resource:data_transfer` | Le suivi et l'allocation des coûts associés aux activités de transfert de données utilisées par les services ou charges de travail Azure. |
| `allocated_resource:local_storage`         | Le suivi et l'allocation des coûts au niveau du host associés aux ressources de stockage local utilisées par les services ou charges de travail Azure.                             |

{{% /tab %}}
{{% tab "Google" %}}

### Kubernetes

En plus des tags de pods Kubernetes et de nœuds Kubernetes, la liste non exhaustive suivante de tags prêts à l'emploi est appliquée aux métriques de coûts :

| Tag prêt à l'emploi                         | Rôle                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | La plateforme d'orchestration associée à l'élément est Kubernetes.                                                                                            |
| `kube_cluster_name` | Le nom du cluster Kubernetes. |
| `kube_namespace` | Le namespace où s'exécutent les charges de travail. |
| `kube_deployment` | Le nom du déploiement Kubernetes. |
| `kube_stateful_set` | Le nom du StatefulSet Kubernetes. |
| `pod_name` | Le nom d'un pod individuel. |
| `allocated_spend_type:not_monitored` | Le suivi et l'allocation des [coûts Kubernetes sans Agent](#couts-kubernetes-sans-agent) associés aux ressources utilisées par les services ou charges de travail Google Cloud, lorsque l'Agent Datadog ne surveille pas ces ressources. |
| `allocated_resource:data_transfer` | Le suivi et l'allocation des coûts associés aux activités de transfert de données utilisées par les services ou charges de travail Google Cloud. |
| `allocated_resource:gpu` | Le suivi et l'allocation des coûts au niveau du host associés aux ressources GPU utilisées par les services ou charges de travail Google Cloud. |
| `allocated_resource:local_storage` | Le suivi et l'allocation des coûts au niveau du host associés aux ressources de stockage local utilisées par les services ou charges de travail Google Cloud. |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/containers