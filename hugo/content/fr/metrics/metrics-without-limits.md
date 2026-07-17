---
algolia:
  tags:
  - metrics without limits
aliases:
- /fr/metrics/faq/metrics-without-limits/
- /fr/metrics/guide/metrics-without-limits-getting-started/
- /fr/metrics/faq/why-is-my-save-button-disabled/
description: Dissociez l'ingestion et l'indexation des métriques personnalisées pour
  contrôler les volumes et les coûts en sélectionnant les tags qui restent interrogeables.
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: Blog
  text: Contrôler de façon dynamique le volume des métriques custom grâce à Metrics
    without Limits™
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Rejoignez une session interactive pour débloquer le plein potentiel des métriques.
title: Metrics without Limits™
---
## Aperçu {#overview}

Metrics without Limits™ vous offre une flexibilité et un contrôle sur les volumes de vos métriques personnalisées en découplant l'ingestion et l'indexation de ces métriques. Vous ne payez que pour les tags de métriques personnalisées qui sont précieux pour votre organisation.

Metrics without Limits™ vous permet de configurer des tags sur tous les types de métriques dans l'application en sélectionnant une liste autorisée de tags à conserver interrogeables dans Datadog ; cela supprime automatiquement les tags non essentiels attachés aux métriques au niveau de l'application ou aux métriques commerciales (par exemple, `host`). Alternativement, vous pouvez configurer une liste de blocage de tags dans l'application pour supprimer et exclure des tags ; cela conserve automatiquement les tags essentiels restants qui apportent de la valeur commerciale à vos équipes. Ces fonctionnalités de configuration se trouvent sur la page [Résumé des métriques][1].

Cette section présente les fonctionnalités clés de Metrics without Limits™ susceptibles de faciliter la gestion de vos volumes de métriques custom et le respect de votre budget d'observabilité.

### Configuration des tags pour une seule métrique {#configuration-of-tags-for-a-single-metric}

#### Liste autorisée des tags {#allowlist-of-tags}

1. Cliquez sur n'importe quel nom de métrique pour ouvrir son panneau latéral de détails. 
2. Cliquez sur **Gérer les tags**, puis **Inclure des tags** pour configurer les tags que vous souhaitez conserver comme interrogeables dans les tableaux de bord, les carnets, les moniteurs et d'autres produits Datadog.
3. Définissez votre liste autorisée de tags. 
Par défaut, la fenêtre de configuration des tags se préremplit avec une liste autorisée de tags recommandée par Datadog qui ont été activement interrogés sur les tableaux de bord, les carnets, les moniteurs ou via l'API au cours des 30 derniers jours. Les tags recommandés sont distingués par une icône de graphique linéaire. 
   a.De plus, incluez des tags qui sont utilisés sur des actifs (tableaux de bord, moniteurs, carnets et SLOs). Ces tags sont utilisés sur des actifs mais ne sont pas activement interrogés et sont marqués par une icône de cible. Les ajouter garantit que vous ne perdez pas de visibilité sur vos actifs critiques. 
4. Examinez le *Volume Nouveau Estimé* des métriques personnalisées indexées qui résultent de cette configuration potentielle de tags.
5. Cliquez sur **Enregistrer**.

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="Configuration des tags avec liste autorisée" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="Montrer aux clients qu'ils peuvent ajouter des tags utilisés sur les actifs dans leur configuration MWL" style="width:100%" >}}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les API de métriques.

#### Liste de blocage des tags {#blocklist-of-tags}

1. Cliquez sur n'importe quel nom de métrique pour ouvrir son panneau latéral de détails.
2. Cliquez sur **Gérer les tags**, puis **Exclure les tags**. 
3. Définissez votre liste de blocage de tags. Les tags définis dans la liste de blocage ne sont **pas** interrogeables sur les tableaux de bord et les moniteurs. Les tags qui ont été activement interrogés sur les tableaux de bord, les carnets, les moniteurs et via l'API au cours des 30 derniers jours sont distingués par une icône de graphique linéaire.
4. Examinez le *Volume nouveau estimé* des métriques personnalisées indexées qui résultent de cette configuration potentielle de tags.
5. Cliquez sur **Enregistrer**.

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="Configuration des tags avec exclusion de tags" video=true style="width:100%" >}}

Définissez le paramètre `exclude_tags_mode: true` sur l'API Metrics pour [créer][2] et [modifier][3] une liste de blocage de tags.

