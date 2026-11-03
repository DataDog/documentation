---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/trigger
- /fr/service_management/workflows/trigger
description: Apprenez à déclencher des workflows manuellement ou automatiquement depuis
  des dashboards, des monitors, des signaux de sécurité et d'autres sources.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: Blog
  text: Répondez instantanément aux changements dans vos données avec les règles d'automatisation
    Datadog
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/workflows/access_and_auth/#workflow-identity
  tag: Documentation
  text: En savoir plus sur l'identité utilisée pour exécuter un workflow
- link: dashboards
  tag: Documentation
  text: En savoir plus sur la configuration d'un dashboard
- link: /security
  tag: Documentation
  text: En savoir plus sur les signaux de sécurité
- link: monitors
  tag: Documentation
  text: En savoir plus sur les monitors
- link: /security/cloud_security_management/workflows
  tag: Documentation
  text: Automatisez les workflows de sécurité avec Workflow Automation.
title: Déclencher un workflow
---
Vous pouvez déclencher un workflow manuellement ou automatiquement, et un workflow peut avoir plusieurs déclencheurs. Cela vous permet de déclencher un workflow à partir de diverses sources, comme un monitor Datadog et un dashboard Datadog.

Un workflow s'exécute avec l'identité de son propriétaire, de l'utilisateur qui a déclenché l'exécution ou d'un compte de service associé. Les déclencheurs qui s'activent sans utilisateur, tels que les plannings et les webhooks, nécessitent le propriétaire ou un compte de service. Pour plus d'informations, consultez [Workflow identity][1].

{{< img src="actions/workflows/trigger/multiple-triggers.png" alt="Un workflow avec plusieurs déclencheurs" style="width:100%;" >}}

## Déclencheurs manuels {#manual-triggers}

Pour déclencher un workflow manuellement :
1. Depuis la page du workflow, cliquez sur {{< ui >}}Run{{< /ui >}}.
1. Saisissez les valeurs des variables de déclenchement existantes.
1. Lorsque vous êtes prêt à exécuter le workflow, cliquez sur {{< ui >}}Save & Run{{< /ui >}}.

## Déclencheurs de dashboard {#dashboard-triggers}

Pour déclencher un workflow depuis un dashboard, ajoutez le widget {{< ui >}}Run Workflow{{< /ui >}} :
1. Depuis votre dashboard, cliquez sur {{< ui >}}Add Widget{{< /ui >}}.
1. Recherchez `workflows` et ajoutez le widget {{< ui >}}Run Workflow{{< /ui >}}.
1. Sous {{< ui >}}Select the workflow{{< /ui >}}, recherchez votre workflow dans le menu déroulant. Seuls les workflows publiés avec des déclencheurs de dashboard apparaissent dans la liste.
1. Associez les variables de modèle de dashboard aux paramètres d'entrée du workflow. Cela permet aux valeurs de vos variables de modèle de dashboard d'être mappées directement aux paramètres d'entrée lorsque vous exécutez le workflow.
1. Saisissez un titre pour le widget et cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour exécuter le workflow, procédez comme suit :
1. Cliquez sur {{< ui >}}Run Workflow{{< /ui >}} sur votre widget de dashboard.
1. Sous {{< ui >}}Execution parameters{{< /ui >}}, toutes les variables de modèle que vous avez mappées aux entrées du workflow sont automatiquement renseignées. Saisissez les valeurs des paramètres d'exécution non mappés ou modifiez les valeurs existantes si nécessaire.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour exécuter le workflow.

## Déclencheurs de monitor {#monitor-triggers}

### Ajoutez un déclencheur de monitor à votre workflow {#add-a-monitor-trigger-to-your-workflow}

