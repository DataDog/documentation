---
aliases:
- /fr/service_management/app_builder/custom_charts/
- /fr/service_management/app_builder/components/custom_charts
description: Créez des graphiques personnalisés dans vos applications à l'aide des
  spécifications Vega-Lite pour visualiser les données issues de requêtes avec différents
  types et styles de graphiques.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
- link: /actions/workflows/build/
  tag: Documentation
  text: Créer des applications
title: Graphiques personnalisés
---
Cette page fournit un exemple de la manière d'utiliser le composant de graphique personnalisé dans vos applications App Builder.

Le workflow de base pour créer un graphique personnalisé est le suivant :

1. Créez ou choisissez une requête contenant les données que vous souhaitez représenter graphiquement.
1. Ajoutez le composant de graphique personnalisé et choisissez un style de graphique depuis l'interface utilisateur d'App Builder ou la [galerie d'exemples Vega-Lite][1].
1. Remplacez les valeurs de l'exemple par les données de votre requête.

Alternativement, vous pouvez utiliser Bits AI pour commencer avec un graphique personnalisé :
   1. Cliquez sur l'icône {{< ui >}}Build with AI{{< /ui >}} ({{< ui >}}<i class="icon-bits-ai"></i>{{< /ui >}}).
   1. Saisissez une invite personnalisée ou essayez l'invite `Can you help me create a custom chart?`.

## Exemple de flux de configuration {#example-setup-flow}

L'exemple suivant montre comment créer un histogramme illustrant les logs Datadog regroupés par service.

### Configurez votre source de données {#set-up-your-data-source}

1. Cliquez sur {{< ui >}}\+ New Query{{< /ui >}}.
1. Recherchez « search logs » et choisissez l'action Datadog {{< ui >}}Search logs{{< /ui >}} pour créer une requête appelée `searchLogs0`.
1. Choisissez une connexion de compte Datadog existante ou créez-en une nouvelle.
1. Sous {{< ui >}}Inputs{{< /ui >}}, pour {{< ui >}}Time period{{< /ui >}}, choisissez {{< ui >}}Past 2 Days{{< /ui >}}.
1. Cliquez sur {{< ui >}}Run{{< /ui >}}.<br>Un panneau affiche les résultats de votre requête en bas à gauche.
1. Sous `logs`, développez `0`, puis développez `content`. Ceci affiche les propriétés disponibles pour chaque log.


### Ajoutez le composant de graphique personnalisé et choisissez un style de graphique {#add-the-custom-chart-component-and-choose-a-chart-style}

1. Cliquez sur {{< ui >}}\+ All Components{{< /ui >}} et sélectionnez {{< ui >}}Custom Chart{{< /ui >}} pour ajouter un composant appelé `customChart0`.
1. Cliquez sur {{< ui >}}Show Chart Examples{{< /ui >}}.
1. Sélectionnez {{< ui >}}Simple Histogram{{< /ui >}} et cliquez sur {{< ui >}}Confirm{{< /ui >}}.<br>La valeur suivante s'affiche dans la spécification Vega-Lite :

   {{< code-block lang="json" disable_copy="true" collapsible="true" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "https://vega.github.io/editor/data/movies.json"
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "bin": true,
            "field": "IMDB Rating"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}{{< /code-block >}}


### Remplacez les valeurs d'exemple par vos données {#replace-example-values-with-your-data}

Remplacez la spécification Vega-Lite renseignée automatiquement par ce qui suit pour modifier la source de données et la valeur représentée sur l'axe des x :

{{< highlight json "hl_lines=4 12" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "values": searchLogs0.outputs.logs
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "content.service"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}
{{< /highlight >}}

Un histogramme affichant vos données de logs Datadog s'affiche.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][0].

[0]: https://chat.datadoghq.com/
[1]: https://vega.github.io/vega-lite/examples/