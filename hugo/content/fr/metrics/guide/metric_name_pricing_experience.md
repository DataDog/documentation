---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Découvrez comment l'expérience des métriques personnalisées dans Datadog
  a été mise à jour pour refléter Metric Name Pricing, y compris les changements apportés
  à la fenêtre modale Manage Tags, au panneau latéral Metric, à la page Volume Management,
  à la page Plan & Usage, et aux métriques d'utilisation estimée.
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentation
  text: Tarification par nom de métrique pour les Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentation
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: Documentation
  text: Métriques d'utilisation estimée
- link: /metrics/volume/
  tag: Documentation
  text: Gestion du volume de métriques
title: Modifications de l'expérience des métriques pour Metric Name Pricing
---
## Présentation {#overview}

Avec le [modèle de facturation Metric Name Pricing][1] pour les métriques personnalisées, Datadog a mis à jour l'expérience des métriques pour refléter la manière dont l'utilisation est mesurée. Ce guide décrit ce qui a changé dans l'interface utilisateur et les API de Datadog pour les organisations sur Metric Name Pricing.

**Remarque** : Cette page s'applique uniquement si votre organisation est sur [Metric Name Pricing][1]. Si votre contrat utilise la tarification par série temporelle (cardinalité), votre expérience des métriques reste inchangée.

## Résumé des changements {#summary-of-changes}