1. Ajoutez un déclencheur de monitor à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Monitor{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le monitor en tant que déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Monitor{{< /ui >}}.
1. Assurez-vous que le déclencheur est connecté à une étape du workflow. Vous pouvez connecter le déclencheur à une étape en cliquant sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sous le déclencheur et en la faisant glisser.
1. Cliquez sur le déclencheur et prenez note de {{< ui >}}Mention handle{{< /ui >}}.
1. Les déclencheurs de monitor sont configurés pour se déclencher automatiquement par défaut. Si vous ne souhaitez pas que le workflow se déclenche automatiquement, activez ou désactivez l'option {{< ui >}}Automatic triggering{{< /ui >}}.
1. Enregistrez votre workflow.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier votre workflow. Les workflows ne s'exécutent pas automatiquement tant que vous ne les avez pas publiés. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

### Ajoutez le workflow à votre monitor {#add-the-workflow-to-your-monitor}

1. Accédez à la [**Monitors** page][2] dans Datadog.
1. Recherchez le monitor que vous souhaitez utiliser pour déclencher le workflow et modifiez-le, ou créez un nouveau monitor.
1. Dans la section {{< ui >}}Configure notifications & automations{{< /ui >}}, cliquez sur {{< ui >}}\+ Add Workflow{{< /ui >}}.
1. Utilisez le nom de mention du workflow pour rechercher votre workflow et sélectionnez-le dans la liste déroulante. Seuls les workflows avec des déclencheurs de monitor apparaissent dans la liste.<br>Une mention pour le monitor apparaît dans le champ du message de notification, au format `@workflow-name` s'il ne prend aucun paramètre d'entrée ou `@workflow-name(param="")` s'il prend des paramètres d'entrée.
1. Si le workflow prend des paramètres d'entrée :
    1. Cliquez sur {{< ui >}}Configure Inputs{{< /ui >}} à côté du nom et de l'ID du monitor.
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-arrow.png" alt="Un workflow joint avec un lien Configurer les entrées disponible" style="width:100%;" >}}
    1. Enter values for the input parameters.<br>**Note**: Values can include monitor message template variables. To see a list of available variables, click {{< ui >}}Use Message Template Variables{{< /ui >}} in the upper-right of the {{< ui >}}Configure notifications & automations{{< /ui >}} section.
    <br>The parameters populate in the mention within the notification message field.<br>For example, if you configure a workflow named `@workflow-test-inputs` to have the following parameters:
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-modal.png" alt="Panneau Configurer les entrées avec des valeurs définies comme suit : im_a_string sur 'abc', im_a_number sur 123, im_a_boolean activé sur true, et i_have_a_default_value sur 'override this'" style="width:70%;" >}}
        the mention changes to `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. Enregistrez le monitor.

Chaque fois que le seuil du monitor est atteint, le monitor déclenche une exécution de workflow.

### Tester un déclencheur de monitor {#test-a-monitor-trigger}

Consultez la page de test et de débogage pour plus d'informations sur [comment tester un déclencheur de monitor][12].

## Déclencheurs d'incident {#incident-triggers}

Les déclencheurs d'incident peuvent exécuter un workflow automatiquement en fonction des événements d'incident, ou manuellement depuis un incident.

<div class="alert alert-info">Pour configurer des automatisations d'incident dans Incident Management, avec un contexte d'incident intégré et sans facturation supplémentaire, consultez <a href="/incident_response/incident_management/setup_and_configuration/automations">Automatisations d'incident</a>. Utilisez un workflow avec un déclencheur d'incident lorsque les événements d'incident constituent un déclencheur parmi d'autres, ou lorsque le workflow est géré en dehors d'Incident Management.</div>

Pour ajouter un déclencheur d'incident à votre workflow :
1. Depuis la [page de création de workflow][6], faites défiler jusqu'aux options de déclenchement et cliquez sur {{< ui >}}Incident{{< /ui >}}.
1. Sélectionnez le type d'événement d'incident qui doit déclencher votre workflow, par exemple lorsqu'un incident est déclaré ou mis à jour, ou selon un planning récurrent.
   Pour un déclencheur manuel, Workflows crée un identifiant que vous pouvez utiliser dans les monitors ou les [règles de notification d'incident][16].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier votre workflow. Les workflows ne s'exécutent pas tant que vous ne les avez pas publiés. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

## Déclencheurs de sécurité {#security-triggers}

Vous pouvez déclencher un workflow automatiquement pour tout signal de sécurité ou toute découverte de sécurité. Vous pouvez également déclencher un workflow manuellement depuis un panneau de signal de sécurité Cloud SIEM, un panneau de mauvaise configuration ou un panneau de risque d'identité.

**Remarque** : Avant d'ajouter un workflow à un signal ou une découverte de sécurité, le workflow doit disposer d'un déclencheur de sécurité.

### Déclencheurs de règle de notification de sécurité {#security-notification-rule-triggers}

Vous pouvez configurer un workflow pour qu'il se déclenche chaque fois qu'une règle de notification de sécurité envoie une notification pour un signal de sécurité ou une découverte de sécurité.

Pour déclencher un workflow à partir d'une règle de notification, vous devez d'abord ajouter un déclencheur de sécurité à votre workflow :
1. Ajoutez un déclencheur de sécurité à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Security{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur de sécurité en tant que déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Security{{< /ui >}}.
1. Assurez-vous que le déclencheur est connecté à une étape du workflow. Vous pouvez connecter le déclencheur à une étape en cliquant sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sous le déclencheur et en la faisant glisser.
1. Cliquez sur le déclencheur et prenez note de {{< ui >}}Mention handle{{< /ui >}}.
1. Les déclencheurs de sécurité sont configurés pour se déclencher automatiquement par défaut. Si vous ne souhaitez pas que le workflow se déclenche automatiquement, activez ou désactivez l'option {{< ui >}}Automatic triggering{{< /ui >}}.
1. Enregistrez votre workflow.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier votre workflow. Les workflows ne s'exécutent pas automatiquement tant que vous ne les avez pas publiés. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

Ajoutez le workflow à votre règle de notification :
1. Depuis la page [Configuration][3], recherchez la règle de notification que vous souhaitez utiliser pour déclencher votre workflow, ou créez une nouvelle règle.
1. Dans la section {{< ui >}}Recipient{{< /ui >}}, utilisez le nom de mention du workflow pour trouver votre workflow. Par exemple, `@workflow-my-workflow`.
1. Sélectionnez le workflow dans la liste déroulante. Seuls les workflows avec des déclencheurs de sécurité apparaissent dans la liste.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="actions/workflows/trigger/notification-rule-trigger2.png" alt="Ajoutez le nom du workflow à la section des destinataires d'une règle de notification" >}}

Chaque fois que la règle de notification se déclenche, elle lance une exécution de workflow.

### Déclencheurs manuels {#manual-triggers-1}

Vous pouvez démarrer manuellement un workflow à partir d'un panneau de signal de sécurité Cloud SIEM, d'un panneau de mauvaise configuration ou d'un panneau de risque d'identité :

1. Cliquez sur {{< ui >}}Run Workflow{{< /ui >}} dans la zone {{< ui >}}Next Steps{{< /ui >}} en haut du panneau latéral.
1. Dans la fenêtre modale de recherche, saisissez le nom du workflow que vous souhaitez exécuter et sélectionnez-le. Seuls les workflows avec des déclencheurs de sécurité apparaissent dans la liste.
1. Si votre workflow nécessite des paramètres d'entrée, saisissez les valeurs requises. Vous pouvez copier les valeurs du JSON de l'objet affiché à côté des paramètres d'entrée et les coller dans les champs de paramètres.
1. Cliquez sur {{< ui >}}Run{{< /ui >}}.

Vous pouvez voir le statut d'exécution du workflow dans la section {{< ui >}}Workflows{{< /ui >}} du panneau latéral.

Pour d'autres exemples de workflows de sécurité que vous pouvez automatiser, consultez [Automatiser les workflows de sécurité avec Workflow Automation][4].

## Déclencheurs de catalogue {#catalog-triggers}

Pour exécuter un workflow à partir d'une entité de catalogue logiciel, vous devez d'abord ajouter un déclencheur de catalogue logiciel à votre workflow :

1. Ajoutez un déclencheur de catalogue logiciel à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le catalogue logiciel comme déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Catalog{{< /ui >}}.
2. Assurez-vous que le déclencheur est connecté à une étape du workflow. Vous pouvez connecter le déclencheur à une étape en cliquant sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sous le déclencheur et en la faisant glisser.
3. Enregistrez votre workflow.
4. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier votre workflow. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

Exécutez le workflow depuis votre entité de catalogue :

1. Sur la [page Catalogue][14], choisissez une entité dans la liste.
1. Cliquez sur {{< ui >}}Run Workflow{{< /ui >}} en haut du panneau latéral.
1. Dans la fenêtre modale de recherche, saisissez le nom du workflow que vous souhaitez exécuter et sélectionnez-le. Seuls les workflows avec des déclencheurs de catalogue apparaissent dans la liste.
1. Si votre workflow nécessite des paramètres d'entrée, saisissez les valeurs requises.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour exécuter le workflow.

## Déclencheurs GitHub {#github-triggers}

<div class="alert alert-info">Votre compte GitHub doit disposer de l'autorisation de créer des webhooks pour utiliser cette fonctionnalité.</div>

Vous pouvez déclencher un workflow depuis GitHub en suivant les étapes suivantes.

1. Ajoutez un déclencheur GitHub à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}GitHub{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez GitHub comme déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}GitHub{{< /ui >}}.
1. Accédez au dépôt GitHub que vous souhaitez utiliser pour déclencher votre workflow.
1. Dans GitHub, cliquez sur {{< ui >}}Settings{{< /ui >}}, cliquez sur {{< ui >}}Webhooks{{< /ui >}}, puis cliquez sur {{< ui >}}Add webhook{{< /ui >}}.
1. Dans l'onglet {{< ui >}}Configure{{< /ui >}} de votre workflow, copiez le {{< ui >}}Payload URL{{< /ui >}}. Collez-le dans le champ {{< ui >}}Payload URL{{< /ui >}} sur la page de création de webhook GitHub.
1. Dans GitHub, définissez le {{< ui >}}Content type{{< /ui >}} de votre webhook sur `application/json`.
1. Dans GitHub, créez un secret d'au moins 16 caractères, puis copiez ce secret dans le champ {{< ui >}}Secret{{< /ui >}} de votre déclencheur de workflow.
1. Dans GitHub, choisissez les événements qui doivent déclencher votre webhook, puis cliquez sur {{< ui >}}Add webhook{{< /ui >}}.
1. _Optionnellement_, dans votre workflow, cliquez sur {{< ui >}}\+{{< /ui >}} pour ajouter un {{< ui >}}Rate Limit{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} dans votre workflow.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher depuis GitHub. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

## Déclencheurs Slack {#slack-triggers}

<div class="alert alert-info">Vous devez installer l'application Datadog dans votre espace de travail Slack pour utiliser cette fonctionnalité. Pour plus d'informations, consultez <a href="/integrations/slack/?tab=datadogforslack#setup">Configuration de Slack</a>.</div>

<div class="alert alert-info"><strong>Démarrage rapide</strong> : Cliquez pour créer un <a href="https://app.datadoghq.com/workflow/create?source=slack">workflow</a> avec un déclencheur Slack.</div>

Vous pouvez déclencher un workflow depuis Slack manuellement avec la commande `/datadog workflow`, ou automatiquement lorsqu'une réaction emoji est ajoutée à un message ou lorsqu'un message est publié dans un canal.

### Déclencheur Slack manuel {#manual-slack-trigger}

1. Ajoutez un déclencheur Slack à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur Slack comme déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Slack{{< /ui >}}.
1. Assurez-vous que le déclencheur est connecté à une étape du workflow. Vous pouvez connecter le déclencheur à une étape en cliquant sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sous le déclencheur et en la faisant glisser.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} dans votre workflow.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher depuis Slack. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].
1. Dans un canal Slack avec l'application Datadog, exécutez `/datadog workflow` pour sélectionner et exécuter un workflow. Vous pouvez également utiliser l'alias `/dd` pour exécuter les commandes /datadog.

### Déclencheur Slack par réaction emoji {#emoji-reaction-slack-trigger}

Vous pouvez configurer un workflow pour qu'il se déclenche automatiquement lorsqu'un utilisateur ajoute une réaction emoji spécifique à un message dans Slack.

1. Ajoutez un déclencheur Slack à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur Slack comme déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Slack{{< /ui >}}.
1. Dans l'onglet {{< ui >}}Configure{{< /ui >}}, sélectionnez l'espace de travail Slack où vous souhaitez écouter les réactions.
1. Si l'espace de travail nécessite l'autorisation `emoji:read`, cliquez sur {{< ui >}}Enable Permission{{< /ui >}} pour réinstaller l'application Slack avec le périmètre nécessaire.
1. Sélectionnez une ou plusieurs réactions emoji qui déclenchent le workflow.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}, puis sur {{< ui >}}Publish{{< /ui >}}.

### Déclencheur de message Slack {#message-slack-trigger}

Vous pouvez configurer un workflow pour qu'il se déclenche automatiquement lorsqu'un message correspondant à vos règles est publié dans un ou plusieurs canaux Slack.

<div class="alert alert-info">L'application Datadog Slack doit être membre de chaque canal que vous sélectionnez. Les messages publiés par l'application Datadog Slack elle-même ne déclenchent pas de workflows.</div>

1. Ajoutez un déclencheur Slack à votre workflow :
   - Si votre workflow ne possède aucun déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}.
   - Si votre workflow possède déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur Slack comme déclencheur supplémentaire, cliquez sur l'icône {{< ui >}}Add Trigger{{< /ui >}} (éclair) et sélectionnez {{< ui >}}Slack{{< /ui >}}.
1. Dans l'onglet {{< ui >}}Configure{{< /ui >}}, sous {{< ui >}}Message triggers{{< /ui >}}, sélectionnez le {{< ui >}}Workspace{{< /ui >}} Slack.
1. Sélectionnez un ou plusieurs {{< ui >}}Channels{{< /ui >}} à écouter.
1. Choisissez un {{< ui >}}Match type{{< /ui >}} :
   - {{< ui >}}Any message{{< /ui >}} : Chaque message dans les canaux sélectionnés déclenche le workflow.
   - {{< ui >}}Contains text{{< /ui >}} : Le message doit contenir le texte que vous saisissez dans {{< ui >}}Message pattern{{< /ui >}}. La correspondance ne tient pas compte de la casse.
   - {{< ui >}}Matches regular expression{{< /ui >}} : Le message doit correspondre à l'expression régulière que vous saisissez dans {{< ui >}}Message pattern{{< /ui >}}. La correspondance tient compte de la casse, et le motif peut correspondre n'importe où dans le message. Pour faire correspondre le message entier, utilisez `^` et `$`, par exemple `^deploy\s+production$`. Pour ignorer la casse, ajoutez `(?i)` au début du motif.
1. Optionnellement, filtrez les messages pris en compte :
   - {{< ui >}}Thread replies{{< /ui >}} : {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only thread replies{{< /ui >}} ou {{< ui >}}Exclude thread replies{{< /ui >}}.
   - {{< ui >}}App messages{{< /ui >}} : {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only app messages{{< /ui >}} ou {{< ui >}}Exclude app messages{{< /ui >}}.
1. Pour écouter différents motifs ou canaux, cliquez sur {{< ui >}}Add message rule{{< /ui >}}. Si un message correspond à plusieurs règles, le workflow s'exécute une seule fois.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}, puis sur {{< ui >}}Publish{{< /ui >}}.

#### Accédez au message Slack {#access-the-slack-message}

Dans les étapes ultérieures de votre workflow, utilisez `Source.slack_message` pour référencer le message qui a déclenché le workflow :

| Variable | Description |
|---|---|
| `Source.slack_message.text` | Le texte du message. |
| `Source.slack_message.user_id` | L'identifiant Slack de l'utilisateur qui a publié le message, lorsqu'il est présent. |
| `Source.slack_message.channel_id` | L'identifiant Slack du canal dans lequel le message a été publié. |
| `Source.slack_message.team_id` | L'identifiant Slack de l'espace de travail. |
| `Source.slack_message.message_ts` | L'horodatage Slack du message. |
| `Source.slack_message.thread_ts` | L'horodatage Slack du message parent, lorsque le message est une réponse dans un fil de discussion. |
| `Source.slack_message.app_id` | L'identifiant Slack de l'application qui a publié le message, lorsque le message a été publié par une application. |
| `Source.slack_message.bot_id` | L'identifiant Slack du bot qui a publié le message, lorsque le message a été publié par un bot. |

## Déclencheurs d'API {#api-triggers}

Le déclenchement d'un workflow à l'aide d'un appel API nécessite une [clé d'API][8] et une [clé d'application][9] avec le périmètre `workflows_run`. Pour plus d'informations sur l'ajout d'un périmètre à une clé d'application, consultez [Périmètres][10].

<div class="alert alert-info">Les clés sans périmètre n'incluent pas le <code>workflows_run</code> périmètre par défaut. Assurez-vous de suivre les meilleures pratiques de sécurité et d'utiliser une clé d'application avec les périmètres minimaux nécessaires pour effectuer la tâche souhaitée.</div>

Vous pouvez déclencher un workflow en envoyant une requête POST avec l'identifiant du workflow vers l'endpoint `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`. Lorsque vous ajoutez un déclencheur d'API à un workflow, l'interface du déclencheur vous fournit un exemple de requête cURL que vous pouvez utiliser pour déclencher le workflow.

Pour ajouter un déclencheur d'API à un workflow :
1. Cliquez sur {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}API{{< /ui >}}.
1. Sur le canevas du workflow, cliquez sur {{< ui >}}API{{< /ui >}} et notez l'exemple de requête cURL pour le workflow, qui inclut les en-têtes et les données requises pour déclencher votre workflow.

   Une requête cURL pour déclencher un workflow ressemble à ceci:
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   Si le workflow inclut des paramètres d'entrée, incluez-les dans la charge utile de la requête. L'exemple suivant utilise deux paramètres d'entrée, `example_input1` et `example_input2`:

   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d { "meta": { "payload": { \
    "example_input1": "...", \
    "example_input2": "..." \
  } } } \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
   {{< /code-block >}}
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher avec une requête POST. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

### Accédez au corps de la requête API {#access-the-api-request-body}

Dans les étapes ultérieures de votre workflow, utilisez `Source.api.requestBody` pour référencer la charge utile de la requête API entrante. Si le corps de la requête est au format JSON, analysez-le avec `JSON.parse()` avant d'accéder aux champs individuels. Par exemple, utilisez `${JSON.parse(Source.api.requestBody).my_field}` au lieu de `Source.api.requestBody.my_field`.

## Déclencheurs planifiés {#scheduled-triggers}

Pour planifier l'exécution d'un workflow :
1. Sur le canevas du workflow, cliquez sur {{< ui >}}Add an Automated Trigger{{< /ui >}} et sélectionnez {{< ui >}}Schedule{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create{{< /ui >}} pour créer un compte de service. Pour plus d'informations, consultez [Exécuter en tant que compte de service][17].
1. Saisissez une heure et une fréquence pour l'exécution.
1. (Facultatif) Saisissez une description pour le workflow dans le champ {{< ui >}}Memo{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}}. Les workflows planifiés ne s'exécutent pas tant que vous ne les avez pas publiés. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][11].

## Déclencher un workflow à partir d'un workflow {#trigger-a-workflow-from-a-workflow}

Vous pouvez déclencher un workflow enfant à partir d'un autre workflow en utilisant l'action {{< ui >}}Trigger Workflow{{< /ui >}}. Par exemple, si vous avez une série complexe d'étapes que vous devez réutiliser dans plusieurs workflows, il n'est pas nécessaire de recréer ces étapes pour tous vos workflows. Au lieu de cela, ajoutez les étapes à un nouveau workflow et déclenchez-le dans vos autres workflows en utilisant l'action Déclencher le workflow.

<div class="alert alert-info">À des fins de facturation, le déclenchement d'un workflow enfant est comptabilisé comme une nouvelle exécution de workflow.</div>

Si le workflow enfant possède des [paramètres d'entrée][5], ces paramètres apparaissent comme des champs requis dans l'action Déclencher le workflow. Dans l'exemple ci-dessous, le paramètre d'entrée `service_name` est requis car `service_name` est défini comme paramètre d'entrée dans le workflow enfant.

{{< img src="actions/workflows/trigger/trigger-workflow-step.png" alt="Le paramètre d'entrée service_name est requis dans le workflow enfant" style="width:100%;" >}}

### Accéder au résultat d'un workflow enfant {#access-the-result-of-a-child-workflow}

Vous pouvez renvoyer le résultat d'un workflow enfant vers le workflow parent en définissant {{< ui >}}Output parameters{{< /ui >}} dans le workflow enfant. Utilisez la variable de contexte `WorkflowOutputs` dans le workflow parent pour récupérer les paramètres de sortie du workflow enfant. Par exemple, étant donné un workflow enfant nommé `Example_workflow` avec un paramètre de sortie nommé `exampleList`, utilisez `Steps.Example_workflow.workflowOutputs.exampleList` pour accéder au résultat du workflow enfant.

## Historique d'exécution {#run-history}

Après avoir déclenché un workflow, la page du workflow passe à la {{< ui >}}Run History{{< /ui >}} du workflow. Cliquez sur {{< ui >}}Configuration{{< /ui >}} ou {{< ui >}}Run History{{< /ui >}} en haut à gauche pour basculer entre les vues de configuration et d'historique d'exécution. Utilisez l'historique d'exécution pour suivre la progression d'un workflow déclenché ou [déboguer une étape ayant échoué][13].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal {{< ui >}}#workflows{{< /ui >}} sur le [Slack de la communauté Datadog][7].

[1]: /fr/actions/workflows/access_and_auth/#workflow-identity
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /fr/security/cloud_security_management/workflows
[5]: /fr/actions/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/workflow/create
[7]: https://chat.datadoghq.com/
[8]: /fr/account_management/api-app-keys/#api-keys
[9]: /fr/account_management/api-app-keys/#application-keys
[10]: /fr/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /fr/actions/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /fr/actions/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software
[15]: /fr/incident_response/incident_management/setup_and_configuration/automations
[16]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules/
[17]: /fr/actions/workflows/access_and_auth/#run-as-a-service-account