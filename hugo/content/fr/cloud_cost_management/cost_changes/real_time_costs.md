---
aliases:
- /fr/cloud_cost_management/real_time_costs
description: Visualisez et analysez les dépenses cloud en temps réel.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
  tag: Documentation
  text: Créez un moniteur d'anomalies en temps réel
title: Coûts en temps réel
---
<div class="alert alert-info">Les coûts en temps réel pour Azure et Google Cloud sont en préversion.</div>

## Présentation {#overview}

Real-Time Costs estime vos coûts de calcul AWS, Azure et Google Cloud en temps quasi réel, afin que vous puissiez réagir aux changements de coûts en quelques minutes ou heures au lieu de quelques jours. Datadog génère des estimations à partir des données d'utilisation en temps réel collectées par le Datadog Agent, et évalue cette utilisation avec vos coûts horaires moyens récents issus des données de facturation de Cloud Cost Management.

Utilisez les coûts en temps réel pour :
- Détectez rapidement les anomalies et alertez en cas d'anomalie grâce aux [moniteurs d'anomalies en temps réel][3]
- Observer l'impact des changements récents
- Surveillez les tendances de dépenses horaires ou en intervalles inférieurs à une heure
- Obtenez une meilleure visibilité sur les clusters Kubernetes en évolution rapide

Les coûts en temps réel sont disponibles pour :

| Fournisseur | Dépenses couvertes | Métrique en temps réel | Tarification à partir de |
|---|---|---|---|
| AWS | Instances Amazon EC2 et Kubernetes s'exécutant sur EC2 | `aws.cost.net.amortized.realtime.estimated` | Prix horaires nets moyens amortis récents des instances EC2 par type d'instance, région et compte AWS |
| Azure (Preview) | Coûts de calcul des Azure Virtual Machines et de Kubernetes s'exécutant sur des VM Azure | `azure.cost.amortized.realtime.estimated` | Prix horaires moyens amortis récents des VM par type d'instance, région et abonnement Azure |
| Google Cloud (Preview) | Instances Compute Engine (vCPU et mémoire) et Kubernetes s'exécutant sur Compute Engine | `gcp.cost.amortized.realtime.estimated` | Prix horaires moyens amortis récents des vCPU et de la mémoire par type de machine, région et projet Google Cloud |

Les coûts en temps réel ne couvrent que le calcul. Les frais suivants sont exclus :
- **AWS** : EBS, mise en réseau et autres frais en dehors du calcul des instances Amazon EC2.
- **Azure** : disques gérés, stockage, bande passante, mise en réseau et autres frais en dehors de l'utilisation des ressources de calcul de Virtual Machines (`chargetype:Usage`). Les réservations de capacité Azure inutilisées sont également exclues.
- **Google Cloud** : Persistent Disk, GPU, mise en réseau, licences OS, adresses IP externes et autres frais en dehors des SKU vCPU (Core) et mémoire (RAM) des instances Compute Engine. Les crédits et les frais de réservation sont également exclus.

## Prérequis {#requirements}

La fonctionnalité Coûts en temps réel est disponible pour les clients Cloud Cost Management Enterprise. Avant de commencer, confirmez que :

- Cloud Cost Management est activé pour le compte AWS, l'abonnement Azure ou le projet Google Cloud.
- Le Datadog Agent est installé sur chaque instance EC2, machine virtuelle Azure ou instance Compute Engine.
- (Facultatif) Pour les coûts Kubernetes en temps réel, Datadog Container Monitoring est activé pour vos clusters. Consultez [Container Cost Allocation][2] pour la configuration.

## Interrogez les coûts en temps réel {#query-real-time-costs}

Trouvez les coûts en temps réel sous la source {{< ui >}}Metrics{{< /ui >}} standard dans Metrics Explorer et les dashboards. Utilisez la requête pour votre fournisseur :

| Fournisseur | Requête |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

Interrogez les coûts en temps réel avec :
- L'agrégation `sum` ou `sum by`
- Le modificateur `.as_count()` (en savoir plus sur les [métriques de taux et de comptage][1])
- Un rollup `sum` d'au moins 5 minutes (300 secondes dans les requêtes précédentes, car les coûts en temps réel sont mis à jour toutes les 5 minutes)

Les regroupements peuvent être plus longs, par exemple 1 heure, pour consulter les coûts sur une base horaire. Les coûts horaires vous aident à comprendre les modèles d'utilisation avant d'acheter des Savings Plans et des réservations.

## Affichez les coûts en temps réel dans les dashboards {#view-real-time-costs-in-dashboards}

