---
further_reading:
- link: https://www.datadoghq.com/blog/aws-lambda-telemetry-api/
  tag: Blog
  text: Enrichissement des fonctionnalités de l'extension Lambda Datadog grâce à l'API
    AWS Lambda Telemetry
title: Guide de dépannage pour la collecte de logs de la fonction Lambda
---
Si vous ne voyez pas les journaux transférés depuis une fonction Lambda du Datadog Forwarder dans le Log Explorer, suivez les étapes de dépannage ci-dessous. Si vous continuez à rencontrer des problèmes après avoir suivi ces étapes, [contactez le support Datadog][1] pour obtenir de l'aide supplémentaire.

## Vos journaux sont-ils envoyés à Datadog ? {#are-your-logs-sent-to-datadog}

1. Accédez à la [vue Live Tail du Log Explorer][2].
2. Dans la barre de recherche, utilisez un filtre pour limiter la vue Live Tail aux seuls journaux provenant de votre fonction Lambda. Voici quelques requêtes de recherche courantes :
    * Par source : la source est souvent définie sur `source:lambda`, `source:aws`, `source:s3` ou `source:cloudwatch`.
    * Par nom de forwarder : la fonction Lambda ajoute une balise `forwardername` à tous les journaux qu'elle transfère. Vous pouvez filtrer sur cette balise en recherchant `forwardername:*` ou `forwardername:<FORWARDER_FUNCTION_NAME>`.
3. Si les journaux apparaissent dans la vue Live Tail mais sont absents du Log Explorer, la différence est probablement due à l'une des raisons suivantes (voir le [document de dépannage des journaux pour plus de détails][4]) :
   * Votre index de journaux contient des filtres d'exclusion qui filtrent activement ces journaux.
   * Vous avez dépassé votre quota quotidien de journaux.
   * Les journaux sont horodatés de plus de 18 heures.
4. Si vous ne voyez pas les journaux dans la vue Live Tail, c'est qu'ils n'atteignent pas Datadog.

## Vérifiez les Permissions de la fonction Lambda {#check-the-lambda-function-permissions}

Des problèmes d'autorisation peuvent également empêcher le forwarder d'accéder aux sources de journaux. La fonction Lambda utilise une politique basée sur les ressources (indépendante de la politique du Datadog Integration Role) pour accorder l'accès aux sources de journaux.

Vérifiez la politique du forwarder en exécutant la commande suivante :
   ```
   get-policy command aws lambda get-policy --function-name <FUNCTION_NAME>
   ```

Cette commande renvoie une politique basée sur les ressources qui précise quels services et ressources AWS (comme des buckets S3 spécifiques) sont autorisés à invoquer la fonction du forwarder.

<div class="alert alert-danger">
Les éléments Action et Resource dans le document de politique <strong>doivent correspondre exactement</strong> aux spécifications des <a href="/logs/guide/forwarder/?tab=cloudformation#permissions">autorisations du Datadog Forwarder</a>.
</div>

## Vérifiez l'onglet Monitoring de la fonction Lambda {#check-the-lambda-function-monitoring-tab}

[Depuis la console AWS][6]

1. Ouvrez votre fonction Lambda de forwarder.

2. Cliquez sur l'onglet {{< ui >}}Monitoring{{< /ui >}}.

    {{< img src="logs/guide/lambda-monitoring-tab.png" alt="Onglet Monitoring" style="width:80%;" >}}

3. L'onglet Monitoring affiche une série de graphiques indiquant les informations suivantes sur votre fonction Lambda :
    * invocations
    * erreurs
    * journaux

