---
description: Appliquez les meilleures pratiques en matière de visibilité, d'attribution
  et de prévention pour gérer les volumes et les coûts des métriques personnalisées.
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentation
  text: En savoir plus sur métriques personnalisées
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des métriques personnalisées
- link: /metrics/metrics-without-limits/
  tag: Documentation
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: Documentation
  text: Gestion du volume de métriques
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: Blog
  text: Bonnes pratiques pour la gouvernance de bout en bout des métriques personnalisées
- link: https://www.datadoghq.com/blog/govern-custom-metrics/
  tag: Blog
  text: Guide d'un ingénieur FinOps pour la gouvernance des métriques personnalisées
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: Centre d'apprentissage
  text: Gouvernance des métriques
title: Meilleures pratiques pour la gouvernance des métriques personnalisées
---
## Présentation {#overview}

Les applications basées sur le cloud peuvent générer des quantités massives de données et des coûts d'observabilité élevés, ce qui finit par pousser les organisations à réduire ce poste budgétaire. Pour réduire les coûts d'observabilité, de nombreuses équipes ont recours à la collecte d'un nombre réduit de métriques ; cependant, pour les équipes SRE et d'observabilité centralisées, une gouvernance efficace des métriques personnalisées devrait accroître l'efficacité de la surveillance plutôt que de supprimer totalement la visibilité.

