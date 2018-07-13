---
title: Dashboards
kind: documentation
aliases:
  - /fr/guides/templating/
---
Pour créer un [Timeboard][3] ou un [Screenboard][4] Sélectionnez ceux que vous préférez créer après avoir cliqué sur 'New Dashboard' dans la liste déroulante 'Dashboards' .

{{< img src="graphing/dashboards/board_selection.jpg" alt="Dashboard selection" responsive="true" >}}

## Quelle est la différence entre un Screenboard et un Timeboard?

Chez Datadog, nous vous donnons la possibilité de créer et de personnaliser deux types de tableaux de bord; [Screenboards][5] et [Timeboards][6]. Pour mieux comprendre les différences entre les deux, considérez ce qui suit:

{{% table responsive="true" %}}
|  | Timeboards | Screenboards|
|---|------------|-------------|
|Horizon temporel | Tous les graphiques partagent le même horizon temporel | Tous les graphiques peuvent avoir un horizon temporel individuel |
| Disposition  | Les graphiques apparaissent dans une grille fixe  | Les graphiques sont placés n'importe où sur l'écran |
| Peut partager des graphiques individuellement | Oui | Non |
| Peut partager le dashboard en entier | Non | Oui |
| Le partage peut être en lecture seule | Oui | Oui |
{{% /table %}}

## Modifier les template variables

Le dashboard templating vous permet de créer des tableaux de bord qui utilisent des variables telles que `$scope` ou` $redis` à la place de tag ou d'host spécifiques. Vous pouvez ensuite explorer dynamiquement les métriques sur différents ensembles de tags. Sélectionnez une valeur de variable dans le menu déroulant et cette valeur s'applique à tout le dashboard.

Pour créer, modifier et supprimer des templates variables, cliquez sur l'icône en forme de roue dentée dans le coin supérieur droit de l'écran, puis sélectionnez "Edit Template Variables" dans le menu des actions.

{{< img src="graphing/dashboards/edit-template-variables.png" alt="edit template variable" responsive="true" style="width:30%;">}}

Cela ouvre le panneau d'édition des templates variables.

{{< img src="graphing/dashboards/redis-template-var.png" alt="Redis template var" responsive="true" style="width:50%;">}}

Une template variable est définie par un nom et des paramètres facultatifs pour 'Tag Group' et 'Default Tag'. Un Tag Group est un préfixe partagé entre plusieurs tag, comme `redis_port` pour les tags `redis_port:6379` et `redis_port:6380`. La définition d'un Tag Group élimine les tags non pertinents du sélecteur de la variable et supprime le préfixe des valeurs répertoriées pour plus de clarté - vous verrez donc `6379` et `6380` dans la liste déroulante Default Tag. L'option 'Default Tag' détermine la valeur initiale de la variable sur le dashboard.

## Utilisation des template variables dans les éditeurs de graphiques/widgets

{{< img src="graphing/dashboards/redis-tpl-graph-editor.png" alt="Redis-tpl graph editor" responsive="true" style="width:70%;" >}}

Une fois définies, les templates variables apparaissent à côté des options de tag et d'host dans les éditeurs de graphiques. Si vous définissez `6379` comme la valeur de `$redis`, tous les graphiques définis avec `$redis` ont désormais pour contexte  `redis_port:6379`.

{{< img src="graphing/dashboards/redis-tpl-selected.png" alt="Redis tpl selected" responsive="true" style="width:70%;">}}

Vous pouvez aussi les utiliser dans les widgets tel que le flux d'événements avec une requête comme `tags:$redis`.


## Corrélation d'événements au moment du design
La corrélation d'événements fait référence à la superposition d'événements au-dessus d'un graphique de dashboard et constitue une fonctionnalité importante de la plateforme Datadog. Vous pouvez configurer la corrélation à deux moments différents: soit lorsque vous construisez le dashboard ou adhoc au moment où vous affichez le dashboard.

{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides-eventcorrelation-screenboard" responsive="true" style="width:90%;">}}

Configurez la corrélation d'événements au moment de la conception en modifiant tout graphique sur les Timeboard et les Screenboard, en ajoutant des événements au graphique. Vous pouvez trouver des détails sur l'ajout d'événements [en utilisant l'interface utilisateur][2] ou via l'interface JSON plus bas sur la page. Pour en savoir plus à ce sujet, visitez la page [Graphing Primer][1].

## Corrélation d'événements au moment de la visualisation

{{< img src="graphing/dashboards/guides-eventcorrelation-searchbox.png" alt="guides event correlation" responsive="true" style="width:90%;">}}

Configurez la corrélation d'événements au moment de l'affichage en ajoutant une requête dans la zone de recherche en haut à gauche de la fenêtre du dashboard. Cela remplace applique les événements à tous les graphiques de ce dashboard particulier.

## Corrélation entre les Logs et les Métriques

### Passer d'une métrique à ses logs

Être capable de faire une corrélation simplement et rapidement est la clef pour analyser un problème. Utilisez le raccourci suivant depuis n'importe quel dashboard de graphes de timeseries pour afficher un menu contextuel avec les logs liés.

{{< img src="graphing/dashboards/related_logs.png" alt="Related logs" responsive="true" style="width:80%;">}}

Selectionnez `Voir les logs liés` pour aller à l'explorateur de logs directement positionné sur l'intervalle de temps sélectionné avec le contexte du graphe courant.

### Comment définir la requête de recherche ?

Pour définir les logs liés, nous utilisons les paramètres suivants :

* *Intervalle* : Centré sur le point sélectionné et utilise l'échelle du graphe pour afficher les données avant et après ce point. 
* *Préfixe d'intégration* :  Si la métrique provient d'une intégration, Datadog filtre l'attribut `source` avec le nom de l'intégration.
* *Tags* : Tous les tags utilisés dans le graphe (*variable de template*, *découper par*, *filtrer par*) sont automatiquement ajoutés à la requête de recherche. 

[1]: /graphing/
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/timeboard/
[4]: /graphing/dashboards/screenboard/
[5]: /graphing/dashboards/screenboard
[6]: /graphing/dashboards/timeboard
