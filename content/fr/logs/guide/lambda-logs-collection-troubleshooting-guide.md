---
title: Guide de dépannage pour la collecte de logs de la fonction Lambda
kind: documentation
---
Si vous ne voyez aucun log transmis depuis une fonction Lambda du Forwarder Datadog dans le Log Explorer, suivez les étapes de dépannage ci-dessous. Si vous avez suivi ces instructions mais que vos problèmes persistent, [contactez l'assistance Datadog][1] pour obtenir de l'aide.

## Vos logs sont-ils envoyés à Datadog ?

1. Accédez à la [vue Live Tail du Log Explorer][2].
2. Dans la barre de recherche, utilisez un filtre pour limiter la vue Live Tail aux logs provenant de votre fonction Lambda. Voici des requêtes de recherche courantes :
    * Filtrage par source : la source est souvent définie sur `source:lambda`, `source:aws` ou `source:cloudwatch`, mais vous pouvez trouver d'autres sources possibles dans la fonction `parse_event_source` de la [fonction Lambda][3]. 
    * Filtrage par nom de forwarder : la fonction Lambda ajoute un tag `forwardername` à tous les logs qu'elle renvoie. Vous pouvez filtrer ce tag en recherchant `forwardername:*` ou `forwardername:<NOM_FONCTION_FORWARDER>`.
3. Si vous voyez les logs dans la vue Live Tail mais pas dans le Log Explorer, cela signifie que certains [filtres d'exclusion][4] sont définis dans votre index de log. Ces derniers filtrent vos logs.
4. Si vous ne voyez pas les logs dans la vue Live Tail, c'est qu'ils ne parviennent pas à Datadog.

## Consulter l'onglet Monitoring de la fonction Lambda

[Depuis la console AWS][5]

1. Ouvrez la fonction Lambda de votre Forwarder.

2. Cliquez sur l'onglet Monitoring.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Onglet Monitoring"  style="width:80%;" >}}

3. L'onglet Monitoring comporte une série de graphiques qui indiquent les informations suivantes sur votre fonction Lambda :
    * Les invocations
    * Les erreurs
    * Les logs

4. Si vous ne voyez aucun point de données dans le graphique **Invocations**, il est possible que les déclencheurs que vous avez définis pour votre fonction posent problème. Consultez la section [Gérer vos déclencheurs de fonction](#gerer-vos-declencheurs-de-fonction) un peu plus bas. Pour analyser vos invocations Lambda sans utiliser l'onglet Monitoring, reportez-vous à la section [Visualiser des métriques Lambda dans Datadog](#visualiser-des-metriques-lambda-dans-datadog).
5. Si vous voyez des points de données dans le graphique « Error count and success rate », [consultez les logs de la fonction Lambda](#consulter-les-logs-de-la-fonction-lambda) pour accéder aux messages d'erreur signalés.

### Visualiser des métriques Lambda dans Datadog

Si vous avez activé les métriques Lambda AWS, vous pouvez visualiser les métriques relatives aux invocations et aux erreurs Lambda dans Datadog. Les métriques suivantes portent toutes le tag `functionname` :

| Métrique                        | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations`     | Nombre de déclenchements ou d'invocations de la fonction Lambda                                      |
| `aws.lambda.errors `          | Nombre d'erreurs générées suite à l'invocation de la fonction                                        |
| `aws.lambda.duration `        | Durée moyenne d'exécution (en millisecondes) de la fonction Lambda  |
| `aws.lambda.duration.maximum` | Durée maximale d'exécution (en millisecondes) de la fonction Lambda  |
| `aws.lambda.throttles`        | Nombre de tentatives d'invocations inachevées en raison d'un taux d'invocation dépassant les limites client |

Pour en savoir plus sur ces métriques AWS Lambda et en découvrir d'autres, consultez la rubrique relative aux [métriques Amazon Lambda][6].

### Gérer vos déclencheurs de fonction

La fonction Lambda du Forwarder doit inclure des déclencheurs (CloudWatch Logs ou S3) pour que les logs soient transmis. Suivez les étapes ci-dessous pour veiller à ce que les déclencheurs soient correctement configurés.

1. La source de votre log (groupe de logs CloudWatch ou compartiment S3) s'affiche-t-elle dans la liste Triggers de la console Lambda du Forwarder ? Si c'est le cas, assurez-vous qu'elle est activée. Sinon, suivez les étapes ci-dessous pour vérifier dans la console de groupe de logs CloudWatch ou S3. En effet, cette liste affichée dans la console Lambda semble être incomplète.

2. Pour le compartiment S3, accédez à l'onglet « Properties » et faites défiler vers le bas jusqu'à « Advanced settings » et au carré « Events », ou exécutez une requête en utilisant la commande AWS CLI ci-dessous. Une notification d'événement ayant pour but de déclencher la fonction Lambda du Forwarder s'affiche-t-elle ? Si ce n'est pas le cas, vous devez configurer un déclencheur.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. Pour le groupe de logs CloudWatch, accédez au champ « Subscriptions » de la console du groupe de logs, sous la section « Log group details ». Vous pouvez également exécuter une requête à l'aide de la commande AWS CLI ci-dessous. Vous devez configurer un déclencheur si la fonction Lambda du Forwarder n'est pas abonnée au groupe de logs.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. Définissez des déclencheurs [automatiquement][7] ou [manuellement][8].

Remarque : AWS ne permet pas à plus d'une ressource d'être abonnée à une source de log. Si une autre ressource est déjà abonnée à votre source de log source, vous devez d'abord supprimer cet abonnement.

Pour le groupe de logs CloudWatch, vous pouvez utiliser les métriques suivantes dans la plateforme Datadog pour confirmer si les logs sont envoyés depuis le groupe de logs vers la fonction Lambda du Forwarder. Utilisez le tag `log_group` pour filtrer les données lorsque vous consultez les métriques.

| Métrique                          | Description                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | Le nombre d'événements de log chargés dans CloudWatch Logs                                               |
| `aws.logs.forwarded_log_events` | Le nombre d'événements de log transmis à la destination de l'abonnement                                 |
| `aws.logs.delivery_errors`      | Le nombre d'échecs d'envoi des événements de log vers la destination de l'abonnement                    |
| `aws.logs.delivery_throttling`  | Le nombre d'événements de log limités pour la livraison à la destination de l'abonnement                  |

## Consulter les logs de la fonction Lambda

1. Depuis l'onglet Monitoring, cliquez sur **View logs in Cloudwatch**.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Logs Lambda dans Cloudwatch"  style="width:80%;" >}}

2. Recherchez le flux de logs le plus récent.

3. Trouvez-vous des erreurs ? Essayez de rechercher « ?ERROR ?Error ?error ».

4. Définissez la variable d'environnement « DD_LOG_LEVEL » sur « debug » au niveau de la fonction Lambda du Forwarder afin d'activer le debugging complémentaire des logs pertinents. N'oubliez pas de désactiver ces logs une fois le debugging terminé, car ils sont très détaillés.


[1]: https://docs.datadoghq.com/fr/help
[2]: https://docs.datadoghq.com/fr/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: https://docs.datadoghq.com/fr/logs/indexes/#exclusion-filters
[5]: https://console.aws.amazon.com/lambda/home
[6]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=awsconsole#metrics
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[8]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers