---
description: Filtrer la liste des monitors à l'aide d'une recherche à facettes
title: Rechercher des monitors
---

Pour rechercher des monitors, créez une requête à l'aide du volet des facettes sur la gauche et/ou de la barre de recherche en haut. Lorsque vous sélectionnez des attributs, la barre de recherche est mise à jour avec la requête correspondante. De même, lorsque vous modifiez la requête depuis la barre de recherche (ou rédigez vous-même votre propre requête), les cases des attributs se mettent à jour pour refléter les modifications. Peu importe votre méthode, les résultats de la requête sont toujours mis à jour en temps réel lorsque vous modifiez la requête. **Remarque** : il n'est pas nécessaire de cliquer sur un bouton *Rechercher*.

## Barre de recherche

Saisissez du texte simple pour effectuer une recherche parmi les titres et les messages de notification de vos monitors. Par exemple, le texte `*postgresql*` renvoie tous les monitors dont le titre ou le message de notification contient `postgresql`.

Pour limiter votre recherche, spécifiez le nom du champ :

| Élément    | Description                                            | Exemple        |
|---------|--------------------------------------------------------|----------------|
| Titre   | Limite la recherche de texte au titre du monitor.                | `title:text`   |
| Message | Limite la recherche de texte au message de notification du monitor. | `message:text` |

Vous pouvez également rechercher un monitor à l'aide de son ID, par exemple : `1234567`. L'ID du monitor est indiqué sur la [page Monitor Status][1].

### Requête

Effectuez des recherches plus complexes en utilisant des opérateurs booléens (`AND`, `OR` ou `NOT`) et des parenthèses. La syntaxe de recherche est proche de celle d'[Elasticsearch][2], à quelques exceptions près :

* Les expressions régulières ne sont pas prises en charge.
* Le wildcard de caractère unique (`?`) n'est pas pris en charge, mais le wildcard global (`*`) l'est.
* Les recherches de proximité ne sont pas prises en charge, contrairement aux opérateurs [fuzzy][3].
* Les plages ne sont pas prises en charge.
* Le boosting n'est pas pris en charge.

Les caractères suivants sont réservés : `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` et les espaces. Pour rechercher des champs de monitor qui incluent un caractère réservé, ajoutez des guillemets autour de la valeur du champ. Par exemple, `status:Alert AND "chef-client"` est une chaîne de requête valide.

Attention, prenez en compte les éléments suivants concernant les champs avec des guillemets :

* Vous pouvez utiliser le caractère `.`, avec ou sans guillemets, puisqu'il apparaît souvent dans les champs. La requête `metric:system.cpu.idle` est donc valide.
* Les wildcards ne sont pas pris en charge dans les chaînes entre guillemets. Par exemple, `"chef-client*"` ne renverra pas un monitor intitulé `"chef-client failing"` car `*` est traité littéralement.

## Attributs

Les recherches avancées vous permettent de filtrer vos monitors en combinant différents attributs :

| Attribut    | Description                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Status       | Le statut du monitor : `Triggered` (`Alert`, `Warn`, `No Data`) ou `OK`                            |
| Muted        | Le statut désactivé du monitor : `true` ou `false`                                               |
| Type         | Le [type de monitor][4] Datadog                                                                   |
| Creator      | Le créateur du monitor                                                                      |
| Service      | Les tags de service utilisés, au format `service:<VALEUR>`                                         |
| Tag          | Les [tags](#tags-de-monitor) attribués au monitor                                               |
| Env          | Les tags d'environnement utilisés, au format `env:<VALEUR>`                                         |
| Scope        | Les tags de recherche spécifiés dans le champ `from` de votre requête de monitor                                   |
| Metric/Check | La métrique ou le check de service que le monitor surveille                                                     |
| Notification | La personne ou le service qui reçoit la notification                                                  |
| Muted left   | Le temps restant avant la réactivation des notifications pour ce monitor. Si vous recherchez `muted_left:30m`, vous obtenez la liste de tous les monitors qui sont désactivés pendant les 30 prochaines minutes (au maximum). Unités prises en charge : secondes (`s`), minutes (`m`), heures (`h`) et semaines (`w`).    |
| Muted elapsed | Le temps écoulé depuis que le downtime a commencé à désactiver les notifications pour ce monitor. Si vous recherchez `muted_elapsed:30d`, vous obtenez la liste de tous les monitors qui ont été désactivés pendant au moins 30 jours. Unités prises en charge : secondes (`s`), minutes (`m`), heures (`h`) et semaines (`w`). |

Cochez les cases de votre choix pour rechercher vos monitors. Les règles suivantes s'appliquent :

* L'opérateur `AND` est appliqué lorsque vous cochez plusieurs attributs issus de champs différents, par exemple : `status:Alert type:Metric`. Le fait qu'aucun indicateur ne s'affiche dans la requête implique que les deux termes de recherche sont reliés par l'opérateur AND.
* L'opérateur `OR` est généralement appliqué lorsque vous cochez plusieurs attributs issus d'un même champ, par exemple : `status:(Alert OR Warn)`. Il existe cependant des exceptions : par exemple, lorsque vous cochez plusieurs contextes ou tags de service, ils sont reliés par l'opérateur `AND`.
* Certains attributs ne vous permettent pas de sélectionner plusieurs valeurs. Par exemple, lorsque vous sélectionnez une métrique ou un check de service, les autres options disparaissent de la liste jusqu'à ce que vous décochiez votre sélection.
* La case `Triggered` sous l'attribut *Status* correspond à la recherche `status:(Alert OR Warn OR "No Data")`. Triggered n'est pas un statut de monitor valide.
* Le nom de l'attribut *Metric/Check* est toujours `metric` dans la requête. Par exemple, la sélection du check `http.can_connect` correspond à `metric:http.can_connect` dans la requête.

**Remarque** : si un attribut est associé à un très grand nombre de valeurs au sein de vos monitors, utilisez la barre de recherche d'attributs pour trouver la bonne valeur.

## Saved view

Les vues enregistrées vous permettent d'accéder rapidement à des vues prédéfinies afin de trouver des monitors pertinents en fonction d'un contexte précis. Il peut par exemple s'agir des monitors de votre équipe ou des monitors désactivés depuis plus de 60 jours :

{{< img src="monitors/manage_monitor/overview.jpg" alt="Sélection de vues enregistrées" style="width:90%;" >}}

Tous les membres de votre organisation peuvent accéder aux vues enregistrées. Techniquement, une vue enregistrée permet de surveiller :  

- La requête de recherche

### Vue par défaut

{{< img src="monitors/manage_monitor/default.jpg" alt="Vue par défaut" style="width:50%;" >}}

La vue que vous utilisez sur la page Manage Monitor constitue votre vue enregistrée par défaut. Vous seul pouvez accéder à cette vue et la consulter. Toute modification de la vue n'entraîne donc aucune conséquence pour votre organisation.

Vous pouvez remplacer **temporairement** votre vue enregistrée par défaut en exécutant une action dans l'interface ou en ouvrant des liens vers la page Manage Monitor qui comprennent une configuration différente.

Vous pouvez effectuer les actions suivantes depuis l'entrée de la vue par défaut dans le volet des vues :

* **Recharger** votre vue par défaut en cliquant sur l'entrée.
* **Mettre à jour** votre vue par défaut avec les paramètres actuels.
* **Rétablir** votre vue par défaut sur les valeurs par défaut de Datadog, afin de repartir de zéro.

[1]: /fr/monitors/manage/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /fr/monitors/