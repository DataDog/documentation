---
description: Comprenez les valeurs et les détails d'évaluation renvoyés par les SDK
  de Feature Flags de Datadog.
further_reading:
- link: /feature_flags/concepts/evaluation_context
  tag: Documentation
  text: Contexte d'évaluation
- link: /feature_flags/concepts/targeting_rules
  tag: Documentation
  text: Règles de ciblage et filtres
- link: /feature_flags/concepts/evaluation_tester
  tag: Documentation
  text: Testeur d'évaluation
title: Résultats de l’évaluation des Feature Flags
---
## Présentation {#overview}

Les SDK de Feature Flags de Datadog utilisent l'[API d'évaluation OpenFeature][1]. Chaque évaluation de flag nécessite que votre application fournisse une valeur par défaut. Si le fournisseur ne peut pas résoudre le flag, le SDK renvoie cette valeur. Les méthodes d'évaluation détaillées renvoient également des informations telles que la variante résolue, la raison de la résolution et le code d'erreur.

## Flags désactivés {#disabled-flags}

OpenFeature définit [`FLAG_NOT_FOUND`][3] pour les évaluations où le fournisseur ne peut pas trouver le flag demandé dans sa configuration disponible. Datadog applique cette condition lorsqu'un flag est absent de la configuration d'exécution fournie pour l'environnement sélectionné.

Lorsque vous désactivez un flag dans un environnement Datadog, Datadog l'omet de la configuration d'exécution fournie aux SDK côté client et côté serveur. Le fournisseur ne peut donc pas distinguer un flag désactivé d'une clé de flag inconnue. Les deux conditions produisent le résultat d'évaluation détaillé suivant :

| Champ | Résultat |
|---|---|
| Valeur | La valeur par défaut fournie par votre application |
| Raison | `ERROR` |
| Code d'erreur | `FLAG_NOT_FOUND` |
| Variante | Aucune |

OpenFeature définit également [`DISABLED`][2] comme raison de résolution pour les fournisseurs qui reçoivent un flag marqué comme désactivé. Comme les fournisseurs Datadog ne reçoivent pas les flags désactivés dans les configurations d'exécution fournies par Datadog, ils renvoient `FLAG_NOT_FOUND` au lieu de `DISABLED`.

La valeur renvoyée est la valeur par défaut de l'appel d'évaluation, et non la variante par défaut configurée dans Datadog. Aucune variante Datadog n'est résolue pour un flag désactivé.

### Gérer les résultats de flags désactivés {#handle-disabled-flag-results}

- Fournir une valeur par défaut sûre pour chaque évaluation.
- Éviter d'écrire un log d'erreurs pour chaque résultat `FLAG_NOT_FOUND`. Les flags désactivés peuvent renvoyer ce code lors d'un fonctionnement normal ; agrégez, échantillonnez ou limitez le débit de ces logs à la place.
- Si votre application doit distinguer un flag inactif d'une clé inconnue, laissez le flag activé et fournissez une variante de contrôle explicite ou une variante off. Inspectez la variante renvoyée pour identifier cet état.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/sections/flag-evaluation/
[2]: https://openfeature.dev/specification/types/#resolution-reason
[3]: https://openfeature.dev/specification/types/#error-code