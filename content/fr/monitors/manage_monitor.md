---
title: Gérer un monitor
kind: documentation
further_reading:
  - link: monitors/monitor_types
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
---
La page [Manage Monitors][1] vous permet d'effectuer des recherches avancées parmi tous les monitors afin de supprimer, désactiver, [résoudre][2] ou modifier plusieurs tags de service des monitors sélectionnés à la fois. Vous pouvez également dupliquer ou modifier entièrement n'importe quel monitor spécifique dans les résultats de recherche.

{{< img src="monitors/manage_monitor/manage_monitor_page.png" alt="page de gestion de monitor" responsive="true" >}}

## Trouver les monitors

Les recherches avancées vous permettent d'interroger les monitors selon un ensemble de différents attributs :

* `title` et `message` : recherche de texte
* `status` : Alert, Warn, No Data, Ok
* `scope` : p. ex. *, role:master-db
* `type` : metric, integration, apm, etc.
* `muted`
* `creator`
* `id`
* `service` : tags
* `team` : tags
* `env` : tags
* `notification` : la cible de notification du monitor, p. ex. : vous@exemple.com, slack-équipe-surveillance
* `metric` : la métrique _ou_ le check de service surveillé, p. ex. system.cpu.user, http.can_connect

Pour lancer une recherche, rédigez votre requête en utilisant les cases à cocher sur la gauche et/ou la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou rédigez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Peu importe votre méthode, les résultats de la requête sont toujours mis à jour en temps réel lorsque vous modifiez la requête. Vous n'avez pas besoin de cliquer sur un bouton « Rechercher ».

### Cocher les cases

Lorsque vous n'avez pas besoin d'effectuer de recherche dans les titres et les corps de texte spécifique de monitor, votre recherche ne nécessite que quelques clics. Cochez autant de cases que nécessaire pour trouver les monitors de votre choix. Gardez cependant à l'esprit les points suivants :

* Lorsque vous cochez plusieurs attributs dans plusieurs champs, l'opérateur **AND** est appliqué entre les valeurs, p. ex. `status:Alert type:Metric`. Le fait qu'aucun indicateur ne s'affiche dans la requête implique que les deux termes de recherche sont reliés par l'opérateur AND.
* Lorsque vous cochez plusieurs attributs au sein d'un même champ, l'opérateur **OR** est généralement appliqué entre les valeurs, p. ex. `status: (Alert OR Warn)`. Il existe cependant des actions : lorsque vous cochez plusieurs contextes ou tags de service, ils sont reliés par l'opérateur AND.
* Certains champs ne vous permettent pas de sélectionner plusieurs valeurs. Par exemple, lorsque vous cochez une métrique ou un check de service, les autres métriques/checks disparaissent de la liste jusqu'à ce que vous décochiez votre sélection.
* La case Triggered sous le champ Status signifie `status:(Alert OR Warn OR "No Data")`, et non `status:Triggered`. Triggered n'est pas un statut de monitor valide.
* La case Muted apparaît sous le champ Status. Cependant, Muted est en fait son propre champ. Si vous cochez cette case, vous ajoutez `muted:true` à votre requête, et non `status:muted`.
* Le champ Metric/check est toujours désigné par le terme `metric` dans la requête. Par exemple, la sélection du check `http.can_connect` ajoute `metric:http.can_connect` à votre requête.

Lorsqu'un champ présente un nombre arbitraire (c'est-à-dire un nombre important) de valeurs pour l'ensemble des monitors (Service tag, Scope, Metric/Check et Notification), utilisez les barres de recherche spécifiques au champ pour trouver la valeur que vous recherchez.

Lorsque vous devez exécuter une recherche plus complexe pour laquelle les cases à cocher ne suffisent pas, utilisez la barre de recherche pour modifier votre requête ou en écrire une nouvelle.

### Rédiger une requête

Lorsque vous rédigez une requête, vous cherchez généralement un texte spécifique dans l'ensemble des titres de monitors et des corps de messages. Une simple recherche du terme `postgresql` renvoie tous les monitors qui possèdent `postgresql` à n'importe quel endroit de leur titre ou du corps de leur message. Pour effectuer une recherche sur le titre ou sur le corps du message, mais pas sur les deux, précisez le terme de recherche avec le nom du champ, p. ex. `title:postgresql`.

Vous pouvez également utiliser des opérateurs booléens (AND, OR et NOT) ainsi que des parenthèses pour écrire des requêtes complexes basées sur n'importe quel champ de monitor. La syntaxe de recherche étant très semblable à celle d'[Elasticsearch][3], il est préférable de décrire en quoi la syntaxe *diffère* de celle d'Elasticsearch :

* Les expressions régulières ne sont pas prises en charge.
* Le wildcard de caractère unique (`?`) n'est pas pris en charge, mais le wildcard global (`*`) l'est.
* Les recherches de proximité ne sont pas prises en charge, mais l'opérateur [fuzzy][4] l'est.
* Les plages ne sont pas prises en charge.
* Le boosting n'est pas pris en charge.

