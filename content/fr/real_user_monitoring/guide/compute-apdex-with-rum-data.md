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
- link: /real_user_monitoring/browser/data_collected
  tag: Documentation
  text: Données RUM recueillies (Browser)
- link: /real_user_monitoring/android/data_collected
  tag: Documentation
  text: Données RUM recueillies (Android)
- link: /real_user_monitoring/ios/data_collected
  tag: Documentation
  text: Données RUM recueillies (iOS)
kind: guide
title: Calculer votre score Apdex et des indicateurs de performance personnalisés
  avec les données RUM
---

## Présentation

Datadog recueille des événements Real User Monitoring (RUM) depuis les SDK RUM Browser et Mobile, que vous pouvez utiliser pour créer des graphiques rapides et calculer des indicateurs de performance tels que le score Apdex.

Pour calculer votre score Apdex, vous pouvez utiliser les données de surveillance des services issues de l'APM ou les données de surveillance des utilisateurs issues des SDK RUM. Ce guide vous expliquera comment calculer le score Apdex d'une application à partir des données RUM et comment utiliser le widget **Valeur de requête** dans un [graphique rapide][1].

Pour en savoir plus sur le calcul du score Apdex à partir des données de surveillance des services, consultez [Configurer un score Apdex par service][2].

## Prérequis

- Votre application Web ou mobile doit être instrumentée à l'aide du SDK RUM. Pour configurer l'instrumentation, consultez [Surveillance Browser avec RUM][3], [Surveillance Android avec RUM][4] et [Surveillance iOS avec RUM][5].
- Les événements de votre application doivent être disponibles dans Datadog.

## Calculer un score Apdex

L'exemple ci-dessous permet de calculer un score Apdex en utilisant la métrique de performance Largest Contentful Paint des événements RUM, avec un seuil hypothétique de `T = 2 sec`. La latence minimale de frustration est de `4T = 8 sec`. La valeur résultante est affichée dans un graphique rapide avec le widget Valeur de requête, et vous pouvez l'exporter vers un dashboard ou un notebook.

### Créer un graphique rapide

1. Accédez à **Dashboards** > **Quick Graph**.
2. Créez trois requêtes RUM :
   * [Requête `a`](#requete-a) : pour tous les chargements de page satisfaisants (vues RUM où le Largest Contentful Paint prend moins de 2 secondes à charger).
   * [Requête `b`](#requete-b) : pour tous les chargements de page acceptables (vues RUM où le Largest Contentful Paint prend moins de 8 secondes à charger).
   * [Requête `c`](#requete-c) : pour tous les chargements de page (toutes les vues RUM).
3. Dans le champ **Formula**, entrez la formule Apdex `(a + 0.5 * b) / c`.
4. Sous **Select a visualization**, cliquez sur **Query Value**. Un widget Valeur de requête apparaît.
5. Dans le sélecteur d'intervalle, sélectionnez **Past 1 Day**. Par défaut, le widget affiche les données en Global Time.
6. Donnez un nom à votre graphique, par exemple `Apdex Score`.
7. Si vous le souhaitez, vous pouvez exporter ou copier/coller le graphique rapide vers un dashboard ou un notebook. Vous pouvez également cliquer sur **Export** > **New Dashboard** pour créer un dashboard avec ce graphique rapide.

#### Requête A

1. Dans **Graph your data**, sélectionnez `RUM` comme source de données pour la requête `a` et saisissez `@view.largest_contentful_paint:<2s`.
2. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Largest Contentful Paint:<2s` apparaît à proximité de `RUM` pour la requête `a`.

#### Requête B

1. Pour créer la requête `b`, cliquez sur **+ Add Query**.
2. Sélectionnez `RUM` comme source de données pour la requête `b` et saisissez `@view.largest_contentful_paint:[2s TO 8s]`.
3. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Largest Contentful Paint:[2s - 8s]` apparaît à proximité de `RUM` pour la requête `b`.

#### Requête C

1. Pour créer la requête `c`, cliquez sur **+ Add Query**.
2. Sélectionnez `RUM` comme source de données pour la requête `c` et saisissez `@Type:view`.
3. Appuyez sur Entrée ou cliquez sur **Update query** dans le menu déroulant. La requête `Type:view` apparaît à proximité de `RUM` pour la requête `c`.

{{< img src="real_user_monitoring/guide/quick-graph.png" alt="Score Apdex dans un graphique rapide" style="width:100%;">}}

### Configuration JSON

Pour accéder au code JSON de ce graphique, cliquez sur l'onglet **JSON** à côté de **Edit**.

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

## Visualisations et scores Apdex supplémentaires

Dans l'exemple qui précède, le score Apdex prend en compte les événements RUM de type View et la métrique de performance Largest Contentful Paint.

Vous pouvez également calculer d'autres scores Apdex à l'aide des méthodes suivantes :

- Pour visualiser l'évolution d'un score Apdex dans le temps, sélectionnez `Timeseries` au lieu de `Query Value` dans **Select your visualization**.
- Pour calculer le score Apdex d'une application spécifique, ajoutez une requête `@application.name` supplémentaire et mettez à jour votre formule.
- Pour calculer le score Apdex à partir d'une autre métrique de performance RUM, telle que First Contentful Paint, remplacez `@view.LargestContentfulPaint` par `@view.FirstContentfulPaint` dans les requêtes.

Pour calculer d'autres indicateurs de performance pour vos applications, déterminez les points de données dont vous avez besoin ainsi que les événements RUM à prendre en compte avant de [créer un graphique rapide](#creer-un-graphique-rapide).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/quick-graphs/
[2]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm
[3]: /fr/real_user_monitoring/browser/
[4]: /fr/real_user_monitoring/android/
[5]: /fr/real_user_monitoring/ios/