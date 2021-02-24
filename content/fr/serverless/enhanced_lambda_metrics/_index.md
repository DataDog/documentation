---
title: Métriques Lambda optimisées
aliases:
  - /fr/serverless/real-time-enhanced-metrics
  - /fr/serverless/real_time_enhanced_metrics
kind: documentation
---
{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Dashboard des métriques Lambda optimisées par défaut" >}}

## Présentation

Lorsqu'ils sont utilisés ensemble, la [bibliothèque Lambda Datadog][1] et le [Forwarder Datadog][2] génèrent des métriques Lambda optimisées par défaut pour les applications Node.js, Python, Ruby, Java et Go. Ces métriques sont caractérisées par une faible latence, une granularité de plusieurs secondes et des métadonnées détaillées pour les démarrages à froid et les tags personnalisés.

Les métriques Lambda optimisées vous offrent des informations plus détaillées que les [métriques Lambda][3] activées par défaut avec l'intégration AWS Lambda. Ces métriques sont identifiables par l'espace de nommage `aws.lambda.enhanced.*` et correspondent à la méthode recommandée par Datadog pour définir des monitors en temps réel afin de surveiller la santé de votre application sans serveur.

### Métriques Lambda optimisées transmises en temps réel

Les métriques Lambda optimisées en temps réel suivantes sont disponibles. Elles reçoivent les tags `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` et `runtime`. Ces métriques sont de type [distribution][4], et vous pouvez les interroger à l'aide des agrégations `count`, `min`, `max`, `sum` et `avg`.

| Métrique                                  | Description                                                                                                                                        |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **aws.lambda.enhanced.invocations**     | Mesure le nombre de fois qu'une fonction est appelée en réponse à un appel d'API d'événement ou d'invocation.                                                 |
| **aws.lambda.enhanced.errors**          | Mesure le nombre d'appels ayant échoué en raison d'erreurs dans la fonction (code de réponse 4XX).                                                  |
| **aws.lambda.enhanced.max_memory_used** | Mesure la quantité de mémoire maximale (Mo) utilisée par la fonction.                                                                                                |
| **aws.lambda.enhanced.duration**        | Mesure le nombre de secondes écoulées entre le moment où le code de la fonction commence à s'exécuter suite à un appel et l'arrêt de son exécution. |
| **aws.lambda.enhanced.billed_duration** | Mesure la durée facturée de l'exécution de la fonction (incréments de 100 ms).                                                                        |
| **aws.lambda.enhanced.init_duration** | Mesure le temps d'initialisation d'une fonction (en secondes) lors d'un démarrage à froid.                                  |
| **aws.lambda.enhanced.estimated_cost**  | Mesure le coût total estimé de l'appel de la fonction (en dollars).                                                                         |
| **aws.lambda.enhanced.timeouts**  | Mesure le nombre de fois qu'une fonction a expiré.                        |
| **aws.lambda.enhanced.out_of_memory**  | Mesure le nombre de fois qu'une fonction est arrivée à court de mémoire.                        |

**Remarque :** les métriques optimisées sont envoyées au Forwarder Datadog via CloudWatch Logs. Votre volume de logs dans CloudWatch sera donc amené à augmenter, ce qui peut avoir une incidence sur votre facture AWS. Pour désactiver l'envoi des métriques optimisées, définissez la variable d'environnement `DD_ENHANCED_METRICS` sur `false` sur vos fonctions Lambda AWS.

## Activer les métriques Lambda optimisées

{{< img src="serverless/integration/lambda_metrics.png" alt="Collecte de métriques Lambda" >}}

Suivez les [instructions d'installation][5] pour configurer l'instrumentation de vos applications sans serveur. Les métriques Lambda optimisées seront alors activées par défaut.

**Remarque** : pour activer les métriques Lambda optimisées sans envoyer les logs de vos fonctions à Datadog, assurez-vous que la variable d'environnement `DdForwardLog` est définie sur `false` sur le [Forwarder Datadog][2].

## Consulter votre dashboard

Une fois que vous avez activé les métriques Lambda optimisées, consultez votre [dashboard par défaut dans l'application Datadog][6].

[1]: /fr/serverless/datadog_lambda_library
[2]: /fr/serverless/forwarder/
[3]: /fr/integrations/amazon_lambda/#metric-collection
[4]: /fr/metrics/distributions/
[5]: /fr/serverless/installation/
[6]: https://app.datadoghq.com/screen/integration/30306