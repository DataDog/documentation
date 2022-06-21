---
title: Configurer le tracing sur un workflow CircleCI
kind: documentation
further_reading:
    - link: /continuous_integration/explore_pipelines
      tag: Documentation
      text: Explorer les résultats et les performances de l'exécution du pipeline
    - link: /continuous_integration/setup_pipelines/custom_commands/
      tag: Documentation
      text: Gagner en visibilité sur les pipelines en traçant des commandes individuelles
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Dépannage CI
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">À l'heure actuelle, la solution CI Visibility n'est pas disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Configurer l'intégration Datadog

L'intégration Datadog pour [CircleCI][1] utilise des [webhooks][2] pour envoyer des données à Datadog.

1. Pour chaque projet, accédez à **Project Settings > Webhooks** dans CircleCI et ajoutez un nouveau webhook :
   * **Webhook URL** : <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/?dd-api-key=<CLÉ_API></code>, où `<CLÉ_API>` correspond à votre [clé d'API Datadog][3].
   * **Name** : `Datadog CI Visibility` ou tout autre nom d'identificateur que vous souhaitez fournir.
   * **Events** : sélectionnez `Workflow Completed` et `Job Completed`.
   * **Certificate verifications** : activez ce check.

2. Cliquez sur **Add Webhook** pour enregistrer le nouveau webhook.

### Définir des tags personnalisés
Pour appliquer des tags personnalisés à l'ensemble des spans de pipeline et de tâche générées par l'intégration, ajoutez à **Webhook URL** un paramètre de requête `tags` encodé dans l'URL, avec des paires `key:value` séparées par des virgules. Si une paire key:value contient une virgule, placez la paire entre guillemets. Par exemple, pour ajouter `key1:value1,"key2: value with , comma",key3:value3`, vous devez ajouter la chaîne suivante à la fin de l'**URL de webhook** :

`?tags=key1%3Avalue1%2C%22key2%3A+value+with+%2C+comma%22%2Ckey3%3Avalue3`

## Visualiser des données de pipeline dans Datadog

Les pages [Pipelines][4] et [Pipeline Executions][5] affichent des données après l'exécution des workflows.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://circleci.com/
[2]: https://circleci.com/docs/2.0/webhooks
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
