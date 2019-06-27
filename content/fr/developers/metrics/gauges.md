---
title: Gauges
kind: documentation
further_reading:
  - link: developers/metrics
    tag: Documentation
    text: En savoir plus sur les métriques
  - link: developers/libraries
    tag: Documentation
    text: Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté
---
## Présentation

Les gauges mesurent la valeur d'un élément précis au fil du temps :

## Envoi

### Check de l'Agent

{{% table responsive="true" %}}
|Méthode | Présentation |
|:---|:---|
|self.gauge(...)|<ul><li>Si cette méthode est appelée plusieurs fois lors de l'exécution du check pour une métrique, seul le dernier échantillon est utilisé.</li><li>Stocké en tant que GAUGE dans une application Web.</li></ul>|
{{% /table %}}

### DogStatsD

{{% table responsive="true" %}}
|Méthode | Présentation |
|:---|:---|
|dog.gauge(...)|Stocké en tant que GAUGE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond à la dernière valeur gauge envoyée pour cette métrique durant la période de transmission de StatsD.|
{{% /table %}}

#### Exemple

Consultez la [documentation relative à DogStatsD][1] pour obtenir des exemples de code.

## Changements au sein de l'application

* Effet de `as_count()` : aucun
* Effet de `as_rate()` : aucun

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/developers/dogstatsd/data_types#gauges