---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
title: Regrouper des événements RUM
---

## Présentation

Il est tout aussi pertinent de consulter vos événements Real User Monitor (RUM) individuellement ou sous la forme de groupes. Vous pouvez définir dans vos requêtes de recherche des options permettant d'agréger un sous-ensemble d'événements.

{{< img src="real_user_monitoring/explorer/group_into_fields-2.png" alt="L'option Group into fields dans une requête de recherche" style="width:100%;" >}}

Les champs que vous avez sélectionnés pour regrouper, agréger et mesurer vos événements sont conservés lorsque vous passez d'un type de visualisation à un autre.

## Agréger des événements par champ

Tous les événements RUM qui correspondent à votre requête de filtre sont agrégés dans des groupes en fonction de la valeur d'une ou plusieurs facettes d'événement. Vous pouvez extraire les mesures suivantes en plus des agrégats :

- Le nombre d'événements par groupe

  {{< img src="real_user_monitoring/explorer/group-count-of-events.png" alt="Regrouper par nombre dʼévénements" style="width:90%;" >}}

- Le nombre de valeurs codées uniques pour une facette par groupe

  {{< img src="real_user_monitoring/explorer/group-unique-count-coded-values-2.png" alt="Regrouper par nombre unique de valeurs codées" style="width:90%;" >}}

- Les opérations statistiques (minimum, maximum, moyenne et centiles) des valeurs numériques d'une facette par groupe

  {{< img src="real_user_monitoring/explorer/group-statistical-operations-2.png" alt="Regrouper en champs à lʼaide dʼopérations statistiques" style="width:90%;" >}}

Les événements individuels qui présentent plusieurs valeurs pour une facette unique appartiennent à autant d'agrégats qu'il existe de valeurs différentes. Par exemple, un événement RUM avec les attributs `country:france` et `browser:chrome` est comptabilisé une fois dans l'agrégat `country:france` et une fois dans l'agrégat `browser:chrome`.

L'agrégation **Group into fields** vous permet de définir une dimension pour les [top lists][1] et jusqu'à trois dimensions pour les [séries temporelles][2], [listes][3] et [tableaux][4]. Lorsque plusieurs dimensions sont définies, les principales valeurs sont déterminées en fonction de la première dimension, puis de la deuxième dans la fourchette des principales valeurs de la première dimension, puis de la troisième dans la fourchette des principales valeurs de la deuxième dimension, etc.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/visualize#top-list
[2]: /fr/real_user_monitoring/explorer/visualize#timeseries
[3]: /fr/real_user_monitoring/explorer/visualize#lists
[4]: /fr/real_user_monitoring/explorer/visualize#nested-tables