---
algolia:
  tags:
  - metric name pricing
  - custom metrics
  - estimated usage metrics
description: Découvrez comment l'expérience des métriques personnalisées dans Datadog
  a été mise à jour pour refléter la tarification par nom de métrique, y compris les
  modifications apportées à la fenêtre de gestion des tags, au panneau latéral des
  métriques, à la page de gestion du volume, à la page du plan et de l'utilisation,
  ainsi qu'aux métriques d'utilisation estimées.
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentation
  text: Tarification par nom de métrique pour les métriques personnalisées
- link: /metrics/metrics-without-limits/
  tag: Documentation
  text: Metrics without Limits™
- link: /account_management/billing/usage_metrics/
  tag: Documentation
  text: Métriques d'estimation d'utilisation
- link: /metrics/volume/
  tag: Documentation
  text: Gestion du volume des métriques
title: Modifications de l'expérience des métriques pour la tarification par nom de
  métrique
---
## Aperçu {#overview}

Avec le [modèle de facturation de tarification par nom de métrique][1] pour les métriques personnalisées, Datadog a mis à jour l'expérience des métriques pour refléter la manière dont l'utilisation est mesurée. Ce guide décrit ce qui a changé dans l'interface utilisateur et les API de Datadog pour les organisations utilisant la tarification par nom de métrique.

**Remarque** : Cette page s'applique uniquement si votre organisation utilise [la tarification par nom de métrique][1]. Si votre contrat utilise la tarification par séries temporelles (cardinalité), votre expérience des métriques reste inchangée.

## Résumé des changements {#summary-of-changes}

