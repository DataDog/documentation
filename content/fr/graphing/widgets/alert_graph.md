---
title: Widget Graphique des alertes
kind: documentation
description: Créez un graphique illustrant l'état actuel de tous les monitors définis sur votre système.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Les graphiques d'alertes sont des graphiques de séries temporelles affichant l'état actuel de tous les monitors définis sur votre système :

{{< img src="graphing/widgets/alert_graph/alert_graph.png" alt="Graphique d'alerte" >}}

## Implémentation

{{< img src="graphing/widgets/alert_graph/alert_graph_setup.png" alt="Configuration du graphique d'alerte"  style="width:80%;">}}

### Configuration

1. Sélectionnez un monitor existant à représenter graphiquement.
2. Sélectionnez un intervalle.
3. Sélectionnez votre visualisation :
    * Séries temporelles
    * Top list

### Options
#### Préférence d'affichage

{{< img src="graphing/widgets/options/display_preferences.png" alt="Préférences d'affichage"  style="width:80%;">}}

##### Durée globale

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

##### Légende

Utilisez *Show legend on graph* pour activer/désactiver l'affichage de la légende sur votre widget. Vous pouvez également sélectionner le nombre d'entrées à afficher si vous le souhaitez.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][1] utilisé pour le widget Graphique des alertes est le suivant :

```
ALERT_GRAPH_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_graph"]},
        "alert_id": {"type": "string"},
        "viz_type": {"enum": ["timeseries", "toplist"]},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id", "viz_type"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | chaîne          | oui      | Type de widget (utilisez `alert_graph` pour le widget Graphique des alertes)|
| `alert_id`     | chaîne          | oui      | ID de l'alerte à utiliser dans le widget|
|`viz_type`|chaîne|oui|Indique si le graphique d'alerte doit être affiché en tant que série temporelle ou top list. Valeurs disponibles : `timeseries` ou `toplist`.
|`title`|chaîne|non|Titre du widget|

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json