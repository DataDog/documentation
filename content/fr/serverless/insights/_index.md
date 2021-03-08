---
title: Informations exploitables pour vos applications sans serveur
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/serverless-insights/'
    tag: Blog
    text: En savoir plus sur les informations exploitables liées à vos applications sans serveur
---
{{< img src="serverless/serverless_actionable_insights_detail.png" alt="Informations exploitables générées automatiquement pour vos applications sans serveur" >}}

Datadog génère automatiquement des suggestions afin de corriger des erreurs, résoudre des problèmes de performance et optimiser les coûts de vos applications sans serveur.

## Configuration

Datadog se base sur des métriques AWS CloudWatch, des métriques AWS Lambda optimisées par Datadog et des [lignes de log Lambda `REPORT`][1] pour vous fournir des informations exploitables. Pour bénéficier de ces informations, suivez les étapes suivantes :

 1. Configurez l'intégration [Amazon Web Services][2].
 2. Configurez le [Forwarder Datadog][3] et vérifiez que vos logs `REPORT` Lambda sont indexés dans Datadog.
 3. Activez les [métriques Lambda optimisées][4] pour vos fonctions.

**Remarque** : une fois l'[intégration AWS][2] configurée, Datadog génère par défaut des informations exploitables sur les [taux d'erreur élevés](#taux-d-erreur-eleves), les [durées élevées](#durees-elevees), les [appels limités](#appels-limites) et l'[âge élevé de l'itérateur](#age-eleve-de-l-iterateur). Pour bénéficier de toutes les autres informations exploitables, notamment celles générées par des appels individuels, vous devez utiliser le [Forwarder Datadog][3] et les [métriques Lambda optimisées][4]

## Informations exploitables générées

### Erreurs

Plus de 1 % des appels de la fonction ont entraîné des erreurs lors de l'intervalle indiqué.

**Solution :** étudiez les logs de la fonction, vérifiez si le code ou la configuration ont récemment été modifiés grâce la fonctionnalité de [suivi des déploiements][5] ou recherchez des défaillances dans l'ensemble des microservices grâce au [tracing distribué][6].

### Taux d'erreur élevé

Plus de 10 % des appels de la fonction ont entraîné des erreurs lors de l'intervalle indiqué.

**Solution :** étudiez les logs de la fonction, vérifiez si le code ou la configuration ont récemment été modifiés grâce la fonctionnalité de [suivi des déploiements][5] ou recherchez des défaillances dans l'ensemble des microservices grâce au [tracing distribué][6].

### Utilisation élevée de la mémoire

Au moins un appel a utilisé plus de 95 % de la mémoire allouée lors de l'intervalle indiqué.

Grâce au [tracing distribué][6], vous pouvez identifier les fonctions Lambda ayant de faibles limites de mémoire ainsi que les éléments de votre application qui consomment une quantité excessive de mémoire.

**Solution :** le runtime Lambda risque d'interrompre les fonctions Lambda qui utilisent pratiquement toute la mémoire qui leur a été allouée. Cela générerait alors des erreurs pour les utilisateurs. Pour y remédier, augmentez la quantité de mémoire allouée à votre fonction. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

### Durée élevée

Au moins un appel a utilisé plus de 95 % du délai d'expiration configuré lors de l'intervalle indiqué.

Grâce au [tracing distribué][6], vous pouvez identifier les appels d'API lents de votre application.

**Solution :** le runtime Lambda risque d'interrompre les fonctions Lambda qui s'exécutent pendant une durée proche du délai d'expiration configuré. Les requêtes entrantes pourraient alors donner lieu à des réponses lentes ou même à des échecs de réponse. Pour y remédier, augmentez le délai d'expiration configuré si vous estimez que vous devez consacrer plus de temps à l'exécution de votre fonction. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

### Démarrages à froid

Plus de 1 % des appels de la fonction correspondent à des démarrages à froid dans l'intervalle indiqué.

Grâce aux [métriques optimisées][4] et au [tracing distribué][6] de Datadog, vous pouvez visualiser l'incidence actuelle des démarrages à froid sur vos applications.

**Solution :** les démarrages à froid se produisent lorsque vos applications sans serveur voient tout d'un coup leur trafic augmenter. Ils peuvent également avoir lieu lorsque la fonction en question était inactive ou lorsqu'elle recevait un nombre relativement constant de requêtes. Aux yeux des utilisateurs, les démarrages à froid entraînent des ralentissements ou des délais de réponse plus importants. Pour éviter les démarrages à froid, activez la [simultanéité provisionnée][7] pour les fonctions Lambda concernées. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

### Mémoire insuffisante

Au moins un appel a manqué de mémoire lors de l'intervalle indiqué.

**Solution :** le runtime Lambda peut interrompre les fonctions Lambda qui utilisent plus de mémoire que ce qui leur a été alloué. Les utilisateurs reçoivent alors des erreurs qui s'apparentent à des échecs de requête dans votre application. Grâce au [tracing distribué][6], vous pouvez identifier les éléments de votre application qui utilisent une quantité trop importante de mémoire. Pour remédier à ce problème, augmentez la quantité de mémoire que votre fonction Lambda peut utiliser. 

### Expirations

Au moins un appel a expiré lors de l'intervalle indiqué. Cela se produit lorsque votre fonction s'exécute pendant une durée supérieure au délai d'expiration configuré ou au délai d'expiration global de la fonction Lambda. 

**Solution :** grâce au [tracing distribué][6], vous pouvez identifier les requêtes lentes transmises aux API ainsi qu'à d'autres microservices. Vous pouvez également augmenter la durée d'expiration de votre fonction. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

### Appels limités

Plus de 10 % des appels ont été limités lors de l'intervalle indiqué. Les appels sont limités lorsque vos applications Lambda sans serveur reçoivent un volume important de trafic alors qu'elles ne disposent pas de capacités de [simultanéité][8] adéquates.

**Solution :** consultez vos [métriques de simultanéité Lambda][9] et vérifiez que la valeur de `aws.lambda.concurrent_executions.maximum` est proche du niveau de simultanéité de votre compte AWS. Si c'est bien le cas, configurez la simultanéité réservée, ou demandez à AWS d'augmenter le quota de votre service. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

### Âge élevé de l'itérateur

L'âge de l'itérateur de la fonction dépasse deux heures. Cette donnée mesure l'âge du dernier enregistrement pour chaque lot d'enregistrements traités depuis un flux. Si cette valeur augmente, cela signifie que votre fonction ne parvient pas à traiter suffisamment vite les données.

**Solution :** activez le [tracing distribué][6] pour déterminer pourquoi votre fonction reçoit autant de données. Vous pouvez également augmenter le nombre de partitions et la taille des lots du flux à l'origine de l'envoi de données à votre fonction.

### Surprovisionnement

Aucun appel n'a utilisé plus de 10 % de la mémoire allouée lors de l'intervalle indiqué. Cela signifie que votre fonction dispose d'un trop grand nombre de ressources facturables par rapport à ses besoins.

**Solution :** diminuez la quantité de mémoire allouée à votre fonction Lambda. Notez qu'un tel changement peut avoir une incidence sur vos coûts AWS.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/python-logging.html
[2]: /fr/integrations/amazon_web_services/#setup
[3]: /fr/serverless/forwarder
[4]: /fr/serverless/enhanced_lambda_metrics
[5]: /fr/serverless/deployment_tracking
[6]: /fr/serverless/distributed_tracing
[7]: https://www.datadoghq.com/blog/monitor-aws-lambda-provisioned-concurrency/
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
[9]: /fr/integrations/amazon_lambda/#metrics