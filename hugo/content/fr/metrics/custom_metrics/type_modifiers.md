---
aliases:
- /fr/developers/metrics/metric_type_modifiers
- /fr/graphing/faq/as_count_validation
- /fr/developers/metrics/type_modifiers/
- /fr/metrics/type_modifiers
description: Utilisez les modificateurs intégrés as_count et as_rate pour basculer
  les métriques entre les représentations de comptage et de taux.
further_reading:
- link: /extend/dogstatsd/
  tag: Documentation
  text: En savoir plus sur DogStatsD
- link: /extend/community/libraries/
  tag: Documentation
  text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
title: Modificateurs de type de métriques
---
Un [type de métrique][1] est une indication de ce que vous essayez de représenter avec votre métrique et sa source d'émission. Les types de métriques `COUNT` et `RATE` sont assez similaires, car ils représentent le même concept : la variation d'une valeur de métrique au fil du temps. Cependant, ils utilisent une logique différente :

* `RATE` : Variation normalisée d'une valeur au fil du temps (_par seconde_).
* `COUNT` : Variation absolue d'une valeur sur un intervalle de temps donné.

Selon votre cas d'utilisation et votre méthode de soumission, un type de métrique peut être plus adapté que l'autre pour la soumission. Par exemple :

| Type de métrique soumis | Cas d'utilisation                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | Vous souhaitez surveiller le nombre de requêtes reçues au fil du temps sur plusieurs hôtes.                                                                                                    |
| `RATE`                | Vous n'avez pas de contrôle sur la cohérence des soumissions de comptage temporel entre vos sources, vous normalisez donc par chaque intervalle individuel pour pouvoir les comparer en amont. |
| `COUNT`               | Vous souhaitez compter le nombre de fois qu'une fonction est appelée.                                                                                                                            |
| `COUNT`               | Calculer le montant des revenus générés sur une période donnée.                                                                                                        |

Comme `RATE` et `COUNT` ne sont pas du même type de métrique, ils n'ont pas le même comportement ni la même forme dans les graphiques et les moniteurs Datadog. Pour modifier les métriques à la volée entre les représentations `RATE` et `COUNT`, utilisez les fonctions de modification intégrées de Datadog dans vos graphiques et moniteurs.

## Modificateurs intégrés {#in-application-modifiers}

Les deux principaux modificateurs intégrés sont `as_count()` et `as_rate()`.

| Modificateurs    | Description                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Définit les opérations nécessaires pour afficher la métrique donnée sous forme `COUNT`, vous donnant la variation absolue d'une valeur de métrique sur [un intervalle d'agrégation][2]. **Remarque :** Comme cela dépend de l'intervalle d'agrégation, [la représentation graphique d'un intervalle de temps plus long modifie la forme de votre graphique][3]. |
| `as_rate()`  | Définit les opérations nécessaires pour afficher la métrique donnée sous forme `RATE`, vous donnant la variation absolue d'une valeur de métrique par seconde.                                                                                                                                     |

Selon le type de métrique auquel vous les avez appliqués, le comportement diffère :

{{< tabs >}}
{{% tab "NOMBRE" %}}

* Effet de `as_count()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.
* Effet de `as_rate()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.
  * Divise le résultat après agrégation par l'intervalle d'échantillonnage afin de le normaliser. Par exemple, les points suivants soumis chaque seconde `[1,1,1,1].as_rate()` avec un intervalle d'agrégation de 20 s produiraient `[0.05, 0.05, 0.05, 0.05]`.

**Remarque** : il n'y a pas de normalisation sur les intervalles très courts (lorsqu'aucune agrégation temporelle n'a lieu) ; les valeurs brutes de la métrique sont donc renvoyées.

[1]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Effet de `as_count()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur SUM.
  * Multiplie le résultat après agrégation par l'intervalle d'échantillonnage. Par exemple, les points suivants soumis chaque seconde `[0.05, 0.05, 0.05, 0.05].as_count()` avec un intervalle d'agrégation de 20 s produiraient `[1,1,1,1]`.
* Effet de `as_rate()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.
  * Fixe comme valeur minimale de l'intervalle d'agrégation de la requête l'intervalle indiqué dans les métadonnées de la métrique. Lorsque l'intervalle d'agrégation demandé dans une requête est inférieur à l'intervalle de soumission de la métrique, il est automatiquement porté à la valeur de l'intervalle indiqué dans les métadonnées, sans notification.
  * Réajuste la valeur de chaque compartiment complet après agrégation en la multipliant par `min(metadata_interval, rollup_interval) / rollup_interval`. Lorsque l'intervalle d'agrégation est égal à l'intervalle indiqué dans les métadonnées, cette opération est sans effet et la valeur du compartiment est égale à `SUM` après agrégation. Lorsque l'intervalle d'agrégation est supérieur à l'intervalle indiqué dans les métadonnées, la valeur devient la moyenne temporelle des `per-second` échantillons de taux dans ce compartiment. Par exemple, pour une métrique soumise toutes les `60 seconds` et interrogée avec un intervalle d'agrégation de `1800 second`, `as_rate()` renvoie `post_aggregation / 30` pour chaque compartiment complet.
  * Réajuste l'échelle du dernier compartiment partiel (lorsque l'heure de fin de la requête n'est pas alignée sur une limite d'agrégation) afin qu'il représente la moyenne des échantillons réellement observés dans cette fenêtre partielle, au lieu d'une valeur artificiellement basse.

  **Remarque** : si une métrique `RATE` n'a aucun intervalle défini dans ses métadonnées, aucune des étapes de réajustement d'échelle ci-dessus n'est appliquée et l'agrégateur temporel utilise `AVG` au lieu de `SUM`.

  **Remarque** : par exemple, lors de la validation, utilisez la formule `(post_aggregation / rollup_interval) * min(metadata_interval, rollup_interval)` dans [Advanced graphing][2]. L'expression ne peut pas être tracée directement dans un widget de requête de série temporelle de base, car elle dépend de l'intervalle d'agrégation actif en tant que valeur numérique.

