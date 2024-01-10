---
aliases:
- /fr/graphing/widgets/log_stream/
description: Affichez un flux de logs filtré dans vos dashboards Datadog.
further_reading:
- link: /logs/explorer/analytics/
  tag: Documentation
  text: Analyse de logs
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
kind: documentation
title: Widget Flux de logs
---

Affichez un flux de logs correspondant à la requête de votre choix.

## Implémentation

{{< img src="/dashboards/widgets/log_stream/log_stream_config.png" alt="Configuration de flux de logs filtrée selon source:nodejs, avec trois colonnes pour la date, le host et le service." style="width:100%;" >}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux de logs.
1. Vous pouvez regrouper les logs en sous-ensembles d'événements [Log Analytics][2], qui comprennent des `Patterns` et des `Transactions`.
1. Modifiez les colonnes de façon à afficher les valeurs de vos [facettes][3] et [mesures][4].
1. Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la section [Dashboards][5] pour en savoir plus.

Le [schéma JSON][6] utilisé pour le widget Flux de logs est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search/
[2]: /fr/logs/explorer/analytics/
[3]: /fr/logs/explorer/facets/
[4]: /fr/logs/explorer/facets/#measures
[5]: /fr/api/latest/dashboards/
[6]: /fr/dashboards/graphing_json/widget_json/