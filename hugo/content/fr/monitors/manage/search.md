---
description: Filtrer la liste des monitors à l'aide d'une recherche à facettes
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: Blog
  text: Comment auditer et nettoyer efficacement les monitors
title: Rechercher des monitors
---
Pour effectuer une recherche parmi vos monitors, construisez une requête à l'aide du panneau de facettes situé à gauche et/ou de la barre de recherche en haut. Lorsque vous sélectionnez des attributs, la barre de recherche se met à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou que vous en écrivez une nouvelle), les cases à cocher des attributs se mettent à jour pour refléter le changement. Dans tous les cas, les résultats de la requête se mettent à jour en temps réel à mesure que vous modifiez la requête. **Remarque** : il n'y a pas de bouton *search* sur lequel cliquer.

## Barre de recherche {#search-bar}

Utilisez du texte simple pour effectuer une recherche dans tous les titres de monitors et les messages de notification. Par exemple, une recherche sur `*postgresql*` renvoie tous les monitors contenant `postgresql` n'importe où dans le titre ou
le message de notification.

Pour limiter votre recherche, spécifiez le nom du champ :

| Élément    | Description                                            | Exemple        |
|---------|--------------------------------------------------------|----------------|
| Title   | Recherchez le texte dans le titre du monitor.                | `title:text`   |
| Message | Recherchez le texte dans le message de notification du monitor. | `message:text` |

