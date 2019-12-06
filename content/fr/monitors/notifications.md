---
title: Notifications
kind: documentation
description: Configurer les notifications des monitors
aliases:
  - /fr/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /fr/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /fr/developers/faq/what-do-notifications-do-in-datadog
further_reading:
  - link: monitors/monitor_types
    tag: Documentation
    text: Apprendre à créer un monitor
  - link: monitors/manage_monitor
    tag: Documentation
    text: Gérer vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les notifications sont un composant clé de n'importe quel [monitor][1]. En cas de problème, il est essentiel de prévenir les bonnes personnes afin d'accélérer le processus de résolution.

{{< img src="monitors/notifications/notification.png" alt="notification" responsive="true" >}}

1. Donnez un **titre** à votre monitor. Il est souvent utile d'indiquer une courte
   explication du monitor afin que les membres d'équipe qui reçoivent la notification comprennent rapidement
   ce qu'il se passe.

2. Saisissez un **message** pour le monitor. Ce champ accepte l'utilisation du [format de mise en forme Markdown][2] standard ainsi que des [variables](#variables) inline et des variables de tags.
  Utilisez des [variables conditionnelles](#variables-conditionnelles) pour ajuster le texte des notifications et les envoyer à différents contacts avec la [syntaxe **@-notification** de Datadog](#notification).
  Le message du monitor inclut généralement des étapes détaillées permettant de résoudre le problème.

3. Vous pouvez activer la fonction **monitor renotification**. Cette option vous permet de rappeler à votre équipe qu'un problème n'est pas résolu tant que le monitor n'est pas [résolu][3]. Si vous l'activez, un message de réaffectation peut être configuré et envoyé lorsque le monitor renvoie une notification. Le message d'origine est également inclus.

## Variables

Utilisez les variables pour personnaliser vos notifications de monitor. Voici les variables disponibles :

| Variable                | Description                                                                                    |
|-------------------------|------------------------------------------------------------------------------------------------|
| `{{value}}`             | Affiche la valeur qui a déclenché l'alerte pour les monitors de requête basés sur des métriques.                                      |
| `{{threshold}}`         | Affiche le seuil d'alerte sélectionné dans la section *Set alert conditions* du monitor.          |
| `{{warn_threshold}}`    | Affiche le seuil d'avertissement sélectionné dans la section *Set alert conditions* du monitor, le cas échéant. |
| `{{ok_threshold}}`      | Affiche la valeur qui a rétabli l'état du monitor.                                                  |
| `{{comparator}}`        | Affiche la valeur relationnelle sélectionnée dans la section *Set alert conditions* du monitor.         |
| `{{last_triggered_at}}` | Affiche la date et l'heure au format UTC du dernier déclenchement du monitor.                                     |

**Remarque** : lorsque vous saisissez des valeurs décimales pour des seuils, si votre valeur est `<1`, ajoutez un `0` au début du nombre. Par exemple, utilisez `0.5` et non `,5`.

### Variables de tags

Pour les monitors à alertes multiples, ajoutez des variables de tags pour inclure des données dans votre message d'alerte spécifiques au contexte du tag qui a déclenché l'alerte. Ces données dépendent des tags que vous avez utilisés dans le champ *trigger a separate alert for each* de la section 1 de votre monitor.

Par exemple, si vous déclenchez une alerte pour chaque tag **host**, alors un certain nombre de variables de tags associées à **host** sont disponibles dans la section 3 **Say what's happening**, comme `{{host.name}}`, `{{host.ip}}`, etc.

Cette fonctionnalité fonctionne également pour les tags personnalisés. Si vous ajoutez un tag personnalisé avec la syntaxe `key:value`, vous pouvez alors regrouper les données en fonction des clés de tag. Cela permet de créer des alertes multiples (avec déclenchement distinct) pour chaque **value**. De plus, la variable `.name` du tag peut être utilisée dans votre message de monitor.

Remarques :

* Le contenu des template variables est échappé par défaut. Si votre variable comporte du JSON ou du code que vous ne souhaitez PAS échapper, utilisez trois accolades plutôt que deux (par exemple, `{{{event.text}}}`).

* Pour consulter la liste complète des template variables contextuelles disponibles pour votre monitor, cliquez sur le lien **Use message template variables** ou sur la liste de suggestions qui apparaît lorsque vous saisissez `{{` pour commencer le nom d'une template variable. Les variables disponibles varient en fonction de la combinaison de métriques, de tags et d'autres fonctionnalités du monitor sur lequel vous travaillez.

* Les template variables de tags peuvent également être utilisées dans les titres de monitor (noms). Cependant, les variables sont uniquement insérées dans le texte des événements enfants de Datadog (et non pas dans le texte de l'événement parent, qui affiche un résumé des agrégations).


* Certains tags qui identifient votre contexte de déclenchement sont automatiquement insérés dans le titre de vos alertes multiples.

#### Exemples

Dans cet exemple, un utilisateur a tagué un certain nombre de hosts avec différentes valeurs de `creator:` : par exemple, `creator:wes_anderson` et `creator:saint_exupéry`.

L'utilisateur a pu configurer un monitor à alertes multiples afin de déclencher une alerte différente pour chaque tag `creator:`. Il a donc pu inclure le `{{creator.name}}` dans son message de monitor. Lorsque ce monitor se déclenche, le destinataire de la notification d'alerte voit si le monitor a été déclenché par **wes_anderson**, **saint_exupéry** ou une autre valeur de `creator:`.

{{< img src="monitors/faq/multi_alert_templating_notification.png" alt="modèle_notification_alertes_multiples" responsive="true" style="width:80%;">}}

Voici un exemple d'utilisation des template variables pour un monitor à alertes multiples :

{{< img src="monitors/notifications/templatevareditor.png" alt="éditeur de template variable" responsive="true" style="width:80%;">}}

Et la notification d'événement correspondante :

{{< img src="monitors/notifications/templatevar.png" alt="template var" responsive="true" style="width:80%;">}}

#### Clé de tag avec un point

Si la clé de votre groupe de tags contient un point, vous devez compléter vos template variables afin d'inclure des accolades autour de la clé complète.
Par exemple, si vous envoyez une métrique avec le tag `dot.key.test:five` et que vous configurez ensuite un monitor à alertes multiples avec le tag de groupe `dot.ket.test`, vous devez appliquer la syntaxe suivante afin d'utiliser la variable de tag `dot.key.test.name` :

{{< img src="monitors/faq/template_with_dot.png" alt="template_avec_point" responsive="true" style="width:80%;">}}

## Variables conditionnelles

Les variables conditionnelles permettent l'[envoi de différents textes à différents contacts](#notifications) en fonction de l'état du monitor et des détails de son déclenchement. Ces variables conditionnelles peuvent être utilisées dans le sujet ou dans le corps de la notification défini dans la section 3 du monitor.

N'oubliez pas que lorsque vous utilisez des tags conditionnels, vous devez inclure une paire d'ouverture (par exemple : `{{#is_alert}}`) et de fermeture (par exemple : `{{/is_alert}}`) avec le texte souhaité et la **mention « @ ** entre les deux paires.

Voici la liste des variables conditionnelles disponibles :

| Variable conditionnelle       | Description                                                         |
|----------------------------|---------------------------------------------------------------------|
| `{{#is_alert}}`            | S'affiche en cas d'alerte du monitor.                                            |
| `{{^is_alert}}`            | S'affiche sauf en cas d'alerte du monitor.                                          |
| `{{#is_match}}`            | S'affiche lorsque le contexte correspond à une chaîne.                              |
| `{{^is_match}}`            | S'affiche sauf si le contexte correspond à une chaîne.                            |
| `{{#is_exact_match}}`      | S'affiche lorsque le contexte correspond précisément à une chaîne.                      |
| `{{^is_exact_match}}`      | S'affiche sauf si le contexte correspond précisément à une chaîne.                    |
| `{{#is_no_data}}`          | S'affiche lorsque le monitor indique que des données sont manquantes.                          |
| `{{^is_no_data}}`          | S'affiche sauf si le monitor indique que des données sont manquantes.                        |
| `{{#is_warning}}`          | S'affiche en cas d'avertissement du monitor.                                             |
| `{{^is_warning}}`          | S'affiche sauf en cas d'avertissement du monitor.                                           |
| `{{#is_recovery}}`         | S'affiche lorsque le monitor est rétabli depuis un état WARNING, ALERT ou NO DATA.   |
| `{{^is_recovery}}`         | S'affiche sauf si le monitor est rétabli depuis un état WARNING, ALERT ou NO DATA. |
| `{{#is_warning_recovery}}` | S'affiche lorsque le monitor passe d'un état WARNING à OK.                     |
| `{{^is_warning_recovery}}` | S'affiche sauf si le monitor passe d'un état WARNING à OK.                   |
| `{{#is_alert_recovery}}`   | S'affiche lorsque le monitor passe d'un état ALERT à OK.                      |
| `{{^is_alert_recovery}}`   | S'affiche sauf si le monitor passe d'un état ALERT à OK.                    |
| `{{#is_alert_to_warning}}` | S'affiche lorsque le monitor passe d'un état ALERT à un état WARNING.                 |
| `{{^is_alert_to_warning}}` | S'affiche sauf si le monitor passe d'un état ALERT à un état WARNING.               |
| `{{#is_no_data_recovery}}` | S'affiche lorsque le monitor est rétabli depuis un état NO DATA.                             |
| `{{^is_no_data_recovery}}` | S'affiche sauf si le monitor est rétabli depuis un état NO DATA.                           |

Ces template variables apparaissent égalent dans la zone d'aide « Use message template variables »,
à l'étape 3 de l'éditeur de monitors.

Voici quelques exemples illustrant différentes utilisations possibles :

{{< tabs >}}
{{% tab "is_alert / is_warning" %}}

Ces variables utilisent la logique simple `if/else` pour afficher un message qui varie en fonction du type d'événement (*warning*, *recovery*, *no data*, etc.).

{{< img src="monitors/notifications/conditionalvars.png" alt="variables conditionnelles" responsive="true" style="width:80%;">}}

Voici un exemple dans l'éditeur :

{{< img src="monitors/notifications/templateconditionaleditor.png" alt="éditeur template variable conditionnelle" responsive="true" style="width:80%;">}}

Voici à quoi ressemble la notification d'événement déclenchée correspondante :

{{< img src="monitors/notifications/templateconditionaltrigger.png" alt=" déclenchement template variable conditionnelle" responsive="true" style="width:80%;">}}

Et la notification de rétablissement :

{{< img src="monitors/notifications/templateconditionalrecover.png" alt="rétablissement template variable conditionnelle" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "is_recovery / is_alert_recovery " %}}

* `{{#is_recovery}}` se déclenche lorsqu'un monitor se rétablit depuis un état **WARNING** ou **ALERT**.
* `{{#is_alert_recovery}}` se déclenche lorsqu'un monitor se rétablit et passe d'un état **ALERT** et à un état **OK**.
* `{{#is_warning_recovery}}` se déclenche lorsqu'un monitor se rétablit et passe d'un état **WARNING** à un état **OK**

Cela signifie que, si le monitor passe d'un état **ALERT** à un état **WARNING**, puis à un état **OK** :

* `{{#is_recovery}}` est déclenché
* `{{#is_alert_recovery}}` n'est pas déclenché
* `{{#is_warning_recovery}}` est déclenché

{{% /tab %}}
{{% tab "is_match / is_exact_match" %}}

La variable conditionnelle `{{is_match}}` vous permet d'associer le contexte déclencheur à toute chaîne donnée afin d'afficher un message unique dans vos notifications.
Utilisez l'une des variables de tags disponibles dans votre déclaration conditionnelle. **Il y a correspondance si la chaîne de comparaison fait partie de la variable résolue**.

Les variables de tags utilisent le format suivant :

```
{{#is_match "<VARIABLE_TAG>.name" "<CHAÎNE_COMPARAISON>"}}
  S'affiche si <CHAÎNE_COMPARAISON> est inclus dans <VARIABLE_TAG>.
{{/is_match}}
```

Par exemple, si vous souhaitez informer votre équipe DB qu'un host déclencheur dispose du tag `role:db_cassandra` ou `role:db_postgres`, utilisez le code suivant :

```
{{#is_match "role.name" "db"}}
  S'affiche uniquement si le host qui a déclenché l'alerte dispose d'une variable de tag `role` comprenant `db`.
  L'alerte se déclenche donc pour role:db_cassandra et role:db_postgres.
{{/is_match}}
```

**Remarque** : pour vérifier que `<VARIABLE_TAG>` n'est **PAS** vide, utilisez la variable conditionnelle `{{is_match}}` avec une chaîne vide.

```
{{#is_match "<VARIABLE_TAG>.name" ""}}
  S'affiche si <VARIABLE_TAG> n'est pas vide.
{{/is_match}}
```

##### {{is_exact_match}}

La variable conditionnelle `{{is_exact_match}}` recherche exactement la même chaîne dans la variable de tag, plutôt que de rechercher dans les sous-chaînes. La variable utilise le format suivant :

```
{{#is_exact_match "<VARIABLE_TAG>.name" "<CHAINE_COMPARAISON>"}}
  S'affiche si <CHAINE_COMPARAISON> correspond exactement à <VARIABLE_TAG>.
{{/is_exact_match}}
```

Par exemple, si une alerte peut être déclenchée par deux hosts dotés des tags `role:production` et `role:production-1` :

  ```
  {{#is_match "role.name" "production"}}
    S'affiche uniquement si le host à l'origine du déclenchement de l'alerte comprend le tag role:production ou role:production.
  {{/is_match}}

  {{#is_exact_match "host.name" "production"}}
    S'affiche uniquement si le host à l'origine du déclenchement comprend le tag role:production.
  {{/is_exact_match}}
  ```

{{% /tab %}}
{{< /tabs >}}

## Utilisation avancée des variables

Si votre message d'alerte doit envoyer deux accolades, par exemple `{{ <TEXTE> }}`, utilisez le formatage `{{{{r}aw}}}` :

Le modèle suivant :

```
{{{{raw}}}}
{{ <TEXTE_1> }} {{ <TEXTE_2> }}
{{{{/raw}}}}
```

donne :

```
{{ <TEXTE_1> }} {{ <TEXTE_2> }}
```

Les auxiliaires `^|#` affichés dans la section [Variables conditionnelles](#variables-conditionnelles) ne peuvent pas être utilisés avec le formatage `{{{{raw}}}}` et doivent être supprimés. Par exemple, pour générer un texte brut de sortie avec la variable conditionnelle `{{is_match}}`, utilisez le modèle suivant :

```
{{{{is_match "host.name" "<NOM_HOST>"}}}}
{{ .matched }} le hostname
{{{{/is_match}}}}
```

Si `host.name` correspond à `<NOM_HOST>`, le modèle affiche :

```
{{ .matched }} le hostname
```

## @notification

Envoyez la notification de monitor à l'endpoint approprié :

* Informez un utilisateur Datadog par e-mail en ajoutant `@<E-MAIL_UTILISATEUR_DD>` à votre message de notification.
* Informez n'importe quel utilisateur en dehors de Datadog par e-mail en ajoutant `@<EMAIL>` au message de notification.
* Installez l'intégration Slack pour envoyer vos notifications directement à la chaîne appropriée.

**Remarques :**
* Vous devez ajouter une espace entre le dernier caractère de la ligne et la **@mention** : `{{valeur}}@chaîne-slack` n'est pas valide, mais `{{valeur}} @chaîne-slack` l'est.
* Une adresse email associée à une invitation utilisateur Datadog en attente est considérée comme inactive et ne reçoit aucune notification.

### Intégrations

{{< tabs >}}
{{% tab "Slack" %}}

Après avoir configuré l'intégration Slack, saisissez `@slack` dans le message de votre notification pour afficher la liste des canaux auxquels vous pouvez envoyer votre notification.

#### Mentions « @ » dans Slack depuis l'alerte d'un monitor

Ajoutez `< >` de chaque côté de `@nomutilisateur` comme ci-dessous dans votre modèle de message pour vos monitors afin de prévenir l'utilisateur défini dans les notifications Slack à l'aide de la syntaxe **@ notify**.

Par exemple, cette configuration :
{{< img src="monitors/notifications/notification_template.png" alt="modèle_notification" responsive="true" style="width:50%;" >}}

génère le message Slack suivant :
{{< img src="monitors/notifications/notification_slack_preview.png" alt="aperçu_notification_slack" responsive="true" style="width:50%;" >}}

**Remarque** : si vous ne parvenez pas à ping une personne, utilisez son `nom d'utilisateur` Slack plutôt que son nom d'affichage. Vous le trouverez dans les [paramètres de compte Slack][1], sous **Nom d'utilisateur**.

Ajoutez la mention **@here** ou **@chaîne** en utilisant respectivement `<!here>` ou `<!chaîne>`.

Pour les groupes d'utilisateurs, utilisez `<!subteam^ID_GROUPE|NOM_GROUPE>`. Pour trouver l'`ID_GROUPE`, [interrogez l'endpoint API de Slack `usergroups.list`][2]. Par exemple, pour un groupe d'utilisateurs `testers`, utilisez la syntaxe suivante :

```
<!subteam^12345|testers>
```

Remarque : les caractères spéciaux à la fin du nom d'une chaîne ne sont pas pris en charge pour les @notifications Slack.
Par exemple, `@----critical_alerts` fonctionne, mais `@--critical_alerts--` ne recevra aucune notification.

### Utilisation des template variables de message pour créer des mentions « @ » dynamiques

Utilisez les template variables de message dans un message de monitor pour créer des **mentions « @ »** dynamiques.

Par exemple, si la variable affichée est configurée en tant que chaîne dans l'intégration Slack :

* `@slack-{{nom.propriétaire}}` publie un message sur la chaîne du propriétaire pour ce monitor.

* `@slack-{{host.name}}` publie un message dans la chaîne #host.name Slack.

Vous pouvez également créer une **mention « @ »** transmise directement à une adresse e-mail spécifique :

* `@team-{{nom.équipe}}@entreprise.com` envoie directement un e-mail à la liste de diffusion de l'équipe.


[1]: http://slack.com/account/settings
[2]: https://api.slack.com/methods/usergroups.list
{{% /tab %}}
{{% tab "PagerDuty" %}}

Après avoir configuré l'[intégration PagerDuty][1], saisissez `@pagerduty` dans le message de votre notification pour afficher la liste des noms de service auxquels vous pouvez envoyer votre notification.

[1]: /fr/integrations/pagerduty
{{% /tab %}}
{{% tab "Webhooks" %}}

Après avoir configuré l'[intégration Webhooks][1], saisissez `@webhook` dans le message de votre notification pour afficher la liste des webhooks qui peuvent être déclenchés. En cas d'alerte du monitor, une requête `POST` est envoyée à l'URL du webhook.


[1]: /fr/integrations/webhooks
{{% /tab %}}
{{< /tabs >}}

## Tester les notifications d'un monitor

**Les notifications de test sont prises en charge pour les types de monitors suivants** : host, métrique, anomalie, outlier, prévision, intégration (check uniquement), processus (check uniquement), réseau (check uniquement), check custom, événement et composite.

Après avoir défini votre monitor, testez la notification de votre monitor pour tous ses états avec le bouton *Test Notifications* en bas à droite de la page du monitor :

1. Choisissez le cas de monitor que vous souhaitez tester dans la fenêtre contextuelle qui s'affiche. Vous pouvez uniquement tester les états disponibles dans la configuration du monitor, et seulement pour les seuils précisés dans les conditions d'alerte. Les [seuils de rétablissement][4] sont une exception, car Datadog envoie une notification de rétablissement soit lorsque le monitor n'est plus en alerte, soit s'il n'a pas de condition d'avertissement.

    {{< img src="monitors/notifications/test-notif-select.png" alt="Tester les notifications pour ce monitor" responsive="true" style="width:50%;" >}}

2. Cliquez sur **Run test** pour envoyer la notification à n'importe quel handle de notification disponible dans la zone de message.

**Remarques :**

* Les notifications de test créent des événements qui peuvent être recherchés dans le flux d'événements. Ces notifications indiquent également la personne à l'origine du test dans le corps du message. La mention `[TEST]` est ajoutée au titre de la notification de test.

* Les variables de message remplissent automatiquement un groupe sélectionné au hasard en fonction du contexte de la définition de votre monitor.

  {{< img src="monitors/notifications/test-notif-message.png" alt="Say what's happening" responsive="true" style="width:50%;" >}}

## Configuration avancée de notifications
### Inclure des liens vers des dashboards

De nombreuses organisations souhaitent inclure davantage de contexte dans leurs alertes. Des liens rapides vers des dashboards pertinents au sein d'une alerte accélèrent considérablement le processus de correction et le délai de résolution.

Chaque monitor défini peut inclure des template variables de message. Ces variables permettent d'ajouter des URL dynamiques qui orientent les utilisateurs Datadog vers un dashboard approprié grâce au contexte du monitor.

Voici quelques exemples d'ajout de liens vers des éléments comme des dashboards système, des dashboards d'intégration, des hostmaps et des pages Manage Monitors.

Imaginons que vous souhaitez inclure un lien vers un dashboard système lorsque le monitor d'une métrique système spécifique dépasse un seuil défini. Vous pouvez utiliser la template variable de message `{{host.name}}`. Ajoutez l'URL suivante à la section « Say What's Happening » de votre monitor :

```
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` est remplacé par le host ayant déclenché le monitor en question.

{{< img src="monitors/notifications/system_dashboard_url.png" alt="url_dashboard_système" responsive="true" style="width:70%;" >}}

Vous trouverez d'autres exemples ci-dessous de liens qui peuvent être ajoutés aux monitors pour proposer aux utilisateurs Datadog un accès rapide aux pages de base utilisées lors des processus de rupture, de réparation et de triage :

{{< tabs >}}
{{% tab "hostmap" %}}

Pour inclure un lien vers la hostmap et comparer les métriques avec d'autres hosts similaires, ajoutez un lien comme celui ci-dessous à votre monitor :

```
https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&sizeby=avg%3Anometric&filter=cassandra
```

Le lien ci-dessus dispose de davantage d'options personnalisables que votre dashboard système standard. Vous pouvez définir d'autres variables. Les variables les plus courantes transmises par cette URL sont **fillby, sizeby et filter** :

* `fillby` est défini en ajoutant `fillby:avg:<NomMétrique>`.
* `sizeby` est défini en ajoutant `sizeby:avg:<DeuxièmeNomMétrique>`.
* `filter` sert à indiquer une intégration spécifique (Cassandra, mysql, apache, snmp, etc.) en ajoutant `filter=<nom_intégration>`.

Dans l'exemple ci-dessous, les hexagones de la hostmap sont colorés en fonction de `system.cpu.system`. La taille des hexagones dépend de `system.cpu.stolen`. Ils sont filtrés de façon à inclure uniquement les hosts Cassandra.

{{< img src="monitors/notifications/hostmap_url.png" alt="url_hostmap" responsive="true" style="width:70%;">}}

{{% /tab %}}
{{% tab "Page Manage Monitors" %}}

Pour ajouter un lien vers une page « Manage Monitors » qui affiche tous les monitors du host en question, définissez un lien comme ci-dessous :

```
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

L'URL ci-dessus renvoie vers tous les monitors de ce host. D'autres options sont disponibles pour créer un lien encore plus précis.

Par exemple, pour visualiser tous les monitors avec l'état Alert, ajoutez `status:Alert` (les autres statuts sont `WARN`, `NO%20DATA`, `OK` et `MUTED`). Voici un exemple :

```
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}&status:Alert
```

Si vous souhaitez afficher tous les monitors d'une application ou d'une intégration spécifique, ajoutez la requête suivante à l'URL `q=<nom_intégration> ` :

```
https://app.datadoghq.com/monitors/manage?q=cassandra
```

{{< img src="monitors/notifications/monitor_url.png" alt="url_monitor" responsive="true" style="width:70%;">}}

{{% /tab %}}
{{% tab "Dashboards d'intégration" %}}

Si vous créez des monitors spécifiques à une application ou à une intégration, créez un lien vers ce dashboard d'intégration spécifique et ajoutez un contexte pour le host qui a déclenché le monitor.

Dans l'exemple ci-dessous, il suffit de remplir la section `<nom_intégration>` pour Cassandra, Apache ou encore SNMP, et de fournir le contexte du host en cause :

```
https://app.datadoghq.com/dash/integration/<nom_intégration>?tpl_var_scope=host:{{host.name}}
```

{{< img src="monitors/notifications/integration_url.png" alt="url_intégration" responsive="true" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

### Commentaires

Pour inclure un commentaire dans le message de monitor qui apparaîtra uniquement sur l'écran de modification de monitor, utilisez la syntaxe suivante :
```text
{{!-- ceci est un commentaire --}}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /fr/monitors/monitor_types/integration
[4]: /fr/monitors/faq/what-are-recovery-thresholds