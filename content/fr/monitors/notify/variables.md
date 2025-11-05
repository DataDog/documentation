---
description: Utiliser des variables pour personnaliser les notifications de vos monitors
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: Guide
  text: Utiliser des opérations et des fonctions arithmétiques à l'aide d'évaluations
    de template variables
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

Utilisez des variables dans les messages de notification pour afficher un contenu conditionnel et router la notification vers différentes équipes grâce aux [variables conditionnelles](#variables-conditionnelles), ou pour enrichir le contenu en utilisant des [variables d'attributs et d'étiquettes](#variables-d-attributs-et-d-etiquettes) et des [variables de modèle](#variables-de-modèle).

## Variables conditionnelles

Les variables conditionnelles reposent sur une logique `if-else` pour afficher un message personnalisé en fonction de l'état du monitor et des détails de son déclenchement. Ces variables peuvent être utilisées dans le sujet ou le corps du message de la notification.

Voici la liste des variables conditionnelles disponibles :

| Variable conditionnelle       | Condition d'affichage du texte                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | Le monitor génère une alerte.                                                 |
| `{{^is_alert}}`            | Le monitor ne génère pas d'alerte.                                         |
| `{{#is_match}}`            | Le contexte correspond à la sous-chaîne fournie. Si une valeur numérique est utilisée, elle est convertie en chaîne.|
| `{{^is_match}}`            | Le contexte ne correspond pas à la sous-chaîne indiquée.                  |
| `{{#is_exact_match}}`      | Le contexte correspond exactement à la chaîne fournie.<br> Si une valeur numérique est utilisée, sa valeur est prise en compte, quel que soit son type. Cela signifie que deux nombres de même valeur seront considérés comme égaux par la fonction. |
| `{{^is_exact_match}}`      | Le contexte ne correspond pas exactement à la chaîne indiquée.             |
| `{{#is_no_data}}`          | Le monitor s'est déclenché en raison de données manquantes.                          |
| `{{^is_no_data}}`          | Le monitor ne s'est pas déclenché en raison de données manquantes.                      |
| `{{#is_warning}}`          | Le monitor génère un avertissement.                                                  |
| `{{^is_warning}}`          | Le monitor ne génère pas d'avertissement.                                          |
| `{{#is_recovery}}`         | Le monitor est rétabli depuis un état `ALERT`, `WARNING`, `UNKNOWN` ou `NO DATA`.         |
| `{{^is_recovery}}`         | Le monitor n'est pas rétabli depuis un état `ALERT`, `WARNING`, `UNKNOWN` ou `NO DATA`. |
| `{{#is_warning_recovery}}` | Le monitor passe d'un état `WARNING` à un état `OK`.                        |
| `{{^is_warning_recovery}}` | Le monitor ne passe pas d'un état `WARNING` à un état `OK`.                |
| `{{#is_alert_recovery}}`   | Le monitor passe d'un état `ALERT` à un état `OK`.                          |
| `{{^is_alert_recovery}}`   | Le monitor ne passe pas d'un état ALERT à un état OK.                   |
| `{{#is_alert_to_warning}}` | Le monitor passe d'un état `ALERT` à un état `WARNING`.                  |
| `{{^is_alert_to_warning}}` | Le monitor ne passe pas d'un état `ALERT` à un état `WARNING`.          |
| `{{#is_no_data_recovery}}` | Le monitor est rétabli depuis un état `NO DATA`.                                |
| `{{^is_no_data_recovery}}` | Le monitor n'est pas rétabli depuis un état `NO DATA`.                        |
| `{{#is_priority 'valeur'}}` | Le monitor possède la priorité `valeur`, qui va de `P1` à `P5`.   |
| `{{#is_unknown}}`          | Le monitor possède un état inconnu.                                |
| `{{^is_unknown}}`          | Le monitor ne possède pas un état inconnu.                            |
| `{{#is_renotify}}`         | Le monitor renvoie des notifications.                                         |
| `{{^is_renotify}}`         | Le monitor ne renvoie pas de notification.                                    |

### Exemples

La variable conditionnelle doit comporter un élément d'ouverture et un élément de fermeture entourant le texte et les **notifications « @ »**.

{{< tabs >}}
{{% tab "is_alert" %}}

Pour envoyer un message de notification lorsqu'un monitor génère une alerte, utilisez le format suivant :

```text
{{#is_alert}}
  <TEXTE_MESSAGE_ALERTE> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

Pour envoyer un message de notification lorsqu'un monitor génère un avertissement, utilisez le format suivant :

```text
{{#is_warning}}
  <TEXTE_MESSAGE_AVERTISSEMENT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

Pour envoyer un message de notification lorsqu'un monitor est rétabli, utilisez le format suivant :

```text
{{#is_recovery}}
  <TEXTE_MESSAGE_RÉTABLISSEMENT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

Pour rechercher une sous-chaîne dans une [variable de tag](#variables-d-attribut-et-de-tag), utilisez le format suivant :

```text
{{#is_match "<VARIABLE_TAG>.name" "<CHAÎNE_COMPARAISON>"}}
  Cela s'affiche si <CHAÎNE_COMPARAISON> fait partie de <VARIABLE_TAG>.
{{/is_match}}
```

Pour informer votre équipe DB qu'un host déclencheur dispose du tag `role:db_cassandra` ou `role:db_postgres`, utilisez le format suivant :

```text
{{#is_match "role.name" "db"}}
  Cela s'affiche si le nom du rôle du host qui a déclenché l'alerte contient `db`. @db-team@company.com
{{/is_match}}
```

La condition `is_match` prend également en charge plusieurs chaînes :

```text
{{#is_match "role.name" "db" "database"}}
  Cela s'affiche si le nom du rôle du host qui a déclenché l'alerte contient `db` ou `database`.
  @db-team@company.com
{{/is_match}}
```

Pour envoyer une autre notification lorsque le tag ne contient pas `db`, utilisez la négation de la condition tel que suit :

```text
{{^is_match "role.name" "db"}}
  Cela s'affiche si le tag du rôle ne contient pas `db`.
  @slack-example
{{/is_match}}
```

Vous pouvez également utiliser le paramètre `{{else}}` dans le premier exemple :

```text
{{#is_match "role.name" "db"}}
  Cela s'affiche si le nom du rôle du host qui a déclenché l'alerte contient `db`.
  @db-team@company.com
{{else}}
  Cela s'affiche si le tag du rôle ne contient pas `db`.
  @slack-example
{{/is_match}}
```
**Remarque** : pour vérifier si une `<TAG_VARIABLE>` n'existe pas ou si elle est vide, utilisez `is_exact_match`. Voir l'onglet `is_exact_match` pour plus de détails. 

{{% /tab %}}
{{% tab "is_exact_match" %}}

Pour rechercher une chaîne exacte dans une [variable de tag](#variables-d-attribut-et-de-tag), utilisez le format suivant :

```text
{{#is_exact_match "<VARIABLE_TAG>.name" "<CHAÎNE_COMPARAISON>"}}
  Cela s'affiche si <CHAÎNE_COMPARAISON> correspond exactement à <VARIABLE_TAG>.
{{/is_exact_match}}
```

Pour informer votre équipe de développement lorsqu'un host déclencheur dispose du nom `production`, utilisez le format suivant :

```text
{{#is_exact_match "host.name" "production"}}
  Cela s'affiche si le host qui a déclenché l'alerte s'intitule précisément « production ». @dev-team@company.com
{{/is_exact_match}}
```

La condition `is_exact_match` prend également en charge la correspondance avec plusieurs chaînes :

```text
{{#is_exact_match "host.name" "production" "staging"}}
  Ce message s'affiche si le host qui a déclenché l'alerte s'appelle
  exactement production ou staging. @dev-team@company.com
{{/is_exact_match}}
```

La variable conditionnelle `is_exact_match` prend également en charge les [variables de modèle `{{value}}`](#variables-de-modele) :

```text
{{#is_exact_match "value" "<VALUE>"}}
  Ceci s'affiche si la valeur ayant dépassé le seuil du monitor est exactement <VALUE>.
{{/is_exact_match}}
```

Pour notifier votre équipe de développement si la valeur ayant dépassé le seuil du monitor est 5 (ou 5.0), utilisez l'exemple suivant :

```text
{{#is_exact_match "value" "5"}}
  Ce message s'affiche si la valeur ayant dépassé le seuil du monitor est 5. @dev-team@company.com
{{/is_exact_match}}
```

La variable conditionnelle `is_exact_match` prend également en charge une chaîne vide pour le `<COMPARISON_STRING>` afin de vérifier si l’attribut ou le tag est vide ou n’existe pas.
```text
{{#is_exact_match "host.datacenter" ""}}
  Ce message s'affiche si l'attribut ou le tag n'existe pas ou s'il est vide
{{/is_match}}
```


{{% /tab %}}
{{% tab "is_renotify" %}}

Pour envoyer un message de réaffectation à une autre destination, seulement pour l'environnement `production` :

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  Ceci est un message de réaffectation envoyé à @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

Pour envoyer un autre message de réaffectation qui ne contient pas les informations du message d'origine, utilisez à la fois les blocs `{{^is_renotify}}` et `{{#is_renotify}}` :

```text
{{^is_renotify}}
Ce monitor possède un état d'alerte et envoie un premier message à @dev-team@company.com

Pour rétablir l'état de ce monitor, suivez les étapes suivantes :
1. Allez ici
2. Faites ceci
{{/is_renotify}}

Cette section est générique et est envoyée pour le premier déclenchement et le message de réaffectation.
{{#is_renotify}}
  Ceci est le message de réaffectation @dev-team@company.com
{{/is_renotify}}

```

Dans la nouvelle notification du monitor, les utilisateurs pourront lire le message de réaffectation suivant :

```
Cette section est générique et est envoyée pour le premier déclenchement et le message de réaffectation.

Ceci est le message de réaffectation @dev-team@company.com
```

{{% /tab %}}
{{< /tabs >}}

Si vous configurez un bloc conditionnel pour une transition d'état vers les conditions `alert` ou `warning` avec une mention **@-notifications**, il est recommandé de configurer une condition `recovery` correspondante afin qu'une notification de rétablissement soit envoyée à cette même mention.

**Remarque** : tout texte ou handle de notification placé **en dehors** des variables conditionnelles configurées est invoqué à chaque changement d'état du monitor. À l'inverse, tout texte ou handle de notification placé **au sein** des variables conditionnelles configurées est invoqué uniquement si le changement d'état du monitor respecte la condition.

## Variables d'attribut et de tag

Utilisez des variables d'attributs et de tag pour créer des messages d'alerte personnalisés, informatifs et ciblés afin de mieux comprendre la nature de l'alerte. Voir les sections suivantes pour des exemples et cas d'usage :
- [Variables à alertes multiples](#variables-a-alertes-multiples)
- [Variables d'attributs et d'étiquettes correspondantes](#variables-d-attributs-et-d-etiquettes-correspondantes)

Tags
: automatiquement associés (comme le nom de host, le nom du conteneur, le nom du fichier de log ou le nom de la fonction serverless) ou ajoutés via des tags personnalisés (comme l'équipe responsable, l'environnement, l'application ou la version).

Attributs
: basés sur le contenu du log et soit analysés, soit ajoutés à l'aide de recherches dans des tables de référence (par exemple, geoip).

**Remarque** : Si le monitor est configuré pour se rétablir en cas d'absence de données (par exemple, lorsqu'aucun événement ne correspond à la requête), le message de rétablissement ne contient aucune donnée. Pour conserver des informations dans le message de rétablissement, effectuez un groupement par des tags supplémentaires, accessibles via `{{tag.name}}`.

### Variables à alertes multiples

Configurez des variables à alertes multiples dans des [monitors à alertes multiples][1] en fonction de la dimension sélectionnée dans la section du groupe à alertes multiples. Enrichissez le contenu de la notification en incluant de façon dynamique la valeur associée au groupe en fonction des dimensions de chaque alerte. 

**Remarque** : lorsque vous utilisez le champ `group_by` pour l'agrégation, des tags et des alertes supplémentaires issus du monitor peuvent être hérités automatiquement. Cela signifie que toute alerte ou configuration définie sur l'endpoint surveillé pourrait être appliquée à chaque groupe résultant de l'agrégation.

{{< tabs >}}
{{% tab "Regrouper par tag" %}}

Lorsqu'une métrique possède un tag au format `key:value` et que la requête du monitor est regroupée en fonction de ce tag, utilisez la variable suivante :

```
{{ key.name }}
```

Cette variable insère la `value` associée à la `key` dans chaque notification d’alerte. Par exemple, si votre monitor déclenche une alerte pour chaque `env`, alors la variable `{{env.name}}` est disponible dans votre message de notification.

Si un groupe possède plusieurs `values` associées à la même `key`, le message d'alerte affiche une chaîne contenant toutes les valeurs, séparées par des virgules, dans l'ordre lexicographique.

#### Clé de tag avec un point

Si la clé de votre tag contient un point, entourez l'intégralité de la clé avec des crochets lors de l'utilisation d'une variable de tag. Par exemple, si votre tag est `dot.key.test:five` et que votre monitor est groupé par `dot.key.test`, utilisez :

```text
{{[dot.key.test].name}}
```

{{% /tab %}}

{{% tab "Regrouper par facette" %}}

Les log monitors, monitors d'analyse de traces, monitors RUM et monitors d'événement peuvent utiliser des facettes en tant que variables lorsqu'ils sont regroupés par facette. Si un log monitor est regroupé en fonction de `@facet_key`, utilisez la variable suivante :

```text
{{ @facet_key.name }}
```

**Exemple** : pour inclure les informations spécifiques d'un groupe de monitors de logs à alertes multiples, effectuez un regroupement selon `@machine_id` :

```text
Cette alerte a été déclenchée sur {{ @machine_id.name }}
```

Si votre facette comporte des points, placez-la entre crochets. Par exemple :

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### Personnaliser la notification en fonction du groupe

Lorsque votre requête est groupée par certaines dimensions, vous pouvez enrichir les notifications avec les métadonnées dynamiques associées au groupe. Pour voir la liste des variables de tag en fonction de votre sélection, cliquez sur **Use message template variables** (Utiliser des variables de modèle de message) dans la section **Configure notifications & automations** (Configurer les notifications et automatisations). Voici des exemples :

{{% collapse-content title="Requête avec group by host" level="h5" %}}

Si votre monitor déclenche une alerte pour chaque `host`, alors les variables de tag `{{host.name}}` et `{{host.ip}}` sont disponibles, ainsi que tout tag de host disponible sur ce host.

Variables spécifiques aux métadonnées du host :

- Version de l'Agent : `{{host.metadata_agent_version}}`
- Machine : `{{host.metadata_machine}}`
- Plateforme : `{{host.metadata_platform}}`
- Processeur : `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="Requête avec group by kube_namespace et kube_cluster_name" level="h5" %}}
Si votre monitor déclenche une alerte pour chaque `kube_namespace` et `kube_cluster_name`, vous pouvez alors accéder à n'importe quel attribut de l'espace de nommage.

Variables de métadonnées de l'espace de nommage :

- Nom du cluster : `{{kube_namespace.cluster_name}}`
- Nom de l'espace de nommage : `{{kube_namespace.display_name}}`
- Statut de l’espace de nommage : `{{kube_namespace.status}}`
- Étiquettes de l'espace de nommage : `{{kube_namespace.labels}}`

Le tableau suivant contient tous les attributs disponibles :

| Syntaxe de la variable   | Attributs de premier niveau |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `group_size`, `labels`, `name`, `namespace`, `status`, `uid`|
{{% /collapse-content %}}

{{% collapse-content title="Requête avec group by pod_name, kube_namespace et kube_cluster_name" level="h5" %}}
Si votre monitor déclenche une alerte pour chaque `pod_name`, `kube_namespace` et `kube_cluster_name`, vous pouvez alors accéder à n'importe quel attribut du pod.

Variables de métadonnées du pod :
- Nom du cluster : `{{pod_name.cluster_name}}`
- Nom du pod : `{{pod_name.name}}`
- Phase du pod : `{{pod_name.phase}}`

Le tableau suivant contient tous les attributs disponibles :

| Syntaxe de la variable   | Attributs de premier niveau |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `conditions`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `host_id`, `host_key`, `hostname`, `init_container_statuses`, `ip`, `labels`, `name`, `namespace`, `node_name`, `nominated_node_name`, `phase`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="Requête avec group by service" level="h5" %}}

Si votre monitor déclenche une alerte pour chaque `service`, alors vous pouvez accéder à certains attributs du service, tels que définis dans le [Software Catalog][10].

Variables de métadonnées de service :

- Nom du service : `{{service.name}}`
- Nom de l'équipe : `{{service.team}}`
- Docs : `{{service.docs}}`
- Liens : `{{service.links}}`

Pour les documents et liens, vous pouvez également accéder à un élément spécifique avec la syntaxe suivante : `[<name>]`. Par exemple, pour les services qui disposent d'un schéma de définition comme celui défini dans [cet exemple][11], vous pouvez accéder au lien « Runbook » en utilisant la syntaxe suivante :

```texte
{{service.links[Runbook]}}
```
{{% /collapse-content %}}



### Correspondance des variables d'attribut et de tag

<div class="alert alert-info">Disponible pour
  <a href="/monitors/types/log/">les monitors de log </a>,
  <a href="/monitors/types/apm/?tab=analytics">les monitors Trace Analytics (APM)</a>,
  <a href="/monitors/types/error_tracking/"> les monitors Error Tracking </a>,
  <a href="/monitors/types/real_user_monitoring/">les monitors RUM </a>,
  <a href="/monitors/types/ci/">les monitors CI </a>, and
  <a href="/monitors/types/database_monitoring/">les monitors Database Monitoring</a>.
</div>

Pour inclure **n’importe quel** attribut ou tag provenant d'un log, d'un span de trace, d'un événement RUM, d'un pipeline CI ou d'un événement de test CI correspondant à la requête du monitor, utilisez les variables suivantes :

| Type de monitor    | Syntaxe de la variable                                  |
|-----------------|--------------------------------------------------|
| Log             | `{{log.attributes.key}}` ou `{{log.tags.key}}`   |
| Analyse de traces | `{{span.attributes.key}}` ou `{{span.tags.key}}` |
| Error Tracking  | `{{issue.attributes.key}}`                         |
| RUM             | `{{rum.attributes.key}}` ou `{{rum.tags.key}}`   |
| Piste d'audit     | `{{audit.attributes.key}}` ou `{{audit.message}}`    |
| Pipeline CI     | `{{cipipeline.attributes.key}}`                  |
| Test de CI         | `{{citest.attributes.key}}`                      |
| Database Monitoring | `{{databasemonitoring.attributes.key}}`      |

{{% collapse-content title= "Exemple d'utilisation de la syntaxe" level="h4" %}}
- Pour n'importe quelle paire `key:value`, la variable `{{log.tags.key}}` affiche la `value` dans le message d'alerte.
- Le `@` qui précède tous les attributs n'est pas inclus. Par exemple, si un monitor de log est groupé par `@http.status_code`, vous pouvez inclure le message d'erreur ou les tags d'infrastructure dans le message de notification en utilisant les variables suivantes :

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="Syntaxe des variables d'attribut correspondantes"style="width:90%;">}}
- Le message affiche l'attribut `error.message` d'un log correspondant à la requête, **tant que l'attribut existe**.
- Si le tag est présent sur un événement, utilisez la syntaxe suivante :

  ```text
  {{ event.tags.[dot.key.test] }}
  ```


{{% /collapse-content %}}


#### Remarques importantes

- Si l'événement sélectionné n'inclut pas la clé d'attribut ou de tag, la variable apparaîtra vide dans le message de notification. Pour éviter les notifications manquantes, n'utilisez pas ces variables pour router les notifications avec des handles `{{#is_match}}`.
- Pour les monitors qui utilisent des formules et des fonctions dans leurs requêtes, les valeurs sont résolues à partir des événements extraits de la première requête.


#### Attributs réservés

Les événements de logs, de gestion des événements, de spans, de RUM, de Pipeline CI et de tests CI disposent d'attributs réservés génériques, que vous pouvez utiliser dans les variables avec la syntaxe suivante :

| Type de monitor    | Syntaxe de la variable   | Attributs de premier niveau |
|-----------------|-------------------|------------------------|
| Log             | `{{log.key}}`     | `message`, `service`, `status`, `source`, `span_id`, `timestamp`, `trace_id`, `link`, `host` |
| Analyse de traces | `{{span.key}}`    | `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link` |
| RUM             | `{{rum.key}}`     | `service`, `status`, `timestamp`, `link` |
| Événement             | `{{event.key}}`     | `attributes`, `host.name`, `id`, `link`, `title`, `text`, `tags` |
| Pipeline CI             | `{{cipipeline.key}}`     | `service`, `env`, `resource_name`, `ci_level`, `trace_id`, `span_id`, `pipeline_fingerprint`, `operation_name`, `ci_partial_array`, `status`, `timestamp`, `link` |
| Test de CI             | `{{citest.key}}`     | `service`, `env`, `resource_name`, `trace_id`, `span_id`, `operation_name`, `status`, `timestamp`, `link` |

Si l'événement correspondant ne contient pas l'attribut dans sa définition, la variable n'affiche rien.

#### Lien Explorer

Utilisez `{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, et `{{issue.link}}` pour enrichir la notification avec un lien vers le Log Explorer, le Trace Explorer, le RUM Explorer ou Error Tracking, ciblé sur les événements correspondant à la requête.

### Variables des monitors de check

Pour les monitors de check (check custom et check d'intégration), vous pouvez utiliser la variable `{{check_message}}` afin d'afficher le message du check custom ou du check d'intégration.

### Variables des monitors composite

Les monitors composite peuvent accéder à la valeur et à l'état associés aux sous-monitors au moment du déclenchement de l'alarme.

Par exemple, si votre monitor composite possède un sous-monitor `a`, vous pouvez inclure la valeur de `a` avec :

```text
{{ a.value }}
```

Pour récupérer le statut du sous-monitor `a`, utilisez :

```text
{{ a.status }}
```

Les valeurs possibles pour l'état sont : `OK`, `Alert`, `Warn` et `No Data`.

Les monitors composite prennent également en charge les variables de tag, tout comme leurs monitors sous-jacents. Ils reprennent le même format que les autres monitors, tant que les monitors sous-jacents sont regroupés en fonction du même tag ou de la même facette.

Par exemple, supposons que votre monitor composite comporte un sous-monitor `a`, qui est un monitor de logs. Vous pouvez inclure la valeur de n'importe quel tag ou facette de `a` avec :

```text
{{ a.log.message }} ou {{ a.log.my_facet }}
```

### Échappement de caractères

Par défaut, le contenu des variables est échappé par défaut. Pour éviter que du contenu JSON ou du code soit échappé, utilisez trois accolades au lieu de deux. Exemple : `{{{event.text}}}`.

## Template variables

Utilisez des template variables pour personnaliser les notifications de votre monitor. Voici la liste des variables intégrées :

| Variable                             | Rôle                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | La valeur qui a déclenché l'alerte pour les monitors de requête basés sur des métriques.            |
| `{{threshold}}`                      | La valeur du seuil d'alerte défini dans les conditions d'alerte du monitor.       |
| `{{warn_threshold}}`                 | La valeur du seuil d'avertissement défini dans les conditions d'alerte du monitor.     |
| `{{alert_recovery_threshold}}`       | La valeur qui a permis de sortir le monitor de l'état `ALERT`.                  |
| `{{warn_recovery_threshold}}`        | La valeur qui a permis de sortir le monitor de l'état `WARN`.                   |
| `{{ok_threshold}}`                   | La valeur qui a permis de sortir le monitor de check de service.                           |
| `{{comparator}}`                     | La valeur relationnelle définie dans les conditions d'alerte du monitor.                   |
| `{{first_triggered_at}}`<br>*Voir la section ci-dessous*         | La date et l'heure UTC auxquelles le monitor a été déclenché pour la première fois.                       |
| `{{first_triggered_at_epoch}}`<br>*Voir la section ci-dessous*   | La date et l'heure UTC auxquelles le monitor a été déclenché pour la première fois, en millisecondes Unix. |
| `{{last_triggered_at}}`<br>*Voir la section ci-dessous*          | La date et l'heure UTC du dernier déclenchement du monitor.                        |
| `{{last_triggered_at_epoch}}`<br>*Voir la section ci-dessous*    | La date et l'heure UTC du dernier déclenchement du monitor, au format EPOCH en millisecondes.  |
| `{{triggered_duration_sec}}`         | Le nombre de secondes pendant lesquelles le monitor est resté dans un état déclenché.              |

### Variables déclenchées

 Les variables de modèle `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}` et `{{last_triggered_at_epoch}}` reflètent les valeurs au moment d'un changement d'état du monitor, et **NON** à chaque nouvel événement du monitor. Les événements de renotification affichent la même variable si l'état du monitor n'a pas changé. Utilisez `{{triggered_duration_sec}}` pour afficher la durée au moment de l'événement.

 `{{first_triggered_at}}` est défini lorsque le groupe de monitor passe de `OK` à un état différent de `OK`, ou lorsqu'un nouveau groupe apparaît dans un état non `OK`. `{{last_triggered_at}}` est défini quand le groupe de monitor passe à un état non `OK`, quel que soit l'état précédent (y compris `WARN` → `ALERT`, `ALERT` → `WARN`). `{{last_triggered_at}}` est également défini lorsqu'un nouveau groupe apparaît dans un état non `OK`. La différence est que `{{last_triggered_at}}` est indépendant de l'état précédent.

 {{< img src="monitors/notifications/triggered_variables.png" alt="Transitions montrant quatre horodatages A : 1419 OK vers WARN, B : 1427 WARN vers ALERT, C : 1445 ALERT vers NO DATA, D : 1449 NO DATA vers OK" style="width:90%;">}}

**Exemple** : lorsque le monitor passe de `OK` à `WARN`, les variables `{{first_triggered_at}}` et `{{last_triggered_at}}` auront toutes deux la valeur de l'horodatage A. Le tableau ci-dessous affiche les valeurs jusqu'à la récupération du monitor.

| Transition         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### Évaluation

Les template variables qui renvoient des valeurs numériques prennent en charge les opérations et les fonctions. Vous pouvez ainsi effectuer des opérations mathématiques ou mettre en forme les valeurs. Pour en savoir plus, consultez la rubrique [Évaluer des template variables][7].

### Heure locale

La fonction `local_time` vous permet d'ajouter une autre date dans votre notification, avec le fuseau horaire de votre choix. Cette fonction transforme une date en une heure locale : `{{local_time 'time_variable' 'timezone'}}`. Par exemple, pour afficher l'heure du dernier déclenchement du monitor dans votre notification en fonction du fuseau horaire de Tokyo, ajoutez ce qui suit au message de notification :

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

Le résultat s'affiche au format ISO 8601 : `yyyy-MM-dd HH:mm:ss±HH:mm`, par exemple `2021-05-31 23:43:27+09:00`. Consultez la [liste des fuseaux horaires de la base de données TZ][8], notamment la colonne de nom, pour obtenir la liste des valeurs de fuseau horaire disponibles.

## Réglages avancés

### Handles dynamiques

Utilisez des [variables de tag](#variables-d-attribut-et-de-tag) pour générer de façon dynamiques les handles des notifications et transmettre ces dernières à la bonne équipe ou au bon service, en fonction du type de problème détecté par le monitor.

**Exemple** : si votre monitor interroge une métrique et la regroupe en fonction d'un tag `service`, vous pouvez transmettre vos notifications à différents canaux Slack, en fonction du service défaillant :

```text
@slack-{{service.name}} Un problème est en cours pour le service {{service.name}}.
```

Si votre monitor commence à détecter des échecs pour le groupe `service:ad-server`, la notification est envoyée au canal Slack `#ad-server`, avec le contexte suivant :

```text
@slack-ad-server Un problème est en cours pour le service ad-server.
```

Lorsque vous créez des handles dynamiques avec des attributs qui peuvent être absents, cela peut poser des problèmes de livraison des notifications. Si un attribut est manquant, la variable sera vide dans le message de notification, ce qui rend le handle invalide.

Pour éviter les notifications manquées avec ces variables, pensez à ajouter un handle de secours :

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // Cela enverra une notification à @slack-example si la variable kube_namespace.owner est vide ou inexistante.
{{/is_match}}
```


### Liens dynamiques

Utilisez des [variables de tag](#variables-d-attribut-et-de-tag) pour activer la création d'URL dynamiques. Celles-ci vous permettent de rediriger votre équipe vers la ressource adéquate. Par exemple, vous pouvez fournir des liens vers des pages de Datadog : dashboards, hostmap, monitors, etc.

{{< tabs >}}
{{% tab "Dashboards" %}}

Utilisez la [variable de tag](#variables-d-attribut-et-de-tag) `{{host.name}}` pour fournir un lien vers un dashboard système :

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Utilisez la [variable de tag](#variables-d-attribut-et-de-tag) `{{host.name}}`, en prenant soin de remplacer `<NOM_INTÉGRATION>` par le nom d'une intégration, pour fournir un lien vers le dashboard de cette intégration :

```text
https://app.datadoghq.com/dash/integration/<NOM_INTÉGRATION>?tpl_var_scope=host:{{host.name}}
```

Utilisez la [template variable](#template-variable) `{{last_triggered_at_epoch}}` ainsi qu’un `<DASHBOARD_ID>` et un `<DASHBOARD_NAME>` pour créer un lien vers des dashboards avec une plage temporelle relative à l’alerte :

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "Hostmap" %}}

Utilisez une [variable de tag](#variables-d-attribut-et-de-tag) comme `{{service.name}}` pour fournir un lien vers la hostmap :

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

Vous pouvez personnaliser le lien vers la hostmap en définissant des paramètres supplémentaires. Voici les paramètres les plus utilisés :

| Paramètre | Défini par               | Fonction                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<NOM_MÉTRIQUE>` | Détermine la couleur de remplissage des hexagones des hosts. |
| `groupby` | `groupby=<CLÉ_TAG>`        | Détermine les groupes d'hexagones des hosts.        |
| `sizeby`  | `sizeby=avg:<NOM_MÉTRIQUE>` | Détermine la taille des hexagones des hosts.       |

{{% /tab %}}
{{% tab "Monitors" %}}

Utilisez la [variable de tag](#variables-d-attribut-et-de-tag) `{{host.name}}` pour fournir un lien vers tous les monitors associés à un certain host :

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

Vous pouvez personnaliser le lien vers les monitors en définissant des paramètres supplémentaires. Voici les paramètres les plus utilisés :

| Paramètre | Exemple        | Contenu affiché                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Les monitors avec un état d'alerte (statuts supplémentaires : `WARN`, `NO DATA` et `OK`)   |
| `muted`   | `muted: true`  | Les monitors désactivés (indiquez `false` pour afficher les monitors qui ne sont pas désactivés)                             |
| `type`    | `type:log`     | Les log monitors (découvrez les autres [types de monitors][1])                                     |



[1]: /fr/monitors/types
{{% /tab %}}
{{% tab "Logs" %}}

Utilisez la [template variable](#template-variable) `{{last_triggered_at_epoch}}` pour fournir un lien vers tous les logs en cours au moment de l'alerte.

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

Le lien vers les logs est personnalisable avec des paramètres supplémentaires. Les plus courants sont :

| Paramètre | Défini par               | Fonction                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | Filtre sur les logs d'un service spécifique.  |
| `host`    | `host=<HOST_NAME>`         | Filtre sur les logs d'un host spécifique.      |
| `status`  | `status=<STATUS>`          | Statut des logs : Error, Warn, Info, etc. |


{{% /tab %}}
{{< /tabs >}}

### Commentaires

Pour ajouter un commentaire dans le message du monitor, utilisez la syntaxe suivante :

```text
{{!-- ceci est un commentaire --}}
{{!-- ceci est un commentaire }}
```

### Format brut

Si votre message d'alerte doit envoyer deux accolades, par exemple `{{ <TEXTE> }}`, utilisez le format `{{{{raw}}}}`. Exemple :

```text
{{{{raw}}}}
{{ <TEXTE_1> }} {{ <TEXTE_2> }}
{{{{/raw}}}}
```

Résultat :

```text
{{ <TEXTE_1> }} {{ <TEXTE_2> }}
```

Les auxiliaires `^|#` utilisés dans les [variables conditionnelles](#variables-conditionnelles) ne peuvent pas être utilisés avec le format `{{{{raw}}}}` et doivent être supprimés. Par exemple, pour générer un texte brut de sortie avec la variable conditionnelle `{{is_match}}`, utilisez le modèle suivant :

```text
{{{{is_match "host.name" "<HOSTNAME>"}}}}
{{ .matched }} le hostname
{{{{/is_match}}}}
```

Si `host.name` correspond à `<HOSTNAME>`, le modèle affiche :

```text
{{ .matched }} le hostname
```

### Encodage URL

Si votre message d'alerte contient des données à inclure dans une URL (par exemple pour une redirection), utilisez la syntaxe `{{ urlencode "<variable>"}}`.

**Exemple** : si votre message de monitor inclut une URL vers le Software Catalog filtrée par service, utilisez la [variable de tag](#variables-d-attributs-et-de-tags) `service` et appliquez `{{ urlencode "<variable>"}}` dans l'URL.

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Pour aller plus loin

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