---
title: "Envoyer des logs de services AWS avec la destination Datadog pour Kinesis\_Firehose"
kind: documentation
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: '/logs/explorer/#visualiser-les-donnees'
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
---
​
Les logs de service AWS sont généralement stockés dans des compartiments S3 ou des groupes de logs CloudWatch. Vous pouvez vous abonner à ces logs et les transmettre à un flux Amazon Kinesis, pour les envoyer ensuite vers une ou plusieurs destinations. Datadog est l'une des destinations par défaut pour les flux de diffusion Amazon Kinesis.
​
Étant donné qu'AWS gère entièrement Amazon Kinesis Data Firehose, vous n'avez besoin de gérer aucune infrastructure ni configuration de transmission supplémentaire pour la diffusion de logs.
​
Vous pouvez configurer un flux de diffusion Kinesis Firehose dans la console AWS Firehose ou configurer automatiquement la destination à l'aide d'un modèle CloudFormation :
​
{{< tabs >}}
{{% tab "Flux de diffusion Kinesis Firehose" %}}

​Nous vous conseillons d'utiliser un flux Kinesis en tant qu'entrée lorsque vous utilisez la destination Datadog Kinesis. Cela vous permet de transmettre vos logs à plusieurs destinations si Datadog n'est pas le seul service à utiliser ces logs. ​

Si vous souhaitez envoyer vos logs à Datadog uniquement, ou si vous disposez déjà d'un flux de données Kinesis avec vos logs, ignorez l'étape 1.​
1. (Facultatif) Créez un flux Kinesis (référez-vous à la [documentation Kinesis][1]). Donnez un nom explicite à votre flux, par exemple `DatadogLogStream`, et définissez le nombre de shards (partitions) sur 1 (augmentez le nombre de shards pour chaque Mo/s supplémentaire dont vous avez besoin).
2. Créez un [flux de diffusion][2] et donnez-lui le nom de `DatadogLogsforwarder`.
3. Définissez la source en tant que « Kinesis stream » (ou `Direct PUT or other sources` si vous ne souhaitez pas utiliser de flux Kinesis) et sélectionnez `DatadogLogStream` (ou le flux Kinesis existant qui contient déjà vos logs).
4. Désactivez la transformation des données et la transformation des enregistrements, puis cliquez sur `next`.
5. Sélectionnez la destination `Datadog`, puis le site `Datadog US` ou `Datadog EU`, selon le site Datadog associé à votre compte.
  {{< img src="logs/guide/choose-destination.png" alt="Choisir votre destination" style="width:100%;">}}
6. Collez votre `APIKEY` dans la zone `AccessKey`. (Vous pouvez obtenir votre clé d'API depuis [la page de vos paramètres d'API Datadog][3]).
7. (Facultatif) Ajoutez des `parameters` personnalisés. Ceux-ci sont ajoutés en tant que tags personnalisés à vos logs.
{{< img src="logs/guide/kinesis_logs_datadog_destination.png" alt="Configuration de la destination Datadog" style="width:100%;">}}
8. Choisissez de sauvegarder les événements ayant échoué dans un compartiment S3.
9. Configurez les paramètres du flux de diffusion. Voici les deux paramètres importants :
    * Retry time : correspond à la durée pendant laquelle le flux de diffusion doit effectuer de nouvelles tentatives avant d'envoyer un événement dans le compartiment S3 de sauvegarde.
    * Batch size : Datadog recommande une valeur comprise entre 1 Mo et 4 Mo. Les logs sont envoyés par le flux de diffusion si la taille de lot ou la durée d'attente (minimum de 60 secondes) est atteinte. Datadog vous conseille de choisir une taille de lot aussi proche que possible du temps réel.
    {{< img src="logs/guide/kinesis_logs_datadog_batch.png" alt="Configuration des lots" style="width:100%;" >}}

Pour veiller à ce que les logs qui ont échoué par le biais du flux de diffusion soient quand même envoyés à Datadog, [configurez la fonction Lambda de Datadog de façon à ce qu'elle se déclenche sur ce compartiment S3][4].

[1]: https://docs.aws.amazon.com/kinesisanalytics/latest/dev/app-hotspots-prepare.html#app-hotspots-create-two-streams
[2]: https://console.aws.amazon.com/firehose/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
{{% /tab %}}

{{% tab "Modèle CloudFormation" %}}
​
Vous pouvez également personnaliser ce modèle CloudFormation et l'installer à partir de la console AWS​ :

Consultez le [modèle Kinesis CloudFormation dans son intégralité ici][1].

[1]: /resources/json/kinesis-logs-cloudformation-template.json
{{% /tab %}}
{{< /tabs >}}

## Envoyer des logs AWS à votre flux Kinesis

1. Examinez la colonne `Subscriptions` de la [page des groupes de logs][1] pour consulter les abonnements actuels à vos groupes de logs pertinents. Ajoutez le nouveau flux Kinesis en tant qu'abonné. Remarque : chaque groupe de logs CloudWatch peut uniquement avoir deux abonnements.
  * **Remarque** : si vous souhaitez vous abonner à plus de deux sources, vous pouvez vous abonner au nouveau flux Kinesis une fois la configuration terminée.
2. Abonnez votre nouveau flux Kinesis aux groupes de logs CloudWatch que vous souhaitez intégrer à Datadog. Consultez [cette section sur CloudWatch Logs][2] (étape 3 à 6) pour :
  a. Utiliser la commande `aws iam create-role` afin de créer un rôle IAM qui autorise CloudWatch Logs à transmettre ses données de logs au flux Kinesis.
  b. Créer une stratégie autorisant les actions `firehose:PutRecord`, `firehose:PutRecordBatch`, `kinesis:PutRecord` et `kinesis:PutRecordBatch`.
  c. Associer la stratégie d'autorisation au rôle IAM que vous venez de créer avec la commande `aws iam put-role-policy`.
  d. Utiliser la commande `aws logs put-subscription-filter` pour abonner votre flux Kinesis à chaque groupe de logs CloudWatch que vous souhaitez intégrer à Datadog.
​
    Exemple de filtre d'abonnement :
​
    ```
    aws logs put-subscription-filter \
        --log-group-name "MYLOGGROUPNAME" \
        --filter-name "MyFilterName" \
        --filter-pattern "" \
        --destination-arn "DESTINATIONARN (data stream or delivery stream)" \
        --role-arn "MYROLEARN"
    ```
​
    **Remarque importante **: la destination du filtre d'abonnement doit se trouver dans le même compte que le groupe de logs, comme décrit dans la [documentation AWS][3].
3. Examinez la colonne `Subscriptions` de la [page des groupes de logs][1] pour vérifier que le nouveau flux Kinesis est bien abonné à vos groupes de logs.
​
Si vous souhaitez transmettre des logs directement au flux de diffusion sans passer par un flux de données Kinesis, vous pouvez abonner les groupes de logs CloudWatch directement à la destination Kinesis Firehose en ajoutant l'ARN Kinesis Firehose dans le paramètre `destination-arn` du filtre d'abonnement, comme indiqué dans [la documentation sur les filtres d'abonnement AWS][4] (étape 12).
​

[1]: https://console.aws.amazon.com/cloudwatch/home
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs//SubscriptionFilters.html#DestinationKinesisExample
[3]: https://docs.aws.amazon.com/AmazonCloudWatchLogs/latest/APIReference/API_PutSubscriptionFilter.html
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#FirehoseExample