[1]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /fr/dashboards/querying/#advanced-graphing
{{% /tab %}}
{{% tab "GAUGE" %}}

Les types de métriques `GAUGE` représentent la valeur absolue et finale d'une métrique ; les modificateurs `as_count()` et `as_rate()` n'ont aucun effet sur la manière dont une jauge est stockée ou affichée dans Metrics Explorer.

**Remarque** : dans les moniteurs, l'application de `as_count()` à une métrique de jauge modifie le mode d'évaluation des fonctions dépendantes de l'agrégation, comme `pct_change()` :
- Sans `as_count()` : la fonction est appliquée à chaque compartiment, puis les valeurs obtenues sont additionnées sur la fenêtre d'évaluation, ce qui peut produire des valeurs négatives de grande amplitude pour les jauges peu denses.
- Avec `as_count()` : la série temporelle est répartie en compartiments et agrégée avant l'application de la fonction, conformément au calcul prévu sur l'ensemble de la fenêtre.

{{% /tab %}}
{{< /tabs >}}

### Le modificateur `weighted()` {#the-weighted-modifier}

Les tags tels que `pod name` ou `container_name` provoquent une forte rotation des tags, en particulier lors de la création de requêtes pour la gestion des coûts, la planification de la capacité ou la mise à l'échelle automatique pour les applications conteneurisées. Pour garantir l'exactitude mathématique des requêtes sur les jauges malgré la forte rotation des tags, vous pouvez utiliser un modificateur intégré `.weighted()`. Le modificateur `.weighted()` permet à Datadog de pondérer correctement les valeurs de métrique en fonction de la durée de vie de ces tags fréquemment renouvelés. 

Le modificateur `.weighted()` est automatiquement ajouté aux requêtes sur les jauges uniquement si les deux conditions suivantes sont remplies :

- La métrique de jauge est soumise régulièrement, de sorte qu'aucune interpolation n'est nécessaire pour combler les périodes sans données.
- L'intervalle de soumission est correctement défini et configuré. 

Le Datadog Agent ou une intégration définit l'intervalle de soumission pour une métrique au moment de l'ingestion. Modifiez les intervalles de soumission sur la [page Metrics Catalog][4].

## Modifier le type d'une métrique dans Datadog {#modify-a-metrics-type-within-datadog}

Bien que cela ne soit normalement pas nécessaire, il est possible de modifier le type d'une métrique sur la [page Metrics Catalog][4] :

{{< img src="metrics/custom_metrics/type_modifiers/metric_type.png" alt="Type de métrique" style="width:70%;">}}

Exemple de cas d'utilisation :

1. Vous avez une métrique `app.requests.served` qui compte les requêtes traitées, mais vous l'avez accidentellement soumise depuis StatsD en tant que `GAUGE`. Le type Datadog de la métrique est donc `GAUGE`.

2. Vous vouliez soumettre `app.requests.served` en tant que métrique `COUNT` StatsD pour l'agrégation temporelle. Cela permettrait de répondre à des questions telles que _« Combien de requêtes ont été traitées au total au cours de la journée écoulée ? »_ en interrogeant `sum:app.requests.served{*}` (cela n'aurait aucun sens pour un type de métrique `GAUGE`).

3. Le nom `app.requests.served` vous plaît, donc plutôt que de soumettre un nouveau nom de métrique avec un type `COUNT` plus approprié, vous pourriez changer le type de `app.requests.served` en mettant à jour :
  * Votre code de soumission, pour appeler `dogstatsd.increment('app.requests.served', N)` après le traitement de N requêtes, et
  * Le type dans l'application Datadog, depuis la page Metrics Catalog, pour le définir sur `RATE`.

Cela entraîne un comportement incorrect des données soumises avant le changement de type pour `app.requests.served`. En effet, elles étaient stockées dans un format destiné à être interprété comme un `GAUGE` dans l'application (et non comme un `RATE`). Les données soumises après l'étape 3 sont interprétées correctement.

Si vous ne souhaitez pas perdre les données historiques soumises en tant que `GAUGE`, créez un nouveau nom de métrique avec le nouveau type, en laissant le type de `app.requests.served` inchangé.

**Remarque** : Pour l'AgentCheck, `self.increment` ne calcule pas le delta pour un compteur à croissance monotone ; il rapporte plutôt la valeur transmise lors de l'exécution de la vérification. Pour envoyer la valeur delta d'un compteur à croissance monotone, utilisez `self.monotonic_count`.

[1]: /fr/metrics/types/
[2]: /fr/metrics/introduction/#time-aggregation
[3]: /fr/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/catalog