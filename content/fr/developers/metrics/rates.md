---
title: Taux
kind: documentation
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: "En savoir plus sur les métriques"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Bibliothèques de client pour l'API et DogStatsD officielles et entretenues par la communauté"
---

## Présentation

Les taux représentent la dérivée d'une métrique. Il s'agit de la variation de la valeur d'une métrique sur un intervalle de temps défini.

## Envoi

### Check de l'Agent

{{% table responsive="true" %}}

|Méthode | Présentation |
|:---|:---|
|self.rate(...)|Envoie la valeur brute échantillonnée de votre counter. Il est inutile de normaliser les valeurs à un taux ou de calculer les deltas avant l'envoi : l'Agent le fait pour vous.<ul><li>Doit être appelé une seule fois  durant un check.</li><li>Élimine toutes les valeurs inférieures à la valeur précédemment envoyée, ce qui signifie que le counter doit augmenter de manière monotone.</li><li>Stocké en tant que GAUGE dans l'application Web de Datadog. Chaque valeur de la série temporelle stockée correspond à un delta normalisé temporellement de la valeur du counter entre les échantillons.</li></ul>|
{{% /table %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
