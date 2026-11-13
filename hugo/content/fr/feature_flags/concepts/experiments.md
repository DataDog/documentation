---
description: Découvrez comment les règles de ciblage d'un flag de fonctionnalité randomisent
  un Datadog Experiment et enregistrent les expositions pour analyse.
further_reading:
- link: /experiments/
  tag: Documentation
  text: En savoir plus sur Datadog Experiments
- link: /experiments/plan_and_launch_experiments
  tag: Documentation
  text: Planifier et lancer des expériences
- link: /experiments/concepts/subject_types
  tag: Documentation
  text: Types de sujets dans les expériences
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres des Feature Flags
- link: /feature_flags/concepts/evaluation_context
  tag: Documentation
  text: Contexte d'évaluation des Feature Flags
title: Feature Flags et Experiments
---
## Présentation {#overview}

Datadog Feature Flags est le moyen par défaut de randomiser un [Datadog Experiment][1]. Lorsque vous associez un flag à une expérience, Datadog ajoute une règle de ciblage d'expérience au flag. Les évaluations de cette règle assignent des sujets à une variante et enregistrent un événement d'exposition que Datadog utilise pour analyser l'expérience.

## Associez un flag à une expérience {#link-a-flag-to-an-experiment}

Associez un flag à une expérience depuis l'une ou l'autre partie du workflow :

- Depuis [{{< ui >}}Product Analytics > Experiments{{< /ui >}}][1], créez une expérience et [ajoutez-y un flag de fonctionnalité existant][2].
- Depuis la page de détails d'un flag, cliquez sur {{< ui >}}Create New Experiment{{< /ui >}} dans la section {{< ui >}}Targeting Rules & Rollouts{{< /ui >}} pour créer une expérience pré-remplie avec ce flag.

## Règles de ciblage d'expérience {#experiment-targeting-rules}

Une règle de ciblage d'expérience fonctionne comme n'importe quelle autre [règle de ciblage][3] : elle peut inclure un filtre et utilise la même [randomisation déterministe][4] pour assigner des sujets à une variante. La randomisation est basée sur le `targetingKey` dans votre [contexte d'évaluation][5], de sorte que le même sujet reçoit systématiquement la même variante pendant toute la durée de l'expérience.

Si plusieurs expériences partagent le même flag, Datadog évalue leurs règles de ciblage dans l'ordre, de haut en bas. Réorganisez les règles avant de lancer une expérience pour contrôler laquelle est prioritaire pour un sujet donné.

## Expositions {#exposures}

Chaque fois que le SDK évalue la règle de ciblage d'expérience d'un flag pour un sujet, Datadog enregistre une _exposition_ : le sujet, la variante servie et un horodatage. Datadog associe les expositions aux événements de métriques pour calculer l'effet incrémental entre les variantes. Ces événements de métriques peuvent provenir de Product Analytics, de Real User Monitoring ou de votre entrepôt de données.

Datadog associe les expositions et les métriques par identifiant de sujet. Le `targetingKey` que votre SDK définit dans le [contexte d'évaluation][5] doit correspondre à l'[attribut de type de sujet][6] configuré pour l'expérience, tel que `@usr.id`, sinon Datadog ne pourra pas associer les événements de métriques à la bonne exposition.

## Préférences du sujet {#subject-preferences}

Le refus de participer à l’Experimentation peut exclure un sujet des affectations aux expériences immédiatement ou en fonction de l’heure d’activation de l’affectation. Le refus de l’évaluation des Feature Flags est distinct et n’empêche pas l’affectation à une expérience. Consultez [Refus de l’évaluation des Feature Flags et de la participation à l’Experimentation][8].

## Utilisez votre propre système de randomisation {#bring-your-own-randomization}

Si vous randomisez les sujets avec un système autre que Datadog Feature Flags, cette intégration entre les flags et les expériences ne s’applique pas. Datadog peut toujours analyser l'expérience : définissez plutôt un [Exposure SQL Model][7] qui lit les enregistrements d'exposition depuis votre entrepôt de données.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/experiments/
[2]: /fr/experiments/plan_and_launch_experiments/#add-a-feature-flag
[3]: /fr/feature_flags/concepts/targeting_rules/
[4]: /fr/feature_flags/concepts/traffic_splitting/
[5]: /fr/feature_flags/concepts/evaluation_context/
[6]: /fr/experiments/concepts/subject_types/
[7]: /fr/experiments/concepts/exposure_sql/
[8]: /fr/feature_flags/concepts/opt_out/