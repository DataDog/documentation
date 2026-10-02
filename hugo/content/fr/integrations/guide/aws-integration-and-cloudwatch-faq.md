---
aliases:
- /fr/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /fr/integrations/faq/aws-integration-and-cloudwatch-faq
description: Questions fréquentes sur l'intégration Datadog AWS et la collecte de
  métriques CloudWatch.
title: FAQ sur l'intégration AWS et CloudWatch
---
### Puis-je collecter des métriques personnalisées AWS via l'intégration ? {#can-i-collect-aws-custom-metrics-through-the-integration}

Oui. Activez **Collect Custom Metrics** sous l'onglet **Metric Collection** sur la [page d'intégration AWS][1].

### Puis-je filtrer les métriques AWS par nom de métrique ? {#can-i-filter-aws-metrics-by-metric-name}

Oui. Sur la [page d'intégration AWS][1], ouvrez l'onglet **Metric Collection**, développez un espace de nom CloudWatch et ajoutez des filtres de nom de métrique. Utilisez **Include** pour collecter uniquement les noms de métriques Datadog correspondants pour cet espace de nom, ou **Exclude** pour tout collecter à l'exception des noms de métriques correspondants.

Pour plus d'informations sur la syntaxe et les métriques requises, consultez [Démarrer avec AWS][14]. Pour gérer les filtres de nom de métrique par programmation, consultez [Configurer les filtres de nom de métrique AWS avec l'API][15].

### Comment collecter des métriques à partir d'un service pour lequel Datadog ne dispose pas d'intégration officielle ? {#how-do-i-collect-metrics-from-a-service-for-which-datadog-doesnt-have-an-official-integration}

Les métriques AWS provenant d'un `AWS/<namespace>` pour lequel il n'existe aucune intégration officielle sont également importées sous l'espace de nom personnalisé lorsque l'option `Collect custom metrics` est activée. Vous pouvez filtrer ces métriques et ne conserver que celles que vous souhaitez en utilisant la chaîne de filtrage sous l'espace de nom personnalisé avec l'API [Définir un filtre de tag AWS][2].

### Comment l'intégration Datadog AWS utilise-t-elle CloudWatch ? {#how-does-the-datadog-aws-integration-use-cloudwatch}

Datadog utilise les API de surveillance CloudWatch pour surveiller vos ressources AWS. Notre utilisation principale de ces API consiste à collecter des données de métriques brutes via l'endpoint `GetMetricData`.

D'autres API sont utilisées pour enrichir les données de métriques. Voici quelques exemples :

 * Collecte de tags personnalisés à ajouter aux métriques

 * Collecte d'informations sur le statut ou l'état de santé des ressources, comme la désactivation automatique

 * Collecte de flux de logs

### Combien de requêtes API sont effectuées et comment puis-je surveiller mon utilisation de CloudWatch ? {#how-many-api-requests-are-made-and-how-can-i-monitor-my-cloudwatch-usage}

Datadog collecte les métriques disponibles toutes les 10 minutes pour chaque sous-intégration AWS que vous avez installée. Si vous avez un grand nombre de ressources AWS pour une sous-intégration particulière (SQS, ELB, DynamoDB, métriques personnalisées AWS), cela peut avoir un impact sur votre facture AWS CloudWatch.

Vous pouvez surveiller votre utilisation de l'API CloudWatch avec l'[intégration AWS Billing][3].

### Comment puis-je réduire le délai de réception de mes métriques CloudWatch vers Datadog ? {#how-can-i-reduce-the-delay-of-receiving-my-cloudwatch-metrics-to-datadog}

Par défaut, Datadog collecte les métriques AWS toutes les 10 minutes. Consultez [Cloud Metric Delay][4] pour plus d'informations. Si vous devez réduire la latence, contactez le [support Datadog][5] pour obtenir de l'aide. Pour obtenir les métriques CloudWatch dans Datadog plus rapidement avec une latence de 2 à 3 minutes, nous recommandons d'utiliser [Amazon CloudWatch Metric Streams et Amazon Data Firehose][6]. 


### Pourquoi ne vois-je que les valeurs moyennes de mes métriques AWS/Cloudwatch personnalisées ? {#why-am-i-only-seeing-the-average-values-of-my-custom-awscloudwatch-metrics}

