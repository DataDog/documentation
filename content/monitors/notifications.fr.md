---
title: Notifications
kind: documentation
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: Apprenez à créer un monitor
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: Managez vos monitors
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Planifiez un downtime pour stopper les notifications d'un monitor
- link: "monitors/faq"
  tag: "FAQ"
  text: FAQ monitors
---

## Aperçu

Les notifications sont un composant clé de tout [monitor][1]. Vous voulez vous assurer que les bonnes personnes sont averties afin que le problème puisse être résolu le plus rapidement possible.

{{< img src="monitors/notifications/notification.png" alt="notification" responsive="true" >}}

1. Donnez à votre monitor un **titre**. Il est souvent utile d'utiliser un résumé de son action.
   explication du monitor afin qu'un membre de l'équipe peut rapidement comprendre
   ce qu'il se passe.

2. Entrez un **message** pour le monitor. Ce champ permet la mise en forme standard [markdown formatting][2] ainsi que la syntaxe @-notification de Datadog.
  Remarque: vous pouvez notifier les utilisateurs non-Datadog par e-mail en ajoutant `@ leur-email` au message. Un cas d'utilisation courant pour le message du moniteur consiste à inclure une procédure pas à pas pour résoudre le problème.
  Par exemple, si vous monitorez une base de données, vous pouvez inclure des étapes de basculement vers un nœud de secours. Dans l'ensemble, vous devriez essayer de donner le plus de contexte possible au monitor.

3. Activez éventuellement **monitor renotification**. Cette option est utile pour rappeler à votre équipe qu'un problème n'est pas résolu tant que le moniteur n'est pas marqué comme résolu. Si cette option est activée, vous pouvez configurer un message d'escalade à envoyer à chaque fois que le moniteur se réactive. Le message original est également inclus.

## Say what's happening
### Template variables du message

Les template variables de message peuvent être utilisées pour personnaliser les notifications de votre monitor.
Cette fonctionnalité est prise en charge dans tous les types de monitor. Il y a deux cas d'utilisation principaux pour les template variables:

1. Afficher un message différent en fonction du
type de notification (ex. triggered, recovered, no data)
2. Incorporer le contexte de déclenchement dans le message de plusieurs alertes.

#### Tag variables

Lorsque votre monitor est une alerte multiple, au lieu d'avoir un message générique (et de trouver le context du tag de déclenchement dans la définition de requête d'alerte), une variable peut être utilisée dans le message pour identifier explicitement le contexte du déclenchement.

Voici un exemple de la façon dont vous pouvez utiliser des templates variables pour une alerte multiple:

{{< img src="monitors/notifications/templatevareditor.png" alt="template var editor" responsive="true" style="width:80%;">}}

et la notification d'événement correspondante:

{{< img src="monitors/notifications/templatevar.png" alt="template var" responsive="true" style="width:80%;">}}

**Note**:  

* Les templates variables de tag disponibles dépendent du groupe de tag sélectionné à l'étape 1 de l'éditeur du monitor. Les options possibles apparaissent automatiquement au bas de la boîte d'aide "Use message template variables" à l'étape 3 de l'éditeur.

* Le contenu de la template variable est échappé par défaut. Si votre variable
contient du code JSON ou un code que vous n'aimeriez PAS voir échapper, utilisez des accolades triples au lieu de doubles accolades (ex. `{{{event.text}}}`).

* Consultez la liste complète des template variables contextuelles disponibles pour votre monitor en cliquant sur le lien "Use message template variables" ou dans la liste des suggestions qui s'affiche lorsque vous tapez `{{` pour commencer un nom de template variable.

