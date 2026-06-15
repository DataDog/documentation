---
description: Utiliser des variables pour personnaliser les notifications de vos monitors
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: Guide
  text: Effectuer des opérations arithmétiques et des fonctions avec des évaluations
    de variables de modèle
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications des monitors
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centre d'apprentissage
  text: Suivez une formation pour apprendre à personnaliser les notifications de vos
    monitors d'alerte.
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirigez vos alertes de monitor avec les règles de notification des monitors
    Datadog
title: Variables
---
Utilisez des variables dans les messages de notification pour afficher des messages conditionnels et acheminer les notifications vers différentes équipes en utilisant [des variables conditionnelles](#conditional-variables), ou pour enrichir leur contenu en utilisant [des variables d'attribut et de tag](#attribute-and-tag-variables) et [des variables de modèle](#template-variables).

## Variables conditionnelles {#conditional-variables}

Les variables conditionnelles utilisent `if-else` la logique pour afficher un message différent en fonction de l'état du moniteur et des détails de son déclenchement. Ces variables peuvent être utilisées dans le sujet ou le corps du message de notification.

Voici la liste des variables conditionnelles disponibles :

| Variable conditionnelle       | Le texte est affiché si                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | The monitor alerts                                                 |
| `{{^is_alert}}`            | The monitor does not alert                                         |
| `{{#is_match}}`            | The context matches the provided substring. If a numeric value is used, it is converted to a string.|
| `{{^is_match}}`            | The context does not match the provided substring                  |
| `{{#is_exact_match}}`      | The context exactly matches the provided string.<br> If a number is used, the numeric value is considered, regardless of its type. This means that as long as two numbers have the same value, they are considered equal by the function. |
| `{{^is_exact_match}}`      | The context does not exactly match the provided string             |
| `{{#is_no_data}}`          | The monitor is triggered for missing data                          |
| `{{^is_no_data}}`          | The monitor is not triggered for missing data                      |
| `{{#is_warning}}`          | The monitor warns                                                  |
| `{{^is_warning}}`          | The monitor does not warn                                          |
| `{{#is_recovery}}`         | The monitor recovers from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA`         |
| `{{^is_recovery}}`         | The monitor does not recover from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA` |
| `{{#is_warning_recovery}}` | The monitor recovers from `WARNING` to `OK`                        |
| `{{^is_warning_recovery}}` | The monitor does not recover from `WARNING` to `OK`                |
| `{{#is_alert_recovery}}`   | The monitor recovers from `ALERT` to `OK`                          |
| `{{^is_alert_recovery}}`   | The monitor does not recover from an ALERT to OK                   |
| `{{#is_alert_to_warning}}` | The monitor transitions from `ALERT` to `WARNING`                  |
| `{{^is_alert_to_warning}}` | The monitor does not transition from `ALERT` to `WARNING`          |
| `{{#is_no_data_recovery}}` | The monitor recovers from `NO DATA`                                |
| `{{^is_no_data_recovery}}` | The monitor does not recover from `NO DATA`                        |
| `{{#is_priority 'value'}}` | The monitor has priority `value`. Value ranges from `P1` to `P5`   |
| `{{#is_unknown}}`          | The monitor is in the unknown state                                |
| `{{^is_unknown}}`          | The monitor is not in the unknown state                            |
| `{{#is_renotify}}`         | The monitor is renotifying                                         |
| `{{^is_renotify}}`         | Le moniteur ne renotifie pas.                                    |

### Exemples {#examples}

Les variables conditionnelles doivent avoir une paire d'ouverture et de fermeture avec le texte et **@-notifications** entre les deux. Les variables basées sur l'état du moniteur (comme `is_alert` ou `is_warning`), doivent avoir leur propre bloc de message. Parce qu'un moniteur ne peut être dans qu'un seul état à la fois, vous ne pouvez pas les combiner. Cependant, vous pouvez imbriquer des conditionnels qui correspondent aux attributs, voir les `is_renotify` exemples.

{{< tabs >}}
{{% tab "is_alert" %}}

Pour envoyer un message de notification lorsqu'un monitor génère une alerte, utilisez le format suivant :

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

Pour envoyer un message de notification lorsqu'un monitor génère un avertissement, utilisez le format suivant :

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

Pour envoyer un message de notification lorsqu'un monitor est rétabli, utilisez le format suivant :

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

Recherchez une sous-chaîne dans une variable de [tag](#attribute-and-tag-variables) avec le format :

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

Pour notifier votre équipe DB si un hôte déclencheur a le tag `role:db_cassandra` ou `role:db_postgres`, utilisez ce qui suit :

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

La condition `is_match` prend également en charge la correspondance de plusieurs chaînes :

```text
{{#is_match "host.role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

Pour envoyer une notification différente si le tag ne contient pas `db`, utilisez la négation de la condition comme suit :

```text
{{^is_match "host.role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

Ou utilisez le `{{else}}` paramètre dans le premier exemple :

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```
**Remarque** : Pour vérifier si un `<TAG_VARIABLE>` n'existe pas ou s'il est vide, utilisez `is_exact_match`. Voir l'onglet `is_exact_match` pour plus de détails :

{{% /tab %}}
{{% tab "is_exact_match" %}}

Recherchez une chaîne exacte dans une variable de [tag](#attribute-and-tag-variables) avec le format :

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

Pour notifier votre équipe de développement si un hôte déclencheur a le nom `production`, utilisez ce qui suit :

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

La condition `is_exact_match` prend également en charge la correspondance de plusieurs chaînes :

```text
{{#is_exact_match "host.name" "production" "staging"}}
  This displays if the host that triggered the alert is exactly
  named production or staging. @dev-team@company.com
{{/is_exact_match}}
```

La variable conditionnelle `is_exact_match` prend également en charge [`{{value}}` variables de modèle](#variables-de-modèle) :

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

Pour notifier votre équipe de développement si la valeur ayant dépassé le seuil du monitor est 5 (ou 5.0), utilisez l'exemple suivant :

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

La variable conditionnelle `is_exact_match` prend également en charge une chaîne vide pour le `<COMPARISON_STRING>` afin de vérifier si l'attribut ou le tag est vide ou n'existe pas.

```text
{{#is_exact_match "host.datacenter" ""}}
  This displays if the attribute or tag does not exist or if it's empty
{{/is_exact_match}}
```


{{% /tab %}}
{{% tab "is_renotify" %}}

Pour envoyer un message d'escalade à une destination différente uniquement pour l'environnement `production` :

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  This is an escalation message sent to @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

Pour envoyer un message d'escalade différent qui ne contient pas les détails du message original, utilisez une combinaison de `{{^is_renotify}}` and `{{#is_renotify}}` blocs :

```text
{{^is_renotify}}
This monitor is alerting and sending a first message @dev-team@company.com

To solve this monitor follow the steps:
1. Go there
2. Do this
{{/is_renotify}}

This part is generic and sent both for the first trigger and the escalation message.

{{#is_renotify}}
  This is the escalation message @dev-team@company.com
{{/is_renotify}}

```

Dans la nouvelle notification du monitor, les utilisateurs pourront lire le message de réaffectation suivant :

```
This part is generic and sent both for the first trigger and the escalation message.

This is the escalation message @dev-team@company.com
```

{{% /tab %}}

{{< /tabs >}}

Si vous configurez un bloc conditionnel pour une transition d'état dans les conditions `alert` ou `warning` avec un gestionnaire de notifications **@-notifications**, Datadog recommande de configurer une condition `recovery` correspondante pour envoyer une notification de récupération au gestionnaire.

**Remarque**: Tout texte ou gestionnaire de notification placé **en dehors** des variables conditionnelles configurées est invoqué à chaque transition d'état du moniteur. Tout texte ou gestionnaire de notification placé **à l'intérieur** des variables conditionnelles configurées n'est invoqué que si la transition d'état du moniteur correspond à sa condition.

## Variables d'attribut et de tag{#attribute-and-tag-variables}

Utilisez des variables d'attribut et de tag pour rendre les messages d'alerte personnalisés, informatifs et spécifiques afin d'aider à comprendre la nature de l'alerte. Voir les sections suivantes pour des exemples et des cas d'utilisation :
- [Variables d'alerte multiples](#multi-alert-variables)
- [Variables d'attribut/tag correspondantes](#matching-attributetag-variables)

Les tags
: Attaché automatiquement (comme le nom d'hôte, le nom de conteneur, le nom de fichier journal et le nom de fonction sans serveur) ou ajouté par le biais de tags personnalisés (comme l'équipe responsable, l'environnement, l'application ou la version).

Attributes
: Basé sur le contenu du journal et soit analysé soit ajouté par des recherches dans des tables de référence (par exemple, geoip).

**Remarque** : Si le moniteur est configuré pour se rétablir dans des conditions sans données (par exemple, lorsqu'il n'y a aucun événement correspondant à la requête), le message de récupération ne contient aucune donnée. Pour persister des informations dans le message de récupération, regroupez par des tags supplémentaires, qui sont accessibles par `{{tag.name}}`.

### Variables d'alerte multiples {#multi-alert-variables}

Configurez des variables d'alerte multiples dans [les moniteurs d'alerte multiples][1] en fonction de la dimension sélectionnée dans la boîte de groupe d'alerte multiples. Enrichissez les notifications en incluant dynamiquement la valeur associée à la dimension de regroupement dans chaque alerte.

**Remarque** : Lorsque vous utilisez le champ `group_by` dans l'agrégation, des tags et alertes supplémentaires du moniteur peuvent être hérités automatiquement. Cela signifie que toutes les alertes ou configurations définies sur le point de terminaison surveillé pourraient être appliquées à chaque groupe résultant de l'agrégation.

{{< tabs >}}
{{% tab "Regrouper par tag" %}}

Si une métrique est étiquetée avec un tag au format `key:value` et que la requête de surveillance est regroupée par ce tag, utilisez la variable :

```
{{ key.name }}
```

Cette variable insère le `value` associé au `key` dans chaque notification d'alerte. Par exemple, si votre moniteur déclenche une alerte pour chaque `env`, alors la variable `{{env.name}}` est disponible dans votre message de notification.

Si un groupe a plusieurs `values` associés au même `key`, le message d'alerte affiche une chaîne de valeurs séparées par des virgules, dans l'ordre lexicographique.

#### Clé de tag avec un point {#tag-key-with-period}

Si la clé de votre tag contient un point, incluez des crochets autour de la clé complète lors de l'utilisation d'une variable de tag. Par exemple, si votre tag est `dot.key.test:five` et que votre moniteur est regroupé par `dot.key.test`, utilisez :

```text
{{[dot.key.test].name}}
```

{{% /tab %}}

{{% tab "Grouper par facette" %}}

Les moniteurs de logs, les moniteurs d'analytique de traces, les moniteurs RUM et les moniteurs d'événements peuvent utiliser des facettes comme variables si le moniteur est regroupé par facette. Si un moniteur de logs est regroupé par `@facet_key`, utilisez la variable :

```text
{{ @facet_key.name }}
```

**Exemple** : Pour inclure des informations spécifiques au groupe dans un groupe de moniteurs de logs multi alertes regroupé par `@machine_id` :

```text
This alert was triggered on {{ @machine_id.name }}
```

Si votre facette comporte des points, placez-la entre crochets. Par exemple :

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### Personnalisez la notification en fonction du groupe {#customize-the-notification-based-on-the-group}

Lorsque votre requête est regroupée par des dimensions spécifiques, vous pouvez enrichir les notifications avec des métadonnées dynamiques associées au groupe. Pour voir une liste de variables de tag en fonction de votre sélection de tags, cliquez sur **Utiliser des variables de modèle de message** dans la section **Configurer les notifications et les automatisations**. Voir les exemples suivants :

{{% collapse-content title="Regroupement de requêtes par host" level="h5" %}}

Si votre moniteur déclenche une alerte pour chaque `host`, alors les variables de tag `{{host.name}}` and `{{host.ip}}` sont disponibles ainsi que tout tag d'hôte qui est disponible sur cet hôte.

Variables spécifiques aux métadonnées du host :

- Version de l'agent : `{{host.metadata_agent_version}}`
- Machine : `{{host.metadata_machine}}`
- Plateforme : `{{host.metadata_platform}}`
- Processeur : `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="Groupe de requêtes par kube_namespace et kube_cluster_name" level="h5" %}}
Si votre moniteur déclenche une alerte pour chaque `kube_namespace` et `kube_cluster_name`, alors vous pouvez accéder à n'importe quel attribut de l'espace de noms.

Variables de métadonnées de l'espace de nommage :

- Nom du cluster : `{{kube_namespace.cluster_name}}`
- Nom de l'espace de noms : `{{kube_namespace.display_name}}`
- Statut de l'espace de noms : `{{kube_namespace.status}}`
- Étiquettes de l'espace de noms : `{{kube_namespace.labels}}`

Le tableau suivant contient tous les attributs disponibles :

| Syntaxe de variable   | Attributs de premier niveau |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `group_size`, `labels`, `name`, `namespace`, `status`, `uid`|
{{% /collapse-content %}}

{{% collapse-content title="Interroger par pod_name, kube_namespace et kube_cluster_name" level="h5" %}}
Si votre moniteur déclenche une alerte pour chaque `pod_name` et `kube_namespace` et `kube_cluster_name`, alors vous pouvez accéder à n'importe quel attribut du pod.

Variables de métadonnées du pod :
- Nom du cluster : `{{pod_name.cluster_name}}`
- Nom du pod : `{{pod_name.name}}`
- Phase du pod : `{{pod_name.phase}}`

Le tableau suivant contient tous les attributs disponibles :

| Syntaxe de variable   | Attributs de premier niveau |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `conditions`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `host_id`, `host_key`, `hostname`, `init_container_statuses`, `ip`, `labels`, `name`, `namespace`, `node_name`, `nominated_node_name`, `phase`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="Interroger par service" level="h5" %}}

Si votre moniteur déclenche une alerte pour chaque `service`, alors vous pouvez accéder à un attribut du service, tel que défini dans le [Catalogue de logiciels][10].

Variables de métadonnées de service :

- Nom du service : `{{service.name}}`
- Nom de l'équipe : `{{service.team}}`
- Docs : `{{service.docs}}`
- Liens : `{{service.links}}`

Pour les Docs et les Liens, vous pouvez également accéder à un élément spécifique avec la syntaxe suivante `[<name>]`. Par exemple, pour les services qui ont un schéma de définition comme celui défini dans cet [exemple][11], vous pouvez accéder au lien "Runbook" en utilisant la syntaxe suivante

```text
{{service.links[Runbook]}}
```
{{% /collapse-content %}}

### Correspondance des variables d'attribut/tag {#matching-attributetag-variables}

Vous pouvez inclure tout attribut ou tag d'un journal, d'une trace, d'un événement RUM, d'un pipeline CI ou d'un événement de test CI qui correspond à la requête de surveillance. Le tableau suivant montre des exemples d'attributs et de variables que vous pouvez ajouter à partir de différents types de surveillance.

<div class="alert alert-info">Pour voir la liste complète des variables disponibles pour votre moniteur, en bas de votre configuration de notification, cliquez sur <strong>{{&nbsp;Add Variable</strong> et sélectionnez parmi les options du menu déroulant.</div>

| Type de moniteur             | Syntaxe de variable                                         |
|--------------------------|--------------------------------------------------------|
| [Trace d'audit][16]        | `{{audit.attributes.key}}` or `{{audit.message}}`      |
| [CI Pipeline][17]        | `{{cipipeline.attributes.key}}`                        |
| [CI Test][18]            | `{{citest.attributes.key}}`                            |
| [Database Monitoring][19]| `{{databasemonitoring.attributes.key}}`                |
| [Error Tracking][14]     | `{{issue.attributes.key}}`                             |
| [Log][12]                | `{{log.attributes.key}}` or `{{log.tags.key}}`         |
| [RUM][15]                | `{{rum.attributes.key}}` or `{{rum.tags.key}}`         |
| [Synthetic Monitoring][20]| `{{synthetics.attributes.key}}`                       |
| [Trace Analytics][13]    | `{{span.attributes.key}}` or `{{span.tags.key}}`       |

{{% collapse-content title="Exemple d'utilisation de la syntaxe" level="h4" %}}
- Pour chaque `key:value` paire, la variable `{{log.tags.key}}` renders `valeur` dans le message d'alerte.
- Le `@` qui précède tous les attributs n'est pas inclus. Par exemple, si un moniteur de journal est regroupé par `@http.status_code`, vous pouvez inclure le message d'erreur ou les balises d'infrastructure dans le message de notification en utilisant les variables:

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="Syntaxe de variable d'attribut correspondante" style="width:90%;">}}
- Le message rend l'attribut `error.message` d'un journal choisi correspondant à la requête, **si l'attribut existe**.
- Si la balise est sur un événement, utilisez la syntaxe suivante :

  ```text
  {{ event.tags.[dot.key.test] }}
  ```

{{% /collapse-content %}}

#### Notes importantes {#important-notes}

- Si l'événement sélectionné n'inclut pas l'attribut ou la clé de balise, la variable rend vide dans le message de notification. Pour éviter de manquer des notifications, évitez d'utiliser ces variables pour le routage des notifications avec `{{#is_match}}` gère.
- Pour les moniteurs utilisant des Formules et Fonctions dans les requêtes, les valeurs se résolvent en fonction des événements extraits de la première requête.


#### Attributs réservés {#reserved-attributes}

Les événements de logs, de gestion des événements, de spans, de RUM, de Pipeline CI et de tests CI disposent d'attributs réservés génériques, que vous pouvez utiliser dans les variables avec la syntaxe suivante :

| Type de moniteur    | Syntaxe de variable   | Attributs de premier niveau |
|-----------------|-------------------|------------------------|
| Journal             | `{{log.key}}`     | `message`, `service`, `statut`, `source`, `span_id`, `timestamp`, `trace_id`, `lien`, `hôte` |
| Trace Analytics | `{{span.key}}`    | `env`, `nom_de_l_opération`, `nom_de_ressource`, `service`, `statut`, `span_id`, `timestamp`, `trace_id`, `type`, `lien` |
| RUM             | `{{rum.key}}`     | `service`, `statut`, `timestamp`, `lien` |
| Event             | `{{event.key}}`     | `attributs`, `nom_hôte`, `id`, `lien`, `titre`, `texte`, `tags` |
| CI Pipeline             | `{{cipipeline.key}}`     | `service`, `env`, `nom_de_ressource`, `niveau_ci`, `trace_id`, `span_id`, `empreinte_de_pipeline`, `nom_de_l_opération`, `ci_partial_array`, `statut`, `timestamp`, `lien` |
| CI Test             | `{{citest.key}}`     | `service`, `env`, `nom_de_ressource`, `trace_id`, `span_id`, `nom_de_l_opération`, `statut`, `timestamp`, `lien` |

Si l'événement correspondant ne contient pas l'attribut dans sa définition, la variable n'affiche rien.

#### Lien de l'explorateur {#explorer-link}

Utilisez `{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, and `{{issue.link}}` pour enrichir la notification avec un lien vers l'Explorateur de Logs, l'Explorateur de Traces, l'Explorateur RUM ou le Suivi des Erreurs, en se basant sur les événements correspondant à la requête.

### Vérifiez les variables de surveillance {#check-monitor-variables}

Pour vérifier les variables de surveillance (vérification personnalisée et vérification d'intégration), la variable `{{check_message}}` est disponible et rend le message spécifié dans la vérification personnalisée ou la vérification d'intégration.

### Variables de surveillance composites {#composite-monitor-variables}

Les monitors composite peuvent accéder à la valeur et à l'état associés aux sous-monitors au moment du déclenchement de l'alarme.

Par exemple, si votre moniteur composite a un sous-moniteur `a`, vous pouvez inclure la valeur de `a` avec :

```text
{{ a.value }}
```

Pour récupérer le statut du sous-moniteur `a`, utilisez :

```text
{{ a.status }}
```

Les valeurs possibles pour le statut sont : `OK`, `Alert`, `Warn` et `No Data`.

Les moniteurs composites prennent également en charge les variables de tag de la même manière que leurs moniteurs sous-jacents. Ils suivent le même format que les autres moniteurs, à condition que les moniteurs sous-jacents soient regroupés par le même tag ou facette.

Par exemple, supposons que votre moniteur composite ait un sous-moniteur `a`, qui est un moniteur de journaux. Vous pouvez inclure la valeur de n'importe quel tag ou facette de `a` avec :

```text
{{ a.log.message }} or {{ a.log.my_facet }}
```

### Échappement de caractères {#character-escape}

Le contenu variable est encodé en HTML par défaut. Pour afficher du contenu brut, non encodé, utilisez trois accolades au lieu de deux.

Par exemple, lorsque la valeur d'une variable contient une URL avec des paramètres de requête, le `&` est traité différemment selon que des doubles ou des triples accolades sont utilisées :

| Syntaxe | Exemple de sortie |
--------|----------------|
| `{{template_variable}}` (double braces) | `https://status.example.com/check?service=web&amp;region=us-east` |
| `{{{template_variable}}}` (triple braces) | `https://status.example.com/check?service=web&region=us-east` |

| Syntaxe | Sortie |
|--------|--------|
| `{{variable}}` | HTML-encoded (default) |
| `{{{variable}}}` | Brut, non encodé |

Par exemple, pour rendre le message de vérification sans encodage HTML :

```text
{{{check_message}}}
```

Ceci est particulièrement pertinent lorsque `{{check_message}}` contains auto-generated URLs with query parameters (for example, on HTTP Check monitors). The `&` characters in those URLs are HTML-encoded by default, which can break clickable links in notifications. Use `{{{check_message}}}` pour préserver les URLs telles quelles.

## Variables de modèle {#template-variables}

Utilisez des variables de template pour personnaliser vos notifications de monitor. Les variables intégrées sont :

| Variable                             | Description                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | The value that breached the alert for metric based query monitors.            |
| `{{threshold}}`                      | The value of the alert threshold set in the monitor's alert conditions.       |
| `{{warn_threshold}}`                 | The value of the warning threshold set in the monitor's alert conditions.     |
| `{{alert_recovery_threshold}}`       | The value that recovered the monitor from its `ALERT` state.                  |
| `{{warn_recovery_threshold}}`        | The value that recovered the monitor from its `WARN` state.                   |
| `{{ok_threshold}}`                   | The value that recovered the Service Check monitor.                           |
| `{{comparator}}`                     | The relational value set in the monitor's alert conditions.                   |
| `{{first_triggered_at}}`<br>*See section below*         | The UTC date and time when the monitor first triggered.                       |
| `{{first_triggered_at_epoch}}`<br>*See section below*   | The UTC date and time when the monitor first triggered in epoch milliseconds. |
| `{{last_triggered_at}}`<br>*See section below*          | The UTC date and time when the monitor last triggered.                        |
| `{{last_triggered_at_epoch}}`<br>*See section below*    | The UTC date and time when the monitor last triggered in epoch milliseconds.  |
| `{{triggered_duration_sec}}`         | Le nombre de secondes pendant lesquelles le moniteur a été dans un état déclenché.              |

### Variables déclenchées {#triggered-variables}

 Le `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}`, and `{{last_triggered_at_epoch}}` monitor template variables reflect the values when a monitor changes state, **NOT** when a new monitor event occurs. Renotification events show the same template variable if the monitor state has not changed. Use `{{triggered_duration_sec}}` pour afficher la durée au moment de l'événement du moniteur.

 `{{first_triggered_at}}` is set when the monitor group goes from `OK` to a non-`OK` state or when a new group appears in a non-`OK` state. `{{last_triggered_at}}` gets set when the monitor group goes to a non-`OK` state independently from its previous state (including `WARN` → `ALERT`, `ALERT` → `WARN`). Additionally, `{{last_triggered_at}}` is set when a new group appears in a non-`OK` state. The difference is that `{{last_triggered_at}}` est indépendant de son état précédent.

 {{< img src="monitors/notifications/triggered_variables.png" alt="Affichage de quatre transitions avec horodatages : A : 1419 de OK à WARN, B : 1427 de WARN à ALERT, C : 1445 de ALERT à NO DATA, D : 1449 de NO DATA à OK" style="width:90%;">}}

**Exemple** : Lorsque le moniteur passe de `OK` → `WARN`, les valeurs de `{{first_triggered_at}}` and `{{last_triggered_at}}` ont tous deux l'horodatage A. Le tableau ci-dessous montre les valeurs jusqu'à ce que le moniteur se rétablisse.

| Transition         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### Évaluation {#evaluation}

Les variables de modèle qui renvoient des valeurs numériques prennent en charge des opérations et des fonctions, ce qui vous permet d'effectuer des opérations mathématiques ou des modifications de format sur la valeur. Pour plus de détails, voir [Évaluation des variables de modèle][7].

### Heure locale {#local-time}

Utilisez la fonction `local_time` pour ajouter une autre date dans votre notification dans le fuseau horaire de votre choix. Cette fonction transforme une date en son heure locale : `{{local_time 'time_variable' 'timezone'}}`.
Par exemple, pour ajouter l'heure du dernier déclenchement du moniteur dans le fuseau horaire de Tokyo dans votre notification, incluez ce qui suit dans le message de notification :

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

Le résultat est affiché au format ISO 8601 : `yyyy-MM-dd HH:mm:ss±HH:mm`, par exemple `2021-05-31 23:43:27+09:00`.
Consultez la [liste des fuseaux horaires de la base de données tz][8], en particulier la colonne des noms de la base de données TZ, pour voir la liste des valeurs de fuseau horaire disponibles.

## Avancé {#advanced}

### Gestionnaires dynamiques {#dynamic-handles}

Utilisez les [variables de balise](#attribute-and-tag-variables) pour construire dynamiquement des gestionnaires de notification et acheminer les notifications vers la bonne équipe ou service en fonction du type de problème détecté par votre moniteur.

**Exemple** : Si votre moniteur interroge une métrique et la regroupe par une `service` balise, vous pouvez faire en sorte que vos notifications soient acheminées vers différents canaux Slack en fonction du service défaillant :

```text
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

Si votre moniteur commence à échouer sur le groupe `service:ad-server`, la notification est envoyée au canal Slack `#ad-server` avec le contenu suivant :

```text
@slack-ad-server There is an ongoing issue with ad-server.
```

Lors de la création de gestionnaires dynamiques avec des attributs qui pourraient ne pas toujours être présents, vous pourriez rencontrer des problèmes de livraison de notification. Si un attribut est manquant, la variable apparaît vide dans le message de notification, ce qui entraîne un gestionnaire invalide.

Pour éviter les notifications manquées avec ces variables, pensez à ajouter un handle de secours :

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // This will notify @slack-example if the kube_namespace.owner variable is empty or does not exist.
{{/is_exact_match}}
```


### Liens dynamiques {#dynamic-links}

Utilisez les [variables de balise](#attribute-and-tag-variables) pour activer la création dynamique d'URL qui relie votre équipe à une ressource appropriée. Par exemple, vous pouvez fournir des liens vers des pages au sein de Datadog telles que des tableaux de bord, la carte des hôtes et des moniteurs.

{{< tabs >}}
{{% tab "Dashboards" %}}

Utilisez le `{{host.name}}` [variable de balise](#attribute-and-tag-variables) pour fournir un lien vers un tableau de bord système :

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Utilisez le `{{host.name}}` [tag variable](#attribute-and-tag-variables) and an `<INTEGRATION_NAME>` pour fournir un lien vers un tableau de bord d'intégration :

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

Utilisez le `{{last_triggered_at_epoch}}` [template variable](#template-variables) as well as a `<DASHBOARD_ID>` and `<DASHBOARD_NAME>` pour lier à des tableaux de bord avec des plages de temps relatives depuis le moment de l'alerte :

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "Hostmap" %}}

Utilisez une [variable de balise](#attribute-and-tag-variables) telle que `{{service.name}}` pour fournir un lien vers la carte des hôtes :

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

Le lien de la carte des hôtes est personnalisable avec des paramètres supplémentaires. Les plus courants sont :

| Paramètre | Défini avec               | Détermine                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | La couleur de remplissage des hexagones hôtes. |
| `groupby` | `groupby=<TAG_KEY>`        | Les groupes pour les hexagones hôtes.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | La taille des hexagones hôtes.       |

{{% /tab %}}
{{% tab "Les monitors" %}}

Utilisez le `{{host.name}}` [variable de balise](#attribute-and-tag-variables) pour fournir un lien vers tous les moniteurs liés à un hôte spécifique :

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

Le lien des moniteurs est personnalisable avec des paramètres supplémentaires. Les plus courants sont :

| Paramètre | Exemple        | Affiche                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Moniteurs dans un état d'alerte (statuts supplémentaires : `WARN`, `NO DATA` et `OK`)   |
| `muted`   | `muted: true`  | Moniteurs muets (utilisez `false` pour les moniteurs non muets)                             |
| `type`    | `type:log`     | Moniteurs de journal (voir d'autres [types de moniteurs][1])                                     |



[1]: /fr/monitors/types
{{% /tab %}}
{{% tab "Logs" %}}

Utilisez le `{{last_triggered_at_epoch}}` [variable de modèle](#template-variables) pour fournir un lien vers tous les journaux se produisant au moment de l'alerte.

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

Le lien des journaux est personnalisable avec des paramètres supplémentaires. Les plus courants sont :

| Paramètre | Défini avec               | Détermine                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | Filtrer sur les journaux d'un service spécifique.  |
| `host`    | `host=<HOST_NAME>`         | Filtrer sur les journaux d'un hôte spécifique      |
| `status`  | `status=<STATUS>`          | Statut des journaux : Error, Warn, Info, etc. |


{{% /tab %}}
{{< /tabs >}}

### Commentaires {#comments}

Pour ajouter un commentaire dans le message du monitor, utilisez la syntaxe suivante :

```text
{{!-- this is a comment --}}
{{!-- this is a comment }}
```

### Format brut {#raw-format}

Si votre message d'alerte doit envoyer des accolades doubles, comme `{{ <TEXT> }}`, use `{{{{raw}}}}` formatage. Par exemple, ce qui suit :

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Résultat :

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

Les `^|#` aides utilisées dans [les variables conditionnelles](#conditional-variables) ne peuvent pas être utilisées avec `{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `La variable conditionnelle `{{is_match}}` utilise le modèle suivant :

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

Si `host.name` correspond à `<HOST_NAME>`, le modèle produit :

```text
{{ .matched }} the host name
```

### Encoder l'URL {#url-encode}

Si votre message d'alerte contient des informations qui doivent être encodées dans une URL (par exemple, pour des redirections), utilisez le `{{ urlencode "<variable>"}}` syntaxe.

**Exemple** : Si votre message de surveillance contient une URL vers le Catalogue de Logiciels filtrée pour un service spécifique, utilisez la `service` [variable de balise](#attribute-and-tag-variables) et ajoutez le `{{ urlencode "<variable>"}}` syntaxe à l'URL :

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration/#alert-grouping
[2]: /fr/monitors/types/log/
[3]: /fr/monitors/types/apm/?tab=analytics
[4]: /fr/monitors/types/real_user_monitoring/
[5]: /fr/monitors/types/ci/
[6]: /fr/monitors/types/database_monitoring/
[7]: /fr/monitors/guide/template-variable-evaluation/
[8]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[9]: /fr/monitors/types/error_tracking/
[10]: /fr/software_catalog/service_definitions/
[11]: https://docs.datadoghq.com/fr/software_catalog/service_definitions/v2-2/#example-yaml
[12]: /fr/monitors/types/log/
[13]: /fr/monitors/types/apm/?tab=analytics
[14]: /fr/monitors/types/error_tracking/
[15]: /fr/monitors/types/real_user_monitoring/
[16]: /fr/monitors/types/audit_trail/
[17]: /fr/monitors/types/ci/?tab=tests
[18]: /fr/monitors/types/ci/?tab=pipelines
[19]: /fr/monitors/types/database_monitoring/
[20]: /fr/synthetics/notifications/template_variables/