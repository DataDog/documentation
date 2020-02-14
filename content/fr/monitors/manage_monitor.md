---
title: Gérer les monitors
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
La page [Manage Monitors][1] vous permet de rechercher, de supprimer, de désactiver ou de résoudre des monitors, mais aussi de modifier plusieurs tags de monitor à la fois. Vous pouvez également dupliquer ou modifier des monitors spécifiques à partir des résultats de recherche.

{{< img src="monitors/manage_monitor/page.png" alt="page Manage Monitor" >}}

## Rechercher des monitors

Pour rechercher des monitors, créez une requête en cochant des attributs sur la gauche et/ou en utilisant la barre de recherche en haut. Lorsque vous sélectionnez des attributs, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête depuis la barre de recherche (ou rédigez vous-même votre propre requête), les cases à cocher se mettent à jour pour refléter les modifications. Peu importe votre méthode, les résultats de la requête sont toujours mis à jour en temps réel lorsque vous modifiez la requête. Remarque : il n'est pas nécessaire de cliquer sur un bouton « Rechercher ».

### Barre de recherche

Saisissez du texte simple pour effectuer une recherche parmi les titres et les messages de notification de vos monitors. Par exemple, le texte `postgresql` renvoie tous les monitors dont le titre ou le message de notification contient `postgresql`.

Pour limiter votre recherche, spécifiez le nom du champ :

| Élément    | Description                                            | Exemple        |
|---------|--------------------------------------------------------|----------------|
| Title   | Limite la recherche de texte au titre du monitor.                | `title:text`   |
| Message | Limite la recherche de texte au message de notification du monitor. | `message:text` |

Vous pouvez également rechercher un monitor à l'aide de son ID, par exemple : `1234567`. L'ID du monitor est visible sur la [page Monitor Status][2].

#### Requête

Effectuez des recherches plus complexes en utilisant des opérateurs booléens (`AND`, `OR` ou `NOT`) et des parenthèses. La syntaxe de recherche est très proche de celle d'[Elasticsearch][3], à quelques exceptions près :

* Les expressions régulières ne sont pas prises en charge.
* Le wildcard de caractère unique (`?`) n'est pas pris en charge, mais le wildcard global (`*`) l'est.
* Les recherches de proximité ne sont pas prises en charge, mais les opérateurs [fuzzy][4] le sont.
* Les plages ne sont pas prises en charge.
* Le boosting n'est pas pris en charge.

Les caractères suivants sont réservés : `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` et les espaces. Pour rechercher des champs de monitor qui incluent un caractère réservé, ajoutez des guillemets autour de la valeur du champ. Par exemple, `status:Alert AND "chef-client"` est une chaîne de requête valide.

Attention, prenez en compte les éléments suivants concernant les champs avec des guillemets :

* Vous pouvez utiliser le caractère `.`, avec ou sans guillemets, puisqu'il apparaît souvent dans les champs. La requête `metric:system.cpu.idle` est donc valide.
* Les wildcards ne sont pas pris en charge dans les chaînes entre guillemets. Par exemple, `"chef-client*"` ne renverra pas un monitor intitulé `"chef-client failing"` car `*` est traité littéralement.

### Attributs

Les recherches avancées vous permettent de filtrer vos monitors en combinant différents attributs :

