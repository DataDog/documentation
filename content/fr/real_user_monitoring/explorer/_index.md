---
title: RUM Explorer
kind: documentation
aliases:
  - /fr/real_user_monitoring/rum_explorer
further_reading:
  - link: /real_user_monitoring/rum_explorer/
    tag: Documentation
    text: Explorez vos vues dans Datadog
  - link: /real_user_monitoring/explorer/search/
    tag: Documentation
    text: En savoir plus sur la recherche dans le RUM Explorer
  - link: 'https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals'
    tag: Blog
    text: Surveiller les signaux Web essentiels avec le RUM
---
{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM Explorer"  >}}

Le Real User Monitoring (RUM) Explorer vous permet d'explorer toutes les données recueillies à partir de vos différentes applications. Cette fonctionnalité met à votre disposition des informations précises sur vos événements RUM. Grâce à elle, vous pouvez :
- Parcourir les sessions utilisateur
- Étudier les problèmes de performance affectant les vues, ressources ou actions
- Résoudre les erreurs liées aux applications

## Parcourir le RUM Explorer

{{< img src="real_user_monitoring/explorer/explorer_tabs.png" alt="Onglets du RUM Explorer"  >}}

Par défaut, le RUM Explorer affiche tous les types d'événements. Chaque onglet vous permet d'accéder à une liste personnalisée, dotée de colonnes spécifiques pour le type d'événement RUM sélectionné.

### Volet latéral d'événement

{{< img src="real_user_monitoring/explorer/event_side_panel.png" alt="Volet latéral d'événement RUM"  >}}

Cliquez sur une ligne dans le RUM Explorer pour ouvrir le volet latéral d'événement. Ce volet affiche toutes les informations portant sur un événement RUM. Pour les vues et les actions, un graphique en cascade est affiché, ainsi que les erreurs et ressources associées.

### Onglet Attributes

La fonctionnalité RUM recueille par défaut des informations de contexte. Vous pouvez ajouter des attributs de contexte supplémentaires grâce à l'API Global Context.

{{< img src="real_user_monitoring/explorer/attributes_tab.png" alt="Onglet Attributes du volet latéral d'événement RUM"  >}}

## Contexte

Créez un contexte pour explorer vos événements RUM sur votre page RUM Explorer. Commencez par sélectionner l'[intervalle](#intervalle) approprié, puis utilisez la [barre de recherche][1] pour filtrer vos événements RUM et vos analyses.

### Intervalle

L'intervalle est visible juste en dessous de la barre de recherche. Cette fonctionnalité vous permet de limiter vos événements RUM du flux Explorer ou votre analyse à une période donnée.

Changez rapidement l'intervalle en sélectionnant une durée prédéfinie dans la liste déroulante. Vous pouvez également [saisir un intervalle personnalisé][2] :

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="Sélecteur d'intervalle RUM"  style="width:50%;">}}

Tous les paramètres de recherche sont contenus dans l'URL. Vous pouvez partager votre vue en partageant l'URL.


## Configurer des facettes et des mesures

Une fois recueillis, les attributs de vos événements RUM peuvent être indexés en tant que facettes ou mesures, puis être utilisés pour créer un [contexte](#contexte) ou réaliser des [analyses][3].

{{< tabs >}}
{{% tab "Facettes" %}}

Une facette présente tous les membres distincts d'un attribut ou d'un tag, en plus de proposer des analyses de base, comme le nombre d'événements RUM représentés. Les facettes vous permettent d'effectuer des pivotements ou de filtrer vos ensembles de données en fonction d'un attribut donné. Pour filtrer vos données, sélectionnez les valeurs que vous souhaitez afficher.

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="Démonstration facettes"  style="width:80%;">}}

**Créer une facette** :

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="Créer une facette"  style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour toutes les nouvelles vues** et peut être utilisée dans [la barre de recherche][1], le volet Facettes et dans la [requête RUM Analytics][2].

[1]: /fr/real_user_monitoring/explorer/search/#search
[2]: /fr/real_user_monitoring/rum_analytics/
{{% /tab %}}
{{% tab "Mesures" %}}

Une mesure est un attribut doté d'une valeur numérique contenue dans vos événements RUM.

**Créer une mesure** :

Pour commencer à utiliser un attribut en tant que mesure, cliquez sur un attribut numérique de vos vues :

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Créer une mesure"  style="width:30%;">}}

Lorsque vous avez terminé, la valeur de cet attribut est stockée **pour tous les nouveaux événements RUM** et peut être utilisée dans [la barre de recherche][1], le volet des facettes et dans la [requête d'analyse RUM][2].

**Sélectionner l'unité de mesure** :

Chaque mesure dispose de sa propre unité. Celle-ci est affichée dans les colonnes du RUM Explorer et dans les analyses RUM.

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Modifier une mesure"  style="width:50%;">}}

[1]: /fr/real_user_monitoring/explorer/search/#search
[2]: /fr/real_user_monitoring/rum_analytics/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/search/#search-syntax
[2]: /fr/dashboards/guide/custom_time_frames
[3]: /fr/real_user_monitoring/explorer/analytics/