Par défaut, Datadog collecte uniquement les valeurs moyennes de vos métriques AWS/Cloudwatch personnalisées. Cependant, des valeurs supplémentaires sont disponibles en contactant le [support Datadog][5]. Celles-ci incluent (lorsqu'elles sont disponibles) le minimum, le maximum, la somme et le nombre d'échantillons.

### Existe-t-il un écart entre mes données dans CloudWatch et Datadog ? {#is-there-a-discrepancy-between-my-data-in-cloudwatch-and-datadog}

Il est important de tenir compte des distinctions suivantes :

- Datadog collecte une seule statistique CloudWatch pour la métrique CloudWatch équivalente dans Datadog. Comparer `Sum` dans CloudWatch à `Average` dans Datadog entraîne des écarts. Pour certaines métriques CloudWatch, plusieurs statistiques peuvent être utiles et Datadog crée des noms de métriques différents pour la même métrique CloudWatch avec des statistiques différentes. Par exemple, `aws.elb.latency` et `aws.elb.latency.maximum`.
- Dans AWS pour les compteurs, un graphique réglé sur `sum` `1 minute` affiche le nombre total d'occurrences en une minute jusqu'à ce point (le taux par minute). Datadog affiche les données brutes provenant d'AWS normalisées en valeurs par seconde, indépendamment de la période sélectionnée dans AWS. Par conséquent, vous pourriez voir une valeur inférieure dans Datadog.
- Dans l'ensemble, `min`, `max` et `avg` ont des significations différentes au sein d'AWS. AWS collecte distinctement la latence moyenne, la latence minimale et la latence maximale. Lors de la récupération des métriques depuis AWS CloudWatch, Datadog ne reçoit que la latence moyenne sous forme de série temporelle unique par ELB. Dans Datadog, lorsque vous sélectionnez `min`, `max` ou `avg`, vous contrôlez la manière dont les multiples séries temporelles sont combinées. Par exemple, demander `system.cpu.idle` sans aucun filtre renvoie une série pour chaque host rapportant cette métrique. Datadog combine ces séries temporelles en utilisant [l'agrégation spatiale][7]. Sinon, si vous avez demandé `system.cpu.idle` à partir d'un seul host, aucune agrégation n'est nécessaire et basculer entre `avg` et `max` donne le même résultat.

### Comment puis-je ajuster mes données sur Datadog pour qu'elles correspondent aux données affichées dans CloudWatch ? {#how-do-i-adjust-my-data-on-datadog-to-match-the-data-displayed-in-cloudwatch}

AWS CloudWatch rapporte les métriques avec une granularité d'une minute normalisée en données par minute. Datadog rapporte les métriques avec une granularité d'une minute normalisée en données par seconde. Pour ajuster les données dans Datadog, multipliez par 60. Assurez-vous également que la statistique de la métrique est la même. Par exemple, la métrique `IntegrationLatency` récupère un certain nombre de statistiques différentes : Moyenne, Maximum, Minimum, ainsi que des centiles. Dans Datadog, ces statistiques sont chacune représentées comme leurs propres métriques :
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### Est-ce qu'un rollup() ajustera mes données ? {#will-a-rollup-adjust-my-data}

Les rollups n'affichent pas de résultats similaires. Pour un appel rollup de `rollup(sum, 60)`, le serveur regroupe tous les points de données dans des compartiments d'une minute et renvoie la somme de chaque compartiment sous forme de point de données. Cependant, la granularité des métriques AWS est d'une minute, il n'y a donc qu'un seul point de données par compartiment, ce qui n'entraîne aucun changement.

### Pourquoi ne vois-je pas les métriques d'un nouveau service AWS que j'ai activé ? {#why-dont-i-see-metrics-for-a-new-aws-service-i-enabled}

Si vous avez récemment activé une nouvelle intégration de service AWS mais que vous ne voyez pas les métriques dans Datadog, vérifiez les points suivants :

1. **Autorisations IAM** : Confirmez que le rôle IAM ou l'utilisateur IAM associé à l'intégration Datadog inclut les autorisations requises par le service. Consultez les [pages d'intégration AWS][8] individuelles pour connaître les exigences d'autorisation spécifiques au service.
2. **Région** : Confirmez que la région AWS où vos ressources sont déployées est activée sur la [page d'intégration AWS][1].
3. **Disponibilité de CloudWatch** : Ouvrez la console CloudWatch dans AWS et confirmez que les métriques attendues existent. Certains services n'émettent pas de métriques CloudWatch tant que des conditions spécifiques ne sont pas remplies (par exemple, un ELB sans instances associées n'émet pas de métriques).
4. **Délai de sondage** : Le sondage par API collecte les métriques environ toutes les 10 minutes. Si vous utilisez [CloudWatch Metric Streams][6], prévoyez un délai de 2 à 3 minutes. Attendez au moins un cycle de sondage avant d'enquêter davantage.

### Quelle est la différence entre le sondage par API et CloudWatch Metric Streams ? {#what-is-the-difference-between-api-polling-and-cloudwatch-metric-streams}

| &nbsp; | Sondage par API (par défaut) | CloudWatch Metric Streams |
|---|---|---|
| **Latence typique** | ~10 minutes | 2-3 minutes |
| **Configuration** | Incluse avec l'intégration AWS | Nécessite une configuration distincte avec [Amazon Data Firehose][6] |
| **Coût AWS** | Appels d'API CloudWatch `GetMetricData`Frais de diffusion CloudWatch Metric Streams et Firehose | |
| **Couverture** | Tous les espaces de noms CloudWatch standard ; les espaces de noms personnalisés nécessitent l'activation de **Collect Custom Metrics** | La plupart des espaces de noms CloudWatch (certaines exclusions s'appliquent) |
| **Espaces de noms personnalisés** | Pris en charge avec **Collect Custom Metrics** activé | Pris en charge en incluant l'espace de noms dans la configuration du flux |

Pour plus de détails, consultez [Délai des métriques cloud][4] et le [guide CloudWatch Metric Streams][6].

### Pourquoi mes valeurs de métriques semblent-elles doublées après l'activation de Metric Streams ? {#why-do-my-metric-values-look-doubled-after-enabling-metric-streams}

Lors de la transition du sondage par API vers CloudWatch Metric Streams, il existe une période de chevauchement où les deux méthodes de collecte envoient des données pour les mêmes métriques. Cela peut entraîner un doublement des valeurs de métriques dans Datadog.

Datadog détecte automatiquement les espaces de noms diffusés et cesse de les sonder, vous n'avez donc pas besoin de désactiver manuellement le sondage par API. Laissez vos paramètres de configuration sur la [page d'intégration AWS][1] inchangés, car Datadog continue d'utiliser le sondage par API pour collecter les tags personnalisés, les métadonnées et les métriques qui ne peuvent pas être envoyés via Metric Streams (tels que `aws.s3.bucket_size_bytes` et `aws.billing.estimated_charges`).

La détection prend généralement jusqu'à cinq minutes, mais la période de chevauchement peut se prolonger en fonction du moment où les active polling crawlers procèdent au sondage. Si les valeurs semblent toujours doublées après plusieurs minutes, consultez le [guide CloudWatch Metric Streams][6] pour le dépannage.

### Quels services AWS nécessitent une configuration supplémentaire au-delà de l'intégration principale ? {#which-aws-services-require-additional-setup-beyond-the-core-integration}

Certains services AWS n'émettent pas de métriques vers CloudWatch par défaut et nécessitent une configuration supplémentaire :

| Service | Configuration supplémentaire requise |
|---|---|
| Amazon RDS (métriques au niveau de l'OS) | Activez [Enhanced Monitoring][9] dans la console RDS |
| Amazon S3 (métriques Storage Lens) | Configurez [Storage Lens][10] dans la console S3 |
| Métriques de facturation AWS | Activez `Billing` dans l'[onglet Collecte de métriques][1], ajoutez l'autorisation `budgets:ViewBudget` et [activez les métriques de facturation][11] dans la console AWS. Consultez [Surveillez vos détails de facturation AWS][13] pour obtenir des instructions complètes. |
| Espaces de noms CloudWatch personnalisés | Activez **Collect Custom Metrics** dans l'[onglet Metric Collection][1] |
| Surveillance détaillée EC2 | Activez la [surveillance détaillée][12] par instance dans la console EC2 |

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/fr/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /fr/integrations/amazon_billing/
[4]: /fr/integrations/guide/cloud-metric-delay/
[5]: /fr/help/
[6]: https://docs.datadoghq.com/fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /fr/metrics/introduction/#space-aggregation
[8]: /fr/integrations/#cat-aws
[9]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html
[11]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html
[13]: /fr/integrations/guide/monitor-your-aws-billing-details/
[14]: /fr/getting_started/integrations/aws/#filter-metrics-by-metric-name
[15]: /fr/integrations/guide/aws-metric-name-filters/