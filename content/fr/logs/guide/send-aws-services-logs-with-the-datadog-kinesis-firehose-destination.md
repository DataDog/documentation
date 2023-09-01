---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: GitHub
  text: Envoyer des logs de flux Amazon VPS à Amazon Kinesis Data Firehose et Datadog
kind: documentation
title: Envoyer des logs de services AWS avec la destination Datadog pour Kinesis Firehose
---

## Présentation

Vous pouvez créer des abonnements à des logs de services AWS stockés dans des groupes de logs CloudWatch et transmettre ces logs à un flux Amazon Kinesis, dans le but de les envoyer par la suite à une ou plusieurs destinations. Par défaut, Datadog constitue l'une des destinations des flux de diffusion Amazon Kinesis.​

Amazon Kinesis Data Firehose est entièrement géré par AWS : vous n'avez donc pas besoin de maintenir une infrastructure supplémentaire ou une configuration de redirection pour le streaming de logs. Vous pouvez configurer un flux de diffusion Kinesis Firehose dans la console AWS Firehose ou configurer automatiquement la destination à l'aide d'un modèle CloudFormation.

## Configuration

{{< tabs >}}
{{% tab "Flux de diffusion Kinesis Firehose" %}}

Datadog vous conseille d'utiliser un flux de données Kinesis en tant qu'entrée lorsque vous utilisez la destination Kinesis Datadog. Cela vous permet de transmettre vos logs à plusieurs destinations si ces logs ne sont pas seulement utilisés par Datadog. Si vous souhaitez envoyer vos logs à Datadog uniquement, ou si vous disposez déjà d'un flux de données Kinesis avec vos logs, vous pouvez ignorer l'étape 1.

1. Vous pouvez également vous référer à la section [Créer un flux de données][1] (en anglais) de guide Amazon Kinesis Data Streams pour les développeurs afin de créer un flux de données Kinesis. Attribuez un nom pertinent au flux, par exemple `DatadogLogStream`.
2. Créez un [flux de diffusion][2].
   a. Définissez la source :
      - `Amazon Kinesis Data Streams` si vos logs proviennent d'un flux de données Kinesis
      - `Direct PUT` si vos logs proviennent directement d'un groupe de logs CloudWatch

   b. Définissez la destination `Datadog`.  
   c. Attribuez un nom au flux de diffusion.
   d. Sous **Destination settings**, choisissez l'URL de l'endpoint HTTP `Datadog logs` pour votre [site Datadog][5].
   e. Collez votre clé d'API dans le champ **API key**. Vous pouvez consulter votre clé d'API ou en créer une depuis la [page Datadog dédiée][3].
   f. Si vous le souhaitez, configurez le paramètre **Retry duration** spécifiant la durée avant une nouvelle tentative, définissez des paramètres de buffer ou ajoutez des **paramètres** qui seront joints à vos logs sous la forme de tags.
   **Remarque** : si vos logs sont composés de messages d'une seule ligne, Datadog vous conseille de définir le paramètre **Buffer size** sur `2 MiB`.
   g. Sous **Backup settings**, sélectionnez un compartiment de sauvegarde S3 afin de recevoir les événements échoués qui ont dépassé la durée de nouvelle tentative.
     **Remarque** : pour veiller à ce que les logs qui ont échoué par le biais du flux de diffusion soient quand même envoyés à Datadog, configurez la fonction Lambda du Forwarder Datadog de façon à [transmettre les logs][4] provenant de ce compartiment S3.
   h. Cliquez sur **Create delivery stream**.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Modèle CloudFormation" %}}

Vous pouvez également personnaliser ce modèle CloudFormation et l'installer à partir de la console AWS. Consultez le [modèle Kinesis CloudFormation dans son intégralité ici][1].

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Envoyer des logs AWS à votre flux Kinesis

Abonnez votre nouveau flux Kinesis aux groupes de logs CloudWatch que vous souhaitez intégrer à Datadog. Vous pouvez consulter la colonne **Subscriptions** de la [page d'index des groupes de logs][1] pour vérifier les abonnements actuels à vos groupes de logs. Il est possible de créer un abonnement à partir de l'API ou de la console AWS, comme décrit ci-dessous. 
   **Remarque** : chaque groupe de logs CloudWatch peut uniquement avoir deux abonnements.

### Créer un rôle IAM et une stratégie

Créez un rôle IAM et une stratégie d'autorisation afin que les logs CloudWatch puissent importer des données dans votre flux Kinesis.
   - Vérifiez que vous avez bien configuré le service principal `logs.amazonaws.com` ou `logs.<région>.amazonaws.com` dans les **Trust relationships** du rôle.
   - Vérifiez que la stratégie appliquée au rôle autorise les actions `firehose:PutRecord`, `firehose:PutRecordBatch`, `kinesis:PutRecord` et `kinesis:PutRecords`.

Référez-vous à l'[exemple d'utilisation de filtres d'abonnement avec Kinesis][2] (étapes 3 à 6, en anglais) pour découvrir comment configurer ces filtres avec l'interface de ligne de commande AWS.

### Créer un filtre d'abonnement

L'exemple suivant permet de créer un filtre d'abonnement à l'aide de l'interface de ligne de commande AWS :

    ```
    aws logs put-subscription-filter \
        --log-group-name "<NOM_GROUPE_LOGS>" \
        --filter-name "<NOM_FILTRE>" \
        --filter-pattern "" \
        --destination-arn "<ARN_DESTINATION> (flux de données ou de diffusion)" \
        --role-arn "<ARN_RÔLE>"
    ```

Vous pouvez également créer un filtre d'abonnement par l'intermédiaire de la console AWS.

1. Accédez à votre groupe de logs dans [CloudWatch][1], cliquez sur l'onglet **Subscription filters**, puis cliquez sur **Create**.
   - Si vous envoyez des logs via un flux de données Kinesis, sélectionnez `Create Kinesis subscription filter`.
   - Si vous envoyez des logs directement depuis votre groupe de logs vers votre flux de diffusion Kinesis Firehose, sélectionnez `Create Kinesis Firehose subscription filter`.

2. Sélectionnez le flux de données ou le flux de diffusion Firehose, selon le cas, ainsi que le [rôle IAM](#creer-un-role-iam-et-une-strategie) précédemment créé.

3. Attribuez un nom au filtre d'abonnement, puis cliquez sur **Start streaming**.

**Remarque importante** : la destination du filtre d'abonnement doit se trouver dans le même compte que le groupe de logs, comme décrit dans la [documentation relative à l'API de logs Amazon CloudWatch][3] (en anglais).

### Validation

Consultez la colonne **Subscriptions** de la page d'index des groupes de logs [CloudWatch][1] pour vérifier que le nouveau flux Kinesis est bien abonné à vos groupes de logs.

### Rechercher des logs AWS Kinesis dans Datadog

Une fois votre flux de diffusion Amazon Kinesis configuré, vous pouvez analyser les logs abonnés à votre flux de diffusion dans Datadog. 

Pour consulter tous les logs correspondant à un ARN :

1. Accédez au [Logs Explorer][5] dans Datadog pour afficher tous vos logs abonnés.
2. Dans la barre de recherche, saisissez `@aws.firehose.arn:"<ARN>"` en remplaçant `<ARN>` par l'ARN Amazon Kinesis Data Firehose, puis appuyez sur **Entrée**.

**Remarque** : chaque charge utile Kinesis ne doit pas comporter plus de 65 000 messages de log. Tous les messages dépassant cette limite sont ignorés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /fr/logs/explorer/