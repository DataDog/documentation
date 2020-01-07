---
title: Widget Statut de check
kind: documentation
description: Représentez graphiquement le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé.
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
Le widget Statut de check affiche le statut actuel ou le nombre de résultats associés à n'importe quel check réalisé :

{{< img src="graphing/widgets/check_status/check_status.png" alt="Widget Statut de check" >}}

## Implémentation

{{< img src="graphing/widgets/check_status/check_status_setup.png" alt="Configuration d'un widget Statut de check"  style="width:80%;">}}

### Configuration

1. Sélectionnez un check de service précédemment créé.
2. Sélectionnez un intervalle de transmission parmi les options suivantes :
  * Global Time
  * The past 10 minutes
  * The past 30 minutes
  * The past hour
  * The past 4 hours
  * The past day
3. Sélectionnez votre contexte :
    * **A single check** : sélectionnez cette option si votre widget Statut de check est dédié à un élément en particulier, p. ex. à un `host:<HOSTNAME>`, à un `service:<NOM_SERVICE>`, etc.
    * **A cluster of checks** : sélectionnez cette option si votre widget Statut de check est dédié à un ensemble d'éléments, p. ex. à l'ensemble des `host`s ou des `service`s, etc.

4. Terminez ensuite de définir le contexte de votre widget Statut de check en renseignant le champ **Reported by**.
5. Facultatif : regroupez vos résultats de check en fonction d'une clé de tag personnalisée.

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.


## API

Le [schéma JSON][1] utilisé pour le widget Statut de check est le suivant :

```
CHECK_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["check_status"]},
        "check": {"type": "string"},
        "grouping": {"enum": ["check", "cluster"]},
        "group": {"type": "string"},
        "tags":  {"type": "array", "items": {"type": "string"}},
        "group_by":  {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"}
    },
    "required": ["type", "check", "grouping"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | chaîne          | oui      | Type de widget (utilisez `check_status` pour le widget Statut de check)|
| `check`     | chaîne          | oui      | Nom du check à utiliser dans le widget|
| `grouping`| chaîne| oui| Le type de regroupement à utiliser (un seul check ou un cluster de checks). Valeurs disponibles : `check` ou `cluster`|
| `group`| chaîne| non| Groupe transmettant un seul check|
| `tags`| Tableau de chaînes| non| Liste des tags utilisés pour filtrer les groupes transmettant un check de cluster|
| `group_by`| Tableau de chaînes| non| Liste des préfixes de tags à utiliser pour le regroupement dans le cas d'un check de cluster|
|`title`|chaîne|non|Titre du widget|

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json