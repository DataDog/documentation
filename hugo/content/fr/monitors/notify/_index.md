---
aliases:
- /fr/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /fr/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /fr/developers/faq/what-do-notifications-do-in-datadog
- /fr/monitors/notifications/
description: Envoyer des notifications à vos équipes lorsque des monitors déclenchent
  des alertes
further_reading:
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
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
title: Notifications
---
## Vue d'ensemble {#overview}

Les notifications sont un composant clé des monitors qui tiennent votre équipe informée des problèmes et facilitent le dépannage. Lors de la [création de votre monitor][1], configurez votre réponse pour :
- Rédiger un message exploitable.
- Déclencher un workflow ou créer un workflow à partir d'un monitor.
- [Créer automatiquement un work item][2].
- Créer automatiquement un incident.

## Construction de titres et de messages efficaces {#constructing-effective-titles-and-messages}

Cette approche permet de garantir que les titres et les messages de vos monitors sont clairs, exploitables et adaptés aux besoins de votre public.
- **Titres uniques** : Ajoutez un titre unique à votre monitor (ceci est obligatoire). Pour les monitors à alertes multiples, certaines balises identifiant votre périmètre de déclenchement sont insérées automatiquement. Vous pouvez utiliser des [variables de tag][3] pour améliorer la précision.
- **Champ de message** : Le champ de message prend en charge le [formatage Markdown][4] standard et les [variables][5]. Utilisez des [variables conditionnelles][6] pour moduler le texte de notification envoyé à différents contacts avec [@notifications](#notifications). Utilisez des [variables de modèle synthétique][23] pour enrichir le message d'alerte avec le contexte d'échec des tests synthétiques.

<div class="alert alert-info"> La prise en charge du formatage Markdown diffère selon la méthode de notification. Certains canaux ne prennent en charge qu'un sous-ensemble de la syntaxe Markdown.
<ul> 
  <li/>Notifications Slack : Prennent en charge le formatage de base (gras, italique, code en ligne, liens). Les en-têtes Markdown (par exemple, <code>#</code>, <code>##</code>) et les tableaux ne sont pas rendus ; ils apparaissent sous forme de texte brut.
  <li/>Notifications par e-mail : Prise en charge du formatage de base (gras, italique, code en ligne, liens). Les tableaux ne sont pas rendus sous forme de tableaux Markdown et apparaissent sous forme de texte brut dans le corps du message.
</ul>
</div>

{{% collapse-content title="Exemple de message de monitor" level="h3" expanded=false %}}
Le message du monitor inclut généralement des étapes détaillées permettant de résoudre le problème. Exemple :

```text
{{#is_alert}} <-- conditional variable

Steps to free up disk space on {{host.name}}: <-- tag variable

1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files

@slack-incident-response <-- channel to send notification

{{/is_alert}}

```

{{% /collapse-content %}}


## Destinataires de la notification {#notification-recipients}
Datadog recommande d'utiliser les [règles de notification de monitor][22] pour gérer les notifications de monitor. Avec les règles de notification, vous pouvez automatiser les destinataires de notification ajoutés à un monitor en fonction d'ensembles de conditions prédéfinis. Créez différentes règles pour acheminer les alertes de monitor en fonction des tags de la notification de monitor afin de ne pas avoir à configurer manuellement les destinataires ni la logique d'acheminement des notifications pour chaque monitor individuel.

Dans les règles de notification comme dans les monitors individuels, vous pouvez utiliser une `@notification` pour ajouter un membre d'équipe, une intégration, un workflow ou un work item à votre notification. Au fur et à mesure que vous tapez, Datadog recommande automatiquement les options existantes dans un menu déroulant. Cliquez sur une option pour l'ajouter à votre notification. Alternativement, cliquez sur {{< ui >}}@ Add Mention{{< /ui >}}, {{< ui >}}Add Workflow{{< /ui >}} ou {{< ui >}}Add Case{{< /ui >}}.

Une @notification doit comporter un espace entre elle et le dernier caractère de la ligne :

| Format correct | Format incorrect |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Integrations" level="h3" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Teams" level="h3" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="Cas" level="h3" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="Par e-mail" level="h3" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### Modification en masse des @-handles de monitor {#bulk-editing-monitor-handles}
Datadog prend en charge la modification des destinataires des messages d'alerte sur plusieurs monitors à la fois. Utilisez cette fonctionnalité pour ajouter, supprimer ou remplacer efficacement des `@-handles` dans le corps du message du monitor. Exemples de cas d'utilisation :

- **Échanger un handle** : Remplacez un handle par un autre sur plusieurs monitors. Par exemple, remplacez `@pagerduty-sre` par `@oncall-sre`. Vous pouvez également remplacer un handle par plusieurs handles, par exemple en remplaçant `@pagerduty-sre` par `@pagerduty-sre` et `@oncall-sre`, pour prendre en charge la pagination double ou une couverture d'alerte étendue.
- **Ajouter un handle** : Ajoutez un nouveau destinataire sans supprimer ceux existants. Par exemple, ajoutez `@slack-infra-leads` à tous les monitors sélectionnés.
- **Supprimer un handle** : Supprimez un handle spécifique des messages du monitor. Par exemple, supprimez `@webhook-my-legacy-event-intake`.

## Workflows {#workflows}
Vous pouvez déclencher un [workflow automation][8] ou créer un nouveau workflow à partir d'un monitor.

Avant d'ajouter un workflow à un monitor, [ajoutez un déclencheur de monitor au workflow][9].

Après avoir ajouté le déclencheur de monitor, [ajoutez un workflow existant à votre monitor][10] ou créez un nouveau workflow. Pour créer un nouveau workflow à partir de la page des monitors :

1. Cliquez sur {{< ui >}}Add Workflow{{< /ui >}}.
1. Cliquez sur l'icône {{< ui >}}+{{< /ui >}} et sélectionnez un Blueprint, ou sélectionnez {{< ui >}}Start From Scratch{{< /ui >}}.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Cliquez sur le bouton + pour ajouter un nouveau workflow" style="width:90%;">}}

Pour plus d'informations sur la création d'un workflow, consultez [Build workflows][11].

## Incidents {#incidents}
Les incidents peuvent être créés automatiquement à partir d'un monitor lorsque celui-ci passe à un statut `alert`, `warn` ou `no data`. Cliquez sur {{< ui >}}Add Incident{{< /ui >}} et sélectionnez une option `@incident-`. Les administrateurs peuvent créer des options `@incident-` dans [Incident Settings][12].

Lorsqu'un incident est créé à partir d'un monitor, les [valeurs de champ][13] de l'incident sont automatiquement renseignées en fonction des tags du monitor. Par exemple, si votre monitor possède un tag `service:payments`, le champ de service de l'incident sera défini sur « payments ». Pour recevoir des notifications pour ces incidents, assurez-vous que les tags du monitor correspondent à vos règles de notification d'incident. **Remarque** : Les règles de notification d'incident sont configurées séparément des règles de notification de monitor et doivent être définies indépendamment. Pour plus d'informations, consultez [Notification d'incident][14].

## Afficher le contenu supplémentaire {#toggle-additional-content}

Les notifications de monitor incluent du contenu tel que la requête du monitor, les @-mentions utilisées, les snapshots de métriques (pour les monitors de métriques) et des liens vers les pages pertinentes dans Datadog. Vous avez la possibilité de choisir le contenu que vous souhaitez inclure ou exclure des notifications pour chaque monitor.

<div class="alert alert-danger">Les métriques de distribution avec des agrégateurs de centile (tels que `p50`, `p75`, `p95` ou `p99`) ne génèrent pas de graphique snapshot dans les notifications. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Définir un préréglage de monitor" style="width:70%;" >}}

Les options disponibles sont :

- {{< ui >}}Default{{< /ui >}} : Aucun contenu n'est masqué.
- {{< ui >}}Hide Query{{< /ui >}} : Supprimer la requête du monitor du message de notification.
- {{< ui >}}Hide Handles{{< /ui >}} : Supprimer les @-mentions utilisées dans le message de notification.
- {{< ui >}}Hide All{{< /ui >}} : Le message de notification n'inclut pas la requête, les handles, les snapshots (pour les monitors de métriques) ou les liens supplémentaires dans les pieds de page.

**Remarque** : Selon l'intégration, certains contenus peuvent ne pas être affichés par défaut.

## Renotifier {#renotify}

Activez le renvoi de notifications du monitor (facultatif) pour rappeler à votre équipe qu'un problème n'a pas été résolu.

  {{< img src="monitors/notifications/renotify_options.png" alt="Activer la renotification" style="width:90%;" >}}

Configurez l'intervalle de renotification, les états du monitor à partir desquels le monitor renotifie (parmi `alert`, `no data` et `warn`) et définissez éventuellement une limite au nombre de messages de renotification envoyés.

Par exemple, configurez le monitor sur `stop renotifying after 1 occurrence` pour recevoir un seul message d'escalade après l'alerte principale.
**Remarque** [Attribute and tag variables][3] in the renotification are populated with the data available to the monitor during the time period of the renotification.

Si le renvoi de notifications est activé, vous pouvez définir un message de réaffectation. Celui-ci est envoyé lorsque le monitor conserve l'un des états indiqués pendant la période de votre choix.

Le message de réaffectation peut être ajouté de plusieurs façons :

* Dans le bloc `{{#is_renotify}}` dans le message de notification d'origine (recommandé).
* Dans le champ {{< ui >}}Renotification message{{< /ui >}} de la section {{< ui >}}Configure notifications and automations{{< /ui >}}.
* Avec l'attribut `escalation_message` dans l'API.

Si vous utilisez le bloc `{{#is_renotify}}`, le message de notification original est également inclus dans la renotification, donc :

1. Incluez uniquement les détails supplémentaires dans le bloc `{{#is_renotify}}` et ne répétez pas les détails du message original.
2. Envoyez le message d'escalade à un sous-ensemble de groupes.

Apprenez à configurer vos monitors pour ces cas d'utilisation dans la [section des exemples][15].

## Métadonnées {#metadata}

Ajoutez des métadonnées (Priorité, Tags, Datadog Team) à votre monitor. La priorité du monitor vous permet de définir l'importance de votre monitor via un niveau P (de P1 à P5). Les tags de monitor, qui sont différents des tags de métrique, sont utilisés dans l'interface utilisateur pour regrouper et rechercher des monitors. Si des politiques de tags sont configurées, les tags et valeurs de tag requis doivent être ajoutés. Pour en savoir plus, consultez [Politiques de tags][16]. Les Datadog Teams vous permettent de définir un niveau de responsabilité pour ce monitor et de voir tous les monitors liés à votre équipe. Pour en savoir plus, consultez [Datadog Teams][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Vue de la configuration des tags de politique. Sous « Tags de politique » se trouvent trois exemples de tags, cost_center, product_id et env, à côté d'un menu déroulant « Sélectionner une valeur »." style="width:100%;" >}}

{{% collapse-content title="Priorité" level="h3" expanded=false %}}

Ajoutez une priorité (facultatif) associée à vos monitors. Les valeurs vont de P1 à P5, P1 étant la priorité la plus élevée et P5 la plus basse.
Pour remplacer la priorité du monitor dans le message de notification, utilisez `{{override_priority 'Pi'}}` where `Pi` est compris entre P1 et P5.

Par exemple, vous pouvez définir des priorités différentes pour les notifications `alert` et `warning` :

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}
{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```
{{% /collapse-content %}}


## Agrégation {#aggregation}

Si la requête du monitor est regroupée, vous pouvez supprimer une ou plusieurs dimensions du regroupement de notifications, ou toutes les supprimer et notifier sous forme d'alerte simple.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="Vue de la configuration d'agrégation définie sur multi-alerte." style="width:100%;" >}}

Trouvez plus d'informations sur cette fonctionnalité dans [Configure Monitors][18].

## Notifications de test {#test-notifications}

Après avoir défini votre monitor, testez les notifications avec le bouton {{< ui >}}Test Notifications{{< /ui >}} en bas à droite de la page du monitor.

Les notifications de test sont prises en charge pour les [monitor types][19] suivants : host, métrique, anomalie, singularité, prévision, logs, rum, apm, intégration (vérification uniquement), process (vérification uniquement), réseau (vérification uniquement), check personnalisé, événement et composite.

1. Depuis la fenêtre contextuelle des notifications de test, choisissez la transition de monitor à tester et le groupe (disponible uniquement si la requête comporte un [grouping][20]). Vous ne pouvez tester que les états disponibles dans la configuration du monitor pour les seuils spécifiés dans les conditions d'alerte. Les [Recovery thresholds][21] constituent une exception, car Datadog envoie une notification de rétablissement une fois que le monitor n'est plus en alerte ou qu'il ne présente aucune warn condition.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Testez les notifications pour ce monitor" style="width:70%;" >}}

1. Cliquez sur {{< ui >}}Run Test{{< /ui >}} pour envoyer des notifications aux personnes et services listés dans le monitor.

### Événements {#events}

Les notifications de test produisent des événements qui peuvent être recherchés dans Event Explorer. Ces notifications indiquent qui a lancé le test dans le corps du message avec `[TEST]` dans le titre de la notification.

Les tag variables ne sont renseignées que dans le texte des Datadog child events. L'événement parent affiche uniquement un résumé de l'agrégation.

### Variables {#variables-test-notification}

Les variables de message se remplissent automatiquement à partir d'un groupe disponible, sélectionné au hasard, en fonction du périmètre de la définition de votre monitor. Exemple :

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration
[2]: /fr/incident_response/work_management/create_work_item/#automatic-work-item-creation
[3]: /fr/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /fr/monitors/notify/variables/
[6]: /fr/monitors/notify/variables/#conditional-variables
[8]: /fr/actions/workflows/
[9]: /fr/actions/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /fr/actions/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /fr/actions/workflows/build/
[12]: https://app.datadoghq.com/incidents/settings?section=global-settings
[13]: /fr/incident_response/incident_management/setup_and_configuration/property_fields
[14]: /fr/incident_response/incident_management/notification
[15]: /fr/monitors/notify/variables/?tab=is_renotify#examples
[16]: /fr/monitors/settings/#tag-policies
[17]: /fr/account_management/teams/
[18]: /fr/monitors/configuration/#set-alert-aggregation
[19]: /fr/monitors/types
[20]: /fr/monitors/configuration/
[21]: /fr/monitors/guide/recovery-thresholds/
[22]: /fr/monitors/notify/notification_rules
[23]: /fr/synthetics/notifications/template_variables/