| Attribut    | Description                                                          |
|--------------|----------------------------------------------------------------------|
| Statut       | Le statut du monitor : `Triggered` (`Alert`, `Warn`, `No Data`) ou `OK` |
| Muted        | Le statut désactivé du monitor : `true` ou `false`                    |
| Type         | Le [type de monitor][5] Datadog                                        |
| Creator      | Le créateur du monitor                                           |
| Service      | Les tags de service utilisés, au format `service:<VALEUR>`              |
| Tag          | Les [tags](#tags-de-monitor) attribués au monitor                    |
| Env          | Les tags d'environnement utilisés, au format `env:<VALEUR>`              |
| Scope        | Les tags de recherche spécifiés dans le champ `from` de votre requête de monitor        |
| Metric/Check | La métrique ou le check de service que le monitor surveille                          |
| Notification | La personne ou le service qui reçoit la notification                       |

Cochez les cases de votre choix pour rechercher vos monitors. Les règles suivantes s'appliquent :

* L'opérateur `AND` est appliqué lorsque vous cochez plusieurs attributs issus de champs différents, par exemple : `status:Alert type:Metric`. Le fait qu'aucun indicateur ne s'affiche dans la requête implique que les deux termes de recherche sont reliés par l'opérateur AND.
* L'opérateur `OR` est généralement appliqué lorsque vous cochez plusieurs attributs issus d'un même champ, par exemple : `status:(Alert OR Warn)`. Il existe cependant des exceptions : par exemple, lorsque vous cochez plusieurs contextes ou tags de service, ils sont reliés par l'opérateur `AND`.
* Certains attributs ne vous permettent pas de sélectionner plusieurs valeurs. Par exemple, lorsque vous sélectionnez une métrique ou un check de service, les autres options disparaissent de la liste jusqu'à ce que vous décochiez votre sélection.
* La case `Triggered` sous l'attribut *Status* correspond à la recherche `status:(Alert OR Warn OR "No Data")`. Triggered n'est pas un statut de monitor valide.
* Le nom de l'attribut *Metric/Check* est toujours `metric` dans la requête. Par exemple, la sélection du check `http.can_connect` correspond à `metric:http.can_connect` dans la requête.

**Remarque** : si un attribut est associé à un très grand nombre de valeurs au sein de vos monitors, utilisez la barre de recherche d'attributs pour trouver la bonne valeur.

## Gérer vos monitors

Une fois votre recherche terminée, sélectionnez le ou les monitors à modifier en cochant les cases à côté de chaque résultat. Vous pouvez sélectionner tous les résultats en cochant la case située tout en haut, à côté du titre de la colonne *STATUS*. Pour modifier plusieurs monitors à la fois, utilisez les boutons en haut à droite des résultats de recherche :

| Option    | Description                                                                |
|-----------|----------------------------------------------------------------------------|
| Mute      | Désactiver les monitors sélectionnés pendant `1h`, `4h`, `12h`, `1d`, `1w` ou `Forever` |
| Unmute    | Si les monitors sélectionnés sont désactivés, permet de les réactiver.                           |
| Resolve   | [Résoudre][6] les alertes pour les monitors sélectionnés.                          |
| Delete    | Supprimer définitivement les monitors sélectionnés.                                  |
| Edit Tags | Modifier les tags de monitor pour les monitors sélectionnés.                           |

Pour modifier un monitor, passez le curseur dessus et utilisez les boutons tout à droite : Edit, Clone, Mute et Delete. Pour afficher plus de détails sur un monitor, cliquez sur son nom pour accéder à sa page de statut.

### Monitors déclenchés

Vous pouvez désactiver ou [résoudre][6] plusieurs monitors à la fois depuis la page [Triggered Monitors][7]. Cette page affiche uniquement les monitors actuellement déclenchés (statut Alert, Warn ou No Data).

#### Résultats groupés

La page Triggered Monitors affiche une ligne distincte pour chaque groupe (source de transmission) de chaque monitor. Par exemple, si un monitor est regroupé par host et que 14 hosts transmettent un statut déclenché, la page affiche 14 lignes différentes. Ainsi, vous avez la possibilité de [résoudre][6] un monitor pour une source de transmission spécifique.

Lorsque vous saisissez une requête de recherche, vous pouvez utiliser les mêmes attributs que ceux qui figurent sur la page Manage Monitors, même s'ils ne peuvent pas être cochés sur la page Triggered Monitors.

Les attributs sur la page Triggered Monitors présentent les différences suivantes :

* L'attribut `group_status` est utilisé au lieu de `status`.
* L'attribut `triggered` vous permet de filtrer les monitors en fonction du temps écoulé depuis leur déclenchement.
* L'attribut `group` vous permet d'affiner les résultats de recherche pour les monitors regroupés selon plusieurs tags. Imaginons par exemple qu'un monitor est regroupé en fonction des tags `host` et `env`. Votre recherche renvoie quatre lignes correspondant aux groupes `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod` et `host:web02,env:prod`. Vous pouvez utiliser l'attribut `group` pour afficher uniquement les hosts de prod (`group:"env:prod"`) ou les hosts web02 (`group:"host:web02"`).

### Surveiller des tags

Les tags de monitor sont séparés des tags envoyés par l'Agent ou les intégrations. Ajoutez des tags directement à vos monitors depuis les pages [Manage Monitors][1], [Triggered Monitors][7] et [Manage Downtime][8] afin de les filtrer ultérieurement. Pour en savoir plus sur les tags de monitor, consultez la [documentation relative aux tags][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/monitor_status/#properties
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[4]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[5]: /fr/monitors/monitor_types
[6]: /fr/monitors/monitor_status/#resolve
[7]: https://app.datadoghq.com/monitors/triggered
[8]: https://app.datadoghq.com/monitors#downtime
[9]: /fr/tagging/assigning_tags/?tab=monitors#ui