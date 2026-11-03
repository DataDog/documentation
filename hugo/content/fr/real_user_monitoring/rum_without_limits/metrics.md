---
description: Comprenez les métriques de performance prêtes à l'emploi disponibles
  avec RUM without Limits.
further_reading:
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentation
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentation
  text: Filtres de rétention
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: Documentation
  text: Contrôlez les coûts avec des quotas de rétention
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: Guide
  text: Bonnes pratiques pour les filtres de rétention
title: Analysez les performances avec des métriques
---
## Présentation {#overview}

{{< img src="real_user_monitoring/rum_without_limits/filters-rum-measure-view.png" alt="Visualisation du pourcentage de sessions de l'application Android sans plantage sur quatre semaines." style="width:90%" >}}

Datadog fournit les métriques prêtes à l'emploi ci-dessous pour une vue d'ensemble complète de la santé de votre application au fil du temps. Pour garantir leur exactitude, ces métriques sont calculées avant que les sessions soient conservées ou supprimées. Cela signifie que même si vous conservez 0,01 % de vos sessions, ces métriques sont calculées sur la base de 100 % des sessions ingérées. Ces métriques alimentent le [résumé des performances][1] pour vous donner une vue d'ensemble précise des performances de vos applications.

**Remarques** :
- L'ensemble de cardinalité {{< ui >}}Default{{< /ui >}} défini dans le tableau ci-dessous inclut les dimensions suivantes : environnement, nom de l'application, ID de l'application, version de l'application, service, nom du système d'exploitation, version du système d'exploitation, nom du navigateur et pays.
- Toutes les requêtes pour les métriques ci-dessous incluent `@session.type:user`, à l'exception des métriques `rum.measure.lighthouse.*`, qui proviennent d'audits de tests Synthetic Browser plutôt que de sessions d'utilisateurs réels. Voir [Audits Lighthouse][5].
- Si vous avez besoin de métriques de performance au-delà de celles listées ci-dessous, vous pouvez créer des [métriques personnalisées][2] à partir de vos événements RUM. Les métriques prêtes à l'emploi comme les métriques personnalisées sont calculées sur la base de 100 % du trafic ingéré.
- Certaines métriques sont capturées lorsqu'une session ou une vue est détectée pour la première fois. D'autres sont capturées lorsque la session ou la vue devient inactive. La comparaison de ces métriques sur de courtes fenêtres temporelles peut produire des ratios inattendus. Voir [Quand les métriques sont calculées](#when-metrics-are-computed).

| Nom de la métrique | Description | Dimensions | Plateforme |
|-------------|-------------|------------|----------|
| `rum.measure.app.startup_to_full_display` | Temps jusqu'à l'affichage complet lors du lancement de l'application | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.app.startup_to_initial_display` | Temps jusqu'à l'affichage initial lors du lancement de l'application | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.error` | Nombre d'erreurs | Default, Is Crash, View Name | Mobile & Browser |
| `rum.measure.error.anr` | Nombre d'ANR (gel Android) | Default, Is Crash, View Name | Mobile uniquement |
| `rum.measure.error.hang` | Nombre de blocages (application figée sous iOS) | Default | Mobile uniquement |
| `rum.measure.error.hang.duration` | Durée des blocages (application figée sous iOS) | Default, View Name | Mobile uniquement |
| `rum.measure.lighthouse.performance` | Score de la catégorie Performance de Lighthouse (0 à 100) | App ID, View Name | Browser uniquement |
| `rum.measure.lighthouse.accessibility` | Score de la catégorie Accessibility de Lighthouse (0 à 100) | App ID, View Name | Browser uniquement |
| `rum.measure.lighthouse.best_practices` | Score de la catégorie Best Practices de Lighthouse (0 à 100) | App ID, View Name | Browser uniquement |
| `rum.measure.lighthouse.seo` | Score de la catégorie SEO de Lighthouse (0 à 100) | App ID, View Name | Browser uniquement |
| `rum.measure.lighthouse.agentic` | Score de la catégorie Agentic de Lighthouse (0 à 100) | App ID, View Name | Browser uniquement |
| `rum.measure.session` | Nombre de sessions | Default | Mobile & Browser |
| `rum.measure.session.action` | Nombre d'actions | Default | Mobile & Browser |
| `rum.measure.session.crash_free` | Nombre de sessions sans plantage | Default | Mobile uniquement |
| `rum.measure.session.error` | Nombre d'erreurs par session (@session.error.count) | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.session.frustration` | Nombre de signaux de frustration | Default | Mobile & Browser |
| `rum.measure.session.inactive` | Nombre de sessions inactives | Default | Mobile & Browser |
| `rum.measure.session.time_spent` | Durée de la session | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.view` | Nombre de vues | Default, View Name | Mobile & Browser |
| `rum.measure.view.cpu_ticks_per_second` | Tics d'horloge CPU par seconde | Default, View Name | Mobile uniquement |
| `rum.measure.view.crash_free` | Taux de sessions sans plantage | Default, View Name | Mobile uniquement |
| `rum.measure.view.cumulative_layout_shift` | Cumulative Layout Shift | Default, Percentiles breakdown, View Name | Browser uniquement |
| `rum.measure.view.loading_time` | Temps jusqu'à ce que la page soit prête et qu'aucune requête réseau ou mutation DOM ne soit en cours. | Default, Percentiles breakdown, View Name | Mobile & Browser |
| `rum.measure.view.error_free` | Nombre de sessions sans erreur | Default, View Name | Mobile & Browser |
| `rum.measure.view.first_contentful_paint` | Moment où le navigateur affiche pour la première fois du texte, une image (y compris les images d'arrière-plan), un canevas non blanc ou un SVG | Default, Percentiles breakdown, View Name | Browser uniquement |
| `rum.measure.view.frozen_frame` | Nombre d'images figées | Default, View Name | Mobile uniquement |
| `rum.measure.view.frozen_frame_free` | Nombre de vues sans images figées | Default | Mobile uniquement |
| `rum.measure.view.inactive` | Nombre de vues inactives | Default, Percentiles breakdown | Mobile & Browser |
| `rum.measure.view.interaction_to_next_paint` | Durée la plus longue entre l'interaction d'un utilisateur avec la page et le rendu suivant.  | Default, Percentiles breakdown | Browser uniquement |
| `rum.measure.view.interaction_to_next_view` | Temps entre la dernière interaction de l'utilisateur dans la vue précédente et le début de la vue actuelle | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.view.largest_contentful_paint` | Moment du chargement de la page où le plus grand objet DOM dans la fenêtre d'affichage (visible à l'écran) est rendu | Default, Percentiles breakdown, View Name | Browser uniquement |
| `rum.measure.view.memory` | Quantité de mémoire système utilisée | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.view.network_settled` | Réseau stabilisé | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.view.refresh_rate` | Moyenne de la fréquence de rafraîchissement observée par l'utilisateur (FPS) | Default, Percentiles breakdown | Mobile uniquement |
| `rum.measure.view.slow_rendered` | Nombre de vues rendues lentement | Default | Mobile uniquement |
| `rum.measure.view.time_spent` | Temps passé sur la vue actuelle | Default | Mobile & Browser |

