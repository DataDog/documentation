---
title: Manage Monitor
kind: documentation
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Apprenez à créer un monitor
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurez les notifications de votre monitor
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Planifiez un downtime pour stopper les notifications d'un monitor
- link: "monitors/faq"
  tag: "FAQ"
  text: FAQ monitors
---

La page [Manage Monitors][1] vous permet d'exécuter une recherche avancée sur tous les monitors afin de pouvoir supprimer, mettre en sourdine, résoudre ou modifier les tags de service pour les monitor sélectionnés. Vous pouvez également cloner ou modifier entièrement un monitor depuis les résultats de la recherche.

{{< img src="monitors/manage_monitor/manage_monitor_page.png" alt="manage monitor page" responsive="true" >}}

## Trouver les monitors

La recherche avancée vous permet d'interroger les monitors par n'importe quelle combinaison d'attributs:

* `title` et `message` — recherche textuelle
* `status` — Alert, Warn, No Data, Ok
* `scope` — par exemple *, role:master-db
* `type` — metric, integration, apm, etc
* `muted`
* `creator`
* `id`
* `service` — tags
* `team` — tags
* `env` — tags
* `notification` — la cible des notifications du monitor, par ex. you@example.com, slack-ops-oncall
* `metric` — la métrique _ou_  check de service monitoré, ex. system.cpu.user, http.can_connect

Pour lancer une recherche, construisez votre requête en utilisant les cases à cocher sur la gauche et/ou la barre de recherche en haut. Lorsque vous cochez les cases, la barre de recherche est mise à jour avec la requête équivalente. De même, lorsque vous modifiez la requête de la barre de recherche (ou en écrivez une à partir de rien), les cases à cocher se mettent à jour pour refléter la modification. Dans tous les cas, les résultats de la requête sont mis à jour en temps réel lorsque vous modifiez la requête; il n'y a pas de bouton "Rechercher" sur lequel cliquer.

### Cocher les cases

Lorsque vous n'avez pas besoin de rechercher dans le titre et ou la configuration d'un monitor un texte spécifique, votre recherche se fait en quelques clics. Cochez autant de cases que nécessaire pour trouver les monitors de votre choix, en gardant à l'esprit les points suivants:

* Cocher des attributs de différents champs fait **ET** entre  les différentes valeurs, par ex. `status: Type d'alerte: Metric` (l'absence d'un opérateur entre les deux termes de recherche implique un **ET**)
* Cocher des attributs dans le même champ fait souvent **OU** entre  les valeurs, par ex. `status: (Alert OR Warn)`, mais il y a quelques exceptions. Par exemple, cocher plusieurs étendues ou tags de service conduit à un **ET**.
* Certains champs ne vous permettent pas de sélectionner plusieurs valeurs, par ex. Lorsque vous cochez une métrique ou un check de service, les autres métriques/checks disparaissent de la liste jusqu'à ce que vous ayez décoché votre sélection.
* La case à cocher "Triggered" sous le champ Statut signifie `status:(Alert OR Warn OR "No Data")`, pas `status:Triggered`. "Triggered" n'est pas un statut de monitor valide.
* La case à cocher "Muted" apparaît sous le champ Status, mais Muted est en fait son propre champ; le vérifier ajoute `muted:true` à votre requête, pas `status:muted`.
* Le champ Métrique/check est toujours appelé `metric` dans la requête, par ex. la sélection du check `http.can_connect` ajoute `metric:http.can_connect` à votre requête.

