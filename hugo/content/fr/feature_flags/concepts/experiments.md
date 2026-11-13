---
description: Découvrez comment les règles de ciblage d’un feature flag randomisent
  un Datadog Experiment et enregistrent les expositions pour analyse.
further_reading:
- link: /experiments/
  tag: Documentation
  text: Découvrez Datadog Experiments
- link: /experiments/plan_and_launch_experiments
  tag: Documentation
  text: Planifiez et lancez des Datadog Experiments
- link: /experiments/concepts/subject_types
  tag: Documentation
  text: Types de sujets dans les Experiments
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres de Feature Flags
- link: /feature_flags/concepts/evaluation_context
  tag: Documentation
  text: Contexte d'évaluation des Feature Flags
title: Feature Flags et Experiments
---
## Présentation {#overview}

Datadog Feature Flags est le moyen par défaut de randomiser un [Datadog Experiment][1]. Lorsque vous associez un feature flag à un Datadog Experiment, Datadog ajoute une règle de ciblage d’Experiment au feature flag. Les évaluations de cette règle assignent des sujets à une variante et enregistrent un événement d'exposition que Datadog utilise pour analyser le Datadog Experiment.

## Associer un feature flag à un Datadog Experiment {#link-a-flag-to-an-experiment}

Associez un feature flag à un Datadog Experiment depuis l'une ou l'autre partie du workflow :

- Depuis [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1], créez un Datadog Experiment et [ajoutez-y un feature flag existant][2].
- Depuis la page de détails d'un feature flag, cliquez sur {{< ui >}}Create New Experiment{{< /ui >}} dans la section {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} pour créer un Datadog Experiment pré-rempli avec ce feature flag.

## Règles de ciblage de Datadog Experiment {#experiment-targeting-rules}

Une règle de ciblage d’Experiment fonctionne comme n'importe quelle autre [règle de ciblage][3] : elle peut inclure un filtre et utilise la même [randomisation déterministe][4] pour assigner des sujets à une variante. La randomisation est basée sur le `targetingKey` de votre [contexte d'évaluation][5], de sorte que le même sujet reçoit systématiquement la même variante pendant toute la durée du Datadog Experiment.

Si plusieurs Datadog Experiments partagent le même feature flag, Datadog évalue leurs règles de ciblage dans l'ordre, de haut en bas. Réorganisez les règles avant de lancer un Datadog Experiment pour contrôler laquelle est prioritaire pour un sujet donné.

## Expositions {#exposures}

Chaque fois que le SDK évalue la règle de ciblage d’Experiment d'un feature flag pour un sujet, Datadog enregistre une _exposition_ : le sujet, la variante servie et un horodatage. Datadog associe les expositions aux événements métriques pour calculer l'écart entre les variantes. Ces événements métriques peuvent provenir de Product Analytics, de Real User Monitoring ou de votre entrepôt de données.

Datadog associe les expositions et les métriques par identifiant de sujet. La `targetingKey` que votre SDK définit dans le [contexte d'évaluation][5] doit correspondre à l'[attribut de type de sujet][6] configuré pour le Datadog Experiment, tel que `@usr.id`, sinon Datadog ne pourra pas associer les événements métriques à la bonne exposition.

## Apportez votre propre randomisation {#bring-your-own-randomization}

Si vous randomisez les sujets avec un système autre que les Feature Flags de Datadog, cette intégration flag-to-experiment ne s'applique pas. Datadog peut toujours analyser le Datadog Experiment : définissez un [Exposure SQL Model][7] qui lit les enregistrements d'exposition depuis votre entrepôt de données à la place.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/
[2]: /fr/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /fr/feature_flags/concepts/targeting_rules/
[4]: /fr/feature_flags/concepts/traffic_splitting/
[5]: /fr/feature_flags/concepts/evaluation_context/
[6]: /fr/experiments/concepts/subject_types/
[7]: /fr/experiments/concepts/exposure_sql/