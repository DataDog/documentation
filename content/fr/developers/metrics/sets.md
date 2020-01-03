---
title: Sets
kind: documentation
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques client de Datadog et sa communauté pour DogstatsD et les API
---
## Présentation

Les sets servent à compter le nombre d'éléments uniques dans un groupe.

## Soumission

### Check de l'Agent

{{% table  %}}

|Méthode | Présentation |
|:---|:---|
|self.set(...)|Utilisé pour compter le nombre d'éléments uniques dans un groupe :<ul><li>Devrait faire l'objet de plusieurs appels durant l'exécution d'un check de l'Agent.</li><li>Stocké en tant que GAUGE dans l'application Web de Datadog.</li></ul>||
{{% /table %}}

### DogStatsD

{{% table  %}}

|Méthode | Présentation |
|:---|:---|
|dog.set(...)|Utilisé pour compter le nombre d'éléments uniques dans un groupe :<ul><li>Stocké en tant que GAUGE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond au nombre de valeurs uniques envoyées à StatsD pour une métrique durant la période de transmission.</li></ul>|
{{% /table %}}

#### Exemple d'utilisation de DogStatsD

Consultez la [documentation relative à DogStatsD][1] pour obtenir des exemples de code.

## Changements au sein de l'application

* Effet de `as_count()` :
    * Définit l'agrégateur temporel sur SUM.
    * Utilise l'intervalle de métadonnées pour convertir les taux bruts en totaux. Ne fonctionne pas si aucun intervalle de métadonnées n'existe pour la métrique.
* Effet de `as_rate()` :
    * Définit l'agrégateur temporel sur SUM.
    * Utilise l'intervalle de requête et l'intervalle de métadonnées pour calculer le taux d'agrégation temporelle. Ne fonctionne pas si aucun intervalle de métadonnées n'existe pour la métrique.
* Problème connu : les métriques RATE envoyées par le check de l'Agent n'ont pas de métadonnées d'intervalle. Par conséquent, as_rate() et as_count() ne fonctionnent pas.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/data_types#sets