Pour les champs qui ont un nombre arbitraire (c'est-à-dire grand) de valeurs sur tous les monitors (tag de service, Scope, métrique/ check, notification), utilisez les barres de recherche spécifiques au champ pour trouver la valeur que vous recherchez.

Lorsque vous devez exécuter une recherche plus complexe que les cases à cocher ne le permettent, utilisez la barre de recherche pour modifier votre requête ou en écrire une nouvelle.

### Ecrire une requête

La raison la plus courante pour écrire une requête est de rechercher un texte spécifique sur tous les titres de monitors et les corps des messages. Une simple recherche de `postgresql` renvoie tous les monitors avec` postgresql` n'importe où dans le titre ou le corps du message. Pour effectuer une recherche sur le titre ou le corps du message, mais pas sur les deux, qualifiez le terme de recherche avec le nom du champ, par ex. `title:postgresql`.

Sinon, vous pouvez utiliser des opérateurs booléens (AND, OR et NOT) et des parenthèses pour écrire des requêtes complexes en utilisant des champs de contrôle. La syntaxe de recherche est très similaire à celle de [Elasticsearch][2], il est donc plus facile de décrire comment la syntaxe n'est *pas* comme la syntaxe Elasticsearch:

* Les expressions régulières ne sont pas prises en charge
* Le caractère générique de caractère unique (`?`) N'est pas pris en charge, mais le caractère générique général (`*`) l'est
* Les recherches de proximité ne sont pas supportées mais l'opérateur [fuzzy][3] l'est.
* Les plages ne sont pas supportées
* Boosting n'est pas supporté

Enfin, les caractères suivants sont réservés: `-`,` (`,`) `,` "`, `~`, `*`, `:`, `.`, et les espaces. Pour rechercher des champs de monitor qui incluent l'un d'entre eux, enveloppez le nom du champ entre guillemets:  `status:Alert AND "chef-client"` est une chaîne de requête valide, `status:Alert AND chef-client` ne l'est pas.

Il y a quelques mises en garde concernant les champs avec des guillemets:

* Vous pouvez utiliser `.` avec ou sans guillemets, comme il apparaît couramment dans certains champs: `metric: system.cpu.idle` est valide.
* Vous ne pouvez pas utiliser la recherche générique dans les chaînes entre guillemets: `"chef-client*"`, bien que syntaxiquement valide, ne retournera pas un monitor intitulé `"chef-client failing"`  car ` * ` est traité littéralement.

## Manager le monitor choisi

Lorsque vous avez trouvé les monitor que vous recherchiez, sélectionnez-en un ou plusieurs que vous souhaitez mettre à jour en cochant les cases à côté de chaque résultat. Vous pouvez sélectionner tous les résultats en cochant la case située en haut de l'en-tête de la colonne STATUS. Modifiez les monitors à l'aide des boutons en haut à droite des résultats de recherche: Mute, Resolve, Delete et Edit Service Tags.

{{< img src="monitors/manage_monitor/manage-monitors-mute.png" alt="manage-monitors-mute" responsive="true" style="width:80%;" >}}

Pour modifier un monitor, passez la souris dessus et utilisez les boutons à l'extrême droite de sa rangée: Edit, Clone, Mute, Delete Pour afficher plus de détails sur un monitor, cliquez sur son nom pour visiter sa page d'état.

{{< img src="monitors/manage_monitor/manage-monitors-hover-clone.png" alt="manage-monitors-hover-clone" responsive="true" style="width:80%;" >}}

## Gérer les monitors déclenchés avec une granularité au niveau du groupe

Vous pouvez désactiver ou résoudre les monitors déclenchés en à l'aide de la page [Triggered Monitors][4]. Elle est similaire à la page [Manage Monitors](#managing-monitors): vous pouvez trouver des monitors en fonction de leurs attributs en utilisant les mêmes cases à cocher ou la même syntaxe de requête, mais il existe quelques différences. En plus de montrer uniquement les monitors avec un état déclenché (Alert, Warn, or No Data), la  principale différence est que la page Triggered Monitors affiche une ligne pour chaque groupe (c'est-à-dire chaque source rapportant des données) pour chaque monitor.

Disons que vous avez un moniteur appelé "high latency" qui est groupé par hôte. S'il y a 20 hôtes rapportant des données et 14 ont un statut triggered, la page Triggered Monitor montrera ces 14 lignes si vous recherchez le monitor par titre dans la barre de recherche de requête (par exemple `high latency` ou` title:
"high latency"`). Cela vous permet de mettre en sourdine ou de résoudre un monitor pour certaines sources rapportant des données, mais pas toutes (bien sûr, vous pouvez également les désactiver ou les résoudre toutes d'un coup).

Lorsque vous rédigez vos requêtes de recherche, vous pouvez utiliser tous les mêmes champs disponibles sur la page Manage Monitors, même si la plupart d'entre eux ne sont pas contrôlables via des cases à cocher sur la page Triggered Monitors. Quelques remarques sur les différences de champs sur la page Triggered Monitors:

* Il utilise le champ `group_status` au lieu de` status`.
* Il ajoute le champ `triggered`, qui vous permet de filtrer les monitors selon le temps depuis lequel ils ont été déclenchés.
* Il ajoute également le champ `group`, qui vous permet d'affiner les résultats de recherche pour les monitors regroupés par plusieurs éléments. Supposons que vous ayez un monitor groupé par `host` et` env`. Vous recherchez ce monitor par titre et obtenez quatre lignes, où les groupes sont `host:web01,env:dev`, `host:web02,env:dev`, `host:web01,env:prod`, and `host:web02,env:prod`. Utilisez le champ `group` pour afficher uniquement, les host de prod (`group:"env:prod"`) ou l'host web02 (`group:"host:web02"`).

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#query-string-syntax
[3]: https://www.elastic.co/guide/en/elasticsearch/reference/2.4/query-dsl-query-string-query.html#_fuzziness
[4]: https://app.datadoghq.com/monitors/triggered
