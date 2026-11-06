---
description: Guide pour calculer votre score Apdex et des indicateurs de performance
  personnalisés avec les données RUM
further_reading:
- link: /tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
  tag: Documentation
  text: Configurer un score Apdex par service
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Dashboards RUM
- link: /real_user_monitoring/application_monitoring/browser/data_collected
  tag: Documentation
  text: Données RUM Browser recueillies
- link: /real_user_monitoring/android/data_collected
  tag: Documentation
  text: Données RUM recueillies (Android)
- link: /real_user_monitoring/ios/data_collected
  tag: Documentation
  text: Données RUM recueillies (iOS)
title: Calculer votre score Apdex et des indicateurs de performance personnalisés
  avec les données RUM
---
## Présentation {#overview}

Datadog recueille des événements Real User Monitoring (RUM) depuis les SDK RUM Browser et Mobile, que vous pouvez utiliser pour créer des graphiques rapides et calculer des indicateurs de performance tels que le score Apdex. 

Pour calculer votre score Apdex, vous pouvez utiliser la surveillance des services depuis APM ou les données de surveillance des utilisateurs depuis les SDK RUM. Ce guide fournit des instructions sur le calcul de l'Apdex pour une application avec des données RUM et le widget {{< ui >}}Query Value{{< /ui >}} dans un [Quick Graph][1].

Pour en savoir plus sur le calcul du score Apdex à partir des données de surveillance des services, consultez [Configurer un score Apdex par service][2].

## Prérequis {#prerequisites}

- Votre application web ou mobile est instrumentée avec le SDK RUM. Pour configurer l'instrumentation, consultez [RUM Browser Monitoring][3], [RUM Android Monitoring][4] et [RUM iOS Monitoring][5].
- Les événements de votre application sont disponibles dans Datadog.

## Calculer un score Apdex {#compute-an-apdex-score}

L'exemple ci-dessous calcule un score Apdex en utilisant la métrique de performance Largest Contentful Paint à partir des événements RUM, et un seuil hypothétique de `T = 2 sec`. La latence frustrante minimale est de `4T = 8 sec`. La valeur résultante est affichée dans un Query Value widget quick graph que vous pouvez exporter vers des dashboards ou des notebooks.

### Créer un quick graph {#create-a-quick-graph}

1. Accédez à {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}Quick Graph{{< /ui >}}.
2. Créez trois requêtes RUM :
   * [Requête `a`](#query-a) pour tous les chargements de page satisfaisants (vues RUM où le Largest Contentful Paint prend moins de 2 secondes à charger).
   * [Requête `b`](#query-b) pour tous les chargements de page tolérés (vues RUM où le Largest Contentful Paint prend moins de 8 secondes à charger).
   * [Requête `c`](#query-c) pour tous les chargements de page (toutes les vues RUM).
3. Dans le champ {{< ui >}}Formula{{< /ui >}}, saisissez la formule Apdex `(a + 0.5 * b) / c`.
4. Sous {{< ui >}}Select a visualization{{< /ui >}}, cliquez sur {{< ui >}}Query Value{{< /ui >}}. Un Query Value widget apparaît.
5. Dans le sélecteur de plage temporelle, sélectionnez {{< ui >}}Past 1 Day{{< /ui >}}. Par défaut, le widget s'affiche en Global Time.
6. Saisissez un nom pour votre graphique, tel que `Apdex Score`.
7. Optionnellement, exportez ou copiez et collez le quick graph vers un dashboard ou un notebook, ou cliquez sur {{< ui >}}Export{{< /ui >}} > {{< ui >}}New Dashboard{{< /ui >}} pour créer un dashboard avec ce quick graph. 

#### Requête A :{#query-a}

1. Dans {{< ui >}}Graph your data{{< /ui >}}, sélectionnez `RUM` comme source de données pour la requête `a` et saisissez `@view.largest_contentful_paint:<2s`.
2. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Largest Contentful Paint:<2s` apparaît à côté de `RUM` pour la requête `a`.

#### Requête B {#query-b}

1. Pour créer la requête `b`, cliquez sur {{< ui >}}\+ Add Query{{< /ui >}}.
2. Sélectionnez `RUM` comme source de données pour la requête `b` et saisissez `@view.largest_contentful_paint:[2s TO 8s]`.
3. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Largest Contentful Paint:[2s - 8s]` apparaît à côté de `RUM` pour la requête `b`.

#### Requête C {#query-c}

1. Pour créer la requête `c`, cliquez sur {{< ui >}}\+ Add Query{{< /ui >}}.
2. Sélectionnez `RUM` comme source de données pour la requête `c` et saisissez `@Type:view`.
3. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Type:view` apparaît à côté de `RUM` pour la requête `c`.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Score Apdex dans un quick graph" style="width:100%;">}}

### JSON configuration {#json-configuration}

Pour accéder au code JSON de ce graphique, cliquez sur l'onglet {{< ui >}}JSON{{< /ui >}} à côté de {{< ui >}}Edit{{< /ui >}}.

Cliquez sur l'icône Copier située sur la droite pour copier le JSON du graphique rapide dans votre presse-papiers.

{{< code-block lang="json" filename="JSON" disable_copy="false" collapsible="true" >}}
{
    "viz": "query_value",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "(query1 + 0.5 * query2) / query3"
                }
            ],
            "queries": [
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:<2000000000"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query1",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view @view.largest_contentful_paint:[2000000000 TO 8000000000]"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query2",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                },
                {
                    "search": {
                        "query": "@type:view"
                    },
                    "data_source": "rum",
                    "compute": {
                        "aggregation": "count"
                    },
                    "name": "query3",
                    "indexes": [
                        "*"
                    ],
                    "group_by": []
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ],
    "autoscale": true,
    "precision": 2
}
{{< /code-block >}}

## Visualisations supplémentaires et scores Apdex {#additional-visualizations-and-apdex-scores}

Dans l'exemple qui précède, le score Apdex prend en compte les événements RUM de type View et la métrique de performance Largest Contentful Paint.  

Vous pouvez également calculer d'autres scores Apdex à l'aide des méthodes suivantes :

- Pour voir la tendance du score Apdex au fil du temps, sélectionnez {{< ui >}}Timeseries{{< /ui >}} au lieu de {{< ui >}}Query Value{{< /ui >}} dans {{< ui >}}Select your visualization{{< /ui >}}.
- Pour calculer le score Apdex pour une application spécifique, ajoutez une requête `@application.name` supplémentaire et mettez à jour votre formule.
- Pour calculer le score Apdex avec une autre métrique de performance RUM telle que First Contentful Paint, remplacez `@view.LargestContentfulPaint` par `@view.FirstContentfulPaint` dans les requêtes.

Pour calculer des indicateurs de performance supplémentaires pour vos applications, déterminez les points de données dont vous avez besoin et quels événements RUM sont pertinents pour vous avant de [créer un quick graph](#create-a-quick-graph).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/quick-graphs/
[2]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /fr/real_user_monitoring/application_monitoring/browser/
[4]: /fr/real_user_monitoring/android/
[5]: /fr/real_user_monitoring/ios/