---
title: Dashboards
kind: documentation
aliases:
  - /fr/guides/templating/
---
Pour créer un [TimeBoard][3] ou un [ScreenBoard][4] Sélectionnez ceux que vous préférez créer après avoir cliqué sur 'New Dashboard' dans la liste déroulante 'Dashboards' .

{{< img src="graphing/dashboards/board_selection.jpg" alt="Board selection" responsive="true" popup="true">}}

## Quelle est la différence entre un Screenboard et un Timeboard?

Chez Datadog, nous vous donnons la possibilité de créer et de personnaliser deux types de tableaux de bord; [ScreenBoards][5] et [TimeBoards][6]. Pour mieux comprendre les différences entre les deux, considérez ce qui suit:

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

Le dashboard templating vous permet de créer des tableaux de bord qui utilisent des variables telles que `$scope` ou` $redis` à la place de tag ou d'host spécifiques. Vous pouvez ensuite explorer dynamiquement les métriques sur différents ensembles de tags. Sélectionnez une valeur de variable dans le menu déroulant et cette valeur s'applique à tout le tableau de bord.

Pour créer, modifier et supprimer des templates variables, cliquez sur l'icône en forme de roue dentée dans le coin supérieur droit de l'écran, puis sélectionnez "Edit Template Variables" dans le menu des actions.

{{< img src="graphing/dashboards/edit-template-variables.png" alt="edit template variable" responsive="true" popup="true" style="width:30%;">}}

Cela ouvre le panneau d'édition des templates variables.

{{< img src="graphing/dashboards/redis-template-var.png" alt="Redis template var" responsive="true" popup="true" style="width:50%;">}}

Une template variable est définie par un nom et des paramètres facultatifs pour 'Tag Group' et 'Default Tag'. Un Tag Group est un préfixe partagé entre plusieurs tag, comme `redis_port` pour les tags `redis_port:6379` et `redis_port:6380`. La définition d'un Tag Group élimine les tags non pertinents du sélecteur de la variable et supprime le préfixe des valeurs répertoriées pour plus de clarté - vous verrez donc `6379` et `6380` dans la liste déroulante Default Tag. L'option 'Default Tag' détermine la valeur initiale de la variable sur le tableau de bord.

## Utilisation des template variables dans les éditeurs de graphiques

{{< img src="graphing/dashboards/redis-tpl-graph-editor.png" alt="Redis-tpl graph editor" responsive="true" style="width:70%;" >}}

Une fois définies, les templates variables apparaissent à côté des options de tag et d'host dans les éditeurs de graphiques. Si vous définissez `6379` comme la valeur de `$redis`, tous les graphiques définis avec `$redis` ont désormais pour contexte  `redis_port:6379`.

{{< img src="graphing/dashboards/redis-tpl-selected.png" alt="Redis tpl selected" responsive="true" popup="true" style="width:70%;">}}

## Corrélation d'événements au moment du design
La corrélation d'événements fait référence à la superposition d'événements au-dessus d'un graphique de dashboard et constitue une fonctionnalité importante de la plateforme Datadog. Vous pouvez configurer la corrélation à deux moments différents: soit lorsque vous construisez le dashboard ou adhoc au moment où vous affichez le tableau de bord.

{{< img src="graphing/dashboards/guides-eventcorrelation-screenboard.png" alt="guides-eventcorrelation-screenboard" responsive="true" popup="true" style="width:90%;">}}

Configurez la corrélation d'événements au moment de la conception en modifiant tout graphique sur les Timeboard et les Screenboard, en ajoutant des événements au graphique. Vous pouvez trouver des détails sur l'ajout d'événements [en utilisant l'interface utilisateur][2] ou via l'interface JSON plus bas sur la page. Pour en savoir plus à ce sujet, visitez la page [Graphing Primer][1].

## Corrélation d'événements au moment de la visualisation

{{< img src="graphing/dashboards/guides-eventcorrelation-searchbox.png" alt="guides event correlation" responsive="true" popup="true" style="width:90%;">}}

Configurez la corrélation d'événements au moment de l'affichage en ajoutant une requête dans la zone de recherche en haut à gauche de la fenêtre du dashboard. Cela remplace applique les événements à tous les graphiques de ce tableau de bord particulier.

[1]: /graphing/
[2]: /graphing/event_stream/
[3]: /graphing/dashboards/timeboard/
[4]: /graphing/dashboards/screenboard/
[5]: /graphing/dashboards/screenboard
[6]: /graphing/dashboards/timeboard
