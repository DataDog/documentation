---
title: Metrics Explorer
kind: documentation
description: Plongez au cœur de l'ensemble de vos métriques et effectuez des analyses.
further_reading:
  - link: graphing/metrics/summary
    tag: Documentation
    text: Résumé des métriques
  - link: graphing/metrics/distributions
    tag: Documentation
    text: Distributions de métriques
---
Consultez la [page Metrics Explorer][1] pour commencer à examiner les [métriques][2] recueillies depuis votre application par Datadog.

Cliquez sur la zone de texte *Graph* pour afficher la liste de l'ensemble des métriques rassemblées par Datadog depuis votre application. Vous pouvez également effectuer des recherches au sein de la liste en saisissant un terme dans la zone. Sélectionnez des métriques pour remplir en temps réel des visualisations graphiques dans le volet de droite. Par défaut, vous pouvez afficher jusqu'à 20 graphiques. Cette limite peut être modifiée en cliquant sur l'icône en forme d'engrenage pour accéder aux options.

{{< img src="graphing/metrics/explorer/explorer.png" alt="Metrics Explorer"  style="width:60%;" >}}

L'option « Over » vous permet d'affiner vos résultats en fonction d'un tag. Sous « One graph per », vous pouvez choisir de séparer une métrique en plusieurs graphiques par host, conteneur, région, équipe, etc.

{{< img src="graphing/metrics/explorer/split-by-team.png" alt="Séparation par équipe"  style="width:60%;">}}

Vous pouvez également exporter ces graphiques au sein de timeboards existants ou créer un timeboard à partir de ces graphiques.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /fr/developers/metrics