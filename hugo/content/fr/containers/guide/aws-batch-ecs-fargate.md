---
aliases:
- /fr/integrations/faq/aws-batch-ecs-fargate
- /fr/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: Déployez le Datadog Agent avec les jobs AWS Batch s'exécutant sur ECS
  Fargate pour une surveillance complète.
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: Documentation
  text: Amazon ECS sur AWS Fargate avec AWS Batch
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: Architecture Center
  text: Utilisation de Datadog avec ECS Fargate
title: AWS Batch avec ECS Fargate et le Datadog Agent
---
Vous pouvez exécuter le Datadog Agent avec vos conteneurs de job AWS Batch en ajoutant le conteneur à votre définition de job.

## Prérequis {#prerequisites}

* Environnement de calcul AWS Batch
* File d'attente de jobs AWS Batch associée à un environnement de calcul

## Créez la définition de job {#create-the-job-definition}

{{< tabs >}}
{{% tab "Interface Web AWS" %}}

1. Connectez-vous à votre [Console Web AWS][1] et accédez à la section AWS Batch.
2. Cliquez sur {{< ui >}}Job Definitions{{< /ui >}} dans le menu de gauche, puis cliquez sur le bouton {{< ui >}}Create{{< /ui >}} ou choisissez une définition de job AWS Batch existante.
3. Pour les nouvelles définitions de job :
    1. Sélectionnez {{< ui >}}Fargate{{< /ui >}} comme type d'orchestration.
    2. Désélectionnez l'option {{< ui >}}Use legacy containerProperties structure{{< /ui >}}. 
    3. Saisissez un {{< ui >}}Job Definition Name{{< /ui >}}, tel que `my-app-and-datadog`.
    4. Sélectionnez un rôle IAM d'exécution. Consultez les exigences en matière d'autorisations dans la section [Créer ou modifier votre politique IAM](#create-or-modify-your-iam-policy) ci-dessous.
    5. Activez {{< ui >}}Assign public IP{{< /ui >}} pour autoriser l'accès réseau sortant, puis cliquez sur le bouton {{< ui >}}Next{{< /ui >}}.
    6. Configurez le conteneur du Datadog Agent.
        1. Pour {{< ui >}}Container name{{< /ui >}} saisissez `datadog-agent`.
        2. Pour {{< ui >}}Image{{< /ui >}} saisissez `public.ecr.aws/datadog/agent:latest`.
        3. Configurez les besoins en ressources pour {{< ui >}}CPU{{< /ui >}} et {{< ui >}}Memory{{< /ui >}} en fonction de vos besoins.
        4. Pour {{< ui >}}Env Variables{{< /ui >}}, ajoutez {{< ui >}}Key{{< /ui >}} `DD_API_KEY` et saisissez votre [clé d'API Datadog][2] comme valeur.
        5. Ajoutez une autre variable d'environnement en utilisant {{< ui >}}Key{{< /ui >}} `ECS_FARGATE` et la valeur `true`. Cliquez sur {{< ui >}}Add{{< /ui >}} pour ajouter le conteneur.
        6. Ajoutez une autre variable d'environnement en utilisant {{< ui >}}Key{{< /ui >}} `DD_SITE` et la valeur {{< region-param key="dd_site" code="true" >}}. La valeur par défaut est `datadoghq.com` si vous ne la définissez pas.
    7. Ajoutez vos autres conteneurs d'application à la définition de job.
    8. AWS Batch prend en charge [Fluent Bit et Firelens][3]. Pour activer la collecte de logs pour vos conteneurs d'application avec Datadog :
       1. Créez un conteneur de routage de logs distinct dans la définition de job.
       2. Configurez l'image `amazon/aws-for-fluent-bit:stable"` pour le conteneur.
       3. Dans la section Firelens Configuration :
          - Configurez {{< ui >}}Type{{< /ui >}} sur `fluentbit`.
          - Configurez {{< ui >}}Options{{< /ui >}} pour inclure `enable-ecs-log-metadata` défini sur `true` pour {{< ui >}}Name{{< /ui >}} et {{< ui >}}Value{{< /ui >}} respectivement
       4. Pour vos conteneurs d'application, dans la section Log Configuration :
          - Configurez {{< ui >}}Log Driver{{< /ui >}} sur `awsfirelens`
          - Configurez {{< ui >}}Options{{< /ui >}} pour inclure les {{< ui >}}Name{{< /ui >}} et {{< ui >}}Value{{< /ui >}} suivants, comme à l'étape 2 de la [section ECS Fargate Fluent Bit et Firelens][4]
    10. Cliquez sur {{< ui >}}Create job definition{{< /ui >}} pour créer la définition de job.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Téléchargez [datadog-agent-aws-batch-ecs-fargate.json][1]. 

   **Remarque** : Si vous utilisez Internet Explorer, ce fichier peut être téléchargé en tant que fichier gzip, qui contient le fichier JSON mentionné ci-dessous.
2. Mettez à jour le JSON avec un `JOB_DEFINITION_NAME`, votre [clé d'API Datadog][2] et le `DD_SITE` approprié ("{{< region-param key="dd_site" code="true" >}}).

   **Remarque** : La variable d'environnement `ECS_FARGATE` est déjà définie sur `"true"`.
3. Ajoutez vos autres conteneurs d'application à la définition de job.
4. AWS Batch prend en charge [Fluent Bit et Firelens][3]. Pour activer la collecte de logs pour vos conteneurs d'application avec Datadog :
   - Dans le fichier JSON, ajoutez un conteneur `log_router` supplémentaire avec ce qui suit dans la section `containers` :
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
   - Dans vos conteneurs d'application, ajoutez les options `logConfiguration` pertinentes de manière similaire à l'étape 2 de la [section ECS Fargate Fluent Bit et Firelens][4]
5. Exécutez la commande suivante pour enregistrer la définition de job :

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/fr/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/fr/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## Soumettez le job AWS Batch {#submit-the-aws-batch-job}

{{< tabs >}}
{{% tab "Interface Web AWS" %}}

1. Connectez-vous à votre [Console Web AWS][1] et accédez à la section AWS Batch. Si nécessaire, créez un [environnement de calcul][2] et/ou une [file d'attente de jobs][3] associée à un environnement de calcul.
2. Sur l'onglet {{< ui >}}Jobs{{< /ui >}}, cliquez sur le bouton {{< ui >}}Submit new job{{< /ui >}}.
3. Saisissez un {{< ui >}}Job name{{< /ui >}}.
4. Pour {{< ui >}}Job Definition{{< /ui >}}, sélectionnez le job créé lors des étapes précédentes.
5. Choisissez la file d'attente de jobs sur laquelle exécuter le Datadog Agent.
6. {{< ui >}}Container overrides{{< /ui >}} sont facultatifs selon vos préférences.
7. Cliquez sur le bouton {{< ui >}}Next{{< /ui >}}, puis cliquez sur le bouton {{< ui >}}Create job{{< /ui >}}.

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Exécutez la commande suivante pour soumettre un job pour votre définition de job :

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}