---
title: Widget Résumé de service
kind: documentation
description: Affiche le graphique d'un service précis dans votre screenboard.
aliases:
  - /fr/graphing/widgets/service_summary/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le résumé de service affiche le graphique d'un [service][1] précis dans votre screenboard.

{{< img src="dashboards/widgets/service_summary/service_summary.png" alt="résumé de service" >}}

## Configuration

{{< img src="dashboards/widgets/service_summary/service_summary_setup.png" alt="configuration du widget résumé de service" style="width:80%;">}}

### Configuration

1. Sélectionnez un [environnement][2] et un [service][1].
2. Sélectionnez une taille de widget.
3. Sélectionnez les informations à afficher :
    * Hits
    * Errors
    * Latency
    * Breakdown
    * Distribution
    * Ressource
4. Choisissez votre préférence d'affichage en sélectionnant un intervalle et le nombre de colonnes à représenter sur vos graphiques.
5. Saisissez un titre pour votre graphique.

## API

Le [schéma JSON][2] utilisé pour le widget Résumé de service est le suivant :

```text
TRACE_SERVICE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["trace_service"]},
        "env": {"type": "string"},
        "service": {"type": "string"},
        "span_name": {"type": "string"},
        "show_hits": {"type": "boolean"},
        "show_errors": {"type": "boolean"},
        "show_latency": {"type": "boolean"},
        "show_breakdown": {"type": "boolean"},
        "show_distribution": {"type": "boolean"},
        "show_resource_list": {"type": "boolean"},
        "size_format": {"enum": ["small", "medium", "large"]},
        "display_format": {"enum": ["one_column", "two_column", "three_column"]},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "env", "service", "span_name"],
    "additionalProperties": false
}
```

| Paramètre            | Type    | Obligatoire | Description                                                                                                                |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`               | chaîne  | oui      | Type du widget (utilisez `trace_service` pour le widget Résumé de service).                                                     |
| `env`                | chaîne  | oui      | Environnement APM.                                                                                                            |
| `service`            | chaîne  | oui      | Service APM.                                                                                                                |
| `span_name`          | chaîne  | oui      | Nom de span APM.                                                                                                              |
| `show_hits`          | Booléen | non       | Permet d'afficher ou non les métriques de hits.                                                                                    |
| `show_errors`        | Booléen | non       | Permet d'afficher ou non les métriques d'erreur.                                                                                   |
| `show_latency`       | Booléen | non       | Permet d'afficher ou non les métriques de latence.                                                                                 |
| `show_breakdown`     | Booléen | non       | Permet d'afficher ou non des détails sur la latence.                                                                               |
| `show_distribution`  | Booléen | non       | Permet d'afficher ou non la distribution de latence.                                                                            |
| `show_resource_list` | Booléen | non       | Permet d'afficher ou non la liste des ressources.                                                                                   |
| `size_format`        | chaîne  | non       | Taille du widget. Valeurs disponibles : `small`, `medium`, ou `large`.                                                    |
| `display_format`     | chaîne  | non       | Le nombre de colonnes à afficher. Valeurs disponibles : `one_column`, `two_column` ou `three_column`.                          |
| `title`              | chaîne  | non       | Titre du widget.                                                                                                        |
| `title_size`         | chaîne  | non       | Taille du titre.                                                                                                          |
| `title_align`        | chaîne  | non       | Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`.                                                 |
| `time`               | objet  | non       | Définit le paramètre temporel utilisé par le widget. Consultez la [documentation relative au schéma JSON du temps][3] pour apprendre à élaborer le `TIME_SCHEMA` |
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/service/
[2]: /fr/tracing/send_traces/
[3]: /fr/dashboards/graphing_json/widget_json/#time-schema