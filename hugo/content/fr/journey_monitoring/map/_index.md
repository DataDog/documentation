---
description: Visualisez et surveillez les performances de vos parcours dans la Journey
  Monitoring map.
further_reading:
- link: /journey_monitoring
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/map/suggested_journeys/
  tag: Documentation
  text: En savoir plus sur les parcours suggérés
- link: /journey_monitoring/details_report/
  tag: Documentation
  text: En savoir plus sur les rapports de détails des parcours
- link: /journey_monitoring/details_report/variants/
  tag: Documentation
  text: En savoir plus sur les variantes de parcours
- link: /journey_monitoring/uptime/
  tag: Documentation
  text: En savoir plus sur l'uptime des parcours.
title: Map
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="Rejoignez la Preview !">}}
Journey Monitoring est en Preview.
{{< /callout >}}

## Présentation {#overview}

La **Journey Monitoring map** affiche tous les parcours créés et suggérés dans une application frontend. Chaque vignette de la map affiche des métriques sur le volume et le taux de conversion d'un parcours. Si le parcours comporte au moins un test Synthetic défini, la vignette affiche également la métrique d'uptime de la [collection de tests Synthetic][1] du parcours.

<div class="alert alert-danger"><p>Seules les applications frontend instrumentées avec RUM without Limits, Synthetic Monitoring & Testing ou Product Analytics sont éligibles à Journey Monitoring.</p></div>

## Explorer et gérer les parcours {#explore-and-manage-journeys}

Utilisez la map pour explorer et gérer vos parcours :
- Modifiez le niveau de zoom sur la map
- Survolez un parcours pour voir sa description, son point de départ et son point d'arrivée
- Cliquez sur un parcours dans le catalogue pour accéder au [rapport de détails][2] du parcours
- Utilisez les filtres et la barre de recherche pour restreindre les parcours affichés dans le catalogue et sur la map.
- Cliquez sur le menu à trois points d'un parcours pour modifier ou supprimer le parcours

## États des parcours {#journey-states}

Les parcours dans la map et le catalogue peuvent être codés par couleur en fonction de leur configuration et de leurs performances :
- Les parcours suggérés sont **violets** et marqués avec une pastille « Suggestion »
- Les parcours avec un taux de conversion en baisse sont **orange** et contiennent un chevron rouge
- Les parcours avec des tests en échec sont **rouges**
- Les parcours sans test dans leur collection de tests Synthetic contiennent un **avertissement** dans leur info-bulle

## Flux d'utilisateurs dans la map {#user-flows-in-the-map}

Le nœud le plus à gauche de la map représente le point de départ de toutes les sessions utilisateur dans votre application. Tous les autres nœuds de la map sont soit des pages, soit des parcours. Un nœud de page peut représenter un chemin parent qui se développe pour afficher ses pages imbriquées.

{{< img src="journey_monitoring/journey-monitoring-map-zoom-1.png" alt="La carte Journey Monitoring affiche un catalogue de parcours sur la gauche avec des métriques de trafic et de conversion, et une carte de flux visuelle sur la droite affichant les chemins utilisateur entre les vues et les actions de l'application." style="width:100%;" >}}

Plus la ligne de connexion est épaisse, plus le trafic circule entre deux nœuds. Les parcours qui ne sont pas connectés au nœud de début de session sont des parcours vers lesquels les utilisateurs naviguent uniquement après le début d'une session, plutôt qu'en tant que point d'entrée dans l'application.

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/synthetics/test_suites/
[2]: /fr/journey_monitoring/details_report/