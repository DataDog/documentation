---
algolia:
  tags:
  - metrics without limits
aliases:
- /fr/metrics/faq/metrics-without-limits/
- /fr/metrics/guide/metrics-without-limits-getting-started/
- /fr/metrics/faq/why-is-my-save-button-disabled/
description: Dissociez l'ingestion et l'indexation des métriques personnalisées pour
  contrôler les volumes et les coûts en sélectionnant les tags qui doivent rester
  interrogeables.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Contrôlez dynamiquement le volume de vos métriques personnalisées avec Metrics
    without Limits™.
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Rejoignez une session interactive pour libérer tout le potentiel des métriques.
title: Metrics without Limits™
---
## Présentation {#overview}

Metrics without Limits™ vous donne plus de flexibilité et de contrôle sur les volumes de vos métriques personnalisées en dissociant l'ingestion et l'indexation de ces métriques. Vous ne payez que pour les tags de métriques personnalisées qui sont utiles à votre organisation.

Metrics without Limits™ vous permet de configurer les tags sur tous les types de métriques directement dans l'application en sélectionnant une liste d'autorisation de tags qui resteront interrogeables dans tout Datadog ; cela supprime automatiquement les tags non essentiels associés aux métriques au niveau de l'application ou de l'entreprise (par exemple, `host`). Vous pouvez également configurer dans l'application une liste de blocage de tags à supprimer et à exclure ; les autres tags essentiels, qui apportent une valeur métier à vos équipes, sont alors conservés automatiquement. Ces fonctionnalités de configuration se trouvent sur la page [Metrics Summary][1].

Cette page identifie les composants clés de Metrics without Limits™ qui peuvent vous aider à gérer les volumes de vos métriques personnalisées dans le respect de votre budget d'observabilité.

### Configuration des tags pour une métrique unique {#configuration-of-tags-for-a-single-metric}

#### Liste d'autorisation de tags {#allowlist-of-tags}

1. Cliquez sur le nom d'une métrique pour ouvrir son panneau latéral de détails. 
2. Cliquez sur {{< ui >}}Manage Tags{{< /ui >}}, puis sur {{< ui >}}Include tags{{< /ui >}} pour configurer les tags que vous souhaitez garder interrogeables dans les dashboards, les notebooks, les monitors et les autres produits Datadog.
3. Définissez votre liste d'autorisation de tags. 
Par défaut, la fenêtre modale de configuration des tags est pré-remplie avec une liste d'autorisation de tags recommandée par Datadog, correspondant aux tags ayant fait l'objet de requêtes actives dans des dashboards, des notebooks, des monitors ou via l'API au cours des 30 derniers jours. Les tags recommandés sont signalés par une icône de graphique linéaire. 
   a.De plus, incluez les tags utilisés sur des ressources (dashboards, monitors, notebooks et SLO). Ces tags sont utilisés sur des ressources mais ne font pas l'objet de requêtes actives ; ils sont signalés par une icône de cible. L'ajout de ces tags garantit que vous ne perdez pas de visibilité sur vos ressources critiques. 
4. Examinez le *Estimated New Volume* des métriques personnalisées indexées qui résulterait de cette configuration de tags.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuration des tags avec liste d'autorisation" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Montrer aux clients qu'ils peuvent ajouter des tags utilisés sur des ressources dans leur configuration MWL" style="width:100%" >}}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les Metrics APIs.

#### Liste de blocage des tags {#blocklist-of-tags}

1. Cliquez sur le nom d'une métrique pour ouvrir son panneau latéral de détails.
2. Cliquez sur {{< ui >}}Manage Tags{{< /ui >}}, puis sur {{< ui >}}Exclude Tags{{< /ui >}}. 
3. Définissez votre liste de blocage de tags. Les tags définis dans la liste de blocage ne sont **pas** interrogeables dans les dashboards et les monitors. Les tags ayant fait l'objet de requêtes actives dans des dashboards, des notebooks, des monitors ou via l'API au cours des 30 derniers jours sont signalés par une icône de graphique linéaire.
4. Examinez le *Estimated New Volume* des métriques personnalisées indexées qui résulterait de cette configuration de tags.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuration des tags avec exclusion de tags" video=true style="width:100%" >}}

Définissez le paramètre `exclude_tags_mode: true` dans l'API Metrics pour [créer][2] et [modifier][3] une liste de blocage de tags.

**Remarque :** Pour que les tags puissent être gérés sur une métrique, celle-ci doit avoir un type déclaré. Cela se fait généralement lors de la soumission d'une métrique, mais peut également être effectué manuellement à l'aide du bouton {{< ui >}}Edit{{< /ui >}} pour une métrique dans Metrics Summary.

#### Utilisez l'API {#use-the-api}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les Metrics APIs.

### Configurez plusieurs métriques à la fois {#configure-multiple-metrics-at-a-time}

Pour configurer des tags sur de nombreuses métriques à la fois, utilisez [Tag Indexing Rules][16]. Une règle de tag applique une liste d'autorisation ou de blocage de tags à chaque métrique correspondant à un nom ou un préfixe de métrique, y compris les métriques soumises après la création de la règle.

