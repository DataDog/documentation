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
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: GitHub
  text: Envoyer des logs de flux Amazon VPS à Amazon Kinesis Data Firehose et Datadog
title: Envoyer des logs de service AWS avec la destination Datadog pour Amazon Data Firehose
---

## Présentation

Vous pouvez transmettre les logs de vos services AWS stockés dans des groupes de logs CloudWatch à un flux de données Amazon Kinesis, dans le but de les envoyer par la suite à une ou plusieurs destinations via Amazon Data Firehose. Par défaut, Datadog constitue l'une des destinations des flux de diffusion Amazon Data Firehose.​

Amazon Data Firehose est entièrement géré par AWS : vous n'avez donc pas besoin de maintenir une infrastructure supplémentaire ou une configuration de redirection pour le streaming de logs. Vous pouvez configurer un flux de diffusion Amazon Data Firehose dans la console AWS Firehose ou configurer automatiquement la destination à l'aide d'un modèle CloudFormation.

## Configuration

{{< tabs >}}
{{% tab "Flux de diffusion Amazon Data Firehose" %}}

Datadog vous conseille d'utiliser un flux de données Kinesis en tant qu'entrée lorsque vous utilisez la destination Datadog avec Amazon Data Firehose. Cela vous permet de transmettre vos logs à plusieurs destinations si ces logs ne sont pas seulement utilisés par Datadog. Si vous souhaitez envoyer vos logs à Datadog uniquement, ou si vous disposez déjà d'un flux de données Kinesis avec vos logs, vous pouvez ignorer l'étape 1.

1. Vous pouvez également vous référer à la section [Créer un flux de données][1] (en anglais) de guide Amazon Kinesis Data Streams pour les développeurs afin de créer un flux de données Kinesis. Attribuez un nom pertinent au flux, par exemple `DatadogLogStream`.
2. Accédez à [Amazon Data Firehose][2].  
3. Cliquez sur **Create Firehose stream**.
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
     **Remarque** : pour veiller à ce que tous les logs qui ont échoué par le biais du flux de diffusion soient quand même envoyés à Datadog, configurez la fonction Lambda du Forwarder Datadog de façon à [transmettre les logs][4] provenant de ce compartiment S3.
   h. Cliquez sur **Create Firehose stream**.

[1]: https://docs.aws.amazon.com/streams/latest/dev/tutorial-stock-data-kplkcl-create-stream.html
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[5]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Modèle CloudFormation" %}}

Personnalisez le [modèle Kinesis CloudFormation][1] complet et installez-le à partir de la console AWS. 

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Envoyer des logs AWS à votre flux Firehose

Les logs CloudWatch nécessitent une autorisation pour placer des données dans votre flux de données Kinesis ou Amazon Data Firehose, en fonction de l'approche que vous utilisez. [Créez un rôle IAM et une stratégie](#creer-un-role-iam-et-une-strategie). Abonnez ensuite votre nouveau flux Kinesis ou flux de livraison Amazon Data Firehose aux groupes de logs CloudWatch que vous souhaitez ingérer dans Datadog. Les abonnements peuvent être créés via la [console AWS](#console) ou [CLI](#cli).  
   **Remarque** : chaque groupe de logs CloudWatch ne peut avoir que deux abonnements.

### Créer un rôle IAM et une stratégie

Créez un rôle IAM et une stratégie d'autorisation afin que les logs CloudWatch puissent importer des données dans votre flux Kinesis.
  1. Vérifiez que vous avez bien configuré le service principal `logs.amazonaws.com` ou `logs.<région>.amazonaws.com` dans les **Trust relationships** du rôle. Par exemple :

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
        "Service": "logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
  2. Assurez-vous que la stratégie relative aux autorisations du rôle autorisent les actions `firehose:PutRecord`, `firehose:PutRecordBatch`, `kinesis:PutRecord` et `kinesis:PutRecords`. Si vous utilisez un flux de données Kinesis, indiquez son ARN dans le champ **Resource**. Si vous n'utilisez pas de flux de données Kinesis, indiquez l'ARN de votre flux Amazon Data Firehose dans le champ **Resource**.  
  Exemple :

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch",
        "kinesis:PutRecord",
        "kinesis:PutRecords"
      ],
      "Resource": "arn:aws:kinesis:<REGION>:<ACCOUNT_ID>:stream/<DELIVERY_STREAM>
    }
  ]
}
```
Référez-vous à l'[exemple d'utilisation de filtres d'abonnement avec Kinesis][2] (étapes 3 à 6) pour découvrir comment configurer ces filtres avec l'interface de ligne de commande AWS.

### Créer un filtre d'abonnement

#### Interface de ligne de commande

L'exemple suivant permet de créer un filtre d'abonnement à l'aide de l'interface de ligne de commande AWS :

```
  aws logs put-subscription-filter \
    --log-group-name "<MYLOGGROUPNAME>" \
    --filter-name "<MyFilterName>" \
    --filter-pattern "" \
    --destination-arn "<DESTINATIONARN> (flux de données ou flux de diffusion)" \
    --role-arn "<MYROLEARN>"
```

#### Console

Suivez ces étapes pour créer un filtre d'abonnement par l'intermédiaire de la console AWS.

1. Accédez à votre groupe de logs dans [CloudWatch][1], cliquez sur l'onglet **Subscription filters**, puis cliquez sur **Create**.
   - Si vous envoyez des logs via un flux de données Kinesis, sélectionnez `Create Kinesis subscription filter`.
   - Si vous envoyez des logs directement depuis votre groupe de logs vers votre flux de diffusion Amazon Data Firehose, sélectionnez `Create Amazon Data Firehose subscription filter`.

2. Sélectionnez le flux de données ou le flux de diffusion Firehose, selon le cas, ainsi que le [rôle IAM](#creer-un-role-iam-et-une-strategie) précédemment créé.

3. Attribuez un nom au filtre d'abonnement, puis cliquez sur **Start streaming**.

**Remarque importante** : la destination du filtre d'abonnement doit se trouver dans le même compte que le groupe de logs, comme décrit dans la [documentation relative à l'API de logs Amazon CloudWatch][3] (en anglais).

### Validation

Consultez lʼonglet **Subscription filters** de la page des détails de votre groupe de logs dans [CloudWatch][1] pour confirmer que le nouveau flux Kinesis ou Amazon Data Firehose est bien abonné à vos groupes de logs.

### Rechercher des logs dans Datadog

Une fois votre flux de diffusion Amazon Data Firehose configuré, vous pouvez analyser les logs abonnés à votre flux de diffusion dans Datadog. 

Pour consulter tous les logs correspondant à un ARN :

1. Accédez au [Log Explorer][5] dans Datadog.
2. Dans la barre de recherche, saisissez `@aws.firehose.arn:"<ARN>"` en remplaçant `<ARN>` par l'ARN Amazon Kinesis Data Firehose, puis appuyez sur **Entrée** pour afficher lʼensemble de vos logs abonnés.

**Remarque** : chaque charge utile Kinesis ne doit pas comporter plus de 65 000 messages de log. Tous les messages dépassant cette limite sont ignorés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample
[5]: /fr/logs/explorer/