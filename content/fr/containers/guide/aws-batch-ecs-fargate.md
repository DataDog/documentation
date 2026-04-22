---
aliases:
- /fr/integrations/faq/aws-batch-ecs-fargate
- /fr/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: Déployer l'Agent Datadog aux côtés des tâches AWS Batch s'exécutant sur
  ECS Fargate pour une surveillance complète
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: Documentation
  text: Amazon ECS sur AWS Fargate avec AWS Batch
title: AWS Batch avec ECS Fargate et l'Agent Datadog
---

Vous pouvez exécuter l'Agent Datadog aux côtés de vos conteneurs de tâches AWS Batch en ajoutant le conteneur à votre définition de tâche.

## Prérequis

* Environnement de calcul AWS Batch
* File d'attente de tâches AWS Batch associée à un environnement de calcul

## Créer la définition de tâche

{{< tabs >}}
{{% tab "Interface Web AWS" %}}

1. Connectez-vous à votre [console Web AWS][1] et accédez à la section AWS Batch.
2. Cliquez sur **Job Definitions** dans le menu de gauche, puis cliquez sur le bouton **Create** ou choisissez une définition de tâche AWS Batch existante.
3. Pour les nouvelles définitions de tâche :
    1. Sélectionnez **Fargate** comme type d'orchestration.
    2. Désélectionnez l'option **Use legacy containerProperties structure**.
    3. Saisissez un **Job Definition Name**, tel que `my-app-and-datadog`.
    4. Sélectionnez un rôle IAM d'exécution. Consultez la section [Créer ou modifier votre stratégie IAM](#creer-ou-modifier-votre-strategie-iam) ci-dessous pour connaître les exigences d'autorisation.
    5. Activez **Assign public IP** pour autoriser l'accès réseau sortant, puis cliquez sur le bouton **Next**.
    6. Configurez le conteneur de l'Agent Datadog.
        1. Pour le champ **Container name**, saisissez `datadog-agent`.
        2. Pour **Image**, saisissez `public.ecr.aws/datadog/agent:latest`.
        3. Configurez les exigences de ressources **CPU** et **Memory** en fonction de vos besoins.
        4. Pour **Env Variables**, ajoutez la **Key** `DD_API_KEY` et saisissez votre [clé d'API Datadog][2] comme valeur.
        5. Ajoutez une autre variable d'environnement avec la **clé** `ECS_FARGATE` et la valeur `true`. Cliquez sur **Add** pour ajouter le conteneur.
        6. Ajoutez une autre variable d'environnement en utilisant la **clé** `DD_SITE` et la valeur {{< region-param key="dd_site" code="true" >}}. Le site `datadoghq.com` est utilisé par défaut si vous ne le définissez pas.
    7. Ajoutez vos autres conteneurs d'application à la définition de tâche.
    8. AWS Batch prend en charge [Fluent Bit et Firelens][3]. Pour activer la collecte de logs pour vos conteneurs d'application avec Datadog :
       1. Créez un conteneur de routeur de log distinct dans la définition de tâche.
       2. Configurez l'image `amazon/aws-for-fluent-bit:stable"` pour le conteneur.
       3. Dans la section Firelens Configuration :
          - Configurez le **Type** sur `fluentbit`.
          - Configurez les **Options** pour inclure `enable-ecs-log-metadata` défini sur `true` pour **Name** et **Value** respectivement
       4. Pour vos conteneurs d'application, dans la section Log Configuration :
          - Configurez le **Log Driver** sur `awsfirelens`
          - Configurez les **Options** pour inclure les **Name** et **Value** suivants de manière similaire à l'étape 2 de la section [ECS Fargate Fluent Bit et Firelens][4]
    10. Cliquez sur **Create job definition** pour créer la définition de tâche.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Téléchargez [datadog-agent-aws-batch-ecs-fargate.json][1].

   **Remarque** : si vous utilisez Internet Explorer, cela peut être téléchargé sous forme de fichier gzip, qui contient le fichier JSON mentionné ci-dessous.
2. Mettez à jour le JSON avec un `JOB_DEFINITION_NAME`, votre [clé d'API Datadog][2] et le `DD_SITE` approprié ({{< region-param key="dd_site" code="true" >}}).

   **Remarque** : la variable d'environnement `ECS_FARGATE` est déjà définie sur `"true"`.
3. Ajoutez vos autres conteneurs d'application à la définition de tâche.
4. AWS Batch prend en charge [Fluent Bit et Firelens][3]. Pour activer la collecte de logs pour vos conteneurs d'application avec Datadog :
   - Dans le fichier JSON, ajoutez un conteneur `log_router` supplémentaire avec ce qui suit dans la section `containers` :
     ```json
      {
          "name": "log_router",
          "image": "amazon/aws-for-fluent-bit:stable",
          "essential": true,
          "firelensConfiguration": {
              "type": "fluentbit",
              "options": {
                  "enable-ecs-log-metadata": "true"
              }
          },
          "resourceRequirements": [
              {
                  "value": "0.25",
                  "type": "VCPU"
              },
              {
                  "value": "512",
                  "type": "MEMORY"
              }
          ]
      }
     ```
   - Dans vos conteneurs d'application, ajoutez les options `logConfiguration` pertinentes de manière similaire à l'étape 2 de la section [ECS Fargate Fluent Bit et Firelens][4]
5. Exécutez la commande suivante pour enregistrer la définition de tâche :

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## Soumettre la tâche AWS Batch

{{< tabs >}}
{{% tab "Interface Web AWS" %}}

1. Connectez-vous à votre [console Web AWS][1] et accédez à la section AWS Batch. Si nécessaire, créez un [environnement de calcul][2] et/ou une [file d'attente de tâches][3] associée à un environnement de calcul.
2. Dans l'onglet **Jobs**, cliquez sur le bouton **Submit new job**.
3. Saisissez un **Job name**.
4. Pour **Job Definition**, sélectionnez la tâche créée dans les étapes précédentes.
5. Choisissez la file d'attente de tâches sur laquelle exécuter l'Agent Datadog.
6. Les **Container overrides** sont facultatifs selon votre préférence.
7. Cliquez sur le bouton **Next**, puis cliquez sur le bouton **Create job**.

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Exécutez la commande suivante pour soumettre une tâche pour votre définition de tâche :

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}