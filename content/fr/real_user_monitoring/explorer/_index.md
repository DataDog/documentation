---
title: RUM Explorer
kind: documentation
aliases:
  - /fr/real_user_monitoring/rum_explorer
further_reading:
  - link: /real_user_monitoring/explorer/search
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/rum_explorer
    tag: Documentation
    text: Explorez vos vues dans Datadog
---
{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM explorer" >}}

La page Real User Monitoring (RUM) Explorer vous permet d'explorer toutes les vues recueillies à partir de vos différentes applications.

## Contexte

Créez un contexte pour explorer vos vues sur votre page RUM Explorer. Commencez par sélectionner l'[intervalle](#intervalle) approprié, puis utilisez la [barre de recherche][1] pour filtrer vos vues et vos analyses.

### Intervalle

L'intervalle est visible juste en dessous de la barre de recherche. Cette fonctionnalité vous permet de limiter votre vue ou votre analyse à une période donnée.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante :

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="Sélecteur d'intervalle RUM" style="width:40%;">}}

Tous les paramètres de recherche sont contenus dans l'URL. Vous pouvez partager votre vue en partageant l'URL.

## Visualisation

Cliquez sur une vue pour ouvrir le volet des vues et l'examiner plus en détail (ressources, traces, erreurs, actions utilisateur, tâches longues, logs ou attributs) :

{{< img src="real_user_monitoring/explorer/rum_views.png" alt="Vue RUM" style="width:80%;">}}

## Configuration - Facettes et mesures

Une fois [recueillis][2], vos attributs de vues peuvent être indexés en tant que facettes ou mesures afin d'être accessibles pour votre création de [contexte](#contexte) et vos [analyses][3].

Remarque : pour tirer le meilleur parti de votre page RUM Explorer, assurez-vous que les attributs de vos vues suivent la [convention de nommage d'attributs Datadog][4].

{{< tabs >}}
{{% tab "Facettes" %}}

Une facette présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre de vues représentées. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="Démonstration facettes" style="width:80%;">}}

**Créer une facette** :

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="Créer une facette" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles vues** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête RUM Analytics][2].

[1]: /fr/real_user_monitoring/explorer/search/#search
[2]: /fr/real_user_monitoring/rum_analytics
{{% /tab %}}
{{% tab "Mesures" %}}

Une mesure est un attribut doté d'une valeur numérique contenue dans vos vues.

**Créer une mesure** :

Pour commencer à utiliser un attribut en tant que mesure, cliquez sur un attribut numérique de vos vues :

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Créer une mesure" style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles vues** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête RUM Analytics][2].

**Sélectionner l'unité de mesure** :

Chaque mesure dispose de sa propre unité. Celle-ci est affichée dans les colonnes du RUM Explorer et dans les analyses RUM.

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Modifier une mesure" style="width:50%;">}}

[1]: /fr/real_user_monitoring/explorer/search/#search
[2]: /fr/real_user_monitoring/rum_analytics
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/search/#search-syntax
[2]: /fr/real_user_monitoring/installation
[3]: /fr/real_user_monitoring/explorer/analytics
[4]: /fr/logs/processing/attributes_naming_convention/