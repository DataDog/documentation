---
aliases:
- /fr/cloud_cost_management/real_time_costs
description: Visualisez et analysez les dépenses cloud en temps réel.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
title: Coûts en temps réel
---
## Présentation {#overview}

Les coûts en temps réel fournissent des estimations quasi en temps réel de vos coûts Amazon EC2, y compris l'allocation des coûts Kubernetes, afin que vous puissiez réagir aux changements de coûts en quelques minutes ou heures, au lieu de quelques jours. Les estimations sont générées à l'aide de données d'utilisation en temps réel provenant du Datadog Agent, basées sur les prix nets amortis horaires moyens récents des instances EC2 par type d'instance, région et compte AWS.

Utilisez les coûts en temps réel pour :
- Détecter les anomalies tôt
- Observer l'impact des changements récents
- Surveillez les tendances de dépenses horaires ou en intervalles inférieurs à une heure
- Obtenez une meilleure visibilité sur les clusters Kubernetes en évolution rapide

Les coûts en temps réel sont disponibles pour :
- Dépenses Amazon EC2 (hors EBS, réseau et services similaires)
- Kubernetes exécuté sur EC2

## Prérequis {#requirements}

La fonctionnalité Coûts en temps réel est disponible pour les clients Cloud Cost Management Enterprise.

- Cloud Cost Management est activé pour le compte AWS
- Le Datadog Agent est installé sur chaque instance EC2
- (Facultatif) Pour voir les coûts Kubernetes en temps réel, activez Datadog Container Monitoring pour vos clusters en suivant le guide de configuration dans [Allocation des coûts des conteneurs][2]

## Comment interroger les coûts en temps réel {#how-to-query-real-time-costs}

Les coûts en temps réel se trouvent sous la source {{< ui >}}Metrics{{< /ui >}} standard dans Metrics Explorer et les dashboards, et doivent être interrogés en utilisant `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` :
- l'agrégation `sum` ou `sum by`
- en tant que `count` (en savoir plus sur les [métriques de taux vs nombre][1])
- Regroupement `sum`, d'une durée minimale de 5 minutes (ou 300 secondes dans la requête ci-dessus, puisque les coûts en temps réel sont mis à jour toutes les 5 minutes)

Les regroupements peuvent être plus longs, par exemple 1 heure, pour consulter les coûts sur une base horaire. Les coûts horaires peuvent être utiles pour mieux comprendre les modèles d'utilisation avant d'acheter des plans d'épargne et des réservations.

## Allocation Kubernetes en temps réel {#real-time-kubernetes-allocation}

Similaire à l'allocation des coûts de conteneur existante, les coûts des instances EC2 sont ventilés dans les pods Kubernetes qui s'y sont exécutés. Tous les tags utilisés sur votre pod sont disponibles en temps réel, y compris **tags personnalisés sur vos pods**, tels que l'équipe, le service ou l'environnement, et **tags Kubernetes prêts à l'emploi** :
- `allocated_spend_type`, qui divise les coûts de calcul en CPU et mémoire utilisés par une charge de travail (`usage`), demandés par une charge de travail mais non utilisés (`workload_idle`), et non réservés par aucune charge de travail (`cluster_idle`)
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `pod_name`
- `pod_phase`
- `pod_status`

Les nœuds qui sont inactifs ou qui n'exécutent aucun pod conservent leurs tags Kubernetes, tels que `kube_cluster_name` et `orchestrator:kubernetes`, afin que vous puissiez regrouper et visualiser le coût des clusters qui sont complètement inactifs.

## Tags {#tags}

Les tags pour les coûts en temps réel sont similaires à ceux des autres métriques de Cloud Cost Management, mais pas identiques.
- Toutes les valeurs de tag sont en minuscules, normalisées comme les données de métriques
- Les pipelines de tags et les règles d'allocation personnalisées ne sont pas appliqués
- Certains tags spécifiques au rapport de coûts et d'utilisation (CUR) et certains tags FOCUS peuvent ne pas exister dans la métrique de coût en temps réel, car les coûts en temps réel sont principalement dérivés à l'aide des données d'utilisation collectées par le Datadog Agent, et non du CUR

## Précision {#accuracy}

Les coûts en temps réel visent une précision à 10 % près par rapport aux données de coûts EC2 quotidiens de votre CUR, pour les hosts EC2 surveillés par le Datadog Agent. Comme les coûts en temps réel privilégient une diffusion à faible latence, des baisses ou des lacunes temporaires dans les données peuvent occasionnellement se produire. Pour l'analyse des tendances de coûts à long terme, Datadog recommande d'utiliser les métriques Cloud Cost basées sur les données de facturation AWS directes.

Vous pouvez utiliser le tag `estimated_hourly_cost` pour comprendre le coût unitaire estimé d'un type d'instance par heure.

- Les sources de variance incluent :
  - Les moyennes horaires qui varient en fonction de votre combinaison récente de dépenses à la demande, d'engagement et de spot
  - Des différences mineures entre les heures de début et de fin réelles de l'instance et ce que le Datadog Agent rapporte
- Une sous-estimation peut se produire lorsque :
  - Les instances EC2 ne sont pas surveillées par le Datadog Agent
  - Les types d'instances ou les régions récemment utilisés ne sont pas encore apparus dans les données de facturation CCM
  - Les estimations couvrent uniquement le calcul (pas EBS, la mise en réseau, etc.)
- Une surestimation peut se produire lorsque :
  - Les instances sont surveillées par le Datadog Agent mais ne sont pas incluses dans les données de facturation CCM

[1]: /fr/metrics/types/?tab=rate#metric-types
[2]: /fr/cloud_cost_management/allocation/container_cost_allocation/