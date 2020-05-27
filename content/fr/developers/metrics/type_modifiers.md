---
title: Modificateurs de type de métriques
kind: documentation
aliases:
  - /fr/developers/metrics/metric_type_modifiers
  - /fr/graphing/faq/as_count_validation
further_reading:
  - link: /developers/dogstatsd/
    tag: Documentation
    text: En savoir plus sur DogStatsD
  - link: /developers/libraries/
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogStatsD et les API
---
Le type d'une métrique indique ce qu'elle représente, ainsi que sa source d'émission. Comme indiqué dans la documentation relative aux [types de métriques][1], les types `COUNT` et `RATE` sont relativement similaires. En effet, ils représentent tous les deux les variations de la valeur d'une métrique au fil du temps. Cependant, ils reposent sur deux logiques différentes :

* `RATE` : variation de la valeur normalisée au fil du temps (_toutes les secondes_).
* `COUNT` : variation de la valeur absolue sur un intervalle donné.

En fonction de votre utilisation et de la méthode d'envoi, l'un des deux types peut être plus approprié pour l'envoi. Par exemple :

| Type de métrique envoyée | Cas d'utilisation                                                                                                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `RATE`                | Vous souhaitez surveiller l'évolution du nombre de requêtes reçues pour plusieurs hosts.                                                                                                    |
| `RATE`                | Vous ne contrôlez pas la régularité des intervalles d'envoi pour l'ensemble de vos sources, donc vous normalisez chaque intervalle afin de pouvoir les comparer en amont. |
| `COUNT`               | Vous souhaitez compter le nombre d'appels d'une fonction.                                                                                                                            |
| `COUNT`               | Vous calculez le montant des bénéfices réalisés durant une période précise.                                                                                                        |

Puisque les types de métriques `RATE` et `COUNT` ne sont pas identiques, ils ne se comportent pas de la même manière et sont représentés différemment dans les graphiques et monitors Datadog. Pour modifier des métriques à la volée entre des visualisations `RATE` et `COUNT`, utilisez les fonctions de modification intégrées de Datadog au sein de vos graphiques et monitors.

## Modificateurs intégrés à l'application

Les deux principaux modificateurs intégrés sont `as_count()` et `as_rate()`.

| Modificateurs    | Description                                                                                                                                                                                                                                                                   |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `as_count()` | Définit les opérations nécessaires pour afficher la métrique donnée en tant que `COUNT`, ce qui affiche la variation absolue de la valeur de la métrique sur [un intervalle de cumul][2]. Veuillez noter que les représentations dépendent de l'intervalle de cumul ; [la sélection d'un intervalle plus long modifie donc la forme de votre graphique][3]. |
| `as_rate()`  | Définit les opérations nécessaires pour afficher la métrique donnée en tant que `RATE`, ce qui affiche la variation absolue de la valeur de la métrique par seconde.                                                                                                                                     |

Le comportement des métriques varie selon le type appliqué :

{{< tabs >}}
{{% tab "COUNT" %}}

* Effet de `as_count()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.
* Effet de `as_rate()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.
  * Divise le résultat découlant de l'agrégation par l'intervalle d'échantillonnage afin de le normaliser. Par exemple, les points `[1,1,1,1].as_rate()` envoyés toutes les secondes avec un intervalle de cumul de 20 s génèrent les valeurs `[0.05, 0.05, 0.05, 0.05]`.

**Remarque** : aucune normalisation n'est appliquée sur les intervalles de très courtes durées (sans agrégation temporelle). Ainsi, les totaux des valeurs brutes des métriques sont renvoyés.

[1]: /fr/dashboards/faq/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "RATE" %}}

* Effet de `as_count()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur SUM.
  * Multiplie le résultat découlant de l'agrégation par l'intervalle d'échantillonnage. Par exemple, les points `[0.05, 0.05, 0.05, 0.05].as_count()` envoyés toutes les secondes avec un intervalle de cumul de 20 s génèrent les valeurs `[1,1,1,1]`.
* Effet de `as_rate()` :
  * Désactive toute [interpolation][1].
  * Définit l'agrégateur temporel sur `SUM`.

[1]: /fr/dashboards/faq/interpolation-the-fill-modifier-explained/
{{% /tab %}}
{{% tab "GAUGE" %}}

Le type de métrique `GAUGE` représente la valeur finale et absolue d'une métrique. Les modificateurs `as_count()` and `as_rate()` ne changent pas la valeur de ce type de métrique.

{{% /tab %}}
{{< /tabs >}}

## Modifier un type de métrique dans Datadog

Bien que cette opération ne soit généralement pas requise, vous pouvez modifier le type d'une métrique dans la [page de résumé des métriques][4] :

{{< img src="developers/metrics/type_modifiers/metric_type.png" alt="Type de métrique"  style="width:70%;">}}

Exemple de scénario :

1. Vous disposez d'une métrique `app.requests.served` qui compte les requêtes traitées, mais vous l'avez envoyée par inadvertance via StatsD en tant que `GAUGE`. Le type de métrique dans Datadog est donc `GAUGE`.

2. Vous souhaitez envoyer `app.requests.served` en tant que métrique `COUNT` StatsD pour l'agréger temporellement. Cela vous permettrait de déterminer le _nombre de requêtes traitées lors des dernières 24 heures_, en envoyant `sum:app.requests.served{*}`. Cette requête est cependant illogique pour une métrique de type `GAUGE`.

3. Vous souhaitez conserver le nom `app.requests.served`. Ainsi, au lieu d'envoyer un nouveau nom de métrique avec le type `COUNT` plus approprié, vous pouvez modifier le type de `app.requests.served` en mettant à jour :
  * Votre code d'envoi, en appelant `dogstatsd.increment('app.requests.served', N)` après le traitement de N requêtes.
  * Le type au sein de l'application Datadog, via la page de résumé des métriques, en le définissant sur `RATE`.

Ainsi, les données envoyées avant le changement de type pour `app.requests.served` affichent un comportement incorrect, car elles ont été enregistrées dans un format qui doit être interprété comme un type `GAUGE` (et non comme un type `RATE`) au sein de l'application. Les données envoyées après l'étape 3 sont interprétées correctement.

Si vous ne souhaitez pas perdre les données historiques envoyées en tant que type `GAUGE`, créez un nom de métrique avec le nouveau type, en laissant le type de requête `app.requests.served` inchangé.

**Remarque** : pour le check de l'Agent, `self.increment` ne calcule pas le delta pour un accroissement uniforme de counter, mais signale la valeur transmise lors du check. Pour envoyer la valeur delta pour un accroissement uniforme de counter, utilisez `self.monotonic_count`. 

[1]: /fr/developers/metrics/types/
[2]: /fr/metrics/introduction/#time-aggregation
[3]: /fr/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[4]: https://app.datadoghq.com/metric/summary