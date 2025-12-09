---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/trigger
- /fr/service_management/workflows/trigger
description: Découvrez comment déclencher des workflows manuellement ou automatiquement
  depuis des dashboards, des monitors, des signaux de sécurité et d'autres sources.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: Blog
  text: Répondre instantanément aux modifications de vos données avec les règles d'automatisation
    Datadog
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/workflows/access_and_auth/#use-a-service-account
  tag: Documentation
  text: En savoir plus sur les comptes de service pour les workflows
- link: serverless_aws_lambda
  tag: Documentation
  text: En savoir plus sur la configuration d'un dashboard
- link: /security
  tag: Documentation
  text: En savoir plus sur les signaux de sécurité
- link: notebooks
  tag: Documentation
  text: En savoir plus sur les monitors
- link: /security/cloud_security_management/workflows
  tag: Documentation
  text: Automatiser les workflows de sécurité avec Workflow Automation
title: Déclencher un workflow
---

Vous pouvez déclencher un workflow manuellement ou automatiquement et un workflow peut avoir plusieurs déclencheurs. Cela vous permet de déclencher un workflow depuis diverses sources différentes, comme un monitor Datadog et un dashboard Datadog.

Un workflow peut soit s'exécuter avec l'identité de l'utilisateur qui en est propriétaire, soit avec l'identité d'un compte de service associé au workflow. Pour obtenir plus d'informations sur les comptes de service, consultez la section [Comptes de service pour Workflow Automation][1].

{{< img src="service_management/workflows/multiple-triggers.png" alt="Un workflow avec plusieurs déclencheurs" style="width:100%;" >}}

## Déclencheurs manuels

Pour déclencher un workflow manuellement :
1. Depuis la page du workflow, cliquez sur **Run**.
1. Saisissez les valeurs pour les variables de déclencheur existantes.
1. Lorsque vous êtes prêt à exécuter le workflow, cliquez sur **Save & Run**.

## Déclencheurs de dashboard

Pour déclencher un workflow depuis un dashboard, ajoutez le widget **Run Workflow** :
1. Depuis votre dashboard, cliquez sur **Add Widget**.
1. Recherchez `workflows` et ajoutez le widget **Run Workflow**.
1. Sous **Select the workflow**, trouvez votre workflow dans le menu déroulant. Seuls les workflows publiés avec des déclencheurs de dashboard apparaissent dans la liste.
1. Mappez des template variables de dashboard aux paramètres d'entrée de votre workflow. De cette manière, les valeurs de vos template variables de dashboard sont associées directement aux paramètres d'entrée lors de l'exécution du workflow.
1. Attribuez un titre au widget, puis cliquez sur **Save**.

Pour exécuter le workflow, procédez comme suit :
1. Cliquez sur **Run Workflow** dans votre widget de dashboard.
1. Les template variables que vous avez mappées aux entrées du workflow s'affichent automatiquement sous **Execution parameters**. Saisissez les valeurs des paramètres d'exécution qui ne sont pas mappés ou modifiez des valeurs existantes si nécessaire.
1. Cliquez sur **Run** pour exécuter le workflow.

## Déclencheurs de monitor

### Ajouter un déclencheur de monitor à votre workflow

1. Ajoutez un déclencheur de monitor à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger** > **Monitor**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez le monitor comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **Monitor**.
1. Assurez-vous que le déclencheur est connecté à une étape dans le workflow. Vous pouvez connecter le déclencheur à une étape en cliquant et en faisant glisser l'icône plus (**+**) sous le déclencheur.
1. Cliquez sur le déclencheur et prenez note du **Mention handle**.
1. Les déclencheurs de monitor sont configurés pour se déclencher automatiquement par défaut. Si vous ne souhaitez pas que le workflow se déclenche automatiquement, basculez l'option **Automatic triggering**.
1. Enregistrez votre workflow.
1. Cliquez sur **Publish** pour publier votre workflow. Les workflows ne s'exécutent pas automatiquement tant que vous ne les avez pas publiés. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

### Ajouter le workflow à votre monitor

