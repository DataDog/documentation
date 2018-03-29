---
title: Comment les données sont-elles agrégées dans les graphiques?
kind: faq
---

Dans Datadog, un graphique ne peut contenir qu'un nombre défini de points et, au fur et à mesure que la période temporelle d'affichage d'une métrique augmente, l'agrégation entre les points augmente pour rester en dessous de ce nombre défini.

Ainsi, si vous demandez des plages de données plus longues, les points renvoyés seront plus agrégés. La granularité maximale dans Datadog est d'un point par seconde, donc si vous avez soumis des points à cet intervalle et demandé un très petit intervalle de temps (dans ce cas, probablement moins de deux minutes), vous pourriez finir par afficher tous ces points . Sinon, vous verrez une granularité de plus en plus grossière à mesure que la plage de temps demandée augmente. Cette agrégation de temps à lieu pour les moyenne, somme, min, max ou compte.