Chaque fournisseur dispose d'un dashboard {{< ui >}}Real-Time Cost Overview{{< /ui >}} prêt à l'emploi. Ces dashboards affichent les tendances des coûts en temps réel et les variations de coûts d'un jour à l'autre avant que les données de facturation finales ne soient disponibles. Retrouvez-les sur la page [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Dashboards{{< /ui >}}][5] ou dans la [Dashboard List][6].

Les dashboards affichent les données une fois que vous remplissez les [exigences relatives aux coûts en temps réel][7]. Aucune configuration supplémentaire n'est requise.

## Allocation Kubernetes en temps réel {#real-time-kubernetes-allocation}

Comme pour l'allocation des coûts des conteneurs, Datadog répartit les coûts des instances EC2, des machines virtuelles Azure et des instances Compute Engine entre les pods Kubernetes qui y ont été exécutés. Tous les tags utilisés sur votre pod sont disponibles en temps réel, y compris **les tags personnalisés de vos pods**, tels que team, service ou env, et **les tags Kubernetes prêts à l'emploi** :
- `allocated_spend_type`, qui divise les coûts de calcul en CPU et mémoire utilisés par une charge de travail (`usage`), demandés par une charge de travail mais non utilisés (`workload_idle`), et non réservés par aucune charge de travail (`cluster_idle`)
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `kube_daemon_set`
- `pod_name`
- `pod_phase`
- `pod_status`

Les nœuds qui sont inactifs ou qui n'exécutent aucun pod conservent leurs tags Kubernetes, tels que `kube_cluster_name` et `orchestrator:kubernetes`, afin que vous puissiez regrouper et visualiser le coût des clusters qui sont complètement inactifs.

## Tags {#tags}

Les tags pour les coûts en temps réel diffèrent des tags sur les autres métriques de Cloud Cost Management des manières suivantes :
- Toutes les valeurs de tag sont en minuscules, normalisées comme les données de métriques.
- Les Tag Pipelines et les règles d'allocation personnalisées ne sont pas appliqués.
- Certains tags spécifiques à la facturation (issus du rapport AWS Cost and Usage Report, des exportations de coûts Azure ou des exportations de facturation Google Cloud) et les tags FOCUS peuvent ne pas exister sur les métriques de coûts en temps réel. Les coûts en temps réel proviennent principalement des données d'utilisation collectées par le Datadog Agent, et non des données de facturation.

## Précision {#accuracy}

Pour les instances surveillées par le Datadog Agent, Datadog cible des estimations de coûts en temps réel à moins de 10 % des coûts de calcul quotidiens figurant dans vos données de facturation. Les données de facturation utilisées pour la comparaison dépendent du fournisseur :
- **AWS** : coûts EC2 issus de votre rapport AWS Cost and Usage Report
- **Azure** : coûts d'utilisation des machines virtuelles amortis issus de votre exportation de coûts Azure
- **Google Cloud** : coûts amortis de vCPU et de mémoire Compute Engine issus de votre export de facturation Google Cloud

Les coûts en temps réel sont optimisés pour une diffusion à faible latence ; des baisses ou des lacunes temporaires dans les données peuvent donc se produire, en particulier pour Azure et Google Cloud pendant la phase de préversion. Pour l'analyse des tendances de coûts à long terme, Datadog recommande d'utiliser les métriques Cloud Cost Management basées sur les données de facturation. Ces métriques incluent les crédits finaux.

- Les sources de variance incluent :
  - Moyennes horaires qui évoluent avec votre combinaison récente de dépenses à la demande (paiement à l'usage), d'engagement (Savings Plans, réservations, remises sur utilisation engagée) et spot
  - De légères différences entre les heures réelles de démarrage et d'arrêt d'une instance et celles signalées par l'Agent
- Une sous-estimation peut se produire lorsque :
  - Les instances ne sont pas surveillées par le Datadog Agent
  - Les types d'instances ou les régions récemment utilisés ne sont pas encore apparus dans les données de facturation CCM
  - Vous comparez les estimations aux dépenses totales, qui incluent des frais autres que les frais de calcul (voir la section [Présentation][4])
- Une surestimation peut se produire lorsque :
  - Les instances sont surveillées par le Datadog Agent mais ne sont pas incluses dans les données de facturation CCM

Pour réduire la variance, filtrez sur un compte, un abonnement ou un projet couvert par Cloud Cost Management et où le Datadog Agent s'exécute sur chaque instance.

Utilisez les tags `estimated_hourly_cost` et `estimated_daily_cost` pour voir le coût estimé d'un type d'instance par heure et par jour.

[1]: /fr/metrics/types/?tab=rate#metric-types
[2]: /fr/cloud_cost_management/allocation/container_cost_allocation/
[3]: /fr/cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
[5]: https://app.datadoghq.com/cost/analyze/dashboards
[6]: https://app.datadoghq.com/dashboard/lists?q=type%3Aintegration%20cost%20real
[7]: #requirements