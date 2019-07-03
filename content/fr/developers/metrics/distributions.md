---
title: Distributions
kind: documentation
beta: true
further_reading:
  - link: graphing/metrics/distributions
    tag: Documentation
    text: En savoir plus sur l'interface utilisateur dédiée pour les métriques de distribution
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta. <a href="/help">Contactez l'assistance Datadog</a> afin d'activer les métriques de distribution pour votre compte.
</div>

## Présentation

Les distributions mesurent la distribution statistique d'un ensemble de valeurs au sein d'un ou de plusieurs hosts. Ainsi, elles peuvent être comparées à une version globale des [histogrammes][1].

Les moyennes des agrégations de centiles ne sont pas valides d'un point de vue statistique. C'est pourquoi les métriques de distribution se basent sur les données brutes sur l'ensemble des hosts. Pour chaque combinaison de tags, Datadog conserve une série temporelle pour `min`, `max`, `sum`, `average`, `count`, `p50`, `p75`, `p90`, `p95` et `p99`.

Par exemple, imaginons que le host `Foo` transmet une métrique avec les valeurs `[1,1,1,2,2,2,3,3]` et que le host `Bar` transmet la même métrique avec les valeurs `[1,1,2]` lors d'un intervalle d'envoi. Ici, la valeur `p50` (centile 50 ou médiane) de `Foo` vaut 2, tandis que la valeur `p50` de `Bar` vaut 1. Dans ce cas, une agrégation selon la valeur moyenne génère une valeur de 1,5. En réalité, la valeur `p50` (médiane) globale correspond à la médiane de l'ensemble *combiné* `[1,1,1,1,1,2,2,2,2,3,3]` : *2*. C'est donc cette valeur que la distribution transmettra.

Dans ce modèle, le nombre total de séries temporelles créées repose sur l'ensemble `tag:values` des tags appliqués à une métrique. Puisque ces agrégations sont par nature globales, Datadog applique par défaut seulement les tags des métriques custom à ces métriques. Vous pouvez modifier ce comportement si vous avez également besoin des tags de hosts.

## Envoi

### DogStatsD

{{% table responsive="true" %}}
| Méthode | Présentation |
| :----- | :------- |
| dog.distribution(...) | Surveillez la distribution statistique d'un ensemble de valeurs pour un ou plusieurs hosts.<ul><li>Obligatoire : la valeur et le nom de la métrique.</li><li>Facultatif : tag(s)</li></ul> |
{{% /table %}}

#### Exemple

Consultez la [documentation relative à DogStatsD][2] pour obtenir des exemples de code.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/metrics/histograms
[2]: /fr/developers/dogstatsd/data_types#distributions