Enfin, les caractères suivants sont réservés : `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` et les espaces. Pour rechercher des champs de monitor qui incluent l'un d'entre eux, ajoutez des guillemets entre le nom du champ. `status:Alert AND "chef-client"` est une chaîne de requête valide, mais `status:Alert AND chef-client` ne l'est pas.

Attention, prenez en compte les éléments suivants concernant les champs avec des guillemets :

* Vous pouvez utiliser le caractère `.`, avec ou sans guillemets, puisqu'il apparaît souvent dans plusieurs champs. La requête `metric: system.cpu.idle` est donc valide.
* Vous ne pouvez pas utiliser de recherche avec des wildcards dans les chaînes entre guillemets : `"chef-client*"`, bien que syntaxiquement valide, ne renverra pas un monitor intitulé `"chef-client failing"` car `*` est traité littéralement.

## Gérer les monitors choisis

Une fois que vous avez trouvé les monitors que vous recherchiez, sélectionnez un ou plusieurs d'entre eux que vous souhaitez mettre à jour en cochant les cases à côté de chaque résultat. Vous pouvez sélectionner tous les résultats en cochant la case située tout en haut à côté de l'en-tête de la colonne STATUS. Modifiez plusieurs monitors à la fois à l'aide des boutons en haut à droite des résultats de recherche : Mute, Resolve, Delete et Edit Service Tags.

{{< img src="monitors/manage_monitor/manage-monitors-mute.png" alt="gérer-monitors-désactiver" responsive="true" style="width:80%;" >}}

Pour modifier un monitor, passez le curseur dessus et utilisez les boutons à l'extrême droite de sa rangée : Edit, Clone, Mute et Delete. Pour afficher plus de détails sur un monitor, cliquez sur son nom pour accéder à sa page de statut.

{{< img src="monitors/manage_monitor/manage-monitors-hover-clone.png" alt="gérer-monitors-curseur-clone" responsive="true" style="width:80%;" >}}

## Gérer les monitors déclenchés avec une granularité au niveau du groupe

Vous pouvez désactiver ou [résoudre][2] plusieurs monitors déclenchés à la fois depuis la page [Triggered Monitors][5]. Celle-ci fonctionne de la même manière que la page [Manage Monitors](#gerer-les-monitors) : les monitors peuvent être recherchés via leurs attributs en utilisant les mêmes cases à cocher ou la même syntaxe de requête. La page Triggered Monitors présente toutefois certaines différences notables : seuls les monitors avec un statut déclenché (Alert, Warn ou No Data) sont affichés, et _chaque groupe_ (c'est-à-dire chaque source de transmission) de chaque monitor possède son propre rang.

Partons du principe que vous avez un monitor intitulé « latence élevée » et que ses valeurs sont regroupées par host. Si 14 hosts présentent un statut déclenché parmi un total de 20, la page Triggered Monitor affiche 14 rangées lorsque vous recherchez le monitor par son titre (p. ex. `latence élevée` ou `title:
« latence élevée »`) dans la barre de recherche. Vous pouvez ainsi facilement désactiver ou [résoudre][2] un monitor pour certaines sources de transmission uniquement (bien sûr, il est également possible de le désactiver ou de le résoudre pour l'ensemble des sources).

Lorsque vous rédigez vos requêtes de recherche, vous pouvez utiliser tous les champs disponibles sur la page Manage Monitors. Toutefois, la plupart d'entre eux ne sont pas contrôlables via des cases à cocher sur la page Triggered Monitors. Découvrez en quoi les champs de la page Triggered Monitors diffèrent des champs de la page Manage Monitors :

* Cette page utilise le champ `group_status` au lieu de` status`.
* Cette page ajoute le champ `triggered`, qui vous permet de filtrer les monitors selon leur durée de déclenchement.
* Cette page ajoute également le champ `group`, qui vous permet d'affiner les résultats de recherche pour les monitors regroupés selon plusieurs tags. Supposons que vous ayez un monitor groupé selon `host` et` env`. Vous recherchez ce monitor par titre et obtenez quatre lignes, pour lesquelles les groupes sont `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod` et `host:web02,env:prod`. Utilisez le champ `group` pour afficher uniquement, par exemple, les hosts de prod (`group:"env:prod"`) ou les hosts web02 (`group:"host:web02"`).

## Surveiller des tags

{{< img src="monitors/manage_monitor/monitor-tags.png" alt="Tags de monitor" responsive="true" style="width:30%;" >}}

Vous avez la possibilité d'ajouter des tags directement à vos monitors afin de filtrer ces derniers sur les pages [Triggered Monitors][5] ou [Manage Monitors][1], ou encore afin de [planifier un downtime][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/monitor_status/#resolve
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[5]: https://app.datadoghq.com/monitors/triggered
[6]: /fr/monitors/downtimes
