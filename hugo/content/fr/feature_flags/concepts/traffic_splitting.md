---
description: Découvrez comment les Feature Flags de Datadog utilisent la randomisation
  déterministe pour les rollouts basés sur un pourcentage.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres
- link: /feature_flags/concepts/evaluation_context
  tag: Documentation
  text: Contexte d'évaluation
title: Répartition du trafic et randomisation
---
## Vue d'ensemble {#overview}

Lorsque vous définissez une règle de ciblage, vous pouvez servir une variante à un pourcentage de sujets qui correspondent à votre filtre de ciblage. Datadog utilise une **randomisation déterministe** basée sur le `targetingKey` dans votre [contexte d'évaluation][1] afin que le même sujet reçoive systématiquement la même variante pour un flag donné.

## Déploiements en pourcentage {#percentage-rollouts}

Dans la section **Règles de ciblage et déploiements**, définissez le pourcentage de l'audience qui doit recevoir chaque variante. Pour une règle de ciblage à **variante unique**, attribuez l'exposition au trafic souhaitée à une variante. Par exemple, déployez la variante **Free Shipping** de votre bannière promotionnelle auprès de 50 % des sujets correspondant à votre filtre :

{{< img src="feature_flags/concepts/single-variant-traffic-exposure-2.png" alt="Règle de ciblage avec un déploiement en pourcentage à variante unique." style="width:75%;" >}}

Pour un déploiement **multi-variante**, attribuez des pourcentages à plusieurs variantes dans la même règle de ciblage en sélectionnant **Serve > Split Traffic** lors de la modification ou de la création de votre règle de ciblage. Le SDK répartit les sujets correspondants entre ces variantes selon les pourcentages que vous configurez.

{{< img src="feature_flags/concepts/multi-variant-traffic-split-2.png" alt="Règle de ciblage avec des pourcentages répartis entre plusieurs variantes." style="width:75%;" >}}

## Comment le SDK évalue les déploiements en pourcentage {#how-the-sdk-evaluates-percentage-rollouts}

Lorsque le SDK évalue une règle de ciblage avec un déploiement en pourcentage, il vérifie d'abord si le contexte d'évaluation correspond au filtre de la règle. S'il correspond, le SDK utilise la clé du flag et le `targetingKey` du contexte d'évaluation pour affecter le sujet à un compartiment de déploiement. Ce compartiment détermine si le sujet reçoit une variante de la règle actuelle ou passe à la règle suivante.

La randomisation est **déterministe** : un sujet avec le même `targetingKey` atterrit toujours dans le même compartiment pour un flag donné, de sorte qu'il reçoit la même variante lors d'évaluations répétées. Si vous augmentez un pourcentage de déploiement ultérieurement (par exemple, de 30 % à 50 %), les sujets déjà présents dans le compartiment de déploiement y restent.

Pour les règles multivariantes, le SDK applique la même logique de répartition pour distribuer les sujets entre les variantes selon les pourcentages définis dans la règle.

Consultez [Evaluation Context][1] pour savoir comment définir le `targetingKey` dans votre SDK.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/concepts/evaluation_context/