## Facturation Metrics without Limits™ {#metrics-without-limits-billing}

La configuration de vos tags vous donne le contrôle sur les métriques personnalisées pouvant être interrogées, ce qui réduit, au final, votre nombre de métriques personnalisées facturables. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Vous pouvez continuer à envoyer toutes vos données à Datadog (tout est ingéré) et spécifier une liste d'autorisation de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Si le volume de données que Datadog ingère pour vos métriques configurées diffère du volume plus faible des données restantes que vous indexez, vous pouvez voir ces deux volumes distincts sur la page Usage ainsi que sur la page Metrics Summary. 

- {{< ui >}}Ingested Custom Metrics{{< /ui >}} : Le volume initial de métriques personnalisées basé sur tous les tags ingérés.
- {{< ui >}}Indexed Custom Metrics{{< /ui >}} : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (basé sur toute configuration Metrics without Limits™).

**Remarque : Dans le cadre de la tarification par cardinalité, seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous n'êtes facturé que pour son volume de métriques personnalisées indexées.

En savoir plus sur la [facturation des métriques personnalisées][8].

### Dans le cadre de la tarification par nom de métrique {#under-metric-name-pricing}

Si votre organisation utilise la [tarification par nom de métrique][15] au lieu de la tarification par cardinalité, la relation entre les données ingérées et indexées fonctionne différemment :

| Aspect                                       | Tarification par cardinalité                                              | Tarification par nom de métrique                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Métriques contribuant au volume ingéré   | Uniquement les métriques configurées avec Metrics without Limits™             | Toutes les métriques (chaque point de données soumis)                                              |
| Multiplicateur de métrique de distribution               | Le comportement dépend de la configuration Metrics without Limits™        | S'applique à la fois aux données ingérées et indexées, quelle que soit la configuration                     |

Pour plus de détails sur le modèle, consultez [Tarification par nom de métrique pour les métriques personnalisées][15].

## Bien démarrer avec Metrics without Limits™ {#getting-started-with-metrics-without-limits}

1. Configurez vos 20 principales métriques sur votre [page Plan & Usage][9] depuis la page Metrics Summary ou à l'aide de l'[API][2].
   Pour configurer des tags sur plusieurs métriques à la fois, créez une [Tag Indexing Rule][16] limitée à un préfixe de nom de métrique.

**Remarque :** Si vous utilisez la [Create Tag Configuration API][2], utilisez d'abord la [tag configuration cardinality estimator API][5] pour valider l'impact potentiel de vos configurations de tags avant de les créer. Si l'interface utilisateur ou l'API d'estimation renvoie un nombre de métriques indexées supérieur au nombre de métriques ingérées, n'enregistrez pas votre configuration de tags.

2. Configurez vos métriques non interrogées avec des configurations de tags vides.

   Alors que vos équipes continuent de faire le ménage parmi les métriques générant du bruit qui ne sont jamais interrogées sur la plateforme Datadog, vous pouvez instantanément minimiser les coûts de ces métriques non interrogées en les configurant avec une liste d'autorisation de tags vide. 

3. Examinez votre utilisation et votre facturation. Après avoir configuré vos métriques, l'impact de vos modifications peut être validé de trois manières : 

   - Avant d'enregistrer votre configuration, l'estimateur de cardinalité de la configuration des tags renvoie une estimation du nombre de métriques personnalisées indexées qui en résultera, lequel devrait être inférieur au nombre de métriques personnalisées ingérées.
   - Après avoir enregistré votre configuration, le panneau latéral des détails de Metrics Summary devrait montrer que le nombre de métriques personnalisées indexées est inférieur au volume de métriques personnalisées ingérées.
   - 24 heures après avoir enregistré votre configuration, vous pouvez également consulter l'impact dans le tableau {{< ui >}}Top Custom Metrics{{< /ui >}} de votre page Plan & Usage. Il devrait y avoir une réduction du volume de métriques personnalisées entre l'onglet {{< ui >}}Month-to-Date{{< /ui >}} et l'onglet {{< ui >}}Most Recent Day{{< /ui >}} de ce tableau.

## Bonnes pratiques {#best-practices}

- Vous pouvez configurer des alertes sur votre métrique [d'utilisation estimée des métriques personnalisées][10] en temps réel afin de pouvoir corréler les pics de métriques personnalisées avec les configurations.

- Le [contrôle d'accès basé sur les rôles][11] est également disponible pour Metrics without Limits™ afin de définir quels utilisateurs peuvent accéder à cette fonctionnalité, qui a une incidence sur la facturation.

- Les événements d'audit vous permettent de suivre toutes les configurations de tags ou agrégations de centiles effectuées qui peuvent être corrélées avec des pics de métriques personnalisées. Recherchez « tags:audit » et « queryable tag configuration » ou « percentile aggregations » dans votre [Events Stream][12].

\*Metrics without Limits est une marque de Datadog, Inc.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
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