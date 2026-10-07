---
aliases:
- /fr/serverless/real-time-enhanced-metrics
- /fr/serverless/real_time_enhanced_metrics
title: Métriques Lambda optimisées
---

{{< img src="serverless/lambda-metrics-dashboard.jpeg" alt="Dashboard des métriques Lambda optimisées par défaut" >}}

## Présentation

Par défaut, Datadog génère des métriques Lambda optimisées à partir de votre runtime Lambda. Ces métriques offrent une faible latence, une granularité de plusieurs secondes et des métadonnées détaillées pour les démarrages à froid et les tags personnalisés.

Les métriques Lambda optimisées vous offrent des informations plus détaillées que les [métriques Lambda][1] activées par défaut avec l'intégration AWS Lambda. Ces métriques sont identifiables par l'espace de nommage `aws.lambda.enhanced.*`. Nous vous recommandons de les utiliser pour définir des monitors en temps réel afin de surveiller la santé de votre application sans serveur.

### Métriques Lambda optimisées transmises en temps réel

Les métriques Lambda optimisées en temps réel suivantes sont disponibles. Elles reçoivent les tags `aws_account`, `region`, `functionname`, `cold_start`, `memorysize`, `executedversion`, `resource` et `runtime`. Ces métriques sont de type [distribution][2], et vous pouvez les interroger à l'aide des agrégations `count`, `min`, `max`, `sum` et `avg`.


`aws.lambda.enhanced.invocations`     
: Mesure le nombre de fois qu'une fonction est appelée en réponse à un événement ou à une invocation d'un appel API.

`aws.lambda.enhanced.errors`
: Mesure le nombre d'invocations ayant échoué en raison d'erreurs dans la fonction.

`aws.lambda.enhanced.max_memory_used`
: Mesure la quantité de mémoire maximale (en Mo) utilisée par la fonction.

`aws.lambda.enhanced.duration`
: Mesure le nombre de secondes écoulées entre le moment où le code de la fonction commence à s'exécuter suite à une invocation et l'arrêt de son exécution.

`aws.lambda.enhanced.billed_duration`
: Mesure la durée facturée de l'exécution de la fonction (incréments de 100 ms).

`aws.lambda.enhanced.init_duration`
: Mesure la durée d'initialisation d'une fonction (en secondes) lors d'un démarrage à froid.

`aws.lambda.enhanced.runtime_duration`
: Mesure le nombre de millisecondes écoulées entre le moment où le code de la fonction commence à s'exécuter et le moment où il renvoie la réponse au client, en excluant la durée post-runtime ajoutée par les exécutions de l'extension Lambda.

`aws.lambda.enhanced.post_runtime_duration`
: Mesure le nombre de millisecondes écoulées entre le moment où le code de la fonction renvoie la réponse au client et le moment où la fonction arrête de s'exécuter, ce qui correspond à la durée ajoutée par les exécutions de l'extension Lambda.

`aws.lambda.enhanced.response_latency`
: Mesure le nombre de millisecondes écoulées entre la réception de la requête d'invocation et l'envoi au client du premier octet de la réponse.

`aws.lambda.enhanced.response_duration`
: Mesure le nombre de millisecondes écoulées entre l'envoi au client du premier octet et du dernier octet de la réponse.

`aws.lambda.enhanced.produced_bytes`
: Mesure le nombre d'octets renvoyés par une fonction.

`aws.lambda.enhanced.estimated_cost`
: Mesure le coût total estimé de l'invocation de la fonction (en dollars).

`aws.lambda.enhanced.timeouts`
: Mesure le nombre de fois qu'une fonction a expiré.

`aws.lambda.enhanced.out_of_memory`
: Mesure le nombre de fois qu'une fonction est arrivée à court de mémoire.

## Activer les métriques Lambda optimisées

{{< img src="serverless/serverless_custom_metrics.png" alt="Collecte de métriques optimisées depuis AWS Lambda" >}}

Suivez les [instructions d'installation][3] pour configurer l'instrumentation de vos applications sans serveur. Les métriques Lambda optimisées seront alors activées par défaut.

## Consulter votre dashboard

Une fois que vous avez activé les métriques Lambda optimisées, consultez votre [dashboard par défaut dans l'application Datadog][4].

[1]: /fr/integrations/amazon_lambda/#metric-collection
[2]: /fr/metrics/distributions/
[3]: /fr/serverless/installation/
[4]: https://app.datadoghq.com/screen/integration/aws_lambda_enhanced_metrics