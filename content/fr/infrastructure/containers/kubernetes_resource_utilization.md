---
aliases:
- /fr/infrastructure/containers/kubernetes_resources
further_reading:
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: Blog
  text: Conseils utiles pour dimensionner parfaitement vos workloads Kubernetes
kind: documentation
title: Utilisation des ressources Kubernetes
---

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization.png" alt="Vue de l'utilisation des ressources Kubernetes" >}}

La vue [Resource Utilization pour Kubernetes][3] fournie par Datadog décrit la manière dont vos workloads Kubernetes consomment les ressources de calcul de toute votre infrastructure. Elle vous permet de mieux comprendre l'utilisation de vos ressources, de prendre des décisions éclairées concernant la planification des capacités et du dimensionnement, et de limiter les pertes de CPU ou de mémoire.

Datadog indique continuellement à quel point les requêtes et limites de vos ressources sont optimisées par rapport à l'utilisation actuelle de vos pods. Ainsi, vous pouvez améliorer le rassemblement des ressources au sein de vos clusters Kubernetes.

## Prérequis

- Agent Datadog v7.45.0+
- Vue [Orchestrator Explorer][1] activée

## Utilisation

Dans Datadog, accédez à **Infrastructure** > [**Kubernetes**][2], puis sélectionnez l'[onglet **Resource Utilization**][3].

Par défaut, sur la nouvelle page, l'option **Pods** est activée avec un regroupement basé sur `kube_cluster_name`, `kube_namespace` et `kube_deployment`.

L'optimisation du dimensionnement vis-à-vis du CPU et de la mémoire repose généralement sur deux tâches distinctes. Deux onglets vous permettent donc de basculer de la vue **CPU** à la vue **Memory** du tableau, et inversement.

#### Colonnes par défaut

{{< tabs >}}
{{% tab "Onglet CPU" %}}
- **Pod group** : cette colonne représente les déploiements par défaut. Toutefois, les données affichées dépendent des éléments spécifiés dans le champ **Group by** en haut à droite. Cette colonne comprend la somme de l'utilisation, des requêtes et des limites pour les pods de chaque groupe.
- **CPU idle** : cette colonne représente la quantité de CPU non utilisé, à savoir la somme des différences entre l'utilisation et les requêtes.
- **CPU usage/requests** : cette colonne représente un pourcentage correspondant à la somme de l'utilisation divisée par la somme des requêtes.
- **CPU usage/limits** : cette colonne représente un pourcentage correspondant à la somme de l'utilisation divisée par la somme des limites.
- **CPU graph** : ce graphique linéaire illustre l'évolution de l'utilisation, des requêtes et des limites. Cliquez sur chaque ligne pour afficher une période plus longue.
{{% /tab %}}
{{% tab "Onglet Memory" %}}
- **Pod group** : cette colonne représente les déploiements par défaut. Toutefois, les données affichées dépendent des éléments spécifiés dans le champ **Group by** en haut à droite. Cette colonne comprend la somme de l'utilisation, des requêtes et des limites pour les pods de chaque groupe.
- **Memory unused** : cette colonne représente la quantité de mémoire non utilisée, à savoir la somme des différences entre l'utilisation et les requêtes.
- **Memory usage/requests** : cette colonne représente un pourcentage correspondant à la somme de l'utilisation divisée par la somme des requêtes.
- **Memory usage/limits** : cette colonne représente un pourcentage correspondant à la somme de l'utilisation divisée par la somme des limites.
- **Memory graph** : ce graphique linéaire illustre l'évolution de l'utilisation, des requêtes et des limites. Cliquez sur chaque ligne pour afficher une période plus longue.
{{% /tab %}}
{{< /tabs >}}

Utilisez le bouton **Customize** en haut à droite afin de sélectionner d'autres colonnes à afficher. Le code couleur correspond au degré de sur/sous-provisionnement des pods.

#### Vue détaillée

Cliquez sur une ligne pour ouvrir un volet latéral présentant à la fois les données relatives au CPU et à la mémoire pour chaque groupe, avec des graphiques détaillés pour chaque pod ou conteneur, ainsi qu'une top list de pods.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_panel.png" alt="Volet latéral de l'utilisation des ressources Kubernetes" >}}

Les graphiques des pods ou conteneurs individuels vous aident à identifier les singularités susceptibles d'affecter le groupe en cas de déséquilibre des charges. Par défaut, les graphiques sont regroupés en fonction de `pod_name`, afin d'afficher les pods individuels. Vous pouvez modifier ce filtre et effectuer un regroupement en fonction `kube_container_name`, afin d'identifier les conteneurs qui contribuent le plus au sur/sous-provisionnement lorsque des pods comportent plusieurs conteneurs.

### Optimiser les ressources inactives

Il est nécessaire de disposer d'une quantité de CPU et de mémoire non utilisé(e) pour veiller à ce que votre application puisse se développer sans que les pods ne soient immédiatement limités ou arrêtés.

Une quantité excessive de CPU et de mémoire non utilisée peut entraîner une hausse inutile des coûts, mais sans cela, vous courez le risque de voir les performances ainsi que la fiabilité se dégrader en cas d'augmentation de l'utilisation des ressources.

Pour trouver un juste équilibre, ajustez le graphique de façon à afficher les données sur une plus longue période, et évitez de prendre des décisions concernant le redimensionnement des ressources en vous basant uniquement sur l'utilisation récente. Il s'agit de métriques Kubernetes standard, ce qui signifie que vous pouvez les interroger comme n'importe quelle métrique Datadog. Vous pouvez par exemple choisir d'afficher les métriques détaillées au cours des 15 derniers mois.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_metrics.png" alt="Métriques de l'utilisation des ressources Kubernetes" >}}

### Limites connues

Aucune métrique ne s'affiche pour les groupes contenant au moins un pod comportant des conteneurs qui ne définissent pas de requêtes ni de limites. En effet, Datadog ne peut pas déduire le pourcentage d'utilisation sans ces éléments. Ces groupes dépourvus de métriques sont affichés en dernier, quel que soit l'ordre de tri spécifié.

La somme des requêtes et limites de ressources d'un groupe n'est pas affectée par l'état des ressources appartenant à ce groupe. Ces valeurs peuvent différer de celles affichées sur les graphiques de métriques complémentaires.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/infrastructure/containers/orchestrator_explorer?tab=datadogoperator#setup
[2]: https://app.datadoghq.com/kubernetes
[3]: https://app.datadoghq.com/orchestration/resource/pod?groups=tag%23kube_deployment%2Ctag%23kube_namespace%2Ctag%23kube_cluster_name