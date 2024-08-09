---
further_reading:
- link: /dashboards/guide/graphing_json/
  tag: Guide
  text: Créer des dashboards avec JSON
title: Widget Graphique scindé
widget_type: split_group
---

<div class="alert alert-info">Les widgets Graphique scindé ne sont pas pris en charge sur les screenboards et les <a href="https://docs.datadoghq.com/dashboards/sharing/#share-a-dashboard-by-public-url">dashboards publics.</a></div>

## Présentation

Un graphique scindé permet de décomposer une requête selon plusieurs valeurs de tag afin d'identifier les singularités et les patterns. Utilisez cette fonctionnalité pour analyser les performances des métriques selon diverses facettes, comparer les événements associés à divers tags ou créer des visualisations dynamiques.

## Configuration

### Créer un widget Graphique scindé

Accédez au widget Graphique scindé dans la barre des widgets, sous la section des groupes, puis faites-le glisser sur votre dashboard pour créer un graphique scindé vierge. Vous pourrez ainsi définir la requête et les dimensions à scinder. Pour en savoir plus sur les options de configuration, consultez la section [Configuration](#configuration).

### Créer un graphique scindé à partir d'un widget existant

Vous pouvez également créer un graphique scindé en fractionnant un widget existant en fonction d'une valeur de tag depuis l'onglet **Split Graph**. Procédez comme suit pour ouvrir l'onglet **Split Graph** :
- Ajoutez un nouveau widget à votre dashboard, puis cliquez sur l'onglet **Split Graph** situé en haut de l'éditeur de requête.
- Ouvrez un widget en mode plein écran en sélectionnant l'icône de modification ou d'agrandissement depuis les options de contrôle du widget, puis cliquez sur l'onglet **Split Graph**.
- Ouvrez le menu contextuel d'un widget sur votre dashboard, puis sélectionnez **Split Graph**.

Depuis l'onglet **Split Graph**, vous pouvez configurer le mode de fractionnement de votre graphique, définir la limite du nombre de graphiques affichés, et préciser leur ordre d'affichage. 
1. Vous pouvez modifier la configuration du fractionnement en ajustant la dimension fractionnée, le nombre de graphiques affichés et les options d'affichage. Pour en savoir plus sur les options de configuration, consultez la section [Configuration](#configuration).
2. Cliquez sur **Save to Dashboard** pour créer un widget Graphique scindé en bas de votre dashboard. Aucune modification ne sera apportée au widget d'origine de votre dashboard.

### Créer un graphique scindé depuis un autre endroit dans Datadog

Lorsqu'une visualisation présentant plusieurs valeurs est affichée dans l'application, vous pouvez l'exporter vers un dashboard en tant que widget.
1. Cliquez sur **Export to Dashboard**.
1. Dans la fenêtre d'exportation qui s'affiche, vous pouvez rechercher un dashboard existant vers lequel exporter le widget ou créer un dashboard contenant ce widget.

## Configuration

Si vous créez un graphique scindé de toute pièce ou modifiez un graphique scindé existant sur votre dashboard, vous pouvez configurer le graphique ainsi que la façon dont il est fractionné.

L'éditeur de graphique scindé comporte deux sections distinctes : [**Edit Graph**](#modifier-le-graphique) pour modifier le graphique et [**Split Graph**](#modifier-le-fractionnement) pour modifier son fractionnement. Pour nommer le widget, modifiez le champ de texte situé en haut de l'éditeur.

**Remarque** : si vous créez un graphique scindé à partir d'un widget, vous pouvez uniquement configurer le fractionnement dans l'onglet **Split Graph**. Vous pouvez cliquer à tout moment sur l'onglet **Edit** pour modifier la requête.

{{< img src="dashboards/widgets/split_graph/split_graph_tab.png" alt="L'onglet Split Graph présente les options de configuration du graphique scindé" style="width:100%;" >}}

### Modifier le graphique

Configurez la requête de votre graphique avant de procéder au fractionnement. Choisissez un type de visualisation qui prend en charge le fractionnement et modifiez le mode d'affichage des graphiques. Vous pouvez également créer votre requête de toute pièce, comme vous le feriez dans l'éditeur de requête standard.

Pour en savoir plus sur la configuration de chacune de ces visualisations, consultez la documentation relative aux widgets pris en charge sur la page [Widgets][1].

Les modifications que vous apportez apparaissent immédiatement dans les graphiques scindés, en bas de la fenêtre de l'éditeur.  

{{< img src="dashboards/widgets/split_graph/split_graph_editor.png" alt="L'éditeur de graphique scindé affichant les options de configuration de la requête et du fractionnement" style="width:100%;" >}}

### Modifier le fractionnement

Vous pouvez modifier le mode de fractionnement du graphique via plusieurs options de configuration, ainsi que certains paramètres propres au fractionnement choisi.

| Option de configuration | Description    | 
| ---  | ----------- | 
| One graph per | Ce menu déroulant définit la dimension utilisée pour le fractionnement de votre graphique d'origine. |
| Limit to | Cette option permet de spécifier le nombre de graphiques à afficher ainsi que les valeurs à sélectionner. Par défaut, le widget Graphique scindé sélectionne automatiquement les valeurs moyennes les plus élevées. |
| Sort by | Choisissez de trier vos graphiques en fonction d'une métrique ou d'un attribut/une facette. Pour choisir manuellement les tags à afficher, sélectionnez **custom**. |
| Show Controls | Cliquez sur cette option pour afficher une barre latérale contenant toutes les valeurs de tag disponibles. Sélectionnez des valeurs de tag manuellement pour passer d'un fractionnement dynamique à un fractionnement statique et afficher uniquement les valeurs que vous avez sélectionnées. Pour revenir au mode dynamique, effacez la sélection ou cliquez sur le bouton **Custom**, puis sélectionnez **Top** ou **Bottom** pour réactiver l'option de tri.|
| Graph Setting | Permet d'afficher les options propres aux graphiques scindés</br>`Graph Size` : choisissez parmi quatre tailles différentes pour les graphiques individuels du widget Graphique scindé.</br>`Uniform Y-Axes` : indiquez si les graphiques du widget doivent afficher le même axe des ordonnées ou si chaque axe peut être ajusté de façon autonome pour une lisibilité optimale.|

## API

Ce widget peut être utilisé avec l'[API Dashboards][2]. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/