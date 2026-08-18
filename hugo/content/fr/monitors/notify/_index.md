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
## Aperçu {#overview}

Les notifications sont un élément clé des moniteurs qui tiennent votre équipe informée des problèmes et facilitent le dépannage. Lors de la [création de votre moniteur][1], configurez votre réponse pour :
- Rédigez un message actionnable.
- Déclenchez un flux de travail ou créez un flux de travail à partir d'un moniteur.
- [Créez automatiquement un cas][2].
- Créez automatiquement un incident.

## Construire des titres et des messages efficaces {#constructing-effective-titles-and-messages}

Cette approche aide à garantir que les titres et les messages de votre moniteur sont clairs, actionnables et adaptés aux besoins de votre public.
- **Titres uniques** : Ajoutez un titre unique à votre moniteur (c'est requis). Pour les moniteurs d'alerte multiples, certains tags identifiant votre portée de déclenchement sont insérés automatiquement. Vous pouvez utiliser [des variables de tag][3] pour améliorer la spécificité.
- **Champ de message** : Le champ de message prend en charge le [formatage Markdown standard][4] et [les variables][5]. Utilisez [des variables conditionnelles][6] pour moduler le texte de notification envoyé à différents contacts avec [@notifications](#notifications). Utilisez [des variables de modèle synthétiques][23] pour enrichir le message d'alerte avec le contexte d'échec des synthétiques.

<div class="alert alert-info"> Le support du formatage Markdown varie selon la méthode de notification. Certains canaux ne prennent en charge qu'un sous-ensemble de la syntaxe Markdown.
<ul> 
  <li/>Notifications Slack : Prend en charge le formatage de base (gras, italique, code en ligne, liens). Les en-têtes Markdown (par exemple, <code>#</code>, <code>##</code>) et les tableaux ne sont pas rendus ; ils apparaissent comme du texte brut.
  <li/>Les notifications par e-mail : prennent en charge le formatage de base (gras, italique, code en ligne, liens). Les tableaux ne sont pas rendus en tant que tableaux Markdown et apparaissent comme du texte brut dans le corps du message.
</ul>
</div>

{{% collapse-content title="Exemple de message de moniteur" level="h4" expanded=false %}}
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
Datadog recommande d'utiliser [les règles de notification de moniteur][22] pour gérer les notifications de moniteur. Avec les règles de notification, vous pouvez automatiser l'ajout des destinataires de notification à un moniteur en fonction d'ensembles de conditions prédéfinies. Créez différentes règles pour acheminer les alertes de moniteur en fonction des tags de la notification, afin de ne pas avoir à configurer manuellement les destinataires ni la logique d'acheminement des notifications pour chaque moniteur individuel.

Dans les règles de notification et les moniteurs individuels, vous pouvez utiliser un `@notification` pour ajouter un membre de l'équipe, une intégration, un flux de travail ou un cas à votre notification. Au fur et à mesure que vous tapez, Datadog recommande automatiquement des options existantes dans un menu déroulant. Cliquez sur une option pour l'ajouter à votre notification. Alternativement, cliquez sur **@ Ajouter une mention**, **Ajouter un flux de travail** ou **Ajouter un cas**.

Une @notification doit avoir un espace entre elle et le dernier caractère de ligne :

| Format correct | Format incorrect |
|------------------|-------------------|
| `Disk space is low @ops-team@company.com` | `Disk space is low@ops-team@company.com` |

{{% collapse-content title="Les intégrations" level="h4" expanded=false %}}
{{% notifications-integrations %}}
{{% /collapse-content %}}

{{% collapse-content title="Équipes" level="h4" expanded=false %}}
{{% notifications-teams %}}
{{% /collapse-content %}}

{{% collapse-content title="Cas" level="h4" expanded=false %}}
{{% notifications-cases %}}
{{% /collapse-content %}}

{{% collapse-content title="Par e-mail" level="h4" expanded=false %}}
{{% notifications-email %}}
{{% /collapse-content %}}

### Édition en masse des @-handles de moniteur {#bulk-editing-monitor-handles}
Datadog prend en charge l'édition des destinataires de messages d'alerte sur plusieurs moniteurs à la fois. Utilisez cette fonctionnalité pour ajouter, supprimer ou remplacer efficacement `@-handles` dans le corps du message du moniteur. Exemples de cas d'utilisation :

- **Échanger un handle** : Remplacer un handle par un autre sur plusieurs moniteurs. Par exemple, changez `@pagerduty-sre` en `@oncall-sre`. Vous pouvez également échanger un handle contre plusieurs handles, par exemple en remplaçant `@pagerduty-sre` par `@pagerduty-sre` et `@oncall-sre`, pour prendre en charge la double pagination ou une couverture d'alerte élargie.
- **Ajouter un handle** : Ajoutez un nouveau destinataire sans supprimer les existants. Par exemple, ajoutez `@slack-infra-leads` à tous les moniteurs sélectionnés.
- **Supprimer un handle** : Supprimez un handle spécifique des messages de moniteur. Par exemple, supprimez `@webhook-my-legacy-event-intake`.

## Flux de travail {#workflows}
Vous pouvez déclencher une [automatisation de flux de travail][8] ou créer un nouveau flux de travail à partir d'un moniteur.

Avant d'ajouter un flux de travail à un moniteur, [ajoutez un déclencheur de moniteur au flux de travail][9].

Après avoir ajouté le déclencheur de moniteur, [ajoutez un flux de travail existant à votre moniteur][10] ou créez un nouveau flux de travail. Pour créer un nouveau flux de travail à partir de la page des moniteurs :

1. Cliquez sur **Ajouter un flux de travail**.
1. Cliquez sur l'icône **+** et sélectionnez un modèle, ou sélectionnez **Commencer à partir de zéro**.
   {{< img src="/monitors/notifications/create-workflow.png" alt="Cliquez sur le bouton + pour ajouter un nouveau flux de travail" style="width:90%;">}}

Pour plus d'informations sur la création d'un flux de travail, consultez [Créer des flux de travail][11].

## Incidents {#incidents}
Les incidents peuvent être créés automatiquement à partir d'un moniteur lorsque le moniteur passe à un statut `alert`, `warn` ou `no data`. Cliquez sur **Ajouter un incident** et sélectionnez une option `@incident-`. Les administrateurs peuvent créer `@incident-` options dans [Paramètres des incidents][12].

Lorsqu'un incident est créé à partir d'un moniteur, les [valeurs de champ][13] de l'incident sont automatiquement remplies en fonction des tags du moniteur. Par exemple, si votre moniteur a un tag `service:payments`, le champ de service de l'incident sera défini sur "paiements". Pour recevoir des notifications concernant ces incidents, assurez-vous que les tags du moniteur correspondent à vos règles de notification d'incidents. **Remarque** : Les règles de notification d'incidents sont configurées séparément des règles de notification de moniteur et doivent être mises en place indépendamment. Pour plus d'informations, consultez [Notification d'incidents][14].

## Basculer le contenu supplémentaire {#toggle-additional-content}

Les notifications de moniteur incluent des contenus tels que la requête du moniteur, les mentions @ utilisées, les instantanés de métriques (pour les moniteurs de métriques) et des liens vers les pages pertinentes dans Datadog. Vous avez la possibilité de choisir quel contenu vous souhaitez inclure ou exclure des notifications pour des moniteurs individuels.

<div class="alert alert-danger">Les métriques de distribution avec des agrégateurs de percentile (tels que `p50`, `p75`, `p95` ou `p99`) ne génèrent pas de graphique instantané dans les notifications. </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="Définir un préréglage de moniteur" style="width:70%;" >}}

