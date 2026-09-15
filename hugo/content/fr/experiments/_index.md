---
description: Planifiez, exécutez et analysez des expériences randomisées sur l'ensemble
  de votre pile avec Datadog Experiments.
further_reading:
- link: /feature_flags/
  tag: Documentation
  text: Feature Flags
- link: /product_analytics/
  tag: Documentation
  text: Product Analytics
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guide
  text: Configurer l'enrichissement des traces APM pour les Feature Flags
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: L'écart de latence du signal produit qui ralentit votre croissance
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: Blog
  text: Chaque équipe devrait effectuer des tests A/B
- link: https://www.datadoghq.com/blog/experiments
  tag: Blog
  text: Mesurez l'impact commercial de chaque changement de produit avec Datadog Experiments
title: Experiments
---
## Vue d'ensemble {#overview}

Datadog Experiments est une plateforme composable pour l'expérimentation de bout en bout. Une expérience dans Datadog se compose de deux éléments :

1. Une **affectation randomisée** de [sujets][18] (généralement des utilisateurs) à deux variantes ou plus, soit à partir d'un [Datadog Feature Flag][1], soit à partir du système de randomisation de votre choix
2. Un ensemble de **métriques** à comparer entre les variantes, calculées soit dans Datadog, soit avec des analyses natives d'entrepôt de données.

Pour commencer, sélectionnez un lien dans le tableau ci-dessous. Sinon, poursuivez votre lecture pour en savoir plus sur Datadog Experiments.

