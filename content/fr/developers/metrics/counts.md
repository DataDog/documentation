---
title: Totaux
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

Les counters servent à compter des éléments.

## Soumission

### Check de l'Agent

{{% table responsive="true" %}}

| Méthode | Présentation |
| :----- | :------- |
| self.increment()<br/><sup>obsolète</sup> | Permet de modifier un total d'événements identifiés par la chaîne de la clé de métrique : <ul><li>Peut faire l'objet de plusieurs appels durant l'exécution d'un check.</li><li>Stocké en tant que RATE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond à un delta de la valeur du counter entre les échantillons (normalisé temporellement par l'intervalle d'agrégation, qui est par défaut 1 pour les checks de l'Agent, afin que la valeur corresponde généralement à la valeur du total brut).</li><li>Géré par l'agrégateur de la classe Counter</li></ul> |
| self.decrement()<br /><sup>obsolète</sup> | Permet de modifier un total d'événements identifiés par la chaîne de la clé de métrique :<ul><li>Peut faire l'objet de plusieurs appels durant l'exécution d'un check.</li><li>Stocké en tant que RATE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond à un delta de la valeur du counter entre les échantillons (normalisé temporellement par l'intervalle d'agrégation, qui est par défaut 1 pour les checks de l'Agent, afin que la valeur corresponde généralement à la valeur du total brut).</li><li>Géré par l'agrégateur de la classe Counter</li></ul> |
| self.monotonic_count(...) | Surveille un counter brut qui continue d'augmenter. Ne normalisez pas les valeurs au sein d'un taux et ne calculez pas les deltas avant d'envoyer les valeurs. En effet, cette méthode réalise ces étapes à votre place. Les échantillons qui possèdent une valeur plus faible que l'échantillon précédent sont ignorés (cela signifie généralement que le counter brut sous-jacent a été réinitialisé) :<ul><li>Peut faire l'objet de plusieurs appels durant l'exécution d'un check. <br> Example : la transmission des échantillons 2, 3, 6 et 7 envoie 5 (à savoir, 7 moins 2) lors de la première exécution du check. Si vous transmettez ensuite les échantillons 10 et 11 sur le même monotic_count, cela envoie 4 (à savoir, 11 moins 7) lors de la deuxième exécution du check.</li><li>Stocké en tant que COUNT dans Datadog. Chaque valeur de la série temporelle stockée correspond au delta de la valeur du counter entre les échantillons (pas de normalisation temporelle).</li></ul> |
| self.count(...) | Envoie le nombre d'événements qui se sont produits durant l'intervalle du check : <ul><li>Peut faire l'objet de plusieurs appels durant l'exécution d'un check, chaque échantillon étant ajouté à la valeur transmise.</li><li>Stocké en tant que COUNT dans Datadog.</li></ul> |

{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}

| Méthode | Présentation |
| :----- | :------- |
| dog.increment(...) | Utilisé pour incrémenter un counter d'événements :<ul><li>Stocké en tant que RATE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond au delta normalisé de la valeur du counter durant la période de transmission de StatsD.</li></ul> |
| dog.decrement(...) | Utilisé pour décrémenter un counter d'événements :<ul><li>Stocké en tant que RATE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond au delta normalisé de la valeur du counter durant la période de transmission de StatsD.</li></ul> |
{{% /table %}}

#### Exemple

Consultez la [documentation relative à DogStatsD][1] pour obtenir des exemples de code.

## Changements au sein de l'application

* Effet de `as_count()` :
    * Définit l'agrégateur temporel sur SUM.
* Effet de `as_rate()` :
    * Définit l'agrégateur temporel sur SUM.
    * Normalise les valeurs d'entrée de la série temporelle à partir de l'intervalle (de cumul) de la requête. Par exemple, [1,1,1,1].as_rate() pour un intervalle de cumul de 20 secondes génère [0.05, 0.05, 0.05, 0.05].
* Par défaut, la métrique brute utilise l'agrégateur temporel AVG. Si vous appliquez une agrégation temporelle, il est donc inutile d'interroger la métrique si vous ne précisez pas `as_rate()` ou `as_count()`.
* Attention : sur de faibles intervalles, lorsqu'il n'y a pas d'agrégation temporelle, aucune normalisation n'est appliquée. Cela signifie que vous obtenez les totaux de valeurs de métrique bruts.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/data_types#counters