Ce guide présente les meilleures pratiques pour gérer les volumes de vos métriques personnalisées grâce aux trois composantes clés d'une gouvernance efficace des métriques : **Visibilité et attribution**, **Gouvernance opérationnelle des métriques personnalisées** et **Surveillance et prévention**. Apprenez à utiliser les outils Datadog disponibles pour maintenir une observabilité rentable pour ces composantes clés :
- [Déterminez quelles métriques vous utilisez, dans quelle mesure et à quel coût](#visibility-and-attribution)
- [Identifiez vos principaux facteurs de coûts](#account-level-visibility)
- [Attribuez vos principaux facteurs de coûts aux équipes ou services qui en sont responsables](#team-level-visibility-and-attribution)
- [Réduisez les coûts liés aux métriques inutilisées ou moins utiles](#value-based-metrics-governance)
- [Surveillez et contrôlez l'utilisation avant que des frais supplémentaires ne soient facturés](#monitoring-and-prevention)

Consultez cette [visite interactive][17] des outils de gouvernance des métriques personnalisées de Datadog. 

## Prérequis {#prerequisites}

<div class="alert alert-danger">Certaines fonctionnalités du produit nécessitent un accès Administrator.</div> 

{{< whatsnext desc="Ce guide suppose que vous avez une compréhension des concepts suivants relatifs aux métriques personnalisées :" >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}Ce qui est considéré comme une métrique personnalisée{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}Comment les métriques personnalisées sont facturées{{< /nextlink >}}
{{< /whatsnext >}}


## Visibilité et attribution {#visibility-and-attribution}

La première étape pour gérer les volumes et les coûts de vos métriques personnalisées consiste à identifier les principaux facteurs de coûts liés aux métriques et à déterminer qui en est responsable. 

Suivez les étapes de cette section pour examiner l'utilisation mensuelle totale des métriques de votre compte et consulter la répartition de cette utilisation par équipe ou selon la clé de tag sélectionnée.

### Visibilité au niveau du compte {#account-level-visibility}

<div class="alert alert-danger">Vous devez disposer du <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> pour accéder à la page Plan & Usage.</div>

La page [Plan and Usage][1] vous fournit un résumé prêt à l'emploi de l'utilisation mensuelle facturable des métriques personnalisées de votre compte, avec des informations détaillées sur vos coûts, votre rythme de dépenses et les noms des principales métriques personnalisées.

   1. Depuis la [page Plan & Usage][2], faites défiler la page vers le bas jusqu'à la section *Usage Summary*.
   1. Cliquez sur l'onglet {{< ui >}}Custom Metrics{{< /ui >}} pour afficher l'utilisation des métriques personnalisées facturables de votre organisation, les tendances d'utilisation et les noms des principales métriques personnalisées.
   1. Faites défiler la page vers le bas jusqu'à *Top Custom Metrics for \<MONTH YEAR\>* pour voir les noms des principales métriques et leur contribution, en pourcentage, aux coûts de vos métriques personnalisées.

Savoir quelles métriques contribuent le plus à l'utilisation et aux coûts mensuels de votre compte est le point de départ recommandé pour utiliser [Metrics without Limits™][4]. Grâce à ces informations, vous pouvez retrouver la source de ces soumissions de métriques selon l'équipe, le service, l'organisation ou un autre attribut de tag.

De plus, consultez les informations sur l'[Usage Attribution][3] pour obtenir une répartition complète de l'utilisation facturable de votre compte par clé de tag. À partir de là, vous pouvez identifier vos principaux facteurs de coûts à l'aide de tags tels que l'équipe, le service ou l'application. 

**Remarque** : Usage Attribution est une fonctionnalité avancée incluse dans le plan Enterprise. Pour tous les autres plans, contactez votre responsable de compte ou l'équipe Customer Success pour demander cette fonctionnalité.

#### Visibilité au niveau de la métrique {#metric-level-visibility}

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer pour un nom de métrique en pic" style="width:80%;">}}

Une fois que vous avez identifié les noms de métriques qui augmentent l'utilisation et les coûts mensuels de votre compte, vous pouvez accéder au panneau latéral des détails de la métrique pour afficher Custom Metrics Tags Cardinality Explorer. Cela vous montre quelles clés de tag provoquent un pic de cardinalité pour une métrique donnée. Les clés de tag parasites ou non bornées qui présentent une forte augmentation du nombre de valeurs de tag uniques en sont probablement la cause. Excluez-les en utilisant Metrics without Limits™ pour réaliser des économies immédiates.

### Visibilité et attribution au niveau de l'équipe {#team-level-visibility-and-attribution}

La visibilité au niveau de l'équipe permet aux administrateurs de compte de responsabiliser les équipes. Plus important encore, cela donne aux équipes l'opportunité de comprendre et de réduire leur impact sur le volume des métriques.

Chaque équipe peut avoir une visibilité limitée sur les coûts des métriques et des tags qu'elle soumet. Cela conduit les équipes à être moins motivées pour contrôler leur utilisation ou même limiter la croissance de leur utilisation. Il est crucial que chacun ait une visibilité sur son utilisation et se sente en mesure de prendre en charge la gestion de ces volumes et des coûts associés.

#### Trouvez la source de vos métriques personnalisées les plus volumineuses {#find-the-source-of-your-largest-custom-metrics}
<div class="alert alert-danger">Vous devez disposer du <a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> pour accéder à la page Plan & Usage.</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="Accédez à Metrics Summary depuis la page Plan & Usage via le tableau Top Custom Metrics." style="width:90%;" >}}

Pour identifier quelle équipe ou quel service est responsable de vos principaux noms de métriques personnalisées :

1. Depuis la [page Plan & Usage][2], faites défiler la page vers le bas jusqu'à la section *Usage Summary*.
1. Cliquez sur l'onglet {{< ui >}}Custom Metrics{{< /ui >}} pour voir l'utilisation facturable, les tendances d'utilisation et les principales métriques personnalisées de votre organisation.
1. Sous le tableau *Top Custom Metrics for <MONTH YEAR>*, cliquez sur l'icône pour {{< ui >}}See in Metrics Summary{{< /ui >}} de la principale métrique personnalisée. Cela vous dirige vers la page *Metrics Summary*, avec le panneau latéral des détails de la métrique ouvert. 
1. Dans le panneau latéral, faites défiler jusqu'à la section *Tags* pour voir les tags associés tels que les équipes et le service.

#### Consultez les métriques personnalisées de votre équipe {#view-your-teams-custom-metrics}

Toutes les équipes doivent pouvoir voir en temps réel quelles métriques entraînent des pics sur leur facture et avoir l'assurance que leurs efforts d'optimisation des coûts ne nuisent pas à la visibilité d'une autre équipe.

Pour voir les noms de toutes les métriques actuellement envoyées par votre équipe, accédez à la [page Metrics Summary][6] et saisissez la paire clé-valeur de tag (par exemple, `team:dev` ou `service:demo`) dans le champ {{< ui >}}Filter by Tag Value{{< /ui >}}.

#### Identifiez les métriques de n'importe quelle équipe ayant le plus grand impact sur votre facture {#identify-any-teams-metrics-that-have-the-biggest-impact-on-your-bill}

Tous les utilisateurs de votre organisation peuvent voir, sur la [page Metrics Volume Management][7], une estimation prête à l'emploi et en temps réel de l'utilisation des métriques personnalisées. Les insights intelligents de Datadog aident à identifier les métriques sur lesquelles concentrer vos efforts d'optimisation des coûts. Utilisez Metrics Volume Management avec Metrics without Limits™ pour contrôler l'utilisation de vos métriques personnalisées indexées et réduire les coûts sans sacrifier la précision.

Avec Metrics Volume Management, vous pouvez identifier les métriques les plus volumineuses de votre organisation ainsi que les noms de métriques dont le volume connaît des pics (causes probables d'un dépassement inattendu).

{{< img src="metrics/guide/custom_metrics_governance/volume_management_page_2025-01-27.png" alt="Page Metrics Volume Management" style="width:90%;" >}}

Pour plus d'informations, consultez la documentation [Metrics Volume Management][8].

## Gouvernance des métriques basée sur la valeur {#value-based-metrics-governance}

Une gouvernance efficace des métriques personnalisées devrait accroître l'efficacité de la surveillance. Une fois que vous avez compris votre utilisation et que vous en avez déterminé la source, prenez des mesures pour réduire votre utilisation des métriques. 

Dans cette section, découvrez les actions que vous pouvez entreprendre pour maximiser le retour sur investissement et la valeur que vous tirez de vos dépenses d'observabilité sans sacrifier la visibilité sur laquelle votre équipe s'appuie activement.

### Metrics without Limits™ {#metrics-without-limits}

[Metrics without Limits™][4] de Datadog est une fonctionnalité de gestion des coûts inédite dans le secteur qui dissocie l'ingestion des métriques de leur indexation. Toutes vos métriques n'ont pas la même valeur à chaque instant, et avec Metrics without Limits™, vous ne payez que pour les métriques qui ont de la valeur. 

Réduisez le volume de vos métriques personnalisées indexées, quel que soit le nom de la métrique, en définissant la configuration des tags que vous souhaitez conserver pour les requêtes. Cela réduit vos coûts et préserve la précision mathématique de vos métriques configurées (le tout au sein de la plateforme sans aucune modification au niveau du code).

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_03142025.png" alt="Exemple d'utilisation de Metrics Volume Management et de Metrics without Limits™ pour réduire le volume en limitant la liste d'autorisation via la configuration des tags" style="width:80%;" >}}

Avec Metrics without Limits™, Datadog fournit automatiquement les éléments suivants :
- Des configurations de tags recommandées et à jour, basées sur les tags activement interrogés et les tags utilisés sur les ressources (grâce à nos analyses intelligentes des requêtes), pour vous aider à maximiser le retour sur investissement et la valeur que vous tirez de vos dépenses d'observabilité.
- Des analyses intelligentes des requêtes qui calculent et analysent en continu les interactions de tous les utilisateurs (dans l'application et via l'API) avec toutes les métriques soumises à Datadog, afin que vos configurations de tags recommandées restent pertinentes.
- La possibilité d'annuler les modifications à tout moment pour restaurer la visibilité des tags pour les nouvelles données. L'annulation ne rétablit pas rétroactivement les tags précédemment exclus.

Dans le cadre des bonnes pratiques de Datadog en matière de gouvernance des métriques, commencez par utiliser Metrics without Limits sur vos [Top Custom Metrics](#identify-metrics-that-have-the-biggest-impact-on-monthly-bill).

Pour plus de détails, consultez la documentation sur [Metrics without Limits™][4].

### Empêchez les configurations involontaires qui réduisent l'observabilité grâce au RBAC {#prevent-unintentional-configurations-that-reduce-observability-with-rbac}

Metrics without Limits™ permet aux utilisateurs de réduire les coûts liés aux métriques en indexant moins de données. En cas de mauvaise utilisation, cette configuration pourrait entraîner des pics d'utilisation imprévus ou une perte de visibilité sur les tags qui ne sont plus indexés. Pour éviter des changements inattendus, utilisez les [autorisations RBAC][9]. Vous pouvez modifier un rôle utilisateur existant pour inclure l'autorisation `metrics_tags_write` ou créer un rôle personnalisé. Cela donne à votre organisation un meilleur contrôle sur les membres qui peuvent impacter la [cardinalité][10] des métriques et ceux qui peuvent modifier les configurations de tags Metrics without Limits™.

Datadog fournit une [piste d'audit][11] de toutes les configurations Metrics without Limits™---précisant la configuration et l'utilisateur qui l'a effectuée---afin que vous puissiez attribuer les hausses ou les baisses d'utilisation de vos métriques personnalisées. Pour afficher vos événements de piste d'audit, saisissez la requête suivante dans l'[Events Explorer][12] :

```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="Event Explorer avec la requête de piste d'audit des métriques" style="width:90%;" >}}

### Réduire les coûts liés aux métriques non interrogées et inutilisées {#reduce-costs-from-unqueried-and-unused-metrics}

#### Métriques non interrogées {#unqueried-metrics}

Pour vous assurer de ne pas perdre une visibilité précieuse tout en réduisant les coûts, utilisez la facette {{< ui >}}Query Activity{{< /ui >}}. Cela vous permet de différencier les métriques activement interrogées sur lesquelles votre équipe s'appuie des métriques qui ne sont interrogées nulle part dans Datadog ou via l'API. Les analyses intelligentes des requêtes de Datadog calculent et analysent en continu toutes les interactions des utilisateurs (dans Datadog ou via l'API) avec chaque métrique afin d'aider à identifier les métriques non interrogées.

**Remarque** : Les métriques non interrogées peuvent être utilisées dans des requêtes sur des ressources (dashboards, notebooks, monitors et SLO). Elles sont considérées comme non interrogées si la ressource n'est pas utilisée dans le laps de temps donné.

#### Métriques inutilisées {#unused-metrics}

Vous pouvez également réduire les coûts, sans conséquences imprévues, en utilisant la [facette Related Assets][16]. Cela vous permet d'identifier les métriques qui ne sont utilisées par aucune de vos ressources (dashboards, notebooks, monitors et SLO). Cela vous permet de prendre des décisions éclairées concernant vos configurations de métriques.

#### Identifier toutes les métriques non interrogées et inutilisées {#identify-all-unqueried-and-unused-metrics}

Utilisez la [facette Related Assets][16] pour obtenir une visibilité sur les métriques qui sont inutilisées dans Datadog, ce qui peut vous aider à réduire les coûts sans perturber par inadvertance le fonctionnement de vos ressources. Cette facette vous permet de voir quelles métriques sont utilisées sur vos dashboards, notebooks, monitors et SLO, vous permettant ainsi de prendre des décisions éclairées concernant vos configurations de métriques.

Identifiez la liste complète des métriques non interrogées et inutilisées de votre organisation :

1. Sur la [page Metrics Summary][6], recherchez la facette {{< ui >}}Query Activity{{< /ui >}} sur la gauche. Sélectionnez la période souhaitée (30, 60 ou 90 jours).
2. Recherchez la facette {{< ui >}}Related Assets{{< /ui >}} sur le côté gauche et sélectionnez {{< ui >}}Not used in any asset{{< /ui >}}.
3. Recherchez la facette {{< ui >}}Configuration{{< /ui >}} sur le côté gauche et sélectionnez {{< ui >}}All Tags{{< /ui >}}. La combinaison de ces trois facettes vous fournit une liste de toutes les métriques qui ne sont ni interrogées ni utilisées sur vos ressources, et qui ne disposent pas déjà d'une configuration de tag personnalisée.

4. Examinez le tableau des noms de métriques obtenu. Ces noms présentent-ils des caractéristiques communes ou les métriques proviennent-elles d'un service particulier ? Recherchez les tags associés à ces métriques non interrogées.
5. (Facultatif) Pour exporter cette liste, cliquez sur {{< ui >}}Export as CSV{{< /ui >}} au-dessus du tableau des métriques.

   Une fois que vous avez identifié les métriques dont vos développeurs n'ont pas besoin, vous pouvez réduire en toute sécurité le volume de ces métriques personnalisées inutilisées et les coûts associés grâce à Metrics without Limits™. 

{{< img src="metrics/guide/custom_metrics_governance/manage_tags_fm_metrics_summary_2025-01-27.png" alt="Le menu déroulant Configure Metrics avec la sélection Manage tags mise en évidence" style="width:90%;" >}}

6. En haut de la [page Metrics Summary][6], cliquez sur le menu déroulant {{< ui >}}Configure Metrics{{< /ui >}}.
7. Sélectionnez {{< ui >}}Manage tags{{< /ui >}} pour ouvrir la [fenêtre modale de configuration des tags Metrics without Limits™][13] afin de configurer plusieurs métriques en masse.
8. Spécifiez le préfixe de l'espace de noms des métriques que vous souhaitez configurer.
9. Laissez {{< ui >}}Include tags{{< /ui >}} sélectionné. Cela inclut tous les tags utilisés dans des requêtes sur vos ressources (dashboards, notebooks, monitors et SLO), dans Metrics Explorer ou via l'API.
10. Cliquez sur {{< ui >}}Save{{< /ui >}}.

D'après les analyses intelligentes des requêtes de Datadog portant sur des milliers de clients utilisant des métriques personnalisées, nous avons constaté que l'utilisation de **Metrics without Limits™ sur les métriques non interrogées peut réduire jusqu'à 70 %** l'utilisation de métriques personnalisées d'un client moyen.

### Comprenez l'utilité relative de vos métriques {#understand-the-relative-utility-of-your-metrics}

Même si une métrique n'a pas été interrogée au cours des 30, 60 ou 90 derniers jours, vos équipes peuvent toujours en tirer parti pour la gestion des incidents et la résolution des pannes. À l'inverse, vos équipes pourraient sous-utiliser des métriques existantes et activement interrogées. Comprendre l'utilité relative de vos métriques est donc l'étape recommandée suivante dans votre workflow de gouvernance. 

Metrics without Limits™ de Datadog est une suite de fonctionnalités qui vous fournit également des informations prêtes à l'emploi pour évaluer la valeur de vos métriques activement interrogées grâce au panneau latéral [Metrics Related Assets][15]. Une ressource associée à une métrique désigne toute ressource Datadog, telle qu'un dashboard, un notebook, un monitor ou un SLO, qui interroge une métrique particulière. Utilisez la colonne {{< ui >}}Tags{{< /ui >}} pour identifier les tags spécifiques utilisés sur les ressources, afin de garantir le maintien de votre visibilité lors de l'optimisation avec Metrics without Limits™. Utilisez la popularité et le nombre de ressources associées pour évaluer l'utilité des métriques au sein de votre organisation et prendre des décisions fondées sur les données. Comprenez mieux comment votre équipe peut utiliser les métriques existantes pour tirer davantage de valeur de vos dépenses en observabilité. 

{{< img src="metrics/related_assets_08_05_2025.png" alt="Panneau latéral de détails d'une métrique affichant la section Related Assets. La métrique de l'exemple est appliquée à trois dashboards" style="width:100%;" >}}

Pour afficher les ressources associées à une métrique :
1. Cliquez sur le nom de la métrique pour ouvrir son panneau latéral de détails.
1. Faites défiler jusqu'à la section du panneau latéral intitulée {{< ui >}}Related Assets{{< /ui >}}.
1. Cliquez sur le bouton du menu déroulant pour afficher le type de ressource associée qui vous intéresse (dashboards, monitors, notebooks, SLO). Vous pouvez utiliser la barre de recherche pour valider des ressources spécifiques.
   

## Surveillance et prévention {#monitoring-and-prevention}
Dans cette section, découvrez comment : 
- Générer une alerte en cas de dépassements et de pics soudains dans l'utilisation globale des métriques personnalisées de votre compte
- Prévoir la croissance future des métriques et générer une alerte en cas d'écart global inattendu
- Générer une alerte lorsque la cardinalité d'une métrique particulière dépasse un seuil défini par l'utilisateur ou présente un pic anormal
Une fois que vous avez compris l'utilisation des métriques de votre compte et les équipes responsables de ces coûts, créez des monitors pour vous alerter lorsque votre utilisation de métriques personnalisées dépasse un certain seuil. Recevez des alertes sur les pics d'utilisation des métriques personnalisées, afin de pouvoir éviter les hausses inattendues de votre facture.

Datadog propose des métriques prêtes à l'emploi qui mesurent [l'utilisation estimée des métriques personnalisées][15]. Vous pouvez utiliser ces métriques dans les visualisations de vos dashboards et les alertes de vos monitors. 

| Type d'utilisation                    | Métrique                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`,  `datadog.estimated_usage.metrics.custom.by_tag` | Métriques personnalisées indexées uniques observées au cours de la dernière heure. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag` | Métriques personnalisées ingérées uniques observées au cours de la dernière heure. |

### Surveillez les pics d'utilisation des métriques personnalisées pour éviter les dépassements {#monitor-spikes-in-custom-metric-usage-to-prevent-overages}

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="Exemple de configuration d'un monitor de métriques avec la métrique d'utilisation estimée et un seuil de 700,000" style="width:80%;" >}}

Vous pouvez également voir la répartition de votre utilisation estimée des métriques personnalisées en temps réel par nom de métrique, à l'aide du widget de séries temporelles d'un dashboard ou d'un monitor de métriques. Utilisez la métrique `datadog.estimated_usage.metrics.custom.by_metric` pour créer un monitor afin de toujours disposer de données à jour sur le volume de chacun de vos noms de métriques. 

### Cas d'utilisation de surveillance supplémentaires {#additional-monitoring-use-cases}
Une fois que vous avez reçu une alerte, utilisez la page Metrics Volume Management pour examiner les clés de tag des métriques dont le volume connaît un pic, puis utilisez Metrics without Limits™ pour exclure immédiatement toute clé de tag anormale à l'origine de ce pic. Cela vous permettra de remédier immédiatement à tout pic de facturation imprévu. 
{{< whatsnext desc="Autres cas d'utilisation pour lesquels configurer des monitors à l'aide des métriques d'utilisation estimée :" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}Déclenchez une alerte lorsque le volume varie de plus d'un certain pourcentage.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}Déclenchez une alerte en cas de variations anormales de l'utilisation.{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecasts/" >}}Prévoyez la croissance future des métriques et déclenchez une alerte en cas d'écart global inattendu.{{< /nextlink >}}

{{< /whatsnext >}}

## Résumé des meilleures pratiques {#summary-of-best-practices}

1. Commencez par identifier les noms de métriques associés aux volumes les plus élevés (dans le tableau Top Custom Metrics ou sur la page Metrics Volume Page), puis utilisez Metrics without Limits™ pour réduire le volume de ces métriques afin d'optimiser les coûts. 
2. Utilisez la page Metrics Volume Management pour identifier les noms des métriques dont la hausse contribue le plus aux pics d'utilisation de métriques personnalisées existants.
3. Pour réaliser des économies immédiates, identifiez vos métriques personnalisées non interrogées et utilisez Metrics without Limits™ pour leur appliquer des configurations de tags vides.
4. Configurez des monitors pour surveiller votre utilisation des métriques personnalisées à l'aide des métriques OOTB de Datadog qui estiment cette utilisation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/plan_and_usage/
[2]: https://app.datadoghq.com/billing/usage
[3]: /fr/account_management/billing/usage_attribution/
[4]: /fr/metrics/metrics-without-limits/
[5]: https://app.datadoghq.com/billing/usage-attribution?view=table
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/volume
[8]: /fr/metrics/volume/
[9]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/?tab=ui#metrics
[10]: /fr/glossary/#cardinality
[11]: /fr/account_management/audit_trail/
[12]: https://app.datadoghq.com/event/explorer
[13]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[14]: https://docs.datadoghq.com/fr/metrics/metrics-without-limits/#configuration-of-tags-for-a-single-metric
[15]: /fr/metrics/summary/#metrics-related-assets
[16]: /fr/metrics/summary/#facet-panel
[17]: https://tour.datadoghq.com/psl/swa0y11