| Fonctionnalité | Description |
|---------|-------------|
| [Fenêtre de gestion des tags](#manage-tags-modal) | Estime l'impact des modifications de tags sur le volume de points au lieu du volume de cardinalité. |
| [Panneau latéral des métriques](#metric-side-panel) | Affiche le volume de points ingérés et indexés au lieu du volume de séries temporelles. |
| [Page de gestion du volume](#volume-management-page) | Les graphiques d'aperçu du volume affichent de nouvelles dimensions de facturation pour la tarification par nom de métrique. |
| [Page de plan et d'utilisation](#plan--usage-page) | Reflète la répartition de la facturation de la tarification par nom de métrique. |
| [Métriques d'utilisation estimées](#estimated-usage-metrics) | De nouvelles métriques de volume de points remplacent les métriques d'utilisation estimées basées sur la cardinalité. |

## Fenêtre de gestion des tags {#manage-tags-modal}

Lors de la configuration des tags sur les métriques personnalisées, la fenêtre **Gestion des tags** estime l'impact des modifications de tags sur le **volume de points** au lieu du volume de cardinalité.

{{< img src="metrics/guide/metric_name_pricing_experience/manage-tags-modal.png" alt="La fenêtre de gestion des tags affiche un graphique de projection d'utilisation avec trois lignes : utilisation depuis le début du mois, utilisation avec la configuration actuelle et utilisation avec la configuration proposée. Les tags datacenter et service sont configurés dans l'onglet Inclure les tags." style="width:100%;" >}}

Pour plus d'informations sur la configuration des tags, voir [Metrics without Limits™][2].

## Panneau latéral des métriques {#metric-side-panel}

Le panneau latéral des détails des métriques affiche **le volume de points ingérés et indexés** au lieu du volume de séries temporelles.

Pour ouvrir le panneau latéral des métriques, cliquez sur n'importe quel nom de métrique sur la [page Résumé des métriques][3].

{{< img src="metrics/guide/metric_name_pricing_experience/metric-side-panel.png" alt="Le panneau latéral des détails des métriques affiche les POINTS INGÉRÉS et les POINTS INDEXÉS en haut, aux côtés des Hôtes et des Valeurs de Balises." style="width:100%;" >}}

## Page de gestion du volume {#volume-management-page}

Les graphiques de l'aperçu du volume sur la [page de gestion du volume des métriques][4] affichent les nouvelles dimensions de facturation pour la tarification par nom de métrique :

- Noms de métriques uniques estimés
- Volume de points indexés facturables
- Ratio de points ingérés à indexés

{{< img src="metrics/guide/metric_name_pricing_experience/volume-overview-graphs.png" alt="Trois graphiques d'aperçu des volumes pour la tarification par nom de métrique : Noms de métriques uniques estimés (nombre de métriques avec plus de 100 points indexés depuis le début du mois), Points totaux estimés (total des points indexés dépassant l'allocation de 10M par métrique depuis le début du mois), et Ratio estimé de points ingérés à indexés." style="width:100%;" >}}

## Page Plan & Utilisation {#plan-usage-page}

La [page Plan & Utilisation][5] reflète la répartition de la facturation par nom de métrique (Metric Name Pricing) pour les organisations sous le nouveau modèle.

{{< img src="metrics/guide/metric_name_pricing_experience/plan-usage-page.png" alt="La page de répartition des coûts Plan & Utilisation affiche les Points Indexés, les Points Ingérés et les Noms de Métriques comme des éléments distincts dans le tableau Résumé et le graphique de répartition des coûts cumulatifs." style="width:100%;" >}}

## Métriques d'utilisation estimées {#estimated-usage-metrics}

Datadog fournit des métriques d'utilisation estimées afin que vous puissiez surveiller votre utilisation de la tarification par nom de métrique (Metric Name Pricing) en temps réel. Utilisez ces métriques pour configurer des moniteurs et des tableaux de bord pour la visibilité des coûts.

<div class="alert alert-warning">Métriques d'utilisation estimées basées sur la cardinalité (<code>datadog.estimated_usage.metrics.custom</code> et les métriques associées) ne sont plus disponibles pour les organisations utilisant la tarification par nom de métrique. Tous les moniteurs, tableaux de bord ou autres actifs utilisant les métriques basées sur la cardinalité ont cessé de recevoir des données. Utilisez les métriques de points-volume énumérées ci-dessous à la place.</div>

### Métriques d'utilisation facturables {#billable-usage-metrics}

Utilisez ces métriques pour estimer votre utilisation facturable depuis le début du mois :

| Métrique | Ce qu'elle représente |
|--------|-------------------|
| `datadog.estimated_usage.billable.metrics` | Nombre de noms de métriques avec plus de 100 points indexés, depuis le début du mois. |
| `datadog.estimated_usage.billable.points` | Somme des points indexés au-dessus des 10 millions de points inclus par nom de métrique, depuis le début du mois. |
| `datadog.estimated_usage.metrics.points.ratio` | Comparaison des points ingérés totaux aux points indexés totaux. |

### Métriques d'utilisation de points-volume {#points-volume-usage-metrics}

Pour une analyse plus granulaire, utilisez les métriques en temps réel et horaires suivantes :

| Métrique | Ce qu'elle représente |
|--------|-------------------|
| `datadog.estimated_usage.metrics.points.indexed` | Points de métriques personnalisées indexées estimées sur une fenêtre de 60 minutes glissantes. |
| `datadog.estimated_usage.metrics.points.indexed.by_tag` | Points de métriques personnalisées indexées estimées sur une fenêtre de 60 minutes glissantes, décomposés par étiquettes d'attribution d'utilisation. |
| `datadog.estimated_usage.metrics.points.indexed.hourly` | Points de métriques personnalisées indexées estimées soumis chaque heure, pour des calculs cumulés depuis le début du mois. |
| `datadog.estimated_usage.metrics.points.ingested` | Points de métriques personnalisées ingérées estimées sur une fenêtre de 60 minutes glissantes. |
| `datadog.estimated_usage.metrics.points.ingested.hourly` | Points de métriques personnalisées ingérées estimées soumis chaque heure, pour des calculs cumulés depuis le début du mois. |

Pour plus d'informations, consultez [Métriques d'utilisation estimées][6].

## Gestion de votre utilisation des métriques {#managing-your-metric-usage}

Pour optimiser votre utilisation sous la tarification par nom de métrique, utilisez les outils suivants :

- **Noms de métriques** : Utilisez [Filtrage côté agent][9] pour empêcher l'envoi de métriques personnalisées inutilisées ou indésirables à Datadog, réduisant ainsi le nombre de noms de métriques facturables.
- **Points indexés et ingérés** : Utilisez [Métriques sans limites™][2] pour configurer des listes d'autorisation ou de blocage par métrique, ou [Règles d'indexation des étiquettes][10] pour appliquer des configurations d'étiquettes à l'échelle de l'organisation à travers les groupes de métriques, réduisant le volume de points indexés et votre dépassement par métrique.

## Dépannage {#troubleshooting}

Pour toute question technique, contactez [l'assistance Datadog][7].

Pour toute question concernant la facturation, contactez votre Customer Success Manager.

## Lectures complémentaires {#further-reading}

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