* Les template variables de tag peuvent également être utilisées dans les titres du monitor (noms), mais les variables ne sont remplies que dans le texte des événements enfant de Datadog (pas le parent, qui affiche un résumé de l'agrégation).

* Certains tags identifiant votre contexte de déclenchement sont automatiquement insérées dans le titre de votre alerte multiple. Sinon, si votre context de déclenchement contient un grand nombre de tags, votre titre d'alerte risque d'être inutilement long.

#### {{comparator}} template variables

La valeur de la template variable `{{comparator}}`  est toujours un opérateur relationnel. Il correspond à la valeur relationnelle sélectionnée dans la section "Set alert conditions" du monitor:

{{< img src="monitors/notifications/comparator_alert.png" alt="comparator_alert" responsive="true" style="width:80%;">}}

Par exemple, lorsqu'une alerte est définie pour se déclencher lorsqu'une valeur augmente "au-dessus" de 50, la syntaxe suivante:
```
  {{value}} {{comparator}} {{threshold}}
```
donnerait un message de notification comme suit:
```
    51.47 > 50
```

### Variables conditionnelles
Utilisez des variables conditionnelles pour afficher un contenu de notification différent en fonction du contexte de votre notification.

Les variables conditionnelles disponibles sont:

* `{{is_alert}}`, 
* `{{is_alert_recovery}}`,
* `{{is_warning}}`, 
* `{{is_warning_recovery}}`, 
* `{{is_recovery}}`, 
* `{{is_no_data}}`,
* `{{is_match}}`.

Vous pouvez également les voir dans la zone d'aide "Use message template variables dans l'étape 3 de l'éditeur de monitor.

#### `{{is_alert}}` & `{{is_warning}}`

Ces variables utilisent la logique simple «if-else» pour afficher un message différent en fonction du type d'événement (*warning*, *recovery*, *no data* ...)

{{< img src="monitors/notifications/conditionalvars.png" alt="conditional vars" responsive="true" style="width:80%;">}}

Voici un exemple de comment vous pouvez le configurer dans l'éditeur:

{{< img src="monitors/notifications/templateconditionaleditor.png" alt="template conditional editor" responsive="true" style="width:80%;">}}

La notification d'événement correspondante ressemble à ceci:

{{< img src="monitors/notifications/templateconditionaltrigger.png" alt="template conditional trigger" responsive="true" style="width:80%;">}}

et la notification de recovery:

{{< img src="monitors/notifications/templateconditionalrecover.png" alt="template conditional recover" responsive="true" style="width:80%;">}}

#### `{{is_recovery}}` or `{{is_alert_recovery}}` 

* `{{is_recovery}}` se déclenche lorsqu'un monitor récupèrent indifféremment d'un état **WARNING** ou d'un état **ALERTE**.
* `{{is_alert_recovery}}` se déclenche lorsqu'un monitor récupère directement depuis un état **ALERT** à un état **OK**.
* `{{is_warning_recovery}}` se déclenche lorsqu'un monitor récupère d'un état **WARNING** à un état **OK**

Cela signifie que si le monitor passe d'un **ALERT** à un état **WARNING** à un état ** OK **:

* le `{{is_recovery}}` se déclencherait.
* le `{{is_alert_recovery}}` ne se déclencherait pas.
* le `{{is_warning_recovery}}` se déclencherait.

Le @-notification dans les templates variables suit les mêmes règles.

#### `{{is_match}}`

La variable conditionnelle `{{is_match}}` vous permet de faire correspondre le contexte de déclenchement à une chaîne pour afficher un message différent.
Par exemple, vous pouvez indiquer à votre équipe db si un host qui vient de se déclencher possède le tag  `role:db` mais informez votre équipe d'application si l'host à le tag ` role: app`.

Vous pouvez utiliser n'importe quelle variable de tag disponible. Un match est fait si la chaîne de comparaison est n'importe où dans la variable résolue.

La variable utilise le format suivant:
```
{{#is_match "tag_variable" "comparison_string"}}
  This shows if comparison_string is in tag_variable.
{{/is_match}}
```

Voici un exemple de comment vous pouvez donner un message différent en fonction du contexte de déclenchement:

{{< img src="monitors/notifications/scope_match_editor.png" alt="scope match editor" responsive="true" style="width:80%;">}}

**Note**: Pour utiliser la conditionnelle `{{is_match}}`  pour verifier si une `tag_variable` n'est **PAS** vide, rajoutez `.name` après le nom de votre tag, par exemple:

  ```
  {{#is_match "tag_variable.name" ""}}
    This shows if tag_variable is not empty.
  {{/is_match}}
  ```

### Disponibilité de variable

Nous fournissons un certain nombre de types différents de monitor et toutes les variables ne sont pas disponibles pour chaque type de monitor. Les variables du monitor d'intégration dépendent en grande partie de l'intégration et de la configuration du monitor.


*(Faites défiler vers la droite pour voir toutes les variables disponibles)*

{{% table responsive="true" %}}
||[host][3]| [metric][4]| [integration][5]| [process][6]| [network][7]| [custom check][8]| [event][9]|
| :-------|:-----|:-----|:-------|:-------|:---------|:-------|:------|
| **Conditionals**      |
| `is_alert`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_alert_recovery`   |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning`          |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_warning_recovery` |                   | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `is_recovery`         | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_no_data`          | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `is_match`            | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| **Variables**         |
| `{{value}}`           |                   | Y                             | Y                                     |                                   |                                                       |                           |                   |
| `{{threshold}}`       | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| `{{warn_threshold}}`  | Y (cluster)       | Y                             | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{ok_threshold}}`    |                   |                               | Y                                     | Y                                 | Y                                                     | Y                         |                   |
| `{{comparator}}`      | Y                 | Y                             | Y                                     | Y                                 | Y                                                     | Y                         | Y                 |
| Additional variables  | Contextual        |                               | Contextual<br/>`{{check_message}}`    | Contextual<br/>`{{process.name}}` | Contextual<br/>`{{url.name}}`<br/>`{{instance.name}}` | `{{check_message}}`       |                   |
{{% /table %}}
<style>
  .tpl-var-table tr td {
    text-align: center;
    border: 1px #9d6ebf solid;
    padding: 5px;
  }
  .tpl-var-table tr td:first-child {
    text-align: right;
  }
</style>

## Configuration avancée de notification
### Inclure des liens vers des dashboards

De nombreuses organisations souhaitent aujourd'hui ajouter un contexte supplémentaire à leurs alertes. Des liens rapides vers des dashboards pertinents dans le contexte de l'alerte réduisent le temps nécessaire à la résolution des problèmes.

Datadog rend les template variables de message disponibles pour chaque monitor. À l'aide de ces variables, vous pouvez créer dynamiquement une URL qui lie les utilisateurs de Datadog à un dashboard approprié à l'aide du contexte du moniteur.

Voici quelques exemples de liens vers des éléments tels que les dashboard système, les dashboard d'intégration, les HostMaps et les pages Managed Monitors.

Le premier exemple à examiner est le plus commun. Imaginons que vous souhaitiez fournir un lien vers un dashboard système lorsqu'un monitor pour une métrique système spécifique a dépassé votre seuil défini. La template variable de message qui peut être utilisée dans cette instance serait {{host.name}}. Incluez l'URL suivante dans votre section "Say What’s Happening":

```
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Comme vous pouvez le voir `{{host.name}}` est remplacé par l'host fautif du monitor en question.