1. Accédez à la page [**Monitors**][2] dans Datadog.
1. Trouvez le monitor que vous souhaitez utiliser pour déclencher le workflow et modifiez-le, ou créez un nouveau monitor.
1. Dans la section **Configure notifications & automations**, cliquez sur **+ Add Workflow**.
1. Utilisez le nom de mention du workflow pour rechercher votre workflow et sélectionnez-le dans le menu déroulant. Seuls les workflows avec des déclencheurs de monitor apparaissent dans la liste.<br>Une mention pour le monitor apparaît dans le champ de message de notification, au format `@workflow-name` s'il ne prend aucun paramètre d'entrée ou `@workflow-name(param="")` s'il prend des paramètres d'entrée.
1. Si le workflow prend des paramètres d'entrée :
    1. Cliquez sur **Configure Inputs** à côté du nom et de l'ID du monitor.
        {{< img src="service_management/workflows/monitor-configure-inputs-arrow.png" alt="Un workflow attaché avec un lien Configure Inputs disponible" style="width:100%;" >}}
    1. Saisissez les valeurs pour les paramètres d'entrée.<br>**Remarque** : les valeurs peuvent inclure des variables de modèle de message de monitor. Pour voir une liste des variables disponibles, cliquez sur **Use Message Template Variables** dans le coin supérieur droit de la section **Configure notifications & automations**. 
    <br>Les paramètres se remplissent dans la mention dans le champ de message de notification.<br>Par exemple, si vous configurez un workflow nommé `@workflow-test-inputs` pour avoir les paramètres suivants :
        {{< img src="service_management/workflows/monitor-configure-inputs-modal.png" alt="Panneau Configure Inputs avec les valeurs définies comme suit : im_a_string sur 'abc', im_a_number sur 123, im_a_boolean basculé sur true, et i_have_a_default_value sur 'override this'" style="width:70%;" >}}
        la mention devient `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. Enregistrez le monitor.

Chaque fois que le seuil du monitor est atteint, le monitor déclenche une exécution de workflow.

### Tester un déclencheur de monitor

Consultez la page de test et de débogage pour obtenir des informations sur [comment tester un déclencheur de monitor][12].

## Déclencheurs d'incident

Pour déclencher un workflow depuis une règle de notification d'incident, vous devez d'abord ajouter un déclencheur d'incident à votre workflow :
1. Ajoutez un déclencheur d'incident à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger** > **Incident**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur de sécurité comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **Incident**.
1. Assurez-vous que le déclencheur est connecté à une étape dans le workflow. Vous pouvez connecter le déclencheur à une étape en cliquant et en faisant glisser l'icône plus (**+**) sous le déclencheur.
1. Cliquez sur le déclencheur et prenez note du **Mention handle**.
1. Les déclencheurs d'incident sont configurés pour se déclencher automatiquement par défaut. Si vous ne souhaitez pas que le workflow se déclenche automatiquement, basculez l'option **Automatic triggering**.
1. Enregistrez votre workflow.
1. Cliquez sur **Publish** pour publier votre workflow. Les workflows ne s'exécutent pas automatiquement tant que vous ne les avez pas publiés. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

Ajoutez le workflow à votre règle de notification d'incident :
1. Sur la page [Incidents Settings][6], sélectionnez **Rules**.
1. Cliquez sur **New Rule**.
1. Configurez une **Severity**, un **Service** et d'**Other attributes** pour votre règle de notification.
1. Sous **Notify**, collez le handle du workflow que vous avez copié précédemment.
1. Dans la section **Recipient**, utilisez le nom de mention du workflow pour trouver votre workflow. Par exemple, `@workflow-my-workflow`. Le workflow doit avoir un déclencheur d'incident avant que vous puissiez le déclencher depuis un incident.
1. Saisissez un **Template** et configurez les paramètres **Renotify** pour la règle de notification.
1. Cliquez sur **Save**.

## Déclencheurs de sécurité

Vous pouvez déclencher un workflow automatiquement pour tout Security Signal, ou déclencher manuellement un workflow depuis un panneau de Security Signal Cloud SIEM. Avant de pouvoir ajouter un workflow à un Security Signal, le workflow doit avoir un déclencheur de sécurité.

### Déclencheurs de règle de notification de Security Signal

Vous pouvez configurer un workflow pour qu'il se déclenche chaque fois qu'une règle de notification de Security Signal se déclenche.

Pour déclencher un workflow depuis une règle de notification, vous devez d'abord ajouter un déclencheur de sécurité à votre workflow :
1. Ajoutez un déclencheur de sécurité à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger** > **Security**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur de sécurité comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **Security**.
1. Assurez-vous que le déclencheur est connecté à une étape dans le workflow. Vous pouvez connecter le déclencheur à une étape en cliquant et en faisant glisser l'icône plus (**+**) sous le déclencheur.
1. Cliquez sur le déclencheur et prenez note du **Mention handle**.
1. Les déclencheurs de sécurité sont configurés pour se déclencher automatiquement par défaut. Si vous ne souhaitez pas que le workflow se déclenche automatiquement, basculez l'option **Automatic triggering**.
1. Enregistrez votre workflow.
1. Cliquez sur **Publish** pour publier votre workflow. Les workflows ne s'exécutent pas automatiquement tant que vous ne les avez pas publiés. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

Ajoutez le workflow à votre règle de notification :
1. Depuis la page [Configuration][3], trouvez la règle de notification que vous souhaitez utiliser pour déclencher votre workflow, ou créez une nouvelle règle.
1. Dans la section **Recipient**, utilisez le nom de mention du workflow pour trouver votre workflow. Par exemple, `@workflow-my-workflow`.
1. Sélectionnez le workflow dans le menu déroulant. Seuls les workflows avec des déclencheurs de sécurité apparaissent dans la liste.
1. Cliquez sur **Save**.

{{< img src="service_management/workflows/notification-rule-trigger2.png" alt="Ajoutez le nom du workflow à la section recipient d'une règle de notification" >}}

Chaque fois que la règle de notification se déclenche, elle déclenche une exécution de workflow.

### Déclencheurs de Security Signal Cloud SIEM

Vous pouvez démarrer manuellement un workflow depuis un panneau de Security Signal Cloud SIEM.

1. Cliquez sur **Run Workflow** en haut du panneau **Security Signal**.
1. Dans la fenêtre de recherche, saisissez le nom du workflow que vous souhaitez exécuter et sélectionnez-le. Seuls les workflows avec des déclencheurs de sécurité apparaissent dans la liste.
1. Si votre workflow nécessite des paramètres d'entrée, saisissez les valeurs comme requis. Vous pouvez copier les valeurs depuis le JSON de l'objet Signal affiché à côté des paramètres d'entrée, et les coller dans les champs de paramètres.
1. Cliquez sur **Run**.
1. Vous pouvez voir le statut d'exécution du workflow dans la section **Workflow** du Security Signal.

Pour obtenir des exemples supplémentaires de workflows de sécurité que vous pouvez automatiser, consultez la section [Automatiser les workflows de sécurité avec Workflow Automation][4].

## Déclencheurs de Software Catalog

Pour exécuter un workflow depuis une entité de Software Catalog, vous devez d'abord ajouter un déclencheur de Software Catalog à votre workflow :

1. Ajoutez un déclencheur de Software Catalog à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger** > **Software Catalog**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez le Software Catalog comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **Software Catalog**.
2. Assurez-vous que le déclencheur est connecté à une étape dans le workflow. Vous pouvez connecter le déclencheur à une étape en cliquant et en faisant glisser l'icône plus (**+**) sous le déclencheur.
3. Enregistrez votre workflow.
4. Cliquez sur **Publish** pour publier votre workflow. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

Exécutez le workflow depuis votre entité Software Catalog :

1. Sur la [page Software Catalog][14], choisissez une entité dans la liste.
1. Cliquez sur **Run Workflow** en haut du panneau latéral.
1. Dans la fenêtre de recherche, saisissez le nom du workflow que vous souhaitez exécuter et sélectionnez-le. Seuls les workflows avec des déclencheurs Software Catalog apparaissent dans la liste.
1. Si votre workflow nécessite des paramètres d'entrée, saisissez les valeurs comme requis.
1. Cliquez sur **Run** pour exécuter le workflow.

## Déclencheurs GitHub

<div class="alert alert-info">Votre compte GitHub doit avoir l'autorisation de créer des webhooks pour utiliser cette fonctionnalité.</div>

Vous pouvez déclencher un workflow depuis GitHub en suivant les étapes suivantes.

1. Ajoutez un déclencheur GitHub à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger > GitHub**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez GitHub comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **GitHub**.
1. Accédez au référentiel GitHub que vous souhaitez utiliser pour déclencher votre workflow.
1. Dans GitHub, cliquez sur **Settings**, cliquez sur **Webhooks**, puis cliquez sur **Add webhook**.
1. Dans l'onglet **Configure** de votre workflow, copiez la **Payload URL**. Collez-la dans le champ **Payload URL** sur la page de création de webhook GitHub. 
1. Dans GitHub, définissez le **Content type** de votre webhook sur `application/json`.
1. Dans GitHub, créez un secret d'au moins 16 caractères, puis copiez ce secret dans le champ **Secret** de votre déclencheur de workflow.
1. Dans GitHub, choisissez les événements que vous souhaitez qui déclenchent votre webhook, puis cliquez sur **Add webhook**.
1. _Facultativement_, dans votre workflow, cliquez sur le **plus** (+) pour ajouter une **Rate Limit**.
1. Cliquez sur **Save** sur votre workflow.
1. Cliquez sur **Publish** pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher depuis GitHub. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11]. 

## Déclencheurs Slack

<div class="alert alert-info">Vous devez installer l'application Datadog dans votre espace de travail Slack pour utiliser cette fonctionnalité. Pour obtenir plus d'informations, consultez la section <a href="/integrations/slack/?tab=datadogforslack#setup">Configuration de Slack</a>.</div>

<div class="alert alert-info"><strong>Démarrage rapide</strong> : Cliquez pour créer un <a href="https://app.datadoghq.com/workflow/create?source=slack">workflow</a> avec un déclencheur Slack.</div>

Vous pouvez déclencher un workflow depuis Slack en suivant les étapes suivantes.

1. Ajoutez un déclencheur Slack à votre workflow :
   - Si votre workflow n'a aucun déclencheur, cliquez sur **Add Trigger** > **Slack**.
   - Si votre workflow a déjà un ou plusieurs déclencheurs et que vous ajoutez le déclencheur Slack comme déclencheur supplémentaire, cliquez sur l'icône **Add Trigger** (éclair) et sélectionnez **Slack**.
1. Assurez-vous que le déclencheur est connecté à une étape dans le workflow. Vous pouvez connecter le déclencheur à une étape en cliquant et en faisant glisser l'icône plus (**+**) sous le déclencheur.
1. Cliquez sur **Save** sur votre workflow.
1. Cliquez sur **Publish** pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher depuis Slack. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].
1. Dans un canal Slack avec l'application Datadog, exécutez `/datadog workflow` pour sélectionner et exécuter un workflow. Vous pouvez également utiliser l'alias `/dd` pour exécuter les commandes /datadog.

## Déclencheurs d'API

Déclencher un workflow à l'aide d'un appel d'API nécessite une [clé d'API][8] et une [clé d'application][9] avec la portée `workflows_run`. Pour obtenir des informations sur l'ajout d'une portée à une clé d'application, consultez la section [Portées][10].

<div class="alert alert-info">Les clés sans portée n'incluent pas la portée <code>workflows_run</code> par défaut. Assurez-vous de suivre les bonnes pratiques de sécurité et d'utiliser une clé d'application avec les portées minimales nécessaires pour effectuer la tâche souhaitée.</div>

Vous pouvez déclencher un workflow en envoyant une requête POST avec l'ID du workflow vers l'endpoint `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`. Lorsque vous ajoutez un déclencheur d'API à un workflow, l'interface du déclencheur vous donne un exemple de requête cURL que vous pouvez utiliser pour déclencher le workflow.

Pour ajouter un déclencheur d'API à un workflow :
1. Cliquez sur **Add Trigger** > **API**.
1. Sur le canevas du workflow, cliquez sur **API** et notez l'exemple de requête cURL du workflow, qui inclut les en-têtes et les données requis pour déclencher votre workflow.

   Une requête cURL pour déclencher un workflow ressemble à quelque chose comme ceci :
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   Si le workflow inclut des paramètres d'entrée, incluez-les dans la charge utile de la requête. L'exemple suivant utilise deux paramètres d'entrée, `example_input1` et `example_input2` :

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
1. Cliquez sur **Save**.
1. Cliquez sur **Publish** pour publier le workflow. Un workflow doit être publié avant que vous puissiez le déclencher avec une requête POST. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

## Déclencheurs planifiés

Pour planifier une exécution de workflow :
1. Sur le canevas du workflow, cliquez sur **Add an Automated Trigger** et sélectionnez **Schedule**.
1. Cliquez sur **Create** pour créer un compte de service. Pour obtenir plus d'informations, consultez la section [Utiliser un compte de service][1].
1. Saisissez une heure et une fréquence pour l'exécution.
1. (Facultatif) Saisissez une description pour le workflow dans le champ **Memo**.
1. Cliquez sur **Save**.
1. Cliquez sur **Publish**. Les workflows planifiés ne s'exécutent pas tant que vous ne les avez pas publiés. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][11].

## Déclencher un workflow depuis un workflow

Vous pouvez déclencher un workflow enfant depuis un autre workflow à l'aide de l'action **Trigger Workflow**. Par exemple, si vous avez une série complexe d'étapes que vous devez réutiliser dans plusieurs workflows, il n'est pas nécessaire de recréer ces étapes pour tous vos workflows. Au lieu de cela, ajoutez les étapes à un nouveau workflow et déclenchez-le dans vos autres workflows à l'aide de l'action Trigger Workflow.

<div class="alert alert-info">À des fins de facturation, déclencher un workflow enfant s'enregistre comme une nouvelle exécution de workflow.</div>

Si le workflow enfant a des [paramètres d'entrée][5], ces paramètres apparaissent comme des champs obligatoires dans l'action Trigger Workflow. Dans l'exemple ci-dessous, le paramètre d'entrée **service_name** est obligatoire car `service_name` est défini comme paramètre d'entrée dans le workflow enfant.

{{< img src="service_management/workflows/trigger-workflow-step.png" alt="Le paramètre d'entrée service_name est obligatoire dans le workflow enfant" style="width:100%;" >}}

### Accéder au résultat d'un workflow enfant

Vous pouvez transmettre le résultat d'un workflow enfant au workflow parent en définissant des **Output parameters** dans le workflow enfant. Utilisez la variable de contexte `WorkflowOutputs` dans le workflow parent pour récupérer les paramètres de sortie du workflow enfant. Par exemple, étant donné un workflow enfant nommé `Example_workflow` avec un paramètre de sortie nommé `exampleList`, utilisez `Steps.Example_workflow.workflowOutputs.exampleList` pour accéder au résultat du workflow enfant.

## Historique d'exécution

Après avoir déclenché un workflow, la page du workflow bascule vers le **Run History** du workflow. Cliquez sur **Configuration** ou **Run History** en haut à gauche pour basculer entre les vues de configuration et d'historique d'exécution. Utilisez l'historique d'exécution pour suivre la progression d'un workflow déclenché ou [déboguer une étape ayant échoué][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][7].

[1]: /fr/actions/workflows/access_and_auth/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /fr/security/cloud_security_management/workflows
[5]: /fr/service_management/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/incidents/settings#Rules
[7]: https://datadoghq.slack.com/
[8]: /fr/account_management/api-app-keys/#api-keys
[9]: /fr/account_management/api-app-keys/#application-keys
[10]: /fr/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /fr/service_management/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /fr/service_management/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software