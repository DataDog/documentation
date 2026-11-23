---
algolia:
  tags:
  - metrics without limits
aliases:
- /fr/metrics/faq/metrics-without-limits/
- /fr/metrics/guide/metrics-without-limits-getting-started/
- /fr/metrics/faq/why-is-my-save-button-disabled/
description: Dissociez l'ingestion et l'indexation des Custom Metrics pour contrôler
  les volumes et les coûts en sélectionnant les tags qui doivent rester interrogeables.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Contrôlez de façon dynamique le volume de vos Custom Metrics grâce à Metrics
    without Limits™
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Rejoignez une session interactive pour libérer tout le potentiel des métriques
title: Metrics without Limits™
---
## Présentation {#overview}

Metrics without Limits™ vous offre flexibilité et contrôle sur vos volumes de Custom Metrics en dissociant l'ingestion et l'indexation des Custom Metrics. Vous ne payez que pour les tags de Custom Metrics qui sont utiles à votre organisation.

Metrics without Limits™ vous permet de configurer les tags sur tous les types de métriques directement dans l'application en sélectionnant une liste d'autorisation de tags qui resteront interrogeables dans tout Datadog ; cela supprime automatiquement les tags non essentiels attachés aux métriques au niveau de l'application ou de l'entreprise (par exemple, `host`). Vous pouvez également configurer dans l'application une liste de blocage de tags à supprimer et à exclure ; les tags essentiels restants, qui apportent une valeur métier à vos équipes, sont ainsi automatiquement conservés. Vous pouvez configurer les deux sur la [page Metrics Catalog][1].

Cette page identifie les composants clés de Metrics without Limits™ qui peuvent vous aider à gérer vos volumes de Custom Metrics dans le respect de votre budget d'observabilité.

### Configuration des tags pour une métrique unique {#configuration-of-tags-for-a-single-metric}

#### Liste d'autorisation de tags {#allowlist-of-tags}

1. Cliquez sur le nom d'une métrique pour ouvrir son panneau latéral de détails. 
2. Cliquez sur {{< ui >}}Manage Tags{{< /ui >}}, puis sur {{< ui >}}Include tags{{< /ui >}} pour configurer les tags que vous souhaitez garder interrogeables dans les dashboards, notebooks, monitors et autres produits Datadog.
3. Définissez votre liste d'autorisation de tags. 
Par défaut, la fenêtre modale de configuration des tags est pré-remplie avec une liste d'autorisation de tags recommandée par Datadog, correspondant aux tags activement interrogés dans les dashboards, notebooks, monitors ou via l'API au cours des 30 derniers jours. Les tags recommandés sont identifiés par une icône de graphique linéaire. 
   a. De plus, incluez les tags utilisés sur les ressources (dashboards, monitors, notebooks et SLO). Ces tags sont utilisés sur des ressources mais ne sont pas activement interrogés ; ils sont marqués d'une icône de cible. Les ajouter vous permet de ne pas perdre de visibilité sur vos ressources critiques. 
4. Examinez le *Estimated New Volume* de Custom Metrics indexées résultant de cette configuration potentielle de tags.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuration des tags avec liste d'autorisation" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Montrer aux clients qu'ils peuvent ajouter des tags utilisés sur des ressources dans leur configuration MWL" style="width:100%" >}}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les API Metrics.

#### Liste de blocage de tags {#blocklist-of-tags}

1. Cliquez sur n'importe quel nom de métrique pour ouvrir son panneau latéral de détails.
2. Cliquez sur {{< ui >}}Manage Tags{{< /ui >}}, puis sur {{< ui >}}Exclude Tags{{< /ui >}}. 
3. Définissez votre liste de blocage de tags. Les tags définis dans la liste de blocage ne sont **pas** interrogeables sur les dashboards et les monitors. Les tags ayant fait l'objet de requêtes actives sur les dashboards, les notebooks, les monitors et via l'API au cours des 30 derniers jours sont distingués par une icône de graphique linéaire.
4. Examinez le *Estimated New Volume* de Custom Metrics indexées résultant de cette configuration potentielle de tags.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuration des tags avec exclusion de tags" video=true style="width:100%" >}}

Définissez le paramètre `exclude_tags_mode: true` sur l'API Metrics pour [créer][2] et [modifier][3] une liste de blocage de tags.

**Remarque :** Pour gérer les tags sur une métrique, celle-ci doit avoir un type déclaré. Le type est généralement déclaré lors de la soumission de la métrique, mais vous pouvez également le définir manuellement avec le bouton {{< ui >}}Edit{{< /ui >}} pour la métrique sur la page Metrics Catalog.

#### Utilisez l'API {#use-the-api}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les API Metrics.

### Configurez plusieurs métriques à la fois {#configure-multiple-metrics-at-a-time}

Pour configurer des tags sur plusieurs métriques, comme toutes les métriques d'un espace de nommage, utilisez les [Tag Indexing Rules][16]. Les Tag Indexing Rules s'appliquent aux noms de métriques, aux espaces de nommage ou à toutes les Custom Metrics, et régissent automatiquement les nouvelles métriques correspondantes. Les configurations Metrics without Limits™ existantes prévalent sur les règles d'indexation des tags.

Pour gérer les Tag Indexing Rules par programmation, utilisez l'[API Tag Indexing Rules][17].

## Facturation Metrics without Limits™ {#metrics-without-limits-billing}

