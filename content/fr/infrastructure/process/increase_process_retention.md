---
aliases:
- /fr/infrastructure/process/generate_process_metrics/
- /fr/processes/processing/process_to_metrics/
- /fr/infrastructure/generate_process_metrics/
description: Générez des métriques à partir de processus.
further_reading:
- link: metrics/distributions/
  tag: Documentation
  text: Métriques de distribution
- link: monitors/monitor_types/metric/?tab=threshold
  tag: Documentation
  text: Créer un monitor de métriques
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: Blog
  text: Conseils utiles pour dimensionner parfaitement vos charges de travail Kubernetes
title: Optimiser la rétention des processus
---

## Présentation

Étant donné que les données des live processes sont stockées pendant 36 heures, vous pouvez générer des métriques de distribution globales et en centiles à partir de vos processus pour surveiller votre consommation de ressources sur le long terme. Comme les autres métriques Datadog, les métriques basées sur les processus sont stockées pendant 15 mois. Vous pouvez ainsi facilement effectuer les actions suivantes :

- Débuguer les problèmes d'infrastructure passés et actuels
- Identifier les tendances de consommation des ressources pour vos charges de travail critiques
- Évaluer la santé de votre système avant et après des tests de charge ou des stress tests
- Surveiller l'impact des déploiements logiciels sur la santé de vos hosts et conteneurs sous-jacents

{{< img src="infrastructure/process/process2metrics_overview_2.png" alt="Générer des métriques basées sur des processus" style="width:80%;">}}

## Générer une métrique basée sur des processus

Vous pouvez générer une nouvelle métrique basée sur des processus directement à partir de requêtes sur la page [**Live Processes**][2] ou dans [lʼonglet **Manage Metrics**][1], en cliquant sur le bouton **+ New Metric**.

### Ajouter une nouvelle métrique basée sur des processus

{{< img src="infrastructure/process/process2metrics_create.png" alt="Créer une métrique basée sur des processus" style="width:80%;">}}

1. **Sélectionnez des tags pour filtrer votre requête** : la syntaxe de la requête est la même que pour les [live processes][2]. Seuls les processus qui correspondent au contexte de vos filtres sont pris en compte pour l'agrégation. Les filtres de recherche textuelle sont uniquement pris en charge sur la page Live Processes.
2. **Choisissez la mesure à surveiller** : saisissez une mesure, telle que `Total CPU %`, pour agréger une valeur numérique et créer ses métriques agrégées `count`, `min`, `max`, `sum` et `avg` correspondantes.
3. **Ajoutez des tags dans le champ `group by`** : sélectionnez des tags à ajouter sous forme de dimensions à vos métriques pour qu'elles puissent être filtrées, agrégées et comparées. Par défaut, les métriques générées à partir de processus ne sont associées à aucun tag, sauf si vous avez explicitement choisi d'en ajouter. Tous les tags disponibles pour les requêtes Live Processes peuvent être utilisés dans ce champ.
4. **Donnez un nom à votre métrique** : renseignez le nom de votre métrique. Les métriques basées sur des processus ont toujours le préfixe _proc._ et le suffixe _[mesure_sélectionnée]_.
5. **Ajoutez des agrégations en centiles** : cochez la case _Include percentile aggregations_ pour générer les centiles p50, p75, p90, p95, et p99. Les métriques en centiles sont également considérées comme des métriques custom, et sont facturées comme telles.

Vous pouvez créer plusieurs métriques avec la même requête en cochant la case **Create Another** en bas de la fenêtre de création de métrique. La fenêtre reste alors ouverte une fois votre métrique créée, et les filtres ainsi que les groupes d'agrégation sont pré-renseignés.

**Remarque** : les points de données pour les métriques basées sur des processus sont générés selon des intervalles de 10 secondes. Jusqu'à 3 minutes peuvent être nécessaires entre la création ou la mise à jour de la métrique et l'envoi du premier point de données.

<div class="alert alert-warning">Les métriques basées sur des processus sont considérées comme des <a href="/metrics/custom_metrics/">métriques custom</a> et facturées en conséquence. Évitez de regrouper les données en fonction de tags avec une cardinalité non délimitée ou extrêmement élevée, comme <code>command</code> et <code>user</code>, afin de ne pas nuire à la facturation.</div>

### Mettre à jour une métrique basée sur des processus

{{< img src="infrastructure/process/process2metrics_update.png" alt="Mise à jour des métriques de distribution" style="width:80%;">}}

Lorsqu'une métrique est créée, les champs suivants peuvent être mis à jour :

- Filtrer la requête : ajoutez et retirez des tags dans le champ Filter by pour modifier les processus pour lesquels les métriques doivent être générées.
- Groupes d'agrégation : ajoutez ou retirez des tags dans le champ Group by pour affiner vos métriques de différentes façons, ou gérer leur cardinalité.
- Sélection des centiles : cochez ou décochez la case Include percentile aggregations pour retirer ou générer des métriques en centiles.

Pour modifier le type ou le nom d'une métrique, une nouvelle métrique doit être créée.

## Tirer parti des métriques de processus dans la plateforme Datadog

{{< img src="infrastructure/process/process2metrics_dashboard_widget.png" alt="Représenter des métriques de distribution de processus dans les dashboards" style="width:80%;">}}

Une fois créées, vous pouvez utiliser les métriques de distribution agrégées et réparties en centiles issues de vos processus comme les autres métriques Datadog. Par exemple :

- Représentez graphiquement des métriques basées sur des processus dans les dashboards et les notebooks afin de suivre la consommation de ressources historique pour les charges de travail importantes
- Créez des monitors basés sur des anomalies ou des seuils en plus de métriques basées sur des processus pour détecter lorsque la mémoire RSS ou la charge CPU chute ou augmente de façon inattendue
- Utilisez la [corrélation de métriques][4] pour contextualiser les chutes ou pics de consommation de ressources en les comparant avec les performances de logiciels tiers ou internes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/process?view=metrics
[2]: https://app.datadoghq.com/process
[3]: /fr/metrics/custom_metrics/
[4]: /fr/dashboards/correlations/