Les options disponibles sont :

- **Par défaut** : Aucun contenu n'est masqué.
- **Masquer la requête** : Supprimer la requête du moniteur du message de notification.
- **Masquer les mentions** : Supprimer les mentions @ utilisées dans le message de notification.
- **Tout masquer** : Le message de notification n'inclut pas la requête, les mentions, les instantanés (pour les moniteurs de métriques) ou des liens supplémentaires dans les pieds de page.

**Remarque** : Selon l'intégration, certains contenus peuvent ne pas être affichés par défaut.

## Renotifier {#renotify}

Activez le renvoi de notifications (facultatif) pour rappeler à votre équipe qu'un problème n'a pas été résolu.

  {{< img src="monitors/notifications/renotify_options.png" alt="Activer la renotification" style="width:90%;" >}}

Configurer l'intervalle de renotification, les états du moniteur à partir desquels le moniteur renotifie (dans `alert`, `no data` et `warn`) et éventuellement définir une limite au nombre de messages de renotification envoyés.

Par exemple, configurez le moniteur pour `stop renotifying after 1 occurrence` afin de recevoir un seul message d'escalade après l'alerte principale.
**Remarque :** [Les variables d'attribut et de tag][3] dans la renotification sont peuplées avec les données disponibles pour le moniteur pendant la période de temps de la renotification.

Si le renvoi de notifications est activé, vous pouvez définir un message de réaffectation. Celui-ci est envoyé lorsque le monitor conserve l'un des états indiqués pendant la période de votre choix.

Le message de réaffectation peut être ajouté de plusieurs façons :

* Dans le `{{#is_renotify}}` bloc dans le message de notification original (recommandé).
* Dans le champ *Message de renotification* dans la section `Configure notifications and automations`.
* Avec l'attribut `escalation_message` dans l'API.

Si vous utilisez le bloc `{{#is_renotify}}`, le message de notification original est également inclus dans la renotification, donc :

1. Incluez uniquement des détails supplémentaires dans le bloc `{{#is_renotify}}` et ne répétez pas les détails du message original.
2. Envoyez le message d'escalade à un sous-ensemble de groupes.

Apprenez à configurer vos moniteurs pour ces cas d'utilisation dans la [section exemple][15].

## Métadonnées {#metadata}

Ajoutez des métadonnées (Priorité, Tags, Équipe Datadog) à votre moniteur. La priorité du moniteur vous permet de définir l'importance de votre moniteur par le niveau P (P1 à P5). Les tags de moniteur--qui sont différents des tags de métriques--sont utilisés dans l'interface utilisateur pour regrouper et rechercher des moniteurs. Si des politiques de tags sont configurées, les tags requis et les valeurs de tags doivent être ajoutés. Pour en savoir plus, consultez [Politiques de tags][16]. Les équipes Datadog vous permettent de définir un niveau de propriété pour ce moniteur et de voir tous les moniteurs liés à votre équipe. Pour en savoir plus, consultez [Équipes Datadog][17].

{{< img src="monitors/notifications/notifications_metadata.png" alt="Vue de la configuration des tags de politique. Sous 'Policy tags', il y a trois tags d'exemple : cost_center, product_id et env, à côté d'un menu déroulant 'Select value'." style="width:100%;" >}}

{{% collapse-content title="Priorité" level="h4" expanded=false %}}

Ajoutez une priorité (facultatif) associée à vos moniteurs. Les valeurs vont de P1 à P5, P1 étant la priorité la plus élevée et P5 la plus basse.
Pour remplacer la priorité du moniteur dans le message de notification, utilisez `{{override_priority 'Pi'}}` where `Pi` est entre P1 et P5.

Par exemple, vous pouvez définir différentes priorités pour `alert` et `warning` notifications :

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

Si la requête du moniteur est groupée, vous pouvez retirer une ou plusieurs dimensions du regroupement de notification, ou les retirer toutes et notifier comme une alerte simple.

{{< img src="monitors/notifications/notifications_aggregation.png" alt="Vue de la configuration d'agrégation définie sur multi-alert." style="width:100%;" >}}

Trouvez plus d'informations sur cette fonctionnalité dans [Configurer les Moniteurs][18]

## Notifications de test {#test-notifications}

Après avoir défini votre moniteur, testez les notifications avec le bouton **Test Notifications** en bas à droite de la page du moniteur.

Les notifications de test sont prises en charge pour les [types de moniteurs][19] : hôte, métrique, anomalie, valeur aberrante, prévision, journaux, rum, apm, intégration (vérification uniquement), processus (vérification uniquement), réseau (vérification uniquement), vérification personnalisée, événement et composite.

1. Dans la fenêtre contextuelle des notifications de test, choisissez la transition du moniteur à tester et le groupe (disponible uniquement si la requête a [regroupement][20]). Vous ne pouvez tester que les états qui sont disponibles dans la configuration du moniteur pour les seuils spécifiés dans les conditions d'alerte. [Seuils de récupération][21] sont une exception, car Datadog envoie une notification de récupération une fois que le moniteur n'est plus en alerte, ou qu'il n'a plus de conditions d'avertissement.

    {{< img src="/monitors/notifications/test_notification_modal.png" alt="Testez les notifications pour ce moniteur" style="width:70%;" >}}

1. Cliquez sur **Exécuter le Test** pour envoyer des notifications aux personnes et aux services listés dans le moniteur.

### Événements {#events}

Les notifications de test produisent des événements qui peuvent être recherchés dans l'explorateur d'événements. Ces notifications indiquent qui a initié le test dans le corps du message avec `[TEST]` dans le titre de la notification.

Les variables de balise ne sont peuplées que dans le texte des événements enfants de Datadog. L'événement parent n'affiche qu'un résumé d'agrégation.

### Variables {#variables-test-notification}

Les variables de message se remplissent automatiquement à partir d'un groupe disponible, sélectionné au hasard, en fonction du contexte de la définition de votre monitor. Exemple :

```text
{{#is_alert}}
{{host.name}} <-- will populate
{{/is_alert}}
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/configuration
[2]: /fr/incident_response/case_management/create_case/#automatic-case-creation
[3]: /fr/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[4]: http://daringfireball.net/projects/markdown/syntax
[5]: /fr/monitors/notify/variables/
[6]: /fr/monitors/notify/variables/#conditional-variables
[8]: /fr/service_management/workflows/
[9]: /fr/service_management/workflows/trigger/#add-a-monitor-trigger-to-your-workflow
[10]: /fr/service_management/workflows/trigger/#add-the-workflow-to-your-monitor
[11]: /fr/service_management/workflows/build/
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