De plus, vous pouvez rechercher un monitor à l'aide de son identifiant, par exemple : `1234567`. L'identifiant du monitor est disponible sur la [page d'état du monitor][1].

<div class="alert alert-info">Pour savoir comment filtrer les groupes de monitors, consultez la <a href="/monitors/manage/status/">Monitor Status page</a>.</div>

### Requête {#query}

Améliorez votre requête de recherche avec des opérateurs booléens (`AND`, `OR`, `NOT`) et des parenthèses. La syntaxe de recherche est similaire à celle d'[Elasticsearch][2] à quelques exceptions près :

* Les expressions régulières ne sont pas prises en charge.
* Le caractère générique pour un seul caractère (`?`) et le caractère générique général (`*`) sont tous deux pris en charge.
* Les recherches de proximité ne sont pas prises en charge, mais l'opérateur [fuzzy][3] l'est.
* Les plages ne sont pas prises en charge.
* Le boosting n'est pas pris en charge.

Les caractères suivants sont réservés : `-`, `(`, `)`, `"`, `~`, `*`, `:`, `.` et les espaces. Pour rechercher un champ de monitor qui inclut un caractère réservé, placez la chaîne du champ entre guillemets. Par exemple, `status:Alert AND "chef-client"` est une chaîne de requête valide.

Attention, prenez en compte les éléments suivants concernant les champs avec des guillemets :

* Vous pouvez utiliser `.` avec ou sans guillemets, car il apparaît couramment dans certains champs. Par exemple, `metric:system.cpu.idle` est valide.
* La recherche par caractères génériques n'est pas prise en charge dans les chaînes entre guillemets. Par exemple, `"chef-client*"` ne renvoie pas de monitor intitulé `"chef-client failing"`, car `*` est interprété littéralement.
* Pour utiliser un caractère générique dans une valeur contenant un deux-points, échappez ce caractère à l'aide d'une barre oblique inverse (`\`) au lieu d'utiliser des guillemets. Par exemple, `tag:service\:*` renvoie tous les monitors qui possèdent un tag `service`, quelle que soit sa valeur.

## Attributs {#attributes}

Les recherches avancées vous permettent de filtrer vos monitors en combinant différents attributs :

| Attribut    | Description                                                                                     |
|--------------|-------------------------------------------------------------------------------------------------|
| Status       | Le statut du monitor : `Triggered` (`Alert`, `Warn`, `No Data`) ou `OK`                            |
| Muted        | L'état de mise en sourdine du monitor : `true` ou `false`                                               |
| Type         | Le [type de monitor][4] Datadog                                                                   |
| Creator      | Le créateur du monitor                                                                      |
| Service      | Tags de service que vous utilisez sous la forme `service:<VALUE>`.                                         |
| Tag          | Les [tags][5] attribués au monitor                                               |
| Env          | Tags d'environnement que vous utilisez sous la forme `env:<VALUE>`.                                         |
| Scope        | Recherchez les tags répertoriés dans le champ `from` de votre requête de monitor.                                   |
| Metric/Check | La métrique ou le service check surveillé                                                     |
| Notification | La personne ou le service recevant une notification                                                  |
| Muted left   | Le temps restant avant que le downtime cesse de mettre en sourdine les notifications de ce monitor. Une recherche sur `muted_left:30m` renvoie tous les monitors dont la mise en sourdine prendra fin dans 30 minutes au plus tard. Les unités prises en charge sont les secondes (`s`), les minutes (`m`), les heures (`h`) et les semaines (`w`).    |
| Muted elapsed | Le temps écoulé depuis qu'un downtime a commencé à mettre en sourdine les notifications de ce monitor. Une recherche sur `muted_elapsed:30d` renvoie tous les monitors qui sont en sourdine depuis au moins 30 jours. Les unités prises en charge sont les secondes (`s`), les minutes (`m`), les heures (`h`) et les semaines (`w`). |

Cochez autant de cases que vous le souhaitez pour trouver vos monitors. Les règles suivantes s'appliquent :

* L'opérateur `AND` est appliqué lorsque vous sélectionnez des attributs dans différents champs, par exemple : `status:Alert type:Metric` (l'absence d'opérateur entre les deux termes de recherche implique `AND`).
* La plupart du temps, l'opérateur `OR` est appliqué lorsque vous sélectionnez des attributs dans un même champ, par exemple : `status:(Alert OR Warn)`. Certaines exceptions s'appliquent : par exemple, l'opérateur `AND` est utilisé lorsque vous sélectionnez plusieurs périmètres ou tags de service.
* Certains attributs ne permettent pas de sélectionner plusieurs valeurs. Par exemple, lorsque vous sélectionnez une métrique ou un service check, les autres options disparaissent de la liste jusqu'à ce que vous supprimiez la sélection.
* La case à cocher `Triggered` sous l'attribut {{< ui >}}Status{{< /ui >}} correspond à `status:(Alert OR Warn OR "No Data")`. Triggered n'est pas un statut de monitor valide.
* Le nom de l'attribut {{< ui >}}Metric/Check{{< /ui >}} est toujours `metric` dans la requête. Par exemple, la sélection du check `http.can_connect` correspond à `metric:http.can_connect`.

**Remarque** : Pour les attributs comportant un grand nombre de valeurs sur vos monitors, utilisez la barre de recherche d'attributs pour trouver la valeur correcte.

## Vue enregistrée {#saved-view}

Les vues enregistrées vous permettent d'accéder rapidement à des vues prédéfinies afin de trouver des monitors pertinents en fonction d'un contexte précis. Il peut par exemple s'agir des monitors de votre équipe ou des monitors désactivés depuis plus de 60 jours :

{{< img src="monitors/manage_monitor/overview.jpg" alt="Sélection de vues enregistrées." style="width:90%;" >}}

Les vues enregistrées sont visibles par tous les membres de votre organisation.
Techniquement, une vue enregistrée conserve les éléments suivants :

- La requête de recherche

### Vue par défaut {#default-view}

{{< img src="monitors/manage_monitor/default.jpg" alt="Vue par défaut" style="width:50%;" >}}

Votre vue Manage Monitor existante est votre vue enregistrée par défaut. Vous seul pouvez accéder à cette configuration et la consulter, et sa mise à jour n'a aucun impact sur votre organisation.

Vous pouvez **temporairement** remplacer votre vue enregistrée par défaut en effectuant n'importe quelle action dans l'interface utilisateur ou en ouvrant des liens vers la page Manage Monitor qui intègrent une configuration différente.

Vous pouvez effectuer les actions suivantes depuis l'entrée de la vue par défaut dans le volet des vues :

* {{< ui >}}Reload{{< /ui >}} votre vue par défaut en cliquant sur l'entrée.
* {{< ui >}}Update{{< /ui >}} votre vue par défaut avec les paramètres actuels.
* {{< ui >}}Reset{{< /ui >}} votre vue par défaut aux paramètres par défaut de Datadog pour un nouveau redémarrage.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/status/#properties
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: /fr/monitors/
[5]: /fr/monitors/manage/#monitor-tags