{{< img src="monitors/notifications/system_dashboard_url.png" alt="system_dashboard_url" responsive="true" style="width:70%;" >}}

Vous trouverez ci-dessous des exemples supplémentaires de liens qui pourraient être ajoutés aux monitors pour fournir aux utilisateurs de Datadog un accès rapide aux pages communes exploitées pendant le processus de réparation et de triage.

* **Hostmaps** - Si vous souhaitez inclure une HostMap pour comparer des métriques avec d'autres hosts similaires, vous pouvez utiliser un lien comme ci-dessous:
  ```
  https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&sizeby=avg%3Anometric&filter=cassandra
  ```
  Le lien ci-dessus a des options plus personnalisables que votre dashboard système standard. Ici vous avez d'autres variables à définir. Les variables les plus communes transmises dans cette URL sont les suivantes ** fillby, sizeby, filter **:

  * `fillby` est défini en ajoutant `fillby:avg:<MetricName>`.  
  * `sizeby` est défini en ajoutant `sizeby:avg:<SecondMetricName>`.
  * `filter` est utilisé pour spécifier une intégration spécifique (c'est-à-dire, Cassandra, mysql, apache, snmp, etc.) en ajoutant `filter=<integration_name>`
  {{< img src="monitors/notifications/hostmap_url.png" alt="hostmap_url" responsive="true" style="width:70%;">}}
  Les couleurs ci-dessus remplissent les hexagones par `system.cpu.system`, elles dimensionnent les hexagones par` system.cpu.stolen` et ajoutent un filtre pour n'inclure que les hosts Cassandra.


*  **Dashboard d'intégration**: si vous créez des monitors spécifiques à l'application ou à l'intégration, créez un lien vers ce dashboard d'intégration spécifique et ajoutez un context pour l'host qui a déclenché ce monitor.
  Dans l'exemple ci-dessous, tout ce qui est nécessaire pour le remplir est la section `<integration_name>`  pour quelque chose comme Cassandra, Apache, SNMP, etc. ainsi que le context de l'host incriminé:
  ```
  https://app.datadoghq.com/dash/integration/<integration_name>?tpl_var_scope=host:{{host.name}}
  ```
  {{< img src="monitors/notifications/integration_url.png" alt="integration_url" responsive="true" style="width:70%;">}}

* 
**Manage Monitors Page** - Pour créer un lien vers une page Manage Monitors qui affiche tous les monitors de l'host en question, définissez un lien comme ci-dessous:
  ```
  https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
  ```
  Le lien ci-dessus mène à tous les monitors pour cet host. Vous avez d'autres options disponibles pour affiner le lien.
  Par exemple, si vous voulez seulement les monitors qui sont dans un état d'alerte, vous pouvez ajouter: `status:Alert` (les autres états qui peuvent être exploités sont WARN, NO%20DATA, OK et MUTED). Voici un exemple de lien:
  ```
  https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}&status:Alert
  ```
  Si vous souhaitez tous les monitors pour une application ou une intégration spécifique, ajoutez la requête suivante à l'URL `q=<integration_name> `:
  ```
  https://app.datadoghq.com/monitors/manage?q=cassandra
  ```

  {{< img src="monitors/notifications/monitor_url.png" alt="monitor_url" responsive="true" style="width:70%;">}}

### Intégration Slack

#### @ -mentions de Slack de l'alerte du monitor

Entourez le `@ username` dans` <> `comme indiqué ci-dessous dans votre modèle de message du Monitor pour **notifier** l'utilisateur défini dans les notifications slack.
Par exemple cette configuration:

{{< img src="monitors/notifications/notification_template.png" alt="notification_template" responsive="true" style="width:50%;" >}}

Produirait ce message slack:

{{< img src="monitors/notifications/notification_slack_preview.png" alt="notification_slack_preview" responsive="true" style="width:50%;" >}}

#### Utilisation de template variables de message pour créer dynamiquement des @ -mentions

Utilisation de template variable de message pour créer dynamiquement des @ -mentions

Par exemple, si la variable rendue est configurée en tant que channel  dans l'intégration Slack:

* `@slack-{{owner.name}}` post un message DM directement au propriétaire de ce monitor.

* `@slack-{{host.name}}` post un message slack dans le channel #host.name.

[En savoir plus sur la configuration de contacts et de messages conditionnels dans un seul monitor.][10]

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /monitors/monitor_types/host
[4]: /monitors/monitor_types/metric
[5]: /monitors/monitor_types/integration
[6]: /monitors/monitor_types/process
[7]: /monitors/monitor_types/network
[8]: /monitors/monitor_types/custom_check
[9]: /monitors/monitor_types/event
[10]: /monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