| Liens rapides | |
| :---- | :---- |
| [Connecter un entrepôt de données][13] | Configurez Snowflake, BigQuery, Redshift ou Databricks pour l'analyse d'expériences en mode natif d'entrepôt |
| [Créer une métrique native à l'entrepôt de données][14] | Définissez des modèles SQL de métriques et des métriques d'expérience à partir des données de l'entrepôt |
| [Créer une métrique à partir des données de Product Analytics ou de Real User Monitoring][15] | Créez des métriques d'expérience à partir d'événements RUM côté client et de Product Analytics |
| [Lancer une expérience à l'aide de Datadog Feature Flags][16] | Planifiez votre hypothèse, configurez la randomisation avec Datadog Feature Flags et démarrez votre expérience |
| [Standardiser les expériences avec des protocoles][21] | Définissez des valeurs par défaut réutilisables pour les métriques, la randomisation, la durée et l'analyse statistique |
| [Analyser une expérience déjà randomisée][17] | Définir les données d'exposition dans votre entrepôt lorsque la randomisation s'exécute en dehors de Datadog Feature Flags |
| [Comprendre les diagnostics d'expérience][20] | Interpréter les vérifications automatisées pour les expositions, les métriques, la randomisation et la santé de l'analyse |

## Randomisation {#randomization}

Chaque expérience nécessite un moyen d'assigner des sujets à une variante de contrôle ou de traitement. Datadog prend en charge deux approches.

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][1] est le moyen par défaut de randomiser les expériences. Créez un Feature Flag, implémentez-le avec le [SDK Feature Flags][9] et transmettez un identifiant de sujet stable en tant que `targetingKey` afin que le même utilisateur reçoive toujours la même variante. Datadog utilise le hachage déterministe pour maintenir la cohérence des assignations entre les sessions et les appareils.

Lorsque vous [planifiez et lancez une expérience][16], liez-la à un Datadog Feature Flag pour définir les fractionnements de trafic, les règles de ciblage et le comportement de déploiement. Vous pouvez également créer une expérience directement depuis la page de détails d'un Datadog Feature Flag. Pour randomiser par une unité autre que l'utilisateur — par exemple, une organisation — consultez [Types de sujets][18].

### Apportez votre propre randomisation {#bring-your-own-randomization}

Si vous randomisez les sujets en dehors de Datadog — par exemple, avec un système interne — utilisez les [Modèles SQL d'exposition][17] pour indiquer à Datadog qui a été exposé à chaque expérience et quand. Les modèles SQL d'exposition interrogent les enregistrements d'exposition depuis votre [entrepôt connecté][13] et les mappent aux champs Datadog tels que la clé de sujet, l'horodatage, l'ID d'expérience et l'ID de variante.

Datadog déduplique automatiquement les données d'exposition : si un utilisateur apparaît dans plusieurs variantes pour la même expérience, cet utilisateur est exclu de l'analyse. Lorsque les expositions proviennent de votre entrepôt au lieu de Datadog Feature Flags, les métriques basées sur les événements du SDK Datadog ne sont pas prises en charge ; vous avez besoin de [métriques natives de l'entrepôt][14].

## Métriques {#metrics}

Les métriques d'expérience définissent ce que vous mesurez pour décider si un changement a réussi. Créez au moins une métrique principale avant de lancer une expérience, et ajoutez des métriques secondaires comme garde-fous contre les effets involontaires sur les performances, l'engagement ou les revenus.

### Mode natif d'entrepôt {#warehouse-native-mode}

En mode natif d'entrepôt, Datadog exécute l'analyse d'expérience directement dans Snowflake, BigQuery, Redshift ou Databricks. Après avoir [connecté votre entrepôt][13], créez un **Modèle SQL de métrique** qui mappe les tables de l'entrepôt vers Datadog, puis définissez des métriques à partir de ce modèle. Mappez chaque modèle à un ou plusieurs [types de sujets][18] et spécifiez une colonne d'horodatage afin que Datadog puisse joindre les événements de métrique aux expositions de l'expérience.

Le mode entrepôt est requis lorsque vous utilisez des [modèles SQL d'exposition][17] pour la randomisation. Il convient également aux équipes dont la source de vérité pour les métriques métier se trouve déjà dans l'entrepôt.

### Product Analytics et RUM {#product-analytics-and-rum}

Pour les expériences côté client, construisez des métriques à partir des événements collectés par les SDK [Real User Monitoring (RUM)][2] et [Product Analytics][3]. Définissez des métriques à partir d'actions, de vues, de sessions et d'autres types d'événements, puis choisissez une méthode d'agrégation telle que le nombre d'événements, le nombre d'utilisateurs uniques ou la somme d'une propriété.

Cette approche fonctionne lorsque la randomisation est effectuée via les [Datadog Feature Flags][1] et que vous souhaitez mesurer le comportement des utilisateurs, la conversion dans un tunnel ou les performances des applications sans interroger d'entrepôt. Les métriques de Product Analytics et RUM sont disponibles en temps quasi réel au lancement des expériences.

## Statistiques {#statistics}

Datadog applique une analyse statistique pour comparer les variantes et estimer le lift. Lors de la configuration d'une expérience, choisissez une [méthode d'analyse][11] (fréquentiste séquentielle, fréquentiste à échantillon fixe ou bayésienne) et effectuez éventuellement un [calcul de taille d'échantillon][8] pour estimer la durée nécessaire de l'expérience. Une fois les résultats obtenus, utilisez [Global Lift][19] pour comprendre comment le lift d'une expérience ciblée se traduit par un impact sur le total des métriques de votre entreprise, et [Cumulative Impact][12] pour agréger les effets ajustés au bruit sur de nombreuses expériences portant sur la même métrique.

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="La vue des métriques d'Experiments affichant les métriques métier, de funnel et de performance avec les valeurs de contrôle et de variante ainsi que le lift relatif pour chaque métrique. Une info-bulle est ouverte sur la métrique Revenue, affichant les valeurs sans CUPED pour le revenu par utilisateur, le revenu total et le nombre d'assignations d'utilisateurs dans les groupes de contrôle et de variante." style="width:90%;" >}}

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/
[2]: /fr/real_user_monitoring/
[3]: /fr/product_analytics/#getting-started
[4]: /fr/experiments/defining_metrics
[5]: /fr/experiments/plan_and_launch_experiments
[6]: /fr/getting_started/feature_flags/#create-your-first-feature-flag
[7]: /fr/experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /fr/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /fr/getting_started/feature_flags/#feature-flags-sdks
[10]: /fr/experiments/guide/
[11]: /fr/experiments/statistics/analysis_methods
[12]: /fr/experiments/concepts/cumulative_impact
[13]: /fr/experiments/guide/connecting_a_data_warehouse/
[14]: /fr/experiments/defining_metrics/?tab=warehouse
[15]: /fr/experiments/defining_metrics/?tab=productanalyticsorum
[16]: /fr/experiments/plan_and_launch_experiments/
[17]: /fr/experiments/concepts/exposure_sql/
[18]: /fr/experiments/concepts/subject_types/
[19]: /fr/experiments/statistics/global_lift
[20]: /fr/experiments/diagnostics/
[21]: /fr/experiments/protocols/