**Remarque&nbsp;:** Pour que les balises soient gérées sur une métrique, la métrique doit avoir un type déclaré. Cela se fait généralement lors de la soumission d'une métrique, mais peut également être fait manuellement en utilisant le `Edit` bouton pour une métrique dans le résumé des métriques.

#### Utilisez l'API {#use-the-api}

Vous pouvez [créer][2], [modifier][3], [supprimer][4] et [estimer l'impact][5] de votre configuration de tags via les API de métriques.

### Configurer plusieurs métriques à la fois {#configure-multiple-metrics-at-a-time}

Optimisez vos volumes de métriques personnalisées en utilisant la [fonctionnalité de configuration de tags de métriques en masse][7]. Pour spécifier les métriques à configurer, cliquez sur **Configurer les métriques**, puis **Gérer les tags*** sur la page de résumé des métriques. Sélectionnez la métrique ou l'espace de noms de métrique que vous souhaitez configurer, puis choisissez de faire l'une des actions suivantes :
   - [Autoriser tous les tags](#allow-all-tags) à remplacer toute configuration de tag précédente et à rendre tous les tags interrogeables.
   - [Inclure ou exclure des tags](#include-or-exclude-tags) pour définir respectivement des tags interrogeables et non interrogeables.

#### Autoriser tous les tags {#allow-all-tags}

{{< img src="metrics/bulk_allow_all_tags.png" alt="L'option Gérer les tags avec Autoriser tous les tags sélectionné dans la section Configurer les tags" style="width:100%" >}}

Cette option est sélectionnée par défaut et remplace les configurations de tag précédemment définies pour rendre tous les tags interrogeables.

#### Inclure ou exclure des tags {#include-or-exclude-tags}

Lors de la sélection des tags à inclure ou à exclure, choisissez soit de [remplacer les configurations de tag existantes](#override-existing-tag-configurations), soit de [conserver les configurations de tag existantes](#keep-existing-tag-configurations).

##### Remplacer les configurations de tag existantes {#override-existing-tag-configurations}

{{< img src="metrics/bulk_include_tags.png" alt="L'option Gérer les tags avec Inclure des tags et Remplacer sélectionné dans la section Configurer les tags. Les options pour inclure des tags activement interrogés sur les tableaux de bord et les moniteurs des 90 derniers jours et des tags spécifiques sont sélectionnées" style="width:100%" >}}

Toutes les configurations de tag existantes pour les métriques sélectionnées sont remplacées, et vous définissez une nouvelle configuration de tag. Cela vous permet de rendre tous les tags interrogeables sur tous les noms de métriques. Si vous choisissez d'**inclure des tags**, vous pouvez sélectionner d'inclure soit l'un, soit les deux éléments suivants :
   - Tags activement interrogés dans Datadog au cours des 30, 60 ou 90 derniers jours.
   - Un ensemble spécifique de tags que vous définissez.

##### Conserver les configurations de tag existantes {#keep-existing-tag-configurations}

{{< img src="metrics/bulk_exclude_tags.png" alt="L'option Gérer les tags avec Exclure des tags et Conserver sélectionné dans la section Configurer les tags" style="width:100%" >}}

Les configurations de tag existantes sont conservées, et vous définissez de nouveaux tags à ajouter à la configuration.

#### Utiliser l'API {#use-the-api-1}

Vous pouvez [configurer][13] et [supprimer][14] des tags pour plusieurs métriques via l'API.

**Remarque** : Utilisez l'attribut `include_actively_queried_tags_window` pour inclure uniquement les tags activement interrogés dans un cadre temporel donné.

## Facturation Metrics without Limits™ {#metrics-without-limits-billing}

La configuration de vos tags vous donne le contrôle sur les métriques personnalisées pouvant être interrogées, réduisant ainsi finalement votre nombre de métriques personnalisées facturables. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Vous pouvez continuer à envoyer à Datadog toutes vos données (tout est ingéré) et vous pouvez spécifier une liste autorisée de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Si le volume de données que Datadog ingère pour vos métriques configurées diffère du volume plus petit restant que vous indexez, vous pouvez voir deux volumes distincts sur votre page d'utilisation ainsi que sur la page de résumé des métriques. 

- **Métriques personnalisées ingérées** : Le volume original de métriques personnalisées basé sur tous les tags ingérés.
- **Métriques personnalisées indexées** : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (basé sur toute configuration Metrics without Limits™).

**Remarque : Dans le cadre de la tarification par cardinalité, seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous ne serez facturé que pour son volume de métriques personnalisées indexées.

En savoir plus sur la [facturation des métriques custom][8].

### Sous la tarification par nom de métrique {#under-metric-name-pricing}

Si votre organisation utilise la [tarification par nom de métrique][15] au lieu de la tarification par cardinalité, la relation ingérée par rapport à indexée fonctionne différemment :

| Aspect                                       | Tarification par cardinalité                                              | Tarification par nom de métrique                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| Métriques qui contribuent au volume ingéré   | Seules les métriques configurées avec Metrics without Limits™             | Toutes les métriques (chaque point de données soumis)                                              |
| Multiplicateur de métriques de distribution               | Le comportement dépend de la configuration de Metrics without Limits™        | S'applique à la fois aux métriques ingérées et indexées, quelle que soit la configuration                     |

Pour des détails complets sur le modèle, voir [Tarification par nom de métrique pour les métriques personnalisées][15].

## Commencer avec Metrics without Limits™ {#getting-started-with-metrics-without-limits}

1. Configurez vos 20 principales métriques sur votre [page Plan & Utilisation][9] depuis la page de résumé des métriques ou en utilisant l'[API][2].
   Vous pouvez utiliser la configuration de métriques en masse (`*` syntaxe) pour configurer des tags sur plusieurs métriques. Datadog vous prévient lorsque la tâche de configuration groupée est terminée.

**Remarque:** Si vous utilisez l'[API de création de configuration de tags][2], utilisez d'abord l'[API d'estimation de cardinalité de configuration de tags][5] pour valider l'impact potentiel de vos configurations de tags avant de créer des configurations de tags. Si l'interface utilisateur ou l'API d'estimation renvoie un nombre d'indexés résultant qui est supérieur à celui ingéré, ne sauvegardez pas votre configuration de balises.

2. Configurez vos métriques non interrogées avec des configurations de balises vides.

   Au fur et à mesure que vos équipes continueront à filtrer les métriques inutiles qui ne sont jamais interrogées sur la plateforme Datadog, en leur attribuant une liste d'autorisation sans le moindre tag, vos coûts diminueront progressivement. 

3. Examinez votre utilisation et votre facturation. Après avoir configuré vos métriques, l'impact de vos modifications peut être validé de trois manières : 

   - Avant de sauvegarder votre configuration, l'estimateur de cardinalité de configuration de balises renvoie le nombre estimé de métriques personnalisées indexées qui devrait être inférieur à vos volumes de métriques personnalisées ingérées.
   - Après avoir sauvegardé votre configuration, le panneau latéral des détails du Résumé des Métriques devrait montrer que vos métriques personnalisées indexées sont inférieures à votre volume de métriques personnalisées ingérées.
   - 24 heures après avoir sauvegardé votre configuration, vous pouvez également voir l'impact sur la page Plan & Usage dans le tableau **Top Custom Metrics**. Il devrait y avoir une réduction du volume de métriques personnalisées entre l'onglet **Month-to-Date** et l'onglet **Most Recent Day** de ce tableau.

## Meilleures pratiques {#best-practices}

- Vous pouvez configurer des alertes sur votre métrique en temps réel [estimated custom metrics usage][10] afin de pouvoir corréler les pics de métriques personnalisées avec les configurations.

- [Role based access control][11] pour Metrics without Limits™ est également disponible pour contrôler quels utilisateurs ont les autorisations d'utiliser cette fonctionnalité qui a des implications de facturation.

- Les événements d'audit vous permettent de suivre toute configuration de balises ou agrégations de percentiles qui ont été effectuées et qui peuvent être corrélées avec des pics de métriques personnalisées. Recherchez "tags:audit" et "configuration de balises interrogeables" ou "agrégations de percentiles" sur votre [Events Stream][12].

\*Metrics without Limits est une marque déposée de Datadog, Inc.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/api/latest/metrics/#create-a-tag-configuration
[3]: /fr/api/latest/metrics/#update-a-tag-configuration
[4]: /fr/api/latest/metrics/#delete-a-tag-configuration
[5]: /fr/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /fr/metrics/#time-and-space-aggregation
[7]: /fr/metrics/summary/#configuration-of-multiple-metrics
[8]: /fr/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /fr/account_management/billing/usage_metrics/
[11]: /fr/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /fr/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /fr/api/latest/metrics/#delete-tags-for-multiple-metrics
[15]: /fr/account_management/billing/metric_name_pricing/