La configuration de vos tags vous permet de contrôler quelles Custom Metrics peuvent être interrogées, ce qui réduit le nombre de Custom Metrics qui vous sont facturées. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Vous pouvez continuer à envoyer toutes vos données à Datadog (tout est ingéré) et définir une liste d'autorisation de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Si le volume de données que Datadog ingère pour vos métriques configurées diffère du volume plus petit restant que vous indexez, vous pouvez voir deux volumes distincts sur votre page Usage ainsi que sur la page Metrics Catalog.

- {{< ui >}}Ingested Custom Metrics{{< /ui >}} : Le volume initial de Custom Metrics basé sur tous les tags ingérés.
- {{< ui >}}Indexed Custom Metrics{{< /ui >}} : Le volume de Custom Metrics qui reste interrogeable sur la plateforme Datadog (selon les configurations Metrics without Limits™).

**Remarque : Avec la tarification par cardinalité, seules les métriques configurées contribuent à votre volume Ingested custom metrics.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous n'êtes facturé que pour son volume de Custom Metrics indexées.

En savoir plus sur la [facturation des Custom Metrics][8].

### Avec la tarification par Metric Name {#under-metric-name-pricing}

Si votre organisation utilise la [tarification par Metric Name][15] au lieu de la tarification par cardinalité, la relation entre les données ingérées et indexées fonctionne différemment :

| Aspect                                       | Tarification par cardinalité                                              | Tarification par Metric Name                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Métriques contribuant au volume ingéré   | Uniquement les métriques configurées avec Metrics without Limits™             | Toutes les métriques (chaque point de données soumis)                                              |
| Multiplicateur de métrique de distribution               | Le comportement dépend de la configuration Metrics without Limits™        | S'applique à la fois aux données ingérées et indexées, quelle que soit la configuration                     |

Pour plus de détails sur le modèle, consultez [Tarification par Metric Name pour les Custom Metrics][15].

## Bien démarrer avec Metrics without Limits™ {#getting-started-with-metrics-without-limits}

1. Identifiez vos 20 principales métriques sur votre [page Plan & Usage][9], puis configurez-les depuis la page Metrics Catalog ou en utilisant l'[API][2].
   Pour configurer des tags sur plusieurs métriques, utilisez les [Tag Indexing Rules][16].

**Remarque :** Si vous utilisez la [Create Tag Configuration API][2], utilisez d'abord la [tag configuration cardinality estimator API][5] pour vérifier l'impact potentiel de vos configurations de tags avant de les créer. Si l'interface utilisateur ou l'API d'estimation renvoie un nombre résultant de métriques indexées supérieur à celui des métriques ingérées, n'enregistrez pas votre configuration de tags.

2. Désindexez les tags de vos métriques non interrogées.

   À mesure que vos équipes continuent de nettoyer les métriques bruyantes qui ne sont jamais interrogées sur la plateforme Datadog, vous pouvez minimiser les coûts de ces métriques non interrogées en désindexant leurs tags. Les tags désindexés ne sont plus interrogeables, mais Datadog continue de les ingérer. Pour désindexer des tags sur de nombreuses métriques non interrogées, créez une [Tag Indexing Rule][16] limitée à leurs noms de métriques ou espaces de noms. Pour configurer une seule métrique, attribuez-lui une liste d'autorisation de tags vide.

3. Examinez votre utilisation et votre facturation. Après avoir configuré vos métriques, vous pouvez vérifier l'impact de vos modifications de trois manières : 

   - Avant d'enregistrer votre configuration, l'estimateur de cardinalité de la configuration des tags renvoie une estimation du nombre de Custom Metrics indexées après configuration, qui devrait être inférieur au volume de Custom Metrics ingérées.
   - Après avoir enregistré votre configuration, le panneau latéral des détails de la métrique sur la page Metrics Catalog doit indiquer que le volume de Custom Metrics indexées est inférieur à celui des Custom Metrics ingérées.
   - 24 heures après avoir enregistré votre configuration, vous pouvez également visualiser l'impact dans le tableau {{< ui >}}Top Custom Metrics{{< /ui >}} de la page Plan & Usage. Le volume de Custom Metrics devrait diminuer entre l'onglet {{< ui >}}Month-to-Date{{< /ui >}} et l'onglet {{< ui >}}Most Recent Day{{< /ui >}} de ce tableau.

## Bonnes pratiques {#best-practices}

- Vous pouvez configurer des Alerts sur votre métrique d'[utilisation estimée des Custom Metrics][10] en temps réel afin de corréler les pics de Custom Metrics avec les configurations.

- Le [contrôle d'accès basé sur les rôles][11] pour Metrics without Limits™ permet également de définir quels utilisateurs sont autorisés à utiliser cette fonctionnalité, qui a des conséquences sur la facturation.

- Les événements d'audit vous permettent de suivre les configurations de tags et les agrégations de centiles susceptibles d'être corrélées à des pics de Custom Metrics. Recherchez « tags:audit » et « queryable tag configuration » ou « percentile aggregations » dans votre [Events Stream][12].

\*Metrics without Limits est une marque de Datadog, Inc.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/catalog
[2]: /fr/api/latest/metrics/#create-a-tag-configuration
[3]: /fr/api/latest/metrics/#update-a-tag-configuration
[4]: /fr/api/latest/metrics/#delete-a-tag-configuration
[5]: /fr/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /fr/metrics/#time-and-space-aggregation
[8]: /fr/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /fr/account_management/billing/usage_metrics/
[11]: /fr/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[15]: /fr/account_management/billing/metric_name_pricing/
[16]: /fr/metrics/guide/tag-indexing-rules/
[17]: /fr/api/latest/metrics/#create-a-tag-indexing-rule