4. Si vous ne voyez aucun point de données sur le graphique {{< ui >}}Invocations{{< /ui >}}, il peut y avoir un problème avec les déclencheurs que vous avez définis pour votre fonction. Consultez [Gérer les déclencheurs de votre fonction](#manage-your-function-triggers). Pour obtenir un aperçu de vos invocations Lambda sans utiliser l'onglet Monitoring, consultez [Affichage des métriques Lambda dans Datadog](#viewing-lambda-metrics-in-datadog).
5. Si vous voyez des points de données sur le graphique « Error count and success rate », [vérifiez les journaux de la fonction Lambda](#check-the-lambda-function-logs) pour voir quels messages d'erreur sont signalés.

### Affichage des métriques Lambda dans Datadog {#viewing-lambda-metrics-in-datadog}

Si vous avez activé les métriques AWS Lambda, vous pouvez afficher les métriques liées aux invocations et aux erreurs Lambda dans Datadog. Les métriques suivantes sont toutes marquées avec la balise `functionname` :

| Métrique                        | Description                                                                                        |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.lambda.invocations `     | Nombre de fois où la fonction Lambda a été déclenchée/invoquée |
| `aws.lambda.errors `          | Nombre d'erreurs survenues lors de l'invocation de la fonction |
| `aws.lambda.duration `        | Durée moyenne (en millisecondes) nécessaire à la fin de l'exécution de la fonction Lambda |
| `aws.lambda.duration.maximum` | Durée maximale (en millisecondes) nécessaire à la fin de l'exécution de la fonction Lambda |
| `aws.lambda.throttles`        | Nombre de tentatives d'invocation qui ont été limitées car les taux d'invocation dépassaient les limites du client |

Pour plus d'informations sur ces métriques et d'autres métriques AWS Lambda, consultez [Métriques AWS Lambda][7].

### Gérer les déclencheurs de votre fonction {#manage-your-function-triggers}

Pour que les journaux soient transférés, la fonction Lambda du forwarder doit avoir des déclencheurs (CloudWatch Logs ou S3) configurés. Suivez les étapes ci-dessous pour vous assurer que les déclencheurs sont correctement configurés.

1. La source de votre journal (groupe de journaux CloudWatch ou bucket S3) apparaît-elle dans la liste « Triggers » de la console de la fonction Lambda du forwarder ? Si oui, assurez-vous qu'elle est activée. Sinon, suivez les étapes ci-dessous pour effectuer la vérification dans la console S3 ou dans celle du groupe de journaux CloudWatch, car la liste « Triggers » affichée dans la console Lambda est connue pour être incomplète.

2. Pour un bucket S3, accédez à l'onglet « Properties » du bucket, puis faites défiler la page jusqu'à la vignette « Events » de la section « Advanced settings », ou effectuez une requête à l'aide de la commande AWS CLI ci-dessous. Voyez-vous une notification d'événement configurée pour déclencher la fonction Lambda du forwarder ? Si ce n'est pas le cas, vous devez configurer un déclencheur.
   ```
   aws s3api get-bucket-notification-configuration --bucket <BUCKET_NAME>
   ```

3. Pour un groupe de journaux CloudWatch, accédez au champ « Subscriptions » de la console du groupe de journaux, dans la section « Log group details ». Alternativement, vous pouvez effectuer une requête à l'aide de la commande AWS CLI ci-dessous. Si le groupe de journaux n'est pas abonné à la fonction Lambda du forwarder, vous devez configurer un déclencheur.
   ```
   aws logs describe-subscription-filters --log-group-name <LOG_GROUP_NAME>
   ```

4. Définissez les déclencheurs [automatiquement][8] ou [manuellement][9].

Pour un groupe de journaux CloudWatch, vous pouvez utiliser les métriques suivantes dans Datadog pour vérifier si les journaux sont transmis du groupe de journaux à la fonction Lambda du forwarder. Utilisez la balise `log_group` pour filtrer les données lors de la visualisation des métriques.

| Métrique                          | Description                                                                                        |
|---------------------------------|----------------------------------------------------------------------------------------------------|
| `aws.logs.incoming_log_events`  | Nombre d'événements de journal chargés dans CloudWatch Logs                                               |
| `aws.logs.forwarded_log_events` | Nombre d'événements de journal transférés vers la destination de l'abonnement                                 |
| `aws.logs.delivery_errors`      | Nombre d'événements de journal dont la livraison à la destination de l'abonnement a échoué                    |
| `aws.logs.delivery_throttling`  | Nombre d'événements de journal soumis à une limitation de débit lors de leur livraison à la destination de l'abonnement                  |

### Déclencheur automatique {#automatic-trigger}

Si Datadog ne parvient pas à créer automatiquement les déclencheurs, suivez cette liste de vérifications pour résoudre le problème :

1. Vérifiez que le Forwarder ARN apparaît dans l'onglet Log Collection de l'AWS Integration.
2. Vérifiez que les [autorisations requises][10] sont attribuées au rôle d'intégration.
3. Si la source des journaux est un groupe de journaux Lambda, vérifiez que l'[extension][11] est installée sur la fonction Lambda.
4. Si la source des journaux est un groupe de journaux CloudWatch, vérifiez qu'il n'a pas déjà deux abonnés (le maximum autorisé).

## Consultez les journaux de la fonction Lambda {#check-the-lambda-function-logs}

1. Dans l'onglet Monitoring, cliquez sur {{< ui >}}View logs in Cloudwatch{{< /ui >}}.

{{< img src="logs/guide/lambda-logs-cloudwatch.png" alt="Journaux Lambda dans CloudWatch" style="width:80%;" >}}

2. Trouvez le flux de journaux le plus récent.

3. Voyez-vous des erreurs ? Essayez de rechercher « ?ERROR ?Error ?error ».

4. Définissez la variable d'environnement « DD_LOG_LEVEL » sur « debug » dans la fonction Lambda du forwarder afin d'activer les journaux de débogage. Les journaux de débogage sont très verbeux ; pensez à désactiver cette option après le débogage.

### Journaux filtrés par la fonction Lambda {#logs-filtered-by-the-lambda-function}

La fonction Lambda du forwarder utilise les [variables d'environnement][12] suivantes pour filtrer les journaux :

* INCLUDE_AT_MATCH
* EXCLUDE_AT_MATCH

Vous pouvez rechercher ces variables dans les journaux DEBUG du forwarder, qui indiquent si certains journaux sont écartés ou non par le filtre.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/help
[2]: /fr/logs/live_tail/#live-tail-view
[3]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/lambda_function.py
[4]: /fr/logs/troubleshooting/
[5]: /fr/logs/guide/forwarder/?tab=cloudformation#permissions
[6]: https://console.aws.amazon.com/lambda/home
[7]: /fr/integrations/amazon_lambda/?tab=awsconsole#metrics
[8]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[9]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[10]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[11]: /fr/serverless/libraries_integrations/extension/
[12]: /fr/logs/guide/forwarder/?tab=cloudformation#log-filtering-optional