---
aliases:
- /fr/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /fr/integrations/faq/aws-integration-and-cloudwatch-faq

title: FAQ sur l'intégration AWS et CloudWatch
---

### Est-il possible de recueillir des métriques custom AWS via l'intégration ?

Oui. Activez l'option **Collect Custom Metrics** dans l'onglet **Metric Collection** sur la [page de l'intégration AWS][1].

### Comment recueillir des métriques à partir d'un service pour lequel il n'existe pas d'intégration Datadog officielle ?

Les métriques AWS en provenance d'un `AWS/<espace_de_nommage>` pour lequel il n'existe pas d'intégration officielle sont également ingérées sous l'espace de nommage personnalisé lorsque l'option `Collect custom metrics` est activée. Pour filtrer ces métriques et ne conserver que celles qui vous intéressent, utilisez la chaîne de filtrage sous l'espace de nommage personnalisé avec l'API [Définir un filtre de tags AWS][2].

### Comment l'intégration Datadog/AWS utilise-t-elle CloudWatch ?

Datadog utilise les API de surveillance CloudWatch pour surveiller vos ressources AWS. Ces API sont principalement utilisées pour la collecte de données de métriques brutes via l'endpoint `GetMetricData`.

D'autres API sont utilisées pour enrichir les données de métriques. Voici quelques exemples :

 * Récupérer des tags personnalisés pour les ajouter aux métriques

 * Récupérer des informations sur le statut ou la santé de ressources, comme la désactivation automatique

 * Récupérer des flux de logs

### Combien de requêtes API sont-elles effectuées et comment surveiller mon utilisation de CloudWatch ?

Datadog récupère les métriques disponibles toutes les 10 minutes pour chaque sous-intégration AWS que vous avez installée. Si vous avez de nombreuses ressources AWS pour une sous-intégration spécifique (SQS, ELB, DynamoDB, métriques custom AWS), cela peut affecter votre facture AWS CloudWatch.

Vous pouvez surveiller votre utilisation de l'API CloudWatch avec l'[intégration AWS Billing][3].

### Comment réduire le délai de réception de mes métriques CloudWatch dans Datadog ?

Par défaut, Datadog recueille les métriques AWS toutes les 10 minutes. Consultez la section [Délai de réception des métriques cloud][4] pour en savoir plus. Si vous souhaitez réduire cette latence, contactez l'[assistance Datadog][5] pour obtenir de l'aide. Pour que les métriques CloudWatch parviennent à Datadog avec une latence de 2 à 3 minutes seulement, nous vous conseillons d'utiliser les [Flux de métriques AWS CloudWatch avec Amazon Kinesis Data Firehose][6]. 


### Pourquoi seules les valeurs moyennes de mes métriques AWS/CloudWatch custom sont-elles visibles ?

Par défaut, Datadog recueille uniquement les valeurs moyennes de vos métriques AWS/CloudWatch custom. Toutefois, des valeurs supplémentaires sont disponibles en contactant l'[assistance Datadog][5]. Celles-ci incluent (lorsque c'est possible) la valeur minimale, la valeur maximale, la somme et le nombre d'échantillons.

### Y a-t-il des différences entre mes données dans CloudWatch et dans Datadog ?

Il est important de tenir compte des distinctions suivantes :

- Datadog recueille la _moyenne_ de toutes les métriques CloudWatch.
- Pour les counters AWS, un graphique défini sur `sum` `1 minute` affiche le nombre total d'occurrences en l'espace d'une minute, soit le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, peu importe l'intervalle sélectionné dans AWS. Cela explique pourquoi la valeur affichée dans Datadog peut être plus faible.
- Les valeurs `min`, `max` et `avg` n'ont généralement pas la même signification dans AWS. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes pour chaque ELB. Dans Datadog, lorsque vous sélectionnez les valeurs `min`, `max` ou `avg`, vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est renvoyée pour chaque host qui transmet cette métrique. Datadog combine ces séries en utilisant l'[agrégation spatiale][7]. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs `avg` et `max` obtenues sont identiques.

### Comment ajuster mes données sur Datadog pour qu'elles correspondent à celles affichées dans CloudWatch ?

AWS CloudWatch transmet ses métriques avec une granularité d'une minute à partir des données normalisées par minute. Datadog transmet ses métriques avec une granularité d'une minute à partir des données normalisées par seconde. Pour ajuster les données dans Datadog, multipliez-les par 60. Assurez-vous également que la statistique de la métrique est la même. Par exemple, la métrique `IntegrationLatency` récupère plusieurs statistiques différentes : la moyenne, le maximum, le minimum ainsi que les centiles. Dans Datadog, chacune de ces statistiques est représentée par une métrique distincte :
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### Est-il possible d'effectuer un rollup() pour ajuster mes données ?

Les rollups n'affichent pas des résultats identiques. Pour un appel rollup correspondant à `rollup(sum, 60)`, le serveur regroupe tous les points de données en bins d'une minute et renvoie la somme de chaque bin sous forme de point de données. Toutefois, étant donné que les métriques AWS ont une granularité d'une minute et qu'il n'y a qu'un seul point de données par bin, cela n'entraîne aucun changement.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /fr/integrations/amazon_billing/
[4]: /fr/integrations/guide/cloud-metric-delay/
[5]: /fr/help/
[6]: https://docs.datadoghq.com/fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /fr/metrics/introduction/#space-aggregation