| Fonctionnalité | Description |
|---------|-------------|
| [Fenêtre modale Manage Tags](#manage-tags-modal) | Estime l'impact des changements de tags sur le volume de points au lieu du volume de cardinalité. |
| [Panneau latéral Metric](#metric-side-panel) | Affiche le volume de points ingérés et indexés au lieu du volume de séries temporelles. |
| [Page Volume Management](#volume-management-page) | Les graphiques de vue d'ensemble du volume affichent les nouvelles dimensions de facturation pour Metric Name Pricing. |
| [Page Plan & Usage](#plan--usage-page) | Reflète la répartition de la facturation de Metric Name Pricing. |
| [Métriques d'utilisation estimée](#estimated-usage-metrics) | De nouvelles métriques de volume de points remplacent les métriques d'utilisation estimée basées sur la cardinalité. |

## Fenêtre modale Manage Tags {#manage-tags-modal}

Lors de la configuration des tags sur des métriques personnalisées, la fenêtre modale {{< ui >}}Manage Tags{{< /ui >}} estime l'impact des changements de tags sur le **volume de points** au lieu du volume de cardinalité.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="Fenêtre modale Manage Tags affichant un graphique de projection d'utilisation avec trois lignes : month-to-date usage, usage with current configuration, et usage with proposed configuration. Les tags datacenter et service sont configurés dans l'onglet Include tags." style="width:100%;" >}}

Pour plus d'informations sur la configuration des tags, consultez [Metrics without Limits™][2].

## Panneau latéral Metric {#metric-side-panel}

Le panneau latéral des détails de la métrique affiche le **volume de points ingérés et indexés** au lieu du volume de séries temporelles.

Pour ouvrir le panneau latéral Metric, cliquez sur n'importe quel nom de métrique sur la [page Metrics Summary][3].

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="Panneau latéral des détails de la métrique affichant INGESTED POINTS et INDEXED POINTS en haut, ainsi que Hosts et Tag Values." style="width:100%;" >}}

## Page Volume Management {#volume-management-page}

Les graphiques Volume Overview sur la [page Metrics Volume Management][4] affichent les dimensions de facturation suivantes pour Metric Name Pricing :

- Estimated unique metric names
- Billable indexed point volume
- Ingested-to-indexed points ratio

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Trois graphiques Volume Overview pour Metric Name Pricing : 'Estimated Unique Metric Names' (nombre de métriques avec plus de 100 points indexés depuis le début du mois), 'Estimated Total Points' (nombre total de points indexés dépassant l'allocation de 10M par métrique depuis le début du mois) et 'Estimated Ingested to Indexed Points Ratio'." style="width:100%;" >}}

## Page Plan & Usage {#plan-usage-page}

La [page Plan & Usage][5] reflète la répartition de la facturation de Metric Name Pricing pour les organisations sur le nouveau modèle.

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="La page Plan & Usage Cost Breakdown affichant Indexed Points, Ingest Points, et Metric Names en tant que postes de produit distincts dans le tableau Summary et le graphique Cumulative Cost Breakdown." style="width:100%;" >}}

## Métriques d'utilisation estimée {#estimated-usage-metrics}

Datadog fournit des métriques d'utilisation estimée afin que vous puissiez surveiller votre utilisation de Metric Name Pricing en temps réel. Utilisez ces métriques pour configurer des monitors et des dashboards pour la visibilité des coûts.

<div class="alert alert-warning">Métriques d'utilisation estimée basées sur la cardinalité (<code>datadog.estimated_usage.metrics.custom</code> et les métriques associées) ne sont plus disponibles pour les organisations utilisant la tarification basée sur le nom des métriques. Tous les monitors, dashboards ou autres ressources qui utilisent les métriques basées sur la cardinalité ont cessé de recevoir des données. Utilisez plutôt les métriques de volume de points listées ci-dessous.</div>

### Métriques d'utilisation facturable {#billable-usage-metrics}

Utilisez ces métriques pour estimer votre utilisation facturable depuis le début du mois :

#### `datadog.estimated_usage.billable.metrics` {#datadogestimated-usagebillablemetrics}

* **Ce qu'elle représente :** Nombre de noms de métriques avec plus de 100 points indexés, depuis le début du mois.
* **Réponse à la question de facturation :** Combien de noms de métriques sont facturables jusqu'à présent ce mois-ci ?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_metrics_example_09012026.png" alt="Exemple montrant le nombre de noms de métriques facturables depuis le début du mois" >}}

#### `datadog.estimated_usage.billable.points` {#datadogestimated-usagebillablepoints}

* **Ce qu'elle représente :** Somme des points indexés au-delà des 10 millions inclus par nom de métrique, depuis le début du mois.
* **Réponses aux questions de facturation :**
  * Quel est mon volume total de points indexés facturables jusqu'à présent ce mois-ci ?
  * Quels noms de métriques contribuent à mon volume de points indexés facturables et en quelles quantités ?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_example_08042026.png" alt="Exemple montrant le volume total de points indexés facturables depuis le début du mois" >}}

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_billable_points_bymetric_example_08042026.png" alt="Exemple montrant le volume de points indexés facturables ventilé par nom de métrique" >}}

#### `datadog.estimated_usage.metrics.points.ratio` {#datadogestimated-usagemetricspointsratio}

* **Ce qu'elle représente :** Comparaison du total des points ingérés au total des points indexés.
* **Réponse à la question de facturation :** Quel est le rapport entre les points ingérés et les points indexés ?

{{< img src="/metrics/guide/metric_name_pricing_experience/mnp_eum_points_ratio_example_08042026.png" alt="Exemple montrant le rapport entre les points ingérés et les points indexés" >}}

### Métriques d'utilisation du volume de points {#points-volume-usage-metrics}

Pour une analyse plus granulaire, utilisez les métriques en temps réel et horaires suivantes :

| Métrique | Ce qu'elle représente |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | Points de métrique personnalisés indexés estimés sur une fenêtre glissante de 60 minutes. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | Points de métrique personnalisés indexés estimés sur une fenêtre glissante de 60 minutes, ventilés par tags d'attribution d'utilisation. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | Nombre total estimé de points de métriques personnalisées indexés soumis chaque heure, pour les calculs cumulés depuis le début du mois. |
| `datadog.estimated_usage.metrics.points.ingested` | Nombre estimé de points de métriques personnalisées ingérés sur une fenêtre glissante de 60 minutes. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | Nombre total estimé de points de métriques personnalisées ingérés soumis chaque heure, pour les calculs cumulés depuis le début du mois. |

Pour plus d'informations, consultez [Métriques d'utilisation estimée][6].

## Gérer votre utilisation des métriques {#managing-your-metric-usage}

Pour optimiser votre utilisation avec la tarification par nom de métrique, utilisez les outils suivants :

- **Noms de métriques** : Utilisez le [ filtrage côté Agent][9] pour empêcher l'envoi de métriques personnalisées inutilisées ou indésirables à Datadog, réduisant ainsi le nombre de noms de métriques facturables.
- **Points indexés et ingérés** : Utilisez [Metrics without Limits™][2] pour configurer des listes d'autorisation ou de blocage de tags par métrique, ou [Tag Indexing Rules][10] pour appliquer des configurations de tags à l'échelle de l'organisation sur des groupes de métriques, réduisant ainsi le volume de points indexés et votre surplus par métrique.

## Dépannage {#troubleshooting}

Pour toute question technique, contactez [l'assistance Datadog][7].

Pour toute question relative à la facturation, contactez votre responsable [Customer Success][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/metric_name_pricing/
[2]: /fr/metrics/metrics-without-limits/
[3]: https://app.datadoghq.com/metric/summary
[4]: https://app.datadoghq.com/metric/volume
[5]: https://app.datadoghq.com/billing/usage
[6]: /fr/account_management/billing/usage_metrics/
[7]: /fr/help/
[8]: mailto:success@datadoghq.com
[9]: /fr/metrics/guide/agent-filtering-for-custom-metrics/
[10]: /fr/metrics/guide/tag-indexing-rules/