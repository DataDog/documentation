---
title: Métriques
type: apicontent
order: 26
external_redirect: /api/#metriques
---

## Métriques

Grâce au endpoint métrique, vous pouvez :

* Envoyer vos données de métriques afin de les afficher sur les dashboards de Datadog
* Interroger les métriques de n'importe quelle période

Sachez qu'un graphique ne peut contenir qu'un nombre défini de points. Lorsque la durée d'affichage d'une métrique augmente, les points sont agrégés afin de ne pas dépasser ce nombre.

Datadog applique une limite souple de 100 séries temporelles par host. Une série temporelle désigne une combinaison unique d'un tag et d'un nom de métrique.