## Quand les métriques sont calculées {#when-metrics-are-computed}

Les métriques sont capturées à différents points du cycle de vie d'une session ou d'une vue :

- {{< ui >}}On detection{{< /ui >}} : `rum.measure.session` et `rum.measure.view` sont capturées lorsqu'une session ou une vue est détectée pour la première fois.
- {{< ui >}}On inactivity{{< /ui >}} : Les métriques telles que `rum.measure.session.inactive`, `rum.measure.session.crash_free`, `rum.measure.view.inactive` et `rum.measure.view.crash_free` sont capturées lorsqu'une session ou une vue devient inactive (c'est-à-dire lorsque la session ou la vue se termine).

Comme une session ou une vue qui commence dans une fenêtre temporelle peut se terminer dans une autre, comparer les métriques capturées lors de la détection à celles capturées lorsqu'une session ou une vue devient inactive sur de courtes fenêtres temporelles peut produire des résultats inattendus, notamment des ratios supérieurs à 100 %.

Par exemple, si de nombreuses sessions de la veille sont toujours actives et se terminent au cours de la journée en cours, le nombre de sessions inactives comptabilisées aujourd'hui peut dépasser le nombre de sessions ayant débuté aujourd'hui. Cela signifie qu'un ratio tel que le taux de sessions sans plantage (`rum.measure.session.crash_free` / `rum.measure.session`) peut légitimement renvoyer une valeur supérieure à 100 % ; il s'agit d'un comportement attendu.

**Recommandation** : lorsque vous calculez des ratios combinant des métriques calculées lors de la détection et lors du passage à l'inactivité, utilisez une fenêtre temporelle suffisamment large pour couvrir le début et la fin de la plupart des sessions (par exemple, une semaine ou plus).

## API {#api}

Les métriques peuvent être gérées via des [API][3] ou les [modules Terraform][4] dédiés de Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /fr/real_user_monitoring/platform/generate_metrics/
[3]: /fr/api/latest/rum-metrics/
[4]: https://registry.terraform.io/providers/DataDog/datadog/3.60.0/docs/resources/rum_metric
[5]: /fr/real_user_monitoring/application_monitoring/browser/optimizing_performance/#lighthouse-audits