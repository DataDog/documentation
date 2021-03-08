---
title: Notifications
kind: documentation
description: Configurer les notifications des monitors
aliases:
  - /fr/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /fr/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /fr/developers/faq/what-do-notifications-do-in-datadog
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: Gérer vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour votre monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les notifications constituent un outil clé des monitors. Elles vous permettent de tenir votre équipe informée des problèmes et de faciliter leur résolution. Lorsque vous [créez un monitor][1], prenez le temps de remplir les sections **Say what's happening** et **Notify your team**.

## Say what's happening

Cette section vous permet de configurer les notifications envoyées à votre équipe.

### Titre

Vous devez ajouter un titre unique à votre monitor. Pour les monitors à alertes multiples, certains tags permettant d'identifier votre contexte de déclenchement sont automatiquement ajoutés. Vous pouvez également utiliser des [variables de tags](#variables-de-tags). 

### Message

Le champ de message accepte l'utilisation du [format de mise en forme Markdown][2] standard ainsi que des [variables](#variables). Utilisez des [variables conditionnelles](#variables-conditionnelles) pour ajuster le texte de la notification envoyé aux différents contacts avec la [syntaxe @notifications](#notification).

Le message du monitor inclut généralement des étapes détaillées permettant de résoudre le problème. Exemple :

```text
Étapes à suivre pour libérer de l'espace disque :
1. Supprimer les paquets non utilisés
2. Vider le cache APT
3. Désinstaller les applications superflues
4. Supprimer les fichiers en double
```

### Tags

Vous pouvez choisir d'ajouter des tags à votre monitor. Les tags de monitors ne fonctionnent pas de la même manière que les tags de métriques. Ils servent à regrouper les monitors et à y effectuer des recherches depuis l'interface.

### Renvoi de notifications

Vous pouvez configurer le renvoi des notifications du monitor. Cette option vous permet de rappeler à votre équipe qu'un problème n'est pas résolu. Si vous activez cette fonction, vous pouvez choisir d'inclure un message de réaffectation à envoyer lorsque le monitor renvoie une notification. Le message d'origine est également inclus.

### Priorité

Ajoutez une priorité (facultative) à vos monitors. Pour ce faire, choisissez une valeur entre P1 et P5. P1 correspond à la priorité la plus élevée, tandis que P5 correspond à la priorité la plus faible.

## Informer votre équipe

Utilisez cette section pour envoyer des notifications à votre équipe par e-mail, Slack, PagerDuty, etc. La liste déroulante vous permet de rechercher des membres d'équipe et des intégrations connectées. Lorsqu'une `@notification` est ajoutée à cette section, celle-ci est automatiquement ajoutée au champ de [message](#message) :

**Remarque** : vous devez inclure une espace entre le dernier caractère de la ligne et la `@notification`. Exemple :

```text
Espace disque faible @ops-team@company.com
```

### @notification

Vous pouvez envoyer des `@notifications` de différentes façons :

#### E-mail

* Informez un utilisateur Datadog par e-mail en ajoutant `@<ADRESSE_EMAIL_UTILISATEUR_DD>`. **Remarque** : une adresse e-mail associée à une invitation utilisateur Datadog en attente est considérée comme inactive et ne reçoit aucune notification.
* Pour informer par e-mail un utilisateur en dehors de Datadog, ajoutez `@<EMAIL>`.

#### Intégrations

Informez votre équipe par l'intermédiaire des intégrations connectées en utilisant la syntaxe `@<NOM_INTÉGRATION>-<VALEURS>`. Vous trouverez ci-dessous la liste des préfixes ainsi que des exemples de liens :

| Intégration    | Préfixe       | Exemples       |
|----------------|--------------|----------------|
| [Jira][3]      | `@jira`      | [Exemples][4]  |
| [PagerDuty][5] | `@pagerduty` | [Exemples][6]  |
| [Slack][7]     | `@slack`     | [Exemples][8]  |
| [Webhooks][9]  | `@webhook`   | [Exemples][10] |

Consultez la [liste des intégrations][11] pouvant envoyer des notifications à votre équipe.

**Remarque** : les handles comprenant des parenthèses (`(`, `)`) ne sont pas pris en charge. Lorsqu'un handle comprenant des parenthèses est utilisé, il n'est pas analysé et aucune alerte n'est créée.

### Via des modifications

Chaque fois qu'un monitor est créé, modifié, désactivé ou supprimé, un [événement][12] est généré. Définissez l'option `Notify` pour envoyer des notifications aux membres de vos équipes ainsi qu'aux services de discussion à propos de ces événements.

### Modifier des restrictions

Si les modifications sont restreintes, seuls le créateur du monitor ou un administrateur peuvent le modifier. Sont considérées comme des modifications les mises à jour de la définition du monitor ainsi que toute désactivation du monitor, peu importe sa durée.

**Remarque** : les limites s'appliquent à la fois à l'IU et à l'API.

## Variables

### Template variables

Utilisez des template variables pour personnaliser les notifications de votre monitor. Voici la liste des variables intégrées :

| Variable                      | Description                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{value}}`                   | La valeur qui a déclenché l'alerte pour les monitors de requête basés sur des métriques.           |
| `{{threshold}}`               | La valeur du seuil d'alerte défini dans les conditions d'alerte du monitor.      |
| `{{warn_threshold}}`          | La valeur du seuil d'avertissement défini dans les conditions d'alerte du monitor.    |
| `{{ok_threshold}}`            | La valeur qui a rétabli l'état du monitor.                                        |
| `{{comparator}}`              | La valeur relationnelle définie dans les conditions d'alerte du monitor.                  |
| `{{last_triggered_at}}`       | La date et l'heure UTC du dernier déclenchement du monitor.                       |
| `{{last_triggered_at_epoch}}` | La date et l'heure UTC du dernier déclenchement du monitor, au format EPOCH en millisecondes. |

#### Évaluation

Les template variables qui renvoient des valeurs numériques prennent en charge les opérations et les fonctions. Vous pouvez ainsi effectuer des opérations mathématiques ou mettre en forme les valeurs. Pour en savoir plus, consultez la rubrique [Évaluation des template variables][13].

### Variables de tags

Vous pouvez utiliser des variables de tags dans des monitors à alertes multiples reposant sur les tags sélectionnés dans la section de regroupement de plusieurs alertes. Cette méthode fonctionne pour tous les tags, tant que vous suivez la syntaxe `key:value`.

Par exemple, si votre monitor déclenche une alerte pour chaque `host`, vous pouvez utiliser les variables de tags `{{host.name}}` et `{{host.ip}}`. Pour consulter la liste des variables de tags disponibles en fonction des tags sélectionnés, cliquez sur **Use message template variables** dans la section **Say what's happening**.

**Remarques** :

* Par défaut, le contenu des variables est échappé par défaut. Pour éviter que du contenu JSON ou du code soit échappé, utilisez trois accolades au lieu de deux. Exemple : `{{{event.text}}}`.
* Les variables de tags sont uniquement insérées dans le texte des événements enfants de Datadog. L'événement parent affiche seulement un résumé des agrégations.

#### Clé de tag avec un point

Si la clé de votre tag contient un point, ajoutez des accolades autour de la clé complète pour utiliser une variable de tag.
Par exemple, pour un tag `dot.key.test:five` et un monitor regroupé selon `dot.key.test`, utilisez :

```text
{{[dot.key.test].name}}
```

#### Variables des facettes de log

Les log monitors peuvent utiliser des facettes en tant que variables lorsqu'ils sont regroupés en fonction de facettes.
Par exemple, si votre log monitor est regroupé en fonction de la facette `facet`, la variable est :

```text
{{ facet.name }}
```
**Exemple** : pour inclure les informations dans un groupe de log monitors à alertes multiples, effectuez un regroupement selon `@machine_id` :

```text
Cette alerte a été déclenchée sur {{ @machine_id.name }}
```
Si votre facette comporte des points, placez-la entre crochets. Par exemple :

```text
{{ [@network.client.ip].name }}
```

#### Variables des monitors composite

Les monitors composite peuvent accéder à la valeur associée aux sous-monitors au moment du déclenchement de l'alarme.

Par exemple, si votre monitor composite possède un sous-monitor `a`, vous pouvez inclure la valeur de `a` avec :

```text
{{ a.value }}
```

### Variables conditionnelles

Les variables conditionnelles reposent sur une logique `if-else` pour afficher un message personnalisé en fonction de l'état du monitor et des détails de son déclenchement. Ces variables peuvent être utilisées dans le sujet ou le corps du message de la notification.

Voici la liste des variables conditionnelles disponibles :

| Variable conditionnelle       | Condition d'affichage du texte                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | Le monitor génère une alerte.                                                 |
| `{{^is_alert}}`            | Le monitor ne génère pas d'alerte.                                         |
| `{{#is_match}}`            | Le contexte correspond à la sous-chaîne indiquée.                         |
| `{{^is_match}}`            | Le contexte ne correspond pas à la sous-chaîne indiquée.                  |
| `{{#is_exact_match}}`      | Le contexte correspond exactement à la chaîne indiquée.                    |
| `{{^is_exact_match}}`      | Le contexte ne correspond pas exactement à la chaîne indiquée.             |
| `{{#is_no_data}}`          | Le monitor s'est déclenché en raison de données manquantes.                          |
| `{{^is_no_data}}`          | Le monitor ne s'est pas déclenché en raison de données manquantes.                      |
| `{{#is_warning}}`          | Le monitor génère un avertissement.                                                  |
| `{{^is_warning}}`          | Le monitor ne génère pas d'avertissement.                                          |
| `{{#is_recovery}}`         | Le monitor est rétabli depuis un état `ALERT`, `WARNING` ou `NO DATA`.         |
| `{{^is_recovery}}`         | Le monitor n'est pas rétabli depuis un état `ALERT`, `WARNING` ou `NO DATA`. |
| `{{#is_warning_recovery}}` | Le monitor passe d'un état `WARNING` à un état `OK`.                        |
| `{{^is_warning_recovery}}` | Le monitor ne passe pas d'un état `WARNING` à un état `OK`.                |
| `{{#is_alert_recovery}}`   | Le monitor passe d'un état `ALERT` à un état `OK`.                          |
| `{{^is_alert_recovery}}`   | Le monitor ne passe pas d'un état ALERT à un état OK.                   |
| `{{#is_alert_to_warning}}` | Le monitor passe d'un état `ALERT` à un état `WARNING`.                  |
| `{{^is_alert_to_warning}}` | Le monitor ne passe pas d'un état `ALERT` à un état `WARNING`.          |
| `{{#is_no_data_recovery}}` | Le monitor est rétabli depuis un état `NO DATA`.                                |
| `{{^is_no_data_recovery}}` | Le monitor n'est pas rétabli depuis un état `NO DATA`.                        |
| `{{#is_priority 'valeur'}}`  | Le monitor possède la priorité `valeur`, qui va de `P1` à `P5`.   |

#### Exemples

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

Pour rechercher une sous-chaîne dans une variable de tag, utilisez le format suivant :

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
{{^#is_match "role.name" "db"}}
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

**Remarque** : pour vérifier qu'une `<VARIABLE_TAG>` n'est **PAS** utilisez, indiquez une `<CHAÎNE_COMPARAISON>` vide.

{{% /tab %}}
{{% tab "is_exact_match" %}}

Pour rechercher une chaîne exacte dans une variable de tag, utilisez le format suivant :

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

{{% /tab %}}
{{< /tabs >}}

## Notifications de test

Les notifications de test sont prises en charge pour les [types de monitors][1] suivants : host, metric, anomaly, outlier, forecast, integration (check uniquement), process (check uniquement), network (check uniquement), custom check, event et composite.

### Effectuer le test

1. Après avoir défini votre monitor, testez les notifications à l'aide du bouton **Test Notifications** situé en bas de la page du monitor.

2. Dans la fenêtre contextuelle des notifications de test, choisissez le scénario de monitor à tester. Vous pouvez uniquement tester les états disponibles dans la configuration du monitor, pour les seuils indiqués dans les conditions d'alerte. Les [seuils de rétablissement][14] sont la seule exception. En effet, Datadog envoie une notification de rétablissement lorsque le monitor n'est plus en alerte ou lorsqu'il ne possède aucune condition d'avertissement.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Tester les notifications pour ce monitor"  style="width:70%;" >}}

3. Cliquez sur **Run Test** pour envoyer des notifications aux personnes et services répertoriés dans le monitor.

### Événements

Les notifications de test créent des événements qui peuvent faire l'objet de recherches dans le flux d'événements. Ces notifications indiquent la personne à l'origine du test dans le corps du message. La mention `[TEST]` est ajoutée au titre de la notification.

### Variables {#notification-test-variables}

Les variables de message se remplissent automatiquement à partir d'un groupe disponible, sélectionné au hasard, en fonction du contexte de la définition de votre monitor. Exemple :

```text
{{#is_alert}}
{{host.name}} <-- est fourni automatiquement
{{/is_alert}}
```

## Réglages avancés

### Liens dynamiques

Utilisez des [variables de tags](#variables-de-tags) pour activer la création d'URL dynamiques. Celles-ci vous permettent de rediriger votre équipe vers la ressource adéquate. Par exemple, vous pouvez fournir des liens vers des pages de Datadog : dashboards, hostmap, monitors, etc.

{{< tabs >}}
{{% tab "Dashboards" %}}

Utilisez la [variable de tag](#variables-de-tags) `{{host.name}}` pour fournir un lien vers un dashboard système :

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Utilisez la [variable de tag](#variables-de-tags) `{{host.name}}` et la variable `<NOM_INTÉGRATION>` pour fournir un lien vers le dashboard d'une intégration :

```text
https://app.datadoghq.com/dash/integration/<NOM_INTÉGRATION>?tpl_var_scope=host:{{host.name}}
```

{{% /tab %}}
{{% tab "Hostmap" %}}

Utilisez une [variable de tag](#variables-de-tag) comme `{{service.name}}` pour fournir un lien vers la hostmap :

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

Utilisez la [variable de tag](#variables-de-tags) `{{host.name}}` pour fournir un lien vers tous les monitors associés à un certain host :

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

Vous pouvez personnaliser le lien vers les monitors en définissant des paramètres supplémentaires. Voici les paramètres les plus utilisés :

| Paramètre | Exemple        | Contenu affiché                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Les monitors avec un état d'alerte (statuts supplémentaires : `WARN`, `NO DATA` et `OK`)   |
| `muted`   | `muted: true`  | Les monitors désactivés (indiquez `false` pour afficher les monitors qui ne sont pas désactivés)                             |
| `type`    | `type:log`     | Les log monitors (découvrez les autres [types de monitors][1])                                     |

[1]: /fr/monitors/monitor_types/
{{% /tab %}}
{{< /tabs >}}

### Commentaires

Pour ajouter un commentaire dans le message qui s'affiche uniquement sur l'écran de modification du monitor, utilisez la syntaxe suivante :

```text
{{!-- ceci est un commentaire --}}
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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /fr/integrations/jira/
[4]: /fr/integrations/jira/#use-cases
[5]: /fr/integrations/pagerduty/
[6]: /fr/integrations/pagerduty/#troubleshooting
[7]: /fr/integrations/slack/
[8]: /fr/integrations/slack/#mentions-in-slack-from-monitor-alert
[9]: /fr/integrations/webhooks/
[10]: /fr/integrations/webhooks/#usage
[11]: https://docs.datadoghq.com/fr/integrations/#cat-collaboration
[12]: /fr/events/
[13]: /fr/monitors/guide/template-variable-evaluation/
[14]: /fr/monitors/faq/what-are-recovery-thresholds/